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

function showByocFreeModal(title, body, footer) {
  // setInnerHTMLById('byocFreeModalTitle', '');
  setInnerHTMLById('byocFreeModalBody', '');
  // setInnerHTMLById('byocFreeModalFooter', '');

  // setInnerHTMLById('byocFreeModalTitle', title);
  setInnerHTMLById('byocFreeModalBody', body);
  // setInnerHTMLById('byocFreeModalFooter', footer);

  byocFreeModal.show();
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

function selectConfig() {
  selected_config = document.getElementById('selected_config').value;

  var config_table = document.getElementById('config_table');
  var html = "";

  var config = a_config[selected_config];

  if (config) {

    var ind = selected_config+'|new';
    html += '<ul class="list-group pb-5 mb-5">';
    html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-light text-dark">';
    html += '<strong>'+selected_config+'</strong>';
    html += selected_config=="menu"?'<i class="fa-solid fa-circle-plus text-warning" onclick="createEditConfigView(&#39;'+ind+'&#39;)"></i>':'';

    if (selected_config=='menu') {


      for (var i = 0; i < config.length; i++) {

        ind = selected_config+'|'+i;
;
        if (config[i].active) {

          html += '<li class="list-group-item d-flex justify-content-between align-items-center">'
          html += '<p><strong>'+config[i].name+'</strong> <span class="badge rounded-pill  bg-light text-dark">'+config[i].points+' pt</span><br><br>';
        } else {

          html += '<li class="list-group-item d-flex justify-content-between align-items-center bg-light">'
          html += '<p><span class="text-muted">'+config[i].name+'</span> <span class="badge rounded-pill bg-light text-dark">'+config[i].points+' pt</span><br><br>';
        }
        html += '<small class="text-muted">';

        Object.keys(config[i]).forEach(k => {
          if (k.startsWith('opt_') && config[i][k] && menu_opt[k]) {
            html += '|';
            for (var j = 0; j < menu_opt[k].choice_list.length; j++){

              var label_arr = menu_opt[k].choice_list[j].replace(/\s/, "||__||").split("||__||");
              if (menu_opt[k].default == j) {

                html += '<small><span class="badge bg-transparent text-dark">**'+label_arr[0] + '**</span></small>|';
              }else{

                html += '<small><span class="badge bg-transparent text-dark">'+label_arr[0] + '</span></small>|';
              }
            }
            html += '<br>';
          }
        });
        html += ' </small></p>';
        html += '<i class="fa-solid fa-pen-to-square text-warning" onclick="createEditConfigView(&#39;'+ind+'&#39;)"></i>';
        html += '</li>';
      }

    }

    if (selected_config=='menu_opt') {


      for (var i = 0; i < config.length; i++) {

        ind = selected_config+'|'+i;
;

        html += '<li class="list-group-item d-flex justify-content-between align-items-center">'
        html += '<p><strong>'+config[i].option+'</strong><br><br>';

        html += '<span class="text-muted">';
        for (var j = 0; j < config[i].choice_list.length; j++) {
          var label_arr = config[i].choice_list[j].replace(/\s/, "||__||").split("||__||");
          html += '<small><span class="badge '+(config[i].default == j?'bg-secondary':'bg-light text-dark')+'">'+label_arr[0] + '<br>' +label_arr[1] +'</span></small> ';
        }
        html += ' </span></p>';
        // html += '<i class="fa-solid fa-pen-to-square text-warning" onclick="createEditConfigView(&#39;'+ind+'&#39;)"></i>';
        html += '</li>';
      }

    }
  }


  config_table.innerHTML = html;
}

function getNavHtml() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <a class="navbar-brand" onclick="createMainView()">';
  html += '      <img src="img/cafe_logo_2.png" height="40px" alt="">  ';
  html += '    </a>';
  html += '      <button class="btn btn-light text-warning my-2 my-sm-0"><i class="fa-regular fa-circle-user" style="font-size:28px;" onclick="return createUserView();"></i></button>';
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
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button"><i class="fa-regular fa-house" style="font-size:28px;" onclick="return createMainView();"></i></button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning position-relative" type="button" onclick="return gasMenu();"><i class="fa fa-coffee" style="font-size:28px;"></i>';
  html += '</button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createTxView();"><i class="fa-regular fa-calendar-days" style="font-size:28px;"></i></button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createMoreView();"><i class="fa-solid fa-ellipsis" style="font-size:28px;"></i></button></div>';
  html += '    </div>';
  html += '    </div>';

  html += '  </div>';
  html += '</nav>';
  return html;

}

function getNavHtml_adminOper() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <a class="navbar-brand" onclick="createMemEnquiryView()">';
  html += '      <img src="img/cafe_logo_2.png" height="40px" alt="">  ';
  html += '    </a>';
  html += '<span class="badge text-bg-warning my-2 my-sm-0" '+(userinfo.acl && (userinfo.acl.includes('shopOper'))?'onclick="window.location.href = &#39;shopOper.html&#39;"':'')+'>Admin</span>';
  html += '    </div>';
  
  html += '  </div>';
  html += '</nav>';
  return html;
}

