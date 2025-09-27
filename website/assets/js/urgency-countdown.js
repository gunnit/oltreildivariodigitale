// Urgency Countdown Timer and Stock Counter
(function() {
    'use strict';

    // Configuration
    const OFFER_END_TIME = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
    const INITIAL_STOCK = 5;
    const MIN_STOCK = 2;
    const STOCK_DECREASE_INTERVAL = 3600000; // Decrease stock every hour

    // Create countdown timer element
    function createCountdownTimer() {
        const timerHTML = `
            <div id="urgency-banner" class="urgency-banner">
                <div class="urgency-container">
                    <div class="urgency-content">
                        <div class="urgency-icon">⚡</div>
                        <div class="urgency-message">
                            <strong>OFFERTA LIMITATA!</strong>
                            <span class="urgency-discount">40% di SCONTO</span>
                        </div>
                        <div class="countdown-timer" id="countdown-timer">
                            <div class="time-unit">
                                <span class="time-value" id="hours">23</span>
                                <span class="time-label">ORE</span>
                            </div>
                            <div class="time-separator">:</div>
                            <div class="time-unit">
                                <span class="time-value" id="minutes">59</span>
                                <span class="time-label">MIN</span>
                            </div>
                            <div class="time-separator">:</div>
                            <div class="time-unit">
                                <span class="time-value" id="seconds">59</span>
                                <span class="time-label">SEC</span>
                            </div>
                        </div>
                        <div class="stock-counter">
                            <span class="stock-icon">📚</span>
                            Solo <span id="stock-count" class="stock-number">5</span> copie rimaste a questo prezzo!
                        </div>
                    </div>
                    <button class="urgency-cta" onclick="window.location.href='https://www.amazon.it/dp/B0FMKGMMKS'">
                        ACQUISTA ORA →
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', timerHTML);
    }

    // Update countdown timer
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = OFFER_END_TIME - now;

        if (distance < 0) {
            document.getElementById('urgency-banner').innerHTML = `
                <div class="urgency-container expired">
                    <div class="urgency-content">
                        <strong>OFFERTA SCADUTA!</strong>
                        <a href="https://www.amazon.it/dp/B0FMKGMMKS" class="expired-link">
                            Acquista al prezzo normale →
                        </a>
                    </div>
                </div>
            `;
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // Add urgency class when less than 1 hour
        if (hours === 0 && minutes < 60) {
            document.getElementById('countdown-timer').classList.add('urgent');
        }
    }

    // Stock counter logic
    function updateStock() {
        let currentStock = localStorage.getItem('bookStock') || INITIAL_STOCK;
        const lastUpdate = localStorage.getItem('lastStockUpdate') || Date.now();
        const timeDiff = Date.now() - lastUpdate;

        if (timeDiff > STOCK_DECREASE_INTERVAL && currentStock > MIN_STOCK) {
            currentStock--;
            localStorage.setItem('bookStock', currentStock);
            localStorage.setItem('lastStockUpdate', Date.now());
        }

        const stockElement = document.getElementById('stock-count');
        if (stockElement) {
            stockElement.textContent = currentStock;
            if (currentStock <= 3) {
                stockElement.classList.add('low-stock');
            }
        }
    }

    // Floating buy button
    function createFloatingButton() {
        const floatingHTML = `
            <div id="floating-buy" class="floating-buy-button">
                <span class="floating-price">
                    <del>€39.99</del>
                    <strong>€23.99</strong>
                </span>
                <button class="floating-cta" onclick="window.location.href='https://www.amazon.it/dp/B0FMKGMMKS'">
                    🛒 ACQUISTA ORA
                </button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', floatingHTML);

        // Show/hide based on scroll
        window.addEventListener('scroll', function() {
            const floatingBtn = document.getElementById('floating-buy');
            if (window.pageYOffset > 300) {
                floatingBtn.classList.add('visible');
            } else {
                floatingBtn.classList.remove('visible');
            }
        });
    }

    // Sales notification popup
    function showSalesNotification() {
        const names = [
            'Marco da Milano', 'Laura da Roma', 'Giuseppe da Napoli',
            'Anna da Torino', 'Francesco da Bologna', 'Chiara da Firenze',
            'Alessandro da Venezia', 'Sofia da Palermo', 'Luca da Genova',
            'Giulia da Verona', 'Matteo da Bari', 'Sara da Catania'
        ];

        const randomName = names[Math.floor(Math.random() * names.length)];
        const minutesAgo = Math.floor(Math.random() * 30) + 1;

        const notificationHTML = `
            <div id="sales-notification" class="sales-notification">
                <div class="notification-content">
                    <img src="/assets/images/bookcover.png" alt="Book" class="notification-book">
                    <div class="notification-text">
                        <strong>${randomName}</strong> ha appena acquistato il libro
                        <span class="notification-time">${minutesAgo} minuti fa</span>
                    </div>
                </div>
                <button class="notification-close" onclick="this.parentElement.remove()">×</button>
            </div>
        `;

        // Remove existing notification if any
        const existing = document.getElementById('sales-notification');
        if (existing) existing.remove();

        document.body.insertAdjacentHTML('beforeend', notificationHTML);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            const notification = document.getElementById('sales-notification');
            if (notification) {
                notification.classList.add('hide');
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }

    // Exit intent popup
    function createExitIntentPopup() {
        let exitIntentShown = sessionStorage.getItem('exitIntentShown');

        if (!exitIntentShown) {
            document.addEventListener('mouseout', function(e) {
                if (e.clientY < 10 && !exitIntentShown) {
                    const popupHTML = `
                        <div id="exit-popup" class="exit-popup">
                            <div class="exit-popup-overlay"></div>
                            <div class="exit-popup-content">
                                <button class="exit-popup-close" onclick="document.getElementById('exit-popup').remove()">×</button>
                                <h2 class="exit-popup-title">ASPETTA! Non perdere questa opportunità!</h2>
                                <div class="exit-popup-offer">
                                    <div class="exit-discount">
                                        <span class="discount-badge">SCONTO ESCLUSIVO</span>
                                        <span class="discount-amount">50% OFF</span>
                                    </div>
                                    <p class="exit-message">
                                        Usa il codice <strong class="promo-code">NONANDARE50</strong>
                                        per ricevere uno sconto extra del 10%!
                                    </p>
                                    <div class="exit-benefits">
                                        ✅ ROI Calculator Gratuito incluso<br>
                                        ✅ Accesso a 15+ Casi Studio<br>
                                        ✅ Supporto email prioritario<br>
                                        ✅ Garanzia soddisfatti o rimborsati
                                    </div>
                                    <button class="exit-cta" onclick="window.location.href='https://www.amazon.it/dp/B0FMKGMMKS'">
                                        APPLICA SCONTO E ACQUISTA →
                                    </button>
                                    <p class="exit-disclaimer">* Offerta valida solo per oggi</p>
                                </div>
                            </div>
                        </div>
                    `;

                    document.body.insertAdjacentHTML('beforeend', popupHTML);
                    sessionStorage.setItem('exitIntentShown', 'true');
                    exitIntentShown = true;
                }
            });
        }
    }

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        createCountdownTimer();
        createFloatingButton();
        createExitIntentPopup();

        // Update countdown every second
        setInterval(updateCountdown, 1000);

        // Update stock every minute
        setInterval(updateStock, 60000);
        updateStock(); // Initial update

        // Show sales notifications periodically
        setTimeout(() => {
            showSalesNotification();
            setInterval(showSalesNotification, 45000); // Every 45 seconds
        }, 10000); // First notification after 10 seconds
    });

    // Add CSS styles
    const styles = `
        <style>
        /* Urgency Banner */
        .urgency-banner {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
            color: white;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }

        .urgency-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1400px;
            margin: 0 auto;
            padding: 10px 20px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .urgency-content {
            display: flex;
            align-items: center;
            gap: 20px;
            flex: 1;
        }

        .urgency-icon {
            font-size: 28px;
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }

        .urgency-message {
            display: flex;
            flex-direction: column;
        }

        .urgency-discount {
            background: rgba(255,255,255,0.2);
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 4px;
        }

        .countdown-timer {
            display: flex;
            align-items: center;
            gap: 5px;
            font-family: 'Courier New', monospace;
        }

        .countdown-timer.urgent .time-value {
            color: #ffeb3b;
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .time-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(0,0,0,0.2);
            padding: 5px 10px;
            border-radius: 6px;
        }

        .time-value {
            font-size: 24px;
            font-weight: bold;
            line-height: 1;
        }

        .time-label {
            font-size: 10px;
            opacity: 0.9;
            margin-top: 2px;
        }

        .time-separator {
            font-size: 20px;
            font-weight: bold;
        }

        .stock-counter {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.2);
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: 600;
        }

        .stock-number {
            background: white;
            color: #cc0000;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: bold;
        }

        .stock-number.low-stock {
            animation: shake 0.5s infinite;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .urgency-cta {
            background: white;
            color: #cc0000;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .urgency-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        /* Floating Buy Button */
        .floating-buy-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            border-radius: 50px;
            padding: 15px 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 9998;
            transform: translateY(200px);
            transition: transform 0.5s ease;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .floating-buy-button.visible {
            transform: translateY(0);
        }

        .floating-price {
            display: flex;
            flex-direction: column;
            color: #003366;
        }

        .floating-price del {
            font-size: 14px;
            opacity: 0.7;
        }

        .floating-price strong {
            font-size: 20px;
        }

        .floating-cta {
            background: #003366;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .floating-cta:hover {
            background: #002244;
            transform: scale(1.05);
        }

        /* Sales Notification */
        .sales-notification {
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            padding: 15px;
            z-index: 9997;
            max-width: 300px;
            animation: slideIn 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        @keyframes slideIn {
            from { transform: translateX(-400px); }
            to { transform: translateX(0); }
        }

        .sales-notification.hide {
            animation: slideOut 0.5s ease;
        }

        @keyframes slideOut {
            to { transform: translateX(-400px); }
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .notification-book {
            width: 40px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
        }

        .notification-text {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .notification-text strong {
            color: #003366;
            font-size: 14px;
        }

        .notification-time {
            font-size: 12px;
            color: #666;
        }

        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            color: #999;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        }

        /* Exit Intent Popup */
        .exit-popup {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .exit-popup-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
        }

        .exit-popup-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
        }

        .exit-popup-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 30px;
            color: #999;
            cursor: pointer;
        }

        .exit-popup-title {
            color: #cc0000;
            font-size: 28px;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .exit-discount {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px 0;
        }

        .discount-badge {
            background: #cc0000;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .discount-amount {
            font-size: 48px;
            font-weight: bold;
            color: #FFD700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .promo-code {
            background: #f0f0f0;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 18px;
            color: #cc0000;
        }

        .exit-benefits {
            text-align: left;
            background: #f9f9f9;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            line-height: 1.8;
        }

        .exit-cta {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #003366;
            border: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 20px rgba(255,215,0,0.4);
        }

        .exit-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(255,215,0,0.5);
        }

        .exit-disclaimer {
            font-size: 12px;
            color: #999;
            margin-top: 15px;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .urgency-container {
                flex-direction: column;
                text-align: center;
            }

            .urgency-content {
                flex-direction: column;
            }

            .time-value {
                font-size: 18px;
            }

            .floating-buy-button {
                bottom: 20px;
                right: 20px;
                left: 20px;
                border-radius: 30px;
            }

            .sales-notification {
                left: 10px;
                right: 10px;
                max-width: none;
            }

            .exit-popup-content {
                padding: 25px;
            }

            .exit-popup-title {
                font-size: 22px;
            }

            .discount-amount {
                font-size: 36px;
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
})();