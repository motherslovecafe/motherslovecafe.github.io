function on() {
  document.getElementById('overlay').style.display = 'block';
}

function off() {
  document.getElementById('overlay').style.display = 'none';
}

function setAttributeValueById(id, attr, value) {
  if (document.getElementById(id)) {
    document.getElementById(id).setAttribute(attr, value);
  }
}

function setInnerHTMLById(id, value) {
  if (document.getElementById(id)) {
    document.getElementById(id).innerHTML = value;
  }
}

function showAlertModal(title, body, footer) {
  setInnerHTMLById('alertModalTitle', '');
  setInnerHTMLById('alertModalBody', '');
  setInnerHTMLById('alertModalFooter', '');

  setInnerHTMLById('alertModalTitle', title);
  setInnerHTMLById('alertModalBody', body);
  setInnerHTMLById('alertModalFooter', footer);

  alertModal.show();
}

function showInputModal(title, body, footer) {
  document.getElementById('inputModalTitle').innerHTML = '';
  document.getElementById('inputModalBody').innerHTML = '';
  document.getElementById('inputModalFooter').innerHTML = '';

  document.getElementById('inputModalTitle').innerHTML = title;
  document.getElementById('inputModalBody').innerHTML = body;
  document.getElementById('inputModalFooter').innerHTML = footer;
  inputModal.show();
}

function showConfirmModal(title, body, footer) {
  inputModal.hide();
  document.getElementById('confirmModalTitle').innerHTML = '';
  document.getElementById('confirmModalBody').innerHTML = '';
  document.getElementById('confirmModalFooter').innerHTML = '';

  document.getElementById('confirmModalTitle').innerHTML = title;
  document.getElementById('confirmModalBody').innerHTML = body;
  document.getElementById('confirmModalFooter').innerHTML = footer;
  confirmModal.show();
}

function showScanModal() {
  scanModal.hide();
  scanModal.show();
  setTimeout(function () {
    if (html5QrcodeScanner.getState() == Html5QrcodeScannerState.PAUSED) html5QrcodeScanner.resume();
  }, 1000);
  

}

function createErrorView(err_msg) {
  var contentHTML = '';
  contentHTML += '<div class="text-center"><div class="row justify-content-center"><div class="col-6"><img class="img-fluid mt-5 mb-5" src="img/error.png" class="d-block w-70" alt=""></div></div>'[...]
  contentHTML += '<h3><span class="badge rounded-pill text-bg-danger'+'">'+err_msg+'</span></h3></div>';
  showAlertModal('錯誤 Error', contentHTML, '');
}

function createSuccessView() {
  var contentHTML = '';
  contentHTML += '<div class="text-center"><div class="row justify-content-center"><div class="col-6"><img class="img-fluid mt-5 mb-5" src="img/success.png" class="d-block w-70" alt=""></div></div[...]
  contentHTML += '<h3><span class="badge rounded-pill text-bg-success'+'">完成</span></h3></div>';
  showAlertModal('成功', contentHTML, '');
}

function createScanView() {
  showScanModal();
}

function getNavHtml() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary'">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <a class="navbar-brand" onclick="createMainView()">';
  html += '      <img src="img/cafe_logo_2.png" height="40px" alt="">  ';
  // html += '<span class="mx-2">'+app_name+'</span>';
  html += '    </a>';
  /*
  html += '    <button class="navbar-toggler btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria[...]
  html += '      <span class="navbar-toggler-icon"></span>';
  html += '    </button>';
  html += '    <div class="collapse navbar-collapse" id="navbarSupportedContent">';
  html += '      <ul class="navbar-nav me-auto mb-2 mb-lg-0">';
  html += '        <li class="nav-item">';
  html += '          <a class="nav-link" onclick="return createMainView();">主頁</a>';
  html += '        </li>';
  html += '        <li class="nav-item">';
  html += '          <a class="nav-link" onclick="return createRecordView();">名單(內部)</a>';
  html += '        </li>';
  html += '        <li class="nav-item">';
  html += '          <a class="nav-link" onclick="return createUserRecordView();">名單(外部)</a>';
  html += '        </li>';
  html += '        <li class="nav-item">';
  html += '          <a class="nav-link" onclick="return createTodayAttendView();">禮拜出席</a>';
  html += '        </li>';
  html += '      </ul>';
 */
  // html += '    <form class="form-inline my-2 my-lg-0">';
  html += '      <button class="btn btn-light text-warning my-2 my-sm-0"><i class="fa fa-user-circle-o" style="font-size:32px;" onclick="return createUserView();"></i></button>';
  // html += '    </form>';
  html += '    </div>';
  
  html += '  </div>';
  html += '</nav>';
  return html;
}

