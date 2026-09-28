(function () {
  'use strict';
  const page = window.GE_TOUR_PAGE;
  if (!page) return;
  const rateRows = (window.GREEN_EAGLE_RATES || {})[page.key] || [];
  const container = document.getElementById('geDurationGrid');
  const money = n => '₹' + Number(n).toLocaleString('en-IN');
  const safe = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const description = safe(page.description);
  if (container) {
    container.innerHTML = rateRows.map((row, i) => {
      const price = row.price == null ? 'Enquire for price' : money(row.price);
      const detailsId = 'ge-details-' + i;
      const points = page.highlights.map(x => '<li>' + safe(x) + '</li>').join('');
      return `<article class="ge-duration-card">
        <div class="ge-duration-top"><span class="ge-duration-label">${safe(page.category)} · Private tour</span>
          <h3>${safe(row.duration)}</h3><p>${description}</p></div>
        <div class="ge-price"><span>${row.price == null ? 'Custom quote' : 'Sedan package from'}</span>
          <strong>${price}</strong><small>${row.price == null ? 'Share your trip details for a quote.' : 'Per person · minimum 4 guests · sedan'}</small></div>
        <div class="ge-card-actions"><button class="ge-enquire" type="button" data-rate-index="${i}">Enquire on WhatsApp <i class="bi bi-arrow-right"></i></button>
          <button class="ge-details-btn" type="button" aria-expanded="false" aria-controls="${detailsId}" data-detail-index="${i}">Package details <i class="bi bi-chevron-down"></i></button></div>
        <div class="ge-package-detail" id="${detailsId}" hidden><h4>Tour highlights</h4><ul>${points}</ul>
          <h4>Flexible trip plan</h4><p>Sightseeing stops and travel timing are planned around your selected duration, pickup point and preferences. Accommodation can be requested separately.</p>
          <h4>Price basis</h4><p>The displayed starting rate is for four guests travelling by sedan. Final price depends on your dates, route, passenger count, vehicle and any accommodation request.</p></div>
      </article>`;
    }).join('');
  }

  document.body.insertAdjacentHTML('beforeend', `<div class="modal fade ge-modal" id="geTourEnquiry" tabindex="-1" aria-labelledby="geTourEnquiryTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"><div class="modal-content">
      <div class="modal-header"><h2 class="modal-title" id="geTourEnquiryTitle">Plan your trip</h2><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button></div>
      <div class="modal-body"><div class="ge-summary" id="geTourSummary"></div>
      <form id="geTourForm"><div class="row g-3">
        <div class="col-md-6"><label for="geName" class="form-label">Your name *</label><input id="geName" class="form-control" autocomplete="name" required></div>
        <div class="col-md-6"><label for="gePhone" class="form-label">Phone number *</label><input id="gePhone" class="form-control" type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9+() -]{10,18}" required></div>
        <div class="col-md-6"><label for="geDate" class="form-label">Pickup date and time *</label><input id="geDate" class="form-control" type="datetime-local" required></div>
        <div class="col-md-6"><label for="gePickup" class="form-label">Pickup location *</label><input id="gePickup" class="form-control" placeholder="Enter your pickup location" required></div>
        <div class="col-md-6"><label for="geDrop" class="form-label">Drop location *</label><input id="geDrop" class="form-control" placeholder="Enter your drop location" required></div>
        <div class="col-6 col-md-3"><label for="geAdults" class="form-label">Adults *</label><input id="geAdults" class="form-control" type="number" min="1" max="60" value="4" required></div>
        <div class="col-6 col-md-3"><label for="geChildren" class="form-label">Children</label><input id="geChildren" class="form-control" type="number" min="0" max="60" value="0"></div>
        <div class="col-md-6"><label for="geVehicle" class="form-label">Preferred vehicle</label><select id="geVehicle" class="form-select"><option>Sedan</option><option>Ertiga</option><option>Innova</option><option>Innova Crysta</option><option>Tempo Traveller</option><option>Mini Coach</option><option>Bus</option></select></div>
        <div class="col-md-6"><label for="geStay" class="form-label">Accommodation needed?</label><select id="geStay" class="form-select"><option value="No">No</option><option value="Yes">Yes</option><option value="Please suggest">Please suggest options</option></select></div>
        <div class="col-12"><label for="geNotes" class="form-label">Notes (optional)</label><textarea id="geNotes" class="form-control" rows="2" placeholder="Pickup details or places you want to visit"></textarea></div>
        <div class="col-12"><button class="ge-enquire w-100" type="submit"><i class="bi bi-whatsapp"></i> Send enquiry on WhatsApp</button></div>
      </div></form></div></div></div></div>`);

  let chosen = null;
  const modal = document.getElementById('geTourEnquiry');
  const date = document.getElementById('geDate');
  function minDate() {
    const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0,16);
  }
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
      date.min = minDate();
      document.getElementById('geTourSummary').textContent = `${page.title} · ${chosen.duration} · ${chosen.price == null ? 'Price on enquiry' : money(chosen.price) + ' per person, minimum 4 guests in a sedan'}`;
      bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  });
  document.getElementById('geTourForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    date.min = minDate();
    if (!form.reportValidity() || !chosen) return;
    const v = id => document.getElementById(id).value.trim();
    const message = [
      '*Green Eagle Tour Enquiry*',
      `Destination: ${page.title}`,
      `Duration: ${chosen.duration}`,
      `Displayed sedan rate: ${chosen.price == null ? 'Price on enquiry' : money(chosen.price) + ' per person (minimum 4 guests)'}`,
      `Name: ${v('geName')}`, `Phone: ${v('gePhone')}`,
      `Pickup date & time: ${v('geDate').replace('T',' ')}`,
      `Pickup: ${v('gePickup')}`, `Drop: ${v('geDrop')}`,
      `Adults: ${v('geAdults')}`, `Children: ${v('geChildren')}`,
      `Preferred vehicle: ${v('geVehicle')}`, `Accommodation: ${v('geStay')}`,
      `Notes: ${v('geNotes') || 'None'}`
    ].join('\n');
    window.open('https://wa.me/919751415617?text=' + encodeURIComponent(message), '_blank', 'noopener');
  });
})();
