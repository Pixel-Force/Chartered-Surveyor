# Chartered Surveyor — RICS Regulated Independent Practice

[![RICS Regulated](https://img.shields.io/badge/RICS-Regulated%20Firm-0b1f3a?style=for-the-badge&logo=shield)](https://www.rics.org)
[![Valuer Registration Scheme](https://img.shields.io/badge/VRS-Registered%20Valuers-c5a059?style=for-the-badge)](https://www.rics.org)
[![Pyramus & Thisbe](https://img.shields.io/badge/Party%20Wall-Pyramus%20%26%20Thisbe%20Member-1b4332?style=for-the-badge)](https://www.partywalls.org.uk)
[![Status](https://img.shields.io/badge/Deployment-Live%20Production-success?style=for-the-badge)](#live-deployments)

A high-end, responsive corporate web platform for **Chartered Surveyor** — a prestigious British Royal Institution of Chartered Surveyors (RICS) regulated independent surveying and valuation practice.

---

## 🌐 Live Deployments & Repositories

| Organization | Live Demo URL | GitHub Repository |
| :--- | :--- | :--- |
| **Penta-Websites** | [https://penta-websites.github.io/Chartered-Surveyor/](https://penta-websites.github.io/Chartered-Surveyor/) | [Penta-Websites/Chartered-Surveyor](https://github.com/Penta-Websites/Chartered-Surveyor) |
| **Pixel-Force** | [https://pixel-force.github.io/Chartered-Surveyor/](https://pixel-force.github.io/Chartered-Surveyor/) | [Pixel-Force/Chartered-Surveyor](https://github.com/Pixel-Force/Chartered-Surveyor) |

---

## ✨ Key Features & Architecture

### 1. Full-Width Interactive Hero Slider
- **100% Full-Width Responsive Hero Slider**: Smooth transitions, touch swipe gesture support, keyboard arrows, autoplay with pause on hover.
- **5 High-Resolution Photography Slides**:
  - `01` **RICS Level 3 Building Survey**: In-depth forensic building surveys, historic timber & masonry defect diagnosis.
  - `02` **Commercial Dilapidations & Leases**: Landlord & tenant technical advisory and Section 18 diminution valuations.
  - `03` **Party Wall etc. Act 1996**: Statutory notice serving, dispute resolution, and Agreed Surveyor appointments.
  - `04` **4K Drone Aerial Roof Inspections**: Safe, non-invasive UAV assessments of chimneys and high-level gutters.
  - `05` **RICS Red Book Valuations**: HMRC and court-compliant appraisals (Help to Buy, Probate, CGT, Divorce).
- **Interactive Bottom Progress Bar & Navigation Tabs**: Live active slide timeline indicator and quick-jump controls.

### 2. Interactive Survey Fee Calculator Engine
- Dynamic real-time calculation based on:
  - Property Purchase Price / Estimated Value (£150,000 to £2,500,000+) via range slider.
  - Survey Level (Level 1 Condition, Level 2 Homebuyer, Level 3 Building Survey).
  - Bedroom count (1-2, 3, 4, 5+).
  - Property Era (Modern post-1990, 1900-1989, Pre-1900 Victorian/Period).
  - Diagnostic Add-Ons: 4K Drone Aerial Scan (+£120), FLIR Thermal Moisture Scan (+£95), Desktop Environmental Flood Risk (+£45).
- Itemized VAT breakdown and instant "Lock In Quote" booking trigger.

### 3. Interactive Defect Diagnostic Hotspots
- Architectural elevation diagram with pulsing interactive pins.
- Allows homebuyers to click and inspect common structural defect areas:
  - Chimney Stacks & Lead Flashings
  - Roof Valleys & Slipped Welsh Slates
  - Stepped Masonry Fractures & Subsidence
  - Bridged Damp Proof Course (DPC) & Sub-Floor Voids
  - Windows Lintels & Failed Timber Sills

### 4. Interactive Quick Survey Finder
- Select Property Era, Building Type, and Current Condition to instantly obtain the recommended RICS survey standard.

### 5. Multi-Page Architecture (8 Comprehensive Pages)
- `index.html`: Homepage with full-width slider, quick finder, comparison cards, interactive calculator, defect visualizer, case studies, reviews, and accreditations.
- `about.html`: Heritage, RICS Royal Charter credentials, MRICS/FRICS leadership profiles, £5M PI insurance guarantee.
- `surveys.html`: Detailed breakdown of RICS Level 1, 2, and 3 surveys with a comprehensive 25-point comparison matrix.
- `services.html`: Specialist commercial due diligence, Party Wall etc. Act 1996, Dilapidations claims defence, and 4K drone surveys.
- `valuation.html`: RICS Red Book valuations for Help to Buy, Probate/Inheritance Tax, Capital Gains Tax, Matrimonial CPR Part 35.
- `case-studies.html`: 6 illustrated real surveying cases with defect discoveries, photo evidence, and client cost savings.
- `fee-calculator.html`: Dedicated full-page interactive survey fee estimation and quotation tool.
- `sample-reports.html`: Realistic RICS Level 3 report excerpts, condition ratings (1-2-3), and annotated photography.
- `contact.html`: Office directory (London Mayfair, Surrey, Manchester, Oxford, Bristol) with interactive enquiry booking form.

---

## 🛠️ Technology Stack
- **HTML5**: Semantic markup, accessible ARIA roles, clean structure.
- **CSS3**: Custom properties (CSS variables), CSS Grid & Flexbox, responsive typography, glassmorphism overlays.
- **Vanilla JavaScript (ES6+)**: Modular classes (`HeroSlider`, `SurveyCalculator`, `DefectHotspots`), zero heavy external dependencies.
- **Typography**: Google Fonts (*Cinzel* serif for heritage prestige, *Plus Jakarta Sans* for clean body legibility, *JetBrains Mono* for metrics).
- **Icons**: Clean SVG vector iconography.
- **Hosting**: GitHub Pages with `.nojekyll` enabled.

---

## 📁 Project Directory Structure
```
Chartered-Surveyor/
├── .nojekyll
├── README.md
├── PROJECT_MEMORY.md
├── index.html
├── about.html
├── surveys.html
├── services.html
├── valuation.html
├── case-studies.html
├── fee-calculator.html
├── sample-reports.html
├── contact.html
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── hero-slider.js
│   ├── survey-calculator.js
│   └── defect-hotspots.js
└── images/
```

---

## 📜 Regulatory Standards & Credentials
Regulated by the **Royal Institution of Chartered Surveyors (RICS)** under Firm Registration Number `#849201`. All surveyors hold qualified **MRICS** or **FRICS** professional status with certified Valuer Registration Scheme (**VRS**) accreditation and membership of the **Pyramus & Thisbe Society**. Fully protected by £5,000,000 Professional Indemnity Insurance.
