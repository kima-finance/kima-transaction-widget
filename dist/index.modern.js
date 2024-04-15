import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createSlice as createSlice$1, configureStore as configureStore$1 } from '@reduxjs/toolkit';
import { clusterApiUrl, TransactionInstruction, SystemProgram, SYSVAR_RENT_PUBKEY, PublicKey, Transaction } from '@solana/web3.js';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { useWallet, useConnection, ConnectionProvider as ConnectionProvider$1, WalletProvider as WalletProvider$1 } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter, CloverWalletAdapter, Coin98WalletAdapter, SolongWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet';
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket';
import { useWallet as useWallet$1, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { AdapterState, WalletNotFoundError, WalletDisconnectedError } from '@tronweb3/tronwallet-abstract-adapter';
import toast, { toast as toast$1, Toaster } from 'react-hot-toast';
import { useWeb3ModalProvider, useSwitchNetwork, useWeb3ModalAccount, useWeb3ModalEvents, useWeb3Modal, useWeb3ModalTheme, createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { Tooltip } from 'react-tooltip';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { Contract } from '@ethersproject/contracts';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import { TronWeb } from 'tronweb';
import { ethers, utils } from 'ethers';
import { FIOSDK } from '@fioprotocol/fiosdk';
import BufferLayout from 'buffer-layout';
import sha256 from 'crypto-js/sha256.js';
import Base64 from 'crypto-js/enc-base64.js';

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
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
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
    width = _ref$width === void 0 ? 32 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 32 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'white' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 11 11',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("path", {
    d: 'M9.656 1.688L5.944 5.4L9.656 9.112L8.712 10.056L5 6.344L1.288 10.056L0.344 9.112L4.056 5.4L0.344 1.688L1.288 0.743999L5 4.456L8.712 0.743999L9.656 1.688Z',
    fill: fill
  }));
};

var _excluded$1 = ["width", "height", "fill"];
var Minimize = function Minimize(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 16 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 1 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'white' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 11 1',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("rect", {
    width: '11',
    height: '1',
    fill: fill
  }));
};

var _excluded$2 = ["width", "height", "fill"];
var FooterLogo = function FooterLogo(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 32 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 32 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#C5C5C5' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 103 20',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("path", {
    d: 'M91.483 10.2491C91.483 9.61748 91.8537 9.0958 92.54 9.0958C93.1091 9.11485 93.5697 9.63311 93.5697 10.2491V14.2164C93.5697 14.24 93.5744 14.2633 93.5834 14.2851C93.5924 14.3069 93.6057 14.3266 93.6224 14.3433C93.6391 14.36 93.6589 14.3731 93.6807 14.3821C93.7025 14.3911 93.7259 14.3957 93.7495 14.3956H95.5465C95.5941 14.3956 95.6397 14.3767 95.6733 14.3431C95.7069 14.3095 95.7258 14.2639 95.7258 14.2164V9.80993C95.7258 8.20338 94.7782 7.15953 93.2678 7.15953C92.224 7.15953 91.5377 7.61282 91.0986 8.10519C91.0971 8.10731 91.0951 8.10904 91.0928 8.11023C91.0905 8.11142 91.088 8.11205 91.0854 8.11205C91.0828 8.11205 91.0802 8.11142 91.0779 8.11023C91.0757 8.10904 91.0737 8.10731 91.0722 8.10519C90.6731 7.57326 90.0415 7.16099 89.1349 7.16099C88.3109 7.16099 87.6109 7.50292 87.2661 8.00848L87.2539 8.00506V7.50389C87.2539 7.48031 87.2493 7.45695 87.2404 7.43514C87.2314 7.41334 87.2182 7.39352 87.2015 7.37682C87.1849 7.36012 87.1651 7.34687 87.1433 7.33783C87.1215 7.32879 87.0982 7.32414 87.0746 7.32414H85.2912C85.244 7.32491 85.199 7.34417 85.1658 7.37778C85.1327 7.4114 85.114 7.45668 85.1139 7.50389V14.2164C85.1139 14.2639 85.1328 14.3095 85.1664 14.3431C85.2 14.3767 85.2456 14.3956 85.2932 14.3956H87.0766C87.1241 14.3956 87.1697 14.3767 87.2033 14.3431C87.2369 14.3095 87.2558 14.2639 87.2558 14.2164V10.2491C87.2558 9.61748 87.6266 9.0958 88.2997 9.0958C88.8756 9.11485 89.343 9.63311 89.343 10.2491V14.2164C89.343 14.2639 89.3619 14.3095 89.3955 14.3431C89.4292 14.3767 89.4748 14.3956 89.5223 14.3956H91.3057C91.3532 14.3956 91.3988 14.3767 91.4324 14.3431C91.4661 14.3095 91.4849 14.2639 91.4849 14.2164L91.483 10.2491ZM100.927 14.2164C100.927 14.2639 100.946 14.3095 100.979 14.3431C101.013 14.3767 101.059 14.3956 101.106 14.3956H102.821C102.868 14.3956 102.914 14.3767 102.947 14.3431C102.981 14.3095 103 14.2639 103 14.2164V10.0156C103 8.20338 101.819 7.15953 99.801 7.15953C99.0649 7.15367 98.0533 7.36712 97.4691 7.64555C97.4394 7.66035 97.4145 7.68324 97.3972 7.71158C97.3799 7.73993 97.371 7.77257 97.3714 7.80577V9.2526C97.3714 9.28314 97.3792 9.31319 97.3941 9.33986C97.409 9.36654 97.4304 9.38895 97.4565 9.40497C97.4825 9.42099 97.5122 9.43008 97.5427 9.43136C97.5732 9.43265 97.6035 9.4261 97.6308 9.41232C98.1364 9.16467 98.7142 8.98589 99.3214 8.98589C100.209 8.96831 100.928 9.46654 100.928 10.0981V10.147C100.928 10.17 100.923 10.1927 100.911 10.2128C100.9 10.2328 100.883 10.2494 100.863 10.261C100.844 10.2725 100.821 10.2784 100.798 10.2782C100.775 10.278 100.752 10.2717 100.733 10.2598C100.402 10.0644 99.8577 9.89053 99.2779 9.89053C97.7812 9.89053 96.5454 10.7966 96.5454 12.1697C96.5454 13.6527 97.7812 14.5593 99.209 14.5593C100.033 14.5593 100.678 14.2296 100.925 13.955L100.927 14.2164ZM100.954 12.1712C100.954 12.7344 100.336 13.0362 99.7463 13.0362C99.1284 13.0362 98.5252 12.7344 98.5252 12.1712C98.5252 11.6221 99.1294 11.3203 99.7463 11.3203C100.336 11.3203 100.954 11.6221 100.954 12.1712Z',
    fill: fill
  }), React.createElement("path", {
    d: 'M81.6947 14.3956H83.478C83.5256 14.3956 83.5712 14.3767 83.6048 14.3431C83.6384 14.3095 83.6573 14.2639 83.6573 14.2164V7.5039C83.6573 7.45635 83.6384 7.41075 83.6048 7.37713C83.5712 7.34352 83.5256 7.32463 83.478 7.32463H81.6947C81.6471 7.32463 81.6015 7.34352 81.5679 7.37713C81.5343 7.41075 81.5154 7.45635 81.5154 7.5039V14.2164C81.5154 14.2639 81.5343 14.3095 81.5679 14.3431C81.6015 14.3767 81.6471 14.3956 81.6947 14.3956Z',
    fill: fill
  }), React.createElement("path", {
    d: 'M82.6003 4.00014H82.5705C82.3972 3.99758 82.2252 4.02978 82.0646 4.09482C81.904 4.15987 81.7581 4.25645 81.6355 4.37885C81.5129 4.50125 81.416 4.647 81.3507 4.80747C81.2853 4.96794 81.2528 5.13988 81.255 5.31313C81.2544 5.4851 81.288 5.65548 81.354 5.81429C81.4199 5.97311 81.5169 6.11718 81.6392 6.23807C81.7615 6.35896 81.9067 6.45425 82.0662 6.51837C82.2258 6.58248 82.3966 6.61413 82.5685 6.61147H82.5983C82.7698 6.61147 82.9396 6.5777 83.098 6.51208C83.2564 6.44647 83.4003 6.35029 83.5216 6.22905C83.6428 6.10781 83.739 5.96387 83.8046 5.80546C83.8702 5.64705 83.904 5.47727 83.904 5.30581C83.904 5.13434 83.8702 4.96456 83.8046 4.80615C83.739 4.64774 83.6428 4.5038 83.5216 4.38256C83.4003 4.26132 83.2564 4.16515 83.098 4.09953C82.9396 4.03391 82.7698 4.00014 82.5983 4.00014',
    fill: fill
  }), React.createElement("path", {
    d: 'M79.7198 12.3895C79.4939 12.1693 79.196 12.0384 78.8811 12.0207C77.7161 11.9836 77.5481 11.016 77.5481 10.7717C77.5481 10.5055 77.7332 9.57205 78.8792 9.53542C79.2181 9.51481 79.5358 9.3633 79.7651 9.11289C79.9944 8.86248 80.1175 8.53275 80.1083 8.19331C80.0991 7.85388 79.9584 7.53129 79.7158 7.29366C79.4733 7.05602 79.1479 6.92193 78.8083 6.91969H78.7995C78.4598 6.92039 78.1336 7.05357 77.8905 7.29092C77.6131 7.56153 77.4963 7.92593 77.4963 8.28397C77.4963 8.59903 77.2877 9.46264 76.3196 9.46264C75.9552 9.46264 75.5727 9.56863 75.2938 9.85341C75.2816 9.86562 75.2723 9.87978 75.2611 9.89297V9.8876C75.1937 9.95745 75.1805 9.90225 75.1815 9.86464V4.59704C75.1815 4.54958 75.1627 4.50406 75.1291 4.47046C75.0956 4.43685 75.0502 4.41791 75.0027 4.41778H73.1793C73.1317 4.41778 73.0861 4.43666 73.0525 4.47028C73.0189 4.5039 73 4.5495 73 4.59704V14.2618C73 14.3093 73.0189 14.3549 73.0525 14.3886C73.0861 14.4222 73.1317 14.4411 73.1793 14.4411H75.0027C75.0502 14.4409 75.0957 14.422 75.1293 14.3884C75.1629 14.3548 75.1818 14.3093 75.182 14.2618V11.691C75.182 11.6534 75.1942 11.5982 75.2616 11.6681V11.6637C75.2723 11.6764 75.2816 11.6895 75.2933 11.7018C75.5723 11.988 75.9493 12.0925 76.3191 12.0925C77.2877 12.0925 77.4963 13.0695 77.4963 13.2712C77.4963 13.5501 77.6131 13.9936 77.8905 14.2642C78.1346 14.5025 78.4623 14.6357 78.8034 14.6355C79.1505 14.6361 79.4836 14.499 79.7296 14.2542C79.9757 14.0093 80.1144 13.6769 80.1155 13.3298V13.3215C80.115 13.1473 80.0798 12.975 80.0118 12.8146C79.9439 12.6542 79.8446 12.5091 79.7198 12.3876',
    fill: fill
  }), React.createElement("path", {
    d: 'M6.516 8.084C6.516 8.78 6.276 9.36 5.796 9.824C5.324 10.28 4.6 10.508 3.624 10.508H2.016V14H0.924V5.636H3.624C4.568 5.636 5.284 5.864 5.772 6.32C6.268 6.776 6.516 7.364 6.516 8.084ZM3.624 9.608C4.232 9.608 4.68 9.476 4.968 9.212C5.256 8.948 5.4 8.572 5.4 8.084C5.4 7.052 4.808 6.536 3.624 6.536H2.016V9.608H3.624ZM10.5412 14.108C9.92522 14.108 9.36522 13.968 8.86122 13.688C8.36522 13.408 7.97322 13.012 7.68522 12.5C7.40522 11.98 7.26522 11.38 7.26522 10.7C7.26522 10.028 7.40922 9.436 7.69722 8.924C7.99322 8.404 8.39322 8.008 8.89722 7.736C9.40122 7.456 9.96522 7.316 10.5892 7.316C11.2132 7.316 11.7772 7.456 12.2812 7.736C12.7852 8.008 13.1812 8.4 13.4692 8.912C13.7652 9.424 13.9132 10.02 13.9132 10.7C13.9132 11.38 13.7612 11.98 13.4572 12.5C13.1612 13.012 12.7572 13.408 12.2452 13.688C11.7332 13.968 11.1652 14.108 10.5412 14.108ZM10.5412 13.148C10.9332 13.148 11.3012 13.056 11.6452 12.872C11.9892 12.688 12.2652 12.412 12.4732 12.044C12.6892 11.676 12.7972 11.228 12.7972 10.7C12.7972 10.172 12.6932 9.724 12.4852 9.356C12.2772 8.988 12.0052 8.716 11.6692 8.54C11.3332 8.356 10.9692 8.264 10.5772 8.264C10.1772 8.264 9.80922 8.356 9.47322 8.54C9.14522 8.716 8.88122 8.988 8.68122 9.356C8.48122 9.724 8.38122 10.172 8.38122 10.7C8.38122 11.236 8.47722 11.688 8.66922 12.056C8.86922 12.424 9.13322 12.7 9.46122 12.884C9.78922 13.06 10.1492 13.148 10.5412 13.148ZM23.909 7.424L21.857 14H20.729L19.145 8.78L17.561 14H16.433L14.369 7.424H15.485L16.997 12.944L18.629 7.424H19.745L21.341 12.956L22.829 7.424H23.909ZM30.7927 10.46C30.7927 10.668 30.7807 10.888 30.7567 11.12H25.5007C25.5407 11.768 25.7607 12.276 26.1607 12.644C26.5687 13.004 27.0607 13.184 27.6367 13.184C28.1087 13.184 28.5007 13.076 28.8127 12.86C29.1327 12.636 29.3567 12.34 29.4847 11.972H30.6608C30.4848 12.604 30.1327 13.12 29.6047 13.52C29.0767 13.912 28.4207 14.108 27.6367 14.108C27.0127 14.108 26.4527 13.968 25.9567 13.688C25.4687 13.408 25.0847 13.012 24.8047 12.5C24.5247 11.98 24.3847 11.38 24.3847 10.7C24.3847 10.02 24.5207 9.424 24.7927 8.912C25.0647 8.4 25.4447 8.008 25.9327 7.736C26.4287 7.456 26.9967 7.316 27.6367 7.316C28.2607 7.316 28.8127 7.452 29.2927 7.724C29.7727 7.996 30.1407 8.372 30.3967 8.852C30.6607 9.324 30.7927 9.86 30.7927 10.46ZM29.6647 10.232C29.6647 9.816 29.5727 9.46 29.3887 9.164C29.2047 8.86 28.9527 8.632 28.6327 8.48C28.3207 8.32 27.9727 8.24 27.5887 8.24C27.0367 8.24 26.5647 8.416 26.1727 8.768C25.7887 9.12 25.5687 9.608 25.5127 10.232H29.6647ZM33.1262 8.492C33.3182 8.116 33.5902 7.824 33.9422 7.616C34.3022 7.408 34.7382 7.304 35.2502 7.304V8.432H34.9622C33.7382 8.432 33.1262 9.096 33.1262 10.424V14H32.0342V7.424H33.1262V8.492ZM42.3107 10.46C42.3107 10.668 42.2987 10.888 42.2747 11.12H37.0187C37.0587 11.768 37.2787 12.276 37.6787 12.644C38.0867 13.004 38.5787 13.184 39.1547 13.184C39.6267 13.184 40.0187 13.076 40.3307 12.86C40.6507 12.636 40.8747 12.34 41.0027 11.972H42.1787C42.0027 12.604 41.6507 13.12 41.1227 13.52C40.5947 13.912 39.9387 14.108 39.1547 14.108C38.5307 14.108 37.9707 13.968 37.4747 13.688C36.9867 13.408 36.6027 13.012 36.3227 12.5C36.0427 11.98 35.9027 11.38 35.9027 10.7C35.9027 10.02 36.0387 9.424 36.3107 8.912C36.5827 8.4 36.9627 8.008 37.4507 7.736C37.9467 7.456 38.5147 7.316 39.1547 7.316C39.7787 7.316 40.3307 7.452 40.8107 7.724C41.2907 7.996 41.6587 8.372 41.9147 8.852C42.1787 9.324 42.3107 9.86 42.3107 10.46ZM41.1827 10.232C41.1827 9.816 41.0907 9.46 40.9067 9.164C40.7227 8.86 40.4707 8.632 40.1507 8.48C39.8387 8.32 39.4907 8.24 39.1067 8.24C38.5547 8.24 38.0827 8.416 37.6907 8.768C37.3067 9.12 37.0867 9.608 37.0307 10.232H41.1827ZM43.1441 10.688C43.1441 10.016 43.2801 9.428 43.5521 8.924C43.8241 8.412 44.1961 8.016 44.6681 7.736C45.1481 7.456 45.6841 7.316 46.2761 7.316C46.7881 7.316 47.2641 7.436 47.7041 7.676C48.1441 7.908 48.4801 8.216 48.7121 8.6V5.12H49.8161V14H48.7121V12.764C48.4961 13.156 48.1761 13.48 47.7521 13.736C47.3281 13.984 46.8321 14.108 46.2641 14.108C45.6801 14.108 45.1481 13.964 44.6681 13.676C44.1961 13.388 43.8241 12.984 43.5521 12.464C43.2801 11.944 43.1441 11.352 43.1441 10.688ZM48.7121 10.7C48.7121 10.204 48.6121 9.772 48.4121 9.404C48.2121 9.036 47.9401 8.756 47.5961 8.564C47.2601 8.364 46.8881 8.264 46.4801 8.264C46.0721 8.264 45.7001 8.36 45.3641 8.552C45.0281 8.744 44.7601 9.024 44.5601 9.392C44.3601 9.76 44.2601 10.192 44.2601 10.688C44.2601 11.192 44.3601 11.632 44.5601 12.008C44.7601 12.376 45.0281 12.66 45.3641 12.86C45.7001 13.052 46.0721 13.148 46.4801 13.148C46.8881 13.148 47.2601 13.052 47.5961 12.86C47.9401 12.66 48.2121 12.376 48.4121 12.008C48.6121 11.632 48.7121 11.196 48.7121 10.7ZM55.5527 8.648C55.7767 8.256 56.1047 7.936 56.5367 7.688C56.9687 7.44 57.4607 7.316 58.0127 7.316C58.6047 7.316 59.1367 7.456 59.6087 7.736C60.0807 8.016 60.4527 8.412 60.7247 8.924C60.9967 9.428 61.1327 10.016 61.1327 10.688C61.1327 11.352 60.9967 11.944 60.7247 12.464C60.4527 12.984 60.0767 13.388 59.5967 13.676C59.1247 13.964 58.5967 14.108 58.0127 14.108C57.4447 14.108 56.9447 13.984 56.5127 13.736C56.0887 13.488 55.7687 13.172 55.5527 12.788V14H54.4607V5.12H55.5527V8.648ZM60.0167 10.688C60.0167 10.192 59.9167 9.76 59.7167 9.392C59.5167 9.024 59.2447 8.744 58.9007 8.552C58.5647 8.36 58.1927 8.264 57.7847 8.264C57.3847 8.264 57.0127 8.364 56.6687 8.564C56.3327 8.756 56.0607 9.04 55.8527 9.416C55.6527 9.784 55.5527 10.212 55.5527 10.7C55.5527 11.196 55.6527 11.632 55.8527 12.008C56.0607 12.376 56.3327 12.66 56.6687 12.86C57.0127 13.052 57.3847 13.148 57.7847 13.148C58.1927 13.148 58.5647 13.052 58.9007 12.86C59.2447 12.66 59.5167 12.376 59.7167 12.008C59.9167 11.632 60.0167 11.192 60.0167 10.688ZM68.0341 7.424L64.0741 17.096H62.9461L64.2421 13.928L61.5901 7.424H62.8021L64.8661 12.752L66.9061 7.424H68.0341Z',
    fill: fill
  }));
};

var _excluded$3 = ["width", "height", "fill"];
var Check = function Check(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 15 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 11 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#33EA66' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 15 11',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("path", {
    d: 'M13.7319 0.295798C13.639 0.20207 13.5284 0.127675 13.4065 0.0769067C13.2846 0.026138 13.1539 0 13.0219 0C12.8899 0 12.7592 0.026138 12.6373 0.0769067C12.5155 0.127675 12.4049 0.20207 12.3119 0.295798L4.86192 7.7558L1.73192 4.6158C1.6354 4.52256 1.52146 4.44925 1.3966 4.40004C1.27175 4.35084 1.13843 4.32671 1.00424 4.32903C0.870064 4.33135 0.737655 4.36008 0.614576 4.41357C0.491498 4.46706 0.380161 4.54428 0.286922 4.6408C0.193684 4.73732 0.12037 4.85126 0.0711659 4.97612C0.0219619 5.10097 -0.00216855 5.2343 0.000152918 5.36848C0.00247438 5.50266 0.0312022 5.63507 0.0846957 5.75814C0.138189 5.88122 0.215401 5.99256 0.311922 6.0858L4.15192 9.9258C4.24489 10.0195 4.35549 10.0939 4.47735 10.1447C4.59921 10.1955 4.72991 10.2216 4.86192 10.2216C4.99393 10.2216 5.12464 10.1955 5.2465 10.1447C5.36836 10.0939 5.47896 10.0195 5.57192 9.9258L13.7319 1.7658C13.8334 1.67216 13.9144 1.5585 13.9698 1.432C14.0252 1.30551 14.0539 1.1689 14.0539 1.0308C14.0539 0.892697 14.0252 0.756091 13.9698 0.629592C13.9144 0.503092 13.8334 0.389441 13.7319 0.295798Z',
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
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 14 13',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("path", {
    d: 'M13.8418 11.0561L8.16007 0.683372C8.04697 0.476647 7.87973 0.304041 7.67598 0.183764C7.47223 0.0634876 7.23954 0 7.00245 0C6.76537 0 6.53267 0.0634876 6.32893 0.183764C6.12518 0.304041 5.95794 0.476647 5.84484 0.683372L0.167185 11.0561C0.05491 11.2556 -0.00270098 11.4807 9.72867e-05 11.7091C0.00289555 11.9376 0.0660053 12.1613 0.183133 12.358C0.300261 12.5546 0.467315 12.7174 0.667636 12.8301C0.867956 12.9427 1.09454 13.0013 1.3248 13H12.6842C12.9121 12.9997 13.1361 12.9408 13.3342 12.829C13.5323 12.7172 13.6977 12.5563 13.8144 12.3621C13.931 12.1678 13.9949 11.9469 13.9997 11.7208C14.0045 11.4947 13.9501 11.2713 13.8418 11.0723V11.0561ZM6.47887 3.26032C6.47887 3.10964 6.5392 2.96513 6.6466 2.85858C6.754 2.75203 6.89966 2.69218 7.05154 2.69218C7.20342 2.69218 7.34908 2.75203 7.45648 2.85858C7.56388 2.96513 7.62421 3.10964 7.62421 3.26032V8.13015C7.62421 8.28083 7.56388 8.42534 7.45648 8.53189C7.34908 8.63844 7.20342 8.6983 7.05154 8.6983C6.89966 8.6983 6.754 8.63844 6.6466 8.53189C6.5392 8.42534 6.47887 8.28083 6.47887 8.13015V3.26032ZM7.05154 11.3158C6.90592 11.3158 6.76356 11.273 6.64248 11.1927C6.52139 11.1125 6.42702 10.9984 6.37129 10.8649C6.31556 10.7314 6.30098 10.5845 6.32939 10.4428C6.3578 10.3011 6.42793 10.171 6.5309 10.0688C6.63387 9.96667 6.76507 9.8971 6.9079 9.86892C7.05072 9.84073 7.19877 9.8552 7.33331 9.91048C7.46785 9.96577 7.58284 10.0594 7.66375 10.1795C7.74465 10.2997 7.78783 10.4409 7.78783 10.5854C7.78783 10.6813 7.76879 10.7763 7.73179 10.8649C7.69479 10.9535 7.64055 11.034 7.57218 11.1019C7.50381 11.1697 7.42264 11.2235 7.33331 11.2602C7.24398 11.2969 7.14823 11.3158 7.05154 11.3158Z',
    fill: '#FFB03A'
  }));
};

var _excluded$5 = ["width", "height", "fill"];
var ArrowRight = function ArrowRight(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 12 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 9 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'white' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$5);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 12 9',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("path", {
    d: 'M11.3536 4.85355C11.5488 4.65829 11.5488 4.34171 11.3536 4.14645L8.17157 0.964466C7.97631 0.769204 7.65973 0.769204 7.46447 0.964466C7.2692 1.15973 7.2692 1.47631 7.46447 1.67157L10.2929 4.5L7.46447 7.32843C7.2692 7.52369 7.2692 7.84027 7.46447 8.03553C7.65973 8.2308 7.97631 8.2308 8.17157 8.03553L11.3536 4.85355ZM0.5 5H11V4H0.5V5Z',
    fill: fill
  }));
};

var _excluded$6 = ["width", "height", "fill"];
var Arrow = function Arrow(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 27 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 51 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'black' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$6);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 27 51',
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'transparent'
  }, rest), React.createElement("path", {
    d: 'M25 49L2 25.5L25 2',
    stroke: fill,
    strokeWidth: '4',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }));
};

var _excluded$7 = ["width", "height"];
var Ethereum = function Ethereum(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 37 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 37 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$7);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 37 37',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("rect", {
    x: '0',
    y: '0',
    width: '37',
    height: '37',
    fill: 'url(#pattern0)'
  }), React.createElement("defs", null, React.createElement("pattern", {
    id: 'pattern0',
    patternContentUnits: 'objectBoundingBox',
    width: '1',
    height: '1'
  }, React.createElement("use", {
    href: '#image0_184_1295',
    transform: 'scale(0.00520833)'
  })), React.createElement("image", {
    id: 'image0_184_1295',
    width: '192',
    height: '192',
    href: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAACBFBMVEUAAADv7//09PTy8vXx9Pbz9Pjy9ffy9fjy9Pfx9Pfy9Pby9Pfx8/Xz8/Py8vTx9Pjv7/fy9Pfy9Pfy9ffz9ffy8/b09vjy9fXz9Pb09/ry9Pjz9fnv7/Tv9PTk5uiCg4Ssra9jZGWQkpTIycw7PDza296QkZIvMDBgYWK6vL21t7lHSUnm6OqEhojNz9Ly9PSztLednqB4envBw8Xv8vWen6Hv8/NsbW7x8/bP0NOpqqyJiovz8/dUVVXv7++lpqjy8/jz9Pbx9PZ9fn9bXF01NjYdHh4sLCw5Ojo0NTUwMTETExNucHBISElgYWE+Pz9zdHUaGhomJyfv7/oWFxckJSUtLi7x8vV4eXpRUlMhISHx8/Z1d3fy9PdnaGlERkaEhYZ6fHxrbW1AQUGDhYVWV1cqKipERUVOT1BcXV6LjI1iY2QyMzNMTU7Fx8lLTU2Sk5ba3N+HiIpKS0zW2Nt7fH4vLy+6vL6rrK6ChIXk5umfoKJYWVpXWVmQkpPd3+GTlJaXmJnOz9Lm5+qFhoepq6y6u77r7fB1dneRkpQ7PT2EhoeQkZPIysxISUnW2NrW19uztLa3uLqXmJp4enpTVVVvcHKsrrBmZ2g8PT2eoKJsbm+en6A9PT7v8/dsbm7BwsXd3+KEhYfx8/fy9fbP0dPx9Pjx8/bv8veJiozy9fnv8vQEFD2BAAAArHRSTlMAEDBQcI+fr7/f7/+AQGDPIJ9g33+vb1CPX+9/MDD//////////////////////2D/////UP9A/5D///9A/xD/r8/P/////////////////////zD///+g////sP/f/////////////////////////////////////////////////////////////////////////////////////0D/////gK//cO9g/1BgIk4dsgAACKdJREFUeNrM1YV1wEAMA9BjsMJOGfYfszBA0YnyJ5De6fmcPR9iyqW23gWfpPfWypBi8O7afEi5Cb4gLafxouGnPOOH5hyXa4Ufc8cvzWu8SvrUBH9Tt4U/nIZ/aZt3PGMW/JusI206MKIbIf4uMKTr4s60ZIG1EyssKwwYVGCMh19hFxxI09GHU3EwjUeu5wYGeDu6FRig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'
  })));
};

var _excluded$8 = ["width", "height"];
var Solana = function Solana(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 14 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 14 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$8);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 14 14',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("path", {
    d: 'M4.19214 0L4.10059 0.311195V9.34137L4.19214 9.43276L8.38385 6.95506L4.19214 0Z',
    fill: '#343434'
  }), React.createElement("path", {
    d: 'M4.1917 0L0 6.95505L4.1917 9.43279V5.04982V0Z',
    fill: '#8C8C8C'
  }), React.createElement("path", {
    d: 'M4.19222 10.2264L4.14062 10.2893V13.506L4.19222 13.6568L8.38641 7.74994L4.19222 10.2264Z',
    fill: '#3C3C3B'
  }), React.createElement("path", {
    d: 'M4.1917 13.6567V10.2264L0 7.74991L4.1917 13.6567Z',
    fill: '#8C8C8C'
  }), React.createElement("path", {
    d: 'M4.19141 9.43272L8.38305 6.95504L4.19141 5.0498V9.43272Z',
    fill: '#141414'
  }), React.createElement("path", {
    d: 'M0 6.95503L4.19164 9.4327V5.04979L0 6.95503Z',
    fill: '#393939'
  }), React.createElement("rect", {
    width: '14',
    height: '14',
    fill: 'url(#pattern1)'
  }), React.createElement("defs", null, React.createElement("pattern", {
    id: 'pattern1',
    patternContentUnits: 'objectBoundingBox',
    width: '1',
    height: '1'
  }, React.createElement("use", {
    href: '#image0_4_722',
    transform: 'scale(0.00316456)'
  })), React.createElement("image", {
    id: 'image0_4_722',
    width: '316',
    height: '316',
    href: 'data:image/png;base64,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'
  })));
};

var _excluded$9 = ["width", "height"];
var Ethereum$1 = function Ethereum(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 27 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 27 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$9);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 27 27',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("mask", {
    id: 'mask0_214_508',
    style: {
      maskType: 'alpha'
    },
    maskUnits: 'userSpaceOnUse',
    x: '0',
    y: '0',
    width: '27',
    height: '27'
  }, React.createElement("circle", {
    cx: '13.0357',
    cy: '13.0357',
    r: '13.0357',
    fill: '#D9D9D9'
  })), React.createElement("g", {
    mask: 'url(#mask0_214_508)'
  }), React.createElement("g", {
    clipPath: 'url(#clip0_214_508)'
  }, React.createElement("path", {
    d: 'M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26Z',
    fill: '#8247E5'
  }), React.createElement("path", {
    d: 'M17.3028 10.2187C16.991 10.0373 16.5856 10.0373 16.2426 10.2187L13.8105 11.6094L12.1579 12.5164L9.72584 13.9071C9.41401 14.0885 9.00868 14.0885 8.66568 13.9071L6.73246 12.8187C6.42066 12.6373 6.2024 12.3048 6.2024 11.9419V9.79545C6.2024 9.43266 6.38948 9.1001 6.73246 8.91871L8.6345 7.86055C8.94629 7.67916 9.35165 7.67916 9.69466 7.86055L11.5967 8.91871C11.9085 9.1001 12.1267 9.43266 12.1267 9.79545V11.1861L13.7793 10.2489V8.85823C13.7793 8.49545 13.5922 8.16288 13.2493 7.98149L9.72584 5.98614C9.41401 5.80475 9.00868 5.80475 8.66568 5.98614L5.07988 7.98149C4.73688 8.16288 4.5498 8.49545 4.5498 8.85823V12.8792C4.5498 13.2419 4.73688 13.5745 5.07988 13.7559L8.66568 15.7512C8.9775 15.9327 9.38283 15.9327 9.72584 15.7512L12.1579 14.3908L13.8105 13.4536L16.2426 12.0931C16.5544 11.9117 16.9598 11.9117 17.3028 12.0931L19.2048 13.1512C19.5166 13.3327 19.7349 13.6652 19.7349 14.028V16.1745C19.7349 16.5373 19.5478 16.8699 19.2048 17.0512L17.3028 18.1396C16.991 18.321 16.5856 18.321 16.2426 18.1396L14.3406 17.0815C14.0288 16.9001 13.8105 16.5675 13.8105 16.2048V14.8141L12.1579 15.7512V17.1419C12.1579 17.5048 12.345 17.8373 12.688 18.0187L16.2738 20.0141C16.5856 20.1954 16.991 20.1954 17.3339 20.0141L20.9197 18.0187C21.2315 17.8373 21.4498 17.5048 21.4498 17.1419V13.121C21.4498 12.7582 21.2627 12.4257 20.9197 12.2443L17.3028 10.2187Z',
    fill: 'white'
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: 'clip0_214_508'
  }, React.createElement("rect", {
    width: '26',
    height: '26',
    fill: 'white'
  }))));
};

