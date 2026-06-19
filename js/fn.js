function selectLang(input) {
  lang = input;
  setInnerHTMLById('container','');
  gasGetLabels();
}

function lab(id) {
  return id ? labels[id] : '';
}

function labArr(arr) {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    res.push(lab(arr[i]));
  }
  return res;
}

function backForm() {
  confirmModal.hide();
  inputModal.show();
}

function submitJoin() {
  confirmModal.hide();
  gasJoinMember();
}

function completeMemOper() {
  confirmModal.hide();
  createScanView();
}

function completeOrder() {
  confirmModal.hide();
  createScanView();
}

function selectPref() {
  orderForm.coffee_pref=(orderForm.coffee_pref=='H' && !prefHotOnlyList.includes(orderForm.coffee_id))?'C':'H';
  var btn = document.getElementById('btn_coffee_pref');
  if (orderForm.coffee_pref=='H') {
    btn.innerHTML='熱 Hot';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
  }
  if (orderForm.coffee_pref=='C') {
    btn.innerHTML='凍 Cold';
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-danger');
  }
}

function selectCoffee() {
  var select = document.getElementById('input_select_coffee');
  var id = select.value;
  orderForm.coffee_id=id;
  if (prefHotOnlyList.includes(id)) {
    selectPref();
  }
}

function getCSSClassStr(key) {
  return key.split(' ');
}

function createCustomElement(ele, cssClassKey='') {
  var e = document.createElement(ele);
  if (cssClassKey != '') {
    let arr = cssClassKey.split(' ');
    for (i=0; i<arr.length; i++) {
      // alert(arr[i]);
      e.classList.add(...getCSSClassStr(arr[i]));
    }
    
  }
  
  return e;
}

function logout() {
  localStorage.clear();
  window.location.replace(YOUR_REDIRECT_URI);
}

// Function to generate a random state value
function generateCryptoRandomState() {
  const randomValues = new Uint32Array(2);
  window.crypto.getRandomValues(randomValues);
  // Encode as UTF-8
  const utf8Encoder = new TextEncoder();
  const utf8Array = utf8Encoder.encode(
    String.fromCharCode.apply(null, randomValues)
  );
  // Base64 encode the UTF-8 data
  return btoa(String.fromCharCode.apply(null, utf8Array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function oauth2SignIn() {
  // create random state value and store in local storage
  var state = generateCryptoRandomState();
  localStorage.setItem('state', state);
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);
  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': YOUR_CLIENT_ID,
                'redirect_uri': YOUR_REDIRECT_URI,
                'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
                'state': state,
                'include_granted_scopes': 'true',
                'response_type': 'token'};
  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }
  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}


function getMember() {
  
  var data = localStorage.getItem('member');
  if (data == null) {
    return null;
  }else{
    var member = JSON.parse(data);
    return member;    
  }

}


function getUserInfo() {
  
  var data = localStorage.getItem('userinfo');
  if (data == null) {
    return null;
  }else{
    var userinfo = JSON.parse(data);
    return userinfo;    
  }

}
