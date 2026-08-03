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
        initHeaderScroll();
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

// ==================== ПРОЗРАЧНОСТЬ ХЕДЕРА ПРИ СКРОЛЛЕ ====================
function initHeaderScroll() {
  var header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
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

// ==================== ЧЕК-ЛИСТ ГОТОВНОСТИ ====================
function initReadinessQuiz() {
  // Проверяем, закрывал ли пользователь
  if (sessionStorage.getItem('quizClosed') === 'true') return;

  // Кнопка-триггер
  var trigger = document.createElement('button');
  trigger.id = 'quizTrigger';
  trigger.textContent = 'Чек-лист';
  trigger.setAttribute('aria-label', 'Проверьте готовность к data-проекту');
  document.body.appendChild(trigger);

  // Тултип
  var tooltipEl = document.createElement('span');
  tooltipEl.id = 'quizTooltip';
  tooltipEl.textContent = 'Проверьте готовность к data-проекту';
  trigger.appendChild(tooltipEl);

  // Модальное окно
  var overlay = document.createElement('div');
  overlay.id = 'quizOverlay';
  overlay.innerHTML =
    '<div class="quizModal">' +
    '  <button class="quizClose" id="quizClose">&times;</button>' +
    '  <div class="quizHeader">' +
    '    <h2 class="quizTitle">Готовы ли вы к data-проекту?</h2>' +
    '    <div class="quizProgress"><span id="quizStep">1</span> / <span id="quizTotal">10</span></div>' +
    '  </div>' +
    '  <div class="quizBody" id="quizBody"></div>' +
    '  <div class="quizFooter">' +
    '    <button class="btn btnSecondary" id="quizPrev" style="display:none;">← Назад</button>' +
    '  </div>' +
    '</div>';
  document.body.appendChild(overlay);

  // Стили
  var style = document.createElement('style');
  style.textContent =
    '#quizTrigger { position: fixed; bottom: 28px; right: 28px; padding: 14px 22px; border-radius: 12px; border: 1px solid var(--colorAccent); background: var(--colorSurface); color: var(--colorAccent); font-size: 0.875rem; font-weight: 600; cursor: pointer; z-index: 1000; animation: quizPulse 2.5s ease-in-out infinite; transition: all 0.2s; font-family: var(--fontMain); } ' +
    '#quizTrigger:hover { background: var(--colorAccent); color: #fff; animation: none; } ' +
    '#quizTooltip { position: absolute; bottom: calc(100% + 10px); right: 0; background: var(--colorSurface); border: 1px solid var(--colorBorder); color: var(--colorText); font-size: 0.75rem; padding: 6px 12px; border-radius: 6px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s; font-weight: 400; } ' +
    '#quizTrigger:hover #quizTooltip { opacity: 1; } ' +
    '@keyframes quizPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(88, 166, 255, 0.4); } 50% { box-shadow: 0 0 0 12px rgba(88, 166, 255, 0); } } ' +
    '#quizOverlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 2000; display: none; align-items: center; justify-content: center; } ' +
    '#quizOverlay.open { display: flex; } ' +
    '.quizModal { background: var(--colorBg); border: 1px solid var(--colorBorder); border-radius: var(--radiusLg); padding: 36px 32px 28px; max-width: 560px; width: 90%; position: relative; } ' +
    '.quizClose { position: absolute; top: 12px; right: 16px; background: none; border: none; color: var(--colorTextMuted); font-size: 1.5rem; cursor: pointer; } ' +
    '.quizClose:hover { color: var(--colorText); } ' +
    '.quizHeader { margin-bottom: 28px; } ' +
    '.quizTitle { font-size: 1.25rem; font-weight: 700; color: var(--colorText); margin-bottom: 8px; } ' +
    '.quizProgress { font-family: var(--fontMono); font-size: 0.75rem; color: var(--colorTextMuted); } ' +
    '.quizBody { margin-bottom: 28px; } ' +
    '.quizQuestion { font-size: 1.0625rem; color: var(--colorText); margin-bottom: 20px; line-height: 1.5; } ' +
    '.quizAnswers { display: flex; flex-direction: column; gap: 10px; } ' +
    '.quizAnswer { display: block; width: 100%; padding: 14px 18px; background: var(--colorSurface); border: 1px solid var(--colorBorder); border-radius: var(--radiusMd); color: var(--colorText); font-size: 0.938rem; cursor: pointer; text-align: left; transition: all 0.15s; } ' +
    '.quizAnswer:hover { border-color: var(--colorAccent); background: var(--colorSurfaceHover); } ' +
    '.quizAnswer.selected { border-color: var(--colorAccent); background: rgba(88, 166, 255, 0.08); } ' +
    '.quizFooter { display: flex; justify-content: flex-start; } ' +
    '.quizResult { text-align: center; } ' +
    '.quizResultIcon { font-size: 3rem; margin-bottom: 12px; } ' +
    '.quizResultTitle { font-size: 1.25rem; font-weight: 700; color: var(--colorText); margin-bottom: 8px; } ' +
    '.quizResultText { font-size: 0.938rem; color: var(--colorTextSecondary); line-height: 1.6; margin-bottom: 20px; } ' +
    '@media (max-width: 500px) { .quizModal { padding: 24px 18px 20px; } .quizTitle { font-size: 1.1rem; } }';
  document.head.appendChild(style);

  // Состояние
  var currentStep = 0;
  var answers = [];
  var questions = [];

  // Загружаем вопросы
  fetch('/OBorisov_analyst_CV/assets/data/readiness.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      questions = data;
      document.getElementById('quizTotal').textContent = questions.length;
      renderStep();
    });

  // Рендер шага
  function renderStep() {
    var q = questions[currentStep];
    var body = document.getElementById('quizBody');
    var selected = answers[currentStep] !== undefined ? answers[currentStep] : -1;

    var html = '<div class="quizQuestion">' + q.question + '</div>';
    html += '<div class="quizAnswers">';
    q.options.forEach(function(opt, i) {
      html += '<button class="quizAnswer' + (i === selected ? ' selected' : '') + '" data-index="' + i + '">' + opt.label + '</button>';
    });
    html += '</div>';
    body.innerHTML = html;

    document.getElementById('quizStep').textContent = currentStep + 1;
    document.getElementById('quizPrev').style.display = currentStep === 0 ? 'none' : 'inline-flex';

    // Обработчики ответов
    body.querySelectorAll('.quizAnswer').forEach(function(btn) {
      btn.addEventListener('click', function() {
        body.querySelectorAll('.quizAnswer').forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        answers[currentStep] = parseInt(btn.getAttribute('data-index'));

        setTimeout(function() {
          if (currentStep === questions.length - 1) {
            showResult();
          } else {
            currentStep++;
            renderStep();
          }
        }, 200);
      });
    });
  }

  // Навигация назад
  document.getElementById('quizPrev').addEventListener('click', function() {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  });

  // Результат
  function showResult() {
    var total = answers.reduce(function(sum, val, i) {
      return sum + questions[i].options[val].score;
    }, 0);
    var maxScore = questions.reduce(function(sum, q) {
      return sum + Math.max.apply(null, q.options.map(function(o) { return o.score; }));
    }, 0);
    var pct = total / maxScore;

    var level, icon, title, text;
    if (pct >= 0.75) {
      level = 'ready'; icon = '🟢'; title = 'Вы готовы к data-проекту';
      text = 'У вас есть данные, понимание цели и реалистичные ожидания. Можно стартовать.';
    } else if (pct >= 0.45) {
      level = 'almost'; icon = '🟡'; title = 'Почти готовы';
      text = 'Есть пара моментов, которые стоит прояснить перед стартом. Давайте обсудим — я помогу разобраться.';
    } else {
      level = 'notReady'; icon = '🔴'; title = 'Пока рано';
      text = 'Сейчас запуск data-проекта рискован. Но это не приговор — давайте обсудим, с чего начать подготовку.';
    }

    var body = document.getElementById('quizBody');
    body.innerHTML =
      '<div class="quizResult">' +
      '<div class="quizResultIcon">' + icon + '</div>' +
      '<div class="quizResultTitle">' + title + '</div>' +
      '<div class="quizResultText">' + text + '</div>' +
      '<a href="https://max.ru/u/f9LHodD0cOKlBfgKnrDXJZkZH9USJodMW4B0SCaGVpPpKNEwYyVrvHo08HQ" class="btn btnPrimary" target="_blank" rel="noopener">Обсудить в Макс</a>' +
      '</div>';
    document.getElementById('quizFooter').style.display = 'none';
    document.getElementById('quizProgress').style.display = 'none';
  }

  // Открытие / закрытие
  trigger.addEventListener('click', function() {
    document.getElementById('quizOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  document.getElementById('quizClose').addEventListener('click', function() {
    document.getElementById('quizOverlay').classList.remove('open');
    document.body.style.overflow = '';
    sessionStorage.setItem('quizClosed', 'true');
  });

  document.getElementById('quizOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
      document.getElementById('quizOverlay').classList.remove('open');
      document.body.style.overflow = '';
      sessionStorage.setItem('quizClosed', 'true');
    }
  });
}

