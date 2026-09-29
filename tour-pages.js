(function () {
  'use strict';
  const page = window.GE_TOUR_PAGE;
  if (!page) return;
  const rateRows = (window.GREEN_EAGLE_RATES || {})[page.key] || [];
  const container = document.getElementById('geDurationGrid');
  const phoneNumber = '919751415617';
  const money = n => '₹' + Number(n).toLocaleString('en-IN');
  const safe = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const description = safe(page.description);
  const suggestedPlan = row => {
    const days = Number((row.duration.match(/^(\d+) Day/) || [0,1])[1]);
    if (page.key === 'ooty') {
      const route = [
        ['Ooty', 'Botanical Garden, Ooty Lake and Doddabetta viewpoint as time permits.'],
        ['Coonoor', 'Sim’s Park, Lamb’s Rock and Dolphin’s Nose, then the return or overnight stay.'],
        ['Pykara', 'Pykara Lake, the waterfalls and Wenlock Downs, subject to opening and travel time.'],
        ['Masinagudi', 'Scenic drive toward Masinagudi and the Mudumalai area; safari only if separately booked and available.']
      ];
      return {
        highlights: ['Ooty sights',...(days >= 2 ? ['Coonoor'] : []),...(days >= 3 ? ['Pykara'] : []),...(days >= 4 ? ['Masinagudi'] : [])],
        days: route.slice(0,days).map(([place,plan],i) => `Day ${i+1} · ${place}: ${plan}`)
      };
    }
    const spots = page.highlights;
    if (days === 1) return {highlights:spots.slice(0,3),days:[`Day 1 · ${page.title}: Pickup, ${spots.slice(0,2).join(' and ').toLowerCase()}, then return. The final stops depend on the available travel time.`]};
    const route = [];
    for (let i=0;i<days;i++) {
      const label = i === 0 ? 'Arrival and first sights' : i === days-1 ? 'Final sights and return' : 'Local exploration';
      const stop = spots[Math.min(i,spots.length-1)];
      route.push(`Day ${i+1} · ${label}: ${stop}. ${i === days-1 ? 'Return after sightseeing.' : 'Timing and overnight stay can be customised.'}`);
    }
    return {highlights:spots,days:route};
  };
  if (container) {
    container.innerHTML = rateRows.map((row, i) => {
      const price = row.price == null ? 'Enquire for price' : money(row.price);
      const detailsId = 'ge-details-' + i;
      const plan = suggestedPlan(row);
      const points = plan.highlights.map(x => '<li>' + safe(x) + '</li>').join('');
      const days = plan.days.map(x => '<li>' + safe(x) + '</li>').join('');
      return `<article class="ge-duration-card">
        <div class="ge-duration-top"><span class="ge-duration-label">${safe(page.category)} · Private tour</span>
          <h3>${safe(row.duration)}</h3><p>${description}</p></div>
        <div class="ge-price"><span>${row.price == null ? 'Custom quote' : 'Sedan package from'}</span>
          <strong>${price}</strong><small>${row.price == null ? 'Share your trip details for a quote.' : 'Per person · minimum 4 guests · sedan'}</small></div>
        <div class="ge-card-actions">
          <a class="ge-call-btn" href="tel:+${phoneNumber}"><i class="bi bi-telephone-fill"></i> Call Now</a>
          <button class="ge-enquire" type="button" data-rate-index="${i}">Enquire Now <i class="bi bi-arrow-right"></i></button>
          <button class="ge-details-btn" type="button" aria-expanded="false" aria-controls="${detailsId}" data-detail-index="${i}">Package details <i class="bi bi-chevron-down"></i></button>
        </div>
        <div class="ge-package-detail" id="${detailsId}" hidden><h4>Tour highlights</h4><ul>${points}</ul>
          <h4>Suggested day plan</h4><ul class="ge-day-plan">${days}</ul>
          <h4>Package includes</h4><p>Private sedan with driver, pickup and drop, and the planned sightseeing route for the chosen duration.</p>
          <h4>Quoted separately</h4><p>Accommodation, meals, entry tickets, boating, safari and other activities. Availability, permits and opening times may affect stops.</p>
          <p class="ge-detail-note">This is a flexible outline. We will confirm the final itinerary and rate for your dates and group before booking.</p></div>
      </article>`;
    }).join('');
  }

  document.body.insertAdjacentHTML('beforeend', `<div class="modal fade ge-modal" id="geTourEnquiry" tabindex="-1" aria-labelledby="geTourEnquiryTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"><div class="modal-content">
      <div class="modal-header"><h2 class="modal-title" id="geTourEnquiryTitle">Plan your trip</h2><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button></div>
      <div class="modal-body"><div class="ge-summary" id="geTourSummary"></div>
      <form id="geTourForm"><div class="row g-3">
        <div class="col-md-6"><label for="geName" class="form-label">Your name *</label><input id="geName" class="form-control" autocomplete="name" required></div>
        <div class="col-md-6"><label for="gePhone" class="form-label">Phone number *</label><input id="gePhone" class="form-control" type="tel" inputmode="numeric" autocomplete="tel" maxlength="10" pattern="[0-9]{10}" title="Enter exactly 10 digits" required></div>
        <div class="col-md-6"><label for="geDate" class="form-label">Pickup date and time *</label><div class="ge-date-input"><input id="geDate" class="form-control" type="text" placeholder="Choose date and time" readonly required><button id="geOpenDate" type="button" aria-label="Choose pickup date and time"><i class="bi bi-calendar3"></i></button></div></div>
        <div class="col-md-6"><label for="gePickup" class="form-label">Pickup location *</label><input id="gePickup" class="form-control" placeholder="Enter your pickup location" required></div>
        <div class="col-md-6"><label for="geDrop" class="form-label">Drop location *</label><input id="geDrop" class="form-control" placeholder="Enter your drop location" required></div>
        <div class="col-12"><div class="ge-stay-choice" role="radiogroup" aria-labelledby="geStayLabel"><div class="ge-stay-label" id="geStayLabel">Accommodation needed? *</div>
          <label><input type="radio" name="geStay" value="Yes" required><span>Yes</span></label>
          <label><input type="radio" name="geStay" value="No" required><span>No</span></label>
        </div></div>
        <div id="geStayDetails" class="col-12" hidden><div class="ge-stay-fields"><p class="ge-stay-heading">Stay requirements</p><div class="row g-3">
          <div class="col-6 col-md-4"><label for="geAdults" class="form-label">Adults *</label><input id="geAdults" class="form-control" type="number" min="1" max="60" value="4"></div>
          <div class="col-6 col-md-4"><label for="geChildren" class="form-label">Children</label><input id="geChildren" class="form-control" type="number" min="0" max="10" value="0"></div>
          <div class="col-md-4"><label for="geRoom" class="form-label">Room category *</label><select id="geRoom" class="form-select"><option value="">Select a category</option><option>2-Star</option><option>3-Star</option><option>4-Star</option><option>5-Star</option><option>Homestay</option><option>Villa</option><option>Resort</option></select></div>
          <div class="col-12" id="geChildAges" aria-live="polite"></div>
        </div></div></div>
        <div class="col-12"><label for="geNotes" class="form-label">Notes (optional)</label><textarea id="geNotes" class="form-control" rows="2" placeholder="Places you want to visit or other requests"></textarea></div>
        <div class="col-12"><button class="ge-enquire w-100" type="submit"><i class="bi bi-whatsapp"></i> Send enquiry on WhatsApp</button></div>
      </div></form></div></div></div></div>
      <div class="ge-date-panel" id="geDatePanel" role="dialog" aria-modal="true" aria-labelledby="geDateTitle" hidden>
        <div class="ge-date-box"><h3 id="geDateTitle">Choose pickup date and time</h3><p>Select both fields, then tap OK to confirm.</p>
          <div class="row g-3"><div class="col-sm-6"><label for="geDatePart" class="form-label">Date</label><input id="geDatePart" type="date" class="form-control"></div>
          <div class="col-sm-6"><label for="geTimePart" class="form-label">Time</label><input id="geTimePart" type="time" class="form-control"></div></div>
          <p id="geDateError" class="ge-date-error" role="alert" hidden></p>
          <div class="ge-date-actions"><button id="geCancelDate" type="button" class="ge-details-btn">Cancel</button><button id="geConfirmDate" type="button" class="ge-enquire">OK</button></div>
        </div>
      </div>`);

  let chosen = null;
  const modal = document.getElementById('geTourEnquiry');
  const form = document.getElementById('geTourForm');
  const phone = document.getElementById('gePhone');
  const date = document.getElementById('geDate');
  const datePanel = document.getElementById('geDatePanel');
  const datePart = document.getElementById('geDatePart');
  const timePart = document.getElementById('geTimePart');
  const dateError = document.getElementById('geDateError');
  const stayDetails = document.getElementById('geStayDetails');
  const adults = document.getElementById('geAdults');
  const children = document.getElementById('geChildren');
  const room = document.getElementById('geRoom');
  const ages = document.getElementById('geChildAges');
  const v = id => document.getElementById(id).value.trim();
  const today = () => {
    const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0,10);
  };
  const setStay = yes => {
    stayDetails.hidden = !yes;
    adults.required = yes;
    room.required = yes;
    children.disabled = !yes;
    ages.querySelectorAll('select').forEach(el => { el.required = yes; el.disabled = !yes; });
  };
  const updateChildAges = () => {
    const count = Math.min(10,Math.max(0,Number(children.value) || 0));
    children.value = count;
    const old = [...ages.querySelectorAll('select')].map(el => el.value);
    ages.innerHTML = count ? `<p class="ge-stay-heading mt-2">Children's ages</p><div class="row g-3">${Array.from({length:count},(_,i) =>
      `<div class="col-6 col-md-3"><label class="form-label" for="geChildAge${i}">Child ${i+1} age *</label><select id="geChildAge${i}" class="form-select ge-child-age" required><option value="">Select age</option>${Array.from({length:18},(_,age) => `<option value="${age}">${age}</option>`).join('')}</select></div>`).join('')}</div>` : '';
    ages.querySelectorAll('select').forEach((el,i) => { el.value = old[i] || ''; });
  };
  phone.addEventListener('input', () => { phone.value = phone.value.replace(/\D/g,'').slice(0,10); });
  children.addEventListener('input', updateChildAges);
  document.querySelectorAll('[name="geStay"]').forEach(el => el.addEventListener('change', () => setStay(el.value === 'Yes')));
  setStay(false);

  const openDate = () => {
    datePart.min = today();
    datePart.value = date.dataset.iso ? date.dataset.iso.slice(0,10) : '';
    timePart.value = date.dataset.iso ? date.dataset.iso.slice(11,16) : '';
    dateError.hidden = true;
    datePanel.hidden = false;
    datePart.focus();
  };
  const closeDate = () => { datePanel.hidden = true; document.getElementById('geOpenDate').focus(); };
  document.getElementById('geOpenDate').addEventListener('click', openDate);
  date.addEventListener('click', openDate);
  document.getElementById('geCancelDate').addEventListener('click', closeDate);
  document.getElementById('geConfirmDate').addEventListener('click', () => {
    const iso = datePart.value && timePart.value ? `${datePart.value}T${timePart.value}` : '';
    if (!iso || new Date(iso).getTime() < Date.now()) {
      dateError.textContent = 'Choose a future date and time, then tap OK.';
      dateError.hidden = false;
      return;
    }
    date.dataset.iso = iso;
    date.value = new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short'}).format(new Date(iso));
    date.setCustomValidity('');
    closeDate();
  });
  datePanel.addEventListener('keydown', event => { if (event.key === 'Escape') closeDate(); });

  document.addEventListener('click', event => {
    const detailsBtn = event.target.closest('[data-detail-index]');
    if (detailsBtn) {
      const panel = document.getElementById(detailsBtn.getAttribute('aria-controls'));
      panel.hidden = !panel.hidden;
      detailsBtn.setAttribute('aria-expanded', String(!panel.hidden));
    }
    const enquireBtn = event.target.closest('[data-rate-index]');
    if (enquireBtn) {
      chosen = rateRows[Number(enquireBtn.dataset.rateIndex)];
      document.getElementById('geTourSummary').textContent = `${page.title} · ${chosen.duration} · ${chosen.price == null ? 'Price on enquiry' : money(chosen.price) + ' per person, minimum 4 guests in a sedan'}`;
      bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!chosen) return;
    if (!date.dataset.iso || new Date(date.dataset.iso).getTime() < Date.now()) {
      openDate();
      dateError.textContent = 'Choose a future pickup date and time, then tap OK.';
      dateError.hidden = false;
      return;
    }
    if (!form.reportValidity()) return;
    const stay = document.querySelector('[name="geStay"]:checked').value;
    const guestLines = stay === 'Yes' ? [
      `Adults: ${v('geAdults')}`,
      `Children: ${v('geChildren')}`,
      ...(Number(children.value) ? [`Children's ages: ${[...ages.querySelectorAll('select')].map(el => el.value).join(', ')}`] : []),
      `Room category: ${v('geRoom')}`
    ] : [];
    const message = [
      '*GREEN EAGLE | TOUR ENQUIRY*',
      '',
      '*TRIP DETAILS*',
      `Destination: ${page.title}`,
      `Duration: ${chosen.duration}`,
      `Starting sedan rate: ${chosen.price == null ? 'Please quote' : money(chosen.price) + ' per person (minimum 4 guests)'}`,
      `Pickup: ${v('gePickup')}`,
      `Drop: ${v('geDrop')}`,
      `Pickup date & time: ${v('geDate')}`,
      '',
      '*TRAVELLER DETAILS*',
      `Name: ${v('geName')}`,
      `Phone: ${v('gePhone')}`,
      '',
      '*ACCOMMODATION*',
      `Required: ${stay}`,
      ...guestLines,
      ...(v('geNotes') ? ['', '*ADDITIONAL REQUEST*',v('geNotes')] : []),
      '',
      'Please share the available options and final quote.'
    ].join('\n');
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
})();
