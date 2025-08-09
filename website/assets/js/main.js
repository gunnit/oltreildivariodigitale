/*!
 * Oltre il Divario Digitale - Main JavaScript
 * Production-ready interactive components and utilities
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // =============================================================================
    // UTILITIES
    // =============================================================================
    
    const Utils = {
        // DOM utilities (support global or scoped queries)
        $: (rootOrSelector, maybeSelector) => {
            if (typeof rootOrSelector === 'string') {
                return document.querySelector(rootOrSelector);
            }
            if (rootOrSelector && typeof maybeSelector === 'string') {
                return rootOrSelector.querySelector(maybeSelector);
            }
            return null;
        },
        $$: (rootOrSelector, maybeSelector) => {
            if (typeof rootOrSelector === 'string') {
                return Array.from(document.querySelectorAll(rootOrSelector));
            }
            if (rootOrSelector && typeof maybeSelector === 'string') {
                return Array.from(rootOrSelector.querySelectorAll(maybeSelector));
            }
            return [];
        },
        
        // Event utilities
        on: (element, event, handler) => element.addEventListener(event, handler),
        off: (element, event, handler) => element.removeEventListener(event, handler),
        
        // Class utilities
        addClass: (element, className) => element.classList.add(className),
        removeClass: (element, className) => element.classList.remove(className),
        toggleClass: (element, className) => element.classList.toggle(className),
        hasClass: (element, className) => element.classList.contains(className),
        
        // Storage utilities
        storage: {
            set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
            get: (key) => {
                try {
                    return JSON.parse(localStorage.getItem(key));
                } catch {
                    return null;
                }
            },
            remove: (key) => localStorage.removeItem(key)
        },
        
        // Animation utilities
        animate: (element, className, duration = 500) => {
            Utils.addClass(element, className);
            setTimeout(() => Utils.removeClass(element, className), duration);
        },
        
        // Debounce utility
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle utility
        throttle: (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        // Smooth scroll utility
        scrollTo: (target, duration = 800) => {
            const targetElement = typeof target === 'string' ? Utils.$(target) : target;
            if (!targetElement) return;
            
            const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    };

    // =============================================================================
    // NAVIGATION
    // =============================================================================
    
    const Navigation = {
        init() {
            this.setupMobileMenu();
            this.setupSmoothScrolling();
            this.setupActiveStates();
        },
        
        setupMobileMenu() {
            const toggle = Utils.$('.nav-toggle');
            const menu = Utils.$('.nav-menu');
            
            if (!toggle || !menu) return;
            
            Utils.on(toggle, 'click', () => {
                Utils.toggleClass(menu, 'active');
                Utils.toggleClass(toggle, 'active');
                
                // Update aria attributes
                const expanded = Utils.hasClass(menu, 'active');
                toggle.setAttribute('aria-expanded', expanded);
            });
            
            // Close menu on outside click
            Utils.on(document, 'click', (e) => {
                if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                    Utils.removeClass(menu, 'active');
                    Utils.removeClass(toggle, 'active');
                    toggle.setAttribute('aria-expanded', false);
                }
            });
            
            // Close menu on escape key
            Utils.on(document, 'keydown', (e) => {
                if (e.key === 'Escape' && Utils.hasClass(menu, 'active')) {
                    Utils.removeClass(menu, 'active');
                    Utils.removeClass(toggle, 'active');
                    toggle.setAttribute('aria-expanded', false);
                    toggle.focus();
                }
            });
        },
        
        setupSmoothScrolling() {
            const links = Utils.$$('a[href^="#"]');
            links.forEach(link => {
                Utils.on(link, 'click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') return;
                    
                    e.preventDefault();
                    Utils.scrollTo(href);
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                });
            });
        },
        
        setupActiveStates() {
            const links = Utils.$$('.nav-menu a');
            const currentPath = window.location.pathname;
            
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPath || (currentPath === '/' && href === 'index.html')) {
                    Utils.addClass(link, 'active');
                }
            });
        }
    };

    // =============================================================================
    // INTERACTIVE COMPONENTS
    // =============================================================================
    
    const Quiz = {
        init() {
            this.setupQuizzes();
        },
        
        setupQuizzes() {
            const quizzes = Utils.$$('.quiz-container');
            quizzes.forEach(quiz => this.initQuiz(quiz));
        },
        
        initQuiz(quizElement) {
            const questions = Utils.$$(quizElement, '.quiz-question');
            const options = Utils.$$(quizElement, '.quiz-option input');
            const nextBtn = Utils.$(quizElement, '.quiz-next');
            const prevBtn = Utils.$(quizElement, '.quiz-prev');
            const submitBtn = Utils.$(quizElement, '.quiz-submit');
            const progressFill = Utils.$(quizElement, '.quiz-progress-fill');
            const results = Utils.$(quizElement, '.quiz-results');
            
            let currentQuestion = 0;
            let answers = {};
            
            // Show first question
            this.showQuestion(questions, currentQuestion);
            this.updateProgress(progressFill, currentQuestion, questions.length);
            
            // Handle option selection
            options.forEach(option => {
                Utils.on(option, 'change', (e) => {
                    const questionIndex = parseInt(e.target.closest('.quiz-question').dataset.question);
                    answers[questionIndex] = e.target.value;
                    
                    // Enable next button if question is answered
                    if (nextBtn) {
                        nextBtn.disabled = false;
                    }
                });
            });
            
            // Handle next button
            if (nextBtn) {
                Utils.on(nextBtn, 'click', () => {
                    if (currentQuestion < questions.length - 1) {
                        currentQuestion++;
                        this.showQuestion(questions, currentQuestion);
                        this.updateProgress(progressFill, currentQuestion, questions.length);
                        nextBtn.disabled = true; // Disable until next question is answered
                    }
                });
            }
            
            // Handle previous button
            if (prevBtn) {
                Utils.on(prevBtn, 'click', () => {
                    if (currentQuestion > 0) {
                        currentQuestion--;
                        this.showQuestion(questions, currentQuestion);
                        this.updateProgress(progressFill, currentQuestion, questions.length);
                    }
                });
            }
            
            // Handle submit
            if (submitBtn) {
                Utils.on(submitBtn, 'click', () => {
                    const score = this.calculateScore(answers);
                    this.showResults(results, score);
                    Utils.storage.set('quiz-results', { answers, score, timestamp: Date.now() });
                });
            }
        },
        
        showQuestion(questions, index) {
            questions.forEach((q, i) => {
                q.style.display = i === index ? 'block' : 'none';
            });
        },
        
        updateProgress(progressElement, current, total) {
            if (!progressElement) return;
            const percentage = ((current + 1) / total) * 100;
            progressElement.style.width = percentage + '%';
        },
        
        calculateScore(answers) {
            // Simple scoring system - this would be customized per quiz
            const totalQuestions = Object.keys(answers).length;
            let correctAnswers = 0;
            
            // Example scoring logic
            Object.values(answers).forEach(answer => {
                // This would contain actual correct answers
                if (answer === 'correct') correctAnswers++;
            });
            
            return Math.round((correctAnswers / totalQuestions) * 100);
        },
        
        showResults(resultsElement, score) {
            if (!resultsElement) return;
            
            const resultHTML = `
                <div class="results-card">
                    <div class="results-number">${score}%</div>
                    <h4>Il Tuo Punteggio</h4>
                    <p>${this.getResultMessage(score)}</p>
                    <div class="mt-6">
                        <a href="#" class="btn btn-primary">Ripeti il Test</a>
                        <a href="#" class="btn btn-secondary">Scarica Report</a>
                    </div>
                </div>
            `;
            
            resultsElement.innerHTML = resultHTML;
            resultsElement.style.display = 'block';
            Utils.scrollTo(resultsElement);
        },
        
        getResultMessage(score) {
            if (score >= 80) {
                return 'Eccellente! La tua azienda è pronta per l\'adozione dell\'IA.';
            } else if (score >= 60) {
                return 'Buono! Ci sono alcune aree da migliorare prima dell\'implementazione.';
            } else if (score >= 40) {
                return 'Discreto. È necessario un piano di preparazione più approfondito.';
            } else {
                return 'È consigliabile iniziare con una formazione di base sull\'IA.';
            }
        }
    };

    // =============================================================================
    // CALCULATOR
    // =============================================================================
    
    const Calculator = {
        init() {
            this.setupCalculators();
        },
        
        setupCalculators() {
            const calculators = Utils.$$('.calculator-tool');
            calculators.forEach(calc => this.initCalculator(calc));
        },
        
        initCalculator(calcElement) {
            const inputs = Utils.$$(calcElement, '.form-control');
            const calculateBtn = Utils.$(calcElement, '.calculate-btn');
            const results = Utils.$(calcElement, '.calculator-results');
            
            // Real-time calculation on input change
            inputs.forEach(input => {
                Utils.on(input, 'input', Utils.debounce(() => {
                    this.calculate(calcElement);
                }, 300));
            });
            
            // Manual calculation button
            if (calculateBtn) {
                Utils.on(calculateBtn, 'click', () => {
                    this.calculate(calcElement);
                });
            }
            
            // Initial calculation
            this.calculate(calcElement);
        },
        
        calculate(calcElement) {
            const type = calcElement.dataset.calculatorType || 'roi';
            
            switch (type) {
                case 'roi':
                    this.calculateROI(calcElement);
                    break;
                case 'maturity':
                    this.calculateMaturity(calcElement);
                    break;
                default:
                    console.warn('Unknown calculator type:', type);
            }
        },
        
        calculateROI(calcElement) {
            const revenue = parseFloat(Utils.$(calcElement, '[name="revenue"]')?.value) || 0;
            const employees = parseInt(Utils.$(calcElement, '[name="employees"]')?.value) || 0;
            const budget = parseFloat(Utils.$(calcElement, '[name="budget"]')?.value) || 0;
            const sector = Utils.$(calcElement, '[name="sector"]')?.value || 'manufacturing';
            
            if (revenue === 0 || employees === 0 || budget === 0) {
                this.showCalculatorResults(calcElement, null);
                return;
            }
            
            // ROI Calculation Logic
            const sectorMultipliers = {
                manufacturing: 1.8,
                services: 1.5,
                commerce: 1.3,
                logistics: 2.1
            };
            
            const baseROI = sectorMultipliers[sector] || 1.5;
            const employeesFactor = Math.min(employees / 50, 2); // Cap at 2x
            const budgetFactor = Math.min(budget / 100000, 1.5); // Cap at 1.5x
            
            const roi = Math.round(baseROI * employeesFactor * budgetFactor * 100);
            const monthlyGains = Math.round((budget * (roi / 100)) / 24); // 2 years
            const paybackPeriod = Math.round(budget / monthlyGains);
            
            const results = {
                roi: roi,
                monthlyGains: monthlyGains,
                paybackPeriod: paybackPeriod,
                totalGains: monthlyGains * 24
            };
            
            this.showCalculatorResults(calcElement, results);
            Utils.storage.set('roi-calculation', { ...results, timestamp: Date.now() });
        },
        
        calculateMaturity(calcElement) {
            const inputs = Utils.$$(calcElement, 'input[type="range"]');
            let totalScore = 0;
            let maxScore = 0;
            
            inputs.forEach(input => {
                totalScore += parseInt(input.value);
                maxScore += parseInt(input.max);
            });
            
            const maturityScore = Math.round((totalScore / maxScore) * 100);
            const level = this.getMaturityLevel(maturityScore);
            
            const results = {
                score: maturityScore,
                level: level,
                recommendations: this.getMaturityRecommendations(maturityScore)
            };
            
            this.showMaturityResults(calcElement, results);
        },
        
        showCalculatorResults(calcElement, results) {
            const resultsContainer = Utils.$(calcElement, '.calculator-results');
            if (!resultsContainer) return;
            
            if (!results) {
                resultsContainer.innerHTML = '<p class="text-gray">Inserisci tutti i dati per vedere i risultati.</p>';
                return;
            }
            
            const resultHTML = `
                <div class="results-card">
                    <div class="results-number">${results.roi}%</div>
                    <h4>ROI Stimato (2 anni)</h4>
                    <p>Basato sui dati inseriti, la tua azienda potrebbe ottenere un ritorno sull'investimento del ${results.roi}% in 2 anni.</p>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-6">
                    <div class="card text-center">
                        <h5>Guadagno Mensile</h5>
                        <div class="text-2xl font-bold text-blue">€${results.monthlyGains.toLocaleString()}</div>
                    </div>
                    <div class="card text-center">
                        <h5>Periodo di Recupero</h5>
                        <div class="text-2xl font-bold text-blue">${results.paybackPeriod} mesi</div>
                    </div>
                </div>
                <div class="mt-6 text-center">
                    <button class="btn btn-primary" onclick="Calculator.downloadReport()">Scarica Report Dettagliato</button>
                </div>
            `;
            
            resultsContainer.innerHTML = resultHTML;
            resultsContainer.style.display = 'block';
        },
        
        getMaturityLevel(score) {
            if (score >= 80) return { name: 'Avanzato', color: 'green' };
            if (score >= 60) return { name: 'Intermedio', color: 'gold' };
            if (score >= 40) return { name: 'Base', color: 'orange' };
            return { name: 'Iniziale', color: 'red' };
        },
        
        getMaturityRecommendations(score) {
            if (score >= 80) {
                return ['Implementa soluzioni IA avanzate', 'Considera l\'automazione completa dei processi'];
            } else if (score >= 60) {
                return ['Espandi la formazione del personale', 'Implementa soluzioni IA specifiche'];
            } else if (score >= 40) {
                return ['Investi nella formazione digitale', 'Inizia con progetti pilota'];
            } else {
                return ['Valuta la cultura aziendale', 'Pianifica la trasformazione digitale'];
            }
        },

        showMaturityResults(calcElement, results) {
            const resultsContainer = Utils.$(calcElement, '.calculator-results');
            if (!resultsContainer) return;

            const recommendationsList = results.recommendations
                .map(rec => `<li>${rec}</li>`)
                .join('');

            const resultHTML = `
                <div class="results-card">
                    <div class="results-number">${results.score}%</div>
                    <h4>Livello di Maturità: ${results.level.name}</h4>
                    <p>La valutazione complessiva della maturità digitale della tua azienda è ${results.score}%. Colore livello: ${results.level.color}.</p>
                </div>
                <div class="card mt-6">
                    <h5>Raccomandazioni Prioritarie</h5>
                    <ul class="list-disc pl-6">
                        ${recommendationsList}
                    </ul>
                </div>
                <div class="mt-6 text-center">
                    <a href="../tools/roi-calculator.html" class="btn btn-secondary">Stima il ROI</a>
                    <button class="btn btn-primary ml-2" onclick="Calculator.downloadReport()">Scarica Report</button>
                </div>
            `;

            resultsContainer.innerHTML = resultHTML;
            resultsContainer.style.display = 'block';
        },
        
        downloadReport() {
            const results = Utils.storage.get('roi-calculation');
            if (!results) return;
            
            // Generate PDF or detailed report
            const reportData = {
                timestamp: new Date(results.timestamp).toLocaleDateString('it-IT'),
                ...results
            };
            
            // For now, just log the data - in production, this would generate a PDF
            console.log('Report data:', reportData);
            alert('Funzionalità di download in sviluppo. I risultati sono stati salvati localmente.');
        }
    };

    // =============================================================================
    // INTERACTIVE FEATURES
    // =============================================================================
    
    const InteractiveFeatures = {
        init() {
            this.setupCopyButtons();
            this.setupAccordions();
            this.setupProgressBars();
            this.setupLazyLoading();
        },
        
        setupCopyButtons() {
            const copyButtons = Utils.$$('.copy-button');
            copyButtons.forEach(button => {
                Utils.on(button, 'click', async (e) => {
                    e.preventDefault();
                    
                    const codeBlock = button.closest('.code-block');
                    const code = Utils.$(codeBlock, 'code').textContent;
                    
                    try {
                        await navigator.clipboard.writeText(code);
                        const originalText = button.textContent;
                        button.textContent = 'Copiato!';
                        Utils.addClass(button, 'success');
                        
                        setTimeout(() => {
                            button.textContent = originalText;
                            Utils.removeClass(button, 'success');
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy:', err);
                        button.textContent = 'Errore';
                    }
                });
            });
        },
        
        setupAccordions() {
            const accordions = Utils.$$('.accordion-header');
            accordions.forEach(header => {
                Utils.on(header, 'click', () => {
                    const content = header.nextElementSibling;
                    const isExpanded = Utils.hasClass(header, 'expanded');
                    
                    // Close all other accordions
                    accordions.forEach(h => {
                        Utils.removeClass(h, 'expanded');
                        h.nextElementSibling.style.maxHeight = null;
                    });
                    
                    // Toggle current accordion
                    if (!isExpanded) {
                        Utils.addClass(header, 'expanded');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            });
        },
        
        setupProgressBars() {
            const progressBars = Utils.$$('.progress-bar');
            
            const observerCallback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressFill = Utils.$(entry.target, '.progress-fill');
                        const targetWidth = progressFill.dataset.width || '75%';
                        
                        // Animate progress bar
                        setTimeout(() => {
                            progressFill.style.width = targetWidth;
                        }, 200);
                    }
                });
            };
            
            const observer = new IntersectionObserver(observerCallback, {
                threshold: 0.5
            });
            
            progressBars.forEach(bar => observer.observe(bar));
        },
        
        setupLazyLoading() {
            const images = Utils.$$('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        Utils.addClass(img, 'loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    };

    // =============================================================================
    // ANALYTICS AND TRACKING
    // =============================================================================
    
    const Analytics = {
        init() {
            this.trackPageView();
            this.setupEventTracking();
        },
        
        trackPageView() {
            // Integration point for analytics platforms
            if (typeof gtag !== 'undefined') {
                gtag('config', 'GA_MEASUREMENT_ID', {
                    page_title: document.title,
                    page_location: window.location.href
                });
            }
        },
        
        setupEventTracking() {
            // Track button clicks
            const buttons = Utils.$$('.btn, button');
            buttons.forEach(button => {
                Utils.on(button, 'click', (e) => {
                    this.trackEvent('click', 'button', button.textContent.trim());
                });
            });
            
            // Track quiz completions
            Utils.on(document, 'quiz-completed', (e) => {
                this.trackEvent('complete', 'quiz', e.detail.score);
            });
            
            // Track calculator usage
            Utils.on(document, 'calculation-completed', (e) => {
                this.trackEvent('calculate', 'roi', e.detail.roi);
            });
        },
        
        trackEvent(action, category, label, value) {
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    event_category: category,
                    event_label: label,
                    value: value
                });
            }
            
            // Console log for development
            console.log('Event tracked:', { action, category, label, value });
        }
    };

    // =============================================================================
    // PERFORMANCE MONITORING
    // =============================================================================
    
    const Performance = {
        init() {
            this.monitorPageLoad();
            this.monitorUserExperience();
        },
        
        monitorPageLoad() {
            window.addEventListener('load', () => {
                // Core Web Vitals monitoring
                if ('PerformanceObserver' in window) {
                    // Largest Contentful Paint
                    new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        console.log('LCP:', lastEntry.startTime);
                    }).observe({ entryTypes: ['largest-contentful-paint'] });
                    
                    // First Input Delay
                    new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        entries.forEach(entry => {
                            console.log('FID:', entry.processingStart - entry.startTime);
                        });
                    }).observe({ entryTypes: ['first-input'] });
                    
                    // Cumulative Layout Shift
                    new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        entries.forEach(entry => {
                            if (!entry.hadRecentInput) {
                                console.log('CLS:', entry.value);
                            }
                        });
                    }).observe({ entryTypes: ['layout-shift'] });
                }
            });
        },
        
        monitorUserExperience() {
            // Track page visibility
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.trackTimeOnPage();
                }
            });
            
            // Track scroll depth
            let maxScroll = 0;
            const trackScroll = Utils.throttle(() => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
                );
                maxScroll = Math.max(maxScroll, scrollPercent);
            }, 100);
            
            Utils.on(window, 'scroll', trackScroll);
            
            // Track before page unload
            Utils.on(window, 'beforeunload', () => {
                Analytics.trackEvent('scroll_depth', 'engagement', 'max_scroll', maxScroll);
            });
        },
        
        trackTimeOnPage() {
            const timeOnPage = Date.now() - this.startTime;
            Analytics.trackEvent('time_on_page', 'engagement', 'seconds', Math.round(timeOnPage / 1000));
        }
    };

    // =============================================================================
    // INITIALIZATION
    // =============================================================================
    
    const App = {
        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }
        },
        
        start() {
            console.log('🚀 Oltre il Divario Digitale - Website initialized');
            
            // Initialize components
            Navigation.init();
            Quiz.init();
            Calculator.init();
            InteractiveFeatures.init();
            Analytics.init();
            Performance.init();
            
            // Set start time for performance tracking
            Performance.startTime = Date.now();
            
            // Announce that the app is ready
            document.dispatchEvent(new CustomEvent('app-ready'));
        }
    };

    // Global namespace
    window.OIDD = {
        Utils,
        Navigation,
        Quiz,
        Calculator,
        InteractiveFeatures,
        Analytics,
        Performance,
        App
    };

    // Auto-initialize
    App.init();

})();