var _excluded$a = ["width", "height"];
var Avalanche = function Avalanche(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 37 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 37 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$a);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 37 37',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("rect", {
    x: '0',
    y: '0',
    width: '37',
    height: '37',
    fill: 'url(#pattern2)'
  }), React.createElement("defs", null, React.createElement("pattern", {
    id: 'pattern2',
    patternContentUnits: 'objectBoundingBox',
    width: '1',
    height: '1'
  }, React.createElement("use", {
    href: '#image0_214_494',
    transform: 'scale(0.00390625)'
  })), React.createElement("image", {
    id: 'image0_214_494',
    width: '256',
    height: '256',
    href: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAAAOZlWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgExAAIAAAAhAAAAZgEyAAIAAAAUAAAAiIdpAAQAAAABAAAAnAAAAAAAAABIAAAAAQAAAEgAAAABQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkAADIwMjA6MDY6MjEgMTI6MTc6MjUAAASQBAACAAAAFAAAANKgAQADAAAAAQABAACgAgAEAAAAAQAAAQCgAwAEAAAAAQAAAQAAAAAAMjAyMDowNjoyMSAxMjoxNDoyNQAyPGR9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKn2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjAtMDYtMjFUMTI6MTc6MjUtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIwLTA2LTIxVDEyOjE0OjI1LTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMC0wNi0yMVQxMjoxNzoyNS0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIDIxLjEgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjAtMDYtMjFUMTI6MTc6MjUtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6OGVhNTMzNjMtYzY2OS00YWVjLWE5ZmUtNzQ5YzUzMmFjZGZiPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIDIxLjEgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjAtMDYtMjFUMTI6MTc6MjUtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZTZmNGEzOTctM2ZkNC00NDEzLWE2YTMtOWIzYzExNTMxOTFhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOkQwMTE4NzY2OEUxMjExRUE5MEFDQkVFRjMyM0M3OUNFPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkZDQ3ZTdiMy02YjIyLTFkNDAtOTc2MC02MDFjYjljYmY4YzY8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6NUYwRTAyRDU4RTExMTFFQTkwQUNCRUVGMzIzQzc5Q0U8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnhtcC5kaWQ6NUYwRTAyRDY4RTExMTFFQTkwQUNCRUVGMzIzQzc5Q0U8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgIDwv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'
  })));
};

var _excluded$b = ["width", "height"];
var Arbitrum = function Arbitrum(_ref) {
  var rest = _objectWithoutPropertiesLoose(_ref, _excluded$b);
  return React.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '124.983',
    height: '140.32',
    viewBox: '0 0 124.983 140.32'
  }, React.createElement("g", Object.assign({
    id: 'symbol',
    transform: 'translate(-177.491 -53.193)'
  }, rest), React.createElement("path", {
    id: 'Path_153',
    "data-name": 'Path 153',
    d: 'M266.978,128.665l10.305-17.485,27.776,43.262.013,8.3-.091-57.131a4.3,4.3,0,0,0-1.99-3.428L252.984,73.42a4.408,4.408,0,0,0-3.821.018,4.352,4.352,0,0,0-.448.259l-.174.11L200,101.935l-.189.085a4.417,4.417,0,0,0-.717.418,4.29,4.29,0,0,0-1.729,2.731,4.419,4.419,0,0,0-.062.505l.076,46.556,25.872-40.1c3.257-5.317,10.354-7.03,16.942-6.937l7.732.2-45.56,73.064,5.371,3.092,46.106-76.083,20.379-.074-45.987,78L247.4,194.422l2.29,1.317a4.4,4.4,0,0,0,3.087.061l50.71-29.387-9.7,5.618Zm3.932,56.627-19.356-30.379,11.815-20.049,25.42,40.066Z',
    transform: 'translate(-11.186 -11.178)',
    fill: '#2d374b'
  }), React.createElement("path", {
    id: 'Path_154',
    "data-name": 'Path 154',
    d: 'M321.883,235.122,341.239,265.5l17.88-10.362L333.7,215.073Z',
    transform: 'translate(-81.515 -91.387)',
    fill: '#28a0f0'
  }), React.createElement("path", {
    id: 'Path_155',
    "data-name": 'Path 155',
    d: 'M395.4,212.248l-.013-8.3-27.776-43.262L357.3,178.169l26.814,43.366,9.7-5.618a4.3,4.3,0,0,0,1.587-3.129Z',
    transform: 'translate(-101.511 -60.683)',
    fill: '#28a0f0'
  }), React.createElement("path", {
    id: 'Path_156',
    "data-name": 'Path 156',
    d: 'M177.491,212.312l13.691,7.889,45.56-73.064-7.732-.2c-6.588-.093-13.685,1.619-16.942,6.937l-25.872,40.1-8.7,13.373v4.969Z',
    transform: 'translate(0 -52.917)',
    fill: '#fff'
  }), React.createElement("path", {
    id: 'Path_157',
    "data-name": 'Path 157',
    d: 'M287.75,147.406l-20.378.074-46.106,76.083,16.115,9.279,4.382-7.433Z',
    transform: 'translate(-24.713 -53.187)',
    fill: '#fff'
  }), React.createElement("path", {
    id: 'Path_158',
    "data-name": 'Path 158',
    d: 'M302.474,94.114a12.98,12.98,0,0,0-6.093-10.435L245.719,54.545a13.178,13.178,0,0,0-11.624,0c-.423.213-49.268,28.542-49.268,28.542a13.016,13.016,0,0,0-1.94,1.148,12.881,12.881,0,0,0-5.4,9.854v60.338l8.7-13.373L186.12,94.5a4.325,4.325,0,0,1,1.791-3.236c.23-.165,49.909-28.921,50.067-29a4.408,4.408,0,0,1,3.821-.018l50.007,28.765a4.3,4.3,0,0,1,1.99,3.428v57.672a4.2,4.2,0,0,1-1.495,3.129l-9.7,5.618-5,2.9-17.88,10.362-18.133,10.509a4.395,4.395,0,0,1-3.087-.061l-21.453-12.339-4.382,7.432,19.28,11.1c.638.362,1.206.684,1.672.946.722.4,1.214.675,1.387.759a12.528,12.528,0,0,0,5.118,1.053,12.89,12.89,0,0,0,4.72-.888l52.667-30.5a12.876,12.876,0,0,0,4.962-9.7Z',
    transform: 'translate(-0.001)',
    fill: '#96bedc'
  })));
};

var _excluded$c = ["width", "height"];
var Optimism = function Optimism(_ref) {
  var rest = _objectWithoutPropertiesLoose(_ref, _excluded$c);
  return React.createElement("svg", Object.assign({
    version: "1.0",
    xmlns: "http://www.w3.org/2000/svg",
    width: "40.000000pt",
    height: "40.000000pt",
    viewBox: "0 0 40.000000 40.000000",
    preserveAspectRatio: "xMidYMid meet"
  }, rest), React.createElement("g", {
    transform: "translate(0.000000,40.000000) scale(0.100000,-0.100000)",
    fill: "#000000",
    stroke: "none"
  }, React.createElement("path", {
    d: "M109 372 c-43 -22 -59 -38 -81 -81 -36 -68 -36 -114 0 -182 22 -43\n    38 -59 81 -81 68 -36 114 -36 182 0 43 22 59 38 81 81 36 68 36 114 0 182 -22\n    43 -38 59 -81 81 -31 16 -69 28 -91 28 -22 0 -60 -12 -91 -28z m79 -124 c16\n    -16 15 -60 -1 -82 -9 -12 -23 -17 -42 -14 -26 3 -30 8 -33 36 -5 54 44 92 76\n    60z m96 -1 c26 -19 13 -54 -24 -62 -17 -4 -30 -13 -30 -21 0 -8 -6 -14 -14\n    -14 -10 0 -12 9 -5 43 4 23 8 48 9 55 0 16 41 16 64 -1z"
  }), React.createElement("path", {
    d: "M140 219 c-14 -24 -7 -49 14 -49 15 0 28 34 19 56 -7 20 -21 17 -33\n    -7z"
  }), React.createElement("path", {
    d: "M247 233 c-12 -11 -8 -23 8 -23 8 0 15 7 15 15 0 16 -12 20 -23 8z"
  })));
};

