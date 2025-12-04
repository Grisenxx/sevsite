document.addEventListener('DOMContentLoaded', function() {
    // Animate counter numbers
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Start counter animations
    setTimeout(() => {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
        });
    }, 1200);
    
    // Discord button click handler
    const discordBtn = document.getElementById('joinDiscordBtn');
    
    discordBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Simulate Discord redirect
    setTimeout(() => {
        window.open('https://discord.gg/mdm2BXQr8b', '_blank');
    }, 300);
    });
    
    // Add hover effects to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList[1]; // twitter, youtube, etc.
            alert(`Redirecting to ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`);
        });
    });
    
    // Add parallax effect to Discord card
    const discordCard = document.querySelector('.discord-card');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const x = (mouseX - 0.5) * 20;
        const y = (mouseY - 0.5) * 20;
        
        discordCard.style.transform = `translate(${x}px, ${y}px) rotateX(${y * 0.1}deg) rotateY(${x * 0.1}deg)`;
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
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.stat-card, .feature-item, .social-link');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add dynamic particle generation
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(16, 185, 129, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        // Random starting position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        // Animate upward
        const animation = particle.animate([
            { 
                transform: 'translateY(0px) scale(1)',
                opacity: 0.6
            },
            { 
                transform: `translateY(-${window.innerHeight + 100}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
    
    // Create floating particles periodically
    setInterval(createFloatingParticle, 2000);
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
