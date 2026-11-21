/* ==========================================================================
   Chartered Surveyor — Full-Width Hero Slider Engine
   Silky transitions, autoplay progress, touch swipe & keyboard controls
   ========================================================================== */

class HeroSlider {
  constructor() {
    this.container = document.querySelector('.hero-slider-section');
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.hero-slide');
    this.tabs = this.container.querySelectorAll('.slider-nav-tab');
    this.prevBtn = this.container.querySelector('.slider-arrow-prev');
    this.nextBtn = this.container.querySelector('.slider-arrow-next');

    if (this.slides.length <= 1) return;

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.intervalTime = 6500; // 6.5s per slide
    this.timer = null;
    this.isPaused = false;

    // Touch variables
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    // Event listeners for controls
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetTimer();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetTimer();
      });
    }

    // Tab buttons
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this.goTo(index);
        this.resetTimer();
      });
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      this.isPaused = true;
      this.clearTimer();
    });

    this.container.addEventListener('mouseleave', () => {
      this.isPaused = false;
      this.startTimer();
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prev();
        this.resetTimer();
      } else if (e.key === 'ArrowRight') {
        this.next();
        this.resetTimer();
      }
    });

    // Touch swipe support
    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Show initial slide and start timer
    this.showSlide(this.currentIndex);
    this.startTimer();
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    this.tabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    this.currentIndex = index;
  }

  next() {
    const newIndex = (this.currentIndex + 1) % this.totalSlides;
    this.showSlide(newIndex);
  }

  prev() {
    const newIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(newIndex);
  }

  goTo(index) {
    if (index >= 0 && index < this.totalSlides) {
      this.showSlide(index);
    }
  }

  startTimer() {
    this.clearTimer();
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.intervalTime);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resetTimer() {
    this.clearTimer();
    this.startTimer();
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    const threshold = 50;

    if (diff > threshold) {
      // Swiped left -> next
      this.next();
      this.resetTimer();
    } else if (diff < -threshold) {
      // Swiped right -> prev
      this.prev();
      this.resetTimer();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider();
});
