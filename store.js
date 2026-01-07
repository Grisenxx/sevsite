document.addEventListener('DOMContentLoaded', function() {
    // Stripe payment buttons are handled automatically
    // No custom JavaScript needed for Stripe buy buttons
    
    // Reseller button functionality
    const resellerBtn = document.querySelector('.reseller-btn');
    if (resellerBtn) {
        resellerBtn.addEventListener('click', function() {
            // Add click animation
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