function getFooterHtml_adminOper() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary" style="z-index: 1050;">';
  html += '  <div class="container-fluid mx-1 my-1">';
  html += '    <div class="container navbar-brand col-12">';
  html += '    <div class="row">';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="window.location.href = &#39;index.html&#39;"><i class="fa-solid fa-circle-chevron-left" style="font-size:28px;"></i></button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="createStatView()"><i class="fa-solid fa-chart-line" style="font-size:28px;"></i></button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="createAdminOperView()"><i class="fa-solid fa-gear" style="font-size:28px;"></i></button></div>';
  html += '    </div>';
  html += '    </div>';

  html += '  </div>';
  html += '</nav>';
  return html;

}

function getNavHtml_memEnq() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <a class="navbar-brand" onclick="createMemEnquiryView()">';
  html += '      <img src="img/cafe_logo_2.png" height="40px" alt="">  ';
  html += '    </a>';
  html += '<span class="badge text-bg-warning my-2 my-sm-0" '+(userinfo.acl && (userinfo.acl.includes('shopOper'))?'onclick="window.location.href = &#39;shopOper.html&#39;"':'')+'>Member</span>';
  html += '    </div>';
  
  html += '  </div>';
  html += '</nav>';
  return html;
}

function getFooterHtml_memEnq() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-1 my-1">';
  html += '    <div class="container navbar-brand col-12">';
  html += '    <div class="row">';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="window.location.href = &#39;index.html&#39;"><i class="fa-solid fa-circle-chevron-left" style="font-size:28px;"></i></button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createScanView();"><i class="fa fa-qrcode" style="font-size:28px;"></i></button></div>';
  html += '    </div>';
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
  html += '<span class="badge text-bg-warning my-2 my-sm-0" '+(userinfo.acl && (userinfo.acl.includes('admin'))?'onclick="window.location.href = &#39;adminOper.html&#39;"':'')+'>Order</span>';
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
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="window.location.href = &#39;index.html&#39;"><i class="fa-solid fa-circle-chevron-left" style="font-size:28px;"></i></button></div>';
  html += '    </div>';
  html += '    </div>';

  html += '  </div>';
  html += '</nav>';
  return html;

}


function createUserView() {
  sessionStorage.setItem('callback', 'createUserView');

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
  var qrcode = new QRCode("qrcode",{"text": window.btoa('act=user&c='+userinfo.email), "width":200, "height":200});

}



function createFreeForBYOCView() {
  var body ='';
  body += '<div style="width: 100%; aspect-ratio: 610 / 810;">';
  body += '<div class="text-end">';
  body += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
  body += '</div></div>';

  showByocFreeModal('',body,'');

}

function createMoreView() {
  sessionStorage.setItem('callback', 'createMoreView');

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
  if (userinfo.acl && (userinfo.acl.includes('memOper'))){
    html += '<button type="button" class="btn btn-warning col-12 col-lg-4 my-3" onclick="window.location.href = &#39;memOper.html&#39;">All Members</button>';
  }
  if (userinfo.acl && (userinfo.acl.includes('admin'))){
    html += '<button type="button" class="btn btn-warning col-12 col-lg-4 my-3" onclick="window.location.href = &#39;adminOper.html&#39;">Admin Console</button>';
  }
  html += '<button type="button" class="btn btn-danger col-12 col-lg-4 my-3" onclick="return logout();">下次見 See you soon</button>';
  html += '</div>';
  html += '</div>';
  div.innerHTML = html;
}

function createBeforeUseVoucherView() {
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
    getPrefHotOnlyList();
  }else{
    showAlertModal('錯誤','未能取得餐牌','');
    return;
  }

  selected_menu_type = 'Beverage';

  var body = '';
  body += '<div class="container col-12 text-center my-2 px-1 py-2">';
  body += '<button class="btn btn-light text-warning mx-3 my-3" onclick="return selectMenuType(&#39;Beverage&#39;);" style="height:100px; width:100px;"><span class="text-warning"><i class="fa-solid fa-mug-hot" style="font-size:48px;"></i></span></button>';
  body += '<button class="btn btn-light text-warning mx-3 my-3" onclick="return selectMenuType(&#39;Others&#39;);" style="height:100px; width:100px;"><span class="text-warning"><i class="fa-solid fa-cookie-bite" style="font-size:48px;"></i></span></button>';
  body += '</div>';

  showAlertModal('',body,'');

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
    getPrefHotOnlyList();
  }else{
    showAlertModal('錯誤','未能取得餐牌','');
    return;
  }

  var body = '';
  body += '<div class="input-group my-3 mb-3">';
  if (selected_menu_type == 'Beverage') {
    body += '  <button class="btn btn-danger" type="button" id="btn_coffee_pref" onclick="selectPref()">熱 Hot</button>';
  }
  body += '  <select class="form-select" id="input_select_coffee" onchange="selectCoffee()">';
  Object.keys(coffeeList).forEach(key => {
    if (coffeeList[key]['active'] && coffeeList[key]['type']==selected_menu_type) {
      body += '    <option value='+`${key}`+'>'+`${coffeeList[key]['name']}`+' '+coffeeList[key]['points']+'</option>';
    }
  });
  body += '  </select>';
  body += '</div>';
  body += '<div class="mb-3" id="coffee_opt_input"></div>';

  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="createVoucherQRview();">就咁話！👍 Espresso-ly Yes!</button></div>';

  showInputModal('你的選擇 Your Choice',body,footer);
  // set default
  if (selected_menu_type == 'Beverage') {
    orderForm = {'coffee_id':'cf001','coffee_pref':'H','byoc':false, 'opt':null, 'useCoupon':false, 'add_on':null}; 
  }
  if (selected_menu_type == 'Others') {
    orderForm = {'coffee_id':'al001', 'add_on':null}; 
  }
  selectCoffee();
}

