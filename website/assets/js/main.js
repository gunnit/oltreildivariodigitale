/**
 * Main JavaScript for Oltre il Divario Digitale
 * Handles navigation, animations, and interactive elements
 */

class WebsiteController {
    constructor() {
        this.isDebug = false;
        this.init();
    }

    init() {
        this.log('Initializing website...');
        this.initNavigation();
        this.initScrollAnimations();
        this.initNewsletterForm();
        this.initSmoothScrolling();
        this.initImageLoading();
        this.log('Website initialized successfully');
    }

    log(message) {
        if (this.isDebug) {
            console.log(`[WebsiteController] ${message}`);
        }
    }

    // Enhanced Navigation System
    initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const header = document.querySelector('.header');
        
        if (navToggle && navMenu) {
            // Mobile menu toggle
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu(navToggle, navMenu);
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!header.contains(e.target) && navMenu.classList.contains('active')) {
                    this.closeMobileMenu(navToggle, navMenu);
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    this.closeMobileMenu(navToggle, navMenu);
                }
            });
        }

        // Enhanced dropdown functionality
        this.initDropdowns();
        
        // Header scroll behavior
        this.initHeaderScroll();
    }

    toggleMobileMenu(navToggle, navMenu) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
        
        this.log(`Mobile menu ${isExpanded ? 'opened' : 'closed'}`);
    }

    closeMobileMenu(navToggle, navMenu) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    initDropdowns() {
        const dropdownToggles = document.querySelectorAll('.nav-menu [aria-haspopup="true"]');
        
        dropdownToggles.forEach(toggle => {
            const dropdownMenu = toggle.nextElementSibling;
            
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                // Desktop hover behavior
                if (window.innerWidth > 768) {
                    toggle.parentElement.addEventListener('mouseenter', () => {
                        dropdownMenu.style.display = 'block';
                        toggle.setAttribute('aria-expanded', 'true');
                    });

                    toggle.parentElement.addEventListener('mouseleave', () => {
                        dropdownMenu.style.display = 'none';
                        toggle.setAttribute('aria-expanded', 'false');
                    });
                } else {
                    // Mobile click behavior
                    toggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        const isVisible = dropdownMenu.style.display === 'block';
                        dropdownMenu.style.display = isVisible ? 'none' : 'block';
                        toggle.setAttribute('aria-expanded', !isVisible);
                    });
                }
            }
        });
    }

    initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // Scroll-triggered animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Add stagger effect for card grids
                    if (entry.target.classList.contains('cards-grid')) {
                        this.animateCards(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.card, .animate-on-scroll, .cards-grid');
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });

        this.log(`Observing ${animateElements.length} elements for animations`);
    }

    animateCards(cardGrid) {
        const cards = cardGrid.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('in-view');
            }, index * 150); // 150ms stagger
        });
    }

    // Enhanced newsletter form
    initNewsletterForm() {
        const forms = document.querySelectorAll('.newsletter-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(form);
            });

            // Real-time email validation
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput) {
                emailInput.addEventListener('blur', () => this.validateEmail(emailInput));
                emailInput.addEventListener('input', () => this.clearEmailError(emailInput));
            }
        });
    }

    validateEmail(input) {
        const email = input.value.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const errorElement = document.getElementById(`${input.id}-error`) || 
                           input.parentNode.querySelector('.error-message');
        
        if (!isValid && email !== '') {
            input.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Inserisci un indirizzo email valido';
                errorElement.classList.remove('sr-only');
            }
            return false;
        }
        
        input.classList.remove('error');
        if (errorElement) {
            errorElement.classList.add('sr-only');
        }
        return true;
    }

    clearEmailError(input) {
        input.classList.remove('error');
        const errorElement = document.getElementById(`${input.id}-error`) || 
                           input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.add('sr-only');
        }
    }

    async handleNewsletterSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const emailInput = form.querySelector('input[type="email"]');
        
        if (!this.validateEmail(emailInput)) {
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Iscrizione...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual newsletter service)
            await this.simulateNewsletterAPI(emailInput.value);
            
            // Success state
            this.showNotification('Iscrizione completata con successo! 🎉', 'success');
            emailInput.value = '';
            
        } catch (error) {
            this.showNotification('Errore durante l\'iscrizione. Riprova più tardi.', 'error');
            this.log(`Newsletter error: ${error.message}`);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateNewsletterAPI(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.95) {
                    reject(new Error('API Error'));
                } else {
                    resolve({ success: true, email });
                }
            }, 1500);
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Chiudi notifica">&times;</button>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            maxWidth: '400px',
            backgroundColor: type === 'success' ? '#10b981' : 
                           type === 'error' ? '#ef4444' : '#3b82f6',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.hideNotification(notification));

        // Auto-hide after 5 seconds
        setTimeout(() => this.hideNotification(notification), 5000);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }

    // Smooth scrolling for anchor links
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }

    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Lazy loading for images
    initImageLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
}

