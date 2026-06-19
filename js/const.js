const GAS_URL = 'https://script.google.com/macros/s/AKfycbzwAlNQ9G4n5KrchA0DU2X4vhbj74kZSxhNKQn8qhgjHTdWLU6sgBZPb30JpHs5_yk/exec';
const YOUR_CLIENT_ID = '223887521833-37kdjp7rfucrpsidm1acciabl1soeegq.apps.googleusercontent.com';
const YOUR_REDIRECT_URI = 'https://motherslovecafe.github.io';
const lang_op = {
  'en': 'English',
  'zh': '繁體中文',
  'ko': '한국어',
};
const alertModal = new bootstrap.Modal(document.getElementById('alertModal'), {backdrop: 'static', keyboard: false});
const inputModal = new bootstrap.Modal(document.getElementById('inputModal'), {backdrop: 'static', keyboard: false});
const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'), {backdrop: 'static', keyboard: false});
const scanModal = new bootstrap.Modal(document.getElementById('scanModal'), {backdrop: 'static', keyboard: false});
