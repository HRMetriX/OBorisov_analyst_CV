// ==================== ПЕРЕКЛЮЧАТЕЛЬ ТРЕКОВ ====================
function initTrackSwitcher() {
  const buttons = document.querySelectorAll('.trackBtn');
  const contents = document.querySelectorAll('.trackContent');

  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTrack = btn.getAttribute('data-track');

      // Снимаем active со всех кнопок и контентов
      buttons.forEach((b) => b.classList.remove('active'));
      contents.forEach((c) => c.classList.remove('active'));

      // Включаем нужные
      btn.classList.add('active');
      const targetContent = document.getElementById(
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
  const fadeElements = document.querySelectorAll('.fadeIn');

  if (fadeElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => observer.observe(el));
}

// ==================== FAQ: ЗАКРЫВАТЬ ОСТАЛЬНЫЕ ПРИ ОТКРЫТИИ ====================
function initFaq() {
  const details = document.querySelectorAll('.faqItem');

  details.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        details.forEach((other) => {
          if (other !== detail) {
            other.open = false;
          }
        });
      }
    });
  });
}

// ==================== ЗАПУСК ====================
document.addEventListener('DOMContentLoaded', () => {
  initTrackSwitcher();
  initFadeIn();
  initFaq();
  initMobileMenu();
});

// ==================== МОБИЛЬНОЕ МЕНЮ ====================
function initMobileMenu() {
  var burger = document.getElementById('headerBurger');
  var nav = document.querySelector('.headerNav');

  if (!burger || !nav) return;

  burger.addEventListener('click', function() {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Закрытие при клике на ссылку
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}