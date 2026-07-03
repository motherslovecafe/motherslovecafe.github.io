function getScanData(data) {
  const dataStr = window.atob(data);
  const params = new URLSearchParams(dataStr);
  const obj = Object.fromEntries(params);
  switch (obj.act) {
  case 'user':
    gasMember(obj.c);
    break;
  case 'o':
    gasOrder(decodeForm(obj.c));
    break;
  default:
    // Code runs if no cases match
  }
}

function gasRefresh() {
  on();
  inputModal.hide();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=mm&content='+userinfo.ut+'&ut='+userinfo.ut;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        localStorage.setItem('userinfo', JSON.stringify(data.res));
        createTxView();
      }else{
        createErrorView(data.error_msg);
      }
    }
    off();
  });
}

function gasMember(code) {
  var content = code;
  on();
  inputModal.hide();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=mm&content='+content+'&ut='+userinfo.ut;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        localStorage.setItem('member', JSON.stringify(data.res));
        createMemOperView();
      }else{
        createErrorView(data.error_msg);
      }
    }
    off();
  });
}

function gasOrder(code) {
  on();
  inputModal.hide();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=order&content='+JSON.stringify(code)+'&ut='+userinfo.ut;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        localStorage.setItem('allOrders', JSON.stringify(data.res));
        createShopOrdersView();
      }else{
        createErrorView(data.error_msg);
      }
    }
    off();
  });
}

function gasCompleteOrder(code) {
  // on();
  // inputModal.hide();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=co&content='+code+'&ut='+userinfo.ut;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        localStorage.setItem('allOrders', JSON.stringify(data.res));
        createShopOrdersView();
      }else{
        createErrorView(data.error_msg);
      }
    }
    // off();
  });
}

function gasJoinMember() {
  var member = getMember();
  var content = member.ut;
  on();
  inputModal.hide();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=join&content='+content+'&ut='+userinfo.ut;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        createSuccessView();
      }else{
        createErrorView(data.error_msg);
      }
    }
    off();
  });
}

function gasTopUp() {
  on();
  inputModal.hide();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=topup&content='+JSON.stringify(memForm)+'&ut='+userinfo.ut;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        createSuccessView();
      }else{
        createErrorView(data.error_msg);
      }
    }
    off();
  });
}

function gasGetAllOrders() {
  // on();
  // inputModal.hide();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=getorders&ut='+userinfo.ut;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        localStorage.setItem('allOrders', JSON.stringify(data.res));
        createShopOrdersView();
      }
    }
    // off();
  });
}

$(document).ready(function() {
  // login
  var access_token = '';
  // Parse query string to see if page request is coming from OAuth 2.0 server.
  var fragmentString = location.hash.substring(1);
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0 && params['state'] && params['access_token']) {
    access_token = params['access_token'];
  }else{
    access_token = localStorage.getItem('access_token');
  }
  if (access_token !== null) {
    on();
    var url = GAS_URL+'?action=login&token='+access_token;
    $.getJSON(url, function(data) {
      if (data !== null) {
        if (data.status=='0') {
          window.history.pushState({}, document.title, "?");
          localStorage.setItem('userinfo', JSON.stringify(data.res));
          localStorage.setItem('access_token', access_token);
          createMainView();
          off();
        }else if (data.error_code=='106') {
          alert('您需要存取權限。<br>請求存取權限，或切換具有存取權限的帳戶。');
          logout();
        }else{
          alert('已過期，請重新登入');
          logout();
        }
      }
    });
  }else{
    off();
    createGLoginView();
  }
});