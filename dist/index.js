function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var toolkitRaw = require('@reduxjs/toolkit');
var web3_js = require('@solana/web3.js');
var reactRedux = require('react-redux');
var SolanaAdapter = require('@solana/wallet-adapter-react');
var walletAdapterWallets = require('@solana/wallet-adapter-wallets');
var tronwalletAdapterLedger = require('@tronweb3/tronwallet-adapter-ledger');
var tronwalletAdapterTronlink = require('@tronweb3/tronwallet-adapter-tronlink');
var tronwalletAdapterOkxwallet = require('@tronweb3/tronwallet-adapter-okxwallet');
var tronwalletAdapterTokenpocket = require('@tronweb3/tronwallet-adapter-tokenpocket');
var tronwalletAdapterReactHooks = require('@tronweb3/tronwallet-adapter-react-hooks');
var tronwalletAbstractAdapter = require('@tronweb3/tronwallet-abstract-adapter');
var toast = require('react-hot-toast');
var toast__default = _interopDefault(toast);
var react = require('@web3modal/ethers5/react');
var walletAdapterBase = require('@solana/wallet-adapter-base');
var satsConnect = require('sats-connect');
var contracts = require('@ethersproject/contracts');
var units = require('@ethersproject/units');
var splToken = require('@solana/spl-token');
var tronweb = require('tronweb');
var ethers = require('ethers');
var BufferLayout = _interopDefault(require('buffer-layout'));
var sha256$1 = _interopDefault(require('crypto-js/sha256.js'));
var Base64 = _interopDefault(require('crypto-js/enc-base64.js'));
var buffer = require('buffer');
var bitcoin = require('bitcoinjs-lib');
var base = require('@scure/base');
var btc = require('@kimafinance/btc-signer');
require('hex64');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure " + obj);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _excluded = ["width", "height", "fill"];
var Cross = function Cross(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 60 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 60 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'white' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 25 26',
    fill: fill
  }, rest), React__default.createElement("path", {
    d: 'M0.832764 1.33276L24.1673 24.6673',
    stroke: '#778DA3',
    "stroke-width": '2'
  }), React__default.createElement("path", {
    d: 'M0.832764 24.6673L24.1673 1.3328',
    stroke: '#778DA3',
    "stroke-width": '2'
  }));
};

var _excluded$1 = ["width", "height", "fill"];
var Minimize = function Minimize(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 16 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 1 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#86B8CE' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  return React__default.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 11 1',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React__default.createElement("rect", {
    width: '11',
    height: '1',
    fill: fill
  }));
};

var _excluded$2 = ["width", "height", "fill"];
var FooterLogo = function FooterLogo(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 40 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 40 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#C5C5C5' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 49 18',
    fill: fill
  }, rest), React__default.createElement("path", {
    d: 'M30.1884 10.576C30.1884 9.5081 30.7939 8.62496 31.9158 8.62496C32.8449 8.6572 33.5977 9.53173 33.5977 10.576V17.2908C33.5977 17.4584 33.7284 17.5938 33.8901 17.5938H36.8246C36.9863 17.5938 37.117 17.4584 37.117 17.2908V9.83256C37.117 7.1144 35.5699 5.34813 33.1021 5.34813C31.3974 5.34813 30.2755 6.11523 29.5579 6.94895C29.5455 6.96399 29.5268 6.96184 29.5144 6.9468C28.8632 6.04648 27.8304 5.34813 26.3497 5.34813C25.0038 5.34813 23.8612 5.92829 23.2971 6.78349C23.2784 6.77705 23.2971 6.78349 23.2763 6.77705V5.93259C23.2763 5.76499 23.1457 5.62962 22.9839 5.62962H20.0702C19.9085 5.62962 19.7778 5.76714 19.7778 5.93259V17.293C19.7778 17.4606 19.9085 17.596 20.0702 17.596H22.9839C23.1457 17.596 23.2763 17.4606 23.2763 17.293V10.5782C23.2763 9.51025 23.8819 8.62711 24.981 8.62711C25.9225 8.65934 26.6857 9.53388 26.6857 10.5782V17.293C26.6857 17.4606 26.8163 17.596 26.9781 17.596H29.8918C30.0536 17.596 30.1842 17.4606 30.1842 17.293V10.5782L30.1884 10.576ZM45.6134 17.2887C45.6134 17.4563 45.744 17.5917 45.9058 17.5917H48.7075C48.8692 17.5917 48.9999 17.4563 48.9999 17.2887V10.1807C48.9999 7.1144 47.0713 5.34813 43.7739 5.34813C42.5711 5.33739 40.9203 5.69838 39.9643 6.1711C39.8648 6.22052 39.8025 6.32796 39.8025 6.44184V8.89141C39.8025 9.11703 40.0307 9.26099 40.2256 9.16215C41.051 8.74314 41.9946 8.44017 42.9858 8.44017C44.4354 8.41009 45.6092 9.25455 45.6092 10.3225V10.4084C45.6092 10.576 45.4329 10.6856 45.294 10.5997C44.7527 10.2666 43.8651 9.97437 42.9174 9.97437C40.4724 9.97437 38.4546 11.5086 38.4546 13.8314C38.4546 16.3411 40.4724 17.8753 42.8054 17.8753C44.1513 17.8753 45.2048 17.3166 45.6092 16.8525V17.293L45.6134 17.2887ZM45.659 13.8292C45.659 14.7811 44.649 15.2925 43.6847 15.2925C42.7204 15.2925 41.6897 14.7811 41.6897 13.8292C41.6897 12.8773 42.6768 12.3896 43.6847 12.3896C44.6926 12.3896 45.659 12.901 45.659 13.8292Z',
    fill: fill
  }), React__default.createElement("path", {
    d: 'M14.1994 17.594H17.1131C17.2749 17.594 17.4055 17.4586 17.4055 17.291V5.92846C17.4055 5.76086 17.2749 5.62549 17.1131 5.62549H14.1994C14.0376 5.62549 13.907 5.76086 13.907 5.92846V17.2889C13.907 17.4565 14.0376 17.5918 14.1994 17.5918',
    fill: fill
  }), React__default.createElement("path", {
    d: 'M15.6801 0H15.6324C14.4378 0 13.488 0.960487 13.488 2.2218C13.488 3.48311 14.4378 4.41996 15.6324 4.41996H15.6801C16.8497 4.41996 17.8244 3.45947 17.8244 2.2218C17.8244 0.984123 16.8497 0 15.6801 0Z',
    fill: fill
  }), React__default.createElement("path", {
    d: 'M10.9746 14.199C10.591 13.8122 10.1015 13.6038 9.60589 13.5758C7.70213 13.5114 7.42839 11.874 7.42839 11.4615C7.42839 11.0102 7.73117 9.43092 9.60174 9.36861C10.0974 9.33852 10.5868 9.13224 10.9705 8.74332C11.8166 7.89027 11.8332 6.48714 11.0099 5.61046C10.593 5.16567 10.0393 4.9422 9.48561 4.94005H9.47109C8.93605 4.94005 8.39893 5.15063 7.98624 5.56748C7.53208 6.02516 7.34129 6.6397 7.34129 7.2478C7.34129 7.78069 7.00118 9.24183 5.41887 9.24183C4.82368 9.24183 4.19947 9.42232 3.74323 9.90579C3.72249 9.92728 3.70797 9.95091 3.68931 9.9724V9.96381C3.58147 10.082 3.55866 9.98744 3.56073 9.92513V1.01C3.56073 0.842402 3.43008 0.707031 3.26833 0.707031H0.292407C0.13065 0.707031 0 0.842402 0 1.01V17.3662C0 17.5338 0.13065 17.6692 0.292407 17.6692H3.27247C3.43423 17.6692 3.56488 17.5338 3.56488 17.3662V13.015C3.56488 12.9506 3.58562 12.8582 3.69553 12.9763V12.9699C3.71212 12.9914 3.72664 13.0129 3.7453 13.0344C4.20154 13.52 4.81746 13.6983 5.42301 13.6983C7.00533 13.6983 7.34544 15.3486 7.34544 15.6923C7.34544 16.1651 7.53623 16.915 7.99039 17.3727C8.40515 17.7917 8.94435 18.0001 9.48146 18.0001C10.0372 18.0001 10.593 17.7766 11.0119 17.3297C11.4143 16.8999 11.6175 16.3456 11.6175 15.7912V15.7783C11.6175 15.2046 11.3997 14.6309 10.9705 14.1968',
    fill: fill
  }));
};

var _excluded$3 = ["width", "height", "fill"];
var Check = function Check(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 60 : _ref$width,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#86B8CE' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: width,
    viewBox: '0 0 41 41',
    fill: fill
  }, rest), React__default.createElement("path", {
    d: 'M6.90529 21.9045C6.64003 21.6385 6.51271 21.3283 6.52332 20.9737C6.53393 20.6191 6.67231 20.3088 6.93845 20.0429C7.20371 19.7991 7.51318 19.6715 7.86686 19.66C8.22055 19.6484 8.53002 19.7761 8.79528 20.0429L13.5037 24.7633L13.9679 25.2287L14.4321 25.694C14.6973 25.96 14.8247 26.2702 14.8141 26.6248C14.8034 26.9794 14.6651 27.2897 14.3989 27.5556C14.1337 27.7994 13.8242 27.927 13.4705 27.9385C13.1168 27.9501 12.8074 27.8224 12.5421 27.5556L6.90529 21.9045ZM20.9641 24.73L32.2377 13.4277C32.503 13.1618 32.8125 13.0346 33.1661 13.0461C33.5198 13.0577 33.8293 13.1959 34.0946 13.461C34.3377 13.7269 34.465 14.0372 34.4765 14.3918C34.488 14.7463 34.3607 15.0566 34.0946 15.3225L21.8925 27.5556C21.6273 27.8215 21.3178 27.9545 20.9641 27.9545C20.6105 27.9545 20.301 27.8215 20.0357 27.5556L14.3989 21.9045C14.1558 21.6607 14.0342 21.3562 14.0342 20.991C14.0342 20.6257 14.1558 20.3097 14.3989 20.0429C14.6642 19.777 14.9794 19.644 15.3446 19.644C15.7098 19.644 16.0245 19.777 16.2889 20.0429L20.9641 24.73ZM26.5678 15.3558L21.8925 20.0429C21.6494 20.2867 21.3457 20.4086 20.9814 20.4086C20.6171 20.4086 20.3019 20.2867 20.0357 20.0429C19.7705 19.777 19.6378 19.4614 19.6378 19.0962C19.6378 18.731 19.7705 18.4149 20.0357 18.1481L24.7109 13.461C24.9541 13.2172 25.2583 13.0953 25.6234 13.0953C25.9886 13.0953 26.3034 13.2172 26.5678 13.461C26.833 13.7269 26.9657 14.0425 26.9657 14.4077C26.9657 14.7729 26.833 15.089 26.5678 15.3558Z',
    fill: fill
  }));
};

var _excluded$4 = ["width", "height"];
var Warning = function Warning(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 14 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 13 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  return React__default.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 14 13',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React__default.createElement("path", {
    d: 'M13.8418 11.0561L8.16007 0.683372C8.04697 0.476647 7.87973 0.304041 7.67598 0.183764C7.47223 0.0634876 7.23954 0 7.00245 0C6.76537 0 6.53267 0.0634876 6.32893 0.183764C6.12518 0.304041 5.95794 0.476647 5.84484 0.683372L0.167185 11.0561C0.05491 11.2556 -0.00270098 11.4807 9.72867e-05 11.7091C0.00289555 11.9376 0.0660053 12.1613 0.183133 12.358C0.300261 12.5546 0.467315 12.7174 0.667636 12.8301C0.867956 12.9427 1.09454 13.0013 1.3248 13H12.6842C12.9121 12.9997 13.1361 12.9408 13.3342 12.829C13.5323 12.7172 13.6977 12.5563 13.8144 12.3621C13.931 12.1678 13.9949 11.9469 13.9997 11.7208C14.0045 11.4947 13.9501 11.2713 13.8418 11.0723V11.0561ZM6.47887 3.26032C6.47887 3.10964 6.5392 2.96513 6.6466 2.85858C6.754 2.75203 6.89966 2.69218 7.05154 2.69218C7.20342 2.69218 7.34908 2.75203 7.45648 2.85858C7.56388 2.96513 7.62421 3.10964 7.62421 3.26032V8.13015C7.62421 8.28083 7.56388 8.42534 7.45648 8.53189C7.34908 8.63844 7.20342 8.6983 7.05154 8.6983C6.89966 8.6983 6.754 8.63844 6.6466 8.53189C6.5392 8.42534 6.47887 8.28083 6.47887 8.13015V3.26032ZM7.05154 11.3158C6.90592 11.3158 6.76356 11.273 6.64248 11.1927C6.52139 11.1125 6.42702 10.9984 6.37129 10.8649C6.31556 10.7314 6.30098 10.5845 6.32939 10.4428C6.3578 10.3011 6.42793 10.171 6.5309 10.0688C6.63387 9.96667 6.76507 9.8971 6.9079 9.86892C7.05072 9.84073 7.19877 9.8552 7.33331 9.91048C7.46785 9.96577 7.58284 10.0594 7.66375 10.1795C7.74465 10.2997 7.78783 10.4409 7.78783 10.5854C7.78783 10.6813 7.76879 10.7763 7.73179 10.8649C7.69479 10.9535 7.64055 11.034 7.57218 11.1019C7.50381 11.1697 7.42264 11.2235 7.33331 11.2602C7.24398 11.2969 7.14823 11.3158 7.05154 11.3158Z',
    fill: '#86B8CE'
  }));
};

var _excluded$5 = ["width", "height", "fill"];
var Arrow = function Arrow(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 22 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 25 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'none' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$5);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 22 25',
    fill: fill
  }, rest), React__default.createElement("path", {
    d: 'M10.9974 0L10.9974 16.625',
    stroke: '#778DA3',
    "stroke-width": '2'
  }), React__default.createElement("path", {
    d: 'M21.1249 14.2734L16.8822 18.5161C13.758 21.6403 8.69272 21.6403 5.56853 18.5161L1.32589 14.2734',
    stroke: '#778DA3',
    "stroke-width": '2'
  }));
};

var _excluded$6 = ["width", "height", "fill"];
var Lock = function Lock(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 24 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 27 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$6);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 24 27',
    fill: 'none'
  }, rest), React__default.createElement("rect", {
    x: '1.25',
    y: '9.37793',
    width: '21.3105',
    height: '15.9829',
    rx: '4.9697',
    stroke: '#86B8CE',
    "stroke-width": '1.86364'
  }), React__default.createElement("path", {
    d: 'M11.9004 18.7014L11.9004 16.0376',
    stroke: '#86B8CE',
    "stroke-width": '1.86364',
    "stroke-linecap": 'round',
    "stroke-linejoin": 'round'
  }), React__default.createElement("path", {
    d: 'M17.2341 9.37815V6.35642C17.2341 3.61173 15.0091 1.38672 12.2644 1.38672H11.5486C8.80387 1.38672 6.57886 3.61173 6.57886 6.35642L6.57886 9.37815',
    stroke: '#86B8CE',
    "stroke-width": '1.86364'
  }));
};

var _excluded$7 = ["width", "height"];
var Ethereum = function Ethereum(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 30 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 30 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$7);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 22 36',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M10.9966 13.3093V0L0 18.3307L10.9966 13.3093Z',
    fill: '#8A92B2'
  }), React__default.createElement("path", {
    d: 'M10.9966 24.8639V13.3093L0 18.3307L10.9966 24.8639ZM10.9966 13.3093L21.9933 18.3307L10.9966 0V13.3093Z',
    fill: '#62688F'
  }), React__default.createElement("path", {
    d: 'M10.9966 13.3093V24.8639L21.9933 18.3307L10.9966 13.3093Z',
    fill: '#454A75'
  }), React__default.createElement("path", {
    d: 'M10.9966 26.9561L0 20.4297L10.9966 36V26.9561Z',
    fill: '#8A92B2'
  }), React__default.createElement("path", {
    d: 'M22 20.4297L10.9966 26.9561V36L22 20.4297Z',
    fill: '#62688F'
  }));
};

var _excluded$8 = ["width", "height"];
var Solana = function Solana(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 30 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 30 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$8);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 26 21',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M22.2506 4.97063C22.1771 5.05109 22.0851 5.11367 21.984 5.14943C21.8828 5.19413 21.7725 5.21201 21.6622 5.21201H0.835479C0.0998792 5.21201 -0.277116 4.31801 0.237804 3.78161L3.65835 0.25032C3.73191 0.16986 3.82386 0.107281 3.9342 0.0625809C4.03534 0.017881 4.14568 0 4.25602 0H25.1655C25.9102 0 26.2781 0.902938 25.7539 1.43934L22.2506 4.97063ZM22.2506 20.7586C22.0943 20.9106 21.8828 21 21.6622 21H0.835479C0.0998792 21 -0.277116 20.1239 0.237804 19.6054L3.65835 16.1545C3.73191 16.0741 3.83305 16.0115 3.9342 15.9757C4.03534 15.931 4.14568 15.9132 4.25602 15.9132H25.1655C25.9102 15.9132 26.2781 16.7982 25.7539 17.3167L22.2506 20.7586ZM22.2506 8.19796C22.0943 8.04598 21.8828 7.95658 21.6622 7.95658H0.835479C0.0998792 7.95658 -0.277116 8.8327 0.237804 9.35121L3.65835 12.802C3.73191 12.8825 3.83305 12.9451 3.9342 12.9808C4.03534 13.0255 4.14568 13.0434 4.25602 13.0434H25.1655C25.9102 13.0434 26.2781 12.1584 25.7539 11.6398L22.2506 8.19796Z',
    fill: 'url(#paint0_linear_721_5435)'
  }), React__default.createElement("defs", null, React__default.createElement("linearGradient", {
    id: 'paint0_linear_721_5435',
    x1: '1.58985',
    y1: '21.2621',
    x2: '23.7184',
    y2: '-0.89642',
    gradientUnits: 'userSpaceOnUse'
  }, React__default.createElement("stop", {
    "stop-color": '#CF41E8'
  }), React__default.createElement("stop", {
    offset: '1',
    "stop-color": '#10F2B0'
  }))));
};

var _excluded$9 = ["width", "height"];
var Polygon = function Polygon(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 30 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 30 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$9);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 30 25',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M22.7154 7.64095C22.1671 7.34421 21.4621 7.34421 20.8355 7.64095L16.4491 10.089L13.4726 11.6469L9.16449 14.095C8.61619 14.3917 7.91123 14.3917 7.2846 14.095L3.91645 12.1662C3.36815 11.8694 2.9765 11.276 2.9765 10.6083V6.89911C2.9765 6.30564 3.28982 5.71217 3.91645 5.34125L7.2846 3.48665C7.8329 3.18991 8.53786 3.18991 9.16449 3.48665L12.5326 5.41543C13.0809 5.71217 13.4726 6.30564 13.4726 6.97329V9.42136L16.4491 7.78932V5.26706C16.4491 4.67359 16.1358 4.08012 15.5091 3.7092L9.24282 0.222552C8.69452 -0.074184 7.98956 -0.074184 7.36292 0.222552L0.939948 3.78338C0.313316 4.08012 0 4.67359 0 5.26706V12.2404C0 12.8338 0.313316 13.4273 0.939948 13.7982L7.2846 17.2849C7.8329 17.5816 8.53786 17.5816 9.16449 17.2849L13.4726 14.911L16.4491 13.2789L20.7572 10.905C21.3055 10.6083 22.0104 10.6083 22.6371 10.905L26.0052 12.7596C26.5535 13.0564 26.9452 13.6499 26.9452 14.3175V18.0267C26.9452 18.6202 26.6319 19.2136 26.0052 19.5846L22.7154 21.4392C22.1671 21.7359 21.4621 21.7359 20.8355 21.4392L17.4674 19.5846C16.9191 19.2878 16.5274 18.6944 16.5274 18.0267V15.6528L13.5509 17.2849V19.7329C13.5509 20.3264 13.8642 20.9199 14.4909 21.2908L20.8355 24.7774C21.3838 25.0742 22.0888 25.0742 22.7154 24.7774L29.0601 21.2908C29.6084 20.9941 30 20.4006 30 19.7329V12.6855C30 12.092 29.6867 11.4985 29.0601 11.1276L22.7154 7.64095Z',
    fill: '#8247E5'
  }));
};

var _excluded$a = ["width", "height"];
var PolygonzkEVM = function PolygonzkEVM(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 29 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 32 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$a);
  return React__default.createElement("svg", Object.assign({
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height
  }, rest), React__default.createElement("path", {
    d: 'M0 0 C2.640625 1.33984375 2.640625 1.33984375 5.25 2.9375 C6.12140625 3.46214844 6.9928125 3.98679687 7.890625 4.52734375 C10 6 10 6 11 8 C11.17484831 10.2873598 11.26720049 12.58141443 11.3125 14.875 C11.34988281 16.10992188 11.38726563 17.34484375 11.42578125 18.6171875 C11 22 11 22 9.2578125 24.26953125 C7.07701959 25.94096941 4.94591023 27.4452404 2.5625 28.8125 C1.82128906 29.25207031 1.08007812 29.69164063 0.31640625 30.14453125 C-2.63165451 31.23327544 -4.0243054 30.95990148 -7 30 C-9.640625 28.66015625 -9.640625 28.66015625 -12.25 27.0625 C-13.12140625 26.53785156 -13.9928125 26.01320313 -14.890625 25.47265625 C-17 24 -17 24 -18 22 C-18.17484831 19.7126402 -18.26720049 17.41858557 -18.3125 15.125 C-18.34988281 13.89007813 -18.38726563 12.65515625 -18.42578125 11.3828125 C-18 8 -18 8 -16.2578125 5.73046875 C-14.07701959 4.05903059 -11.94591023 2.5547596 -9.5625 1.1875 C-8.82128906 0.74792969 -8.08007812 0.30835937 -7.31640625 -0.14453125 C-4.36834549 -1.23327544 -2.9756946 -0.95990148 0 0 Z M-4 2 C-5.65 3.32 -7.3 4.64 -9 6 C-6.525 6.495 -6.525 6.495 -4 7 C-4 8.98 -4 10.96 -4 13 C-3.67 13 -3.34 13 -3 13 C-2.5978125 11.576875 -2.5978125 11.576875 -2.1875 10.125 C-1 7 -1 7 2 5 C0.02 4.01 -1.96 3.02 -4 2 Z M-15 9 C-15.25030977 11.58380177 -15.25030977 11.58380177 -15 14 C-13.68 13.67 -12.36 13.34 -11 13 C-11 11.02 -11 9.04 -11 7 C-12.46225016 6.90754997 -12.46225016 6.90754997 -15 9 Z M5 8 C5 9.65 5 11.3 5 13 C5.66 13 6.32 13 7 13 C7.33 11.68 7.66 10.36 8 9 C7.01 8.67 6.02 8.34 5 8 Z M-8 10 C-7 13 -7 13 -7 13 Z M1 10 C2 13 2 13 2 13 Z M6 16 C4.70366379 17.06645115 4.70366379 17.06645115 4.9375 19.5625 C4.958125 20.366875 4.97875 21.17125 5 22 C5.99 21.67 6.98 21.34 8 21 C8 19.35 8 17.7 8 16 C7.34 16 6.68 16 6 16 Z M-14 17 C-14.33 17.99 -14.66 18.98 -15 20 C-14.02149805 21.02104551 -13.02019573 22.0206121 -12 23 C-11.67 23 -11.34 23 -11 23 C-11 21.02 -11 19.04 -11 17 C-11.99 17 -12.98 17 -14 17 Z M-8 17 C-7 20 -7 20 -7 20 Z M-4 17 C-4 18.98 -4 20.96 -4 23 C-5.65 23.33 -7.3 23.66 -9 24 C-7.30504044 25.66846734 -7.30504044 25.66846734 -5 27 C-1.62963689 26.75925978 -0.41201979 26.41201979 2 24 C1.360625 23.773125 0.72125 23.54625 0.0625 23.3125 C-2 22 -2 22 -2.75 19.375 C-2.8325 18.59125 -2.915 17.8075 -3 17 C-3.33 17 -3.66 17 -4 17 Z M1 17 C2 20 2 20 2 20 Z ',
    fill: '#8751E7',
    transform: 'translate(18,1)'
  }), React__default.createElement("path", {
    d: 'M0 0 C2.475 0.495 2.475 0.495 5 1 C5 1.99 5 2.98 5 4 C4.01 4.495 4.01 4.495 3 5 C2.34 4.67 1.68 4.34 1 4 C1 5.98 1 7.96 1 10 C-4.94 10 -10.88 10 -17 10 C-16.34 9.67 -15.68 9.34 -15 9 C-15 7.02 -15 5.04 -15 3 C-12.6875 2.375 -12.6875 2.375 -10 2 C-9.01 2.66 -8.02 3.32 -7 4 C-6.67 3.67 -6.34 3.34 -6 3 C-4.00041636 2.95919217 -1.99954746 2.95745644 0 3 C0 2.01 0 1.02 0 0 Z M-12 6 C-11 9 -11 9 -11 9 Z M-3 6 C-2 9 -2 9 -2 9 Z ',
    fill: '#905FE8',
    transform: 'translate(22,5)'
  }), React__default.createElement("path", {
    d: 'M0 0 C0.66 0.33 1.32 0.66 2 1 C2 4.96 2 8.92 2 13 C1.01 13.495 1.01 13.495 0 14 C0 12.35 0 10.7 0 9 C-10.89 9.495 -10.89 9.495 -22 10 C-22.33 11.32 -22.66 12.64 -23 14 C-23.66 14 -24.32 14 -25 14 C-25 10.04 -25 6.08 -25 2 C-24.01 2.495 -24.01 2.495 -23 3 C-23 4.32 -23 5.64 -23 7 C-15.74 6.67 -8.48 6.34 -1 6 C-0.67 4.02 -0.34 2.04 0 0 Z ',
    fill: '#7C41E4',
    transform: 'translate(26,8)'
  }), React__default.createElement("path", {
    d: 'M0 0 C5.94 0 11.88 0 18 0 C18 0.33 18 0.66 18 1 C13.545 1.495 13.545 1.495 9 2 C8.67 3.65 8.34 5.3 8 7 C3.25 8.125 3.25 8.125 1 7 C0.67 4.69 0.34 2.38 0 0 Z M4 1 C5 4 5 4 5 4 Z ',
    fill: '#9869E9',
    transform: 'translate(6,17)'
  }), React__default.createElement("path", {
    d: 'M0 0 C1.134375 0.020625 2.26875 0.04125 3.4375 0.0625 C3.480221 1.72861905 3.47813832 3.39632885 3.4375 5.0625 C2.4375 6.0625 2.4375 6.0625 -0.625 6.125 C-1.594375 6.104375 -2.56375 6.08375 -3.5625 6.0625 C-3.94468767 4.40635343 -4.27645102 2.73792976 -4.5625 1.0625 C-3.5625 0.0625 -3.5625 0.0625 0 0 Z ',
    fill: '#844DE6',
    transform: 'translate(19.5625,17.9375)'
  }), React__default.createElement("path", {
    d: 'M0 0 C0 1.65 0 3.3 0 5 C-2.49064888 5.68707555 -4.37886292 6 -7 6 C-7 4.02 -7 2.04 -7 0 C-4.3333581 -1.33332095 -2.83319697 -0.67102033 0 0 Z ',
    fill: '#844DE5',
    transform: 'translate(14,8)'
  }), React__default.createElement("path", {
    d: 'M0 0 C0.33 0 0.66 0 1 0 C1 4.29 1 8.58 1 13 C1.99 12.67 2.98 12.34 4 12 C4 12.66 4 13.32 4 14 C4.66 14.33 5.32 14.66 6 15 C4.02 15.99 4.02 15.99 2 17 C-0.49118953 13.2632157 -0.2065226 11.25548181 -0.125 6.8125 C-0.10695312 5.54019531 -0.08890625 4.26789062 -0.0703125 2.95703125 C-0.04710937 1.98121094 -0.02390625 1.00539063 0 0 Z ',
    fill: '#935FE8',
    transform: 'translate(0,9)'
  }), React__default.createElement("path", {
    d: 'M0 0 C1.65 0.33 3.3 0.66 5 1 C4.25 3.4375 4.25 3.4375 3 6 C0.875 6.8125 0.875 6.8125 -1 7 C-1 6.34 -1 5.68 -1 5 C-1.66 4.67 -2.32 4.34 -3 4 C-1.68 3.34 -0.36 2.68 1 2 C0.67 1.34 0.34 0.68 0 0 Z ',
    fill: '#9768E9',
    transform: 'translate(17,24)'
  }), React__default.createElement("path", {
    d: 'M0 0 C0.99 0 1.98 0 3 0 C2.67 1.32 2.34 2.64 2 4 C0.68 4.33 -0.64 4.66 -2 5 C-1.34 3.35 -0.68 1.7 0 0 Z ',
    fill: '#8048E5',
    transform: 'translate(9,2)'
  }));
};

var _excluded$b = ["width", "height"];
var Loader = function Loader(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 50 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 49 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$b);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 50 49',
    fill: 'none',
    className: 'loader'
  }, rest), React__default.createElement("path", {
    d: 'M25 17.0731V13.4146M30.3125 19.2072L33 16.5853M32.5 24.3902H36.25M30.3125 29.5731L33 32.195M25 31.7072V35.3658M19.6875 29.5731L17 32.195M17.5 24.3902H13.75M19.6875 19.2072L17 16.5853',
    stroke: '#86B8CE',
    "stroke-width": '2.43902',
    "stroke-linecap": 'round',
    "stroke-linejoin": 'round'
  }));
};

var _excluded$c = ["width", "height"];
var Error$1 = function Error(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 21 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 20 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$c);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 21 20',
    fill: 'none'
  }, rest), React__default.createElement("circle", {
    cx: '10.9331',
    cy: '10',
    r: '10',
    fill: '#B90000'
  }), React__default.createElement("rect", {
    x: '8.93311',
    y: '3',
    width: '4',
    height: '9',
    rx: '2',
    fill: 'white'
  }), React__default.createElement("rect", {
    x: '8.93311',
    y: '13',
    width: '4',
    height: '4',
    rx: '2',
    fill: 'white'
  }));
};

var _excluded$d = ["width", "height"];
var Avalanche = function Avalanche(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 29 : _ref$width,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$d);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: width,
    viewBox: '0 0 30 29',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    "fill-rule": 'evenodd',
    "clip-rule": 'evenodd',
    d: 'M29.8779 14.5C29.8779 22.5082 23.3854 29 15.3762 29C7.36707 29 0.874512 22.5082 0.874512 14.5C0.874512 6.49179 7.36707 0 15.3762 0C23.3854 0 29.8779 6.49179 29.8779 14.5ZM11.2669 20.2703H8.45247C7.86101 20.2703 7.56905 20.2703 7.39082 20.1563C7.19849 20.0316 7.08089 19.825 7.0666 19.597C7.05598 19.3869 7.20197 19.1303 7.49412 18.6175L14.4432 6.37035C14.7388 5.8502 14.8884 5.59032 15.0773 5.49397C15.2804 5.39068 15.5226 5.39068 15.7257 5.49397C15.9146 5.59013 16.0642 5.8502 16.3599 6.37035L17.7884 8.86373L17.7957 8.87647C18.1151 9.43446 18.2771 9.71732 18.3478 10.0143C18.4262 10.3384 18.4262 10.6804 18.3478 11.0046C18.2766 11.3038 18.1163 11.5888 17.7921 12.1551L14.1419 18.6067L14.1325 18.6233C13.811 19.186 13.6482 19.4709 13.4223 19.686C13.1764 19.9212 12.8808 20.0921 12.5566 20.1884C12.261 20.2703 11.9296 20.2703 11.2669 20.2703ZM18.3741 20.2703H22.4067C23.0017 20.2703 23.301 20.2703 23.4792 20.1529C23.6715 20.0281 23.7926 19.8179 23.8034 19.5901C23.8137 19.3868 23.6708 19.1402 23.3908 18.6571C23.3811 18.6407 23.3715 18.6239 23.3616 18.6069L21.3416 15.1516L21.3186 15.1126C21.0348 14.6326 20.8915 14.3903 20.7075 14.2967C20.5045 14.1934 20.2657 14.1934 20.0627 14.2967C19.8775 14.3928 19.7279 14.6458 19.4323 15.1551L17.4194 18.6104L17.4124 18.6224C17.1178 19.1309 16.9706 19.385 16.9813 19.5935C16.9955 19.8216 17.1131 20.0316 17.3055 20.1563C17.48 20.2703 17.7793 20.2703 18.3743 20.2703H18.3741Z',
    fill: '#E84142'
  }));
};

var _excluded$e = ["width", "height"];
var Arbitrum = function Arbitrum(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 30 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 30 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$e);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 33 33',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M2.84064 10.032V22.968C2.84064 23.7996 3.27629 24.552 4.00237 24.9744L15.2105 31.4424C15.9234 31.8516 16.8079 31.8516 17.5208 31.4424L28.7289 24.9744C29.4418 24.5652 29.8906 23.7996 29.8906 22.968V10.032C29.8906 9.2004 29.455 8.448 28.7289 8.0256L17.5208 1.5576C16.8079 1.1484 15.9234 1.1484 15.2105 1.5576L4.00237 8.0256C3.28949 8.4348 2.85384 9.2004 2.85384 10.032H2.84064Z',
    fill: '#213147'
  }), React__default.createElement("path", {
    d: 'M18.8013 19.008L17.204 23.3904C17.1644 23.5092 17.1644 23.6412 17.204 23.7732L19.9499 31.3104L23.1315 29.4756L19.3162 19.008C19.2238 18.7704 18.8938 18.7704 18.8013 19.008Z',
    fill: '#12AAFF'
  }), React__default.createElement("path", {
    d: 'M22.0094 11.6424C21.917 11.4048 21.5869 11.4048 21.4945 11.6424L19.8971 16.0248C19.8575 16.1436 19.8575 16.2756 19.8971 16.4076L24.3989 28.7496L27.5804 26.9148L22.0094 11.6556V11.6424Z',
    fill: '#12AAFF'
  }), React__default.createElement("path", {
    d: 'M16.3592 2.046C16.4384 2.046 16.5176 2.0724 16.5836 2.112L28.7026 9.108C28.8479 9.1872 28.9271 9.3456 28.9271 9.504V23.496C28.9271 23.6544 28.8347 23.8128 28.7026 23.892L16.5836 30.888C16.5176 30.9276 16.4384 30.954 16.3592 30.954C16.28 30.954 16.2008 30.9276 16.1348 30.888L4.01574 23.892C3.87052 23.8128 3.79131 23.6544 3.79131 23.496V9.4908C3.79131 9.3324 3.88373 9.174 4.01574 9.0948L16.1348 2.0988C16.2008 2.0592 16.28 2.0328 16.3592 2.0328V2.046ZM16.3592 0C15.9235 0 15.5011 0.1056 15.105 0.33L2.98602 7.326C2.20713 7.7748 1.73187 8.5932 1.73187 9.4908V23.4828C1.73187 24.3804 2.20713 25.1988 2.98602 25.6476L15.105 32.6436C15.4879 32.868 15.9235 32.9736 16.3592 32.9736C16.7948 32.9736 17.2173 32.868 17.6133 32.6436L29.7324 25.6476C30.5113 25.1988 30.9865 24.3804 30.9865 23.4828V9.4908C30.9865 8.5932 30.5113 7.7748 29.7324 7.326L17.6001 0.33C17.2173 0.1056 16.7816 0 16.346 0H16.3592Z',
    fill: '#9DCCED'
  }), React__default.createElement("path", {
    d: 'M8.3327 28.7628L9.45483 25.7004L11.6991 27.5616L9.60005 29.4888L8.3327 28.7628Z',
    fill: '#213147'
  }), React__default.createElement("path", {
    d: 'M15.3295 8.5008H12.2535C12.0291 8.5008 11.8178 8.646 11.7386 8.8572L5.15106 26.9148L8.33264 28.7496L15.5935 8.8572C15.6595 8.6724 15.5275 8.4876 15.3427 8.4876L15.3295 8.5008Z',
    fill: 'white'
  }), React__default.createElement("path", {
    d: 'M20.7157 8.5008H17.6397C17.4153 8.5008 17.2041 8.646 17.1249 8.8572L9.59998 29.4756L12.7815 31.3104L20.9665 8.8572C21.0325 8.6724 20.9005 8.4876 20.7157 8.4876V8.5008Z',
    fill: 'white'
  }));
};

