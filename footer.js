(function () {
  'use strict';
  const columns = [
  [
    "Tamil Nadu",
    "tamilnadu-tour-packages.html",
    [
      [
        "Coimbatore Local Sightseeing",
        "coimbatore-packages.html"
      ],
      [
        "Ooty",
        "ooty-packages.html"
      ],
      [
        "Kotagiri",
        "kotagiri-packages.html"
      ],
      [
        "Kodaikanal",
        "kodaikanal-packages.html"
      ],
      [
        "Valparai",
        "valparai-packages.html"
      ],
      [
        "Madurai",
        "madurai-packages.html"
      ],
      [
        "Rameswaram",
        "rameshwaram-packages.html"
      ],
      [
        "Kanyakumari",
        "kanyakumari-packages.html"
      ],
      [
        "Palani",
        "palani-packages.html"
      ],
      [
        "Marudhamalai",
        "marudhamalai-packages.html"
      ],
      [
        "Tiruvannamalai",
        "tiruvannamalai-packages.html"
      ],
      [
        "Thanjavur",
        "thanjavur-packages.html"
      ],
      [
        "Trichy",
        "trichy-packages.html"
      ],
      [
        "Tiruchendur",
        "tiruchendur-packages.html"
      ],
      [
        "Chidambaram",
        "chidambaram-packages.html"
      ]
    ]
  ],
  [
    "Kerala",
    "kerala-tour-packages.html",
    [
      [
        "Munnar",
        "munnar-packages.html"
      ],
      [
        "Vagamon",
        "vagamon-packages.html"
      ],
      [
        "Wayanad",
        "wayanad-packages.html"
      ],
      [
        "Kanthalloor",
        "kanthaloor-packages.html"
      ],
      [
        "Alleppey",
        "alleppey-packages.html"
      ],
      [
        "Thekkady",
        "thekkady-packages.html"
      ],
      [
        "Athirapally",
        "athirapally-packages.html"
      ],
      [
        "Kochi",
        "kochi-packages.html"
      ],
      [
        "Kovalam",
        "kovalam-packages.html"
      ],
      [
        "Varkala",
        "varkala-packages.html"
      ]
    ]
  ],
  [
    "Karnataka",
    "karnataka-tour-packages.html",
    [
      [
        "Mysore",
        "mysore-tour-packages.html"
      ],
      [
        "Coorg",
        "coorg-packages.html"
      ],
      [
        "Chikmagalur",
        "chikmagalur-packages.html"
      ],
      [
        "Udupi",
        "udupi-packages.html"
      ],
      [
        "Bandipur",
        "bandipur-packages.html"
      ],
      [
        "Nagarhole",
        "nagarhole-packages.html"
      ],
      [
        "Gokarna",
        "gokarna-packages.html"
      ]
    ]
  ],
  [
    "Pilgrimage",
    "pilgrimage-tour-packages.html",
    [
      [
        "Guruvayur",
        "guruvayur-packages.html"
      ],
      [
        "Sabarimala",
        "sabarimala-packages.html"
      ],
      [
        "Rameswaram",
        "rameshwaram-packages.html"
      ],
      [
        "Madurai",
        "madurai-packages.html"
      ],
      [
        "Madurai & Rameswaram",
        "madurai-rameshwaram-packages.html"
      ],
      [
        "Marudhamalai",
        "marudhamalai-packages.html"
      ],
      [
        "Kanyakumari",
        "kanyakumari-packages.html"
      ],
      [
        "Palani",
        "palani-packages.html"
      ],
      [
        "Tiruvannamalai",
        "tiruvannamalai-packages.html"
      ],
      [
        "Thanjavur",
        "thanjavur-packages.html"
      ],
      [
        "Trichy",
        "trichy-packages.html"
      ],
      [
        "Tiruchendur",
        "tiruchendur-packages.html"
      ],
      [
        "Chidambaram",
        "chidambaram-packages.html"
      ],
      [
        "Tirupati",
        "tirupati-packages.html"
      ],
      [
        "Udupi",
        "udupi-packages.html"
      ]
    ]
  ]
];
  const tours = columns.map(([name, href, items]) => `<div class="col-6 col-lg-3 mb-4"><a class="footer-main-link" href="${href}">${name} Tour Packages</a><ul class="footer-links">${items.map(([label, url]) => `<li><a href="${url}">${label}</a></li>`).join('')}</ul></div>`).join('');
  const markup = `<footer><div class="container text-center">
    <img src="images/logo.png" alt="Green Eagle Tours" class="footer-logo">
    <p class="footer-desc">Your travel partner for journeys from Coimbatore across South India. Excellence in every mile.</p>
    <div class="footer-divider"></div><div class="row text-start footer-tours">${tours}</div><div class="footer-divider"></div>
    <div class="mb-4 ge-footer-socials"><a href="https://wa.me/919751415617" class="social-link" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
      <a href="tel:+919751415617" class="social-link" aria-label="Call"><i class="bi bi-telephone-fill"></i></a>
      <a href="mailto:support@greeneagletours.com" class="social-link" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
      <a href="https://www.facebook.com/share/1GHVkhtPcd/" class="social-link" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
      <a href="https://www.instagram.com/green_eagle_holidays" class="social-link" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a></div>
    <p class="footer-small">GST: 33BVFPG0418P1ZM</p>
    <p class="footer-small">78, Siruvani Main Rd, Post office upstairs, Perur, Coimbatore, Tamil Nadu 641010</p>
    <p class="footer-small">© 2026 Green Eagle Tours & Travels.</p>
    <p class="footer-small">Designed & curated by <a href="https://marcinmind.in" target="_blank" rel="noopener">Marc in Mind Technologies</a>.</p>
  </div></footer>
  <div class="fab-bar show" id="fabBar" aria-label="Quick contact">
    <div class="ge-bottom-inner"><button class="fab-item ge-mobile-only" type="button" onclick="openMenu()"><i class="bi bi-list"></i><span>Menu</span></button>
      <a href="mailto:support@greeneagletours.com" class="fab-item"><i class="bi bi-envelope-fill"></i><span>Mail</span></a>
      <a href="https://wa.me/919751415617" class="fab-item" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i><span>WhatsApp</span></a>
      <a href="tel:+919751415617" class="fab-item"><i class="bi bi-telephone-fill"></i><span>Call</span></a></div>
  </div>`;
  document.currentScript.insertAdjacentHTML('afterend', markup);
})();