var _excluded$d = ["width", "height"];
var USDT = function USDT(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 37 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 37 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$d);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 37 37',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("rect", {
    width: '37',
    height: '37',
    fill: 'url(#pattern5)'
  }), React.createElement("defs", null, React.createElement("pattern", {
    id: 'pattern5',
    patternContentUnits: 'objectBoundingBox',
    width: '1',
    height: '1'
  }, React.createElement("use", {
    href: '#image0_214_312',
    transform: 'scale(0.00390625)'
  })), React.createElement("image", {
    id: 'image0_214_312',
    width: '256',
    height: '256',
    href: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAgAElEQVR4nOy9B5Ak2Xke+L2Xtlz7aTPez+7OrJnFOiwWILiED4I8kQRxoiAGJNo70FyQIkVRJo5BxpEK8GhO0okEdXG8OB15EhU8kAQJQ/gF1szM7njTMz097V11d3mT9l28l5lVWdVVbaZ9T/0buVNdlfbl+//32+9Hi1rUokeXyOX09LY/PAGBCwYHLghYzW8UBAqhUGQZhmXBsEzxeSaXRltnJ7riHeiCjpJj4EFuBvvi7YjIGhzDxOTiPAwwDHR0QbFdzOXT0DQNCpVRKBehKRqyRhl510S3oqNklKGoGs509WO2kAFTJSzkszi57zjmzCxyhTQiTEZ3pA0GXIyWFrCYzeBd+08gU8yDWS4e7zuKe1YK8+kFxCyCglFEIhqFBgmQJMybeXRFoogxCSXLRKqUF9fd396F7rYOLBpFZEwDebOE8x0DUCQZJdfmgwSTuciXyuKeyuUy9sXaIFGKTLmIvFnGmaMn0B5tEyPIx9OE5W2ui5grQ3JcTBhZ9CsxJCT1vMXcYwDKRLwEoiqEZstwv56FDUmWoRAZMiRokKGDfwYujt5EsVRET7QNuXIRGf58kSgSsSi6Yu3QqMRvFW2yhsliGsPFDKJURrumIyFraKMq5gsZLJaLUBQNnZoORVKRcgyUbQO9WhyGY2Eyn4LEKPa1daOsujiV2I+b43eRLuXx7NEzIKC4lhpDmxLF0+0HMZKZQdEuo6+rFyXbRi61iFg8ggOJfRjKzyNKJbhlAyXTQJseheW60BgRc2rCyOBoVy9MwxT3PhBpR942kLMN6FSGw+egqiMWiSBp5pAvlXAk1oUuJYYSLJSYgZnUgpin3WoUZceFaTtQZAkxPQLXdUEJH2LUze7tpRN6p3inLdqBxIWiQiXIlEKBBCJREObCUhyokgxXkqHLCiRJ6jMcu88Fs7P5LC2aZRkSkW3mENOxqGFbkuMwZrousR1bNx27NOLMRCjoZwE8CzCLEMKvo1BK04TSn1SpfCsqKx2SJHNh62hEtiOS6ihEdikhLKbqJKKoE6ZtpRRbFvejyYq4H37P/D4VSQIltDW1dji1BMAOIs70nBkp8TSigm2hXZZl23WizHWYwRxaNk3Vsu32omkoN6dHowWj/FvZUuH9BaNsp4t5UrJNOIwRwzXEKmTaDmGuK85ngxFCCLPBKGNM859cAbzVCUAHAfkzlVFDJkSWZcHcTJZkRBSFaZKCmKKRuB4lcU3/85gW+cOIrquaLBcMU8mXFDPvSpItESLZ1M1RSh1ZkvznqlxD/A3yiL/sHUItAbBDiKv6mqJAc5VIhDGpaJu4tDDeYZWNfzeTXji9kM/Y2VKJFAyDGo6tOY5DC5Yhlx3rsOk6cBxHqJqOMKUYXOZ4pgADGGOC34T6ST0hExDxdVImNvGHCpepgSAiPsNKvnCSCRVaiUTpp6OK9r1RRaeKRB2JEkujqtUWjbrdiYTck+j4ens8/gftsba8rihlTVYtTVYsnSoWpQRsJ+nCjzC1BMAWE2ci7oOIEEXY7zZfm5mLhVyWDM9O/eR0ZvFHF0p5N10ussVSIZ4s5d6Tt01hj5ZtCxZnUp8xKaXCNGASQGUKSiSPhcUCq3iMzrzF1vvMaphfEPOEgPh56U9wfU61GBOCRAgJ5gLMocw0jrlGRvzuug4II9AlGXGZawrK6XY18lyv3mZ16lGjO5pweuIJ92DHvj9xCfn/iCyhIxpDTFKEPS8zSwialmDYWmoJgC0gzjRcjdZ1HWm3jJxjIl3Knp6Yn/sfFgvZ9oVCVpnNZuTZbOb9OaPYX7QMlB0bLmFgsgSmSHAlCVC4A3Op+kz8jQWrvOAiIhiaBb8RVjmO1bmiKs6pRmo5If4Rvi7AWEWX56ekwTn907u2i5xrI18y5dlc9qV7zrTwYcRkFXFdQ0c0caY30fHxnlgb6Ym3u31tHcn93X2/axJ3ngvEqKbDKts7ylm2l6klADaFmFjNuKqsyorndS6bmE8vfnA6O/eesVTSfrAw8/zYYvIHMqUiiowzOwHl9rJMQVS+eqvixoIFW7jTKnq8t6KzBsslCZjR37fC05XjAknhiYFAIyChfSrn8q/BN1rRHOpc2aHPYg/urJQl7yfX1x4ApFwXKbeE8UzhOEtNH+d7xGUdvYl2HO3uHxiIdwwe79ontxHli1FduxhVNSFMuFDgMY0WbQ61BMAGEWcnPlUjAKJKBFklB+a4Hfly8dXJdLLr3vR4x/Dc1E/PZFOnslYZlkLgKJIINbqSLlZop54hfSJhhqusuM3XyCVqfoiC41azwop916KTE087cX3hAil0Lm6qMOpdmXm+ibRrI5edx2hy9sc1HvKLJXC4p/vjp/cf+ffdiQ7WE21LgeBvI5ruRiEJYVCvvbRofdQSAOugYCryvISIqsFxLcyVCwPzpcXHhmbGo3fGRl4ZSU7982QhR8quDZswuBLAFBWu5LnFeahMCqnvZE381lgLWO2xq9yxscO+ToOALzD434G/YYl2EOhGwR/crKEMtkRgM6DoFDA+nX3uzemRP+3U49jf0WWcHjjyq+cOHbvU1qGMuI4zFVFUEXJ0G5y7RWunlgBYA3lzzptu1PeS83i349gyYei7PjW8/+qDr/z62Pzc9y86ZZJmhlRkjq8WUxDqb8RbAWlFcyC1+n0dBUxWz+zc679qRt5gEs/R4J7CQqCZiRL+wE0fRqWq5uDw52LIWXlMzeW0O7OTf/jtK5fMA23t/+/j+4/818ePnJgxbXtEkqQF7gSlLfZfF7UEwJqJO/QkcBu1wyn1zDup3v/7u199cWpx/icmc4vH5ku5/YZjC5WXqDJkWfWYNGw6+8wfTF13BbW22Sq/XcyPFUyQh9JKmCdUIUuQ4UtIl6Fg2chbeTWZKv6j0ULmQ5cmH7gD7V3XTx089NmjBw5d74m2lTVJzvJjW8bB2qklAJahYEIFKxp35sF0MTQ/idmF+U9dnbj/mdFcKjGcTnbnbKOfqRRElyFJEYRcZh6xlqrajOodlZXB4maSpIBGVJiOK01apf7xdA63MjP7r86Nnjw90pc61bU//8T+o/+zFJG/dayzT5gHZdtuhRNXSS0BsALxlSVCZEQ0DYPJid7x6emfuDH54OXhuenzs/nMAZur9hENciRSCbt5RNbmQGtR1Q9S4zPww5aUQNIUsfHoQtIonkiODOLy2BAOjt35D6f7D95JHzr5lTNHT3yuTY/BUNTWgK6CWgKgAfGiDpVK0KIxFEolvHn/2omh1PSn3hq788zduckPlxw7QhQNtCsBbvxzPndDsfAgZNdi/7URC2td4X/rB5ISoRUQXUPJsXE7P3f27uDs2bcn77/y1PixF873H792vLvvc516dzkO1Q9htt5GI2oJAJ8Cu5Xnv6dcEznLOPZgYuHVq6ND+94YvPH8WGb+hyxNAtMVMJ2H7aiXXNPACx0k46zHS/8o0hKzaRlyfUnrcgcir/50GaaNQt/cjXd+4uKtG3jqyMnTL5587NK5Ayf+XomqkzzjsGhYrTBiHbUEgCDPscdDTMx2cG1y5LGLo4O/c33ywQ9O5lKweXFOIuLZpNzz3MBpT1rhqHXTmsbQT2by6g0peIoB4XkVCRlpx8Vrk/c+c3n6AR7ff/hP3/v4M3/1VO+hazLIMPcRSISKkGxLFrQEgCCepitRSVosZs69fvfmc1cnhn92yso/V5AYHI0Xvsi+I9D3TwVhOSwNgSHknd/OMN2jRuLVcI1AIiJ92pUBw3FwaeL+p4cmxz59srP/yy+cePx3nzp09J6kS6OOw/MT6SMvtR9RAeAxKk/gaUeUZvMLB798/877ro/d//WxbOpw3rVijuKltPLce1ZZ7f1wXgO1nvkxbRpSDpgfmmpVxa+OmuU7rERBojAJEql48EDmGAoSHOJg3rSQW5j88Gh+8flr0w9uPX/iiV872t13sy/enV5wso+0WfCICQDvVWuyijIxMJNZxMjM9I99d/jmr93Nzu1PuUYnZBmUx+6pX/gSzs7z8+Ir2W4rpNa2NMy10Xr8JUFWouc09P0v/D+FF1HJKDo28mahKzk59MrI4txfnO8/OpI/9vgvxiKRizFVf2QNuEdKAPDpwRN4uP13b376n75x79aPD85Onpgz8gcdXYLEnXvUc98HNfRLzlGX+lofugq7Blor/8ZRBbegwUupjD2rruVhYcKdtVyb434ex3YxWkgPzN29MjCYnPq/zh8++W+fPn7yv8Q0vezaNmzH2U3Dsm56JAQAZ3zu4IvrEYzNTMUvTQz/7Bvjd39lIrPQ6yoKSFvUS8/1C1VWsxYEEyxQP+lSv+Cjbl5uODUTAiuNc1AJTfyiJMR0FBwb13Mzj48Ppn57MjP/0fTR1JeO9x/4U44pqRJJpBg/ChrcnhUAwaosUwmqomA2k2q/Onrvk9++c+Ol2wtTP1aQmcaiKsDBIikLitTWzLThVb6l8m8eBS6YRhrAaon5wkOcg8p8ciBr2QOvjwx+cmh64vueP3b69Cunn7pwtLv/8xzOMCIrXkryHn6ze1YAUL/SjquFQzMTB752+52fvzB851cWbYMionhIOv6yEKwsDzO3Wqv85hB1Q8yKjUusImFNgq/zsgorxjBllXu+fO/qv7i3MFt472NP/9KLB09+jluDHMhkLwv2PScAPNudQFdVDsjR9c6DwVdeu3v9E0PpuU+VFQonqojqPLFyN3iz9aG8Fm0PrWelX/VcQaAmErhUQdFxcSc9E5u/kP7jyempgWePnf7i+UPHL1u2be3VabCnBABnWo7AwwEsR9PzbV++c/lfvzZ4/aeSZj5mqxRQFZ7H42fqVY9jYaw8gchbW63Xoq2njRIAjfwGYb9NQAIAlecPEIJZ08A3Ru78q+lC+jMmxW+dGTj8v3VoXqRgr2kDe0IAiMIxKgnQzIJZxtD06Ik/f+ubv3MzNf0jOQ42Gaj8vnawHOhG2JPfEgB7gypJf6S23gAVsFQvUiC+lznIqopFy5IvzY3vW3g993vfc/rJvo89/fK/2RfvcjyIsr0jBvaAAPCYOk44UoyMv7v8xqsX7t755aF08mOOJkPStZAt2Zilg0kg/AGEeAg9DJU8gK1QR1u0OcTqHIek3nHbKPeAAIqqCLSikUJKWrz6xq9PpBc6Pnr+pc8e3394pFgu7ZlKz10sADy1XYeKIitjNDl96Gs3L/3GlwevvDBnl89qiQioWPX9fVd4XyLs48Neewkl3jEt5t971Kh4qz6XQ2wKhSvrmC+Z+Nrwzf9xJpfu++iTz//m2cPHr7ZrMV5niOIuFwS7VwD4WV/cnrv44Nazf3vl9X95ZXz0hwoqhRKPwg28fKtsyFZN9w2tCi3mf2QpEAq86pBGFLiyixvJiR9OvZ7t/P5i8WvOKff/6I22zyZUXSweu9VpvCsFQCWjzzTxjYmL7/vLC9/6rZHMwnvtqAKqSHUZOauT0KxBBlBr9X80qGkVYqXa0IMqQ1THRLnw6p9d/Oard1PTp/7B0y//6gt9p5JlmHCZC0J3Hzvtqjv2wDRdkdJJGE589eqFD37r3o1/OmsVnrejKphMa+K8LWrRRk4+VyZgEQVp08Ibd2992s6Xo/bz5r8+0X/gLk84243YD7tCAATDyrvQmlTC3YWZw9+9d+OPvn3vxgeyxIGrq3733G2+0RbtXSI+ejP3K2m8mMzGW1PDP5p8Ld/5Q+ff/c9P9u6/zCNRfCPO7ske3DUagOTDUE9lFo59/p3v/MXbM6PvKisEUAPmZ7Xx/Ba1aCOJhfAfeC6JLqMo2biVnvlg6btfi7x66txvfuiZF75BCLHcXTQPd4EAYNAVhbe8xoXRey988dqb/+7G3OS7TEUSAJEIDXSL+Vu0VcRFgaTIAiFqrJh95YuDVz5nU1x435lnfrYv1r7oGrujndnOEgCV1jjVWntN1YQz5ruD19/3+Rtv/d697Py7XJ07+2S/ZSXbkxlaLdoZFO6PWNNWPVDyJQo3pmLSKB35mxuXjhSLZfrquXf9Qk+sbUqTfPbawaCkO6pkXfSk9zrRiwGOqRos18FX71z9vr+88uYf3E/Pv8vlq74sC2dgJVTjtppHtmibiEeZOUqxriLNLPz93Ss//NdXX/+j2UK633AdgT+4k5OGdowACBJwRAUfeMGexptr4lu3r37kL6+++fv3i6nzLKaDyLKf/dcK07do82m54rAg4kSCRT6qIqMB33lw++NfuPzGH42lksf4QlWyy7CZgyZdFreVdpwPgA83r+QrWWV859bVD//1tYu/P2nnHxNVfJSELISW7d+i7aN6k4D5oKRMU1BgNr57//YPGpYVUV94788e6tr3gEewJFGe7gaAxpVsVn4WZ5u02J0jAHzG1mUFjuPgG3euffSLt9/+3Ukr9xjH4ucYffXJOszPBKzP725RizaDwpWFSxcdrzuMKDRXZeSJjTenhj6kXpH+8L979j0/fbC9Z4YLAN6/gBJUtAHXQy6EKnpIbr21sHMEAIHo62Y6Nr529cKHvnDr0n+cdApHGM/uo5V8rBa1aIdSFTaeo0G7mowisfH6g8GPG2XjLz727EufPNbVP2VYDjRJgeKHtcuuBYu46I/EVpu1vqEk7wT3BJeAMUWDyRx8Y/Dah740eOX3Z4z8ERJThZe12aiIMuCtvtkWPbK0mtRwxtUAv4cEURXkHZMnDL0SiUb+RDun/+TB9p5pyU9nJ4Hj20cwrilI2SKSo/L2KwGUSrBsB6/dufKBv7n+1u+NGZknOPNzXPdWg80W7SaqWAa+jc9Th/OU4dvDdz4mu/Q/ffipF35qf3vXlC7Joskp3Wa9VpbJFlvPdc/LnSMl18YbD2698oXrFz87WUif5d5UXnzBQjDPZDsMpBa1aAUKnNKsMj+XQhbLmoqia+FbD259zCbsjz/5/Pv/saRL6YJd9nbZRie2bOtbpwEIBcdx4RYNmMwGoVTE8y+N3nvhb25c/L2RUvoZVoPe41ELoqtFO5FIGEigCQVhQuheEdF3Rwe/v1OPfe7D557/FVelo8R1ESHb18rc63S5RRujVCRNcKaH34n35vTo439z5Y0/uLc4+7zDhRFf+VHblCPo9tKiFu04qqj8zeeniFbxNoSaghx18dXBK5/41uDVn+GH8n4VvHZguxIFPcicrdpCtdeKJGMsnTz6Nzfe+uMb8xPv5vBd8KG661Mu61d/IVVZq+y3RTuAfLDBYM42U+f5XBVdpVUZSWLgC3cufeDy8N2XuAnOo1/+KlfJbt2KDdsRPuePqCkakoXsvr9++zt/fmli+L2GrnJnwJp1/Bb/t2jbiVR7RmKl/oaiUywBr2WZs4vPf/n6xX/71t1b52N6BDpRK0lBtKb79GZugOxuIRtRuFAkDQXV6Pru3ZufuzQ29FKZg3goypo6tLaQelq0Ei3XS3Cj6GHPTYkEomp4kE2978uDV/+XAwP7f/LZgZOTrutB2PF/Zd6ebAucg3KcRDf9IqjE7ClMWPjmncsvfWXw8kfScEC1CFzSuBFni1q0Z0miMCISbixOfeRvr7z1WZnQnzrRvb/ATeOSbYrW9Vwr2OwEYVmDsqkXCJyk3M/J+66+8eD641+5/NYvz5oFiQjIbm4/bZwTpBI2DH23FatBi3YWhd91ozmx3cQ8Rxgsx8GFkcF/2BWJZwde3vfLGlDgGAO8KM71U4U3k+RsOb1pp+f2kK5HsGAWQFwgVyqc+vyFb/+vI5mFVx0R6/d7sG7gMwYWU9hx2IL3fnSJhcLIO43EPNUUpIomvn732s+0tbd94YNPPv+FuKSLsvi1mMUPS7LlmJt3dsbgMBWyTDGxMIev37j8iRtzEx81eZsuRQpwljaUGvF5I+Zvdf55NGgt73mr5kRQSSj8h8TDEpgrFfDVq5d+6nhX373njjw+qKAKe49NdHjL3CGxWcTzojlIYgw67owOv+/rty9/PKcSIfUQlFOSFTyna6RGOAH1AqBVRfjo0HLvN6wZriKnZ8OoEjIMricR8IrXiULqBz5/8VuL3bH2f/FUz5GZomOJByDu5mkC8qaoGRxPnVDIkizk2KXhW+f+/vo7/yoL5yWmaaJuWgz+Nif3tDSAFgW0nQAzIvdFkWA7DNenxz79xRtvptuei/5LWVGKjsygFc1NM2NlXnu/0cQlXMk2EJUVDM+M9P3djUu/NppPfZAGoB4b/xxrolYVYYuwjU7hQK2vtCAL6gkUSbQof+3ujZ8/1tk38tITz/yhKikgxPZa1W1CWFDmDQ02mniOf9opI5cvSF+5cvF33p4Y/keW35cffqyzRS3aMRTCmdkKoUD8FvRwXR/cyu9QzJOEIgrmCiXpS1ff+lhfZ/d/PX/4zLSB8qapJ5tiAnMM/4is4tro0Lm3R++9WuIBQA6hvBWMX98Odq2Ht2oOHjlqlGa+mSTSgis+sDC0HQTyFXcK3k8ln/v6zXf+WbKwSHnXaw5862zwBpEJuGET3tNjRNsuAA/mpo69NnTjl6aN3D4pHhHxTBKCQtpUCgTAGt8kCaVg7kQAxxatnXZms5gmiW+BJsKThHSp683xoc/sv9Y9+4Ezz/yhrKqGRja+/ZhsufYGnYrjp7twXQcl28I3bl3+zN3s/KfciEq5l3NL6SHEeHVvDjxKWpVGu5zWwvg76XX7tUWicnCxUNJev3vzZ/vjHV947sy5WwrjmIIb67OjCNSQdWwC1shDOkTJNOjVsaGfvjI5+otZMMpUL9Nwy0TAMsy/nFwQoUFR1BF80dIA9gI1EwL1K2lgOa7Tglw3BQls/B6opmI0t9D1nbvXfixbyOm8NsB2HAGauxEbJ3kjnpXX9/M8f97FZ3hx7pWv3njn3y9YJZlwx98GpvluFgkBxpiPOuwbACFhEJgDLPT/6ne1fzf6LjiuGv1tvk/j41Y+98Yct/PvafnjwnuRZQP7uwFKnigUJYu130pO/MLrg9eHPvDYs//ZZa5tOfaGmaiyTtZXC8Dj/Xm7DMOxUbQs6Z3x+6/cyyUVWyIVNN+dQo0Sgry0YSaSllzHgVeRFbQb8yYsZd5zuNyTwbvEMi4gqPjMiJetzffhpgP/ziVuk+Pq94E4j/ed6xVFMeJBS/PjiAca3fjc3lIl9gmO8xMsXMKWOe4hnmU997Sq42rvqfZZ1ji+/ntjzGNyifuk6O7U5kQKs65ioWQmvnPv+mcf6z1442hP/yXTtsSYOMxdtxiQ6ToxAfnRUS0KwzHx9v3bn3zt7vVfzUoOiOLDHO0CU5qv9rILqFSFwr2wbjU26w0w9T00zBcK1DeZXH81Iv53oX2EYRkc5/p7reK4ihLoTerqPlj5ONLouOo+le/W+ixVxfQhj1vFs6xrfEPH+VKeSYBNGEpwYVXOsnuowjYSha3JGMule7596/L39LzwPVcUVbNN00CHHlm3U3DdgIBMwJ0pmE7Pk4vDg+9OlvLtblSBTOmWFDOshparBhTFSJaNGFHwnnNP4/GBw9AtgDjhQkwamkCufxQJtSRldfswX1Gl1WuArfK4sKK8UcehTt9Zz7Os5biHeZb13xPXPImsYKqQwpduXOR2NIgiV2P9lXe/c4n4AKNccEoygWk7uDz54GfOzp8eeuLAkb/iD8ET7Ry2voJh2V6HV5EPIG9ykMxn8ObwrR+7MvXg+11VEXDeO4X5sWw1IJ8uLmA5iMganj96Bh/pexKJ6nrXol1GzM/y5O/vplvApaHbeLA4C4nD35NqHQh2eDYoCbqEMC82aMkMU6XCqa8OXv1oT6zty6d7+ss2j7qtVwN42M66XD47nIEow/hi8tW3J4f/Tco1j3KEAVLVFneEM735PXjlQFTYmFwaeirR5iIktGirSLYcSG6AzOtNRr/+bHeYA8T/H2NwqQRDdXF7euz9Q1MT3/v4vv1f5M9krjOML+v04awA4rdCWjTKeGf0/s/fW5g7bUdUYZbtNMDO5YWQpzby+eGyWkW1pQHsLiIVQ8AvteXQ86xqTATTYPdVgHrReqZSFB37zKXRwV8/1ds/fXr/oSu8fX7YWForyQZ7OBOAqyi6pGB0burpK6NDJ3KuCSJplVEmZBewUKDns1rrkKCl/+9GCpi8GuFzfVt691HYuUeCVmO8hkCRcGdu4pU3R+/+4kD/wD/pVHURhn9oASA9RJaekK+UYM4qqhdGBn97PJ18UooropghCJ67QetjDgriH9eqvW9Ri1ZHjfIUxHpFgRx18M7Mg3NPzZ48+eKB40OGaVV6bayVZOkhEiIk4eEnuDU19uTV2bEnCtQBkdQly2bQ2mu3hWBa1KKdSMKs5rwXUTCSmXv24tCt3zjZNfCpzmgbC+IiayW5SNYgObzsCmiKDMu2I5dH7v3GRCmzn6OZeL83PqxZW6+wcGgJiBa1aHliPv9BllEum/RecvLs6OJs/7GO/mnmg+6ulWRbXkMwhLf3shzQsoXxzHzvndnxD2RdU1EietNDlmPslnbQohatncQ6q6qYyKZOXRi+9ZtPH3/s52JQywaz1nwumUmrFwCiVhkSSuViz1u3b/zSXCFDqCo/dDVVi/Fb1KLVU9VVzSApMnLlcvTazNiP3lmY+I0nuw6Nl+zymltoymQteQAM0KUI7pan331x5M4vcNBCWYk8dPOClurfohatgUiQmO6D6WocSDSjvXn72qd7n47/geM4ubWmBstmsbjqnRVJQpGYuDwyODBjFgSGGViLiVvUom0hVUauUFQvj9771ZdPPfn5x7sPXjcsY01agBzVYqvakZ+zTdEwNDu2/8LwnXdneUUWT/sNpVa2qEUt2jriLcddmWImn47eHB1612Pd+28oisKsNaT3y5K0msRXBo5Oym2PO9MTH5lMpz5pqxz+i7QSZlrUou0gP8ROVQXFkkPfvn/7d148fXbiUMeBr1qssGqtnMq8FHbFzUuNHZ2bjr81dOu8SdwI8Xv516fZui6G4fEAACAASURBVC2NoEUt2nzyOwvxnBybAA/Syb5rM6OnePNdDbLAZlhp4yS3BXX7y5ACinkYuDEz8qN3p8d+xNGlhmAfrJVB26IWbRkFCFOuQpE2TLxx98bA+YET2uH2XqO8ypZ/8moYVoKEvFHErfmJ53Nw+hn1SivrQ3+kle7bohZtMTFAkmDJDu5Pj//ISHLqW/vbur8Wl3VRrbsSyQXLWHEnqki4Oz76sVuTY6/wij8mkaZx/1ZEoEUt2mKigCNTpIrlx29NDL94/uDJr7XrKlbmbEDO2eVld+DNPR2niHszkz82l8ucY1FZdP5pUYtatDNIZNNKFK4q4/bk2CtjyZmz+w613yxjZawAuUfrbPojdzPwYqG7cyP6vZmJdoPXDVDSNLd/OWK7oCNvy3/Rot1KhANxSMDo4txHbyXHHxw7dPwzZVZeETNQXm41l0TiLzA0OXZ+dGG2n7f3Eqdje7O/X8t8adFupAA4iG9518Lt5ETv86VFSaeyY1jWshNbHjGSzX+UJOhUidybn/y5+WL2XVJ7HAKQ+SES/8mu6MhbhZxsCYO9Rh76SwAXvueejiNaUQJHlXFvfrprZGri2GN9h4Zcy162TFiG3cxOIALZ98H81KGhdPJZixIBrx7oCzuz59qjQa2xfxjy4cX34LAFar5A4dIUjKeSL9+fnvjJ9514+tdsOFgO+Fc+Exto+IPKKAxi46ujFwYmc2lCdHXXdstqCgPNatd6FoYEa1HtUAVAr8FE241QW/6LXU6A7gbI8Kbkdxc2HVufTCdfnM0vagk9avBGIs1IXihnlv7EmID7LjumNjQ9+d/PG4VD4ICf3o/i/7tlBWoKA72Mnr/TTYBtG3tfCOwe5idrwpzYLZDh9RSeD6JUWNM4Urc6NDHSf/bQidFcqdjUZycXjMbVgI7qYiazoM5lMz9iE0RliVbw/naTCtq05DhAjwzNZcJq99+JT7jdrCdkgMv8prDbfDMrkNc9iFRfpC8Jms3d3VievoQXeTs0RUEylz1+f3ri4ycOHf0PTCKsmdCWFbYUFpznF6uQpQczUx9IlQsRKlG/9VJwjd01TPVxjnBIMvwkPL25Ivl36DOG72o9K3HYnFuNT7eyD+d9SncFp0iS7PeoqEV7Xs6U3W0ZLkt4kXg5AQW72D+0OPPL36dJ/2VfrDtpOVbDxUPmgJ61J+Tc4cApls4NzUz9fs4sxyRNqqkx3vVOKL+QItT+Fw4FDMqQD2EYOnVCohGGYaAyBt812qf+u3DNBF3m3I2Og6+eSh5C26b2XwjecSBoOONYpHovzjqfZaV98JDjG3xflJgolMGG9dLd2cR8n5aYu5RgqpDWJ+ZmuvYNHEs6Lmu4YMiuutTaURUFi4sLnfeTUwfKjgUiR73mjgG/7HJXqtcsojpxmSyhLBHcWZhEJBbzewM6lYaW3tR2a6zJYBUhLLSqBI6yJUYnrXMvVesl688D0vg7BJqL46KdKjjT2Yc+JeZfs/bFLtcLsX6f5ShAdRbjRam46yIcDKemMVfMwVYUDw6uRgSE9asNHCcsPa7ZOAkNRZYxkZvHol3iLXCrHQobjMluA6dtdr8VgU08sJCkUaTDU+PHz3YODPLu3d40qX3xsmbXfkFFvz+K2Vw6PlvKFWyKdolUOwHtSu9vE6oMnkxRBsN3bl3DtXt3IDtMdAiuTu3qekSIZwwx0Yra6/zrEQUTrafcpZxcETfVNYuIjrnwGlzWHceYxwikwjXeBOZtv41SCcfiXfgn7/0IBvbF/LtiS9e4jfRkVqCoILrt/v3lN3Fh6DbQHoVDqi3Am41TzbNUxikkKJaMU/VzME6Nxpf5x5F66cL/kRhKroP5Qh6yUu0L2IhY3VV3DRGyRPgHuQ5QFeTKxr77s5O/VDhj3dQIHTNsc4llKxOjNkSgSjIMM4874w/68sRWRPZf3WTaa3Fo3tDEYi6mU4uYskzRh9arl652pGUhnzIj9csParsL+U0RqeiVv3RS+WwgfltyXIOljYge/kQgwJSLeTiJEvJmuXKuevav8MEqNIGVqLLK+NmfBlyMp+ZwZ3IUrBSHQyX4orCiJzUfJ0+YVYh4e1N3g8eJCx9+bomCarqwiZdLhtmNzj9BDR/JfxIeDmQumUzNv5jKZ/ef7u4fKzTA/5SL4WpA4jFCpph//N70+D8sMDvCBUDF+79ZD7IDSEwyTQZVqb+mUn/6hZ89ULHCDpE6QeDvJzKzBBM0Hjg30C7qzxV4qkLXCyQw4x1MJQeIqgIKqnKkv7o1VOv9yMb6czhEH2VRXkJ4SDgRgRuPCiYLTIVgegVjxcLP0mScEIxTo1snvF/jasa8Ok7Mb6kN3imHBPe0/MzdjcwfzMr6eycIPZBEkSmXSoMTI8rBWJv42q4TAvK+aKLyh0Il5G0D9/KZp+YL2e/jL1siPhOEUij3ahaat2AFK39VLQ05wCvfLf1YOyYs9CZWak668rl8FFjeG44n4RDimw+hQ5vN8QaoTesh5gtLh1I4hAqthPqM3PgWSM0/S9iNVKdxMyGwpnEKvg/m6h51/zXSWmqMTMJAJQklx05MzM9+vHTMvCGrSqrEfXqhI6lCJAQbZ/aopCCVz5KCZYH54Z56b/BeJq+zLK10mN0xG/Pi2qQuUEWWYf5GkG3rJRKMke9QCjSPHTVWnmGxZKz2CpEG3bbckJu6wtySBMO2IpOL8/9s1ig+xxePTiWCuKyKTezDEUSDjatiuXIxOptePOkwb0msaFsi8ePREQQ7lwKVmtZM+K2mevdoi3Ye8bRgmzAslHJkvpxzZUIRozIi/gbhA2DVYiCXUCQLuU9MLSZ/zSFMnKARtQpRtolI1cFXswI08TMsR41M6rVQOEC6V6hRTsNuoSX3yzxNjTu4M3bZWizmOnlxn+m4sEOdhOUFs5oK3CERpMqFA8lCLuaI0I3n4Hk00ih2B7G18/qy9LAmAnk4ubPjaW89DxMlwkXXUabTC7+dM0pJVYt+y3aqT0kljvojNoqMZSBZylvpUlEcyFNjW8y/Am2kob3SeVjgC1i/IKi/7WaXrnc2btgFd8q5QhRoNHtBq6k4AymBQYCp1MLJXLl4kuN5cu3e8VVA+US0S3xQqYR7pRSmcmlS5JDCxGsYQvaimN9o2oikG9Ygt6ABVWL7G/gIKzH/hs2Bh+0iu+SmNi8Heq8td0yiMF0HyVwa2VKxZNgOSmY190e2/XipTCQQx306Vch92JW8GDMLFVHsHQdgXRx6I2gjTkPY6uRIKNK1Ucl+pEmBTCVVd5mEE7ba3pDhnIA6WlMW3mYWP+xB4nzLHYGZchH5UkkpmzZKplkZbdklQZIJwWI+++PJfO5Vi5f+0rrssj3h+Q/n82+QGyucbhesTHWTVMTvGVsWTNWLr7Pl74h4MXhGSDW3fQNuG8vwFVmRwVcnhrzK6+YCgDUIbTU/2frm4kZkSO4a8vNG8mYJC8V8G38PuqLC9R2BsgsSLPHIFItsvpCDLXn4Yns3hSL4d6OD5E0meEh4iiuuA1EnYPuwdrYedmi2+q9M/vVDmArLIu20QsfbQox42ajcqZ/MpVVe6TuQaIPleFXA1IQDkzmwCEO6mHfTxTy4CbBcqG+39f+r3i+t25o/I1vlc1YWfMIarv7BVaUQszZiBhKU+C53sWaXeAjeChSWjVwFw3MmnDdSs0+TZ9jKxWa5527yCncfhZCbKPEyIxdzmYF8qajzhL/g8eVsqSA+uK6LollWuTBgVGmKh7HRYajNJLLO+90oG3uttBbMPbYN91lTF9Hk2svdfyOtY7vGes+SX8FbRUEmfIH/dNYoDloUf2JSPwoQJTJkKsG2bKRK+aizwqqwW5I/GNbXiGS1x23ECspQO/sZlhreLCiOIbX7B595mvByFW+ruo+VgxD+fTB/FSWV2gDv0JBBEvbsMVRZvMH82qiMxrAwfNhz7UW/ACFeheRiIdudNkpP2BKFFXQH5is/CEXRKCNdKlSr35aJtOyWMQpuX3pILWBTnjN0I+Hz1zjbQoU1lRAcY8KOI6YDoriA49RoOGyDhMBKJMqkLAZm2iCWLRrHBt6iQGusrjqs8izhdLJwZS8alAGvh9YUUXhUiAtdKiFTKiJbLpZ5pwA7yAMomgYc2UWuVPhoyTBeqrzMBoJ8N9JmpDHUnK/BwCxZ/Di5wijzxpV/5oKX+QzCM7O4UyYoqhFYAswHHAG4tiZSsiQK3XDRrhNobrVekQX/JxuVtdOYuEakgyJhUbQZDHaRd6NHxaPMOZuRag2Jh6niRZiYcHBQMJ5dKlXBOnnBTg1EQOiZlgwtq91nc2kviRKBFw7TMVG0DLngGCiWPTwJuWybIuSXKxf/p2K59CQhdeG/tYZodhCRZhNprRTSjYm/mrlinJjHqL4qzFwXro+9xj97G/MAVZnowyaarfBNkSQoVIYmqdCoDJlwOAIJmqxCpQpUWYFCCRRIUPl+VIbCvyMU++NtGEh0VfPWK8J6Y8Jj9cQqxT8EMSh4z6mn0B3rQFEGSrYJjjtvwYYNF6Zrc1x6sfGkE8t2YTEbhmuJ3wyb7+PCYV5OuuV/FmFn4mWkckHHYb28LcBvXN3zkbrPDz8iu3nmV6milYHBoQxZsxwplcpwLK8GSOZqf9R1uGpgFTjKDF2qk+3Gx69dHddGrP4kwR+csflk5VYTX4F5xxXbX9nBIIMITAVF5n4VBZJEoSgSFEmGrmmI6RHxb1TXEI9EEYtEkdATiMeiiOgaYloEUTUKXdIQkVXIkDk6MxSRql0VZhEACR+UkzYAhdiMseTXtoQ5RfDSk8/j/JPPw/TvwRW/MSEEuCgo8RXGKvNSVGFaFstFFLn6WSwgWyigWCqjbBooGkUUzBLKhgnLNkVoynEYbNsR2WsOs4SQEE/IZzKfmzxHRfJWNEZ9mDpSvU+golht0JPvdiIV7ZD79zLloktthj4lKp5LPnLgkIABH5qZsIuW6Q1uiHYdTDKrnRCVqP8ynvVw/DpwqolJ5HoM72m4/irOAIURsWlQBX6iSgk0IqNTT6CnvR3diTZ0tXWgLRZDR6wN7fE2xCIRqKoKhSqi5aq/1vmod1VGCu6BT3sDBtKsCNu2wUEdy7aBUrmAuEvwdOdBxJW4b1lvzHRv5gQMOx05duJgahJJIw85FhPPxJvIcKGnQkUUOuJSBJBcgRVI4qTiUBX4fuJ8LlzesoqZsCwTZcNCtphFJp9DOp/HQjaN+XQK89k0UsUsSlxz8IWMwTzhYFMmuto5wX1zbEIOAeZrsFWkxqVsvBpIOw9/cGcKgMDBvRrdhAkfH/FHnSFnlHrLZrk9psZERyC5I9EmstRKlilxtY3bars9DNowzLRcWEqk2HnLBnVdH2KOCTRcyryTcbkYVXS0RWPoiCfQ09aBvq5u9HR0oCfagU7ahpgcQURTEFGoUOMVweie+uzwfAu+Opol5Ao8LbO68c4thXJJZGvxNE2+lS2+twmT2XAY89Rl5qKUz+NwtAO9H/gHONQb955tswfUJ0kIAAdfu/AdXLh3E0pXHESWoIKKSJLECFTCn19FRFWhqzrimo6oFkEiEkMiEhWaTzwaEdpPTNORUBOQVQ4x1g+3jzM5HycHhmGjaJrIW2Vk3DzmjZwQCrOpJOYyKaQLOeQKBRTKZQ/miqMWU8fL9fSbWBIS+BpIdTVo0By0UZr7bih5X8m8ZUEXb981xMelaBkfL5jlYYfg1/k+cs4sCXFXtE2JS1ZQeVcrPh4GHwvh66FmPQgEQ5CQQwIb2rYhOS4k04VkOUgoOva1daC/swvdbV0Y6O5GT1s32mPtiMfiiESiiJAoNP8lcPU4AxsLZhrZTAbpXA7ZfB65Uh6lchGFUgnlsiFUX87chmN5tjO3ly1LqL82/8xXN24Xu061EqfyAinKpRKkNhcF7rsJyF/yhK8h3CaqLpKzUtbfslEffzw5g87l0xhOTgNmDC6l3vgxz9/BbXbh5yCS6C7NzR/+ryYrAm6e/801Bv43N4ciuoqoHhNmUUyPIhFLCI2pI9EutoPowCn/fZUPcAFUFlpQrphHtpBGOp/FbCqFZCqFycUk72bF7Vw4MhFw77YswZGlqipLqj6Fqsmwsma4k4isYvUPZ4oGz+1SCQXTjBbKpbOOzxMyt9MYY0rJNiWLOSBEqUnv3I1Uw/uh6DARKzwqDjvuCGG2A4kQtEUi6O3sxP6uHgy0deNgtBt98Q70dnSiK55AO41CESsgkLEKWEilMZIaxkI+i4VyFhmriLTBwyx55I0icga3cbnX1YTteB1aLZ+piUR8+5UIGDZxbwoB4T0aiOTXYZAq+G0wYfn3KgGJchVbql0BmlgCFSGwQe9TqJ4RBVIiCqc95tnkoc6hwlfAwBFpPTks/uW+EgPMZiLhjPkREep3oBbaAyHQFRlRTUNc1dGuR9GmR9GuxdAux9CjJdCdaMe+9g70tnfgaNch6F1HxP0UYGOxmMV0KoWZ3CJmyilMZpKYTi9gKrUIXt5u8CiLRCHJkoDKYmGwm1244q10yzWCyxf8jtAATBQNY9F2vJcmG7yHAiPUZg6ptBFeYbLs9ABJbRMIT/cTCNSWA7dsgZoWEpqO/vZu9Cba0d/Vg/3dfdjf04eBvgH0IwFVTCy+qucxml3EQvY+0rk0FjNpzGezYuXhqmiqmOMD6tnwXA3ldRScwXlFpSQJ0EzedwACd5FUUYLr7W0SbqdRQeGusb9dv4ORqNMIpXNWwmP1qxVbWUCsYVAropQnlfB74M/rUFRRo2suX4VUDz9yuHsQ9dNubW7iuAymYyGXN5F0MpB4bwaH8QpVYYrFFA1dsTZ0JbiPhftaOtDZ3oV2YY51oT3RjmMHTuBpnBDjOIMSphdnMDk3henUHKYW5jGXyWAuu4hUNg9HoYCugapytey5bsz2BPJVqHcAf86yY4LnAWia7gmA/VIUizBkg7nUCUEGN6qYCl7k7uigSsQEc10btmWB2i4SVEdfZy/2t7XhSEcfzg4cxcn9h3Ao1iM867wtWLKcxXBuHBPlBdFZZiI5i5nUApKZFLLFIkzbFswtsOa5WsVXZE33nU+sEvtGpZa+OoBBuLAm0yeguokXdGIKJqXfp2SNI1B3iXXM5/B7D7QTHgnxOLo2d6T++sSvhqwPLwdw52KMJL/RBxegiueSEX4Y4qlsJRdYcHIgizmweUfkUSiSgrjOTbV29HV04WBPLw539mNA60Zfog3PdB3Fq13HhHk2aaZxf2oCg7PjGFqYwkR2AdP5LHLFMmweWFAUELlq/m52QtVWUVju8+EVHYIIIZoSFY8qdzgyZux8vuTYJscHWo5Y7eK146jixXY9m56ZFlQG9Kg6Bro7cXTfQTx57AzOHT2BfpIQKj2fHEm7gLnMAoZnRjE4PoL7s9OYK2RQ4s4oymBRiGIpV6Fgquqp1b4KH1haNKR5oMkYrTq/v5JbUBEXy553K/r1k0bXXmUWH/NsgZqGq55ytvRot/J19YrMj8cHQoO53ribDDC4k3C+hNHkDK4O3kYUEjr0GI717cepg4dwZuAYetu7ENfieO7oObxw9BzmYeDmzH1cHbqN4ZkJTGdSyBjct1ACU2XRVqty32R3V8WG+zpyDVKYorZFbSH24Mi800vZtA6ZjttZFdkNF6h15dZvCTGvqIlYLiIuExDIJ7oGcP7oKbx45hyOxXoRJZKIXy/Cws38LK6P3se1+4OYnJ9F1izCFB53HzKJ+lls1MNHkGil502w5lUQMRqFZuoZcy1AnPUlxIFv06tWq230uCWltqw+RcQXfav0F3F4uZpwa6OKyAbMxoJxE858v3eg39BaCHrKwBtfcscph77KuTZmymncH8vgtfE7iKtR9HZ04fEjx/D0icfwePt+9JMIjvQ/gQ/2P46p8gIujw7h7fuDuDU9ghmrKEw6SFwjoJuTSroJFHbwhlOYKmPr51JwLZ87n23XTwRizNVNy/zfbdd5ngVveBdqP3wy8IaesuUiBooz/Yfw8tln8NzAaRyIJNAj62LezDEbl8bu4M17N3BnbhyzpSJSVgllHm7jOIiKJNpK8wkrqE51JXUrfbUBxdLSYeYzasUMIMTH82NLPMz1jNF0Vfe/onVSOFhRt6PufjUaSGUlWsV+XikxrZpKYccI6pxQfqoxn+6uP4Y8NZmj3+YcBwtmDtPJAkZSs7h0+xqOd/Th3SfP4t2nzuGQFENc70Hv6Q6cP3QG1xbH8M1b7+DG2DDSpikWAvjgOLuBSKiEfekixMRU5VmXluMQxxXeGy4AIFu29aTtOtJyPfFXE3p4WAqbFms9f2V+2A6UsoOT7T343ifP4+XjZ3GovR9dfuvKeTC8MX0H37rxDganxpDMZ5C1DE/l0xTIsi480ZXM+vowSjAOYc98neRtpBnVhOVCnvL6ta6eMZoyCmmyP0IMsgyRRq22lqGQg78pbaS9XCsI69exFe618s6IEOIyb37hOmCOi7RliCSjsdQibs9N4ttD1/Des8/ixWNP4TBR0B3txMFoJ851H8Tlifv40pULGJybREl24GqycObuZJyA8OqPGplZ/UZoqVxbcmxiMcfzAfD6Dctx5hzmHsEKCsBmysGHiSx404N7NmyotosnDx3FDzz9Et537BwG4HU+4d75SVbCF66+jq8PXsPt+WmUmANZV0FisRqZR1ZgoGaAnGtB1dmUObRJWtuqQUE35aHWftKaV1BJ5vLbhesqWERD2XVxv5zF+P0UxtMLGJmbxg8+9QrORDrQDuDJSDcOnepGb1s3vnTjAr577yYyhgWiq7tCNV7+VXkmgO3wiJ/rawBgxHJs6oGDkm15xIf2K3CVxrKQsIGn+o/ik698EO/pOYmYz/jcpTltF/GFW2/iv73xTUwbBbgJHYrfFmmt4LI7FsSiWQfSul2WL/ZZSsuDgm4frUrgBk4T6jlTPTRIV0Qb5JgOqC7up5JYvPgaiOXgh559H45HO8U85ILg/X0n0JPoFKd64/5NZE0Lrt9mvNkY1l9+u6gZLxFfI3BcYQKIWxTWDU9UcQN41w2uz14tPYz6L2rkDQNHunrwiRfej1d7TqItpDjyl355ehh//c7rGHfycOOaZ9P5tB6VLlBQNwmifm03Iqj5TQQruXevrEb9XwkabGVQ0K2lZZDXau+bVG+e+bHwwIEqnKgcHz+mYZE4+NrVi3jt7jWR90F8ZVkH8Gy0Cz/84vfi2SMnoBq2yElodFkWsr0b9ejbSiLL8ZIfU2asCiopsjgdzy0VCrtsH6362syz+3mCyJPHTuO5g2dEWi5/Dsn30vMCktmFJGazKdiqJOz91TArq/OyN3vh20chnWkVz7McE+80Bl+JVitwa5yOFcdiCE2ZJ1QpnmmQzGUxnuSpQ643qp5DRex5Nt6Pl06cQ08kwWNoTecFabDtJKosAv7/gqegrsCeYCRQALZ7cq/m+hWHoeWgP9GBMwOHkWig+PA4f0TVRI29KPJxm7c5CyrydnKeQyNy/cw8NFjVw7TcqrnbgDA3TOviYWPHhSrLiGiaKN3yeb+SfMXNyVNdAzja0y/mkIfvUHsDgTgOb6vVVDaTlhQ9gfgmgIdVgWAZqSZqbN/NBlTNxFqB/KJvWfKAMiphj9CBPOx3YuAwnjx8DFGLACUTcFYh3pog2rYooF2cJRd4y20GWrKglE2cGjiAJw6fRNQvza6J8gLQBJ6DXk3O2iWP30hbqZh8/t+UMp6+7nWeZ7XK5ZZSwLirCTcG/h1ux6VKeUxnFmDW/IiKUXOu8yD+8Xs+hJcPnELCImBlC67tihJbN5TfXrluZXlZPiS6IoR3oxeyCfZhpZdd6KS7Fdq60fisF4I+jLUQhMEcvgiYFuKGi3NdA/jEyx/Ae48+Iez+8NWJf+xsIYPZzIJICBMds0Xn7Oo1Gi0WmwG7vn7yTSFaXeBkMZmp5GGHu6zq+d1CqjD/KsNpYn8e2lFlLBZzuDU2hPHjT6JN6/TUHIGj54mAOCF4rvMoyPd8BL2DV/Da3euYyiwCiiwKQTiIhMj2C5lA4Qy/jX8FCK6wYUS2fFF6KJftisRC40NDn9k6TTPqJ3MRh8HhYKamjW49gpfPPoH3n3kW7zl4Bp0i1Vg4yMTCEJRazcHBjekHmFhIgqlBghIqzIRVJDftBKpoyGI8qr4QWfhDfCQVUTzDglTXrZMCK4XjliQ3ED+tgVA4EsGNiQf4/OXvQHnh+3CCRr3J4xfnOMKjS/Bi91H0vdiDcwOHcXV0CHcmRjG2kESZV7jrErclvAo+guqUC4XANmI0SJC3sFLILnBa+beyVCiymqSfjeqVuWz9O6l+IFi5a7Tr51UsZ0otyYZsYALWjEUzIo3QkD31jtvtvAqUmjZ0m2FfrB2PHT2Cp4+ewAtHn8CxSBeiPgIT9XvqB1pDCsBX7l3Et+5cQw5+v4yQBrqrTCEWFJcRzuuCIDQARphMqCtts83btENtKLUxvIvLPDElqTrmSyV88cYFQJHwA4+/iCei3Z5k8/QB8R+v8zotxXHi2LN44fBpXBsZwtXJYQynkhjNzCNZyCJvl0FlCplXhcmSp+75DMs2QDMiqKnObPy84R8DOUTCDAGBrEsUpfbMIbmy9sw8/xlJYAaSyoXDGqFn+igilLpcJmH4na2lYrQ62kvPt+xxLJRZyZ1cHFuQl37bDnRC0RmJ4VB3F4539OKJ3sN49vgpnIjtExWgbmi8xHzxwIQw4pbx2oPr+KsL38a99BxIVNvVhUHMX9h5irskSYxS7wVyPqGKJPXwH9xKzufOesxGCmcVw4+DZGiYN0r4u4vfQSGdxQeffB7neo+igyPqolrAAx/U8qAUR++JZ3D+xDkM56Zxc+wB7s9MYSqVRKaQ5wjJyObLAoKL+xl4qzRe+86LQ0RRC11hFa/TGoKqQTcISTU7LFQHEPxdP+X4bxYl565JQgAAIABJREFUyMLCYp0HWiYBw5GalbTRytpolElV5lTKnby+ct7Gy0fSMEUmpU2WTxulTWzj+mepp2rJcRXrDwgJzUAY+YVf4JgBtiMiPJQjOjGCNkVDWySGNj2G/vYuHO0dwNkjx3C65zAGoAnGDxT5KmqBp/pnAdwvzOEbdy7j69cu4UEhBUQ1gfFAGzxr/TvbSdRIoxMgNJQymUhiqPnC6MiScl8CPeYVYe+s7K/lrE3iJ22I2nxdw4Jp4u8G38atuXG8/+yzeOnoWZyIdaOTg1aGziL5yLr7IaM3cQjvOnsQpSdszJQyuD81jqGpCYwsziBZzCBtlpF3bOQdE4blwGKWt7pxR4rvFOJCIRjoQOcIU3hVb1RRWVN30KBAqPq8DJIio+ha+O7wbczl0tAohaqoULmnmsOJSyoo8WBHaYhJKcgSVTpY94LVIfiOm01cWImiGg7zbZvg8PEl4mC2lMdULivqJ5rVjoRj4uECpZVs5kADCYSkX5Dphd5c734CRCFuXnCBpxIJcVlFTNbQJmvoicRxoGMfTg8cwon9B3EwsQ9tHIKM4xbWAZKQyt1yxncxUcri0twwvnn9Em6MjyDHbDGvKJG83JBKYXK1yCYQ7s4WOtBXW1W6pFejqG3iKEwS1/o9DUCitKQqys9JhP4/hLF31ZmXO54qCgtfmTUVRcfGvewcFt74Oq4O3sK7Tz2F88dP43hbL2KeAltRS2V/4z6ChCgI6cHRk1148cgTSDtlzBo5jKVnMTk/h7H5WcxlM1jMpUW5qLf4uHBtJnDv3SCVyveyugQVrHshVymptFxfWkEbaDNV2VvPqIHJyc2TgmPim9ffxpuMT2omipgoq0h3L0JBPUw+6jut+G/Cz+MLBuYng1R6GPgroOvjEfLUcP6tGzAfh/2mDCUARceCpKtwQvfXaB5WBAwCk7y6wJDQPKO+dx4cki7I1nM92DbqZ6vxngrc7ysxDj5KockUnbGEQF8+vK8fB7r24VBXL/ZHO9ElaUgoGmJE9itCGt0XROSIoxxPWWncGH+A1wdv4Nr0A8yZBRgcoISDhPCLsirMZOUcu7DbsShuJJQjODNZ8jUALhkjqnpPkeV54lZ9XwGFVbLtUnKW6+cerBgIJrmkwCEukmUTmdlRDGeT+MrgOzi9/xDOHzuNcwdPoA8xoQFodTYq/9wGKlTIAUXDCb0dz7QfQPmQgbxZFmCTmXIei/kskpk0ZrnvIJPFXHoR2WJeMAZvuWQ7zAMQ4emm/prhClwBbxAdX0sIgC8qQsx3ELBQR9clY0E8vL15qyBwDyrdhvwVKnh/XpMNX60PoMhQ/a0xnkA1zi1W20CgwUOUFWEtjqunKELAVPwAQfuvigO1KrACrZKhXl3m9+0KjEaIjDTGkcR5v3qhrXHwdOpQaFRCux4TeIA97W3o6+hGX+c+AQvWGYmjTY0irvFeCgoikGrU+0Zk+riOadi4k5nElaE7uDk2JCJDC8UiCswC0zwfUKUKilTNtkY8sFZfx3rpYUKLzJdifEHwgFo9UAV5HhaoqiSikqLCzw5qtAJtJ/OvqYc988AnENNFB5pJq4TJxRweZOdwc+IBjrT34GT3fpwZOIITAwfQqyREkw1SF3MmfiahQEmhOqDzDWBtQLEXyDolZDiUt2GIf3N2CSmrgHQxJ3qw8Tbr3J+QKuRQMA0Ouw6D4/tbllCpRZ8/PscEfjUN9MoKEwaaRKWFlo90GnifJVkBlYlfw1Gr2rthgz9Y6f3v3JCWgdCzVv+o4vhLNYGQqlNQMDK3twPzIpR3Iezyiirjr+Tww0uufy/wjtVlDx1YU1UPCDQSR2csjo5oHJ3RBDqjMXSqCbQpUSRU3jhFFWChHWpUYD7UM13g67FDyn2QU2IIr76Jkflp3Joaw93kBB6k5jCRW8R8qSB8GpLGxzTi33pd67Um9vRu0QSI/554sxpZkpksRC0XAIoLhalmRFJsEQIhS8OA2+neqNQ5r/YmKtVfXsGHJGkAU5E3HQwmp4V9/07knlAZD3T1oa+zEwf5507+dy/6EBFhoXonWkDETw+NSRH0xyIgMb8sARDqcQEOCi5HBC4JKHCO91+0DJTsMoqmBd59iXfE4YjBJd49x7D8PgBcSBiegLAs8Tf/jQNlchinAJ6qIqB8AeEE74t3yvFj2IHKVJmaFSES6BvEw9qrxBgD77/rr+akkkwleiN4J/HGIcgVQbi4xtNYuHnCob813hdA0bwUWw7/rfLeALr4Tlc16JoCXVFFJ6SIoiDC+weoEcT1CKJ6RPQLiCsRxKGId6E0MY0azhd/Dw/1ycFUcR7Ti/MYT/F/5zC1OIfxhXnMZtPgLbJZRBVOPslHLHJEPUBV2BIS9Ghs4u9YDRhKaO5sJdVfl78nntWoyYrL9SsITEApwtnF0RXV5YPgMLak2dR2agBYq8oTyuGpOEv4CRRZgD5ywbDguJhbmMSV5AR0WUVPPI7D3ftwuLsPB+M9GIi2oy/ehq5YQqxECTS2JeE7f+CvNAmxccjpKEiEb7X7Of7ENGCjxBs1GiXR/IL7FHivAP45EAJcY+Dfcfgm0WuPt93iXXEcW4S5hJOO2+W8hZbYfGgs5nXdCQqaKlsFXpz4IU3Xn9MerLengAQxd+ptfhcugfEvSwK+W9ji8HwN3PHI+xvKPNpCvJZomqp5TK0oYmw500dVTcB9R9Wg/ZkOzR9T2Vefm/kQXN8pCQQZCEv35b8WuVpvFwXQy1wug9liBlOlFMYW5jG+yCHCF5E1igLqjSu7pCMqhJZLqtpK5WSk/uxLWXi13v9mYezNJhbSZiuaEmPe+9B0V/LvRuZ2GGHMVqnk8hdsoNZLtfOCGx41ewENpXGg/gYIttx+lT1GKDNgqpRHciSNq/cGobkE3bE2HNrXj4HuHgzw7j/xTnTzhhVaBDE1IgpHIkRDAqShYGg0ZpK/8f3jkOFyGywahRutTXWtbxEWvEjTV2OD/nu8Y5DtNxGxfaEg+g8wFx66s4fB71YKWDztIKj7CPsZvCanpBLR4HaicBjyzz7Tc+bmtqMq4NKIYHrOxtyHpDRYpWlI/Q7GQ16jl7xqW5PK2BQFerONklkWfQVzJm9rX8JiISWYfGohifHkNCZTi6KlGG8MYikUjkLAYlqlRx6tds0Mfa4DLiUIr59L7o+FqgyX7zy1PXwU1mK9NHcmhLJKaYfLvOR52TFNfvOuDOoqVKo5sObmw+DpOyDR/GHiruHbFqE7n8NcmcGUFNj8XwA5VsTo7APQ2WERJ43KGtpjMfT48NP9bZ3o5q3BYl3olmOISXy14+qut2lEEQ7G5SY7rfs3YHSpbsrV58Fzv78LWUxi7kMQrdyU2pddv17Vv6367+vfd5jC+9RPKFp3bhISAvW0WiZgPlKzAKu1LZRsri1Zwn+SdS0kraxwvs6mFgXDJ3NpZPJe7gZv/iHyFogLRyUic48FTViC/HdSN0grevQb3/lq04A3m/mbOchr35enCUpcAEiSCZc9KJTy4jeZ21/8x6isuiqVhGe26TPtVHXgISjckEN06hEJERDAksKH4LhwHa85aJaVkMyWMZZbgD41Al2ElyhUQoUXuifRgR7fS80/d8fb0RGPI6JEEOU2MY/PU6+1t69cVxidhgqLwqtnQI1U3kCb2A7jspk56IbuO8xjLFSI44RuOdB0HL/nocFMlB1LdBXOlopYzGawkEshmc0imU2LLVcuiEgL709YFscwcaxJXaHdcWYXkSDe3i6EmrpEo3/kiHi+HJchqmhfjGn678q+xJDHpieFWhdVNcqbOhK31Pg178bysjVQddKySiSBBuhBIkTNRFSB9+7L2lbFq02KGWjZJDShInu9/FXRy19CRNERj/D+dzraeMiKZ6dFY36jTK9hZkzVPbOCaxGQhW0s+bauFJLk4epDqfJ3yG5dxltdQ2t06IR3F9jyAbik7/hkIeZGJZLC/N8ZilxdZ55vQ6jsvCkq75VYNkSjlUwxh3yxiLzpfVcwSqJ/ounwLsC8Z6Lr+UBsSwgLXpFXXdUl4aQgwhfhO0H5HYbV+D3O8KvyjwUOYIfxaMt0VNdnigEseD6XE86ZhB7ROXgGyqXt9/ptMjXzH4TC2L6tHNpHTDRJWLKV46ln+5VchoKwt20wqyRQaLlw8Pre8Y1A5Q0yqQpd1qDzjrqUCjSjiKSJDjeqTBER2XyqEBy6piIqvOk8y08R3nNNUSATgi49gqOdfaLvAVgIzDSAv1qGgmdci2O1ykNEmEhjqRnM5bIoMVe0mjJsL8Rpml70osgjHbwJKl+tXQuG6zEw36cowqGO6FBT5MeK32zB5Hw1d/wEJO6H4BmefCXn9Rk0olfG3Ovm7FbmqPdM3l16ZUq7Jzy32RRWEvmq36lFJZOAjpWzXhiwKxoXIRnTsv4orkUOsuLimZ3e9Gu9tBr/QcMab///VQhmH3OOu8p5Bh6RKjsGK4/AHeBNK1wHObsIUi6KGDpzHW+l90EJPEecl9Uneu3LXidd8S/3uMuyaGxpGxZOtHXjU+/7MDq7D1d9Vqt02q6mcrBR3kWgIeXg4kvXLuDi3VuwoioM4ooOx7zGXjScsAOG9sKXTmiVYkFjFR/L3w2EKn8IlaPSy0JYNorBBrh+rNIdpfZ5qxO9xfyNiPl5AO16LKdoqlssFcVeckxAZim8O+5/i6ja98NlZxjqStAeUWrm3a3wRojpmsEHeMk8kq89+BF3Vk24YazaO49vIp9A6LJ8HTREV12h1pc5gImLou/w+hhv6x7cxhq1tdViLrA6JoPIdWC4tziLi1PDcHva4Mq0kifg+VN40RR/JtXvcYhqDkHlXJ6ZUu9EbOi1rBFsyyPysB2CarWjKHiHvHaC18AoqtEdbUdE1sT3slBjCeMqJ+WNFoOI6x63AlZFa1lJlmgMYZd46KdARa+kytL6A1BTTMT8hBveOJOnElOeLx9RPTt4E99RIyFR6TqjK6AxHW5U9Zt6Vp+A1UHLLzkNQ4idV0+i5dsK2ALBv48inFszf7ComvQze3hyVULVI9yJzWQ/FdhgjnC0aIrqdkbihUpefUuLWjc1qgxEsB7WtLkKxZ+XlAv7QsFfSXkCLK0H5FjDu1qurqJyumX5h1Ri39QXWjXhzg2eN2EtbDnmftQxHFloPaloW6z6I//cGU9k27TIA8psSD42pszTNjnF9CjatGiBF2JYrHnq46NCDwP3VH9Ms95+DQE7VroOq1tXGa35cy2Mt16cOhb60Oiyy2XJrdQctP63R3VF3yhivp3Jw/sdsfifdUZi/1lj1fkj89RA4hdmtEWiTpsWxaJjBilSO6IacDvoYRxJm+l8IpXqwId7Ew0rKSv24ZrPVr2vBr+uRlWv2b+iDDW+kZZTb2VqlHQWgJI6zKtn6IwnJmJ6dDGsZcqS74ziToJENEp5NVYmt+glVgQnavkDdhitnyEeXguoZf6NmBc7Czl371DQ7EfgKrhAf1uXwRf04eSsEAqcqOTDZFHPRoj0JBKQ3WoHFNIgG207Wx/tJtoMeO61nC587Y27l7U78Fq0TcSq1Zs80tedaEtRSUKZ51y4XuoWFUUg/o6dsba/6o61XaGOh7GGBlI+nOLZoq2nRrn+y7LrJr2ojTwta1Dz0KL1kzDFXG+Bj2uizNrUVcWrzNS8MCDl+ex840UvqqJ8rSfW/n+qTBICoMXoO4+Ij9WwqsKa5Wx8tsxvW0ytObZ5xOeL6hL0RNvQpkc0UbTml2tzkmctL6GEl0SWKENvNBHjeGo5mM1t/1aUYFW0Xts2UNvdOoc/8eO6axICbpAqXD3PTuG81ZQIh5GhWj6D1RPP/1cZQW9753hbJDbGodY0KleOpznHBN8yloEIldEbiae6IwlbYqRhZhVpxVy3lBo2BXkYhXkPvLIW46+e/v/2zgQ4ruO881+/e04AMxgcg/skQIAAeMukbisKLVuSValy4rJ3k6qsy+vyxhuvY8VyKrGdXSeOvfF61xs7ZcUbp7y2E29sx5EP2ZIcypIpyTookZRIiuIBkABJ3Mcc7+ze6n7vDQbgDIgBQRJH/1ivhhjMYGbevP66+zv+X87Q0+anBDm1FfHPRLXgE3RlT1f7kndBCAlJA3bIGkSQSGWVv1tbHvuy7Bdc5Dn95hNAbk7/wI1MoW6yxWY7sgJH7HqfOZfVa28NdORdM+Rt8aKS7JQHw0MWwUQT3EI0xSuXFnJ902nGFSa0bHUyWZE4wiSDvIkG5WWp8Zjs9aPUC5d/EwtBPIN1Hi/ZlAq7lkmaUBUqE2i15YxtwpxtsYMi2Xh+OUlLMVVNpYKZWRmJhGAH+ZVqJL/5wTpSQ10v8L3ttcPPoYvfIJeWp1MHf000JtUFywhtcHLZyCzYDUpZzxKAN7ipIk55KIzLtCAap/30aRzRywjkQ57DWfsQr6EjLdFWJNVsTNR8p0wJHKU1JKqoLnj/gmU74B9UqMG0bFozfLw+lnghIIhkcT4A4qmZHM7axveDOA5EJO1yoqziC6ogXQyJCgRFOXdQpIiiLfgsTHwiIB1rqKz68rGRc39r2maYts6mf1XkqwAOZ+3jBe9oJK8yGI5qiirTDti03sfBCyNIgixLkH9Q4YpwKASdNXUTZYKsgempvXF9EA5n3UAsB4KiBHXxytMNscQcVZGeNrOsya1/UCS82GlCMEvyaY5XT9WXVUwO63NV1HuIvUiAwJ2AHM6axRObArAsKA+EL25paP7junj1WZs1k7kyf0QwmFhj/mGzRpcRJB/ZUlP/Z0FFSdkOXiBwwwc/h7NGofKUtNOTjSEeCGc66ppejkhBTNutUc2P/IMi0H5sC45AkElVlwVC2a6G5p+UKYFZYtk5A8ATgDicNYxX2KcSARrDFYHKYNShyst0crechQfkKwItRhEV2h7LigfDkbOZaTeXHHgdKIezlmHOf5su/4NjWxINf+Nk9PSQMV30HUuDE5cL/oJm/ymSPNlelfzeialLv63bToBI83LhXKqJw1ljeL45yzKhpir5cndj61+VKSFHQsVl/iVJlAr+glqSkBIwO+ub/3viwpvbh+am+kEKFHwsh8O5+bgVnoT1naiPJcTmqqRDuzcHxeITtRSJRIr+kjal6GhoOt90vMoYGhsDFCCABVdAhM/+HM7awF+N0/Z1gmVDIhjBbYnkCTrvp0y9oPffR9JkrfgvkQj1mpZpL68aeUU8BWnaLFNcnhgFh8O5Mfhdj6mup2ja0FZXf7C9tuEvpzIpyNrmku9BiqHiBkBgdcNgdycbP5McfKPxZHpqB8hq0cdzOJybA+sJgAkoDkBHInmqJZG8qIIIptcEtOgYt4kNxQ6L2EAbh7TU1r3aXlV3Atk2AHb4V8zhrCFY5R9xu1VXBaKHeiob/jEKAXAAg0h7VhY5KNKEOVf0k/iJP2XBCLRX1T8RPnt8fxqTpk3XJIDDWcMwqTSarGfb0F5f93RrVfKgq/Z99awdIaAoUOzQvPtDSIUt9Q3f76hOPiUaDvMycjicmw8T86FLABuDggG2NbVlKivioBMr13C22AGs2f0yWoHr4EBTon62N9lsnDh7DrAkApaFXNURh8O5idDOvxigtix2tqO6/iUFiTBnZpY1NiV7GRIqtItIRAjCQHXzi4ci5b816GSqHD8RiJcFcDg3DVaXY1oQxAh2d/Z8pSVe+7hG3ffi8pz1kpinCLQUWCLQkaj/1kDrlvbzJ1/5pGNjkGQpr1UFzvUQ4lmCHM61g+BKDej8DsBs7sYAgoMhoYRn+xvajkflMNUCAlm8+sqeImVMY1kP1C0TRFE0e+tbXnv27HHQ7SwggcqFXbkI4IOfw7l2CjXmWTyyHMeGEJLIQH3rX7dFq5/WsQEyEgAvUzpeSllLJwr40DeiyQq0Vdcf7Eo2PTo9dPIDpu3QdEGvgciVFoeuBAia7yXHzQKHszz8wb9UBS71/jumDXGt3NrW1P7zikAohYFA+irJP/lIibKKZT9YpC3EkDS6t6P7x28Mnv7AmGUAUr1aggK+ALTIinEDwOEsn6XGDbvPoWW/CHckkv8nWZ54cyabAVW+UvZrKSRcwoNpTrEkSdBb3fTKlljtP8+Mn3vIdGyRiGLhNykIIJBiXd85HE4xlpr5CUv7RQC6ATVK0NjV2f1ofaJmMmNkYc7SS5poJd3QS/oSDMuAmBo6v6+r94snXhh56JKpgxQoXiXIZ30OZ2UUGzsshI8xKDa226qqntre2HlOlVaWoi8FlNKfGJQ12NPR88a/nXrtucnRwf3EwQiEK+3VYumwos1GORzOsmGSf4YOdcHI0b3tWz9dr8UnEaveLVzavxRSRA6W+BQCCoiQDFbO7Oro+Yuh2YmvX9bTtUIw4Hoei5QK++EMLivG4VwDLPkOA9g2dNTVp3e0dR2bdxaWPr1KBl5eHkA+NsJsQO/u2HroxNCZ0+On36glGgEisKZEuUfyfAAOZ3VhjnXdgiotCntauy42R6oMi5isbd9KvG3SZGZqRW9QEATaVXh2oKb58ydGLtRdNPUWCMiAWGIAH/gcTinkmpoKXifORWOZ/UgVfx0CsuFAT239s23VdY8IxKaefNbXcyUjTpJXuCunb1hwMOlrav3RqyNnP3L5/MkWwhqL+KE/7vvncEqmiOQ+7cXBwnuWA8lg+eE9jZ2fKQ+GT89QJzxL/FnZeJNghTM1fTnDsaEiGCE7mzq+cWryUstFPdWGNZltBVhT0by/zff+HE5xrlqSQ/v1OBgkC0N/W+uh3obWJyVBgkkje01nVWClvSs6XAECmna4rbHtWwPJlhdUCwNyPEtU4APxbEAOZyUgIBiDaGFIRiveHGhqfzKoaqDTOh5PDsy9LfGgBoCuOFZ2uPsU2nIoHorCra1bf9xanhhFpsXeLPcBcDirA91OU7GPsI3gltaub3Y3NP2LihDIhEbkABRA3m1pB7AtQAmZgIVwaNdgA6AtXv3tgca2mnNvTH521rE1EAo3HOFwOFfHdwrSrQFxbJBsBzoqktN9tc2/lgSRpeUTx7nmJbXkLCEZvFwsxwGbYLoVePTU5OX2w5fPfchCDu064Fov/oVzOCXhpvvSJTrt9GtDXAqk79g68MGeRP3PsY3BgtXR5pSm7eWVAy+N6/Criyfmbm3vffri2OiHhs0sYFqTzEc/h1MyxCurJ4YFmoNId2PT/+ita/4B7fGfNU0vx+baz6tUESjeGKRUaFrxrvr2JwabLnz2Z2eOfHzWshRBUQqXCnI4nCWhg1wwLGiMxFN39+76rhrQrJHszKqOJimirF67LxqrrIyWT966tf8fXh8bevjk3Dhg2npMFHKNC64X+XumjUyh+go3dux+8OuWfUlgVWacTY1/cXoXq/9dFvq+6H3YMKFSCRn7mru/0FtVf4JW4yJpdceQhFdR5596EyQiQGcieeHWLdv+dvLI839w2cgCCgYLWi2eKrwSilaHXz+KR3Y5JULyDCnymnle8W16Lb4lm2T7G5q+trt1y+clTCxFUiCASi/4WQpJsJfuHFIqNBVYEYXsvvbej41OjmtPnXn9Aykar5RX941vVtyLZ2GClbsKcH+4LgbVexG+kbtWrpTRXvx95dZyKR064zWn7ugZ+HwyFjeyjgU67fKzyqtoyVnl64VWBGLbgRotat3TtfNPzk2ON786Nfx2GrdgsmF5r1fqxbrUMn+jL/0XslAtjniXzXzXxuswVLkA9LWDlreKwoYFlYIM93T2/3RLsmkkk0mzlQJeJcdfPpK9CmHAfHKliYRAc3Vy7O09Ox+ePpz9+lBmZgcEBNcfgPmltGL8JCw0H14VvCvrxpxV/t2tFLavXypJjp5a2wHVdmB/Z9+X7ura8ae1WhxmWf/O66OmserrcuTNRSZ2IONY0Nfa8epkevb5H7z8qx2zpgOYdhdG3l6oxI+0eJbffBoD3sAveAG557WUJWLuklqmaCMq8n/OMs/3Ip+X///czG45IOkmdFXV//DO3p1/XRYKW7Q2MKyWqtmxfFbVCejDLB0hkLKyEFKDcKB3z3+9PD1Z+9TpYw9ZkkA9D96H5pdR6XiWUxByBpAqL/sGkJS6rYL5kV3MdPg69G7NucAcEdcxoLNpyEUB6P9pb3/Dhlo59Pg7B9722f7azgsWmDBNSpPsKxUppIVX/Y/6jilBVoGmLdZqZZfeObDvkbOTl2OnpsbucIIqCFLpc7a/WfGfmT/zYyh9RbEuoTVYIgKsKpAv5YILTOT5Y3Q59xXzIOQbAFp17lADjrgFWC3oqcSGDVGQ4Z5tu/6pp7njRRsIWMTxynyv31UtBdXVSwRaTMTf1gDA1mTryQd23vrpbz79+Jcu6Xo/hLSSP1ehS07I2woQWE6nw3UM7QEnicwb/PLZE5ApT7ESUSCO2yEW5dYBTDaKzdbeGUK5ivH5x8wH95G3sPCVHND8mfWFJpAIjiTCONLhcmoKkCq7WzJuB64J5rg1bQg4ALtaO7//jv5bfhZVwkCTfeUbsLFF58nqhgELvgirUhJhnKTgR88ffNc/H/7V5yYEu1vU1JJkzJbaqi5eHWxEmLcfYwiABHFRg4goubnidDvlS8bkpFiIFxVYfJ+QO5f+U3IybiT/eW7MkZkD4jakciQEOsIwbWQhjW2wqRAsXwmUDPK+EzZp2RjUrA0DifqfvO/OAx/YVd02EgQRXJGv67uejSERpBuxZKavYXpz9P6evseHZieaD7519H9lDRMkTS2oHlQoS2qp97oZFIeZ4qJAVwAEho0UCNjJTeB0OkaYjmbMludsyBKRRWPozxi5A1sgrgHAC/4uYYf7PAQicWXdiEDm+8+BwJ7D1hUKze4UvTpyxI1AyRCm608Nq6UbpC0cP/RA/9s+sbO6bYSe3wzYOYN9vblh2Tn0OsqaOlgE2/cO7P2Rruu/fWjwzVttyWFOQUSu9PKjEoYIWRKmAAAU1ElEQVT0ZnEnsrFOx6cigMMGMwb/5CH6MxLducU3CgQBoQMbYfeiAwHyFgu5WzbXewPZLvQ8z3Cw3QJaKP7KKe0LxJiAgAmIugX1cujiu7bv/eM9XT1H6RmlVX4rlfdaCaucWVwY5M0xNDRo2TZ0x5Ln1J13fHB8dvZ7x+dGuzDVDljkvS41QrCZ5Mb8UKtrMMXcnf4pI3n3uUt8b0+P5u/OJaXk8gfyzG3+85CwwLk6b6SvzGrjXEn+ShZ7ORv0HDqmBRVYhN/oHHhxX3f/rzLYZPcrSLqhxlWSbkg8x32NWiUKjhiGiBSAvfVdbwztGv9Q9sVn/+bc7MRWqihMVhAZ2MwUG3/LGpdk/nbJx/OJftVg55lqZVo2qKYD+7f2/eu79975+zElDKPGNAQU+Ya/JxZNvlFHWFShXAmxqkELMLytbevBe1p6PlmF1LPUE3q14iC8aO/KmYcsCgVejZIfjzZbuvXqQK9nVvTDzh/V0LMgqNuwM9n87O2dfX+oifIE22J5y7Eb+Q/YCmCVq4uWgwgC2+toogy3b+n7YcrQyx5/67XPzFhOM8jF01r5ZLQ0pXRhJpvEcbomIF4pPJX2MmzoTTQ8++7tt36kPVZ71tJ1sESJOV4JJuAg54ZK6kujK2wMci0gLyqdsQzQAhrc3bfrHy1ClKdOHv7EtGMyafFCKwG+QShOoXToQolAi39GAAUdsJyVsTh6RbyZXTAdNvjbI4lXDvTt/c9dNY2Hg4oKpm2BZRoQBBmwaYEOpXfquhak8dTMDf+q/ZlHFASwkQABRTPv7tn5zVQ6Xf3M8Mn/NmvaICqy78jOwa/RpVl8fvJn+UIGwB/8m0VM5YZDPGctxiBYNjSHYkfu67/lj3Y1d7wiCQgsx14U6yol7rU6SLJ4c3Pn6AdOmwaoqmo8uOf2x5yX4Xd+NXiiN0ssN9vspr679U3+LF8MPuhXl/yZny77BQsDGCY0hypefbB/30f2bdn2jCQKgB3sJWXd3Cv85qt00JAIwaASAi3l8SPv6Nv970w9+70XLp1pzYoEQJavsIuFHIGLl7/5uSmlXeS+e0xY92uO5dZGcCOwPIop+BSGsBRtwbShVg2fOdC18+P7O7Y9QwVzZgzD6+R7/bNwr8aa2Fb7cha2bUNnou7V9+6758Ceho4zQdOtkEJ5I76gJt6qvxsOp8CVsdwKVirnbWMQdRuaghWv3T+w74N39+1+kmr565bhTTGE9dS4mQesFQOAvJpoBiFQHo6eeqD/be/dV9txRNMdIJaTKz9lYRXvjQteGkz+h/Dnb4xWGroSNsTsz7k6vv8j/1gKpsrjNdLJLfXzJqScz4Vm+WUtqJXDx+/r3f3w7V39TwqiCLpt5nQwIN8Pc5MOWEuOdf8N0Q6oM9kUVISjv35w522/d0tz15GAjdlSCuGrL2vJqszhfPBvBlZj67OgVoXN/HTwm3TmP/zgwP6P3dk98POAJIFhme61u8YurTUVWfOLUcOyCjQnqimWOPye3bf/pzsat/xT2CQXaJMEhywdJUV8/uYUoeAMn3ehXM0g+Ek94M38/mRD/PoIuuzP6NASqjj87r63/eHtXQM/BVGCtGmyFe5a3FyuvdA6AYjKGsS0EGt6GA+GnznQt/u9d7f1fC4K0gWsW2yJtVQaLB/8nMUUWuYv3i6uFLYptWyQdAs6yhIvPTiw77/c3tn/S5rVT3NdHOY8xKuu6LsarEmtbtav0C1Bh8nMHGiaRt61c9/fy7KS+eXpNz41ntGbSEBmVYQMrk/FuQoFlaS92xWPfb+iMmuBZjnQm6j79Tv7bvnw9ubOl2j7fJMu+3P1LWtzWlrjyXXuSctaJoS1YOaBgVv+731bBj5aLQdHiG4x+XE++DnLZbFTeLnu3vylf96dbuquboJmOrA90XD4oR23vX9XU+dLkiCwPf96YF1066Cn3rAtCCmq9a6d+36ghULWT19/+QvD6ekurIpARBEIzxPmXCfyPf25XADLAdF0oBwkuK2z+2cHend/sKMyOWhjDMYqN9u5nqyfdj2EQNYyoCwUgXu6+38UV0OTPz7ywldPTF3s0xUbQFWACK6SDfcBcJaDn15Sit+IhQIdG5BuQpUQePHebbv+4a6t2x+PqeFB8Ppj4nW0Kl13/bqypgFhRYPdTR2HKiLR//jkqVcf+uWbRx/IYmsLaLIbZ+EWgLNMllsRibwSVWJZIBkm1IfLD/3Wjlv/ZHtb10Eq7pExdKaALXj9GdaLCVh3BoB+EXQ7YFkGhMKh5+7q3/1cZTBy+Iljrzx8OZUeQEENiCSy2mvk9bPzM7i4XeDkg5Yx++eUj2kYT7dA0R3oTzb98L7tt3xuV3v382nq5bfsnIFYbxfZuuzY6WcOzpk6aMEAvHv3bd+JR6ITP3rthT8/Mz2+F2sKCKqc08P147VCnow4h7PUWEXeNM4mEYzBSmehQtDeunNr/8v39+15pLum5ewUTrPZPhwMgp1ZH06/xazrlr10ZnccG4JqAA707/95LFw++pNXD/3VkYtD92ZsG1BAASQIIAheJxuvN3NpRR2czYYvmsoKdnST7fe3hOM/39G65Uu39Q4c7Klsy1LhVQc7boerddzrckP07DYdi7Ykh7vaBl5trKh8309fee5rv3jr6IGxbDaAFRlEyRMY8fdmfPBzCpC7NhBiy3rHdCBCELTFan/8nj13PlJfkzw6mU1BysmAJiob4hRumKb9tI2SARbURGLj9++57d9XJRJ7njz60kfPzU68i/oMgGnZo1wLMQ4nH+Ln6RO3U4+k2xCXg+b+zq2P3juw5y864vUjKSsDdM9PQ30bpQXVhjEAyCskSptZsBBJ3drV94uuRN3gD196ZvrlC2ffP2kY4CgycxAKdHm3aBGQ31uQK+RsLnJ+Iux26FUMBzoiiW/f0b39+/s7tz1dV1E9boLNknvWZkb/ytkwBsCHemPp3ozKLe1IdpyuuTv2R7946+jTP3nthQeGZifvd1TatFT0GlysjffMuYnQCj7slvASw4awKJE97d3/853b9n4xqAbOU5tgEBMc5KtWbCw2nAHw7TM1APSLE2T58tamtr+LKYFfPffm60OHL5z58JSZARJQ2GrA75CB8uq0uWG4sZSy4lpK57AUWFowFeWiXXoMC2TTgYZopbWvfesjt3f3PZqIVc0OTYzmHH0bdd+44QyAj2+rxzKzYNgmbG9sP94Wq3mk80zdxC8H37j11PTlfbpla6KiUnXSvAaanJvyfS1TmRgtMgLFKKTeg3LPQ+7r0VqSrAEJLXx5oKn56Ttatz3RVlX7d4FAAAh23JJfMv+8jciGNQA+VIbJdhz2JTbGq+eUUPBTsVis4ci5U//h8PCZj4ym58pN2ptQdTsTud1wCyjs+slEi5RgrrmijOOexxJO4IoGJPKan9Olvm0xqblyJE+0VTacu6Vt6ze6G1u/0lJeiTWbwAx1GovzvRA3MhveAEBeUgeNBmRMA6qj5efft+fOT/UONlx89vQbD78+OZyYMqyw4wisfBMJQi4k5A/43PZgUQgxvy05NwIrY1kzf942gT3cC9flfr/IMC+e/d0cfgeIaUGAIGiMxEd217b86e627h901zRNjWRmYE7PgiKqm+qL3BQGAPKWjfRCSNMMwlA5bG/q+FqkouKxztHh+1468+Ynz02N1aYtS3XoSoA6CgXkXXDFk4eWI73NWT1yy/gCAzz/S2F6/MTtxQeOA4LlQAADVKihdF996+ltje0f21rd8KQqCCyPxMaOd51sro3gpjEA+fjlxbpt49poxXBLeeIb3ZX1L710+sTOV4dOfXLEmG2ZwxbYMi01RqyBCfa8CosH+lJVyIWcWzzEWJylpNwLna9iRpl4qeKEau/bNqgOgRhRoLOy9pW9nb2f7K1vOR1RlLeo5PxUao515N2sbNJP7s4jAnJ7atuObZUHw4cf2LH/8M6OrpMvDJ4ceOnsyd+9lJ7dqYsI6PVBDQG5RlVHX5KKD/7iXO38sBmaLFwB5KICvi1gA59247GgTFSht7n1X29p7vrG1ljdicpQ2fGMY7KmHfTxVH1qM38dm9f05c8UTMTBgmggBFUV8WduU7Y9s7u+7ciJ0eF9z7557DeGJkbvMhUEEFAB005Kef6hxUKTCzzUiyqTS5Up3+irhcWfbznnB+WdVPZ0mtVFXKPAVgO0j0TWhApJgW2N7d/Zv6X/UHt1wxMpbJ4MqyEm623aNgi0RoQFAje3Nd7UBmAx1AiY2IIKLQjVVcmnq+OVT/fWND/2+uWh978wdLL/7MTogRTWASkySKzk2G1y6l9D+SGq/J+vhQ1tBK6xfJbJcBMAbBPApkkluY36aPz5/vamsYGa5mPVZRX/uylZOxESA/Dc+ZNQjhSQqJMv9+IcbgDy8K9FmkQ0k03DbDYDu1p6jnW0dH6iva6x8ezw4EePjQxtPzU6smM6lY7YsgCgKQBeZiGLCKxyzsh678u/ZJj0KrXZ+fbBr9DL3ecQIFRuO2tCEElTLfHqs93J5n+rLCv/ZlND8q3bqnrSb40OwvjcNAhhMdd1n7MQbgCK4GoOYCbrbEoOtMZrhhJa8KO99a1o8OLFjx8ZPvO7Z+fGtQvZ2YrZjF5BFYoFSQRREFmdCFkUpvIpFqZieNrxC1tLrx/ycyV83fz8GosrPjuLzS/eQ+VaQC0I9SFfhNO2AVs26xsRU7TRltrayz2VDd9oran7bl9Lx6UzE5ftaT0LGbCYIZf5Jb4k/OwsgXuhEtcQmAaMp2ahOlxO7tux/4u9W7d+69iFMzWnhgf3nxm7+AeX5mbis1mjwiQWEJpEIrvVhwvESpca/O4v1vUclZ8oxcJwsFCfccnQXW6WR3lbKsTCeIQmctH++jSMJ2tTleFyXB0pu9jV0PLnHXVNz7VEq0bHpifMuWyG6e/TojCe17k8uAEoAXpdWrYNaWLZWWIPx0LR4d/b95uvj8yMPfH6ubPNR8+99emh6fE908SEtG2D6SDANIogIM/ptPwBTgeHAOtjJZCfDLVAQbfA0j8/dJf/f+I16HD/g938eweDiDFoBEEUZFIVjBzcWt/89d6WtvOdNQ3D5YHI6XPpSZgzsmBYFmiynHtdzvLgBqBUiF8yboFpWXRw61XhiuPNfTXHf7Nn75kTsyPdJy6eD50cHnzg/MToeyYyGXBEAlhw2KVJHYduSNEXKCFXzPy5PHbPo4jyZsW1pmRUSi9G5KXj+s/zvfcs45IQkLzEHUQHPgFQEIJktBLaq+u/sq2x7bHequZzmUz6xJQ+C7IkuR2lHQcUxDXhVwo3AKWC8lKEkRs5EAkCTVYhHAicnFLMk4qkQm9l/fOTc9OPT2cylceHB+tOXx7+wGR2LmiIAI4iApFl1xCwl58XLXUHlNcBGfmhRJKnTrn2TsdSw4/kPdCP4YO3qsFeLJ610japzr4NUVmFqkhsbEuy8ctbkg1j0UAoFQuW/QyF1bGacBWMOCOQnTOYAbZFh3vzrxFuAFYB6iOgDqesZEFG18Ghe1YCp6vKY6d76luhp7pJmcrOvTaSmRoYnB4jJ0eHb784M709rZtsIIiSCEgUXKMiCDmBigUucL8sbQ2ubws68z3/nQDuMh/5+wS6p6eVdg5mTj06e1doYUjGY8+2x6ueTUZjakcs+ZwsSv8vWV0F43OzoOs6WKYBaZIFixV28UX+asENwHXATS5ywDYtSOlZ0BTVbKuI/X1XtBtGZyZg/8Tk289cuvD7l2ZnQik9K4+mpoPj6dl9KSMrm3RwiIg5EZkzkXU9Qrlqo/yBtuQwIFc+bvEgLfT8K0Jv+Q8m87ek2B/If6LtALIdNsNTpR0JCRCQFIgoaiYejT5TUxY3YuGwVR2Jpeviia+WxyueT2WyUKWWw+TcNEymZ5kKD5Pg2igaXGsMbgCuJ57Xm2kSGjrItghBUYHWutanqoORp3TLprNbaDo9WzmZnvvQyMzkXVPZlDBtZYVxI1M5axuNKdMAk3q1kWcEBOQqHXtpzL7KcX7N4vxmYeGQ9zcZxQwCLJrNF/xN4o5+1wXh/g1WWksPggFjN6OSZtrRP0AHuyYIUCZpUBbUIKoE3qgMRC7WhspCtdHyxypC0a9GwtFZJCEnqgQhLCuQFhGkIAOz2TTz5BeNlnBWDW4AbgCeL58NFAvbrOyUNjylY2XOyKbbaxrSZdHon42kpqNp2wjOZdPy5Mx031hq5uHL05OJOT2LdctRdGzhtGVUmo4Voc4vC2NwaJjSH+6E5LYPWPCMg3cLOXuE5idyP9xGXE++L4viD3K2XPccdci7pUt6ESFmgKjvg+otiEgERRImQ4FgRhVEIouiGVQ0uyIYgtryuFRdHp+qjVV+WBWkY6ogatXB8Mzk7KxzYWYKBFp+TQQ2v9ui5PoFNuZlsCbhBuAmwRKNMGZebNOxaX66mbXM8WkrC2FJhXe09Z9GonAwZRvBjGkK0+l0dGJu2p7Ts/em9exfTszNKBOpGZKxTESTlQzHQpbjIFrc4iBADm2TiBAyiE0sjAXaKYmJXiKS65GAke9WQGyb4Quluo49BKogYZlaEEJ3JQIRCBAZBNBEGTRRIiFJISE1IMQi0YtloeAjsXD5ibJgiJSFItNlgVBGFUUiC6KgiXJWFITpUSMDc2Y2Q9u70Xx8WoKr5IKdnJsBNwA3GYT8Wdedu2lo0URupaIsSlOaQKZovVqIGgorCE3liVMAcNAgjhIOh8WUqYtZy5R121R0ywwYjq04CATdNgOGZSpzhp7JWsbv2LZ9v+0NOoy9Jbu3mWc5CqI7EEVRAkWRQRXlbwcV9V/CqhZWJUUPaoFMQFF15GBqBJygpOghSTU1WUbYtmZCinrywtQEMyqaokBAUUH2jApdPViWxYwOfRXsfVY+8G8+3ACsMfzwos085QgMbDNNQ5MlFtmg2xa2HeeorCpQE6+ClJkF3TZZS2p269hsOZ8ysjCVmYMdde3QGkm8mMHWd2xsOwTTnToRWCQTvN0DcyO4aY+CICBZlFBQkA+9NTc6NJiagFgwAtFQGAKqBsSy2dI/KCkQEBVQJBHGJ8dAlRXmobfB8bQWLMCCABLbLsxXXq56sQSHw+FwVgAA/H9uGNAcZjDwgAAAAABJRU5ErkJggg=='
  })));
};

