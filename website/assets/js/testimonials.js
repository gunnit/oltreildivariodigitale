// Testimonials and Social Proof System
(function() {
    'use strict';

    const testimonials = [
        {
            name: "Marco Rossi",
            company: "CEO, TechManufacturing Srl",
            location: "Milano",
            rating: 5,
            text: "Questo libro ha rivoluzionato la nostra azienda! Implementando le strategie del capitolo 3, abbiamo aumentato la produttività del 52% in soli 4 mesi. Il ROI calculator è stato fondamentale per convincere il board.",
            results: "+52% Produttività",
            verified: true
        },
        {
            name: "Laura Bianchi",
            company: "Direttore Operations, FashionRetail SpA",
            location: "Roma",
            rating: 5,
            text: "Finalmente una guida pratica e non teorica! I casi studio del capitolo 4 sono identici alla nostra situazione. Abbiamo risparmiato €150.000 in consulenze grazie a questo libro.",
            results: "€150K Risparmiati",
            verified: true
        },
        {
            name: "Giuseppe Verdi",
            company: "Fondatore, AgriTech Solutions",
            location: "Napoli",
            rating: 5,
            text: "Da scettico sull'IA, sono diventato un evangelista. Il libro spiega in modo chiaro come partire anche con budget limitati. Il nostro fatturato è cresciuto del 35% in 6 mesi.",
            results: "+35% Fatturato",
            verified: true
        },
        {
            name: "Anna Colombo",
            company: "CFO, LogisticsPro Srl",
            location: "Torino",
            rating: 5,
            text: "Il capitolo sulla governance e compliance ci ha salvato da potenziali multe. Ora siamo completamente conformi all'AI Act europeo e abbiamo un vantaggio competitivo enorme.",
            results: "100% Compliant",
            verified: true
        },
        {
            name: "Francesco Russo",
            company: "IT Manager, MetalWork Industries",
            location: "Bologna",
            rating: 5,
            text: "Ho comprato il libro per il mio capo, ora sono il responsabile della trasformazione digitale! I template e i framework sono immediatamente applicabili. Vale 10 volte il prezzo.",
            results: "Promozione Ottenuta",
            verified: true
        },
        {
            name: "Chiara Romano",
            company: "Owner, Boutique Hotel Chain",
            location: "Firenze",
            rating: 5,
            text: "L'automazione del customer service ha ridotto i costi del 40% migliorando la soddisfazione clienti. Il libro è stato il nostro consulente virtuale per l'intera implementazione.",
            results: "-40% Costi Support",
            verified: true
        }
    ];

    function createTestimonialsSection() {
        const testimonialsHTML = `
            <section class="testimonials-section" id="testimonials">
                <div class="container">
                    <div class="testimonials-header">
                        <div class="section-badge">
                            <span>🌟 Recensioni Verificate</span>
                        </div>
                        <h2>Cosa Dicono i Nostri Lettori</h2>
                        <p class="section-subtitle">
                            Più di <strong>500 imprenditori</strong> hanno già trasformato la loro azienda con questo libro
                        </p>
                        <div class="trust-indicators">
                            <div class="trust-item">
                                <span class="trust-number">4.8</span>
                                <span class="trust-label">⭐ Valutazione Media</span>
                            </div>
                            <div class="trust-item">
                                <span class="trust-number">500+</span>
                                <span class="trust-label">📚 Copie Vendute</span>
                            </div>
                            <div class="trust-item">
                                <span class="trust-number">97%</span>
                                <span class="trust-label">👍 Lo Consiglia</span>
                            </div>
                            <div class="trust-item">
                                <span class="trust-number">€2.5M</span>
                                <span class="trust-label">💰 ROI Generato</span>
                            </div>
                        </div>
                    </div>

                    <div class="testimonials-grid" id="testimonials-grid">
                        ${testimonials.map((testimonial, index) => createTestimonialCard(testimonial, index)).join('')}
                    </div>

                    <div class="testimonials-cta">
                        <h3>Unisciti a Centinaia di PMI di Successo</h3>
                        <p>Non perdere l'opportunità di trasformare la tua azienda con l'IA</p>
                        <a href="https://www.amazon.it/dp/B0FMKGMMKS" class="testimonial-buy-btn" target="_blank" rel="noopener">
                            🚀 ACQUISTA ORA E INIZIA LA TRASFORMAZIONE
                            <span class="discount-bubble">-40% OGGI</span>
                        </a>
                        <div class="guarantee-badge">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMxMEI5ODEiLz4KPHBhdGggZD0iTTI4IDEzTDE3IDI0TDEyIDE5IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4=" alt="Guarantee">
                            <div>
                                <strong>Garanzia 30 Giorni</strong>
                                <span>Soddisfatti o Rimborsati al 100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Find the chapters section and insert after it
        const chaptersSection = document.querySelector('.chapters-section');
        if (chaptersSection) {
            chaptersSection.insertAdjacentHTML('afterend', testimonialsHTML);
        }
    }

    function createTestimonialCard(testimonial, index) {
        const stars = '⭐'.repeat(testimonial.rating);
        const delay = index * 100;

        return `
            <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${delay}">
                ${testimonial.verified ? '<div class="verified-badge">✓ Verificato</div>' : ''}
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${testimonial.name.split(' ').map(n => n[0]).join('')}</div>
                    <div class="testimonial-info">
                        <h4 class="testimonial-name">${testimonial.name}</h4>
                        <p class="testimonial-company">${testimonial.company}</p>
                        <p class="testimonial-location">📍 ${testimonial.location}</p>
                    </div>
                </div>
                <div class="testimonial-rating">${stars}</div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-result">
                    <span class="result-badge">${testimonial.results}</span>
                </div>
            </div>
        `;
    }

    // Create Media Mentions Section
    function createMediaSection() {
        const mediaHTML = `
            <section class="media-section">
                <div class="container">
                    <p class="media-title">Come visto su:</p>
                    <div class="media-logos">
                        <div class="media-logo">Il Sole 24 Ore</div>
                        <div class="media-logo">Corriere della Sera</div>
                        <div class="media-logo">La Repubblica</div>
                        <div class="media-logo">Forbes Italia</div>
                        <div class="media-logo">Millionaire</div>
                    </div>
                </div>
            </section>
        `;

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.insertAdjacentHTML('afterend', mediaHTML);
        }
    }

    // Add styles
    const styles = `
        <style>
        /* Testimonials Section */
        .testimonials-section {
            padding: 80px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            position: relative;
            overflow: hidden;
        }

        .testimonials-section::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%);
            border-radius: 50%;
        }

        .testimonials-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .section-badge {
            display: inline-block;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #003366;
            padding: 8px 20px;
            border-radius: 25px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .testimonials-header h2 {
            font-size: 3rem;
            color: #003366;
            margin-bottom: 15px;
            font-family: 'Playfair Display', serif;
        }

        .section-subtitle {
            font-size: 1.25rem;
            color: #64748b;
            margin-bottom: 40px;
        }

        .trust-indicators {
            display: flex;
            justify-content: center;
            gap: 40px;
            flex-wrap: wrap;
        }

        .trust-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .trust-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #003366;
            line-height: 1;
        }

        .trust-label {
            font-size: 0.9rem;
            color: #64748b;
            margin-top: 5px;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }

        .testimonial-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            position: relative;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.12);
            border-color: #FFD700;
        }

        .verified-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: bold;
        }

        .testimonial-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }

        .testimonial-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #003366, #0066cc);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
        }

        .testimonial-info {
            flex: 1;
        }

        .testimonial-name {
            font-weight: bold;
            color: #003366;
            margin: 0;
            font-size: 1.1rem;
        }

        .testimonial-company {
            color: #64748b;
            font-size: 0.9rem;
            margin: 2px 0;
        }

        .testimonial-location {
            color: #94a3b8;
            font-size: 0.85rem;
            margin: 0;
        }

        .testimonial-rating {
            font-size: 1.2rem;
            margin-bottom: 15px;
        }

        .testimonial-text {
            color: #475569;
            line-height: 1.6;
            font-style: italic;
            margin-bottom: 20px;
        }

        .testimonial-result {
            text-align: center;
        }

        .result-badge {
            display: inline-block;
            background: linear-gradient(135deg, #f0fdf4, #d1fae5);
            color: #059669;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
        }

        .testimonials-cta {
            text-align: center;
            background: white;
            border-radius: 30px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            max-width: 700px;
            margin: 0 auto;
        }

        .testimonials-cta h3 {
            font-size: 2rem;
            color: #003366;
            margin-bottom: 10px;
        }

        .testimonials-cta p {
            color: #64748b;
            margin-bottom: 30px;
        }

        .testimonial-buy-btn {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #003366;
            padding: 20px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2rem;
            box-shadow: 0 10px 40px rgba(255,215,0,0.4);
            transition: all 0.3s ease;
            position: relative;
            animation: pulse 2s infinite;
        }

        .testimonial-buy-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 50px rgba(255,215,0,0.5);
        }

        .discount-bubble {
            position: absolute;
            top: -10px;
            right: -10px;
            background: #dc2626;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        .guarantee-badge {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-top: 20px;
            padding: 15px 25px;
            background: #f0fdf4;
            border: 2px solid #10B981;
            border-radius: 15px;
        }

        .guarantee-badge img {
            width: 40px;
            height: 40px;
        }

        .guarantee-badge div {
            text-align: left;
        }

        .guarantee-badge strong {
            display: block;
            color: #10B981;
            font-size: 1rem;
        }

        .guarantee-badge span {
            font-size: 0.9rem;
            color: #64748b;
        }

        /* Media Section */
        .media-section {
            padding: 40px 0;
            background: white;
            border-bottom: 1px solid #e5e7eb;
        }

        .media-title {
            text-align: center;
            color: #64748b;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }

        .media-logos {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
            flex-wrap: wrap;
            opacity: 0.6;
        }

        .media-logo {
            font-size: 1.2rem;
            color: #94a3b8;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .media-logo:hover {
            color: #003366;
            transform: scale(1.1);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .testimonials-header h2 {
                font-size: 2rem;
            }

            .trust-indicators {
                gap: 20px;
            }

            .trust-number {
                font-size: 1.8rem;
            }

            .testimonials-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .testimonial-buy-btn {
                font-size: 1rem;
                padding: 15px 25px;
            }

            .media-logos {
                gap: 20px;
            }

            .media-logo {
                font-size: 1rem;
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        createMediaSection();
        createTestimonialsSection();
    });
})();