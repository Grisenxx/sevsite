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
            
            if (target === 99.9) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Start counter animation after page load
    setTimeout(() => {
        const uptimeValue = document.querySelector('.status-card.green .status-value');
        if (uptimeValue) {
            animateCounter(uptimeValue, 99.9);
        }
    }, 1600);
    
    // Add click handlers for action buttons
    const discordBtn = document.querySelector('.action-btn.discord');
    const storeBtn = document.querySelector('.action-btn.store');
    
    discordBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
        
        setTimeout(() => {
        window.open('https://discord.gg/severancee', '_blank');
    }, 300);
        // Here you would redirect to Discord
    });
    
    storeBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
        
        window.location.href = 'store.html';
    });
    
    // Add hover effects to status cards
    const statusCards = document.querySelectorAll('.status-card');
    
    statusCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const cardClass = this.classList[1]; // green, blue, purple
            let glowColor;
            
            switch(cardClass) {
                case 'green': glowColor = 'rgba(16, 185, 129, 0.4)'; break;
                case 'blue': glowColor = 'rgba(59, 130, 246, 0.4)'; break;
                case 'purple': glowColor = 'rgba(168, 85, 247, 0.4)'; break;
                default: glowColor = 'rgba(16, 185, 129, 0.4)';
            }
            
            this.style.boxShadow = `0 25px 50px ${glowColor}`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Real-time status updates simulation
    function updateStatusFeed() {
        const feedContainer = document.querySelector('.feed-container');
        const currentTime = new Date();
        const timeString = `${currentTime.getMinutes()} min ago`;
        
        // Create new status update
        const newItem = document.createElement('div');
        newItem.className = 'feed-item';
        newItem.style.opacity = '0';
        newItem.style.transform = 'translateY(-20px)';
        
        newItem.innerHTML = `
            <div class="feed-time">${timeString}</div>
            <div class="feed-status operational">
                <i class="fas fa-check-circle"></i>
                <span>System health check completed - All systems operational</span>
            </div>
        `;
        
        // Insert at the beginning
        feedContainer.insertBefore(newItem, feedContainer.firstChild);
        
        // Animate in
        setTimeout(() => {
            newItem.style.transition = 'all 0.5s ease';
            newItem.style.opacity = '1';
            newItem.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove oldest item if more than 5 items
        const items = feedContainer.querySelectorAll('.feed-item');
        if (items.length > 5) {
            const lastItem = items[items.length - 1];
            lastItem.style.transition = 'all 0.5s ease';
            lastItem.style.opacity = '0';
            lastItem.style.transform = 'translateY(20px)';
            setTimeout(() => {
                lastItem.remove();
            }, 500);
        }
    }
    
    // Update status feed every 30 seconds
    setInterval(updateStatusFeed, 30000);
    
    // Add parallax effect to security badge
    const securityBadge = document.querySelector('.security-badge');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const x = (mouseX - 0.5) * 10;
        const y = (mouseY - 0.5) * 10;
        
        securityBadge.style.transform = `translate(${x}px, ${y}px)`;
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
    const animatedElements = document.querySelectorAll('.status-card, .security-badge, .action-buttons, .status-feed');
    animatedElements.forEach(el => observer.observe(el));
});