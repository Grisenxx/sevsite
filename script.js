// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const lightBtn = document.getElementById('lightBtn');
    const darkBtn = document.getElementById('darkBtn');
    
    // Add click handlers for theme buttons (if they exist)
    if (lightBtn) {
        lightBtn.addEventListener('click', function() {
            console.log('Light theme clicked');
            // You can add light theme functionality here
        });
    }
    
    if (darkBtn) {
        darkBtn.addEventListener('click', function() {
            console.log('Dark theme clicked');
            // You can add dark theme functionality here
        });
    }
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Navigation links should work normally - NO preventDefault!
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Just log for debugging, but let the link work normally
            console.log('Navigation clicked:', this.textContent.trim());
            // Don't prevent default - let the links work!
        });
    });
});