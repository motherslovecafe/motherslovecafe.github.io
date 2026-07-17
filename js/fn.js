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

function submitTopUp() {
  confirmModal.hide();
  gasTopUp();
}

function submitRefresh() {
  confirmModal.hide();
  gasRefresh();
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
  updateCurrentPrice();
}

function selectExtra() {
  orderForm.coffee_extra=(!orderForm.coffee_extra && !extraNAList.includes(orderForm.coffee_id))?true:false;
  var btn = document.getElementById('btn_coffee_extra');
  if (orderForm.coffee_extra) {
    btn.classList.remove('btn-light');
    btn.classList.add('btn-dark');
  }
  if (!orderForm.coffee_extra) {
    btn.classList.add('btn-light');
    btn.classList.remove('btn-dark');
  }
  updateCurrentPrice();
}

function selectTopUp() {
  var select = document.getElementById('input_top_up');
  var item = select.value;
  memForm.item=item;
  memForm.desc=ptlist[item].desc;
  memForm.pt=ptlist[item].default_pt;
  memForm.remarks=ptlist[item].remarks;

  var new_desc = document.getElementById('input_top_up_remarks');
  if (ptlist[item].remarks) {
    new_desc.setAttribute('required','true');
    new_desc.removeAttribute('disabled');
  }else{
    new_desc.value = null;
    new_desc.setAttribute('disabled', 'disabled'); 
  }

  var pt = document.getElementById('input_top_up_pt');
  pt.value = ptlist[item].default_pt;

  pt.setAttribute('required','true');
}

function selectCoffee() {
  var select = document.getElementById('input_select_coffee');
  var id = select.value;
  orderForm.coffee_id=id;
  if (prefHotOnlyList.includes(id)) {
    selectPref();
  }

  var btn = document.getElementById('btn_coffee_extra');
  if (extraNAList.includes(id)) {
    orderForm.coffee_extra=false;
    btn.setAttribute('hidden','true');
  }else {
    btn.removeAttribute('hidden');
  }
  updateCurrentPrice();
}

function updateCurrentPrice() {
  setInnerHTMLById('current-price',coffeeList[orderForm.coffee_id]['price']+(orderForm.coffee_pref=='C'?2:0));
}

function encodeFormStr() {
  var str = '';
  str += orderForm.ut + '|';
  str += orderForm.coffee_id + '|';
  str += orderForm.coffee_pref + '|';
  str += (orderForm.coffee_extra?'1':'0');
  str += (orderForm.byoc?'1':'0');
  return str;
}

function decodeForm(str) {
  var arr = str.split('|');
  var form = {'ut':arr[0],'coffee_id':arr[1],'coffee_pref':arr[2],'coffee_extra':(arr[3]=='1'?true:false),'byoc':(arr[4]=='1'?true:false)};
  return form;
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


function getAllOrders() {
  
  var data = localStorage.getItem('allOrders');
  if (data == null) {
    return null;
  }else{
    var allOrders = JSON.parse(data);
    return allOrders;    
  }

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