// ==================== КАЛЬКУЛЯТОР СТОИМОСТИ ====================
function initCalculator() {
  var container = document.getElementById('calculatorContainer');
  if (!container) return;

  var data = {};
  var selections = {
    type: null,
    volume: 0,
    complexity: 0,
    urgency: 0,
    options: {}
  };

  // Загружаем конфиг
  fetch('/OBorisov_analyst_CV/assets/data/calculator.json')
    .then(function(r) { return r.json(); })
    .then(function(json) {
      data = json;
      renderCalculator();
    });

  function renderCalculator() {
    var html = '';

    // Тип задачи — плитки
    html += '<div class="calcSection"><h3 class="calcSectionTitle">Тип задачи</h3><div class="calcTiles">';
    var types = [
      {id: 'audit', label: 'Аудит и консалтинг', desc: 'Разбор данных и процессов'},
      {id: 'research', label: 'Исследование', desc: 'Проверка гипотез, анализ'},
      {id: 'dashboard', label: 'Дашборд / инструмент', desc: 'Разработка под ключ'},
      {id: 'fullCycle', label: 'Полный цикл', desc: 'Исследование + дашборд'},
      {id: 'science', label: 'Наукоёмкое', desc: 'Диссертации, академические'}
    ];
    types.forEach(function(t) {
      html += '<button class="calcTile' + (selections.type === t.id ? ' active' : '') + '" data-type="' + t.id + '">';
      html += '<span class="calcTileLabel">' + t.label + '</span>';
      html += '<span class="calcTileDesc">' + t.desc + '</span>';
      html += '</button>';
    });
    html += '</div></div>';

    // Общие параметры
    html += renderRadio('volume', 'Объём данных', data.volume);
    html += renderRadio('complexity', 'Сложность данных', data.complexity);
    html += renderRadio('urgency', 'Срочность', data.urgency);

    // Опции — зависят от типа
    if (selections.type && selections.type !== 'science') {
      var relevantOptions = getRelevantOptions();
      if (relevantOptions.length > 0) {
        html += '<div class="calcSection"><h3 class="calcSectionTitle">Дополнительные опции</h3>';
        relevantOptions.forEach(function(opt) {
          html += '<label class="calcCheckbox">';
          html += '<input type="checkbox" data-option="' + opt.id + '"' + (selections.options[opt.id] ? ' checked' : '') + '>';
          html += '<span class="calcCheckboxLabel">' + opt.label + ' (+' + opt.percent + '%)</span>';
          html += '</label>';
        });
        html += '</div>';
      }
    }

    container.innerHTML = html;
    bindEvents();
    updateResult();
  }

  function renderRadio(id, title, options) {
    var h = '<div class="calcSection"><h3 class="calcSectionTitle">' + title + '</h3><div class="calcRadioGroup">';
    options.forEach(function(opt, i) {
      h += '<button class="calcRadio' + (selections[id] === i ? ' active' : '') + '" data-group="' + id + '" data-index="' + i + '">' + opt.label + '</button>';
    });
    h += '</div></div>';
    return h;
  }

  function getRelevantOptions() {
    var result = [];
    Object.keys(data.options).forEach(function(key) {
      var opt = data.options[key];
      if (opt.type === 'all' || opt.type === selections.type ||
          (opt.type === 'research' && (selections.type === 'research' || selections.type === 'fullCycle')) ||
          (opt.type === 'dashboard' && (selections.type === 'dashboard' || selections.type === 'fullCycle'))) {
        result.push(Object.assign({id: key}, opt));
      }
    });
    return result;
  }

  function bindEvents() {
    // Плитки типа
    container.querySelectorAll('.calcTile').forEach(function(btn) {
      btn.addEventListener('click', function() {
        selections.type = btn.getAttribute('data-type');
        selections.options = {};
        renderCalculator();
      });
    });

    // Радио-кнопки
    container.querySelectorAll('.calcRadio').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var group = btn.getAttribute('data-group');
        var index = parseInt(btn.getAttribute('data-index'));
        selections[group] = index;
        renderCalculator();
      });
    });

    // Чекбоксы
    container.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
      cb.addEventListener('change', function() {
        var optId = cb.getAttribute('data-option');
        selections.options[optId] = cb.checked;
        updateResult();
      });
    });
  }

  function updateResult() {
    var resultValue = document.getElementById('calcResultValue');
    var resultNote = document.getElementById('calcResultNote');
    var stickyValue = document.getElementById('calcResultValueSticky');
    var stickyNote = document.getElementById('calcResultNoteSticky');

    if (!selections.type || selections.type === 'science') {
      var sciText = selections.type === 'science' ? 'Индивидуально' : '—';
      var sciNote = selections.type === 'science' ? 'Стоимость обсуждается после знакомства с проектом' : '';
      if (resultValue) resultValue.textContent = sciText;
      if (resultNote) resultNote.textContent = sciNote;
      if (stickyValue) stickyValue.textContent = sciText;
      if (stickyNote) stickyNote.textContent = sciNote;
      return;
    }

    var base = data.baseRates[selections.type];
    var volFactor = data.volume[selections.volume].factor;
    var compFactor = data.complexity[selections.complexity].factor;
    var urgFactor = data.urgency[selections.urgency].factor;

    var optSum = 0;
    var optDetails = [];
    Object.keys(selections.options).forEach(function(key) {
      if (selections.options[key] && data.options[key]) {
        var pct = data.options[key].percent;
        var amount = Math.round(base * pct / 100);
        optSum += amount;
        optDetails.push(data.options[key].label + ': +' + amount.toLocaleString('ru-RU') + ' ₽');
      }
    });

    var middle = Math.round(base * volFactor * compFactor * urgFactor) + optSum;
    var low = Math.max(base, middle);
    var high = Math.round(middle * 1.2);
    if (high < low) high = Math.round(low * 1.15);

    var valueHTML = low.toLocaleString('ru-RU') + ' – ' + high.toLocaleString('ru-RU') + ' <span class="calcCurrency">₽</span>';

    var detailHTML = 'База: ' + base.toLocaleString('ru-RU') + ' ₽';
    detailHTML += ' × ' + volFactor.toFixed(1) + ' (объём)';
    detailHTML += ' × ' + compFactor.toFixed(1) + ' (сложность)';
    detailHTML += ' × ' + urgFactor.toFixed(1) + ' (срочность)';
    if (optDetails.length > 0) {
      detailHTML += '<br>' + optDetails.join(', ');
    }
    detailHTML += '<br>Верхняя граница: ×1.2';

    if (resultValue) resultValue.innerHTML = valueHTML;
    if (resultNote) resultNote.innerHTML = detailHTML;
    if (stickyValue) stickyValue.innerHTML = valueHTML;
    if (stickyNote) stickyNote.innerHTML = detailHTML;
  }
}

// ==================== ЗАПУСК ====================
document.addEventListener('DOMContentLoaded', function() {
  loadIncludes();
  initTrackSwitcher();
  initFadeIn();
  initFaq();
  initReadinessQuiz();
  initCalculator();
});