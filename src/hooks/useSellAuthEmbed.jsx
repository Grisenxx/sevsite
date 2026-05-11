'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const API_BASE_URL = 'https://api-internal-3.sellauth.com/v1';

// Mounts a single invisible altcha-widget into document.body.
// We fetch the challenge ourselves (avoids CORS issues with widget's internal fetch)
// then configure the widget with the challenge data before calling verify().
function AltchaPortal({ widgetRef }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    import('altcha')
      .then(() => customElements.whenDefined('altcha-widget'))
      .then(() => setIsReady(true))
      .catch((e) => console.error('altcha load failed', e));
  }, []);

  if (!isReady) return null;

  return createPortal(
    <altcha-widget
      ref={widgetRef}
      hidefooter="true"
      hidelogo="true"
      style={{
        display: 'none',
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
      }}
    />,
    document.body
  );
}

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

/**
 * Fetches the altcha challenge from SellAuth and solves it via the widget.
 * We do the challenge fetch ourselves so the browser's CORS preflight goes
 * through our code (with proper mode/credentials), rather than the widget's
 * internal fetch which can fail silently on some setups.
 */
async function solveAltcha(widget) {
  // 1. Fetch the challenge
  const res = await fetch(`${API_BASE_URL}/altcha`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Altcha challenge request failed: ${res.status}`);
  const challenge = await res.json();

  // 2. Hand the pre-fetched challenge to the widget and solve it
  if (typeof widget.configure === 'function') {
    await widget.configure({ challenge });
  }
  if (typeof widget.reset === 'function') widget.reset();

  const result = await widget.verify();
  return result?.payload ?? null;
}

export function useSellAuthEmbed() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const widgetRef = useRef(null);

  const closeModal = useCallback(() => setModalUrl(null), []);

  const checkout = useCallback(async ({ cart, shopId, modal = true, scrollTop = true }) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const widget = widgetRef.current;
      if (!widget || typeof widget.verify !== 'function') {
        throw new Error('Captcha widget not ready. Please wait a moment and try again.');
      }

      const altchaPayload = await solveAltcha(widget);
      if (!altchaPayload) {
        throw new Error('Captcha verification failed. Please try again.');
      }

      const response = await fetch(`${API_BASE_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, shopId, altcha: altchaPayload }),
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
    }
  }, [isLoading]);

  return {
    checkout,
    isLoading,
    closeModal,
    captcha: <AltchaPortal widgetRef={widgetRef} />,
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