// Performance optimization: load after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.websiteController = new WebsiteController();
    window.cookieConsent = new CookieConsent();
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize dropdowns on resize to handle mobile/desktop switch
        if (window.websiteController) {
            window.websiteController.initDropdowns();
        }
    }, 250);
});

/**
 * Cookie Consent Manager
 * GDPR-compliant cookie consent and management
 */
class CookieConsent {
    constructor() {
        this.cookieName = 'cookie_consent';
        this.cookieExpiry = 365; // days
        this.consentGiven = false;
        this.preferences = {
            necessary: true,
            analytics: false
        };
        
        this.init();
    }

    init() {
        this.checkExistingConsent();
        this.bindEvents();
        
        // Show banner if no consent given
        if (!this.consentGiven) {
            setTimeout(() => this.showBanner(), 1000);
        } else {
            this.applyConsent();
        }
    }

    checkExistingConsent() {
        const consent = this.getCookie(this.cookieName);
        if (consent) {
            try {
                const data = JSON.parse(consent);
                this.consentGiven = true;
                this.preferences = { ...this.preferences, ...data.preferences };
            } catch (e) {
                console.warn('Invalid cookie consent data');
            }
        }
    }

    bindEvents() {
        // Banner buttons
        const acceptBtn = document.getElementById('cookie-accept');
        const necessaryBtn = document.getElementById('cookie-necessary');
        const settingsBtn = document.getElementById('cookie-settings');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAll());
        }
        if (necessaryBtn) {
            necessaryBtn.addEventListener('click', () => this.acceptNecessary());
        }
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showSettings());
        }

        // Modal controls
        const modalCloseBtn = document.getElementById('cookie-modal-close');
        const savePreferencesBtn = document.getElementById('cookie-save-preferences');
        const modal = document.getElementById('cookie-settings-modal');

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => this.hideSettings());
        }
        if (savePreferencesBtn) {
            savePreferencesBtn.addEventListener('click', () => this.savePreferences());
        }

        // Close modal on background click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideSettings();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideSettings();
            }
        });
    }

    showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.add('show', 'animate-in');
            banner.focus();
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    showSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            // Update checkboxes with current preferences
            const analyticsCheckbox = document.getElementById('analytics-cookies');
            if (analyticsCheckbox) {
                analyticsCheckbox.checked = this.preferences.analytics;
            }

            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus management
            const firstInput = modal.querySelector('input, button');
            if (firstInput) firstInput.focus();
        }
    }

    hideSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    acceptAll() {
        this.preferences = {
            necessary: true,
            analytics: true
        };
        this.saveConsent();
        this.hideBanner();
        this.applyConsent();
        
        // Show success message
        this.showNotification('✅ Tutti i cookie sono stati accettati. Grazie!');
    }

    acceptNecessary() {
        this.preferences = {
            necessary: true,
            analytics: false
        };
        this.saveConsent();
        this.hideBanner();
        this.applyConsent();
        
        this.showNotification('✅ Solo i cookie necessari sono stati accettati.');
    }

    savePreferences() {
        const analyticsCheckbox = document.getElementById('analytics-cookies');
        
        this.preferences = {
            necessary: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false
        };
        
        this.saveConsent();
        this.hideSettings();
        this.hideBanner();
        this.applyConsent();
        
        this.showNotification('✅ Le tue preferenze sui cookie sono state salvate.');
    }

    saveConsent() {
        const consentData = {
            timestamp: new Date().toISOString(),
            preferences: this.preferences,
            version: '1.0'
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consentData), this.cookieExpiry);
        this.consentGiven = true;
    }

    applyConsent() {
        // Apply analytics consent
        if (this.preferences.analytics) {
            this.enableGoogleAnalytics();
        } else {
            this.disableGoogleAnalytics();
        }
        
        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: { preferences: this.preferences }
        }));
    }

    enableGoogleAnalytics() {
        // Only enable if not already loaded and GA tracking ID exists
        if (!window.gtag && this.hasGoogleAnalytics()) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
                anonymize_ip: true,
                cookie_flags: 'secure;samesite=lax'
            });
            
            window.gtag = gtag;
        }
    }

    disableGoogleAnalytics() {
        // Disable GA tracking
        if (window.gtag) {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    hasGoogleAnalytics() {
        // Check if GA is configured (you would replace with actual GA ID)
        return document.querySelector('script[src*="googletagmanager.com"]') !== null;
    }

    showNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'cookie-notification';
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--sage-green);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            font-family: var(--font-body);
            font-size: 0.9rem;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Utility functions for cookie management
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const secure = location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secure}`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    // Public API for external use
    updatePreferences(newPreferences) {
        this.preferences = { ...this.preferences, ...newPreferences };
        this.saveConsent();
        this.applyConsent();
    }

    revokeConsent() {
        this.deleteCookie(this.cookieName);
        this.consentGiven = false;
        this.preferences = { necessary: true, analytics: false };
        this.applyConsent();
        this.showBanner();
    }

    getPreferences() {
        return { ...this.preferences };
    }
}