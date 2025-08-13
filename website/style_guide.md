# Style Guide - "Oltre il Divario Digitale" Website

## Overview
This style guide defines the visual identity, user experience principles, and technical specifications for the static website of "Oltre il Divario Digitale" - a comprehensive guide to AI adoption for Italian SMEs.

## Design Philosophy
- **Professional yet approachable**: Balancing authority with accessibility for Italian entrepreneurs
- **Italian heritage meets innovation**: Visual elements that honor traditional Italian craftsmanship while embracing modern technology
- **User-centric functionality**: Every element serves the reader's journey through AI transformation
- **Mobile-first responsive design**: Optimized for all devices and screen sizes

## Brand Identity

### Color Palette
**Primary Colors:**
- **Deep Italian Blue**: #003366 (Primary brand color, trustworthy and professional)
- **Warm Gold**: #FFD700 (Accent color, representing excellence and success)
- **Pure White**: #FFFFFF (Clean backgrounds and contrast)

**Secondary Colors:**
- **Sage Green**: #87A96B (Success states, growth indicators)
- **Warm Gray**: #F8F9FA (Light backgrounds, subtle sections)
- **Charcoal**: #2C3E50 (Body text, professional contrast)
- **Alert Red**: #E74C3C (Warnings, critical information)

**Gradient Combinations:**
- Hero sections: Linear gradient from Deep Italian Blue to lighter blue (#004080)
- Call-to-action buttons: Gold to deeper gold (#FFD700 to #FFA500)

### Typography

**Primary Font Stack:**
- **Headings**: 'Playfair Display', serif (Elegant, Italian-inspired)
- **Body Text**: 'Inter', sans-serif (Clean, highly readable)
- **Code/Technical**: 'Fira Code', monospace (For code examples)

**Font Hierarchy:**
- **H1**: 3rem (48px) - Page titles, hero headings
- **H2**: 2.5rem (40px) - Chapter titles, major sections
- **H3**: 2rem (32px) - Subsection headings
- **H4**: 1.5rem (24px) - Component headings
- **Body Large**: 1.25rem (20px) - Introductory paragraphs, important text
- **Body Regular**: 1rem (16px) - Standard body text
- **Body Small**: 0.875rem (14px) - Captions, metadata

## Layout System

### Grid Structure
- **Container Max Width**: 1200px
- **Breakpoints**:
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+
- **Column Grid**: 12-column flexible grid system
- **Gutters**: 20px on mobile, 30px on desktop

### Spacing Scale
Base unit: 8px
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)
- **3xl**: 64px (4rem)

## Component Library

### Navigation
**Header Navigation:**
- Sticky header with book logo and title
- Horizontal navigation menu (desktop) / Hamburger menu (mobile)
- Search functionality
- Progress indicator for reading journey

**Breadcrumbs:**
- Always visible on chapter pages
- Format: Home > Chapter # > Section
- Clear hierarchy and easy navigation

### Content Sections

**Hero Section:**
- Full-width background with subtle pattern or gradient
- Book title, subtitle, and compelling value proposition
- Primary CTA button
- Author credibility indicators

**Chapter Overview Cards:**
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Chapter number, title, estimated reading time
- Key topics preview (3-4 bullet points)
- Progress indicator if user is logged in
- "Start Reading" CTA

**Interactive Elements:**
- Quiz cards with distinctive styling
- Calculator/assessment widgets
- Progress bars and completion indicators
- Expandable/collapsible content sections

### Buttons and CTAs

**Primary Button:**
- Gold gradient background (#FFD700 to #FFA500)
- White text, bold weight
- Rounded corners (8px)
- Hover: Slight scale (1.05) and shadow
- Padding: 12px 24px

**Secondary Button:**
- Deep Italian Blue background (#003366)
- White text
- Same styling as primary but with blue background
- Hover: Lighter blue (#004080)

**Text Links:**
- Deep Italian Blue color
- Underline on hover
- Smooth transitions

### Cards and Containers

**Standard Card:**
- White background
- Subtle shadow: 0 2px 8px rgba(0,0,0,0.1)
- Rounded corners: 12px
- Padding: 24px
- Hover: Elevated shadow (0 4px 16px rgba(0,0,0,0.15))

**Feature Card:**
- Same as standard card
- Icon at the top (32x32px)
- Title, description, and optional CTA
- Consistent spacing and alignment

**Quote/Testimonial Card:**
- Light background (#F8F9FA)
- Italic text for quotes
- Bold attribution
- Optional company logo
- Left border accent in gold

### Icons and Graphics

**Icon Style:**
- Line-based icons with 2px stroke weight
- Consistent 24x24px grid system
- Primary color: Deep Italian Blue
- Hover states: Gold accent color

**Illustrations:**
- Subtle, professional illustrations
- Italian cultural elements when appropriate
- Consistent color palette
- SVG format for scalability

## Interactive Components

### Quizzes and Assessments
**Quiz Container:**
- Distinctive background color (very light blue tint)
- Clear question numbering
- Multiple choice with radio buttons or checkboxes
- Progress indicator
- Submit button with immediate feedback

**Results Display:**
- Score visualization with progress ring
- Color-coded results (green for good, amber for improvement needed)
- Actionable recommendations
- Social sharing options

### Calculators and Tools
**ROI Calculator:**
- Step-by-step form interface
- Real-time calculations
- Visual chart outputs
- Downloadable results
- Clear input labels and help text

**Assessment Tools:**
- Multi-section forms
- Progress saving functionality
- Visual progress indicators
- Comprehensive results with recommendations

## Content Formatting

### Text Content
**Paragraphs:**
- Line height: 1.6
- Maximum width: 70 characters for optimal readability
- Proper spacing between paragraphs (16px)

**Lists:**
- Consistent bullet styling
- Proper indentation and spacing
- Custom bullet points using brand colors

**Code Blocks:**
- Dark theme with syntax highlighting
- Copy-to-clipboard functionality
- Line numbers for longer examples
- Proper language specification

**Callout Boxes:**
- Different styles for tips, warnings, and important notes
- Color-coded backgrounds and borders
- Consistent icons and typography
- Proper contrast ratios

## SEO and Performance Optimization

### Technical SEO
- Semantic HTML5 structure
- Proper heading hierarchy (H1-H6)
- Alt text for all images
- Meta descriptions for each page (150-160 characters)
- Open Graph tags for social sharing
- Schema markup for book and article content

### Performance
- Optimized images (WebP format with fallbacks)
- Minified CSS and JavaScript
- Critical CSS inlined
- Lazy loading for images and non-critical content
- Font display: swap for custom fonts

### Accessibility
- WCAG 2.1 AA compliance
- Minimum contrast ratio of 4.5:1
- Keyboard navigation support
- Screen reader optimized content
- Focus indicators on all interactive elements

## Mobile Responsiveness

### Mobile-First Approach
- All components designed for mobile first
- Touch-friendly interface (minimum 44px touch targets)
- Readable text without zooming
- Horizontal scrolling eliminated

### Tablet Adaptations
- Optimized for both portrait and landscape
- Adjusted grid layouts
- Appropriate font sizes and spacing

### Desktop Enhancements
- Full utilization of available screen space
- Enhanced interactions (hover states)
- Multi-column layouts where appropriate
- Advanced navigation options

## Page Templates

### Homepage Template
- Hero section with book introduction
- Chapter overview grid
- Author section
- Social proof/testimonials
- Newsletter signup
- Footer with links and information

### Chapter Page Template
- Chapter header with title and description
- Reading progress indicator
- Main content area with proper typography
- Sidebar with chapter navigation
- Interactive elements (quizzes, tools)
- Related content suggestions
- Comment/discussion section

### Interactive Tool Page Template
- Tool-specific header
- Step-by-step interface
- Results/output section
- Related resources
- Help/FAQ section

## Animation and Interaction

### Micro-interactions
- Smooth transitions (0.3s ease-in-out)
- Hover effects on interactive elements
- Loading states with progress indicators
- Scroll-based animations for engagement

### Page Transitions
- Smooth loading between pages
- Content fade-in effects
- Progress preservation across navigation

## Content Strategy Integration

### Italian Cultural Elements
- Subtle references to Italian heritage in design
- Colors and imagery that resonate with Italian business culture
- Language that respects traditional values while embracing innovation

### Business Professional Tone
- Clean, professional aesthetic
- Trust-building elements (testimonials, credentials)
- Clear value propositions
- Action-oriented design

This style guide serves as the foundation for creating a cohesive, professional, and user-friendly website that effectively serves Italian entrepreneurs on their AI transformation journey.