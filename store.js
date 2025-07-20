document.addEventListener('DOMContentLoaded', function() {
    // Purchase button functionality
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planTitle = card.querySelector('.plan-title').textContent;
            const planPrice = card.querySelector('.plan-price').textContent;
            
            alert(`Redirecting to payment for ${planTitle} - ${planPrice}`);
            // Here you would redirect to your payment processor
        });
    });
    
    // Reseller button functionality
    const resellerBtn = document.querySelector('.reseller-btn');
    resellerBtn.addEventListener('click', function() {
        setTimeout(() => {
        window.open('https://discord.gg/severancee', '_blank');
    }, 300);
        // Here you would redirect to reseller program page
    });
    
    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
});