function createVoucherQRview() {
  var userinfo = getUserInfo();
  // orderForm.byoc = document.getElementById('byoc_input').checked;
  orderForm.ut = userinfo.ut;
  var pref = orderForm.coffee_pref;
  var userinfo = getUserInfo();
  var body = '';
  body += '<div class="container col-12 mt-3 mb-3"><strong>';
  body += coffeeList[orderForm.coffee_id]['name'];
  if (selected_menu_type == 'Beverage') {
    body += ' <span class="badge rounded-pill bg-'+(pref=='H'?'danger':'primary')+'">'+pref+'</span>';
  }
  
  body += '</strong>';
  if (orderForm.opt) {
    body += '<ul>';
    Object.keys(orderForm.opt).forEach(key => {
      body += '<li><small>'+coffeeList[orderForm.coffee_id].opt[key].choice_list[orderForm.opt[key]]+'</small></li>';
    });
    body += '</ul>';
  }


  body += '<div class="text-center"><p>Points: <strong id="calcPoints"></strong></p></div>';

  if (selected_menu_type == 'Beverage') {

    body += '<div class="alert alert-success" role="alert">';

    body += '<div class="form-check">';
    body += '  <input class="form-check-input" type="checkbox" value="" id="byoc" onclick="calcPoints()">';
    body += '  <label class="form-check-label" for="byoc">';
    body += '    自攜杯 Bring Your Own Cup';
    body += '  </label>';
    body += '</div>';

    if (userinfo.available_coupons > 0) {
      body += '<div class="form-check">';
      body += '  <input class="form-check-input" type="checkbox" value="" id="useCoupon" onclick="calcPoints()" checked>';
      body += '  <label class="form-check-label" for="useCoupon">';
      body += '    享用免費咖啡 Enjoy Free Coffee';
      body += '  </label>';
      body += '</div>';
    }

    body += '</div>';
  }

  if (userinfo.add_on) {

    body += '<div class="alert alert-primary" role="alert">';

    Object.keys(userinfo.add_on).forEach(key => {

      body += '<div class="form-check">';
      body += '  <input class="form-check-input" type="checkbox" value="" id="'+key+'" onclick="calcPoints()">';
      body += '  <label class="form-check-label" for="'+key+'">';
      body += '    +'+userinfo.add_on[key].points+' pt '+userinfo.add_on[key].name;
      body += '  </label>';
      body += '</div>';
      
    });

    body += '</div>';

  }


  body += '</div>';

  var footer = '';
  footer += '<button type="button" class="btn btn-secondary mx-2" onclick="return backForm();">返回 Back</button>';
  footer += '<button type="button" class="btn btn-warning mx-2" onclick="return submitOrder();">確定落單 Confirm Order</button>';

  showConfirmModal('你的選擇 Your Choice',body,footer);
  calcPoints();
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
  html += '<div class="d-flex col flex-column align-items-center mt-3 mb-3">';
  html += '<div class="card text-white" onclick="return createUseVoucherView();" >';
  html += '  <img src="img/bg_coffee_6.jpeg" class="card-img" style="max-width:400px;">';
  html += '  <div class="card-img-overlay">';
  html += '    <h4 class="card-title">使用咖啡餐飲券</h4>';
  html += '  </div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  div.innerHTML = html;

}

