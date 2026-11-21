/* ==========================================================================
   Chartered Surveyor — Main Interactive Script & Utilities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initQuickSurveyFinder();
  initBackToTop();
  initContactForms();
  initNewsletterForm();
  initAccordions();
});

/* --------------------------------------------------------------------------
   Sticky Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 45) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer & Backdrop
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  let backdrop = document.querySelector('.mobile-menu-backdrop');

  if (!toggleBtn || !navMenu) return;

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
  }

  const toggle = (force) => {
    const isOpen = force !== undefined ? force : !navMenu.classList.contains('active');
    navMenu.classList.toggle('active', isOpen);
    backdrop.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggle());
  backdrop.addEventListener('click', () => toggle(false));

  // Submenu toggles on mobile
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');
    if (dropdown && link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          item.classList.toggle('dropdown-open');
        }
      });
    }
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggle(false);
    }
  });
}

/* --------------------------------------------------------------------------
   Quick Survey Finder Recommendation Logic
   -------------------------------------------------------------------------- */
function initQuickSurveyFinder() {
  const form = document.getElementById('quick-finder-form');
  const resultCard = document.getElementById('quick-finder-result');
  const resultTitle = document.getElementById('quick-finder-res-title');
  const resultReason = document.getElementById('quick-finder-res-reason');
  const resultLink = document.getElementById('quick-finder-res-link');

  if (!form || !resultCard) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const age = document.getElementById('finder-age').value;
    const type = document.getElementById('finder-type').value;
    const condition = document.getElementById('finder-condition').value;

    let recommendation = 'RICS Level 2 Homebuyer Survey';
    let reason = 'Ideal for conventionally built, modern or well-maintained residential properties requiring an inspection of visible structural components.';
    let link = 'fee-calculator.html?level=level2';

    if (age === 'pre-1900' || condition === 'poor' || type === 'commercial') {
      recommendation = 'RICS Level 3 Full Building Survey';
      reason = 'Essential for older heritage properties, buildings with structural defects, or when major renovations are planned.';
      link = 'fee-calculator.html?level=level3';
    } else if (age === 'new-build') {
      recommendation = 'RICS New Build Snagging & Handover Inspection';
      reason = 'Forensic audit of finishes, insulation, compliance with NHBC/Premier Guarantee, and builder sign-off defect list.';
      link = 'fee-calculator.html?level=snagging';
    } else if (type === 'flat') {
      recommendation = 'RICS Level 2 Homebuyer Survey (Leasehold Focus)';
      reason = 'Focuses on the flat demised interior, roof, communal parts, service charge liabilities, and leasehold obligations.';
      link = 'fee-calculator.html?level=level2';
    }

    resultTitle.textContent = recommendation;
    resultReason.textContent = reason;
    resultLink.href = link;

    resultCard.classList.add('show');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* --------------------------------------------------------------------------
   Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  let btn = document.querySelector('.back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Return to top of page');
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   Interactive Accordions (FAQs / Reports)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.accordion-item');
      if (!parent) return;

      const isOpen = parent.classList.contains('active');
      
      // Close sibling items in the same accordion container
      const accordion = parent.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('active'));
      }

      if (!isOpen) {
        parent.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Contact & Quote Forms
   -------------------------------------------------------------------------- */
function initContactForms() {
  const forms = document.querySelectorAll('.js-booking-form, #contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      showToast(
        'Survey Enquiry Submitted',
        'Thank you! Your survey inquiry has been registered. An MRICS surveyor will review your property and call you back today.'
      );

      form.reset();
    });
  });
}

/* --------------------------------------------------------------------------
   Newsletter Form
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.querySelector('.footer-newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast(
        'Subscribed to RICS Insights',
        'You are now subscribed to our monthly Chartered Surveyor property analysis and legal updates.'
      );
      input.value = '';
    }
  });
}

/* --------------------------------------------------------------------------
   Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(title, message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <div class="toast-content">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Remove toast after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

window.showToast = showToast;