function getNavHtml_shopOper() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <a class="navbar-brand" onclick="createShopOrdersView()">';
  html += '      <img src="img/cafe_logo_2.png" height="40px" alt="">  ';
  html += '    </a>';
  html += '<span class="badge text-bg-warning my-2 my-sm-0">Shop</span>';
  html += '    </div>';
  
  html += '  </div>';
  html += '</nav>';
  return html;
}
function getFooterHtml_shopOper() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-1 my-1">';
  html += '    <div class="container navbar-brand col-12">';
  html += '    <div class="row">';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button"><i class="fa fa-reply" style="font-size:36px;" onclick="window.location.href = &#39;ind[...]
  html += '    </div>';
  html += '    </div>';

  html += '  </div>';
  html += '</nav>';
  return html;

}

function getFooterHtml() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-1 my-1">';
  html += '    <div class="container navbar-brand col-12">';
  html += '    <div class="row">';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button"><i class="fa fa-home" style="font-size:36px;" onclick="return createMainView();"></i></[...]
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning position-relative" type="button" onclick="return createUseVoucherView();"><i class="fa fa-coffee" styl[...]
  html += '</button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createTxView();"><i class="fa fa-calendar" style="font-size:28px;"></i>[...]
  if (userinfo.acl && userinfo.acl.includes('memOper')){
    html += '      <div class="col text-center px-0"><button class="btn btn-warning text-light" type="button" onclick="return createScanView();"><i class="fa fa-qrcode" style="font-size:32px;"></[...]
  }
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createMoreView();"><i class="fa fa-ellipsis-h" style="font-size:32px;">[...]
  html += '    </div>';
  html += '    </div>';

  html += '  </div>';
  html += '</nav>';
  return html;

}


function createUserView() {
  localStorage.setItem('callback', 'createUserView');

  var userinfo = getUserInfo();
  initViews();
  if (userinfo.name == null){
    setHeaderTitle('h2', 'Invalid User');
    return;
  }
  header.innerHTML = getNavHtml();
  footer.innerHTML = getFooterHtml();

  var div = createCustomElement('div', 'container col_11');
  content.appendChild(div);
  div.id = 'userQrPage';
  var html = '<div class="container col-11 mt-5">';
  html += '<div class="card bg-white" style="max-width: 24rem; color:#733617" onclick="createUserQRView();">';
  html += '  <img src="img/member_bg.jpeg" class="card-img" alt="...">';
  html += '  <div class="card-img-overlay m-1">';
  html += '    <h6 class="card-title">'+userinfo.name+'</h6>';
  if (userinfo.points) {
    html += '    <h1 class="card-text display-1">'+(userinfo.points?userinfo.points:'-')+'</h1>';
    html += '    <p class="card-text">會員 Member</p>';
  }else{
    html += '    <p class="card-text">非會員 Non-Member</p>';
  }
  html += '  </div>';
  html += '</div>';
  div.innerHTML = html;

  // var qrcode = new QRCode("qrcode",window.btoa('act=user&c='+userinfo.email));
}

