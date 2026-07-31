// ==================== ЗАГРУЗКА ХЕДЕРА И ФУТЕРА ====================
function loadIncludes() {
  var basePath = '/OBorisov_analyst_CV/assets/includes/';

  var headerPlaceholder = document.getElementById('headerPlaceholder');
  var footerPlaceholder = document.getElementById('footerPlaceholder');

  if (headerPlaceholder) {
    fetch(basePath + 'header.html')
      .then(function(response) { return response.text(); })
      .then(function(html) {
        headerPlaceholder.innerHTML = html;
        initMobileMenu();
      })
      .catch(function() { console.warn('Header not loaded'); });
  }

  if (footerPlaceholder) {
    fetch(basePath + 'footer.html')
      .then(function(response) { return response.text(); })
      .then(function(html) {
        footerPlaceholder.innerHTML = html;
      })
      .catch(function() { console.warn('Footer not loaded'); });
  }
}

// ==================== ПЕРЕКЛЮЧАТЕЛЬ ТРЕКОВ ====================
function initTrackSwitcher() {
  var buttons = document.querySelectorAll('.trackBtn');
  var contents = document.querySelectorAll('.trackContent');

  if (buttons.length === 0) return;

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetTrack = btn.getAttribute('data-track');

      buttons.forEach(function(b) { b.classList.remove('active'); });
      contents.forEach(function(c) { c.classList.remove('active'); });

      btn.classList.add('active');
      var targetContent = document.getElementById(
        targetTrack === 'research' ? 'trackResearch' : 'trackTool'
      );
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// ==================== FADE-IN ПРИ СКРОЛЛЕ ====================
function initFadeIn() {
  var fadeElements = document.querySelectorAll('.fadeIn');

  if (fadeElements.length === 0) return;

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach(function(el) { observer.observe(el); });
}

// ==================== FAQ: ЗАКРЫВАТЬ ОСТАЛЬНЫЕ ПРИ ОТКРЫТИИ ====================
function initFaq() {
  var details = document.querySelectorAll('.faqItem');

  details.forEach(function(detail) {
    detail.addEventListener('toggle', function() {
      if (detail.open) {
        details.forEach(function(other) {
          if (other !== detail) {
            other.open = false;
          }
        });
      }
    });
  });
}

// ==================== МОБИЛЬНОЕ МЕНЮ ====================
function initMobileMenu() {
  var burger = document.getElementById('headerBurger');
  var nav = document.querySelector('.headerNav');

  if (!burger || !nav) return;

  burger.addEventListener('click', function() {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

// ==================== ЗАПУСК ====================
document.addEventListener('DOMContentLoaded', function() {
  loadIncludes();
  initTrackSwitcher();
  initFadeIn();
  initFaq();
});