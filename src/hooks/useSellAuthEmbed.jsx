'use client';
import React, { useState, useCallback, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const API_BASE_URL = 'https://api-internal-3.sellauth.com/v1';

const HiddenAltcha = forwardRef(({ onStateChange }, ref) => {
  const widgetRef = useRef(null);
  const [value, setValue] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useImperativeHandle(ref, () => ({
    get value() {
      return value;
    }
  }), [value]);

  useEffect(() => {
    const load = async () => {
      try {
        await import('altcha');
        await customElements.whenDefined('altcha-widget');
        setIsReady(true);
      } catch (error) {
        console.error('Failed to load altcha:', error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!isReady || !widgetRef.current) return;
    const widget = widgetRef.current;
    const handleStateChange = (ev) => {
      if ('detail' in ev) {
        const payload = ev.detail.payload || null;
        setValue(payload);
        onStateChange?.(ev);
      }
    };
    widget.addEventListener('statechange', handleStateChange);
    return () => widget.removeEventListener('statechange', handleStateChange);
  }, [isReady, onStateChange]);

  if (!isReady) return null;

  return createPortal(
    <altcha-widget
      ref={widgetRef}
      challengeurl={`${API_BASE_URL}/altcha`}
      auto="onload"
      hidefooter={true}
      hidelogo={true}
      style={{
        display: 'none',
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        '--altcha-max-width': '100%',
      }}
    />,
    document.body
  );
});
HiddenAltcha.displayName = 'HiddenAltcha';

function CheckoutModal({ url, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#141414] text-white rounded-xl max-w-[98vw] md:max-w-[32rem] w-full max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-[1.125rem] z-10 p-1 text-white hover:text-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
          </svg>
        </button>
        <div className="w-full h-full">
          <iframe
            src={url}
            title="SellAuth Checkout"
            referrerPolicy="no-referrer"
            allow="payment; clipboard-write"
            className="w-full h-[46rem] md:h-[52rem] border-0"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export function useSellAuthEmbed() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [altchaKey, setAltchaKey] = useState(0);
  const altchaRef = useRef(null);
  // Keep token in a ref so the checkout callback always reads the latest value
  // without needing to be recreated every time the state updates.
  const altchaTokenRef = useRef(null);

  const handleCaptchaStateChange = useCallback((ev) => {
    if (ev.detail?.state === 'verified') {
      altchaTokenRef.current = ev.detail.payload;
    }
  }, []);

  const closeModal = useCallback(() => setModalUrl(null), []);

  const checkout = useCallback(async ({ cart, shopId, modal = true, scrollTop = true }) => {
    if (isLoading) return;

    // Wait up to 5 s for the proof-of-work captcha to finish
    if (!altchaTokenRef.current) {
      setIsLoading(true);
      const deadline = Date.now() + 5000;
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (altchaTokenRef.current || Date.now() >= deadline) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }

    if (!altchaTokenRef.current) {
      setIsLoading(false);
      alert('Could not verify captcha. Please refresh and try again.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, shopId, altcha: altchaTokenRef.current }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (!data.url) throw new Error('No checkout URL returned. Please try again.');
      if (modal) {
        setModalUrl(data.url);
        if (scrollTop) window.scrollTo(0, 0);
      } else {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'An error occurred during checkout');
    } finally {
      setIsLoading(false);
      altchaTokenRef.current = null;
      setAltchaKey((prev) => prev + 1);
    }
  }, [isLoading]);

  return {
    checkout,
    isLoading,
    closeModal,
    captcha: <HiddenAltcha key={altchaKey} ref={altchaRef} onStateChange={handleCaptchaStateChange} />,
    modal: modalUrl ? <CheckoutModal url={modalUrl} onClose={closeModal} /> : null,
  };
}

export function SellAuthButton({
  cart,
  shopId,
  modal = true,
  scrollTop = true,
  className = '',
  children,
  disabled = false,
}) {
  const { checkout, isLoading, modal: checkoutModal, captcha } = useSellAuthEmbed();

  const handleClick = () => checkout({ cart, shopId, modal, scrollTop });

  const defaultClassName =
    'inline-flex items-center justify-center rounded-md bg-gray-800/50 px-4 py-2 text-sm font-medium duration-100 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-700 hover:text-white transition-colors backdrop-blur-md cursor-pointer';

  return (
    <>
      {captcha}
      <button
        type="button"
        className={className || defaultClassName}
        onClick={handleClick}
        disabled={disabled || isLoading}
      >
        {children || (
          <>
            <span>Get Started</span>
            {!isLoading && (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 ml-2" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z" />
              </svg>
            )}
            {isLoading && (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 ml-2 animate-spin" fill="currentColor" viewBox="0 0 256 256">
                <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z" />
              </svg>
            )}
          </>
        )}
      </button>
      {checkoutModal}
    </>
  );
}
