// API Configuration
const API_BASE_URL = 'https://api.nexyn.net';
const API_KEY = '4f327d23eac06938';

// API Client
class APIClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.apiKey = API_KEY;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.apiKey) {
            headers['Authorization'] = `ApiKey ${this.apiKey}`;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }
}

const apiClient = new APIClient();

// Authentication Functions
async function login(username, password, turnstileToken) {
    try {
        const data = await apiClient.post('/login', {
            username,
            password,
            cf_turnstile_response: turnstileToken
        });

        // Handle 2FA if required
        if (data.twofa_required) {
            return {
                requiresTwoFactor: true,
                twoFaSessionId: data.twofa_session_id
            };
        }

        // Normal login success
        return {
            token: data.session_token,
            user: {
                username: data.username,
                role: data.role
            }
        };
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
}

async function register(username, email, password, turnstileToken) {
    try {
        const data = await apiClient.post('/register', {
            username,
            email,
            password,
            cf_turnstile_response: turnstileToken
        });

        return {
            token: data.session_token,
            user: {
                username: data.username,
                role: data.role
            }
        };
    } catch (error) {
        console.error('Error during registration:', error.message);
        throw error;
    }
}

async function verifyTwoFactor(sessionId, code) {
    try {
        const data = await apiClient.post('/verify-2fa', {
            twofa_session_id: sessionId,
            code: code
        });

        return {
            token: data.session_token,
            user: {
                username: data.username,
                role: data.role
            }
        };
    } catch (error) {
        console.error('Error during 2FA verification:', error.message);
        throw error;
    }
}

// Session Management
function saveSession(token, user) {
    localStorage.setItem('session_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
}

function getSession() {
    const token = localStorage.getItem('session_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
        return {
            token,
            user: JSON.parse(userData)
        };
    }
    
    return null;
}

function clearSession() {
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_data');
}

function isLoggedIn() {
    return getSession() !== null;
}

// UI Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

function showLoginForm() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('twofa-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'flex';
    document.getElementById('twofa-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'none';
}

function showTwoFactorForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('twofa-container').style.display = 'flex';
    document.getElementById('dashboard-container').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('twofa-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
    
    // Populate dashboard with user data
    const session = getSession();
    if (session) {
        document.getElementById('username-display').textContent = session.user.username;
        document.getElementById('welcome-username').textContent = session.user.username;
        document.getElementById('user-role').textContent = session.user.role.toUpperCase();
        document.getElementById('role-display').textContent = session.user.role;
        
        // Set member since date
        const today = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        document.getElementById('member-since').textContent = today;
    }
}

function getTurnstileResponse(formId) {
    // Turnstile disabled - return placeholder token
    return 'bypass_turnstile';
}

// Store 2FA session ID temporarily
let currentTwoFaSessionId = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (isLoggedIn()) {
        showDashboard();
    } else {
        showLoginForm();
    }

    // Login Form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const turnstileToken = getTurnstileResponse('login-form');
        
        try {
            const result = await login(username, password, turnstileToken);
            
            if (result.requiresTwoFactor) {
                currentTwoFaSessionId = result.twoFaSessionId;
                showTwoFactorForm();
            } else {
                saveSession(result.token, result.user);
                showDashboard();
            }
        } catch (error) {
            showError('error-message', error.message || 'Login failed. Please try again.');
        }
    });

    // Register Form
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const turnstileToken = getTurnstileResponse('register-form');
        
        if (password !== confirmPassword) {
            showError('register-error-message', 'Passwords do not match.');
            return;
        }
        
        try {
            const result = await register(username, email, password, turnstileToken);
            saveSession(result.token, result.user);
            showDashboard();
        } catch (error) {
            showError('register-error-message', error.message || 'Registration failed. Please try again.');
        }
    });

    // 2FA Form
    document.getElementById('twofa-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const code = document.getElementById('twofa-code').value;
        
        if (!currentTwoFaSessionId) {
            showError('twofa-error-message', 'Session expired. Please login again.');
            showLoginForm();
            return;
        }
        
        try {
            const result = await verifyTwoFactor(currentTwoFaSessionId, code);
            saveSession(result.token, result.user);
            currentTwoFaSessionId = null;
            showDashboard();
        } catch (error) {
            showError('twofa-error-message', error.message || '2FA verification failed. Please try again.');
        }
    });

    // Switch between login and register
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        clearSession();
        showLoginForm();
    });
});
