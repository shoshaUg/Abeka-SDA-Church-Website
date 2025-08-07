// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Update Date and Time
  function updateDateTime() {
    const now = new Date();
    
    // Format date (e.g., "Friday, August 4, 2023")
    const dateOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    document.getElementById('current-date').innerHTML = 
      `<i class="far fa-calendar-alt"></i> ${formattedDate}`;
    
    // Format time (e.g., "11:45:32 AM")
    const timeOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    document.getElementById('current-time').innerHTML = 
      `<i class="far fa-clock"></i> ${formattedTime}`;
    
    // Update year in footer
    document.getElementById('current-year').textContent = now.getFullYear();
  }

  // Update every second
  setInterval(updateDateTime, 1000);
  updateDateTime(); // Initial call

  // Fetch Daily Bible Verse
  fetch('https://bible-api.com/john%203:16')
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(data => {
      document.getElementById('daily-verse').textContent = 
        `"${data.text}" - ${data.reference}`;
    })
    .catch(error => {
      console.error('Error fetching verse:', error);
      document.getElementById('daily-verse').textContent = 
        '"For God so loved the world..." - John 3:16';
    });
  })
 
// Motivational Quotes (Rotates every 5 minutes)
const quotes = [
  {
    text: "Faith is taking the first step even when you don't see the whole staircase.",
    author: "Martin Luther King Jr."
  },
  {
    text: "With God, all things are possible.",
    author: "Matthew 19:26"
  },
  {
    text: "The Lord is my strength and my shield; my heart trusts in Him.",
    author: "Psalm 28:7"
  },
  {
    text: "Do not be anxious about anything, but pray about everything.",
    author: "Philippians 4:6"
  },
  {
    text: "I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes.",
    author: "Romans 1:16."
  },
  {
    text: "Put on the full armor of God, so that you can take your stand against the devils schemes.",
    author: "Ephesians 6:11"
  },
  {
    text: "Praise the Lord, my soul; all my inmost being, praise his holy name.",
    author: "Psalm 103:1"
  },
  {
    text: "Pray without ceasing.",
    author: "1 Thessalonians 5:17"
  },
  {
    text: "He said in a loud voice, “Fear God and give him glory, because the hour of his judgment has come.",
    author: "Revelation 14:7"
  }
];

function rotateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById('motivational-quote').textContent = `"${quotes[randomIndex].text}"`;
  document.getElementById('quote-author').textContent = `— ${quotes[randomIndex].author}`;
}

// Rotate every 5 minutes (300,000ms)
setInterval(rotateQuote, 50000);
rotateQuote(); // Initialize immediately

// Bible Verse Fetching
function fetchVerse(verse = '') {
  const searchInput = verse || document.getElementById('verse-search').value.trim();
  if (!searchInput) return;

  const resultDiv = document.getElementById('verse-result');
  resultDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Loading...</p>';

  fetch(`https://bible-api.com/${encodeURIComponent(searchInput)}`)
    .then(response => {
      if (!response.ok) throw new Error('Verse not found');
      return response.json();
    })
    .then(data => {
      resultDiv.innerHTML = `
        <h3>${data.reference}</h3>
        <p>${data.text}</p>
        <button onclick="copyVerse('${data.reference}', '${data.text}')" class="btn-small">
          <i class="fas fa-copy"></i> Copy
        </button>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p class="error">Error: ${error.message}. Try "John 3:16"</p>`;
    });
}

// Copy Verse to Clipboard
function copyVerse(reference, text) {
  navigator.clipboard.writeText(`${reference}: ${text}`)
    .then(() => alert('Verse copied to clipboard!'))
    .catch(() => alert('Failed to copy.'));
}

