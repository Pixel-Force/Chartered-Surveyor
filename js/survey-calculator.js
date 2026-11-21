/* ==========================================================================
   Chartered Surveyor — Dynamic Survey Fee Calculator Engine
   Real-time formula calculation, add-ons, VAT breakdown & booking modal
   ========================================================================== */

class SurveyCalculator {
  constructor() {
    this.slider = document.getElementById('calc-val-slider');
    this.valDisplay = document.getElementById('calc-val-display');
    this.typeRadios = document.querySelectorAll('input[name="calc_survey_type"]');
    this.bedRadios = document.querySelectorAll('input[name="calc_beds"]');
    this.eraSelect = document.getElementById('calc-era-select');
    this.addons = document.querySelectorAll('.addon-item input[type="checkbox"]');

    // Outputs
    this.typeDisplay = document.getElementById('summary-type-label');
    this.baseDisplay = document.getElementById('summary-base-fee');
    this.addonsDisplay = document.getElementById('summary-addons-fee');
    this.vatDisplay = document.getElementById('summary-vat-fee');
    this.totalDisplay = document.getElementById('summary-total-fee');

    this.bookBtn = document.getElementById('btn-lock-quote');

    if (!this.slider || !this.totalDisplay) return;

    this.init();
  }

  init() {
    // Slider event
    this.slider.addEventListener('input', () => {
      this.updateValueDisplay();
      this.calculate();
    });

    // Survey Type radio events
    this.typeRadios.forEach(radio => {
      radio.addEventListener('change', () => this.calculate());
    });

    // Bedrooms radio events
    this.bedRadios.forEach(radio => {
      radio.addEventListener('change', () => this.calculate());
    });

    // Era Select event
    if (this.eraSelect) {
      this.eraSelect.addEventListener('change', () => this.calculate());
    }

    // Addons checkbox events
    this.addons.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const parent = e.target.closest('.addon-item');
        if (parent) {
          parent.classList.toggle('selected', e.target.checked);
        }
        this.calculate();
      });
    });

    // Book button action
    if (this.bookBtn) {
      this.bookBtn.addEventListener('click', () => {
        this.triggerBookingModal();
      });
    }

    this.updateValueDisplay();
    this.calculate();
  }

  updateValueDisplay() {
    const val = parseInt(this.slider.value, 10);
    this.valDisplay.textContent = '£' + val.toLocaleString('en-GB');
  }

  calculate() {
    const propertyValue = parseInt(this.slider.value, 10);

    // Selected survey type
    let selectedType = 'level3';
    let basePrice = 795;
    let typeName = 'RICS Level 3 Full Building Survey';

    const checkedType = document.querySelector('input[name="calc_survey_type"]:checked');
    if (checkedType) {
      selectedType = checkedType.value;
      if (selectedType === 'level1') {
        basePrice = 390;
        typeName = 'RICS Level 1 Condition Report';
      } else if (selectedType === 'level2') {
        basePrice = 495;
        typeName = 'RICS Level 2 Homebuyer Survey';
      } else if (selectedType === 'level3') {
        basePrice = 795;
        typeName = 'RICS Level 3 Full Building Survey';
      }
    }

    // Value multiplier (properties above £300,000 have gradual sliding scale)
    let valueIncrement = 0;
    if (propertyValue > 300000) {
      const extraHundredK = (propertyValue - 300000) / 100000;
      valueIncrement = Math.round(extraHundredK * (selectedType === 'level3' ? 35 : 25));
    }

    // Bedrooms modifier
    let bedModifier = 0;
    const checkedBed = document.querySelector('input[name="calc_beds"]:checked');
    if (checkedBed) {
      const beds = parseInt(checkedBed.value, 10);
      if (beds > 2) {
        bedModifier = (beds - 2) * 35;
      }
    }

    // Era modifier
    let eraModifier = 0;
    if (this.eraSelect) {
      const era = this.eraSelect.value;
      if (era === 'pre-1900') {
        eraModifier = 80;
      } else if (era === '1900-1960') {
        eraModifier = 40;
      }
    }

    const totalBase = basePrice + valueIncrement + bedModifier + eraModifier;

    // Addons calculation
    let addonsTotal = 0;
    this.addons.forEach(box => {
      if (box.checked) {
        addonsTotal += parseInt(box.dataset.price || '0', 10);
      }
    });

    const subtotal = totalBase + addonsTotal;
    const vat = Math.round(subtotal * 0.20);
    const total = subtotal + vat;

    // Render displays
    if (this.typeDisplay) this.typeDisplay.textContent = typeName;
    if (this.baseDisplay) this.baseDisplay.textContent = '£' + totalBase.toLocaleString('en-GB');
    if (this.addonsDisplay) this.addonsDisplay.textContent = '£' + addonsTotal.toLocaleString('en-GB');
    if (this.vatDisplay) this.vatDisplay.textContent = '£' + vat.toLocaleString('en-GB');
    if (this.totalDisplay) this.totalDisplay.textContent = '£' + total.toLocaleString('en-GB');
  }

  triggerBookingModal() {
    const total = this.totalDisplay.textContent;
    const type = this.typeDisplay ? this.typeDisplay.textContent : 'RICS Home Survey';

    if (window.showToast) {
      window.showToast(
        'Quote Locked In',
        `Your instant quote for ${type} at ${total} has been generated. Our senior surveyor will contact you within 2 business hours.`
      );
    } else {
      alert(`Quote Confirmed: ${type} at ${total}. A surveyor will be in touch shortly!`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SurveyCalculator();
});
