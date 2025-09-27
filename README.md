# Oltre il Divario Digitale

[![Deployment Status](https://img.shields.io/badge/status-live-green)](https://oltreildivariodigitale.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **La prima guida pratica che mostra alle PMI italiane come implementare l'Intelligenza Artificiale in 6 mesi, con investimenti sostenibili e risultati misurabili dal primo giorno.**

## 📖 Panoramica

"Oltre il Divario Digitale" è un progetto web completo che accompagna l'omonimo libro di **Gregor Maric**, fornendo strumenti interattivi, casi studio e risorse pratiche per le PMI italiane che vogliono implementare l'Intelligenza Artificiale nei loro processi aziendali.

## 🚀 Caratteristiche Principali

### 📚 Contenuti del Libro
- **7 capitoli completi** con metodologie testate su 200+ PMI italiane
- **15+ casi studio reali** di successo nell'implementazione IA
- **Roadmap di trasformazione** di 24 settimane
- **Framework strategico** specifico per la cultura aziendale italiana

### 🛠 Strumenti Interattivi
- **Calcolatore ROI IA**: Algoritmo professionale per stimare il ritorno sull'investimento
- **Test di Maturità Digitale**: Assessment sviluppato con Confindustria
- **Test di Preparazione IA**: Valutazione della readiness aziendale
- **Template scaricabili**: Checklist operative e strumenti pratici

### 📊 Risultati Verificati
- **+47% produttività media** nelle PMI che hanno seguito la metodologia
- **-34% costi operativi** attraverso l'automazione intelligente
- **+28% margini di profitto** con l'ottimizzazione IA
- **ROI medio in 6-12 mesi** dall'implementazione

## 🏗 Struttura del Progetto

```
oltreildivariodigitale/
├── website/
│   ├── index.html                 # Homepage principale
│   ├── pages/
│   │   ├── chapters/              # Capitoli del libro
│   │   │   ├── capitolo-1.html    # Il Grande Paradosso Italiano
│   │   │   ├── capitolo-2.html    # Fondamenti dell'IA e Automazione
│   │   │   ├── capitolo-3.html    # Costruire una Strategia su Misura
│   │   │   ├── capitolo-4.html    # Casi Veri di Successo
│   │   │   ├── capitolo-5.html    # Leadership e Change Management
│   │   │   ├── capitolo-6.html    # Governance, Etica e Conformità
│   │   │   └── capitolo-7.html    # Agenti Intelligenti e Futuro
│   │   ├── tools/                 # Strumenti interattivi
│   │   │   ├── roi-calculator.html
│   │   │   ├── maturity-assessment.html
│   │   │   └── ai-readiness.html
│   │   ├── regioni/               # Analisi per regione
│   │   ├── about-author.html      # Profilo autore
│   │   ├── case-studies.html      # Raccolta casi studio
│   │   ├── resources.html         # Risorse e download
│   │   ├── prefazione.html        # Prefazione del libro
│   │   └── glossario.html         # Glossario termini IA
│   ├── assets/
│   │   ├── css/                   # Fogli di stile
│   │   ├── js/                    # Script JavaScript
│   │   └── images/                # Immagini e icone
│   ├── manifest.json              # Web App Manifest
│   ├── robots.txt                 # SEO directives
│   └── sitemap.xml                # Mappa del sito
├── style_guide.md                 # Guida di stile del progetto
└── README.md                      # Questo file
```

## 🎯 Capitoli del Libro

1. **Il Grande Paradosso Italiano** - Analisi del divario digitale nelle PMI
2. **Fondamenti dell'IA e Automazione** - Come le PMI possono competere con i colossi
3. **Costruire una Strategia su Misura** - Metodologie specifiche per il contesto italiano
4. **Casi Veri di Successo** - 15+ storie reali di trasformazione
5. **Leadership e Change Management** - Il fattore umano nella trasformazione IA
6. **Governance, Etica e Conformità** - Navigare l'AI Act europeo e GDPR
7. **Agenti Intelligenti e Futuro** - Preparazione per l'evoluzione dell'IA

## 🛠 Tecnologie Utilizzate

- **HTML5** - Struttura semantica e accessibile
- **CSS3** - Design responsivo e moderno
- **JavaScript (Vanilla)** - Interattività e funzionalità dinamiche
- **Schema.org** - Structured data per SEO e AI agents
- **Web App Manifest** - PWA capabilities
- **Google Fonts** - Typography (Playfair Display, Inter, Fira Code)

## 🚀 Installazione e Setup

### Requisiti
- Web server (Apache, Nginx, o server di sviluppo)
- Browser moderno con supporto ES6+

### Setup Locale
```bash
# Clona il repository
git clone https://github.com/gunnit/oltreildivariodigitale.git

# Naviga nella cartella del progetto
cd oltreildivariodigitale

# Avvia un server locale (esempio con Python)
python -m http.server 8000

# Oppure con Node.js
npx serve website
```

Visita `http://localhost:8000/website` per visualizzare il sito.

## 🌐 Deploy

Il sito è ottimizzato per il deploy su:
- **Netlify** (configurazione automatica)
- **Vercel** (zero-config deployment)
- **GitHub Pages** (documenti statici)
- **Server tradizionali** (Apache/Nginx)

### Configurazione Domini
Il sito è configurato per funzionare su:
- Dominio principale: `https://oltreildivariodigitale.com`
- Domini alternativi: configurabili nel DNS

## 📈 SEO e Performance

### Ottimizzazioni Implementate
- **Core Web Vitals** ottimizzati per performance
- **Structured Data** completi per rich snippets
- **Meta tags** ottimizzati per social sharing
- **Sitemap XML** automatica
- **Robot.txt** configurato
- **Lazy loading** per immagini e contenuti
- **Critical CSS** inline per faster rendering
- **AI-friendly markup** per assistenti virtuali

### Analytics e Tracking
- Google Analytics 4 configurato
- Pixel di conversione per strumenti
- Tracciamento eventi per ROI calculator
- Heatmap e user behavior analytics ready

## 📱 Accessibilità

Il sito rispetta le linee guida **WCAG 2.1 AA**:
- Navigazione da tastiera completa
- Screen reader compatibility
- Contrasti colore conformi
- Testi alternativi per immagini
- Struttura semantica HTML5

## 🔧 Sviluppo e Contributi

### Branch Strategy
- `main` - Produzione (auto-deploy)
- `develop` - Sviluppo e test
- `feature/*` - Nuove funzionalità

### Code Style
Seguire le linee guida definite in `style_guide.md`:
- HTML semantico e accessibile
- CSS modulare con convenzioni BEM
- JavaScript vanilla con ES6+
- Commenti in italiano per contenuti, inglese per codice

## 📊 Metriche e KPI

### Performance Targets
- **Lighthouse Score** > 90 su tutte le metriche
- **LCP** < 2.5s (Largest Contentful Paint)
- **FID** < 100ms (First Input Delay)  
- **CLS** < 0.1 (Cumulative Layout Shift)

### Business Metrics
- Conversioni calcolatore ROI
- Download dei template
- Tempo di permanenza sui capitoli
- Condivisioni social

## 🤝 Autore

**Gregor Maric**
- CEO di PugliAI
- LinkedIn Instructor  
- Esperto IA per PMI con 15+ anni di esperienza
- Ex consulente strategico presso PwC, Accenture, EY, KPMG

### Collegamenti
- 🔗 [LinkedIn](https://www.linkedin.com/in/maricgregor)
- 🐦 [Twitter](https://twitter.com/gregormaric) 
- 📺 [YouTube - RPA Champion](https://www.youtube.com/c/RPAChampion)
- 📧 [Email](mailto:gregor@pugliai.com)
- 📞 [Prenota una Call](https://calendly.com/maric-gregor/15min)

## 📖 Acquista il Libro

- 📚 [Amazon Italia](https://www.amazon.it/dp/B0FMKGMMKS)
- 🌐 [Sito Web Ufficiale](https://oltreildivariodigitale.com)

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

---

**🇮🇹 Made in Italy** con passione per l'innovazione nelle PMI italiane.

*Per supporto tecnico o domande sul progetto, apri una issue o contatta direttamente l'autore.*