// Instagram Feed (Alternative if API access isn't available)
document.addEventListener('DOMContentLoaded', function() {
  // Sample Instagram data (replace with actual API calls)
  const instaPosts = [
    {
      image: "https://www.instagram.com/p/DLYDKTjteSY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      caption: "Sunday service worship moments",
      link: "#"
    },
    {
      image: "https://via.placeholder.com/600x600?text=Bible+Study",
      caption: "Wednesday night Bible study",
      link: "#"
    },
    {
      image: "royals/camp.jpg",
      caption: "Youth group summer camp",
      link: "#"
    },
    {
      image: "https://via.placeholder.com/600x600?text=Community+Outreach",
      caption: "Helping our local community",
      link: "#"
    }
  ];

  const instaFeed = document.getElementById('instafeed');
  
  instaPosts.forEach(post => {
    instaFeed.innerHTML += `
      <a href="${post.image}" class="insta-item" data-lightbox="instagram" data-title="${post.caption}">
        <img src="${post.image}" alt="${post.caption}">
        <div class="insta-caption">
          <p>${post.caption}</p>
        </div>
      </a>
    `;
  });

  // Initialize Lightbox
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Auto-calculate church age
  const foundingYear = 1982;
  document.getElementById('church-age').textContent = foundingYear;
  
  // Simple image hover effect
  const images = document.querySelectorAll('.about-image, .team-card img');
  images.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.02)';
      img.style.transition = 'transform 0.3s ease';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.getElementById('youthDropdownBtn');
  const dropdownContent = document.getElementById('youthDropdown');

  // Toggle dropdown on click
  dropdownBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
    
    // Rotate chevron icon
    const chevron = this.querySelector('.fa-chevron-down');
    chevron.classList.toggle('rotate');
  });

  // Close when clicking outside
  document.addEventListener('click', function() {
    dropdownContent.classList.remove('show');
    const chevron = dropdownBtn.querySelector('.fa-chevron-down');
    chevron.classList.remove('rotate');
  });

  // Prevent closing when clicking inside dropdown
  dropdownContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

// Auto-update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Add hover effects for social icons (optional)
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
  });
  icon.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});



  document.addEventListener('DOMContentLoaded', function() {
  // Clone the cards for infinite scrolling effect
  const leftTrack = document.querySelector('.left-scroll');
  const rightTrack = document.querySelector('.right-scroll');
  
  // Clone cards for left-scrolling row
  const leftCards = document.querySelectorAll('.left-scroll .testimony-card');
  leftCards.forEach(card => {
    leftTrack.appendChild(card.cloneNode(true));
  });
  
  // Clone cards for right-scrolling row
  const rightCards = document.querySelectorAll('.right-scroll .testimony-card');
  rightCards.forEach(card => {
    rightTrack.insertBefore(card.cloneNode(true), rightTrack.firstChild);
  });
  
  // Pause animation when hovering over any card
  const allCards = document.querySelectorAll('.testimony-card');
  allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.closest('.carousel-track').style.animationPlayState = 'paused';
    });
    card.addEventListener('mouseleave', function() {
      this.closest('.carousel-track').style.animationPlayState = 'running';
    });
  });
});

// Verse carousel functionality
let currentBatch = 0;
const totalBatches = 4;
const versesPerBatch = 3;

function showVerseBatch(batchIndex) {
  // Validate index
  if (batchIndex < 0) batchIndex = totalBatches - 1;
  if (batchIndex >= totalBatches) batchIndex = 0;
  
  // Hide all verses
  document.querySelectorAll('.verse-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Show current batch
  const startIndex = batchIndex * versesPerBatch;
  const endIndex = startIndex + versesPerBatch;
  
  document.querySelectorAll('.verse-card').forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      setTimeout(() => {
        card.classList.add('active');
      }, 100 * (index - startIndex));
    }
  });
  
  // Update dots
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === batchIndex);
  });
  
  currentBatch = batchIndex;
}

function showNextVerses() {
  showVerseBatch(currentBatch + 1);
}

function showPrevVerses() {
  showVerseBatch(currentBatch - 1);
}

// Auto-rotate verses (optional)
let verseInterval = setInterval(showNextVerses, 5000);

// Pause on hover
document.querySelector('.verse-grid').addEventListener('mouseenter', () => {
  clearInterval(verseInterval);
});

