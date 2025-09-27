// Email Capture System with Free Chapter Offer
(function() {
    'use strict';

    // Configuration
    const FREE_CHAPTER_URL = '/assets/downloads/capitolo-1-preview.pdf';
    const EMAIL_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with actual endpoint

    function createEmailCaptureModal() {
        const modalHTML = `
            <div id="email-modal" class="email-modal" style="display: none;">
                <div class="email-modal-overlay"></div>
                <div class="email-modal-content">
                    <button class="email-modal-close" onclick="document.getElementById('email-modal').style.display='none'">×</button>

                    <div class="email-modal-header">
                        <div class="gift-icon">🎁</div>
                        <h2>Ricevi GRATIS il Primo Capitolo!</h2>
                        <p class="modal-subtitle">
                            Scopri come 200+ PMI italiane stanno aumentando la produttività del +47% con l'IA
                        </p>
                    </div>

                    <div class="email-benefits">
                        <div class="benefit-item">
                            <span class="check-icon">✅</span>
                            <span>Capitolo 1 completo (valore €9.99)</span>
                        </div>
                        <div class="benefit-item">
                            <span class="check-icon">✅</span>
                            <span>ROI Calculator Excel Template</span>
                        </div>
                        <div class="benefit-item">
                            <span class="check-icon">✅</span>
                            <span>Checklist implementazione IA</span>
                        </div>
                        <div class="benefit-item">
                            <span class="check-icon">✅</span>
                            <span>Codice sconto esclusivo -10%</span>
                        </div>
                    </div>

                    <form id="email-form" class="email-form">
                        <input type="text" id="fname" placeholder="Il tuo nome" required>
                        <input type="email" id="email" placeholder="La tua email aziendale" required>
                        <input type="text" id="company" placeholder="Nome azienda (opzionale)">

                        <button type="submit" class="email-submit-btn">
                            📧 INVIA IL MIO CAPITOLO GRATUITO
                        </button>
                    </form>

                    <div class="privacy-note">
                        <span>🔒 Privacy garantita. Zero spam. Cancellati quando vuoi.</span>
                    </div>

                    <div class="urgency-note">
                        ⏰ Offerta limitata: Solo per i prossimi <span id="email-timer">100</span> iscritti
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    function createFloatingEmailButton() {
        const buttonHTML = `
            <div id="email-float-btn" class="email-float-button">
                <div class="email-float-content">
                    <span class="free-badge">GRATIS</span>
                    <span class="float-text">📖 Leggi il 1° Capitolo</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', buttonHTML);

        document.getElementById('email-float-btn').addEventListener('click', showEmailModal);
    }

    function showEmailModal() {
        const modal = document.getElementById('email-modal');
        if (modal) {
            modal.style.display = 'block';
            // Track modal open event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_modal_open', {
                    'event_category': 'engagement',
                    'event_label': 'free_chapter_modal'
                });
            }
        }
    }

    function handleEmailSubmit(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('fname').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value || 'Not provided',
            source: 'free_chapter_offer',
            timestamp: new Date().toISOString()
        };

        // Show success immediately (optimistic UI)
        showSuccessMessage(formData.email);

        // Send to backend (replace with your actual endpoint)
        fetch(EMAIL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(response => {
            if (response.ok) {
                // Track conversion
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'generate_lead', {
                        'currency': 'EUR',
                        'value': 9.99,
                        'event_category': 'engagement',
                        'event_label': 'free_chapter_download'
                    });
                }
            }
        }).catch(error => {
            console.error('Error submitting email:', error);
        });
    }

    function showSuccessMessage(email) {
        const modalContent = document.querySelector('.email-modal-content');
        modalContent.innerHTML = `
            <div class="success-content">
                <div class="success-icon">🎉</div>
                <h2>Perfetto! Controlla la tua email</h2>
                <p>Abbiamo inviato il primo capitolo a:</p>
                <p class="email-display">${email}</p>

                <div class="next-steps">
                    <h3>Prossimi passi:</h3>
                    <ol>
                        <li>Controlla la tua email (anche nello spam)</li>
                        <li>Scarica il capitolo gratuito</li>
                        <li>Usa il codice sconto <strong>CAPITOLO10</strong> per -10% extra</li>
                    </ol>
                </div>

                <a href="https://www.amazon.it/dp/B0FMKGMMKS" class="success-cta" target="_blank" rel="noopener">
                    🛒 ACQUISTA IL LIBRO COMPLETO (-40% + 10% EXTRA)
                </a>

                <button onclick="document.getElementById('email-modal').style.display='none'" class="close-success">
                    Chiudi
                </button>
            </div>
        `;
    }

    // Create inline email capture sections
    function createInlineCaptures() {
        const inlineHTML = `
            <div class="inline-email-capture">
                <div class="inline-capture-content">
                    <div class="inline-capture-text">
                        <h3>🎁 Vuoi leggere il primo capitolo GRATIS?</h3>
                        <p>Scopri se questo libro fa per te. Nessuna carta di credito richiesta.</p>
                    </div>
                    <button class="inline-capture-btn" onclick="document.getElementById('email-modal').style.display='block'">
                        SCARICA CAPITOLO GRATUITO →
                    </button>
                </div>
            </div>
        `;

        // Insert after every 3rd section
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if ((index + 1) % 3 === 0) {
                section.insertAdjacentHTML('afterend', inlineHTML);
            }
        });
    }

    // Add abandoned cart recovery
    function setupAbandonedCartRecovery() {
        let abandonTimer;

        // Track when user shows intent to leave
        document.addEventListener('mouseleave', function() {
            if (!sessionStorage.getItem('emailCaptured')) {
                abandonTimer = setTimeout(showEmailModal, 3000);
            }
        });

        // Cancel if they come back
        document.addEventListener('mouseenter', function() {
            clearTimeout(abandonTimer);
        });
    }

    // Add styles
    const styles = `
        <style>
        /* Email Modal */
        .email-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
        }

        .email-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
        }

        .email-modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 25px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
            max-height: 90vh;
            overflow-y: auto;
        }

        .email-modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 30px;
            color: #999;
            cursor: pointer;
            transition: color 0.3s;
        }

        .email-modal-close:hover {
            color: #333;
        }

        .email-modal-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .gift-icon {
            font-size: 60px;
            margin-bottom: 20px;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .email-modal-header h2 {
            color: #003366;
            font-size: 28px;
            margin-bottom: 10px;
        }

        .modal-subtitle {
            color: #64748b;
            font-size: 16px;
        }

        .email-benefits {
            background: #f8fafc;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
        }

        .benefit-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }

        .benefit-item:last-child {
            margin-bottom: 0;
        }

        .check-icon {
            color: #10b981;
            font-size: 20px;
        }

        .email-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .email-form input {
            padding: 15px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        .email-form input:focus {
            outline: none;
            border-color: #003366;
        }

        .email-submit-btn {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #003366;
            border: none;
            padding: 18px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
        }

        .email-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(255, 215, 0, 0.4);
        }

        .privacy-note {
            text-align: center;
            color: #94a3b8;
            font-size: 14px;
            margin-top: 20px;
        }

        .urgency-note {
            text-align: center;
            background: #fef2f2;
            color: #dc2626;
            padding: 10px;
            border-radius: 10px;
            margin-top: 15px;
            font-weight: 600;
        }

        /* Floating Email Button */
        .email-float-button {
            position: fixed;
            left: 30px;
            bottom: 100px;
            background: linear-gradient(135deg, #003366, #0066cc);
            border-radius: 50px;
            padding: 15px 25px;
            box-shadow: 0 10px 30px rgba(0, 51, 102, 0.4);
            cursor: pointer;
            z-index: 9996;
            transition: all 0.3s ease;
            animation: slideInLeft 0.5s ease;
        }

        @keyframes slideInLeft {
            from { transform: translateX(-100px); }
            to { transform: translateX(0); }
        }

        .email-float-button:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 51, 102, 0.5);
        }

        .email-float-content {
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
        }

        .free-badge {
            background: #dc2626;
            padding: 4px 8px;
            border-radius: 5px;
            font-size: 12px;
            font-weight: bold;
        }

        .float-text {
            font-weight: 600;
        }

        /* Inline Email Capture */
        .inline-email-capture {
            background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
            border: 2px solid #0369a1;
            border-radius: 20px;
            padding: 40px;
            margin: 60px auto;
            max-width: 800px;
            text-align: center;
        }

        .inline-capture-content h3 {
            color: #003366;
            font-size: 24px;
            margin-bottom: 10px;
        }

        .inline-capture-content p {
            color: #64748b;
            margin-bottom: 20px;
        }

        .inline-capture-btn {
            background: #003366;
            color: white;
            border: none;
            padding: 15px 35px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .inline-capture-btn:hover {
            background: #002244;
            transform: translateY(-2px);
        }

        /* Success Content */
        .success-content {
            text-align: center;
            padding: 20px;
        }

        .success-icon {
            font-size: 80px;
            margin-bottom: 20px;
        }

        .success-content h2 {
            color: #10b981;
            margin-bottom: 15px;
        }

        .email-display {
            background: #f3f4f6;
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: bold;
            color: #003366;
            margin: 15px 0;
        }

        .next-steps {
            text-align: left;
            background: #f8fafc;
            padding: 20px;
            border-radius: 15px;
            margin: 25px 0;
        }

        .next-steps h3 {
            color: #003366;
            margin-bottom: 15px;
        }

        .next-steps ol {
            color: #475569;
            line-height: 1.8;
            padding-left: 20px;
        }

        .success-cta {
            display: inline-block;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #003366;
            padding: 18px 40px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: bold;
            margin: 20px 0;
            transition: all 0.3s ease;
        }

        .success-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
        }

        .close-success {
            background: transparent;
            color: #94a3b8;
            border: 2px solid #e5e7eb;
            padding: 10px 30px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .close-success:hover {
            background: #f3f4f6;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .email-modal-content {
                padding: 30px 20px;
            }

            .email-modal-header h2 {
                font-size: 22px;
            }

            .email-float-button {
                left: 10px;
                bottom: 80px;
                padding: 12px 20px;
            }

            .inline-email-capture {
                padding: 25px 15px;
                margin: 40px 15px;
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        createEmailCaptureModal();
        createFloatingEmailButton();
        createInlineCaptures();
        setupAbandonedCartRecovery();

        // Handle form submission
        const form = document.getElementById('email-form');
        if (form) {
            form.addEventListener('submit', handleEmailSubmit);
        }

        // Countdown for limited spots
        let spots = 100;
        setInterval(() => {
            spots = Math.max(spots - 1, 12);
            const timer = document.getElementById('email-timer');
            if (timer) {
                timer.textContent = spots;
            }
        }, 30000); // Decrease every 30 seconds
    });
})();