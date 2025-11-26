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
    
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    const videoStats = document.querySelector('.video-stats');
    if (videoStats) {
        // Initially hide stats
        const statItems = videoStats.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease';
        });
        
        statsObserver.observe(videoStats);
    }
    
    // Initialize TiltedCard for Menu Preview (Left)
    const sevMenuContainerLeft = document.getElementById('sevMenuCardLeft');
    if (sevMenuContainerLeft && window.createTiltedCard) {
        window.createTiltedCard(sevMenuContainerLeft, {
            id: 'sevMenuCardLeft',
            imageSrc: './sev_aim.png',
            altText: '',
            captionText: '',
            containerHeight: '500px',
            containerWidth: '500px',
            imageHeight: '500px',
            imageWidth: '500px',
            rotateAmplitude: 12,
            scaleOnHover: 1.15,
            showMobileWarning: false,
            showTooltip: true,
            displayOverlayContent: true,
            overlayContent: ''
        });
        console.log('Severance Menu TiltedCard (Left) initialized');
    }

    // Initialize TiltedCard for Menu Preview (Center)
    const sevMenuContainerCenter = document.getElementById('sevMenuCardCenter');
    if (sevMenuContainerCenter && window.createTiltedCard) {
        window.createTiltedCard(sevMenuContainerCenter, {
            id: 'sevMenuCardCenter',
            imageSrc: './sev_loader_no_bg_2.png',
            altText: '',
            captionText: '',
            containerHeight: '500px',
            containerWidth: '500px',
            imageHeight: '500px',
            imageWidth: '500px',
            rotateAmplitude: 12,
            scaleOnHover: 1.25,
            showMobileWarning: false,
            showTooltip: true,
            displayOverlayContent: true,
            overlayContent: ''
        });
        console.log('Severance Menu TiltedCard (Center) initialized');
    }

    // Initialize TiltedCard for Menu Preview (Right)
    const sevMenuContainerRight = document.getElementById('sevMenuCardRight');
    if (sevMenuContainerRight && window.createTiltedCard) {
        window.createTiltedCard(sevMenuContainerRight, {
            id: 'sevMenuCardRight',
            imageSrc: './sev_visuals.png',
            altText: '',
            captionText: '',
            containerHeight: '500px',
            containerWidth: '500px',
            imageHeight: '500px',
            imageWidth: '500px',
            rotateAmplitude: 12,
            scaleOnHover: 1.15,
            showMobileWarning: false,
            showTooltip: true,
            displayOverlayContent: true,
            overlayContent: ''
        });
        console.log('Severance Menu TiltedCard (Right) initialized');
    }
    
    console.log('Media preview functionality initialized');
});