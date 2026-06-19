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
  html5QrcodeScanner.pause();
  scanModal.hide();
  scanModal.show();
  setTimeout(function () {
    if (html5QrcodeScanner.getState() == Html5QrcodeScannerState.PAUSED) html5QrcodeScanner.resume();
  }, 1000);
  
}


function createErrorView(err_msg) {
  var contentHTML = '';
  contentHTML += '<div class="text-center"><div class="row justify-content-center"><div class="col-6"><img class="img-fluid mt-5 mb-5" src="img/error.png" class="d-block w-70" alt=""></div></div>';
  contentHTML += '<h3><span class="badge rounded-pill text-bg-danger'+'">'+err_msg+'</span></h3></div>';
  showAlertModal('錯誤 Error', contentHTML, '');
}

function createSuccessView() {
  var contentHTML = '';
  contentHTML += '<div class="text-center"><div class="row justify-content-center"><div class="col-6"><img class="img-fluid mt-5 mb-5" src="img/success.png" class="d-block w-70" alt=""></div></div>';
  contentHTML += '<h3><span class="badge rounded-pill text-bg-success'+'">完成</span></h3></div>';
  showAlertModal('成功', contentHTML, '');
}

function createScanView() {
  showScanModal();
}

function getNavHtml() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <a class="navbar-brand" href="#">';
  html += '      <img src="img/icon.JPG" height="32" alt="">  ';
  html += '<span class="mx-2">'+app_name+'</span>';
  html += '    </a>';
  /*
  html += '    <button class="navbar-toggler btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
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

function getFooterHtml() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-1 my-1">';
  html += '    <div class="container navbar-brand col-12">';
  html += '    <div class="row">';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button"><i class="fa fa-home" style="font-size:36px;" onclick="return createMainView();"></i></button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning  position-relative" type="button" onclick="return createUseVoucherView();"><i class="fa fa-coffee" style="font-size:32px;"></i>';
  html += '</button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createTxView();"><i class="fa fa-calendar" style="font-size:28px;"></i></button></div>';
  if (userinfo.acl && (userinfo.acl.includes('shopOper') || userinfo.acl.includes('memOper'))){
    html += '      <div class="col text-center px-0"><button class="btn btn-warning text-light" type="button" onclick="return createScanView();"><i class="fa fa-qrcode" style="font-size:28px;"></i></button></div>';
  }
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createMoreView();"><i class="fa fa-ellipsis-h" style="font-size:32px;"></i></button></div>';
  html += '    </div>';
  html += '    </div>';

  html += '  </div>';
  html += '</nav>';
  return html;

}


function createUserView() {

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
  html += '<div class="card bg-white text-white" style="max-width: 24rem;" onclick="createUserQRView();">';
  html += '  <img src="img/bg_coffee_6.jpeg" class="card-img" alt="...">';
  html += '  <div class="card-img-overlay">';
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
  showInputModal('管理會籍',body,'');
  var qrcode = new QRCode("qrcode",{"text": window.btoa('act=user&c='+userinfo.ut), "width":200, "height":200});

}

function createMoreView() {

  // var userinfo = getUserInfo();
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

  var html = '<div class="container col-11 mt-5">';
  html += '<div class="d-flex col flex-column align-items-center">';
  html += '<button type="button" class="btn btn-danger col-12 col-lg-4" onclick="return logout();">登出</button>';
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
  if (userinfo.menu) {
    coffeeList = userinfo.menu;
  }else{
    showAlertModal('錯誤','未能取得餐牌','');
    return;
  }
  orderForm = {'coffee_id':'cf001','coffee_pref':'H','byoc':false}; // set default

  var body = '';
  body += '<div class="input-group mb-3">';
  body += '  <button class="btn btn-danger" type="button" id="btn_coffee_pref" onclick="selectPref()">熱 Hot</button>';
  body += '  <select class="form-select" id="input_select_coffee" onchange="selectCoffee()">';
  Object.keys(coffeeList).forEach(key => {
    body += '    <option value='+`${key}`+'>'+`${coffeeList[key]['name']}`+'</option>';
  });
  body += '  </select>';
  body += '</div>';
  body += '<div class="input-group mt-3">';
  body += '<div class="form-check form-switch">';
  body += '  <input class="form-check-input" type="checkbox" id="byoc_input">';
  body += '  <label class="form-check-label" for="byoc_input">自備杯</label>';
  body += '</div>';
  body += '</div>';

  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="createVoucherQRview();">確定</button></div>';
  showInputModal('現場下單',body,footer);
}

function createVoucherQRview() {
  var userinfo = getUserInfo();
  orderForm.byoc = document.getElementById('byoc_input').checked;
  orderForm.ut = userinfo.ut;
  var pref = orderForm.coffee_pref;
  var userinfo = getUserInfo();
  var body = '<div class="container col-11 mt-3 mb-3"><ul class="list-group">';
  body += '<li class="list-group-item d-flex justify-content-between align-items-center">';
  body += '<div class="d-flex col flex-column align-items-center"><strong>';
  body += coffeeList[orderForm.coffee_id]['name'];
  body += ' <span class="badge rounded-pill bg-'+(pref=='H'?'danger':'primary')+'">'+pref+'</span>';
  body += (orderForm.byoc)?'  <span class="badge rounded-pill bg-success">自備杯</span></label>':'';
  body += '</strong></div>';
  body += '</li>';
  body += '<li class="list-group-item d-flex justify-content-between align-items-center">';
  body += '<div class="d-flex col flex-column align-items-center mt-3 mb-3"><div id="qrcode_useVoucher"></div></div>';
  body += '</li>';
  body += '</ul>';
  body += '</div>';
  showInputModal('現場下單',body,'');
  var qrcode = new QRCode("qrcode_useVoucher", {"text": window.btoa('act=order&c='+JSON.stringify(orderForm)), "width":200, "height":200});
}

function createVoucherView() {

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
  div.id = 'ticketPage';
  var html = '<div class="container col-11 mt-5">';
  // html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
  // html += '<strong>咖啡餐飲券</strong><span class="badge rounded-pill bg-danger">99</span>';
  // html += '</li>';
  html += '<div class="d-flex col flex-column align-items-center mt-3 mb-3">';
  html += '<div class="card text-white" onclick="return createUseVoucherView();" >';
  html += '  <img src="img/bg_coffee_6.jpeg" class="card-img" style="max-width:400px;">';
  html += '  <div class="card-img-overlay">';
  html += '    <h4 class="card-title">使用咖啡餐飲券</h4>';
  html += '  </div>';
  html += '</div>';
  html += '</div>';
  /*
  html += '<div class="d-flex col flex-column align-items-center mt-3 mb-3">';
  html += '<div class="card text-white disabled" onclick="return createGiftView();">';
  html += '  <img src="img/bg_coffee_7.jpeg" class="card-img" style="max-width:400px;">';
  html += '  <div class="card-img-overlay">';
  html += '    <h4 class="card-title">贈送咖啡餐飲券</h4>';
  html += '  </div>';
  html += '</div>';
  html += '</div>';
  */
  html += '</div>';
  div.innerHTML = html;

}