function createEditConfigView(ind) {

  var ind_arr = ind.split('|');
  var item = ind_arr[0];
  var index = ind_arr[1];
  var e_config = null;
  if (ind == 'menu|new') {
    e_config = {};
    e_config.number = 'new';
    e_config.name = '';
    e_config.points = 0;
    e_config.active = true;

    Object.keys(menu_opt).forEach(opt => {
      e_config[opt] = false;
    });

  }else if (ind == 'menu_opt|new') {
    e_config = {};
    e_config.option = 'opt_';
    e_config.choice_list = ["1", "2"];
    e_config.default = 0;

    Object.keys(menu_opt).forEach(opt => {
      e_config[opt] = false;
    });

  }else{
    e_config = a_config[item][index];
  }

  var body = '';
  if (item == 'menu') {
    body += '<div class="input-group mb-3">';
    body += '  <span class="input-group-text" id="name">Name</span>';
    body += '  <input type="text" class="form-control" placeholder="name" aria-label="name" aria-describedby="name" id="e_config_name" value="'+e_config.name+'">';
    body += '</div>';


    body += '<div class="input-group mb-3">';
    body += '  <span class="input-group-text" id="points">Points</span>';
    body += '  <input type="text" class="form-control" placeholder="points" aria-label="points" aria-describedby="points" id="e_config_points" value="'+e_config.points+'">';
    body += '</div>';

    body += '<div class="input-group mb-3">';
    body += '  <div class="input-group-text">';
    body += '    <input class="form-check-input mt-0" type="checkbox" id="e_config_active" value="" aria-label="active" '+(e_config.active?'checked':'')+'>';
    body += '  </div>';
    body += '  <span class="input-group-text" id="active">Active</span>';
    body += '</div>';

    Object.keys(menu_opt).forEach(opt => {

      body += '<div class="input-group mb-3">';
      body += '  <div class="input-group-text">';
      body += '    <input class="form-check-input mt-0" type="checkbox" id="e_config_'+opt+'" value="" aria-label="'+opt+'" '+(e_config[opt]?'checked':'')+'>';
      body += '  </div>';
      body += '  <span class="input-group-text" id="'+opt+'">'+opt+': |';

      for (var i = 0; i < menu_opt[opt].choice_list.length; i++){

        var label_arr = menu_opt[opt].choice_list[i].replace(/\s/, "||__||").split("||__||");
        if (menu_opt[opt].default == i) {

          body += '<small><span class="badge bg-transparent text-dark">**'+label_arr[0] + '**</span></small>|';
        }else{

          body += '<small><span class="badge bg-transparent text-dark">'+label_arr[0] + '</span></small>|';
        }
      }

      body += '</span>';
      body += '</div>';
    });
  }


  if (item == 'menu_opt') {
    body += '<div class="input-group mb-3">';
    body += '  <span class="input-group-text" id="option">Option</span>';
    body += '  <input type="text" class="form-control" placeholder="name" aria-label="name" aria-describedby="option" id="e_config_option" value="'+e_config.option+'">';
    body += '</div>';


    body += '<div class="input-group mb-3">';
    body += '  <span class="input-group-text" id="points">choice_list</span>';
    body += '  <textarea class="form-control" placeholder="choice_list" aria-label="choice_list" aria-describedby="choice_list" id="e_config_choice_list" value="">'+e_config.choice_list+'</textarea>';
    body += '</div>';

    body += '<div class="input-group mb-3">';
    body += '  <span class="input-group-text" id="points">default</span>';
    body += '  <input type="text" class="form-control" placeholder="default" aria-label="default" aria-describedby="default" id="e_config_default" value="'+e_config.default+'">';
    body += '</div>';

  }

  var title = (index=="new"?"New: ":"Edit: ") + item;

  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="submitConfigEdit(&#39;'+ind+'&#39;);">Save</button></div>';

  showInputModal(title,body,footer);

}

function createAdminOperView() {
  var userinfo = getUserInfo();
  if (userinfo.acl && userinfo.acl.includes('admin')){
    if (!a_config) {
      gasAdminConfig();
    }

    initViews();
    if (userinfo.name == null){
      setHeaderTitle('h2', 'Invalid User');
      return;
    }
    header.innerHTML = getNavHtml_adminOper();
    footer.innerHTML = getFooterHtml_adminOper();

    var div = createCustomElement('div', 'container col_11');
    content.appendChild(div);
    div.id = 'adminPage';
    var html = '<div class="container col-11 mt-5 pb-5">';

    if (a_config) {

      html += '<div class="input-group mb-3">';
      html += '  <label class="input-group-text" for="inputGroupSelect01">Config</label>';
      html += '  <select class="form-select" id="selected_config" onchange="selectConfig()">';
      html += '    <option selected>Choose...</option>';
      Object.keys(a_config).forEach(key => {
        html += '    <option>'+key+'</option>';
      });
      html += '  </select>';
      html += '</div>';

      html += '<div id="config_table"></div>';

    }

    html += '</div>';
    div.innerHTML = html;
    
  }else{
    window.location.href = 'index.html';
  }
}

function renderStatCanvas_byoc() {
  const ctx = document.getElementById('byoc');
  const DATA_COUNT = 3;
  const DATA_MAX = stat.header.byoc['Accumulated'];
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: DATA_MAX};
  const labels = ['BYOC', 'Coupon Issued', 'Coupon Used'];

  var data_input = {};
  Object.keys(stat.header.byoc).forEach(k => {
    data_input[k] = [];
  });
  Object.keys(stat.header.byoc).forEach(k => {
    data_input[k].push(stat.header.byoc[k]);
    data_input[k].push(stat.header.coupon_issued[k]);
    data_input[k].push(stat.header.coupon_used[k]);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: Object.keys(stat.header.byoc)[0],
        data: data_input[Object.keys(stat.header.byoc)[0]],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1
      },
      {
        label: Object.keys(stat.header.byoc)[1],
        data: data_input[Object.keys(stat.header.byoc)[1]],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1
      }
    ]
  };

  const chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  chart.setDatasetVisibility(1, false);
  chart.update();
}

