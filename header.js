(function () {
  'use strict';
  const current = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  const tourPages = /(?:packages|tour-packages)\.html$/.test(current);
  const links = [
    ['index.html', 'Home'],
    ['hourly-packages.html', 'Hourly Packages'],
    ['services.html', 'Services'],
    ['about.html', 'About'],
    ['contact.html', 'Contact']
  ];
  const link = ([href, label]) => `<a href="${href}" class="nav-link${current === href ? ' active' : ''}"${current === href ? ' aria-current="page"' : ''}>${label}</a>`;
  const tourLinks = [
    ['tamilnadu-tour-packages.html', 'Tamil Nadu'],
    ['kerala-tour-packages.html', 'Kerala'],
    ['karnataka-tour-packages.html', 'Karnataka'],
    ['pilgrimage-tour-packages.html', 'Pilgrimage']
  ];
  const categories = tourLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join('');
  const desktop = `<nav class="glass-nav" id="navbar" aria-label="Main navigation">
    <div class="container ge-nav-inner"><a href="index.html" class="logo-wrapper" aria-label="Green Eagle home"><img src="images/logo.png" alt="Green Eagle Tours" class="nav-logo"></a>
      <div class="ge-desktop-links">${link(links[0])}
        <div class="ge-nav-dropdown"><a href="tour-packages.html" class="nav-link${tourPages ? ' active' : ''}"${current === 'tour-packages.html' ? ' aria-current="page"' : ''}>Tour Packages</a>
          <button class="ge-nav-toggle" type="button" aria-label="Show tour package categories" aria-expanded="false" aria-controls="geTourMenu"><i class="bi bi-chevron-down" aria-hidden="true"></i></button>
          <div id="geTourMenu" class="ge-nav-menu"><a href="tour-packages.html">All Tour Packages</a>${categories}</div></div>
        ${links.slice(1).map(link).join('')}
      </div>
    </div>
  </nav>
  <div class="menu-overlay" id="menuOverlay"></div>
  <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Mobile navigation" aria-hidden="true">
    <button type="button" class="ge-mobile-close" aria-label="Close menu"><i class="bi bi-x-lg"></i></button>
    <a href="index.html" class="ge-menu-logo"><img src="images/logo.png" alt="Green Eagle Tours"></a>
    <a href="index.html"${current === 'index.html' ? ' class="active"' : ''}>Home</a>
    <details class="ge-mobile-tour"${tourPages ? ' open' : ''}><summary>Tour Packages <i class="bi bi-chevron-down" aria-hidden="true"></i></summary>
      <div class="ge-mobile-tour-links"><a href="tour-packages.html">All Tour Packages</a>${categories}</div></details>
    ${links.slice(1).map(([href, label]) => `<a href="${href}"${current === href ? ' class="active"' : ''}>${label}</a>`).join('')}
  </div>`;
  document.currentScript.insertAdjacentHTML('afterend', desktop);
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  window.openMenu = function () {
    menu.classList.add('active'); overlay.classList.add('show');
    menu.setAttribute('aria-hidden', 'false'); document.body.classList.add('menu-open');
    menu.querySelector('.ge-mobile-close').focus();
  };
  window.closeMenu = function () {
    menu.classList.remove('active'); overlay.classList.remove('show');
    menu.setAttribute('aria-hidden', 'true'); document.body.classList.remove('menu-open');
  };
  overlay.addEventListener('click', window.closeMenu);
  menu.querySelector('.ge-mobile-close').addEventListener('click', window.closeMenu);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') window.closeMenu(); });
  const dropdown = document.querySelector('.ge-nav-dropdown');
  const toggle = dropdown.querySelector('.ge-nav-toggle');
  toggle.addEventListener('click', () => {
    const open = dropdown.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false');
    }
  });
  window.addEventListener('scroll', () => document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30), {passive:true});
})();