function createUserQRView() {
  var userinfo = getUserInfo();
  var body = '<div class="container col-11 mt-3 mb-3"><ul class="list-group">';

  body += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
  body += '<div class="d-flex col flex-column align-items-center"><strong>'+userinfo.name+'</strong></div>';
  body += '</li>';
  body += '<li class="list-group-item d-flex justify-content-between align-items-center">';
  body += '<div class="d-flex col flex-column align-items-center mt-3 mb-3"><div id="qrcode"></div></div>';
  body += '</li>';
  body += '</ul>';
  body += '</div>';
  showInputModal('My QR Code',body,'');
  var qrcode = new QRCode("qrcode",{"text": window.btoa('act=user&c='+userinfo.ut), "width":200, "height":200});

}

function createMoreView() {
  localStorage.setItem('callback', 'createMoreView');

  var userinfo = getUserInfo();
  initViews();
  // if (userinfo.name == null){
  //   setHeaderTitle('h2', 'Invalid User');
  //   return;
  // }
  header.innerHTML = getNavHtml();
  footer.innerHTML = getFooterHtml();

  var div = createCustomElement('div', 'container col_11');
  content.appendChild(div);
  div.id = 'morePage';
  // div.innerHTML = '<div class="d-flex col flex-column align-items-center mt-5 mb-5"><div id="qrcode"></div></div>';

  var html = '<div class="container col-11 my-5">';
  html += '<div class="d-flex col flex-column align-items-center">';
  if (userinfo.acl && (userinfo.acl.includes('shopOper'))){
    html += '<button type="button" class="btn btn-warning col-12 col-lg-4 my-3" onclick="window.location.href = &#39;shopOper.html&#39;">All Orders</button>';
  }
  html += '<button type="button" class="btn btn-danger col-12 col-lg-4" onclick="return logout();">下次見 See you soon</button>';
  html += '</div>';
  html += '</div>';
  div.innerHTML = html;
}

function createUseVoucherView() {
  var userinfo = getUserInfo();
  if (userinfo.is_freeze) {
    showAlertModal('沒有服務 No Services','請聯絡我們的工作人員管理您的會籍。<br>Please contact our staff to manage your membership.','');
    return;
  }
  if (!userinfo.acceptOrder) {
    showAlertModal('沒有服務 No Services','請留意最新的營業時間，謝謝。<br>Please note the latest operating hours. Thanks.','');
    return;
  }
  if (userinfo.menu) {
    coffeeList = userinfo.menu;
  }else{
    showAlertModal('錯誤','未能取得餐牌','');
    return;
  }
  orderForm = {'coffee_id':'cf001','coffee_pref':'H','byoc':false}; // set default

  var body = '';
  body += '<div class="input-group my-3 mb-5">';
  body += '  <button class="btn btn-danger" type="button" id="btn_coffee_pref" onclick="selectPref()">熱 Hot</button>';
  body += '  <select class="form-select" id="input_select_coffee" onchange="selectCoffee()">';
  Object.keys(coffeeList).forEach(key => {
    body += '    <option value='+`${key}`+'>'+`${coffeeList[key]['name']}`+' '+coffeeList[key]['price']+'</option>';
  });
  body += '  </select>';
  body += '</div>';
  body += '<button type="button" class="btn btn-light" id="btn_coffee_extra" onclick="selectExtra()">Extra Shot</button>';
  body += '<div class="input-group my-3 mt-5">';
  body += '<div class="form-check form-switch">';
  body += '  <input class="form-check-input" type="checkbox" id="byoc_input">';
  body += '  <label class="form-check-label" for="byoc_input">自攜杯 BYOC</label>';
  body += '</div>';
  body += '</div>';

  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="createVoucherQRview();">就咁話！👍 Espresso-ly Yes!</button></div>';
  showInputModal('你的選擇 Your Choice',body,footer);
}

function createVoucherQRview() {
  var userinfo = getUserInfo();
  orderForm.byoc = document.getElementById('byoc_input').checked;
  orderForm.ut = userinfo.ut;
  var pref = orderForm.coffee_pref;
  var userinfo = getUserInfo();
  var body = '';
  // body += '<div class="container col-11 mt-3 mb-3"><ul class="list-group'",...