function renderStatCanvas_sales() {
  const ctx = document.getElementById('sales');
  const DATA_COUNT = Object.keys(stat.sales).length;
  const DATA_MAX = 10;
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: DATA_MAX};
  const labels = Object.keys(stat.sales);
  var data_input = {};
  Object.keys(stat.sales).forEach(date => {
    Object.keys(stat.sales[date]).forEach(item => {
      data_input[item] = [];
    });
  });
  Object.keys(data_input).forEach(item => {
    labels.forEach(date => {
      if (stat.sales[date].hasOwnProperty(item)) {
        data_input[item].push(stat.sales[date][item].qty);
      }else{
        data_input[item].push(0);
      }
    });
  });

  // Generate an array of RGB colors matching the data length
  const dynamicBackgroundColors = [];
  const dynamicBorderColors = [];
  
  Object.keys(data_input).forEach(() => {
    // Generate the RGB channels once per data point
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    // Use the exact same R, G, B values for both properties
    dynamicBackgroundColors.push(`rgba(${r}, ${g}, ${b}, 0.5)`); // Shaded fill
    dynamicBorderColors.push(`rgb(${r}, ${g}, ${b})`);           // Solid border
  });

  var datasets = [];
  var i = 0;
  Object.keys(data_input).forEach(d => {
    var obj = {};
    obj.label = d;
    obj.data = data_input[d];
    obj.borderColor = dynamicBorderColors[i];
    obj.backgroundColor = dynamicBackgroundColors[i];
    obj.borderWidth = 1;
    datasets.push(obj);
    i++;
  });

  const data = {
    labels: labels,
    datasets: datasets
  };

  const chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false, // Allows the chart to fill the parent container's height
      scales: {
        x: {
          stacked: true,
        },
        y: {
          beginAtZero: true,
          stacked: true,
          ticks: {
            stepSize: 5 // Forces ticks to generate at 0, 0.1, 0.2, 0.3...
          }
        }
      }
    }
  });


  // 2. Add Action Button Event Listener
  const deselectAllBtn = document.getElementById('deselectAllBtn');
  deselectAllBtn.addEventListener('click', () => {
    chart.data.datasets.forEach((dataset, index) => {
      chart.setDatasetVisibility(index, false); // Hide the dataset
    });
    chart.update();
  });
  const selectAllBtn = document.getElementById('selectAllBtn');
  selectAllBtn.addEventListener('click', () => {
    chart.data.datasets.forEach((dataset, index) => {
      chart.setDatasetVisibility(index, true); // Hide the dataset
    });
    chart.update();
  });
}

function renderStatTables_sales() {

  var keys = ['qty', 'points'];

  keys.forEach(k => {

  var ind = 1;
  var data_input = {};
  var total_arr = [];
  Object.keys(stat.sales).forEach(date => {
    var total = 0;
    Object.keys(stat.sales[date]).forEach(item => {
      data_input[item] = [];
      total += stat.sales[date][item][k];
    });
    total_arr.push(total);
  });
  Object.keys(data_input).forEach(item => {
    Object.keys(stat.sales).forEach(date => {
      if (stat.sales[date].hasOwnProperty(item)) {
        data_input[item].push(stat.sales[date][item][k]);
      }else{
        data_input[item].push(0);
      }
    });
  });
  data_input['Grand Total'] = total_arr;

  console.log(JSON.stringify(data_input,0,2));

  var div = document.getElementById('sales_'+k+'_table');
  var table = '';
  table += '<table class="table table-light table-hover table-sm table-striped-columns table-striped-tbody-columns text-muted">';
  table += '  <thead>';
  table += '    <tr>';

  table += '      <th scope="col">'+k+'</th>';
  Object.keys(stat.sales).forEach(date => {
    table += '      <th scope="col">'+date+'</th>';
  });
  table += '      <th scope="col"><strong>Total</strong></th>';
  table += '    </tr>';
  table += '  </thead>';

  table += '  <tbody>';
  Object.keys(data_input).forEach(item => {

    table += '    <tr>';
    if (item == 'Grand Total') {
      table += '      <th scope="row"><strong class="text-primary">'+item+'</strong></th>';
    }else{
      table += '      <th scope="row">'+ind+'. '+item+'</th>';
    }
    
    for (var i = 0; i < data_input[item].length; i++) {
      if (item == 'Grand Total') {
        table += '      <td><strong class="text-primary">'+data_input[item][i]+'</strong></td>';
      }else{
        table += '      <td>'+data_input[item][i]+'</td>';
      }
    }
    table += '      <td><strong '+(item == 'Grand Total'?'class="text-primary"':'')+'>'+Math.sumPrecise(data_input[item])+'</strong></td>';
    table += '    </tr>';
    ind++;
  });
  table += '  </tbody>';
  table += '</table>';

  div.innerHTML = table;

  });

  
}

