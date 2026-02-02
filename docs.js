// Documentation Site JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    initTheme();
    initNavigation();
    initSearch();
    initMobileMenu();
    initCodeHighlighting();
    initTableOfContents();
    initPageNavigation();
});

// Pages data for navigation
const pages = [
    { id: 'introduction', title: 'Introduction', category: 'Getting Started' },
    { id: 'advanced-features', title: 'Advanced Features', category: 'Spoofer' },
    { id: 'errors', title: 'Errors', category: 'Spoofer' },
    { id: 'advanced-features-fivem', title: 'Advanced Features', category: 'FiveM External' },
    { id: 'errors-fivem', title: 'Errors', category: 'FiveM External' }
];

let currentPageIndex = 0;

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('docs-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const docCards = document.querySelectorAll('.doc-card');
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            navigateToPage(pageId);
            closeMobileMenu();
        });
    });
    
    // Handle doc card clicks
    docCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = card.getAttribute('data-page');
            navigateToPage(pageId);
        });
    });
    
    // Handle hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const pageIndex = pages.findIndex(p => p.id === hash);
            if (pageIndex !== -1) {
                navigateToPage(hash);
            }
        }
    });
    
    // Check initial hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
        navigateToPage(initialHash);
    }
}

function navigateToPage(pageId) {
    // Update current page index
    currentPageIndex = pages.findIndex(p => p.id === pageId);
    if (currentPageIndex === -1) currentPageIndex = 0;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Update URL hash
    history.pushState(null, '', `#${pageId}`);
    
    // Update table of contents
    updateTableOfContents(targetPage);
    
    // Update page navigation
    updatePageNavigation();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchModal = document.getElementById('searchModal');
    const searchModalInput = document.getElementById('searchModalInput');
    const searchResults = document.getElementById('searchResults');
    
    // Open search modal on input click
    searchInput.addEventListener('click', () => {
        openSearchModal();
    });
    
    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearchModal();
        }
        
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });
    
    // Close modal on overlay click
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });
    
    // Handle search input
    searchModalInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        performSearch(query);
    });
    
    // Handle keyboard navigation in search
    searchModalInput.addEventListener('keydown', (e) => {
        const results = searchResults.querySelectorAll('.search-result-item');
        const activeResult = searchResults.querySelector('.search-result-item.active');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!activeResult && results.length > 0) {
                results[0].classList.add('active');
            } else if (activeResult && activeResult.nextElementSibling) {
                activeResult.classList.remove('active');
                activeResult.nextElementSibling.classList.add('active');
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeResult && activeResult.previousElementSibling) {
                activeResult.classList.remove('active');
                activeResult.previousElementSibling.classList.add('active');
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeResult) {
                const pageId = activeResult.getAttribute('data-page');
                navigateToPage(pageId);
                closeSearchModal();
            }
        }
    });
}

function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchModalInput = document.getElementById('searchModalInput');
    
    searchModal.classList.add('active');
    searchModalInput.focus();
    searchModalInput.value = '';
    document.getElementById('searchResults').innerHTML = '<div class="search-empty"><p>Type to search documentation...</p></div>';
}

function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.remove('active');
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!query) {
        searchResults.innerHTML = '<div class="search-empty"><p>Type to search documentation...</p></div>';
        return;
    }
    
    // Search through pages
    const results = pages.filter(page => {
        const pageEl = document.getElementById(`page-${page.id}`);
        if (!pageEl) return false;
        
        const text = pageEl.textContent.toLowerCase();
        return text.includes(query) || 
               page.title.toLowerCase().includes(query) ||
               page.category.toLowerCase().includes(query);
    });
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-empty"><p>No results found</p></div>';
        return;
    }
    
    // Display results
    searchResults.innerHTML = results.map((result, index) => `
        <a href="#${result.id}" class="search-result-item ${index === 0 ? 'active' : ''}" data-page="${result.id}">
            <div class="search-result-title">${result.title}</div>
            <div class="search-result-category">${result.category}</div>
        </a>
    `).join('');
    
    // Add click handlers to results
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = item.getAttribute('data-page');
            navigateToPage(pageId);
            closeSearchModal();
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', () => {
        closeMobileMenu();
    });
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Code Highlighting
function initCodeHighlighting() {
    // Initialize highlight.js
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

// Copy Code Function
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code');
    const text = code.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    });
}

// Make copyCode globally available
window.copyCode = copyCode;

// Table of Contents
function initTableOfContents() {
    const activePage = document.querySelector('.page:not(.hidden)');
    if (activePage) {
        updateTableOfContents(activePage);
    }
}

function updateTableOfContents(pageElement) {
    const tocList = document.getElementById('tocList');
    if (!tocList || !pageElement) return;
    
    const headings = pageElement.querySelectorAll('h2[id]');
    
    if (headings.length === 0) {
        tocList.innerHTML = '';
        return;
    }
    
    tocList.innerHTML = Array.from(headings).map(heading => `
        <li>
            <a href="#${heading.id}" class="toc-link" data-target="${heading.id}">
                ${heading.textContent}
            </a>
        </li>
    `).join('');
    
    // Add click handlers
    tocList.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Update active TOC item on scroll
    initTocScrollSpy(pageElement);
}

function initTocScrollSpy(pageElement) {
    const headings = pageElement.querySelectorAll('h2[id]');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (headings.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.toc-link[data-target="${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px'
    });
    
    headings.forEach(heading => observer.observe(heading));
}

// Page Navigation
function initPageNavigation() {
    updatePageNavigation();
}

function updatePageNavigation() {
    const prevLink = document.getElementById('prevPage');
    const nextLink = document.getElementById('nextPage');
    
    if (!prevLink || !nextLink) return;
    
    // Previous page
    if (currentPageIndex > 0) {
        const prevPage = pages[currentPageIndex - 1];
        prevLink.style.display = 'flex';
        prevLink.querySelector('.page-nav-title').textContent = prevPage.title;
        prevLink.onclick = (e) => {
            e.preventDefault();
            navigateToPage(prevPage.id);
        };
    } else {
        prevLink.style.display = 'none';
    }
    
    // Next page
    if (currentPageIndex < pages.length - 1) {
        const nextPage = pages[currentPageIndex + 1];
        nextLink.style.display = 'flex';
        nextLink.querySelector('.page-nav-title').textContent = nextPage.title;
        nextLink.onclick = (e) => {
            e.preventDefault();
            navigateToPage(nextPage.id);
        };
    } else {
        nextLink.style.display = 'none';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        // If it's a page navigation link, let the navigate function handle it
        if (this.classList.contains('nav-link') || this.classList.contains('doc-card')) {
            return;
        }
        
        // If it's a heading anchor, scroll to it
        if (targetElement && !targetElement.classList.contains('page')) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