function createTxView() {

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
  div.id = 'txPage';
  // var stamp = 1;
  var html = '<div class="container col-11 mt-5 pb-5">';
  // html += '<div class="progress mb-4" style="height: 20px;">';
  // for (var i = 1; i <= 10; i++) {

  //   html += '  <div class="progress-bar '+((stamp>=i)?'bg-warning':'bg-secondary')+'" role="progressbar" style="width: 10%;" aria-valuenow="'+i+'" aria-valuemin="0" aria-valuemax="10">'+i+'</div>';
    
  // }
  // html += '</div>';
  html += '<ul class="list-group pb-5 mb-5">';
  html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
  html += '<strong>交易記錄</strong>';
  html += '</li>';
  html += '<li class="list-group-item d-flex justify-content-between align-items-center ">';
  html += '即將登場';
  html += '</li>';
  html += '</ul>';
  html += '</div>';
  div.innerHTML = html;

}

function createMainView() {

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
  div.id = 'mainPage';
  var html = '<div class="container col-11 mt-5 pb-5"><ul class="list-group pb-5 mb-5">';
  html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
  html += '<strong>公吿</strong>';
  html += '</li>';
  html += '<li class="list-group-item d-flex justify-content-between align-items-center ">';
  html += (userinfo.noti.announcement?userinfo.noti.announcement:'沒有內容 No Content');
  html += '</li>';
  html += '</ul>';
  html += '</div>';
  div.innerHTML = html;

}