function createStatView() {
  var userinfo = getUserInfo();
  if (userinfo.acl && userinfo.acl.includes('admin')){
    if (!stat) {
      gasStat();
    }

    initViews();
    if (userinfo.name == null){
      setHeaderTitle('h2', 'Invalid User');
      return;
    }
    header.innerHTML = getNavHtml_adminOper();
    footer.innerHTML = getFooterHtml_adminOper();

    var div = createCustomElement('div', 'container col_11');
    content.appendChild(div);
    div.id = 'adminPage';
    var html = '<div class="container col-11 mt-5 pb-5">';

    if (stat) {
      if (stat.header) {

        if (stat.header.pt_flow) {
          html += '<ul class="list-group pb-5 mb-5">';
          html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-light text-dark">';
          html += '<strong>Points</strong>';
          html += '<span class="badge rounded-pill bg-white text-muted">'+stat.timestamp+'</span>';
          html += '</li>';
          html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
          html += '<p>'
          Object.keys(stat.header.pt_flow).forEach(k => {
            html += k+': '+stat.header.pt_flow[k]+'<br>';
          });
          html += '</p>';
          html += '</li>';
        }
        if (stat.header.byoc) {
          html += '<br>';
          html += '<ul class="list-group pb-5 mb-5">';
          html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-light text-dark">';
          html += '<strong>BYOC</strong>';
          html += '<span class="badge rounded-pill bg-white text-muted">'+stat.timestamp+'</span>';
          html += '</li>';
          html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
          html += '<div><canvas id="byoc"></canvas></div>';
          html += '</li>';
        }

        if (stat.sales) {
          html += '<br>';
          html += '<ul class="list-group pb-5 mb-5">';
          html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-light text-dark">';
          html += '<strong>Sales (This Month)</strong>';
          html += '<span class="badge rounded-pill bg-white text-muted">'+stat.timestamp+'</span>';
          html += '</li>';
          html += '<li class="list-group-item">';
          html += '<div style="width: 75vw; height: 60vh; overflow-x: auto;"><canvas id="sales"></canvas></div>';
          html += '<div class="text-center">';
          html += '<button class="btn btn-light text-muted mx-1" id="selectAllBtn">Select All</button>';
          html += '<button class="btn btn-light text-muted mx-1" id="deselectAllBtn">Deselect All</button>';
          html += '</div>';
          html += '<br>';
          html += '</li>';
          html += '<li class="list-group-item">';
          html += '<br>';
          html += '<div class="table-responsive table-container" id="sales_qty_table"></div>';
          html += '<br>';
          html += '</li>';
          html += '<li class="list-group-item">';
          html += '<br>';
          html += '<div class="table-responsive table-container" id="sales_points_table"></div>';
          html += '<br>';
          html += '</li>';
        }
      }
    }
    // }

    html += '</div>';
    div.innerHTML = html;
    renderStatCanvas_byoc();
    renderStatCanvas_sales();
    renderStatTables_sales();
    
  }else{
    window.location.href = 'index.html';
  }
}


function createMemEnquiryView() {
  var userinfo = getUserInfo();
  if (userinfo.acl && userinfo.acl.includes('memOper')){

    initViews();
    if (userinfo.name == null){
      setHeaderTitle('h2', 'Invalid User');
      return;
    }
    header.innerHTML = getNavHtml_memEnq();
    footer.innerHTML = getFooterHtml_memEnq();

    var div = createCustomElement('div', 'container col_11');
    content.appendChild(div);
    div.id = 'txPage';
    var html = '<div class="container col-11 mt-5 pb-5">';

    html += '<div class="input-group mb-3">';
    html += '  <input type="email" class="form-control" placeholder="Member&#39;s Email" aria-label="member" aria-describedby="basic-addon2" id="mem_enq_input">';
    html += '<button class="btn btn-warning" type="button" id="button-addon2" onclick="return submitEnquiry();">Enquire</button>';
    html += '</div>';

    if (member) {
      html += '<ul class="list-group pb-5 mb-5">';
      html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-light text-dark">';
      html += '<strong>'+member.email+'</strong>';
      if (member.tx) {
        html+='<span class="badge rounded-pill bg-light text-dark"><i class="fa fa-ticket"></i> '+member.available_coupons+'</span>';
        html+='<span class="badge rounded-pill bg-light text-dark"><i class="fa fa-coffee"></i> '+member.byoc+'</span>';
        html+='<span class="badge rounded-pill bg-warning text-dark" onclick="return createMemOperView();">'+member.points+'</span>';

        html += '</li>';
        // if (member.tx) {
          for (var i = member.tx.length-1; i >= 0; i--) {
            var txArr = member.tx[i].split('|');
            html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
            html += '<p>'+txArr[1]+'<br>';
            html += '<small class="text-muted">'+txArr[0]+' </small></p><strong class="text-'+(Number(txArr[2])>0?'success">+':'dark">')+Number(txArr[2])+'</strong>';
            html += '</li>';
          }
        // }
      } else {
        html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
        html+='Non-Member <button class="btn btn-warning btn-sm rounded-pill" onclick="return createMemOperView();"><strong><small>Top-Up</small></strong></button>';
        html += '</li>'
      }
      html += '</ul>';

    }
    html += '</div>';
    div.innerHTML = html;
    
  }else{
    window.location.href = 'index.html';
  }

}


