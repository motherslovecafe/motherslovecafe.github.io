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

function getNavHtml_memEnq() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <a class="navbar-brand" onclick="createMemEnquiryView()">';
  html += '      <img src="img/cafe_logo_2.png" height="40px" alt="">  ';
  html += '    </a>';
  html += '<span class="badge text-bg-warning my-2 my-sm-0">Member</span>';
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
  html += '<span class="badge text-bg-warning my-2 my-sm-0">Order</span>';
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

function getFooterHtml() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-1 my-1">';
  html += '    <div class="container navbar-brand col-12">';
  html += '    <div class="row">';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button"><i class="fa-regular fa-house" style="font-size:28px;" onclick="return createMainView();"></i></button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning position-relative" type="button" onclick="return createUseVoucherView();"><i class="fa fa-coffee" style="font-size:28px;"></i>';
  html += '</button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createTxView();"><i class="fa-regular fa-calendar-days" style="font-size:28px;"></i></button></div>';
  html += '      <div class="col text-center px-0"><button class="btn btn-light text-warning" type="button" onclick="return createMoreView();"><i class="fa-solid fa-ellipsis" style="font-size:28px;"></i></button></div>';
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
  var qrcode = new QRCode("qrcode",{"text": window.btoa('act=user&c='+userinfo.ut), "width":200, "height":200});

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
  html += '<button type="button" class="btn btn-danger col-12 col-lg-4 my-3" onclick="return logout();">下次見 See you soon</button>';
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
    getPrefHotOnlyList();
  }else{
    showAlertModal('錯誤','未能取得餐牌','');
    return;
  }

  var body = '';
  body += '<div class="input-group my-3 mb-3">';
  body += '  <button class="btn btn-danger" type="button" id="btn_coffee_pref" onclick="selectPref()">熱 Hot</button>';
  body += '  <select class="form-select" id="input_select_coffee" onchange="selectCoffee()">';
  Object.keys(coffeeList).forEach(key => {
    if (coffeeList[key]['active']) {
      body += '    <option value='+`${key}`+'>'+`${coffeeList[key]['name']}`+' '+coffeeList[key]['points']+'</option>';
    }
  });
  body += '  </select>';
  body += '</div>';
  body += '<div class="mb-3" id="coffee_opt_input"></div>';

  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="createVoucherQRview();">就咁話！👍 Espresso-ly Yes!</button></div>';

  showInputModal('你的選擇 Your Choice',body,footer);
  orderForm = {'coffee_id':'cf001','coffee_pref':'H','byoc':false, 'opt':null, 'useCoupon':false, 'add_on':null}; // set default
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
  body += ' <span class="badge rounded-pill bg-'+(pref=='H'?'danger':'primary')+'">'+pref+'</span>';
  body += '</strong>';
  if (orderForm.opt) {
    body += '<ul>';
    Object.keys(orderForm.opt).forEach(key => {
      body += '<li><small>'+coffeeList[orderForm.coffee_id].opt[key].choice_list[orderForm.opt[key]]+'</small></li>';
    });
    body += '</ul>';
  }


  body += '<div class="text-center"><p>Points: <strong id="calcPoints"></strong></p></div>';

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

  if (userinfo.add_on) {

    body += '<div class="alert alert-primary" role="alert">';

    Object.keys(userinfo.add_on).forEach(key => {

      body += '<div class="form-check">';
      body += '  <input class="form-check-input" type="checkbox" value="" id="'+key+'" onclick="calcPoints()">';
      body += '  <label class="form-check-label" for="'+key+'">';
      body += '    +'+userinfo.add_on[key].points+' pt '+userinfo.add_on[key].name;
      body += '  </label>';
      body += '</div>';
      
      body += '</div>';
    });

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
        html+='<span class="badge rounded-pill bg-light text-dark"><strong>'+member.points+'</strong></span>';

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
        html += '<li class="list-group-item d-flex justify-content-between align-items-center">Non-Member</li>'
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

    if (acceptOrder) {
      html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
      html += '<strong>All Orders</strong>';
      html += '<button type="button" class="btn btn-light text-danger" onclick="return gasAcceptOrder(0);"><strong>截單 Cut</strong></button>';
      html += '</li>';
    }else{
      html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
      html += '<strong>All Orders</strong>';
      html += '<button type="button" class="btn btn-light" onclick="return gasAcceptOrder(1);"><strong>接單 Accept</strong></button>';
      html += '</li>';
    }

    if (allOrders=="No Orders" || !allOrders) {
      orderHtmlStr = '<li class="list-group-item d-flex justify-content-between align-items-center">No Orders</li>';
    }else{

      Object.keys(allOrders).forEach(key => {
        var li = '';
        li += '<li class="list-group-item d-flex justify-content-between align-items-center">';
        if (allOrders[key].status == 'P') {
          li += '<p><button class="btn btn-warning" id="'+allOrders[key].oid+'" onclick="return gasCompleteOrder(&#39;'+allOrders[key].oid+'&#39;);"><strong>'+allOrders[key].oid+'</strong></button> <br> <strong class="text-warning">'+allOrders[key].user+'</strong><br>'+allOrders[key].item;
        }else{
          li += '<p><strong>'+allOrders[key].oid+'<br> <span class="text-warning">'+allOrders[key].user+'</span></strong><br>'+allOrders[key].item;
        }
        li += ' <span class="badge rounded-pill bg-'+(allOrders[key].pref=='H'?'danger':'primary')+'">'+allOrders[key].pref+'</span>';
        // li += (allOrders[key].extra)?' <span class="badge rounded-pill bg-dark">EX</span>':'';
        li += (allOrders[key].byoc)?' <span class="badge rounded-pill bg-success"><i class="fa fa-coffee"></i></span>':'';

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
      html += ' <span class="badge rounded-pill bg-'+(o[oid].pref=='H'?'danger':'primary')+'">'+o[oid].pref+'</span>';
      html += (o[oid].byoc)?'  <span class="badge rounded-pill bg-success"><i class="fa fa-coffee"></i></span>':'';
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
  var member = getMember();
  if (member && member.ut) {
    memForm.ut = member.ut;
  }else{
    showAlertModal('錯誤','未能取得用戶資料','');
    return;
  }
  var userinfo = getUserInfo();
  if (userinfo && userinfo.m_config && userinfo.m_config.pt_list) {
    ptlist = userinfo.m_config.pt_list;
  }else{
    showAlertModal('錯誤','未能取得選項','');
    return;
  }
  var memTagStr = member.name+': '+member.points;
  var userinfo = getUserInfo();
  var body = '';
  body += '<span><strong>'+member.name+'</strong> <p class="text-danger">現有 points: '+member.points+'</p></span>';
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
  body += '  <input class="form-control" id="input_top_up_pt" type="text" value = "50" placeholder="請註明 Points" required></input>';
  body += '</div>';
  body += '</div>';
  body += '</div>';
  var footer = '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="confirmTopUpView();">確定</button></div>';
  showInputModal('會員管理',body,footer);
}

function confirmTopUpView() {
  var member = getMember();
  if (member && member.ut) {
    memForm.ut = member.ut;
  }else{
    showAlertModal('錯誤','未能取得用戶資料','');
    return;
  }

  var new_desc = document.getElementById('input_top_up_remarks');
  if (memForm.remarks && new_desc.value) {
    memForm.desc = new_desc.value;
  }

  var new_pt = document.getElementById('input_top_up_pt');
  if (new_pt.value) {
    memForm.pt = new_pt.value;
  }

  var body = '';
  body += '<span><strong>'+member.name+'</strong> <p class="text-danger">現有 points: '+member.points+'</p></span>';
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