var _excluded$e = ["width", "height", "fill"];
var Copy = function Copy(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 20 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 20 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#979797' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$e);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 330 330',
    xmlSpace: 'preserve',
    xmlns: 'http://www.w3.org/2000/svg',
    fill: fill
  }, rest), React.createElement("g", null, React.createElement("path", {
    d: 'M35,270h45v45c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V75c0-8.284-6.716-15-15-15h-45V15\n     c0-8.284-6.716-15-15-15H35c-8.284,0-15,6.716-15,15v240C20,263.284,26.716,270,35,270z M280,300H110V90h170V300z M50,30h170v30H95\n     c-8.284,0-15,6.716-15,15v165H50V30z'
  }), React.createElement("path", {
    d: 'M155,120c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15s-6.716-15-15-15H155z'
  }), React.createElement("path", {
    d: 'M235,180h-80c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15S243.284,180,235,180z'
  }), React.createElement("path", {
    d: 'M235,240h-80c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h80c8.284,0,15-6.716,15-15C250,246.716,243.284,240,235,240z\n     '
  })));
};

var _excluded$f = ["width", "height"];
var Bank = function Bank(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 32 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 32 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$f);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 256 256',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("defs", null), React.createElement("g", {
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
  }, React.createElement("path", {
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

var _excluded$g = ["width", "height"];
var BNB = function BNB(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 59 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 58 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$g);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: "0 0 59 58",
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("defs", null, React.createElement("clipPath", {
    id: "clip-path"
  }, React.createElement("rect", {
    id: "Rectangle_23",
    "data-name": "Rectangle 23",
    width: "59",
    height: "58",
    transform: "translate(3362.627 192.855)",
    fill: "#f0b90b"
  }))), React.createElement("g", {
    id: "bnb",
    transform: "translate(-3602 -272)"
  }, React.createElement("g", {
    id: "bnb-2",
    "data-name": "bnb",
    transform: "translate(239.373 79.145)",
    clipPath: "url(#clip-path)"
  }, React.createElement("g", {
    id: "chain-smart-h",
    transform: "translate(3362.962 192.954)"
  }, React.createElement("path", {
    id: "Path_87",
    "data-name": "Path 87",
    d: "M81.839,29.014H71.154V6.54H81.609c4.605,0,7.415,2.3,7.415,5.8v.046a5.171,5.171,0,0,1-2.947,4.836c2.579,1.013,4.191,2.487,4.191,5.527V22.8C90.267,26.988,86.951,29.014,81.839,29.014ZM84.1,13.172c0-1.474-1.151-2.3-3.224-2.3H75.99v4.744h4.559c2.165,0,3.546-.691,3.546-2.395ZM85.339,22.2c0-1.52-1.105-2.441-3.638-2.441H75.99v4.928h5.895c2.165,0,3.5-.783,3.5-2.441V22.2ZM95.7,29.014V6.54h4.928V29.014Zm27.31,0L112.143,14.737V29.014h-4.882V6.54h4.559L122.367,20.4V6.54h4.882V29.014Zm26.435,0-2.072-5.02h-9.487l-2.072,5.02h-5.02L140.42,6.356h4.559l9.625,22.659Zm-6.816-16.672-2.994,7.277h5.987Zm31.363,16.672L163.125,14.737V29.014h-4.882V6.54H162.8L173.349,20.4V6.54h4.882V29.014Zm20.494.414a11.328,11.328,0,0,1-11.514-11.56v-.046A11.42,11.42,0,0,1,194.719,6.217a11.626,11.626,0,0,1,8.842,3.454L200.43,13.31a8.357,8.357,0,0,0-5.757-2.533c-3.776,0-6.54,3.132-6.54,7v.046c0,3.869,2.671,7.046,6.54,7.046,2.579,0,4.145-1.013,5.895-2.625l3.132,3.178A11.5,11.5,0,0,1,194.488,29.429Zm13.218-.414V6.54h16.948v4.421h-12.02V15.52h10.593v4.421H212.634v4.744h12.2v4.421H207.706ZM6.54,22.475,0,29.014l6.54,6.54,6.54-6.54Zm22.475-9.349L40.252,24.363l6.54-6.54L29.014,0,11.237,17.777l6.54,6.54Zm22.475,9.349-6.54,6.54,6.54,6.54,6.54-6.54ZM29.014,44.949,17.777,33.712l-6.54,6.54L29.014,58.029,46.791,40.252l-6.54-6.54Zm0-9.4,6.54-6.54-6.54-6.54-6.54,6.54Z",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_88",
    "data-name": "Path 88",
    d: "M154.609,82.187c0-1.039.928-1.857,2.52-1.857a7.028,7.028,0,0,1,4.2,1.592l1.459-2.056a8.577,8.577,0,0,0-5.615-1.945c-3.073,0-5.283,1.813-5.283,4.51,0,2.874,1.857,3.846,5.151,4.642,2.874.663,3.493,1.26,3.493,2.387,0,1.194-1.061,1.967-2.741,1.967a7.126,7.126,0,0,1-4.885-2.012l-1.636,1.945a9.532,9.532,0,0,0,6.455,2.476c3.25,0,5.527-1.724,5.527-4.642,0-2.586-1.7-3.758-4.974-4.554C155.316,83.933,154.609,83.4,154.609,82.187Z",
    transform: "translate(-81.604 -42.034)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_89",
    "data-name": "Path 89",
    d: "M195.76,82.777v11.1h2.719V78.4h-2.9l-4.709,7.317L186.166,78.4h-2.9V93.874h2.675V82.821l4.841,7.251h.088Z",
    transform: "translate(-98.866 -42.293)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_90",
    "data-name": "Path 90",
    d: "M230.431,78.16h-2.52L221.1,93.745h2.785l1.592-3.736H232.8l1.57,3.736h2.874ZM231.8,87.6h-5.328l2.653-6.19Z",
    transform: "translate(-119.274 -42.164)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_91",
    "data-name": "Path 91",
    d: "M274.074,93.874,269.9,88.016a4.634,4.634,0,0,0,3.692-4.709c0-3.029-2.189-4.908-5.748-4.908h-6.9V93.874h2.719V88.481h3.4l3.8,5.394Zm-3.25-10.412c0,1.592-1.238,2.609-3.183,2.609h-3.979V80.876h3.957C269.631,80.876,270.824,81.76,270.824,83.463Z",
    transform: "translate(-140.767 -42.293)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_92",
    "data-name": "Path 92",
    d: "M299.779,80.92h4.908V78.4H292.13v2.52h4.908V93.874h2.741Z",
    transform: "translate(-157.591 -42.293)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_93",
    "data-name": "Path 93",
    d: "M350.786,91.088l-1.746-1.769a6.066,6.066,0,0,1-4.443,2.012,5.52,5.52,0,0,1,0-11.009,6.154,6.154,0,0,1,4.333,1.923l1.746-2.012a8.066,8.066,0,0,0-6.057-2.41,8,8,0,0,0-.111,16A7.984,7.984,0,0,0,350.786,91.088Z",
    transform: "translate(-181.601 -41.983)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_94",
    "data-name": "Path 94",
    d: "M382.706,87.353v6.521h2.719V78.4h-2.719v6.433h-7.383V78.4H372.6V93.874h2.719V87.353Z",
    transform: "translate(-201.002 -42.293)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_95",
    "data-name": "Path 95",
    d: "M414.561,78.16h-2.52l-6.809,15.585h2.785l1.592-3.736h7.317l1.57,3.736h2.874Zm1.371,9.439H410.6l2.653-6.19Z",
    transform: "translate(-218.604 -42.164)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_96",
    "data-name": "Path 96",
    d: "M445.41,78.4V93.874h2.719V78.4Z",
    transform: "translate(-240.278 -42.293)",
    fill: "#f0b90b"
  }), React.createElement("path", {
    id: "Path_97",
    "data-name": "Path 97",
    d: "M470.158,89.1l-8.29-10.7h-2.52V93.874h2.675V82.866l8.533,11.009h2.277V78.4h-2.675Z",
    transform: "translate(-247.797 -42.293)",
    fill: "#f0b90b"
  })))));
};