function createShopOrdersView() {
  var userinfo = getUserInfo();
  if (userinfo.acl && userinfo.acl.includes('shopOper')){
    gasGetAllOrders();
    var allOrdersJson = getAllOrders();
    var allOrders = allOrdersJson.orders?allOrdersJson.orders:null;
    var acceptOrder = allOrdersJson.acceptOrder;
    initViews();
    if (userinfo.name == null){
      setHeaderTitle('h2', 'Invalid User');
      return;
    }
    header.innerHTML = getNavHtml_shopOper();
    footer.innerHTML = getFooterHtml_shopOper();

    var div = createCustomElement('div', 'container col_11');
    content.appendChild(div);
    div.id = 'txPage';
    var html = '<div class="container col-11 mt-5 pb-5">';

    
    html += '<ul class="list-group pb-5 mb-5">';
    var orderHtmlStr = '';


    html += '<li class="list-group-item text-bg-light"><div class="btn-toolbar justify-content-between"><div class="btn-group">';
    for (var i = 0; i < o_flag_list.length; i++) {
      html += '<button class="btn mx-1 btn-outline-warning'+(o_flag==i?' active':'')+' btn-sm rounded-pill" onclick="return selectOrderFlag('+i+');" id="order_flag_'+i+'"><strong><small>'+o_flag_list[i]+'</small></strong></button>';
    }
    html += '</div>';

    if (acceptOrder) {
      html += '<div class="btn-group"><button type="button" class="btn btn-warning" onclick="return gasAcceptOrder(0);"><small><strong>截單 Cut</strong></small></button></div>';
    }else{
      html += '<button type="button" class="btn btn-warning text-end" onclick="return gasAcceptOrder(1);"><small><strong>接單 Accept</strong></small></button>';
    }
    html += '</div></li>';

    if (allOrders=="No Orders" || !allOrders) {
      orderHtmlStr = '<li class="list-group-item d-flex justify-content-between align-items-center">No Orders</li>';
    }else{
      var count = 0;
      Object.keys(allOrders).forEach(key => {
        if (allOrders[key].status == 'P' && o_flag==2) {
          return;
        }
        if (allOrders[key].status != 'P' && o_flag==1) {
          return;
        }
        count++;
        var li = '';
        li += '<li class="list-group-item d-flex justify-content-between align-items-center">';
        if (allOrders[key].status == 'P') {
          li += '<p><button class="btn btn-warning" id="'+allOrders[key].oid+'" onclick="return gasCompleteOrder(&#39;'+allOrders[key].oid+'&#39;);"><strong>'+allOrders[key].oid+'</strong></button> <br> <strong class="text-warning">'+allOrders[key].user+'</strong><br>'+allOrders[key].item;
        }else{
          li += '<p><strong>'+allOrders[key].oid+'<br> <span class="text-warning">'+allOrders[key].user+'</span></strong><br>'+allOrders[key].item;
        }
        if (allOrders[key].hasOwnProperty('pref')) {
          li += ' <span class="badge rounded-pill bg-'+(allOrders[key].pref=='H'?'danger':'primary')+'">'+allOrders[key].pref+'</span>';
        }
        li += (allOrders[key].hasOwnProperty('byoc') && allOrders[key].byoc)?' <span class="badge rounded-pill bg-success"><i class="fa fa-coffee"></i></span>':'';

        if (allOrders[key].opt) {
          for (var opt in allOrders[key].opt) {
            li += '<br><small class="text-secondary"> - '+allOrders[key].opt[opt]+'</small>';
          }
        }
        li += (allOrders[key].ts)?'<br><br><small class="text-secondary">'+allOrders[key].ts.split(' ')[1]+'</small>':'';
        li += '</p>';
        li += '</li>';
        orderHtmlStr = li + orderHtmlStr;
      });
      if (count < 1) {
        orderHtmlStr += '<li class="list-group-item d-flex justify-content-between align-items-center">No Orders</li>';
      }
    }
    html += orderHtmlStr;

    html += '</ul>';
    html += '</div>';
    div.innerHTML = html;
  }else{
    window.location.href = 'index.html';
  }

}

function createTxView() {
  sessionStorage.setItem('callback', 'createTxView');

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
  content.scrollTop = 0;
  div.id = 'txPage';
  var html = '<div class="container col-11 mt-5 pb-5">';

  var o = userinfo.orders;
  if (o) {
    Object.keys(o).forEach(oid => {
      var isPend = o[oid].status == 'P';
      html += '<div class="alert alert-'+(isPend?'warning':'success')+'" role="alert">';
      html += '<strong>'+(isPend?'⏳':'✅')+' ['+oid+'] </strong><br>';
      html += o[oid].item;
      if (o[oid].hasOwnProperty('pref')) {
        html += ' <span class="badge rounded-pill bg-'+(o[oid].pref=='H'?'danger':'primary')+'">'+o[oid].pref+'</span>';
      }
      html += (o[oid].hasOwnProperty('byoc') && o[oid].byoc)?'  <span class="badge rounded-pill bg-success"><i class="fa fa-coffee"></i></span>':'';
      if (o[oid].opt) {
        html += '<ul>';
        for (var opt in o[oid].opt) {
          html += '<li><small>'+o[oid].opt[opt]+'</small></li>';
        }
        html += '</ul>';
      }
      html += '</div>';
    });
  }


  
  html += '<ul class="list-group pb-5 mb-5">';
  html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
  html += '<strong>咖啡因補給日誌<br>Caffeine Refuel Log</strong>';
  if (userinfo.points){
    html+='<span class="badge rounded-pill bg-'+(userinfo.available_coupons>0?'info':'secondary')+'"><i class="fa fa-ticket"></i> '+userinfo.available_coupons+'</span>';
    html+='<span class="badge rounded-pill bg-'+(userinfo.byoc>0?'success':'secondary')+'"><i class="fa fa-coffee"></i> '+userinfo.byoc+'</span>';
    html+='<span class="badge rounded-pill bg-light text-dark"><strong>'+userinfo.points+'</strong></span>';
  }
  html += '</li>';
  if (userinfo.tx) {
    var txArr = userinfo.tx;
    for (var i = txArr.length-1; i >= 0; i--) {
      html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
      html += '<p>'+txArr[i].desc+'<br>';
      html += '<small class="text-muted">'+txArr[i].timestamp+' </small></p><strong class="text-'+(txArr[i].points>0?'success">+':'dark">')+txArr[i].points+'</strong>';
      html += '</li>';
    }

  }else{
    html += '<li class="list-group-item d-flex justify-content-between align-items-center ">';
    html += '即將登場';
    html += '</li>';
  }
  html += '</ul>';
  html += '</div>';
  div.innerHTML = html;

}

