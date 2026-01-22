// Stripe Configuration
const STRIPE_PUBLIC_KEY = 'pk_live_51QXNcvJMJUFBmPnVl77sWVUFyBYijSU6kixBa4FNMRWVBqjjta08qJn9x76zaFSL8t6W5wvUArfsWU6V0F9kgUgT00Y25x6ryJ';
const stripe = Stripe(STRIPE_PUBLIC_KEY);

const PRICES = {
    weekly: 'price_1SmxAPJMJUFBmPnV8rAswysU',
    monthly: 'price_1SmxSWJMJUFBmPnVPgnYcqVB',
    quarterly: 'price_1SmxUEJMJUFBmPnVeO2rWhtz'
};

async function checkout(priceId) {
    try {
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            successUrl: window.location.origin + '/success.html',
            cancelUrl: window.location.origin + '/store.html',
        });

        if (error) {
            console.error('Stripe error:', error);
            alert('Payment error: ' + error.message);
        }
    } catch (err) {
        console.error('Checkout error:', err);
        alert('Something went wrong. Please try again.');
    }
}

function buyWeekly() {
    checkout(PRICES.weekly);
}

function buyMonthly() {
    checkout(PRICES.monthly);
}

function buyQuarterly() {
    checkout(PRICES.quarterly);
}

document.addEventListener('DOMContentLoaded', function() {
    // Button animations
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });
    });
    
    // Reseller button functionality
    const resellerBtn = document.querySelector('.reseller-btn');
    if (resellerBtn) {
        resellerBtn.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
                window.open('https://discord.gg/severancee', '_blank');
            }, 300);
        });
    }
    
    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 50px rgba(220, 38, 38, 0.3)';
            this.style.borderColor = '#dc2626';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.borderColor = '#374151';
        });
    });
});
