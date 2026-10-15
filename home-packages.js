/* Home-page totals and starting prices follow the shared tour-rates.js file. */
(function () {
  'use strict';
  const root = document.getElementById('geHomeCollections');
  if (!root) return;
  const rates = window.GREEN_EAGLE_RATES || {};
  const collections = [
    {name:'Tamil Nadu',href:'tamilnadu-tour-packages.html',image:'tamilnadu.webp',description:'Hill stations, temple cities and local sightseeing.',keys:['coimbatore','ooty','kotagiri','kodaikanal','valparai','madurai','rameshwaram','kanyakumari','palani','marudhamalai','tiruvannamalai','thanjavur','trichy','tiruchendur','chidambaram']},
    {name:'Kerala',href:'kerala-tour-packages.html',image:'kerala.webp',description:'Tea country, backwaters, waterfalls and beaches.',keys:['munnar','vagamon','wayanad','kanthaloor','alleppey','thekkady','athirapally','kochi','kovalam','varkala']},
    {name:'Karnataka',href:'karnataka-tour-packages.html',image:'karnataka.webp',description:'Heritage, coffee trails, coastal escapes and wildlife.',keys:['mysore','coorg','chikmagalur','udupi','bandipur','nagarhole','gokarna']},
    {name:'Pilgrimage',href:'pilgrimage-tour-packages.html',image:'rameshwaram.webp',description:'Temple journeys and combined pilgrimage routes.',keys:['guruvayur','sabarimala','rameshwaram','madurai','madurai-rameshwaram','marudhamalai','kanyakumari','palani','tiruvannamalai','thanjavur','trichy','tiruchendur','chidambaram','tirupati','udupi']}
  ];
  root.innerHTML = collections.map(collection => {
    const options = collection.keys.flatMap(key => rates[key] || []);
    const prices = options.map(option => option.price).filter(price => typeof price === 'number');
    const price = prices.length ? 'From ₹' + Math.min(...prices).toLocaleString('en-IN') : 'Enquire for price';
    return `<a class="ge-home-card" href="${collection.href}">
      <div class="ge-home-card-image"><img src="images/${collection.image}" alt="${collection.name} tours" loading="lazy"><span class="ge-home-count">${options.length} duration packages</span></div>
      <div class="ge-home-card-body"><span class="ge-home-dest-count">${collection.keys.length} destinations</span><h3>${collection.name}</h3><p>${collection.description}</p>
        <div class="ge-home-starting">${price}<small>per person · minimum 4 guests · sedan</small></div>
        <span class="ge-home-explore">Explore packages <i class="bi bi-arrow-right" aria-hidden="true"></i></span></div></a>`;
  }).join('');
})();