var _excluded$h = ["width", "height"];
var KEUR = function KEUR(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 32 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 32 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$h);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 32 32',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("g", {
    fill: 'none',
    fillRule: 'evenodd'
  }, React.createElement("circle", {
    cx: '16',
    cy: '16',
    fill: '#0f8ff8',
    r: '16'
  }), React.createElement("path", {
    d: 'M8 19.004L8.81 17h.857a16.279 16.279 0 01-.034-1.03c0-.448.019-.864.056-1.25H8l.81-2.003h1.274C11.27 8.906 13.944 7 18.103 7c1.367 0 2.666.177 3.897.532v2.524a8.92 8.92 0 00-3.683-.776c-2.493 0-4.096 1.146-4.81 3.438h7.423l-.81 2.003h-7.097a6.938 6.938 0 00-.056.995c0 .479.015.907.045 1.285h6.183l-.8 2.003H13.44c.533 1.389 1.183 2.355 1.949 2.9.765.544 1.858.816 3.277.816 1.014 0 2.125-.247 3.334-.741v2.373c-1.149.432-2.515.648-4.1.648-4.167 0-6.803-1.999-7.906-5.996z',
    fill: '#ffffff'
  })));
};

var _excluded$i = ["width", "height"];
var Celo = function Celo(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 37 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 37 : _ref$height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$i);
  return React.createElement("svg", Object.assign({
    width: width,
    height: height,
    viewBox: '0 0 610 610',
    xmlns: 'http://www.w3.org/2000/svg'
  }, rest), React.createElement("circle", {
    cx: '305',
    cy: '305',
    r: '305',
    fill: '#FF060A'
  }), React.createElement("path", {
    d: 'M505.4 214.7c-17.3-12.1-35.8-25-53.9-37.8-.4-.3-.8-.6-1.3-.9-2-1.5-4.3-3.1-7.1-4l-.2-.1c-48.4-11.7-97.6-23.7-145.2-35.3-43.2-10.5-86.3-21-129.5-31.5-1.1-.3-2.2-.6-3.4-.9-3.9-1.1-8.4-2.3-13.2-1.7-1.4.2-2.6.7-3.7 1.4l-1.2 1c-1.9 1.8-2.9 4.1-3.4 5.4l-.3.8v4.6l.2.7c27.3 76.5 55.3 154.1 82.3 229.2 20.8 57.8 42.4 117.7 63.5 176.5 1.3 4 5 6.6 9.6 7h1c4.3 0 8.1-2.1 10-5.5l79.2-115.5c19.3-28.1 38.6-56.3 57.9-84.4 7.9-11.5 15.8-23.1 23.7-34.6 13-19 26.4-38.6 39.7-57.7l.7-1v-1.2c.3-3.5.4-10.7-5.4-14.5m-92.8 42.1c-18.6 9.7-37.6 19.7-56.7 29.6 11.1-11.9 22.3-23.9 33.4-35.8 13.9-15 28.4-30.5 42.6-45.7l.3-.3c1.2-1.6 2.7-3.1 4.3-4.7 1.1-1.1 2.3-2.2 3.4-3.5 7.4 5.1 14.9 10.3 22.1 15.4 5.2 3.7 10.5 7.4 15.9 11.1-22 11.2-44 22.7-65.3 33.9m-47.8-4.8c-14.3 15.5-29.1 31.4-43.8 47.1-28.5-34.6-57.6-69.7-85.8-103.6-12.8-15.4-25.7-30.9-38.5-46.3l-.1-.1c-2.9-3.3-5.7-6.9-8.5-10.3-1.8-2.3-3.7-4.5-5.6-6.8 11.6 3 23.3 5.8 34.8 8.5 10.1 2.4 20.6 4.9 30.9 7.5 58 14.1 116.1 28.2 174.1 42.3-19.3 20.6-38.7 41.5-57.5 61.7m-50.3 194.9c1.1-10.5 2.3-21.3 3.3-31.9.9-8.5 1.8-17.2 2.7-25.5 1.4-13.3 2.9-27.1 4.1-40.6l.3-2.4c1-8.6 2-17.5 2.6-26.4 1.1-.6 2.3-1.2 3.6-1.7 1.5-.7 3-1.3 4.5-2.2 23.1-12.1 46.2-24.2 69.4-36.2 23.1-12 46.8-24.4 70.3-36.7-21.4 31-42.9 62.3-63.7 92.8-17.9 26.1-36.3 53-54.6 79.5-7.2 10.6-14.7 21.4-21.8 31.8-8 11.6-16.2 23.5-24.2 35.4 1-12 2.2-24.1 3.5-35.9M175.1 155.6c-1.3-3.6-2.7-7.3-3.9-10.8 27 32.6 54.2 65.4 80.7 97.2 13.7 16.5 27.4 32.9 41.1 49.5 2.7 3.1 5.4 6.4 8 9.6 3.4 4.1 6.8 8.4 10.5 12.5-1.2 10.3-2.2 20.7-3.3 30.7-.7 7-1.4 14-2.2 21.1v.1c-.3 4.5-.9 9-1.4 13.4-.7 6.1-2.3 19.9-2.3 19.9l-.1.7c-1.8 20.2-4 40.6-6.1 60.4-.9 8.2-1.7 16.6-2.6 25-.5-1.5-1.1-3-1.6-4.4-1.5-4-3-8.2-4.4-12.3l-10.7-29.7C242.9 344.2 209 250 175.1 155.6',
    fill: '#ffffff'
  }));
};

var ETHEREUM_KEUR_ADDRESS = '0xAFc823fcbe5945f5f38f144314663c87dA713E06';
var POLYGON_KEUR_ADDRESS = '0x7D4325eE3A80778Af01498ca32E0C30e233ffB0d';
var TRON_USDK_OWNER_ADDRESS = 'TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU';

