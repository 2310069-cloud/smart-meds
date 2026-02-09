const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
function toggleMobileMenu(forceOpen) {
    const willOpen = typeof forceOpen === 'boolean' ? forceOpen : !hamburger.classList.contains('active');
    if (willOpen) {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

hamburger.addEventListener('click', () => toggleMobileMenu());

// Allow toggling with keyboard (Enter / Space)
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
    }
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 72; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('impact-card')) {
                const counter = entry.target.querySelector('.impact-number');
                if (counter && !counter.classList.contains('counted')) {
                    animateCounter(counter);
                }
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

function animateCounter(element) {
    element.classList.add('counted');
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            // Format number with decimal if needed
            if (target % 1 !== 0) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            // Final value
            if (target % 1 !== 0) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target;
            }
        }
    };
    
    updateCounter();
}

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
const dashboardMockup = document.querySelector('.dashboard-mockup');
if (dashboardMockup) {
    dashboardMockup.addEventListener('mouseenter', () => {
        const chartBars = dashboardMockup.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = 'chartGrow 1s ease-out';
                }, 10);
            }, index * 100);
        });
    });
}

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitButton = newsletterForm.querySelector('button');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            
            submitButton.innerHTML = '<i class="fas fa-check"></i>';
            submitButton.style.background = 'var(--primary-green)';
           
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
                emailInput.value = '';
            }, 2000);
        } else {
            emailInput.style.borderColor = 'var(--red)';
            setTimeout(() => {
                emailInput.style.borderColor = '';
            }, 2000);
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
}

// Add keyboard support for better accessibility
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu(false);
    }
    
    // Arrow keys for navigation (optional enhancement)
    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (e.key === 'End' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ 
            top: document.body.scrollHeight, 
            behavior: 'smooth' 
        });
    }
});
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Trigger initial animations for elements in viewport
    const initialElements = document.querySelectorAll('.fade-in');
    initialElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});
const cards = document.querySelectorAll('.feature-card, .user-card, .problem-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// Performance Optimization
// ===========================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}));

// ===========================
// Lazy Loading Images (if any)
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// CTA Button Interactions
// ===========================

const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===========================
// Console Welcome Message
// ===========================

console.log('%c🏥 SmartMeds - Medicine Stock Exchange Platform', 'color: #00C853; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for healthcare innovation', 'color: #2196F3; font-size: 14px;');
console.log('%cInterested in the tech stack? Check out our roadmap!', 'color: #757575; font-size: 12px;');

// ===========================
// Error Handling
// ===========================

window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// ===========================
// Service Worker (for PWA - optional)
// ===========================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ===========================
// Analytics Tracking (Placeholder)
// ===========================

function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Integrate with Google Analytics, Mixpanel, etc.
    // gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        trackEvent('CTA', 'click', buttonText);
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id || 'unknown';
            trackEvent('Section View', 'scroll', sectionId);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===========================
// Demo Interactions
// ===========================

// Handle demo button clicks
const demoButtons = document.querySelectorAll('a[href="#demo"]');
demoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🚀 Demo coming soon! We\'re putting final touches on the interactive demo. Stay tuned!');
    });
});

// Handle register buttons
const registerButtons = document.querySelectorAll('a[href="#register"]');
registerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📝 Registration portal opening soon! Join our waitlist at hello@smartmeds.in');
    });
});

// ===========================
// Screen Size Detection
// ===========================

function detectScreenSize() {
    const width = window.innerWidth;
    let size = 'desktop';
    
    if (width < 480) size = 'mobile-small';
    else if (width < 768) size = 'mobile';
    else if (width < 1024) size = 'tablet';
    
    document.body.setAttribute('data-screen', size);
    return size;
}

detectScreenSize();
window.addEventListener('resize', debounce(detectScreenSize, 250));

// ===========================
// Prefetch Links
// ===========================

// Prefetch important pages on hover for faster navigation
const prefetchLinks = document.querySelectorAll('a[href^="/"], a[href^="http"]');

prefetchLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const href = this.getAttribute('href');
        if (href && !this.dataset.prefetched) {
            const linkElement = document.createElement('link');
            linkElement.rel = 'prefetch';
            linkElement.href = href;
            document.head.appendChild(linkElement);
            this.dataset.prefetched = 'true';
        }
    }, { once: true });
});

// ===========================
// Focus Management
// ===========================

// Improve keyboard navigation focus visibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    body:not(.keyboard-nav) *:focus {
        outline: none;
    }
    
    body.keyboard-nav *:focus {
        outline: 2px solid var(--primary-green);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// ===========================
// Print Optimization
// ===========================

window.addEventListener('beforeprint', () => {
    console.log('Preparing page for print...');
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===========================
// Development Helpers
// ===========================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c🔧 Development Mode', 'color: #FFC107; font-size: 16px; font-weight: bold;');
    
    // Add development indicator
    const devBadge = document.createElement('div');
    devBadge.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 20px;
        padding: 8px 12px;
        background: #FFC107;
        color: #000;
        font-size: 12px;
        font-weight: 600;
        border-radius: 4px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    devBadge.textContent = 'DEV MODE';
    document.body.appendChild(devBadge);
}

console.log('%c✅ SmartMeds Platform Loaded Successfully', 'color: #00C853; font-size: 14px; font-weight: bold;');