function createMainView() {
  sessionStorage.setItem('callback', 'createMainView');

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
  html += '<strong>咖啡密語<br>The Coffee Whisper</strong>';
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
  // var member = getMember();
  // if (member && member.ut) {
  //   memForm.ut = member.ut;
  // }else{
  //   showAlertModal('錯誤','未能取得用戶資料','');
  //   return;
  // }
  var userinfo = getUserInfo();
  if (userinfo && userinfo.m_config && userinfo.m_config.pt_list) {
    ptlist = userinfo.m_config.pt_list;
  }else{
    showAlertModal('錯誤','未能取得選項','');
    return;
  }

  var memTagStr = member.email+': '+member.points;
  // var userinfo = getUserInfo();
  var body = '';
  body += '<span><strong>'+member.email+'</strong> <p class="text-danger">現有 points: '+member.points+'</p></span>';
  body += '<div class="input-group mb-3" role="alert">';
  body += '<label class="input-group-text">Top-Up</label>';
  body += '  <select class="form-select" id="input_top_up" onchange="selectTopUp()">';
  Object.keys(ptlist).forEach(key => {
    body += '    <option value='+`${key}`+'>'+`${ptlist[key]['desc']}`+'</option>';
  });
  body += '  </select>';
  body += '  <input class="form-control" id="input_top_up_remarks" type="text" placeholder="請註明 Desc" disabled></input>';
  body += '</div>';
  body += '<div class="input-group mb-3">';
  body += '<label class="input-group-text">Points</label>';
  body += '  <input class="form-control" id="input_top_up_pt" type="text" value = "'+ptlist[Object.keys(ptlist)[0]].default_pt+'" placeholder="請註明 Points" required></input>';
  body += '</div>';
  body += '</div>';
  body += '</div>';
  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="confirmTopUpView();">確定</button></div>';
  showInputModal('會員管理',body,footer);
}

function confirmTopUpView() {
  // var member = getMember();
  // if (member && member.ut) {
  //   memForm.ut = member.ut;
  // }else{
  //   showAlertModal('錯誤','未能取得用戶資料','');
  //   return;
  // }

  var new_desc = document.getElementById('input_top_up_remarks');
  if (memForm.remarks && new_desc.value) {
    memForm.desc = new_desc.value;
  }

  var new_pt = document.getElementById('input_top_up_pt');
  if (new_pt.value) {
    memForm.pt = new_pt.value;
  }

  var body = '';
  body += '<span><strong>'+member.email+'</strong> <p class="text-danger">現有 points: '+member.points+'</p></span>';
  body += '<span class="text-primary"><strong>Top up:</strong> <p>'+memForm.desc+' '+memForm.pt+'</p></span>';
  // var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="submitJoin('+id+');">確定</button></div>';
  var footer = footer = '<button type="button" class="btn btn-secondary" onclick="return backForm();">返回</button>';
  footer += '<button type="button" class="btn btn-danger" onclick="return submitTopUp();">確定</button>';
  showConfirmModal('會員管理',body,footer);
}

function createOrderView(orderRes) {
  var body = '<div class="container col-11 mt-3 mb-3"><ul class="list-group">';
  body += '<li class="list-group-item d-flex justify-content-between align-items-center">';
  body += '<div class="d-flex col flex-column align-items-center"><strong>';
  body += orderRes.item;
  body += ' <span class="badge rounded-pill bg-'+(orderRes.pref=='H'?'danger':'primary')+'">'+orderRes.pref+'</span>';
  body += (orderRes.byoc)?'  <span class="badge rounded-pill bg-success"><i class="fa fa-coffee"></i></span></label>':'';
  body += '</strong></div>';
  body += '</li>';
  body += '</ul>';
  body += '</div>';
  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="completeOrder();">確定</button></div>';
  showConfirmModal('訂單: '+orderRes.oid, body, footer);
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
  img.src = 'img/cafe_logo.png';
  // img.width = '150';
  img.height = '200';
  div3.appendChild(img);
  div2.appendChild(div3);
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
