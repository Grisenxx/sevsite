document.addEventListener('DOMContentLoaded', function() {
    // Simple button animations - let Paylix eCommerce plugin handle payments
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation only
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
            
            console.log('Purchase button clicked - Paylix eCommerce plugin will handle payment');
            // No custom API calls - let the eCommerce plugin do everything
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
