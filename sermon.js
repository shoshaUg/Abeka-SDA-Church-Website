document.addEventListener('DOMContentLoaded', function() {
  const monthFilter = document.getElementById('month-filter');
  const speakerFilter = document.getElementById('speaker-filter');
  const sermonCards = document.querySelectorAll('.sermon-card');

  // Initialize filters
  monthFilter.addEventListener('change', filterSermons);
  speakerFilter.addEventListener('change', filterSermons);

  function filterSermons() {
    const selectedMonth = monthFilter.value;
    const selectedSpeaker = speakerFilter.value;

    sermonCards.forEach(card => {
      const cardMonth = card.getAttribute('data-month');
      const cardSpeaker = card.getAttribute('data-speaker');

      const monthMatch = selectedMonth === 'all' || cardMonth === selectedMonth;
      const speakerMatch = selectedSpeaker === 'all' || cardSpeaker === selectedSpeaker;

      if (monthMatch && speakerMatch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Initialize Facebook SDK for embedded videos
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});