var _CHAIN_NAMES_TO_IDS, _CHAIN_NAMES_TO_STRIN, _CHAIN_STRING_TO_NAME, _CHAIN_NAMES_TO_EXPLO, _CHAIN_NAMES_TO_GECKO, _CHAIN_IDS_TO_NAMES;
var ChainName;
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
})(ChainName || (ChainName = {}));
var SupportedChainId;
(function (SupportedChainId) {
  SupportedChainId[SupportedChainId["ETHEREUM"] = 11155111] = "ETHEREUM";
  SupportedChainId[SupportedChainId["POLYGON"] = 80002] = "POLYGON";
  SupportedChainId[SupportedChainId["AVALANCHE"] = 43113] = "AVALANCHE";
  SupportedChainId[SupportedChainId["BSC"] = 97] = "BSC";
  SupportedChainId[SupportedChainId["ARBITRUM"] = 421614] = "ARBITRUM";
  SupportedChainId[SupportedChainId["OPTIMISM"] = 11155420] = "OPTIMISM";
  SupportedChainId[SupportedChainId["POLYGON_ZKEM"] = 2442] = "POLYGON_ZKEM";
})(SupportedChainId || (SupportedChainId = {}));
var CHAIN_NAMES_TO_IDS = (_CHAIN_NAMES_TO_IDS = {}, _CHAIN_NAMES_TO_IDS[ChainName.ETHEREUM] = SupportedChainId.ETHEREUM, _CHAIN_NAMES_TO_IDS[ChainName.POLYGON] = SupportedChainId.POLYGON, _CHAIN_NAMES_TO_IDS[ChainName.AVALANCHE] = SupportedChainId.AVALANCHE, _CHAIN_NAMES_TO_IDS[ChainName.BSC] = SupportedChainId.BSC, _CHAIN_NAMES_TO_IDS[ChainName.OPTIMISM] = SupportedChainId.OPTIMISM, _CHAIN_NAMES_TO_IDS[ChainName.ARBITRUM] = SupportedChainId.ARBITRUM, _CHAIN_NAMES_TO_IDS[ChainName.POLYGON_ZKEVM] = SupportedChainId.POLYGON_ZKEM, _CHAIN_NAMES_TO_IDS);
var CHAIN_NAMES_TO_STRING = (_CHAIN_NAMES_TO_STRIN = {}, _CHAIN_NAMES_TO_STRIN[ChainName.ETHEREUM] = 'Ethereum', _CHAIN_NAMES_TO_STRIN[ChainName.POLYGON] = 'Polygon', _CHAIN_NAMES_TO_STRIN[ChainName.AVALANCHE] = 'Avalanche', _CHAIN_NAMES_TO_STRIN[ChainName.SOLANA] = 'Solana', _CHAIN_NAMES_TO_STRIN[ChainName.BSC] = 'BNB Smart Chain', _CHAIN_NAMES_TO_STRIN[ChainName.OPTIMISM] = 'Optimism', _CHAIN_NAMES_TO_STRIN[ChainName.ARBITRUM] = 'Arbitrum', _CHAIN_NAMES_TO_STRIN[ChainName.POLYGON_ZKEVM] = 'Polygon zkEVM', _CHAIN_NAMES_TO_STRIN[ChainName.TRON] = 'Tron', _CHAIN_NAMES_TO_STRIN[ChainName.FIAT] = 'Pay with FIAT', _CHAIN_NAMES_TO_STRIN);
var CHAIN_STRING_TO_NAME = (_CHAIN_STRING_TO_NAME = {}, _CHAIN_STRING_TO_NAME['Ethereum'] = ChainName.ETHEREUM, _CHAIN_STRING_TO_NAME['Polygon'] = ChainName.POLYGON, _CHAIN_STRING_TO_NAME['Avalanche'] = ChainName.AVALANCHE, _CHAIN_STRING_TO_NAME['Solana'] = ChainName.SOLANA, _CHAIN_STRING_TO_NAME['Binance'] = ChainName.BSC, _CHAIN_STRING_TO_NAME['Optimism'] = ChainName.OPTIMISM, _CHAIN_STRING_TO_NAME['Arbitrum'] = ChainName.ARBITRUM, _CHAIN_STRING_TO_NAME['Polygon zkEVM'] = ChainName.POLYGON_ZKEVM, _CHAIN_STRING_TO_NAME['Tron'] = ChainName.TRON, _CHAIN_STRING_TO_NAME['Pay with FIAT'] = ChainName.FIAT, _CHAIN_STRING_TO_NAME);
var CHAIN_NAMES_TO_EXPLORER = (_CHAIN_NAMES_TO_EXPLO = {}, _CHAIN_NAMES_TO_EXPLO[ChainName.ETHEREUM] = 'sepolia.etherscan.io', _CHAIN_NAMES_TO_EXPLO[ChainName.POLYGON] = 'www.oklink.com/amoy', _CHAIN_NAMES_TO_EXPLO[ChainName.AVALANCHE] = 'testnet.snowtrace.io', _CHAIN_NAMES_TO_EXPLO[ChainName.SOLANA] = 'solscan.io', _CHAIN_NAMES_TO_EXPLO[ChainName.BSC] = 'testnet.bscscan.com', _CHAIN_NAMES_TO_EXPLO[ChainName.OPTIMISM] = 'sepolia-optimism.etherscan.io', _CHAIN_NAMES_TO_EXPLO[ChainName.ARBITRUM] = 'sepolia.arbiscan.io', _CHAIN_NAMES_TO_EXPLO[ChainName.POLYGON_ZKEVM] = 'cardona-zkevm.polygonscan.com', _CHAIN_NAMES_TO_EXPLO[ChainName.TRON] = 'nile.tronscan.org/#', _CHAIN_NAMES_TO_EXPLO);
var CHAIN_NAMES_TO_GECKO_ID = (_CHAIN_NAMES_TO_GECKO = {}, _CHAIN_NAMES_TO_GECKO[ChainName.ETHEREUM] = 'ethereum', _CHAIN_NAMES_TO_GECKO[ChainName.POLYGON] = 'matic-network', _CHAIN_NAMES_TO_GECKO[ChainName.AVALANCHE] = 'avalanche-2', _CHAIN_NAMES_TO_GECKO[ChainName.SOLANA] = 'solana', _CHAIN_NAMES_TO_GECKO[ChainName.BSC] = 'binancecoin', _CHAIN_NAMES_TO_GECKO[ChainName.OPTIMISM] = 'ethereum', _CHAIN_NAMES_TO_GECKO[ChainName.ARBITRUM] = 'ethereum', _CHAIN_NAMES_TO_GECKO[ChainName.POLYGON_ZKEVM] = 'matic-network', _CHAIN_NAMES_TO_GECKO[ChainName.TRON] = 'tron', _CHAIN_NAMES_TO_GECKO);
var CHAIN_IDS_TO_NAMES = (_CHAIN_IDS_TO_NAMES = {}, _CHAIN_IDS_TO_NAMES[SupportedChainId.ETHEREUM] = ChainName.ETHEREUM, _CHAIN_IDS_TO_NAMES[SupportedChainId.POLYGON] = ChainName.POLYGON, _CHAIN_IDS_TO_NAMES[SupportedChainId.AVALANCHE] = ChainName.AVALANCHE, _CHAIN_IDS_TO_NAMES[SupportedChainId.BSC] = ChainName.BSC, _CHAIN_IDS_TO_NAMES[SupportedChainId.OPTIMISM] = ChainName.OPTIMISM, _CHAIN_IDS_TO_NAMES[SupportedChainId.ARBITRUM] = ChainName.ARBITRUM, _CHAIN_IDS_TO_NAMES[SupportedChainId.POLYGON_ZKEM] = ChainName.POLYGON_ZKEVM, _CHAIN_IDS_TO_NAMES);
var networkOptions = [{
  id: ChainName.ARBITRUM,
  label: 'Arbitrum',
  icon: Arbitrum
}, {
  id: ChainName.AVALANCHE,
  label: 'Avalanche',
  icon: Avalanche
}, {
  id: ChainName.BSC,
  label: 'Binance',
  icon: BNB
}, {
  id: ChainName.ETHEREUM,
  label: 'Ethereum',
  icon: Ethereum
}, {
  id: ChainName.FIAT,
  label: 'Pay with FIAT',
  icon: Bank
}, {
  id: ChainName.OPTIMISM,
  label: 'Optimism',
  icon: Optimism
}, {
  id: ChainName.POLYGON,
  label: 'Polygon',
  icon: Ethereum$1
}, {
  id: ChainName.POLYGON_ZKEVM,
  label: 'Polygon zkEVM',
  icon: Ethereum$1
}, {
  id: ChainName.SOLANA,
  label: 'Solana',
  icon: Solana
}, {
  id: ChainName.TRON,
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
var SOLANA_HOST = clusterApiUrl(CLUSTER);
var isEVMChain = function isEVMChain(chainId) {
  return chainId === ChainName.ETHEREUM || chainId === ChainName.POLYGON || chainId === ChainName.AVALANCHE || chainId === ChainName.BSC || chainId === ChainName.OPTIMISM || chainId === ChainName.ARBITRUM || chainId === ChainName.POLYGON_ZKEVM;
};
var COIN_LIST = {
  USDK: {
    symbol: 'USDK',
    icon: USDT
  },
  KEUR: {
    symbol: 'KEUR',
    icon: KEUR,
    address: {
      ETH: ETHEREUM_KEUR_ADDRESS,
      POL: POLYGON_KEUR_ADDRESS
    }
  }
};
var TransactionStatus;
(function (TransactionStatus) {
  TransactionStatus["AVAILABLE"] = "Available";
  TransactionStatus["CONFIRMED"] = "Confirmed";
  TransactionStatus["PAID"] = "Paid";
  TransactionStatus["COMPLETED"] = "Completed";
  TransactionStatus["FAILEDTOPAY"] = "FailedToPay";
  TransactionStatus["FAILEDTOPULL"] = "FailedToPull";
  TransactionStatus["UNAVAILABLE"] = "UnAvailable";
  TransactionStatus["KEYSIGNED"] = "KeySigned";
})(TransactionStatus || (TransactionStatus = {}));

var FontSizeOptions;
(function (FontSizeOptions) {
  FontSizeOptions["large"] = "large";
  FontSizeOptions["medium"] = "medium";
  FontSizeOptions["small"] = "small";
})(FontSizeOptions || (FontSizeOptions = {}));
var ModeOptions;
(function (ModeOptions) {
  ModeOptions["payment"] = "payment";
  ModeOptions["bridge"] = "bridge";
  ModeOptions["status"] = "status";
})(ModeOptions || (ModeOptions = {}));
var CurrencyOptions;
(function (CurrencyOptions) {
  CurrencyOptions["USDK"] = "USDK";
  CurrencyOptions["G$"] = "GDOLLAR";
})(CurrencyOptions || (CurrencyOptions = {}));
var ColorModeOptions;
(function (ColorModeOptions) {
  ColorModeOptions["light"] = "light";
  ColorModeOptions["dark"] = "dark";
})(ColorModeOptions || (ColorModeOptions = {}));
var DAppOptions;
(function (DAppOptions) {
  DAppOptions["None"] = "none";
  DAppOptions["LPAdd"] = "LPAdd";
  DAppOptions["LPDrain"] = "LPDrain";
})(DAppOptions || (DAppOptions = {}));

var createSlice = createSlice$1;
var initialState = {
  theme: {},
  tokenOptions: {},
  kimaExplorerUrl: 'explorer.kima.finance',
  mode: ModeOptions.bridge,
  sourceChain: '',
  targetChain: '',
  targetAddressHandle: '',
  targetAddress: '',
  solanaConnectModal: false,
  tronConnectModal: false,
  helpPopup: false,
  hashPopup: false,
  bankPopup: false,
  walletAutoConnect: true,
  provider: undefined,
  dAppOption: DAppOptions.None,
  solanaProvider: undefined,
  submitted: false,
  amount: 0,
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
  selectedToken: 'USDK',
  avilableTokenList: ['USDK'],
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
  isTestnet: true,
  isFioAllowed: true
};
var optionSlice = createSlice({
  name: 'option',
  initialState: initialState,
  reducers: {
    initialize: function initialize(state) {
      state.submitted = false;
      state.txId = -1;
      state.serviceFee = -1;
      state.amount = 0;
      state.targetAddressHandle = '';
      state.targetAddress = '';
      state.compliantOption = true;
      state.sourceCompliant = 'low';
      state.targetCompliant = 'low';
      state.useFIAT = false;
      state.tokenOptions = {}, state.bankDetails = {
        iban: '',
        recipient: ''
      };
      state.initChainFromProvider = false;
      state.targetNetworkFetching = false;
      state.signature = '';
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
    setTargetAddressHandle: function setTargetAddressHandle(state, action) {
      state.targetAddressHandle = action.payload;
    },
    setTargetAddress: function setTargetAddress(state, action) {
      state.targetAddress = action.payload;
    },
    setSolanaConnectModal: function setSolanaConnectModal(state, action) {
      state.solanaConnectModal = action.payload;
    },
    setTronConnectModal: function setTronConnectModal(state, action) {
      state.tronConnectModal = action.payload;
    },
    setHelpPopup: function setHelpPopup(state, action) {
      state.helpPopup = action.payload;
    },
    setHashPopup: function setHashPopup(state, action) {
      state.hashPopup = action.payload;
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
    setTxId: function setTxId(state, action) {
      state.txId = action.payload;
    },
    setSelectedToken: function setSelectedToken(state, action) {
      state.selectedToken = action.payload;
    },
    setAvailableTokenList: function setAvailableTokenList(state, action) {
      state.avilableTokenList = action.payload;
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
    setIsTestnet: function setIsTestnet(state, action) {
      state.isTestnet = action.payload;
    },
    setIsFioAllowed: function setIsFioAllowed(state, action) {
      state.isFioAllowed = action.payload;
    }
  }
});
var _optionSlice$actions = optionSlice.actions,
  initialize = _optionSlice$actions.initialize,
  setTokenOptions = _optionSlice$actions.setTokenOptions,
  setKimaExplorer = _optionSlice$actions.setKimaExplorer,
  setTheme = _optionSlice$actions.setTheme,
  setSourceChain = _optionSlice$actions.setSourceChain,
  setTargetChain = _optionSlice$actions.setTargetChain,
  setTargetAddressHandle = _optionSlice$actions.setTargetAddressHandle,
  setTargetAddress = _optionSlice$actions.setTargetAddress,
  setSolanaConnectModal = _optionSlice$actions.setSolanaConnectModal,
  setTronConnectModal = _optionSlice$actions.setTronConnectModal,
  setHelpPopup = _optionSlice$actions.setHelpPopup,
  setHashPopup = _optionSlice$actions.setHashPopup,
  setBankPopup = _optionSlice$actions.setBankPopup,
  setSolanaProvider = _optionSlice$actions.setSolanaProvider,
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
  setBackendUrl = _optionSlice$actions.setBackendUrl,
  setNodeProviderQuery = _optionSlice$actions.setNodeProviderQuery,
  setTxId = _optionSlice$actions.setTxId,
  setSelectedToken = _optionSlice$actions.setSelectedToken,
  setAvailableTokenList = _optionSlice$actions.setAvailableTokenList,
  setCompliantOption = _optionSlice$actions.setCompliantOption,
  setSourceCompliant = _optionSlice$actions.setSourceCompliant,
  setTargetCompliant = _optionSlice$actions.setTargetCompliant,
  setUseFIAT = _optionSlice$actions.setUseFIAT,
  setBankDetails = _optionSlice$actions.setBankDetails,
  setTargetChainFetching = _optionSlice$actions.setTargetChainFetching,
  setSignature = _optionSlice$actions.setSignature,
  setUuid = _optionSlice$actions.setUuid,
  setKYCStatus = _optionSlice$actions.setKYCStatus,
  setIsTestnet = _optionSlice$actions.setIsTestnet,
  setIsFioAllowed = _optionSlice$actions.setIsFioAllowed;
var optionReducer = optionSlice.reducer;

var configureStore = configureStore$1;
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
var selectTargetAddressHandle = function selectTargetAddressHandle(state) {
  return state.option.targetAddressHandle;
};
var selectTargetAddress = function selectTargetAddress(state) {
  return state.option.targetAddress;
};
var selectSolanaConnectModal = function selectSolanaConnectModal(state) {
  return state.option.solanaConnectModal;
};
var selectTronConnectModal = function selectTronConnectModal(state) {
  return state.option.tronConnectModal;
};
var selectHelpPopup = function selectHelpPopup(state) {
  return state.option.helpPopup;
};
var selectHashPopup = function selectHashPopup(state) {
  return state.option.hashPopup;
};
var selectBankPopup = function selectBankPopup(state) {
  return state.option.bankPopup;
};
var selectSolanaProvider = function selectSolanaProvider(state) {
  return state.option.solanaProvider;
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
var selectFeeDeduct = function selectFeeDeduct(state) {
  return state.option.feeDeduct;
};
var selectBackendUrl = function selectBackendUrl(state) {
  return state.option.backendUrl;
};
var selectNodeProviderQuery = function selectNodeProviderQuery(state) {
  return state.option.nodeProviderQuery;
};
var selectTxId = function selectTxId(state) {
  return state.option.txId;
};
var selectSelectedToken = function selectSelectedToken(state) {
  return state.option.selectedToken;
};
var selectAvailableTokenList = function selectAvailableTokenList(state) {
  return state.option.avilableTokenList;
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
var selectUseFIAT = function selectUseFIAT(state) {
  return state.option.useFIAT;
};
var selectBankDetails = function selectBankDetails(state) {
  return state.option.bankDetails;
};
var selectTargetChainFetching = function selectTargetChainFetching(state) {
  return state.option.targetNetworkFetching;
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
var selectIsTestnet = function selectIsTestnet(state) {
  return state.option.isTestnet;
};
var selectIsFioAllowed = function selectIsFioAllowed(state) {
  return state.option.isFioAllowed;
};

var Loading180Ring = function Loading180Ring(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 24 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 24 : _ref$height,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'white' : _ref$fill;
  return React.createElement("svg", {
    width: width,
    height: height,
    fill: fill,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg'
  }, React.createElement("path", {
    d: 'M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z'
  }, React.createElement("animateTransform", {
    attributeName: 'transform',
    type: 'rotate',
    dur: '0.75s',
    values: '0 12 12;360 12 12',
    repeatCount: 'indefinite'
  })));
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
  var theme = useSelector(selectTheme);
  return React.createElement("div", {
    className: 'kima-progressbar'
  }, React.createElement("div", {
    className: 'value',
    style: {
      width: "calc(" + step * 100 / 4 + "% + " + (step > 0 && step < 3 ? 0.5 : 0) + "em)"
    }
  }), React.createElement("div", {
    className: 'step-indicators'
  }, stepInfo.map(function (item, index) {
    return React.createElement("div", {
      key: item.title,
      className: "step " + (step >= index ? 'active' : ''),
      onClick: function onClick() {
        if (index < 4) setFocus(index);
      }
    }, React.createElement("div", {
      className: 'step-info'
    }, index === loadingStep ? React.createElement(Loading180Ring, {
      fill: theme.colorMode === 'dark' ? 'white' : '#5aa0db'
    }) : step >= index ? index === errorStep ? React.createElement(Warning, {
      "data-tooltip-id": 'error-tooltip'
    }) : React.createElement(Check, null) : null, React.createElement("span", null, item.title)));
  })));
};

var ExternalLink = function ExternalLink(_ref) {
  var to = _ref.to,
    children = _ref.children,
    className = _ref.className,
    rest = _ref.rest;
  return React.createElement("a", Object.assign({
    className: className,
    href: to,
    target: '_blank',
    rel: 'noreferrer noopener'
  }, rest), children);
};

var NetworkLabel = function NetworkLabel(_ref) {
  var sourceChain = _ref.sourceChain,
    targetChain = _ref.targetChain,
    hasError = _ref.hasError;
  var theme = useSelector(selectTheme);
  var SourceInfo = getNetworkOption(sourceChain);
  var TargetInfo = getNetworkOption(targetChain);
  return React.createElement("div", {
    className: 'kima-card-network-label'
  }, React.createElement("div", {
    className: 'label'
  }, React.createElement("div", {
    className: 'icon-wrapper'
  }, SourceInfo && React.createElement(SourceInfo.icon, null)), SourceInfo === null || SourceInfo === void 0 ? void 0 : SourceInfo.label), React.createElement(ArrowRight, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }), React.createElement("div", {
    className: 'label'
  }, React.createElement("div", {
    className: 'icon-wrapper'
  }, TargetInfo && React.createElement(TargetInfo.icon, null)), TargetInfo === null || TargetInfo === void 0 ? void 0 : TargetInfo.label), hasError && React.createElement("div", {
    className: 'warning-container',
    "data-tooltip-id": 'error-tooltip'
  }, React.createElement(Warning, null), React.createElement("span", null, "1 issue")));
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
  return React.createElement("button", {
    className: "primary-button " + className,
    onClick: clickHandler,
    ref: ref,
    disabled: disabled
  }, isLoading && React.createElement("div", {
    className: 'loading-indicator'
  }, React.createElement(Loading180Ring, {
    width: 24,
    height: 24,
    fill: 'white'
  })), children);
};

var SecondaryButton = function SecondaryButton(_ref) {
  var className = _ref.className,
    clickHandler = _ref.clickHandler,
    children = _ref.children,
    theme = _ref.theme,
    style = _ref.style,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  return React.createElement("button", Object.assign({
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
  var dispatch = useDispatch();
  var useFIAT = useSelector(selectUseFIAT);
  var nodeProviderQuery = useSelector(selectNodeProviderQuery);
  var _useState = useState(networkOptions),
    options = _useState[0],
    setOptions = _useState[1];
  useEffect(function () {
    if (!nodeProviderQuery) return;
    (function () {
      try {
        var _temp = _catch(function () {
          return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/chain")).then(function (networks) {
            setOptions(networkOptions.filter(function (network) {
              return networks.Chain.findIndex(function (chain) {
                return chain.symbol === network.id && !chain.disabled;
              }) >= 0 || network.id === ChainName.FIAT && useFIAT;
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
        });
        return _temp && _temp.then ? _temp.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery]);
  return useMemo(function () {
    return {
      options: options
    };
  }, [options]);
}

var Network = function Network(_ref) {
  var _ref$isOriginChain = _ref.isOriginChain,
    isOriginChain = _ref$isOriginChain === void 0 ? true : _ref$isOriginChain;
  var sourceChangeRef = useRef(false);
  var theme = useSelector(selectTheme);
  var mode = useSelector(selectMode);
  var dAppOption = useSelector(selectDappOption);
  var originNetwork = useSelector(selectSourceChain);
  var targetNetwork = useSelector(selectTargetChain);
  var nodeProviderQuery = useSelector(selectNodeProviderQuery);
  var dispatch = useDispatch();
  var sliderRef = useRef();
  var _useState = useState([]),
    availableNetworks = _useState[0],
    setAvailableNetworks = _useState[1];
  var _useNetworkOptions = useNetworkOptions(),
    networkOptions = _useNetworkOptions.options;
  var selectedNetwork = useMemo(function () {
    var index = networkOptions.findIndex(function (option) {
      return option.id === (isOriginChain ? originNetwork : targetNetwork);
    });
    if (index >= 0) return networkOptions[index];
    return networkOptions[3];
  }, [originNetwork, targetNetwork, networkOptions]);
  var networks = useMemo(function () {
    if (isOriginChain && mode === ModeOptions.bridge) {
      return networkOptions;
    }
    return networkOptions.filter(function (network) {
      return availableNetworks.findIndex(function (id) {
        return id === network.id;
      }) >= 0;
    });
  }, [networkOptions, isOriginChain, availableNetworks, dAppOption]);
  useEffect(function () {
    if (!nodeProviderQuery || mode !== ModeOptions.bridge) return;
    (function () {
      try {
        var _temp = _catch(function () {
          return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_available_chains/" + originNetwork)).then(function (networks) {
            setAvailableNetworks(networks.Chains);
            if (isOriginChain && !targetNetwork) {
              dispatch(setTargetChain(networks.Chains[0]));
            }
            if (sourceChangeRef.current) {
              sourceChangeRef.current = false;
              dispatch(setTargetChain(networks.Chains[0]));
            }
          });
        }, function (e) {
          console.log('rpc disconnected', e);
        });
        return _temp && _temp.then ? _temp.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery, originNetwork, targetNetwork, mode, isOriginChain]);
  useEffect(function () {
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
  var slideLeft = function slideLeft() {
    var temp = 0;
    var timerId = setInterval(function () {
      sliderRef.current.scrollLeft -= 10;
      if (temp++ === 20) clearInterval(timerId);
    }, 10);
  };
  var slideRight = function slideRight() {
    var temp = 0;
    var timerId = setInterval(function () {
      sliderRef.current.scrollLeft += 10;
      if (temp++ === 20) clearInterval(timerId);
    }, 10);
  };
  return React.createElement("div", {
    className: "network-select"
  }, React.createElement("p", null, isOriginChain ? 'Which network are you funding from?' : 'Which network are you funding to?'), React.createElement("div", {
    className: 'scroll-button'
  }, React.createElement(Arrow, {
    fill: theme.colorMode === 'light' ? 'black' : 'white',
    onClick: slideLeft
  }), React.createElement(Arrow, {
    fill: theme.colorMode === 'light' ? 'black' : 'white',
    onClick: slideRight
  })), React.createElement("div", {
    className: 'slide-area hide-scrollbar',
    ref: sliderRef
  }, React.createElement("div", {
    className: 'network-container'
  }, networks.map(function (network) {
    return React.createElement("div", {
      className: "card-item " + theme.colorMode + " " + (network.id === selectedNetwork.id ? 'active' : ''),
      key: network.id,
      onClick: function onClick() {
        if (isOriginChain) {
          dispatch(setSourceChain(network.id));
          sourceChangeRef.current = true;
        } else {
          dispatch(setTargetChain(network.id));
          dispatch(setServiceFee(-1));
        }
      }
    }, React.createElement(network.icon, null), React.createElement("span", null, network.label));
  }))));
};

var SolanaWalletSelect = function SolanaWalletSelect() {
  var theme = useSelector(selectTheme);
  var selectedProvider = useSelector(selectSolanaProvider);
  var sliderRef = useRef();
  var dispatch = useDispatch();
  var _useWallet = useWallet(),
    wallets = _useWallet.wallets;
  var _useMemo = useMemo(function () {
      var detected = [];
      var undetected = [];
      for (var _iterator = _createForOfIteratorHelperLoose(wallets), _step; !(_step = _iterator()).done;) {
        var wallet = _step.value;
        if (wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable) {
          detected.push(wallet);
        } else if (wallet.readyState === WalletReadyState.NotDetected) {
          undetected.push(wallet);
        }
      }
      return [detected, undetected];
    }, [wallets]),
    detected = _useMemo[0],
    undetected = _useMemo[1];
  useEffect(function () {
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
  var slideLeft = function slideLeft() {
    var temp = 0;
    var timerId = setInterval(function () {
      sliderRef.current.scrollLeft -= 10;
      if (temp++ === 20) clearInterval(timerId);
    }, 10);
  };
  var slideRight = function slideRight() {
    var temp = 0;
    var timerId = setInterval(function () {
      sliderRef.current.scrollLeft += 10;
      if (temp++ === 20) clearInterval(timerId);
    }, 10);
  };
  return React.createElement("div", {
    className: "wallet-select"
  }, React.createElement("p", null, "Please select:"), React.createElement("div", {
    className: 'scroll-button'
  }, React.createElement(Arrow, {
    fill: theme.colorMode === 'light' ? 'black' : 'white',
    onClick: slideLeft
  }), React.createElement(Arrow, {
    fill: theme.colorMode === 'light' ? 'black' : 'white',
    onClick: slideRight
  })), React.createElement("div", {
    className: 'slide-area hide-scrollbar',
    ref: sliderRef
  }, React.createElement("div", {
    className: 'wallet-container'
  }, detected.map(function (wallet, index) {
    return React.createElement("div", {
      className: "card-item " + theme.colorMode + " " + (wallet.adapter.name === selectedProvider ? 'active' : ''),
      onClick: function onClick() {
        return dispatch(setSolanaProvider(wallet.adapter.name));
      },
      key: wallet.adapter.name + "-" + index
    }, React.createElement("img", {
      src: wallet.adapter.icon,
      alt: wallet.adapter.name
    }), React.createElement("span", null, wallet.adapter.name));
  }), undetected.map(function (wallet, index) {
    return React.createElement(ExternalLink, {
      to: wallet.adapter.url,
      className: "card-item " + theme.colorMode,
      key: wallet.adapter.name + "-" + index
    }, React.createElement("img", {
      src: wallet.adapter.icon,
      alt: wallet.adapter.name
    }), React.createElement("span", null, "Install", React.createElement("br", null), wallet.adapter.name));
  }))));
};

var WalletSelect = function WalletSelect() {
  var theme = useSelector(selectTheme);
  var selectedProvider = useSelector(selectSolanaProvider);
  var sliderRef = useRef();
  var dispatch = useDispatch();
  var _useWallet = useWallet$1(),
    wallets = _useWallet.wallets;
  var _useMemo = useMemo(function () {
      var detected = [];
      var undetected = [];
      for (var _iterator = _createForOfIteratorHelperLoose(wallets), _step; !(_step = _iterator()).done;) {
        var wallet = _step.value;
        if (wallet.state === AdapterState.Connected || wallet.state === AdapterState.Disconnect || wallet.state === AdapterState.Loading) {
          detected.push(wallet);
        } else if (wallet.state === AdapterState.NotFound) {
          undetected.push(wallet);
        }
      }
      return [detected, undetected];
    }, [wallets]),
    detected = _useMemo[0],
    undetected = _useMemo[1];
  useEffect(function () {
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
  var slideLeft = function slideLeft() {
    var temp = 0;
    var timerId = setInterval(function () {
      sliderRef.current.scrollLeft -= 10;
      if (temp++ === 20) clearInterval(timerId);
    }, 10);
  };
  var slideRight = function slideRight() {
    var temp = 0;
    var timerId = setInterval(function () {
      sliderRef.current.scrollLeft += 10;
      if (temp++ === 20) clearInterval(timerId);
    }, 10);
  };
  return React.createElement("div", {
    className: "wallet-select"
  }, React.createElement("p", null, "Please select:"), React.createElement("div", {
    className: 'scroll-button'
  }, React.createElement(Arrow, {
    fill: theme.colorMode === 'light' ? 'black' : 'white',
    onClick: slideLeft
  }), React.createElement(Arrow, {
    fill: theme.colorMode === 'light' ? 'black' : 'white',
    onClick: slideRight
  })), React.createElement("div", {
    className: 'slide-area hide-scrollbar',
    ref: sliderRef
  }, React.createElement("div", {
    className: 'wallet-container'
  }, detected.map(function (wallet, index) {
    return React.createElement("div", {
      className: "card-item " + theme.colorMode + " " + (wallet.adapter.name === selectedProvider ? 'active' : ''),
      onClick: function onClick() {
        return dispatch(setSolanaProvider(wallet.adapter.name));
      },
      key: wallet.adapter.name + "-" + index
    }, React.createElement("img", {
      src: wallet.adapter.icon,
      alt: wallet.adapter.name
    }), React.createElement("span", null, wallet.adapter.name));
  }), undetected.map(function (wallet, index) {
    return React.createElement(ExternalLink, {
      to: wallet.adapter.url,
      className: "card-item " + theme.colorMode,
      key: wallet.adapter.name + "-" + index
    }, React.createElement("img", {
      src: wallet.adapter.icon,
      alt: wallet.adapter.name
    }), React.createElement("span", null, "Install", React.createElement("br", null), wallet.adapter.name));
  }))));
};

var createWalletStatus = function createWalletStatus(isReady, statusMessage, forceNetworkSwitch, walletAddress) {
  if (statusMessage === void 0) {
    statusMessage = '';
  }
  return {
    isReady: isReady,
    statusMessage: statusMessage,
    forceNetworkSwitch: forceNetworkSwitch,
    walletAddress: walletAddress
  };
};
function useIsWalletReady() {
  var dispatch = useDispatch();
  var autoSwitch = useSelector(selectWalletAutoConnect);
  var _useSolanaWallet = useWallet(),
    solanaAddress = _useSolanaWallet.publicKey;
  var _useTronWallet = useWallet$1(),
    tronAddress = _useTronWallet.address;
  var _useWeb3ModalProvider = useWeb3ModalProvider(),
    evmProvider = _useWeb3ModalProvider.walletProvider;
  var _useSwitchNetwork = useSwitchNetwork(),
    switchNetwork = _useSwitchNetwork.switchNetwork;
  var web3ModalAccountInfo = useWeb3ModalAccount();
  var _ref = web3ModalAccountInfo || {
      address: null,
      chainId: null,
      isConnected: null
    },
    evmAddress = _ref.address,
    evmChainId = _ref.chainId,
    isConnected = _ref.isConnected;
  var sourceChain = useSelector(selectSourceChain);
  var targetChain = useSelector(selectTargetChain);
  var targetNetworkFetching = useSelector(selectTargetChainFetching);
  var correctChain = useMemo(function () {
    if (sourceChain === ChainName.FIAT && !targetNetworkFetching) return targetChain;
    return sourceChain;
  }, [sourceChain, targetChain, targetNetworkFetching]);
  var hasEthInfo = isConnected && !!evmAddress;
  var errorHandler = useSelector(selectErrorHandler);
  var correctEvmNetwork = CHAIN_NAMES_TO_IDS[correctChain];
  var hasCorrectEvmNetwork = evmChainId === correctEvmNetwork;
  var events = useWeb3ModalEvents();
  useEffect(function () {
    var _events$data, _events$data2;
    if (((_events$data = events.data) === null || _events$data === void 0 ? void 0 : _events$data.event) === 'SELECT_WALLET' || ((_events$data2 = events.data) === null || _events$data2 === void 0 ? void 0 : _events$data2.event) === 'CONNECT_SUCCESS') {
      var _events$data3, _events$data3$propert;
      localStorage.setItem('wallet', (_events$data3 = events.data) === null || _events$data3 === void 0 ? void 0 : (_events$data3$propert = _events$data3.properties) === null || _events$data3$propert === void 0 ? void 0 : _events$data3$propert.name);
    }
  }, [events]);
  var forceNetworkSwitch = useCallback(function () {
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
  return useMemo(function () {
    if (correctChain === ChainName.SOLANA) {
      if (solanaAddress) {
        return createWalletStatus(true, undefined, forceNetworkSwitch, solanaAddress.toBase58());
      }
      return createWalletStatus(false, 'Wallet not connected', forceNetworkSwitch, '');
    } else if (correctChain === ChainName.TRON) {
      if (tronAddress) {
        return createWalletStatus(true, undefined, forceNetworkSwitch, tronAddress);
      }
      return createWalletStatus(false, 'Wallet not connected', forceNetworkSwitch, '');
    } else if (isEVMChain(correctChain) && hasEthInfo && evmAddress) {
      if (hasCorrectEvmNetwork) {
        return createWalletStatus(true, undefined, forceNetworkSwitch, evmAddress);
      } else {
        if (evmProvider && correctEvmNetwork) {
          if (autoSwitch) {
            forceNetworkSwitch();
          } else {
            console.log('autoSwitch', autoSwitch, evmChainId);
            dispatch(setSourceChain(CHAIN_IDS_TO_NAMES[evmChainId || SupportedChainId.ETHEREUM]));
            toast.success("Wallet connected to " + CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[evmChainId || SupportedChainId.ETHEREUM]]);
          }
        }
        if (evmChainId && autoSwitch) return createWalletStatus(false, "Wallet not connected to " + CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[correctEvmNetwork]], forceNetworkSwitch, evmAddress);
      }
    }
    return createWalletStatus(false, '', forceNetworkSwitch, undefined);
  }, [correctChain, autoSwitch, forceNetworkSwitch, solanaAddress, tronAddress, hasEthInfo, correctEvmNetwork, hasCorrectEvmNetwork, evmProvider, evmAddress, evmChainId]);
}

var getShortenedAddress = function getShortenedAddress(address) {
  var is0x = function is0x(addr) {
    return addr === null || addr === void 0 ? void 0 : addr.startsWith('0x');
  };
  return (address === null || address === void 0 ? void 0 : address.substring(0, is0x(address) ? 6 : 3)) + "..." + (address === null || address === void 0 ? void 0 : address.substr(address.length - (is0x(address) ? 4 : 3)));
};

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
    programId = TOKEN_PROGRAM_ID;
  }
  if (associatedTokenProgramId === void 0) {
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID;
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
    pubkey: SystemProgram.programId,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: programId,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: SYSVAR_RENT_PUBKEY,
    isSigner: false,
    isWritable: false
  }];
  return new TransactionInstruction({
    keys: keys,
    programId: associatedTokenProgramId,
    data: Buffer.alloc(0)
  });
}

var getAccountInfo = function getAccountInfo(connection, address, commitment, programId) {
  if (programId === void 0) {
    programId = TOKEN_PROGRAM_ID;
  }
  try {
    return Promise.resolve(connection.getAccountInfo(address, commitment)).then(function (info) {
      if (!info) throw new Error('TokenAccountNotFoundError');
      if (!info.owner.equals(programId)) throw new Error('TokenInvalidAccountOwnerError');
      if (info.data.length != AccountLayout.span) throw new Error('TokenInvalidAccountSizeError');
      var rawAccount = AccountLayout.decode(Buffer.from(info.data));
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
    programId = TOKEN_PROGRAM_ID;
  }
  if (associatedTokenProgramId === void 0) {
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID;
  }
  try {
    if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) throw new Error('TokenOwnerOffCurveError');
    return Promise.resolve(PublicKey.findProgramAddress([owner.toBuffer(), programId.toBuffer(), mint.toBuffer()], associatedTokenProgramId)).then(function (_ref) {
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
    programId = TOKEN_PROGRAM_ID;
  }
  if (associatedTokenProgramId === void 0) {
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID;
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
              var transaction = new Transaction().add(createAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, programId, associatedTokenProgramId));
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

var tronWeb = new TronWeb({
  fullHost: 'https://api.nileex.io'
});
tronWeb.setAddress(TRON_USDK_OWNER_ADDRESS);

var formatterFloat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
});
function isEmptyObject(arg) {
  return typeof arg === 'object' && Object.keys(arg).length === 0;
}

function useBalance() {
  var _useState = useState(0),
    balance = _useState[0],
    setBalance = _useState[1];
  var web3ModalAccountInfo = useWeb3ModalAccount();
  var _ref = web3ModalAccountInfo || {
      address: null,
      chainId: null,
      isConnected: null
    },
    signerAddress = _ref.address,
    evmChainId = _ref.chainId;
  var _useWeb3ModalProvider = useWeb3ModalProvider(),
    walletProvider = _useWeb3ModalProvider.walletProvider;
  var selectedNetwork = useSelector(selectSourceChain);
  var errorHandler = useSelector(selectErrorHandler);
  var sourceChain = useMemo(function () {
    if (selectedNetwork === ChainName.SOLANA || selectedNetwork === ChainName.TRON) return selectedNetwork;
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId];
    }
    return selectedNetwork;
  }, [selectedNetwork, evmChainId]);
  var _useSolanaWallet = useWallet(),
    solanaAddress = _useSolanaWallet.publicKey,
    signTransaction = _useSolanaWallet.signTransaction;
  var _useTronWallet = useWallet$1(),
    tronAddress = _useTronWallet.address;
  var _useConnection = useConnection(),
    connection = _useConnection.connection;
  var selectedCoin = useSelector(selectSelectedToken);
  var tokenOptions = useSelector(selectTokenOptions);
  var tokenAddress = useMemo(function () {
    if (isEmptyObject(tokenOptions)) return '';
    return tokenOptions[selectedCoin] ? tokenOptions[selectedCoin][sourceChain] : '';
  }, [selectedCoin, sourceChain, tokenOptions]);
  useEffect(function () {
    (function () {
      try {
        var _exit = false;
        return _catch(function () {
          function _temp4(_result3) {
            if (_exit) return _result3;
            var provider = new ethers.providers.Web3Provider(walletProvider);
            var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
            if (!tokenAddress || !signer || !signerAddress) return;
            var erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer);
            return Promise.resolve(erc20Contract.decimals()).then(function (decimals) {
              return Promise.resolve(erc20Contract.balanceOf(signerAddress)).then(function (userBalance) {
                setBalance(+formatUnits(userBalance, decimals));
              });
            });
          }
          var _temp3 = function () {
            if (!isEVMChain(sourceChain)) {
              var _temp2 = function _temp2(_result) {
                return _exit ? _result : function () {
                  if (tronAddress && tokenAddress) {
                    return Promise.resolve(tronWeb.contract(ERC20ABI.abi, tokenAddress)).then(function (trc20Contract) {
                      return Promise.resolve(trc20Contract.decimals().call()).then(function (decimals) {
                        return Promise.resolve(trc20Contract.balanceOf(tronAddress).call()).then(function (userBalance) {
                          setBalance(+formatUnits(userBalance.balance, decimals));
                          _exit = true;
                        });
                      });
                    });
                  }
                }();
              };
              var _temp = function () {
                if (solanaAddress && tokenAddress && connection) {
                  var mint = new PublicKey(tokenAddress);
                  return Promise.resolve(getOrCreateAssociatedTokenAccount(connection, solanaAddress, mint, solanaAddress, signTransaction)).then(function (fromTokenAccount) {
                    return Promise.resolve(connection.getParsedAccountInfo(fromTokenAccount.address)).then(function (accountInfo) {
                      var _accountInfo$value, _parsedAccountInfo$pa, _parsedAccountInfo$pa2, _parsedAccountInfo$pa3, _parsedAccountInfo$pa4, _parsedAccountInfo$pa5, _parsedAccountInfo$pa6;
                      var parsedAccountInfo = accountInfo === null || accountInfo === void 0 ? void 0 : (_accountInfo$value = accountInfo.value) === null || _accountInfo$value === void 0 ? void 0 : _accountInfo$value.data;
                      setBalance(+formatUnits((_parsedAccountInfo$pa = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa === void 0 ? void 0 : (_parsedAccountInfo$pa2 = _parsedAccountInfo$pa.info) === null || _parsedAccountInfo$pa2 === void 0 ? void 0 : (_parsedAccountInfo$pa3 = _parsedAccountInfo$pa2.tokenAmount) === null || _parsedAccountInfo$pa3 === void 0 ? void 0 : _parsedAccountInfo$pa3.amount, (_parsedAccountInfo$pa4 = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa4 === void 0 ? void 0 : (_parsedAccountInfo$pa5 = _parsedAccountInfo$pa4.info) === null || _parsedAccountInfo$pa5 === void 0 ? void 0 : (_parsedAccountInfo$pa6 = _parsedAccountInfo$pa5.tokenAmount) === null || _parsedAccountInfo$pa6 === void 0 ? void 0 : _parsedAccountInfo$pa6.decimals));
                      _exit = true;
                    });
                  });
                }
              }();
              return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
            }
          }();
          return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
        }, function (error) {
          errorHandler(error);
        });
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [signerAddress, tokenAddress, sourceChain, solanaAddress, tronAddress, walletProvider]);
  return useMemo(function () {
    return {
      balance: balance
    };
  }, [balance]);
}

var WalletButton = function WalletButton(_ref) {
  var _ref$errorBelow = _ref.errorBelow,
    errorBelow = _ref$errorBelow === void 0 ? false : _ref$errorBelow;
  var dispatch = useDispatch();
  var theme = useSelector(selectTheme);
  var selectedCoin = useSelector(selectSelectedToken);
  var sourceCompliant = useSelector(selectSourceCompliant);
  var compliantOption = useSelector(selectCompliantOption);
  var selectedNetwork = useSelector(selectSourceChain);
  var _useIsWalletReady = useIsWalletReady(),
    isReady = _useIsWalletReady.isReady,
    statusMessage = _useIsWalletReady.statusMessage,
    walletAddress = _useIsWalletReady.walletAddress;
  var _useBalance = useBalance(),
    balance = _useBalance.balance;
  var _useWeb3Modal = useWeb3Modal(),
    open = _useWeb3Modal.open;
  var handleClick = function handleClick() {
    if (selectedNetwork === ChainName.SOLANA) {
      dispatch(setSolanaConnectModal(true));
      return;
    }
    if (selectedNetwork === ChainName.TRON) {
      dispatch(setTronConnectModal(true));
      return;
    }
    open();
  };
  var errorMessage = useMemo(function () {
    if (!isReady) return statusMessage;
    if (sourceCompliant !== 'low' && compliantOption) return "Source address has " + sourceCompliant + " risk";
    return '';
  }, [isReady, statusMessage, sourceCompliant, compliantOption]);
  useEffect(function () {
    if (!errorMessage) return;
    toast$1.error(errorMessage);
  }, [errorMessage]);
  return React.createElement("div", {
    className: "wallet-button " + theme.colorMode + " " + (errorBelow ? 'error-below' : ''),
    "data-testid": connectWalletBtn
  }, React.createElement(PrimaryButton, {
    clickHandler: handleClick
  }, isReady ? "" + getShortenedAddress(walletAddress || '') : 'Wallet'), isReady ? React.createElement("p", {
    className: 'balance-info'
  }, formatterFloat.format(balance), " ", selectedCoin, " available") : null);
};

var CoinDropdown = function CoinDropdown() {
  var ref = useRef();
  var _useState = useState(true),
    collapsed = _useState[0],
    setCollapsed = _useState[1];
  var selectedCoin = useSelector(selectSelectedToken);
  var tokenList = useSelector(selectAvailableTokenList);
  var theme = useSelector(selectTheme);
  var Icon = COIN_LIST[selectedCoin || 'USDK'].icon;
  useEffect(function () {
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
  return React.createElement("div", {
    className: "coin-dropdown " + theme.colorMode + " " + (collapsed ? 'collapsed' : ''),
    onClick: function onClick() {
      return setCollapsed(function (prev) {
        return !prev;
      });
    },
    ref: ref
  }, React.createElement("div", {
    className: 'coin-wrapper'
  }, React.createElement(Icon, null), selectedCoin), React.createElement("div", {
    className: "coin-menu " + theme.colorMode + " " + (collapsed ? 'collapsed' : '')
  }, tokenList.map(function (token) {
    var CoinIcon = COIN_LIST[token].icon;
    return React.createElement("div", {
      className: 'coin-item',
      key: COIN_LIST[token].symbol
    }, React.createElement(CoinIcon, null), React.createElement("p", null, COIN_LIST[token].symbol));
  })));
};

var NetworkDropdown = React.memo(function (_ref) {
  var _ref$isOriginChain = _ref.isOriginChain,
    isOriginChain = _ref$isOriginChain === void 0 ? true : _ref$isOriginChain;
  var _useState = useState(true),
    collapsed = _useState[0],
    setCollapsed = _useState[1];
  var _useState2 = useState([]),
    availableNetworks = _useState2[0],
    setAvailableNetworks = _useState2[1];
  var ref = useRef();
  var sourceChangeRef = useRef(false);
  var mode = useSelector(selectMode);
  var autoSwitchChain = useSelector(selectWalletAutoConnect);
  var useFIAT = useSelector(selectUseFIAT);
  var dAppOption = useSelector(selectDappOption);
  var originNetwork = useSelector(selectSourceChain);
  var targetNetwork = useSelector(selectTargetChain);
  var nodeProviderQuery = useSelector(selectNodeProviderQuery);
  var _useNetworkOptions = useNetworkOptions(),
    networkOptions = _useNetworkOptions.options;
  var selectedNetwork = useMemo(function () {
    var index = networkOptions.findIndex(function (option) {
      return option.id === (isOriginChain ? originNetwork : targetNetwork);
    });
    if (index >= 0) return networkOptions[index];
    return networkOptions[3];
  }, [originNetwork, targetNetwork, networkOptions]);
  var networks = useMemo(function () {
    if (isOriginChain && mode === ModeOptions.bridge) {
      return networkOptions;
    }
    return networkOptions.filter(function (network) {
      return availableNetworks.findIndex(function (id) {
        return id === network.id;
      }) >= 0;
    });
  }, [networkOptions, isOriginChain, availableNetworks, dAppOption, originNetwork]);
  var theme = useSelector(selectTheme);
  var dispatch = useDispatch();
  useEffect(function () {
    if (!nodeProviderQuery || mode !== ModeOptions.bridge) return;
    (function () {
      try {
        var _temp3 = _catch(function () {
          function _temp2() {
            setAvailableNetworks(chains);
            if (isOriginChain && !targetNetwork) {
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
            if (originNetwork === ChainName.FIAT) {
              chains = [ChainName.ETHEREUM, ChainName.POLYGON];
            } else {
              return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_available_chains/" + originNetwork)).then(function (networks) {
                chains = networks.Chains;
                if (useFIAT) chains.push(ChainName.FIAT);
              });
            }
          }();
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        }, function (e) {
          console.log('rpc disconnected', e);
        });
        return _temp3 && _temp3.then ? _temp3.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery, originNetwork, targetNetwork, mode, isOriginChain, useFIAT]);
  useEffect(function () {
    if (!nodeProviderQuery || mode !== ModeOptions.payment) return;
    (function () {
      try {
        return _catch(function () {
          if (dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain) {
            setAvailableNetworks([targetNetwork]);
          } else {
            if (targetNetwork === ChainName.FIAT) {
              setAvailableNetworks([ChainName.ETHEREUM, ChainName.POLYGON]);
              return;
            }
            return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_available_chains/" + targetNetwork)).then(function (networks) {
              setAvailableNetworks(networks.Chains);
            });
          }
        }, function (e) {
          console.log('rpc disconnected', e);
        });
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery, mode, targetNetwork, dAppOption]);
  useEffect(function () {
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
  return React.createElement("div", {
    className: "network-dropdown " + theme.colorMode + " " + (collapsed ? 'collapsed' : ''),
    onClick: function onClick() {
      if (!autoSwitchChain && isOriginChain) return;
      setCollapsed(function (prev) {
        return !prev;
      });
    },
    ref: ref
  }, React.createElement("div", {
    className: 'network-wrapper'
  }, React.createElement(selectedNetwork.icon, null), React.createElement("span", null, selectedNetwork.label)), React.createElement("div", {
    className: "network-menu custom-scrollbar " + theme.colorMode + " " + (collapsed ? 'collapsed' : '')
  }, networks.map(function (network) {
    return React.createElement("div", {
      className: 'network-menu-item',
      key: network.label,
      onClick: function () {
        try {
          if (isOriginChain) {
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
    }, React.createElement(network.icon, null), React.createElement("p", null, network.label));
  })));
});

var ConfirmDetails = function ConfirmDetails(_ref) {
  var isApproved = _ref.isApproved;
  var feeDeduct = useSelector(selectFeeDeduct);
  var mode = useSelector(selectMode);
  var dAppOption = useSelector(selectDappOption);
  var theme = useSelector(selectTheme);
  var amount = useSelector(selectAmount);
  var serviceFee = useSelector(selectServiceFee);
  var originNetwork = useSelector(selectSourceChain);
  var targetNetwork = useSelector(selectTargetChain);
  var targetAddress = useSelector(selectTargetAddress);
  var bankDetails = useSelector(selectBankDetails);
  var signature = useSelector(selectSignature);
  var transactionOption = useSelector(selectTransactionOption);
  var _useIsWalletReady = useIsWalletReady(),
    walletAddress = _useIsWalletReady.walletAddress;
  var originNetworkOption = useMemo(function () {
    return networkOptions.filter(function (network) {
      return network.id === originNetwork;
    })[0];
  }, [networkOptions, originNetwork]);
  var targetNetworkOption = useMemo(function () {
    return networkOptions.filter(function (network) {
      return network.id === (mode === ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain : targetNetwork);
    })[0];
  }, [networkOptions, originNetwork]);
  var selectedCoin = useSelector(selectSelectedToken);
  var sourceWalletAddress = useMemo(function () {
    return getShortenedAddress(walletAddress || '');
  }, [walletAddress]);
  var targetWalletAddress = useMemo(function () {
    return getShortenedAddress((mode === ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress : targetAddress) || '');
  }, [mode, transactionOption, targetAddress]);
  return React.createElement("div", {
    className: "confirm-details " + theme.colorMode
  }, React.createElement("p", null, "Step ", isApproved ? '2' : '1', "\xA0of 2\xA0\xA0\xA0", isApproved ? 'Submit transaction' : originNetwork === ChainName.FIAT ? 'Bank Details' : 'Approval'), originNetwork === ChainName.FIAT ? React.createElement("div", null, React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "IBAN:"), React.createElement("p", null, "ES6621000418401234567891"), React.createElement("span", {
    className: 'kima-card-network-label'
  }, React.createElement(originNetworkOption.icon, null), "FIAT")), React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Recipient:"), React.createElement("p", null, "Kima Sandbox")), React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "BIC:"), React.createElement("p", null, "CAIXESBBXXX")), React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Description:"), React.createElement("p", {
    className: 'signature'
  }, signature))) : React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Source wallet:"), React.createElement("p", null, dAppOption === DAppOptions.LPDrain ? targetWalletAddress : sourceWalletAddress), React.createElement("span", {
    className: 'kima-card-network-label'
  }, React.createElement(originNetworkOption.icon, null), originNetworkOption.label)), React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Amount:"), React.createElement("p", null, formatterFloat.format(feeDeduct ? amount : amount + serviceFee), ' ', selectedCoin)), targetNetwork === ChainName.FIAT ? React.createElement("div", null, React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "IBAN:"), React.createElement("p", null, bankDetails.iban), React.createElement("span", {
    className: 'kima-card-network-label'
  }, React.createElement(targetNetworkOption.icon, null), "FIAT")), React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Recipient:"), React.createElement("p", null, bankDetails.recipient))) : React.createElement("div", {
    className: 'detail-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Target wallet:"), React.createElement("p", null, dAppOption === DAppOptions.LPDrain ? sourceWalletAddress : targetWalletAddress), React.createElement("span", {
    className: 'kima-card-network-label'
  }, React.createElement(targetNetworkOption.icon, null), targetNetworkOption.label)));
};

var fetchWrapper$1 = {
  get: get$1,
  post: post$1
};
function get$1(url) {
  var requestOptions = {
    method: 'GET'
  };
  requestOptions.headers = {
    'Content-Type': 'application/json'
  };
  return fetch(url, requestOptions).then(handleResponse$1);
}
function post$1(url, body) {
  var requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  };
  return fetch(url, requestOptions).then(handleResponse$1);
}
function handleResponse$1(response) {
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

var _customChainCodes;
var fioLinks = {
  testnet: 'https://test.fio.eosusa.io/v1/chain',
  mainnet: 'https://fio.blockpane.com/v1/chain',
  testnet2: 'https://testnet.fioprotocol.io/v1/',
  mainnet2: 'https://fio.eosphere.io/v1/'
};
var customChainCodes = (_customChainCodes = {}, _customChainCodes[ChainName.SOLANA] = 'solana', _customChainCodes);
var getFioLink = function getFioLink(isTestnet) {
  return isTestnet ? fioLinks.testnet : fioLinks.mainnet;
};
var getPubAddresses = function getPubAddresses(fioHandle, isTestnet) {
  try {
    var providerLink = getFioLink(isTestnet);
    var body = {
      fio_address: fioHandle
    };
    return Promise.resolve(_catch(function () {
      return Promise.resolve(fetchWrapper$1.post(providerLink + "/get_pub_addresses", JSON.stringify(body))).then(function (data) {
        return data.public_addresses.map(function (item) {
          var _item$chain_code, _item$token_code;
          return {
            chainCode: (_item$chain_code = item.chain_code) === null || _item$chain_code === void 0 ? void 0 : _item$chain_code.toLowerCase(),
            tokenCode: (_item$token_code = item.token_code) === null || _item$token_code === void 0 ? void 0 : _item$token_code.toLowerCase(),
            address: item.public_address
          };
        });
      });
    }, function (e) {
      console.error('Failed to get pub addresses by fio', e);
      return [];
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var getAddressByFio = function getAddressByFio(fioHandle, chainCode, tokenCode, isTestnet) {
  return Promise.resolve(getPubAddresses(fioHandle, isTestnet)).then(function (addresses) {
    console.log('FioLogs => getPubAddresses', {
      fioHandle: fioHandle,
      chainCode: chainCode,
      tokenCode: tokenCode
    }, addresses);
    if (addresses.length) {
      var byChain = addresses.filter(function (adr) {
        var _chainCode$trim;
        return (chainCode === null || chainCode === void 0 ? void 0 : (_chainCode$trim = chainCode.trim()) === null || _chainCode$trim === void 0 ? void 0 : _chainCode$trim.toLowerCase()) === adr.chainCode || customChainCodes[chainCode] === adr.chainCode;
      });
      if (byChain.length > 0) {
        var byToken = byChain.find(function (adr) {
          var _tokenCode$trim;
          return adr.tokenCode === (tokenCode === null || tokenCode === void 0 ? void 0 : (_tokenCode$trim = tokenCode.trim()) === null || _tokenCode$trim === void 0 ? void 0 : _tokenCode$trim.toLowerCase());
        });
        return byToken ? byToken.address : byChain[0].address;
      }
    }
    return '';
  });
};
var isValidFioHandle = function isValidFioHandle(fioHandle) {
  if (typeof fioHandle === 'string' && fioHandle.includes('@')) {
    try {
      return FIOSDK.isFioAddressValid(fioHandle);
    } catch (_) {
      return false;
    }
  }
  return false;
};

function debounce(func, delay) {
  var timer;
  return function () {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      return func.apply(_this, args);
    }, delay);
  };
}

var AddressInput = function AddressInput() {
  var dispatch = useDispatch();
  var targetNetwork = useSelector(selectTargetChain);
  var selectedCoin = useSelector(selectSelectedToken);
  var isTestnet = useSelector(selectIsTestnet);
  var isFioAllowed = useSelector(selectIsFioAllowed);
  var targetAddressHandle = useSelector(selectTargetAddressHandle);
  var updateTargetAddress = useCallback(function (newAddress) {
    try {
      var isFio = isValidFioHandle(newAddress);
      if (isFio) {
        getAddressByFio(newAddress, targetNetwork, selectedCoin, isTestnet).then(function (fioAddress) {
          dispatch(setTargetAddress(fioAddress || newAddress));
        });
      } else {
        dispatch(setTargetAddress(newAddress));
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }, [dispatch, targetNetwork, selectedCoin, isTestnet]);
  var debouncedUpdateTarget = useCallback(debounce(updateTargetAddress, 200), [updateTargetAddress]);
  useEffect(function () {
    if (isFioAllowed) {
      debouncedUpdateTarget(targetAddressHandle);
    }
  }, [debouncedUpdateTarget, targetAddressHandle]);
  var onChange = function onChange(e) {
    var newAddress = e.target.value;
    dispatch(setTargetAddressHandle(newAddress));
    if (!isFioAllowed) {
      dispatch(setTargetAddress(newAddress));
    }
  };
  return React.createElement("input", {
    className: 'kima-address-input',
    type: 'text',
    value: targetAddressHandle,
    onChange: onChange
  });
};

var CopyButton = function CopyButton(_ref) {
  var text = _ref.text;
  var _useState = useState(false),
    copyClicked = _useState[0],
    setCopyClicked = _useState[1];
  useEffect(function () {
    if (!copyClicked) return;
    setTimeout(function () {
      setCopyClicked(false);
    }, 2000);
  }, [copyClicked]);
  return React.createElement("span", {
    className: 'copy-btn',
    onClick: function onClick() {
      setCopyClicked(true);
      navigator.clipboard.writeText(text);
    }
  }, copyClicked ? React.createElement(Check, {
    fill: '#979797'
  }) : React.createElement(Copy, null));
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
  var theme = useSelector(selectTheme);
  var explorerUrl = useSelector(selectKimaExplorer);
  return React.createElement("div", {
    className: 'kima-stepbox'
  }, React.createElement("div", {
    className: 'content-wrapper'
  }, stepInfo$1.map(function (item, index) {
    return React.createElement("div", {
      key: item.title,
      className: 'step-item'
    }, React.createElement("div", {
      className: 'info-item'
    }, index === loadingStep ? React.createElement(Loading180Ring, {
      fill: theme.colorMode === 'dark' ? 'white' : '#5aa0db'
    }) : step >= index ? index === errorStep ? React.createElement(Warning, {
      "data-tooltip-id": 'error-tooltip'
    }) : React.createElement(Check, null) : null, React.createElement("p", null, item.title)), index === 0 && data !== null && data !== void 0 && data.kimaTxHash ? React.createElement("div", {
      className: 'info-item'
    }, React.createElement("p", null, "Kima TX ID:", ' ', React.createElement(ExternalLink, {
      to: "https://" + explorerUrl + "/transactions/" + (data === null || data === void 0 ? void 0 : data.kimaTxHash)
    }, getShortenedAddress((data === null || data === void 0 ? void 0 : data.kimaTxHash) || '')), React.createElement(CopyButton, {
      text: data === null || data === void 0 ? void 0 : data.kimaTxHash
    }))) : null, index === 1 && data !== null && data !== void 0 && data.tssPullHash ? React.createElement("div", {
      className: 'info-item'
    }, React.createElement("p", null, CHAIN_NAMES_TO_STRING[(data === null || data === void 0 ? void 0 : data.sourceChain) || ChainName.ETHEREUM], ' ', "TX ID:", React.createElement(ExternalLink, {
      to: "https://" + CHAIN_NAMES_TO_EXPLORER[(data === null || data === void 0 ? void 0 : data.sourceChain) || ChainName.ETHEREUM] + "/" + ((data === null || data === void 0 ? void 0 : data.sourceChain) === ChainName.TRON ? 'transaction' : 'tx') + "/" + (data === null || data === void 0 ? void 0 : data.tssPullHash) + ((data === null || data === void 0 ? void 0 : data.sourceChain) === ChainName.SOLANA ? '?cluster=devnet' : '')
    }, getShortenedAddress((data === null || data === void 0 ? void 0 : data.tssPullHash) || '')), React.createElement(CopyButton, {
      text: (data === null || data === void 0 ? void 0 : data.tssPullHash) || ''
    }))) : null, index === 3 && data !== null && data !== void 0 && data.tssReleaseHash ? React.createElement("div", {
      className: 'info-item'
    }, React.createElement("p", null, CHAIN_NAMES_TO_STRING[(data === null || data === void 0 ? void 0 : data.targetChain) || ChainName.ETHEREUM], ' ', "TX ID:", React.createElement(ExternalLink, {
      to: "https://" + CHAIN_NAMES_TO_EXPLORER[(data === null || data === void 0 ? void 0 : data.targetChain) || ChainName.ETHEREUM] + "/" + ((data === null || data === void 0 ? void 0 : data.targetChain) === ChainName.TRON ? 'transaction' : 'tx') + "/" + (data === null || data === void 0 ? void 0 : data.tssReleaseHash) + ((data === null || data === void 0 ? void 0 : data.targetChain) === ChainName.SOLANA ? '?cluster=devnet' : '')
    }, getShortenedAddress((data === null || data === void 0 ? void 0 : data.tssReleaseHash) || '')), React.createElement(CopyButton, {
      text: (data === null || data === void 0 ? void 0 : data.tssReleaseHash) || ''
    }))) : null);
  })));
};

var BankInput = function BankInput() {
  var dispatch = useDispatch();
  var theme = useSelector(selectTheme);
  var bankDetails = useSelector(selectBankDetails);
  return React.createElement("div", {
    className: 'bank-input'
  }, React.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React.createElement("span", {
    className: 'label'
  }, "IBAN:"), React.createElement("input", {
    className: 'kima-address-input',
    type: 'text',
    value: bankDetails.iban,
    onChange: function onChange(e) {
      return dispatch(setBankDetails(_extends({}, bankDetails, {
        iban: e.target.value
      })));
    }
  })), React.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React.createElement("span", {
    className: 'label'
  }, "Recipient:"), React.createElement("input", {
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

var HelpPopup = function HelpPopup() {
  var dispatch = useDispatch();
  var theme = useSelector(selectTheme);
  var helpPopup = useSelector(selectHelpPopup);
  return React.createElement("div", {
    className: "kima-modal help-popup " + theme.colorMode + " " + (helpPopup ? 'open' : '')
  }, React.createElement("div", {
    className: 'modal-overlay',
    onClick: function onClick() {
      dispatch(setHelpPopup(false));
    }
  }), React.createElement("div", {
    className: 'modal-content-container'
  }, React.createElement("div", {
    className: 'kima-card-header'
  }, React.createElement("div", {
    className: 'topbar'
  }, React.createElement("div", {
    className: 'title'
  }, React.createElement("h3", null, "Help")), React.createElement("div", {
    className: 'control-buttons'
  }, React.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      return dispatch(setHelpPopup(false));
    }
  }, React.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React.createElement("div", {
    className: 'modal-content'
  }, React.createElement("p", null, "The SDK enables dApp developers to process Kima transactions on behalf of their clients. It will include visual and API components that communicate with the Kima RPC nodes. The developers can pick and choose the right level of integration, based on their usage scenario."))));
};

var HashPopup = function HashPopup(_ref) {
  var data = _ref.data;
  var dispatch = useDispatch();
  var theme = useSelector(selectTheme);
  var hashPopup = useSelector(selectHashPopup);
  return React.createElement("div", {
    className: "kima-modal hash-popup " + theme.colorMode + " " + (hashPopup ? 'open' : '')
  }, React.createElement("div", {
    className: 'modal-overlay',
    onClick: function onClick() {
      dispatch(setHashPopup(false));
    }
  }), React.createElement("div", {
    className: 'modal-content-container'
  }, React.createElement("div", {
    className: 'kima-card-header'
  }, React.createElement("div", {
    className: 'topbar'
  }, React.createElement("div", {
    className: 'title'
  }, React.createElement("h3", null, "Transaction Hashes")), React.createElement("div", {
    className: 'control-buttons'
  }, React.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      return dispatch(setHashPopup(false));
    }
  }, React.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React.createElement("div", {
    className: 'modal-content'
  }, React.createElement("div", {
    className: 'hash-container'
  }, React.createElement("div", {
    className: 'hash-item'
  }, React.createElement("span", null, "Kima tx:"), React.createElement(ExternalLink, {
    to: 'https://explorer.kima.finance/transactions/718ABEE14755C1ACA617607F9353A55013EF855B0EA6E92EFD31A2F50A362524'
  }, "718A...2524")), React.createElement("div", {
    className: 'hash-item'
  }, React.createElement("span", null, "Source tx:"), React.createElement(ExternalLink, {
    to: "https://" + CHAIN_NAMES_TO_EXPLORER[(data === null || data === void 0 ? void 0 : data.sourceChain) || ChainName.ETHEREUM] + "/tx/" + (data === null || data === void 0 ? void 0 : data.tssPullHash)
  }, getShortenedAddress((data === null || data === void 0 ? void 0 : data.tssPullHash) || ''))), React.createElement("div", {
    className: 'hash-item'
  }, React.createElement("span", null, "Target tx:"), React.createElement(ExternalLink, {
    to: "https://" + CHAIN_NAMES_TO_EXPLORER[(data === null || data === void 0 ? void 0 : data.targetChain) || ChainName.ETHEREUM] + "/tx/" + (data === null || data === void 0 ? void 0 : data.tssReleaseHash)
  }, getShortenedAddress((data === null || data === void 0 ? void 0 : data.tssReleaseHash) || '')))))));
};

var SolanaWalletConnectModal = function SolanaWalletConnectModal() {
  var dispatch = useDispatch();
  var theme = useSelector(selectTheme);
  var connectModal = useSelector(selectSolanaConnectModal);
  var selectedProvider = useSelector(selectSolanaProvider);
  var _useWallet = useWallet(),
    select = _useWallet.select,
    connect = _useWallet.connect;
  var handleConnect = function handleConnect() {
    select(selectedProvider);
    connect();
    dispatch(setSolanaConnectModal(false));
  };
  return React.createElement("div", {
    className: "kima-modal wallet-connect " + theme.colorMode + " " + (connectModal ? 'open' : '')
  }, React.createElement("div", {
    className: 'modal-overlay'
  }), React.createElement("div", {
    className: 'modal-content-container'
  }, React.createElement("div", {
    className: 'kima-card-header'
  }, React.createElement("div", {
    className: 'topbar'
  }, React.createElement("div", {
    className: 'title'
  }, React.createElement("h3", null, "Connect Wallet")), React.createElement("div", {
    className: 'control-buttons'
  }, React.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      return dispatch(setSolanaConnectModal(false));
    }
  }, React.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React.createElement("div", {
    className: 'modal-content'
  }, React.createElement(SolanaWalletSelect, null)), React.createElement("div", {
    className: 'kima-card-footer',
    style: {
      justifyContent: 'flex-end',
      marginTop: '2em'
    }
  }, React.createElement(SecondaryButton, {
    clickHandler: function clickHandler() {
      return dispatch(setSolanaConnectModal(false));
    },
    theme: theme.colorMode
  }, "Cancel"), React.createElement(PrimaryButton, {
    clickHandler: handleConnect
  }, "Connect"))));
};

var TronWalletConnectModal = function TronWalletConnectModal() {
  var dispatch = useDispatch();
  var theme = useSelector(selectTheme);
  var connectModal = useSelector(selectTronConnectModal);
  var selectedProvider = useSelector(selectSolanaProvider);
  var _useWallet = useWallet$1(),
    select = _useWallet.select,
    connect = _useWallet.connect;
  var handleConnect = function handleConnect() {
    try {
      var _temp = _catch(function () {
        select(selectedProvider);
        return Promise.resolve(connect()).then(function () {
          dispatch(setTronConnectModal(false));
        });
      }, function (e) {
        console.log(e);
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return React.createElement("div", {
    className: "kima-modal wallet-connect " + theme.colorMode + " " + (connectModal ? 'open' : '')
  }, React.createElement("div", {
    className: 'modal-overlay'
  }), React.createElement("div", {
    className: 'modal-content-container'
  }, React.createElement("div", {
    className: 'kima-card-header'
  }, React.createElement("div", {
    className: 'topbar'
  }, React.createElement("div", {
    className: 'title'
  }, React.createElement("h3", null, "Connect Wallet")), React.createElement("div", {
    className: 'control-buttons'
  }, React.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      return dispatch(setTronConnectModal(false));
    }
  }, React.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React.createElement("div", {
    className: 'modal-content'
  }, React.createElement(WalletSelect, null)), React.createElement("div", {
    className: 'kima-card-footer',
    style: {
      justifyContent: 'flex-end',
      marginTop: '2em'
    }
  }, React.createElement(SecondaryButton, {
    clickHandler: function clickHandler() {
      return dispatch(setTronConnectModal(false));
    },
    theme: theme.colorMode
  }, "Cancel"), React.createElement(PrimaryButton, {
    clickHandler: handleConnect
  }, "Connect"))));
};

var BankPopup = function BankPopup(_ref) {
  var setVerifying = _ref.setVerifying,
    isVerifying = _ref.isVerifying;
  var dispatch = useDispatch();
  var uuid = useSelector(selectUuid);
  var theme = useSelector(selectTheme);
  var bankPopup = useSelector(selectBankPopup);
  var kimaBackendUrl = useSelector(selectBackendUrl);
  useEffect(function () {
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
            } else if (kycResult[0].status === 'approved') {
              setVerifying(false);
              dispatch(setKYCStatus('approved'));
              toast$1.success('KYC is verified');
            }
          });
        }, function () {
          console.log('failed to check kyc status');
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
  return React.createElement("div", {
    className: "kima-modal bank-popup " + theme.colorMode + " " + (bankPopup ? 'open' : '')
  }, React.createElement("div", {
    className: 'modal-overlay',
    onClick: function onClick() {
      dispatch(setBankPopup(false));
    }
  }), React.createElement("div", {
    className: 'modal-content-container'
  }, React.createElement("div", {
    className: 'kima-card-header'
  }, React.createElement("div", {
    className: 'topbar'
  }, React.createElement("div", {
    className: 'title'
  }), React.createElement("div", {
    className: 'control-buttons'
  }, React.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      return dispatch(setBankPopup(false));
    }
  }, React.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React.createElement("div", {
    className: 'modal-content'
  }, React.createElement("iframe", {
    src: "https://sandbox.depasify.com/widgets/kyc?partner=kimastage&user_uuid=" + uuid,
    width: '100%',
    height: '100%',
    frameBorder: '0',
    allow: 'camera'
  }))));
};

var TransactionWidget = function TransactionWidget(_ref) {
  var theme = _ref.theme;
  var _useState = useState(0),
    step = _useState[0],
    setStep = _useState[1];
  var _useState2 = useState(-1),
    focus = _useState2[0],
    setFocus = _useState2[1];
  var _useState3 = useState(-1),
    errorStep = _useState3[0],
    setErrorStep = _useState3[1];
  var _useState4 = useState(''),
    errorMessage = _useState4[0],
    setErrorMessage = _useState4[1];
  var _useState5 = useState(-1),
    loadingStep = _useState5[0],
    setLoadingStep = _useState5[1];
  var _useState6 = useState(false),
    minimized = _useState6[0],
    setMinimized = _useState6[1];
  var _useState7 = useState(0),
    percent = _useState7[0],
    setPercent = _useState7[1];
  var _useState8 = useState(),
    data = _useState8[0],
    setData = _useState8[1];
  var dispatch = useDispatch();
  var txId = useSelector(selectTxId);
  var dAppOption = useSelector(selectDappOption);
  var closeHandler = useSelector(selectCloseHandler);
  var successHandler = useSelector(selectSuccessHandler);
  var nodeProviderQuery = useSelector(selectNodeProviderQuery);
  useEffect(function () {
    if (!nodeProviderQuery || txId < 0) return;
    var timerId = setInterval(function () {
      try {
        return Promise.resolve(_catch(function () {
          function _temp2() {
            if (!data) return;
            if (isLP) {
              setData({
                status: data.status,
                sourceChain: data.chain,
                targetChain: data.chain,
                tssPullHash: dAppOption === DAppOptions.LPAdd ? data.tssReleaseHash : '',
                tssReleaseHash: dAppOption === DAppOptions.LPDrain ? data.tssReleaseHash : '',
                failReason: data.failReason,
                amount: +data.amount,
                symbol: data.symbol,
                kimaTxHash: data.kimaTxHash
              });
            } else {
              setData({
                status: data.status,
                sourceChain: data.originChain,
                targetChain: data.targetChain,
                tssPullHash: data.tssPullHash,
                tssReleaseHash: data.tssReleaseHash,
                failReason: data.failReason,
                amount: +data.amount,
                symbol: data.symbol,
                kimaTxHash: data.kimaTxHash
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
          }
          var data;
          var result;
          var isLP = dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain;
          var _temp = function () {
            if (isLP) {
              return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/transaction/liquidity_transaction_data/" + txId)).then(function (_fetchWrapper$get) {
                var _result2;
                result = _fetchWrapper$get;
                data = (_result2 = result) === null || _result2 === void 0 ? void 0 : _result2.LiquidityTransactionData;
              });
            } else {
              return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/transaction/transaction_data/" + txId)).then(function (_fetchWrapper$get2) {
                var _result3;
                result = _fetchWrapper$get2;
                data = (_result3 = result) === null || _result3 === void 0 ? void 0 : _result3.transactionData;
              });
            }
          }();
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        }, function (e) {
          console.log('rpc disconnected', e);
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    }, 1000);
    return function () {
      clearInterval(timerId);
    };
  }, [nodeProviderQuery, txId, dAppOption]);
  useEffect(function () {
    if (!data) {
      setStep(0);
      setLoadingStep(0);
      return;
    }
    console.log(data.status);
    setErrorStep(-1);
    var status = data.status;
    if (status === TransactionStatus.AVAILABLE) {
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
      console.error(data.failReason);
      toast$1.error('Unavailable');
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
      console.error(data.failReason);
      toast$1.error('Failed to release tokens to target!');
      setErrorMessage('Failed to release tokens to target!');
    } else if (status === TransactionStatus.FAILEDTOPULL) {
      setStep(1);
      setPercent(25);
      setErrorStep(1);
      setLoadingStep(-1);
      console.error(data.failReason);
      toast$1.error('Failed to pull tokens from source!');
      setErrorMessage('Failed to pull tokens from source!');
    } else if (status === TransactionStatus.COMPLETED) {
      setStep(4);
      setPercent(100);
      setLoadingStep(-1);
    }
  }, [data === null || data === void 0 ? void 0 : data.status]);
  return React.createElement(Provider, {
    store: store
  }, React.createElement("div", {
    className: "kima-card transaction-card " + theme.colorMode + " font-" + theme.fontSize + " " + (minimized ? 'minimized' : ''),
    style: {
      fontFamily: theme.fontFamily,
      background: theme.colorMode === ColorModeOptions.light ? theme.backgroundColorLight : theme.backgroundColorDark
    }
  }, React.createElement("div", {
    className: 'kima-card-header'
  }, React.createElement("div", {
    className: 'topbar'
  }, React.createElement("div", {
    className: 'title'
  }, React.createElement("h3", null, "Transferring ", formatterFloat.format((data === null || data === void 0 ? void 0 : data.amount) || 0), ' ', (data === null || data === void 0 ? void 0 : data.symbol) || 'USDK', "\xA0\xA0", "(" + percent + "%)")), !minimized ? React.createElement("div", {
    className: 'control-buttons'
  }, React.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      setMinimized(true);
    }
  }, React.createElement(Minimize, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  })), loadingStep < 0 ? React.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      dispatch(initialize());
      closeHandler();
    }
  }, React.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  })) : null) : React.createElement("div", {
    className: 'control-buttons'
  }, React.createElement("div", {
    className: 'maximize',
    onClick: function onClick() {
      return setMinimized(false);
    }
  }, "View"))), (data === null || data === void 0 ? void 0 : data.sourceChain) && (data === null || data === void 0 ? void 0 : data.targetChain) && React.createElement(NetworkLabel, {
    sourceChain: data === null || data === void 0 ? void 0 : data.sourceChain,
    targetChain: data === null || data === void 0 ? void 0 : data.targetChain,
    hasError: errorStep >= 0
  })), React.createElement("div", {
    className: 'kima-card-content'
  }, React.createElement(Progressbar, {
    step: step,
    focus: focus,
    errorStep: errorStep,
    setFocus: setFocus,
    loadingStep: loadingStep
  }), React.createElement(StepBox, {
    step: step,
    errorStep: errorStep,
    loadingStep: loadingStep,
    data: data
  })), React.createElement("div", {
    className: 'kima-card-footer'
  }, React.createElement(ExternalLink, {
    to: 'https://kima.finance'
  }, React.createElement(FooterLogo, {
    fill: theme.colorMode === 'light' ? 'black' : '#C5C5C5'
  }))), React.createElement(HelpPopup, null), React.createElement(HashPopup, {
    data: data
  }), React.createElement(Toaster, {
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
        color: theme.colorMode === ColorModeOptions.light ? 'black' : 'white',
        fontSize: '1em',
        borderRadius: '1em',
        border: '1px solid #66aae5',
        background: 'transparent'
      }
    }
  }), React.createElement(Tooltip, {
    id: 'error-tooltip',
    className: "error-tooltip " + theme.colorMode,
    content: errorMessage,
    style: {
      zIndex: 10000
    }
  })));
};

var SingleForm = function SingleForm(_ref) {
  var paymentTitleOption = _ref.paymentTitleOption;
  var dispatch = useDispatch();
  var mode = useSelector(selectMode);
  var theme = useSelector(selectTheme);
  var amount = useSelector(selectAmount);
  var compliantOption = useSelector(selectCompliantOption);
  var targetCompliant = useSelector(selectTargetCompliant);
  var transactionOption = useSelector(selectTransactionOption);
  var selectedCoin = useSelector(selectSelectedToken);
  var sourceNetwork = useSelector(selectSourceChain);
  var targetNetwork = useSelector(selectTargetChain);
  var isFioAllowed = useSelector(selectIsFioAllowed);
  var Icon = COIN_LIST[selectedCoin || 'USDK'].icon;
  var errorMessage = useMemo(function () {
    return compliantOption && targetCompliant !== 'low' ? "Target address has " + targetCompliant + " risk" : '';
  }, [compliantOption, targetCompliant]);
  useEffect(function () {
    if (!errorMessage) return;
    toast$1.error(errorMessage);
  }, [errorMessage]);
  return React.createElement("div", {
    className: 'single-form'
  }, mode === ModeOptions.payment ? React.createElement("p", {
    className: 'payment-title',
    style: paymentTitleOption === null || paymentTitleOption === void 0 ? void 0 : paymentTitleOption.style
  }, paymentTitleOption === null || paymentTitleOption === void 0 ? void 0 : paymentTitleOption.title) : null, React.createElement("div", {
    className: 'form-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Source Network"), React.createElement(NetworkDropdown, null)), React.createElement("div", {
    className: "dynamic-area " + (sourceNetwork === ChainName.FIAT ? 'reverse' : '')
  }, React.createElement("div", {
    className: 'form-item wallet-button-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Connect wallet:"), React.createElement(WalletButton, null)), mode === ModeOptions.bridge && React.createElement("div", {
    className: 'form-item'
  }, React.createElement("span", {
    className: 'label'
  }, "Target Network:"), React.createElement(NetworkDropdown, {
    isOriginChain: false
  }))), mode === ModeOptions.bridge && sourceNetwork !== ChainName.FIAT ? targetNetwork === ChainName.FIAT ? React.createElement(BankInput, null) : React.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React.createElement("span", {
    className: 'label'
  }, isFioAllowed ? 'Target Address (or FIO handle):' : 'Target Address:'), React.createElement(AddressInput, null)) : null, mode === ModeOptions.bridge ? React.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React.createElement("span", {
    className: 'label'
  }, "Amount:"), React.createElement("div", {
    className: 'amount-label-container'
  }, React.createElement("input", {
    type: 'number',
    value: amount || '',
    onChange: function onChange(e) {
      var _amount = +e.target.value;
      dispatch(setAmount(parseFloat(_amount.toFixed(2))));
    }
  }), React.createElement(CoinDropdown, null))) : React.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React.createElement("span", {
    className: 'label'
  }, "Amount:"), React.createElement("div", {
    className: "amount-label " + theme.colorMode
  }, React.createElement("span", null, (transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.amount) || ''), React.createElement("div", {
    className: 'coin-wrapper'
  }, React.createElement(Icon, null), selectedCoin))), isFioAllowed && React.createElement("div", {
    className: "form-item " + theme.colorMode
  }, React.createElement("div", {
    className: 'get-fio'
  }, React.createElement(ExternalLink, {
    to: 'https://app.fio.net/ref/kima',
    className: "link " + theme.colorMode
  }, "Get a Kima branded FIO handle"))));
};

var CoinSelect = function CoinSelect() {
  var dispatch = useDispatch();
  var theme = useSelector(selectTheme);
  var mode = useSelector(selectMode);
  var amount = useSelector(selectAmount);
  var selectedCoin = useSelector(selectSelectedToken);
  var Icon = COIN_LIST[selectedCoin || 'USDK'].icon;
  return React.createElement("div", {
    className: "coin-select"
  }, React.createElement("p", null, "Select Amount of Token for Funding"), React.createElement("div", {
    className: "amount-input " + theme.colorMode
  }, React.createElement("span", null, "Amount:"), React.createElement("div", {
    className: 'input-wrapper'
  }, React.createElement("input", {
    type: 'number',
    value: amount || '',
    readOnly: mode === ModeOptions.payment,
    onChange: function onChange(e) {
      var _amount = +e.target.value;
      dispatch(setAmount(parseFloat(_amount.toFixed(2))));
    }
  }), React.createElement("div", {
    className: 'coin-label'
  }, React.createElement(Icon, null), React.createElement("span", null, selectedCoin)))));
};

function useServiceFee(isConfirming) {
  if (isConfirming === void 0) {
    isConfirming = false;
  }
  var _useIsWalletReady = useIsWalletReady(),
    walletAddress = _useIsWalletReady.walletAddress,
    isReady = _useIsWalletReady.isReady;
  var dispatch = useDispatch();
  var serviceFee = useSelector(selectServiceFee);
  var mode = useSelector(selectMode);
  var amount_ = useSelector(selectAmount);
  var sourceChain = useSelector(selectSourceChain);
  var targetNetwork = useSelector(selectTargetChain);
  var targetAddress_ = useSelector(selectTargetAddress);
  var transactionOption = useSelector(selectTransactionOption);
  var nodeProviderQuery = useSelector(selectNodeProviderQuery);
  var targetChain = useMemo(function () {
    return mode === ModeOptions.payment ? (transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain) || '' : targetNetwork;
  }, [transactionOption, mode, targetNetwork]);
  var targetAddress = useMemo(function () {
    return mode === ModeOptions.payment ? (transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress) || '' : targetAddress_;
  }, [transactionOption, mode, targetAddress_]);
  var amount = useMemo(function () {
    return mode === ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.amount : amount_;
  }, [transactionOption, mode, amount_]);
  var getServiceFee = function getServiceFee() {
    try {
      if (!sourceChain || !targetChain || !isReady || !walletAddress || !targetAddress || !nodeProviderQuery || !amount) return Promise.resolve();
      var gasFee = {};
      return Promise.resolve(_catch(function () {
        if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT) {
          dispatch(setServiceFee(0));
          return;
        }
        return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/gas_fee")).then(function (gasFeeData) {
          gasFeeData.gasFee.forEach(function (data) {
            gasFee[data.chainId] = data.fee;
          });
          var fee = 0;
          dispatch(setServiceFee(parseFloat(fee.toFixed(2))));
        });
      }, function (e) {
        dispatch(setServiceFee(0));
        console.log('rpc disconnected', e);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  useEffect(function () {
    if (isConfirming) return;
    getServiceFee();
    var timerId = setInterval(function () {
      getServiceFee();
    }, 20 * 1000);
    return function () {
      clearInterval(timerId);
    };
  }, [sourceChain, targetChain, isReady, walletAddress, isConfirming, targetAddress, nodeProviderQuery, amount]);
  return useMemo(function () {
    return {
      serviceFee: serviceFee
    };
  }, [serviceFee]);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
    programId = TOKEN_PROGRAM_ID;
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
  return new TransactionInstruction({
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
  var hashHex = utils.sha256("0x" + msgHex).replace(/^0x/, "");
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

var sleep = function sleep(delay) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, delay);
  });
};
function useAllowance(_ref) {
  var setApproving = _ref.setApproving;
  var _useState = useState(0),
    allowance = _useState[0],
    setAllowance = _useState[1];
  var _useState2 = useState(null),
    decimals = _useState2[0],
    setDecimals = _useState2[1];
  var web3ModalAccountInfo = useWeb3ModalAccount();
  var _ref2 = web3ModalAccountInfo || {
      address: null,
      chainId: null,
      isConnected: null
    },
    signerAddress = _ref2.address,
    evmChainId = _ref2.chainId;
  var _useWeb3ModalProvider = useWeb3ModalProvider(),
    walletProvider = _useWeb3ModalProvider.walletProvider;
  var selectedNetwork = useSelector(selectSourceChain);
  var errorHandler = useSelector(selectErrorHandler);
  var dAppOption = useSelector(selectDappOption);
  var sourceChain = useMemo(function () {
    if (selectedNetwork === ChainName.SOLANA || selectedNetwork === ChainName.TRON) return selectedNetwork;
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId];
    }
    return selectedNetwork;
  }, [selectedNetwork, evmChainId]);
  var amount = useSelector(selectAmount);
  var serviceFee = useSelector(selectServiceFee);
  var nodeProviderQuery = useSelector(selectNodeProviderQuery);
  var _useConnection = useConnection(),
    connection = _useConnection.connection;
  var _useSolanaWallet = useWallet(),
    solanaAddress = _useSolanaWallet.publicKey,
    signSolanaTransaction = _useSolanaWallet.signTransaction;
  var _useTronWallet = useWallet$1(),
    tronAddress = _useTronWallet.address,
    signTronTransaction = _useTronWallet.signTransaction;
  var selectedCoin = useSelector(selectSelectedToken);
  var tokenOptions = useSelector(selectTokenOptions);
  var tokenAddress = useMemo(function () {
    if (isEmptyObject(tokenOptions)) return '';
    return tokenOptions[selectedCoin] ? tokenOptions[selectedCoin][sourceChain] : '';
  }, [selectedCoin, sourceChain, tokenOptions]);
  var _useState3 = useState(),
    targetAddress = _useState3[0],
    setTargetAddress = _useState3[1];
  var isApproved = useMemo(function () {
    console.log(allowance, amount, serviceFee);
    return allowance >= amount + serviceFee;
  }, [allowance, amount, serviceFee, dAppOption]);
  var updatePoolAddress = function updatePoolAddress() {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/kima/tss_pubkey")).then(function (result) {
          var _result$tssPubkey;
          if ((result === null || result === void 0 ? void 0 : (_result$tssPubkey = result.tssPubkey) === null || _result$tssPubkey === void 0 ? void 0 : _result$tssPubkey.length) < 1) {
            return;
          }
          if (sourceChain === ChainName.SOLANA && !result.tssPubkey[0].eddsa) {
            console.log('solana pool address is missing');
          }
          setTargetAddress(sourceChain === ChainName.SOLANA ? result.tssPubkey[0].eddsa : sourceChain === ChainName.TRON ? fromHex(result.tssPubkey[0].ecdsa) : result.tssPubkey[0].ecdsa);
        });
      }, function (e) {
        console.log('rpc disconnected', e);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  useEffect(function () {
    if (!nodeProviderQuery) return;
    updatePoolAddress();
  }, [nodeProviderQuery, sourceChain]);
  useEffect(function () {
    (function () {
      try {
        var _exit = false;
        return _catch(function () {
          function _temp5(_result2) {
            if (_exit) return _result2;
            var provider = new ethers.providers.Web3Provider(walletProvider);
            var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
            if (!tokenAddress || !targetAddress || !signer || !signerAddress) return;
            var erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer);
            return Promise.resolve(erc20Contract.decimals()).then(function (decimals) {
              return Promise.resolve(erc20Contract.allowance(signerAddress, targetAddress)).then(function (userAllowance) {
                setDecimals(+decimals);
                setAllowance(+formatUnits(userAllowance, decimals));
              });
            });
          }
          var _temp4 = function () {
            if (!isEVMChain(sourceChain)) {
              var _temp3 = function _temp3() {
                _exit = true;
              };
              var _temp2 = function () {
                if (solanaAddress && tokenAddress && connection) {
                  var mint = new PublicKey(tokenAddress);
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
                            setAllowance(+formatUnits(userAllowance, decimals));
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
  }, [signerAddress, tokenAddress, targetAddress, sourceChain, solanaAddress, tronAddress, walletProvider]);
  var approve = useCallback(function () {
    try {
      var _temp17 = function _temp17(_result4) {
        var _exit3 = false;
        if (_exit2) return _result4;
        function _temp15(_result5) {
          if (_exit3) return _result5;
          if (!signSolanaTransaction) return;
          var _temp13 = _catch(function () {
            setApproving(true);
            var mint = new PublicKey(tokenAddress);
            var toPublicKey = new PublicKey(targetAddress);
            return Promise.resolve(getOrCreateAssociatedTokenAccount(connection, solanaAddress, mint, solanaAddress, signSolanaTransaction)).then(function (fromTokenAccount) {
              var transaction = new Transaction().add(createApproveTransferInstruction(fromTokenAccount.address, toPublicKey, solanaAddress, +(amount + serviceFee).toFixed(2) * Math.pow(10, decimals != null ? decimals : 6), [], TOKEN_PROGRAM_ID));
              return Promise.resolve(connection.getLatestBlockhash()).then(function (blockHash) {
                transaction.feePayer = solanaAddress;
                return Promise.resolve(blockHash.blockhash).then(function (_blockHash$blockhash) {
                  transaction.recentBlockhash = _blockHash$blockhash;
                  return Promise.resolve(signSolanaTransaction(transaction)).then(function (signed) {
                    return Promise.resolve(connection.sendRawTransaction(signed.serialize())).then(function () {
                      function _temp12() {
                        setAllowance(amount + serviceFee);
                        setApproving(false);
                      }
                      var accountInfo;
                      var allowAmount = 0;
                      var retryCount = 0;
                      var _temp11 = _do(function () {
                        return Promise.resolve(connection.getParsedAccountInfo(fromTokenAccount.address)).then(function (_connection$getParsed) {
                          var _accountInfo, _accountInfo$value2, _parsedAccountInfo$pa9, _parsedAccountInfo$pa10, _parsedAccountInfo$pa11, _parsedAccountInfo$pa12, _parsedAccountInfo$pa13;
                          accountInfo = _connection$getParsed;
                          var parsedAccountInfo = (_accountInfo = accountInfo) === null || _accountInfo === void 0 ? void 0 : (_accountInfo$value2 = _accountInfo.value) === null || _accountInfo$value2 === void 0 ? void 0 : _accountInfo$value2.data;
                          allowAmount = ((_parsedAccountInfo$pa9 = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa9 === void 0 ? void 0 : (_parsedAccountInfo$pa10 = _parsedAccountInfo$pa9.info) === null || _parsedAccountInfo$pa10 === void 0 ? void 0 : _parsedAccountInfo$pa10.delegate) === targetAddress ? (_parsedAccountInfo$pa11 = parsedAccountInfo.parsed) === null || _parsedAccountInfo$pa11 === void 0 ? void 0 : (_parsedAccountInfo$pa12 = _parsedAccountInfo$pa11.info) === null || _parsedAccountInfo$pa12 === void 0 ? void 0 : (_parsedAccountInfo$pa13 = _parsedAccountInfo$pa12.delegatedAmount) === null || _parsedAccountInfo$pa13 === void 0 ? void 0 : _parsedAccountInfo$pa13.uiAmount : 0;
                          console.log('sleep');
                          return Promise.resolve(sleep(1000)).then(function () {});
                        });
                      }, function () {
                        return allowAmount < amount + serviceFee || retryCount++ < 5;
                      });
                      return _temp11 && _temp11.then ? _temp11.then(_temp12) : _temp12(_temp11);
                    });
                  });
                });
              });
            });
          }, function (e) {
            errorHandler(e);
            setApproving(false);
          });
          if (_temp13 && _temp13.then) return _temp13.then(function () {});
        }
        var _temp14 = function () {
          if (sourceChain === ChainName.TRON) {
            var _temp10 = function _temp10() {
              _exit3 = true;
            };
            if (!decimals || !tokenAddress || !targetAddress || !signTronTransaction) {
              _exit3 = true;
              return;
            }
            var _temp9 = _catch(function () {
              setApproving(true);
              var functionSelector = 'approve(address,uint256)';
              var parameter = [{
                type: 'address',
                value: targetAddress
              }, {
                type: 'uint256',
                value: parseUnits((amount + serviceFee).toString(), decimals).toString()
              }];
              return Promise.resolve(tronWeb.transactionBuilder.triggerSmartContract(tronWeb.address.toHex(tokenAddress), functionSelector, {}, parameter, tronWeb.address.toHex(tronAddress))).then(function (tx) {
                return Promise.resolve(signTronTransaction(tx.transaction)).then(function (signedTx) {
                  return Promise.resolve(tronWeb.trx.sendRawTransaction(signedTx)).then(function (result) {
                    console.log(result);
                    setApproving(false);
                    setAllowance(amount + serviceFee);
                  });
                });
              });
            }, function (error) {
              errorHandler(error);
              setApproving(false);
            });
            return _temp9 && _temp9.then ? _temp9.then(_temp10) : _temp10(_temp9);
          }
        }();
        return _temp14 && _temp14.then ? _temp14.then(_temp15) : _temp15(_temp14);
      };
      var _exit2 = false;
      var _temp16 = function () {
        if (isEVMChain(sourceChain)) {
          var _temp8 = function _temp8() {
            _exit2 = true;
          };
          var provider = new ethers.providers.Web3Provider(walletProvider);
          var signer = provider.getSigner();
          if (!decimals || !tokenAddress || !signer || !targetAddress) {
            _exit2 = true;
            return;
          }
          var _temp7 = _catch(function () {
            var erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer);
            setApproving(true);
            return Promise.resolve(erc20Contract.approve(targetAddress, parseUnits((amount + serviceFee).toString(), decimals))).then(function (approve) {
              return Promise.resolve(approve.wait()).then(function () {
                setApproving(false);
                setAllowance(amount + serviceFee);
              });
            });
          }, function (error) {
            errorHandler(error);
            setApproving(false);
          });
          return _temp7 && _temp7.then ? _temp7.then(_temp8) : _temp8(_temp7);
        }
      }();
      return Promise.resolve(_temp16 && _temp16.then ? _temp16.then(_temp17) : _temp17(_temp16));
    } catch (e) {
      return Promise.reject(e);
    }
  }, [decimals, tokenAddress, walletProvider, amount, targetAddress, tronAddress, signSolanaTransaction, signTronTransaction, serviceFee]);
  return useMemo(function () {
    return {
      isApproved: isApproved,
      approve: approve
    };
  }, [isApproved, approve]);
}

var AddressInputWizard = function AddressInputWizard() {
  var theme = useSelector(selectTheme);
  return React.createElement("div", {
    className: "coin-select"
  }, React.createElement("p", null, "Select Target Address for Funding"), React.createElement("div", {
    className: "address-input " + theme.colorMode
  }, React.createElement("span", null, "Target Address:"), React.createElement(AddressInput, null)));
};

function useCurrencyOptions() {
  var dispatch = useDispatch();
  var _useState = useState('USDK'),
    options = _useState[0],
    setOptions = _useState[1];
  var nodeProviderQuery = useSelector(selectNodeProviderQuery);
  var originNetwork = useSelector(selectSourceChain);
  var targetNetwork = useSelector(selectTargetChain);
  useEffect(function () {
    if (!nodeProviderQuery || !originNetwork || !targetNetwork) return;
    (function () {
      try {
        return _catch(function () {
          if (originNetwork === ChainName.FIAT || targetNetwork === ChainName.FIAT) {
            setOptions('KEUR');
            return;
          }
          return Promise.resolve(fetchWrapper.get(nodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_currencies/" + originNetwork + "/" + targetNetwork)).then(function (coins) {
            var _coins$Currencies;
            dispatch(setAvailableTokenList(coins.Currencies || ['USDK']));
            setOptions((_coins$Currencies = coins.Currencies) !== null && _coins$Currencies !== void 0 && _coins$Currencies.length ? coins.Currencies[0] : 'USDK');
          });
        }, function (e) {
          console.log('rpc disconnected', e);
        });
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [nodeProviderQuery, originNetwork, targetNetwork]);
  return useMemo(function () {
    return {
      options: options
    };
  }, [options]);
}

var useWidth = function useWidth() {
  var _useState = useState(window.innerWidth),
    width = _useState[0],
    setWidth = _useState[1];
  useEffect(function () {
    var handleResize = function handleResize() {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return width;
};

function useSign(_ref) {
  var setSigning = _ref.setSigning;
  var dispatch = useDispatch();
  var _useState = useState(false),
    isSigned = _useState[0],
    setIsSigned = _useState[1];
  var web3ModalAccountInfo = useWeb3ModalAccount();
  var _ref2 = web3ModalAccountInfo || {
      address: null,
      chainId: null,
      isConnected: null
    },
    signerAddress = _ref2.address;
  var _useWeb3ModalProvider = useWeb3ModalProvider(),
    walletProvider = _useWeb3ModalProvider.walletProvider;
  var sourceNetwork = useSelector(selectSourceChain);
  var errorHandler = useSelector(selectErrorHandler);
  var amount = useSelector(selectAmount);
  var sign = useCallback(function () {
    try {
      if (sourceNetwork !== ChainName.FIAT) {
        errorHandler('Failed to sign');
        return Promise.resolve();
      }
      var _temp = _catch(function () {
        setSigning(true);
        var provider = new ethers.providers.Web3Provider(walletProvider);
        var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
        var message = amount + " | " + signerAddress;
        return Promise.resolve(signer === null || signer === void 0 ? void 0 : signer.signMessage(message)).then(function (signature) {
          var hash = Base64.stringify(sha256(signature || ''));
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
  return useMemo(function () {
    return {
      isSigned: isSigned,
      sign: sign
    };
  }, [isSigned, sign]);
}

var TransferWidget = function TransferWidget(_ref) {
  var _theme$backgroundColo;
  var theme = _ref.theme,
    helpURL = _ref.helpURL,
    titleOption = _ref.titleOption,
    paymentTitleOption = _ref.paymentTitleOption;
  var dispatch = useDispatch();
  var mainRef = useRef(null);
  var _useState = useState(false),
    isWizard = _useState[0],
    setWizard = _useState[1];
  var _useState2 = useState(0),
    formStep = _useState2[0],
    setFormStep = _useState2[1];
  var _useState3 = useState(0),
    wizardStep = _useState3[0],
    setWizardStep = _useState3[1];
  var mode = useSelector(selectMode);
  var dAppOption = useSelector(selectDappOption);
  var amount = useSelector(selectAmount);
  var sourceChain = useSelector(selectSourceChain);
  var targetAddress = useSelector(selectTargetAddress);
  var targetChain = useSelector(selectTargetChain);
  var compliantOption = useSelector(selectCompliantOption);
  var sourceCompliant = useSelector(selectSourceCompliant);
  var targetCompliant = useSelector(selectTargetCompliant);
  var errorHandler = useSelector(selectErrorHandler);
  var keplrHandler = useSelector(selectKeplrHandler);
  var closeHandler = useSelector(selectCloseHandler);
  var _useCurrencyOptions = useCurrencyOptions(),
    selectedToken = _useCurrencyOptions.options;
  var backendUrl = useSelector(selectBackendUrl);
  var nodeProviderQuery = useSelector(selectNodeProviderQuery);
  var bankDetails = useSelector(selectBankDetails);
  var kycStatus = useSelector(selectKycStatus);
  var transactionOption = useSelector(selectTransactionOption);
  var _useState4 = useState(false),
    isApproving = _useState4[0],
    setApproving = _useState4[1];
  var _useState5 = useState(false),
    isSubmitting = _useState5[0],
    setSubmitting = _useState5[1];
  var _useState6 = useState(false),
    isSigning = _useState6[0],
    setSigning = _useState6[1];
  var _useState7 = useState(false),
    isConfirming = _useState7[0],
    setConfirming = _useState7[1];
  var _useState8 = useState(false),
    isVerifying = _useState8[0],
    setVerifying = _useState8[1];
  var _useIsWalletReady = useIsWalletReady(),
    walletAddress = _useIsWalletReady.walletAddress,
    isReady = _useIsWalletReady.isReady;
  var _useAllowance = useAllowance({
      setApproving: setApproving
    }),
    isApproved = _useAllowance.isApproved,
    approve = _useAllowance.approve;
  var _useSign = useSign({
      setSigning: setSigning
    }),
    isSigned = _useSign.isSigned,
    sign = _useSign.sign;
  var _useServiceFee = useServiceFee(isConfirming),
    fee = _useServiceFee.serviceFee;
  var _useBalance = useBalance(),
    balance = _useBalance.balance;
  var windowWidth = useWidth();
  useEffect(function () {
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
          console.log('xplorisk check failed', e);
        });
        return _temp && _temp.then ? _temp.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [walletAddress, compliantOption]);
  useEffect(function () {
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
          console.log('xplorisk check failed', e);
        });
        return _temp2 && _temp2.then ? _temp2.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [targetAddress, compliantOption]);
  useEffect(function () {
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
  useEffect(function () {
    dispatch(setSelectedToken(selectedToken));
  }, [selectedToken]);
  useEffect(function () {
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
              if (poolBalance[i].balance[j].tokenSymbol !== selectedToken) continue;
              if (+poolBalance[i].balance[j].amount >= amount + fee) {
                return true;
              }
              var symbol = selectedToken;
              var errorString = "Tried to transfer " + amount + " " + symbol + ", but " + CHAIN_NAMES_TO_STRING[targetChain] + " pool has only " + +poolBalance[i].balance[j].amount + " " + symbol;
              console.log(errorString);
              toast$1.error(CHAIN_NAMES_TO_STRING[targetChain] + " pool has insufficient balance!");
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
  var handleSubmit = function handleSubmit() {
    try {
      var _exit = false;
      if (fee < 0) {
        toast$1.error('Fee is not calculated!');
        errorHandler('Fee is not calculated!');
        return Promise.resolve();
      }
      if (dAppOption !== DAppOptions.LPDrain && balance < amount) {
        toast$1.error('Insufficient balance!');
        errorHandler('Insufficient balance!');
        return Promise.resolve();
      }
      if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT) {
        if (kycStatus !== 'approved') {
          setVerifying(true);
          dispatch(setBankPopup(true));
          return Promise.resolve();
        }
      }
      if (sourceChain === ChainName.FIAT) {
        if (!isSigned) {
          sign();
          return Promise.resolve();
        }
      } else if (!isApproved && dAppOption !== DAppOptions.LPDrain) {
        approve();
        return Promise.resolve();
      }
      return Promise.resolve(_catch(function () {
        var _exit2 = false;
        if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT) return;
        setSubmitting(true);
        if (dAppOption === DAppOptions.LPDrain || dAppOption === DAppOptions.LPAdd) {
          keplrHandler(walletAddress);
          return;
        }
        return Promise.resolve(checkPoolBalance()).then(function (_checkPoolBalance) {
          if (!_checkPoolBalance) {
            setSubmitting(false);
            _exit = true;
            return;
          }
          var params = JSON.stringify({
            originAddress: walletAddress,
            originChain: sourceChain,
            targetAddress: mode === ModeOptions.payment ? transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress : targetAddress,
            targetChain: targetChain,
            symbol: selectedToken,
            amount: amount,
            fee: fee
          });
          console.log(params);
          return Promise.resolve(fetchWrapper.post(backendUrl + "/auth", params)).then(function () {
            return Promise.resolve(fetchWrapper.post(backendUrl + "/submit", params)).then(function (result) {
              console.log(result);
              if ((result === null || result === void 0 ? void 0 : result.code) !== 0) {
                errorHandler(result);
                toast$1.error('Failed to submit transaction!');
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
        toast$1.error('Failed to submit transaction');
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var onNext = function onNext() {
    var _mainRef$current;
    if (isWizard && wizardStep < 5) {
      if (wizardStep === 1 && !isReady) {
        toast$1.error('Wallet is not connected!');
        errorHandler('Wallet is not connected!');
        return;
      }
      if (wizardStep === 3) {
        if (targetAddress) {
          setWizardStep(4);
        }
        return;
      }
      if (wizardStep === 4) {
        if (fee >= 0 && amount > 0) {
          setWizardStep(5);
        }
        return;
      }
      if (mode === ModeOptions.payment && wizardStep === 1 && fee >= 0 && (!compliantOption || sourceCompliant === 'low' && targetCompliant === 'low')) {
        setConfirming(true);
        setWizardStep(5);
      } else setWizardStep(function (step) {
        return step + 1;
      });
    }
    if (!isWizard && !formStep) {
      if (isReady) {
        if (targetChain === ChainName.FIAT) {
          if (!bankDetails.iban) {
            toast$1.error('Invalid IBAN!');
            errorHandler('Invalid IBAN!');
            return;
          }
          if (!bankDetails.recipient) {
            toast$1.error('Invalid Recipient Address!');
            errorHandler('Invalid Recipient Address!');
            return;
          }
        }
        if (amount <= 0) {
          toast$1.error('Invalid amount!');
          errorHandler('Invalid amount!');
          return;
        }
        if (fee < 0) {
          toast$1.error('Fee is not calculated!');
          errorHandler('Fee is not calculated!');
          return;
        }
        if (compliantOption && (sourceCompliant !== 'low' || targetCompliant !== 'low')) return;
        if (mode === ModeOptions.payment || targetAddress && amount > 0) {
          setConfirming(true);
          setFormStep(1);
        }
        return;
      } else {
        toast$1.error('Wallet is not connected!');
        errorHandler('Wallet is not connected!');
      }
    }
    if (isWizard && wizardStep === 5 || !isWizard && formStep > 0) {
      handleSubmit();
    }
    (_mainRef$current = mainRef.current) === null || _mainRef$current === void 0 ? void 0 : _mainRef$current.click();
  };
  var onBack = function onBack() {
    if (isApproving || isSubmitting || isSigning) return;
    if (isWizard && wizardStep > 0) {
      if (mode === ModeOptions.payment && wizardStep === 5) setWizardStep(1);else setWizardStep(function (step) {
        return step - 1;
      });
      setConfirming(false);
    }
    if (!isWizard && formStep > 0) {
      setFormStep(0);
      setConfirming(false);
    }
    if (isWizard && wizardStep === 0 || !isWizard && formStep === 0) {
      closeHandler();
    }
  };
  var getButtonLabel = function getButtonLabel() {
    if (isWizard && wizardStep === 5 || !isWizard && formStep === 1) {
      if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT) {
        if (isVerifying) return 'KYC Verifying...';
        if (kycStatus !== 'approved') {
          return 'KYC Verify';
        }
      }
      if (sourceChain !== ChainName.FIAT && isApproved || dAppOption === DAppOptions.LPDrain || sourceChain === ChainName.FIAT && isSigned) {
        return isSubmitting ? 'Submitting...' : 'Submit';
      } else if (sourceChain === ChainName.FIAT) {
        return isSigning ? 'Signing...' : 'Sign';
      } else {
        return isApproving ? 'Approving...' : 'Approve';
      }
    }
    return 'Next';
  };
  useEffect(function () {
    dispatch(setTheme(theme));
  }, [theme]);
  return React.createElement("div", {
    className: "kima-card " + theme.colorMode + " font-" + theme.fontSize,
    style: {
      fontFamily: theme.fontFamily,
      background: theme.colorMode === ColorModeOptions.light ? theme.backgroundColorLight : theme.backgroundColorDark
    }
  }, React.createElement("div", {
    className: 'kima-card-header'
  }, React.createElement("div", {
    className: 'topbar'
  }, React.createElement("div", {
    className: 'title'
  }, React.createElement("h3", null, isWizard && wizardStep === 3 || !isWizard && formStep > 0 ? titleOption !== null && titleOption !== void 0 && titleOption.confirmTitle ? titleOption === null || titleOption === void 0 ? void 0 : titleOption.confirmTitle : 'Transfer Details' : titleOption !== null && titleOption !== void 0 && titleOption.initialTitle ? titleOption === null || titleOption === void 0 ? void 0 : titleOption.initialTitle : 'New Transfer')), React.createElement("div", {
    className: 'control-buttons'
  }, React.createElement(ExternalLink, {
    to: helpURL != null ? helpURL : 'https://docs.kima.finance/demo'
  }, React.createElement("div", {
    className: 'menu-button'
  }, "I need help")), React.createElement("button", {
    className: 'icon-button',
    onClick: function onClick() {
      if (isApproving || isSubmitting || isSigning) return;
      dispatch(initialize());
      closeHandler();
    },
    disabled: isApproving || isSubmitting || isSigning
  }, React.createElement(Cross, {
    fill: theme.colorMode === 'light' ? 'black' : 'white'
  }))))), React.createElement("div", {
    className: 'kima-card-content',
    ref: mainRef
  }, isWizard ? wizardStep === 0 ? React.createElement(Network, null) : wizardStep === 1 ? React.createElement("div", {
    className: 'connect-wallet-step'
  }, React.createElement("p", null, "Connect your wallet"), React.createElement(WalletButton, {
    errorBelow: true
  })) : wizardStep === 2 ? React.createElement(Network, {
    isOriginChain: false
  }) : wizardStep === 3 ? React.createElement(AddressInputWizard, null) : wizardStep === 4 ? React.createElement(CoinSelect, null) : React.createElement(ConfirmDetails, {
    isApproved: sourceChain === ChainName.FIAT ? isSigned : isApproved
  }) : formStep === 0 ? React.createElement(SingleForm, {
    paymentTitleOption: paymentTitleOption
  }) : React.createElement(ConfirmDetails, {
    isApproved: sourceChain === ChainName.FIAT ? isSigned : isApproved
  })), React.createElement("div", {
    className: 'kima-card-footer'
  }, React.createElement(ExternalLink, {
    to: 'https://kima.finance'
  }, React.createElement(FooterLogo, {
    fill: theme.colorMode === 'light' ? 'black' : '#C5C5C5'
  })), React.createElement("div", {
    className: 'button-group'
  }, React.createElement(SecondaryButton, {
    clickHandler: function clickHandler() {
      if (isApproving || isSubmitting || isSigning) return;
      setWizard(function (prev) {
        return !prev;
      });
    },
    disabled: isApproving || isSubmitting || isSigning,
    theme: theme.colorMode,
    style: {
      style: {
        width: '12em',
        marginLeft: 'auto'
      }
    }
  }, "Switch to ", isWizard ? 'Form' : 'Wizard'), React.createElement(SecondaryButton, {
    clickHandler: onBack,
    theme: theme.colorMode,
    disabled: isApproving || isSubmitting || isSigning
  }, isWizard && wizardStep > 0 || !isWizard && formStep > 0 ? 'Back' : 'Cancel'), React.createElement(PrimaryButton, {
    clickHandler: onNext,
    isLoading: isApproving || isSubmitting || isSigning,
    disabled: isApproving || isSubmitting || isSigning
  }, getButtonLabel()))), React.createElement(SolanaWalletConnectModal, null), React.createElement(TronWalletConnectModal, null), React.createElement(HelpPopup, null), sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT ? React.createElement(BankPopup, {
    setVerifying: setVerifying,
    isVerifying: isVerifying
  }) : null, React.createElement(Toaster, {
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
        color: theme.colorMode === ColorModeOptions.light ? 'black' : 'white',
        fontSize: '1em',
        borderRadius: '1em',
        border: '1px solid #66aae5',
        background: theme.colorMode === ColorModeOptions.light ? 'white' : (_theme$backgroundColo = theme.backgroundColorDark) != null ? _theme$backgroundColo : '#1b1e25'
      }
    }
  }));
};

var KimaTransactionWidget = function KimaTransactionWidget(_ref) {
  var mode = _ref.mode,
    txId = _ref.txId,
    _ref$autoSwitchChain = _ref.autoSwitchChain,
    autoSwitchChain = _ref$autoSwitchChain === void 0 ? true : _ref$autoSwitchChain,
    _ref$defaultToken = _ref.defaultToken,
    defaultToken = _ref$defaultToken === void 0 ? 'USDK' : _ref$defaultToken,
    provider = _ref.provider,
    _ref$dAppOption = _ref.dAppOption,
    dAppOption = _ref$dAppOption === void 0 ? DAppOptions.None : _ref$dAppOption,
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
    kimaExplorer = _ref$kimaExplorer === void 0 ? 'explorer.kima.finance' : _ref$kimaExplorer,
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
    } : _ref$keplrHandler,
    _ref$isTestnet = _ref.isTestnet,
    isTestnet = _ref$isTestnet === void 0 ? true : _ref$isTestnet,
    _ref$isFioAllowed = _ref.isFioAllowed,
    isFioAllowed = _ref$isFioAllowed === void 0 ? true : _ref$isFioAllowed;
  var submitted = useSelector(selectSubmitted);
  var dispatch = useDispatch();
  var _useWeb3ModalTheme = useWeb3ModalTheme(),
    setThemeMode = _useWeb3ModalTheme.setThemeMode;
  useEffect(function () {
    dispatch(setTheme(theme));
    setThemeMode(theme.colorMode === ColorModeOptions.light ? 'light' : 'dark');
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
    dispatch(setMode(mode));
    dispatch(setProvider(provider));
    dispatch(setDappOption(dAppOption));
    dispatch(setWalletAutoConnect(autoSwitchChain));
    dispatch(setSelectedToken(defaultToken));
    dispatch(setUseFIAT(useFIAT));
    dispatch(setIsTestnet(isTestnet));
    dispatch(setIsFioAllowed(isFioAllowed));
    if (useFIAT) {
      dispatch(setTxId(txId || -1));
      (function () {
        try {
          var _temp = _catch(function () {
            return Promise.resolve(fetchWrapper.get(kimaBackendUrl + "/uuid")).then(function (uuid) {
              dispatch(setUuid(uuid));
              console.log('uuid: ', uuid);
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
    if (mode === ModeOptions.payment) {
      dispatch(setTargetChain((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain) || ChainName.ETHEREUM));
      if (dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain) {
        dispatch(setSourceChain((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain) || ChainName.ETHEREUM));
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
                console.log('xplorisk check failed', e);
              });
            };
            var _temp3 = _catch(function () {
              return Promise.resolve(fetchWrapper.get(kimaNodeProviderQuery + "/kima-finance/kima-blockchain/chains/get_available_chains/" + ((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetChain) || ChainName.ETHEREUM))).then(function (networks) {
                dispatch(setSourceChain(networks.Chains[0]));
              });
            }, function (e) {
              console.log('rpc disconnected', e);
            });
            return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
          } catch (e) {
            Promise.reject(e);
          }
        })();
      }
      dispatch(setTargetAddress((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.targetAddress) || ''));
      dispatch(setAmount((transactionOption === null || transactionOption === void 0 ? void 0 : transactionOption.amount) || 0));
    } else if (mode === ModeOptions.status) {
      dispatch(setTxId(txId || 1));
      dispatch(setSubmitted(true));
    }
  }, [provider, theme, transactionOption, errorHandler, closeHandler, mode]);
  useEffect(function () {
    if (dAppOption === DAppOptions.None && mode === ModeOptions.bridge) {
      dispatch(setTargetChain(''));
      dispatch(setSourceChain('ETH'));
    }
  }, [dAppOption, mode]);
  return submitted ? React.createElement(TransactionWidget, {
    theme: theme
  }) : React.createElement(TransferWidget, {
    theme: theme,
    helpURL: helpURL,
    titleOption: titleOption,
    paymentTitleOption: paymentTitleOption
  });
};

var ConnectionProvider = ConnectionProvider$1,
  SolanaWalletProvider = WalletProvider$1;
var projectId = '90c9315fb25e62e202ce09985f70bcf3';
var ethereum = {
  chainId: 11155111,
  name: 'Ethereum Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com'
};
var bsc = {
  chainId: 97,
  name: 'BNB Smart Chain Testnet',
  currency: 'tBNB',
  explorerUrl: 'https://testnet.bscscan.com',
  rpcUrl: 'https://endpoints.omniatech.io/v1/bsc/testnet/public'
};
var polygon = {
  chainId: 80002,
  name: 'Amoy',
  currency: 'MATIC',
  explorerUrl: 'https://www.oklink.com/amoy',
  rpcUrl: 'https://rpc-amoy.polygon.technology'
};
var arbitrum = {
  chainId: 421614,
  name: 'Arbitrum Sepolia Testnet',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.arbiscan.io/',
  rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
};
var optimism = {
  chainId: 11155420,
  name: 'OP Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia-optimism.etherscan.io',
  rpcUrl: 'https://sepolia.optimism.io'
};
var avalanche = {
  chainId: 43113,
  name: 'Avalanche Fuji Testnet',
  currency: 'AVAX',
  explorerUrl: 'https://testnet.snowtrace.io',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
};
var zkEVM = {
  chainId: 2442,
  name: 'Polygon zkEVM Cardona Testnet',
  currency: 'ETH',
  explorerUrl: 'https://cardona-zkevm.polygonscan.com',
  rpcUrl: 'https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public'
};
var metadata = {
  name: 'Kima Transaction Widget',
  description: 'Frontend widget for Kima integration for dApps',
  url: 'https://kima.finance',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};
createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata: metadata
  }),
  chains: [ethereum, bsc, polygon, arbitrum, optimism, avalanche, zkEVM],
  projectId: projectId,
  enableAnalytics: false,
  featuredWalletIds: ['c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', 'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393', '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0']
});
var KimaProvider = function KimaProvider(_ref) {
  var children = _ref.children;
  var wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new CloverWalletAdapter(), new Coin98WalletAdapter(), new SolongWalletAdapter(), new TorusWalletAdapter()];
  var adapters = useMemo(function () {
    var tronLinkAdapter = new TronLinkAdapter();
    var ledger = new LedgerAdapter({
      accountNumber: 2
    });
    var tokenPocketAdapter = new TokenPocketAdapter();
    var okxwalletAdapter = new OkxWalletAdapter();
    return [tronLinkAdapter, tokenPocketAdapter, okxwalletAdapter, ledger];
  }, []);
  function onError(e) {
    if (e instanceof WalletNotFoundError) {
      toast$1.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast$1.error(e.message);
    } else toast$1.error(e.message);
  }
  var onChainChanged = function onChainChanged(chainData) {
    toast$1.error('Please switch to Tron Nile Testnet!');
    if (chainData.chainId !== '0xcd8690dc') {
      adapters[0].switchChain('0xcd8690dc');
    }
  };
  return React.createElement(Provider, {
    store: store
  }, React.createElement(ConnectionProvider, {
    endpoint: SOLANA_HOST
  }, React.createElement(SolanaWalletProvider, {
    wallets: wallets
  }, React.createElement(WalletProvider, {
    onError: onError,
    autoConnect: false,
    disableAutoConnectOnLoad: true,
    adapters: adapters,
    onChainChanged: onChainChanged
  }, children))));
};

export { CHAIN_NAMES_TO_STRING, CHAIN_STRING_TO_NAME, ColorModeOptions, CurrencyOptions, DAppOptions, FontSizeOptions, KimaProvider, KimaTransactionWidget, ModeOptions, ChainName as SupportNetworks };
//# sourceMappingURL=index.modern.js.map