var _excluded$f = ["width", "height"];
var Optimism = function Optimism(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 31 : _ref$width,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$f);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: width,
    viewBox: '0 0 31 30',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M15.8719 30C24.1572 30 30.8737 23.2843 30.8737 15C30.8737 6.71573 24.1572 0 15.8719 0C7.5867 0 0.870178 6.71573 0.870178 15C0.870178 23.2843 7.5867 30 15.8719 30Z',
    fill: '#FF0420'
  }), React__default.createElement("path", {
    d: 'M11.4976 18.984C10.6035 18.984 9.87137 18.774 9.3013 18.354C8.73723 17.928 8.4552 17.316 8.4552 16.53C8.4552 16.362 8.4732 16.164 8.50921 15.924C8.60522 15.384 8.74323 14.736 8.92325 13.974C9.43331 11.91 10.7535 10.878 12.8777 10.878C13.4538 10.878 13.9758 10.974 14.4319 11.172C14.888 11.358 15.248 11.646 15.512 12.03C15.7761 12.408 15.9081 12.858 15.9081 13.38C15.9081 13.536 15.8901 13.734 15.8541 13.974C15.7401 14.64 15.608 15.294 15.446 15.924C15.182 16.95 14.7319 17.724 14.0839 18.234C13.4418 18.738 12.5777 18.984 11.4976 18.984ZM11.6596 17.364C12.0796 17.364 12.4337 17.238 12.7277 16.992C13.0277 16.746 13.2438 16.368 13.3698 15.852C13.5438 15.144 13.6758 14.532 13.7658 14.004C13.7958 13.848 13.8138 13.686 13.8138 13.518C13.8138 12.834 13.4598 12.492 12.7457 12.492C12.3257 12.492 11.9656 12.618 11.6656 12.864C11.3715 13.11 11.1615 13.488 11.0355 14.004C10.8975 14.508 10.7655 15.12 10.6275 15.852C10.5975 16.002 10.5795 16.158 10.5795 16.326C10.5734 17.022 10.9395 17.364 11.6596 17.364Z',
    fill: 'white'
  }), React__default.createElement("path", {
    d: 'M16.43 18.876C16.346 18.876 16.286 18.852 16.238 18.798C16.202 18.738 16.19 18.672 16.202 18.594L17.7562 11.274C17.7682 11.19 17.8102 11.124 17.8822 11.07C17.9482 11.016 18.0202 10.992 18.0982 10.992H21.0926C21.9267 10.992 22.5928 11.166 23.0968 11.508C23.6069 11.856 23.8649 12.354 23.8649 13.008C23.8649 13.194 23.8409 13.392 23.7989 13.596C23.6129 14.46 23.2348 15.096 22.6588 15.51C22.0947 15.924 21.3206 16.128 20.3365 16.128H18.8183L18.3023 18.594C18.2843 18.678 18.2483 18.744 18.1762 18.798C18.1102 18.852 18.0382 18.876 17.9602 18.876H16.43ZM20.4145 14.574C20.7325 14.574 21.0026 14.49 21.2366 14.316C21.4766 14.142 21.6326 13.896 21.7107 13.572C21.7347 13.446 21.7467 13.332 21.7467 13.236C21.7467 13.02 21.6807 12.852 21.5546 12.738C21.4286 12.618 21.2066 12.558 20.9006 12.558H19.5504L19.1244 14.574H20.4145Z',
    fill: 'white'
  }));
};

var _excluded$g = ["width", "height"];
var USDC = function USDC(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 37 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 37 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$g);
  return React__default.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 37 37',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React__default.createElement("rect", {
    width: '37',
    height: '37',
    fill: 'url(#pattern4)'
  }), React__default.createElement("defs", null, React__default.createElement("pattern", {
    id: 'pattern4',
    patternContentUnits: 'objectBoundingBox',
    width: '1',
    height: '1'
  }, React__default.createElement("use", {
    href: '#image0_214_308',
    transform: 'scale(0.00552486)'
  })), React__default.createElement("image", {
    id: 'image0_214_308',
    width: '181',
    height: '181',
    href: 'data:image/png;base64,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'
  })));
};

var _excluded$h = ["width", "height"];
var USDT = function USDT(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 37 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 37 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$h);
  return React__default.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 37 37',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React__default.createElement("rect", {
    width: '37',
    height: '37',
    fill: 'url(#pattern5)'
  }), React__default.createElement("defs", null, React__default.createElement("pattern", {
    id: 'pattern5',
    patternContentUnits: 'objectBoundingBox',
    width: '1',
    height: '1'
  }, React__default.createElement("use", {
    href: '#image0_214_312',
    transform: 'scale(0.00390625)'
  })), React__default.createElement("image", {
    id: 'image0_214_312',
    width: '256',
    height: '256',
    href: 'data:image/png;base64,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'
  })));
};

var _excluded$i = ["width", "height"];
var USDT$1 = function USDT(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 23 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 23 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$i);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 23 33',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M21.7206 25.7417C20.9608 25.001 19.9922 24.6072 19.0104 24.5498H19.0131C15.2454 24.4272 14.705 21.3028 14.705 20.5151C14.705 19.6545 15.3029 16.6395 19.0052 16.5222C19.9869 16.4674 20.9556 16.071 21.7154 15.3303C23.389 13.7002 23.4256 11.0243 21.7937 9.35256C20.9687 8.50494 19.8721 8.07982 18.7755 8.07461H18.7467C17.6867 8.07722 16.6266 8.47625 15.8068 9.27432C14.9086 10.148 14.5326 11.3217 14.5326 12.4823C14.5326 13.4994 13.859 16.2874 10.7285 16.2874C9.55091 16.2874 8.31332 16.6317 7.41253 17.555C7.37337 17.5941 7.34204 17.641 7.30548 17.6828V17.6671C7.09138 17.8914 7.04961 17.7141 7.05222 17.5915V0.578993C7.05222 0.2582 6.79373 0 6.47259 0H0.579635C0.258486 0 0 0.2582 0 0.578993V31.7872C0 32.108 0.258486 32.3662 0.579635 32.3662H6.47781C6.79896 32.3662 7.05744 32.108 7.05744 31.7872V23.4883C7.05744 23.3658 7.09922 23.1884 7.31593 23.4127V23.3997C7.34987 23.4388 7.37859 23.4831 7.41514 23.5222C8.31854 24.4481 9.53525 24.7898 10.7363 24.7898C13.8695 24.7898 14.5405 27.9403 14.5405 28.595C14.5405 29.4947 14.9191 30.9292 15.8146 31.8003C16.6371 32.601 17.7024 33 18.765 33H18.7676C19.8695 33 20.9687 32.5723 21.799 31.722C22.5979 30.9031 22.9974 29.8442 23 28.7853V28.7593C22.9974 27.6639 22.5692 26.5685 21.7206 25.7443',
    fill: '#86B8CE'
  }));
};

var _excluded$j = ["width", "height", "fill"];
var Copy = function Copy(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 20 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 20 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#86B8CE' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$j);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 17 19',
    fill: fill
  }, rest), React__default.createElement("path", {
    "fill-rule": 'evenodd',
    "clip-rule": 'evenodd',
    d: 'M0.373779 0.750078C0.373779 0.362788 0.68774 0.0488281 1.07503 0.0488281H12.2125C12.5998 0.0488281 12.9138 0.362788 12.9138 0.750078C12.9138 1.13737 12.5998 1.45133 12.2125 1.45133H1.77628V12.8157C1.77628 13.203 1.46232 13.517 1.07503 13.517C0.68774 13.517 0.373779 13.203 0.373779 12.8157V0.750078Z',
    fill: fill
  }), React__default.createElement("path", {
    "fill-rule": 'evenodd',
    "clip-rule": 'evenodd',
    d: 'M4.0863 4.46297C4.0863 4.07568 4.40026 3.76172 4.78755 3.76172H15.9251C16.3123 3.76172 16.6263 4.07568 16.6263 4.46297V15.6005C16.6263 16.2788 16.3569 16.9293 15.8772 17.4089C15.3976 17.8885 14.7471 18.158 14.0688 18.158H6.6438C5.96551 18.158 5.315 17.8885 4.83538 17.4089C4.35575 16.9293 4.0863 16.2788 4.0863 15.6005V4.46297ZM5.4888 5.16422V15.6005C5.4888 15.9068 5.61049 16.2006 5.8271 16.4172C6.0437 16.6338 6.33748 16.7555 6.6438 16.7555H14.0688C14.3751 16.7555 14.6689 16.6338 14.8855 16.4172C15.1021 16.2006 15.2238 15.9068 15.2238 15.6005V5.16422H5.4888Z',
    fill: fill
  }));
};

var _excluded$k = ["width", "height"];
var Bank = function Bank(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 32 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 32 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$k);
  return React__default.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 256 256',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React__default.createElement("defs", null), React__default.createElement("g", {
    style: {
      stroke: 'none',
      strokeWidth: 0,
      strokeDasharray: 'none',
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter',
      strokeMiterlimit: 10,
      fill: 'none',
      fillRule: 'nonzero',
      opacity: 1
    },
    transform: 'translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'
  }, React__default.createElement("path", {
    d: "M 84.668 38.004 v -6.27 H 90 V 20 L 45 3.034 L 0 20 v 11.734 h 5.332 v 6.27 h 4.818 v 30.892 H 5.332 v 6.271 H 0 v 11.8 h 90 v -11.8 h -5.332 v -6.271 H 79.85 V 38.004 H 84.668 z M 81.668 35.004 H 66.332 v -3.27 h 15.336 V 35.004 z M 63.332 68.896 v 6.271 h -7.664 v -6.271 H 50.85 V 38.004 h 4.818 v -6.27 h 7.664 v 6.27 h 4.818 v 30.892 H 63.332 z M 26.668 38.004 v -6.27 h 7.664 v 6.27 h 4.818 v 30.892 h -4.818 v 6.271 h -7.664 v -6.271 H 21.85 V 38.004 H 26.668 z M 42.15 68.896 V 38.004 h 5.7 v 30.892 H 42.15 z M 37.332 35.004 v -3.27 h 15.336 v 3.27 H 37.332 z M 37.332 71.896 h 15.336 v 3.271 H 37.332 V 71.896 z M 3 22.075 L 45 6.24 l 42 15.835 v 6.659 H 3 V 22.075 z M 8.332 31.734 h 15.336 v 3.27 H 8.332 V 31.734 z M 13.15 38.004 h 5.7 v 30.892 h -5.7 V 38.004 z M 8.332 71.896 h 15.336 v 3.271 H 8.332 V 71.896 z M 87 83.966 H 3 v -5.8 h 84 V 83.966 z M 81.668 75.166 H 66.332 v -3.271 h 15.336 V 75.166 z M 76.85 68.896 H 71.15 V 38.004 h 5.699 V 68.896 z",
    style: {
      stroke: 'none',
      strokeWidth: 1,
      strokeDasharray: 'none',
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter',
      strokeMiterlimit: 10,
      fill: 'rgb(0,0,0)',
      fillRule: 'nonzero',
      opacity: 1
    },
    transform: " matrix(1 0 0 1 0 0) ",
    strokeLinecap: "round"
  })));
};

var _excluded$l = ["width", "height"];
var BNB = function BNB(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 30 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 30 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$l);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 30 30',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M9.17376 12.6062L15 6.78L20.829 12.6088L24.219 9.21876L15 0L5.784 9.216L9.17388 12.606M0 15L3.39012 11.6094L6.78 14.9993L3.38988 18.3894L0 15ZM9.17376 17.3941L15 23.22L20.8289 17.3914L24.2207 20.7796L24.219 20.7814L15 30L5.784 20.784L5.7792 20.7792L9.17412 17.3938M23.22 15.0014L26.6101 11.6113L30 15.0012L26.61 18.3913L23.22 15.0014Z',
    fill: '#F3BA2F'
  }), React__default.createElement("path", {
    d: 'M18.4383 14.9981H18.4397L15.0001 11.5582L12.4576 14.0999L12.1655 14.3921L11.5631 14.9947L11.5583 14.9993L11.5631 15.0043L15.0001 18.4417L18.44 15.0017L18.4417 14.9998L18.4385 14.9981',
    fill: '#F3BA2F'
  }));
};

var _excluded$m = ["width", "height"];
var KEUR = function KEUR(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 32 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 32 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$m);
  return React__default.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 32 32',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React__default.createElement("g", {
    fill: 'none',
    fillRule: 'evenodd'
  }, React__default.createElement("circle", {
    cx: '16',
    cy: '16',
    fill: '#0f8ff8',
    r: '16'
  }), React__default.createElement("path", {
    d: 'M8 19.004L8.81 17h.857a16.279 16.279 0 01-.034-1.03c0-.448.019-.864.056-1.25H8l.81-2.003h1.274C11.27 8.906 13.944 7 18.103 7c1.367 0 2.666.177 3.897.532v2.524a8.92 8.92 0 00-3.683-.776c-2.493 0-4.096 1.146-4.81 3.438h7.423l-.81 2.003h-7.097a6.938 6.938 0 00-.056.995c0 .479.015.907.045 1.285h6.183l-.8 2.003H13.44c.533 1.389 1.183 2.355 1.949 2.9.765.544 1.858.816 3.277.816 1.014 0 2.125-.247 3.334-.741v2.373c-1.149.432-2.515.648-4.1.648-4.167 0-6.803-1.999-7.906-5.996z',
    fill: '#ffffff'
  })));
};

var _excluded$n = ["width", "height"];
var Celo = function Celo(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 30 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 28 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$n);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 29 30',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M28.6056 9.03778C27.1753 7.73936 25.1967 5.75657 23.5853 4.35034L23.4899 4.28472C23.3313 4.15946 23.1524 4.06122 22.9607 3.9941C19.0751 3.28161 0.99166 -0.0417889 0.638858 0.000398088C0.540001 0.0140104 0.445508 0.0492499 0.362337 0.103522L0.271753 0.173833C0.160212 0.285207 0.0754953 0.419757 0.023838 0.567578L0 0.628515V0.961323V1.01288C2.03576 6.58625 10.0739 24.8438 11.6568 29.1281C11.7521 29.4188 11.9333 29.9719 12.2718 30H12.3481C12.5292 30 13.3016 28.9969 13.3016 28.9969C13.3016 28.9969 27.1085 12.5346 28.5054 10.7815C28.6863 10.5656 28.8459 10.3333 28.9822 10.0878C29.017 9.89567 29.0006 9.69799 28.9346 9.51398C28.8686 9.32998 28.7552 9.16591 28.6056 9.03778ZM16.8439 10.9549L22.7367 6.15032L26.1932 9.28152L16.8439 10.9549ZM14.5555 10.6409L4.41002 2.46599L20.8249 5.44251L14.5555 10.6409ZM15.4708 12.783L25.8547 11.1378L13.9834 25.2001L15.4708 12.783ZM3.03219 3.2816L13.7068 12.1877L12.1621 25.2094L3.03219 3.2816Z',
    fill: '#FF060A'
  }));
};

var _excluded$o = ["width", "height"];
var BTC = function BTC(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 28 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 28 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$o);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 21 28',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M19.4041 8.61541C19.6137 10.6571 18.8511 12.1042 17.1161 12.9568C18.4783 13.2709 19.4972 13.8486 20.1725 14.69C20.8477 15.5313 21.1099 16.7318 20.9584 18.291C20.8769 19.0875 20.6877 19.7886 20.3908 20.3944C20.0939 21.0002 19.7184 21.4994 19.2642 21.892C18.8101 22.2846 18.2455 22.6128 17.5701 22.8764C16.8948 23.1401 16.1873 23.3335 15.448 23.4568C14.7086 23.5801 13.8615 23.6643 12.9068 23.7092V27.9999H10.2171V23.7765C9.28563 23.7765 8.57533 23.7709 8.08629 23.7596V28H5.39686V23.7091C5.1873 23.7091 4.87292 23.7063 4.4537 23.7007C4.03446 23.6951 3.71429 23.6922 3.49317 23.6922H0L0.541458 20.6129H2.48022C3.06236 20.6129 3.40008 20.3269 3.49317 19.7547V8.14428C3.34184 7.38139 2.82372 7.00008 1.93876 7.00008H0V4.2404L3.70272 4.25727C4.44792 4.25727 5.01271 4.2517 5.39689 4.2404V0H8.08663V4.15628C9.04139 4.13379 9.75169 4.12265 10.2174 4.12265V0H12.9071V4.2404C13.827 4.31895 14.642 4.44514 15.3523 4.61899C16.0626 4.79283 16.7205 5.04522 17.3259 5.37613C17.9314 5.70705 18.4117 6.14459 18.7669 6.68857C19.1218 7.23272 19.3343 7.87501 19.4041 8.61541ZM15.649 17.786C15.649 17.3821 15.5617 17.0231 15.387 16.709C15.2124 16.395 14.9969 16.1369 14.7409 15.935C14.4847 15.7331 14.15 15.5619 13.7367 15.4218C13.3234 15.2815 12.942 15.1778 12.5927 15.1104C12.2434 15.0432 11.8126 14.9927 11.3003 14.959C10.7879 14.9254 10.3862 14.9085 10.0952 14.9085C9.80407 14.9085 9.42849 14.9141 8.9686 14.9254C8.50867 14.9366 8.23214 14.9423 8.13905 14.9423V20.6298C8.23218 20.6298 8.44765 20.6326 8.7852 20.6382C9.12292 20.6438 9.40223 20.6467 9.62353 20.6467C9.84482 20.6467 10.1532 20.6382 10.5492 20.6215C10.9451 20.6048 11.2856 20.5823 11.5709 20.5543C11.8562 20.5262 12.1879 20.4786 12.5665 20.4112C12.9449 20.344 13.2681 20.2654 13.5358 20.1756C13.8036 20.0858 14.0801 19.9681 14.3654 19.8222C14.6506 19.6764 14.8805 19.5081 15.0552 19.3174C15.2298 19.1267 15.3725 18.9023 15.483 18.6444C15.5934 18.3863 15.649 18.1002 15.649 17.786ZM14.409 9.77635C14.409 9.40621 14.3362 9.07799 14.1907 8.79197C14.0451 8.50596 13.8675 8.27031 13.658 8.08516C13.4484 7.90001 13.1689 7.74307 12.8197 7.61399C12.4704 7.48494 12.1502 7.3925 11.8591 7.33627C11.568 7.2802 11.21 7.23524 10.785 7.20161C10.3599 7.16799 10.0222 7.15397 9.77203 7.15954C9.52166 7.16511 9.20727 7.17068 8.82887 7.17641C8.45047 7.18198 8.22044 7.18487 8.13905 7.18487V12.3507C8.19728 12.3507 8.3982 12.3535 8.74153 12.3591C9.08503 12.3647 9.35574 12.3647 9.5537 12.3591C9.75165 12.3536 10.0427 12.3423 10.4269 12.3255C10.8111 12.3086 11.1313 12.2779 11.3875 12.2329C11.6436 12.188 11.9435 12.1263 12.287 12.0478C12.6305 11.9692 12.9128 11.8655 13.134 11.7364C13.3553 11.6074 13.5706 11.456 13.7802 11.2822C13.9897 11.1083 14.147 10.8923 14.2517 10.6343C14.3564 10.3764 14.409 10.0905 14.409 9.77635Z',
    fill: '#FDA806'
  }));
};

var _excluded$p = ["width", "height"];
var Wallet = function Wallet(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 28 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 23 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$p);
  return React__default.createElement("svg", Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 28 23',
    fill: 'none'
  }, rest), React__default.createElement("path", {
    d: 'M23.0751 11.375C23.0751 11.7198 22.9381 12.0504 22.6943 12.2942C22.4505 12.538 22.1199 12.675 21.7751 12.675C21.4303 12.675 21.0997 12.538 20.8559 12.2942C20.6121 12.0504 20.4751 11.7198 20.4751 11.375C20.4751 11.0302 20.6121 10.6996 20.8559 10.4558C21.0997 10.212 21.4303 10.075 21.7751 10.075C22.1199 10.075 22.4505 10.212 22.6943 10.4558C22.9381 10.6996 23.0751 11.0302 23.0751 11.375Z',
    fill: '#86B8CE'
  }), React__default.createElement("path", {
    "fill-rule": 'evenodd',
    "clip-rule": 'evenodd',
    d: 'M11.3022 0H15.3478C17.7372 0 19.63 1.54972e-07 21.1107 0.1989C22.6343 0.4043 23.868 0.8359 24.8417 1.8083C26.0429 3.0108 26.4264 4.6202 26.5655 6.7093C27.3156 7.0382 27.8824 7.7363 27.9435 8.6203C27.95 8.6996 27.95 8.7841 27.95 8.8621V13.8879C27.95 13.9659 27.95 14.0504 27.9448 14.1284C27.8824 15.0124 27.3156 15.7118 26.5655 16.042C26.4264 18.1298 26.0429 19.7392 24.8417 20.9417C23.868 21.9141 22.6343 22.3457 21.1107 22.5511C19.6287 22.75 17.7372 22.75 15.3478 22.75H11.3022C8.9128 22.75 7.02 22.75 5.5393 22.5511C4.0157 22.3457 2.782 21.9141 1.8083 20.9417C0.8359 19.968 0.4043 18.7343 0.1989 17.2107C0 15.7287 0 13.8372 0 11.4478V11.3022C0 8.9128 0 7.02 0.1989 5.5393C0.4043 4.0157 0.8359 2.782 1.8083 1.8083C2.782 0.8359 4.0157 0.4043 5.5393 0.1989C7.0213 1.54972e-07 8.9128 0 11.3022 0ZM24.5934 16.25H22.074C19.2855 16.25 16.8987 14.1336 16.8987 11.375C16.8987 8.6164 19.2855 6.5 22.0727 6.5H24.5921C24.4439 4.7567 24.1098 3.835 23.4611 3.1876C22.9112 2.6377 22.1572 2.3075 20.8494 2.132C19.5143 1.9526 17.7528 1.95 15.2737 1.95H11.3737C8.8946 1.95 7.1344 1.9526 5.7967 2.132C4.4902 2.3075 3.7362 2.6377 3.1863 3.1876C2.6364 3.7375 2.3062 4.4915 2.1307 5.7993C1.9513 7.1357 1.9487 8.8959 1.9487 11.375C1.9487 13.8541 1.9513 15.6156 2.1307 16.952C2.3062 18.2585 2.6364 19.0125 3.1863 19.5624C3.7362 20.1123 4.4902 20.4425 5.798 20.618C7.1344 20.7974 8.8946 20.8 11.3737 20.8H15.2737C17.7528 20.8 19.5143 20.7974 20.8507 20.618C22.1572 20.4425 22.9112 20.1123 23.4611 19.5624C24.1098 18.915 24.4452 17.9946 24.5934 16.25ZM25.5762 8.45H22.074C20.2228 8.45 18.8487 9.8267 18.8487 11.375C18.8487 12.9233 20.2228 14.3 22.0727 14.3H25.6061C25.8739 14.2831 25.9896 14.1024 25.9987 13.9932V8.7568C25.9896 8.6476 25.8739 8.4669 25.6061 8.4513L25.5762 8.45Z',
    fill: 'white'
  }));
};

var _excluded$q = ["width", "height", "fill"];
var Explorer = function Explorer(_ref) {
  var _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'black' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$q);
  return React__default.createElement("svg", Object.assign({
    width: '21',
    height: '24',
    viewBox: '0 0 21 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React__default.createElement("path", {
    d: 'M9.6 0.239388C10.1 -0.0606123 10.6 -0.0606123 11.1 0.139388L11.2 0.239388L20 5.23939C20.5 5.53939 20.8 6.03939 20.8 6.53939V16.6394C20.8 17.1394 20.5 17.7394 20.1 18.0394L20 18.1394L11.2 23.1394C10.7 23.4394 10.2 23.4394 9.7 23.2394L9.6 23.1394L0.8 18.1394C0.3 17.8394 0 17.3394 0 16.8394V6.73939C0 6.23939 0.3 5.63939 0.7 5.33939L0.8 5.23939L9.6 0.239388ZM19 7.83939L11.3 12.9394V20.9394L19 16.5394V7.83939ZM1.8 7.83939V16.6394L9.5 21.0394V13.0394L1.8 7.83939ZM10.4 1.93939L2.8 6.23939L10.4 11.3394L18 6.23939L10.4 1.93939Z',
    fill: fill
  }));
};

var _excluded$r = ["width", "height", "fill"];
var ExternalUrl = function ExternalUrl(_ref) {
  var _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'black' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$r);
  return React__default.createElement("svg", Object.assign({
    width: '40',
    height: '40',
    viewBox: '0 0 40 40',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React__default.createElement("path", {
    d: 'M19.1699 11.6226H15.4812C12.7198 11.6226 10.4812 13.8611 10.4812 16.6226V24C10.4812 26.7614 12.7198 29 15.4812 29H22.8586C25.6201 29 27.8586 26.7614 27.8586 24V20.3113',
    stroke: fill,
    "stroke-width": '2'
  }), React__default.createElement("mask", {
    id: 'path-2-inside-1_883_418',
    fill: 'white'
  }, React__default.createElement("path", {
    "fill-rule": 'evenodd',
    "clip-rule": 'evenodd',
    d: 'M30.4872 9.53075C30.5107 9.22503 30.2561 8.97036 29.9503 8.99388L22.9271 9.53412C22.5012 9.56689 22.3099 10.0841 22.6119 10.3862L24.616 12.3902C24.8112 12.5855 24.8112 12.9021 24.616 13.0973L18.9543 18.7591C18.4661 19.2472 18.4661 20.0387 18.9543 20.5268C19.4424 21.015 20.2339 21.015 20.722 20.5268L26.3837 14.8651C26.579 14.6698 26.8956 14.6698 27.0908 14.8651L29.0949 16.8692C29.3969 17.1712 29.9142 16.9799 29.947 16.5539L30.4872 9.53075Z'
  })), React__default.createElement("path", {
    "fill-rule": 'evenodd',
    "clip-rule": 'evenodd',
    d: 'M30.4872 9.53075C30.5107 9.22503 30.2561 8.97036 29.9503 8.99388L22.9271 9.53412C22.5012 9.56689 22.3099 10.0841 22.6119 10.3862L24.616 12.3902C24.8112 12.5855 24.8112 12.9021 24.616 13.0973L18.9543 18.7591C18.4661 19.2472 18.4661 20.0387 18.9543 20.5268C19.4424 21.015 20.2339 21.015 20.722 20.5268L26.3837 14.8651C26.579 14.6698 26.8956 14.6698 27.0908 14.8651L29.0949 16.8692C29.3969 17.1712 29.9142 16.9799 29.947 16.5539L30.4872 9.53075Z',
    fill: fill
  }), React__default.createElement("path", {
    d: 'M18.9543 18.7591L18.2471 18.0519L18.9543 18.7591ZM18.9543 20.5268L18.2471 21.2339L18.9543 20.5268ZM20.722 20.5268L20.0149 19.8197L20.722 20.5268ZM29.0949 16.8692L29.802 16.162L29.0949 16.8692ZM24.616 12.3902L23.9089 13.0973L24.616 12.3902ZM26.3837 14.8651L25.6766 14.158L26.3837 14.8651ZM27.0908 14.8651L27.7979 14.158L27.0908 14.8651ZM30.4872 9.53075L29.4902 9.45406L30.4872 9.53075ZM22.6119 10.3862L21.9048 11.0933L22.6119 10.3862ZM23.0038 10.5312L30.027 9.99093L29.8736 7.99682L22.8505 8.53707L23.0038 10.5312ZM25.3231 11.6831L23.319 9.6791L21.9048 11.0933L23.9089 13.0973L25.3231 11.6831ZM19.6614 19.4662L25.3231 13.8044L23.9089 12.3902L18.2471 18.0519L19.6614 19.4662ZM19.6614 19.8197C19.5637 19.7221 19.5637 19.5638 19.6614 19.4662L18.2471 18.0519C17.3685 18.9306 17.3685 20.3552 18.2471 21.2339L19.6614 19.8197ZM20.0149 19.8197C19.9173 19.9173 19.759 19.9173 19.6614 19.8197L18.2471 21.2339C19.1258 22.1126 20.5504 22.1126 21.4291 21.2339L20.0149 19.8197ZM25.6766 14.158L20.0149 19.8197L21.4291 21.2339L27.0908 15.5722L25.6766 14.158ZM29.802 16.162L27.7979 14.158L26.3837 15.5722L28.3878 17.5763L29.802 16.162ZM29.4902 9.45406L28.9499 16.4772L30.944 16.6306L31.4843 9.60745L29.4902 9.45406ZM28.3878 17.5763C29.294 18.4824 30.8457 17.9084 30.944 16.6306L28.9499 16.4772C28.9827 16.0513 29.4999 15.86 29.802 16.162L28.3878 17.5763ZM23.9089 13.0973C23.7136 12.9021 23.7136 12.5855 23.9089 12.3902L25.3231 13.8044C25.9089 13.2187 25.9089 12.2689 25.3231 11.6831L23.9089 13.0973ZM27.0908 15.5722C26.8956 15.7675 26.579 15.7675 26.3837 15.5722L27.7979 14.158C27.2122 13.5722 26.2624 13.5722 25.6766 14.158L27.0908 15.5722ZM30.027 9.99093C29.7213 10.0145 29.4666 9.75978 29.4902 9.45406L31.4843 9.60745C31.5548 8.69029 30.7908 7.92627 29.8736 7.99682L30.027 9.99093ZM22.8505 8.53707C21.5727 8.63536 20.9987 10.1871 21.9048 11.0933L23.319 9.6791C23.6211 9.98116 23.4298 10.4984 23.0038 10.5312L22.8505 8.53707Z',
    fill: fill,
    mask: 'url(#path-2-inside-1_883_418)'
  }));
};

var _CHAIN_NAMES_TO_IDS_T, _CHAIN_NAMES_TO_IDS_M, _CHAIN_NAMES_TO_STRIN, _CHAIN_STRING_TO_NAME, _CHAIN_NAMES_TO_EXPLO, _CHAIN_NAMES_TO_EXPLO2, _CHAIN_IDS_TO_NAMES_T, _CHAIN_IDS_TO_NAMES_M;
(function (ChainName) {
  ChainName["ETHEREUM"] = "ETH";
  ChainName["POLYGON"] = "POL";
  ChainName["AVALANCHE"] = "AVX";
  ChainName["SOLANA"] = "SOL";
  ChainName["BSC"] = "BSC";
  ChainName["ARBITRUM"] = "ARB";
  ChainName["OPTIMISM"] = "OPT";
  ChainName["POLYGON_ZKEVM"] = "ZKE";
  ChainName["TRON"] = "TRX";
  ChainName["FIAT"] = "FIAT";
  ChainName["BTC"] = "BTC";
})(exports.SupportNetworks || (exports.SupportNetworks = {}));
var SupportedChainIdTestnet;
(function (SupportedChainIdTestnet) {
  SupportedChainIdTestnet[SupportedChainIdTestnet["ETHEREUM"] = 11155111] = "ETHEREUM";
  SupportedChainIdTestnet[SupportedChainIdTestnet["POLYGON"] = 80002] = "POLYGON";
  SupportedChainIdTestnet[SupportedChainIdTestnet["AVALANCHE"] = 43113] = "AVALANCHE";
  SupportedChainIdTestnet[SupportedChainIdTestnet["BSC"] = 97] = "BSC";
  SupportedChainIdTestnet[SupportedChainIdTestnet["ARBITRUM"] = 421614] = "ARBITRUM";
  SupportedChainIdTestnet[SupportedChainIdTestnet["OPTIMISM"] = 11155420] = "OPTIMISM";
  SupportedChainIdTestnet[SupportedChainIdTestnet["POLYGON_ZKEM"] = 2442] = "POLYGON_ZKEM";
})(SupportedChainIdTestnet || (SupportedChainIdTestnet = {}));
var CHAIN_NAMES_TO_IDS_TESTNET = (_CHAIN_NAMES_TO_IDS_T = {}, _CHAIN_NAMES_TO_IDS_T[exports.SupportNetworks.ETHEREUM] = SupportedChainIdTestnet.ETHEREUM, _CHAIN_NAMES_TO_IDS_T[exports.SupportNetworks.POLYGON] = SupportedChainIdTestnet.POLYGON, _CHAIN_NAMES_TO_IDS_T[exports.SupportNetworks.AVALANCHE] = SupportedChainIdTestnet.AVALANCHE, _CHAIN_NAMES_TO_IDS_T[exports.SupportNetworks.BSC] = SupportedChainIdTestnet.BSC, _CHAIN_NAMES_TO_IDS_T[exports.SupportNetworks.OPTIMISM] = SupportedChainIdTestnet.OPTIMISM, _CHAIN_NAMES_TO_IDS_T[exports.SupportNetworks.ARBITRUM] = SupportedChainIdTestnet.ARBITRUM, _CHAIN_NAMES_TO_IDS_T[exports.SupportNetworks.POLYGON_ZKEVM] = SupportedChainIdTestnet.POLYGON_ZKEM, _CHAIN_NAMES_TO_IDS_T);
var SupportedChainIdMainnet;
(function (SupportedChainIdMainnet) {
  SupportedChainIdMainnet[SupportedChainIdMainnet["ETHEREUM"] = 1] = "ETHEREUM";
  SupportedChainIdMainnet[SupportedChainIdMainnet["POLYGON"] = 137] = "POLYGON";
  SupportedChainIdMainnet[SupportedChainIdMainnet["AVALANCHE"] = 43114] = "AVALANCHE";
  SupportedChainIdMainnet[SupportedChainIdMainnet["BSC"] = 56] = "BSC";
  SupportedChainIdMainnet[SupportedChainIdMainnet["ARBITRUM"] = 42161] = "ARBITRUM";
  SupportedChainIdMainnet[SupportedChainIdMainnet["OPTIMISM"] = 10] = "OPTIMISM";
  SupportedChainIdMainnet[SupportedChainIdMainnet["POLYGON_ZKEM"] = 1101] = "POLYGON_ZKEM";
})(SupportedChainIdMainnet || (SupportedChainIdMainnet = {}));
var CHAIN_NAMES_TO_IDS_MAINNET = (_CHAIN_NAMES_TO_IDS_M = {}, _CHAIN_NAMES_TO_IDS_M[exports.SupportNetworks.ETHEREUM] = SupportedChainIdMainnet.ETHEREUM, _CHAIN_NAMES_TO_IDS_M[exports.SupportNetworks.POLYGON] = SupportedChainIdMainnet.POLYGON, _CHAIN_NAMES_TO_IDS_M[exports.SupportNetworks.AVALANCHE] = SupportedChainIdMainnet.AVALANCHE, _CHAIN_NAMES_TO_IDS_M[exports.SupportNetworks.BSC] = SupportedChainIdMainnet.BSC, _CHAIN_NAMES_TO_IDS_M[exports.SupportNetworks.OPTIMISM] = SupportedChainIdMainnet.OPTIMISM, _CHAIN_NAMES_TO_IDS_M[exports.SupportNetworks.ARBITRUM] = SupportedChainIdMainnet.ARBITRUM, _CHAIN_NAMES_TO_IDS_M[exports.SupportNetworks.POLYGON_ZKEVM] = SupportedChainIdMainnet.POLYGON_ZKEM, _CHAIN_NAMES_TO_IDS_M);
var CHAIN_NAMES_TO_STRING = (_CHAIN_NAMES_TO_STRIN = {}, _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.ETHEREUM] = 'Ethereum', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.POLYGON] = 'Polygon', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.AVALANCHE] = 'Avalanche', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.SOLANA] = 'Solana', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.BSC] = 'BNB Smart Chain', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.OPTIMISM] = 'Optimism', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.ARBITRUM] = 'Arbitrum', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.POLYGON_ZKEVM] = 'Polygon zkEVM', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.TRON] = 'Tron', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.FIAT] = 'Pay with FIAT', _CHAIN_NAMES_TO_STRIN[exports.SupportNetworks.BTC] = 'Bitcoin', _CHAIN_NAMES_TO_STRIN);
var CHAIN_STRING_TO_NAME = (_CHAIN_STRING_TO_NAME = {}, _CHAIN_STRING_TO_NAME['Ethereum'] = exports.SupportNetworks.ETHEREUM, _CHAIN_STRING_TO_NAME['Polygon'] = exports.SupportNetworks.POLYGON, _CHAIN_STRING_TO_NAME['Avalanche'] = exports.SupportNetworks.AVALANCHE, _CHAIN_STRING_TO_NAME['Solana'] = exports.SupportNetworks.SOLANA, _CHAIN_STRING_TO_NAME['Binance'] = exports.SupportNetworks.BSC, _CHAIN_STRING_TO_NAME['Optimism'] = exports.SupportNetworks.OPTIMISM, _CHAIN_STRING_TO_NAME['Arbitrum'] = exports.SupportNetworks.ARBITRUM, _CHAIN_STRING_TO_NAME['Polygon zkEVM'] = exports.SupportNetworks.POLYGON_ZKEVM, _CHAIN_STRING_TO_NAME['Tron'] = exports.SupportNetworks.TRON, _CHAIN_STRING_TO_NAME['Pay with FIAT'] = exports.SupportNetworks.FIAT, _CHAIN_STRING_TO_NAME['Bitcoin'] = exports.SupportNetworks.BTC, _CHAIN_STRING_TO_NAME);
var CHAIN_NAMES_TO_EXPLORER_TESTNET = (_CHAIN_NAMES_TO_EXPLO = {}, _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.ETHEREUM] = 'sepolia.etherscan.io', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.POLYGON] = 'www.oklink.com/amoy', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.AVALANCHE] = 'testnet.snowtrace.io', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.SOLANA] = 'solscan.io', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.BSC] = 'testnet.bscscan.com', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.OPTIMISM] = 'sepolia-optimism.etherscan.io', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.ARBITRUM] = 'sepolia.arbiscan.io', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.POLYGON_ZKEVM] = 'cardona-zkevm.polygonscan.com', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.TRON] = 'nile.tronscan.org/#', _CHAIN_NAMES_TO_EXPLO[exports.SupportNetworks.BTC] = 'mempool.space/testnet', _CHAIN_NAMES_TO_EXPLO);
var CHAIN_NAMES_TO_EXPLORER_MAINNET = (_CHAIN_NAMES_TO_EXPLO2 = {}, _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.ETHEREUM] = 'etherscan.io', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.POLYGON] = 'polygonscan.com', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.AVALANCHE] = 'snowtrace.io', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.SOLANA] = 'solscan.io', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.BSC] = 'bscscan.com', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.OPTIMISM] = 'optimistic.etherscan.io', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.ARBITRUM] = 'arbiscan.io', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.POLYGON_ZKEVM] = 'zkevm.polygonscan.com', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.TRON] = 'tronscan.org/#', _CHAIN_NAMES_TO_EXPLO2[exports.SupportNetworks.BTC] = 'mempool.space', _CHAIN_NAMES_TO_EXPLO2);
var CHAIN_IDS_TO_NAMES_TESTNET = (_CHAIN_IDS_TO_NAMES_T = {}, _CHAIN_IDS_TO_NAMES_T[SupportedChainIdTestnet.ETHEREUM] = exports.SupportNetworks.ETHEREUM, _CHAIN_IDS_TO_NAMES_T[SupportedChainIdTestnet.POLYGON] = exports.SupportNetworks.POLYGON, _CHAIN_IDS_TO_NAMES_T[SupportedChainIdTestnet.AVALANCHE] = exports.SupportNetworks.AVALANCHE, _CHAIN_IDS_TO_NAMES_T[SupportedChainIdTestnet.BSC] = exports.SupportNetworks.BSC, _CHAIN_IDS_TO_NAMES_T[SupportedChainIdTestnet.OPTIMISM] = exports.SupportNetworks.OPTIMISM, _CHAIN_IDS_TO_NAMES_T[SupportedChainIdTestnet.ARBITRUM] = exports.SupportNetworks.ARBITRUM, _CHAIN_IDS_TO_NAMES_T[SupportedChainIdTestnet.POLYGON_ZKEM] = exports.SupportNetworks.POLYGON_ZKEVM, _CHAIN_IDS_TO_NAMES_T);
var CHAIN_IDS_TO_NAMES_MAINNET = (_CHAIN_IDS_TO_NAMES_M = {}, _CHAIN_IDS_TO_NAMES_M[SupportedChainIdMainnet.ETHEREUM] = exports.SupportNetworks.ETHEREUM, _CHAIN_IDS_TO_NAMES_M[SupportedChainIdMainnet.POLYGON] = exports.SupportNetworks.POLYGON, _CHAIN_IDS_TO_NAMES_M[SupportedChainIdMainnet.AVALANCHE] = exports.SupportNetworks.AVALANCHE, _CHAIN_IDS_TO_NAMES_M[SupportedChainIdMainnet.BSC] = exports.SupportNetworks.BSC, _CHAIN_IDS_TO_NAMES_M[SupportedChainIdMainnet.OPTIMISM] = exports.SupportNetworks.OPTIMISM, _CHAIN_IDS_TO_NAMES_M[SupportedChainIdMainnet.ARBITRUM] = exports.SupportNetworks.ARBITRUM, _CHAIN_IDS_TO_NAMES_M[SupportedChainIdMainnet.POLYGON_ZKEM] = exports.SupportNetworks.POLYGON_ZKEVM, _CHAIN_IDS_TO_NAMES_M);
var networkOptions = [{
  id: exports.SupportNetworks.ARBITRUM,
  label: 'Arbitrum',
  icon: Arbitrum
}, {
  id: exports.SupportNetworks.AVALANCHE,
  label: 'Avalanche',
  icon: Avalanche
}, {
  id: exports.SupportNetworks.BSC,
  label: 'Binance',
  icon: BNB
}, {
  id: exports.SupportNetworks.BTC,
  label: 'Bitcoin',
  icon: BTC
}, {
  id: exports.SupportNetworks.ETHEREUM,
  label: 'Ethereum',
  icon: Ethereum
}, {
  id: exports.SupportNetworks.FIAT,
  label: 'Pay with FIAT',
  icon: Bank
}, {
  id: exports.SupportNetworks.OPTIMISM,
  label: 'Optimism',
  icon: Optimism
}, {
  id: exports.SupportNetworks.POLYGON,
  label: 'Polygon',
  icon: Polygon
}, {
  id: exports.SupportNetworks.POLYGON_ZKEVM,
  label: 'Polygon zkEVM',
  icon: PolygonzkEVM
}, {
  id: exports.SupportNetworks.SOLANA,
  label: 'Solana',
  icon: Solana
}, {
  id: exports.SupportNetworks.TRON,
  label: 'Tron',
  icon: Celo
}];
var getNetworkOption = function getNetworkOption(id) {
  var index = networkOptions.findIndex(function (item) {
    return item.id === id;
  });
  if (index < 0) return;
  return networkOptions[index];
};
var CLUSTER = 'devnet';
var SOLANA_HOST = web3_js.clusterApiUrl(CLUSTER);
var isEVMChain = function isEVMChain(chainId) {
  return chainId === exports.SupportNetworks.ETHEREUM || chainId === exports.SupportNetworks.POLYGON || chainId === exports.SupportNetworks.AVALANCHE || chainId === exports.SupportNetworks.BSC || chainId === exports.SupportNetworks.OPTIMISM || chainId === exports.SupportNetworks.ARBITRUM || chainId === exports.SupportNetworks.POLYGON_ZKEVM;
};
var COIN_LIST = {
  USDK: {
    symbol: 'USDK',
    icon: USDT$1
  },
  USDT: {
    symbol: 'USDT',
    icon: USDT
  },
  USDC: {
    symbol: 'USDC',
    icon: USDC
  },
  KEUR: {
    symbol: 'KEUR',
    icon: KEUR
  },
  WBTC: {
    symbol: 'WBTC',
    icon: BTC
  }
};
var ExpireTimeOptions = ['1 hour', '2 hours', '3 hours'];
var TransactionStatus;
(function (TransactionStatus) {
  TransactionStatus["AVAILABLE"] = "Available";
  TransactionStatus["CONFIRMED"] = "Pull_Confirmed";
  TransactionStatus["PULLED"] = "Pulled";
  TransactionStatus["PAID"] = "Paid";
  TransactionStatus["COMPLETED"] = "Completed";
  TransactionStatus["FAILEDTOPAY"] = "FailedToPay";
  TransactionStatus["FAILEDTOPULL"] = "FailedToPull";
  TransactionStatus["UNAVAILABLE"] = "UnAvailable";
  TransactionStatus["KEYSIGNED"] = "KeySigned";
})(TransactionStatus || (TransactionStatus = {}));
var TRON_USDK_OWNER_ADDRESS = 'TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU';

