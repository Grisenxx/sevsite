window.createTiltedCard = function(container, options) {
    if (!container) return;

    const {
        imageSrc,
        altText = 'Image',
        captionText = '',
        containerHeight = '400px',
        containerWidth = '400px',
        imageHeight = '100%',
        imageWidth = '100%',
        rotateAmplitude = 20,
        scaleOnHover = 1.1,
        showMobileWarning = false,
        showTooltip = true,
        displayOverlayContent = false,
        overlayContent = ''
    } = options;

    // Create structure
    container.style.perspective = '1000px';
    container.style.width = containerWidth;
    container.style.height = containerHeight;
    container.style.position = 'relative';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';

    const card = document.createElement('div');
    card.className = 'tilted-card-inner';
    card.style.width = imageWidth;
    card.style.height = imageHeight;
    card.style.position = 'relative';
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.1s ease-out';
    card.style.cursor = 'pointer';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = altText;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '15px';
    // img.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)'; // Removed shadow for transparent png

    card.appendChild(img);
    
    if (displayOverlayContent && overlayContent) {
        const overlay = document.createElement('div');
        overlay.className = 'tilted-card-overlay';
        overlay.innerHTML = overlayContent;
        overlay.style.position = 'absolute';
        overlay.style.bottom = '20px';
        overlay.style.left = '20px';
        overlay.style.color = 'white';
        overlay.style.transform = 'translateZ(30px)';
        overlay.style.textShadow = '0 2px 4px rgba(0,0,0,0.8)';
        overlay.style.pointerEvents = 'none';
        card.appendChild(overlay);
    }

    container.appendChild(card);

    // Mouse events
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -rotateAmplitude;
        const rotateY = ((x - centerX) / centerX) * rotateAmplitude;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`;
    });

    container.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
};
