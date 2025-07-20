document.addEventListener('DOMContentLoaded', function() {
    // Purchase button functionality
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
            
            // Get the plan details
            const card = this.closest('.pricing-card');
            const planTitle = card.querySelector('.plan-title').textContent;
            const planPrice = card.querySelector('.plan-price').textContent;
            
            // Determine which URL to use based on the plan
            let paymentUrl;
            
            if (planTitle.includes('Week')) {
                // Week plan
                paymentUrl = 'https://severance.paylix.gg/product/687cf34003ca0';
            } else if (planTitle.includes('Month')) {
                // Month plan
                paymentUrl = 'https://severance.paylix.gg/product/687cf34c2b894';
            } else if (planTitle.includes('Day')) {
                // Day plan - you might want to add a URL for this too
                paymentUrl = 'https://severance.paylix.gg/product/day-plan-id'; // Replace with actual day plan URL
            } else {
                // Fallback
                paymentUrl = 'https://severance.paylix.gg/';
            }
            
            // Open payment page in new tab after animation
            setTimeout(() => {
                window.open(paymentUrl, '_blank');
            }, 300);
            
            console.log(`Redirecting to ${planTitle} payment: ${paymentUrl}`);
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