(function (NetworkOptions) {
  NetworkOptions["testnet"] = "testnet";
  NetworkOptions["mainnet"] = "mainnet";
})(exports.NetworkOptions || (exports.NetworkOptions = {}));
(function (ModeOptions) {
  ModeOptions["payment"] = "payment";
  ModeOptions["bridge"] = "bridge";
  ModeOptions["status"] = "status";
})(exports.ModeOptions || (exports.ModeOptions = {}));
(function (CurrencyOptions) {
  CurrencyOptions["USDK"] = "USDK";
  CurrencyOptions["USDC"] = "USDC";
  CurrencyOptions["USDT"] = "USDT";
  CurrencyOptions["WBTC"] = "WBTC";
  CurrencyOptions["G$"] = "GDOLLAR";
})(exports.CurrencyOptions || (exports.CurrencyOptions = {}));
(function (ColorModeOptions) {
  ColorModeOptions["light"] = "light";
  ColorModeOptions["dark"] = "dark";
})(exports.ColorModeOptions || (exports.ColorModeOptions = {}));
(function (DAppOptions) {
  DAppOptions["None"] = "none";
  DAppOptions["LPAdd"] = "LPAdd";
  DAppOptions["LPDrain"] = "LPDrain";
})(exports.DAppOptions || (exports.DAppOptions = {}));

var createSlice = toolkitRaw.createSlice;
var initialState = {
  networkOption: exports.NetworkOptions.testnet,
  theme: {},
  tokenOptions: {},
  pendingTxs: 0,
  pendingTxData: [],
  kimaExplorerUrl: 'https://explorer.kima.finance',
  graphqlProviderQuery: 'https://graphql.kima.finance',
  mode: exports.ModeOptions.bridge,
  sourceChain: '',
  targetChain: '',
  targetAddress: '',
  bitcoinAddress: '',
  bitcoinPubkey: '',
  solanaConnectModal: false,
  tronConnectModal: false,
  accountDetailsModal: false,
  helpPopup: false,
  hashPopup: false,
  pendingTxPopup: false,
  bankPopup: false,
  walletAutoConnect: true,
  provider: undefined,
  dAppOption: exports.DAppOptions.None,
  solanaProvider: undefined,
  tronProvider: undefined,
  submitted: false,
  amount: '',
  feeDeduct: false,
  errorHandler: function errorHandler() {
    return void 0;
  },
  closeHandler: function closeHandler() {
    return void 0;
  },
  successHandler: function successHandler() {
    return void 0;
  },
  switchChainHandler: function switchChainHandler() {
    return void 0;
  },
  keplrHandler: function keplrHandler() {
    return void 0;
  },
  initChainFromProvider: false,
  serviceFee: -1,
  backendUrl: '',
  nodeProviderQuery: '',
  txId: -1,
  sourceCurrency: 'USDK',
  targetCurrency: 'USDK',
  compliantOption: true,
  sourceCompliant: 'low',
  targetCompliant: 'low',
  useFIAT: false,
  bankDetails: {
    iban: '',
    recipient: ''
  },
  targetNetworkFetching: false,
  signature: '',
  uuid: '',
  kycStatus: '',
  expireTime: '1 hour'
};
var optionSlice = createSlice({
  name: 'option',
  initialState: initialState,
  reducers: {
    initialize: function initialize(state) {
      state.submitted = false;
      state.txId = -1;
      state.serviceFee = -1;
      state.amount = '';
      state.targetAddress = '';
      state.compliantOption = true;
      state.sourceCompliant = 'low';
      state.targetCompliant = 'low';
      state.bitcoinAddress = '', state.useFIAT = false;
      state.tokenOptions = {}, state.bankDetails = {
        iban: '',
        recipient: ''
      };
      state.initChainFromProvider = false;
      state.targetNetworkFetching = false;
      state.signature = '';
    },
    setNetworkOption: function setNetworkOption(state, action) {
      state.networkOption = action.payload;
    },
    setPendingTxs: function setPendingTxs(state, action) {
      state.pendingTxs = action.payload;
    },
    setPendingTxData: function setPendingTxData(state, action) {
      state.pendingTxData = action.payload;
    },
    setTokenOptions: function setTokenOptions(state, action) {
      state.tokenOptions = action.payload;
    },
    setTheme: function setTheme(state, action) {
      state.theme = action.payload;
    },
    setKimaExplorer: function setKimaExplorer(state, action) {
      state.kimaExplorerUrl = action.payload;
    },
    setSourceChain: function setSourceChain(state, action) {
      state.sourceChain = action.payload;
    },
    setTargetChain: function setTargetChain(state, action) {
      state.targetChain = action.payload;
    },
    setTargetAddress: function setTargetAddress(state, action) {
      state.targetAddress = action.payload;
    },
    setBitcoinAddress: function setBitcoinAddress(state, action) {
      state.bitcoinAddress = action.payload;
    },
    setBitcoinPubkey: function setBitcoinPubkey(state, action) {
      state.bitcoinPubkey = action.payload;
    },
    setSolanaConnectModal: function setSolanaConnectModal(state, action) {
      state.solanaConnectModal = action.payload;
    },
    setTronConnectModal: function setTronConnectModal(state, action) {
      state.tronConnectModal = action.payload;
    },
    setAccountDetailsModal: function setAccountDetailsModal(state, action) {
      state.accountDetailsModal = action.payload;
    },
    setHelpPopup: function setHelpPopup(state, action) {
      state.helpPopup = action.payload;
    },
    setHashPopup: function setHashPopup(state, action) {
      state.hashPopup = action.payload;
    },
    setPendingTxPopup: function setPendingTxPopup(state, action) {
      state.pendingTxPopup = action.payload;
    },
    setBankPopup: function setBankPopup(state, action) {
      state.bankPopup = action.payload;
    },
    setProvider: function setProvider(state, action) {
      state.provider = action.payload;
    },
    setDappOption: function setDappOption(state, action) {
      state.dAppOption = action.payload;
    },
    setWalletAutoConnect: function setWalletAutoConnect(state, action) {
      state.walletAutoConnect = action.payload;
    },
    setSolanaProvider: function setSolanaProvider(state, action) {
      state.solanaProvider = action.payload;
    },
    setTronProvider: function setTronProvider(state, action) {
      state.tronProvider = action.payload;
    },
    setSubmitted: function setSubmitted(state, action) {
      state.submitted = action.payload;
    },
    setTransactionOption: function setTransactionOption(state, action) {
      state.transactionOption = action.payload;
    },
    setAmount: function setAmount(state, action) {
      state.amount = action.payload;
    },
    setErrorHandler: function setErrorHandler(state, action) {
      state.errorHandler = action.payload;
    },
    setKeplrHandler: function setKeplrHandler(state, action) {
      state.keplrHandler = action.payload;
    },
    setCloseHandler: function setCloseHandler(state, action) {
      state.closeHandler = action.payload;
    },
    setSwitchChainHandler: function setSwitchChainHandler(state, action) {
      state.switchChainHandler = action.payload;
    },
    setInitChainFromProvider: function setInitChainFromProvider(state, action) {
      state.initChainFromProvider = action.payload;
    },
    setSuccessHandler: function setSuccessHandler(state, action) {
      state.successHandler = action.payload;
    },
    setServiceFee: function setServiceFee(state, action) {
      state.serviceFee = action.payload;
    },
    setMode: function setMode(state, action) {
      state.mode = action.payload;
    },
    setFeeDeduct: function setFeeDeduct(state, action) {
      state.feeDeduct = action.payload;
    },
    setBackendUrl: function setBackendUrl(state, action) {
      state.backendUrl = action.payload;
    },
    setNodeProviderQuery: function setNodeProviderQuery(state, action) {
      state.nodeProviderQuery = action.payload;
    },
    setGraphqlProviderQuery: function setGraphqlProviderQuery(state, action) {
      state.graphqlProviderQuery = action.payload;
    },
    setTxId: function setTxId(state, action) {
      state.txId = action.payload;
    },
    setSourceCurrency: function setSourceCurrency(state, action) {
      state.sourceCurrency = action.payload;
    },
    setTargetCurrency: function setTargetCurrency(state, action) {
      state.targetCurrency = action.payload;
    },
    setCompliantOption: function setCompliantOption(state, action) {
      state.compliantOption = action.payload;
    },
    setSourceCompliant: function setSourceCompliant(state, action) {
      state.sourceCompliant = action.payload;
    },
    setTargetCompliant: function setTargetCompliant(state, action) {
      state.targetCompliant = action.payload;
    },
    setUseFIAT: function setUseFIAT(state, action) {
      state.useFIAT = action.payload;
    },
    setBankDetails: function setBankDetails(state, action) {
      state.bankDetails = action.payload;
    },
    setTargetChainFetching: function setTargetChainFetching(state, action) {
      state.targetNetworkFetching = action.payload;
    },
    setSignature: function setSignature(state, action) {
      state.signature = action.payload;
    },
    setUuid: function setUuid(state, action) {
      state.uuid = action.payload;
    },
    setKYCStatus: function setKYCStatus(state, action) {
      state.kycStatus = action.payload;
    },
    setExpireTime: function setExpireTime(state, action) {
      state.expireTime = action.payload;
    }
  }
});
var _optionSlice$actions = optionSlice.actions,
  initialize = _optionSlice$actions.initialize,
  setNetworkOption = _optionSlice$actions.setNetworkOption,
  setTokenOptions = _optionSlice$actions.setTokenOptions,
  setKimaExplorer = _optionSlice$actions.setKimaExplorer,
  setTheme = _optionSlice$actions.setTheme,
  setSourceChain = _optionSlice$actions.setSourceChain,
  setTargetChain = _optionSlice$actions.setTargetChain,
  setTargetAddress = _optionSlice$actions.setTargetAddress,
  setBitcoinAddress = _optionSlice$actions.setBitcoinAddress,
  setBitcoinPubkey = _optionSlice$actions.setBitcoinPubkey,
  setSolanaConnectModal = _optionSlice$actions.setSolanaConnectModal,
  setTronConnectModal = _optionSlice$actions.setTronConnectModal,
  setAccountDetailsModal = _optionSlice$actions.setAccountDetailsModal,
  setPendingTxPopup = _optionSlice$actions.setPendingTxPopup,
  setBankPopup = _optionSlice$actions.setBankPopup,
  setProvider = _optionSlice$actions.setProvider,
  setDappOption = _optionSlice$actions.setDappOption,
  setWalletAutoConnect = _optionSlice$actions.setWalletAutoConnect,
  setSubmitted = _optionSlice$actions.setSubmitted,
  setTransactionOption = _optionSlice$actions.setTransactionOption,
  setAmount = _optionSlice$actions.setAmount,
  setErrorHandler = _optionSlice$actions.setErrorHandler,
  setKeplrHandler = _optionSlice$actions.setKeplrHandler,
  setCloseHandler = _optionSlice$actions.setCloseHandler,
  setSuccessHandler = _optionSlice$actions.setSuccessHandler,
  setSwitchChainHandler = _optionSlice$actions.setSwitchChainHandler,
  setServiceFee = _optionSlice$actions.setServiceFee,
  setMode = _optionSlice$actions.setMode,
  setFeeDeduct = _optionSlice$actions.setFeeDeduct,
  setBackendUrl = _optionSlice$actions.setBackendUrl,
  setNodeProviderQuery = _optionSlice$actions.setNodeProviderQuery,
  setGraphqlProviderQuery = _optionSlice$actions.setGraphqlProviderQuery,
  setTxId = _optionSlice$actions.setTxId,
  setSourceCurrency = _optionSlice$actions.setSourceCurrency,
  setTargetCurrency = _optionSlice$actions.setTargetCurrency,
  setCompliantOption = _optionSlice$actions.setCompliantOption,
  setSourceCompliant = _optionSlice$actions.setSourceCompliant,
  setTargetCompliant = _optionSlice$actions.setTargetCompliant,
  setUseFIAT = _optionSlice$actions.setUseFIAT,
  setBankDetails = _optionSlice$actions.setBankDetails,
  setTargetChainFetching = _optionSlice$actions.setTargetChainFetching,
  setSignature = _optionSlice$actions.setSignature,
  setUuid = _optionSlice$actions.setUuid,
  setKYCStatus = _optionSlice$actions.setKYCStatus,
  setExpireTime = _optionSlice$actions.setExpireTime,
  setPendingTxData = _optionSlice$actions.setPendingTxData,
  setPendingTxs = _optionSlice$actions.setPendingTxs;
var optionReducer = optionSlice.reducer;

var configureStore = toolkitRaw.configureStore;
var store = configureStore({
  reducer: {
    option: optionReducer
  },
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously implement a do ... while loop
function _do(body, test) {
	var awaitBody;
	do {
		var result = body();
		if (result && result.then) {
			if (_isSettledPact(result)) {
				result = result.v;
			} else {
				awaitBody = true;
				break;
			}
		}
		var shouldContinue = test();
		if (_isSettledPact(shouldContinue)) {
			shouldContinue = shouldContinue.v;
		}
		if (!shouldContinue) {
			return result;
		}
	} while (!shouldContinue.then);
	const pact = new _Pact();
	const reject = _settle.bind(null, pact, 2);
	(awaitBody ? result.then(_resumeAfterBody) : shouldContinue.then(_resumeAfterTest)).then(void 0, reject);
	return pact;
	function _resumeAfterBody(value) {
		result = value;
		for (;;) {
			shouldContinue = test();
			if (_isSettledPact(shouldContinue)) {
				shouldContinue = shouldContinue.v;
			}
			if (!shouldContinue) {
				break;
			}
			if (shouldContinue.then) {
				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
				return;
			}
			result = body();
			if (result && result.then) {
				if (_isSettledPact(result)) {
					result = result.v;
				} else {
					result.then(_resumeAfterBody).then(void 0, reject);
					return;
				}
			}
		}
		_settle(pact, 1, result);
	}
	function _resumeAfterTest(shouldContinue) {
		if (shouldContinue) {
			do {
				result = body();
				if (result && result.then) {
					if (_isSettledPact(result)) {
						result = result.v;
					} else {
						result.then(_resumeAfterBody).then(void 0, reject);
						return;
					}
				}
				shouldContinue = test();
				if (_isSettledPact(shouldContinue)) {
					shouldContinue = shouldContinue.v;
				}
				if (!shouldContinue) {
					_settle(pact, 1, result);
					return;
				}
			} while (!shouldContinue.then);
			shouldContinue.then(_resumeAfterTest).then(void 0, reject);
		} else {
			_settle(pact, 1, result);
		}
	}
}

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var selectNetworkOption = function selectNetworkOption(state) {
  return state.option.networkOption;
};
var selectTokenOptions = function selectTokenOptions(state) {
  return state.option.tokenOptions;
};
var selectTheme = function selectTheme(state) {
  return state.option.theme;
};
var selectKimaExplorer = function selectKimaExplorer(state) {
  return state.option.kimaExplorerUrl;
};
var selectSourceChain = function selectSourceChain(state) {
  return state.option.sourceChain;
};
var selectTargetChain = function selectTargetChain(state) {
  return state.option.targetChain;
};
var selectTargetAddress = function selectTargetAddress(state) {
  return state.option.targetAddress;
};
var selectBitcoinAddress = function selectBitcoinAddress(state) {
  return state.option.bitcoinAddress;
};
var selectBitcoinPubkey = function selectBitcoinPubkey(state) {
  return state.option.bitcoinPubkey;
};
var selectExpireTime = function selectExpireTime(state) {
  return state.option.expireTime;
};
var selectSolanaConnectModal = function selectSolanaConnectModal(state) {
  return state.option.solanaConnectModal;
};
var selectTronConnectModal = function selectTronConnectModal(state) {
  return state.option.tronConnectModal;
};
var selectPendingTxs = function selectPendingTxs(state) {
  return state.option.pendingTxs;
};
var selectPendingTxData = function selectPendingTxData(state) {
  return state.option.pendingTxData;
};
var selectPendingTxPopup = function selectPendingTxPopup(state) {
  return state.option.pendingTxPopup;
};
var selectBankPopup = function selectBankPopup(state) {
  return state.option.bankPopup;
};
var selectDappOption = function selectDappOption(state) {
  return state.option.dAppOption;
};
var selectWalletAutoConnect = function selectWalletAutoConnect(state) {
  return state.option.walletAutoConnect;
};
var selectSubmitted = function selectSubmitted(state) {
  return state.option.submitted;
};
var selectTransactionOption = function selectTransactionOption(state) {
  return state.option.transactionOption;
};
var selectAmount = function selectAmount(state) {
  return state.option.amount;
};
var selectErrorHandler = function selectErrorHandler(state) {
  return state.option.errorHandler;
};
var selectKeplrHandler = function selectKeplrHandler(state) {
  return state.option.keplrHandler;
};
var selectCloseHandler = function selectCloseHandler(state) {
  return state.option.closeHandler;
};
var selectSuccessHandler = function selectSuccessHandler(state) {
  return state.option.successHandler;
};
var selectServiceFee = function selectServiceFee(state) {
  return state.option.serviceFee;
};
var selectMode = function selectMode(state) {
  return state.option.mode;
};
var selectSourceCurrency = function selectSourceCurrency(state) {
  return state.option.sourceCurrency;
};
var selectTargetCurrency = function selectTargetCurrency(state) {
  return state.option.targetCurrency;
};
var selectCompliantOption = function selectCompliantOption(state) {
  return state.option.compliantOption;
};
var selectSourceCompliant = function selectSourceCompliant(state) {
  return state.option.sourceCompliant;
};
var selectTargetCompliant = function selectTargetCompliant(state) {
  return state.option.targetCompliant;
};
var selectBackendUrl = function selectBackendUrl(state) {
  return state.option.backendUrl;
};
var selectFeeDeduct = function selectFeeDeduct(state) {
  return state.option.feeDeduct;
};
var selectNodeProviderQuery = function selectNodeProviderQuery(state) {
  return state.option.nodeProviderQuery;
};
var selectGraphqlProviderQuery = function selectGraphqlProviderQuery(state) {
  return state.option.graphqlProviderQuery;
};
var selectTargetChainFetching = function selectTargetChainFetching(state) {
  return state.option.targetNetworkFetching;
};
var selectTxId = function selectTxId(state) {
  return state.option.txId;
};
var selectAccountDetailsModal = function selectAccountDetailsModal(state) {
  return state.option.accountDetailsModal;
};
var selectUseFIAT = function selectUseFIAT(state) {
  return state.option.useFIAT;
};
var selectBankDetails = function selectBankDetails(state) {
  return state.option.bankDetails;
};
var selectSignature = function selectSignature(state) {
  return state.option.signature;
};
var selectUuid = function selectUuid(state) {
  return state.option.uuid;
};
var selectKycStatus = function selectKycStatus(state) {
  return state.option.kycStatus;
};

var stepInfo = [{
  title: 'Initialize'
}, {
  title: 'Source Transfer'
}, {
  title: 'Validation'
}, {
  title: 'Target Transfer'
}, {
  title: 'Finalize'
}];
var Progressbar = function Progressbar(_ref) {
  var step = _ref.step,
    errorStep = _ref.errorStep,
    setFocus = _ref.setFocus,
    loadingStep = _ref.loadingStep;
  var theme = reactRedux.useSelector(selectTheme);
  return React__default.createElement("div", {
    className: 'kima-progressbar'
  }, React__default.createElement("div", {
    className: "value step-" + step * 100 / 4
  }), React__default.createElement("div", {
    className: 'step-indicators'
  }, stepInfo.map(function (item, index) {
    return React__default.createElement("div", {
      key: item.title,
      className: "step " + (step === index && 'active') + " \n                  " + (step >= index ? index === errorStep ? 'error' : 'completed' : '') + " \n                  " + (step < index && 'locked') + " " + theme.colorMode,
      onClick: function onClick() {
        if (index < 4) setFocus(index);
      }
    }, React__default.createElement("div", {
      className: 'step-info'
    }, step < index && React__default.createElement(Lock, null), step >= index ? index === loadingStep ? React__default.createElement(Loader, {
      className: 'loader'
    }) : index === errorStep ? React__default.createElement(Warning, null) : React__default.createElement(Check, null) : null, React__default.createElement("span", null, item.title)));
  })));
};

var ExternalLink = function ExternalLink(_ref) {
  var to = _ref.to,
    children = _ref.children,
    className = _ref.className,
    rest = _ref.rest;
  return React__default.createElement("a", Object.assign({
    className: className,
    href: to,
    target: '_blank',
    rel: 'noreferrer noopener'
  }, rest), children);
};

var NetworkLabel = function NetworkLabel(_ref) {
  var sourceChain = _ref.sourceChain,
    targetChain = _ref.targetChain;
  var theme = reactRedux.useSelector(selectTheme);
  var SourceInfo = getNetworkOption(sourceChain);
  var TargetInfo = getNetworkOption(targetChain);
  return React__default.createElement("div", {
    className: 'header-network-labels'
  }, (SourceInfo === null || SourceInfo === void 0 ? void 0 : SourceInfo.label) && React__default.createElement("span", {
    className: "kima-card-network-label " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'icon'
  }, React__default.createElement(SourceInfo.icon, null)), React__default.createElement("p", null, SourceInfo.label)), (SourceInfo === null || SourceInfo === void 0 ? void 0 : SourceInfo.label) && (TargetInfo === null || TargetInfo === void 0 ? void 0 : TargetInfo.label) && React__default.createElement("div", {
    className: 'arrow'
  }, React__default.createElement(Arrow, null)), (TargetInfo === null || TargetInfo === void 0 ? void 0 : TargetInfo.label) && React__default.createElement("span", {
    className: "kima-card-network-label " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'icon'
  }, React__default.createElement(TargetInfo.icon, null)), React__default.createElement("p", null, TargetInfo.label)));
};

var Loading180Ring = function Loading180Ring(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 24 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 24 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'white' : _ref$fill;
  return React__default.createElement("svg", {
    width: width,
    height: height,
    fill: fill,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg'
  }, React__default.createElement("path", {
    d: 'M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z'
  }, React__default.createElement("animateTransform", {
    attributeName: 'transform',
    type: 'rotate',
    dur: '0.75s',
    values: '0 12 12;360 12 12',
    repeatCount: 'indefinite'
  })));
};

var PrimaryButton = function PrimaryButton(_ref) {
  var className = _ref.className,
    clickHandler = _ref.clickHandler,
    children = _ref.children,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    ref = _ref.ref;
  return React__default.createElement("div", {
    className: 'primary-button-wrapper'
  }, React__default.createElement("button", {
    className: "primary-button " + className,
    onClick: clickHandler,
    ref: ref,
    disabled: disabled
  }, isLoading && React__default.createElement("div", {
    className: 'loading-indicator'
  }, React__default.createElement(Loading180Ring, {
    width: 24,
    height: 24,
    fill: 'white'
  })), children));
};

var SecondaryButton = function SecondaryButton(_ref) {
  var className = _ref.className,
    clickHandler = _ref.clickHandler,
    children = _ref.children,
    theme = _ref.theme,
    style = _ref.style,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  return React__default.createElement("button", Object.assign({
    className: "secondary-button " + className + " " + theme,
    onClick: clickHandler
  }, style, {
    disabled: disabled
  }), children);
};

