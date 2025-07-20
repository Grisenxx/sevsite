document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Add floating animation with different delays
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mouseenter', function() {
            // Add glow effect based on card color
            const cardClass = this.classList[1]; // green, blue, purple, etc.
            let glowColor;
            
            switch(cardClass) {
                case 'green': glowColor = 'rgba(16, 185, 129, 0.4)'; break;
                case 'blue': glowColor = 'rgba(59, 130, 246, 0.4)'; break;
                case 'purple': glowColor = 'rgba(168, 85, 247, 0.4)'; break;
                case 'orange': glowColor = 'rgba(249, 115, 22, 0.4)'; break;
                case 'teal': glowColor = 'rgba(45, 212, 191, 0.4)'; break;
                case 'red': glowColor = 'rgba(248, 113, 113, 0.4)'; break;
                default: glowColor = 'rgba(16, 185, 129, 0.4)';
            }
            
            this.style.boxShadow = `0 25px 50px ${glowColor}`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-15px) rotateX(0deg) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) rotateX(0deg) scale(1.02)';
            }, 150);
        });
    });
    
    // Add parallax effect to badges
    const badges = document.querySelectorAll('.badge');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        badges.forEach((badge, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            badge.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
});