(function () {
  'use strict';

  const lines = [
    { text: '> ashwath.ai("automate_workflow")', speed: 60 },
    { text: '> build.software("custom_app")', speed: 50 },
    { text: '> voice.over("your_project")', speed: 70 },
    { text: '> social.strategy("grow")', speed: 65 },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const terminalEl = document.getElementById('terminal-text');
  const cursor = document.getElementById('terminal-cursor');

  function typeTerminal() {
    if (!terminalEl) return;
    const current = lines[lineIndex];
    const fullText = current.text;

    if (!isDeleting) {
      terminalEl.textContent = fullText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === fullText.length) {
        setTimeout(function () { isDeleting = true; }, 1500);
        setTimeout(typeTerminal, 1500);
        return;
      }
      setTimeout(typeTerminal, current.speed);
    } else {
      terminalEl.textContent = fullText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        setTimeout(typeTerminal, 400);
        return;
      }
      setTimeout(typeTerminal, 30);
    }
  }

  function initNavToggle() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  function initActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === current) {
        a.classList.add('active');
      }
    });
  }

  function initScrollReveal() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initActiveNav();
    initNavToggle();
    typeTerminal();
    initScrollReveal();
  });

})();
