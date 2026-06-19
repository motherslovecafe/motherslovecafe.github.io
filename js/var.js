var labels = {};
var lang = 'zh';
var orderForm = {'coffee_id':'cf001','coffee_pref':'H','byoc':false};
var gid = '';
var coffeeList = {
  "cf001":{
    "name": "特濃咖啡 Espresso", 
    "price": 12, 
    "pref": ["H","C"]
  },
  "cf002":{
    "name": "短笛 Piccolo", 
    "price": 12, 
    "pref": ["H"]
  },
  "cf003":{
    "name": "美式咖啡 Americano", 
    "price": 12, 
    "pref": ["H","C"]
  },
  "cf004":{
    "name": "白咖啡 Flat White", 
    "price": 14, 
    "pref": ["H"]
  },
  "cf005":{
    "name": "卡布奇諾 Cappuccino", 
    "price": 14, 
    "pref": ["H","C"]
  },
  "cf006":{
    "name": "拿鐵 Latte", 
    "price": 14, 
    "pref": ["H","C"]
  },
  "cf007":{
    "name": "焦糖拿鐵 Caramel Latte", 
    "price": 14, 
    "pref": ["H","C"]
  },
  "cf008":{
    "name": "摩卡 Mocha", 
    "price": 14, 
    "pref": ["H","C"]
  },
  "cf009":{
    "name": "朱古力 Chocolate", 
    "price": 14, 
    "pref": ["H","C"]
  }
};
var prefHotOnlyList = [
  'cf002',
  'cf004'
];
var header = document.getElementById('container_header');
var content = document.getElementById('container_content');
var footer = document.getElementById('container_footer');
var sysRec = {};
var s_code = '';
var app_name = "Mother's Love Café";