var fetchWrapper = {
  get: get,
  post: post
};
function get(url) {
  var requestOptions = {
    method: 'GET'
  };
  requestOptions.headers = {
    'Content-Type': 'application/json'
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function post(url, body) {
  var requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function handleResponse(response) {
  return response.text().then(function (text) {
    var data = text;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }
    if (!response.ok) {
      var error = data || response.statusText;
      return Promise.reject({
        status: response.status,
        error: error
      });
    }
    return data;
  });
}

function useNetworkOptions() {
  var dispatch = reactRedux.useDispatch();
  var useFIAT = reactRedux.useSelector(selectUseFIAT);
  var nodeProviderQuery = reactRedux.useSelector(selectNodeProviderQuery);
  var _useState = React.useState(networkOptions),
    options = _useState[0],
    setOptions = _useState[1];
  React.useEffect(function () {
    if (!nodeProviderQuery) return;
    (function () {
      try {
        var _temp = _catch(function () {
          return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/chain")).then(function (networks) {
            setOptions(networkOptions.filter(function (network) {
              return networks.Chain.findIndex(function (chain) {
                return chain.symbol === network.id && !chain.disabled;
              }) >= 0 || network.id === exports.SupportNetworks.FIAT && useFIAT;
            }));
            var tokenOptions = {};
            for (var _iterator = _createForOfIteratorHelperLoose(networks.Chain), _step; !(_step = _iterator()).done;) {
              var network = _step.value;
              for (var _iterator2 = _createForOfIteratorHelperLoose(network.tokens), _step2; !(_step2 = _iterator2()).done;) {
                var token = _step2.value;
                if (!tokenOptions[token.symbol]) {
                  tokenOptions[token.symbol] = {};
                }
                tokenOptions[token.symbol][network.symbol] = token.address;
              }
            }
            dispatch(setTokenOptions(tokenOptions));
          });
        }, function (e) {
          console.log('rpc disconnected', e);
          toast__default.error('rpc disconnected');
        });
        return _temp && _temp.then ? _temp.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery]);
  return React.useMemo(function () {
    return {
      options: options
    };
  }, [options]);
}

var SolanaWalletSelect = function SolanaWalletSelect() {
  var theme = reactRedux.useSelector(selectTheme);
  var dispatch = reactRedux.useDispatch();
  var sliderRef = React.useRef();
  var _useWallet = SolanaAdapter.useWallet(),
    wallets = _useWallet.wallets,
    select = _useWallet.select;
  var _useMemo = React.useMemo(function () {
      var detected = [];
      var undetected = [];
      for (var _iterator = _createForOfIteratorHelperLoose(wallets), _step; !(_step = _iterator()).done;) {
        var wallet = _step.value;
        if (wallet.readyState === walletAdapterBase.WalletReadyState.Installed || wallet.readyState === walletAdapterBase.WalletReadyState.Loadable) {
          detected.push(wallet);
        } else if (wallet.readyState === walletAdapterBase.WalletReadyState.NotDetected) {
          undetected.push(wallet);
        }
      }
      return [detected, undetected];
    }, [wallets]),
    detected = _useMemo[0],
    undetected = _useMemo[1];
  React.useEffect(function () {
    var _sliderRef$current, _sliderRef$current5, _sliderRef$current6, _sliderRef$current7;
    var isDown = false;
    var startX;
    var scrollLeft;
    (_sliderRef$current = sliderRef.current) === null || _sliderRef$current === void 0 ? void 0 : _sliderRef$current.addEventListener('mousedown', function (e) {
      var _sliderRef$current2, _sliderRef$current3, _sliderRef$current4;
      isDown = true;
      (_sliderRef$current2 = sliderRef.current) === null || _sliderRef$current2 === void 0 ? void 0 : _sliderRef$current2.classList.add('active');
      startX = e.pageX - ((_sliderRef$current3 = sliderRef.current) === null || _sliderRef$current3 === void 0 ? void 0 : _sliderRef$current3.offsetLeft);
      scrollLeft = (_sliderRef$current4 = sliderRef.current) === null || _sliderRef$current4 === void 0 ? void 0 : _sliderRef$current4.scrollLeft;
    });
    (_sliderRef$current5 = sliderRef.current) === null || _sliderRef$current5 === void 0 ? void 0 : _sliderRef$current5.addEventListener('mouseleave', function () {
      isDown = false;
      sliderRef.current.classList.remove('active');
    });
    (_sliderRef$current6 = sliderRef.current) === null || _sliderRef$current6 === void 0 ? void 0 : _sliderRef$current6.addEventListener('mouseup', function () {
      isDown = false;
      sliderRef.current.classList.remove('active');
    });
    (_sliderRef$current7 = sliderRef.current) === null || _sliderRef$current7 === void 0 ? void 0 : _sliderRef$current7.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - sliderRef.current.offsetLeft;
      var walk = (x - startX) * 1;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    });
  });
  var connectWallet = function connectWallet(walletName) {
    select(walletName);
    dispatch(setSolanaConnectModal(false));
  };
  return React__default.createElement("div", {
    className: "wallet-select"
  }, React__default.createElement("div", {
    className: 'slide-area hide-scrollbar',
    ref: sliderRef
  }, React__default.createElement("div", {
    className: 'wallet-container'
  }, detected.map(function (wallet, index) {
    return React__default.createElement("div", {
      className: "card-item " + theme.colorMode,
      onClick: function onClick() {
        return connectWallet(wallet.adapter.name);
      },
      key: wallet.adapter.name + "-" + index
    }, React__default.createElement("div", {
      className: 'wallet-item'
    }, React__default.createElement("img", {
      src: wallet.adapter.icon,
      alt: wallet.adapter.name
    }), React__default.createElement("span", null, wallet.adapter.name)));
  }), undetected.map(function (wallet, index) {
    return React__default.createElement(ExternalLink, {
      to: wallet.adapter.url,
      className: "card-item " + theme.colorMode,
      key: wallet.adapter.name + "-" + index
    }, React__default.createElement("div", {
      className: 'wallet-item'
    }, React__default.createElement("img", {
      src: wallet.adapter.icon,
      alt: wallet.adapter.name
    }), React__default.createElement("span", null, "Install ", wallet.adapter.name)));
  }))));
};

var WalletSelect = function WalletSelect() {
  var theme = reactRedux.useSelector(selectTheme);
  var sliderRef = React.useRef();
  var dispatch = reactRedux.useDispatch();
  var _useWallet = tronwalletAdapterReactHooks.useWallet(),
    wallets = _useWallet.wallets,
    select = _useWallet.select,
    currentWallet = _useWallet.wallet,
    connect = _useWallet.connect,
    connected = _useWallet.connected;
  var _useMemo = React.useMemo(function () {
      var detected = [];
      var undetected = [];
      for (var _iterator = _createForOfIteratorHelperLoose(wallets), _step; !(_step = _iterator()).done;) {
        var wallet = _step.value;
        if (wallet.state === tronwalletAbstractAdapter.AdapterState.Connected || wallet.state === tronwalletAbstractAdapter.AdapterState.Disconnect || wallet.state === tronwalletAbstractAdapter.AdapterState.Loading) {
          detected.push(wallet);
        } else if (wallet.state === tronwalletAbstractAdapter.AdapterState.NotFound) {
          undetected.push(wallet);
        }
      }
      return [detected, undetected];
    }, [wallets]),
    detected = _useMemo[0],
    undetected = _useMemo[1];
  React.useEffect(function () {
    var _sliderRef$current, _sliderRef$current5, _sliderRef$current6, _sliderRef$current7;
    var isDown = false;
    var startX;
    var scrollLeft;
    (_sliderRef$current = sliderRef.current) === null || _sliderRef$current === void 0 ? void 0 : _sliderRef$current.addEventListener('mousedown', function (e) {
      var _sliderRef$current2, _sliderRef$current3, _sliderRef$current4;
      isDown = true;
      (_sliderRef$current2 = sliderRef.current) === null || _sliderRef$current2 === void 0 ? void 0 : _sliderRef$current2.classList.add('active');
      startX = e.pageX - ((_sliderRef$current3 = sliderRef.current) === null || _sliderRef$current3 === void 0 ? void 0 : _sliderRef$current3.offsetLeft);
      scrollLeft = (_sliderRef$current4 = sliderRef.current) === null || _sliderRef$current4 === void 0 ? void 0 : _sliderRef$current4.scrollLeft;
    });
    (_sliderRef$current5 = sliderRef.current) === null || _sliderRef$current5 === void 0 ? void 0 : _sliderRef$current5.addEventListener('mouseleave', function () {
      isDown = false;
      sliderRef.current.classList.remove('active');
    });
    (_sliderRef$current6 = sliderRef.current) === null || _sliderRef$current6 === void 0 ? void 0 : _sliderRef$current6.addEventListener('mouseup', function () {
      isDown = false;
      sliderRef.current.classList.remove('active');
    });
    (_sliderRef$current7 = sliderRef.current) === null || _sliderRef$current7 === void 0 ? void 0 : _sliderRef$current7.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - sliderRef.current.offsetLeft;
      var walk = (x - startX) * 1;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    });
  });
  React.useEffect(function () {
    connected && dispatch(setTronConnectModal(false));
  }, [connected]);
  var connectWallet = function connectWallet(walletName) {
    try {
      var _temp2 = function _temp2(_connect) {
        _connect;
      };
      var _temp = (currentWallet === null || currentWallet === void 0 ? void 0 : currentWallet.adapter.name) === walletName;
      return Promise.resolve(_temp ? Promise.resolve(connect()).then(_temp2) : _temp2(select(walletName)));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return React__default.createElement("div", {
    className: "wallet-select"
  }, React__default.createElement("div", {
    className: 'slide-area hide-scrollbar',
    ref: sliderRef
  }, React__default.createElement("div", {
    className: 'wallet-container'
  }, detected.map(function (wallet, index) {
    return React__default.createElement("div", {
      className: "card-item " + theme.colorMode,
      onClick: function onClick() {
        return connectWallet(wallet.adapter.name);
      },
      key: wallet.adapter.name + "-" + index
    }, React__default.createElement("div", {
      className: 'wallet-item'
    }, React__default.createElement("img", {
      src: wallet.adapter.icon,
      alt: wallet.adapter.name
    }), React__default.createElement("span", null, wallet.adapter.name)));
  }), undetected.map(function (wallet, index) {
    return React__default.createElement(ExternalLink, {
      to: wallet.adapter.url,
      className: "card-item " + theme.colorMode,
      key: wallet.adapter.name + "-" + index
    }, React__default.createElement("div", {
      className: 'wallet-item'
    }, React__default.createElement("img", {
      src: wallet.adapter.icon,
      alt: wallet.adapter.name
    }), React__default.createElement("span", null, "Install ", wallet.adapter.name)));
  }))));
};

var createWalletStatus = function createWalletStatus(isReady, statusMessage, connectBitcoinWallet, walletAddress) {
  if (statusMessage === void 0) {
    statusMessage = '';
  }
  return {
    isReady: isReady,
    statusMessage: statusMessage,
    connectBitcoinWallet: connectBitcoinWallet,
    walletAddress: walletAddress
  };
};
function useIsWalletReady() {
  var dispatch = reactRedux.useDispatch();
  var autoSwitch = reactRedux.useSelector(selectWalletAutoConnect);
  var _useSolanaWallet = SolanaAdapter.useWallet(),
    solanaAddress = _useSolanaWallet.publicKey;
  var _useTronWallet = tronwalletAdapterReactHooks.useWallet(),
    tronAddress = _useTronWallet.address;
  var _useWeb3ModalProvider = react.useWeb3ModalProvider(),
    evmProvider = _useWeb3ModalProvider.walletProvider;
  var _useSwitchNetwork = react.useSwitchNetwork(),
    switchNetwork = _useSwitchNetwork.switchNetwork;
  var bitcoinAddress = reactRedux.useSelector(selectBitcoinAddress);
  var web3ModalAccountInfo = react.useWeb3ModalAccount();
  var _ref = web3ModalAccountInfo || {
      address: null,
      chainId: null,
      isConnected: null
    },
    evmAddress = _ref.address,
    evmChainId = _ref.chainId,
    isConnected = _ref.isConnected;
  var sourceChain = reactRedux.useSelector(selectSourceChain);
  var targetChain = reactRedux.useSelector(selectTargetChain);
  var networkOption = reactRedux.useSelector(selectNetworkOption);
  var targetNetworkFetching = reactRedux.useSelector(selectTargetChainFetching);
  var correctChain = React.useMemo(function () {
    if (sourceChain === exports.SupportNetworks.FIAT && !targetNetworkFetching) return targetChain;
    return sourceChain;
  }, [sourceChain, targetChain, targetNetworkFetching]);
  var hasEthInfo = isConnected && !!evmAddress;
  var errorHandler = reactRedux.useSelector(selectErrorHandler);
  var correctEvmNetwork = React.useMemo(function () {
    return networkOption === exports.NetworkOptions.mainnet ? CHAIN_NAMES_TO_IDS_MAINNET[correctChain] : CHAIN_NAMES_TO_IDS_TESTNET[correctChain];
  }, [networkOption, correctChain]);
  var hasCorrectEvmNetwork = evmChainId === correctEvmNetwork;
  var events = react.useWeb3ModalEvents();
  React.useEffect(function () {
    var _events$data, _events$data2;
    if (((_events$data = events.data) === null || _events$data === void 0 ? void 0 : _events$data.event) === 'SELECT_WALLET' || ((_events$data2 = events.data) === null || _events$data2 === void 0 ? void 0 : _events$data2.event) === 'CONNECT_SUCCESS') {
      var _events$data3, _events$data3$propert;
      localStorage.setItem('wallet', (_events$data3 = events.data) === null || _events$data3 === void 0 ? void 0 : (_events$data3$propert = _events$data3.properties) === null || _events$data3$propert === void 0 ? void 0 : _events$data3$propert.name);
    }
  }, [events]);
  var connectBitcoinWallet = React.useCallback(function () {
    try {
      return Promise.resolve(satsConnect.getAddress({
        payload: {
          purposes: [satsConnect.AddressPurpose.Payment],
          message: 'SATS Connect Demo',
          network: {
            type: satsConnect.BitcoinNetworkType.Testnet
          }
        },
        onFinish: function onFinish(response) {
          var paymentAddressItem = response.addresses.find(function (address) {
            return address.purpose === satsConnect.AddressPurpose.Payment;
          });
          dispatch(setBitcoinAddress((paymentAddressItem === null || paymentAddressItem === void 0 ? void 0 : paymentAddressItem.address) || ''));
          dispatch(setBitcoinPubkey((paymentAddressItem === null || paymentAddressItem === void 0 ? void 0 : paymentAddressItem.publicKey) || ''));
        },
        onCancel: function onCancel() {
          toast__default.error('Request cancelled');
        }
      })).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  }, [satsConnect.getAddress]);
  var forceNetworkSwitch = React.useCallback(function () {
    try {
      return Promise.resolve(function () {
        if (evmProvider && correctEvmNetwork) {
          if (!isEVMChain(correctChain)) {
            return;
          }
          return _catch(function () {
            var wallet = localStorage.getItem('wallet');
            if (wallet === 'Phantom' && correctEvmNetwork !== 11155111) return;
            return Promise.resolve(switchNetwork(correctEvmNetwork)).then(function () {});
          }, function (e) {
            errorHandler(e);
          });
        }
      }());
    } catch (e) {
      return Promise.reject(e);
    }
  }, [evmProvider, correctEvmNetwork, correctChain]);
  return React.useMemo(function () {
    var CHAIN_IDS_TO_NAMES = networkOption === exports.NetworkOptions.mainnet ? CHAIN_IDS_TO_NAMES_MAINNET : CHAIN_IDS_TO_NAMES_TESTNET;
    var SupportedChainId = networkOption === exports.NetworkOptions.mainnet ? SupportedChainIdMainnet : SupportedChainIdTestnet;
    if (correctChain === exports.SupportNetworks.SOLANA) {
      if (solanaAddress) {
        return createWalletStatus(true, undefined, connectBitcoinWallet, solanaAddress.toBase58());
      }
      return createWalletStatus(false, 'Wallet not connected', connectBitcoinWallet, '');
    } else if (correctChain === exports.SupportNetworks.TRON) {
      if (tronAddress) {
        return createWalletStatus(true, undefined, connectBitcoinWallet, tronAddress);
      }
      return createWalletStatus(false, 'Wallet not connected', connectBitcoinWallet, '');
    } else if (correctChain === exports.SupportNetworks.BTC) {
      if (bitcoinAddress) {
        return createWalletStatus(true, undefined, connectBitcoinWallet, bitcoinAddress);
      }
      return createWalletStatus(false, 'Xverse wallet not connected', connectBitcoinWallet, '');
    } else if (isEVMChain(correctChain) && hasEthInfo && evmAddress) {
      if (hasCorrectEvmNetwork) {
        return createWalletStatus(true, undefined, connectBitcoinWallet, evmAddress);
      } else {
        if (evmProvider && correctEvmNetwork) {
          if (autoSwitch) {
            forceNetworkSwitch();
          } else {
            dispatch(setSourceChain(CHAIN_IDS_TO_NAMES[evmChainId || SupportedChainId.ETHEREUM]));
            toast__default.success("Wallet connected to " + CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[evmChainId || SupportedChainId.ETHEREUM]]);
          }
        }
        if (evmChainId && autoSwitch) return createWalletStatus(false, "Wallet not connected to " + CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[correctEvmNetwork]], connectBitcoinWallet, evmAddress);
      }
    }
    return createWalletStatus(false, '', connectBitcoinWallet, undefined);
  }, [correctChain, autoSwitch, forceNetworkSwitch, connectBitcoinWallet, solanaAddress, tronAddress, hasEthInfo, correctEvmNetwork, hasCorrectEvmNetwork, bitcoinAddress, evmProvider, evmAddress, evmChainId, networkOption]);
}

var connectWalletBtn = 'connect-wallet-btn';

var abi = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_spender",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_from",
				type: "address"
			},
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			},
			{
				name: "_spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	}
];
var ERC20ABI = {
	abi: abi
};

function createAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, programId, associatedTokenProgramId) {
  if (programId === void 0) {
    programId = splToken.TOKEN_PROGRAM_ID;
  }
  if (associatedTokenProgramId === void 0) {
    associatedTokenProgramId = splToken.ASSOCIATED_TOKEN_PROGRAM_ID;
  }
  var keys = [{
    pubkey: payer,
    isSigner: true,
    isWritable: true
  }, {
    pubkey: associatedToken,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: owner,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: mint,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: web3_js.SystemProgram.programId,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: programId,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: web3_js.SYSVAR_RENT_PUBKEY,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: associatedTokenProgramId,
    data: Buffer.alloc(0)
  });
}

