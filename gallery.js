document.addEventListener('DOMContentLoaded', function() {
  const hero = document.getElementById('eventsHero');
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = [];
  let currentSlide = 0;
  let slideInterval;

  // Create indicators
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'slide-indicators';
  hero.appendChild(indicatorsContainer);

  slides.forEach((slide, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'slide-indicator';
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
    indicators.push(indicator);
  });

  // Slide rotation function
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  // Manual slide navigation
  function goToSlide(index) {
    clearInterval(slideInterval);
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    startSlideShow();
  }

  // Start slideshow
  function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 10000); // Change every 10 seconds
  }

  // Pause on hover
  hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
  hero.addEventListener('mouseleave', startSlideShow);

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  hero.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval);
  }, {passive: true});
  
  hero.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startSlideShow();
  }, {passive: true});

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide(); // Swipe left
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right
      slides[currentSlide].classList.remove('active');
      indicators[currentSlide].classList.remove('active');
      
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
    }
  }

  // Initialize
  startSlideShow();
});

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Mobile dropdown toggle
  const youthDropdown = document.querySelector('.dropdown .dropbtn');
  if (youthDropdown) {
    youthDropdown.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const content = this.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }
    });
  }
  
  // Gallery image lightbox effect
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      // Would link to full gallery in production
      this.classList.toggle('zoom');
    });
  });
});

// Pagination configuration
const itemsPerPage = 10; // Number of images per page
let currentPage = 1;
let totalItems = 0;

function initializePagination(images) {
  totalItems = images.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  renderPageNumbers(totalPages);
  updatePaginationButtons();
}

function renderPageNumbers(totalPages) {
  const pageNumbersContainer = document.getElementById('pageNumbers');
  pageNumbersContainer.innerHTML = '';
  
  // Always show first page
  addPageNumber(1, pageNumbersContainer);
  
  // Show ellipsis if needed
  if (currentPage > 3) {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    pageNumbersContainer.appendChild(ellipsis);
  }
  
  // Show current page and neighbors
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);
  
  for (let i = startPage; i <= endPage; i++) {
    addPageNumber(i, pageNumbersContainer);
  }
  
  // Show ellipsis if needed
  if (currentPage < totalPages - 2) {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    pageNumbersContainer.appendChild(ellipsis);
  }
  
  // Always show last page if different from first
  if (totalPages > 1) {
    addPageNumber(totalPages, pageNumbersContainer);
  }
}

function addPageNumber(pageNumber, container) {
  const pageElement = document.createElement('span');
  pageElement.classList.add('page-number');
  if (pageNumber === currentPage) {
    pageElement.classList.add('active');
  }
  pageElement.textContent = pageNumber;
  pageElement.addEventListener('click', () => goToPage(pageNumber));
  container.appendChild(pageElement);
}

function goToPage(page) {
  currentPage = page;
  displayGalleryItems();
  updatePaginationButtons();
  renderPageNumbers(Math.ceil(totalItems / itemsPerPage));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changePage(direction) {
  goToPage(currentPage + direction);
}

function updatePaginationButtons() {
  const prevButton = document.querySelector('.page-btn:first-of-type');
  const nextButton = document.querySelector('.page-btn:last-of-type');
  
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === Math.ceil(totalItems / itemsPerPage);
}

function displayGalleryItems() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    item.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
  });
}

// Initialize when your gallery loads
document.addEventListener('DOMContentLoaded', function() {
  // After loading your images:
  const allImages = document.querySelectorAll('.gallery-item');
  totalItems = allImages.length;
  initializePagination(allImages);
  displayGalleryItems();
  updatePaginationButtons();
});
document.addEventListener('DOMContentLoaded', function() {
  // Initialize lightGallery
  lightGallery(document.querySelector('.gallery-container'), {
    selector: '.gallery-item',
    download: false,
    counter: false
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      const filter = button.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Download functionality
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const imageUrl = this.parentElement.parentElement.querySelector('img').src;
      const fileName = this.dataset.image || 'grace-church-image.jpg';
      
      // Create temporary link
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Feedback
      this.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-download"></i>';
      }, 2000);
    });
  });

  // Load more functionality
  let currentItems = 12;
  const totalItems = 24; // Change to your actual total
  const loadMoreBtn = document.getElementById('loadMore');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // In a real implementation, you would fetch more items from server
      for (let i = currentItems; i < currentItems + 6; i++) {
        if (i >= totalItems) {
          loadMoreBtn.style.display = 'none';
          break;
        }
        // Here you would append new gallery items
        console.log(`Loading item ${i+1}`);
      }
      currentItems += 6;
    });
  }

});

// Load TikTok embed script
(function() {
  var tiktokScript = document.createElement('script');
  tiktokScript.src = "https://www.tiktok.com/embed.js";
  tiktokScript.async = true;
  document.head.appendChild(tiktokScript);
})();

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.principle-card');
  let currentActive = 0;
  
  // Function to rotate active card
  function rotateActiveCard() {
    // Remove active class from all cards
    cards.forEach(card => card.classList.remove('active'));
    
    // Add active class to current card
    cards[currentActive].classList.add('active');
    
    // Move to next card (loop back to 0 after last card)
    currentActive = (currentActive + 1) % cards.length;
  }
  
  // Initialize - show first card immediately
  cards[0].classList.add('active');
  
  // Then rotate every 30 seconds
  setInterval(rotateActiveCard, 5000);
  
  // Also rotate when any card is clicked
  cards.forEach(card => {
    card.addEventListener('click', () => {
      clearInterval(rotationInterval);
      rotateActiveCard();
      rotationInterval = setInterval(rotateActiveCard, 30000);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('adventurer-song');
  const playBtn = document.querySelector('.play-btn');
  const pauseBtn = document.querySelector('.pause-btn');
  
  // Update button states
  audio.addEventListener('play', function() {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
  });
  
  audio.addEventListener('pause', function() {
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
  });
  
  // Initialize button states
  pauseBtn.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
  const giveBtn = document.getElementById('giveOnlineBtn');
  const donationModal = document.getElementById('donationModal');
  const closeButtons = document.querySelectorAll('.close');
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customAmount = document.getElementById('customAmount');
  
  // Open donation modal
  giveBtn.addEventListener('click', function() {
    donationModal.style.display = 'block';
  });
  
  // Close modal
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      donationModal.style.display = 'none';
    });
  });
  
  // Amount selection
  amountBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      amountBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      customAmount.value = this.dataset.amount;
    });
  });
  
  // Custom amount handling
  customAmount.addEventListener('input', function() {
    amountBtns.forEach(b => b.classList.remove('active'));
  });
  
  // Close when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === donationModal) {
      donationModal.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // ... your existing code ...
  
  // Get the footer button and hero section
  const footerGiveBtn = document.getElementById('footerGiveBtn');
  const heroSection = document.querySelector('.hero'); // Or your hero section's specific selector
  
  // Scroll to hero section when footer button is clicked
  footerGiveBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Scroll to hero section
    heroSection.scrollIntoView({ behavior: 'smooth' });
    
    // Optional: Open the donation modal automatically after scrolling
    setTimeout(() => {
      donationModal.style.display = 'block';
    }, 800); // Delay slightly to allow scroll to complete
  });
  
  // ... rest of your existing JavaScript ...
});

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.principles-container');
  
  if (container) {
    // Enable touch scrolling
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      container.scrollLeft = scrollLeft - walk;
    });

    // Add arrow key navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        container.scrollBy({ left: -200, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        container.scrollBy({ left: 200, behavior: 'smooth' });
      }
    });
  }
});