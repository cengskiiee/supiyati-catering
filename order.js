'use strict';

const form = document.querySelector('#order');
const packageField = document.querySelector('#pilihan');
form.elements.tanggal.min = new Date().toLocaleDateString('sv-SE', {timeZone: 'Asia/Jakarta'});

document.querySelectorAll('[data-package]').forEach(link => {
  link.addEventListener('click', () => {
    packageField.value = link.dataset.package;
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(form);
  const location = fields.get('lokasi').trim();
  if (!location) {
    form.elements.lokasi.setCustomValidity('Isi lokasi acara di Jakarta.');
    form.elements.lokasi.reportValidity();
    return;
  }
  const date = new Intl.DateTimeFormat('id-ID', {dateStyle: 'long', timeZone: 'UTC'})
    .format(new Date(fields.get('tanggal') + 'T00:00:00Z'));
  const message = [
    'Halo Supiyati Catering, saya ingin menanyakan ketersediaan dan harga untuk acara saya.',
    '',
    'Paket: ' + fields.get('paket'),
    'Tanggal acara: ' + date,
    'Jumlah: ' + fields.get('porsi') + ' porsi',
    'Lokasi: ' + location
  ];
  const note = fields.get('catatan').trim();
  if (note) message.push('Catatan: ' + note);
  const whatsapp = new URL('https://wa.me/6287771234924');
  whatsapp.searchParams.set('text', message.join('\n'));
  window.location.assign(whatsapp);
});

form.elements.lokasi.addEventListener('input', () => form.elements.lokasi.setCustomValidity(''));