var getAccountInfo = function getAccountInfo(connection, address, commitment, programId) {
  if (programId === void 0) {
    programId = splToken.TOKEN_PROGRAM_ID;
  }
  try {
    return Promise.resolve(connection.getAccountInfo(address, commitment)).then(function (info) {
      if (!info) throw new Error('TokenAccountNotFoundError');
      if (!info.owner.equals(programId)) throw new Error('TokenInvalidAccountOwnerError');
      if (info.data.length != splToken.AccountLayout.span) throw new Error('TokenInvalidAccountSizeError');
      var rawAccount = splToken.AccountLayout.decode(Buffer.from(info.data));
      return {
        address: address,
        mint: rawAccount.mint,
        owner: rawAccount.owner,
        amount: rawAccount.amount,
        delegate: rawAccount.delegateOption ? rawAccount.delegate : null,
        delegatedAmount: rawAccount.delegatedAmount,
        isInitialized: rawAccount.state !== AccountState.Uninitialized,
        isFrozen: rawAccount.state === AccountState.Frozen,
        isNative: !!rawAccount.isNativeOption,
        rentExemptReserve: rawAccount.isNativeOption ? rawAccount.isNative : null,
        closeAuthority: rawAccount.closeAuthorityOption ? rawAccount.closeAuthority : null
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var AccountState;
(function (AccountState) {
  AccountState[AccountState["Uninitialized"] = 0] = "Uninitialized";
  AccountState[AccountState["Initialized"] = 1] = "Initialized";
  AccountState[AccountState["Frozen"] = 2] = "Frozen";
})(AccountState || (AccountState = {}));

var getAssociatedTokenAddress = function getAssociatedTokenAddress(mint, owner, allowOwnerOffCurve, programId, associatedTokenProgramId) {
  if (allowOwnerOffCurve === void 0) {
    allowOwnerOffCurve = false;
  }
  if (programId === void 0) {
    programId = splToken.TOKEN_PROGRAM_ID;
  }
  if (associatedTokenProgramId === void 0) {
    associatedTokenProgramId = splToken.ASSOCIATED_TOKEN_PROGRAM_ID;
  }
  try {
    if (!allowOwnerOffCurve && !web3_js.PublicKey.isOnCurve(owner.toBuffer())) throw new Error('TokenOwnerOffCurveError');
    return Promise.resolve(web3_js.PublicKey.findProgramAddress([owner.toBuffer(), programId.toBuffer(), mint.toBuffer()], associatedTokenProgramId)).then(function (_ref) {
      var address = _ref[0];
      return address;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var getOrCreateAssociatedTokenAccount = function getOrCreateAssociatedTokenAccount(connection, payer, mint, owner, signTransaction, allowOwnerOffCurve, commitment, programId, associatedTokenProgramId) {
  if (allowOwnerOffCurve === void 0) {
    allowOwnerOffCurve = false;
  }
  if (programId === void 0) {
    programId = splToken.TOKEN_PROGRAM_ID;
  }
  if (associatedTokenProgramId === void 0) {
    associatedTokenProgramId = splToken.ASSOCIATED_TOKEN_PROGRAM_ID;
  }
  try {
    return Promise.resolve(getAssociatedTokenAddress(mint, owner, allowOwnerOffCurve, programId, associatedTokenProgramId)).then(function (associatedToken) {
      var _exit = false;
      function _temp4(_result) {
        if (_exit) return _result;
        if (!account.mint.equals(mint)) throw Error('TokenInvalidMintError');
        if (!account.owner.equals(owner)) throw new Error('TokenInvalidOwnerError');
        return account;
      }
      var account;
      var _temp3 = _catch(function () {
        return Promise.resolve(getAccountInfo(connection, associatedToken, commitment, programId)).then(function (_getAccountInfo) {
          account = _getAccountInfo;
        });
      }, function (error) {
        var err = error;
        return function () {
          if (err.message === 'TokenAccountNotFoundError' || err.message === 'TokenInvalidAccountOwnerError') {
            var _temp2 = function _temp2() {
              return Promise.resolve(getAccountInfo(connection, associatedToken, commitment, programId)).then(function (_getAccountInfo2) {
                account = _getAccountInfo2;
              });
            };
            var _temp = _catch(function () {
              var transaction = new web3_js.Transaction().add(createAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, programId, associatedTokenProgramId));
              return Promise.resolve(connection.getRecentBlockhash()).then(function (blockHash) {
                return Promise.resolve(payer).then(function (_payer) {
                  transaction.feePayer = _payer;
                  return Promise.resolve(blockHash.blockhash).then(function (_blockHash$blockhash) {
                    transaction.recentBlockhash = _blockHash$blockhash;
                    return Promise.resolve(signTransaction(transaction)).then(function (signed) {
                      return Promise.resolve(connection.sendRawTransaction(signed.serialize())).then(function (signature) {
                        return Promise.resolve(connection.confirmTransaction(signature)).then(function () {});
                      });
                    });
                  });
                });
              });
            }, function () {});
            return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
          } else {
            throw error;
          }
        }();
      });
      return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var tronWebTestnet = new tronweb.TronWeb({
  fullHost: 'https://api.nileex.io'
});
var tronWebMainnet = new tronweb.TronWeb({
  fullHost: 'https://api.trongrid.io'
});
tronWebTestnet.setAddress(TRON_USDK_OWNER_ADDRESS);
tronWebMainnet.setAddress(TRON_USDK_OWNER_ADDRESS);

var formatterFloat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 9
});
function isEmptyObject(arg) {
  return typeof arg === 'object' && Object.keys(arg).length === 0;
}
var sleep = function sleep(delay) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, delay);
  });
};

function useBalance() {
  var _useState = React.useState(0),
    balance = _useState[0],
    setBalance = _useState[1];
  var web3ModalAccountInfo = react.useWeb3ModalAccount();
  var _ref = web3ModalAccountInfo || {
      address: null,
      chainId: null,
      isConnected: null
    },
    signerAddress = _ref.address,
    evmChainId = _ref.chainId;
  var _useWeb3ModalProvider = react.useWeb3ModalProvider(),
    walletProvider = _useWeb3ModalProvider.walletProvider;
  var selectedNetwork = reactRedux.useSelector(selectSourceChain);
  var errorHandler = reactRedux.useSelector(selectErrorHandler);
  var networkOption = reactRedux.useSelector(selectNetworkOption);
  var sourceChain = React.useMemo(function () {
    if (selectedNetwork === exports.SupportNetworks.SOLANA || selectedNetwork === exports.SupportNetworks.TRON || selectedNetwork === exports.SupportNetworks.BTC) return selectedNetwork;
    var CHAIN_NAMES_TO_IDS = networkOption === exports.NetworkOptions.mainnet ? CHAIN_NAMES_TO_IDS_MAINNET : CHAIN_NAMES_TO_IDS_TESTNET;
    var CHAIN_IDS_TO_NAMES = networkOption === exports.NetworkOptions.mainnet ? CHAIN_IDS_TO_NAMES_MAINNET : CHAIN_IDS_TO_NAMES_TESTNET;
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId];
    }
    return selectedNetwork;
  }, [selectedNetwork, evmChainId, networkOption]);
  var _useSolanaWallet = SolanaAdapter.useWallet(),
    solanaAddress = _useSolanaWallet.publicKey,
    signTransaction = _useSolanaWallet.signTransaction;
  var _useTronWallet = tronwalletAdapterReactHooks.useWallet(),
    tronAddress = _useTronWallet.address;
  var btcAddress = reactRedux.useSelector(selectBitcoinAddress);
  var _useConnection = SolanaAdapter.useConnection(),
    connection = _useConnection.connection;
  var kimaBackendUrl = reactRedux.useSelector(selectBackendUrl);
  var sourceCurrency = reactRedux.useSelector(selectSourceCurrency);
  var tokenOptions = reactRedux.useSelector(selectTokenOptions);
  var tokenAddress = React.useMemo(function () {
    if (isEmptyObject(tokenOptions) || sourceChain === exports.SupportNetworks.FIAT) return '';
    if (tokenOptions && typeof tokenOptions === 'object') {
      var coinOptions = tokenOptions[sourceCurrency];
      if (coinOptions && typeof coinOptions === 'object') {
        return tokenOptions[sourceCurrency][sourceChain];
      }
    }
    return '';
  }, [sourceCurrency, sourceChain, tokenOptions]);
  React.useEffect(function () {
    setBalance(0);
  }, [sourceChain]);
  React.useEffect(function () {
    (function () {
      try {
        var _exit = false;
        if (!tokenAddress) return;
        var tronWeb = networkOption === exports.NetworkOptions.mainnet ? tronWebMainnet : tronWebTestnet;
        return _catch(function () {
          function _temp6(_result4) {
            return _exit ? _result4 : function () {
              if (walletProvider) {
                var provider = new ethers.ethers.providers.Web3Provider(walletProvider);
                var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
                if (!tokenAddress || !signer || !signerAddress) return;
                var erc20Contract = new contracts.Contract(tokenAddress, ERC20ABI.abi, signer);
                return Promise.resolve(erc20Contract.decimals()).then(function (decimals) {
                  return Promise.resolve(erc20Contract.balanceOf(signerAddress)).then(function (userBalance) {
                    setBalance(+units.formatUnits(userBalance, decimals));
                  });
                });
              }
            }();
          }
          var _temp5 = function () {
            if (!isEVMChain(sourceChain)) {
              var _temp4 = function _temp4(_result) {
                var _exit2 = false;
                if (_exit) return _result;
                function _temp2(_result2) {
                  return _exit2 ? _result2 : function () {
                    if (sourceChain === exports.SupportNetworks.BTC && btcAddress) {
                      return Promise.resolve(fetchWrapper.get(kimaBackendUrl + "/btc/balance?address=" + btcAddress)).then(function (btcInfo) {
                        var balance = parseFloat(btcInfo.balance) / Math.pow(10, 8);
                        setBalance(balance);
                        _exit = true;
                      });
                    }
                  }();
                }
                var _temp = function () {
                  if (sourceChain === exports.SupportNetworks.TRON && tronAddress) {
                    return Promise.resolve(tronWeb.contract(ERC20ABI.abi, tokenAddress)).then(function (trc20Contract) {
                      return Promise.resolve(trc20Contract.decimals().call()).then(function (decimals) {
                        return Promise.resolve(trc20Contract.balanceOf(tronAddress).call()).then(function (userBalance) {
                          setBalance(+units.formatUnits(userBalance.balance, decimals));
                          _exit = true;
                        });
                      });
                    });
                  }
                }();
                return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
              };
              var _temp3 = function () {
                if (sourceChain === exports.SupportNetworks.SOLANA && solanaAddress && connection) {
                  var mint = new web3_js.PublicKey(tokenAddress);
                  return Promise.resolve(getOrCreateAssociatedTokenAccount(connection, solanaAddress, mint, solanaAddress, signTransaction)).then(function (fromTokenAccount) {
                    return Promise.resolve(connection.getParsedAccountInfo(fromTokenAccount.address)).then(function (accountInfo) {
                      var _accountInfo$value, _parsedAccountInfo$pa, _parsedAccountInfo$pa2, _parsedAccountInfo$pa3, _parsedAccountInfo$pa4, _parsedAccountInfo$pa5, _parsedAccountInfo$pa6;
                      var parsedAccountInfo = accountInfo === null || accountInfo === void 0 ? void 0 : (_accountInfo$value = accountInfo.value) === null || _accountInfo$value === void 0 ? void 0 : _accountInfo$value.data;
                      setBalance(+units.formatUnits((_parsedAccountInfo$pa = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa === void 0 ? void 0 : (_parsedAccountInfo$pa2 = _parsedAccountInfo$pa.info) === null || _parsedAccountInfo$pa2 === void 0 ? void 0 : (_parsedAccountInfo$pa3 = _parsedAccountInfo$pa2.tokenAmount) === null || _parsedAccountInfo$pa3 === void 0 ? void 0 : _parsedAccountInfo$pa3.amount, (_parsedAccountInfo$pa4 = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa4 === void 0 ? void 0 : (_parsedAccountInfo$pa5 = _parsedAccountInfo$pa4.info) === null || _parsedAccountInfo$pa5 === void 0 ? void 0 : (_parsedAccountInfo$pa6 = _parsedAccountInfo$pa5.tokenAmount) === null || _parsedAccountInfo$pa6 === void 0 ? void 0 : _parsedAccountInfo$pa6.decimals));
                      _exit = true;
                    });
                  });
                }
              }();
              return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
            }
          }();
          return _temp5 && _temp5.then ? _temp5.then(_temp6) : _temp6(_temp5);
        }, function (error) {
          errorHandler(error);
        });
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [signerAddress, tokenAddress, sourceChain, solanaAddress, tronAddress, btcAddress, walletProvider, networkOption]);
  return React.useMemo(function () {
    return {
      balance: balance
    };
  }, [balance]);
}

var useWidth = function useWidth() {
  var _useState = React.useState(0),
    width = _useState[0],
    setWidth = _useState[1];
  var updateWidth = function updateWidth(width) {
    setWidth(width);
  };
  React.useEffect(function () {
    var handleResize = function handleResize() {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return {
    width: width,
    updateWidth: updateWidth
  };
};

var getShortenedAddress = function getShortenedAddress(address) {
  var is0x = function is0x(addr) {
    return addr === null || addr === void 0 ? void 0 : addr.startsWith('0x');
  };
  return (address === null || address === void 0 ? void 0 : address.substring(0, is0x(address) ? 6 : 4)) + "..." + (address === null || address === void 0 ? void 0 : address.substr(address.length - (is0x(address) ? 8 : 5)));
};

var WalletButton = function WalletButton(_ref) {
  var _ref$errorBelow = _ref.errorBelow,
    errorBelow = _ref$errorBelow === void 0 ? false : _ref$errorBelow;
  var dispatch = reactRedux.useDispatch();
  var theme = reactRedux.useSelector(selectTheme);
  var selectedCoin = reactRedux.useSelector(selectSourceCurrency);
  var sourceCompliant = reactRedux.useSelector(selectSourceCompliant);
  var compliantOption = reactRedux.useSelector(selectCompliantOption);
  var selectedNetwork = reactRedux.useSelector(selectSourceChain);
  var _useSolanaWallet = SolanaAdapter.useWallet(),
    isSolanaConnected = _useSolanaWallet.connected;
  var _useTronWallet = tronwalletAdapterReactHooks.useWallet(),
    isTronConnected = _useTronWallet.connected;
  var _useIsWalletReady = useIsWalletReady(),
    isReady = _useIsWalletReady.isReady,
    statusMessage = _useIsWalletReady.statusMessage,
    walletAddress = _useIsWalletReady.walletAddress,
    connectBitcoinWallet = _useIsWalletReady.connectBitcoinWallet;
  var _useBalance = useBalance(),
    balance = _useBalance.balance;
  var _useWeb3Modal = react.useWeb3Modal(),
    open = _useWeb3Modal.open;
  var _useWidth = useWidth(),
    width = _useWidth.width,
    updateWidth = _useWidth.updateWidth;
  React.useEffect(function () {
    if (width === 0) {
      updateWidth(window.innerWidth);
    }
  }, []);
  var handleClick = function handleClick() {
    try {
      console.info('Handling click');
      console.info('Handling click: Case', 1);
      if (selectedNetwork === exports.SupportNetworks.SOLANA) {
        isSolanaConnected ? dispatch(setAccountDetailsModal(true)) : dispatch(setSolanaConnectModal(true));
        return Promise.resolve();
      }
      console.info('Handling click: Case', 2);
      if (selectedNetwork === exports.SupportNetworks.TRON) {
        isTronConnected ? dispatch(setAccountDetailsModal(true)) : dispatch(setTronConnectModal(true));
        return Promise.resolve();
      }
      console.info('Handling click: Case', 3);
      if (selectedNetwork === exports.SupportNetworks.BTC) {
        connectBitcoinWallet();
        return Promise.resolve();
      }
      console.info('Handling click: Case', 4);
      return Promise.resolve(open()).then(function () {
        var _temp = _catch(function () {
          console.info('Attempting to open Web3Modal');
          return Promise.resolve(open()).then(function () {
            console.info('Web3Modal opened successfully');
          });
        }, function (error) {
          console.error('Failed to open Web3Modal', error);
        });
        if (_temp && _temp.then) return _temp.then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var errorMessage = React.useMemo(function () {
    if (!isReady) return statusMessage;
    if (sourceCompliant !== 'low' && compliantOption) return "Source address has " + sourceCompliant + " risk";
    return '';
  }, [isReady, statusMessage, sourceCompliant, compliantOption]);
  React.useEffect(function () {
    if (!errorMessage) return;
    toast.toast.error(errorMessage);
  }, [errorMessage]);
  return React__default.createElement("div", {
    className: "wallet-button " + (isReady ? 'connected' : 'disconnected') + " " + theme.colorMode + " " + (errorBelow ? 'error-below' : ''),
    "data-testid": connectWalletBtn
  }, React__default.createElement("button", {
    className: (isReady ? 'connected' : 'disconnected') + " " + (width < 640 && 'shortened') + " " + theme.colorMode,
    onClick: handleClick
  }, isReady ? width >= 640 ? "" + (walletAddress || '') : getShortenedAddress(walletAddress || '') : '', !isReady && React__default.createElement(Wallet, null), !isReady && 'Connect Wallet'), isReady ? React__default.createElement("p", {
    className: 'balance-info'
  }, balance.toFixed(selectedCoin === 'WBTC' ? 8 : 2), ' ', selectedNetwork === exports.SupportNetworks.BTC ? 'BTC' : selectedCoin, " available") : null);
};

function useCurrencyOptions() {
  var dispatch = reactRedux.useDispatch();
  var _useState = React.useState(['USDK']),
    tokenList = _useState[0],
    setTokenList = _useState[1];
  var mode = reactRedux.useSelector(selectMode);
  var transactionOption = reactRedux.useSelector(selectTransactionOption);
  var nodeProviderQuery = reactRedux.useSelector(selectNodeProviderQuery);
  var originNetwork = reactRedux.useSelector(selectSourceChain);
  var targetNetwork = reactRedux.useSelector(selectTargetChain);
  var dAppOption = reactRedux.useSelector(selectDappOption);
  React.useEffect(function () {
    if (!nodeProviderQuery || !originNetwork || !targetNetwork || !transactionOption && mode === exports.ModeOptions.payment) return;
    (function () {
      try {
        return _catch(function () {
          if (originNetwork === exports.SupportNetworks.FIAT || targetNetwork === exports.SupportNetworks.FIAT) {
            dispatch(setSourceCurrency('KEUR'));
            dispatch(setTargetCurrency('KEUR'));
            return;
          }
          return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_currencies/" + originNetwork + "/" + targetNetwork)).then(function (coins) {
            var _tokenList = coins.Currencies.map(function (coin) {
              return coin.toUpperCase();
            }) || ['USDK'];
            if (originNetwork === exports.SupportNetworks.BTC || targetNetwork === exports.SupportNetworks.BTC) {
              _tokenList = ['WBTC'];
            }
            if (transactionOption !== null && transactionOption !== void 0 && transactionOption.currency && _tokenList.findIndex(function (item) {
              return item === transactionOption.currency;
            }) >= 0) {
              dispatch(setSourceCurrency(transactionOption.currency));
              dispatch(setTargetCurrency(transactionOption.currency));
            } else {
              dispatch(setSourceCurrency(_tokenList[0]));
              dispatch(setTargetCurrency(_tokenList[0]));
            }
            if (dAppOption !== exports.DAppOptions.None) {
              setTokenList([(transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.currency) || 'USDK']);
            } else {
              setTokenList(_tokenList);
            }
          });
        }, function (e) {
          console.log('rpc disconnected', e);
          toast__default.error('rpc disconnected');
        });
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery, originNetwork, targetNetwork, transactionOption, mode, dAppOption]);
  return React.useMemo(function () {
    return {
      tokenList: tokenList
    };
  }, [tokenList]);
}

var CoinDropdown = function CoinDropdown(_ref) {
  var _ref$isSourceChain = _ref.isSourceChain,
    isSourceChain = _ref$isSourceChain === void 0 ? true : _ref$isSourceChain;
  var ref = React.useRef();
  var dispatch = reactRedux.useDispatch();
  var _useState = React.useState(true),
    collapsed = _useState[0],
    setCollapsed = _useState[1];
  var sourceCurrency = reactRedux.useSelector(selectSourceCurrency);
  var targetCurrency = reactRedux.useSelector(selectTargetCurrency);
  var _useCurrencyOptions = useCurrencyOptions(),
    tokenList = _useCurrencyOptions.tokenList;
  var theme = reactRedux.useSelector(selectTheme);
  var Icon = React.useMemo(function () {
    var _COIN_LIST;
    var selectedCoin = isSourceChain ? sourceCurrency : targetCurrency;
    return ((_COIN_LIST = COIN_LIST[selectedCoin || 'USDK']) === null || _COIN_LIST === void 0 ? void 0 : _COIN_LIST.icon) || COIN_LIST['USDK'].icon;
  }, [sourceCurrency, targetCurrency, isSourceChain]);
  React.useEffect(function () {
    var bodyMouseDowntHandler = function bodyMouseDowntHandler(e) {
      if (ref !== null && ref !== void 0 && ref.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener('mousedown', bodyMouseDowntHandler);
    return function () {
      document.removeEventListener('mousedown', bodyMouseDowntHandler);
    };
  }, [setCollapsed]);
  return React__default.createElement("div", {
    className: "coin-dropdown " + theme.colorMode + " " + (collapsed ? 'collapsed' : 'toggled'),
    onClick: function onClick() {
      return setCollapsed(function (prev) {
        return !prev;
      });
    },
    ref: ref
  }, React__default.createElement("div", {
    className: 'coin-wrapper'
  }, React__default.createElement(Icon, null), isSourceChain ? sourceCurrency : targetCurrency), React__default.createElement("div", {
    className: "coin-menu " + theme.colorMode + " " + (collapsed ? 'collapsed' : 'toggled')
  }, tokenList.map(function (token) {
    var _COIN_LIST$token, _COIN_LIST$token4;
    var CoinIcon = COIN_LIST[token].icon || COIN_LIST['USDK'].icon;
    return React__default.createElement("div", {
      className: "coin-item " + theme.colorMode,
      key: (_COIN_LIST$token = COIN_LIST[token]) === null || _COIN_LIST$token === void 0 ? void 0 : _COIN_LIST$token.symbol,
      onClick: function onClick() {
        if (isSourceChain) {
          var _COIN_LIST$token2;
          dispatch(setSourceCurrency((_COIN_LIST$token2 = COIN_LIST[token]) === null || _COIN_LIST$token2 === void 0 ? void 0 : _COIN_LIST$token2.symbol));
        } else {
          var _COIN_LIST$token3;
          dispatch(setTargetCurrency((_COIN_LIST$token3 = COIN_LIST[token]) === null || _COIN_LIST$token3 === void 0 ? void 0 : _COIN_LIST$token3.symbol));
        }
      }
    }, React__default.createElement(CoinIcon, null), React__default.createElement("p", null, (_COIN_LIST$token4 = COIN_LIST[token]) === null || _COIN_LIST$token4 === void 0 ? void 0 : _COIN_LIST$token4.symbol));
  })), React__default.createElement("div", {
    className: "dropdown-icon " + (collapsed ? 'toggled' : 'collapsed')
  }, React__default.createElement(Arrow, {
    fill: 'none'
  })));
};

var NetworkDropdown = React__default.memo(function (_ref) {
  var _ref$isSourceChain = _ref.isSourceChain,
    isSourceChain = _ref$isSourceChain === void 0 ? true : _ref$isSourceChain;
  var _useState = React.useState(true),
    collapsed = _useState[0],
    setCollapsed = _useState[1];
  var _useState2 = React.useState([]),
    availableNetworks = _useState2[0],
    setAvailableNetworks = _useState2[1];
  var ref = React.useRef();
  var sourceChangeRef = React.useRef(false);
  var mode = reactRedux.useSelector(selectMode);
  var autoSwitchChain = reactRedux.useSelector(selectWalletAutoConnect);
  var useFIAT = reactRedux.useSelector(selectUseFIAT);
  var dAppOption = reactRedux.useSelector(selectDappOption);
  var originNetwork = reactRedux.useSelector(selectSourceChain);
  var targetNetwork = reactRedux.useSelector(selectTargetChain);
  var nodeProviderQuery = reactRedux.useSelector(selectNodeProviderQuery);
  var _useNetworkOptions = useNetworkOptions(),
    networkOptions = _useNetworkOptions.options;
  var selectedNetwork = React.useMemo(function () {
    var index = networkOptions.findIndex(function (option) {
      return option.id === (isSourceChain ? originNetwork : targetNetwork);
    });
    if (index >= 0) return networkOptions[index];
    return networkOptions[3];
  }, [originNetwork, targetNetwork, networkOptions]);
  var networks = React.useMemo(function () {
    if (isSourceChain && mode === exports.ModeOptions.bridge) {
      return networkOptions;
    }
    return networkOptions.filter(function (network) {
      return availableNetworks.findIndex(function (id) {
        return id === network.id;
      }) >= 0;
    });
  }, [networkOptions, isSourceChain, availableNetworks, dAppOption, originNetwork]);
  var theme = reactRedux.useSelector(selectTheme);
  var dispatch = reactRedux.useDispatch();
  React.useEffect(function () {
    if (!nodeProviderQuery || mode !== exports.ModeOptions.bridge) return;
    (function () {
      try {
        var _temp3 = _catch(function () {
          function _temp2() {
            setAvailableNetworks(chains);
            if (isSourceChain && !targetNetwork) {
              dispatch(setTargetChain(chains[0]));
            }
            if (sourceChangeRef.current) {
              sourceChangeRef.current = false;
              dispatch(setTargetChain(chains.findIndex(function (chain) {
                return chain === targetNetwork;
              }) < 0 || targetNetwork === originNetwork ? chains[0] : targetNetwork));
              dispatch(setTargetChainFetching(false));
            }
          }
          var chains = [];
          var _temp = function () {
            if (originNetwork === exports.SupportNetworks.FIAT) {
              chains = [exports.SupportNetworks.ETHEREUM, exports.SupportNetworks.POLYGON];
            } else {
              return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_available_chains/" + originNetwork)).then(function (networks) {
                chains = networks.Chains;
                if (useFIAT) chains.push(exports.SupportNetworks.FIAT);
              });
            }
          }();
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        }, function (e) {
          console.log('rpc disconnected', e);
          toast__default.error('rpc disconnected');
        });
        return _temp3 && _temp3.then ? _temp3.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery, originNetwork, targetNetwork, mode, isSourceChain, useFIAT]);
  React.useEffect(function () {
    if (!nodeProviderQuery || mode !== exports.ModeOptions.payment) return;
    (function () {
      try {
        return _catch(function () {
          if (dAppOption === exports.DAppOptions.LPAdd || dAppOption === exports.DAppOptions.LPDrain) {
            setAvailableNetworks([targetNetwork]);
          } else {
            if (targetNetwork === exports.SupportNetworks.FIAT) {
              setAvailableNetworks([exports.SupportNetworks.ETHEREUM, exports.SupportNetworks.POLYGON]);
              return;
            }
            return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_available_chains/" + targetNetwork)).then(function (networks) {
              setAvailableNetworks(networks.Chains);
            });
          }
        }, function (e) {
          console.log('rpc disconnected', e);
          toast__default.error('rpc disconnected');
        });
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery, mode, targetNetwork, dAppOption]);
  React.useEffect(function () {
    var bodyMouseDowntHandler = function bodyMouseDowntHandler(e) {
      if (ref !== null && ref !== void 0 && ref.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener('mousedown', bodyMouseDowntHandler);
    return function () {
      document.removeEventListener('mousedown', bodyMouseDowntHandler);
    };
  }, [setCollapsed]);
  return React__default.createElement("div", {
    className: "network-dropdown " + theme.colorMode + " " + (collapsed ? 'collapsed' : 'toggled'),
    onClick: function onClick() {
      if (!autoSwitchChain && isSourceChain) return;
      setCollapsed(function (prev) {
        return !prev;
      });
    },
    ref: ref
  }, React__default.createElement("div", {
    className: 'network-wrapper'
  }, React__default.createElement("div", {
    className: 'icon'
  }, React__default.createElement(selectedNetwork.icon, null)), React__default.createElement("span", null, selectedNetwork.label)), React__default.createElement("div", {
    className: "network-menu " + (networks.length > 1 && 'custom-scrollbar') + " " + theme.colorMode + " " + (collapsed ? 'collapsed' : 'toggled')
  }, networks.map(function (network) {
    return React__default.createElement("div", {
      className: "network-menu-item " + theme.colorMode,
      key: network.label,
      onClick: function () {
        try {
          if (isSourceChain) {
            dispatch(setTargetChainFetching(true));
            dispatch(setSourceChain(network.id));
            sourceChangeRef.current = true;
          } else {
            dispatch(setTargetChain(network.id));
            dispatch(setServiceFee(-1));
          }
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, React__default.createElement("div", {
      className: 'icon'
    }, React__default.createElement(network.icon, null)), React__default.createElement("p", null, network.label));
  })), React__default.createElement("div", {
    className: "dropdown-icon " + (collapsed ? 'toggled' : 'collapsed')
  }, React__default.createElement(Arrow, {
    fill: 'none'
  })));
});

var ConfirmDetails = function ConfirmDetails(_ref) {
  var isApproved = _ref.isApproved;
  var feeDeduct = reactRedux.useSelector(selectFeeDeduct);
  var mode = reactRedux.useSelector(selectMode);
  var dAppOption = reactRedux.useSelector(selectDappOption);
  var theme = reactRedux.useSelector(selectTheme);
  var amount = reactRedux.useSelector(selectAmount);
  var serviceFee = reactRedux.useSelector(selectServiceFee);
  var originNetwork = reactRedux.useSelector(selectSourceChain);
  var targetNetwork = reactRedux.useSelector(selectTargetChain);
  var targetAddress = reactRedux.useSelector(selectTargetAddress);
  var bankDetails = reactRedux.useSelector(selectBankDetails);
  var signature = reactRedux.useSelector(selectSignature);
  var transactionOption = reactRedux.useSelector(selectTransactionOption);
  var _useIsWalletReady = useIsWalletReady(),
    walletAddress = _useIsWalletReady.walletAddress;
  var originNetworkOption = React.useMemo(function () {
    return networkOptions.filter(function (network) {
      return network.id === originNetwork;
    })[0];
  }, [networkOptions, originNetwork]);
  var targetNetworkOption = React.useMemo(function () {
    return networkOptions.filter(function (network) {
      return network.id === (mode === exports.ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain : targetNetwork);
    })[0];
  }, [networkOptions, originNetwork]);
  var sourceCurrency = reactRedux.useSelector(selectSourceCurrency);
  var targetCurrency = reactRedux.useSelector(selectTargetCurrency);
  var _useWidth = useWidth(),
    width = _useWidth.width,
    updateWidth = _useWidth.updateWidth;
  React.useEffect(function () {
    width === 0 && updateWidth(window.innerWidth);
  }, []);
  var SourceCoinIcon = COIN_LIST[sourceCurrency].icon || COIN_LIST['USDK'].icon;
  var TargetCoinIcon = COIN_LIST[targetCurrency].icon || COIN_LIST['USDK'].icon;
  var sourceWalletAddress = React.useMemo(function () {
    return width >= 916 ? walletAddress : getShortenedAddress(walletAddress || '');
  }, [walletAddress]);
  var targetWalletAddress = React.useMemo(function () {
    return getShortenedAddress((mode === exports.ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress : targetAddress) || '');
  }, [mode, transactionOption, targetAddress]);
  var amountToShow = React.useMemo(function () {
    if (originNetwork === exports.SupportNetworks.BTC || targetNetwork === exports.SupportNetworks.BTC) {
      return (feeDeduct ? +amount : +amount + serviceFee).toFixed(8);
    }
    return formatterFloat.format(feeDeduct ? +amount : +amount + serviceFee);
  }, [amount, serviceFee, originNetwork, targetNetwork, feeDeduct]);
  return React__default.createElement("div", {
    className: "confirm-details " + theme.colorMode
  }, React__default.createElement("p", null, "Step ", isApproved ? '2' : '1', "\xA0of 2\xA0\xA0\xA0", isApproved ? 'Submit transaction' : originNetwork === exports.SupportNetworks.FIAT ? 'Bank Details' : 'Approval'), originNetwork === exports.SupportNetworks.FIAT ? React__default.createElement("div", null, React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "IBAN:"), React__default.createElement("span", {
    className: "kima-card-network-label " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'icon'
  }, React__default.createElement(originNetworkOption.icon, null)), "FIAT"), React__default.createElement("p", null, "ES6621000418401234567891")), React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "Recipient:"), React__default.createElement("p", null, "Kima Sandbox")), React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "BIC:"), React__default.createElement("p", null, "CAIXESBBXXX")), React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "Description:"), React__default.createElement("p", {
    className: 'signature'
  }, signature))) : React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "Source wallet:"), React__default.createElement("div", {
    className: 'network-details'
  }, React__default.createElement("div", {
    className: 'kima-card-network-container'
  }, React__default.createElement("span", {
    className: "kima-card-network-label " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'icon'
  }, React__default.createElement(originNetworkOption.icon, null)), originNetworkOption.label)), React__default.createElement("p", {
    className: theme.colorMode
  }, width >= 916 ? dAppOption === exports.DAppOptions.LPDrain ? targetAddress : walletAddress : dAppOption === exports.DAppOptions.LPDrain ? targetWalletAddress : sourceWalletAddress))), React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "Amount:"), React__default.createElement("span", {
    className: 'amount-container'
  }, React__default.createElement(SourceCoinIcon, null), " ", '   ', amountToShow, " ", sourceCurrency, " \u2192 ", React__default.createElement(TargetCoinIcon, null), targetCurrency)), targetNetwork === exports.SupportNetworks.FIAT ? React__default.createElement("div", null, React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "IBAN:"), React__default.createElement("p", null, bankDetails.iban), React__default.createElement("span", {
    className: "kima-card-network-label " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'icon'
  }, React__default.createElement(targetNetworkOption.icon, null)), "FIAT")), React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "Recipient:"), React__default.createElement("p", null, bankDetails.recipient))) : React__default.createElement("div", {
    className: 'detail-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "Target wallet:"), React__default.createElement("div", {
    className: 'network-details'
  }, React__default.createElement("div", {
    className: 'kima-card-network-container'
  }, React__default.createElement("span", {
    className: "kima-card-network-label " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'icon'
  }, React__default.createElement(targetNetworkOption.icon, null)), targetNetworkOption.label)), React__default.createElement("p", {
    className: theme.colorMode
  }, width >= 916 ? dAppOption === exports.DAppOptions.LPDrain ? walletAddress : targetAddress : dAppOption === exports.DAppOptions.LPDrain ? sourceWalletAddress : targetWalletAddress))));
};

var AddressInput = function AddressInput(_ref) {
  var theme = _ref.theme,
    placeholder = _ref.placeholder;
  var dispatch = reactRedux.useDispatch();
  var targetAddress = reactRedux.useSelector(selectTargetAddress);
  return React__default.createElement("input", {
    className: "kima-address-input " + theme,
    type: 'text',
    placeholder: placeholder,
    value: targetAddress,
    onChange: function onChange(e) {
      return dispatch(setTargetAddress(e.target.value));
    }
  });
};

var CustomCheckbox = function CustomCheckbox(_ref) {
  var text = _ref.text,
    checked = _ref.checked,
    setCheck = _ref.setCheck;
  var theme = reactRedux.useSelector(selectTheme);
  return React__default.createElement("div", {
    className: 'kima-custom-checkbox'
  }, React__default.createElement("div", {
    className: 'custom-checkbox-content',
    onClick: function onClick() {
      return setCheck(!checked);
    }
  }, React__default.createElement("div", {
    className: "custom-checkbox-icon-wrapper " + theme.colorMode
  }, checked && React__default.createElement(Check, null)), React__default.createElement("span", null, text)));
};

var CopyButton = function CopyButton(_ref) {
  var text = _ref.text;
  var _useState = React.useState(false),
    copyClicked = _useState[0],
    setCopyClicked = _useState[1];
  React.useEffect(function () {
    if (!copyClicked) return;
    setTimeout(function () {
      setCopyClicked(false);
    }, 2000);
  }, [copyClicked]);
  return React__default.createElement("span", {
    className: 'copy-btn',
    onClick: function onClick() {
      setCopyClicked(true);
      navigator.clipboard.writeText(text);
    }
  }, copyClicked ? React__default.createElement(Check, null) : React__default.createElement(Copy, null));
};

var stepInfo$1 = [{
  title: 'Initialize'
}, {
  title: 'Source Transfer'
}, {
  title: 'Validation'
}, {
  title: 'Target Transfer'
}, {
  title: 'Finalize'
}];
var StepBox = function StepBox(_ref) {
  var step = _ref.step,
    errorStep = _ref.errorStep,
    loadingStep = _ref.loadingStep,
    data = _ref.data;
  var theme = reactRedux.useSelector(selectTheme);
  var explorerUrl = reactRedux.useSelector(selectKimaExplorer);
  var networkOption = reactRedux.useSelector(selectNetworkOption);
  var SourceInfo = getNetworkOption(data === null || data === void 0 ? void 0 : data.sourceChain);
  var TargetInfo = getNetworkOption(data === null || data === void 0 ? void 0 : data.targetChain);
  var CHAIN_NAMES_TO_EXPLORER = networkOption === exports.NetworkOptions.mainnet ? CHAIN_NAMES_TO_EXPLORER_MAINNET : CHAIN_NAMES_TO_EXPLORER_TESTNET;
  return React__default.createElement("div", {
    className: 'kima-stepbox'
  }, React__default.createElement("div", {
    className: "content-wrapper " + theme.colorMode
  }, stepInfo$1.map(function (item, index) {
    return React__default.createElement("div", {
      key: item.title,
      className: 'step-item'
    }, React__default.createElement("div", {
      className: "info-item\n                  " + (step >= index ? index === loadingStep ? 'active' : index === errorStep ? 'error' : 'completed' : '') + " \n                  " + (step < index && 'locked') + " " + theme.colorMode
    }, step < index && React__default.createElement(Lock, null), step >= index ? index === loadingStep ? React__default.createElement(Loader, {
      className: 'loader'
    }) : index === errorStep ? React__default.createElement(Warning, null) : React__default.createElement(Check, null) : null, React__default.createElement("p", null, item.title)), index === 0 && data !== null && data !== void 0 && data.kimaTxHash ? React__default.createElement("div", {
      className: "info-item " + theme.colorMode
    }, React__default.createElement("div", {
      className: 'icon'
    }, React__default.createElement(USDT$1, null)), React__default.createElement("p", {
      className: 'chain-name'
    }, "Kima TX ID:"), React__default.createElement("p", null, React__default.createElement(ExternalLink, {
      to: explorerUrl + "/transactions/" + (data === null || data === void 0 ? void 0 : data.kimaTxHash)
    }, getShortenedAddress((data === null || data === void 0 ? void 0 : data.kimaTxHash) || '')), React__default.createElement(CopyButton, {
      text: data === null || data === void 0 ? void 0 : data.kimaTxHash
    }))) : null, index === 1 && data !== null && data !== void 0 && data.tssPullHash ? React__default.createElement("div", {
      className: "info-item " + theme.colorMode + " source-chain"
    }, React__default.createElement("div", {
      className: 'icon'
    }, SourceInfo ? React__default.createElement(SourceInfo.icon, null) : React__default.createElement(Ethereum, null)), React__default.createElement("p", {
      className: 'chain-name'
    }, CHAIN_NAMES_TO_STRING[(data === null || data === void 0 ? void 0 : data.sourceChain) || exports.SupportNetworks.ETHEREUM], ' ', "TX ID:"), React__default.createElement("p", null, React__default.createElement(ExternalLink, {
      to: "https://" + CHAIN_NAMES_TO_EXPLORER[(data === null || data === void 0 ? void 0 : data.sourceChain) || exports.SupportNetworks.ETHEREUM] + "/" + ((data === null || data === void 0 ? void 0 : data.sourceChain) === exports.SupportNetworks.TRON ? 'transaction' : 'tx') + "/" + (data === null || data === void 0 ? void 0 : data.tssPullHash) + ((data === null || data === void 0 ? void 0 : data.sourceChain) === exports.SupportNetworks.SOLANA && networkOption === exports.NetworkOptions.testnet ? '?cluster=devnet' : '')
    }, getShortenedAddress((data === null || data === void 0 ? void 0 : data.tssPullHash) || '')), React__default.createElement(CopyButton, {
      text: (data === null || data === void 0 ? void 0 : data.tssPullHash) || ''
    }))) : null, index === 3 && data !== null && data !== void 0 && data.tssReleaseHash ? React__default.createElement("div", {
      className: "info-item " + theme.colorMode + " target-chain"
    }, React__default.createElement("div", {
      className: 'icon'
    }, TargetInfo ? React__default.createElement(TargetInfo.icon, null) : React__default.createElement(Ethereum, null)), React__default.createElement("p", {
      className: 'chain-name'
    }, CHAIN_NAMES_TO_STRING[(data === null || data === void 0 ? void 0 : data.targetChain) || exports.SupportNetworks.ETHEREUM], ' ', "TX ID:"), React__default.createElement("p", null, React__default.createElement(ExternalLink, {
      to: "https://" + CHAIN_NAMES_TO_EXPLORER[(data === null || data === void 0 ? void 0 : data.targetChain) || exports.SupportNetworks.ETHEREUM] + "/" + ((data === null || data === void 0 ? void 0 : data.targetChain) === exports.SupportNetworks.TRON ? 'transaction' : 'tx') + "/" + (data === null || data === void 0 ? void 0 : data.tssReleaseHash) + ((data === null || data === void 0 ? void 0 : data.targetChain) === exports.SupportNetworks.SOLANA && networkOption === exports.NetworkOptions.testnet ? '?cluster=devnet' : '')
    }, getShortenedAddress((data === null || data === void 0 ? void 0 : data.tssReleaseHash) || '')), React__default.createElement(CopyButton, {
      text: (data === null || data === void 0 ? void 0 : data.tssReleaseHash) || ''
    }))) : null);
  })));
};

var BankInput = function BankInput() {
  var dispatch = reactRedux.useDispatch();
  var theme = reactRedux.useSelector(selectTheme);
  var bankDetails = reactRedux.useSelector(selectBankDetails);
  return React__default.createElement("div", {
    className: 'bank-input'
  }, React__default.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React__default.createElement("span", {
    className: 'label'
  }, "IBAN:"), React__default.createElement("input", {
    className: 'kima-address-input',
    type: 'text',
    value: bankDetails.iban,
    onChange: function onChange(e) {
      return dispatch(setBankDetails(_extends({}, bankDetails, {
        iban: e.target.value
      })));
    }
  })), React__default.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React__default.createElement("span", {
    className: 'label'
  }, "Recipient:"), React__default.createElement("input", {
    className: 'kima-address-input',
    type: 'text',
    value: bankDetails.recipient,
    onChange: function onChange(e) {
      return dispatch(setBankDetails(_extends({}, bankDetails, {
        recipient: e.target.value
      })));
    }
  })));
};

var TxButton = function TxButton(_ref) {
  var theme = _ref.theme;
  var dispatch = reactRedux.useDispatch();
  var handleClick = function handleClick() {
    dispatch(setPendingTxPopup(true));
  };
  var txCount = reactRedux.useSelector(selectPendingTxs);
  return React__default.createElement("button", {
    className: "secondary-button tx-button " + theme.colorMode,
    onClick: handleClick
  }, txCount, React__default.createElement(Loading180Ring, {
    height: 16,
    width: 16,
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }));
};

var TransactionWidget = function TransactionWidget(_ref) {
  var theme = _ref.theme;
  var _useState = React.useState(0),
    step = _useState[0],
    setStep = _useState[1];
  var _useState2 = React.useState(-1),
    focus = _useState2[0],
    setFocus = _useState2[1];
  var _useState3 = React.useState(-1),
    errorStep = _useState3[0],
    setErrorStep = _useState3[1];
  var _useState4 = React.useState(''),
    errorMessage = _useState4[0],
    setErrorMessage = _useState4[1];
  var _useState5 = React.useState(-1),
    loadingStep = _useState5[0],
    setLoadingStep = _useState5[1];
  var _useState6 = React.useState(false),
    minimized = _useState6[0],
    setMinimized = _useState6[1];
  var _useState7 = React.useState(0),
    percent = _useState7[0],
    setPercent = _useState7[1];
  var _useState8 = React.useState(),
    data = _useState8[0],
    setData = _useState8[1];
  var dispatch = reactRedux.useDispatch();
  var txId = reactRedux.useSelector(selectTxId);
  var dAppOption = reactRedux.useSelector(selectDappOption);
  var closeHandler = reactRedux.useSelector(selectCloseHandler);
  var successHandler = reactRedux.useSelector(selectSuccessHandler);
  var graphqlProviderQuery = reactRedux.useSelector(selectGraphqlProviderQuery);
  React.useEffect(function () {
    if (!graphqlProviderQuery || txId < 0) return;
    var updateTxData = function updateTxData() {
      try {
        return Promise.resolve(_catch(function () {
          var data;
          var isLP = dAppOption === exports.DAppOptions.LPAdd || dAppOption === exports.DAppOptions.LPDrain;
          return Promise.resolve(fetchWrapper.post(graphqlProviderQuery, JSON.stringify({
            query: isLP ? "query TransactionDetailsKima($txId: String) {\n                  liquidity_transaction_data(where: { tx_id: { _eq: " + txId.toString() + " } }, limit: 1) {\n                    failreason\n                    pullfailcount\n                    pullhash\n                    releasefailcount\n                    releasehash\n                    txstatus\n                    amount\n                    creator\n                    chain\n                    providerchainaddress\n                    symbol\n                    tx_id\n                    kimahash\n                  }\n                }" : "query TransactionDetailsKima($txId: String) {\n                  transaction_data(where: { tx_id: { _eq: " + txId.toString() + " } }, limit: 1) {\n                    failreason\n                    pullfailcount\n                    pullhash\n                    releasefailcount\n                    releasehash\n                    txstatus\n                    amount\n                    creator\n                    originaddress\n                    originchain\n                    originsymbol\n                    targetsymbol\n                    targetaddress\n                    targetchain\n                    tx_id\n                    kimahash\n                  }\n                }"
          }))).then(function (result) {
            var _result$data, _result$data$liquidit, _result$data2, _result$data2$transac;
            if (isLP && !(result !== null && result !== void 0 && (_result$data = result.data) !== null && _result$data !== void 0 && (_result$data$liquidit = _result$data.liquidity_transaction_data) !== null && _result$data$liquidit !== void 0 && _result$data$liquidit.length) || !isLP && !(result !== null && result !== void 0 && (_result$data2 = result.data) !== null && _result$data2 !== void 0 && (_result$data2$transac = _result$data2.transaction_data) !== null && _result$data2$transac !== void 0 && _result$data2$transac.length)) {
              return;
            }
            if (isLP) {
              data = result === null || result === void 0 ? void 0 : result.data.liquidity_transaction_data[0];
            } else {
              data = result === null || result === void 0 ? void 0 : result.data.transaction_data[0];
            }
            console.log(data);
            if (!data) return;
            if (isLP) {
              setData({
                status: data.txstatus,
                sourceChain: data.chain,
                targetChain: data.chain,
                tssPullHash: dAppOption === exports.DAppOptions.LPAdd ? data.releasehash : '',
                tssReleaseHash: dAppOption === exports.DAppOptions.LPDrain ? data.releasehash : '',
                failReason: data.failreason,
                amount: +data.amount,
                sourceSymbol: data.symbol,
                targetSymbol: data.symbol,
                kimaTxHash: data.kimahash
              });
            } else {
              setData({
                status: data.txstatus,
                sourceChain: data.originchain,
                targetChain: data.targetchain,
                tssPullHash: data.pullhash,
                tssReleaseHash: data.releasehash,
                failReason: data.failreason,
                amount: +data.amount,
                sourceSymbol: data.originsymbol,
                targetSymbol: data.targetsymbol,
                kimaTxHash: data.kimahash
              });
            }
            if (data.status === TransactionStatus.COMPLETED) {
              clearInterval(timerId);
              setTimeout(function () {
                successHandler({
                  txId: txId
                });
              }, 3000);
            }
          });
        }, function (e) {
          toast.toast.error('rpc disconnected', {
            icon: React__default.createElement(Error$1, null)
          });
          console.log('rpc disconnected', e);
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    var timerId = setInterval(function () {
      updateTxData();
    }, 10000);
    updateTxData();
    return function () {
      clearInterval(timerId);
    };
  }, [graphqlProviderQuery, txId, dAppOption]);
  React.useEffect(function () {
    if (!data) {
      setStep(0);
      setLoadingStep(0);
      return;
    }
    console.log(data.status, errorMessage);
    setErrorStep(-1);
    var status = data.status;
    if (status === TransactionStatus.AVAILABLE || status === TransactionStatus.PULLED) {
      setStep(1);
      setPercent(25);
      setLoadingStep(1);
    } else if (status === TransactionStatus.CONFIRMED) {
      setStep(2);
      setPercent(50);
      setLoadingStep(2);
    } else if (status.startsWith(TransactionStatus.UNAVAILABLE)) {
      setStep(1);
      setPercent(25);
      setErrorStep(1);
      setLoadingStep(-1);
      console.log(data.failReason);
      toast.toast.error('Unavailable', {
        icon: React__default.createElement(Error$1, null)
      });
      setErrorMessage('Unavailable');
    } else if (status === TransactionStatus.KEYSIGNED) {
      setStep(3);
      setPercent(75);
      setLoadingStep(3);
    } else if (status === TransactionStatus.PAID) {
      setStep(3);
      setPercent(90);
      setLoadingStep(3);
    } else if (status === TransactionStatus.FAILEDTOPAY) {
      setStep(3);
      setPercent(90);
      setErrorStep(3);
      setLoadingStep(-1);
      console.log(data.failReason);
      toast.toast.error('Failed to release tokens to target!', {
        icon: React__default.createElement(Error$1, null)
      });
      setErrorMessage('Failed to release tokens to target!');
    } else if (status === TransactionStatus.FAILEDTOPULL) {
      setStep(1);
      setPercent(25);
      setErrorStep(1);
      setLoadingStep(-1);
      console.log(data.failReason);
      toast.toast.error('Failed to pull tokens from source!', {
        icon: React__default.createElement(Error$1, null)
      });
      setErrorMessage('Failed to pull tokens from source!');
    } else if (status === TransactionStatus.COMPLETED) {
      setStep(4);
      setPercent(100);
      setLoadingStep(-1);
    }
  }, [data === null || data === void 0 ? void 0 : data.status]);
  return React__default.createElement(reactRedux.Provider, {
    store: store
  }, React__default.createElement("div", {
    className: "kima-card transaction-card " + theme.colorMode + " " + (minimized ? 'minimized' : ''),
    style: {
      background: theme.colorMode === exports.ColorModeOptions.light ? theme.backgroundColorLight : theme.backgroundColorDark
    }
  }, React__default.createElement("div", {
    className: 'kima-card-header'
  }, React__default.createElement("div", {
    className: 'topbar'
  }, React__default.createElement("div", {
    className: 'title'
  }, React__default.createElement("h3", null, "Transferring ", formatterFloat.format((data === null || data === void 0 ? void 0 : data.amount) || 0), ' ', ((data === null || data === void 0 ? void 0 : data.sourceSymbol) || 'USDK') + " \u2192 " + ((data === null || data === void 0 ? void 0 : data.targetSymbol) || 'USDK'), "\xA0\xA0", "(" + percent + "%)")), !minimized ? React__default.createElement("div", {
    className: 'control-buttons'
  }, React__default.createElement("button", {
    className: 'icon-button minimize',
    onClick: function onClick() {
      setMinimized(true);
    }
  }, React__default.createElement(Minimize, null)), loadingStep < 0 ? React__default.createElement("button", {
    className: 'cross-icon-button',
    onClick: function onClick() {
      dispatch(initialize());
      closeHandler();
    }
  }, React__default.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  })) : null) : React__default.createElement("div", {
    className: 'control-buttons'
  }, React__default.createElement("div", {
    className: 'maximize',
    onClick: function onClick() {
      return setMinimized(false);
    }
  }, "View"))), !minimized && (data === null || data === void 0 ? void 0 : data.sourceChain) && (data === null || data === void 0 ? void 0 : data.targetChain) && React__default.createElement(NetworkLabel, {
    sourceChain: data === null || data === void 0 ? void 0 : data.sourceChain,
    targetChain: data === null || data === void 0 ? void 0 : data.targetChain
  })), React__default.createElement("div", {
    className: 'kima-card-content'
  }, React__default.createElement(Progressbar, {
    step: step,
    focus: focus,
    errorStep: errorStep,
    setFocus: setFocus,
    loadingStep: loadingStep
  }), React__default.createElement(StepBox, {
    step: step,
    errorStep: errorStep,
    loadingStep: loadingStep,
    data: data
  })), React__default.createElement(toast.Toaster, {
    position: 'top-right',
    reverseOrder: false,
    containerStyle: {
      position: 'absolute'
    },
    toastOptions: {
      duration: 10 * 1000,
      style: {
        position: 'relative',
        top: '3rem',
        right: '1.5rem',
        margin: '5px 0',
        padding: '.7rem 1.5rem',
        color: theme.colorMode === exports.ColorModeOptions.light ? 'black' : 'white',
        fontSize: '1em',
        borderRadius: '50px',
        border: '1px solid #B900004D',
        background: theme.colorMode === exports.ColorModeOptions.light ? '#F7F8F9' : '#242732'
      }
    }
  }), React__default.createElement("div", {
    className: 'floating-footer'
  }, React__default.createElement("div", {
    className: "items " + theme.colorMode
  }, React__default.createElement("span", null, "Powered by"), React__default.createElement(FooterLogo, {
    fill: 'black'
  }), React__default.createElement("strong", null, "Network")))));
};

var ExpireTimeDropdown = function ExpireTimeDropdown() {
  var ref = React.useRef();
  var dispatch = reactRedux.useDispatch();
  var _useState = React.useState(true),
    collapsed = _useState[0],
    setCollapsed = _useState[1];
  var expireTime = reactRedux.useSelector(selectExpireTime);
  var theme = reactRedux.useSelector(selectTheme);
  React.useEffect(function () {
    var bodyMouseDowntHandler = function bodyMouseDowntHandler(e) {
      if (ref !== null && ref !== void 0 && ref.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener('mousedown', bodyMouseDowntHandler);
    return function () {
      document.removeEventListener('mousedown', bodyMouseDowntHandler);
    };
  }, [setCollapsed]);
  return React__default.createElement("div", {
    className: "expire-time-dropdown " + theme.colorMode + " " + (collapsed ? 'collapsed' : ''),
    onClick: function onClick() {
      return setCollapsed(function (prev) {
        return !prev;
      });
    },
    ref: ref
  }, React__default.createElement("div", {
    className: 'expire-time-wrapper'
  }, React__default.createElement("p", null, expireTime)), React__default.createElement("div", {
    className: "expire-time-menu " + theme.colorMode + " " + (collapsed ? 'collapsed' : '')
  }, ExpireTimeOptions.map(function (option) {
    return React__default.createElement("p", {
      key: option,
      className: 'expire-time-item',
      onClick: function onClick() {
        dispatch(setExpireTime(option));
      }
    }, option);
  })));
};

var SingleForm = function SingleForm(_ref) {
  var _COIN_LIST;
  _objectDestructuringEmpty(_ref);
  var dispatch = reactRedux.useDispatch();
  var mode = reactRedux.useSelector(selectMode);
  var theme = reactRedux.useSelector(selectTheme);
  var feeDeduct = reactRedux.useSelector(selectFeeDeduct);
  var serviceFee = reactRedux.useSelector(selectServiceFee);
  var compliantOption = reactRedux.useSelector(selectCompliantOption);
  var targetCompliant = reactRedux.useSelector(selectTargetCompliant);
  var transactionOption = reactRedux.useSelector(selectTransactionOption);
  var sourceNetwork = reactRedux.useSelector(selectSourceChain);
  var targetNetwork = reactRedux.useSelector(selectTargetChain);
  var _useIsWalletReady = useIsWalletReady(),
    isReady = _useIsWalletReady.isReady;
  var _useState = React.useState(''),
    amountValue = _useState[0],
    setAmountValue = _useState[1];
  var amount = reactRedux.useSelector(selectAmount);
  var targetCurrency = reactRedux.useSelector(selectTargetCurrency);
  var TargetIcon = ((_COIN_LIST = COIN_LIST[targetCurrency || 'USDK']) === null || _COIN_LIST === void 0 ? void 0 : _COIN_LIST.icon) || COIN_LIST['USDK'].icon;
  var errorMessage = React.useMemo(function () {
    return compliantOption && targetCompliant !== 'low' ? "Target address has " + targetCompliant + " risk" : '';
  }, [compliantOption, targetCompliant]);
  React.useEffect(function () {
    if (!errorMessage) return;
    toast.toast.error(errorMessage);
  }, [errorMessage]);
  React.useEffect(function () {
    if (amountValue) return;
    setAmountValue(amount);
  }, [amount]);
  return React__default.createElement("div", {
    className: 'single-form'
  }, React__default.createElement("div", {
    className: 'form-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "Source Network:"), React__default.createElement("div", {
    className: 'items'
  }, React__default.createElement(NetworkDropdown, null), React__default.createElement(CoinDropdown, null))), React__default.createElement("div", {
    className: "dynamic-area " + (sourceNetwork === exports.SupportNetworks.FIAT ? 'reverse' : '')
  }, React__default.createElement("div", {
    className: "form-item wallet-button-item " + (isReady && 'connected')
  }, React__default.createElement("span", {
    className: 'label'
  }, "Connect wallet:"), React__default.createElement(WalletButton, null)), mode === exports.ModeOptions.bridge && React__default.createElement("div", {
    className: 'form-item'
  }, React__default.createElement("span", {
    className: 'label'
  }, "Target Network:"), React__default.createElement("div", {
    className: 'items'
  }, React__default.createElement(NetworkDropdown, {
    isSourceChain: false
  }), React__default.createElement(CoinDropdown, {
    isSourceChain: false
  })))), mode === exports.ModeOptions.bridge && sourceNetwork !== exports.SupportNetworks.FIAT ? targetNetwork === exports.SupportNetworks.FIAT ? React__default.createElement(BankInput, null) : React__default.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React__default.createElement("span", {
    className: 'label'
  }, "Target Address:"), React__default.createElement(AddressInput, {
    theme: theme.colorMode,
    placeholder: 'Input target address'
  })) : null, mode === exports.ModeOptions.bridge ? React__default.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React__default.createElement("span", {
    className: 'label'
  }, "Amount:"), React__default.createElement("div", {
    className: "amount-label-container items " + theme.colorMode
  }, React__default.createElement("input", {
    className: "" + theme.colorMode,
    type: 'number',
    placeholder: 'Amount',
    value: amountValue || '',
    onChange: function onChange(e) {
      var _amount = +e.target.value;
      var decimal = sourceNetwork === exports.SupportNetworks.BTC || targetNetwork === exports.SupportNetworks.BTC ? 8 : 2;
      setAmountValue(e.target.value);
      dispatch(setAmount(_amount.toFixed(decimal)));
    }
  }))) : React__default.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React__default.createElement("span", {
    className: 'label'
  }, "Amount:"), React__default.createElement("div", {
    className: "amount-label-container items " + theme.colorMode
  }, React__default.createElement("input", {
    className: "" + theme.colorMode,
    type: 'number',
    placeholder: 'Amount',
    value: (transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.amount) || amountValue || '',
    onChange: function onChange(e) {
      var _amount = +e.target.value;
      var decimal = sourceNetwork === exports.SupportNetworks.BTC || targetNetwork === exports.SupportNetworks.BTC ? 8 : 2;
      setAmountValue(e.target.value);
      dispatch(setAmount(_amount.toFixed(decimal)));
    },
    disabled: (transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.amount) !== undefined
  }), React__default.createElement("div", {
    className: "coin-wrapper " + theme.colorMode
  }, React__default.createElement(TargetIcon, null), targetCurrency))), mode === exports.ModeOptions.bridge && serviceFee > 0 ? React__default.createElement(CustomCheckbox, {
    text: sourceNetwork === exports.SupportNetworks.BTC ? "Deduct " + formatterFloat.format(serviceFee) + " BTC fee" : "Deduct $" + formatterFloat.format(serviceFee) + " fee",
    checked: feeDeduct,
    setCheck: function setCheck(value) {
      return dispatch(setFeeDeduct(value));
    }
  }) : null, sourceNetwork === exports.SupportNetworks.BTC || targetNetwork === exports.SupportNetworks.BTC ? React__default.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React__default.createElement("span", {
    className: 'label'
  }, "Expire Time:"), React__default.createElement(ExpireTimeDropdown, null)) : null);
};

function useServiceFee(isConfirming, feeURL) {
  if (isConfirming === void 0) {
    isConfirming = false;
  }
  var _useIsWalletReady = useIsWalletReady(),
    walletAddress = _useIsWalletReady.walletAddress,
    isReady = _useIsWalletReady.isReady;
  var dispatch = reactRedux.useDispatch();
  var serviceFee = reactRedux.useSelector(selectServiceFee);
  var mode = reactRedux.useSelector(selectMode);
  var amount_ = reactRedux.useSelector(selectAmount);
  var sourceChain = reactRedux.useSelector(selectSourceChain);
  var targetNetwork = reactRedux.useSelector(selectTargetChain);
  var targetAddress_ = reactRedux.useSelector(selectTargetAddress);
  var transactionOption = reactRedux.useSelector(selectTransactionOption);
  var targetChain = React.useMemo(function () {
    return mode === exports.ModeOptions.payment ? (transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain) || '' : targetNetwork;
  }, [transactionOption, mode, targetNetwork]);
  var targetAddress = React.useMemo(function () {
    return mode === exports.ModeOptions.payment ? (transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress) || '' : targetAddress_;
  }, [transactionOption, mode, targetAddress_]);
  var amount = React.useMemo(function () {
    return mode === exports.ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.amount : amount_;
  }, [transactionOption, mode, amount_]);
  var getServiceFee = function getServiceFee() {
    try {
      if (!sourceChain || !targetChain || !isReady || !walletAddress || !targetAddress || !amount) return Promise.resolve();
      return Promise.resolve(_catch(function () {
        if (sourceChain === exports.SupportNetworks.FIAT || targetChain === exports.SupportNetworks.FIAT) {
          dispatch(setServiceFee(0));
          return;
        }
        if (sourceChain === exports.SupportNetworks.BTC) {
          dispatch(setServiceFee(0.0004));
          return;
        }
        if (targetChain === exports.SupportNetworks.BTC) {
          dispatch(setServiceFee(0));
          return;
        }
        var sourceFee = 0;
        var targetFee = 0;
        return Promise.resolve(fetchWrapper.get(feeURL + "/fee/" + sourceChain)).then(function (sourceChainResult) {
          var _sourceChainResult$fe;
          sourceFee = sourceChainResult === null || sourceChainResult === void 0 ? void 0 : (_sourceChainResult$fe = sourceChainResult.fee) === null || _sourceChainResult$fe === void 0 ? void 0 : _sourceChainResult$fe.split('-')[0];
          return Promise.resolve(fetchWrapper.get(feeURL + "/fee/" + targetChain)).then(function (targetChainResult) {
            var _targetChainResult$fe;
            targetFee = targetChainResult === null || targetChainResult === void 0 ? void 0 : (_targetChainResult$fe = targetChainResult.fee) === null || _targetChainResult$fe === void 0 ? void 0 : _targetChainResult$fe.split('-')[0];
            var fee = +sourceFee + +targetFee;
            dispatch(setServiceFee(fee));
          });
        });
      }, function (e) {
        dispatch(setServiceFee(0));
        console.log('rpc disconnected', e);
        toast__default.error('rpc disconnected');
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  React.useEffect(function () {
    if (isConfirming) return;
    getServiceFee();
    var timerId = setInterval(function () {
      getServiceFee();
    }, 20 * 1000);
    return function () {
      clearInterval(timerId);
    };
  }, [sourceChain, targetChain, isReady, walletAddress, isConfirming, targetAddress, amount]);
  return React.useMemo(function () {
    return {
      serviceFee: serviceFee
    };
  }, [serviceFee]);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = {
  __proto__: null,
  'default': _nodeResolve_empty
};

var require$$0 = getCjsExportFromNamespace(_nodeResolve_empty$1);

var bn = createCommonjsModule(function (module) {
(function (module, exports) {

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
      Buffer = window.Buffer;
    } else {
      Buffer = require$$0.Buffer;
    }
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
      this.negative = 1;
    }

    if (start < number.length) {
      if (base === 16) {
        this._parseHex(number, start, endian);
      } else {
        this._parseBase(number, base, start);
        if (endian === 'le') {
          this._initArray(this.toArray(), base, endian);
        }
      }
    }
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [number & 0x3ffffff];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [0];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this._strip();
  };

  function parseHex4Bits (string, index) {
    var c = string.charCodeAt(index);
    // '0' - '9'
    if (c >= 48 && c <= 57) {
      return c - 48;
    // 'A' - 'F'
    } else if (c >= 65 && c <= 70) {
      return c - 55;
    // 'a' - 'f'
    } else if (c >= 97 && c <= 102) {
      return c - 87;
    } else {
      assert(false, 'Invalid character in ' + string);
    }
  }

  function parseHexByte (string, lowerBound, index) {
    var r = parseHex4Bits(string, index);
    if (index - 1 >= lowerBound) {
      r |= parseHex4Bits(string, index - 1) << 4;
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start, endian) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    // 24-bits chunks
    var off = 0;
    var j = 0;

    var w;
    if (endian === 'be') {
      for (i = number.length - 1; i >= start; i -= 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;
        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    } else {
      var parseLength = number.length - start;
      for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;
        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    }

    this._strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var b = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        b = c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        b = c - 17 + 0xa;

      // '0' - '9'
      } else {
        b = c;
      }
      assert(c >= 0 && b < mul, 'Invalid character');
      r += b;
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [0];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    this._strip();
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  function move (dest, src) {
    dest.words = src.words;
    dest.length = src.length;
    dest.negative = src.negative;
    dest.red = src.red;
  }

  BN.prototype._move = function _move (dest) {
    move(dest, this);
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype._strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  // Check Symbol.for because not everywhere where Symbol defined
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Browser_compatibility
  if (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function') {
    try {
      BN.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspect;
    } catch (e) {
      BN.prototype.inspect = inspect;
    }
  } else {
    BN.prototype.inspect = inspect;
  }

  function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  }

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modrn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16, 2);
  };

  if (Buffer) {
    BN.prototype.toBuffer = function toBuffer (endian, length) {
      return this.toArrayLike(Buffer, endian, length);
    };
  }

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  var allocate = function allocate (ArrayType, size) {
    if (ArrayType.allocUnsafe) {
      return ArrayType.allocUnsafe(size);
    }
    return new ArrayType(size);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    this._strip();

    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    var res = allocate(ArrayType, reqLength);
    var postfix = endian === 'le' ? 'LE' : 'BE';
    this['_toArrayLike' + postfix](res, byteLength);
    return res;
  };

  BN.prototype._toArrayLikeLE = function _toArrayLikeLE (res, byteLength) {
    var position = 0;
    var carry = 0;

    for (var i = 0, shift = 0; i < this.length; i++) {
      var word = (this.words[i] << shift) | carry;

      res[position++] = word & 0xff;
      if (position < res.length) {
        res[position++] = (word >> 8) & 0xff;
      }
      if (position < res.length) {
        res[position++] = (word >> 16) & 0xff;
      }

      if (shift === 6) {
        if (position < res.length) {
          res[position++] = (word >> 24) & 0xff;
        }
        carry = 0;
        shift = 0;
      } else {
        carry = word >>> 24;
        shift += 2;
      }
    }

    if (position < res.length) {
      res[position++] = carry;

      while (position < res.length) {
        res[position++] = 0;
      }
    }
  };

  BN.prototype._toArrayLikeBE = function _toArrayLikeBE (res, byteLength) {
    var position = res.length - 1;
    var carry = 0;

    for (var i = 0, shift = 0; i < this.length; i++) {
      var word = (this.words[i] << shift) | carry;

      res[position--] = word & 0xff;
      if (position >= 0) {
        res[position--] = (word >> 8) & 0xff;
      }
      if (position >= 0) {
        res[position--] = (word >> 16) & 0xff;
      }

      if (shift === 6) {
        if (position >= 0) {
          res[position--] = (word >> 24) & 0xff;
        }
        carry = 0;
        shift = 0;
      } else {
        carry = word >>> 24;
        shift += 2;
      }
    }

    if (position >= 0) {
      res[position--] = carry;

      while (position >= 0) {
        res[position--] = 0;
      }
    }
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] >>> wbit) & 0x01;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this._strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this._strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this._strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this._strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this._strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this._strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out._strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out._strip();
  }

  function jumboMulTo (self, num, out) {
    // Temporary disable, see https://github.com/indutny/bn.js/issues/211
    // var fftm = new FFTM();
    // return fftm.mulp(self, num, out);
    return bigMulTo(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;

    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return isNegNum ? this.ineg() : this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this._strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) ; else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this._strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this._strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) <= num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this._strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this._strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this._strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q._strip();
    }
    a._strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modrn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modrn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || (r2 === 1 && cmp === 0)) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modrn = function modrn (num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;

    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return isNegNum ? -acc : acc;
  };

  // WARNING: DEPRECATED
  BN.prototype.modn = function modn (num) {
    return this.modrn(num);
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;

    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    this._strip();
    return isNegNum ? this.ineg() : this;
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this._strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      if (r.strip !== undefined) {
        // r is a BN v4 instance
        r.strip();
      } else {
        // r is a BN v5 instance
        r._strip();
      }
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);

    move(a, a.umod(this.m)._forceRed(this));
    return a;
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})( module, commonjsGlobal);
});

var TokenInstruction;
(function (TokenInstruction) {
  TokenInstruction[TokenInstruction["InitializeMint"] = 0] = "InitializeMint";
  TokenInstruction[TokenInstruction["InitializeAccount"] = 1] = "InitializeAccount";
  TokenInstruction[TokenInstruction["InitializeMultisig"] = 2] = "InitializeMultisig";
  TokenInstruction[TokenInstruction["Transfer"] = 3] = "Transfer";
  TokenInstruction[TokenInstruction["Approve"] = 4] = "Approve";
  TokenInstruction[TokenInstruction["Revoke"] = 5] = "Revoke";
  TokenInstruction[TokenInstruction["SetAuthority"] = 6] = "SetAuthority";
  TokenInstruction[TokenInstruction["MintTo"] = 7] = "MintTo";
  TokenInstruction[TokenInstruction["Burn"] = 8] = "Burn";
  TokenInstruction[TokenInstruction["CloseAccount"] = 9] = "CloseAccount";
  TokenInstruction[TokenInstruction["FreezeAccount"] = 10] = "FreezeAccount";
  TokenInstruction[TokenInstruction["ThawAccount"] = 11] = "ThawAccount";
  TokenInstruction[TokenInstruction["TransferChecked"] = 12] = "TransferChecked";
  TokenInstruction[TokenInstruction["ApproveChecked"] = 13] = "ApproveChecked";
  TokenInstruction[TokenInstruction["MintToChecked"] = 14] = "MintToChecked";
  TokenInstruction[TokenInstruction["BurnChecked"] = 15] = "BurnChecked";
  TokenInstruction[TokenInstruction["InitializeAccount2"] = 16] = "InitializeAccount2";
  TokenInstruction[TokenInstruction["SyncNative"] = 17] = "SyncNative";
  TokenInstruction[TokenInstruction["InitializeAccount3"] = 18] = "InitializeAccount3";
  TokenInstruction[TokenInstruction["InitializeMultisig2"] = 19] = "InitializeMultisig2";
  TokenInstruction[TokenInstruction["InitializeMint2"] = 20] = "InitializeMint2";
})(TokenInstruction || (TokenInstruction = {}));
function createApproveTransferInstruction(source, destination, owner, amount, multiSigners, programId) {
  if (multiSigners === void 0) {
    multiSigners = [];
  }
  if (programId === void 0) {
    programId = splToken.TOKEN_PROGRAM_ID;
  }
  var dataLayout = BufferLayout.struct([BufferLayout.u8('instruction'), BufferLayout.blob(8, 'amount')]);
  var keys = addSigners([{
    pubkey: source,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: destination,
    isSigner: false,
    isWritable: true
  }], owner, multiSigners);
  var data = Buffer.alloc(dataLayout.span);
  dataLayout.encode({
    instruction: TokenInstruction.Approve,
    amount: new TokenAmount(amount).toBuffer()
  }, data);
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
}
function addSigners(keys, ownerOrAuthority, multiSigners) {
  if (multiSigners.length) {
    keys.push({
      pubkey: ownerOrAuthority,
      isSigner: false,
      isWritable: false
    });
    for (var _iterator = _createForOfIteratorHelperLoose(multiSigners), _step; !(_step = _iterator()).done;) {
      var signer = _step.value;
      keys.push({
        pubkey: signer.publicKey,
        isSigner: true,
        isWritable: false
      });
    }
  } else {
    keys.push({
      pubkey: ownerOrAuthority,
      isSigner: true,
      isWritable: false
    });
  }
  return keys;
}
var TokenAmount = /*#__PURE__*/function (_BN) {
  _inheritsLoose(TokenAmount, _BN);
  function TokenAmount() {
    return _BN.apply(this, arguments) || this;
  }
  var _proto = TokenAmount.prototype;
  _proto.toBuffer = function toBuffer() {
    var a = _BN.prototype.toArray.call(this).reverse();
    var b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }
    if (b.length >= 8) {
      throw new Error('TokenAmount too large');
    }
    var zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  };
  return TokenAmount;
}(bn);

function byte2hexStr(_byte) {
  if (typeof _byte !== "number") throw new Error("Input must be a number");
  if (_byte < 0 || _byte > 255) throw new Error("Input must be a byte");
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(_byte >> 4);
  str += hexByteMap.charAt(_byte & 0x0f);
  return str;
}
function byteArray2hexStr(byteArray) {
  var str = "";
  for (var i = 0; i < byteArray.length; i++) str += byte2hexStr(byteArray[i]);
  return str;
}

function isHexChar(c) {
  if (c >= "A" && c <= "F" || c >= "a" && c <= "f" || c >= "0" && c <= "9") {
    return 1;
  }
  return 0;
}
function hexChar2byte(c) {
  var d;
  if (c >= "A" && c <= "F") d = c.charCodeAt(0) - "A".charCodeAt(0) + 10;else if (c >= "a" && c <= "f") d = c.charCodeAt(0) - "a".charCodeAt(0) + 10;else if (c >= "0" && c <= "9") d = c.charCodeAt(0) - "0".charCodeAt(0);
  if (typeof d === "number") return d;else throw new Error("The passed hex char is not a valid hex char");
}
function hexStr2byteArray(str, strict) {
  if (strict === void 0) {
    strict = false;
  }
  if (typeof str !== "string") throw new Error("The passed string is not a string");
  var len = str.length;
  if (strict) {
    if (len % 2) {
      str = "0" + str;
      len++;
    }
  }
  var byteArray = [];
  var d = 0;
  var j = 0;
  var k = 0;
  for (var i = 0; i < len; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 === j % 2) {
        byteArray[k++] = d;
        d = 0;
      }
    } else throw new Error("The passed hex char is not a valid hex string");
  }
  return byteArray;
}

