import xxtea from 'xxtea-node';

const API_URL = import.meta.env.VITE_API_URL || 'https://shimmery-dan-nonpaternally.ngrok-free.dev/api';
const XXTEA_KEY = import.meta.env.VITE_XXTEA_KEY || 'NIGGERSEVERANCEISONTOPFUCKALLJEWSYALLAH0067!';

async function prepareKey(keyStr) {
    const encoder = new TextEncoder();
    let keyVec = encoder.encode(keyStr);
    
    if (keyVec.length < 16) {
        const padded = new Uint8Array(16);
        padded.set(keyVec);
        keyVec = padded;
    } else if (keyVec.length > 32) {
        const hashBuffer = await crypto.subtle.digest('SHA-256', keyVec);
        keyVec = new Uint8Array(hashBuffer);
    }
    
    // Return first 16 bytes
    return keyVec.slice(0, 16);
}

export async function apiRequest(payload) {
    try {
        const payloadString = JSON.stringify(payload);
        const actualKey = await prepareKey(XXTEA_KEY);
        
        // Standard XXTEA encryption
        const rawEncrypted = xxtea.encrypt(xxtea.toBytes(payloadString), actualKey);
        
        // Prepend 8 random bytes (IV)
        const finalEncrypted = new Uint8Array(8 + rawEncrypted.length);
        crypto.getRandomValues(finalEncrypted.subarray(0, 8));
        finalEncrypted.set(rawEncrypted, 8);
        
        const formData = new FormData();
        formData.append('q', btoa(String.fromCharCode.apply(null, finalEncrypted)));

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            let errorText = await response.text();
            try {
                // Check if it's a raw JSON error from backend (e.g. Decryption failed)
                const rawJson = JSON.parse(errorText);
                throw new Error(rawJson.error || 'API Request Failed');
            } catch (e) {
                // If it's not JSON, try to decode as base64 XXTEA
                try {
                    const decoded = atob(errorText);
                    const decBytes = new Uint8Array(decoded.length);
                    for (let i = 0; i < decoded.length; i++) {
                        decBytes[i] = decoded.charCodeAt(i);
                    }
                    
                    const actualData = decBytes.length >= 8 ? decBytes.slice(8) : decBytes;
                    const dec = xxtea.decrypt(actualData, actualKey);
                    const errJson = JSON.parse(xxtea.toString(dec));
                    throw new Error(errJson.error || 'API Request Failed');
                } catch (decErr) {
                    throw new Error(`API Error ${response.status}: ${errorText}`);
                }
            }
        }

        const responseText = await response.text();
        const decoded = atob(responseText);
        const decBytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
            decBytes[i] = decoded.charCodeAt(i);
        }
        
        // Remove 8 byte IV
        const actualData = decBytes.length >= 8 ? decBytes.slice(8) : decBytes;
        
        const decryptedBytes = xxtea.decrypt(actualData, actualKey);
        const decryptedString = xxtea.toString(decryptedBytes);
        
        return JSON.parse(decryptedString);

    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
}