document.querySelector('.verse-grid').addEventListener('mouseleave', () => {
  verseInterval = setInterval(showNextVerses, 5000);
});







 // Initialize and display the map
  function initMap() {
    // Replace with your church's coordinates
    const churchLocation = { lat: 5.6015699, lng: -0.2452236 }; // Example: Abeka, Accra
    
    // Create map
    const map = new google.maps.Map(document.getElementById("church-map"), {
      center: churchLocation,
      zoom: 13,
      styles: [
        {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [{ "visibility": "off" }]
        }
      ]
    });
    
    // Create custom marker icon (church bell)
    const churchIcon = {
      url: "https://cdn-icons-png.flaticon.com/512/619/619153.png", // Church bell icon
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 40)
    };
    
    // Add marker with info window
    const marker = new google.maps.Marker({
      position: churchLocation,
      map: map,
      title: "Abeka SDA Church",
      icon: churchIcon
    });
    
    // Info window content
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="church-info-window">
          <h3>Abeka SDA Church</h3>
          <p><i class="fas fa-map-marker-alt"></i> Adjacent Rene School, Abeka</p>
          <p><i class="fas fa-clock"></i> Worship Hours: Sat 9AM-12PM</p>
          <p><i class="fas fa-phone"></i> +233 534 268 869</p>
        </div>
      `
    });
    
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
    
    // Open info window by default
    infoWindow.open(map, marker);
    
    // Street View button
    const streetViewBtn = document.getElementById("street-view-btn");
    streetViewBtn.addEventListener("click", () => {
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("church-map"), {
          position: churchLocation,
          pov: { heading: 34, pitch: 10 },
          zoom: 1
        }
      );
      map.setStreetView(panorama);
    });
    
    // Directions button
    const directionsBtn = document.getElementById("directions-btn");
    directionsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${churchLocation.lat},${churchLocation.lng}`;
}

  document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const prayerBtn = document.getElementById('prayerRequestBtn');
  const prayerModal = document.getElementById('prayerModal');
  const confirmationModal = document.getElementById('confirmationModal');
  const closeButtons = document.getElementsByClassName('close');
  const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');
  const prayerForm = document.getElementById('prayerForm');
 
  // Replace with your Google Form URL (use the embedded version)
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeb1RpJYBGLV7XDMu33oly7lWFSHIR5muvQrNGHHYIy12WM4g/viewform?embedded=true" ;
  prayerForm.src = googleFormUrl;
  
  // Open prayer modal
  prayerBtn.addEventListener('click', function() {
    prayerModal.style.display = 'block';
  });
  
  // Close modals when clicking X
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', function() {
      prayerModal.style.display = 'none';
      confirmationModal.style.display = 'none';
    });
  }
  
  // Close confirmation modal
  closeConfirmationBtn.addEventListener('click', function() {
    confirmationModal.style.display = 'none';
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === prayerModal) {
      prayerModal.style.display = 'none';
    }
    if (event.target === confirmationModal) {
      confirmationModal.style.display = 'none';
    }
  });
  
  // Check for form submission (Google Forms redirects to a thank you page)
  // This is a workaround since we can't directly detect Google Form submission
  const checkFormSubmission = setInterval(function() {
    try {
      // Check if the iframe URL has changed to the thank you page
      if (prayerForm.contentWindow.location.href.includes('formResponse')) {
        prayerModal.style.display = 'none';
        confirmationModal.style.display = 'block';
        clearInterval(checkFormSubmission);
      }
    } catch (e) {
      // Cross-origin security error, we can't directly access iframe content
      // This is expected behavior with Google Forms
    }
  }, 1000);
});


document.addEventListener('DOMContentLoaded', function() {
  // Get both footer buttons
  const footerPrayerBtn = document.getElementById('footerPrayerBtn');
  const footerGiveBtn = document.getElementById('footerGiveBtn');
  
  // Scroll to top and open prayer modal
  footerPrayerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Open prayer modal after scroll completes
    setTimeout(function() {
      const prayerModal = document.getElementById('prayerModal');
      if (prayerModal) {
        prayerModal.style.display = 'block';
      }
    }, 800);
  });
  
  // Scroll to top and open donation modal
  footerGiveBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Open donation modal after scroll completes
    setTimeout(function() {
      const donationModal = document.getElementById('donationModal');
      if (donationModal) {
        donationModal.style.display = 'block';
      }
    }, 800);
  });
});