var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var BASE = 58;
function encode58(buffer) {
  if (buffer.length === 0) return "";
  var i;
  var j;
  var digits = [0];
  for (i = 0; i < buffer.length; i++) {
    for (j = 0; j < digits.length; j++) digits[j] <<= 8;
    digits[0] += buffer[i];
    var carry = 0;
    for (j = 0; j < digits.length; ++j) {
      digits[j] += carry;
      carry = digits[j] / BASE | 0;
      digits[j] %= BASE;
    }
    while (carry) {
      digits.push(carry % BASE);
      carry = carry / BASE | 0;
    }
  }
  for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) digits.push(0);
  return digits.reverse().map(function (digit) {
    return ALPHABET[digit];
  }).join("");
}

var ADDRESS_PREFIX = "41";
function isHex(string) {
  return typeof string === "string" && !isNaN(parseInt(string, 16)) && /^(0x|)[a-fA-F0-9]+$/.test(string);
}
function SHA256(msgBytes) {
  var msgHex = byteArray2hexStr(msgBytes);
  var hashHex = ethers.utils.sha256("0x" + msgHex).replace(/^0x/, "");
  return hexStr2byteArray(hashHex);
}
function getBase58CheckAddress(addressBytes) {
  var hash0 = SHA256(addressBytes);
  var hash1 = SHA256(hash0);
  var checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  return encode58(checkSum);
}
function fromHex(address) {
  if (!isHex(address)) return address;
  return getBase58CheckAddress(hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX)));
}