function confirmJoinMember() {
  var member = getMember();
  var userinfo = getUserInfo();
  var body = '';
  body += '<span><strong>備註:</strong> <p class="text-primary">'+userinfo.noti.join_new_msg+'</p></span>';
  // var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="submitJoin('+id+');">確定</button></div>';
  var footer = footer = '<button type="button" class="btn btn-secondary" onclick="return backForm();">返回</button>';
  footer += '<button type="button" class="btn btn-danger" onclick="return submitJoin();">確定</button>';
  showConfirmModal('新會員',body,footer);
}

function createMemOperView() {
  var member = getMember();
  var body = '';
  body += '<div class="container col-11 mt-2 text-center">';
  if (!member.points && member.is_freeze) {
    body += '  <button class="btn btn-warning" type="button" id="btn_join_member" onclick="confirmJoinMember()">入會</button>';
  }else{
    body += '已經是會員'
  }
  
  body += '</div>';
  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="completeMemOper();">確定</button></div>';
  showConfirmModal(member.name,body,footer);
}

function createOrderView(orderRes) {
  var body = '<div class="container col-11 mt-3 mb-3"><ul class="list-group">';
  body += '<li class="list-group-item d-flex justify-content-between align-items-center">';
  body += '<div class="d-flex col flex-column align-items-center"><strong>';
  body += orderRes.item;
  body += ' <span class="badge rounded-pill bg-'+(orderRes.pref=='H'?'danger':'primary')+'">'+orderRes.pref+'</span>';
  body += (orderRes.byoc)?'  <span class="badge rounded-pill bg-success">自備杯</span></label>':'';
  body += '</strong></div>';
  body += '</li>';
  body += '</ul>';
  body += '</div>';
  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="completeOrder();">確定</button></div>';
  showConfirmModal('訂單', body, footer);
}

function createGLoginView() {
  initViews();
  setHeaderTitle('h2', '  ');
  var div = createCustomElement('div', 'd-flex col flex-column align-items-center py-5');
  div.id='signin';
  var div2 = createCustomElement('form', 'form-signin');
  var div3 = createCustomElement('div', 'text-center mt-5');
  var img = document.createElement('img');
  img.classList.add('mt-5');
  img.src = 'img/icon.JPG';
  // img.width = '150';
  img.height = '200';
  div3.appendChild(img);
  div2.appendChild(div3);
  // var h1 = createCustomElement('h1', 'h1 mb-5 font-weight-normal');
  // h1.innerHTML = app_name;
  // div3.appendChild(h1);
  var btn_glogin = createCustomElement('btn', 'btn btn-warning btn-block text-center align-self-center mt-3 mb-3');
  btn_glogin.innerHTML = 'Sign in with Google';
  btn_glogin.onclick = function() { oauth2SignIn(); };
  div.appendChild(div2);
  div.appendChild(btn_glogin);
  content.appendChild(div);
}

function initViews() {
  header.innerHTML = '';
  content.innerHTML = '';
  footer.innerHTML = '';
}

function setHeaderTitle(ele, text) {
  header.innerHTML = '';

  var title = createCustomElement(ele, 'title');
  title.innerHTML = text;
  header.appendChild(title);
}