function useAllowance(_ref) {
  var setApproving = _ref.setApproving,
    setCancellingApprove = _ref.setCancellingApprove;
  var _useState = React.useState(0),
    allowance = _useState[0],
    setAllowance = _useState[1];
  var _useState2 = React.useState(null),
    decimals = _useState2[0],
    setDecimals = _useState2[1];
  var web3ModalAccountInfo = react.useWeb3ModalAccount();
  var _ref2 = web3ModalAccountInfo || {
      address: null,
      chainId: null,
      isConnected: null
    },
    signerAddress = _ref2.address,
    evmChainId = _ref2.chainId;
  var _useWeb3ModalProvider = react.useWeb3ModalProvider(),
    walletProvider = _useWeb3ModalProvider.walletProvider;
  var selectedNetwork = reactRedux.useSelector(selectSourceChain);
  var errorHandler = reactRedux.useSelector(selectErrorHandler);
  var dAppOption = reactRedux.useSelector(selectDappOption);
  var targetChain = reactRedux.useSelector(selectTargetChain);
  var feeDeduct = reactRedux.useSelector(selectFeeDeduct);
  var networkOption = reactRedux.useSelector(selectNetworkOption);
  var sourceChain = React.useMemo(function () {
    if (selectedNetwork === exports.SupportNetworks.SOLANA || selectedNetwork === exports.SupportNetworks.TRON || selectedNetwork === exports.SupportNetworks.BTC) return selectedNetwork;
    var CHAIN_NAMES_TO_IDS = networkOption === exports.NetworkOptions.mainnet ? CHAIN_NAMES_TO_IDS_MAINNET : CHAIN_NAMES_TO_IDS_TESTNET;
    var CHAIN_IDS_TO_NAMES = networkOption === exports.NetworkOptions.mainnet ? CHAIN_IDS_TO_NAMES_MAINNET : CHAIN_IDS_TO_NAMES_TESTNET;
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId];
    }
    return selectedNetwork;
  }, [selectedNetwork, evmChainId, networkOption]);
  var amount = reactRedux.useSelector(selectAmount);
  var serviceFee = reactRedux.useSelector(selectServiceFee);
  var nodeProviderQuery = reactRedux.useSelector(selectNodeProviderQuery);
  var _useConnection = SolanaAdapter.useConnection(),
    connection = _useConnection.connection;
  var _useSolanaWallet = SolanaAdapter.useWallet(),
    solanaAddress = _useSolanaWallet.publicKey,
    signSolanaTransaction = _useSolanaWallet.signTransaction;
  var _useTronWallet = tronwalletAdapterReactHooks.useWallet(),
    tronAddress = _useTronWallet.address,
    signTronTransaction = _useTronWallet.signTransaction;
  var selectedCoin = reactRedux.useSelector(selectSourceCurrency);
  var tokenOptions = reactRedux.useSelector(selectTokenOptions);
  var tokenAddress = React.useMemo(function () {
    if (isEmptyObject(tokenOptions) || sourceChain === exports.SupportNetworks.FIAT) return '';
    if (tokenOptions && typeof tokenOptions === 'object') {
      var coinOptions = tokenOptions[selectedCoin];
      if (coinOptions && typeof coinOptions === 'object') {
        return tokenOptions[selectedCoin][sourceChain];
      }
    }
    return '';
  }, [selectedCoin, sourceChain, tokenOptions]);
  var _useState3 = React.useState(),
    targetAddress = _useState3[0],
    setTargetAddress = _useState3[1];
  var _useState4 = React.useState(''),
    poolAddress = _useState4[0],
    setPoolAddress = _useState4[1];
  var amountToShow = React.useMemo(function () {
    if (sourceChain === exports.SupportNetworks.BTC || targetChain === exports.SupportNetworks.BTC) {
      return (feeDeduct ? +amount : +amount + serviceFee).toFixed(8);
    }
    return (feeDeduct ? +amount : +amount + serviceFee).toFixed(2);
  }, [amount, serviceFee, sourceChain, targetChain, feeDeduct]);
  var isApproved = React.useMemo(function () {
    return allowance >= +amountToShow;
  }, [allowance, amountToShow, dAppOption]);
  var updatePoolAddress = function updatePoolAddress() {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/kima/tss_pubkey")).then(function (result) {
          var _result$tssPubkey;
          if ((result === null || result === void 0 ? void 0 : (_result$tssPubkey = result.tssPubkey) === null || _result$tssPubkey === void 0 ? void 0 : _result$tssPubkey.length) < 1) {
            return;
          }
          if (sourceChain === exports.SupportNetworks.SOLANA && !result.tssPubkey[0].eddsa) {
            console.log('solana pool address is missing');
            toast__default.error('solana pool address is missing');
          }
          setPoolAddress(result.tssPubkey[0].reserved);
          setTargetAddress(sourceChain === exports.SupportNetworks.SOLANA ? result.tssPubkey[0].eddsa : sourceChain === exports.SupportNetworks.TRON ? fromHex(result.tssPubkey[0].ecdsa) : result.tssPubkey[0].ecdsa);
        });
      }, function (e) {
        console.log('rpc disconnected', e);
        toast__default.error('rpc disconnected');
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  React.useEffect(function () {
    if (!nodeProviderQuery) return;
    updatePoolAddress();
  }, [nodeProviderQuery, sourceChain]);
  React.useEffect(function () {
    (function () {
      try {
        var _exit = false;
        return _catch(function () {
          function _temp5(_result2) {
            if (_exit) return _result2;
            var provider = new ethers.ethers.providers.Web3Provider(walletProvider);
            var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
            if (!tokenAddress || !targetAddress || !signer || !signerAddress) return;
            var erc20Contract = new contracts.Contract(tokenAddress, ERC20ABI.abi, signer);
            return Promise.resolve(erc20Contract.decimals()).then(function (decimals) {
              return Promise.resolve(erc20Contract.allowance(signerAddress, targetAddress)).then(function (userAllowance) {
                setDecimals(+decimals);
                setAllowance(+units.formatUnits(userAllowance, decimals));
              });
            });
          }
          var tronWeb = networkOption === exports.NetworkOptions.mainnet ? tronWebMainnet : tronWebTestnet;
          var _temp4 = function () {
            if (!isEVMChain(sourceChain)) {
              var _temp3 = function _temp3() {
                _exit = true;
              };
              var _temp2 = function () {
                if (solanaAddress && tokenAddress && connection) {
                  var mint = new web3_js.PublicKey(tokenAddress);
                  return Promise.resolve(getOrCreateAssociatedTokenAccount(connection, solanaAddress, mint, solanaAddress, signSolanaTransaction)).then(function (fromTokenAccount) {
                    return Promise.resolve(connection.getParsedAccountInfo(fromTokenAccount.address)).then(function (accountInfo) {
                      var _accountInfo$value, _parsedAccountInfo$pa, _parsedAccountInfo$pa2, _parsedAccountInfo$pa3, _parsedAccountInfo$pa4, _parsedAccountInfo$pa5, _parsedAccountInfo$pa6, _parsedAccountInfo$pa7, _parsedAccountInfo$pa8;
                      console.log('solana token account: ', accountInfo);
                      var parsedAccountInfo = accountInfo === null || accountInfo === void 0 ? void 0 : (_accountInfo$value = accountInfo.value) === null || _accountInfo$value === void 0 ? void 0 : _accountInfo$value.data;
                      setDecimals((_parsedAccountInfo$pa = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa === void 0 ? void 0 : (_parsedAccountInfo$pa2 = _parsedAccountInfo$pa.info) === null || _parsedAccountInfo$pa2 === void 0 ? void 0 : (_parsedAccountInfo$pa3 = _parsedAccountInfo$pa2.tokenAmount) === null || _parsedAccountInfo$pa3 === void 0 ? void 0 : _parsedAccountInfo$pa3.decimals);
                      setAllowance(((_parsedAccountInfo$pa4 = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa4 === void 0 ? void 0 : (_parsedAccountInfo$pa5 = _parsedAccountInfo$pa4.info) === null || _parsedAccountInfo$pa5 === void 0 ? void 0 : _parsedAccountInfo$pa5.delegate) === targetAddress ? (_parsedAccountInfo$pa6 = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa6 === void 0 ? void 0 : (_parsedAccountInfo$pa7 = _parsedAccountInfo$pa6.info) === null || _parsedAccountInfo$pa7 === void 0 ? void 0 : (_parsedAccountInfo$pa8 = _parsedAccountInfo$pa7.delegatedAmount) === null || _parsedAccountInfo$pa8 === void 0 ? void 0 : _parsedAccountInfo$pa8.uiAmount : 0);
                    });
                  });
                } else {
                  var _temp6 = function () {
                    if (tronAddress && tokenAddress) {
                      return Promise.resolve(tronWeb.contract(ERC20ABI.abi, tokenAddress)).then(function (trc20Contract) {
                        return Promise.resolve(trc20Contract.decimals().call()).then(function (decimals) {
                          return Promise.resolve(trc20Contract.allowance(tronAddress, targetAddress).call()).then(function (userAllowance) {
                            setDecimals(+decimals);
                            setAllowance(+units.formatUnits(userAllowance, decimals));
                          });
                        });
                      });
                    } else {
                      setAllowance(0);
                    }
                  }();
                  if (_temp6 && _temp6.then) return _temp6.then(function () {});
                }
              }();
              return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
            }
          }();
          return _temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4);
        }, function (error) {
          errorHandler(error);
        });
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [signerAddress, tokenAddress, targetAddress, sourceChain, solanaAddress, tronAddress, walletProvider, networkOption]);
  var approve = React.useCallback(function (isCancel) {
    if (isCancel === void 0) {
      isCancel = false;
    }
    try {
      var _temp19 = function _temp19(_result4) {
        var _exit3 = false;
        if (_exit2) return _result4;
        function _temp17(_result5) {
          if (_exit3) return _result5;
          if (!signSolanaTransaction) return;
          var _temp15 = _catch(function () {
            isCancel ? setCancellingApprove(true) : setApproving(true);
            var mint = new web3_js.PublicKey(tokenAddress);
            var toPublicKey = new web3_js.PublicKey(targetAddress);
            return Promise.resolve(getOrCreateAssociatedTokenAccount(connection, solanaAddress, mint, solanaAddress, signSolanaTransaction)).then(function (fromTokenAccount) {
              var transaction = new web3_js.Transaction().add(createApproveTransferInstruction(fromTokenAccount.address, toPublicKey, solanaAddress, isCancel ? 0 : +amountToShow * Math.pow(10, decimals != null ? decimals : 6), [], splToken.TOKEN_PROGRAM_ID));
              return Promise.resolve(connection.getLatestBlockhash()).then(function (blockHash) {
                transaction.feePayer = solanaAddress;
                return Promise.resolve(blockHash.blockhash).then(function (_blockHash$blockhash) {
                  transaction.recentBlockhash = _blockHash$blockhash;
                  return Promise.resolve(signSolanaTransaction(transaction)).then(function (signed) {
                    return Promise.resolve(connection.sendRawTransaction(signed.serialize())).then(function () {
                      function _temp14() {
                        isCancel ? setCancellingApprove(false) : setApproving(false);
                      }
                      var accountInfo;
                      var allowAmount = 0;
                      var retryCount = 0;
                      var _temp13 = function () {
                        if (isCancel) {
                          var _temp12 = function _temp12() {
                            setAllowance(+amountToShow);
                          };
                          var _temp11 = _do(function () {
                            return Promise.resolve(connection.getParsedAccountInfo(fromTokenAccount.address)).then(function (_connection$getParsed) {
                              var _accountInfo, _accountInfo$value2, _parsedAccountInfo$pa9, _parsedAccountInfo$pa10, _parsedAccountInfo$pa11, _parsedAccountInfo$pa12, _parsedAccountInfo$pa13;
                              accountInfo = _connection$getParsed;
                              var parsedAccountInfo = (_accountInfo = accountInfo) === null || _accountInfo === void 0 ? void 0 : (_accountInfo$value2 = _accountInfo.value) === null || _accountInfo$value2 === void 0 ? void 0 : _accountInfo$value2.data;
                              allowAmount = ((_parsedAccountInfo$pa9 = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa9 === void 0 ? void 0 : (_parsedAccountInfo$pa10 = _parsedAccountInfo$pa9.info) === null || _parsedAccountInfo$pa10 === void 0 ? void 0 : _parsedAccountInfo$pa10.delegate) === targetAddress ? (_parsedAccountInfo$pa11 = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa11 === void 0 ? void 0 : (_parsedAccountInfo$pa12 = _parsedAccountInfo$pa11.info) === null || _parsedAccountInfo$pa12 === void 0 ? void 0 : (_parsedAccountInfo$pa13 = _parsedAccountInfo$pa12.delegatedAmount) === null || _parsedAccountInfo$pa13 === void 0 ? void 0 : _parsedAccountInfo$pa13.uiAmount : 0;
                              return Promise.resolve(sleep(1000)).then(function () {});
                            });
                          }, function () {
                            return allowAmount < +amountToShow || retryCount++ < 5;
                          });
                          return _temp11 && _temp11.then ? _temp11.then(_temp12) : _temp12(_temp11);
                        } else {
                          setAllowance(0);
                        }
                      }();
                      return _temp13 && _temp13.then ? _temp13.then(_temp14) : _temp14(_temp13);
                    });
                  });
                });
              });
            });
          }, function (e) {
            errorHandler(e);
            isCancel ? setCancellingApprove(false) : setApproving(false);
          });
          if (_temp15 && _temp15.then) return _temp15.then(function () {});
        }
        var _temp16 = function () {
          if (sourceChain === exports.SupportNetworks.TRON) {
            var _temp10 = function _temp10() {
              _exit3 = true;
            };
            if (!decimals || !tokenAddress || !targetAddress || !signTronTransaction) {
              _exit3 = true;
              return;
            }
            var _temp9 = _catch(function () {
              isCancel ? setCancellingApprove(true) : setApproving(true);
              var functionSelector = 'approve(address,uint256)';
              var parameter = [{
                type: 'address',
                value: targetAddress
              }, {
                type: 'uint256',
                value: units.parseUnits(isCancel ? '0' : amountToShow, decimals).toString()
              }];
              var tronWeb = networkOption === exports.NetworkOptions.mainnet ? tronWebMainnet : tronWebTestnet;
              return Promise.resolve(tronWeb.transactionBuilder.triggerSmartContract(tronWeb.address.toHex(tokenAddress), functionSelector, {}, parameter, tronWeb.address.toHex(tronAddress))).then(function (tx) {
                return Promise.resolve(signTronTransaction(tx.transaction)).then(function (signedTx) {
                  return Promise.resolve(tronWeb.trx.sendRawTransaction(signedTx)).then(function () {
                    isCancel ? setCancellingApprove(false) : setApproving(false);
                    setAllowance(+amountToShow);
                  });
                });
              });
            }, function (error) {
              errorHandler(error);
              isCancel ? setCancellingApprove(false) : setApproving(false);
            });
            return _temp9 && _temp9.then ? _temp9.then(_temp10) : _temp10(_temp9);
          }
        }();
        return _temp16 && _temp16.then ? _temp16.then(_temp17) : _temp17(_temp16);
      };
      var _exit2 = false;
      var _temp18 = function () {
        if (isEVMChain(sourceChain)) {
          var _temp8 = function _temp8() {
            _exit2 = true;
          };
          var provider = new ethers.ethers.providers.Web3Provider(walletProvider);
          var signer = provider.getSigner();
          if (!decimals || !tokenAddress || !signer || !targetAddress) {
            _exit2 = true;
            return;
          }
          var _temp7 = _catch(function () {
            var erc20Contract = new contracts.Contract(tokenAddress, ERC20ABI.abi, signer);
            isCancel ? setCancellingApprove(true) : setApproving(true);
            return Promise.resolve(erc20Contract.approve(targetAddress, units.parseUnits(isCancel ? '0' : amountToShow, decimals), networkOption === exports.NetworkOptions.mainnet && sourceChain === exports.SupportNetworks.ETHEREUM ? {
              gasLimit: 60000
            } : {})).then(function (approve) {
              return Promise.resolve(approve.wait()).then(function () {
                isCancel ? setCancellingApprove(false) : setApproving(false);
                setAllowance(+amountToShow);
              });
            });
          }, function (error) {
            errorHandler(error);
            isCancel ? setCancellingApprove(false) : setApproving(false);
          });
          return _temp7 && _temp7.then ? _temp7.then(_temp8) : _temp8(_temp7);
        }
      }();
      return Promise.resolve(_temp18 && _temp18.then ? _temp18.then(_temp19) : _temp19(_temp18));
    } catch (e) {
      return Promise.reject(e);
    }
  }, [decimals, tokenAddress, walletProvider, targetAddress, tronAddress, signSolanaTransaction, signTronTransaction, amountToShow, networkOption]);
  return React.useMemo(function () {
    return {
      isApproved: isApproved,
      poolAddress: poolAddress,
      approve: approve,
      allowance: allowance
    };
  }, [isApproved, poolAddress, approve, allowance]);
}

function useGetSolBalance() {
  var networkOption = reactRedux.useSelector(selectNetworkOption);
  var _useState = React.useState(0),
    solBalance = _useState[0],
    setSolBalance = _useState[1];
  var _useWallet = SolanaAdapter.useWallet(),
    publicKey = _useWallet.publicKey;
  var cluster = React.useMemo(function () {
    return networkOption === 'testnet' ? 'devnet' : 'mainnet-beta';
  }, [networkOption]);
  var connection = React.useMemo(function () {
    return new web3_js.Connection(web3_js.clusterApiUrl(cluster), 'confirmed');
  }, [cluster]);
  React.useEffect(function () {
    var fetchBalance = function fetchBalance() {
      try {
        var _temp2 = function () {
          if (publicKey) {
            var _temp = _catch(function () {
              return Promise.resolve(connection.getBalance(publicKey)).then(function (_connection$getBalanc) {
                var balance = _connection$getBalanc / web3_js.LAMPORTS_PER_SOL;
                console.log('SOL balance:', balance);
                setSolBalance(balance);
              });
            }, function (error) {
              console.error('Error fetching SOL balance:', error);
            });
            if (_temp && _temp.then) return _temp.then(function () {});
          }
        }();
        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    fetchBalance();
    var intervalId = setInterval(fetchBalance, 10000);
    return function () {
      return clearInterval(intervalId);
    };
  }, [publicKey, connection]);
  return solBalance;
}

function useGetTronBalance() {
  var networkOption = reactRedux.useSelector(selectNetworkOption);
  var _useWallet = tronwalletAdapterReactHooks.useWallet(),
    wallet = _useWallet.wallet;
  var _useState = React.useState(0),
    tronBalance = _useState[0],
    setTronBalance = _useState[1];
  var tronWeb = React.useMemo(function () {
    return networkOption === exports.NetworkOptions.testnet ? tronWebTestnet : tronWebMainnet;
  }, [networkOption]);
  React.useEffect(function () {
    var intervalId;
    var fetchBalance = function fetchBalance() {
      try {
        var _temp2 = function (_wallet$adapter) {
          if (wallet !== null && wallet !== void 0 && (_wallet$adapter = wallet.adapter) !== null && _wallet$adapter !== void 0 && _wallet$adapter.address) {
            var _temp = _catch(function () {
              return Promise.resolve(tronWeb.trx.getBalance(wallet.adapter.address)).then(function (balanceInSun) {
                setTronBalance(balanceInSun / 1e6);
                console.log('TRX balance:', balanceInSun / 1e6);
              });
            }, function (error) {
              console.error('Failed to fetch TRX balance:', error);
            });
            if (_temp && _temp.then) return _temp.then(function () {});
          }
        }();
        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    if (wallet !== null && wallet !== void 0 && wallet.adapter.address) {
      fetchBalance();
      intervalId = setInterval(fetchBalance, 10000);
    }
    return function () {
      return clearInterval(intervalId);
    };
  }, [wallet === null || wallet === void 0 ? void 0 : wallet.adapter.address, tronWeb]);
  return tronBalance;
}

var AccountDetailsModal = function AccountDetailsModal() {
  var dispatch = reactRedux.useDispatch();
  var theme = reactRedux.useSelector(selectTheme);
  var networkOption = reactRedux.useSelector(selectNetworkOption);
  var accountDetailsModal = reactRedux.useSelector(selectAccountDetailsModal);
  var _useIsWalletReady = useIsWalletReady(),
    walletAddress = _useIsWalletReady.walletAddress;
  var _useSolanaWallet = SolanaAdapter.useWallet(),
    solanaWalletDisconnect = _useSolanaWallet.disconnect;
  var _useTronWallet = tronwalletAdapterReactHooks.useWallet(),
    tronWalletDisconnect = _useTronWallet.disconnect;
  var solBalance = useGetSolBalance();
  var tronBalance = useGetTronBalance();
  var selectedNetwork = reactRedux.useSelector(selectSourceChain);
  var networkDetails = React.useMemo(function () {
    return networkOptions.find(function (_ref) {
      var id = _ref.id;
      return id === selectedNetwork;
    });
  }, [selectedNetwork]);
  var explorerUrl = React.useMemo(function () {
    var baseUrl = networkOption === 'testnet' ? CHAIN_NAMES_TO_EXPLORER_TESTNET[selectedNetwork] : CHAIN_NAMES_TO_EXPLORER_MAINNET[selectedNetwork];
    var mainUrlParams = (selectedNetwork === 'SOL' ? 'account' : 'address') + "/" + walletAddress;
    var urlSufix = "" + (selectedNetwork === 'SOL' ? "?cluster=" + (networkOption === 'testnet' ? 'devnet' : 'mainnet') : '');
    return "https://" + baseUrl + "/" + mainUrlParams + urlSufix;
  }, [walletAddress, networkOption, selectedNetwork]);
  var handleDisconnect = function handleDisconnect() {
    selectedNetwork === 'SOL' ? solanaWalletDisconnect() : tronWalletDisconnect();
    dispatch(setAccountDetailsModal(false));
  };
  return React__default.createElement("div", {
    className: "kima-modal " + theme.colorMode + " " + (accountDetailsModal && 'open')
  }, React__default.createElement("div", {
    className: 'modal-overlay'
  }), React__default.createElement("div", {
    className: "modal-content-container " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'kima-card-header'
  }, React__default.createElement("div", {
    className: 'topbar'
  }, React__default.createElement("div", {
    className: 'title'
  }, React__default.createElement("h3", null, "Account Details")), React__default.createElement("div", {
    className: 'control-buttons'
  }, React__default.createElement("button", {
    className: 'cross-icon-button',
    onClick: function onClick() {
      return dispatch(setAccountDetailsModal(false));
    }
  }, React__default.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React__default.createElement("div", {
    className: 'modal-content'
  }, React__default.createElement("div", {
    className: 'summary'
  }, networkDetails && React__default.createElement(networkDetails.icon, {
    width: 60,
    height: 60
  }), React__default.createElement("div", {
    className: 'address'
  }, React__default.createElement("h2", null, getShortenedAddress(walletAddress || '')), React__default.createElement(CopyButton, {
    text: walletAddress
  })), React__default.createElement("h3", null, selectedNetwork === 'SOL' ? solBalance : tronBalance, " ", selectedNetwork)), React__default.createElement(SecondaryButton, {
    className: 'block-explorer'
  }, React__default.createElement(ExternalLink, {
    className: 'link',
    to: explorerUrl
  }, React__default.createElement(Explorer, {
    fill: '#778DA3'
  }), React__default.createElement("p", null, "Block explorer"), React__default.createElement(ExternalUrl, {
    fill: '#778DA3'
  }))), React__default.createElement(PrimaryButton, {
    clickHandler: handleDisconnect
  }, "Discconect"))));
};

var SolanaWalletConnectModal = function SolanaWalletConnectModal() {
  var dispatch = reactRedux.useDispatch();
  var theme = reactRedux.useSelector(selectTheme);
  var connectModal = reactRedux.useSelector(selectSolanaConnectModal);
  return React__default.createElement("div", null, React__default.createElement(AccountDetailsModal, null), React__default.createElement("div", {
    className: "kima-modal wallet-connect " + (connectModal ? 'open' : '')
  }, React__default.createElement("div", {
    className: "modal-content-container " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'kima-card-header'
  }, React__default.createElement("div", {
    className: 'topbar'
  }, React__default.createElement("div", {
    className: 'title'
  }, React__default.createElement("h3", null, "Connect Wallet")), React__default.createElement("div", {
    className: 'control-buttons'
  }, React__default.createElement("button", {
    className: 'cross-icon-button',
    onClick: function onClick() {
      return dispatch(setSolanaConnectModal(false));
    }
  }, React__default.createElement(Cross, {
    width: 30,
    height: 30,
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React__default.createElement("div", {
    className: 'modal-content'
  }, React__default.createElement(SolanaWalletSelect, null)))));
};

var TronWalletConnectModal = function TronWalletConnectModal() {
  var dispatch = reactRedux.useDispatch();
  var theme = reactRedux.useSelector(selectTheme);
  var connectModal = reactRedux.useSelector(selectTronConnectModal);
  return React__default.createElement("div", null, React__default.createElement(AccountDetailsModal, null), React__default.createElement("div", {
    className: "kima-modal wallet-connect " + theme.colorMode + " " + (connectModal ? 'open' : '')
  }, React__default.createElement("div", {
    className: 'modal-overlay'
  }), React__default.createElement("div", {
    className: "modal-content-container " + theme.colorMode
  }, React__default.createElement("div", {
    className: 'kima-card-header'
  }, React__default.createElement("div", {
    className: 'topbar'
  }, React__default.createElement("div", {
    className: 'title'
  }, React__default.createElement("h3", null, "Connect Wallet")), React__default.createElement("div", {
    className: 'control-buttons'
  }, React__default.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      return dispatch(setTronConnectModal(false));
    }
  }, React__default.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React__default.createElement("div", {
    className: 'modal-content'
  }, React__default.createElement(WalletSelect, null)))));
};

var BankPopup = function BankPopup(_ref) {
  var setVerifying = _ref.setVerifying,
    isVerifying = _ref.isVerifying;
  var dispatch = reactRedux.useDispatch();
  var uuid = reactRedux.useSelector(selectUuid);
  var theme = reactRedux.useSelector(selectTheme);
  var bankPopup = reactRedux.useSelector(selectBankPopup);
  var kimaBackendUrl = reactRedux.useSelector(selectBackendUrl);
  React.useEffect(function () {
    if (!kimaBackendUrl || !uuid || !isVerifying) return;
    var timerId = setInterval(function () {
      try {
        var _temp = _catch(function () {
          return Promise.resolve(fetchWrapper.post(kimaBackendUrl + "/kyc", JSON.stringify({
            uuid: uuid
          }))).then(function (res) {
            var kycResult = res.data;
            console.log(kycResult);
            if (!kycResult.length) {
              console.log('failed to check kyc status');
              toast.toast.error('failed to check kyc status');
            } else if (kycResult[0].status === 'approved') {
              setVerifying(false);
              dispatch(setKYCStatus('approved'));
              toast.toast.success('KYC is verified');
            }
          });
        }, function () {
          console.log('failed to check kyc status');
          toast.toast.error('failed to check kyc status');
        });
        return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    }, 3000);
    return function () {
      clearInterval(timerId);
    };
  }, [kimaBackendUrl, uuid, isVerifying]);
  return React__default.createElement("div", {
    className: "kima-modal bank-popup " + theme.colorMode + " " + (bankPopup ? 'open' : '')
  }, React__default.createElement("div", {
    className: 'modal-overlay',
    onClick: function onClick() {
      dispatch(setBankPopup(false));
    }
  }), React__default.createElement("div", {
    className: 'modal-content-container'
  }, React__default.createElement("div", {
    className: 'kima-card-header'
  }, React__default.createElement("div", {
    className: 'topbar'
  }, React__default.createElement("div", {
    className: 'title'
  }), React__default.createElement("div", {
    className: 'control-buttons'
  }, React__default.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      return dispatch(setBankPopup(false));
    }
  }, React__default.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React__default.createElement("div", {
    className: 'modal-content'
  }, React__default.createElement("iframe", {
    src: "https://sandbox.depasify.com/widgets/kyc?partner=kimastage&user_uuid=" + uuid,
    width: '100%',
    height: '100%',
    frameBorder: '0',
    allow: 'camera'
  }))));
};

function useSign(_ref) {
  var setSigning = _ref.setSigning;
  var dispatch = reactRedux.useDispatch();
  var _useState = React.useState(false),
    isSigned = _useState[0],
    setIsSigned = _useState[1];
  var web3ModalAccountInfo = react.useWeb3ModalAccount();
  var _ref2 = web3ModalAccountInfo || {
      address: null,
      chainId: null,
      isConnected: null
    },
    signerAddress = _ref2.address;
  var _useWeb3ModalProvider = react.useWeb3ModalProvider(),
    walletProvider = _useWeb3ModalProvider.walletProvider;
  var sourceNetwork = reactRedux.useSelector(selectSourceChain);
  var errorHandler = reactRedux.useSelector(selectErrorHandler);
  var amount = reactRedux.useSelector(selectAmount);
  var sign = React.useCallback(function () {
    try {
      if (sourceNetwork !== exports.SupportNetworks.FIAT) {
        errorHandler('Failed to sign');
        return Promise.resolve();
      }
      var _temp = _catch(function () {
        setSigning(true);
        var provider = new ethers.ethers.providers.Web3Provider(walletProvider);
        var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
        var message = amount + " | " + signerAddress;
        return Promise.resolve(signer === null || signer === void 0 ? void 0 : signer.signMessage(message)).then(function (signature) {
          var hash = Base64.stringify(sha256$1(signature || ''));
          setIsSigned(true);
          dispatch(setSignature(hash));
          setSigning(false);
        });
      }, function (error) {
        errorHandler(error);
        setSigning(false);
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  }, [walletProvider, amount, sourceNetwork, signerAddress]);
  return React.useMemo(function () {
    return {
      isSigned: isSigned,
      sign: sign
    };
  }, [isSigned, sign]);
}

var _assert = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = exports.isBytes = void 0;
function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`positive integer expected, not ${n}`);
}
exports.number = number;
function bool(b) {
    if (typeof b !== 'boolean')
        throw new Error(`boolean expected, not ${b}`);
}
exports.bool = bool;
// copied from utils
function isBytes(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
exports.isBytes = isBytes;
function bytes(b, ...lengths) {
    if (!isBytes(b))
        throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
exports.bytes = bytes;
function hash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(h.outputLen);
    number(h.blockLen);
}
exports.hash = hash;
function exists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
exports.exists = exists;
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}
exports.output = output;
const assert = { number, bool, bytes, hash, exists, output };
exports.default = assert;
//# sourceMappingURL=_assert.js.map
});

unwrapExports(_assert);

var crypto = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypto = void 0;
exports.crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;
//# sourceMappingURL=crypto.js.map
});

unwrapExports(crypto);

var utils = createCommonjsModule(function (module, exports) {
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBytes = exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.byteSwap32 = exports.byteSwapIfBE = exports.byteSwap = exports.isLE = exports.rotl = exports.rotr = exports.createView = exports.u32 = exports.u8 = exports.isBytes = void 0;
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.


// export { isBytes } from './_assert.js';
// We can't reuse isBytes from _assert, because somehow this causes huge perf issues
function isBytes(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
exports.isBytes = isBytes;
// Cast array to different type
const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
exports.u8 = u8;
const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
exports.u32 = u32;
// Cast array to view
const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
exports.createView = createView;
// The rotate right (circular right shift) operation for uint32
const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
exports.rotr = rotr;
// The rotate left (circular left shift) operation for uint32
const rotl = (word, shift) => (word << shift) | ((word >>> (32 - shift)) >>> 0);
exports.rotl = rotl;
exports.isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
// The byte swap operation for uint32
const byteSwap = (word) => ((word << 24) & 0xff000000) |
    ((word << 8) & 0xff0000) |
    ((word >>> 8) & 0xff00) |
    ((word >>> 24) & 0xff);
exports.byteSwap = byteSwap;
// Conditionally byte swap if on a big-endian platform
exports.byteSwapIfBE = exports.isLE ? (n) => n : (n) => (0, exports.byteSwap)(n);
// In place byte swap for Uint32Array
function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = (0, exports.byteSwap)(arr[i]);
    }
}
exports.byteSwap32 = byteSwap32;
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex(bytes) {
    (0, _assert.bytes)(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
    }
    return hex;
}
exports.bytesToHex = bytesToHex;
// We use optimized technique to convert hex string to byte array
const asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16(char) {
    if (char >= asciis._0 && char <= asciis._9)
        return char - asciis._0;
    if (char >= asciis._A && char <= asciis._F)
        return char - (asciis._A - 10);
    if (char >= asciis._a && char <= asciis._f)
        return char - (asciis._a - 10);
    return;
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
function hexToBytes(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
        throw new Error('padded hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
    }
    return array;
}
exports.hexToBytes = hexToBytes;
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const nextTick = async () => { };
exports.nextTick = nextTick;
// Returns control to thread each 'tick' ms to avoid blocking
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for (let i = 0; i < iters; i++) {
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
            continue;
        await (0, exports.nextTick)();
        ts += diff;
    }
}
exports.asyncLoop = asyncLoop;
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes(str) {
    if (typeof str !== 'string')
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
exports.utf8ToBytes = utf8ToBytes;
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    (0, _assert.bytes)(data);
    return data;
}
exports.toBytes = toBytes;
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0, _assert.bytes)(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
exports.concatBytes = concatBytes;
// For runtime check if class implements interface
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
exports.Hash = Hash;
const toStr = {}.toString;
function checkOpts(defaults, opts) {
    if (opts !== undefined && toStr.call(opts) !== '[object Object]')
        throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
exports.checkOpts = checkOpts;
function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
}
exports.wrapConstructor = wrapConstructor;
function wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */
function randomBytes(bytesLength = 32) {
    if (crypto.crypto && typeof crypto.crypto.getRandomValues === 'function') {
        return crypto.crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
}
exports.randomBytes = randomBytes;
//# sourceMappingURL=utils.js.map
});

unwrapExports(utils);

var _md = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMD = exports.Maj = exports.Chi = void 0;


// Polyfill for Safari 14
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function')
        return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number((value >> _32n) & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
// Choice: a ? b : c
const Chi = (a, b, c) => (a & b) ^ (~a & c);
exports.Chi = Chi;
// Majority function, true if any two inpust is true
const Maj = (a, b, c) => (a & b) ^ (a & c) ^ (b & c);
exports.Maj = Maj;
/**
 * Merkle-Damgard hash construction base class.
 * Could be used to create MD5, RIPEMD, SHA1, SHA2.
 */
class HashMD extends utils.Hash {
    constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, utils.createView)(this.buffer);
    }
    update(data) {
        (0, _assert.exists)(this);
        const { view, buffer, blockLen } = this;
        data = (0, utils.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = (0, utils.createView)(data);
                for (; blockLen <= len - pos; pos += blockLen)
                    this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        (0, _assert.exists)(this);
        (0, _assert.output)(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in
        // current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, utils.createView)(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4)
            throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
            throw new Error('_sha2: outputLen bigger than state');
        for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
            to.buffer.set(buffer);
        return to;
    }
}
exports.HashMD = HashMD;
//# sourceMappingURL=_md.js.map
});

unwrapExports(_md);

var sha256 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha224 = exports.sha256 = void 0;


// SHA2-256 need to try 2^128 hashes to execute birthday attack.
// BTC network is doing 2^67 hashes/sec as per early 2023.
// Round constants:
// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
// prettier-ignore
const SHA256_K = /* @__PURE__ */ new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);
// Initial state:
// first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19
// prettier-ignore
const SHA256_IV = /* @__PURE__ */ new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends _md.HashMD {
    constructor() {
        super(64, 32, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = SHA256_IV[0] | 0;
        this.B = SHA256_IV[1] | 0;
        this.C = SHA256_IV[2] | 0;
        this.D = SHA256_IV[3] | 0;
        this.E = SHA256_IV[4] | 0;
        this.F = SHA256_IV[5] | 0;
        this.G = SHA256_IV[6] | 0;
        this.H = SHA256_IV[7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils.rotr)(W15, 7) ^ (0, utils.rotr)(W15, 18) ^ (W15 >>> 3);
            const s1 = (0, utils.rotr)(W2, 17) ^ (0, utils.rotr)(W2, 19) ^ (W2 >>> 10);
            SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils.rotr)(E, 6) ^ (0, utils.rotr)(E, 11) ^ (0, utils.rotr)(E, 25);
            const T1 = (H + sigma1 + (0, _md.Chi)(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const sigma0 = (0, utils.rotr)(A, 2) ^ (0, utils.rotr)(A, 13) ^ (0, utils.rotr)(A, 22);
            const T2 = (sigma0 + (0, _md.Maj)(A, B, C)) | 0;
            H = G;
            G = F;
            F = E;
            E = (D + T1) | 0;
            D = C;
            C = B;
            B = A;
            A = (T1 + T2) | 0;
        }
        // Add the compressed chunk to the current hash value
        A = (A + this.A) | 0;
        B = (B + this.B) | 0;
        C = (C + this.C) | 0;
        D = (D + this.D) | 0;
        E = (E + this.E) | 0;
        F = (F + this.F) | 0;
        G = (G + this.G) | 0;
        H = (H + this.H) | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        SHA256_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
// Constants from https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf
class SHA224 extends SHA256 {
    constructor() {
        super();
        this.A = 0xc1059ed8 | 0;
        this.B = 0x367cd507 | 0;
        this.C = 0x3070dd17 | 0;
        this.D = 0xf70e5939 | 0;
        this.E = 0xffc00b31 | 0;
        this.F = 0x68581511 | 0;
        this.G = 0x64f98fa7 | 0;
        this.H = 0xbefa4fa4 | 0;
        this.outputLen = 28;
    }
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */
exports.sha256 = (0, utils.wrapConstructor)(() => new SHA256());
exports.sha224 = (0, utils.wrapConstructor)(() => new SHA224());
//# sourceMappingURL=sha256.js.map
});

unwrapExports(sha256);
var sha256_2 = sha256.sha256;

function hash160(publicKey) {
  var publicKeyBuffer = buffer.Buffer.from(publicKey, 'hex');
  var hash160Buffer = bitcoin.crypto.hash160(publicKeyBuffer);
  return hash160Buffer;
}
function createHTLCScript(senderAddress, senderPublicKey, recipientAddress, timeout, network) {
  console.log('senderAddress = ' + senderAddress);
  console.log('senderPublicKey = ' + senderPublicKey);
  console.log('recipientAddress = ' + recipientAddress);
  console.log('timeout = ' + timeout);
  console.log('network = ' + network);
  var recipientAddressCheck;
  try {
    recipientAddressCheck = bitcoin.address.fromBech32(recipientAddress);
  } catch (error) {
    throw new Error("Failed to decode recipient address: " + error.message);
  }
  if (!recipientAddressCheck) {
    throw new Error('Failed to decode recipient address');
  }
  var senderPKH = hash160(senderPublicKey);
  console.log('senderPKH:', senderPKH.toString('hex'));
  var recipientPKH = recipientAddressCheck.data;
  console.log('recipientPKH:', recipientPKH.toString('hex'));
  var script = bitcoin.script.compile([bitcoin.opcodes.OP_DUP, bitcoin.opcodes.OP_HASH160, recipientAddressCheck.data, bitcoin.opcodes.OP_EQUAL, bitcoin.opcodes.OP_IF, bitcoin.opcodes.OP_DUP, bitcoin.opcodes.OP_HASH160, recipientPKH, bitcoin.opcodes.OP_EQUALVERIFY, bitcoin.opcodes.OP_CHECKSIG, bitcoin.opcodes.OP_ELSE, bitcoin.script.number.encode(timeout), bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY, bitcoin.opcodes.OP_DROP, bitcoin.opcodes.OP_DUP, bitcoin.opcodes.OP_HASH160, senderPKH, bitcoin.opcodes.OP_EQUALVERIFY, bitcoin.opcodes.OP_CHECKSIG, bitcoin.opcodes.OP_ENDIF, buffer.Buffer.from(senderPublicKey, 'hex'), bitcoin.opcodes.OP_DROP]);
  return script;
}
function htlcP2WSHAddress(htlcScript, network) {
  var p2wsh = bitcoin.payments.p2wsh({
    redeem: {
      output: htlcScript,
      network: network
    },
    network: network
  });
  return p2wsh.address;
}
function decodeBase64PSBT(base64Psbt) {
  var psbtBuffer = buffer.Buffer.from(base64Psbt, 'base64');
  var psbt = btc.Transaction.fromPSBT(psbtBuffer, {
    allowUnknownInputs: true
  });
  return psbt;
}
function createReclaimPsbt(reclaimerAddress, htlcAmount, htlcTimeout, htlcScript, htlcOutput, network, fee) {
  var htlcScriptHash = sha256_2(htlcScript);
  var htlcScriptHex = buffer.Buffer.from(htlcScript).toString('hex');
  console.log('htlcScriptHex = ' + htlcScriptHex);
  var scriptPubKey = btc.Script.encode(['OP_0', htlcScriptHash]);
  var lockTimeBigEndian = Number(htlcTimeout) + 1;
  var tx = new btc.Transaction({
    allowUnknownOutputs: true,
    lockTime: lockTimeBigEndian,
    version: 0
  });
  var reclaimedAmount = BigInt(htlcAmount) - BigInt(fee);
  tx.addOutputAddress(reclaimerAddress, reclaimedAmount, network);
  tx.addInput({
    txid: htlcOutput.txid,
    index: htlcOutput.vout,
    witnessUtxo: {
      script: scriptPubKey,
      amount: BigInt(htlcAmount)
    },
    witnessScript: htlcScript,
    sequence: 0xfffffffe,
    sighashType: btc.SigHash.ALL
  });
  var psbt = tx.toPSBT(0);
  console.log('txHex = ' + tx.hex);
  var psbtB64 = base.base64.encode(psbt);
  return psbtB64;
}

var PendingTxPopup = function PendingTxPopup(_ref) {
  var handleHtlcContinue = _ref.handleHtlcContinue,
    handleHtlcReclaim = _ref.handleHtlcReclaim;
  var dispatch = reactRedux.useDispatch();
  var theme = reactRedux.useSelector(selectTheme);
  var pendingTxPopup = reactRedux.useSelector(selectPendingTxPopup);
  var txData = reactRedux.useSelector(selectPendingTxData);
  var networkOption = reactRedux.useSelector(selectNetworkOption);
  var CHAIN_NAMES_TO_EXPLORER = networkOption === exports.NetworkOptions.mainnet ? CHAIN_NAMES_TO_EXPLORER_MAINNET : CHAIN_NAMES_TO_EXPLORER_TESTNET;
  return React__default.createElement("div", {
    className: "kima-modal pending-tx-popup " + theme.colorMode + " " + (pendingTxPopup ? 'open' : '')
  }, React__default.createElement("div", {
    className: 'modal-overlay',
    onClick: function onClick() {
      dispatch(setPendingTxPopup(false));
    }
  }), React__default.createElement("div", {
    className: 'modal-content-container'
  }, React__default.createElement("div", {
    className: 'kima-card-header'
  }, React__default.createElement("div", {
    className: 'topbar'
  }, React__default.createElement("div", {
    className: 'title'
  }, React__default.createElement("h3", null, "Bitcoin Transaction List")), React__default.createElement("div", {
    className: 'control-buttons'
  }, React__default.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      return dispatch(setPendingTxPopup(false));
    }
  }, React__default.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React__default.createElement("div", {
    className: 'modal-content'
  }, React__default.createElement("div", {
    className: 'scroll-area custom-scrollbar'
  }, React__default.createElement("div", {
    className: 'header-container'
  }, React__default.createElement("span", null, "Amount"), React__default.createElement("span", null, "Expire Time"), React__default.createElement("span", null, "Status"), React__default.createElement("span", null, "Hash"), React__default.createElement("span", null, "Action")), React__default.createElement("div", {
    className: 'tx-container'
  }, txData.map(function (tx, index) {
    var date = new Date(+tx.expireTime * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var formattedDate = year + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0') + " " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
    return React__default.createElement("div", {
      className: 'tx-item',
      key: index
    }, React__default.createElement("div", {
      className: 'label'
    }, React__default.createElement("div", {
      className: 'icon-wrapper'
    }, (+tx.amount).toFixed(8), React__default.createElement(BTC, null))), React__default.createElement("span", {
      className: 'label'
    }, "" + formattedDate), React__default.createElement("span", {
      className: 'label'
    }, tx.status), React__default.createElement("div", {
      className: 'label'
    }, React__default.createElement(ExternalLink, {
      to: "https://" + CHAIN_NAMES_TO_EXPLORER[exports.SupportNetworks.BTC] + "/tx/" + tx.hash
    }, getShortenedAddress(tx.hash))), React__default.createElement("div", {
      className: "action-button-container " + (tx.status === 'Pending' || tx.status === 'Failed' ? '' : 'disabled')
    }, React__default.createElement("div", {
      className: 'action-button',
      onClick: function onClick() {
        if (tx.status !== 'Pending' && tx.status !== 'Failed') return;
        var now = new Date();
        var currentTimestamp = Math.floor(now.getTime() / 1000);
        console.log(currentTimestamp, tx.expireTime);
        if (currentTimestamp < +tx.expireTime) {
          toast__default.error('Please wait for until htlc is expired!');
          return;
        }
        handleHtlcReclaim(tx.expireTime, tx.hash, tx.amount);
      }
    }, "Reclaim"), React__default.createElement("div", {
      className: 'action-button',
      onClick: function onClick() {
        handleHtlcContinue(tx.expireTime, tx.hash, tx.amount);
        dispatch(setPendingTxPopup(false));
      }
    }, "Continue")));
  }))))));
};

function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET$1 = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET$1.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

var utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET: ALPHABET$1,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils$1.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);

  utils$1.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new ( FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils$1.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

  if (!utils$1.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils$1.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils$1.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils$1.isArray(value) && isFlatArray(value)) ||
        ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils$1.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils$1.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype$1 = AxiosURLSearchParams.prototype;

prototype$1.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype$1.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode$1(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode$1;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = (
  (product) => {
    return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
  })(typeof navigator !== 'undefined' && navigator.product);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

var utils$2 = {
  __proto__: null,
  hasBrowserEnv: hasBrowserEnv,
  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
  hasStandardBrowserEnv: hasStandardBrowserEnv
};

var platform$1 = {
  ...utils$2,
  ...platform
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform$1.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform$1.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};

    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils$1.isObject(data);

    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils$1.isFormData(data);

    if (isFormData) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils$1.isArrayBuffer(data) ||
      utils$1.isBuffer(data) ||
      utils$1.isStream(data) ||
      utils$1.isFile(data) ||
      utils$1.isBlob(data)
    ) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform$1.classes.FormData,
    Blob: platform$1.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils$1.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils$1.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils$1.isString(value)) return;

  if (utils$1.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils$1.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils$1.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils$1.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils$1.freezeMethods(AxiosHeaders);

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders.from(context.headers);
  let data = context.data;

  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils$1.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

var cookies = platform$1.hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      utils$1.isString(path) && cookie.push('path=' + path);

      utils$1.isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform$1.hasStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils$1.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders.from(config.headers).normalize();
    let {responseType, withXSRFToken} = config;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    let contentType;

    if (utils$1.isFormData(requestData)) {
      if (platform$1.hasStandardBrowserEnv || platform$1.hasStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if ((contentType = requestHeaders.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        requestHeaders.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if(platform$1.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config));

      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(fullPath))) {
        // Add xsrf header
        const xsrfValue = config.xsrfHeaderName && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils$1.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform$1.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils$1.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new AxiosError(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({caseless}, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION = "1.6.7";

const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators
};

const validators$1 = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;

        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';

        if (!err.stack) {
          err.stack = stack;
          // match without the 2 top stack lines
        } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
          err.stack += '\n' + stack;
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators$1.transitional(validators$1.boolean),
        forcedJSONParsing: validators$1.transitional(validators$1.boolean),
        clarifyTimeoutError: validators$1.transitional(validators$1.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators$1.function,
          serialize: validators$1.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils$1.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils$1.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  const instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils$1.extend(instance, Axios.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils$1.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders;

axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode;

axios.default = axios;

var broadcastTransaction = function broadcastTransaction(rawHex, networkSubpath) {
  if (networkSubpath === void 0) {
    networkSubpath = '';
  }
  try {
    var url = "https://mempool.space" + networkSubpath + "/api/tx";
    return Promise.resolve(_catch(function () {
      return Promise.resolve(axios.post(url, rawHex)).then(function (response) {
        return response.data;
      });
    }, function (error) {
      throw error;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var getUTXOs = function getUTXOs(network, address) {
  try {
    var networkSubpath = network === satsConnect.BitcoinNetworkType.Testnet ? '/testnet' : '';
    var url = "https://mempool.space" + networkSubpath + "/api/address/" + address + "/utxo";
    return Promise.resolve(fetch(url)).then(function (response) {
      return response.json();
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var TransferWidget = function TransferWidget(_ref) {
  var theme = _ref.theme,
    feeURL = _ref.feeURL,
    helpURL = _ref.helpURL,
    titleOption = _ref.titleOption,
    paymentTitleOption = _ref.paymentTitleOption;
  var dispatch = reactRedux.useDispatch();
  var mainRef = React.useRef(null);
  var _useState = React.useState(0),
    formStep = _useState[0],
    setFormStep = _useState[1];
  var _useState2 = React.useState(0),
    wizardStep = _useState2[0],
    setWizardStep = _useState2[1];
  var mode = reactRedux.useSelector(selectMode);
  var dAppOption = reactRedux.useSelector(selectDappOption);
  var amount = reactRedux.useSelector(selectAmount);
  var feeDeduct = reactRedux.useSelector(selectFeeDeduct);
  var sourceChain = reactRedux.useSelector(selectSourceChain);
  var targetAddress = reactRedux.useSelector(selectTargetAddress);
  var targetChain = reactRedux.useSelector(selectTargetChain);
  var compliantOption = reactRedux.useSelector(selectCompliantOption);
  var sourceCompliant = reactRedux.useSelector(selectSourceCompliant);
  var targetCompliant = reactRedux.useSelector(selectTargetCompliant);
  var errorHandler = reactRedux.useSelector(selectErrorHandler);
  var keplrHandler = reactRedux.useSelector(selectKeplrHandler);
  var closeHandler = reactRedux.useSelector(selectCloseHandler);
  var sourceCurrency = reactRedux.useSelector(selectSourceCurrency);
  var targetCurrency = reactRedux.useSelector(selectTargetCurrency);
  var backendUrl = reactRedux.useSelector(selectBackendUrl);
  var nodeProviderQuery = reactRedux.useSelector(selectNodeProviderQuery);
  var bankDetails = reactRedux.useSelector(selectBankDetails);
  var kycStatus = reactRedux.useSelector(selectKycStatus);
  var expireTime = reactRedux.useSelector(selectExpireTime);
  var bitcoinAddress = reactRedux.useSelector(selectBitcoinAddress);
  var bitcoinPubkey = reactRedux.useSelector(selectBitcoinPubkey);
  var transactionOption = reactRedux.useSelector(selectTransactionOption);
  var _useState3 = React.useState(false),
    isCancellingApprove = _useState3[0],
    setCancellingApprove = _useState3[1];
  var _useState4 = React.useState(false),
    isApproving = _useState4[0],
    setApproving = _useState4[1];
  var _useState5 = React.useState(false),
    isSubmitting = _useState5[0],
    setSubmitting = _useState5[1];
  var _useState6 = React.useState(false),
    isSigning = _useState6[0],
    setSigning = _useState6[1];
  var _useState7 = React.useState(false),
    isBTCSigning = _useState7[0],
    setBTCSigning = _useState7[1];
  var _useState8 = React.useState(false),
    isBTCSigned = _useState8[0],
    setBTCSigned = _useState8[1];
  var _useState9 = React.useState(''),
    btcHash = _useState9[0],
    setBTCHash = _useState9[1];
  var _useState10 = React.useState(0),
    btcTimestamp = _useState10[0],
    setBTCTimestamp = _useState10[1];
  var _useState11 = React.useState(false),
    isConfirming = _useState11[0],
    setConfirming = _useState11[1];
  var _useState12 = React.useState(false),
    isVerifying = _useState12[0],
    setVerifying = _useState12[1];
  var _useIsWalletReady = useIsWalletReady(),
    isReady = _useIsWalletReady.isReady,
    walletAddress = _useIsWalletReady.walletAddress;
  var pendingTxs = reactRedux.useSelector(selectPendingTxs);
  var _useAllowance = useAllowance({
      setApproving: setApproving,
      setCancellingApprove: setCancellingApprove
    }),
    allowance = _useAllowance.allowance,
    approved = _useAllowance.isApproved,
    approve = _useAllowance.approve,
    poolAddress = _useAllowance.poolAddress;
  var _useSign = useSign({
      setSigning: setSigning
    }),
    isSigned = _useSign.isSigned,
    sign = _useSign.sign;
  var _useServiceFee = useServiceFee(isConfirming, feeURL),
    fee = _useServiceFee.serviceFee;
  var _useBalance = useBalance(),
    balance = _useBalance.balance;
  var _useWidth = useWidth(),
    windowWidth = _useWidth.width;
  var isApproved = React.useMemo(function () {
    if (sourceChain === exports.SupportNetworks.BTC) return isBTCSigned;
    return approved;
  }, [approved, isBTCSigned, sourceChain]);
  React.useEffect(function () {
    if (!walletAddress) return;
    dispatch(setTargetAddress(walletAddress));
    if (!compliantOption) return;
    (function () {
      try {
        var _temp = _catch(function () {
          return Promise.resolve(fetchWrapper.post(backendUrl + "/compliant", JSON.stringify({
            address: walletAddress
          }))).then(function (res) {
            dispatch(setSourceCompliant(res));
          });
        }, function (e) {
          toast.toast.error('xplorisk check failed', {
            icon: React__default.createElement(Error$1, null)
          });
          console.log('xplorisk check failed', e);
        });
        return _temp && _temp.then ? _temp.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [walletAddress, compliantOption]);
  React.useEffect(function () {
    if (!targetAddress || !compliantOption) return;
    (function () {
      try {
        var _temp2 = _catch(function () {
          return Promise.resolve(fetchWrapper.post(backendUrl + "/compliant", JSON.stringify({
            address: targetAddress
          }))).then(function (res) {
            dispatch(setTargetCompliant(res));
          });
        }, function (e) {
          toast.toast.error('xplorisk check failed', {
            icon: React__default.createElement(Error$1, null)
          });
          console.log('xplorisk check failed', e);
        });
        return _temp2 && _temp2.then ? _temp2.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [targetAddress, compliantOption]);
  React.useEffect(function () {
    if (!nodeProviderQuery) return;
    try {
      return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/pool_balance")).then(function (res) {
        var poolsTable = [];
        for (var _iterator = _createForOfIteratorHelperLoose(res.poolBalance), _step; !(_step = _iterator()).done;) {
          var pool = _step.value;
          for (var _iterator2 = _createForOfIteratorHelperLoose(pool.balance), _step2; !(_step2 = _iterator2()).done;) {
            var token = _step2.value;
            poolsTable.push({
              chain: CHAIN_NAMES_TO_STRING[pool.chainName],
              symbol: token.tokenSymbol,
              balance: +token.amount
            });
          }
        }
        console.table(poolsTable);
      });
    } catch (e) {
      Promise.reject(e);
    }
  }, [nodeProviderQuery]);
  React.useEffect(function () {
    if (!isReady) {
      if (formStep > 0) setFormStep(0);
      if (wizardStep > 0) setWizardStep(1);
    }
  }, [isReady, wizardStep, formStep, dAppOption]);
  var checkPoolBalance = function checkPoolBalance() {
    try {
      return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/pool_balance")).then(function (res) {
        var poolBalance = res.poolBalance;
        for (var i = 0; i < poolBalance.length; i++) {
          if (poolBalance[i].chainName === targetChain) {
            for (var j = 0; j < poolBalance[i].balance.length; j++) {
              if (poolBalance[i].balance[j].tokenSymbol !== targetCurrency) continue;
              if (+poolBalance[i].balance[j].amount >= +amount + fee) {
                return true;
              }
              var symbol = targetCurrency;
              var errorString = "Tried to transfer " + amount + " " + symbol + ", but " + CHAIN_NAMES_TO_STRING[targetChain] + " pool has only " + +poolBalance[i].balance[j].amount + " " + symbol;
              console.log(errorString);
              toast.toast.error(errorString, {
                icon: React__default.createElement(Error$1, null)
              });
              toast.toast.error(CHAIN_NAMES_TO_STRING[targetChain] + " pool has insufficient balance!", {
                icon: React__default.createElement(Error$1, null)
              });
              errorHandler(errorString);
              return false;
            }
            return false;
          }
        }
        console.log(CHAIN_NAMES_TO_STRING[targetChain] + " pool error");
        return false;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var handleBTCFinish = function handleBTCFinish(hash, htlcAddress, timestamp) {
    try {
      var params = JSON.stringify({
        fromAddress: walletAddress,
        senderPubkey: bitcoinPubkey,
        amount: feeDeduct ? amount : (+amount + fee).toFixed(8),
        txHash: hash,
        htlcTimeout: timestamp.toString(),
        htlcAddress: htlcAddress
      });
      console.log(params);
      return Promise.resolve(fetchWrapper.post(backendUrl + "/auth", params)).then(function () {
        return Promise.resolve(fetchWrapper.post(backendUrl + "/htlc", params)).then(function (result) {
          var _interrupt = false;
          console.log(result);
          if ((result === null || result === void 0 ? void 0 : result.code) !== 0) {
            errorHandler(result);
            toast.toast.error('Failed to submit htlc request!', {
              icon: React__default.createElement(Error$1, null)
            });
            return;
          }
          var _temp4 = _do(function () {
            return Promise.resolve(sleep(10000)).then(function () {
              var _temp3 = _catch(function () {
                return Promise.resolve(fetchWrapper.get(backendUrl + "/btc/transaction?hash=" + hash)).then(function (txInfo) {
                  var _txInfo$status;
                  if (txInfo !== null && txInfo !== void 0 && (_txInfo$status = txInfo.status) !== null && _txInfo$status !== void 0 && _txInfo$status.confirmed) {
                    setBTCSigning(false);
                    setBTCSigned(true);
                    setBTCHash(hash);
                    _interrupt = true;
                  }
                });
              }, function (e) {
                console.log(e);
              });
              if (_temp3 && _temp3.then) return _temp3.then(function () {});
            });
          }, function () {
            return !_interrupt && 1;
          });
          if (_temp4 && _temp4.then) return _temp4.then(function () {});
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var handleHtlcContinue = function handleHtlcContinue(expireTime, hash, amount) {
    try {
      setBTCTimestamp(expireTime);
      setBTCSigning(false);
      setBTCSigned(true);
      setBTCHash(hash);
      dispatch(setFeeDeduct(true));
      dispatch(setAmount(amount));
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var handleHtlcReclaim = function handleHtlcReclaim(expireTime, hash, amount) {
    try {
      var htlcScript = createHTLCScript(bitcoinAddress, bitcoinPubkey, poolAddress, expireTime, bitcoin.networks.testnet);
      console.log('HTLC Script : ' + htlcScript.toString('hex'));
      var htlcAddress = htlcP2WSHAddress(htlcScript, bitcoin.networks.testnet);
      console.log('HTLC address : ' + htlcAddress);
      return Promise.resolve(Promise.all([getUTXOs(satsConnect.BitcoinNetworkType.Testnet, htlcAddress)])).then(function (_ref2) {
        var htlcUnspentOutputs = _ref2[0];
        if (htlcUnspentOutputs.length === 0) {
          alert('No unspent outputs found for HTLC address');
          return;
        }
        var htlcUtxo = htlcUnspentOutputs[htlcUnspentOutputs.length - 1];
        var fee = '5000';
        var reclaimPsbtBase64 = createReclaimPsbt(bitcoinAddress, Math.round(+amount * 1e8).toString(), expireTime, htlcScript, htlcUtxo, bitcoin.networks.testnet, fee);
        return Promise.resolve(satsConnect.signTransaction({
          payload: {
            network: {
              type: satsConnect.BitcoinNetworkType.Testnet
            },
            message: 'Sign Reclaim Transaction',
            psbtBase64: reclaimPsbtBase64,
            broadcast: false,
            inputsToSign: [{
              address: bitcoinAddress,
              signingIndexes: [0],
              sigHash: btc.SigHash.ALL
            }]
          },
          onFinish: function (response) {
            try {
              console.log('response = ', response);
              console.log('reponse.txId = ', response.txId);
              var tx = decodeBase64PSBT(response.psbtBase64);
              tx.finalize();
              var rawTxHex = tx.hex;
              console.log('rawTxHex = ' + rawTxHex);
              return Promise.resolve(_catch(function () {
                return Promise.resolve(broadcastTransaction(rawTxHex, '/testnet')).then(function (broadcastResponse) {
                  console.log('broadcastResponse = ' + broadcastResponse);
                  console.log(broadcastResponse);
                  var params = JSON.stringify({
                    senderAddress: walletAddress,
                    txHash: hash
                  });
                  return Promise.resolve(fetchWrapper.post(backendUrl + "/auth", params)).then(function () {
                    return Promise.resolve(fetchWrapper.post(backendUrl + "/reclaim", params)).then(function (result) {
                      console.log(result);
                      if ((result === null || result === void 0 ? void 0 : result.code) !== 0) {
                        errorHandler(result);
                        toast.toast.error('Failed to submit htlc reclaim!', {
                          icon: React__default.createElement(Error$1, null)
                        });
                      }
                    });
                  });
                });
              }, function (error) {
                toast.toast.error('Error broadcasting the transaction!', {
                  icon: React__default.createElement(Error$1, null)
                });
                console.error('Error broadcasting the transaction!', error);
              }));
            } catch (e) {
              return Promise.reject(e);
            }
          },
          onCancel: function onCancel() {
            toast.toast.error('Transaction cancelled!', {
              icon: React__default.createElement(Error$1, null)
            });
          }
        })).then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var handleSubmit = function handleSubmit() {
    try {
      var _temp8 = function _temp8(_result2) {
        var _exit2 = false;
        if (_exit) return _result2;
        return _catch(function () {
          var _exit3 = false;
          if (sourceChain === exports.SupportNetworks.FIAT || targetChain === exports.SupportNetworks.FIAT) return;
          setSubmitting(true);
          if (dAppOption === exports.DAppOptions.LPDrain || dAppOption === exports.DAppOptions.LPAdd) {
            keplrHandler(walletAddress);
            return;
          }
          return Promise.resolve(checkPoolBalance()).then(function (_checkPoolBalance) {
            if (!_checkPoolBalance) {
              setSubmitting(false);
              _exit2 = true;
              return;
            }
            var params;
            var feeParam;
            if (sourceChain === exports.SupportNetworks.BTC || targetChain === exports.SupportNetworks.BTC) {
              feeParam = fee.toFixed(8);
            } else {
              feeParam = fee.toFixed(2);
            }
            if (sourceChain === exports.SupportNetworks.BTC) {
              params = JSON.stringify({
                originAddress: walletAddress,
                originChain: sourceChain,
                targetAddress: mode === exports.ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress : targetAddress,
                targetChain: targetChain,
                originSymbol: sourceCurrency,
                targetSymbol: targetCurrency,
                amount: feeDeduct ? (+amount - fee).toFixed(8) : amount,
                fee: feeParam,
                htlcCreationHash: btcHash,
                htlcCreationVout: 0,
                htlcExpirationTimestamp: btcTimestamp.toString(),
                htlcVersion: 'v1',
                senderPubKey: bitcoinPubkey
              });
            } else {
              params = JSON.stringify({
                originAddress: walletAddress,
                originChain: sourceChain,
                targetAddress: mode === exports.ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress : targetAddress,
                targetChain: targetChain,
                originSymbol: sourceCurrency,
                targetSymbol: targetCurrency,
                amount: feeDeduct ? (+amount - fee).toFixed(8) : amount,
                fee: feeParam,
                htlcCreationHash: '',
                htlcCreationVout: 0,
                htlcExpirationTimestamp: '0',
                htlcVersion: '',
                senderPubKey: ''
              });
            }
            console.log(params);
            return Promise.resolve(fetchWrapper.post(backendUrl + "/auth", params)).then(function () {
              return Promise.resolve(fetchWrapper.post(backendUrl + "/submit", params)).then(function (result) {
                console.log(result);
                if ((result === null || result === void 0 ? void 0 : result.code) !== 0) {
                  errorHandler(result);
                  toast.toast.error('Failed to submit transaction!', {
                    icon: React__default.createElement(Error$1, null)
                  });
                  setSubmitting(false);
                  return;
                }
                var txId = -1;
                for (var _iterator3 = _createForOfIteratorHelperLoose(result.events), _step3; !(_step3 = _iterator3()).done;) {
                  var event = _step3.value;
                  if (event.type === 'transaction_requested') {
                    for (var _iterator4 = _createForOfIteratorHelperLoose(event.attributes), _step4; !(_step4 = _iterator4()).done;) {
                      var attr = _step4.value;
                      if (attr.key === 'txId') {
                        txId = attr.value;
                      }
                    }
                  }
                }
                console.log(txId);
                setSubmitting(false);
                dispatch(setTxId(txId));
                dispatch(setSubmitted(true));
              });
            });
          });
        }, function (e) {
          errorHandler(e);
          setSubmitting(false);
          console.log((e === null || e === void 0 ? void 0 : e.status) !== 500 ? 'rpc disconnected' : '', e);
          toast.toast.error('rpc disconnected', {
            icon: React__default.createElement(Error$1, null)
          });
          toast.toast.error('Failed to submit transaction', {
            icon: React__default.createElement(Error$1, null)
          });
        });
      };
      var _exit = false;
      if (fee < 0) {
        toast.toast.error('Fee is not calculated!', {
          icon: React__default.createElement(Error$1, null)
        });
        errorHandler('Fee is not calculated!');
        return Promise.resolve();
      }
      if (dAppOption !== exports.DAppOptions.LPDrain && balance < (feeDeduct ? +amount : +amount + fee)) {
        toast.toast.error('Insufficient balance!', {
          icon: React__default.createElement(Error$1, null)
        });
        errorHandler('Insufficient balance!');
        return Promise.resolve();
      }
      if (sourceChain === exports.SupportNetworks.BTC && +amount < 0.00015) {
        toast.toast.error('Minimum BTC amount is 0.00015!', {
          icon: React__default.createElement(Error$1, null)
        });
        errorHandler('Minimum BTC amount is 0.00015!');
        return Promise.resolve();
      }
      if (sourceChain === exports.SupportNetworks.FIAT || targetChain === exports.SupportNetworks.FIAT) {
        if (kycStatus !== 'approved') {
          setVerifying(true);
          dispatch(setBankPopup(true));
          return Promise.resolve();
        }
      }
      if (sourceChain === exports.SupportNetworks.FIAT) {
        if (!isSigned) {
          sign();
          return Promise.resolve();
        }
      } else if (!isApproved && dAppOption !== exports.DAppOptions.LPDrain && sourceChain !== exports.SupportNetworks.BTC) {
        approve();
        return Promise.resolve();
      }
      var _temp7 = function () {
        if (sourceChain === exports.SupportNetworks.BTC && !isApproved) {
          var _temp6 = function _temp6() {
            _exit = true;
          };
          setBTCSigning(true);
          var unixTimestamp = Math.floor(Date.now() / 1000) + (expireTime === '1 hour' ? 3600 : expireTime === '2 hours' ? 7200 : 10800);
          setBTCTimestamp(unixTimestamp);
          var htlcScript = createHTLCScript(bitcoinAddress, bitcoinPubkey, poolAddress, unixTimestamp, bitcoin.networks.testnet);
          var htlcAddress = htlcP2WSHAddress(htlcScript, bitcoin.networks.testnet);
          var _temp5 = _catch(function () {
            return Promise.resolve(satsConnect.sendBtcTransaction({
              payload: {
                network: {
                  type: satsConnect.BitcoinNetworkType.Testnet
                },
                recipients: [{
                  address: htlcAddress,
                  amountSats: BigInt(Math.round((feeDeduct ? +amount : +amount + fee) * 100000000))
                }],
                senderAddress: bitcoinAddress
              },
              onFinish: function (hash) {
                handleBTCFinish(hash, htlcAddress, unixTimestamp);
                return Promise.resolve();
              },
              onCancel: function onCancel() {
                toast.toast.error('Transaction cancelled.', {
                  icon: React__default.createElement(Error$1, null)
                });
                setBTCSigning(false);
              }
            })).then(function () {});
          }, function (e) {
            setBTCSigning(false);
            console.log(e);
          });
          return _temp5 && _temp5.then ? _temp5.then(_temp6) : _temp6(_temp5);
        }
      }();
      return Promise.resolve(_temp7 && _temp7.then ? _temp7.then(_temp8) : _temp8(_temp7));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var onNext = function onNext() {
    var _mainRef$current;
    if ( !formStep) {
      if (isReady) {
        if (targetChain === exports.SupportNetworks.FIAT) {
          if (!bankDetails.iban) {
            toast.toast.error('Invalid IBAN!', {
              icon: React__default.createElement(Error$1, null)
            });
            errorHandler('Invalid IBAN!');
            return;
          }
          if (!bankDetails.recipient) {
            toast.toast.error('Invalid Recipient Address!', {
              icon: React__default.createElement(Error$1, null)
            });
            errorHandler('Invalid Recipient Address!');
            return;
          }
        }
        if (+amount <= 0) {
          toast.toast.error('Invalid amount!', {
            icon: React__default.createElement(Error$1, null)
          });
          errorHandler('Invalid amount!');
          return;
        }
        if (fee < 0) {
          toast.toast.error('Fee is not calculated!', {
            icon: React__default.createElement(Error$1, null)
          });
          errorHandler('Fee is not calculated!');
          return;
        }
        if (compliantOption && (sourceCompliant !== 'low' || targetCompliant !== 'low')) return;
        if (fee > 0 && fee > +amount && feeDeduct) {
          toast.toast.error('Fee is greater than amount to transfer!', {
            icon: React__default.createElement(Error$1, null)
          });
          errorHandler('Fee is greater than amount to transfer!');
          return;
        }
        if (mode === exports.ModeOptions.payment || targetAddress && +amount > 0) {
          setConfirming(true);
          setFormStep(1);
        }
        return;
      } else {
        toast.toast.error('Wallet is not connected!', {
          icon: React__default.createElement(Error$1, null)
        });
        errorHandler('Wallet is not connected!');
      }
    }
    if (  formStep > 0) {
      handleSubmit();
    }
    (_mainRef$current = mainRef.current) === null || _mainRef$current === void 0 ? void 0 : _mainRef$current.click();
  };
  var onBack = function onBack() {
    if (isApproving || isSubmitting || isSigning) return;
    if ( formStep > 0) {
      setFormStep(0);
      setConfirming(false);
    }
    if (  formStep === 0) {
      closeHandler();
    }
  };
  var getButtonLabel = function getButtonLabel() {
    if (  formStep === 1) {
      if (sourceChain === exports.SupportNetworks.FIAT || targetChain === exports.SupportNetworks.FIAT) {
        if (isVerifying) return 'KYC Verifying...';
        if (kycStatus !== 'approved') {
          return 'KYC Verify';
        }
      }
      if (sourceChain === exports.SupportNetworks.BTC && !isApproved) {
        return isBTCSigning ? 'Signing...' : 'Sign';
      }
      if (sourceChain !== exports.SupportNetworks.FIAT && isApproved || dAppOption === exports.DAppOptions.LPDrain || sourceChain === exports.SupportNetworks.FIAT && isSigned) {
        return isSubmitting ? 'Submitting...' : 'Submit';
      } else if (sourceChain === exports.SupportNetworks.FIAT) {
        return isSigning ? 'Signing...' : 'Sign';
      } else {
        return isApproving ? 'Approving...' : 'Approve';
      }
    }
    return 'Next';
  };
  var onCancelApprove = function onCancelApprove() {
    if (isCancellingApprove) return;
    approve(true);
  };
  React.useEffect(function () {
    dispatch(setTheme(theme));
  }, [theme]);
  React.useEffect(function () {
    if (!nodeProviderQuery || sourceChain !== exports.SupportNetworks.BTC || !walletAddress) return;
    var updatePendingTxs = function updatePendingTxs() {
      try {
        return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/transaction/get_htlc_transaction/" + walletAddress)).then(function (result) {
          var data = result === null || result === void 0 ? void 0 : result.htlcLockingTransaction;
          var txData = [];
          if (data.length > 0) {
            for (var _iterator5 = _createForOfIteratorHelperLoose(data), _step5; !(_step5 = _iterator5()).done;) {
              var tx = _step5.value;
              var status = '';
              if (tx.status !== 'Completed') {
                status = 'Confirming';
              } else if (tx.pull_status === 'htlc_pull_available') {
                status = 'Pending';
              } else if (tx.pull_status === 'htlc_pull_in_progress') {
                status = 'In Progress';
              } else if (tx.pull_status === 'htlc_pull_succeed') {
                status = 'Completed';
              } else if (tx.pull_status === 'htlc_pull_failed') {
                status = 'Failed';
              }
              txData.push({
                hash: tx.txHash,
                amount: tx.amount,
                expireTime: tx.htlcTimestamp,
                status: status
              });
            }
            dispatch(setPendingTxData(txData));
            dispatch(setPendingTxs(txData.filter(function (tx) {
              return tx.status === 'Pending' || tx.status === 'Confirming';
            }).length));
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    var timerId = setInterval(function () {
      updatePendingTxs();
    }, 10000);
    updatePendingTxs();
    return function () {
      clearInterval(timerId);
    };
  }, [sourceChain, nodeProviderQuery, walletAddress]);
  return React__default.createElement("div", {
    className: "kima-card " + theme.colorMode,
    style: {
      background: theme.colorMode === exports.ColorModeOptions.light ? theme.backgroundColorLight : theme.backgroundColorDark
    }
  }, React__default.createElement("div", {
    className: 'kima-card-header'
  }, React__default.createElement("div", {
    className: 'topbar'
  }, React__default.createElement("div", {
    className: 'title'
  }, React__default.createElement("h3", null, formStep === 0 ? titleOption !== null && titleOption !== void 0 && titleOption.initialTitle ? titleOption.initialTitle : mode === exports.ModeOptions.payment ? 'New Purchase' : 'New Transfer' : titleOption !== null && titleOption !== void 0 && titleOption.confirmTitle ? titleOption.confirmTitle : mode === exports.ModeOptions.payment ? 'Confirm Purchase' : 'Transfer Details')), React__default.createElement("div", {
    className: 'control-buttons'
  }, pendingTxs > 0 ? React__default.createElement(TxButton, {
    theme: theme
  }) : null, React__default.createElement(ExternalLink, {
    to: helpURL ? helpURL : 'https://docs.kima.network/kima-network/try-kima-with-the-demo-app'
  }, React__default.createElement("div", {
    className: 'menu-button'
  }, "I need help")), React__default.createElement("button", {
    className: 'cross-icon-button',
    onClick: function onClick() {
      if (isApproving || isSubmitting || isSigning) return;
      dispatch(initialize());
      closeHandler();
    },
    disabled: isApproving || isSubmitting || isSigning
  }, React__default.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  })))), React__default.createElement("h4", {
    className: 'subtitle'
  }, mode === exports.ModeOptions.payment && formStep === 0 && (paymentTitleOption === null || paymentTitleOption === void 0 ? void 0 : paymentTitleOption.title))), React__default.createElement("div", {
    className: 'kima-card-content',
    ref: mainRef
  },  formStep === 0 ? React__default.createElement(SingleForm, null) : React__default.createElement(ConfirmDetails, {
    isApproved: sourceChain === exports.SupportNetworks.FIAT ? isSigned : isApproved
  })), React__default.createElement("div", {
    className: "kima-card-footer " + (mode === exports.ModeOptions.bridge && formStep === 0 && 'bridge')
  }, React__default.createElement("div", {
    className: "button-group " + (formStep !== 0 && allowance > 0 && 'confirm')
  }, React__default.createElement(SecondaryButton, {
    clickHandler: onBack,
    theme: theme.colorMode,
    disabled: isApproving || isSubmitting || isSigning || isBTCSigning
  },   formStep > 0 ? 'Back' : 'Cancel'), allowance > 0 && (  formStep === 1) ? React__default.createElement(PrimaryButton, {
    clickHandler: onCancelApprove,
    isLoading: isCancellingApprove,
    disabled: isCancellingApprove || isApproving || isSubmitting || isSigning || isBTCSigning
  }, isCancellingApprove ? 'Cancelling Approval' : 'Cancel Approve') : null, React__default.createElement(PrimaryButton, {
    clickHandler: onNext,
    isLoading: isApproving || isSubmitting || isSigning || isBTCSigning,
    disabled: isApproving || isSubmitting || isSigning || isBTCSigning
  }, getButtonLabel()))), React__default.createElement(SolanaWalletConnectModal, null), React__default.createElement(TronWalletConnectModal, null), sourceChain === exports.SupportNetworks.FIAT || targetChain === exports.SupportNetworks.FIAT ? React__default.createElement(BankPopup, {
    setVerifying: setVerifying,
    isVerifying: isVerifying
  }) : null, React__default.createElement(toast.Toaster, {
    position: 'top-right',
    reverseOrder: false,
    containerStyle: {
      position: 'absolute'
    },
    toastOptions: {
      duration: 3 * 1000,
      style: {
        position: 'relative',
        top: windowWidth > 768 ? '3rem' : '1.5rem',
        right: windowWidth > 768 ? '1.5rem' : '0rem',
        margin: '5px 0',
        padding: '.7rem 1.5rem',
        color: theme.colorMode === exports.ColorModeOptions.light ? 'black' : 'white',
        fontSize: '1em',
        borderRadius: '50px',
        border: '1px solid #B900004D',
        background: theme.colorMode === exports.ColorModeOptions.light ? '#F7F8F9' : '#242732'
      }
    }
  }), React__default.createElement(PendingTxPopup, {
    handleHtlcContinue: handleHtlcContinue,
    handleHtlcReclaim: handleHtlcReclaim
  }), React__default.createElement("div", {
    className: 'floating-footer'
  }, React__default.createElement("div", {
    className: "items " + theme.colorMode
  }, React__default.createElement("span", null, "Powered by"), React__default.createElement(FooterLogo, {
    width: 50,
    fill: 'black'
  }), React__default.createElement("strong", null, "Network"))));
};

var KimaTransactionWidget = function KimaTransactionWidget(_ref) {
  var mode = _ref.mode,
    txId = _ref.txId,
    _ref$autoSwitchChain = _ref.autoSwitchChain,
    autoSwitchChain = _ref$autoSwitchChain === void 0 ? true : _ref$autoSwitchChain,
    _ref$networkOption = _ref.networkOption,
    networkOption = _ref$networkOption === void 0 ? exports.NetworkOptions.testnet : _ref$networkOption,
    provider = _ref.provider,
    _ref$dAppOption = _ref.dAppOption,
    dAppOption = _ref$dAppOption === void 0 ? exports.DAppOptions.None : _ref$dAppOption,
    theme = _ref.theme,
    titleOption = _ref.titleOption,
    paymentTitleOption = _ref.paymentTitleOption,
    _ref$useFIAT = _ref.useFIAT,
    useFIAT = _ref$useFIAT === void 0 ? false : _ref$useFIAT,
    _ref$helpURL = _ref.helpURL,
    helpURL = _ref$helpURL === void 0 ? '' : _ref$helpURL,
    _ref$compliantOption = _ref.compliantOption,
    compliantOption = _ref$compliantOption === void 0 ? true : _ref$compliantOption,
    transactionOption = _ref.transactionOption,
    kimaBackendUrl = _ref.kimaBackendUrl,
    kimaNodeProviderQuery = _ref.kimaNodeProviderQuery,
    _ref$kimaExplorer = _ref.kimaExplorer,
    kimaExplorer = _ref$kimaExplorer === void 0 ? 'https://explorer.kima.finance' : _ref$kimaExplorer,
    _ref$feeURL = _ref.feeURL,
    feeURL = _ref$feeURL === void 0 ? 'https://fee.kima.finance' : _ref$feeURL,
    _ref$kimaGraphqlProvi = _ref.kimaGraphqlProviderQuery,
    kimaGraphqlProviderQuery = _ref$kimaGraphqlProvi === void 0 ? 'https://graphql.kima.finance/v1/graphql' : _ref$kimaGraphqlProvi,
    _ref$errorHandler = _ref.errorHandler,
    errorHandler = _ref$errorHandler === void 0 ? function () {
      return void 0;
    } : _ref$errorHandler,
    _ref$closeHandler = _ref.closeHandler,
    closeHandler = _ref$closeHandler === void 0 ? function () {
      return void 0;
    } : _ref$closeHandler,
    _ref$successHandler = _ref.successHandler,
    successHandler = _ref$successHandler === void 0 ? function () {
      return void 0;
    } : _ref$successHandler,
    _ref$switchChainHandl = _ref.switchChainHandler,
    switchChainHandler = _ref$switchChainHandl === void 0 ? function () {
      return void 0;
    } : _ref$switchChainHandl,
    _ref$keplrHandler = _ref.keplrHandler,
    keplrHandler = _ref$keplrHandler === void 0 ? function () {
      return void 0;
    } : _ref$keplrHandler;
  var submitted = reactRedux.useSelector(selectSubmitted);
  var dispatch = reactRedux.useDispatch();
  var _useWeb3ModalTheme = react.useWeb3ModalTheme(),
    setThemeMode = _useWeb3ModalTheme.setThemeMode,
    setThemeVariables = _useWeb3ModalTheme.setThemeVariables;
  React.useEffect(function () {
    dispatch(setTheme(theme));
    setThemeMode(theme.colorMode === exports.ColorModeOptions.light ? 'light' : 'dark');
    setThemeVariables({
      "--w3m-font-family": "Manrope, sans-serif",
      "--w3m-border-radius-master": "42px"
    });
    if (transactionOption) dispatch(setTransactionOption(transactionOption));
    dispatch(setKimaExplorer(kimaExplorer));
    dispatch(setCompliantOption(compliantOption));
    dispatch(setErrorHandler(errorHandler));
    dispatch(setKeplrHandler(keplrHandler));
    dispatch(setCloseHandler(closeHandler));
    dispatch(setSuccessHandler(successHandler));
    dispatch(setSwitchChainHandler(switchChainHandler));
    dispatch(setBackendUrl(kimaBackendUrl));
    dispatch(setNodeProviderQuery(kimaNodeProviderQuery));
    dispatch(setGraphqlProviderQuery(kimaGraphqlProviderQuery));
    dispatch(setMode(mode));
    dispatch(setProvider(provider));
    dispatch(setDappOption(dAppOption));
    dispatch(setWalletAutoConnect(autoSwitchChain));
    dispatch(setUseFIAT(useFIAT));
    dispatch(setNetworkOption(networkOption));
    if (useFIAT) {
      dispatch(setTxId(txId || -1));
      (function () {
        try {
          var _temp = _catch(function () {
            return Promise.resolve(fetchWrapper.get(kimaBackendUrl + "/uuid")).then(function (uuid) {
              dispatch(setUuid(uuid));
              console.log('depasify uuid: ', uuid);
            });
          }, function (e) {
            console.log('uuid generate failed', e);
          });
          return _temp && _temp.then ? _temp.then(function () {}) : void 0;
        } catch (e) {
          Promise.reject(e);
        }
      })();
    }
    if (mode === exports.ModeOptions.payment) {
      dispatch(setTargetChain((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain) || exports.SupportNetworks.ETHEREUM));
      if (dAppOption === exports.DAppOptions.LPAdd || dAppOption === exports.DAppOptions.LPDrain) {
        dispatch(setSourceChain((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain) || exports.SupportNetworks.ETHEREUM));
        dispatch(setTargetCurrency((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.currency) || 'USDK'));
      } else {
        (function () {
          try {
            var _temp4 = function _temp4() {
              return _catch(function () {
                var _temp2 = function () {
                  if (transactionOption !== null && transactionOption !== void 0 && transactionOption.targetAddress) {
                    return Promise.resolve(fetchWrapper.post(kimaBackendUrl + "/compliant", JSON.stringify({
                      address: transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress
                    }))).then(function (compliantRes) {
                      dispatch(setTargetCompliant(compliantRes));
                    });
                  }
                }();
                if (_temp2 && _temp2.then) return _temp2.then(function () {});
              }, function (e) {
                toast__default.error('xplorisk check failed');
                console.log('xplorisk check failed', e);
              });
            };
            var _temp3 = _catch(function () {
              return Promise.resolve(fetchWrapper.get(kimaNodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_available_chains/" + ((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain) || exports.SupportNetworks.ETHEREUM))).then(function (networks) {
                dispatch(setSourceChain(networks.Chains[0]));
              });
            }, function (e) {
              toast__default.error('rpc disconnected!');
              console.log('rpc disconnected', e);
            });
            return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
          } catch (e) {
            Promise.reject(e);
          }
        })();
      }
      dispatch(setTargetAddress((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress) || ''));
      dispatch(setAmount((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.amount.toString()) || ''));
    } else if (mode === exports.ModeOptions.status) {
      dispatch(setTxId(txId || 1));
      dispatch(setSubmitted(true));
    }
  }, [provider, theme, transactionOption, errorHandler, closeHandler, mode, networkOption]);
  React.useEffect(function () {
    if (dAppOption === exports.DAppOptions.None && mode === exports.ModeOptions.bridge) {
      dispatch(setTargetChain(''));
      dispatch(setSourceChain('ETH'));
    }
  }, [dAppOption, mode]);
  return submitted ? React__default.createElement(TransactionWidget, {
    theme: theme
  }) : React__default.createElement(TransferWidget, {
    theme: theme,
    feeURL: feeURL,
    helpURL: helpURL,
    titleOption: titleOption,
    paymentTitleOption: paymentTitleOption
  });
};

var ConnectionProvider = SolanaAdapter.ConnectionProvider,
  SolanaWalletProvider = SolanaAdapter.WalletProvider;
var ethereumSepolia = {
  chainId: 11155111,
  name: 'Ethereum Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com'
};
var ethereum = {
  chainId: 1,
  name: 'Ethereum Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://endpoints.omniatech.io/v1/eth/mainnet/public'
};
var bscTestnet = {
  chainId: 97,
  name: 'BNB Smart Chain Testnet',
  currency: 'tBNB',
  explorerUrl: 'https://testnet.bscscan.com',
  rpcUrl: 'https://endpoints.omniatech.io/v1/bsc/testnet/public'
};
var bsc = {
  chainId: 56,
  name: 'BNB Smart Chain Mainnet',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
};
var polygonAmoy = {
  chainId: 80002,
  name: 'Amoy',
  currency: 'MATIC',
  explorerUrl: 'https://www.oklink.com/amoy',
  rpcUrl: 'https://rpc-amoy.polygon.technology'
};
var polygon = {
  chainId: 137,
  name: 'Polygon Mainnet',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com/'
};
var arbitrumSepolia = {
  chainId: 421614,
  name: 'Arbitrum Sepolia Testnet',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.arbiscan.io/',
  rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
};
var arbitrum = {
  chainId: 42161,
  name: 'Arbitrum Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://arbiscan.io',
  rpcUrl: 'https://arb1.arbitrum.io/rpc'
};
var optimismSepola = {
  chainId: 11155420,
  name: 'OP Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia-optimism.etherscan.io',
  rpcUrl: 'https://sepolia.optimism.io'
};
var optimism = {
  chainId: 10,
  name: 'OP Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://optimistic.etherscan.io',
  rpcUrl: 'https://mainnet.optimism.io'
};
var avalancheFuji = {
  chainId: 43113,
  name: 'Avalanche Fuji Testnet',
  currency: 'AVAX',
  explorerUrl: 'https://testnet.snowtrace.io',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
};
var avalanche = {
  chainId: 43114,
  name: 'Avalanche Mainnet',
  currency: 'AVAX',
  explorerUrl: 'https://snowtrace.io',
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
};
var zkEVMTestnet = {
  chainId: 2442,
  name: 'Polygon zkEVM Cardona Testnet',
  currency: 'ETH',
  explorerUrl: 'https://cardona-zkevm.polygonscan.com',
  rpcUrl: 'https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public'
};
var zkEVM = {
  chainId: 1101,
  name: 'Polygon zkEVM',
  currency: 'ETH',
  explorerUrl: 'https://zkevm.polygonscan.com',
  rpcUrl: 'https://zkevm-rpc.com'
};
var metadata = {
  name: 'Kima Transaction Widget',
  description: 'Frontend widget for Kima integration for dApps',
  url: 'https://kima.network',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};
var KimaProvider = function KimaProvider(_ref) {
  var walletConnectProjectId = _ref.walletConnectProjectId,
    _ref$networkOption = _ref.networkOption,
    networkOption = _ref$networkOption === void 0 ? exports.NetworkOptions.testnet : _ref$networkOption,
    children = _ref.children;
  var wallets = [new walletAdapterWallets.PhantomWalletAdapter(), new walletAdapterWallets.SolflareWalletAdapter(), new walletAdapterWallets.CloverWalletAdapter(), new walletAdapterWallets.Coin98WalletAdapter(), new walletAdapterWallets.SolongWalletAdapter(), new walletAdapterWallets.TorusWalletAdapter()];
  var adapters = React.useMemo(function () {
    var tronLinkAdapter = new tronwalletAdapterTronlink.TronLinkAdapter();
    var ledger = new tronwalletAdapterLedger.LedgerAdapter({
      accountNumber: 2
    });
    var tokenPocketAdapter = new tronwalletAdapterTokenpocket.TokenPocketAdapter();
    var okxwalletAdapter = new tronwalletAdapterOkxwallet.OkxWalletAdapter();
    return [tronLinkAdapter, tokenPocketAdapter, okxwalletAdapter, ledger];
  }, []);
  function onError(e) {
    if (e instanceof tronwalletAbstractAdapter.WalletNotFoundError) {
      toast.toast.error(e.message);
    } else if (e instanceof tronwalletAbstractAdapter.WalletDisconnectedError) {
      toast.toast.error(e.message);
    } else toast.toast.error(e.message);
  }
  var onChainChanged = function onChainChanged(chainData) {
    toast.toast.error('Please switch to Tron Nile Testnet!');
    if (chainData.chainId !== '0xcd8690dc') {
      adapters[0].switchChain('0xcd8690dc');
    }
  };
  react.createWeb3Modal({
    ethersConfig: react.defaultConfig({
      metadata: metadata
    }),
    chains: networkOption === exports.NetworkOptions.mainnet ? [ethereum, bsc, polygon, arbitrum, optimism, avalanche, zkEVM] : [ethereumSepolia, bscTestnet, polygonAmoy, arbitrumSepolia, optimismSepola, avalancheFuji, zkEVMTestnet],
    projectId: walletConnectProjectId || 'e579511a495b5c312b572b036e60555a',
    enableAnalytics: false,
    featuredWalletIds: ['c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', 'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393', '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0']
  });
  return React__default.createElement(reactRedux.Provider, {
    store: store
  }, React__default.createElement(ConnectionProvider, {
    endpoint: SOLANA_HOST
  }, React__default.createElement(SolanaWalletProvider, {
    wallets: wallets,
    autoConnect: true
  }, React__default.createElement(tronwalletAdapterReactHooks.WalletProvider, {
    onError: onError,
    autoConnect: true,
    disableAutoConnectOnLoad: true,
    adapters: adapters,
    onChainChanged: onChainChanged
  }, children))));
};

exports.CHAIN_NAMES_TO_STRING = CHAIN_NAMES_TO_STRING;
exports.CHAIN_STRING_TO_NAME = CHAIN_STRING_TO_NAME;
exports.KimaProvider = KimaProvider;
exports.KimaTransactionWidget = KimaTransactionWidget;
//# sourceMappingURL=index.js.map
