"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  CHAIN_NAMES_TO_STRING: () => CHAIN_NAMES_TO_STRING,
  CHAIN_STRING_TO_NAME: () => CHAIN_STRING_TO_NAME,
  ColorModeOptions: () => ColorModeOptions,
  CurrencyOptions: () => CurrencyOptions,
  DAppOptions: () => DAppOptions,
  KimaProvider: () => KimaProvider_default,
  KimaTransactionWidget: () => KimaTransactionWidget_default,
  ModeOptions: () => ModeOptions,
  NetworkOptions: () => NetworkOptions,
  SupportNetworks: () => ChainName
});
module.exports = __toCommonJS(index_exports);

// src/KimaProvider.tsx
var React81 = __toESM(require("react"), 1);
var import_react92 = require("react");
var import_react_redux19 = require("react-redux");

// src/store/index.tsx
var import_toolkit2 = require("@reduxjs/toolkit");

// src/store/optionSlice.tsx
var toolkitRaw = __toESM(require("@reduxjs/toolkit"), 1);

// src/utils/constants.tsx
var import_web3 = require("@solana/web3.js");

// src/assets/icons/Cross.tsx
var import_react = __toESM(require("react"), 1);
var Cross = ({ width = 60, height = 60, fill = "white", ...rest }) => {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 25 26",
      fill,
      ...rest
    },
    /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M0.832764 1.33276L24.1673 24.6673",
        stroke: "#778DA3",
        strokeWidth: "2"
      }
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M0.832764 24.6673L24.1673 1.3328",
        stroke: "#778DA3",
        strokeWidth: "2"
      }
    )
  );
};
var Cross_default = Cross;

// src/assets/icons/Minimize.tsx
var import_react2 = __toESM(require("react"), 1);
var Minimize = ({ width = 16, height = 1, fill = "#86B8CE", ...rest }) => {
  return /* @__PURE__ */ import_react2.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 11 1",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react2.default.createElement("rect", { width: "11", height: "1", fill })
  );
};
var Minimize_default = Minimize;

// src/assets/icons/FooterLogo.tsx
var import_react3 = __toESM(require("react"), 1);
var FooterLogo = ({ width = 40, height = 40, fill = "#C5C5C5", ...rest }) => {
  return /* @__PURE__ */ import_react3.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 49 18",
      fill,
      ...rest
    },
    /* @__PURE__ */ import_react3.default.createElement(
      "path",
      {
        d: "M30.1884 10.576C30.1884 9.5081 30.7939 8.62496 31.9158 8.62496C32.8449 8.6572 33.5977 9.53173 33.5977 10.576V17.2908C33.5977 17.4584 33.7284 17.5938 33.8901 17.5938H36.8246C36.9863 17.5938 37.117 17.4584 37.117 17.2908V9.83256C37.117 7.1144 35.5699 5.34813 33.1021 5.34813C31.3974 5.34813 30.2755 6.11523 29.5579 6.94895C29.5455 6.96399 29.5268 6.96184 29.5144 6.9468C28.8632 6.04648 27.8304 5.34813 26.3497 5.34813C25.0038 5.34813 23.8612 5.92829 23.2971 6.78349C23.2784 6.77705 23.2971 6.78349 23.2763 6.77705V5.93259C23.2763 5.76499 23.1457 5.62962 22.9839 5.62962H20.0702C19.9085 5.62962 19.7778 5.76714 19.7778 5.93259V17.293C19.7778 17.4606 19.9085 17.596 20.0702 17.596H22.9839C23.1457 17.596 23.2763 17.4606 23.2763 17.293V10.5782C23.2763 9.51025 23.8819 8.62711 24.981 8.62711C25.9225 8.65934 26.6857 9.53388 26.6857 10.5782V17.293C26.6857 17.4606 26.8163 17.596 26.9781 17.596H29.8918C30.0536 17.596 30.1842 17.4606 30.1842 17.293V10.5782L30.1884 10.576ZM45.6134 17.2887C45.6134 17.4563 45.744 17.5917 45.9058 17.5917H48.7075C48.8692 17.5917 48.9999 17.4563 48.9999 17.2887V10.1807C48.9999 7.1144 47.0713 5.34813 43.7739 5.34813C42.5711 5.33739 40.9203 5.69838 39.9643 6.1711C39.8648 6.22052 39.8025 6.32796 39.8025 6.44184V8.89141C39.8025 9.11703 40.0307 9.26099 40.2256 9.16215C41.051 8.74314 41.9946 8.44017 42.9858 8.44017C44.4354 8.41009 45.6092 9.25455 45.6092 10.3225V10.4084C45.6092 10.576 45.4329 10.6856 45.294 10.5997C44.7527 10.2666 43.8651 9.97437 42.9174 9.97437C40.4724 9.97437 38.4546 11.5086 38.4546 13.8314C38.4546 16.3411 40.4724 17.8753 42.8054 17.8753C44.1513 17.8753 45.2048 17.3166 45.6092 16.8525V17.293L45.6134 17.2887ZM45.659 13.8292C45.659 14.7811 44.649 15.2925 43.6847 15.2925C42.7204 15.2925 41.6897 14.7811 41.6897 13.8292C41.6897 12.8773 42.6768 12.3896 43.6847 12.3896C44.6926 12.3896 45.659 12.901 45.659 13.8292Z",
        fill
      }
    ),
    /* @__PURE__ */ import_react3.default.createElement(
      "path",
      {
        d: "M14.1994 17.594H17.1131C17.2749 17.594 17.4055 17.4586 17.4055 17.291V5.92846C17.4055 5.76086 17.2749 5.62549 17.1131 5.62549H14.1994C14.0376 5.62549 13.907 5.76086 13.907 5.92846V17.2889C13.907 17.4565 14.0376 17.5918 14.1994 17.5918",
        fill
      }
    ),
    /* @__PURE__ */ import_react3.default.createElement(
      "path",
      {
        d: "M15.6801 0H15.6324C14.4378 0 13.488 0.960487 13.488 2.2218C13.488 3.48311 14.4378 4.41996 15.6324 4.41996H15.6801C16.8497 4.41996 17.8244 3.45947 17.8244 2.2218C17.8244 0.984123 16.8497 0 15.6801 0Z",
        fill
      }
    ),
    /* @__PURE__ */ import_react3.default.createElement(
      "path",
      {
        d: "M10.9746 14.199C10.591 13.8122 10.1015 13.6038 9.60589 13.5758C7.70213 13.5114 7.42839 11.874 7.42839 11.4615C7.42839 11.0102 7.73117 9.43092 9.60174 9.36861C10.0974 9.33852 10.5868 9.13224 10.9705 8.74332C11.8166 7.89027 11.8332 6.48714 11.0099 5.61046C10.593 5.16567 10.0393 4.9422 9.48561 4.94005H9.47109C8.93605 4.94005 8.39893 5.15063 7.98624 5.56748C7.53208 6.02516 7.34129 6.6397 7.34129 7.2478C7.34129 7.78069 7.00118 9.24183 5.41887 9.24183C4.82368 9.24183 4.19947 9.42232 3.74323 9.90579C3.72249 9.92728 3.70797 9.95091 3.68931 9.9724V9.96381C3.58147 10.082 3.55866 9.98744 3.56073 9.92513V1.01C3.56073 0.842402 3.43008 0.707031 3.26833 0.707031H0.292407C0.13065 0.707031 0 0.842402 0 1.01V17.3662C0 17.5338 0.13065 17.6692 0.292407 17.6692H3.27247C3.43423 17.6692 3.56488 17.5338 3.56488 17.3662V13.015C3.56488 12.9506 3.58562 12.8582 3.69553 12.9763V12.9699C3.71212 12.9914 3.72664 13.0129 3.7453 13.0344C4.20154 13.52 4.81746 13.6983 5.42301 13.6983C7.00533 13.6983 7.34544 15.3486 7.34544 15.6923C7.34544 16.1651 7.53623 16.915 7.99039 17.3727C8.40515 17.7917 8.94435 18.0001 9.48146 18.0001C10.0372 18.0001 10.593 17.7766 11.0119 17.3297C11.4143 16.8999 11.6175 16.3456 11.6175 15.7912V15.7783C11.6175 15.2046 11.3997 14.6309 10.9705 14.1968",
        fill
      }
    )
  );
};
var FooterLogo_default = FooterLogo;

// src/assets/icons/Check.tsx
var import_react4 = __toESM(require("react"), 1);
var Check = ({ width = 30, height = 30, fill = "#86B8CE", ...rest }) => {
  return /* @__PURE__ */ import_react4.default.createElement(
    "svg",
    {
      className: "check-icon",
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 41 41",
      fill,
      ...rest
    },
    /* @__PURE__ */ import_react4.default.createElement(
      "path",
      {
        d: "M6.90529 21.9045C6.64003 21.6385 6.51271 21.3283 6.52332 20.9737C6.53393 20.6191 6.67231 20.3088 6.93845 20.0429C7.20371 19.7991 7.51318 19.6715 7.86686 19.66C8.22055 19.6484 8.53002 19.7761 8.79528 20.0429L13.5037 24.7633L13.9679 25.2287L14.4321 25.694C14.6973 25.96 14.8247 26.2702 14.8141 26.6248C14.8034 26.9794 14.6651 27.2897 14.3989 27.5556C14.1337 27.7994 13.8242 27.927 13.4705 27.9385C13.1168 27.9501 12.8074 27.8224 12.5421 27.5556L6.90529 21.9045ZM20.9641 24.73L32.2377 13.4277C32.503 13.1618 32.8125 13.0346 33.1661 13.0461C33.5198 13.0577 33.8293 13.1959 34.0946 13.461C34.3377 13.7269 34.465 14.0372 34.4765 14.3918C34.488 14.7463 34.3607 15.0566 34.0946 15.3225L21.8925 27.5556C21.6273 27.8215 21.3178 27.9545 20.9641 27.9545C20.6105 27.9545 20.301 27.8215 20.0357 27.5556L14.3989 21.9045C14.1558 21.6607 14.0342 21.3562 14.0342 20.991C14.0342 20.6257 14.1558 20.3097 14.3989 20.0429C14.6642 19.777 14.9794 19.644 15.3446 19.644C15.7098 19.644 16.0245 19.777 16.2889 20.0429L20.9641 24.73ZM26.5678 15.3558L21.8925 20.0429C21.6494 20.2867 21.3457 20.4086 20.9814 20.4086C20.6171 20.4086 20.3019 20.2867 20.0357 20.0429C19.7705 19.777 19.6378 19.4614 19.6378 19.0962C19.6378 18.731 19.7705 18.4149 20.0357 18.1481L24.7109 13.461C24.9541 13.2172 25.2583 13.0953 25.6234 13.0953C25.9886 13.0953 26.3034 13.2172 26.5678 13.461C26.833 13.7269 26.9657 14.0425 26.9657 14.4077C26.9657 14.7729 26.833 15.089 26.5678 15.3558Z",
        fill
      }
    )
  );
};
var Check_default = Check;

// src/assets/icons/Warning.tsx
var import_react5 = __toESM(require("react"), 1);
var Warning = ({ width = 14, height = 13, ...rest }) => {
  return /* @__PURE__ */ import_react5.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 14 13",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react5.default.createElement(
      "path",
      {
        d: "M13.8418 11.0561L8.16007 0.683372C8.04697 0.476647 7.87973 0.304041 7.67598 0.183764C7.47223 0.0634876 7.23954 0 7.00245 0C6.76537 0 6.53267 0.0634876 6.32893 0.183764C6.12518 0.304041 5.95794 0.476647 5.84484 0.683372L0.167185 11.0561C0.05491 11.2556 -0.00270098 11.4807 9.72867e-05 11.7091C0.00289555 11.9376 0.0660053 12.1613 0.183133 12.358C0.300261 12.5546 0.467315 12.7174 0.667636 12.8301C0.867956 12.9427 1.09454 13.0013 1.3248 13H12.6842C12.9121 12.9997 13.1361 12.9408 13.3342 12.829C13.5323 12.7172 13.6977 12.5563 13.8144 12.3621C13.931 12.1678 13.9949 11.9469 13.9997 11.7208C14.0045 11.4947 13.9501 11.2713 13.8418 11.0723V11.0561ZM6.47887 3.26032C6.47887 3.10964 6.5392 2.96513 6.6466 2.85858C6.754 2.75203 6.89966 2.69218 7.05154 2.69218C7.20342 2.69218 7.34908 2.75203 7.45648 2.85858C7.56388 2.96513 7.62421 3.10964 7.62421 3.26032V8.13015C7.62421 8.28083 7.56388 8.42534 7.45648 8.53189C7.34908 8.63844 7.20342 8.6983 7.05154 8.6983C6.89966 8.6983 6.754 8.63844 6.6466 8.53189C6.5392 8.42534 6.47887 8.28083 6.47887 8.13015V3.26032ZM7.05154 11.3158C6.90592 11.3158 6.76356 11.273 6.64248 11.1927C6.52139 11.1125 6.42702 10.9984 6.37129 10.8649C6.31556 10.7314 6.30098 10.5845 6.32939 10.4428C6.3578 10.3011 6.42793 10.171 6.5309 10.0688C6.63387 9.96667 6.76507 9.8971 6.9079 9.86892C7.05072 9.84073 7.19877 9.8552 7.33331 9.91048C7.46785 9.96577 7.58284 10.0594 7.66375 10.1795C7.74465 10.2997 7.78783 10.4409 7.78783 10.5854C7.78783 10.6813 7.76879 10.7763 7.73179 10.8649C7.69479 10.9535 7.64055 11.034 7.57218 11.1019C7.50381 11.1697 7.42264 11.2235 7.33331 11.2602C7.24398 11.2969 7.14823 11.3158 7.05154 11.3158Z",
        fill: "#86B8CE"
      }
    )
  );
};
var Warning_default = Warning;

// src/assets/icons/ArrowRight.tsx
var import_react6 = __toESM(require("react"), 1);

// src/assets/icons/Arrow.tsx
var import_react7 = __toESM(require("react"), 1);
var Arrow = ({ width = 22, height = 25, fill = "none", ...rest }) => {
  return /* @__PURE__ */ import_react7.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 22 25",
      fill,
      ...rest
    },
    /* @__PURE__ */ import_react7.default.createElement("path", { d: "M10.9974 0L10.9974 16.625", stroke: "#778DA3", strokeWidth: "2" }),
    /* @__PURE__ */ import_react7.default.createElement(
      "path",
      {
        d: "M21.1249 14.2734L16.8822 18.5161C13.758 21.6403 8.69272 21.6403 5.56853 18.5161L1.32589 14.2734",
        stroke: "#778DA3",
        strokeWidth: "2"
      }
    )
  );
};
var Arrow_default = Arrow;

// src/assets/icons/Lock.tsx
var import_react8 = __toESM(require("react"), 1);
var Lock = ({ width = 24, height = 27, fill = "none", ...rest }) => {
  return /* @__PURE__ */ import_react8.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 24 27",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react8.default.createElement(
      "rect",
      {
        x: "1.25",
        y: "9.37793",
        width: "21.3105",
        height: "15.9829",
        rx: "4.9697",
        stroke: "#86B8CE",
        strokeWidth: "1.86364"
      }
    ),
    /* @__PURE__ */ import_react8.default.createElement(
      "path",
      {
        d: "M11.9004 18.7014L11.9004 16.0376",
        stroke: "#86B8CE",
        strokeWidth: "1.86364",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ import_react8.default.createElement(
      "path",
      {
        d: "M17.2341 9.37815V6.35642C17.2341 3.61173 15.0091 1.38672 12.2644 1.38672H11.5486C8.80387 1.38672 6.57886 3.61173 6.57886 6.35642L6.57886 9.37815",
        stroke: "#86B8CE",
        strokeWidth: "1.86364"
      }
    )
  );
};
var Lock_default = Lock;

// src/assets/icons/Ethereum.tsx
var import_react9 = __toESM(require("react"), 1);
var Ethereum = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ import_react9.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 22 36",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react9.default.createElement("path", { d: "M10.9966 13.3093V0L0 18.3307L10.9966 13.3093Z", fill: "#8A92B2" }),
    /* @__PURE__ */ import_react9.default.createElement(
      "path",
      {
        d: "M10.9966 24.8639V13.3093L0 18.3307L10.9966 24.8639ZM10.9966 13.3093L21.9933 18.3307L10.9966 0V13.3093Z",
        fill: "#62688F"
      }
    ),
    /* @__PURE__ */ import_react9.default.createElement(
      "path",
      {
        d: "M10.9966 13.3093V24.8639L21.9933 18.3307L10.9966 13.3093Z",
        fill: "#454A75"
      }
    ),
    /* @__PURE__ */ import_react9.default.createElement("path", { d: "M10.9966 26.9561L0 20.4297L10.9966 36V26.9561Z", fill: "#8A92B2" }),
    /* @__PURE__ */ import_react9.default.createElement("path", { d: "M22 20.4297L10.9966 26.9561V36L22 20.4297Z", fill: "#62688F" })
  );
};
var Ethereum_default = Ethereum;

// src/assets/icons/Solana.tsx
var import_react10 = __toESM(require("react"), 1);
var Solana = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ import_react10.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 26 21",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react10.default.createElement(
      "path",
      {
        d: "M22.2506 4.97063C22.1771 5.05109 22.0851 5.11367 21.984 5.14943C21.8828 5.19413 21.7725 5.21201 21.6622 5.21201H0.835479C0.0998792 5.21201 -0.277116 4.31801 0.237804 3.78161L3.65835 0.25032C3.73191 0.16986 3.82386 0.107281 3.9342 0.0625809C4.03534 0.017881 4.14568 0 4.25602 0H25.1655C25.9102 0 26.2781 0.902938 25.7539 1.43934L22.2506 4.97063ZM22.2506 20.7586C22.0943 20.9106 21.8828 21 21.6622 21H0.835479C0.0998792 21 -0.277116 20.1239 0.237804 19.6054L3.65835 16.1545C3.73191 16.0741 3.83305 16.0115 3.9342 15.9757C4.03534 15.931 4.14568 15.9132 4.25602 15.9132H25.1655C25.9102 15.9132 26.2781 16.7982 25.7539 17.3167L22.2506 20.7586ZM22.2506 8.19796C22.0943 8.04598 21.8828 7.95658 21.6622 7.95658H0.835479C0.0998792 7.95658 -0.277116 8.8327 0.237804 9.35121L3.65835 12.802C3.73191 12.8825 3.83305 12.9451 3.9342 12.9808C4.03534 13.0255 4.14568 13.0434 4.25602 13.0434H25.1655C25.9102 13.0434 26.2781 12.1584 25.7539 11.6398L22.2506 8.19796Z",
        fill: "url(#paint0_linear_721_5435)"
      }
    ),
    /* @__PURE__ */ import_react10.default.createElement("defs", null, /* @__PURE__ */ import_react10.default.createElement(
      "linearGradient",
      {
        id: "paint0_linear_721_5435",
        x1: "1.58985",
        y1: "21.2621",
        x2: "23.7184",
        y2: "-0.89642",
        gradientUnits: "userSpaceOnUse"
      },
      /* @__PURE__ */ import_react10.default.createElement("stop", { stopColor: "#CF41E8" }),
      /* @__PURE__ */ import_react10.default.createElement("stop", { offset: "1", stopColor: "#10F2B0" })
    ))
  );
};
var Solana_default = Solana;

// src/assets/icons/Polygon.tsx
var import_react11 = __toESM(require("react"), 1);
var Polygon = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ import_react11.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 25",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react11.default.createElement(
      "path",
      {
        d: "M22.7154 7.64095C22.1671 7.34421 21.4621 7.34421 20.8355 7.64095L16.4491 10.089L13.4726 11.6469L9.16449 14.095C8.61619 14.3917 7.91123 14.3917 7.2846 14.095L3.91645 12.1662C3.36815 11.8694 2.9765 11.276 2.9765 10.6083V6.89911C2.9765 6.30564 3.28982 5.71217 3.91645 5.34125L7.2846 3.48665C7.8329 3.18991 8.53786 3.18991 9.16449 3.48665L12.5326 5.41543C13.0809 5.71217 13.4726 6.30564 13.4726 6.97329V9.42136L16.4491 7.78932V5.26706C16.4491 4.67359 16.1358 4.08012 15.5091 3.7092L9.24282 0.222552C8.69452 -0.074184 7.98956 -0.074184 7.36292 0.222552L0.939948 3.78338C0.313316 4.08012 0 4.67359 0 5.26706V12.2404C0 12.8338 0.313316 13.4273 0.939948 13.7982L7.2846 17.2849C7.8329 17.5816 8.53786 17.5816 9.16449 17.2849L13.4726 14.911L16.4491 13.2789L20.7572 10.905C21.3055 10.6083 22.0104 10.6083 22.6371 10.905L26.0052 12.7596C26.5535 13.0564 26.9452 13.6499 26.9452 14.3175V18.0267C26.9452 18.6202 26.6319 19.2136 26.0052 19.5846L22.7154 21.4392C22.1671 21.7359 21.4621 21.7359 20.8355 21.4392L17.4674 19.5846C16.9191 19.2878 16.5274 18.6944 16.5274 18.0267V15.6528L13.5509 17.2849V19.7329C13.5509 20.3264 13.8642 20.9199 14.4909 21.2908L20.8355 24.7774C21.3838 25.0742 22.0888 25.0742 22.7154 24.7774L29.0601 21.2908C29.6084 20.9941 30 20.4006 30 19.7329V12.6855C30 12.092 29.6867 11.4985 29.0601 11.1276L22.7154 7.64095Z",
        fill: "#8247E5"
      }
    )
  );
};
var Polygon_default = Polygon;

// src/assets/icons/Polygon_zkEVM.tsx
var import_react12 = __toESM(require("react"), 1);
var PolygonzkEVM = ({ width = 29, height = 32, ...rest }) => {
  return /* @__PURE__ */ import_react12.default.createElement(
    "svg",
    {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      ...rest
    },
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C2.640625 1.33984375 2.640625 1.33984375 5.25 2.9375 C6.12140625 3.46214844 6.9928125 3.98679687 7.890625 4.52734375 C10 6 10 6 11 8 C11.17484831 10.2873598 11.26720049 12.58141443 11.3125 14.875 C11.34988281 16.10992188 11.38726563 17.34484375 11.42578125 18.6171875 C11 22 11 22 9.2578125 24.26953125 C7.07701959 25.94096941 4.94591023 27.4452404 2.5625 28.8125 C1.82128906 29.25207031 1.08007812 29.69164063 0.31640625 30.14453125 C-2.63165451 31.23327544 -4.0243054 30.95990148 -7 30 C-9.640625 28.66015625 -9.640625 28.66015625 -12.25 27.0625 C-13.12140625 26.53785156 -13.9928125 26.01320313 -14.890625 25.47265625 C-17 24 -17 24 -18 22 C-18.17484831 19.7126402 -18.26720049 17.41858557 -18.3125 15.125 C-18.34988281 13.89007813 -18.38726563 12.65515625 -18.42578125 11.3828125 C-18 8 -18 8 -16.2578125 5.73046875 C-14.07701959 4.05903059 -11.94591023 2.5547596 -9.5625 1.1875 C-8.82128906 0.74792969 -8.08007812 0.30835937 -7.31640625 -0.14453125 C-4.36834549 -1.23327544 -2.9756946 -0.95990148 0 0 Z M-4 2 C-5.65 3.32 -7.3 4.64 -9 6 C-6.525 6.495 -6.525 6.495 -4 7 C-4 8.98 -4 10.96 -4 13 C-3.67 13 -3.34 13 -3 13 C-2.5978125 11.576875 -2.5978125 11.576875 -2.1875 10.125 C-1 7 -1 7 2 5 C0.02 4.01 -1.96 3.02 -4 2 Z M-15 9 C-15.25030977 11.58380177 -15.25030977 11.58380177 -15 14 C-13.68 13.67 -12.36 13.34 -11 13 C-11 11.02 -11 9.04 -11 7 C-12.46225016 6.90754997 -12.46225016 6.90754997 -15 9 Z M5 8 C5 9.65 5 11.3 5 13 C5.66 13 6.32 13 7 13 C7.33 11.68 7.66 10.36 8 9 C7.01 8.67 6.02 8.34 5 8 Z M-8 10 C-7 13 -7 13 -7 13 Z M1 10 C2 13 2 13 2 13 Z M6 16 C4.70366379 17.06645115 4.70366379 17.06645115 4.9375 19.5625 C4.958125 20.366875 4.97875 21.17125 5 22 C5.99 21.67 6.98 21.34 8 21 C8 19.35 8 17.7 8 16 C7.34 16 6.68 16 6 16 Z M-14 17 C-14.33 17.99 -14.66 18.98 -15 20 C-14.02149805 21.02104551 -13.02019573 22.0206121 -12 23 C-11.67 23 -11.34 23 -11 23 C-11 21.02 -11 19.04 -11 17 C-11.99 17 -12.98 17 -14 17 Z M-8 17 C-7 20 -7 20 -7 20 Z M-4 17 C-4 18.98 -4 20.96 -4 23 C-5.65 23.33 -7.3 23.66 -9 24 C-7.30504044 25.66846734 -7.30504044 25.66846734 -5 27 C-1.62963689 26.75925978 -0.41201979 26.41201979 2 24 C1.360625 23.773125 0.72125 23.54625 0.0625 23.3125 C-2 22 -2 22 -2.75 19.375 C-2.8325 18.59125 -2.915 17.8075 -3 17 C-3.33 17 -3.66 17 -4 17 Z M1 17 C2 20 2 20 2 20 Z ",
        fill: "#8751E7",
        transform: "translate(18,1)"
      }
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C2.475 0.495 2.475 0.495 5 1 C5 1.99 5 2.98 5 4 C4.01 4.495 4.01 4.495 3 5 C2.34 4.67 1.68 4.34 1 4 C1 5.98 1 7.96 1 10 C-4.94 10 -10.88 10 -17 10 C-16.34 9.67 -15.68 9.34 -15 9 C-15 7.02 -15 5.04 -15 3 C-12.6875 2.375 -12.6875 2.375 -10 2 C-9.01 2.66 -8.02 3.32 -7 4 C-6.67 3.67 -6.34 3.34 -6 3 C-4.00041636 2.95919217 -1.99954746 2.95745644 0 3 C0 2.01 0 1.02 0 0 Z M-12 6 C-11 9 -11 9 -11 9 Z M-3 6 C-2 9 -2 9 -2 9 Z ",
        fill: "#905FE8",
        transform: "translate(22,5)"
      }
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C0.66 0.33 1.32 0.66 2 1 C2 4.96 2 8.92 2 13 C1.01 13.495 1.01 13.495 0 14 C0 12.35 0 10.7 0 9 C-10.89 9.495 -10.89 9.495 -22 10 C-22.33 11.32 -22.66 12.64 -23 14 C-23.66 14 -24.32 14 -25 14 C-25 10.04 -25 6.08 -25 2 C-24.01 2.495 -24.01 2.495 -23 3 C-23 4.32 -23 5.64 -23 7 C-15.74 6.67 -8.48 6.34 -1 6 C-0.67 4.02 -0.34 2.04 0 0 Z ",
        fill: "#7C41E4",
        transform: "translate(26,8)"
      }
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C5.94 0 11.88 0 18 0 C18 0.33 18 0.66 18 1 C13.545 1.495 13.545 1.495 9 2 C8.67 3.65 8.34 5.3 8 7 C3.25 8.125 3.25 8.125 1 7 C0.67 4.69 0.34 2.38 0 0 Z M4 1 C5 4 5 4 5 4 Z ",
        fill: "#9869E9",
        transform: "translate(6,17)"
      }
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C1.134375 0.020625 2.26875 0.04125 3.4375 0.0625 C3.480221 1.72861905 3.47813832 3.39632885 3.4375 5.0625 C2.4375 6.0625 2.4375 6.0625 -0.625 6.125 C-1.594375 6.104375 -2.56375 6.08375 -3.5625 6.0625 C-3.94468767 4.40635343 -4.27645102 2.73792976 -4.5625 1.0625 C-3.5625 0.0625 -3.5625 0.0625 0 0 Z ",
        fill: "#844DE6",
        transform: "translate(19.5625,17.9375)"
      }
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C0 1.65 0 3.3 0 5 C-2.49064888 5.68707555 -4.37886292 6 -7 6 C-7 4.02 -7 2.04 -7 0 C-4.3333581 -1.33332095 -2.83319697 -0.67102033 0 0 Z ",
        fill: "#844DE5",
        transform: "translate(14,8)"
      }
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C0.33 0 0.66 0 1 0 C1 4.29 1 8.58 1 13 C1.99 12.67 2.98 12.34 4 12 C4 12.66 4 13.32 4 14 C4.66 14.33 5.32 14.66 6 15 C4.02 15.99 4.02 15.99 2 17 C-0.49118953 13.2632157 -0.2065226 11.25548181 -0.125 6.8125 C-0.10695312 5.54019531 -0.08890625 4.26789062 -0.0703125 2.95703125 C-0.04710937 1.98121094 -0.02390625 1.00539063 0 0 Z ",
        fill: "#935FE8",
        transform: "translate(0,9)"
      }
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C1.65 0.33 3.3 0.66 5 1 C4.25 3.4375 4.25 3.4375 3 6 C0.875 6.8125 0.875 6.8125 -1 7 C-1 6.34 -1 5.68 -1 5 C-1.66 4.67 -2.32 4.34 -3 4 C-1.68 3.34 -0.36 2.68 1 2 C0.67 1.34 0.34 0.68 0 0 Z ",
        fill: "#9768E9",
        transform: "translate(17,24)"
      }
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "path",
      {
        d: "M0 0 C0.99 0 1.98 0 3 0 C2.67 1.32 2.34 2.64 2 4 C0.68 4.33 -0.64 4.66 -2 5 C-1.34 3.35 -0.68 1.7 0 0 Z ",
        fill: "#8048E5",
        transform: "translate(9,2)"
      }
    )
  );
};
var Polygon_zkEVM_default = PolygonzkEVM;

// src/assets/icons/Loader.tsx
var import_react13 = __toESM(require("react"), 1);
var Loader = ({ width = 50, height = 49, ...rest }) => {
  return /* @__PURE__ */ import_react13.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 50 49",
      fill: "none",
      className: "loader",
      ...rest
    },
    /* @__PURE__ */ import_react13.default.createElement(
      "path",
      {
        d: "M25 17.0731V13.4146M30.3125 19.2072L33 16.5853M32.5 24.3902H36.25M30.3125 29.5731L33 32.195M25 31.7072V35.3658M19.6875 29.5731L17 32.195M17.5 24.3902H13.75M19.6875 19.2072L17 16.5853",
        stroke: "#86B8CE",
        strokeWidth: "2.43902",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
};
var Loader_default = Loader;

// src/assets/icons/Error.tsx
var import_react14 = __toESM(require("react"), 1);
var Error2 = ({ width = 21, height = 20, ...rest }) => {
  return /* @__PURE__ */ import_react14.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 21 20",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react14.default.createElement("circle", { cx: "10.9331", cy: "10", r: "10", fill: "#B90000" }),
    /* @__PURE__ */ import_react14.default.createElement("rect", { x: "8.93311", y: "3", width: "4", height: "9", rx: "2", fill: "white" }),
    /* @__PURE__ */ import_react14.default.createElement("rect", { x: "8.93311", y: "13", width: "4", height: "4", rx: "2", fill: "white" })
  );
};
var Error_default = Error2;

// src/assets/icons/Avalanche.tsx
var import_react15 = __toESM(require("react"), 1);
var Avalanche = ({ width = 29, height = 29, ...rest }) => {
  return /* @__PURE__ */ import_react15.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 30 29",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react15.default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M29.8779 14.5C29.8779 22.5082 23.3854 29 15.3762 29C7.36707 29 0.874512 22.5082 0.874512 14.5C0.874512 6.49179 7.36707 0 15.3762 0C23.3854 0 29.8779 6.49179 29.8779 14.5ZM11.2669 20.2703H8.45247C7.86101 20.2703 7.56905 20.2703 7.39082 20.1563C7.19849 20.0316 7.08089 19.825 7.0666 19.597C7.05598 19.3869 7.20197 19.1303 7.49412 18.6175L14.4432 6.37035C14.7388 5.8502 14.8884 5.59032 15.0773 5.49397C15.2804 5.39068 15.5226 5.39068 15.7257 5.49397C15.9146 5.59013 16.0642 5.8502 16.3599 6.37035L17.7884 8.86373L17.7957 8.87647C18.1151 9.43446 18.2771 9.71732 18.3478 10.0143C18.4262 10.3384 18.4262 10.6804 18.3478 11.0046C18.2766 11.3038 18.1163 11.5888 17.7921 12.1551L14.1419 18.6067L14.1325 18.6233C13.811 19.186 13.6482 19.4709 13.4223 19.686C13.1764 19.9212 12.8808 20.0921 12.5566 20.1884C12.261 20.2703 11.9296 20.2703 11.2669 20.2703ZM18.3741 20.2703H22.4067C23.0017 20.2703 23.301 20.2703 23.4792 20.1529C23.6715 20.0281 23.7926 19.8179 23.8034 19.5901C23.8137 19.3868 23.6708 19.1402 23.3908 18.6571C23.3811 18.6407 23.3715 18.6239 23.3616 18.6069L21.3416 15.1516L21.3186 15.1126C21.0348 14.6326 20.8915 14.3903 20.7075 14.2967C20.5045 14.1934 20.2657 14.1934 20.0627 14.2967C19.8775 14.3928 19.7279 14.6458 19.4323 15.1551L17.4194 18.6104L17.4124 18.6224C17.1178 19.1309 16.9706 19.385 16.9813 19.5935C16.9955 19.8216 17.1131 20.0316 17.3055 20.1563C17.48 20.2703 17.7793 20.2703 18.3743 20.2703H18.3741Z",
        fill: "#E84142"
      }
    )
  );
};
var Avalanche_default = Avalanche;

// src/assets/icons/Arbitrum.tsx
var import_react16 = __toESM(require("react"), 1);
var Arbitrum = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ import_react16.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 33 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react16.default.createElement(
      "path",
      {
        d: "M2.84064 10.032V22.968C2.84064 23.7996 3.27629 24.552 4.00237 24.9744L15.2105 31.4424C15.9234 31.8516 16.8079 31.8516 17.5208 31.4424L28.7289 24.9744C29.4418 24.5652 29.8906 23.7996 29.8906 22.968V10.032C29.8906 9.2004 29.455 8.448 28.7289 8.0256L17.5208 1.5576C16.8079 1.1484 15.9234 1.1484 15.2105 1.5576L4.00237 8.0256C3.28949 8.4348 2.85384 9.2004 2.85384 10.032H2.84064Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "path",
      {
        d: "M18.8013 19.008L17.204 23.3904C17.1644 23.5092 17.1644 23.6412 17.204 23.7732L19.9499 31.3104L23.1315 29.4756L19.3162 19.008C19.2238 18.7704 18.8938 18.7704 18.8013 19.008Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "path",
      {
        d: "M22.0094 11.6424C21.917 11.4048 21.5869 11.4048 21.4945 11.6424L19.8971 16.0248C19.8575 16.1436 19.8575 16.2756 19.8971 16.4076L24.3989 28.7496L27.5804 26.9148L22.0094 11.6556V11.6424Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "path",
      {
        d: "M16.3592 2.046C16.4384 2.046 16.5176 2.0724 16.5836 2.112L28.7026 9.108C28.8479 9.1872 28.9271 9.3456 28.9271 9.504V23.496C28.9271 23.6544 28.8347 23.8128 28.7026 23.892L16.5836 30.888C16.5176 30.9276 16.4384 30.954 16.3592 30.954C16.28 30.954 16.2008 30.9276 16.1348 30.888L4.01574 23.892C3.87052 23.8128 3.79131 23.6544 3.79131 23.496V9.4908C3.79131 9.3324 3.88373 9.174 4.01574 9.0948L16.1348 2.0988C16.2008 2.0592 16.28 2.0328 16.3592 2.0328V2.046ZM16.3592 0C15.9235 0 15.5011 0.1056 15.105 0.33L2.98602 7.326C2.20713 7.7748 1.73187 8.5932 1.73187 9.4908V23.4828C1.73187 24.3804 2.20713 25.1988 2.98602 25.6476L15.105 32.6436C15.4879 32.868 15.9235 32.9736 16.3592 32.9736C16.7948 32.9736 17.2173 32.868 17.6133 32.6436L29.7324 25.6476C30.5113 25.1988 30.9865 24.3804 30.9865 23.4828V9.4908C30.9865 8.5932 30.5113 7.7748 29.7324 7.326L17.6001 0.33C17.2173 0.1056 16.7816 0 16.346 0H16.3592Z",
        fill: "#9DCCED"
      }
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "path",
      {
        d: "M8.3327 28.7628L9.45483 25.7004L11.6991 27.5616L9.60005 29.4888L8.3327 28.7628Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "path",
      {
        d: "M15.3295 8.5008H12.2535C12.0291 8.5008 11.8178 8.646 11.7386 8.8572L5.15106 26.9148L8.33264 28.7496L15.5935 8.8572C15.6595 8.6724 15.5275 8.4876 15.3427 8.4876L15.3295 8.5008Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "path",
      {
        d: "M20.7157 8.5008H17.6397C17.4153 8.5008 17.2041 8.646 17.1249 8.8572L9.59998 29.4756L12.7815 31.3104L20.9665 8.8572C21.0325 8.6724 20.9005 8.4876 20.7157 8.4876V8.5008Z",
        fill: "white"
      }
    )
  );
};
var Arbitrum_default = Arbitrum;

// src/assets/icons/Optimism.tsx
var import_react17 = __toESM(require("react"), 1);
var Optimism = ({ width = 31, height = 30, ...rest }) => {
  return /* @__PURE__ */ import_react17.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 31 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react17.default.createElement(
      "path",
      {
        d: "M15.8719 30C24.1572 30 30.8737 23.2843 30.8737 15C30.8737 6.71573 24.1572 0 15.8719 0C7.5867 0 0.870178 6.71573 0.870178 15C0.870178 23.2843 7.5867 30 15.8719 30Z",
        fill: "#FF0420"
      }
    ),
    /* @__PURE__ */ import_react17.default.createElement(
      "path",
      {
        d: "M11.4976 18.984C10.6035 18.984 9.87137 18.774 9.3013 18.354C8.73723 17.928 8.4552 17.316 8.4552 16.53C8.4552 16.362 8.4732 16.164 8.50921 15.924C8.60522 15.384 8.74323 14.736 8.92325 13.974C9.43331 11.91 10.7535 10.878 12.8777 10.878C13.4538 10.878 13.9758 10.974 14.4319 11.172C14.888 11.358 15.248 11.646 15.512 12.03C15.7761 12.408 15.9081 12.858 15.9081 13.38C15.9081 13.536 15.8901 13.734 15.8541 13.974C15.7401 14.64 15.608 15.294 15.446 15.924C15.182 16.95 14.7319 17.724 14.0839 18.234C13.4418 18.738 12.5777 18.984 11.4976 18.984ZM11.6596 17.364C12.0796 17.364 12.4337 17.238 12.7277 16.992C13.0277 16.746 13.2438 16.368 13.3698 15.852C13.5438 15.144 13.6758 14.532 13.7658 14.004C13.7958 13.848 13.8138 13.686 13.8138 13.518C13.8138 12.834 13.4598 12.492 12.7457 12.492C12.3257 12.492 11.9656 12.618 11.6656 12.864C11.3715 13.11 11.1615 13.488 11.0355 14.004C10.8975 14.508 10.7655 15.12 10.6275 15.852C10.5975 16.002 10.5795 16.158 10.5795 16.326C10.5734 17.022 10.9395 17.364 11.6596 17.364Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ import_react17.default.createElement(
      "path",
      {
        d: "M16.43 18.876C16.346 18.876 16.286 18.852 16.238 18.798C16.202 18.738 16.19 18.672 16.202 18.594L17.7562 11.274C17.7682 11.19 17.8102 11.124 17.8822 11.07C17.9482 11.016 18.0202 10.992 18.0982 10.992H21.0926C21.9267 10.992 22.5928 11.166 23.0968 11.508C23.6069 11.856 23.8649 12.354 23.8649 13.008C23.8649 13.194 23.8409 13.392 23.7989 13.596C23.6129 14.46 23.2348 15.096 22.6588 15.51C22.0947 15.924 21.3206 16.128 20.3365 16.128H18.8183L18.3023 18.594C18.2843 18.678 18.2483 18.744 18.1762 18.798C18.1102 18.852 18.0382 18.876 17.9602 18.876H16.43ZM20.4145 14.574C20.7325 14.574 21.0026 14.49 21.2366 14.316C21.4766 14.142 21.6326 13.896 21.7107 13.572C21.7347 13.446 21.7467 13.332 21.7467 13.236C21.7467 13.02 21.6807 12.852 21.5546 12.738C21.4286 12.618 21.2066 12.558 20.9006 12.558H19.5504L19.1244 14.574H20.4145Z",
        fill: "white"
      }
    )
  );
};
var Optimism_default = Optimism;

// src/assets/icons/USDC.tsx
var import_react18 = __toESM(require("react"), 1);
var USDC = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ import_react18.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react18.default.createElement("rect", { width: "37", height: "37", fill: "url(#pattern4)" }),
    /* @__PURE__ */ import_react18.default.createElement("defs", null, /* @__PURE__ */ import_react18.default.createElement(
      "pattern",
      {
        id: "pattern4",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ import_react18.default.createElement("use", { href: "#image0_214_308", transform: "scale(0.00552486)" })
    ), /* @__PURE__ */ import_react18.default.createElement(
      "image",
      {
        id: "image0_214_308",
        width: "181",
        height: "181",
        href: "data:image/png;base64,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"
      }
    ))
  );
};
var USDC_default = USDC;

// src/assets/icons/USDT.tsx
var import_react19 = __toESM(require("react"), 1);
var USDT = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ import_react19.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react19.default.createElement("rect", { width: "37", height: "37", fill: "url(#pattern5)" }),
    /* @__PURE__ */ import_react19.default.createElement("defs", null, /* @__PURE__ */ import_react19.default.createElement(
      "pattern",
      {
        id: "pattern5",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ import_react19.default.createElement("use", { href: "#image0_214_312", transform: "scale(0.00390625)" })
    ), /* @__PURE__ */ import_react19.default.createElement(
      "image",
      {
        id: "image0_214_312",
        width: "256",
        height: "256",
        href: "data:image/png;base64,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"
      }
    ))
  );
};
var USDT_default = USDT;

// src/assets/icons/USDK.tsx
var import_react20 = __toESM(require("react"), 1);
var USDT2 = ({ width = 23, height = 23, ...rest }) => {
  return /* @__PURE__ */ import_react20.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 23 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react20.default.createElement(
      "path",
      {
        d: "M21.7206 25.7417C20.9608 25.001 19.9922 24.6072 19.0104 24.5498H19.0131C15.2454 24.4272 14.705 21.3028 14.705 20.5151C14.705 19.6545 15.3029 16.6395 19.0052 16.5222C19.9869 16.4674 20.9556 16.071 21.7154 15.3303C23.389 13.7002 23.4256 11.0243 21.7937 9.35256C20.9687 8.50494 19.8721 8.07982 18.7755 8.07461H18.7467C17.6867 8.07722 16.6266 8.47625 15.8068 9.27432C14.9086 10.148 14.5326 11.3217 14.5326 12.4823C14.5326 13.4994 13.859 16.2874 10.7285 16.2874C9.55091 16.2874 8.31332 16.6317 7.41253 17.555C7.37337 17.5941 7.34204 17.641 7.30548 17.6828V17.6671C7.09138 17.8914 7.04961 17.7141 7.05222 17.5915V0.578993C7.05222 0.2582 6.79373 0 6.47259 0H0.579635C0.258486 0 0 0.2582 0 0.578993V31.7872C0 32.108 0.258486 32.3662 0.579635 32.3662H6.47781C6.79896 32.3662 7.05744 32.108 7.05744 31.7872V23.4883C7.05744 23.3658 7.09922 23.1884 7.31593 23.4127V23.3997C7.34987 23.4388 7.37859 23.4831 7.41514 23.5222C8.31854 24.4481 9.53525 24.7898 10.7363 24.7898C13.8695 24.7898 14.5405 27.9403 14.5405 28.595C14.5405 29.4947 14.9191 30.9292 15.8146 31.8003C16.6371 32.601 17.7024 33 18.765 33H18.7676C19.8695 33 20.9687 32.5723 21.799 31.722C22.5979 30.9031 22.9974 29.8442 23 28.7853V28.7593C22.9974 27.6639 22.5692 26.5685 21.7206 25.7443",
        fill: "#86B8CE"
      }
    )
  );
};
var USDK_default = USDT2;

// src/assets/icons/Fuse.tsx
var import_react21 = __toESM(require("react"), 1);

// src/assets/icons/Celo.tsx
var import_react22 = __toESM(require("react"), 1);

// src/assets/icons/GoodDollar.tsx
var import_react23 = __toESM(require("react"), 1);

// src/assets/icons/Copy.tsx
var import_react24 = __toESM(require("react"), 1);
var Copy = ({ width = 20, height = 20, fill = "#86B8CE", ...rest }) => {
  return /* @__PURE__ */ import_react24.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 17 19",
      fill,
      ...rest
    },
    /* @__PURE__ */ import_react24.default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.373779 0.750078C0.373779 0.362788 0.68774 0.0488281 1.07503 0.0488281H12.2125C12.5998 0.0488281 12.9138 0.362788 12.9138 0.750078C12.9138 1.13737 12.5998 1.45133 12.2125 1.45133H1.77628V12.8157C1.77628 13.203 1.46232 13.517 1.07503 13.517C0.68774 13.517 0.373779 13.203 0.373779 12.8157V0.750078Z",
        fill
      }
    ),
    /* @__PURE__ */ import_react24.default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4.0863 4.46297C4.0863 4.07568 4.40026 3.76172 4.78755 3.76172H15.9251C16.3123 3.76172 16.6263 4.07568 16.6263 4.46297V15.6005C16.6263 16.2788 16.3569 16.9293 15.8772 17.4089C15.3976 17.8885 14.7471 18.158 14.0688 18.158H6.6438C5.96551 18.158 5.315 17.8885 4.83538 17.4089C4.35575 16.9293 4.0863 16.2788 4.0863 15.6005V4.46297ZM5.4888 5.16422V15.6005C5.4888 15.9068 5.61049 16.2006 5.8271 16.4172C6.0437 16.6338 6.33748 16.7555 6.6438 16.7555H14.0688C14.3751 16.7555 14.6689 16.6338 14.8855 16.4172C15.1021 16.2006 15.2238 15.9068 15.2238 15.6005V5.16422H5.4888Z",
        fill
      }
    )
  );
};
var Copy_default = Copy;

// src/assets/icons/Bank.tsx
var import_react25 = __toESM(require("react"), 1);
var Bank = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ import_react25.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 256 256",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react25.default.createElement("defs", null),
    /* @__PURE__ */ import_react25.default.createElement(
      "g",
      {
        style: {
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1
        },
        transform: "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      },
      /* @__PURE__ */ import_react25.default.createElement(
        "path",
        {
          d: "M 84.668 38.004 v -6.27 H 90 V 20 L 45 3.034 L 0 20 v 11.734 h 5.332 v 6.27 h 4.818 v 30.892 H 5.332 v 6.271 H 0 v 11.8 h 90 v -11.8 h -5.332 v -6.271 H 79.85 V 38.004 H 84.668 z M 81.668 35.004 H 66.332 v -3.27 h 15.336 V 35.004 z M 63.332 68.896 v 6.271 h -7.664 v -6.271 H 50.85 V 38.004 h 4.818 v -6.27 h 7.664 v 6.27 h 4.818 v 30.892 H 63.332 z M 26.668 38.004 v -6.27 h 7.664 v 6.27 h 4.818 v 30.892 h -4.818 v 6.271 h -7.664 v -6.271 H 21.85 V 38.004 H 26.668 z M 42.15 68.896 V 38.004 h 5.7 v 30.892 H 42.15 z M 37.332 35.004 v -3.27 h 15.336 v 3.27 H 37.332 z M 37.332 71.896 h 15.336 v 3.271 H 37.332 V 71.896 z M 3 22.075 L 45 6.24 l 42 15.835 v 6.659 H 3 V 22.075 z M 8.332 31.734 h 15.336 v 3.27 H 8.332 V 31.734 z M 13.15 38.004 h 5.7 v 30.892 h -5.7 V 38.004 z M 8.332 71.896 h 15.336 v 3.271 H 8.332 V 71.896 z M 87 83.966 H 3 v -5.8 h 84 V 83.966 z M 81.668 75.166 H 66.332 v -3.271 h 15.336 V 75.166 z M 76.85 68.896 H 71.15 V 38.004 h 5.699 V 68.896 z",
          style: { stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1 },
          transform: " matrix(1 0 0 1 0 0) ",
          strokeLinecap: "round"
        }
      )
    )
  );
};
var Bank_default = Bank;

// src/assets/icons/BSC.tsx
var import_react26 = __toESM(require("react"), 1);
var BNB = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ import_react26.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react26.default.createElement(
      "path",
      {
        d: "M9.17376 12.6062L15 6.78L20.829 12.6088L24.219 9.21876L15 0L5.784 9.216L9.17388 12.606M0 15L3.39012 11.6094L6.78 14.9993L3.38988 18.3894L0 15ZM9.17376 17.3941L15 23.22L20.8289 17.3914L24.2207 20.7796L24.219 20.7814L15 30L5.784 20.784L5.7792 20.7792L9.17412 17.3938M23.22 15.0014L26.6101 11.6113L30 15.0012L26.61 18.3913L23.22 15.0014Z",
        fill: "#F3BA2F"
      }
    ),
    /* @__PURE__ */ import_react26.default.createElement(
      "path",
      {
        d: "M18.4383 14.9981H18.4397L15.0001 11.5582L12.4576 14.0999L12.1655 14.3921L11.5631 14.9947L11.5583 14.9993L11.5631 15.0043L15.0001 18.4417L18.44 15.0017L18.4417 14.9998L18.4385 14.9981",
        fill: "#F3BA2F"
      }
    )
  );
};
var BSC_default = BNB;

// src/assets/icons/KEUR.tsx
var import_react27 = __toESM(require("react"), 1);
var KEUR = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ import_react27.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react27.default.createElement("g", { fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ import_react27.default.createElement("circle", { cx: "16", cy: "16", fill: "#0f8ff8", r: "16" }), /* @__PURE__ */ import_react27.default.createElement(
      "path",
      {
        d: "M8 19.004L8.81 17h.857a16.279 16.279 0 01-.034-1.03c0-.448.019-.864.056-1.25H8l.81-2.003h1.274C11.27 8.906 13.944 7 18.103 7c1.367 0 2.666.177 3.897.532v2.524a8.92 8.92 0 00-3.683-.776c-2.493 0-4.096 1.146-4.81 3.438h7.423l-.81 2.003h-7.097a6.938 6.938 0 00-.056.995c0 .479.015.907.045 1.285h6.183l-.8 2.003H13.44c.533 1.389 1.183 2.355 1.949 2.9.765.544 1.858.816 3.277.816 1.014 0 2.125-.247 3.334-.741v2.373c-1.149.432-2.515.648-4.1.648-4.167 0-6.803-1.999-7.906-5.996z",
        fill: "#ffffff"
      }
    ))
  );
};
var KEUR_default = KEUR;

// src/assets/icons/Tron.tsx
var import_react28 = __toESM(require("react"), 1);
var Tron = ({ width = 30, height = 28, ...rest }) => {
  return /* @__PURE__ */ import_react28.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 29 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react28.default.createElement(
      "path",
      {
        d: "M28.6056 9.03778C27.1753 7.73936 25.1967 5.75657 23.5853 4.35034L23.4899 4.28472C23.3313 4.15946 23.1524 4.06122 22.9607 3.9941C19.0751 3.28161 0.99166 -0.0417889 0.638858 0.000398088C0.540001 0.0140104 0.445508 0.0492499 0.362337 0.103522L0.271753 0.173833C0.160212 0.285207 0.0754953 0.419757 0.023838 0.567578L0 0.628515V0.961323V1.01288C2.03576 6.58625 10.0739 24.8438 11.6568 29.1281C11.7521 29.4188 11.9333 29.9719 12.2718 30H12.3481C12.5292 30 13.3016 28.9969 13.3016 28.9969C13.3016 28.9969 27.1085 12.5346 28.5054 10.7815C28.6863 10.5656 28.8459 10.3333 28.9822 10.0878C29.017 9.89567 29.0006 9.69799 28.9346 9.51398C28.8686 9.32998 28.7552 9.16591 28.6056 9.03778ZM16.8439 10.9549L22.7367 6.15032L26.1932 9.28152L16.8439 10.9549ZM14.5555 10.6409L4.41002 2.46599L20.8249 5.44251L14.5555 10.6409ZM15.4708 12.783L25.8547 11.1378L13.9834 25.2001L15.4708 12.783ZM3.03219 3.2816L13.7068 12.1877L12.1621 25.2094L3.03219 3.2816Z",
        fill: "#FF060A"
      }
    )
  );
};
var Tron_default = Tron;

// src/assets/icons/BTC.tsx
var import_react29 = __toESM(require("react"), 1);
var BTC = ({ width = 28, height = 28, ...rest }) => {
  return /* @__PURE__ */ import_react29.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 21 28",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react29.default.createElement(
      "path",
      {
        d: "M19.4041 8.61541C19.6137 10.6571 18.8511 12.1042 17.1161 12.9568C18.4783 13.2709 19.4972 13.8486 20.1725 14.69C20.8477 15.5313 21.1099 16.7318 20.9584 18.291C20.8769 19.0875 20.6877 19.7886 20.3908 20.3944C20.0939 21.0002 19.7184 21.4994 19.2642 21.892C18.8101 22.2846 18.2455 22.6128 17.5701 22.8764C16.8948 23.1401 16.1873 23.3335 15.448 23.4568C14.7086 23.5801 13.8615 23.6643 12.9068 23.7092V27.9999H10.2171V23.7765C9.28563 23.7765 8.57533 23.7709 8.08629 23.7596V28H5.39686V23.7091C5.1873 23.7091 4.87292 23.7063 4.4537 23.7007C4.03446 23.6951 3.71429 23.6922 3.49317 23.6922H0L0.541458 20.6129H2.48022C3.06236 20.6129 3.40008 20.3269 3.49317 19.7547V8.14428C3.34184 7.38139 2.82372 7.00008 1.93876 7.00008H0V4.2404L3.70272 4.25727C4.44792 4.25727 5.01271 4.2517 5.39689 4.2404V0H8.08663V4.15628C9.04139 4.13379 9.75169 4.12265 10.2174 4.12265V0H12.9071V4.2404C13.827 4.31895 14.642 4.44514 15.3523 4.61899C16.0626 4.79283 16.7205 5.04522 17.3259 5.37613C17.9314 5.70705 18.4117 6.14459 18.7669 6.68857C19.1218 7.23272 19.3343 7.87501 19.4041 8.61541ZM15.649 17.786C15.649 17.3821 15.5617 17.0231 15.387 16.709C15.2124 16.395 14.9969 16.1369 14.7409 15.935C14.4847 15.7331 14.15 15.5619 13.7367 15.4218C13.3234 15.2815 12.942 15.1778 12.5927 15.1104C12.2434 15.0432 11.8126 14.9927 11.3003 14.959C10.7879 14.9254 10.3862 14.9085 10.0952 14.9085C9.80407 14.9085 9.42849 14.9141 8.9686 14.9254C8.50867 14.9366 8.23214 14.9423 8.13905 14.9423V20.6298C8.23218 20.6298 8.44765 20.6326 8.7852 20.6382C9.12292 20.6438 9.40223 20.6467 9.62353 20.6467C9.84482 20.6467 10.1532 20.6382 10.5492 20.6215C10.9451 20.6048 11.2856 20.5823 11.5709 20.5543C11.8562 20.5262 12.1879 20.4786 12.5665 20.4112C12.9449 20.344 13.2681 20.2654 13.5358 20.1756C13.8036 20.0858 14.0801 19.9681 14.3654 19.8222C14.6506 19.6764 14.8805 19.5081 15.0552 19.3174C15.2298 19.1267 15.3725 18.9023 15.483 18.6444C15.5934 18.3863 15.649 18.1002 15.649 17.786ZM14.409 9.77635C14.409 9.40621 14.3362 9.07799 14.1907 8.79197C14.0451 8.50596 13.8675 8.27031 13.658 8.08516C13.4484 7.90001 13.1689 7.74307 12.8197 7.61399C12.4704 7.48494 12.1502 7.3925 11.8591 7.33627C11.568 7.2802 11.21 7.23524 10.785 7.20161C10.3599 7.16799 10.0222 7.15397 9.77203 7.15954C9.52166 7.16511 9.20727 7.17068 8.82887 7.17641C8.45047 7.18198 8.22044 7.18487 8.13905 7.18487V12.3507C8.19728 12.3507 8.3982 12.3535 8.74153 12.3591C9.08503 12.3647 9.35574 12.3647 9.5537 12.3591C9.75165 12.3536 10.0427 12.3423 10.4269 12.3255C10.8111 12.3086 11.1313 12.2779 11.3875 12.2329C11.6436 12.188 11.9435 12.1263 12.287 12.0478C12.6305 11.9692 12.9128 11.8655 13.134 11.7364C13.3553 11.6074 13.5706 11.456 13.7802 11.2822C13.9897 11.1083 14.147 10.8923 14.2517 10.6343C14.3564 10.3764 14.409 10.0905 14.409 9.77635Z",
        fill: "#FDA806"
      }
    )
  );
};
var BTC_default = BTC;

// src/assets/icons/Wallet.tsx
var import_react30 = __toESM(require("react"), 1);
var Wallet = ({ width = 28, height = 23, ...rest }) => {
  return /* @__PURE__ */ import_react30.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 28 23",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react30.default.createElement(
      "path",
      {
        d: "M23.0751 11.375C23.0751 11.7198 22.9381 12.0504 22.6943 12.2942C22.4505 12.538 22.1199 12.675 21.7751 12.675C21.4303 12.675 21.0997 12.538 20.8559 12.2942C20.6121 12.0504 20.4751 11.7198 20.4751 11.375C20.4751 11.0302 20.6121 10.6996 20.8559 10.4558C21.0997 10.212 21.4303 10.075 21.7751 10.075C22.1199 10.075 22.4505 10.212 22.6943 10.4558C22.9381 10.6996 23.0751 11.0302 23.0751 11.375Z",
        fill: "#86B8CE"
      }
    ),
    /* @__PURE__ */ import_react30.default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11.3022 0H15.3478C17.7372 0 19.63 1.54972e-07 21.1107 0.1989C22.6343 0.4043 23.868 0.8359 24.8417 1.8083C26.0429 3.0108 26.4264 4.6202 26.5655 6.7093C27.3156 7.0382 27.8824 7.7363 27.9435 8.6203C27.95 8.6996 27.95 8.7841 27.95 8.8621V13.8879C27.95 13.9659 27.95 14.0504 27.9448 14.1284C27.8824 15.0124 27.3156 15.7118 26.5655 16.042C26.4264 18.1298 26.0429 19.7392 24.8417 20.9417C23.868 21.9141 22.6343 22.3457 21.1107 22.5511C19.6287 22.75 17.7372 22.75 15.3478 22.75H11.3022C8.9128 22.75 7.02 22.75 5.5393 22.5511C4.0157 22.3457 2.782 21.9141 1.8083 20.9417C0.8359 19.968 0.4043 18.7343 0.1989 17.2107C0 15.7287 0 13.8372 0 11.4478V11.3022C0 8.9128 0 7.02 0.1989 5.5393C0.4043 4.0157 0.8359 2.782 1.8083 1.8083C2.782 0.8359 4.0157 0.4043 5.5393 0.1989C7.0213 1.54972e-07 8.9128 0 11.3022 0ZM24.5934 16.25H22.074C19.2855 16.25 16.8987 14.1336 16.8987 11.375C16.8987 8.6164 19.2855 6.5 22.0727 6.5H24.5921C24.4439 4.7567 24.1098 3.835 23.4611 3.1876C22.9112 2.6377 22.1572 2.3075 20.8494 2.132C19.5143 1.9526 17.7528 1.95 15.2737 1.95H11.3737C8.8946 1.95 7.1344 1.9526 5.7967 2.132C4.4902 2.3075 3.7362 2.6377 3.1863 3.1876C2.6364 3.7375 2.3062 4.4915 2.1307 5.7993C1.9513 7.1357 1.9487 8.8959 1.9487 11.375C1.9487 13.8541 1.9513 15.6156 2.1307 16.952C2.3062 18.2585 2.6364 19.0125 3.1863 19.5624C3.7362 20.1123 4.4902 20.4425 5.798 20.618C7.1344 20.7974 8.8946 20.8 11.3737 20.8H15.2737C17.7528 20.8 19.5143 20.7974 20.8507 20.618C22.1572 20.4425 22.9112 20.1123 23.4611 19.5624C24.1098 18.915 24.4452 17.9946 24.5934 16.25ZM25.5762 8.45H22.074C20.2228 8.45 18.8487 9.8267 18.8487 11.375C18.8487 12.9233 20.2228 14.3 22.0727 14.3H25.6061C25.8739 14.2831 25.9896 14.1024 25.9987 13.9932V8.7568C25.9896 8.6476 25.8739 8.4669 25.6061 8.4513L25.5762 8.45Z",
        fill: "white"
      }
    )
  );
};
var Wallet_default = Wallet;

// src/assets/icons/Explorer.tsx
var import_react31 = __toESM(require("react"), 1);
var Explorer = ({ width = 40, height = 40, fill = "black", ...rest }) => {
  return /* @__PURE__ */ import_react31.default.createElement(
    "svg",
    {
      width: "21",
      height: "24",
      viewBox: "0 0 21 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react31.default.createElement(
      "path",
      {
        d: "M9.6 0.239388C10.1 -0.0606123 10.6 -0.0606123 11.1 0.139388L11.2 0.239388L20 5.23939C20.5 5.53939 20.8 6.03939 20.8 6.53939V16.6394C20.8 17.1394 20.5 17.7394 20.1 18.0394L20 18.1394L11.2 23.1394C10.7 23.4394 10.2 23.4394 9.7 23.2394L9.6 23.1394L0.8 18.1394C0.3 17.8394 0 17.3394 0 16.8394V6.73939C0 6.23939 0.3 5.63939 0.7 5.33939L0.8 5.23939L9.6 0.239388ZM19 7.83939L11.3 12.9394V20.9394L19 16.5394V7.83939ZM1.8 7.83939V16.6394L9.5 21.0394V13.0394L1.8 7.83939ZM10.4 1.93939L2.8 6.23939L10.4 11.3394L18 6.23939L10.4 1.93939Z",
        fill
      }
    )
  );
};
var Explorer_default = Explorer;

// src/assets/icons/ExternalUrl.tsx
var import_react32 = __toESM(require("react"), 1);
var ExternalUrl = ({ width = 40, height = 40, fill = "black", ...rest }) => {
  return /* @__PURE__ */ import_react32.default.createElement(
    "svg",
    {
      width: "40",
      height: "40",
      viewBox: "0 0 40 40",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react32.default.createElement(
      "path",
      {
        d: "M19.1699 11.6226H15.4812C12.7198 11.6226 10.4812 13.8611 10.4812 16.6226V24C10.4812 26.7614 12.7198 29 15.4812 29H22.8586C25.6201 29 27.8586 26.7614 27.8586 24V20.3113",
        stroke: fill,
        strokeWidth: "2"
      }
    ),
    /* @__PURE__ */ import_react32.default.createElement("mask", { id: "path-2-inside-1_883_418", fill: "white" }, /* @__PURE__ */ import_react32.default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M30.4872 9.53075C30.5107 9.22503 30.2561 8.97036 29.9503 8.99388L22.9271 9.53412C22.5012 9.56689 22.3099 10.0841 22.6119 10.3862L24.616 12.3902C24.8112 12.5855 24.8112 12.9021 24.616 13.0973L18.9543 18.7591C18.4661 19.2472 18.4661 20.0387 18.9543 20.5268C19.4424 21.015 20.2339 21.015 20.722 20.5268L26.3837 14.8651C26.579 14.6698 26.8956 14.6698 27.0908 14.8651L29.0949 16.8692C29.3969 17.1712 29.9142 16.9799 29.947 16.5539L30.4872 9.53075Z"
      }
    )),
    /* @__PURE__ */ import_react32.default.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M30.4872 9.53075C30.5107 9.22503 30.2561 8.97036 29.9503 8.99388L22.9271 9.53412C22.5012 9.56689 22.3099 10.0841 22.6119 10.3862L24.616 12.3902C24.8112 12.5855 24.8112 12.9021 24.616 13.0973L18.9543 18.7591C18.4661 19.2472 18.4661 20.0387 18.9543 20.5268C19.4424 21.015 20.2339 21.015 20.722 20.5268L26.3837 14.8651C26.579 14.6698 26.8956 14.6698 27.0908 14.8651L29.0949 16.8692C29.3969 17.1712 29.9142 16.9799 29.947 16.5539L30.4872 9.53075Z",
        fill
      }
    ),
    /* @__PURE__ */ import_react32.default.createElement(
      "path",
      {
        d: "M18.9543 18.7591L18.2471 18.0519L18.9543 18.7591ZM18.9543 20.5268L18.2471 21.2339L18.9543 20.5268ZM20.722 20.5268L20.0149 19.8197L20.722 20.5268ZM29.0949 16.8692L29.802 16.162L29.0949 16.8692ZM24.616 12.3902L23.9089 13.0973L24.616 12.3902ZM26.3837 14.8651L25.6766 14.158L26.3837 14.8651ZM27.0908 14.8651L27.7979 14.158L27.0908 14.8651ZM30.4872 9.53075L29.4902 9.45406L30.4872 9.53075ZM22.6119 10.3862L21.9048 11.0933L22.6119 10.3862ZM23.0038 10.5312L30.027 9.99093L29.8736 7.99682L22.8505 8.53707L23.0038 10.5312ZM25.3231 11.6831L23.319 9.6791L21.9048 11.0933L23.9089 13.0973L25.3231 11.6831ZM19.6614 19.4662L25.3231 13.8044L23.9089 12.3902L18.2471 18.0519L19.6614 19.4662ZM19.6614 19.8197C19.5637 19.7221 19.5637 19.5638 19.6614 19.4662L18.2471 18.0519C17.3685 18.9306 17.3685 20.3552 18.2471 21.2339L19.6614 19.8197ZM20.0149 19.8197C19.9173 19.9173 19.759 19.9173 19.6614 19.8197L18.2471 21.2339C19.1258 22.1126 20.5504 22.1126 21.4291 21.2339L20.0149 19.8197ZM25.6766 14.158L20.0149 19.8197L21.4291 21.2339L27.0908 15.5722L25.6766 14.158ZM29.802 16.162L27.7979 14.158L26.3837 15.5722L28.3878 17.5763L29.802 16.162ZM29.4902 9.45406L28.9499 16.4772L30.944 16.6306L31.4843 9.60745L29.4902 9.45406ZM28.3878 17.5763C29.294 18.4824 30.8457 17.9084 30.944 16.6306L28.9499 16.4772C28.9827 16.0513 29.4999 15.86 29.802 16.162L28.3878 17.5763ZM23.9089 13.0973C23.7136 12.9021 23.7136 12.5855 23.9089 12.3902L25.3231 13.8044C25.9089 13.2187 25.9089 12.2689 25.3231 11.6831L23.9089 13.0973ZM27.0908 15.5722C26.8956 15.7675 26.579 15.7675 26.3837 15.5722L27.7979 14.158C27.2122 13.5722 26.2624 13.5722 25.6766 14.158L27.0908 15.5722ZM30.027 9.99093C29.7213 10.0145 29.4666 9.75978 29.4902 9.45406L31.4843 9.60745C31.5548 8.69029 30.7908 7.92627 29.8736 7.99682L30.027 9.99093ZM22.8505 8.53707C21.5727 8.63536 20.9987 10.1871 21.9048 11.0933L23.319 9.6791C23.6211 9.98116 23.4298 10.4984 23.0038 10.5312L22.8505 8.53707Z",
        fill,
        mask: "url(#path-2-inside-1_883_418)"
      }
    )
  );
};
var ExternalUrl_default = ExternalUrl;

// src/assets/icons/Base.tsx
var import_react33 = __toESM(require("react"), 1);
var Base = ({ width = 27, height = 27, ...rest }) => {
  return /* @__PURE__ */ import_react33.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 111 111",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react33.default.createElement(
      "path",
      {
        d: "M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z",
        fill: "#0052FF"
      }
    )
  );
};
var Base_default = Base;

// src/assets/icons/USD.tsx
var import_react34 = __toESM(require("react"), 1);
var USD = ({ width = 30, height = 30, stroke = "#86B8CE", ...rest }) => {
  return (
    // Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools
    /* @__PURE__ */ import_react34.default.createElement(
      "svg",
      {
        width,
        height,
        viewBox: "0 0 44 44",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ import_react34.default.createElement(
        "path",
        {
          d: "M27.6671 24.5943C27.6671 21.802 25.9917 20.8447 22.6409 20.4458C20.2475 20.1267 19.7688 19.4885 19.7688 18.3714C19.7688 17.2544 20.5667 16.5365 22.1622 16.5365C23.5983 16.5365 24.3961 17.0152 24.795 18.2119C24.8748 18.4513 25.1142 18.6108 25.3535 18.6108H26.6299C26.949 18.6108 27.1884 18.3714 27.1884 18.0524V17.9726C26.8692 16.2174 25.4332 14.8612 23.5983 14.7017V12.7869C23.5983 12.4677 23.3589 12.2284 22.9601 12.1486H21.7634C21.4442 12.1486 21.2049 12.3879 21.125 12.7869V14.6218C18.7316 14.941 17.2159 16.5365 17.2159 18.5311C17.2159 21.1639 18.8114 22.2009 22.1622 22.5999C24.3961 22.9988 25.1142 23.4774 25.1142 24.754C25.1142 26.0305 23.9971 26.9081 22.4814 26.9081C20.407 26.9081 19.689 26.0303 19.4496 24.8336C19.37 24.5146 19.1306 24.355 18.8913 24.355H17.5349C17.2159 24.355 16.9766 24.5943 16.9766 24.9135V24.9933C17.2956 26.9877 18.5721 28.4237 21.2049 28.8228V30.7375C21.2049 31.0565 21.4442 31.2958 21.843 31.3757H23.0397C23.3589 31.3757 23.5983 31.1363 23.6781 30.7375V28.8228C26.0715 28.4237 27.6671 26.7484 27.6671 24.5943Z",
          fill: stroke
        }
      ),
      /* @__PURE__ */ import_react34.default.createElement(
        "path",
        {
          d: "M18.3306 32.9711C12.1077 30.7374 8.91647 23.7965 11.2302 17.6533C12.4269 14.3025 15.0597 11.7496 18.3306 10.5529C18.6498 10.3934 18.8093 10.1541 18.8093 9.75504V8.63818C18.8093 8.31899 18.6498 8.07965 18.3306 8C18.2508 8 18.0913 8 18.0114 8.07965C10.4324 10.4731 6.28372 18.531 8.67713 26.1101C10.1132 30.5777 13.5438 34.0083 18.0114 35.4444C18.3306 35.6039 18.6498 35.4444 18.7295 35.1252C18.8093 35.0455 18.8093 34.9657 18.8093 34.8062V33.6891C18.8093 33.4498 18.57 33.1308 18.3306 32.9711ZM26.7874 8.07965C26.4682 7.92016 26.149 8.07965 26.0694 8.39884C25.9895 8.47868 25.9895 8.55833 25.9895 8.71802V9.83488C25.9895 10.1541 26.2289 10.4731 26.4682 10.6328C32.6911 12.8665 35.8824 19.8074 33.5686 25.9506C32.3719 29.3014 29.7391 31.8543 26.4682 33.051C26.149 33.2105 25.9895 33.4498 25.9895 33.8488V34.9657C25.9895 35.2849 26.149 35.5242 26.4682 35.6039C26.5481 35.6039 26.7076 35.6039 26.7874 35.5242C34.3665 33.1308 38.5151 25.0729 36.1217 17.4938C34.6857 12.9463 31.1752 9.5157 26.7874 8.07965Z",
          fill: stroke
        }
      )
    )
  );
};
var USD_default = USD;

// src/assets/icons/Bera.tsx
var import_react35 = __toESM(require("react"), 1);
var Bera = ({ width = 31, height = 30, ...rest }) => {
  return /* @__PURE__ */ import_react35.default.createElement(
    "svg",
    {
      id: "svg",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0, 0, 400,408",
      ...rest
    },
    /* @__PURE__ */ import_react35.default.createElement("g", { id: "svgg" }, /* @__PURE__ */ import_react35.default.createElement(
      "path",
      {
        id: "path0",
        d: "M74.600 36.400 C 75.693 36.869,76.000 36.869,76.000 36.400 C 76.000 36.180,75.505 36.013,74.900 36.028 C 73.925 36.053,73.891 36.095,74.600 36.400 M121.600 36.400 C 121.600 36.869,121.907 36.869,123.000 36.400 C 123.709 36.095,123.675 36.053,122.700 36.028 C 122.095 36.013,121.600 36.180,121.600 36.400 M326.000 36.400 C 326.000 36.869,326.307 36.869,327.400 36.400 C 328.109 36.095,328.075 36.053,327.100 36.028 C 326.495 36.013,326.000 36.180,326.000 36.400 M333.200 36.692 C 333.530 36.817,333.932 37.118,334.094 37.360 C 334.275 37.631,334.390 37.532,334.394 37.100 C 334.398 36.630,334.105 36.410,333.500 36.432 C 332.899 36.453,332.799 36.539,333.200 36.692 M336.600 37.348 C 337.260 37.629,337.755 37.981,337.700 38.130 C 337.645 38.278,337.733 38.382,337.895 38.361 C 338.058 38.340,338.410 38.835,338.677 39.461 C 339.011 40.243,339.170 40.371,339.182 39.869 C 339.205 38.923,337.077 36.795,336.131 36.818 C 335.649 36.830,335.808 37.010,336.600 37.348 M63.505 38.429 C 63.123 38.652,62.618 39.232,62.383 39.717 C 61.985 40.540,61.996 40.550,62.546 39.868 C 62.870 39.465,63.465 38.886,63.868 38.580 C 64.722 37.933,64.509 37.844,63.505 38.429 M335.400 38.968 C 335.840 39.329,336.537 40.023,336.949 40.512 L 337.698 41.400 337.120 40.429 C 336.802 39.895,336.105 39.201,335.571 38.886 C 334.645 38.339,334.637 38.343,335.400 38.968 M131.867 39.467 C 131.396 39.937,131.582 40.382,132.156 40.161 C 132.819 39.907,135.457 42.121,135.808 43.225 C 136.107 44.167,136.800 44.253,136.800 43.347 C 136.800 41.849,132.705 38.628,131.867 39.467 M132.000 41.525 C 132.000 42.075,134.374 44.159,134.667 43.867 C 134.818 43.715,134.426 43.054,133.796 42.396 C 132.664 41.215,132.000 40.893,132.000 41.525 M338.640 41.906 C 338.882 42.068,339.183 42.470,339.308 42.800 C 339.461 43.201,339.547 43.101,339.568 42.500 C 339.590 41.895,339.370 41.602,338.900 41.606 C 338.468 41.610,338.369 41.725,338.640 41.906 M59.144 44.766 C 58.625 45.187,58.304 45.636,58.432 45.764 C 58.559 45.892,59.086 45.548,59.601 44.998 C 60.715 43.813,60.472 43.690,59.144 44.766 M262.629 44.300 C 262.828 44.465,263.103 44.750,263.240 44.934 C 263.377 45.117,263.598 44.982,263.732 44.634 C 263.907 44.177,263.736 44.000,263.121 44.000 C 262.651 44.000,262.430 44.135,262.629 44.300 M340.533 44.578 C 340.533 44.976,340.731 45.055,341.167 44.832 C 341.515 44.654,342.070 44.408,342.400 44.286 C 342.730 44.163,342.445 44.049,341.767 44.032 C 340.943 44.010,340.533 44.192,340.533 44.578 M55.859 44.797 C 57.017 45.265,57.424 46.013,56.751 46.439 C 56.334 46.703,56.324 46.789,56.713 46.794 C 56.994 46.797,57.332 46.521,57.463 46.181 C 57.724 45.500,56.568 44.418,55.600 44.438 C 55.252 44.445,55.361 44.596,55.859 44.797 M140.630 45.148 C 141.054 45.560,141.471 45.834,141.557 45.758 C 141.809 45.535,140.743 44.400,140.281 44.400 C 140.049 44.400,140.207 44.737,140.630 45.148 M143.149 45.064 C 142.646 45.673,142.676 45.681,143.512 45.164 C 144.304 44.674,144.475 44.679,144.806 45.200 C 145.132 45.712,145.189 45.697,145.194 45.100 C 145.202 44.201,143.881 44.178,143.149 45.064 M256.418 44.837 C 253.903 45.330,253.219 46.190,252.707 49.502 C 252.377 51.629,252.133 52.272,251.716 52.112 C 251.140 51.891,249.937 53.175,250.248 53.678 C 250.562 54.187,251.653 53.516,251.436 52.948 C 251.320 52.647,251.399 52.400,251.613 52.400 C 252.372 52.400,251.983 53.519,251.000 54.163 C 250.082 54.765,249.826 54.700,249.953 53.900 C 249.979 53.735,249.775 53.597,249.500 53.594 C 249.161 53.590,249.190 53.468,249.588 53.216 C 249.912 53.011,250.035 52.701,249.861 52.528 C 249.687 52.354,249.182 52.659,248.738 53.206 C 248.294 53.753,248.047 53.975,248.189 53.700 C 248.331 53.425,248.246 53.200,248.000 53.200 C 247.754 53.200,247.653 53.038,247.775 52.840 C 248.103 52.309,245.675 52.565,245.120 53.120 C 244.565 53.675,244.309 56.103,244.840 55.775 C 245.038 55.653,245.200 55.754,245.200 56.000 C 245.200 56.246,245.425 56.331,245.700 56.189 C 245.975 56.047,245.753 56.294,245.206 56.738 C 244.659 57.182,244.354 57.687,244.528 57.861 C 244.701 58.035,245.011 57.912,245.216 57.588 C 245.468 57.190,245.590 57.161,245.594 57.500 C 245.597 57.775,245.735 57.979,245.900 57.953 C 246.700 57.826,246.765 58.082,246.163 59.000 C 245.505 60.005,244.400 60.366,244.400 59.576 C 244.400 59.343,244.600 59.276,244.845 59.428 C 245.328 59.726,246.068 58.833,245.755 58.327 C 245.462 57.853,244.000 58.910,244.000 59.596 C 244.000 60.259,161.932 60.373,161.696 59.710 C 161.110 58.062,159.509 56.065,158.192 55.338 C 157.316 54.855,156.385 54.268,156.121 54.034 C 155.840 53.784,155.548 53.760,155.415 53.976 C 155.289 54.179,155.370 54.458,155.593 54.596 C 155.817 54.734,156.000 55.027,156.000 55.247 C 156.000 55.467,155.820 55.536,155.600 55.400 C 155.380 55.264,155.200 55.343,155.200 55.576 C 155.200 55.809,155.581 56.000,156.047 56.000 C 156.785 56.000,158.634 57.624,160.330 59.762 C 160.805 60.361,160.748 60.402,159.787 60.161 C 159.072 59.982,158.582 60.077,158.319 60.446 C 158.004 60.888,157.966 60.868,158.132 60.346 C 158.468 59.286,156.079 57.213,155.470 58.035 C 155.212 58.384,154.730 58.596,154.400 58.505 C 153.874 58.359,153.873 58.390,154.391 58.749 C 154.814 59.043,155.163 58.995,155.622 58.580 C 156.187 58.069,156.370 58.116,157.181 58.980 L 158.101 59.959 157.021 60.230 C 156.390 60.389,155.754 60.314,155.491 60.051 C 154.901 59.461,154.272 59.469,154.638 60.062 C 154.816 60.350,154.748 60.415,154.455 60.234 C 154.198 60.075,154.078 59.798,154.189 59.618 C 154.300 59.438,154.125 59.070,153.801 58.801 C 153.097 58.216,151.823 58.590,152.236 59.259 C 152.411 59.541,152.349 59.616,152.079 59.449 C 151.494 59.087,151.927 58.000,152.657 58.000 C 153.115 58.000,153.138 57.832,152.774 57.152 C 152.407 56.466,152.424 56.362,152.860 56.610 C 153.277 56.848,153.294 56.803,152.935 56.414 C 152.402 55.836,151.577 56.185,151.752 56.913 C 151.816 57.181,151.793 57.264,151.700 57.098 C 151.608 56.931,151.336 56.916,151.098 57.063 C 150.827 57.230,150.755 57.095,150.905 56.704 C 151.251 55.801,150.326 54.700,149.489 55.021 C 148.799 55.286,148.578 56.045,149.053 56.519 C 149.192 56.658,149.687 56.569,150.153 56.320 C 150.896 55.924,150.937 55.945,150.488 56.490 C 149.320 57.907,148.200 57.586,148.200 55.835 C 148.200 54.519,148.051 54.198,147.400 54.112 C 146.619 54.009,146.619 54.015,147.381 54.337 C 148.060 54.624,147.994 54.701,146.881 54.924 C 146.064 55.087,145.600 55.418,145.600 55.837 C 145.600 56.322,145.366 56.431,144.700 56.252 C 144.205 56.119,143.485 56.008,143.100 56.005 C 142.662 56.002,142.400 55.692,142.400 55.176 C 142.400 54.720,142.219 54.465,141.993 54.604 C 141.770 54.742,141.683 55.010,141.800 55.200 C 141.917 55.390,141.802 55.675,141.545 55.834 C 141.263 56.008,141.183 55.951,141.344 55.691 C 141.495 55.447,141.215 55.137,140.706 54.981 C 140.208 54.830,139.476 54.421,139.081 54.073 C 138.156 53.261,137.975 53.234,131.800 52.995 C 123.470 52.673,120.299 52.202,120.444 51.309 C 120.577 50.496,120.349 50.000,119.843 50.000 C 119.536 50.000,119.172 49.704,119.033 49.343 C 118.895 48.981,118.667 48.800,118.527 48.939 C 118.388 49.079,118.014 48.978,117.696 48.714 C 116.311 47.564,97.512 46.848,96.850 47.920 C 96.711 48.144,95.924 48.453,95.099 48.608 C 94.275 48.762,93.600 49.049,93.600 49.245 C 93.600 49.440,93.085 49.600,92.456 49.600 C 91.707 49.600,91.056 49.940,90.571 50.587 C 89.667 51.791,88.900 52.102,83.792 53.336 C 78.914 54.514,74.659 56.255,73.373 57.600 C 72.847 58.150,71.746 59.298,70.925 60.151 C 70.105 61.004,68.338 62.210,66.998 62.830 C 64.299 64.079,63.845 64.524,62.397 67.337 C 61.389 69.297,59.004 71.773,58.453 71.433 C 57.419 70.794,55.901 73.242,54.070 78.503 C 52.163 83.981,51.436 85.371,50.883 84.597 C 50.390 83.905,49.528 83.945,48.988 84.684 C 48.700 85.077,48.339 85.273,48.185 85.118 C 47.821 84.755,46.800 85.777,46.800 86.505 C 46.800 86.814,46.665 87.202,46.500 87.367 C 46.335 87.532,46.200 92.737,46.200 98.934 L 46.200 110.200 45.029 112.588 C 44.385 113.901,43.794 114.781,43.714 114.542 C 43.635 114.304,43.036 114.171,42.385 114.246 C 41.560 114.343,41.200 114.211,41.200 113.812 C 41.200 113.497,40.898 113.071,40.529 112.864 C 40.159 112.657,39.794 111.883,39.716 111.144 C 39.638 110.405,39.505 109.350,39.420 108.800 C 39.335 108.250,39.222 106.630,39.170 105.200 L 39.074 102.600 38.834 104.600 L 38.593 106.600 38.247 103.600 C 38.057 101.950,37.885 100.285,37.865 99.900 C 37.845 99.515,37.642 99.197,37.414 99.194 C 37.186 99.191,37.270 99.013,37.600 98.800 C 38.036 98.518,38.057 98.411,37.676 98.406 C 37.388 98.403,37.265 98.219,37.402 97.997 C 37.539 97.776,37.382 97.491,37.054 97.366 C 36.726 97.240,36.522 96.803,36.601 96.394 C 36.680 95.986,36.532 95.485,36.272 95.280 C 35.631 94.776,34.401 94.832,34.394 95.367 C 34.391 95.605,34.226 95.544,34.028 95.232 C 33.831 94.920,33.214 94.644,32.658 94.620 C 31.954 94.589,31.761 94.712,32.020 95.025 C 32.225 95.272,32.273 95.594,32.126 95.740 C 31.756 96.111,30.000 94.395,30.000 93.664 C 30.000 93.335,29.892 93.175,29.760 93.307 C 29.340 93.726,30.439 96.400,31.031 96.400 C 31.344 96.400,31.600 96.602,31.600 96.849 C 31.600 97.527,29.893 96.284,29.277 95.157 C 28.782 94.251,28.767 94.275,29.001 95.600 C 29.184 96.637,29.140 96.845,28.830 96.400 C 28.503 95.931,28.411 96.093,28.406 97.147 C 28.401 98.298,28.516 98.463,29.200 98.284 C 30.176 98.029,30.232 98.342,29.328 99.003 C 28.493 99.614,28.037 107.983,28.730 109.971 C 28.966 110.647,29.002 111.200,28.810 111.200 C 28.619 111.200,28.481 113.000,28.504 115.200 C 28.549 119.517,29.091 120.340,30.543 118.300 C 31.054 117.582,31.131 117.555,30.924 118.166 C 30.746 118.689,30.811 118.841,31.127 118.645 C 31.439 118.452,31.512 118.595,31.350 119.079 C 31.201 119.523,31.472 119.369,32.054 118.678 L 33.000 117.556 34.363 118.962 C 35.113 119.736,35.896 120.264,36.103 120.136 C 36.310 120.008,36.288 120.262,36.054 120.699 C 35.820 121.137,35.746 121.613,35.890 121.757 C 36.034 121.901,36.163 126.349,36.176 131.642 C 36.199 140.690,36.246 141.298,36.976 141.832 C 37.606 142.293,37.633 142.400,37.116 142.400 C 36.654 142.400,36.480 142.789,36.480 143.823 C 36.480 145.126,36.569 145.235,37.540 145.123 C 38.123 145.055,38.600 144.790,38.600 144.533 C 38.600 144.277,38.764 143.917,38.964 143.733 C 39.172 143.543,39.217 143.595,39.069 143.855 C 38.789 144.345,39.702 145.321,40.137 144.997 C 40.282 144.888,40.295 144.935,40.167 145.100 C 40.038 145.265,39.723 145.400,39.467 145.400 C 39.210 145.400,38.945 145.877,38.877 146.460 C 38.765 147.431,38.874 147.520,40.177 147.520 C 41.228 147.520,41.603 147.347,41.612 146.860 C 41.623 146.272,41.669 146.276,42.032 146.900 C 42.256 147.285,42.791 147.600,43.220 147.600 C 43.870 147.600,44.001 147.884,44.008 149.300 C 44.012 150.235,44.094 152.710,44.190 154.800 C 44.286 156.890,44.364 159.455,44.362 160.500 C 44.361 161.625,44.541 162.400,44.804 162.400 C 45.048 162.400,45.136 162.580,45.000 162.800 C 44.864 163.020,44.988 163.223,45.276 163.251 C 45.564 163.279,46.160 163.357,46.600 163.424 C 50.125 163.963,51.622 163.908,51.113 163.257 C 50.655 162.671,50.676 162.659,51.300 163.149 C 51.685 163.451,52.000 164.064,52.000 164.511 C 52.000 165.273,51.954 165.283,51.269 164.662 C 50.042 163.552,49.778 163.925,50.935 165.132 C 51.922 166.162,52.684 168.000,52.124 168.000 C 51.455 168.000,49.276 166.289,48.791 165.383 C 48.483 164.808,47.899 164.160,47.493 163.943 C 46.044 163.167,48.936 166.903,50.612 167.972 C 51.990 168.851,52.216 169.191,52.169 170.311 C 52.138 171.033,52.253 171.709,52.424 171.815 C 52.594 171.920,52.555 172.655,52.336 173.448 C 52.117 174.240,51.997 176.130,52.069 177.646 L 52.200 180.403 50.800 180.618 C 47.926 181.058,46.379 181.660,45.784 182.568 C 44.922 183.884,44.075 189.186,44.023 193.600 L 43.992 196.200 40.696 196.309 C 37.030 196.430,36.371 196.841,36.406 198.986 C 36.417 199.654,36.310 201.123,36.167 202.250 L 35.908 204.301 33.769 204.552 C 29.029 205.109,27.848 207.730,28.117 217.100 C 28.196 219.844,28.153 220.001,27.324 220.000 C 26.842 220.000,26.336 220.180,26.199 220.401 C 26.042 220.656,25.698 220.666,25.254 220.429 C 24.849 220.212,24.319 220.203,23.989 220.407 C 23.632 220.628,23.308 220.580,23.117 220.279 C 22.918 219.967,22.808 220.079,22.800 220.600 C 22.790 221.261,22.722 221.295,22.408 220.800 C 22.076 220.274,21.945 220.283,21.349 220.880 C 20.563 221.665,19.986 226.303,20.732 225.842 C 20.991 225.682,20.931 226.145,20.586 226.972 C 20.253 227.769,20.012 229.546,20.028 231.087 C 20.048 232.974,20.161 233.556,20.400 233.000 C 20.589 232.560,20.756 232.369,20.772 232.576 C 20.787 232.784,21.040 232.625,21.333 232.224 C 21.722 231.692,21.884 231.644,21.930 232.047 C 22.100 233.543,22.264 234.257,22.543 234.707 C 22.711 234.979,22.657 235.200,22.424 235.200 C 22.191 235.200,22.000 235.009,22.000 234.776 C 22.000 234.543,21.820 234.464,21.600 234.600 C 21.380 234.736,21.200 234.672,21.200 234.457 C 21.200 234.242,21.425 233.984,21.700 233.883 C 22.094 233.739,22.096 233.590,21.712 233.182 C 21.318 232.764,21.156 232.850,20.867 233.630 C 20.563 234.452,20.681 234.699,21.655 235.292 C 22.990 236.104,23.115 236.415,22.023 236.204 C 21.571 236.117,21.293 236.253,21.358 236.527 C 21.419 236.787,21.393 236.865,21.301 236.700 C 21.209 236.535,20.868 236.400,20.543 236.400 C 20.218 236.400,20.041 236.542,20.148 236.716 C 20.256 236.890,19.750 236.964,19.025 236.879 C 16.704 236.608,13.601 239.082,13.604 241.200 C 13.604 241.530,13.883 241.260,14.222 240.600 C 14.864 239.354,16.306 238.015,17.000 238.022 C 17.220 238.024,17.054 238.287,16.632 238.606 C 15.754 239.271,14.405 241.205,14.405 241.800 C 14.405 242.020,14.749 241.679,15.169 241.042 C 15.589 240.405,16.532 239.511,17.266 239.054 L 18.600 238.225 17.129 239.633 C 16.319 240.407,15.355 241.795,14.986 242.718 C 14.617 243.640,14.156 244.297,13.962 244.177 C 13.768 244.057,13.731 244.283,13.879 244.679 C 14.125 245.335,14.082 245.346,13.400 244.800 C 12.597 244.157,12.595 244.106,13.443 246.200 C 13.599 246.585,13.455 246.800,13.043 246.800 C 12.592 246.800,12.400 247.166,12.400 248.024 C 12.400 248.697,12.561 249.148,12.757 249.026 C 12.966 248.897,12.969 249.426,12.764 250.303 C 12.109 253.098,12.354 277.200,13.038 277.200 C 13.498 277.200,13.537 277.371,13.214 277.974 C 12.631 279.063,12.652 280.825,13.238 280.000 C 13.563 279.543,13.606 279.686,13.420 280.600 C 13.258 281.398,13.299 281.614,13.545 281.246 C 13.844 280.797,13.996 280.845,14.345 281.498 C 14.583 281.941,15.506 282.595,16.396 282.952 C 18.230 283.685,19.367 283.794,19.000 283.200 C 18.864 282.980,18.924 282.800,19.134 282.800 C 19.784 282.800,20.094 284.102,20.038 286.600 C 20.009 287.920,20.140 289.236,20.331 289.524 C 20.538 289.838,20.662 288.660,20.639 286.586 C 20.617 284.682,20.728 283.044,20.885 282.948 C 21.041 282.851,21.001 282.328,20.795 281.786 C 20.532 281.095,20.556 280.800,20.877 280.800 C 21.128 280.800,21.215 280.682,21.070 280.537 C 20.925 280.392,21.030 279.997,21.303 279.660 C 21.710 279.157,21.699 279.108,21.238 279.385 C 20.824 279.635,20.766 279.579,21.017 279.173 C 21.204 278.870,21.411 277.897,21.476 277.011 C 21.542 276.125,21.610 275.220,21.628 275.000 C 21.707 274.044,21.260 265.107,20.981 262.038 C 20.784 259.875,20.814 258.761,21.065 258.917 C 21.299 259.061,21.393 258.644,21.299 257.879 C 21.183 256.923,21.246 256.749,21.550 257.189 C 22.121 258.015,22.581 256.777,22.227 255.366 C 22.069 254.734,22.120 254.427,22.359 254.575 C 22.903 254.911,23.570 251.536,23.084 250.900 C 22.832 250.570,22.855 250.400,23.151 250.400 C 23.398 250.400,23.600 249.950,23.600 249.400 C 23.600 248.850,23.825 248.397,24.100 248.394 C 24.434 248.390,24.402 248.262,24.003 248.011 C 23.550 247.724,23.518 247.522,23.872 247.168 C 24.128 246.912,24.239 246.445,24.118 246.131 C 23.997 245.817,24.303 245.129,24.798 244.602 C 25.450 243.908,25.648 243.309,25.518 242.422 C 25.419 241.750,25.487 241.200,25.669 241.200 C 25.851 241.200,25.955 240.975,25.900 240.700 C 25.841 240.407,26.213 240.200,26.800 240.200 C 27.419 240.200,27.758 239.998,27.690 239.670 C 27.630 239.379,27.757 239.250,27.973 239.383 C 28.188 239.516,28.264 239.890,28.140 240.213 C 28.016 240.536,28.126 240.800,28.384 240.800 C 28.681 240.800,28.755 241.113,28.584 241.650 C 28.417 242.177,28.467 242.406,28.715 242.252 C 29.326 241.875,29.679 243.223,29.139 243.873 C 28.764 244.325,28.783 244.419,29.232 244.323 C 29.545 244.255,29.753 244.432,29.695 244.716 C 29.637 245.000,29.778 245.585,30.009 246.016 C 30.283 246.529,30.289 246.800,30.027 246.800 C 29.806 246.800,29.735 247.085,29.868 247.434 C 30.030 247.855,30.203 247.918,30.386 247.622 C 30.555 247.349,30.839 247.567,31.122 248.189 C 31.427 248.858,31.442 249.200,31.168 249.200 C 30.940 249.200,30.871 249.391,31.016 249.625 C 31.160 249.859,31.348 252.064,31.432 254.525 C 31.858 266.915,32.582 276.423,33.402 280.400 C 33.515 280.950,33.706 281.940,33.825 282.600 C 33.945 283.260,34.214 283.860,34.424 283.934 C 34.633 284.008,34.695 284.246,34.561 284.463 C 34.170 285.095,37.960 292.008,39.909 294.221 C 40.888 295.332,42.940 298.649,44.469 301.591 C 49.181 310.657,56.461 319.018,62.600 322.414 C 63.920 323.144,66.813 324.941,69.029 326.409 C 82.305 335.199,104.383 341.590,119.889 341.131 L 123.979 341.010 125.147 342.852 C 126.443 344.896,128.244 346.409,130.473 347.329 C 131.630 347.806,132.166 348.400,132.965 350.090 C 133.526 351.275,134.726 352.954,135.632 353.822 C 137.973 356.064,138.207 356.319,140.427 359.071 C 142.481 361.616,143.335 362.103,147.710 363.221 C 150.043 363.818,150.010 363.767,150.049 366.876 C 150.067 368.264,150.242 369.598,150.439 369.839 C 151.295 370.889,149.460 371.566,145.386 371.702 C 143.194 371.776,144.685 371.849,148.700 371.865 C 152.715 371.881,156.000 371.738,156.000 371.547 C 156.000 371.356,156.292 371.200,156.649 371.200 C 157.164 371.200,157.201 371.083,156.827 370.632 C 156.545 370.293,156.388 368.949,156.437 367.290 C 156.539 363.779,156.720 364.000,152.105 361.996 C 146.760 359.676,145.858 359.072,144.438 356.859 C 143.761 355.805,141.852 353.724,140.196 352.235 C 138.539 350.747,136.937 349.050,136.635 348.465 C 135.584 346.429,133.220 339.737,132.588 337.010 C 132.238 335.501,131.715 333.802,131.427 333.233 C 130.394 331.200,130.217 324.176,131.158 322.581 C 132.148 320.903,133.032 317.541,133.413 314.000 C 133.831 310.121,136.094 306.793,138.771 306.121 C 139.310 305.986,140.392 305.209,141.175 304.394 C 142.555 302.958,143.074 302.754,147.800 301.791 C 148.758 301.596,150.093 300.311,151.323 298.400 C 151.819 297.630,152.849 296.699,153.612 296.331 C 154.376 295.964,156.249 295.065,157.775 294.333 C 159.813 293.357,161.302 292.224,163.375 290.069 C 164.929 288.454,167.424 286.319,168.919 285.323 C 170.415 284.328,171.932 283.037,172.290 282.456 C 173.517 280.467,176.200 277.933,178.119 276.950 C 179.174 276.410,180.139 275.660,180.262 275.284 C 180.979 273.097,182.629 270.261,184.012 268.836 C 184.885 267.936,185.600 267.020,185.600 266.801 C 185.600 266.582,186.208 265.727,186.951 264.901 C 187.870 263.879,188.700 262.196,189.551 259.629 C 191.653 253.289,192.210 252.873,199.308 252.344 C 207.950 251.700,210.399 253.032,211.387 258.911 C 211.604 260.207,211.866 260.513,213.222 261.055 C 215.199 261.847,216.648 263.537,217.218 265.718 C 217.918 268.392,219.266 270.858,221.092 272.800 C 227.073 279.164,235.833 287.600,236.460 287.600 C 237.509 287.600,239.887 289.554,240.558 290.967 C 241.312 292.557,243.770 294.165,246.053 294.565 C 248.178 294.936,250.566 296.831,251.337 298.759 C 251.755 299.805,252.248 300.401,252.697 300.404 C 253.657 300.409,257.510 302.236,259.070 303.427 C 259.772 303.962,260.795 304.400,261.343 304.400 C 262.526 304.400,264.644 306.074,265.033 307.318 C 265.185 307.803,265.719 308.690,266.220 309.290 C 266.721 309.889,267.341 311.014,267.597 311.790 C 267.896 312.696,268.315 313.200,268.769 313.200 C 273.216 313.200,273.540 334.856,269.194 341.600 C 268.556 342.590,267.272 344.739,266.339 346.377 C 265.340 348.131,263.021 351.087,260.691 353.577 C 255.174 359.471,253.908 360.575,251.717 361.401 C 250.663 361.798,248.847 362.554,247.683 363.081 L 245.566 364.039 245.734 366.579 C 245.827 367.976,246.042 369.345,246.213 369.621 C 246.414 369.947,246.361 370.023,246.062 369.838 C 245.788 369.669,245.600 369.807,245.600 370.176 C 245.600 370.519,245.870 370.800,246.200 370.800 C 246.530 370.800,246.800 371.038,246.800 371.329 C 246.800 371.744,248.113 371.860,252.900 371.866 C 257.229 371.873,258.129 371.806,256.000 371.638 C 252.515 371.362,251.971 371.108,252.263 369.892 C 252.456 369.086,252.499 367.754,252.359 366.918 C 251.982 364.674,252.372 364.122,254.926 363.283 C 259.210 361.877,262.386 359.734,263.321 357.618 C 264.306 355.393,268.159 350.947,269.366 350.644 C 272.977 349.738,275.976 344.416,275.999 338.873 C 276.000 338.803,276.779 339.385,277.731 340.165 C 278.682 340.944,280.527 342.059,281.831 342.642 L 284.200 343.701 291.948 343.451 C 299.569 343.205,302.206 342.827,309.400 340.948 C 314.927 339.504,315.176 339.376,330.260 330.194 C 335.278 327.140,346.715 315.053,351.640 307.600 C 357.008 299.475,364.400 285.442,364.400 283.374 C 364.400 283.108,364.857 281.385,365.416 279.545 C 368.091 270.738,369.016 265.151,369.462 255.115 C 369.606 251.878,369.876 249.323,370.062 249.438 C 370.248 249.553,370.400 248.546,370.400 247.200 C 370.400 245.854,370.545 244.842,370.721 244.951 C 371.117 245.196,370.999 243.046,370.580 242.368 C 370.396 242.069,370.442 241.979,370.698 242.137 C 371.173 242.430,371.062 239.966,370.562 239.112 C 370.397 238.831,370.684 238.960,371.200 239.400 C 371.716 239.840,371.987 239.944,371.803 239.632 C 370.722 237.796,371.341 235.938,373.113 235.695 C 374.001 235.573,373.742 236.840,372.721 237.611 C 372.568 237.726,372.610 238.086,372.815 238.411 C 373.124 238.900,373.189 238.875,373.194 238.267 C 373.197 237.854,373.419 237.611,373.700 237.710 C 374.154 237.870,374.193 238.417,373.861 239.932 C 373.796 240.225,373.489 240.622,373.177 240.814 C 372.753 241.076,372.829 241.148,373.477 241.099 C 373.954 241.063,374.241 240.846,374.114 240.617 C 373.987 240.388,374.106 240.406,374.378 240.657 C 374.739 240.989,374.760 241.328,374.456 241.896 C 374.157 242.454,374.169 242.809,374.499 243.139 C 374.847 243.487,374.799 243.600,374.304 243.600 C 373.943 243.600,373.532 243.786,373.392 244.014 C 373.231 244.273,373.520 244.358,374.168 244.240 C 375.349 244.026,375.334 243.996,374.791 245.423 C 374.525 246.122,374.519 246.661,374.773 246.967 C 374.987 247.225,375.089 248.013,375.000 248.718 C 374.911 249.423,375.009 250.000,375.219 250.000 C 375.429 250.000,375.600 250.191,375.600 250.424 C 375.600 250.657,375.465 250.764,375.300 250.662 C 374.844 250.381,374.818 252.487,375.267 253.325 C 375.484 253.731,375.911 253.966,376.217 253.849 C 376.645 253.684,376.722 253.930,376.553 254.918 C 376.385 255.896,376.434 256.058,376.760 255.600 C 377.114 255.104,377.189 255.160,377.194 255.924 C 377.197 256.432,377.367 256.744,377.571 256.618 C 377.775 256.492,378.058 256.754,378.200 257.200 C 378.342 257.646,378.612 257.916,378.801 257.799 C 378.990 257.683,379.248 257.754,379.374 257.958 C 379.695 258.478,380.788 258.254,381.258 257.572 C 381.549 257.150,381.586 257.236,381.399 257.900 C 381.214 258.558,381.315 258.800,381.773 258.800 C 382.233 258.800,382.418 259.252,382.467 260.500 L 382.534 262.200 382.697 260.605 C 382.786 259.728,382.997 258.918,383.164 258.805 C 383.331 258.692,383.689 258.240,383.959 257.800 C 384.410 257.065,384.432 257.088,384.224 258.075 C 384.099 258.667,384.157 259.250,384.353 259.371 C 384.761 259.623,385.208 258.505,385.620 256.200 C 385.854 254.888,385.887 255.040,385.803 257.047 C 385.717 259.096,385.806 259.487,386.350 259.447 C 387.181 259.387,387.443 261.026,386.738 261.875 C 386.272 262.436,386.188 262.400,385.978 261.553 C 385.848 261.029,385.755 262.621,385.771 265.092 C 385.796 269.012,385.365 270.964,384.880 269.130 C 384.787 268.779,384.882 268.803,385.163 269.200 C 385.483 269.652,385.589 269.233,385.594 267.500 C 385.597 266.229,385.421 265.200,385.200 265.200 C 384.980 265.200,384.800 264.379,384.800 263.376 C 384.800 262.340,384.638 261.653,384.424 261.785 C 384.217 261.913,384.124 263.319,384.218 264.909 C 384.334 266.890,384.276 267.485,384.034 266.800 C 383.839 266.250,383.662 265.305,383.640 264.700 C 383.618 264.095,383.414 263.600,383.186 263.600 C 382.928 263.600,382.850 264.387,382.978 265.700 C 383.196 267.920,383.145 267.790,382.194 263.700 C 382.079 263.205,381.796 262.800,381.565 262.800 C 381.335 262.800,381.233 263.115,381.339 263.500 C 381.446 263.885,381.652 265.074,381.797 266.143 C 382.127 268.565,381.398 268.347,380.979 265.898 C 380.750 264.557,380.628 264.368,380.398 265.000 L 380.108 265.800 379.900 265.000 C 379.742 264.389,379.682 264.466,379.646 265.324 C 379.619 265.980,379.766 266.344,380.000 266.200 C 380.450 265.922,380.519 266.424,380.161 267.357 C 379.899 268.041,379.149 267.548,378.696 266.393 C 378.558 266.042,378.450 266.239,378.432 266.876 C 378.414 267.468,378.580 268.064,378.800 268.200 C 379.333 268.529,379.311 270.129,378.765 270.675 C 378.483 270.957,378.470 271.196,378.728 271.355 C 378.946 271.490,379.031 271.959,378.917 272.396 C 378.803 272.833,378.550 273.092,378.355 272.972 C 378.160 272.851,378.000 272.933,378.000 273.153 C 378.000 273.373,378.199 273.676,378.443 273.826 C 378.751 274.017,378.721 274.204,378.343 274.444 C 378.044 274.633,377.980 274.791,378.200 274.794 C 378.438 274.798,378.632 276.625,378.679 279.300 C 378.723 281.775,378.846 284.700,378.953 285.800 C 379.255 288.913,379.650 291.783,379.795 291.928 C 379.867 292.001,379.784 292.557,379.610 293.164 C 379.429 293.796,379.464 294.572,379.693 294.981 C 379.983 295.498,379.942 295.793,379.547 296.048 C 379.087 296.344,379.086 296.456,379.543 296.750 C 379.927 296.998,379.955 297.181,379.636 297.378 C 379.389 297.530,379.289 297.821,379.415 298.024 C 379.548 298.240,379.840 298.216,380.121 297.966 C 380.385 297.732,381.312 297.147,382.182 296.667 C 384.434 295.425,386.987 290.955,386.960 288.300 C 386.950 287.255,387.084 286.400,387.258 286.400 C 387.644 286.400,387.727 282.289,387.745 262.400 C 387.762 242.249,387.678 238.000,387.258 238.000 C 387.067 238.000,386.997 237.505,387.102 236.900 C 387.274 235.905,387.240 235.868,386.746 236.505 C 386.248 237.148,386.193 237.102,386.115 235.985 C 385.932 233.370,382.882 230.000,380.697 230.000 C 380.219 230.000,380.068 229.147,379.923 225.627 C 379.800 222.662,379.558 221.027,379.171 220.550 C 378.811 220.106,378.784 219.957,379.100 220.147 C 379.436 220.349,379.600 220.174,379.600 219.611 C 379.600 219.151,379.340 218.675,379.023 218.553 C 378.585 218.385,378.537 218.093,378.823 217.340 C 379.373 215.892,379.294 215.800,378.404 216.856 L 377.608 217.800 378.210 216.547 C 379.308 214.260,377.758 212.682,375.485 213.774 L 374.200 214.392 375.144 213.596 C 376.200 212.706,376.108 212.627,374.660 213.177 C 373.907 213.463,373.615 213.415,373.447 212.977 C 373.325 212.660,372.966 212.400,372.648 212.400 C 372.214 212.400,372.002 211.567,371.790 209.021 C 371.443 204.855,371.176 204.581,367.100 204.212 C 363.929 203.925,363.838 203.861,363.994 202.025 C 364.204 199.556,363.540 196.000,362.868 195.994 C 362.325 195.989,362.305 195.921,362.760 195.633 C 363.455 195.193,363.095 191.910,362.201 190.546 C 361.280 189.140,356.463 188.114,356.354 189.300 C 356.232 190.621,355.603 186.294,355.597 184.100 C 355.592 181.997,355.480 181.599,354.895 181.594 C 354.323 181.589,354.302 181.523,354.774 181.224 C 355.179 180.968,355.229 180.704,354.944 180.330 C 354.722 180.039,354.326 179.052,354.065 178.137 C 353.490 176.122,351.378 174.145,349.409 173.775 C 348.002 173.511,347.080 169.600,348.424 169.600 C 348.657 169.600,348.752 169.754,348.636 169.942 C 348.520 170.129,348.878 170.489,349.431 170.742 C 351.041 171.475,351.332 171.275,350.143 170.252 C 349.058 169.319,349.313 168.830,350.900 168.805 C 351.303 168.798,352.700 167.454,352.572 167.195 C 352.516 167.082,352.696 166.568,352.972 166.052 L 353.474 165.114 354.337 166.211 C 355.276 167.404,355.470 167.030,354.742 165.431 C 354.489 164.878,354.129 164.520,353.942 164.636 C 353.754 164.752,353.593 164.612,353.584 164.324 C 353.575 164.036,353.299 164.295,352.971 164.900 C 352.171 166.375,351.817 166.315,352.583 164.834 C 353.094 163.845,353.371 163.697,354.401 163.859 C 355.513 164.034,355.616 163.955,355.613 162.925 C 355.602 159.235,356.120 155.600,356.656 155.600 C 356.969 155.600,357.329 155.330,357.455 155.000 C 357.582 154.670,357.857 154.400,358.066 154.400 C 358.276 154.400,358.336 154.580,358.200 154.800 C 357.842 155.380,359.409 155.291,360.959 154.643 C 361.862 154.265,362.438 153.666,362.746 152.783 C 363.307 151.173,363.334 149.870,362.800 150.200 C 362.580 150.336,362.400 150.276,362.400 150.066 C 362.400 149.857,362.670 149.582,363.000 149.455 C 363.734 149.174,363.823 146.803,363.100 146.794 C 362.768 146.790,362.802 146.660,363.200 146.409 C 363.642 146.130,363.819 145.173,363.873 142.773 C 363.962 138.832,364.106 138.400,365.328 138.400 C 368.726 138.400,371.509 133.137,371.673 126.400 C 371.834 119.795,371.595 94.517,371.360 93.300 C 371.198 92.461,371.267 92.000,371.555 92.000 C 371.827 92.000,371.979 91.262,371.946 90.100 C 371.916 89.055,371.815 88.590,371.722 89.066 C 371.527 90.068,370.400 90.683,370.400 89.787 C 370.400 89.464,370.593 89.200,370.829 89.200 C 371.065 89.200,371.200 88.903,371.129 88.539 C 370.983 87.795,369.373 87.397,368.993 88.012 C 368.856 88.233,368.607 88.328,368.439 88.224 C 368.271 88.120,368.133 88.289,368.133 88.600 C 368.133 88.911,368.252 89.091,368.398 89.001 C 368.544 88.911,369.233 89.359,369.931 89.996 C 370.647 90.650,371.022 91.263,370.793 91.404 C 370.570 91.542,370.483 91.810,370.600 92.000 C 370.717 92.190,370.627 92.460,370.400 92.600 C 370.173 92.740,370.105 93.068,370.250 93.328 C 370.394 93.587,370.172 93.474,369.756 93.076 C 369.039 92.389,369.036 92.324,369.700 91.831 C 370.085 91.546,370.400 91.197,370.400 91.056 C 370.400 90.633,368.992 90.768,368.525 91.235 C 368.212 91.548,368.015 91.547,367.820 91.232 C 367.671 90.991,367.786 90.720,368.075 90.629 C 369.621 90.142,369.710 90.061,368.727 90.032 C 367.984 90.010,367.567 89.725,367.370 89.107 L 367.087 88.213 366.716 89.207 C 366.355 90.172,366.329 90.178,365.772 89.424 C 365.435 88.966,365.200 88.860,365.200 89.166 C 365.200 89.464,364.943 89.587,364.600 89.455 C 364.206 89.304,364.000 89.468,364.000 89.933 C 364.000 90.322,363.775 90.882,363.500 91.179 C 363.093 91.618,363.124 91.674,363.667 91.484 C 364.373 91.237,363.435 93.607,362.698 93.934 C 362.531 94.008,362.497 94.233,362.621 94.434 C 362.745 94.635,362.646 94.800,362.400 94.800 C 362.154 94.800,362.056 94.968,362.183 95.172 C 362.309 95.377,362.218 95.665,361.979 95.813 C 361.741 95.960,361.635 96.315,361.745 96.601 C 361.855 96.888,361.832 97.235,361.694 97.372 C 361.154 97.912,360.242 104.910,360.217 108.700 C 360.207 110.075,360.059 111.200,359.886 111.200 C 359.713 111.200,359.777 111.583,360.027 112.051 C 360.306 112.572,360.336 112.998,360.105 113.151 C 359.897 113.288,359.773 114.029,359.830 114.799 C 359.887 115.568,359.747 116.423,359.518 116.699 C 359.289 116.974,359.220 117.200,359.365 117.200 C 359.510 117.200,359.435 117.560,359.200 118.000 C 358.965 118.440,358.463 118.803,358.086 118.806 C 357.497 118.811,357.485 118.867,358.000 119.200 C 358.513 119.531,358.498 119.589,357.900 119.594 C 357.515 119.597,357.200 119.780,357.200 120.000 C 357.200 121.263,355.528 120.231,354.597 118.393 C 353.152 115.543,352.734 110.367,353.203 101.152 C 354.038 84.753,353.431 79.286,350.839 79.852 C 350.707 79.881,350.150 79.740,349.600 79.540 C 349.050 79.340,348.375 79.097,348.099 79.000 C 347.544 78.805,346.069 75.688,345.390 73.274 C 344.988 71.845,343.010 69.816,341.241 69.018 C 340.176 68.538,339.509 67.915,339.242 67.150 C 338.450 64.876,336.751 63.207,333.773 61.774 C 331.376 60.621,330.675 60.057,329.815 58.589 C 328.446 56.254,325.021 54.750,315.753 52.413 C 314.847 52.185,313.497 51.463,312.753 50.810 C 312.009 50.157,310.860 49.407,310.200 49.144 C 309.540 48.881,308.748 48.471,308.440 48.233 C 306.762 46.935,293.517 46.668,288.600 47.832 C 287.940 47.989,286.815 48.135,286.100 48.158 C 285.385 48.181,284.800 48.313,284.800 48.450 C 284.800 48.588,284.274 48.805,283.632 48.934 C 282.962 49.068,282.359 49.499,282.217 49.947 C 282.081 50.375,281.695 50.831,281.359 50.960 C 281.024 51.089,280.846 51.352,280.965 51.544 C 281.240 51.989,277.252 52.800,274.788 52.800 C 273.755 52.800,271.973 52.977,270.829 53.194 C 268.135 53.705,263.523 53.847,262.862 53.439 C 262.579 53.263,262.239 53.228,262.107 53.360 C 261.975 53.492,262.077 53.600,262.333 53.600 C 262.590 53.600,262.800 53.810,262.800 54.067 C 262.800 54.323,262.691 54.424,262.557 54.291 C 262.071 53.804,260.772 55.462,261.057 56.205 C 261.269 56.758,261.200 56.854,260.768 56.607 C 260.308 56.344,260.295 56.385,260.700 56.821 C 261.243 57.406,261.387 58.163,260.898 57.861 C 260.732 57.758,260.597 58.243,260.598 58.937 C 260.600 60.177,260.564 60.201,258.654 60.236 C 255.788 60.288,254.528 59.995,255.236 59.441 C 255.546 59.199,255.840 58.460,255.889 57.800 C 255.953 56.945,255.874 56.767,255.615 57.181 C 255.416 57.500,255.360 57.950,255.491 58.181 C 255.624 58.416,255.569 58.454,255.364 58.267 C 255.164 58.083,255.000 57.768,255.000 57.567 C 255.000 57.365,254.820 57.212,254.600 57.226 C 254.121 57.258,254.321 58.501,254.859 58.835 C 255.071 58.967,254.965 59.297,254.619 59.584 C 254.084 60.028,254.000 59.939,254.000 58.929 C 254.000 58.286,253.775 57.518,253.500 57.221 C 253.106 56.797,253.105 56.742,253.497 56.963 C 253.836 57.154,253.977 56.950,253.940 56.322 C 253.910 55.815,253.956 55.138,254.043 54.818 C 254.129 54.498,253.975 54.228,253.700 54.218 C 253.425 54.208,253.215 54.040,253.234 53.845 C 253.253 53.649,253.028 53.337,252.734 53.151 C 252.378 52.925,252.357 52.810,252.671 52.806 C 252.931 52.803,253.413 53.070,253.743 53.400 C 254.073 53.730,254.558 54.000,254.820 54.000 C 255.189 54.000,255.188 54.132,254.817 54.579 C 254.452 55.019,254.447 55.331,254.799 55.879 C 255.204 56.511,255.234 56.515,255.047 55.912 C 254.930 55.533,255.109 54.948,255.446 54.612 C 255.782 54.275,255.914 54.000,255.740 54.000 C 255.565 54.000,255.825 53.718,256.318 53.373 C 257.449 52.580,257.048 51.857,255.656 52.180 C 254.974 52.338,254.789 52.298,255.134 52.068 C 255.563 51.781,255.539 51.662,255.013 51.460 C 254.269 51.175,254.469 50.832,256.651 48.651 C 258.893 46.409,259.117 46.298,259.599 47.198 C 259.835 47.639,260.247 47.997,260.514 47.994 C 260.818 47.990,260.850 47.877,260.600 47.694 C 260.093 47.322,259.854 46.262,260.345 46.566 C 260.545 46.690,260.955 46.489,261.255 46.119 C 261.630 45.656,261.644 45.540,261.300 45.747 C 260.848 46.019,260.615 45.573,260.753 44.700 C 260.813 44.319,258.724 44.385,256.418 44.837 M53.280 45.280 C 52.696 45.864,52.658 46.400,53.200 46.400 C 53.420 46.400,53.555 46.175,53.500 45.900 C 53.445 45.625,53.625 45.445,53.900 45.500 C 54.175 45.555,54.400 45.420,54.400 45.200 C 54.400 44.658,53.864 44.696,53.280 45.280 M146.132 45.300 C 146.508 45.576,146.977 46.341,147.174 47.000 C 147.426 47.846,147.541 47.961,147.566 47.389 C 147.606 46.437,146.554 44.800,145.901 44.800 C 145.651 44.800,145.755 45.025,146.132 45.300 M260.182 45.171 C 260.439 45.587,258.874 46.207,258.503 45.837 C 258.373 45.706,258.612 45.597,259.033 45.594 C 259.675 45.589,259.702 45.524,259.200 45.200 C 258.683 44.866,258.693 44.811,259.276 44.806 C 259.648 44.803,260.056 44.967,260.182 45.171 M257.997 45.700 C 257.996 45.975,257.451 46.510,256.786 46.888 C 256.121 47.267,255.267 48.121,254.888 48.786 C 253.604 51.043,252.692 50.192,253.828 47.797 C 254.666 46.032,258.004 44.353,257.997 45.700 M255.905 46.226 C 255.303 46.553,254.538 47.347,254.205 47.990 C 253.331 49.680,253.464 50.028,254.398 48.496 C 254.835 47.779,255.779 46.835,256.496 46.398 C 258.003 45.479,257.533 45.343,255.905 46.226 M52.438 47.600 C 52.418 48.568,53.500 49.724,54.181 49.463 C 54.521 49.332,54.797 48.994,54.794 48.713 C 54.789 48.324,54.703 48.334,54.439 48.751 C 54.013 49.424,53.265 49.017,52.797 47.859 C 52.596 47.361,52.445 47.252,52.438 47.600 M258.800 47.600 C 258.800 47.846,258.654 47.957,258.476 47.847 C 258.095 47.612,255.754 50.000,255.900 50.475 C 255.955 50.654,255.809 50.800,255.576 50.800 C 255.343 50.800,255.264 50.980,255.400 51.200 C 255.776 51.809,256.805 51.679,256.565 51.053 C 256.439 50.724,256.696 50.416,257.207 50.282 C 257.676 50.160,258.160 49.676,258.282 49.207 C 258.416 48.696,258.724 48.439,259.053 48.565 C 259.679 48.805,259.809 47.776,259.200 47.400 C 258.980 47.264,258.800 47.354,258.800 47.600 M260.000 48.810 C 260.000 49.035,259.545 49.393,258.989 49.604 C 257.916 50.012,257.163 51.427,257.520 52.364 C 257.680 52.783,257.812 52.720,258.034 52.119 C 258.199 51.675,258.753 50.971,259.267 50.555 C 260.108 49.874,260.759 48.400,260.218 48.400 C 260.098 48.400,260.000 48.584,260.000 48.810 M349.541 50.304 C 350.344 51.131,351.078 51.758,351.173 51.698 C 351.399 51.554,348.728 48.800,348.363 48.800 C 348.209 48.800,348.739 49.477,349.541 50.304 M52.880 50.880 C 52.616 51.144,52.400 51.579,52.400 51.847 C 52.400 52.114,52.193 52.402,51.940 52.487 C 51.687 52.571,51.552 52.835,51.640 53.074 C 51.728 53.312,52.293 52.808,52.896 51.954 C 53.933 50.485,53.923 49.837,52.880 50.880 M253.935 51.100 C 253.872 51.485,253.985 52.070,254.187 52.400 C 254.492 52.899,254.450 52.916,253.940 52.503 C 253.603 52.230,253.208 52.125,253.063 52.270 C 252.918 52.415,252.803 52.098,252.806 51.567 C 252.811 50.796,252.891 50.721,253.200 51.200 C 253.531 51.713,253.589 51.698,253.594 51.100 C 253.597 50.715,253.701 50.400,253.825 50.400 C 253.949 50.400,253.998 50.715,253.935 51.100 M259.062 51.131 C 258.148 52.141,258.173 53.380,259.100 52.995 C 259.485 52.835,260.000 52.696,260.245 52.686 C 260.490 52.675,260.601 52.326,260.493 51.911 C 260.378 51.474,260.063 51.244,259.747 51.365 C 259.446 51.480,259.200 51.485,259.200 51.375 C 259.200 51.264,259.605 51.011,260.100 50.812 C 260.686 50.577,260.777 50.442,260.362 50.425 C 260.011 50.411,259.426 50.729,259.062 51.131 M151.200 52.345 C 151.200 52.534,151.650 52.603,152.200 52.498 C 152.750 52.393,153.200 52.238,153.200 52.153 C 153.200 52.069,152.750 52.000,152.200 52.000 C 151.650 52.000,151.200 52.155,151.200 52.345 M45.382 53.382 C 44.390 54.374,44.043 56.000,44.824 56.000 C 45.057 56.000,45.124 55.800,44.972 55.555 C 44.594 54.943,45.658 54.350,46.251 54.842 C 46.562 55.100,46.813 55.102,46.971 54.847 C 47.104 54.632,47.038 54.347,46.824 54.215 C 46.245 53.857,46.815 52.720,47.452 52.964 C 47.753 53.080,48.000 53.001,48.000 52.787 C 48.000 52.037,46.352 52.411,45.382 53.382 M48.295 52.936 C 48.131 53.341,48.123 53.881,48.275 54.136 C 48.428 54.391,48.214 54.330,47.800 54.000 C 47.314 53.613,47.157 53.584,47.358 53.918 C 47.770 54.603,46.832 55.698,46.079 55.409 C 45.569 55.213,45.564 55.276,46.043 55.868 C 46.406 56.314,46.426 56.449,46.103 56.255 C 45.830 56.091,45.290 56.141,44.903 56.366 C 44.280 56.729,44.308 56.777,45.144 56.788 L 46.089 56.800 45.144 57.592 C 44.357 58.252,44.297 58.447,44.781 58.765 C 45.444 59.201,46.003 58.976,45.994 58.276 C 45.990 57.990,45.833 58.039,45.600 58.400 C 45.329 58.820,45.210 58.846,45.206 58.487 C 45.196 57.636,46.380 57.458,47.189 58.190 C 48.373 59.261,51.261 56.373,50.190 55.189 C 49.458 54.380,49.636 53.196,50.487 53.206 C 50.846 53.210,50.820 53.329,50.400 53.600 C 50.039 53.833,49.990 53.990,50.276 53.994 C 50.976 54.003,51.201 53.444,50.765 52.781 C 50.446 52.295,50.259 52.349,49.621 53.109 L 48.858 54.017 48.725 53.109 C 48.606 52.294,48.562 52.276,48.295 52.936 M154.300 52.665 C 154.575 52.776,154.800 53.042,154.800 53.257 C 154.800 53.472,154.592 53.519,154.338 53.362 C 154.045 53.181,153.985 53.253,154.174 53.558 C 154.400 53.924,154.605 53.928,155.031 53.574 C 155.709 53.012,155.406 52.388,154.476 52.432 C 154.060 52.451,153.992 52.541,154.300 52.665 M247.527 53.581 C 247.624 53.873,247.524 54.001,247.305 53.865 C 246.797 53.551,245.498 54.957,245.899 55.387 C 246.065 55.564,245.941 55.629,245.625 55.530 C 244.714 55.245,244.690 54.522,245.584 54.288 C 246.033 54.171,246.400 53.773,246.400 53.404 C 246.400 52.641,247.259 52.776,247.527 53.581 M51.396 54.407 C 51.258 54.630,50.958 54.698,50.731 54.557 C 50.503 54.417,50.615 54.756,50.978 55.311 C 51.498 56.104,51.529 56.365,51.120 56.528 C 50.834 56.643,51.005 56.751,51.500 56.768 C 52.459 56.802,52.736 56.190,51.900 55.883 C 51.500 55.737,51.500 55.594,51.900 55.170 C 52.175 54.879,52.400 54.496,52.400 54.320 C 52.400 53.863,51.694 53.924,51.396 54.407 M50.130 56.238 C 49.850 56.968,49.200 56.965,49.200 56.233 C 49.200 55.921,49.079 55.336,48.932 54.933 C 48.674 54.226,48.694 54.226,49.505 54.938 C 49.968 55.343,50.249 55.928,50.130 56.238 M48.173 56.030 C 47.799 56.443,47.325 56.678,47.120 56.551 C 46.916 56.424,47.054 55.983,47.427 55.570 C 47.801 55.157,48.275 54.922,48.480 55.049 C 48.684 55.176,48.546 55.617,48.173 56.030 M151.600 55.175 C 151.600 55.381,151.948 55.524,152.372 55.492 C 152.797 55.460,153.056 55.291,152.949 55.117 C 152.675 54.673,151.600 54.720,151.600 55.175 M248.115 56.045 C 247.440 56.720,246.637 56.078,247.244 55.347 C 247.578 54.944,247.854 54.894,248.143 55.183 C 248.432 55.472,248.424 55.736,248.115 56.045 M147.856 55.767 C 147.835 56.570,146.525 57.525,145.947 57.159 C 145.521 56.889,145.560 56.811,146.124 56.806 C 146.568 56.802,146.737 56.622,146.562 56.338 C 146.372 56.031,146.454 55.986,146.806 56.204 C 147.179 56.434,147.268 56.354,147.106 55.932 C 146.978 55.599,147.096 55.333,147.371 55.333 C 147.644 55.333,147.862 55.528,147.856 55.767 M153.511 56.370 C 153.126 57.740,153.680 58.668,154.379 57.825 C 154.691 57.449,154.730 57.200,154.477 57.200 C 154.245 57.200,153.994 56.795,153.920 56.300 C 153.784 55.404,153.782 55.405,153.511 56.370 M355.340 56.981 C 355.067 57.278,355.017 57.704,355.218 58.029 C 355.662 58.747,356.100 58.284,355.932 57.274 C 355.828 56.650,355.702 56.587,355.340 56.981 M48.233 57.200 C 48.965 57.200,48.968 57.850,48.238 58.130 C 47.928 58.249,47.343 57.968,46.938 57.505 C 46.226 56.694,46.226 56.674,46.933 56.932 C 47.336 57.079,47.921 57.200,48.233 57.200 M49.853 57.941 C 49.267 58.589,49.252 58.734,49.753 58.927 C 50.493 59.211,51.257 58.339,50.848 57.677 C 50.618 57.306,50.368 57.372,49.853 57.941 M51.483 57.996 C 51.597 58.433,51.843 58.697,52.028 58.583 C 52.422 58.339,52.065 57.200,51.595 57.200 C 51.419 57.200,51.369 57.558,51.483 57.996 M120.569 58.043 C 126.865 58.707,128.449 59.667,127.176 62.045 C 126.410 63.477,125.126 63.623,117.273 63.168 C 113.163 62.931,105.210 62.601,99.600 62.437 C 89.498 62.140,83.723 61.181,85.063 60.023 C 87.371 58.028,108.995 56.822,120.569 58.043 M311.000 58.444 C 313.420 58.897,315.805 59.346,316.300 59.442 C 317.434 59.660,317.465 60.630,316.356 61.223 C 314.534 62.198,308.503 62.797,300.485 62.798 C 291.949 62.800,279.631 63.423,277.114 63.980 C 274.378 64.585,272.468 60.427,274.960 59.291 C 279.568 57.192,301.552 56.675,311.000 58.444 M46.497 58.611 C 46.660 58.784,46.584 59.178,46.329 59.486 C 45.966 59.922,45.989 60.018,46.432 59.923 C 46.745 59.855,46.963 60.002,46.917 60.250 C 46.871 60.498,47.238 60.700,47.734 60.700 C 48.420 60.700,48.651 60.451,48.707 59.650 C 48.769 58.757,48.719 58.705,48.370 59.300 C 48.145 59.685,47.744 59.997,47.480 59.994 C 47.110 59.989,47.111 59.917,47.484 59.680 C 47.827 59.462,47.711 59.216,47.084 58.834 C 46.598 58.537,46.333 58.437,46.497 58.611 M355.333 59.814 C 355.333 60.136,355.503 60.400,355.709 60.400 C 355.916 60.400,355.978 60.679,355.847 61.021 C 355.716 61.362,355.776 61.538,355.980 61.412 C 356.184 61.286,356.536 61.502,356.763 61.892 C 357.140 62.539,357.177 62.542,357.188 61.921 C 357.195 61.547,356.780 60.788,356.267 60.234 C 355.638 59.556,355.333 59.418,355.333 59.814 M44.228 59.955 C 44.107 60.150,44.277 60.532,44.604 60.804 C 44.999 61.131,45.200 61.151,45.200 60.862 C 45.200 60.612,45.499 60.538,45.900 60.690 C 46.555 60.938,46.557 60.912,45.929 60.278 C 45.188 59.530,44.564 59.411,44.228 59.955 M358.025 61.979 C 358.046 63.129,358.114 63.245,358.381 62.586 C 358.928 61.235,359.985 60.532,360.424 61.226 C 360.728 61.705,360.789 61.691,360.794 61.140 C 360.798 60.643,360.453 60.489,359.400 60.519 C 358.065 60.557,358.001 60.625,358.025 61.979 M359.971 62.690 C 359.671 63.080,359.584 63.267,359.776 63.103 C 360.215 62.732,361.270 63.563,360.972 64.045 C 360.631 64.597,361.050 64.463,361.550 63.861 C 361.890 63.451,361.820 63.161,361.256 62.651 C 360.561 62.022,360.480 62.025,359.971 62.690 M362.774 63.576 C 363.468 64.015,362.765 65.072,361.414 65.619 C 360.755 65.886,360.871 65.954,362.021 65.975 C 363.375 65.999,363.443 65.935,363.481 64.600 C 363.511 63.547,363.357 63.202,362.860 63.206 C 362.309 63.211,362.295 63.272,362.774 63.576 M358.000 63.702 C 358.000 64.043,359.957 66.000,360.298 66.000 C 360.442 66.000,360.344 65.784,360.080 65.520 C 359.448 64.888,359.462 64.270,360.100 64.653 C 360.440 64.857,360.424 64.737,360.051 64.277 C 359.457 63.544,358.998 63.349,359.400 64.000 C 359.746 64.560,359.060 64.500,358.480 63.920 C 358.216 63.656,358.000 63.558,358.000 63.702 M133.851 65.580 C 134.979 66.009,136.821 66.481,137.944 66.630 C 141.039 67.041,141.138 67.199,141.253 71.941 C 141.381 77.231,140.449 78.510,139.228 74.720 C 138.616 72.821,136.479 70.950,134.305 70.410 C 129.817 69.296,128.158 67.442,130.000 65.600 C 130.990 64.610,131.295 64.608,133.851 65.580 M272.859 65.974 C 274.005 67.389,273.797 67.799,270.900 69.837 C 268.906 71.240,267.630 71.828,266.019 72.086 C 263.313 72.521,262.859 72.889,262.535 74.914 C 262.392 75.810,261.800 77.059,261.199 77.732 L 260.120 78.939 258.705 78.065 C 256.160 76.492,256.140 76.308,258.239 73.731 C 259.279 72.454,260.506 71.222,260.965 70.994 C 261.487 70.735,261.875 70.064,262.000 69.208 C 262.490 65.850,270.764 63.387,272.859 65.974 M358.000 65.175 C 358.000 65.435,357.832 65.544,357.628 65.417 C 357.423 65.291,357.140 65.373,357.000 65.600 C 356.860 65.827,356.549 65.892,356.311 65.745 C 356.041 65.578,355.992 65.664,356.183 65.973 C 356.400 66.324,356.615 66.345,356.916 66.044 C 357.535 65.425,358.559 66.327,358.000 67.000 C 357.709 67.351,357.794 67.654,358.295 68.047 C 358.918 68.536,358.943 68.527,358.510 67.970 C 358.134 67.488,358.129 67.231,358.490 66.870 C 358.748 66.612,358.789 66.397,358.580 66.394 C 358.371 66.391,358.434 66.240,358.719 66.059 C 359.133 65.796,359.113 65.626,358.619 65.216 C 358.166 64.840,358.000 64.829,358.000 65.175 M359.375 67.240 C 359.225 67.483,359.455 68.033,359.885 68.463 C 360.499 69.077,360.667 69.116,360.667 68.644 C 360.667 68.314,360.472 68.079,360.233 68.122 C 359.995 68.165,359.825 67.885,359.856 67.500 C 359.919 66.695,359.764 66.611,359.375 67.240 M362.456 67.566 C 363.523 68.431,363.731 68.406,363.367 67.457 C 363.228 67.096,362.754 66.800,362.313 66.800 C 361.561 66.800,361.569 66.847,362.456 67.566 M363.300 69.398 C 362.643 70.144,362.669 70.400,363.400 70.400 C 363.733 70.400,364.000 70.044,364.000 69.600 C 364.000 68.662,363.959 68.650,363.300 69.398 M36.615 71.176 C 36.487 71.382,36.747 71.524,37.191 71.491 C 37.636 71.457,38.000 71.288,38.000 71.115 C 38.000 70.673,36.896 70.721,36.615 71.176 M38.193 72.023 C 37.979 72.696,37.833 72.777,37.578 72.364 C 37.394 72.067,37.139 71.927,37.012 72.055 C 36.885 72.182,37.042 72.503,37.362 72.769 C 37.933 73.242,39.193 71.860,38.669 71.336 C 38.561 71.228,38.347 71.537,38.193 72.023 M112.200 72.179 C 123.070 73.683,126.264 75.056,127.294 78.666 C 128.920 84.368,129.182 83.725,123.156 88.791 C 122.246 89.555,120.849 91.165,120.051 92.367 C 119.021 93.919,117.919 94.950,116.253 95.922 C 114.963 96.674,112.713 98.494,111.253 99.966 C 109.794 101.438,107.786 103.286,106.790 104.074 C 104.366 105.992,96.701 113.644,95.336 115.509 C 94.735 116.329,93.424 117.812,92.422 118.805 C 91.420 119.798,89.791 122.123,88.803 123.973 C 87.323 126.740,86.651 127.563,85.003 128.623 C 82.423 130.284,81.557 131.264,80.078 134.200 C 77.746 138.831,76.869 139.431,72.006 139.725 L 67.811 139.978 66.362 138.562 C 65.564 137.784,64.501 136.214,63.999 135.073 C 60.573 127.292,60.083 126.445,58.657 125.850 C 53.587 123.731,54.154 104.134,59.488 97.114 C 60.371 95.951,61.965 93.419,63.029 91.487 C 69.469 79.802,83.229 73.046,103.000 71.864 C 107.283 71.608,108.332 71.644,112.200 72.179 M303.600 72.212 C 323.139 74.782,333.585 80.752,341.379 93.800 C 347.230 103.596,346.977 127.728,340.997 130.227 C 339.998 130.644,339.419 131.402,338.263 133.802 C 334.461 141.703,332.640 143.260,330.172 140.721 C 329.227 139.749,327.300 138.391,325.890 137.703 C 323.102 136.344,321.918 135.127,319.667 131.312 C 318.860 129.943,316.846 127.423,315.192 125.712 C 313.025 123.470,311.664 121.594,310.324 119.000 C 308.723 115.903,308.166 115.205,306.332 114.000 C 304.639 112.888,303.943 112.083,302.950 110.087 C 301.423 107.017,300.663 106.147,298.600 105.112 C 296.514 104.066,295.290 102.926,294.400 101.200 C 293.391 99.245,292.143 98.194,289.674 97.225 C 286.300 95.901,283.396 93.830,281.968 91.731 C 281.245 90.669,279.337 88.437,277.728 86.772 L 274.801 83.743 275.235 81.392 C 276.110 76.658,276.396 76.295,280.520 74.664 C 287.908 71.743,294.617 71.030,303.600 72.212 M40.017 72.768 C 39.718 73.326,39.742 73.590,40.103 73.736 C 40.497 73.895,40.496 73.943,40.100 73.968 C 39.825 73.986,39.600 74.191,39.600 74.424 C 39.600 74.657,39.808 74.719,40.062 74.562 C 40.350 74.384,40.415 74.452,40.234 74.745 C 39.845 75.374,39.089 74.867,39.360 74.160 C 39.509 73.771,39.266 73.600,38.564 73.600 C 37.981 73.600,37.659 73.772,37.804 74.007 C 37.942 74.230,38.223 74.309,38.428 74.183 C 38.632 74.056,38.800 74.143,38.800 74.376 C 38.800 74.609,38.485 74.803,38.100 74.806 C 37.564 74.811,37.525 74.891,37.934 75.150 C 38.357 75.419,38.325 75.543,37.779 75.753 C 37.163 75.989,37.154 76.089,37.693 76.708 C 38.025 77.089,38.215 77.670,38.117 78.000 C 38.009 78.365,38.069 78.438,38.270 78.187 C 38.451 77.959,38.855 77.779,39.167 77.787 C 39.667 77.798,39.799 78.167,40.070 80.294 C 40.117 80.659,40.272 80.672,40.667 80.345 C 41.445 79.699,41.351 78.656,40.543 78.966 C 39.996 79.176,39.971 79.117,40.389 78.614 C 40.665 78.281,41.078 78.125,41.307 78.266 C 41.549 78.416,41.604 78.330,41.438 78.062 C 41.281 77.808,41.354 77.600,41.600 77.600 C 41.846 77.600,41.937 77.422,41.803 77.205 C 41.660 76.973,41.830 76.914,42.213 77.060 C 42.648 77.227,42.717 77.404,42.420 77.588 C 42.174 77.740,42.081 78.146,42.214 78.492 C 42.346 78.837,42.262 79.238,42.027 79.383 C 41.792 79.528,41.614 79.952,41.632 80.324 C 41.651 80.740,41.741 80.808,41.865 80.500 C 41.976 80.225,42.367 79.997,42.733 79.994 C 43.250 79.989,43.280 79.912,42.868 79.650 C 42.492 79.412,42.706 79.239,43.594 79.061 C 44.443 78.891,44.755 78.651,44.553 78.324 C 44.321 77.949,44.217 77.948,44.093 78.320 C 44.005 78.584,43.658 78.800,43.322 78.800 C 42.850 78.800,42.895 78.641,43.521 78.100 C 44.612 77.157,44.884 76.001,44.291 74.828 C 43.745 73.747,41.363 72.806,41.755 73.826 C 42.059 74.619,41.599 74.546,40.957 73.700 C 40.297 72.831,40.246 72.257,40.862 72.638 C 41.148 72.815,41.215 72.748,41.038 72.462 C 40.648 71.830,40.494 71.877,40.017 72.768 M36.013 73.300 C 36.006 73.905,36.075 74.400,36.167 74.400 C 36.259 74.400,36.619 74.509,36.967 74.643 C 37.833 74.975,37.762 74.283,36.813 73.144 L 36.027 72.200 36.013 73.300 M363.169 72.900 C 362.891 73.808,362.981 74.452,363.438 74.832 C 363.880 75.198,364.000 75.164,364.000 74.673 C 364.000 74.329,363.817 73.934,363.593 73.796 C 363.370 73.658,363.291 73.377,363.417 73.172 C 363.544 72.968,363.547 72.800,363.424 72.800 C 363.301 72.800,363.186 72.845,363.169 72.900 M36.292 75.042 C 35.815 75.518,35.959 76.000,36.576 76.000 C 36.893 76.000,37.281 75.792,37.438 75.538 C 37.607 75.265,37.549 75.184,37.296 75.341 C 37.061 75.486,36.804 75.413,36.726 75.177 C 36.647 74.942,36.452 74.881,36.292 75.042 M40.920 76.536 C 41.307 77.546,40.554 78.225,39.769 77.574 C 39.388 77.258,39.015 77.045,38.939 77.100 C 38.862 77.155,38.845 77.065,38.900 76.900 C 39.029 76.513,39.760 76.748,39.934 77.232 C 40.008 77.437,40.242 77.498,40.454 77.367 C 40.691 77.220,40.659 76.912,40.370 76.564 C 40.087 76.223,40.063 76.000,40.308 76.000 C 40.532 76.000,40.807 76.241,40.920 76.536 M370.643 86.567 C 370.776 86.915,371.061 87.200,371.276 87.200 C 371.802 87.200,371.473 86.291,370.875 86.092 C 370.582 85.994,370.493 86.177,370.643 86.567 M370.800 88.443 C 370.800 88.976,369.991 89.282,369.292 89.014 C 368.786 88.820,368.746 88.681,369.127 88.445 C 369.776 88.044,370.800 88.043,370.800 88.443 M212.693 91.634 C 227.013 94.752,240.621 102.971,255.457 117.464 C 268.847 130.544,272.142 152.182,263.664 171.349 C 259.466 180.839,245.955 192.729,231.685 199.490 C 229.108 200.710,225.613 202.506,223.917 203.480 C 213.473 209.477,201.771 210.966,191.000 207.668 C 188.800 206.994,185.290 205.918,183.200 205.276 C 181.110 204.635,177.960 203.528,176.200 202.816 C 174.440 202.104,171.110 200.843,168.800 200.014 C 156.180 195.480,145.924 188.997,141.253 182.600 C 137.567 177.552,131.988 166.401,131.446 163.000 C 127.638 139.111,131.704 128.649,150.184 114.795 C 153.933 111.985,158.192 108.631,159.648 107.342 C 164.201 103.315,176.269 96.845,183.600 94.501 C 200.263 89.173,201.036 89.097,212.693 91.634 M30.729 116.755 C 29.856 118.272,28.800 118.575,28.800 117.308 C 28.800 116.855,28.932 116.811,29.323 117.136 C 29.722 117.467,30.011 117.289,30.545 116.385 C 30.930 115.733,31.330 115.200,31.435 115.200 C 31.539 115.200,31.221 115.900,30.729 116.755 M35.846 118.231 C 35.928 118.792,35.848 118.786,35.179 118.181 C 34.761 117.803,34.525 117.321,34.655 117.112 C 34.951 116.632,35.717 117.351,35.846 118.231 M32.582 118.429 C 32.392 118.736,32.441 118.822,32.711 118.655 C 32.949 118.508,33.258 118.570,33.396 118.793 C 33.534 119.017,33.287 119.200,32.847 119.200 C 31.768 119.200,31.414 119.886,32.066 120.718 C 32.547 121.332,32.530 121.345,31.900 120.851 C 31.500 120.537,31.200 120.480,31.200 120.718 C 31.200 121.596,33.912 122.875,34.784 122.409 C 35.784 121.873,35.851 121.546,34.900 121.845 C 34.302 122.033,34.313 121.973,34.976 121.433 C 35.417 121.074,35.536 120.800,35.253 120.800 C 34.978 120.800,34.847 120.648,34.962 120.461 C 35.077 120.275,34.658 119.630,34.030 119.028 C 33.200 118.234,32.804 118.070,32.582 118.429 M29.628 119.839 C 28.553 120.861,28.883 122.667,30.143 122.667 C 30.485 122.667,30.670 122.514,30.555 122.327 C 30.439 122.140,30.177 122.091,29.972 122.217 C 29.768 122.344,29.600 122.287,29.600 122.090 C 29.600 121.246,30.190 121.288,31.286 122.211 C 31.933 122.755,32.673 123.195,32.931 123.188 C 33.189 123.181,33.040 122.976,32.600 122.732 C 30.962 121.823,30.379 121.107,30.833 120.560 C 31.737 119.471,30.679 118.838,29.628 119.839 M34.627 120.696 C 34.574 121.059,34.315 121.428,34.053 121.516 C 33.498 121.701,33.610 120.757,34.200 120.270 C 34.442 120.069,34.377 119.999,34.035 120.091 C 33.220 120.311,33.156 121.533,33.935 121.988 C 34.301 122.201,34.409 122.381,34.176 122.388 C 33.944 122.395,33.404 122.136,32.976 121.813 C 32.437 121.405,32.372 121.222,32.762 121.213 C 33.196 121.203,33.162 121.021,32.612 120.413 C 31.925 119.654,31.929 119.632,32.750 119.790 C 33.218 119.880,33.600 119.762,33.600 119.528 C 33.600 119.246,33.790 119.260,34.162 119.568 C 34.471 119.825,34.680 120.332,34.627 120.696 M30.117 120.788 C 29.746 121.221,29.362 121.496,29.264 121.398 C 29.026 121.159,30.005 120.000,30.445 120.000 C 30.636 120.000,30.489 120.355,30.117 120.788 M34.600 123.014 C 33.940 123.317,33.681 123.572,34.024 123.582 C 34.366 123.592,34.996 123.336,35.424 123.013 C 36.372 122.296,36.169 122.296,34.600 123.014 M370.200 130.376 C 369.760 130.554,369.237 130.605,369.038 130.488 C 368.835 130.369,368.818 130.506,369.000 130.800 C 369.207 131.135,369.167 131.227,368.889 131.055 C 368.651 130.908,368.352 130.954,368.226 131.158 C 367.967 131.577,369.025 131.508,369.455 131.078 C 369.958 130.575,370.332 130.787,370.195 131.500 C 370.122 131.885,370.047 132.436,370.031 132.724 C 370.014 133.012,369.837 133.146,369.637 133.023 C 369.438 132.900,369.369 133.159,369.484 133.600 C 369.778 134.724,366.724 137.778,365.600 137.484 C 365.159 137.369,364.900 137.438,365.023 137.637 C 365.146 137.837,364.967 138.000,364.624 138.000 C 364.281 138.000,363.985 137.865,363.967 137.700 C 363.948 137.535,363.888 136.987,363.832 136.483 C 363.777 135.979,363.882 135.473,364.067 135.359 C 364.251 135.245,364.222 134.814,364.001 134.402 C 363.031 132.589,363.930 130.273,365.136 131.479 C 365.524 131.867,365.819 131.942,365.908 131.676 C 365.987 131.439,366.309 131.344,366.624 131.464 C 366.938 131.585,367.079 131.873,366.936 132.104 C 366.781 132.355,366.870 132.404,367.158 132.226 C 367.530 131.996,367.531 131.799,367.163 131.355 C 366.782 130.896,366.805 130.827,367.279 131.009 C 367.605 131.134,368.069 130.998,368.311 130.708 C 368.552 130.417,369.256 130.150,369.875 130.116 C 370.815 130.063,370.868 130.106,370.200 130.376 M36.800 145.951 C 36.800 146.455,37.974 147.359,38.259 147.074 C 38.669 146.665,38.057 145.600,37.413 145.600 C 37.076 145.600,36.800 145.758,36.800 145.951 M358.979 149.234 C 358.850 149.443,358.598 149.522,358.418 149.411 C 358.238 149.300,357.868 149.477,357.596 149.804 C 357.324 150.132,357.225 150.400,357.375 150.400 C 357.525 150.400,357.534 150.583,357.396 150.807 C 357.258 151.030,356.962 151.100,356.740 150.963 C 356.505 150.817,356.794 150.233,357.428 149.570 C 358.413 148.543,359.560 148.294,358.979 149.234 M362.400 151.000 C 362.764 151.439,362.773 151.600,362.431 151.600 C 362.175 151.600,362.018 151.911,362.082 152.291 C 362.150 152.688,361.945 152.986,361.600 152.991 C 361.270 152.996,360.996 153.270,360.991 153.600 C 360.986 153.945,360.688 154.150,360.291 154.082 C 359.911 154.018,359.600 154.175,359.600 154.431 C 359.600 154.773,359.439 154.764,359.000 154.400 C 358.670 154.126,358.414 153.699,358.432 153.451 C 358.451 153.168,358.538 153.186,358.665 153.500 C 358.776 153.775,359.026 154.000,359.221 154.000 C 359.416 154.000,359.485 153.766,359.376 153.481 C 359.122 152.821,360.997 151.027,361.570 151.382 C 361.807 151.528,362.000 151.472,362.000 151.257 C 362.000 151.042,361.775 150.776,361.500 150.665 C 361.186 150.538,361.168 150.451,361.451 150.432 C 361.699 150.414,362.126 150.670,362.400 151.000 M360.262 152.331 C 359.442 153.238,359.436 153.451,360.221 153.753 C 360.562 153.884,360.744 153.833,360.625 153.641 C 360.345 153.188,361.384 152.317,361.758 152.691 C 361.914 152.848,361.924 152.666,361.778 152.288 C 361.441 151.410,361.087 151.420,360.262 152.331 M349.440 165.387 C 348.583 166.244,348.000 166.593,348.000 166.249 C 348.000 165.633,350.371 163.437,350.690 163.757 C 350.795 163.861,350.232 164.595,349.440 165.387 M351.424 165.413 C 350.996 165.736,350.794 166.000,350.973 166.000 C 351.152 166.000,351.070 166.274,350.792 166.610 C 350.514 166.945,350.194 167.128,350.083 167.016 C 349.971 166.904,349.642 167.125,349.352 167.506 C 348.944 168.044,348.823 168.070,348.813 167.622 C 348.795 166.836,350.800 164.797,351.575 164.813 C 352.076 164.823,352.046 164.942,351.424 165.413 M353.400 166.400 C 353.536 166.620,353.446 166.800,353.200 166.800 C 352.954 166.800,352.844 166.948,352.956 167.129 C 353.184 167.498,351.566 169.037,351.100 168.893 C 350.935 168.842,350.800 168.991,350.800 169.224 C 350.800 169.457,350.620 169.536,350.400 169.400 C 350.180 169.264,350.000 169.322,350.000 169.528 C 350.000 171.113,353.536 170.815,354.424 169.155 C 354.902 168.263,354.259 166.000,353.528 166.000 C 353.322 166.000,353.264 166.180,353.400 166.400 M353.519 169.463 C 352.760 170.222,352.268 170.412,351.608 170.203 C 350.741 169.927,350.749 169.902,351.924 169.188 C 352.586 168.785,353.261 168.038,353.423 167.528 L 353.718 166.600 354.129 167.521 C 354.472 168.288,354.370 168.612,353.519 169.463 M352.726 168.888 C 352.135 169.499,351.788 170.000,351.956 170.000 C 352.335 170.000,354.199 168.045,353.968 167.889 C 353.876 167.826,353.316 168.276,352.726 168.888 M69.397 174.408 C 68.407 176.934,68.417 177.033,69.598 176.401 C 70.283 176.034,70.268 176.189,69.411 178.301 C 68.354 180.908,66.800 181.802,66.800 179.804 C 66.800 179.205,66.628 178.859,66.400 179.000 C 66.180 179.136,66.000 179.051,66.000 178.811 C 66.000 178.571,66.275 178.269,66.612 178.140 C 67.148 177.934,67.141 177.845,66.556 177.417 C 65.939 176.966,65.938 176.909,66.544 176.677 C 66.905 176.538,67.197 176.194,67.194 175.913 C 67.190 175.554,67.071 175.580,66.800 176.000 C 66.278 176.808,66.290 175.941,66.821 174.545 L 67.242 173.438 66.328 174.219 C 65.825 174.649,65.610 174.730,65.850 174.400 C 66.090 174.070,66.240 173.207,66.182 172.483 C 66.102 171.475,66.194 171.263,66.572 171.577 C 66.926 171.870,67.086 171.818,67.133 171.394 C 67.170 171.067,67.230 170.539,67.267 170.219 C 67.315 169.799,67.748 169.967,68.834 170.827 L 70.335 172.015 69.397 174.408 M350.132 174.546 C 351.476 175.108,353.598 177.299,353.602 178.131 C 353.604 178.389,353.863 179.095,354.179 179.700 C 354.683 180.666,354.680 180.800,354.153 180.800 C 353.789 180.800,353.664 180.997,353.835 181.300 C 354.061 181.700,354.010 181.700,353.579 181.300 C 352.802 180.579,352.271 180.685,352.581 181.500 C 352.784 182.034,352.736 182.090,352.379 181.735 C 351.757 181.118,352.304 180.284,353.140 180.574 C 353.718 180.774,353.725 180.740,353.200 180.301 C 352.870 180.025,352.102 179.134,351.494 178.319 C 350.886 177.505,349.851 176.521,349.194 176.133 C 346.961 174.813,347.715 173.536,350.132 174.546 M351.351 178.797 C 352.137 179.985,352.200 180.297,351.744 180.723 C 351.445 181.003,351.200 181.064,351.200 180.860 C 351.200 180.263,349.826 180.543,349.528 181.200 C 349.306 181.691,349.251 181.673,349.228 181.100 C 349.213 180.715,349.009 180.400,348.776 180.400 C 348.543 180.400,348.464 180.580,348.600 180.800 C 348.736 181.020,348.657 181.200,348.424 181.200 C 348.191 181.200,347.987 180.975,347.972 180.700 C 347.919 179.753,347.906 176.999,347.953 176.477 C 348.029 175.633,350.269 177.163,351.351 178.797 M44.215 209.975 C 44.088 210.182,44.302 210.536,44.692 210.763 C 45.106 211.005,45.187 211.181,44.886 211.188 C 44.506 211.197,44.477 211.397,44.778 211.958 C 45.077 212.517,45.033 212.841,44.609 213.192 C 44.024 213.678,43.033 213.394,43.376 212.839 C 43.480 212.671,43.303 212.503,42.982 212.467 C 42.662 212.430,42.147 212.370,41.838 212.333 C 41.529 212.297,41.374 212.012,41.494 211.700 C 41.613 211.388,41.821 211.293,41.956 211.488 C 42.090 211.684,42.515 211.519,42.900 211.122 C 43.285 210.725,43.499 210.400,43.376 210.400 C 43.253 210.400,43.264 210.220,43.400 210.000 C 43.536 209.780,43.827 209.600,44.047 209.600 C 44.267 209.600,44.343 209.769,44.215 209.975 M377.669 214.262 C 378.551 215.061,378.612 215.560,377.812 215.443 C 376.905 215.310,375.877 213.600,376.704 213.600 C 376.832 213.600,377.266 213.898,377.669 214.262 M146.063 215.833 C 150.936 218.352,153.730 221.005,155.618 224.901 C 156.279 226.266,157.346 227.926,157.989 228.591 C 160.615 231.305,162.004 238.126,161.983 248.200 C 161.958 259.557,160.878 263.737,157.157 266.875 C 155.776 268.039,154.722 269.555,153.038 272.795 C 150.136 278.380,149.434 278.825,142.000 279.777 C 137.908 280.301,131.141 277.731,130.130 275.269 C 128.904 272.283,127.181 269.167,125.400 266.717 C 121.769 261.721,121.154 259.618,120.390 249.591 C 119.770 241.448,120.897 236.384,123.825 234.150 C 126.638 232.005,127.130 231.320,128.000 228.350 C 128.896 225.292,129.976 223.317,131.690 221.600 C 132.239 221.050,132.984 220.023,133.345 219.319 C 135.798 214.529,140.859 213.141,146.063 215.833 M265.472 216.031 C 268.885 217.744,270.156 219.404,269.520 221.319 C 268.851 223.334,268.386 223.655,266.791 223.197 C 264.278 222.477,258.767 222.701,257.320 223.583 C 253.176 226.110,256.183 238.833,260.914 238.788 C 267.216 238.727,270.391 237.268,270.409 234.425 C 270.455 226.928,278.461 226.490,280.532 233.872 C 282.012 239.147,280.668 264.733,278.708 268.600 C 278.158 269.684,276.341 271.600,275.863 271.600 C 275.032 271.600,272.687 273.773,272.162 275.029 C 271.496 276.624,268.976 279.157,267.828 279.386 C 261.649 280.618,256.616 279.685,253.784 276.783 C 252.913 275.890,251.455 274.723,250.543 274.188 C 248.522 273.003,246.577 270.167,245.756 267.208 C 244.880 264.050,244.061 262.009,243.162 260.747 C 239.983 256.282,239.643 244.631,242.463 236.802 C 243.137 234.931,243.996 231.851,244.372 229.958 C 245.352 225.018,246.531 222.951,249.482 221.000 C 250.813 220.120,252.273 218.835,252.726 218.144 C 255.128 214.481,260.584 213.577,265.472 216.031 M136.003 222.757 C 134.293 223.233,133.991 224.479,134.100 230.600 L 134.200 236.200 136.200 237.269 C 140.543 239.592,142.932 238.385,144.257 233.200 C 146.394 224.842,143.170 220.763,136.003 222.757 M36.400 225.002 C 36.400 225.324,36.641 225.482,36.951 225.363 C 37.886 225.005,38.038 227.599,37.163 229.000 C 35.604 231.498,35.642 231.464,35.206 230.800 C 34.943 230.399,34.810 230.366,34.806 230.700 C 34.803 230.975,34.609 231.200,34.376 231.200 C 34.143 231.200,34.064 231.020,34.200 230.800 C 34.408 230.463,33.310 230.199,32.314 230.348 C 32.157 230.371,32.133 230.118,32.261 229.785 C 32.453 229.286,32.608 229.269,33.147 229.690 C 33.724 230.140,33.738 230.121,33.271 229.524 C 32.980 229.152,32.489 228.944,32.181 229.063 C 31.873 229.181,31.355 229.012,31.031 228.688 C 30.325 227.982,30.908 226.983,32.200 226.680 C 32.835 226.531,32.787 226.483,31.967 226.446 C 31.353 226.419,30.933 226.165,30.933 225.822 C 30.933 225.415,31.124 225.345,31.573 225.586 C 31.973 225.799,32.587 225.721,33.207 225.378 C 33.753 225.076,34.054 224.822,33.876 224.814 C 33.698 224.806,33.669 224.611,33.812 224.381 C 33.989 224.095,34.254 224.113,34.645 224.438 C 34.961 224.700,35.335 224.798,35.476 224.657 C 35.618 224.516,35.523 224.400,35.267 224.400 C 35.010 224.400,34.800 224.214,34.800 223.986 C 34.800 223.705,35.058 223.710,35.600 224.000 C 36.040 224.235,36.400 224.686,36.400 225.002 M141.278 226.275 C 142.805 227.738,142.328 231.362,140.231 234.224 C 139.539 235.168,137.201 230.779,137.200 228.536 C 137.200 226.031,139.622 224.688,141.278 226.275 M262.020 227.010 C 263.470 227.760,263.521 228.694,262.260 231.400 C 260.475 235.227,260.036 235.158,259.008 230.884 C 258.038 226.853,259.092 225.496,262.020 227.010 M384.132 230.546 C 384.535 230.870,385.130 231.465,385.454 231.868 C 386.003 232.549,386.014 232.538,385.613 231.709 C 385.376 231.219,384.781 230.624,384.291 230.387 C 383.462 229.986,383.451 229.997,384.132 230.546 M381.358 231.268 C 381.162 231.585,381.289 231.651,381.755 231.473 C 382.133 231.328,382.349 231.360,382.235 231.543 C 381.955 231.997,384.179 234.087,384.549 233.718 C 384.710 233.556,384.712 233.763,384.553 234.178 C 384.353 234.699,384.407 234.843,384.727 234.645 C 385.030 234.458,385.108 234.574,384.952 234.980 C 384.770 235.455,384.457 235.248,383.625 234.101 C 383.025 233.275,382.051 232.343,381.460 232.028 C 380.685 231.616,380.526 231.367,380.892 231.134 C 381.591 230.691,381.696 230.721,381.358 231.268 M371.798 234.003 C 371.661 234.224,371.831 234.514,372.175 234.646 C 372.519 234.778,372.800 235.074,372.800 235.305 C 372.800 235.535,372.444 235.402,372.009 235.009 C 371.325 234.389,371.234 233.600,371.847 233.600 C 371.957 233.600,371.935 233.781,371.798 234.003 M18.736 240.506 C 17.930 241.218,16.603 242.790,15.786 244.000 C 14.369 246.099,14.252 245.775,15.408 242.946 C 15.690 242.256,16.469 241.368,17.139 240.973 C 17.808 240.577,18.248 240.078,18.116 239.865 C 17.984 239.651,18.048 239.582,18.257 239.712 C 18.467 239.841,18.900 239.782,19.219 239.580 C 20.373 238.850,20.171 239.238,18.736 240.506 M18.520 242.634 C 17.684 243.643,17.060 244.678,17.133 244.934 C 17.207 245.190,17.131 245.265,16.966 245.099 C 16.800 244.934,16.301 245.114,15.857 245.499 C 14.724 246.482,16.459 243.900,18.142 242.100 C 19.973 240.141,20.255 240.540,18.520 242.634 M19.557 243.067 C 19.188 243.521,19.169 243.652,19.500 243.453 C 19.856 243.240,20.000 243.499,20.000 244.353 C 20.000 245.013,19.792 245.682,19.537 245.839 C 19.220 246.035,19.145 245.855,19.298 245.269 C 19.530 244.382,18.397 244.633,17.799 245.602 C 17.663 245.821,17.361 246.000,17.127 246.000 C 16.859 246.000,16.886 245.778,17.200 245.400 C 17.474 245.070,17.551 244.800,17.371 244.800 C 17.190 244.800,17.651 244.173,18.394 243.406 C 19.740 242.017,20.616 241.762,19.557 243.067 M96.200 244.057 C 99.318 245.038,101.082 245.911,104.200 248.014 L 108.200 250.712 111.889 250.879 C 116.404 251.083,115.914 250.457,116.628 256.926 C 117.679 266.454,118.940 269.747,122.400 272.008 C 123.853 272.957,124.547 273.861,126.000 276.692 C 128.409 281.386,131.277 282.686,141.712 283.811 L 144.024 284.061 142.830 286.148 C 142.173 287.295,141.513 289.037,141.362 290.017 C 141.132 291.509,140.737 292.116,138.940 293.736 C 136.615 295.831,134.989 298.280,134.328 300.681 C 134.093 301.535,133.261 302.813,132.428 303.600 C 131.613 304.370,129.923 306.297,128.671 307.881 C 124.274 313.450,120.677 314.190,110.400 311.641 C 94.044 307.584,80.650 299.811,70.800 288.658 C 51.534 266.843,69.327 235.599,96.200 244.057 M320.649 245.787 C 334.039 250.027,340.400 258.441,340.400 271.913 C 340.400 280.475,335.612 289.862,328.727 294.800 C 326.733 296.230,323.549 298.535,321.651 299.922 C 319.753 301.309,316.580 303.224,314.600 304.176 C 299.241 311.563,296.102 312.686,288.191 313.626 L 284.182 314.102 280.191 312.649 C 274.449 310.558,274.358 310.494,272.858 307.475 C 272.120 305.989,270.663 303.834,269.619 302.687 C 268.576 301.539,267.221 299.478,266.609 298.106 C 265.880 296.473,264.792 294.955,263.455 293.706 C 262.151 292.489,261.181 291.149,260.772 290.000 C 260.419 289.010,259.743 287.255,259.271 286.100 C 258.798 284.945,258.572 284.000,258.768 284.000 C 267.789 284.000,273.654 281.770,275.176 277.760 C 275.808 276.094,276.130 275.757,277.537 275.288 C 281.515 273.962,281.924 272.819,283.833 257.709 C 284.028 256.162,284.172 255.984,285.523 255.616 C 291.415 254.012,292.469 253.585,295.606 251.539 C 301.214 247.881,305.051 246.319,311.200 245.187 C 316.268 244.255,315.694 244.218,320.649 245.787 M13.092 262.291 C 13.005 263.121,12.933 262.540,12.931 261.000 C 12.929 259.460,13.000 258.781,13.089 259.491 C 13.177 260.201,13.179 261.461,13.092 262.291 M387.400 274.400 C 387.246 275.310,387.042 275.976,386.947 275.880 C 386.852 275.785,386.893 274.957,387.040 274.040 C 387.187 273.123,387.390 272.457,387.493 272.560 C 387.596 272.662,387.554 273.490,387.400 274.400 M381.941 292.616 C 380.361 294.274,379.592 294.441,380.142 293.007 C 380.313 292.562,382.886 290.902,383.536 290.818 C 383.611 290.808,382.893 291.617,381.941 292.616 M20.232 295.800 C 20.307 298.440,20.363 301.725,20.358 303.100 C 20.351 304.750,20.508 305.600,20.817 305.600 C 21.076 305.600,21.179 305.877,21.047 306.221 C 20.916 306.562,20.973 306.741,21.172 306.617 C 21.372 306.494,21.788 306.645,22.096 306.953 C 22.504 307.361,22.853 307.402,23.383 307.106 C 23.906 306.813,24.032 306.825,23.832 307.148 C 23.632 307.471,23.834 307.491,24.550 307.219 C 25.259 306.950,25.593 306.979,25.708 307.320 C 25.834 307.692,26.000 307.693,26.448 307.323 C 27.751 306.248,28.071 307.307,28.027 312.545 C 27.991 316.868,28.075 317.600,28.607 317.600 C 29.097 317.600,29.141 317.437,28.814 316.826 C 28.215 315.706,28.303 315.201,29.100 315.194 C 29.685 315.189,29.704 315.127,29.214 314.817 C 28.750 314.524,28.650 313.623,28.738 310.523 C 28.799 308.365,28.836 306.330,28.821 306.000 C 28.783 305.207,28.858 302.897,28.971 301.400 C 29.020 300.740,28.890 299.975,28.682 299.700 C 28.473 299.425,28.436 299.200,28.600 299.200 C 28.764 299.200,28.677 298.934,28.407 298.608 C 28.084 298.219,27.444 298.076,26.544 298.191 C 25.790 298.288,25.270 298.210,25.389 298.019 C 25.507 297.827,25.313 297.713,24.957 297.765 C 24.601 297.817,24.141 298.162,23.935 298.530 C 23.729 298.899,23.344 299.197,23.080 299.194 C 22.753 299.190,22.736 299.094,23.029 298.894 C 23.738 298.409,23.979 297.333,23.379 297.333 C 23.080 297.333,22.918 297.468,23.020 297.633 C 23.384 298.221,22.187 298.284,21.528 297.711 C 20.920 297.182,20.878 297.213,21.091 298.026 C 21.253 298.647,21.183 298.837,20.863 298.639 C 20.298 298.290,20.260 296.419,20.790 295.026 C 21.019 294.423,21.029 294.000,20.814 294.000 C 20.613 294.000,20.369 293.325,20.273 292.500 C 20.176 291.675,20.158 293.160,20.232 295.800 M383.600 293.325 C 383.600 293.394,383.015 293.979,382.300 294.625 L 381.000 295.800 382.175 294.500 C 383.270 293.288,383.600 293.016,383.600 293.325 M20.800 296.133 C 20.800 296.427,21.053 296.667,21.362 296.667 C 21.671 296.667,21.832 296.427,21.719 296.133 C 21.607 295.840,21.354 295.600,21.157 295.600 C 20.961 295.600,20.800 295.840,20.800 296.133 M188.800 297.208 C 183.556 297.817,180.272 298.694,177.907 300.119 C 176.658 300.871,174.774 301.724,173.718 302.014 C 167.284 303.788,165.381 309.682,168.040 319.600 C 169.288 324.256,169.577 324.795,172.583 328.066 C 174.132 329.752,175.942 331.905,176.605 332.850 C 177.267 333.794,178.853 335.361,180.129 336.331 C 181.405 337.301,182.910 338.838,183.473 339.747 C 184.910 342.068,186.271 343.455,188.706 345.080 C 189.864 345.853,191.472 347.430,192.279 348.585 C 194.584 351.884,195.535 352.355,200.513 352.659 C 205.449 352.961,206.545 352.511,209.426 348.994 C 210.264 347.972,211.765 346.575,212.762 345.889 C 214.953 344.381,216.163 343.085,217.204 341.128 C 217.635 340.318,218.745 339.058,219.671 338.328 C 222.221 336.316,229.736 328.597,231.089 326.600 C 231.536 325.940,232.465 324.050,233.153 322.400 C 233.841 320.750,235.020 318.626,235.773 317.680 C 236.842 316.337,237.108 315.678,236.982 314.680 C 236.894 313.976,236.710 312.163,236.574 310.651 C 236.193 306.425,233.259 303.615,226.958 301.440 C 225.441 300.916,223.362 300.013,222.339 299.431 C 218.584 297.300,199.121 296.010,188.800 297.208 M209.978 299.212 C 213.265 299.558,214.018 299.787,215.778 300.975 C 217.867 302.387,222.118 303.732,226.000 304.212 C 228.395 304.508,230.008 305.322,231.672 307.072 C 233.234 308.716,233.724 315.005,232.480 317.444 C 232.030 318.326,231.368 320.181,231.009 321.565 C 230.207 324.660,228.874 326.703,226.843 327.950 C 225.992 328.472,224.817 329.659,224.231 330.586 C 222.956 332.603,220.756 334.744,218.696 335.973 C 217.845 336.481,216.732 337.679,216.131 338.735 C 214.751 341.159,213.377 342.655,211.400 343.889 C 210.520 344.437,208.584 346.147,207.098 347.688 L 204.396 350.490 202.498 350.222 C 195.549 349.242,195.685 349.295,194.227 347.015 C 193.425 345.762,192.139 344.452,191.028 343.759 C 190.007 343.122,188.592 342.233,187.885 341.785 C 187.178 341.337,186.181 340.167,185.670 339.185 C 184.499 336.939,182.997 335.332,181.200 334.402 C 179.385 333.463,178.235 332.185,177.419 330.200 C 176.684 328.412,174.365 325.831,172.719 324.966 C 170.869 323.995,169.200 317.994,169.200 312.312 L 169.200 307.834 170.681 306.317 C 171.751 305.222,172.501 304.799,173.381 304.795 C 174.552 304.791,181.022 303.301,183.979 302.356 C 184.760 302.106,186.030 301.430,186.799 300.854 C 189.238 299.030,200.604 298.225,209.978 299.212 M379.600 300.000 C 379.600 300.440,379.414 300.800,379.186 300.800 C 378.908 300.800,378.915 301.068,379.208 301.615 C 379.784 302.692,379.559 305.831,378.914 305.705 C 378.634 305.650,378.525 305.861,378.657 306.205 C 379.393 308.122,380.000 306.673,380.000 303.000 C 380.000 300.910,379.910 299.200,379.800 299.200 C 379.690 299.200,379.600 299.560,379.600 300.000 M378.667 309.137 C 379.296 311.616,379.303 311.711,378.842 311.426 C 378.507 311.219,378.437 311.409,378.605 312.077 C 378.781 312.780,378.564 313.274,377.756 314.011 C 377.159 314.555,376.820 314.744,377.001 314.432 C 377.258 313.990,377.161 313.934,376.566 314.177 C 374.866 314.873,374.265 314.942,374.599 314.401 C 374.821 314.043,374.768 313.972,374.435 314.179 C 374.166 314.345,374.043 314.735,374.162 315.045 C 374.343 315.516,374.185 315.509,373.213 315.007 L 372.048 314.404 371.776 316.221 C 371.626 317.220,371.615 318.149,371.752 318.285 C 371.888 318.422,372.000 317.963,372.000 317.267 C 372.000 316.132,372.122 316.000,373.176 316.000 C 373.823 316.000,374.457 315.832,374.584 315.626 C 374.711 315.421,375.401 315.348,376.117 315.464 C 378.304 315.819,379.235 314.706,379.499 311.424 C 379.650 309.536,379.586 308.761,379.294 308.942 C 379.060 309.087,378.792 309.069,378.700 308.902 C 378.607 308.736,378.592 308.842,378.667 309.137 M375.780 311.632 C 375.633 311.870,374.947 312.410,374.256 312.831 C 373.565 313.252,373.222 313.598,373.494 313.599 C 374.006 313.600,376.813 311.232,376.324 311.212 C 376.172 311.205,375.927 311.395,375.780 311.632 M376.600 312.800 C 376.202 313.240,376.078 313.600,376.324 313.600 C 376.570 313.600,376.965 313.240,377.200 312.800 C 377.435 312.360,377.560 312.000,377.476 312.000 C 377.392 312.000,376.998 312.360,376.600 312.800 M28.400 320.667 C 28.400 321.467,28.720 322.320,29.200 322.800 C 30.157 323.757,32.667 323.918,32.667 323.022 C 32.667 322.593,32.484 322.541,31.960 322.822 C 31.049 323.309,30.689 323.303,30.997 322.805 C 31.132 322.587,30.991 322.505,30.685 322.623 C 29.979 322.894,29.034 321.792,29.427 321.156 C 29.615 320.852,29.554 320.781,29.262 320.962 C 28.701 321.308,28.672 320.986,29.178 320.040 C 29.459 319.516,29.407 319.333,28.978 319.333 C 28.590 319.333,28.400 319.770,28.400 320.667 M371.484 321.200 C 371.369 321.639,371.438 322.100,371.638 322.223 C 371.837 322.346,372.000 321.987,372.000 321.424 C 372.000 320.198,371.772 320.099,371.484 321.200 M34.400 323.386 C 34.400 323.733,34.747 324.000,35.200 324.000 C 35.640 324.000,36.000 323.916,36.000 323.814 C 36.000 323.712,35.640 323.435,35.200 323.200 C 34.561 322.858,34.400 322.896,34.400 323.386 M371.066 324.141 C 370.892 324.988,370.846 325.779,370.965 325.898 C 371.327 326.261,371.668 324.937,371.522 323.734 C 371.394 322.678,371.363 322.705,371.066 324.141 M370.516 327.201 C 370.631 327.641,370.562 327.900,370.363 327.777 C 370.019 327.565,369.931 327.804,369.839 329.199 C 369.817 329.529,369.529 329.817,369.199 329.839 C 367.804 329.931,367.565 330.019,367.777 330.363 C 367.900 330.562,367.641 330.631,367.201 330.516 C 366.753 330.399,366.400 330.504,366.400 330.753 C 366.400 332.072,369.986 330.626,370.722 329.011 C 371.323 327.692,371.338 326.400,370.753 326.400 C 370.504 326.400,370.399 326.753,370.516 327.201 M36.000 329.800 C 36.000 330.350,36.155 330.800,36.345 330.800 C 36.534 330.800,36.603 330.350,36.498 329.800 C 36.393 329.250,36.238 328.800,36.153 328.800 C 36.069 328.800,36.000 329.250,36.000 329.800 M364.045 331.345 C 363.679 331.787,363.785 331.854,364.602 331.697 C 365.158 331.591,365.710 331.346,365.830 331.152 C 366.186 330.575,364.537 330.753,364.045 331.345 M36.423 333.676 C 36.471 338.207,37.731 339.525,42.067 339.577 C 43.153 339.591,44.028 339.809,44.160 340.100 C 44.284 340.375,44.339 340.240,44.281 339.800 C 44.195 339.147,43.921 339.021,42.788 339.116 C 41.687 339.208,41.524 339.140,42.000 338.784 C 42.477 338.427,42.379 338.383,41.523 338.570 C 39.212 339.072,36.923 336.800,37.424 334.503 C 37.618 333.612,37.575 333.515,37.199 334.000 C 36.825 334.481,36.776 334.345,36.953 333.316 C 37.075 332.609,37.000 331.923,36.787 331.792 C 36.555 331.649,36.409 332.405,36.423 333.676 M38.400 332.741 C 38.400 333.474,40.288 335.827,41.569 336.690 C 43.052 337.690,43.600 337.821,43.600 337.176 C 43.600 336.943,43.420 336.864,43.200 337.000 C 42.980 337.136,42.800 337.046,42.800 336.800 C 42.800 336.554,42.639 336.452,42.442 336.574 C 42.102 336.784,41.509 335.858,41.435 335.000 C 41.416 334.780,41.220 334.584,41.000 334.565 C 40.142 334.491,39.216 333.898,39.426 333.558 C 39.548 333.361,39.446 333.200,39.200 333.200 C 38.954 333.200,38.864 333.020,39.000 332.800 C 39.136 332.580,39.057 332.400,38.824 332.400 C 38.591 332.400,38.400 332.553,38.400 332.741 M363.515 333.600 C 363.418 334.260,363.487 334.800,363.669 334.800 C 363.851 334.800,364.000 334.260,364.000 333.600 C 364.000 332.940,363.930 332.400,363.845 332.400 C 363.760 332.400,363.612 332.940,363.515 333.600 M41.037 334.897 C 41.237 334.733,41.267 334.763,41.103 334.963 C 40.940 335.163,41.007 335.568,41.252 335.863 C 42.087 336.869,41.343 336.404,40.370 335.312 C 39.836 334.714,39.687 334.442,40.037 334.709 C 40.387 334.975,40.837 335.060,41.037 334.897 M37.616 335.531 C 37.595 336.220,39.780 338.405,40.469 338.384 C 40.761 338.375,40.509 338.101,39.908 337.776 C 39.308 337.450,38.550 336.692,38.224 336.092 C 37.899 335.491,37.625 335.239,37.616 335.531 M362.400 338.600 C 361.391 339.674,361.923 340.020,362.971 338.971 C 363.528 338.415,363.824 337.600,363.470 337.600 C 363.398 337.600,362.917 338.050,362.400 338.600 M357.400 339.600 L 356.200 339.905 357.500 339.953 C 358.215 339.979,358.800 339.820,358.800 339.600 C 358.800 339.380,358.755 339.221,358.700 339.247 C 358.645 339.273,358.060 339.432,357.400 339.600 M52.800 353.000 C 52.800 353.330,53.160 353.960,53.600 354.400 C 54.437 355.237,55.600 355.477,55.600 354.813 C 55.600 354.599,55.300 354.540,54.934 354.681 C 54.520 354.840,54.367 354.777,54.530 354.513 C 54.853 353.991,53.850 353.095,53.399 353.503 C 53.220 353.667,53.186 353.485,53.324 353.100 C 53.462 352.715,53.401 352.400,53.187 352.400 C 52.974 352.400,52.800 352.670,52.800 353.000 M339.280 356.080 C 339.016 356.344,338.796 356.929,338.791 357.380 C 338.760 360.316,337.048 361.909,332.729 363.021 L 330.600 363.569 333.400 363.343 C 337.918 362.977,338.829 362.153,339.392 357.925 C 339.612 356.274,339.771 356.029,340.721 355.884 L 341.800 355.720 340.780 355.660 C 340.219 355.627,339.544 355.816,339.280 356.080 M61.442 357.100 C 62.219 360.415,63.274 361.496,66.721 362.504 C 69.165 363.219,69.351 362.725,67.169 361.315 C 64.404 359.527,63.980 359.128,63.190 357.580 C 62.235 355.709,61.040 355.380,61.442 357.100 M84.400 364.910 C 84.400 365.435,84.832 366.717,85.359 367.759 C 86.094 369.210,86.174 369.599,85.703 369.418 C 85.193 369.222,85.174 369.286,85.590 369.788 C 85.867 370.121,86.747 370.558,87.547 370.758 C 89.179 371.166,94.879 371.677,94.098 371.345 C 93.821 371.228,93.667 371.012,93.756 370.866 C 93.844 370.720,93.099 370.562,92.101 370.515 C 88.758 370.358,85.686 368.229,85.008 365.600 C 84.832 364.916,85.046 365.106,85.687 366.199 C 86.658 367.856,88.899 369.365,91.000 369.777 C 91.989 369.971,91.933 369.908,90.683 369.421 C 88.439 368.547,86.713 367.205,86.970 366.534 C 87.091 366.217,87.058 366.041,86.895 366.141 C 86.733 366.241,86.576 365.920,86.546 365.427 C 86.499 364.637,86.683 364.725,88.093 366.165 L 89.694 367.800 88.234 366.013 C 86.478 363.863,84.400 363.265,84.400 364.910 M88.188 364.381 C 88.318 364.591,89.004 365.162,89.712 365.650 L 91.000 366.536 89.825 365.268 C 88.739 364.095,87.646 363.503,88.188 364.381 M315.226 364.416 C 315.795 364.768,315.423 366.038,314.116 368.200 L 313.149 369.800 314.475 368.312 C 315.204 367.494,316.312 366.190,316.938 365.414 L 318.076 364.003 316.422 364.068 C 315.512 364.103,314.974 364.260,315.226 364.416 M317.694 365.950 C 316.755 366.967,315.727 368.182,315.408 368.648 C 314.475 370.012,312.184 370.850,308.912 371.026 C 307.244 371.115,305.771 371.306,305.639 371.449 C 305.508 371.593,307.303 371.607,309.629 371.481 C 316.280 371.122,320.607 368.779,321.781 364.900 C 322.322 363.116,319.682 363.794,317.694 365.950 M95.400 371.200 C 94.733 371.486,94.821 371.548,95.924 371.572 C 96.710 371.589,97.147 371.438,97.000 371.200 C 96.712 370.734,96.485 370.734,95.400 371.200 M105.913 371.895 C 107.076 371.976,108.876 371.976,109.913 371.893 C 110.951 371.811,110.000 371.745,107.800 371.746 C 105.600 371.747,104.751 371.814,105.913 371.895 M268.918 371.898 C 270.633 371.973,273.333 371.972,274.918 371.897 C 276.503 371.821,275.100 371.759,271.800 371.760 C 268.500 371.761,267.203 371.822,268.918 371.898 M293.116 371.897 C 294.499 371.975,296.659 371.974,297.916 371.895 C 299.172 371.816,298.040 371.752,295.400 371.753 C 292.760 371.753,291.732 371.818,293.116 371.897 M156.836 374.513 C 156.718 376.840,159.174 379.293,161.487 379.159 C 161.879 379.136,161.544 378.942,160.742 378.729 C 158.969 378.256,157.797 377.066,157.269 375.200 C 157.051 374.430,156.856 374.121,156.836 374.513 M172.812 385.100 C 172.797 385.736,174.244 387.200,174.889 387.200 C 175.158 387.200,174.983 386.924,174.501 386.586 C 174.018 386.248,173.444 385.663,173.224 385.286 C 172.997 384.896,172.819 384.816,172.812 385.100 ",
        stroke: "none",
        fill: "#754e29",
        fillRule: "evenodd"
      }
    ), /* @__PURE__ */ import_react35.default.createElement(
      "path",
      {
        id: "path1",
        d: "M64.800 37.269 C 62.342 37.965,60.116 41.659,60.931 43.689 C 61.044 43.970,61.155 43.750,61.177 43.200 C 61.298 40.201,63.300 38.034,66.687 37.237 C 67.732 36.991,67.891 36.879,67.200 36.876 C 66.650 36.874,65.570 37.051,64.800 37.269 M131.465 37.904 C 131.869 38.614,132.424 39.196,132.699 39.197 C 133.503 39.202,136.389 42.017,136.649 43.051 C 136.874 43.948,138.000 44.427,138.000 43.626 C 138.000 41.751,135.750 39.037,133.634 38.359 C 132.845 38.106,131.869 37.609,131.465 37.255 C 130.751 36.631,130.751 36.650,131.465 37.904 M269.600 37.600 C 269.160 38.040,268.812 38.625,268.827 38.900 C 268.842 39.175,269.041 39.014,269.269 38.542 C 269.498 38.071,270.071 37.498,270.542 37.269 C 271.014 37.041,271.175 36.842,270.900 36.827 C 270.625 36.812,270.040 37.160,269.600 37.600 M147.753 49.266 L 147.800 51.933 149.530 52.072 C 152.618 52.320,152.505 50.669,149.290 48.600 C 148.606 48.160,147.970 47.530,147.876 47.200 C 147.782 46.870,147.727 47.800,147.753 49.266 M349.522 48.060 C 350.248 48.525,351.283 49.554,351.822 50.346 C 352.360 51.138,352.800 51.540,352.800 51.240 C 352.800 50.523,349.464 47.198,348.753 47.207 C 348.449 47.210,348.795 47.594,349.522 48.060 M157.799 55.073 C 159.239 55.886,160.114 56.761,160.927 58.201 C 161.845 59.828,162.010 59.976,161.810 59.000 C 161.348 56.745,159.255 54.652,157.000 54.190 C 156.024 53.990,156.172 54.155,157.799 55.073 M41.882 61.685 C 39.082 62.428,35.389 68.401,37.821 68.253 C 38.303 68.224,38.633 68.020,38.554 67.800 C 38.209 66.843,40.275 64.167,42.105 63.200 C 43.146 62.650,43.998 61.975,43.999 61.700 C 44.000 61.134,43.962 61.134,41.882 61.685 M41.218 64.631 C 39.682 66.019,38.884 67.418,39.359 67.892 C 39.486 68.019,40.319 67.296,41.209 66.284 C 42.100 65.273,43.185 64.332,43.620 64.194 C 44.055 64.055,44.308 63.775,44.182 63.571 C 43.746 62.866,42.796 63.205,41.218 64.631 M42.275 66.322 C 41.684 66.939,41.200 67.662,41.200 67.928 C 41.200 68.195,41.695 67.906,42.300 67.287 C 42.905 66.668,43.054 66.575,42.630 67.081 L 41.861 68.000 42.943 68.000 C 43.931 68.000,44.017 67.878,43.931 66.600 C 43.817 64.908,43.655 64.881,42.275 66.322 M33.581 81.628 C 32.743 82.524,31.909 83.420,31.728 83.620 C 31.548 83.821,30.905 84.393,30.300 84.892 C 29.627 85.447,29.113 86.344,28.978 87.200 L 28.758 88.600 29.347 87.330 C 30.288 85.301,33.160 83.890,34.652 84.725 C 35.273 85.072,35.189 85.194,33.981 85.699 C 33.221 86.016,32.330 86.608,32.000 87.014 C 31.563 87.552,31.745 87.500,32.671 86.823 C 33.409 86.283,34.215 85.997,34.592 86.142 C 34.971 86.287,35.140 86.226,34.997 85.995 C 34.863 85.778,35.033 85.600,35.376 85.600 C 35.882 85.600,36.000 85.069,36.000 82.800 C 36.000 79.501,35.706 79.359,33.581 81.628 M28.501 90.600 C 28.505 91.480,28.587 91.793,28.683 91.295 C 28.779 90.798,28.775 90.078,28.675 89.695 C 28.575 89.313,28.496 89.720,28.501 90.600 M103.600 90.583 C 99.694 91.826,95.513 93.609,85.968 98.106 C 80.699 100.587,74.871 107.376,72.403 113.906 C 71.034 117.527,71.850 123.209,74.061 125.462 L 75.709 127.141 77.002 125.771 C 77.713 125.017,78.563 124.400,78.892 124.400 C 79.221 124.400,80.161 123.867,80.980 123.216 C 81.800 122.565,82.805 121.925,83.215 121.795 C 83.624 121.665,84.067 121.163,84.198 120.680 C 84.501 119.567,86.306 114.611,87.027 112.915 C 87.550 111.683,90.025 110.000,91.314 110.000 C 92.184 110.000,93.488 108.324,93.805 106.800 C 94.424 103.825,96.491 101.605,98.646 101.601 C 100.478 101.598,101.600 100.133,101.600 97.745 C 101.600 94.060,102.189 93.401,105.834 93.011 C 108.909 92.682,109.497 92.135,108.615 90.429 C 108.265 89.753,107.939 89.210,107.890 89.223 C 107.840 89.236,105.910 89.848,103.600 90.583 M304.190 93.358 C 302.793 93.967,302.034 95.397,301.726 97.997 L 301.509 99.831 303.441 100.431 C 305.783 101.158,306.688 102.486,307.108 105.808 C 307.426 108.318,307.638 108.542,310.346 109.219 C 312.564 109.774,313.830 111.042,314.373 113.254 C 315.335 117.170,315.713 117.616,318.564 118.206 C 320.283 118.562,322.249 120.723,322.570 122.610 C 322.718 123.484,323.157 124.619,323.544 125.130 L 324.249 126.060 326.601 125.233 C 329.739 124.130,329.712 124.174,330.004 119.743 C 330.570 111.138,324.224 101.733,314.744 97.127 C 312.624 96.097,310.260 94.702,309.492 94.027 C 307.942 92.667,306.264 92.455,304.190 93.358 M34.799 124.998 C 35.314 125.548,35.825 125.909,35.932 125.801 C 36.198 125.535,34.779 124.000,34.268 124.000 C 34.044 124.000,34.283 124.449,34.799 124.998 M370.593 132.700 C 369.990 135.676,367.491 138.400,365.364 138.400 C 364.860 138.400,364.351 138.556,364.233 138.747 C 363.896 139.292,367.475 138.501,368.559 137.790 C 369.688 137.050,370.604 135.233,370.924 133.100 C 371.184 131.371,370.925 131.059,370.593 132.700 M45.523 165.412 C 46.291 168.171,47.735 169.734,50.063 170.325 C 51.608 170.717,52.917 170.546,51.700 170.112 C 49.236 169.232,47.726 167.989,46.750 166.039 C 45.238 163.016,44.792 162.788,45.523 165.412 M351.741 174.825 C 352.318 175.279,353.062 176.039,353.395 176.514 C 353.728 176.989,354.000 177.172,354.000 176.920 C 354.000 176.344,351.685 174.000,351.115 174.000 C 350.883 174.000,351.164 174.371,351.741 174.825 M41.553 193.553 C 39.794 195.312,39.604 196.000,40.878 196.000 C 42.051 196.000,44.000 194.081,44.000 192.925 C 44.000 191.604,43.330 191.776,41.553 193.553 M26.799 219.002 C 26.283 219.551,26.044 220.000,26.268 220.000 C 26.779 220.000,28.198 218.465,27.932 218.199 C 27.825 218.091,27.314 218.452,26.799 219.002 M199.524 260.956 C 195.182 262.510,194.748 262.919,192.480 267.596 C 191.430 269.764,189.844 272.260,188.796 273.400 C 187.783 274.500,186.363 276.626,185.640 278.124 C 184.376 280.744,182.363 282.777,180.420 283.394 C 180.036 283.515,179.516 284.303,179.264 285.143 C 178.499 287.696,176.677 289.806,174.181 291.027 C 169.154 293.486,172.473 293.802,203.267 293.792 C 226.867 293.785,227.969 293.752,228.767 293.030 C 229.894 292.010,229.836 291.811,228.100 290.740 C 225.647 289.226,223.598 287.168,222.607 285.225 C 222.095 284.221,220.686 282.549,219.475 281.509 C 217.658 279.947,216.780 278.682,214.442 274.252 C 212.625 270.810,210.662 267.770,208.964 265.773 C 207.509 264.061,205.863 261.971,205.306 261.130 C 204.120 259.338,204.052 259.336,199.524 260.956 M15.306 283.918 C 19.049 288.114,20.000 288.754,20.000 287.075 C 20.000 285.843,18.169 284.174,16.249 283.655 C 14.803 283.265,14.739 283.282,15.306 283.918 M384.925 293.699 C 384.063 295.309,383.333 296.054,381.800 296.890 C 379.704 298.034,379.904 298.393,382.113 297.452 C 383.832 296.719,385.046 295.337,385.769 293.289 C 386.568 291.024,386.286 291.161,384.925 293.699 M235.467 299.067 C 234.579 299.955,235.318 300.400,237.680 300.400 C 240.352 300.400,240.377 300.012,237.754 299.267 C 235.828 298.721,235.814 298.719,235.467 299.067 M162.900 299.809 C 162.405 300.159,162.000 300.782,162.000 301.194 C 162.000 302.409,160.112 303.600,158.186 303.600 C 156.896 303.600,155.968 303.945,154.376 305.016 C 153.219 305.795,151.243 306.718,149.987 307.068 C 147.855 307.660,147.590 307.874,146.026 310.252 C 144.599 312.423,141.662 315.243,140.379 315.675 C 138.119 316.436,137.560 334.086,139.573 341.106 C 140.279 343.567,146.719 351.029,149.800 352.955 C 150.460 353.368,151.926 354.409,153.058 355.269 C 154.541 356.395,156.219 357.155,159.058 357.985 C 171.502 361.623,173.281 362.455,176.548 366.172 C 177.619 367.391,178.615 368.314,178.762 368.224 C 178.908 368.133,179.729 369.126,180.586 370.430 C 181.444 371.733,182.271 372.800,182.426 372.800 C 182.580 372.800,182.811 373.197,182.937 373.683 C 183.064 374.168,183.289 374.444,183.437 374.297 C 183.584 374.149,184.087 374.240,184.553 374.500 C 185.554 375.058,185.263 374.985,188.000 375.359 C 192.134 375.923,193.409 375.977,202.600 375.983 C 212.112 375.990,216.024 375.665,217.608 374.738 C 218.893 373.987,221.206 371.533,220.977 371.163 C 220.873 370.995,221.119 370.753,221.523 370.625 C 221.927 370.496,223.144 369.315,224.229 367.999 C 225.313 366.683,226.333 365.604,226.495 365.603 C 226.775 365.600,227.340 365.173,229.334 363.453 C 230.703 362.271,233.209 360.752,234.058 360.589 C 234.485 360.507,235.412 360.253,236.117 360.026 C 236.823 359.798,239.020 359.142,241.000 358.566 C 247.658 356.632,250.697 355.033,253.600 351.936 C 254.810 350.646,256.610 349.173,257.600 348.664 C 258.590 348.154,259.606 347.302,259.858 346.769 C 266.122 333.526,265.600 318.678,258.678 313.228 C 257.401 312.223,255.560 310.373,254.586 309.118 C 253.179 307.303,252.466 306.741,251.110 306.376 C 248.514 305.677,246.659 304.601,245.215 302.956 C 242.865 300.280,242.342 301.350,241.574 310.400 C 241.033 316.766,240.157 319.090,237.371 321.542 C 236.088 322.671,235.374 323.732,234.829 325.317 C 233.584 328.934,233.582 328.938,228.067 335.155 C 226.820 336.561,225.137 338.197,224.327 338.792 C 223.517 339.387,221.833 341.388,220.586 343.237 C 219.339 345.087,217.996 346.883,217.601 347.230 C 217.207 347.576,216.424 348.768,215.862 349.879 C 213.506 354.528,206.732 357.414,199.661 356.780 C 191.133 356.016,189.201 354.832,188.496 349.934 C 188.216 347.986,188.101 347.813,186.933 347.574 C 183.866 346.946,181.858 344.962,181.063 341.775 C 180.604 339.935,180.422 339.729,178.406 338.761 C 175.872 337.545,173.956 335.491,173.189 333.167 C 172.816 332.036,172.192 331.223,171.221 330.603 C 168.154 328.645,167.088 326.680,165.466 320.000 C 163.492 311.867,163.484 302.574,165.448 300.609 C 166.201 299.857,166.142 299.750,164.799 299.419 C 164.178 299.265,163.459 299.413,162.900 299.809 M21.834 308.325 C 22.143 308.916,22.396 309.611,22.398 309.869 C 22.404 311.184,25.942 314.000,27.587 314.000 C 28.417 314.000,27.972 312.880,27.051 312.649 C 25.992 312.383,23.200 309.494,23.200 308.663 C 23.200 308.369,22.767 307.931,22.237 307.690 C 21.291 307.258,21.284 307.270,21.834 308.325 M26.600 308.777 C 27.736 309.994,27.807 310.017,27.932 309.197 C 28.094 308.141,28.087 308.134,26.599 307.778 L 25.400 307.492 26.600 308.777 M24.712 309.249 C 25.533 310.545,28.000 312.374,28.000 311.686 C 28.000 311.176,24.824 308.000,24.314 308.000 C 24.098 308.000,24.277 308.562,24.712 309.249 M80.000 364.369 C 80.000 365.023,81.969 367.103,83.372 367.931 L 84.736 368.735 84.313 367.468 C 83.541 365.148,80.000 362.605,80.000 364.369 M245.075 373.122 C 242.702 375.598,244.022 376.872,246.447 374.447 C 247.301 373.593,248.000 372.693,248.000 372.447 C 248.000 371.583,246.138 372.012,245.075 373.122 M156.816 376.318 C 156.795 377.502,158.498 379.205,159.682 379.184 C 160.465 379.171,160.406 379.085,159.286 378.598 C 158.478 378.247,157.753 377.522,157.402 376.714 C 156.915 375.594,156.829 375.535,156.816 376.318 M228.483 379.885 C 227.766 380.022,227.622 380.240,227.825 380.880 C 227.991 381.402,227.934 381.606,227.669 381.442 C 227.383 381.266,227.370 381.597,227.626 382.490 C 227.832 383.207,228.000 383.851,228.000 383.920 C 228.000 384.445,230.623 382.329,231.273 381.279 C 232.480 379.329,231.921 379.326,230.071 381.271 C 229.177 382.210,228.313 382.847,228.152 382.685 C 227.990 382.524,228.340 381.889,228.929 381.274 C 229.987 380.169,230.283 379.549,229.700 379.654 C 229.535 379.684,228.987 379.788,228.483 379.885 M232.800 380.411 C 232.800 382.365,228.962 385.319,227.681 384.352 C 227.104 383.917,227.077 383.924,227.500 384.399 C 228.046 385.011,228.193 386.167,227.686 385.853 C 227.513 385.746,227.371 386.018,227.371 386.456 C 227.371 387.103,227.450 387.147,227.786 386.690 C 228.014 386.380,228.845 385.913,229.634 385.654 C 232.406 384.741,235.144 380.525,233.400 379.855 C 232.992 379.699,232.800 379.877,232.800 380.411 M236.500 379.876 C 236.885 379.976,237.515 379.976,237.900 379.876 C 238.285 379.775,237.970 379.693,237.200 379.693 C 236.430 379.693,236.115 379.775,236.500 379.876 M221.300 387.876 C 221.685 387.976,222.315 387.976,222.700 387.876 C 223.085 387.775,222.770 387.693,222.000 387.693 C 221.230 387.693,220.915 387.775,221.300 387.876 ",
        stroke: "none",
        fill: "#d1a87a",
        fillRule: "evenodd"
      }
    ), /* @__PURE__ */ import_react35.default.createElement(
      "path",
      {
        id: "path2",
        d: "M70.800 36.341 C 70.800 36.580,70.548 36.678,70.240 36.560 C 69.933 36.442,69.557 36.546,69.405 36.792 C 69.206 37.113,68.949 37.093,68.488 36.719 C 68.111 36.414,67.960 36.390,68.122 36.660 C 68.304 36.964,67.712 37.285,66.387 37.603 C 63.871 38.207,62.254 39.767,61.647 42.178 C 61.173 44.062,61.073 44.129,58.900 44.010 C 58.185 43.971,57.600 44.102,57.600 44.301 C 57.600 44.501,56.745 44.642,55.700 44.615 C 53.121 44.548,52.547 45.103,52.625 47.589 C 52.661 48.695,52.534 49.600,52.345 49.600 C 52.155 49.600,52.003 50.275,52.006 51.100 C 52.012 52.548,52.029 52.566,52.506 51.632 C 52.778 51.099,53.237 50.585,53.526 50.490 C 53.816 50.394,53.546 51.034,52.926 51.911 C 52.307 52.789,51.728 53.303,51.640 53.054 C 51.127 51.600,48.800 51.592,48.800 53.044 L 48.800 54.089 49.592 53.144 C 50.252 52.357,50.447 52.297,50.765 52.781 C 51.201 53.444,50.976 54.003,50.276 53.994 C 49.990 53.990,50.039 53.833,50.400 53.600 C 50.820 53.329,50.846 53.210,50.487 53.206 C 49.636 53.196,49.458 54.380,50.190 55.189 C 51.261 56.373,48.373 59.261,47.189 58.190 C 46.380 57.458,45.196 57.636,45.206 58.487 C 45.210 58.846,45.329 58.820,45.600 58.400 C 45.833 58.039,45.990 57.990,45.994 58.276 C 46.003 58.976,45.444 59.201,44.781 58.765 C 44.297 58.447,44.357 58.252,45.144 57.592 L 46.089 56.800 45.044 56.800 C 44.282 56.800,44.000 57.007,44.000 57.567 C 44.000 58.637,44.413 59.600,44.871 59.600 C 45.084 59.600,45.559 59.905,45.929 60.278 C 46.557 60.912,46.555 60.938,45.900 60.690 C 45.515 60.544,45.200 60.610,45.200 60.836 C 45.200 61.062,45.001 61.124,44.757 60.974 C 44.449 60.783,44.479 60.596,44.857 60.356 C 45.177 60.153,45.215 60.010,44.949 60.006 C 44.340 59.998,43.539 61.005,43.882 61.348 C 44.358 61.825,44.342 62.752,43.861 62.577 C 42.265 61.997,38.255 66.247,38.558 68.197 C 38.627 68.639,38.606 68.775,38.512 68.500 C 38.306 67.896,37.741 67.849,37.396 68.407 C 37.258 68.630,37.002 68.725,36.829 68.618 C 36.655 68.510,36.561 68.867,36.621 69.411 C 36.681 69.955,36.565 70.400,36.365 70.400 C 35.782 70.400,35.938 71.297,36.800 72.904 C 37.240 73.725,37.600 74.500,37.600 74.626 C 37.600 74.751,37.240 74.740,36.800 74.600 C 36.323 74.449,36.000 74.528,36.000 74.797 C 36.000 75.044,36.161 75.148,36.358 75.026 C 36.555 74.904,36.819 75.074,36.946 75.402 C 37.085 75.766,36.944 76.000,36.586 76.000 C 36.092 76.000,36.004 76.954,36.037 81.900 C 36.080 88.339,35.981 90.035,35.573 89.784 C 35.427 89.693,34.985 89.975,34.591 90.409 C 34.198 90.844,34.039 91.206,34.238 91.213 C 34.437 91.220,34.285 91.465,33.900 91.757 C 33.231 92.264,31.184 92.185,31.214 91.653 C 31.222 91.514,31.504 90.950,31.842 90.400 C 32.179 89.850,32.358 89.715,32.240 90.100 C 32.122 90.485,32.199 90.800,32.413 90.800 C 32.626 90.800,32.800 90.589,32.800 90.331 C 32.800 90.074,33.115 89.489,33.500 89.031 C 34.199 88.201,34.199 88.201,33.300 88.962 C 32.805 89.381,32.400 89.529,32.400 89.291 C 32.400 89.053,32.985 88.390,33.700 87.819 C 34.415 87.247,34.685 86.893,34.300 87.033 C 33.915 87.172,33.600 87.101,33.600 86.876 C 33.600 86.651,33.816 86.395,34.080 86.307 C 34.375 86.208,34.290 86.043,33.859 85.878 C 33.384 85.696,33.251 85.758,33.445 86.073 C 33.633 86.378,33.514 86.453,33.095 86.292 C 32.418 86.032,31.494 86.877,31.345 87.893 C 31.206 88.841,30.538 89.347,30.183 88.773 C 29.987 88.455,30.041 88.378,30.333 88.558 C 30.646 88.752,30.745 88.460,30.648 87.625 C 30.559 86.865,30.740 86.221,31.130 85.905 C 31.649 85.485,31.702 85.501,31.447 86.000 C 31.265 86.357,31.371 86.320,31.710 85.906 C 32.023 85.525,32.396 85.330,32.540 85.473 C 32.683 85.616,32.800 85.536,32.800 85.294 C 32.800 85.053,33.115 84.777,33.500 84.682 C 33.885 84.586,33.669 84.576,33.021 84.660 C 31.382 84.871,30.025 85.848,29.441 87.237 C 29.169 87.884,28.869 88.336,28.773 88.240 C 28.678 88.145,28.600 89.927,28.600 92.200 C 28.600 94.473,28.756 96.482,28.947 96.666 C 29.142 96.854,29.175 96.387,29.024 95.600 C 28.769 94.282,28.784 94.256,29.277 95.157 C 29.893 96.284,31.600 97.527,31.600 96.849 C 31.600 96.602,31.344 96.400,31.031 96.400 C 30.369 96.400,29.471 94.001,29.806 93.128 C 29.932 92.801,30.280 92.533,30.579 92.533 C 30.879 92.533,31.032 92.772,30.920 93.064 C 30.808 93.356,30.555 93.496,30.358 93.374 C 29.593 92.901,30.050 94.307,30.930 95.134 C 31.844 95.993,32.749 95.902,32.020 95.025 C 31.761 94.712,31.954 94.589,32.658 94.620 C 33.214 94.644,33.831 94.920,34.028 95.232 C 34.226 95.544,34.391 95.605,34.394 95.367 C 34.401 94.832,35.631 94.776,36.272 95.280 C 36.532 95.485,36.680 95.986,36.601 96.394 C 36.522 96.803,36.726 97.240,37.054 97.366 C 37.382 97.491,37.539 97.776,37.402 97.997 C 37.265 98.219,37.388 98.403,37.676 98.406 C 38.057 98.411,38.036 98.518,37.600 98.800 C 37.270 99.013,37.186 99.191,37.414 99.194 C 37.642 99.197,37.845 99.515,37.865 99.900 C 37.885 100.285,38.057 101.950,38.247 103.600 L 38.593 106.600 38.834 104.600 L 39.074 102.600 39.170 105.200 C 39.222 106.630,39.335 108.250,39.420 108.800 C 39.505 109.350,39.638 110.405,39.716 111.144 C 39.794 111.883,40.159 112.657,40.529 112.864 C 40.898 113.071,41.200 113.497,41.200 113.812 C 41.200 114.211,41.560 114.343,42.385 114.246 C 43.036 114.171,43.635 114.304,43.714 114.542 C 43.794 114.781,44.385 113.901,45.029 112.588 L 46.200 110.200 46.200 98.934 C 46.200 92.737,46.335 87.532,46.500 87.367 C 46.665 87.202,46.800 86.814,46.800 86.505 C 46.800 85.777,47.821 84.755,48.185 85.118 C 48.339 85.273,48.700 85.077,48.988 84.684 C 49.528 83.945,50.390 83.905,50.883 84.597 C 51.436 85.371,52.163 83.981,54.070 78.503 C 55.901 73.242,57.419 70.794,58.453 71.433 C 59.004 71.773,61.389 69.297,62.397 67.337 C 63.845 64.524,64.299 64.079,66.998 62.830 C 68.338 62.210,70.105 61.004,70.925 60.151 C 71.746 59.298,72.847 58.150,73.373 57.600 C 74.659 56.255,78.914 54.514,83.792 53.336 C 88.900 52.102,89.667 51.791,90.571 50.587 C 91.056 49.940,91.707 49.600,92.456 49.600 C 93.085 49.600,93.600 49.440,93.600 49.245 C 93.600 49.049,94.275 48.762,95.099 48.608 C 95.924 48.453,96.711 48.144,96.850 47.920 C 97.512 46.848,116.311 47.564,117.696 48.714 C 118.014 48.978,118.388 49.079,118.527 48.939 C 118.667 48.800,118.895 48.981,119.033 49.343 C 119.172 49.704,119.536 50.000,119.843 50.000 C 120.349 50.000,120.577 50.496,120.444 51.309 C 120.299 52.202,123.470 52.673,131.800 52.995 C 137.975 53.234,138.156 53.261,139.081 54.073 C 139.476 54.421,140.208 54.830,140.706 54.981 C 141.215 55.137,141.495 55.447,141.344 55.691 C 141.183 55.951,141.263 56.008,141.545 55.834 C 141.802 55.675,141.917 55.390,141.800 55.200 C 141.683 55.010,141.770 54.742,141.993 54.604 C 142.219 54.465,142.400 54.720,142.400 55.176 C 142.400 55.692,142.662 56.002,143.100 56.005 C 143.485 56.008,144.205 56.119,144.700 56.252 C 145.366 56.431,145.600 56.322,145.600 55.837 C 145.600 55.418,146.064 55.087,146.881 54.924 C 147.994 54.701,148.060 54.624,147.381 54.337 C 146.619 54.015,146.619 54.009,147.400 54.112 C 148.051 54.198,148.200 54.519,148.200 55.835 C 148.200 57.586,149.320 57.907,150.488 56.490 C 150.937 55.945,150.896 55.924,150.153 56.320 C 149.687 56.569,149.192 56.658,149.053 56.519 C 148.578 56.045,148.799 55.286,149.489 55.021 C 150.326 54.700,151.251 55.801,150.905 56.704 C 150.755 57.095,150.827 57.230,151.098 57.063 C 151.336 56.916,151.608 56.931,151.700 57.098 C 151.793 57.264,151.816 57.181,151.752 56.913 C 151.577 56.185,152.402 55.836,152.935 56.414 C 153.294 56.803,153.277 56.848,152.860 56.610 C 152.424 56.362,152.407 56.466,152.774 57.152 C 153.138 57.832,153.115 58.000,152.657 58.000 C 151.927 58.000,151.494 59.087,152.079 59.449 C 152.349 59.616,152.411 59.541,152.236 59.259 C 151.823 58.590,153.097 58.216,153.801 58.801 C 154.125 59.070,154.300 59.438,154.189 59.618 C 154.078 59.798,154.198 60.075,154.455 60.234 C 154.748 60.415,154.816 60.350,154.638 60.062 C 154.481 59.808,154.533 59.600,154.753 59.600 C 154.973 59.600,155.275 59.798,155.425 60.040 C 155.580 60.291,156.194 60.381,156.849 60.250 C 157.614 60.097,158.002 60.184,158.006 60.510 C 158.010 60.849,158.120 60.830,158.363 60.446 C 158.599 60.073,159.066 59.980,159.787 60.161 C 160.738 60.400,160.800 60.357,160.330 59.786 C 158.552 57.626,156.692 56.000,156.000 56.000 C 155.560 56.000,155.200 55.809,155.200 55.576 C 155.200 55.343,155.380 55.264,155.600 55.400 C 155.820 55.536,156.000 55.472,156.000 55.257 C 156.000 55.042,155.791 54.797,155.536 54.712 C 155.189 54.596,155.186 54.362,155.524 53.779 C 155.772 53.350,155.981 53.211,155.988 53.468 C 155.995 53.726,156.553 54.058,157.230 54.207 C 158.949 54.584,161.063 56.563,161.624 58.320 C 162.280 60.375,162.964 60.991,162.600 59.200 C 161.944 55.971,160.609 54.345,158.142 53.770 C 157.514 53.624,156.573 53.238,156.051 52.911 C 155.529 52.584,155.212 52.495,155.346 52.713 C 155.481 52.931,155.339 53.318,155.031 53.574 C 154.605 53.928,154.400 53.924,154.174 53.558 C 153.985 53.253,154.045 53.181,154.338 53.362 C 154.592 53.519,154.800 53.469,154.800 53.251 C 154.800 52.451,152.021 52.245,150.866 52.959 C 150.571 53.142,150.493 53.022,150.647 52.621 C 150.778 52.279,150.701 52.000,150.476 52.000 C 150.251 52.000,150.007 52.166,149.933 52.368 C 149.860 52.571,149.170 52.428,148.400 52.052 C 147.630 51.675,146.880 51.374,146.733 51.383 C 146.587 51.393,146.317 51.236,146.133 51.036 C 145.940 50.824,146.010 50.792,146.300 50.959 C 146.613 51.139,146.800 51.005,146.800 50.600 C 146.800 50.244,146.979 50.063,147.197 50.198 C 147.708 50.514,147.383 47.090,146.798 45.997 C 146.564 45.559,146.153 45.197,145.886 45.194 C 145.581 45.190,145.623 45.044,146.000 44.800 C 146.367 44.563,146.414 44.410,146.120 44.406 C 145.856 44.403,145.456 44.715,145.232 45.100 C 145.008 45.485,144.819 45.603,144.812 45.363 C 144.793 44.689,142.094 44.079,139.004 44.051 C 137.101 44.034,136.156 43.862,136.043 43.513 C 135.689 42.421,132.803 39.913,132.177 40.154 C 131.693 40.339,131.606 40.211,131.801 39.597 C 131.951 39.123,131.871 38.800,131.603 38.800 C 131.356 38.800,131.264 38.620,131.400 38.400 C 131.536 38.180,131.446 38.000,131.200 38.000 C 130.954 38.000,130.866 37.817,131.004 37.593 C 131.142 37.370,131.451 37.308,131.689 37.455 C 131.942 37.612,132.009 37.538,131.849 37.279 C 131.698 37.035,131.281 36.948,130.922 37.085 C 130.563 37.223,130.371 37.170,130.496 36.968 C 130.621 36.766,130.021 36.614,129.162 36.631 C 128.303 36.648,127.600 36.490,127.600 36.279 C 127.600 36.051,126.990 36.012,126.100 36.182 C 125.275 36.340,124.105 36.451,123.500 36.428 C 122.895 36.406,122.400 36.525,122.399 36.694 C 122.399 36.862,121.832 37.021,121.140 37.046 C 119.884 37.091,119.884 37.090,120.841 36.560 C 121.679 36.095,121.156 36.027,116.676 36.014 C 113.359 36.005,111.640 36.141,111.800 36.400 C 111.938 36.623,111.639 36.797,111.124 36.794 C 110.363 36.789,110.306 36.713,110.800 36.366 C 111.226 36.068,109.889 36.020,106.200 36.204 C 99.197 36.552,99.417 36.552,92.600 36.224 C 88.315 36.018,86.772 36.057,87.200 36.361 C 87.671 36.696,87.500 36.788,86.400 36.788 C 85.350 36.788,85.150 36.691,85.600 36.400 C 86.004 36.139,84.500 36.015,81.000 36.020 C 76.190 36.028,75.875 36.074,76.800 36.631 L 77.800 37.233 76.800 36.956 C 76.250 36.803,75.170 36.616,74.400 36.540 C 73.630 36.464,72.505 36.290,71.900 36.154 C 71.224 36.002,70.800 36.074,70.800 36.341 M275.200 36.452 C 273.395 36.950,273.230 36.957,271.800 36.603 C 270.645 36.316,270.630 36.329,271.400 36.953 C 272.153 37.564,272.155 37.586,271.434 37.333 C 270.944 37.161,270.763 37.216,270.930 37.487 C 271.079 37.727,270.891 37.886,270.496 37.855 C 270.062 37.821,269.821 38.062,269.855 38.496 C 269.886 38.891,269.727 39.079,269.487 38.930 C 269.216 38.763,269.161 38.944,269.333 39.434 C 269.586 40.155,269.564 40.153,268.953 39.400 C 268.329 38.630,268.316 38.645,268.603 39.800 C 268.766 40.460,268.868 41.225,268.828 41.500 C 268.788 41.775,268.721 42.495,268.678 43.100 C 268.602 44.168,268.537 44.198,266.400 44.116 C 264.753 44.053,264.074 44.198,263.700 44.693 C 263.425 45.056,263.200 45.158,263.200 44.920 C 263.200 44.189,261.107 43.866,260.731 44.538 C 260.531 44.894,260.048 45.048,259.501 44.928 C 258.777 44.769,258.718 44.815,259.200 45.159 C 259.708 45.522,259.678 45.594,259.000 45.625 C 258.560 45.646,258.415 45.751,258.678 45.858 C 258.941 45.964,259.526 45.854,259.978 45.612 C 260.572 45.294,260.800 45.293,260.800 45.610 C 260.800 45.853,261.022 45.914,261.300 45.747 C 261.644 45.540,261.630 45.656,261.255 46.119 C 260.955 46.489,260.545 46.690,260.345 46.566 C 259.854 46.262,260.093 47.322,260.600 47.694 C 260.850 47.877,260.818 47.990,260.514 47.994 C 260.247 47.997,259.835 47.639,259.599 47.198 C 259.117 46.298,258.893 46.409,256.651 48.651 C 254.469 50.832,254.269 51.175,255.013 51.460 C 255.539 51.662,255.563 51.781,255.134 52.068 C 254.789 52.298,254.974 52.338,255.656 52.180 C 257.048 51.857,257.449 52.580,256.318 53.373 C 255.825 53.718,255.565 54.000,255.740 54.000 C 255.914 54.000,255.782 54.275,255.446 54.612 C 255.109 54.948,254.930 55.533,255.047 55.912 C 255.234 56.515,255.204 56.511,254.799 55.879 C 254.447 55.331,254.452 55.019,254.817 54.579 C 255.188 54.132,255.189 54.000,254.820 54.000 C 254.558 54.000,254.073 53.730,253.743 53.400 C 253.413 53.070,252.931 52.803,252.671 52.806 C 252.357 52.810,252.378 52.925,252.734 53.151 C 253.028 53.337,253.253 53.649,253.234 53.845 C 253.215 54.040,253.425 54.208,253.700 54.218 C 253.975 54.228,254.129 54.498,254.043 54.818 C 253.956 55.138,253.910 55.815,253.940 56.322 C 253.977 56.950,253.836 57.154,253.497 56.963 C 253.105 56.742,253.106 56.797,253.500 57.221 C 253.775 57.518,254.000 58.286,254.000 58.929 C 254.000 59.939,254.084 60.028,254.619 59.584 C 254.965 59.297,255.071 58.967,254.859 58.835 C 254.314 58.497,254.134 57.418,254.603 57.300 C 254.821 57.245,255.000 57.365,255.000 57.567 C 255.000 57.768,255.164 58.083,255.364 58.267 C 255.569 58.454,255.624 58.416,255.491 58.181 C 255.360 57.950,255.416 57.500,255.615 57.181 C 255.874 56.767,255.953 56.945,255.889 57.800 C 255.840 58.460,255.546 59.199,255.236 59.441 C 254.528 59.995,255.788 60.288,258.654 60.236 C 260.564 60.201,260.600 60.177,260.598 58.937 C 260.597 58.243,260.732 57.758,260.898 57.861 C 261.387 58.163,261.243 57.406,260.700 56.821 C 260.295 56.385,260.308 56.344,260.768 56.607 C 261.200 56.854,261.269 56.758,261.057 56.205 C 260.772 55.462,262.071 53.804,262.557 54.291 C 262.691 54.424,262.800 54.323,262.800 54.067 C 262.800 53.810,262.590 53.600,262.333 53.600 C 262.077 53.600,261.975 53.492,262.107 53.360 C 262.239 53.228,262.579 53.263,262.862 53.439 C 263.523 53.847,268.135 53.705,270.829 53.194 C 271.973 52.977,273.755 52.800,274.788 52.800 C 277.252 52.800,281.240 51.989,280.965 51.544 C 280.846 51.352,281.024 51.089,281.359 50.960 C 281.695 50.831,282.081 50.375,282.217 49.947 C 282.359 49.499,282.962 49.068,283.632 48.934 C 284.274 48.805,284.800 48.588,284.800 48.450 C 284.800 48.313,285.385 48.181,286.100 48.158 C 286.815 48.135,287.940 47.989,288.600 47.832 C 293.517 46.668,306.762 46.935,308.440 48.233 C 308.748 48.471,309.540 48.881,310.200 49.144 C 310.860 49.407,312.009 50.157,312.753 50.810 C 313.497 51.463,314.847 52.185,315.753 52.413 C 325.021 54.750,328.446 56.254,329.815 58.589 C 330.675 60.057,331.376 60.621,333.773 61.774 C 336.751 63.207,338.450 64.876,339.242 67.150 C 339.509 67.915,340.176 68.538,341.241 69.018 C 343.010 69.816,344.988 71.845,345.390 73.274 C 346.329 76.614,347.702 78.915,349.000 79.323 C 349.660 79.530,350.737 80.172,351.394 80.750 C 352.572 81.786,352.577 81.787,351.794 80.807 C 351.188 80.048,351.163 79.940,351.692 80.349 C 353.727 81.924,353.995 85.601,353.203 101.152 C 352.734 110.367,353.152 115.543,354.597 118.393 C 355.528 120.231,357.200 121.263,357.200 120.000 C 357.200 119.780,357.515 119.597,357.900 119.594 C 358.498 119.589,358.513 119.531,358.000 119.200 C 357.485 118.867,357.497 118.811,358.086 118.806 C 358.463 118.803,358.965 118.440,359.200 118.000 C 359.435 117.560,359.510 117.200,359.365 117.200 C 359.220 117.200,359.289 116.974,359.518 116.699 C 359.747 116.423,359.887 115.568,359.830 114.799 C 359.773 114.029,359.897 113.288,360.105 113.151 C 360.336 112.998,360.306 112.572,360.027 112.051 C 359.777 111.583,359.713 111.200,359.886 111.200 C 360.059 111.200,360.207 110.075,360.217 108.700 C 360.242 104.910,361.154 97.912,361.694 97.372 C 361.832 97.235,361.855 96.888,361.745 96.601 C 361.635 96.315,361.741 95.960,361.979 95.813 C 362.218 95.665,362.309 95.377,362.183 95.172 C 362.056 94.968,362.154 94.800,362.400 94.800 C 362.646 94.800,362.745 94.635,362.621 94.434 C 362.497 94.233,362.531 94.008,362.698 93.934 C 363.435 93.607,364.373 91.237,363.667 91.484 C 363.124 91.674,363.093 91.618,363.500 91.179 C 363.775 90.882,364.000 90.322,364.000 89.933 C 364.000 89.468,364.206 89.304,364.600 89.455 C 364.943 89.587,365.200 89.464,365.200 89.166 C 365.200 88.860,365.435 88.966,365.772 89.424 C 366.329 90.178,366.355 90.172,366.716 89.207 L 367.087 88.213 367.370 89.107 C 367.567 89.725,367.984 90.010,368.727 90.032 C 369.710 90.061,369.621 90.142,368.075 90.629 C 367.786 90.720,367.671 90.991,367.820 91.232 C 368.015 91.547,368.212 91.548,368.525 91.235 C 368.992 90.768,370.400 90.633,370.400 91.056 C 370.400 91.197,370.085 91.546,369.700 91.831 C 369.036 92.324,369.039 92.389,369.756 93.076 C 370.172 93.474,370.394 93.587,370.250 93.328 C 370.105 93.068,370.173 92.740,370.400 92.600 C 370.627 92.460,370.717 92.190,370.600 92.000 C 370.483 91.810,370.570 91.542,370.793 91.404 C 371.022 91.263,370.647 90.650,369.931 89.996 C 369.233 89.359,368.544 88.911,368.398 89.001 C 368.252 89.091,368.133 88.911,368.133 88.600 C 368.133 88.289,368.271 88.120,368.439 88.224 C 368.607 88.328,368.856 88.233,368.993 88.012 C 369.373 87.397,370.983 87.795,371.129 88.539 C 371.200 88.903,371.065 89.200,370.829 89.200 C 370.593 89.200,370.400 89.464,370.400 89.787 C 370.400 90.120,370.637 90.284,370.948 90.165 C 371.557 89.931,372.241 85.480,371.696 85.299 C 371.512 85.237,371.435 84.560,371.525 83.794 C 371.618 82.991,371.511 82.400,371.272 82.400 C 370.993 82.400,370.978 81.972,371.228 81.103 C 371.689 79.494,371.696 79.093,371.258 79.364 C 371.071 79.480,370.722 79.146,370.483 78.622 C 370.244 78.098,369.675 77.551,369.219 77.406 C 368.762 77.261,368.492 76.975,368.618 76.771 C 368.907 76.303,368.531 76.304,366.897 76.772 C 366.097 77.002,365.600 77.002,365.600 76.772 C 365.600 76.567,365.240 76.400,364.800 76.400 C 364.360 76.400,364.000 76.152,364.000 75.849 C 364.000 75.546,363.747 75.088,363.438 74.832 C 362.842 74.337,362.817 73.429,363.386 72.912 C 363.574 72.740,363.606 72.813,363.458 73.072 C 363.309 73.332,363.370 73.658,363.593 73.796 C 364.180 74.159,364.099 72.267,363.500 71.621 C 363.100 71.190,363.100 71.139,363.500 71.365 C 363.807 71.538,364.000 71.406,364.000 71.024 C 364.000 70.681,363.730 70.400,363.400 70.400 C 362.715 70.400,362.583 69.739,363.226 69.525 C 363.460 69.447,363.754 68.622,363.878 67.691 L 364.105 66.000 362.353 65.968 C 361.389 65.951,360.870 65.838,361.200 65.716 C 361.530 65.595,362.146 65.204,362.568 64.848 C 363.283 64.245,363.318 64.250,363.072 64.921 C 362.915 65.352,362.968 65.543,363.205 65.397 C 363.760 65.054,363.697 64.554,363.010 63.867 C 362.491 63.348,362.491 63.251,363.010 63.051 C 363.335 62.927,363.600 62.629,363.600 62.389 C 363.600 62.149,363.408 62.071,363.173 62.217 C 362.917 62.375,362.797 62.184,362.873 61.740 C 362.964 61.209,362.791 61.036,362.260 61.127 C 361.816 61.203,361.625 61.083,361.783 60.827 C 361.929 60.592,361.851 60.400,361.611 60.400 C 361.371 60.400,361.073 60.665,360.949 60.990 C 360.749 61.509,360.652 61.509,360.133 60.990 C 359.446 60.303,358.946 60.240,358.603 60.795 C 358.457 61.032,358.648 61.085,359.079 60.928 C 359.750 60.682,359.755 60.717,359.152 61.432 C 358.796 61.854,358.405 62.470,358.284 62.800 C 358.162 63.130,358.049 62.635,358.032 61.700 C 358.002 60.117,357.925 60.001,356.900 60.013 C 355.900 60.024,355.864 60.074,356.500 60.557 C 356.885 60.849,357.195 61.428,357.188 61.844 C 357.176 62.555,357.151 62.558,356.763 61.892 C 356.536 61.502,356.184 61.286,355.980 61.412 C 355.776 61.538,355.716 61.362,355.847 61.021 C 355.978 60.679,355.916 60.400,355.709 60.400 C 355.503 60.400,355.333 60.138,355.333 59.818 C 355.333 59.497,355.483 59.328,355.667 59.441 C 356.254 59.804,356.023 58.765,355.370 58.113 C 354.925 57.668,354.874 57.402,355.195 57.203 C 355.685 56.900,355.816 54.809,355.445 53.200 C 355.318 52.650,355.035 51.336,354.815 50.279 C 354.045 46.571,352.331 45.335,347.000 44.645 C 346.560 44.588,345.692 44.396,345.071 44.220 C 344.380 44.023,343.778 44.062,343.522 44.318 C 343.291 44.549,342.869 44.648,342.583 44.538 C 342.297 44.428,341.686 44.540,341.226 44.786 C 340.597 45.123,340.415 45.118,340.494 44.767 C 340.552 44.510,340.350 44.209,340.044 44.098 C 339.728 43.983,339.599 44.075,339.745 44.311 C 339.908 44.574,339.672 44.635,339.101 44.479 C 338.348 44.273,338.317 44.208,338.917 44.084 C 339.668 43.928,339.521 42.476,338.701 41.948 C 338.451 41.788,338.460 41.643,338.725 41.548 C 338.954 41.467,339.247 40.860,339.377 40.200 C 339.545 39.342,339.515 39.224,339.271 39.785 C 338.958 40.506,338.907 40.481,338.658 39.488 C 338.508 38.892,338.164 38.449,337.893 38.502 C 337.622 38.556,337.444 38.378,337.498 38.107 C 337.551 37.836,337.108 37.492,336.512 37.342 C 335.519 37.093,335.494 37.042,336.215 36.729 C 336.776 36.485,336.658 36.456,335.804 36.626 C 335.146 36.756,334.474 37.074,334.310 37.332 C 334.090 37.677,334.011 37.680,334.006 37.340 C 333.999 36.793,330.228 35.812,329.607 36.195 C 328.939 36.609,326.000 36.730,326.000 36.344 C 326.000 36.155,324.009 36.000,321.576 36.000 C 318.729 36.000,317.241 36.143,317.400 36.400 C 317.536 36.620,317.356 36.800,317.000 36.800 C 316.644 36.800,316.464 36.620,316.600 36.400 C 316.763 36.136,312.372 36.002,303.724 36.006 C 295.103 36.010,290.806 36.145,291.200 36.400 C 291.683 36.712,291.619 36.789,290.876 36.794 C 290.361 36.797,290.062 36.623,290.200 36.400 C 290.360 36.142,288.737 36.000,285.624 36.000 C 282.971 36.000,280.800 36.163,280.800 36.363 C 280.800 36.562,280.410 36.623,279.933 36.498 C 279.213 36.310,279.111 36.401,279.334 37.036 C 279.579 37.734,279.556 37.742,279.076 37.127 C 278.379 36.233,276.917 35.979,275.200 36.452 M126.334 36.920 C 126.667 37.322,126.547 37.440,125.800 37.440 C 125.053 37.440,124.933 37.322,125.266 36.920 C 125.504 36.634,125.744 36.400,125.800 36.400 C 125.856 36.400,126.096 36.634,126.334 36.920 M337.687 37.225 C 338.065 37.445,338.555 37.935,338.775 38.313 C 338.995 38.691,339.181 38.788,339.188 38.529 C 339.204 37.919,338.081 36.796,337.471 36.812 C 337.212 36.819,337.309 37.005,337.687 37.225 M129.200 37.711 C 129.200 37.896,129.408 37.919,129.662 37.762 C 129.935 37.593,130.016 37.651,129.859 37.904 C 129.714 38.139,129.821 38.415,130.098 38.516 C 130.500 38.663,130.500 38.806,130.100 39.230 C 129.711 39.642,129.493 39.653,129.120 39.280 C 128.747 38.907,128.752 38.800,129.144 38.800 C 129.421 38.800,129.534 38.617,129.396 38.393 C 129.258 38.170,128.977 38.091,128.772 38.217 C 128.568 38.344,128.400 38.246,128.400 38.000 C 128.400 37.754,128.232 37.656,128.028 37.783 C 127.823 37.909,127.543 37.831,127.406 37.609 C 127.258 37.371,127.575 37.240,128.178 37.290 C 128.740 37.336,129.200 37.526,129.200 37.711 M274.700 38.100 C 274.593 38.633,273.992 39.184,273.504 39.194 C 273.341 39.197,273.516 38.840,273.893 38.400 C 274.690 37.469,274.837 37.414,274.700 38.100 M333.771 37.958 C 334.460 38.228,334.471 38.287,333.871 38.517 C 333.499 38.660,333.200 38.583,333.200 38.345 C 333.200 38.108,332.921 38.022,332.579 38.153 C 332.223 38.289,332.063 38.222,332.203 37.995 C 332.482 37.543,332.698 37.538,333.771 37.958 M335.455 38.200 C 335.224 38.802,335.786 39.063,336.101 38.500 C 336.193 38.335,336.222 38.403,336.166 38.651 C 336.033 39.234,336.766 39.967,337.349 39.834 C 337.597 39.778,337.665 39.807,337.500 39.899 C 336.895 40.237,337.221 40.768,337.900 40.550 C 338.490 40.360,338.506 40.392,338.000 40.755 C 337.553 41.075,337.287 41.034,336.956 40.593 C 336.418 39.874,335.831 39.797,336.253 40.500 C 336.457 40.840,336.337 40.824,335.877 40.451 C 335.144 39.857,334.949 39.398,335.600 39.800 C 335.820 39.936,336.000 39.876,336.000 39.666 C 336.000 39.457,335.733 39.183,335.407 39.058 C 334.883 38.857,334.951 37.600,335.486 37.600 C 335.596 37.600,335.582 37.870,335.455 38.200 M65.041 39.404 C 64.992 39.736,64.740 40.220,64.480 40.480 C 63.909 41.051,62.702 41.282,63.026 40.758 C 63.152 40.554,63.410 40.483,63.600 40.600 C 63.923 40.800,64.518 40.172,64.644 39.500 C 64.756 38.903,64.803 38.800,64.965 38.800 C 65.055 38.800,65.089 39.072,65.041 39.404 M133.386 42.041 C 134.164 42.724,134.800 43.444,134.800 43.641 C 134.800 44.132,132.907 44.097,132.600 43.600 C 132.464 43.380,132.161 43.200,131.927 43.200 C 131.677 43.200,131.727 43.472,132.051 43.864 C 132.554 44.472,132.524 44.481,131.700 43.968 C 130.726 43.361,130.493 42.739,131.300 42.900 C 131.606 42.961,131.794 42.573,131.784 41.900 C 131.765 40.549,131.677 40.541,133.386 42.041 M270.992 42.076 C 270.868 42.401,270.503 42.667,270.183 42.667 C 269.719 42.667,269.743 42.528,270.300 41.985 C 271.103 41.203,271.316 41.231,270.992 42.076 M337.988 43.768 C 337.675 44.079,337.627 44.004,337.819 43.500 C 337.971 43.102,337.900 42.800,337.655 42.800 C 337.419 42.800,337.340 42.501,337.480 42.136 C 337.693 41.580,337.791 41.623,338.080 42.404 C 338.298 42.995,338.265 43.494,337.988 43.768 M68.241 42.500 C 68.399 42.775,68.378 42.863,68.194 42.696 C 68.010 42.529,67.401 42.799,66.842 43.296 C 66.282 43.793,66.042 43.913,66.309 43.563 C 66.575 43.213,66.660 42.779,66.497 42.599 C 66.333 42.419,66.413 42.394,66.672 42.542 C 66.932 42.691,67.258 42.630,67.396 42.407 C 67.724 41.875,67.892 41.894,68.241 42.500 M59.398 45.202 C 58.998 45.644,58.585 45.918,58.479 45.812 C 58.210 45.543,59.208 44.400,59.711 44.400 C 59.938 44.400,59.797 44.761,59.398 45.202 M141.208 45.010 C 141.956 45.911,141.522 46.015,140.630 45.148 C 140.207 44.737,140.049 44.400,140.281 44.400 C 140.513 44.400,140.930 44.674,141.208 45.010 M54.400 45.200 C 54.400 45.420,54.175 45.555,53.900 45.500 C 53.625 45.445,53.445 45.625,53.500 45.900 C 53.555 46.175,53.420 46.400,53.200 46.400 C 52.658 46.400,52.696 45.864,53.280 45.280 C 53.864 44.696,54.400 44.658,54.400 45.200 M57.520 45.917 C 57.454 46.256,57.130 46.607,56.800 46.697 C 56.287 46.837,56.283 46.803,56.774 46.461 C 57.254 46.127,57.261 45.955,56.818 45.421 C 56.362 44.873,56.383 44.819,56.963 45.041 C 57.335 45.184,57.585 45.578,57.520 45.917 M253.421 45.577 C 252.296 46.820,252.890 47.113,254.074 45.900 C 254.665 45.295,254.918 44.800,254.636 44.800 C 254.355 44.800,253.808 45.150,253.421 45.577 M346.950 46.081 C 346.771 46.371,346.494 46.270,346.139 45.784 C 345.780 45.294,345.600 45.229,345.600 45.590 C 345.600 45.889,345.492 46.025,345.360 45.893 C 344.803 45.337,345.656 44.802,346.435 45.219 C 346.868 45.451,347.100 45.838,346.950 46.081 M255.728 45.845 C 254.579 46.412,253.200 48.439,253.200 49.560 C 253.200 50.434,254.215 49.968,254.888 48.786 C 255.267 48.121,256.121 47.267,256.786 46.888 C 259.060 45.594,258.119 44.666,255.728 45.845 M256.496 46.398 C 255.779 46.835,254.835 47.779,254.398 48.496 C 253.464 50.028,253.331 49.680,254.205 47.990 C 254.538 47.347,255.303 46.553,255.905 46.226 C 257.533 45.343,258.003 45.479,256.496 46.398 M259.600 48.211 C 259.600 48.524,259.356 48.681,259.053 48.565 C 258.724 48.439,258.416 48.696,258.282 49.207 C 258.160 49.676,257.676 50.160,257.207 50.282 C 256.696 50.416,256.439 50.724,256.565 51.053 C 256.805 51.679,255.776 51.809,255.400 51.200 C 255.264 50.980,255.343 50.800,255.576 50.800 C 255.809 50.800,255.955 50.654,255.900 50.475 C 255.754 50.000,258.095 47.612,258.476 47.847 C 258.654 47.957,258.800 47.846,258.800 47.600 C 258.800 47.354,258.980 47.264,259.200 47.400 C 259.420 47.536,259.600 47.901,259.600 48.211 M351.053 48.947 C 352.014 49.908,352.800 50.940,352.800 51.240 C 352.800 51.540,352.360 51.138,351.822 50.346 C 351.283 49.554,350.248 48.525,349.522 48.060 C 348.795 47.594,348.449 47.210,348.753 47.207 C 349.057 47.203,350.092 47.986,351.053 48.947 M54.461 48.774 C 54.803 48.283,54.837 48.287,54.697 48.800 C 54.464 49.655,53.349 49.765,53.041 48.963 C 52.819 48.383,52.873 48.362,53.421 48.818 C 53.955 49.261,54.127 49.254,54.461 48.774 M260.318 49.100 C 260.253 49.485,259.780 50.140,259.267 50.555 C 258.753 50.971,258.199 51.675,258.034 52.119 C 257.812 52.720,257.680 52.783,257.520 52.364 C 257.163 51.427,257.916 50.012,258.989 49.604 C 259.545 49.393,260.000 49.035,260.000 48.810 C 260.000 48.584,260.098 48.400,260.218 48.400 C 260.337 48.400,260.382 48.715,260.318 49.100 M349.994 50.194 C 350.737 50.961,351.268 51.637,351.173 51.698 C 351.078 51.758,350.344 51.131,349.541 50.304 C 348.739 49.477,348.209 48.800,348.363 48.800 C 348.517 48.800,349.251 49.427,349.994 50.194 M253.594 51.100 C 253.589 51.698,253.531 51.713,253.200 51.200 C 252.891 50.721,252.811 50.796,252.806 51.567 C 252.803 52.098,252.918 52.415,253.063 52.270 C 253.208 52.125,253.603 52.230,253.940 52.503 C 254.450 52.916,254.492 52.899,254.187 52.400 C 253.985 52.070,253.872 51.485,253.935 51.100 C 253.998 50.715,253.949 50.400,253.825 50.400 C 253.701 50.400,253.597 50.715,253.594 51.100 M260.100 50.812 C 259.605 51.011,259.200 51.264,259.200 51.375 C 259.200 51.485,259.446 51.480,259.747 51.365 C 260.063 51.244,260.378 51.474,260.493 51.911 C 260.601 52.326,260.490 52.675,260.245 52.686 C 260.000 52.696,259.485 52.835,259.100 52.995 C 258.587 53.208,258.400 53.096,258.400 52.574 C 258.400 51.649,259.547 50.393,260.362 50.425 C 260.777 50.442,260.686 50.577,260.100 50.812 M248.233 52.300 C 248.068 52.465,247.768 52.623,247.567 52.650 C 247.365 52.678,247.041 52.723,246.847 52.750 C 246.652 52.778,246.399 53.160,246.284 53.600 C 246.169 54.040,245.788 54.400,245.437 54.400 C 245.087 54.400,244.778 54.580,244.750 54.800 C 244.650 55.599,244.582 55.809,244.256 56.323 C 243.707 57.189,244.321 58.964,244.981 58.416 C 245.282 58.166,245.623 58.113,245.738 58.300 C 246.063 58.826,245.343 59.736,244.845 59.428 C 244.600 59.276,244.400 59.343,244.400 59.576 C 244.400 60.366,245.505 60.005,246.163 59.000 C 246.765 58.082,246.700 57.826,245.900 57.953 C 245.735 57.979,245.597 57.775,245.594 57.500 C 245.590 57.161,245.468 57.190,245.216 57.588 C 245.011 57.912,244.701 58.035,244.528 57.861 C 244.354 57.687,244.659 57.182,245.206 56.738 C 245.753 56.294,245.994 56.035,245.742 56.163 C 245.490 56.291,245.184 56.136,245.062 55.818 C 244.905 55.409,245.038 55.311,245.520 55.484 C 245.894 55.618,246.065 55.578,245.899 55.396 C 245.493 54.949,246.799 53.552,247.321 53.875 C 247.573 54.030,247.639 53.877,247.488 53.486 C 247.315 53.034,247.413 52.907,247.818 53.062 C 248.136 53.184,248.291 53.490,248.163 53.742 C 248.035 53.994,248.294 53.753,248.738 53.206 C 249.182 52.659,249.687 52.354,249.861 52.528 C 250.035 52.701,249.912 53.011,249.588 53.216 C 249.190 53.468,249.161 53.590,249.500 53.594 C 249.775 53.597,249.979 53.735,249.953 53.900 C 249.827 54.695,250.078 54.767,250.958 54.191 C 252.009 53.502,252.685 51.916,251.780 52.263 C 251.489 52.375,251.339 52.698,251.448 52.981 C 251.557 53.265,251.371 53.602,251.036 53.731 C 250.304 54.012,249.796 53.373,250.436 52.978 C 250.754 52.781,250.727 52.600,250.343 52.356 C 249.669 51.929,248.632 51.902,248.233 52.300 M48.000 52.787 C 48.000 53.001,47.730 53.071,47.400 52.945 C 47.070 52.818,46.800 52.924,46.800 53.181 C 46.800 53.437,46.640 53.549,46.445 53.428 C 46.005 53.156,45.108 54.175,45.470 54.537 C 45.615 54.682,45.504 54.800,45.224 54.800 C 44.944 54.800,44.814 55.058,44.935 55.374 C 45.056 55.690,44.940 56.027,44.678 56.124 C 44.415 56.220,44.680 56.277,45.266 56.249 C 46.140 56.209,46.248 56.097,45.866 55.623 C 45.501 55.172,45.513 55.114,45.918 55.358 C 46.603 55.770,47.698 54.832,47.409 54.079 C 47.239 53.637,47.310 53.594,47.691 53.909 C 48.078 54.230,48.214 54.099,48.258 53.366 C 48.289 52.835,48.244 52.400,48.158 52.400 C 48.071 52.400,48.000 52.574,48.000 52.787 M355.200 54.123 C 355.200 54.343,354.840 54.107,354.400 53.600 C 353.960 53.093,353.600 52.587,353.600 52.477 C 353.600 52.366,353.960 52.602,354.400 53.000 C 354.840 53.398,355.200 53.904,355.200 54.123 M153.600 53.648 C 153.600 54.088,153.417 54.334,153.193 54.196 C 152.970 54.058,152.889 53.779,153.014 53.577 C 153.139 53.375,152.962 53.316,152.621 53.447 C 152.279 53.578,152.000 53.525,152.000 53.328 C 152.000 53.131,152.360 52.943,152.800 52.910 C 153.353 52.868,153.600 53.096,153.600 53.648 M46.960 54.865 C 46.823 55.086,46.500 55.049,46.169 54.774 C 45.861 54.518,45.713 54.141,45.840 53.935 C 45.977 53.714,46.300 53.751,46.631 54.026 C 46.939 54.282,47.087 54.659,46.960 54.865 M52.400 54.320 C 52.400 54.496,52.175 54.879,51.900 55.170 C 51.500 55.594,51.500 55.737,51.900 55.883 C 52.736 56.190,52.459 56.802,51.500 56.768 C 51.005 56.751,50.834 56.643,51.120 56.528 C 51.529 56.365,51.498 56.104,50.978 55.311 C 50.615 54.756,50.503 54.417,50.731 54.557 C 50.958 54.698,51.258 54.630,51.396 54.407 C 51.694 53.924,52.400 53.863,52.400 54.320 M48.932 54.933 C 49.079 55.336,49.200 55.921,49.200 56.233 C 49.200 56.965,49.850 56.968,50.130 56.238 C 50.249 55.928,49.968 55.343,49.505 54.938 C 48.694 54.226,48.674 54.226,48.932 54.933 M47.427 55.570 C 47.054 55.983,46.916 56.424,47.120 56.551 C 47.325 56.678,47.799 56.443,48.173 56.030 C 48.546 55.617,48.684 55.176,48.480 55.049 C 48.275 54.922,47.801 55.157,47.427 55.570 M152.949 55.117 C 153.056 55.291,152.797 55.460,152.372 55.492 C 151.948 55.524,151.600 55.381,151.600 55.175 C 151.600 54.720,152.675 54.673,152.949 55.117 M247.244 55.347 C 246.887 55.777,246.880 56.002,247.215 56.210 C 247.868 56.613,248.677 55.717,248.143 55.183 C 247.854 54.894,247.578 54.944,247.244 55.347 M147.106 55.932 C 147.268 56.354,147.179 56.434,146.806 56.204 C 146.454 55.986,146.372 56.031,146.562 56.338 C 146.737 56.622,146.568 56.802,146.124 56.806 C 145.560 56.811,145.521 56.889,145.947 57.159 C 146.300 57.382,146.735 57.273,147.169 56.853 C 147.968 56.080,148.067 55.333,147.371 55.333 C 147.096 55.333,146.978 55.599,147.106 55.932 M154.477 57.200 C 154.751 57.200,154.735 57.396,154.432 57.761 C 154.075 58.192,154.086 58.363,154.483 58.496 C 154.767 58.592,155.215 58.384,155.478 58.035 C 155.900 57.476,156.115 57.566,157.278 58.791 C 158.542 60.120,158.545 60.133,157.362 59.075 C 156.276 58.105,156.062 58.044,155.620 58.576 C 154.601 59.804,153.018 58.117,153.519 56.339 L 153.784 55.400 153.920 56.300 C 153.994 56.795,154.245 57.200,154.477 57.200 M46.938 57.505 C 47.343 57.968,47.928 58.249,48.238 58.130 C 48.968 57.850,48.965 57.200,48.233 57.200 C 47.921 57.200,47.336 57.079,46.933 56.932 C 46.226 56.674,46.226 56.694,46.938 57.505 M50.748 58.663 C 50.524 58.932,50.077 59.051,49.753 58.927 C 49.252 58.734,49.267 58.589,49.853 57.941 C 50.628 57.085,51.484 57.775,50.748 58.663 M52.140 57.787 C 52.264 58.110,52.213 58.468,52.028 58.583 C 51.843 58.697,51.597 58.433,51.483 57.996 C 51.244 57.081,51.801 56.904,52.140 57.787 M47.484 59.680 C 47.111 59.917,47.110 59.989,47.480 59.994 C 47.744 59.997,48.145 59.685,48.370 59.300 C 48.719 58.705,48.769 58.757,48.707 59.650 C 48.651 60.451,48.420 60.700,47.734 60.700 C 47.238 60.700,46.871 60.498,46.917 60.250 C 46.963 60.002,46.745 59.855,46.432 59.923 C 45.989 60.018,45.966 59.922,46.329 59.486 C 46.584 59.178,46.660 58.784,46.497 58.611 C 46.333 58.437,46.598 58.537,47.084 58.834 C 47.711 59.216,47.827 59.462,47.484 59.680 M40.025 61.931 C 38.500 62.749,37.179 64.867,37.241 66.394 C 37.274 67.190,37.367 67.084,37.684 65.888 C 38.196 63.957,39.957 62.196,41.888 61.684 C 43.084 61.367,43.190 61.274,42.394 61.241 C 41.840 61.219,40.774 61.529,40.025 61.931 M361.550 63.861 C 361.050 64.463,360.631 64.597,360.972 64.045 C 361.270 63.563,360.215 62.732,359.776 63.103 C 359.584 63.267,359.671 63.080,359.971 62.690 C 360.480 62.025,360.561 62.022,361.256 62.651 C 361.820 63.161,361.890 63.451,361.550 63.861 M44.500 65.580 C 44.327 68.618,44.288 68.677,42.451 68.677 C 41.533 68.677,40.930 68.513,41.063 68.299 C 41.191 68.090,40.927 68.118,40.475 68.360 C 38.384 69.479,38.700 67.194,40.947 64.947 C 43.528 62.367,44.671 62.571,44.500 65.580 M359.304 64.400 C 359.493 64.400,359.536 64.220,359.400 64.000 C 358.998 63.349,359.457 63.544,360.051 64.277 C 360.424 64.737,360.440 64.857,360.100 64.653 C 359.462 64.270,359.448 64.888,360.080 65.520 C 360.344 65.784,360.442 66.000,360.298 66.000 C 359.957 66.000,358.000 64.043,358.000 63.702 C 358.000 63.558,358.216 63.656,358.480 63.920 C 358.744 64.184,359.115 64.400,359.304 64.400 M358.719 66.059 C 358.434 66.240,358.371 66.391,358.580 66.394 C 358.789 66.397,358.748 66.612,358.490 66.870 C 358.129 67.231,358.134 67.488,358.510 67.970 C 358.943 68.527,358.918 68.536,358.295 68.047 C 357.794 67.654,357.709 67.351,358.000 67.000 C 358.559 66.327,357.535 65.425,356.916 66.044 C 356.615 66.345,356.400 66.324,356.183 65.973 C 355.992 65.664,356.041 65.578,356.311 65.745 C 356.549 65.892,356.860 65.827,357.000 65.600 C 357.140 65.373,357.423 65.291,357.628 65.417 C 357.832 65.544,358.000 65.435,358.000 65.175 C 358.000 64.829,358.166 64.840,358.619 65.216 C 359.113 65.626,359.133 65.796,358.719 66.059 M359.856 67.500 C 359.825 67.885,359.995 68.165,360.233 68.122 C 360.472 68.079,360.667 68.314,360.667 68.644 C 360.667 69.116,360.499 69.077,359.885 68.463 C 359.455 68.033,359.225 67.483,359.375 67.240 C 359.764 66.611,359.919 66.695,359.856 67.500 M363.367 67.457 C 363.731 68.406,363.523 68.431,362.456 67.566 C 361.569 66.847,361.561 66.800,362.313 66.800 C 362.754 66.800,363.228 67.096,363.367 67.457 M38.000 71.115 C 38.000 71.288,37.636 71.457,37.191 71.491 C 36.747 71.524,36.487 71.382,36.615 71.176 C 36.896 70.721,38.000 70.673,38.000 71.115 M38.405 72.392 C 38.032 73.088,37.833 73.160,37.362 72.769 C 37.042 72.503,36.885 72.182,37.012 72.055 C 37.139 71.927,37.394 72.067,37.578 72.364 C 37.833 72.777,37.979 72.696,38.193 72.023 C 38.347 71.537,38.561 71.228,38.669 71.336 C 38.777 71.443,38.658 71.919,38.405 72.392 M103.000 71.864 C 83.229 73.046,69.469 79.802,63.029 91.487 C 61.965 93.419,60.371 95.951,59.488 97.114 C 54.154 104.134,53.587 123.731,58.657 125.850 C 60.083 126.445,60.573 127.292,63.999 135.073 C 64.501 136.214,65.564 137.784,66.362 138.562 L 67.811 139.978 72.006 139.725 C 76.869 139.431,77.746 138.831,80.078 134.200 C 81.557 131.264,82.423 130.284,85.003 128.623 C 86.651 127.563,87.323 126.740,88.803 123.973 C 89.791 122.123,91.420 119.798,92.422 118.805 C 93.424 117.812,94.735 116.329,95.336 115.509 C 96.701 113.644,104.366 105.992,106.790 104.074 C 107.786 103.286,109.794 101.438,111.253 99.966 C 112.713 98.494,114.963 96.674,116.253 95.922 C 117.919 94.950,119.021 93.919,120.051 92.367 C 120.849 91.165,122.246 89.555,123.156 88.791 C 129.182 83.725,128.920 84.368,127.294 78.666 C 126.264 75.056,123.070 73.683,112.200 72.179 C 108.332 71.644,107.283 71.608,103.000 71.864 M287.800 72.444 C 278.404 74.440,276.235 75.984,275.235 81.392 L 274.801 83.743 277.728 86.772 C 279.337 88.437,281.245 90.669,281.968 91.731 C 283.396 93.830,286.300 95.901,289.674 97.225 C 292.143 98.194,293.391 99.245,294.400 101.200 C 295.290 102.926,296.514 104.066,298.600 105.112 C 300.663 106.147,301.423 107.017,302.950 110.087 C 303.943 112.083,304.639 112.888,306.332 114.000 C 308.166 115.205,308.723 115.903,310.324 119.000 C 311.664 121.594,313.025 123.470,315.192 125.712 C 316.846 127.423,318.860 129.943,319.667 131.312 C 321.918 135.127,323.102 136.344,325.890 137.703 C 327.300 138.391,329.227 139.749,330.172 140.721 C 332.640 143.260,334.461 141.703,338.263 133.802 C 339.419 131.402,339.998 130.644,340.997 130.227 C 346.132 128.082,347.301 110.707,343.169 97.970 C 340.545 89.883,332.456 81.582,322.600 76.864 C 313.834 72.667,296.887 70.515,287.800 72.444 M41.038 72.462 C 41.215 72.748,41.148 72.815,40.862 72.638 C 40.246 72.257,40.297 72.831,40.957 73.700 C 41.599 74.546,42.059 74.619,41.755 73.826 C 41.363 72.806,43.745 73.747,44.291 74.828 C 44.884 76.001,44.612 77.157,43.521 78.100 C 42.895 78.641,42.850 78.800,43.322 78.800 C 43.658 78.800,44.005 78.584,44.093 78.320 C 44.217 77.948,44.321 77.949,44.553 78.324 C 44.755 78.651,44.443 78.891,43.594 79.061 C 42.706 79.239,42.492 79.412,42.868 79.650 C 43.280 79.912,43.250 79.989,42.733 79.994 C 42.367 79.997,41.976 80.225,41.865 80.500 C 41.741 80.808,41.651 80.740,41.632 80.324 C 41.614 79.952,41.792 79.528,42.027 79.383 C 42.262 79.238,42.346 78.837,42.214 78.492 C 42.081 78.146,42.174 77.740,42.420 77.588 C 42.717 77.404,42.648 77.227,42.213 77.060 C 41.830 76.914,41.660 76.973,41.803 77.205 C 41.937 77.422,41.846 77.600,41.600 77.600 C 41.354 77.600,41.281 77.808,41.438 78.062 C 41.604 78.330,41.549 78.416,41.307 78.266 C 41.078 78.125,40.665 78.281,40.389 78.614 C 39.971 79.117,39.996 79.176,40.543 78.966 C 41.351 78.656,41.445 79.699,40.667 80.345 C 40.272 80.672,40.117 80.659,40.070 80.294 C 39.799 78.167,39.667 77.798,39.167 77.787 C 38.855 77.779,38.448 77.959,38.262 78.187 C 38.062 78.432,38.014 78.321,38.145 77.913 C 38.392 77.142,37.794 76.562,37.404 77.193 C 37.081 77.716,36.400 77.721,36.400 77.200 C 36.400 76.980,36.617 76.845,36.882 76.900 C 37.152 76.956,37.372 76.563,37.382 76.005 C 37.393 75.386,37.664 74.960,38.100 74.876 C 38.485 74.802,38.800 74.564,38.800 74.347 C 38.800 74.130,38.632 74.056,38.428 74.183 C 38.223 74.309,37.942 74.230,37.804 74.007 C 37.659 73.772,37.981 73.600,38.564 73.600 C 39.266 73.600,39.509 73.771,39.360 74.160 C 39.089 74.867,39.845 75.374,40.234 74.745 C 40.415 74.452,40.350 74.384,40.062 74.562 C 39.808 74.719,39.600 74.657,39.600 74.424 C 39.600 74.191,39.825 73.986,40.100 73.968 C 40.496 73.943,40.497 73.895,40.103 73.736 C 39.742 73.590,39.718 73.326,40.017 72.768 C 40.494 71.877,40.648 71.830,41.038 72.462 M40.370 76.564 C 40.659 76.912,40.691 77.220,40.454 77.367 C 40.242 77.498,40.008 77.437,39.934 77.232 C 39.760 76.748,39.029 76.513,38.900 76.900 C 38.845 77.065,38.862 77.155,38.939 77.100 C 39.015 77.045,39.388 77.258,39.769 77.574 C 40.344 78.052,40.517 78.058,40.793 77.611 C 41.185 76.978,40.890 76.000,40.308 76.000 C 40.063 76.000,40.087 76.223,40.370 76.564 M370.114 77.720 C 370.601 78.226,371.074 78.587,371.164 78.523 C 371.398 78.355,369.942 76.800,369.552 76.800 C 369.374 76.800,369.627 77.214,370.114 77.720 M366.158 78.068 C 365.962 78.385,366.089 78.451,366.555 78.273 C 367.018 78.095,367.148 78.160,366.955 78.473 C 366.764 78.781,366.889 78.851,367.330 78.682 C 368.042 78.409,368.096 79.182,367.400 79.694 C 366.716 80.196,366.303 80.029,366.562 79.355 C 366.733 78.909,366.636 78.777,366.244 78.928 C 365.872 79.070,365.723 78.915,365.809 78.472 C 365.983 77.572,365.970 77.600,366.224 77.600 C 366.347 77.600,366.317 77.811,366.158 78.068 M113.644 78.562 C 117.270 79.151,118.486 79.641,121.900 81.893 C 124.338 83.501,124.517 84.167,122.671 84.777 C 120.875 85.369,119.097 87.313,117.732 90.175 C 116.758 92.220,116.266 92.744,114.200 93.945 C 112.880 94.712,110.769 96.389,109.508 97.671 C 108.248 98.954,105.923 101.117,104.341 102.479 C 97.681 108.210,89.211 117.857,87.291 121.896 C 85.934 124.752,84.872 125.917,81.664 128.072 C 80.655 128.750,79.475 130.159,78.455 131.905 C 75.985 136.135,75.627 136.217,70.159 133.799 C 65.954 131.939,62.000 121.418,62.000 112.091 C 62.000 105.452,65.889 95.264,69.484 92.484 C 70.256 91.888,71.883 90.605,73.099 89.633 C 83.243 81.528,101.391 76.573,113.644 78.562 M307.010 79.603 C 314.251 81.466,320.791 84.089,324.650 86.677 C 326.149 87.682,328.460 89.106,329.787 89.841 C 332.459 91.320,335.496 95.480,338.841 102.242 C 342.511 109.663,341.908 120.007,337.423 126.551 C 336.500 127.898,334.954 130.406,333.987 132.124 C 332.506 134.758,332.101 135.211,331.415 135.009 C 329.675 134.496,325.359 133.614,324.561 133.607 C 323.924 133.602,323.299 132.813,321.961 130.326 C 320.877 128.309,318.971 125.715,317.000 123.574 C 315.240 121.661,313.060 118.769,312.156 117.148 C 310.952 114.988,309.892 113.718,308.193 112.395 C 306.631 111.179,305.444 109.809,304.553 108.195 C 303.230 105.796,301.897 104.398,298.885 102.251 C 297.999 101.619,296.797 100.225,296.213 99.153 C 295.027 96.974,293.787 95.933,290.027 93.961 C 288.441 93.129,287.214 92.168,286.827 91.457 C 286.482 90.823,285.075 88.882,283.700 87.144 C 280.793 83.469,280.871 83.810,282.515 81.932 C 286.065 77.875,296.458 76.887,307.010 79.603 M369.294 80.732 C 369.146 81.119,369.228 81.230,369.527 81.045 C 369.840 80.852,369.905 80.982,369.727 81.445 C 369.530 81.961,369.605 82.049,370.032 81.801 C 370.345 81.620,370.460 81.625,370.288 81.814 C 369.750 82.405,368.840 82.362,369.072 81.756 C 369.223 81.364,369.091 81.267,368.645 81.438 C 367.951 81.704,367.879 81.580,368.217 80.699 C 368.337 80.388,368.680 80.133,368.979 80.133 C 369.298 80.133,369.429 80.381,369.294 80.732 M371.508 86.725 C 371.748 87.445,370.922 87.294,370.643 86.567 C 370.493 86.177,370.582 85.994,370.875 86.092 C 371.136 86.179,371.421 86.464,371.508 86.725 M32.399 88.662 C 31.740 89.413,31.200 90.232,31.200 90.481 C 31.200 90.730,31.108 90.841,30.995 90.728 C 30.882 90.615,31.064 89.865,31.400 89.061 C 31.736 88.258,31.896 87.600,31.756 87.600 C 31.616 87.600,31.728 87.328,32.004 86.995 C 32.386 86.535,32.637 86.499,33.052 86.843 C 33.501 87.216,33.385 87.540,32.399 88.662 M369.127 88.445 C 368.746 88.681,368.786 88.820,369.292 89.014 C 369.991 89.282,370.800 88.976,370.800 88.443 C 370.800 88.043,369.776 88.044,369.127 88.445 M197.800 90.383 C 195.083 90.750,181.411 95.011,177.600 96.679 C 172.813 98.773,162.228 105.061,159.648 107.342 C 158.192 108.631,153.933 111.985,150.184 114.795 C 131.704 128.649,127.638 139.111,131.446 163.000 C 131.988 166.401,137.567 177.552,141.253 182.600 C 145.924 188.997,156.180 195.480,168.800 200.014 C 171.110 200.843,174.440 202.104,176.200 202.816 C 177.960 203.528,181.110 204.635,183.200 205.276 C 185.290 205.918,188.800 206.994,191.000 207.668 C 201.771 210.966,213.473 209.477,223.917 203.480 C 225.613 202.506,229.108 200.710,231.685 199.490 C 240.003 195.548,252.706 186.384,257.240 181.052 C 263.728 173.425,266.300 167.069,267.606 155.437 C 269.462 138.916,265.846 127.613,255.457 117.464 C 235.828 98.289,214.260 88.158,197.800 90.383 M32.400 91.207 C 31.467 91.512,31.485 91.531,32.672 91.484 C 33.372 91.457,33.856 91.291,33.749 91.117 C 33.641 90.943,33.518 90.818,33.476 90.840 C 33.434 90.862,32.950 91.027,32.400 91.207 M371.065 93.479 C 370.933 94.292,370.909 95.042,371.012 95.146 C 371.116 95.249,371.203 94.988,371.206 94.567 C 371.211 93.925,371.276 93.898,371.600 94.400 C 371.888 94.846,371.989 94.616,371.994 93.500 C 372.002 91.570,371.377 91.556,371.065 93.479 M28.900 98.312 C 27.757 98.494,27.441 111.200,28.579 111.200 C 29.052 111.200,29.080 110.974,28.730 109.971 C 27.995 107.863,28.496 99.612,29.399 98.952 C 30.280 98.307,30.130 98.115,28.900 98.312 M371.186 98.774 C 371.414 99.199,371.638 101.764,371.685 104.474 L 371.770 109.400 371.905 105.000 C 372.049 100.298,371.807 98.000,371.168 98.000 C 370.913 98.000,370.919 98.275,371.186 98.774 M208.289 108.438 C 211.335 109.091,213.615 109.969,218.600 112.404 L 225.000 115.532 230.400 121.066 C 243.741 134.738,245.980 145.193,238.952 160.990 L 236.999 165.379 232.799 168.876 C 226.892 173.795,220.324 177.379,210.600 180.991 C 209.280 181.481,207.660 182.104,207.000 182.376 C 201.048 184.827,182.473 182.247,175.413 177.989 C 171.379 175.556,160.000 165.270,160.000 164.057 C 160.000 163.813,159.278 161.945,158.396 159.906 C 152.700 146.740,157.026 131.921,169.074 123.335 C 170.567 122.271,173.138 120.188,174.787 118.706 C 180.169 113.869,190.123 109.469,198.600 108.179 C 203.173 107.483,203.928 107.504,208.289 108.438 M28.465 115.400 C 28.276 118.176,29.528 118.866,30.744 116.655 C 31.549 115.191,31.560 115.116,30.836 116.000 C 30.386 116.550,30.014 117.157,30.009 117.349 C 29.989 118.126,28.836 116.666,28.684 115.671 C 28.578 114.980,28.501 114.884,28.465 115.400 M34.655 117.112 C 34.525 117.321,34.761 117.803,35.179 118.181 C 35.848 118.786,35.928 118.792,35.846 118.231 C 35.717 117.351,34.951 116.632,34.655 117.112 M30.533 118.231 C 30.400 118.577,29.865 119.023,29.345 119.221 C 28.783 119.435,28.400 119.907,28.400 120.386 C 28.400 121.102,28.529 121.057,29.553 119.986 C 30.510 118.985,30.749 118.889,30.953 119.422 C 31.302 120.332,31.271 120.402,30.630 120.156 C 29.276 119.637,28.599 121.881,29.540 123.765 C 30.013 124.713,30.400 125.679,30.400 125.913 C 30.400 127.237,33.982 130.000,35.698 130.000 C 36.803 130.000,36.325 126.307,35.083 125.250 C 34.469 124.728,34.063 124.204,34.181 124.086 C 34.299 123.968,34.756 124.198,35.198 124.598 C 35.639 124.997,36.020 125.161,36.044 124.962 C 36.279 123.018,36.249 121.954,35.952 121.771 C 35.754 121.648,35.793 121.188,36.039 120.727 C 36.281 120.274,36.310 120.008,36.103 120.136 C 35.896 120.264,35.113 119.736,34.363 118.962 L 33.000 117.556 32.054 118.678 C 31.472 119.369,31.201 119.523,31.350 119.079 C 31.512 118.595,31.439 118.452,31.127 118.645 C 30.818 118.836,30.749 118.710,30.919 118.266 C 31.060 117.900,31.085 117.600,30.975 117.600 C 30.865 117.600,30.666 117.884,30.533 118.231 M34.962 120.461 C 34.847 120.648,34.978 120.800,35.253 120.800 C 35.536 120.800,35.417 121.074,34.976 121.433 C 34.313 121.973,34.302 122.033,34.900 121.845 C 35.851 121.546,35.784 121.873,34.784 122.409 C 34.036 122.809,31.200 121.647,31.200 120.941 C 31.200 120.223,32.162 119.200,32.838 119.200 C 33.284 119.200,33.535 119.018,33.396 118.793 C 33.258 118.570,32.949 118.508,32.711 118.655 C 32.441 118.822,32.392 118.736,32.582 118.429 C 32.804 118.070,33.200 118.234,34.030 119.028 C 34.658 119.630,35.077 120.275,34.962 120.461 M33.600 119.528 C 33.600 119.762,33.218 119.880,32.750 119.790 C 31.929 119.632,31.925 119.654,32.612 120.413 C 33.297 121.170,32.978 121.518,32.166 120.900 C 31.950 120.735,32.194 121.005,32.709 121.500 C 33.223 121.995,33.860 122.395,34.122 122.388 C 34.385 122.381,34.301 122.201,33.935 121.988 C 33.156 121.533,33.220 120.311,34.035 120.091 C 34.377 119.999,34.442 120.069,34.200 120.270 C 33.610 120.757,33.498 121.701,34.053 121.516 C 34.748 121.284,34.814 120.110,34.162 119.568 C 33.790 119.260,33.600 119.246,33.600 119.528 M30.700 120.861 C 30.645 121.114,31.212 121.744,31.959 122.261 C 32.707 122.777,33.125 123.200,32.890 123.200 C 32.654 123.200,31.933 122.755,31.286 122.211 C 30.190 121.288,29.600 121.246,29.600 122.090 C 29.600 122.287,29.768 122.344,29.972 122.217 C 30.177 122.091,30.475 122.198,30.634 122.455 C 30.815 122.748,30.750 122.816,30.462 122.638 C 30.208 122.481,30.000 122.528,30.000 122.743 C 30.000 122.958,30.225 123.224,30.500 123.335 C 30.814 123.462,30.832 123.549,30.549 123.568 C 29.566 123.637,29.046 122.434,29.607 121.386 C 30.146 120.380,30.881 120.027,30.700 120.861 M35.637 122.956 C 35.226 123.451,33.200 124.107,33.200 123.746 C 33.200 123.625,35.484 122.535,35.949 122.433 C 36.031 122.415,35.890 122.650,35.637 122.956 M371.524 124.200 C 371.434 124.970,371.504 125.600,371.680 125.600 C 371.856 125.600,372.000 124.970,372.000 124.200 C 372.000 123.430,371.930 122.800,371.844 122.800 C 371.758 122.800,371.614 123.430,371.524 124.200 M368.311 130.708 C 368.069 130.998,367.605 131.134,367.279 131.009 C 366.805 130.827,366.782 130.896,367.163 131.355 C 367.531 131.799,367.530 131.996,367.158 132.226 C 366.870 132.404,366.781 132.355,366.936 132.104 C 367.079 131.873,366.906 131.573,366.553 131.437 C 366.099 131.263,365.977 131.364,366.138 131.783 C 366.263 132.108,366.148 132.499,365.883 132.651 C 365.617 132.804,365.520 132.794,365.667 132.631 C 366.128 132.116,364.661 130.882,364.100 131.313 C 363.305 131.925,363.443 134.146,364.257 133.834 C 364.806 133.623,364.830 133.682,364.408 134.191 C 364.130 134.526,364.036 134.800,364.200 134.800 C 364.364 134.800,364.330 135.025,364.126 135.300 C 363.735 135.825,363.731 137.464,364.119 137.853 C 365.130 138.864,369.865 135.055,369.470 133.548 C 369.363 133.136,369.438 132.900,369.637 133.023 C 369.837 133.146,370.014 133.012,370.031 132.724 C 370.047 132.436,370.122 131.885,370.195 131.500 C 370.332 130.787,369.958 130.575,369.455 131.078 C 369.025 131.508,367.967 131.577,368.226 131.158 C 368.352 130.954,368.651 130.908,368.889 131.055 C 369.167 131.227,369.207 131.135,369.000 130.800 C 368.818 130.506,368.835 130.369,369.038 130.488 C 369.237 130.605,369.760 130.554,370.200 130.376 C 370.868 130.106,370.815 130.063,369.875 130.116 C 369.256 130.150,368.552 130.417,368.311 130.708 M365.200 132.194 C 365.200 132.253,364.940 132.518,364.623 132.781 C 364.151 133.172,364.056 133.116,364.104 132.474 C 364.150 131.873,365.200 131.604,365.200 132.194 M369.075 137.246 C 368.456 137.881,368.110 138.400,368.305 138.400 C 368.744 138.400,370.601 136.463,370.368 136.247 C 370.276 136.162,369.694 136.611,369.075 137.246 M36.046 141.100 C 36.008 142.185,36.145 142.400,36.876 142.400 C 37.654 142.400,37.680 142.343,37.110 141.900 C 36.757 141.625,36.383 141.040,36.280 140.600 C 36.161 140.091,36.076 140.273,36.046 141.100 M38.750 143.800 C 38.723 143.910,38.678 144.217,38.650 144.482 C 38.623 144.747,38.163 145.067,37.630 145.193 C 36.343 145.497,36.200 146.095,37.200 147.000 C 38.082 147.798,38.625 147.537,38.867 146.200 C 38.946 145.760,39.218 145.400,39.472 145.400 C 39.726 145.400,40.038 145.265,40.167 145.100 C 40.295 144.935,40.282 144.888,40.137 144.997 C 39.749 145.286,38.772 144.369,39.028 143.955 C 39.149 143.760,39.147 143.600,39.024 143.600 C 38.901 143.600,38.778 143.690,38.750 143.800 M363.600 145.767 C 363.600 146.078,363.375 146.424,363.100 146.535 C 362.801 146.656,362.882 146.750,363.300 146.768 C 363.744 146.788,364.000 146.507,364.000 146.000 C 364.000 145.560,363.910 145.200,363.800 145.200 C 363.690 145.200,363.600 145.455,363.600 145.767 M38.262 146.217 C 38.392 146.557,38.391 146.942,38.259 147.074 C 37.974 147.359,36.800 146.455,36.800 145.951 C 36.800 145.347,38.013 145.568,38.262 146.217 M41.600 147.124 C 41.600 147.855,41.815 147.992,42.900 147.954 C 43.727 147.924,43.909 147.839,43.400 147.720 C 42.960 147.617,42.375 147.243,42.100 146.890 C 41.657 146.320,41.600 146.346,41.600 147.124 M357.428 149.570 C 356.794 150.233,356.505 150.817,356.740 150.963 C 356.962 151.100,357.258 151.030,357.396 150.807 C 357.534 150.583,357.525 150.400,357.375 150.400 C 357.225 150.400,357.324 150.132,357.596 149.804 C 357.868 149.477,358.238 149.300,358.418 149.411 C 358.598 149.522,358.850 149.443,358.979 149.234 C 359.560 148.294,358.413 148.543,357.428 149.570 M362.400 150.024 C 362.400 150.257,362.567 150.344,362.771 150.218 C 362.976 150.091,363.221 150.396,363.317 150.894 C 363.468 151.678,363.498 151.652,363.546 150.700 C 363.582 149.965,363.401 149.600,363.000 149.600 C 362.670 149.600,362.400 149.791,362.400 150.024 M361.500 150.665 C 361.775 150.776,362.000 151.042,362.000 151.257 C 362.000 151.472,361.807 151.528,361.570 151.382 C 360.997 151.027,359.122 152.821,359.376 153.481 C 359.485 153.766,359.416 154.000,359.221 154.000 C 359.026 154.000,358.776 153.775,358.665 153.500 C 358.538 153.186,358.451 153.168,358.432 153.451 C 358.414 153.699,358.670 154.126,359.000 154.400 C 359.439 154.764,359.600 154.773,359.600 154.431 C 359.600 154.175,359.911 154.018,360.291 154.082 C 360.688 154.150,360.986 153.945,360.991 153.600 C 360.996 153.270,361.270 152.996,361.600 152.991 C 361.945 152.986,362.150 152.688,362.082 152.291 C 362.018 151.911,362.175 151.600,362.431 151.600 C 362.773 151.600,362.764 151.439,362.400 151.000 C 362.126 150.670,361.699 150.414,361.451 150.432 C 361.168 150.451,361.186 150.538,361.500 150.665 M361.778 152.288 C 361.924 152.666,361.914 152.848,361.758 152.691 C 361.384 152.317,360.345 153.188,360.625 153.641 C 360.744 153.833,360.562 153.884,360.221 153.753 C 359.436 153.451,359.442 153.238,360.262 152.331 C 361.087 151.420,361.441 151.410,361.778 152.288 M362.599 153.202 C 362.460 153.643,361.862 154.265,361.273 154.586 C 360.496 155.007,360.393 155.172,360.900 155.184 C 361.751 155.203,363.200 153.827,363.200 153.000 C 363.200 152.154,362.900 152.255,362.599 153.202 M357.600 155.000 C 357.600 155.401,357.965 155.582,358.700 155.546 C 359.652 155.498,359.678 155.468,358.894 155.317 C 358.396 155.221,358.091 154.976,358.218 154.771 C 358.344 154.567,358.257 154.400,358.024 154.400 C 357.791 154.400,357.600 154.670,357.600 155.000 M46.509 165.628 C 47.719 168.031,49.147 169.275,51.316 169.816 C 52.942 170.222,52.569 169.266,50.600 167.985 C 48.615 166.693,46.362 163.560,47.662 163.900 C 48.110 164.017,49.148 164.833,49.969 165.713 C 51.880 167.762,53.061 167.581,51.249 165.517 C 50.396 164.546,50.148 164.015,50.491 163.896 C 50.771 163.798,50.460 163.723,49.800 163.730 C 49.140 163.736,47.861 163.632,46.958 163.500 L 45.316 163.258 46.509 165.628 M349.250 164.619 C 348.563 165.198,348.000 165.931,348.000 166.249 C 348.000 166.593,348.583 166.244,349.440 165.387 C 351.158 163.669,351.024 163.127,349.250 164.619 M352.588 164.823 C 351.818 166.311,352.167 166.382,352.971 164.900 C 353.299 164.295,353.575 164.055,353.584 164.367 C 353.593 164.678,353.727 164.806,353.882 164.651 C 354.037 164.496,354.479 164.961,354.865 165.685 C 355.532 166.935,355.567 166.950,355.577 166.000 C 355.601 163.710,353.576 162.912,352.588 164.823 M349.875 165.922 C 349.284 166.539,348.806 167.304,348.813 167.622 C 348.823 168.070,348.944 168.044,349.352 167.506 C 349.642 167.125,349.971 166.904,350.083 167.016 C 350.194 167.128,350.514 166.945,350.792 166.610 C 351.070 166.274,351.152 166.000,350.973 166.000 C 350.794 166.000,350.996 165.736,351.424 165.413 C 352.046 164.942,352.076 164.823,351.575 164.813 C 351.231 164.806,350.466 165.305,349.875 165.922 M353.047 165.853 C 352.916 166.264,352.807 166.735,352.805 166.900 C 352.798 167.303,351.454 168.700,351.195 168.572 C 350.327 168.142,349.210 169.485,349.910 170.118 C 353.052 172.962,357.028 168.850,354.032 165.854 C 353.302 165.124,353.278 165.124,353.047 165.853 M354.385 167.164 C 355.286 169.340,353.340 171.286,351.164 170.385 C 350.524 170.120,350.000 169.734,350.000 169.528 C 350.000 169.322,350.180 169.264,350.400 169.400 C 350.620 169.536,350.800 169.457,350.800 169.224 C 350.800 168.991,350.935 168.842,351.100 168.893 C 351.566 169.037,353.184 167.498,352.956 167.129 C 352.844 166.948,352.954 166.800,353.200 166.800 C 353.446 166.800,353.536 166.620,353.400 166.400 C 353.264 166.180,353.322 166.000,353.528 166.000 C 353.734 166.000,354.120 166.524,354.385 167.164 M353.423 167.528 C 353.261 168.038,352.586 168.785,351.924 169.188 C 350.749 169.902,350.741 169.927,351.608 170.203 C 352.959 170.631,354.694 168.785,354.129 167.521 L 353.718 166.600 353.423 167.528 M353.199 169.002 C 352.683 169.551,352.123 170.000,351.956 170.000 C 351.788 170.000,352.135 169.499,352.726 168.888 C 353.316 168.276,353.876 167.826,353.968 167.889 C 354.061 167.952,353.714 168.452,353.199 169.002 M348.000 170.357 C 348.000 171.175,348.756 171.610,350.133 171.583 C 350.861 171.569,350.790 171.454,349.685 170.865 C 348.961 170.479,348.496 170.037,348.651 169.882 C 348.806 169.727,348.723 169.600,348.467 169.600 C 348.210 169.600,348.000 169.941,348.000 170.357 M52.000 172.776 C 52.000 173.449,52.069 174.000,52.153 174.000 C 52.493 174.000,52.669 171.966,52.346 171.767 C 52.156 171.649,52.000 172.103,52.000 172.776 M348.000 172.985 C 348.000 173.086,348.749 173.371,349.664 173.617 C 351.927 174.227,353.021 175.010,353.723 176.523 C 354.539 178.282,355.001 180.571,354.474 180.245 C 354.247 180.105,353.942 179.449,353.797 178.786 C 353.323 176.626,350.368 174.000,348.413 174.000 C 347.526 174.000,348.063 175.465,349.194 176.133 C 349.851 176.521,350.886 177.505,351.494 178.319 C 352.102 179.134,352.870 180.035,353.200 180.322 C 353.698 180.755,353.630 180.763,352.800 180.367 C 352.250 180.104,351.017 179.105,350.061 178.145 C 347.896 175.974,346.615 177.103,348.512 179.509 C 348.809 179.887,348.751 179.956,348.286 179.778 C 347.806 179.593,347.710 179.732,347.876 180.368 C 347.995 180.826,348.263 181.200,348.470 181.200 C 348.678 181.200,348.736 181.020,348.600 180.800 C 348.464 180.580,348.543 180.400,348.776 180.400 C 349.009 180.400,349.213 180.715,349.228 181.100 C 349.251 181.673,349.306 181.691,349.528 181.200 C 349.837 180.517,350.855 180.402,351.294 181.000 C 351.476 181.248,351.590 181.210,351.594 180.900 C 351.597 180.625,351.774 180.400,351.987 180.400 C 352.201 180.400,352.278 180.652,352.160 180.960 C 352.042 181.267,352.136 181.637,352.368 181.780 C 352.625 181.939,352.698 181.799,352.553 181.421 C 352.266 180.674,352.832 180.607,353.579 181.300 C 353.894 181.593,354.012 181.612,353.863 181.345 C 353.721 181.092,353.960 180.799,354.404 180.683 C 355.268 180.457,355.516 181.006,354.700 181.335 C 354.413 181.451,354.511 181.550,354.932 181.568 C 355.546 181.595,355.623 181.391,355.413 180.300 C 354.362 174.857,353.835 174.013,351.000 173.241 C 349.325 172.784,348.000 172.671,348.000 172.985 M45.782 181.782 C 45.242 182.322,44.807 183.177,44.816 183.682 C 44.829 184.465,44.915 184.406,45.402 183.286 C 45.753 182.478,46.478 181.753,47.286 181.402 C 48.406 180.915,48.465 180.829,47.682 180.816 C 47.177 180.807,46.322 181.242,45.782 181.782 M355.515 186.000 C 355.612 186.660,355.760 187.200,355.845 187.200 C 355.930 187.200,356.000 186.660,356.000 186.000 C 356.000 185.340,355.851 184.800,355.669 184.800 C 355.487 184.800,355.418 185.340,355.515 186.000 M356.006 189.100 C 356.010 189.550,356.117 189.636,356.306 189.340 C 356.468 189.088,357.050 188.797,357.600 188.695 C 358.447 188.537,358.401 188.501,357.300 188.454 C 356.306 188.413,356.001 188.565,356.006 189.100 M360.126 189.207 C 361.698 189.679,362.346 190.303,362.766 191.750 C 363.067 192.791,363.134 192.845,363.164 192.069 C 363.211 190.856,361.146 188.790,359.931 188.834 C 359.088 188.866,359.107 188.901,360.126 189.207 M363.200 194.567 C 363.200 195.098,362.975 195.624,362.700 195.735 C 362.401 195.856,362.482 195.950,362.900 195.968 C 363.418 195.992,363.600 195.688,363.600 194.800 C 363.600 194.140,363.510 193.600,363.400 193.600 C 363.290 193.600,363.200 194.035,363.200 194.567 M42.848 194.949 L 41.956 195.898 42.978 196.094 C 43.881 196.266,44.000 196.156,44.000 195.145 C 44.000 193.760,43.970 193.755,42.848 194.949 M29.600 205.600 C 29.160 206.040,28.812 206.625,28.827 206.900 C 28.842 207.175,29.041 207.014,29.269 206.542 C 29.498 206.071,30.071 205.498,30.542 205.269 C 31.014 205.041,31.175 204.842,30.900 204.827 C 30.625 204.812,30.040 205.160,29.600 205.600 M373.600 212.963 C 373.600 213.348,373.883 213.452,374.500 213.293 C 375.337 213.078,375.358 213.115,374.800 213.831 C 374.246 214.541,374.253 214.558,374.895 214.055 C 375.555 213.538,377.194 213.739,376.661 214.273 C 376.304 214.629,377.213 215.639,377.648 215.370 C 378.273 214.984,378.512 216.382,377.945 217.105 C 377.442 217.747,377.459 217.754,378.169 217.200 C 378.885 216.642,378.922 216.663,378.707 217.500 C 378.548 218.117,378.652 218.400,379.037 218.400 C 379.374 218.400,379.600 217.989,379.600 217.376 C 379.600 216.709,379.441 216.451,379.142 216.636 C 378.819 216.836,378.762 216.604,378.951 215.851 C 379.333 214.330,377.670 212.667,376.149 213.049 C 375.396 213.238,375.164 213.181,375.364 212.858 C 375.549 212.559,375.291 212.400,374.624 212.400 C 374.011 212.400,373.600 212.626,373.600 212.963 M378.000 214.000 C 378.440 214.440,378.800 215.014,378.800 215.276 C 378.800 215.539,378.536 215.404,378.213 214.976 C 377.851 214.498,377.621 214.401,377.613 214.724 C 377.606 215.012,377.401 215.124,377.157 214.974 C 376.842 214.779,376.856 214.613,377.205 214.397 C 377.564 214.175,377.494 213.976,376.948 213.659 C 376.537 213.420,376.425 213.219,376.700 213.212 C 376.975 213.205,377.560 213.560,378.000 214.000 M26.000 214.448 C 24.466 215.058,22.868 216.777,22.359 218.366 C 22.106 219.155,21.607 220.157,21.249 220.593 C 20.635 221.343,20.640 221.355,21.330 220.819 C 21.962 220.329,22.110 220.329,22.424 220.826 C 22.713 221.282,22.790 221.236,22.800 220.600 C 22.808 220.079,22.918 219.967,23.117 220.279 C 23.308 220.580,23.632 220.628,23.989 220.407 C 24.319 220.203,24.849 220.212,25.254 220.429 C 25.698 220.666,26.042 220.656,26.199 220.401 C 26.336 220.180,26.313 220.000,26.149 220.000 C 25.985 220.000,26.319 219.505,26.892 218.900 C 27.826 217.914,28.201 216.479,28.041 214.500 C 27.993 213.913,27.384 213.898,26.000 214.448 M27.200 219.400 C 26.784 219.901,26.840 220.000,27.538 220.000 C 28.118 220.000,28.304 219.815,28.145 219.400 C 28.018 219.070,27.866 218.800,27.806 218.800 C 27.747 218.800,27.474 219.070,27.200 219.400 M138.431 226.236 C 136.827 227.585,136.827 229.011,138.431 232.400 C 139.845 235.385,140.109 235.294,141.600 231.309 C 142.668 228.454,142.610 227.551,141.278 226.275 C 139.907 224.961,139.945 224.961,138.431 226.236 M259.015 227.184 C 258.350 227.918,258.915 232.396,259.890 234.119 C 260.430 235.072,263.188 230.392,263.196 228.510 C 263.204 226.799,260.219 225.853,259.015 227.184 M140.776 227.371 C 141.141 227.811,141.138 228.314,140.761 229.571 C 140.157 231.587,139.851 231.611,139.081 229.700 C 138.256 227.652,139.542 225.884,140.776 227.371 M380.267 229.067 C 379.795 229.539,379.982 230.000,380.646 230.000 C 382.867 230.000,385.927 233.335,386.115 235.959 C 386.221 237.457,386.715 237.027,387.000 235.188 C 387.152 234.206,387.114 234.032,386.870 234.593 C 386.574 235.273,386.484 235.174,386.247 233.909 C 386.090 233.075,385.447 231.908,384.769 231.231 C 384.092 230.553,382.925 229.910,382.091 229.753 C 380.860 229.522,380.746 229.424,381.407 229.166 C 382.179 228.864,382.178 228.855,381.367 228.828 C 380.908 228.813,380.413 228.920,380.267 229.067 M385.075 230.754 C 385.694 231.389,386.276 231.838,386.368 231.753 C 386.601 231.537,384.744 229.600,384.305 229.600 C 384.110 229.600,384.456 230.119,385.075 230.754 M380.892 231.134 C 380.526 231.367,380.685 231.616,381.460 232.028 C 382.051 232.343,383.025 233.275,383.625 234.101 C 384.457 235.248,384.770 235.455,384.952 234.980 C 385.108 234.574,385.030 234.458,384.727 234.645 C 384.407 234.843,384.353 234.699,384.553 234.178 C 384.712 233.763,384.710 233.556,384.549 233.718 C 384.179 234.087,381.955 231.997,382.235 231.543 C 382.349 231.360,382.133 231.328,381.755 231.473 C 381.289 231.651,381.162 231.585,381.358 231.268 C 381.696 230.721,381.591 230.691,380.892 231.134 M14.847 237.852 C 13.094 239.080,12.359 242.018,13.240 244.274 L 13.679 245.400 14.838 243.000 C 15.475 241.680,16.582 240.077,17.298 239.438 L 18.600 238.276 17.266 239.080 C 16.532 239.522,15.589 240.405,15.169 241.042 C 14.749 241.679,14.405 242.020,14.405 241.800 C 14.405 241.205,15.754 239.271,16.632 238.606 C 17.054 238.287,17.189 238.020,16.931 238.013 C 16.073 237.989,14.091 240.355,13.684 241.888 C 13.396 242.973,13.271 243.135,13.241 242.460 C 13.184 241.152,14.309 238.930,15.505 237.989 C 16.711 237.040,16.167 236.927,14.847 237.852 M19.219 239.580 C 18.900 239.782,18.467 239.841,18.257 239.712 C 18.048 239.582,17.984 239.651,18.116 239.865 C 18.248 240.078,17.808 240.577,17.139 240.973 C 16.469 241.368,15.690 242.256,15.408 242.946 C 14.252 245.775,14.369 246.099,15.786 244.000 C 16.603 242.790,17.930 241.218,18.736 240.506 C 20.171 239.238,20.373 238.850,19.219 239.580 M18.142 242.100 C 16.459 243.900,14.724 246.482,15.857 245.499 C 16.301 245.114,16.800 244.934,16.966 245.099 C 17.131 245.265,17.207 245.190,17.133 244.934 C 17.060 244.678,17.684 243.643,18.520 242.634 C 20.255 240.540,19.973 240.141,18.142 242.100 M18.394 243.406 C 17.651 244.173,17.190 244.800,17.371 244.800 C 17.551 244.800,17.474 245.070,17.200 245.400 C 16.886 245.778,16.859 246.000,17.127 246.000 C 17.361 246.000,17.663 245.821,17.799 245.602 C 18.397 244.633,19.530 244.382,19.298 245.269 C 19.145 245.855,19.220 246.035,19.537 245.839 C 19.792 245.682,20.000 245.013,20.000 244.353 C 20.000 243.499,19.856 243.240,19.500 243.453 C 19.169 243.652,19.188 243.521,19.557 243.067 C 20.616 241.762,19.740 242.017,18.394 243.406 M80.086 243.999 C 69.875 247.593,64.687 253.639,62.970 263.946 C 59.714 283.490,80.279 304.171,110.400 311.641 C 120.677 314.190,124.274 313.450,128.671 307.881 C 129.923 306.297,131.613 304.370,132.428 303.600 C 133.261 302.813,134.093 301.535,134.328 300.681 C 134.989 298.280,136.615 295.831,138.940 293.736 C 140.737 292.116,141.132 291.509,141.362 290.017 C 141.513 289.037,142.173 287.295,142.830 286.148 L 144.024 284.061 141.712 283.811 C 131.277 282.686,128.409 281.386,126.000 276.692 C 124.547 273.861,123.853 272.957,122.400 272.008 C 118.940 269.747,117.679 266.454,116.628 256.926 C 115.914 250.457,116.404 251.083,111.889 250.879 L 108.200 250.712 104.200 248.014 C 96.442 242.781,87.688 241.323,80.086 243.999 M12.414 245.500 C 12.404 246.395,12.587 246.800,13.000 246.800 C 13.736 246.800,13.736 246.488,13.000 245.200 L 12.428 244.200 12.414 245.500 M311.200 245.187 C 305.051 246.319,301.214 247.881,295.606 251.539 C 292.469 253.585,291.415 254.012,285.523 255.616 C 284.172 255.984,284.028 256.162,283.833 257.709 C 281.924 272.819,281.515 273.962,277.537 275.288 C 276.130 275.757,275.808 276.094,275.176 277.760 C 273.654 281.770,267.789 284.000,258.768 284.000 C 258.572 284.000,258.798 284.945,259.271 286.100 C 259.743 287.255,260.419 289.010,260.772 290.000 C 261.181 291.149,262.151 292.489,263.455 293.706 C 264.792 294.955,265.880 296.473,266.609 298.106 C 267.221 299.478,268.576 301.539,269.619 302.687 C 270.663 303.834,272.120 305.989,272.858 307.475 C 274.358 310.494,274.449 310.558,280.191 312.649 L 284.182 314.102 288.191 313.626 C 296.102 312.686,299.241 311.563,314.600 304.176 C 316.580 303.224,319.753 301.309,321.651 299.922 C 323.549 298.535,326.733 296.230,328.727 294.800 C 335.612 289.862,340.400 280.475,340.400 271.913 C 340.400 258.441,334.039 250.027,320.649 245.787 C 315.694 244.218,316.268 244.255,311.200 245.187 M387.693 246.400 C 387.693 247.170,387.775 247.485,387.876 247.100 C 387.976 246.715,387.976 246.085,387.876 245.700 C 387.775 245.315,387.693 245.630,387.693 246.400 M12.554 249.377 C 12.432 249.694,12.403 250.279,12.489 250.677 C 12.587 251.128,12.724 250.912,12.854 250.100 C 13.071 248.738,12.930 248.396,12.554 249.377 M198.200 252.393 C 192.385 252.833,191.581 253.505,189.551 259.629 C 188.700 262.196,187.870 263.879,186.951 264.901 C 186.208 265.727,185.600 266.582,185.600 266.801 C 185.600 267.020,184.885 267.936,184.012 268.836 C 182.629 270.261,180.979 273.097,180.262 275.284 C 180.139 275.660,179.174 276.410,178.119 276.950 C 176.200 277.933,173.517 280.467,172.290 282.456 C 171.932 283.037,170.415 284.328,168.919 285.323 C 167.424 286.319,164.929 288.454,163.375 290.069 C 161.302 292.224,159.813 293.357,157.775 294.333 C 156.249 295.065,154.376 295.964,153.612 296.331 C 152.849 296.699,151.819 297.630,151.323 298.400 C 150.093 300.311,148.758 301.596,147.800 301.791 C 143.074 302.754,142.555 302.958,141.175 304.394 C 140.392 305.209,139.310 305.986,138.771 306.121 C 136.094 306.793,133.831 310.121,133.413 314.000 C 133.032 317.541,132.148 320.903,131.158 322.581 C 130.217 324.176,130.394 331.200,131.427 333.233 C 131.715 333.802,132.238 335.501,132.588 337.010 C 133.220 339.737,135.584 346.429,136.635 348.465 C 136.937 349.050,138.539 350.747,140.196 352.235 C 141.852 353.724,143.761 355.805,144.438 356.859 C 145.858 359.072,146.760 359.676,152.105 361.996 C 156.720 364.000,156.539 363.779,156.437 367.290 C 156.388 368.949,156.545 370.293,156.827 370.632 C 157.201 371.083,157.164 371.200,156.649 371.200 C 156.292 371.200,156.000 371.392,156.000 371.627 C 156.000 371.878,156.371 371.950,156.900 371.801 C 157.568 371.613,157.652 371.650,157.224 371.944 C 155.225 373.321,158.272 378.159,161.554 378.818 C 162.789 379.066,164.115 379.435,164.500 379.638 C 165.052 379.929,165.200 379.844,165.200 379.236 C 165.200 377.716,164.772 377.127,164.077 377.690 C 163.558 378.109,163.505 378.104,163.773 377.657 C 164.018 377.251,163.906 377.176,163.329 377.359 C 162.900 377.495,162.213 377.337,161.779 377.001 C 161.010 376.406,161.011 376.401,161.800 376.636 C 162.491 376.842,162.470 376.768,161.644 376.093 C 161.118 375.664,160.336 374.882,159.907 374.356 C 159.232 373.530,159.158 373.509,159.364 374.200 C 159.600 374.994,159.598 374.994,158.992 374.211 C 158.657 373.778,158.476 373.178,158.591 372.879 C 158.706 372.579,158.800 372.169,158.800 371.967 C 158.800 371.765,158.974 371.600,159.187 371.600 C 159.401 371.600,159.491 371.825,159.388 372.100 C 159.196 372.612,160.499 374.892,160.950 374.833 C 161.087 374.815,161.215 374.935,161.232 375.100 C 161.291 375.644,163.657 376.926,164.739 377.001 C 165.322 377.041,165.755 377.282,165.700 377.537 C 165.645 377.792,165.864 378.000,166.187 378.000 C 166.571 378.000,166.686 377.769,166.519 377.334 C 166.348 376.887,166.417 376.764,166.732 376.958 C 166.989 377.117,167.200 377.076,167.200 376.866 C 167.200 376.657,166.911 376.375,166.558 376.239 C 166.181 376.094,166.014 375.740,166.154 375.376 C 166.289 375.023,166.222 374.863,165.995 375.003 C 165.778 375.137,165.600 375.057,165.600 374.824 C 165.600 374.591,165.870 374.400,166.200 374.400 C 166.530 374.400,166.800 374.245,166.800 374.055 C 166.800 373.865,166.362 373.758,165.827 373.817 C 164.724 373.938,164.800 373.042,165.931 372.600 C 166.450 372.398,166.243 372.164,165.011 371.561 C 164.137 371.133,163.201 370.868,162.931 370.971 C 162.633 371.085,162.528 370.932,162.663 370.580 C 162.786 370.261,162.692 370.000,162.455 370.000 C 162.218 370.000,162.140 369.701,162.281 369.334 C 162.422 368.965,162.370 368.771,162.163 368.899 C 161.947 369.033,161.790 368.089,161.790 366.665 C 161.791 363.844,162.365 364.333,155.200 361.053 C 147.655 357.599,147.753 357.660,146.274 355.432 C 145.501 354.268,144.029 352.614,143.002 351.758 C 141.976 350.901,140.603 349.750,139.952 349.200 C 137.485 347.116,134.400 335.543,134.400 328.375 C 134.400 320.236,136.043 315.006,139.737 311.386 C 141.092 310.059,142.875 308.216,143.700 307.292 C 144.652 306.224,146.291 305.093,148.193 304.190 C 149.855 303.402,152.213 301.833,153.494 300.665 C 154.916 299.367,157.333 297.804,159.800 296.586 C 162.553 295.227,164.423 293.982,165.800 292.591 C 166.900 291.480,168.790 289.763,170.000 288.776 C 173.587 285.850,182.623 276.709,183.381 275.240 C 183.766 274.493,185.208 272.683,186.583 271.218 C 188.341 269.347,189.289 267.939,189.773 266.482 C 191.651 260.828,195.136 257.098,199.343 256.241 C 204.759 255.136,205.450 255.396,208.222 259.571 C 209.182 261.017,210.835 263.100,211.895 264.200 C 213.014 265.361,214.909 268.195,216.412 270.955 C 218.613 274.999,219.507 276.196,222.389 278.955 C 224.253 280.740,227.038 283.439,228.577 284.952 C 230.116 286.466,232.371 288.425,233.588 289.306 C 234.804 290.187,236.790 291.865,238.000 293.037 C 239.362 294.355,241.239 295.636,242.928 296.400 C 244.618 297.164,246.622 298.532,248.192 299.993 C 249.587 301.291,251.870 302.925,253.264 303.624 C 254.667 304.327,256.809 305.901,258.057 307.147 C 259.299 308.386,261.108 310.144,262.077 311.054 C 263.873 312.740,264.163 313.236,267.370 320.136 C 270.042 325.883,269.515 336.405,266.330 340.894 C 265.903 341.496,264.853 343.504,263.998 345.357 C 262.872 347.793,261.874 349.260,260.389 350.662 C 257.462 353.426,256.057 354.832,253.933 357.127 C 252.835 358.314,251.517 359.296,250.733 359.513 C 248.234 360.206,241.213 363.730,241.000 364.399 C 240.544 365.837,240.514 368.400,240.953 368.406 C 241.239 368.410,241.220 368.527,240.899 368.730 C 240.520 368.971,240.592 369.255,241.197 369.905 C 241.874 370.632,241.906 370.813,241.408 371.091 C 240.922 371.364,240.966 371.511,241.668 371.950 C 242.408 372.412,242.485 372.398,242.271 371.840 C 241.980 371.082,242.815 370.975,243.520 371.680 C 244.252 372.412,244.092 372.973,243.330 372.349 C 242.791 371.907,242.811 372.032,243.430 372.985 C 243.854 373.636,244.011 374.053,243.781 373.911 C 243.550 373.769,243.100 373.818,242.781 374.020 C 242.314 374.316,242.357 374.392,243.000 374.408 C 243.730 374.427,243.718 374.474,242.853 374.953 C 242.042 375.403,242.002 375.515,242.574 375.735 C 243.016 375.904,243.146 375.836,242.959 375.534 C 242.781 375.245,242.854 375.186,243.158 375.374 C 243.495 375.583,243.515 375.821,243.223 376.172 C 242.994 376.448,242.937 376.803,243.095 376.962 C 243.254 377.120,242.906 377.068,242.323 376.847 C 241.482 376.527,241.152 376.579,240.731 377.098 C 240.348 377.571,240.339 377.670,240.700 377.453 C 241.033 377.253,241.200 377.419,241.200 377.953 C 241.200 378.393,240.992 378.881,240.738 379.038 C 240.470 379.204,240.384 379.149,240.534 378.907 C 240.675 378.678,240.478 378.254,240.096 377.965 C 239.519 377.529,239.480 377.529,239.869 377.968 C 240.127 378.259,240.247 378.734,240.136 379.023 C 239.990 379.402,240.322 379.527,241.331 379.474 C 242.099 379.433,242.657 379.328,242.571 379.241 C 242.485 379.153,242.726 378.793,243.107 378.441 C 243.518 378.061,243.848 377.067,243.918 376.000 C 244.014 374.548,244.304 373.948,245.418 372.895 C 246.902 371.493,247.160 370.800,246.200 370.800 C 245.870 370.800,245.600 370.519,245.600 370.176 C 245.600 369.807,245.788 369.669,246.062 369.838 C 246.361 370.023,246.414 369.947,246.213 369.621 C 246.042 369.345,245.827 367.976,245.734 366.579 L 245.566 364.039 247.683 363.081 C 248.847 362.554,250.663 361.798,251.717 361.401 C 253.908 360.575,255.174 359.471,260.691 353.577 C 263.021 351.087,265.340 348.131,266.339 346.377 C 267.272 344.739,268.556 342.590,269.194 341.600 C 273.540 334.856,273.216 313.200,268.769 313.200 C 268.315 313.200,267.896 312.696,267.597 311.790 C 267.341 311.014,266.721 309.889,266.220 309.290 C 265.719 308.690,265.185 307.803,265.033 307.318 C 264.644 306.074,262.526 304.400,261.343 304.400 C 260.795 304.400,259.772 303.962,259.070 303.427 C 257.510 302.236,253.657 300.409,252.697 300.404 C 252.248 300.401,251.755 299.805,251.337 298.759 C 250.566 296.831,248.178 294.936,246.053 294.565 C 243.770 294.165,241.312 292.557,240.558 290.967 C 239.887 289.554,237.509 287.600,236.460 287.600 C 235.833 287.600,227.073 279.164,221.092 272.800 C 219.266 270.858,217.918 268.392,217.218 265.718 C 216.648 263.537,215.199 261.847,213.222 261.055 C 211.866 260.513,211.604 260.207,211.387 258.911 C 210.687 254.746,209.667 253.465,206.350 252.582 C 204.068 251.974,203.811 251.968,198.200 252.393 M314.116 269.099 C 316.017 270.132,316.199 270.372,317.074 272.988 L 318.007 275.776 317.176 278.388 C 316.204 281.446,315.104 283.989,314.751 283.995 C 314.615 283.998,313.100 284.945,311.386 286.100 C 309.673 287.255,307.444 288.716,306.435 289.347 C 305.426 289.977,304.050 290.976,303.378 291.566 C 300.131 294.416,295.039 293.756,293.143 290.240 C 291.213 286.662,290.968 284.101,292.395 282.417 C 293.055 281.638,294.271 280.030,295.098 278.845 C 297.494 275.408,299.106 273.734,301.739 271.950 C 303.092 271.032,304.901 269.656,305.758 268.890 C 307.690 267.163,310.692 267.238,314.116 269.099 M101.040 275.559 C 102.064 276.183,102.326 276.653,102.543 278.258 C 102.689 279.326,103.092 281.062,103.441 282.114 C 104.189 284.378,103.887 284.969,101.653 285.618 C 99.252 286.315,96.145 284.459,95.263 281.802 C 94.797 280.399,94.223 279.567,93.331 279.003 C 91.868 278.077,91.070 276.640,91.415 275.554 C 91.770 274.434,99.201 274.438,101.040 275.559 M12.400 278.267 C 12.400 279.439,12.471 279.424,13.160 278.100 C 13.548 277.354,13.523 277.200,13.014 277.200 C 12.615 277.200,12.400 277.574,12.400 278.267 M13.022 280.331 C 12.866 280.823,13.023 281.625,13.404 282.283 C 13.760 282.897,13.952 283.076,13.830 282.679 C 13.701 282.260,13.774 282.061,14.005 282.203 C 14.222 282.337,14.400 282.737,14.400 283.090 C 14.400 283.444,14.502 283.631,14.627 283.506 C 15.073 283.061,17.819 284.093,18.900 285.112 L 20.000 286.150 20.000 285.108 C 20.000 283.793,19.627 282.800,19.134 282.800 C 18.924 282.800,18.864 282.980,19.000 283.200 C 19.279 283.651,18.637 283.706,17.292 283.346 C 16.605 283.162,16.488 282.976,16.811 282.587 C 17.118 282.217,17.103 281.987,16.758 281.774 C 16.463 281.592,16.381 281.645,16.545 281.911 C 16.692 282.149,16.634 282.455,16.415 282.591 C 15.761 282.995,14.558 282.120,13.902 280.765 C 13.335 279.596,13.266 279.562,13.022 280.331 M386.800 286.976 C 386.800 287.293,386.980 287.664,387.200 287.800 C 387.420 287.936,387.600 287.677,387.600 287.224 C 387.600 286.771,387.420 286.400,387.200 286.400 C 386.980 286.400,386.800 286.659,386.800 286.976 M381.880 291.638 C 380.523 292.354,379.641 293.386,380.051 293.777 C 380.133 293.856,380.988 293.218,381.951 292.360 C 382.915 291.502,383.635 290.808,383.551 290.818 C 383.468 290.827,382.716 291.196,381.880 291.638 M382.175 294.500 L 381.000 295.800 382.300 294.625 C 383.015 293.979,383.600 293.394,383.600 293.325 C 383.600 293.016,383.270 293.288,382.175 294.500 M187.400 295.872 C 180.367 296.323,177.693 297.068,175.400 299.212 C 174.740 299.829,173.247 300.643,172.082 301.019 C 166.858 302.708,165.460 305.207,165.826 312.200 C 166.221 319.765,167.869 324.638,171.229 328.177 C 172.702 329.730,174.436 331.900,175.082 333.000 C 175.727 334.100,177.053 335.580,178.028 336.288 C 181.636 338.911,182.100 339.366,182.792 340.965 C 183.686 343.030,185.070 344.512,187.049 345.527 C 188.919 346.486,190.042 347.667,191.112 349.800 C 194.290 356.136,207.325 356.107,211.047 349.755 C 211.632 348.757,212.768 347.626,213.782 347.032 C 215.841 345.825,217.289 344.187,218.623 341.555 C 219.326 340.167,220.200 339.241,221.728 338.263 C 222.898 337.515,224.562 336.046,225.427 334.999 C 226.292 333.952,228.046 331.994,229.324 330.648 C 230.933 328.954,232.198 327.056,233.433 324.484 C 234.414 322.441,236.023 319.779,237.008 318.569 L 238.800 316.369 238.797 312.084 C 238.794 307.275,238.529 306.591,235.772 304.286 C 233.580 302.453,232.547 301.853,229.869 300.856 C 228.587 300.379,226.877 299.471,226.069 298.839 C 222.506 296.050,205.261 294.727,187.400 295.872 M217.539 297.756 C 219.155 298.096,221.315 298.850,222.339 299.431 C 223.362 300.013,225.441 300.916,226.958 301.440 C 233.259 303.615,236.193 306.425,236.574 310.651 C 236.710 312.163,236.894 313.976,236.982 314.680 C 237.108 315.678,236.842 316.337,235.773 317.680 C 235.020 318.626,233.841 320.750,233.153 322.400 C 232.465 324.050,231.536 325.940,231.089 326.600 C 229.736 328.597,222.221 336.316,219.671 338.328 C 218.745 339.058,217.635 340.318,217.204 341.128 C 216.163 343.085,214.953 344.381,212.762 345.889 C 211.765 346.575,210.264 347.972,209.426 348.994 C 206.545 352.511,205.449 352.961,200.513 352.659 C 195.535 352.355,194.584 351.884,192.279 348.585 C 191.472 347.430,189.864 345.853,188.706 345.080 C 186.271 343.455,184.910 342.068,183.473 339.747 C 182.910 338.838,181.405 337.301,180.129 336.331 C 178.853 335.361,177.267 333.794,176.605 332.850 C 175.942 331.905,174.132 329.752,172.583 328.066 C 169.577 324.795,169.288 324.256,168.040 319.600 C 165.381 309.682,167.284 303.788,173.718 302.014 C 174.774 301.724,176.658 300.871,177.907 300.119 C 183.029 297.034,207.258 295.590,217.539 297.756 M20.400 305.792 C 20.400 306.369,22.232 311.530,22.698 312.266 C 23.269 313.166,25.008 314.115,26.900 314.558 C 28.596 314.955,28.201 314.187,26.437 313.658 C 24.904 313.199,22.402 310.863,22.398 309.886 C 22.396 309.619,22.143 308.916,21.834 308.325 C 21.287 307.276,21.296 307.261,22.206 307.676 C 22.719 307.909,23.240 308.505,23.364 308.999 C 23.630 310.060,26.540 312.800,27.401 312.800 C 28.392 312.800,28.080 312.115,26.700 311.260 C 25.341 310.419,23.627 308.000,24.390 308.000 C 24.629 308.000,25.378 308.630,26.054 309.400 C 27.439 310.978,27.800 311.099,28.178 310.112 C 28.324 309.734,28.310 309.556,28.149 309.718 C 27.805 310.062,25.600 308.059,25.600 307.402 C 25.600 306.961,23.356 306.911,22.924 307.343 C 22.803 307.463,22.442 307.299,22.120 306.977 C 21.799 306.656,21.372 306.494,21.172 306.617 C 20.973 306.741,20.916 306.562,21.047 306.221 C 21.178 305.879,21.086 305.600,20.843 305.600 C 20.599 305.600,20.400 305.686,20.400 305.792 M26.650 307.083 C 26.524 307.209,26.517 307.466,26.634 307.656 C 26.915 308.110,28.000 308.100,28.000 307.643 C 28.000 307.201,26.962 306.771,26.650 307.083 M374.257 315.693 C 374.362 315.862,373.897 316.000,373.224 316.000 C 372.022 316.000,372.000 316.036,372.000 318.000 C 372.000 319.100,372.174 320.000,372.386 320.000 C 373.003 320.000,375.539 317.624,375.800 316.801 C 375.931 316.389,376.344 315.983,376.719 315.898 C 377.093 315.814,376.650 315.664,375.734 315.565 C 374.817 315.466,374.153 315.524,374.257 315.693 M82.969 365.168 C 83.622 365.849,84.129 366.862,84.187 367.600 C 84.242 368.296,84.697 369.255,85.198 369.732 C 85.700 370.210,85.985 370.375,85.831 370.100 C 85.678 369.825,85.719 369.600,85.922 369.600 C 86.125 369.600,85.866 368.759,85.346 367.732 C 84.826 366.705,84.400 365.445,84.400 364.932 C 84.400 364.151,84.194 364.000,83.125 364.000 L 81.850 364.000 82.969 365.168 M162.560 373.866 C 163.572 374.892,164.394 375.927,164.387 376.166 C 164.380 376.405,164.110 376.251,163.787 375.824 C 163.464 375.396,163.200 375.191,163.200 375.366 C 163.200 375.541,162.669 375.117,162.021 374.423 C 161.373 373.728,160.848 373.055,160.855 372.925 C 160.862 372.795,160.628 372.537,160.334 372.351 C 159.996 372.137,159.969 372.010,160.260 372.006 C 160.514 372.003,161.549 372.840,162.560 373.866 M240.545 373.000 C 240.418 373.330,240.143 373.600,239.934 373.600 C 239.724 373.600,239.688 373.375,239.853 373.100 C 240.057 372.760,239.937 372.776,239.477 373.149 C 238.770 373.722,238.540 374.208,239.155 373.828 C 239.350 373.708,239.606 373.978,239.723 374.429 C 239.854 374.929,239.716 375.334,239.369 375.467 C 238.778 375.694,238.564 376.800,239.111 376.800 C 239.655 376.800,240.988 375.022,240.865 374.460 C 240.791 374.124,240.931 374.034,241.235 374.222 C 241.547 374.415,241.621 374.357,241.438 374.062 C 241.281 373.808,241.338 373.600,241.564 373.600 C 241.790 373.600,241.871 373.330,241.745 373.000 C 241.618 372.670,241.348 372.400,241.145 372.400 C 240.941 372.400,240.671 372.670,240.545 373.000 M240.823 373.773 C 240.552 374.098,240.463 374.598,240.624 374.882 C 240.846 375.274,240.798 375.290,240.426 374.947 C 240.038 374.589,240.043 374.320,240.452 373.665 C 240.737 373.209,241.047 372.914,241.142 373.009 C 241.237 373.103,241.093 373.447,240.823 373.773 M159.764 376.360 C 160.312 376.966,160.345 377.182,159.926 377.424 C 159.637 377.592,159.533 377.581,159.697 377.401 C 160.102 376.953,159.211 375.946,158.693 376.266 C 158.451 376.416,158.396 376.330,158.562 376.062 C 158.933 375.461,158.956 375.467,159.764 376.360 M242.710 377.830 C 242.770 377.861,242.510 378.137,242.133 378.443 C 241.635 378.847,241.532 378.858,241.758 378.482 C 241.931 378.194,241.832 377.663,241.534 377.282 C 241.043 376.655,241.065 376.648,241.800 377.187 C 242.240 377.510,242.649 377.799,242.710 377.830 M238.719 378.911 C 238.575 379.665,238.678 380.000,239.055 380.000 C 239.659 380.000,239.689 379.772,239.235 378.611 C 238.959 377.903,238.906 377.934,238.719 378.911 M168.751 378.761 C 169.054 378.953,169.179 379.311,169.028 379.555 C 168.870 379.811,169.024 380.000,169.390 380.000 C 169.904 380.000,169.945 379.844,169.600 379.200 C 169.365 378.760,168.953 378.403,168.686 378.406 C 168.353 378.410,168.374 378.522,168.751 378.761 M166.631 379.650 C 166.750 379.843,167.197 380.000,167.624 380.000 C 168.051 380.000,168.400 379.843,168.400 379.650 C 168.400 379.457,167.953 379.300,167.407 379.300 C 166.861 379.300,166.512 379.457,166.631 379.650 M183.850 379.483 C 183.800 379.533,180.911 379.601,177.430 379.633 C 173.949 379.665,171.293 379.810,171.528 379.955 C 171.763 380.101,172.163 381.115,172.417 382.210 C 173.331 386.141,173.904 386.702,177.946 387.613 C 180.142 388.109,181.370 387.610,180.383 386.623 C 180.173 386.413,180.011 385.961,180.025 385.620 C 180.040 385.263,180.236 385.425,180.488 386.000 C 180.728 386.550,180.897 387.135,180.862 387.300 C 180.828 387.465,181.351 387.600,182.024 387.600 C 182.751 387.600,183.145 387.435,182.996 387.193 C 182.858 386.970,182.532 386.906,182.272 387.052 C 181.979 387.217,181.996 387.107,182.317 386.762 C 182.753 386.293,182.886 386.292,183.172 386.755 C 183.380 387.092,183.720 387.176,184.055 386.974 C 184.510 386.701,184.509 386.759,184.051 387.323 C 183.548 387.944,183.689 388.000,185.751 388.000 C 187.035 388.000,188.000 387.822,188.000 387.586 C 188.000 387.300,188.240 387.300,188.774 387.586 C 189.199 387.814,190.144 387.975,190.874 387.946 C 191.908 387.903,191.990 387.851,191.244 387.710 L 190.288 387.530 191.244 387.029 C 191.871 386.701,192.452 386.655,192.931 386.895 C 193.333 387.097,193.938 387.156,194.276 387.026 C 194.705 386.861,194.820 386.972,194.657 387.395 C 194.456 387.920,195.301 388.000,201.028 388.000 C 206.613 388.000,207.552 387.915,207.118 387.450 C 206.835 387.148,206.349 386.998,206.036 387.118 C 205.644 387.269,205.570 387.173,205.796 386.806 C 206.016 386.451,205.969 386.372,205.655 386.566 C 205.398 386.725,205.262 386.978,205.354 387.128 C 205.598 387.527,195.894 387.461,195.273 387.060 C 194.983 386.872,194.846 386.458,194.968 386.139 C 195.091 385.820,195.022 385.663,194.815 385.790 C 194.609 385.918,194.242 385.652,194.000 385.200 C 193.741 384.715,193.363 384.496,193.080 384.666 C 192.788 384.841,192.813 384.691,193.145 384.281 C 193.445 383.911,193.895 383.710,194.145 383.834 C 194.395 383.958,194.299 383.811,193.931 383.508 C 193.305 382.993,193.305 382.926,193.931 382.485 C 194.421 382.139,194.446 382.038,194.024 382.106 C 193.707 382.158,193.375 381.864,193.285 381.453 C 193.196 381.042,193.290 380.809,193.495 380.935 C 193.699 381.061,193.867 380.918,193.867 380.616 C 193.867 379.968,184.432 378.901,183.850 379.483 M218.257 379.476 C 218.215 379.518,216.924 379.615,215.388 379.692 C 213.852 379.769,212.416 379.926,212.197 380.041 C 211.979 380.156,211.410 380.219,210.934 380.181 C 210.309 380.132,210.133 380.282,210.302 380.722 C 210.455 381.120,210.374 381.231,210.068 381.042 C 209.811 380.883,209.600 380.943,209.600 381.176 C 209.600 381.409,209.465 381.555,209.300 381.500 C 209.135 381.445,209.000 381.580,209.000 381.800 C 209.000 382.020,209.135 382.155,209.300 382.100 C 209.465 382.045,209.600 382.281,209.600 382.624 C 209.600 382.967,209.432 383.144,209.228 383.017 C 209.023 382.891,208.742 382.970,208.604 383.193 C 208.466 383.417,208.644 383.600,209.000 383.600 C 209.356 383.600,209.549 383.760,209.428 383.955 C 209.149 384.407,210.325 385.408,210.698 385.035 C 210.851 384.882,210.738 384.609,210.446 384.428 C 210.154 384.248,210.081 383.997,210.284 383.872 C 210.487 383.746,210.934 384.264,211.278 385.022 C 211.621 385.780,211.759 386.400,211.585 386.400 C 211.410 386.400,211.191 386.175,211.098 385.900 C 210.965 385.504,210.806 385.502,210.334 385.892 C 209.481 386.595,207.901 386.775,207.200 386.250 C 206.679 385.859,206.672 385.892,207.146 386.496 C 207.679 387.176,210.551 387.372,210.137 386.700 C 210.036 386.535,210.113 386.400,210.310 386.400 C 210.506 386.400,210.802 386.535,210.967 386.700 C 211.323 387.057,211.449 387.077,213.900 387.178 C 215.356 387.238,215.613 387.337,215.000 387.600 C 214.353 387.878,214.467 387.943,215.600 387.940 C 216.370 387.938,216.775 387.846,216.500 387.735 C 215.511 387.336,216.028 386.883,217.398 386.948 C 218.166 386.984,218.872 386.831,218.966 386.607 C 219.060 386.383,219.151 386.518,219.168 386.908 C 219.193 387.467,218.990 387.563,218.200 387.364 C 217.542 387.199,217.200 387.280,217.200 387.602 C 217.200 387.961,217.704 388.010,219.100 387.786 C 220.145 387.618,221.389 387.505,221.864 387.533 C 222.722 387.585,222.867 387.064,222.265 386.100 C 222.053 385.760,222.220 385.600,222.790 385.600 C 223.474 385.600,223.557 385.733,223.242 386.322 C 222.559 387.598,223.299 388.161,224.945 387.618 C 225.736 387.357,226.549 387.245,226.750 387.369 C 227.054 387.557,227.600 386.784,227.600 386.167 C 227.600 385.768,226.451 386.046,226.307 386.480 C 226.208 386.775,226.043 386.690,225.878 386.259 C 225.697 385.789,225.759 385.651,226.066 385.841 C 226.335 386.007,226.415 385.947,226.260 385.697 C 225.968 385.225,226.720 385.248,227.500 385.735 C 227.814 385.931,228.000 385.831,228.000 385.467 C 228.000 385.148,228.427 384.780,228.949 384.649 C 230.169 384.342,232.800 381.439,232.800 380.399 C 232.800 379.195,232.297 379.438,231.340 381.103 C 230.401 382.736,228.221 384.280,227.804 383.606 C 227.666 383.383,227.356 383.200,227.114 383.200 C 226.873 383.200,226.986 383.542,227.364 383.960 C 227.769 384.407,227.891 384.820,227.660 384.963 C 227.445 385.096,227.192 384.979,227.099 384.702 C 226.964 384.302,226.808 384.301,226.328 384.697 C 225.997 384.970,225.616 385.083,225.481 384.947 C 225.346 384.812,225.320 385.170,225.424 385.743 L 225.613 386.784 224.706 385.892 C 224.160 385.354,223.986 384.951,224.269 384.877 C 225.279 384.611,227.291 380.089,226.458 379.960 C 225.740 379.848,218.322 379.411,218.257 379.476 M234.011 380.571 C 233.785 381.165,233.600 381.814,233.600 382.012 C 233.600 382.872,231.001 385.227,229.584 385.652 C 228.736 385.906,227.960 386.327,227.860 386.588 C 227.548 387.400,231.698 385.819,232.845 384.688 C 233.420 384.121,234.103 382.813,234.363 381.780 C 234.888 379.695,234.652 378.884,234.011 380.571 M229.004 381.196 C 228.374 381.854,227.982 382.515,228.133 382.667 C 228.426 382.959,230.800 380.875,230.800 380.325 C 230.800 379.693,230.136 380.015,229.004 381.196 M174.600 380.836 C 175.346 381.191,175.339 381.205,174.500 381.046 C 174.005 380.952,173.600 381.049,173.600 381.261 C 173.600 381.473,173.417 381.534,173.193 381.396 C 172.121 380.733,173.352 380.243,174.600 380.836 M174.117 382.395 C 173.811 383.567,176.500 386.169,177.705 385.865 C 178.570 385.647,178.574 385.659,177.824 386.220 C 177.267 386.636,176.968 386.672,176.768 386.349 C 176.614 386.099,176.263 386.037,175.983 386.211 C 175.686 386.394,175.576 386.362,175.718 386.133 C 175.969 385.727,174.414 384.148,173.914 384.302 C 173.757 384.351,173.732 384.123,173.857 383.795 C 173.983 383.468,173.880 383.200,173.629 383.200 C 173.296 383.200,173.288 382.983,173.600 382.400 C 174.147 381.378,174.384 381.375,174.117 382.395 M208.222 384.364 C 207.860 384.949,208.404 385.929,209.039 385.835 C 209.748 385.731,209.800 385.007,209.100 384.982 C 208.825 384.972,208.645 384.747,208.700 384.482 C 208.818 383.914,208.543 383.846,208.222 384.364 M179.257 386.903 C 179.035 387.125,178.785 387.099,178.622 386.835 C 178.474 386.596,178.527 386.400,178.739 386.400 C 178.951 386.400,179.047 385.995,178.951 385.500 C 178.789 384.658,178.805 384.662,179.201 385.568 C 179.458 386.155,179.480 386.680,179.257 386.903 M193.920 385.680 C 194.585 386.345,194.521 386.821,193.802 386.546 C 193.474 386.419,193.323 386.124,193.468 385.890 C 193.635 385.620,193.479 385.561,193.045 385.727 C 192.637 385.884,192.458 385.830,192.603 385.595 C 192.927 385.070,193.337 385.097,193.920 385.680 M221.273 386.887 C 220.909 387.251,220.685 387.236,220.300 386.821 C 219.892 386.381,219.929 386.328,220.500 386.529 C 220.900 386.669,221.200 386.580,221.200 386.321 C 221.200 386.071,221.323 385.990,221.473 386.140 C 221.624 386.290,221.534 386.626,221.273 386.887 M186.400 387.285 C 186.400 387.727,185.296 387.679,185.015 387.224 C 184.887 387.018,185.147 386.876,185.591 386.909 C 186.036 386.943,186.400 387.112,186.400 387.285 M211.105 387.883 C 211.602 387.979,212.322 387.975,212.705 387.875 C 213.087 387.775,212.680 387.696,211.800 387.701 C 210.920 387.705,210.607 387.787,211.105 387.883 ",
        stroke: "none",
        fill: "#9d6c45",
        fillRule: "evenodd"
      }
    ), /* @__PURE__ */ import_react35.default.createElement(
      "path",
      {
        id: "path3",
        d: "M273.900 36.282 C 274.395 36.378,275.205 36.378,275.700 36.282 C 276.195 36.187,275.790 36.109,274.800 36.109 C 273.810 36.109,273.405 36.187,273.900 36.282 M331.900 36.282 C 332.395 36.378,333.205 36.378,333.700 36.282 C 334.195 36.187,333.790 36.109,332.800 36.109 C 331.810 36.109,331.405 36.187,331.900 36.282 M63.302 36.847 C 61.517 37.363,60.753 38.721,60.581 41.686 L 60.435 44.200 60.775 42.096 C 61.354 38.501,62.548 37.329,66.172 36.797 L 68.200 36.500 66.400 36.486 C 65.410 36.478,64.016 36.641,63.302 36.847 M131.484 37.084 C 131.937 37.537,132.949 38.119,133.734 38.378 C 135.449 38.944,137.422 41.078,137.793 42.770 C 138.255 44.871,139.156 44.318,138.757 42.179 C 138.196 39.180,136.873 37.829,133.921 37.241 C 132.974 37.053,131.854 36.755,131.431 36.580 C 130.713 36.283,130.717 36.317,131.484 37.084 M269.029 37.029 C 268.683 37.374,268.411 37.959,268.425 38.329 C 268.443 38.804,268.557 38.735,268.816 38.091 C 269.017 37.590,269.590 37.017,270.091 36.816 C 270.735 36.557,270.804 36.443,270.329 36.425 C 269.959 36.411,269.374 36.683,269.029 37.029 M337.675 36.857 C 338.267 37.073,338.927 37.733,339.143 38.325 C 339.477 39.236,339.542 39.273,339.568 38.562 C 339.607 37.541,338.416 36.389,337.369 36.432 C 336.790 36.455,336.865 36.560,337.675 36.857 M268.101 42.600 C 268.105 43.480,268.187 43.793,268.283 43.295 C 268.379 42.798,268.375 42.078,268.275 41.695 C 268.175 41.313,268.096 41.720,268.101 42.600 M339.693 42.800 C 339.693 43.570,339.775 43.885,339.876 43.500 C 339.976 43.115,339.976 42.485,339.876 42.100 C 339.775 41.715,339.693 42.030,339.693 42.800 M55.700 44.276 C 56.085 44.376,56.715 44.376,57.100 44.276 C 57.485 44.175,57.170 44.093,56.400 44.093 C 55.630 44.093,55.315 44.175,55.700 44.276 M143.105 44.283 C 143.602 44.379,144.322 44.375,144.705 44.275 C 145.087 44.175,144.680 44.096,143.800 44.101 C 142.920 44.105,142.607 44.187,143.105 44.283 M258.705 44.283 C 259.202 44.379,259.922 44.375,260.305 44.275 C 260.687 44.175,260.280 44.096,259.400 44.101 C 258.520 44.105,258.207 44.187,258.705 44.283 M253.200 45.200 C 252.760 45.640,252.425 46.405,252.454 46.900 C 252.508 47.780,252.513 47.781,252.677 46.942 C 252.874 45.933,253.875 44.962,255.000 44.688 C 255.724 44.511,255.715 44.488,254.900 44.446 C 254.405 44.421,253.640 44.760,253.200 45.200 M349.903 45.224 C 352.802 45.795,354.205 47.198,354.776 50.097 C 355.112 51.798,355.112 51.798,355.156 50.400 C 355.251 47.293,352.707 44.749,349.600 44.844 C 348.202 44.888,348.202 44.888,349.903 45.224 M52.093 48.400 C 52.093 49.170,52.175 49.485,52.276 49.100 C 52.376 48.715,52.376 48.085,52.276 47.700 C 52.175 47.315,52.093 47.630,52.093 48.400 M46.900 52.276 C 47.285 52.376,47.915 52.376,48.300 52.276 C 48.685 52.175,48.370 52.093,47.600 52.093 C 46.830 52.093,46.515 52.175,46.900 52.276 M155.822 52.835 C 155.946 53.036,156.857 53.404,157.846 53.653 C 160.167 54.238,161.765 55.862,162.395 58.278 C 162.671 59.335,162.982 59.970,163.086 59.689 C 163.429 58.758,162.355 55.297,161.462 54.458 C 160.587 53.636,155.393 52.141,155.822 52.835 M44.093 55.600 C 44.093 56.370,44.175 56.685,44.276 56.300 C 44.376 55.915,44.376 55.285,44.276 54.900 C 44.175 54.515,44.093 54.830,44.093 55.600 M104.600 57.490 C 96.983 57.734,86.074 59.148,85.063 60.023 C 83.723 61.181,89.498 62.140,99.600 62.437 C 105.210 62.601,113.163 62.931,117.273 63.168 C 126.263 63.688,127.600 63.339,127.600 60.470 C 127.600 58.469,116.979 57.093,104.600 57.490 M285.600 57.586 C 275.897 58.291,273.829 59.007,274.117 61.559 C 274.370 63.807,275.128 64.419,277.114 63.980 C 279.631 63.423,291.949 62.800,300.485 62.798 C 308.503 62.797,314.534 62.198,316.356 61.223 C 317.465 60.630,317.434 59.660,316.300 59.442 C 307.669 57.777,306.162 57.612,298.200 57.450 C 293.580 57.357,287.910 57.418,285.600 57.586 M358.705 60.283 C 359.202 60.379,359.922 60.375,360.305 60.275 C 360.687 60.175,360.280 60.096,359.400 60.101 C 358.520 60.105,358.207 60.187,358.705 60.283 M38.401 62.598 C 37.076 64.009,37.561 64.154,38.925 62.754 C 39.544 62.119,39.890 61.600,39.695 61.600 C 39.499 61.600,38.917 62.049,38.401 62.598 M363.701 64.600 C 363.705 65.480,363.787 65.793,363.883 65.295 C 363.979 64.798,363.975 64.078,363.875 63.695 C 363.775 63.313,363.696 63.720,363.701 64.600 M130.000 65.600 C 128.158 67.442,129.817 69.296,134.305 70.410 C 136.479 70.950,138.616 72.821,139.228 74.720 C 140.449 78.510,141.381 77.231,141.253 71.941 C 141.138 67.199,141.039 67.041,137.944 66.630 C 136.821 66.481,134.979 66.009,133.851 65.580 C 131.295 64.608,130.990 64.610,130.000 65.600 M264.800 66.317 C 262.543 67.636,262.174 68.018,262.000 69.208 C 261.875 70.064,261.487 70.735,260.965 70.994 C 260.506 71.222,259.279 72.454,258.239 73.731 C 256.140 76.308,256.160 76.492,258.705 78.065 L 260.120 78.939 261.199 77.732 C 261.800 77.059,262.392 75.810,262.535 74.914 C 262.859 72.889,263.313 72.521,266.019 72.086 C 268.336 71.715,273.600 68.470,273.600 67.413 C 273.600 64.591,268.780 63.990,264.800 66.317 M369.592 76.914 C 370.138 77.190,370.810 77.862,371.086 78.408 C 371.456 79.138,371.590 79.215,371.594 78.700 C 371.597 78.315,371.240 77.640,370.800 77.200 C 370.360 76.760,369.685 76.403,369.300 76.406 C 368.785 76.410,368.862 76.544,369.592 76.914 M371.709 83.600 C 371.709 84.590,371.787 84.995,371.882 84.500 C 371.978 84.005,371.978 83.195,371.882 82.700 C 371.787 82.205,371.709 82.610,371.709 83.600 M28.140 95.200 C 28.140 97.070,28.209 97.835,28.293 96.900 C 28.377 95.965,28.377 94.435,28.293 93.500 C 28.209 92.565,28.140 93.330,28.140 95.200 M28.146 115.000 C 28.147 117.200,28.214 118.049,28.295 116.887 C 28.376 115.724,28.376 113.924,28.293 112.887 C 28.211 111.849,28.145 112.800,28.146 115.000 M28.434 122.076 C 28.415 122.668,28.558 123.250,28.751 123.370 C 28.944 123.489,29.311 124.416,29.566 125.430 C 30.357 128.573,31.624 129.790,34.900 130.558 C 36.596 130.955,36.201 130.187,34.437 129.658 C 32.904 129.199,30.402 126.863,30.398 125.886 C 30.396 125.619,30.105 124.860,29.751 124.200 C 29.397 123.540,28.964 122.550,28.788 122.000 L 28.469 121.000 28.434 122.076 M371.724 127.800 C 371.726 129.120,371.801 129.612,371.890 128.893 C 371.979 128.174,371.977 127.094,371.886 126.493 C 371.795 125.892,371.722 126.480,371.724 127.800 M370.918 134.046 C 370.321 137.190,369.362 138.202,366.245 138.979 L 363.800 139.588 366.200 139.354 C 370.127 138.970,370.979 138.113,371.425 134.100 C 371.780 130.911,371.519 130.883,370.918 134.046 M36.101 143.800 C 36.105 144.680,36.187 144.993,36.283 144.495 C 36.379 143.998,36.375 143.278,36.275 142.895 C 36.175 142.513,36.096 142.920,36.101 143.800 M363.693 148.000 C 363.693 148.770,363.775 149.085,363.876 148.700 C 363.976 148.315,363.976 147.685,363.876 147.300 C 363.775 146.915,363.693 147.230,363.693 148.000 M39.505 147.883 C 40.002 147.979,40.722 147.975,41.105 147.875 C 41.487 147.775,41.080 147.696,40.200 147.701 C 39.320 147.705,39.007 147.787,39.505 147.883 M363.200 152.524 C 363.200 153.880,362.343 154.825,360.780 155.193 L 359.400 155.518 360.700 155.559 C 362.342 155.611,363.600 154.414,363.600 152.800 C 363.600 152.140,363.510 151.600,363.400 151.600 C 363.290 151.600,363.200 152.016,363.200 152.524 M44.114 160.600 C 44.117 161.700,44.195 162.103,44.287 161.495 C 44.379 160.886,44.377 159.986,44.282 159.495 C 44.187 159.003,44.111 159.500,44.114 160.600 M44.691 165.107 C 45.102 169.163,47.353 171.419,50.684 171.109 L 52.200 170.969 50.278 170.431 C 47.747 169.724,46.209 168.137,45.603 165.611 C 44.973 162.987,44.448 162.697,44.691 165.107 M355.200 167.956 C 355.200 169.582,354.020 170.850,352.175 171.205 L 350.600 171.508 352.118 171.554 C 354.140 171.615,355.600 170.217,355.600 168.218 C 355.600 167.438,355.510 166.800,355.400 166.800 C 355.290 166.800,355.200 167.320,355.200 167.956 M67.267 170.219 C 67.230 170.539,67.170 171.067,67.133 171.394 C 67.086 171.818,66.926 171.870,66.572 171.577 C 66.194 171.263,66.102 171.475,66.182 172.483 C 66.240 173.207,66.090 174.070,65.850 174.400 C 65.610 174.730,65.825 174.649,66.328 174.219 L 67.242 173.438 66.821 174.545 C 66.290 175.941,66.278 176.808,66.800 176.000 C 67.071 175.580,67.190 175.554,67.194 175.913 C 67.197 176.194,66.905 176.538,66.544 176.677 C 65.938 176.909,65.939 176.966,66.556 177.417 C 67.141 177.845,67.148 177.934,66.612 178.140 C 66.275 178.269,66.000 178.571,66.000 178.811 C 66.000 179.051,66.180 179.136,66.400 179.000 C 66.628 178.859,66.800 179.205,66.800 179.804 C 66.800 181.802,68.354 180.908,69.411 178.301 C 70.268 176.189,70.283 176.034,69.598 176.401 C 68.417 177.033,68.407 176.934,69.397 174.408 L 70.335 172.015 68.834 170.827 C 67.748 169.967,67.315 169.799,67.267 170.219 M351.200 173.269 C 353.066 173.797,354.256 174.969,354.729 176.742 C 355.073 178.033,355.122 178.076,355.159 177.119 C 355.252 174.677,353.352 172.758,350.920 172.836 C 349.857 172.870,349.871 172.892,351.200 173.269 M45.722 180.804 C 44.804 181.174,44.154 183.253,44.517 184.660 C 44.631 185.104,44.726 184.898,44.754 184.144 C 44.818 182.403,45.963 181.154,47.825 180.795 L 49.400 180.492 48.000 180.471 C 47.230 180.460,46.205 180.610,45.722 180.804 M355.709 183.200 C 355.709 184.190,355.787 184.595,355.882 184.100 C 355.978 183.605,355.978 182.795,355.882 182.300 C 355.787 181.805,355.709 182.210,355.709 183.200 M359.731 188.788 C 360.573 188.951,361.634 189.456,362.089 189.911 C 362.544 190.366,363.049 191.427,363.212 192.269 L 363.508 193.800 363.554 192.082 C 363.618 189.687,362.313 188.382,359.918 188.446 L 358.200 188.492 359.731 188.788 M41.780 190.563 C 40.244 191.232,38.546 193.224,38.211 194.750 C 38.061 195.432,37.631 196.003,37.177 196.122 C 36.750 196.234,36.400 196.532,36.400 196.785 C 36.400 197.083,36.713 197.026,37.289 196.623 C 37.778 196.280,38.543 195.993,38.989 195.985 C 39.456 195.976,40.141 195.427,40.605 194.690 C 41.048 193.986,41.986 193.048,42.690 192.605 C 45.066 191.110,44.328 189.453,41.780 190.563 M36.000 198.800 C 36.000 199.460,36.149 200.000,36.331 200.000 C 36.513 200.000,36.582 199.460,36.485 198.800 C 36.388 198.140,36.240 197.600,36.155 197.600 C 36.070 197.600,36.000 198.140,36.000 198.800 M33.905 204.283 C 34.402 204.379,35.122 204.375,35.505 204.275 C 35.887 204.175,35.480 204.096,34.600 204.101 C 33.720 204.105,33.407 204.187,33.905 204.283 M368.305 204.283 C 368.802 204.379,369.522 204.375,369.905 204.275 C 370.287 204.175,369.880 204.096,369.000 204.101 C 368.120 204.105,367.807 204.187,368.305 204.283 M29.029 205.029 C 28.683 205.374,28.410 206.229,28.423 206.929 L 28.445 208.200 28.923 206.800 C 29.283 205.743,29.743 205.283,30.800 204.923 L 32.200 204.445 30.929 204.423 C 30.229 204.410,29.374 204.683,29.029 205.029 M371.701 207.000 C 371.705 207.880,371.787 208.193,371.883 207.695 C 371.979 207.198,371.975 206.478,371.875 206.095 C 371.775 205.713,371.696 206.120,371.701 207.000 M28.109 210.800 C 28.109 211.790,28.187 212.195,28.282 211.700 C 28.378 211.205,28.378 210.395,28.282 209.900 C 28.187 209.405,28.109 209.810,28.109 210.800 M43.400 210.000 C 43.264 210.220,43.253 210.400,43.376 210.400 C 43.499 210.400,43.285 210.725,42.900 211.122 C 42.515 211.519,42.090 211.684,41.956 211.488 C 41.821 211.293,41.613 211.388,41.494 211.700 C 41.374 212.012,41.529 212.297,41.838 212.333 C 42.147 212.370,42.662 212.430,42.982 212.467 C 43.303 212.503,43.480 212.671,43.376 212.839 C 43.033 213.394,44.024 213.678,44.609 213.192 C 45.033 212.841,45.077 212.517,44.778 211.958 C 44.477 211.397,44.506 211.197,44.886 211.188 C 45.187 211.181,45.106 211.005,44.692 210.763 C 44.302 210.536,44.088 210.182,44.215 209.975 C 44.343 209.769,44.267 209.600,44.047 209.600 C 43.827 209.600,43.536 209.780,43.400 210.000 M376.526 212.807 C 378.098 213.279,378.746 213.903,379.166 215.350 L 379.528 216.600 379.564 215.300 C 379.611 213.589,378.412 212.389,376.700 212.434 L 375.400 212.469 376.526 212.807 M25.888 213.684 C 23.857 214.223,22.204 215.968,21.653 218.154 C 21.404 219.143,21.020 220.064,20.800 220.200 C 20.580 220.336,20.400 220.731,20.400 221.078 C 20.400 222.041,21.787 220.095,22.366 218.320 C 22.940 216.559,25.056 214.583,26.770 214.207 C 27.447 214.058,28.000 213.771,28.000 213.568 C 28.000 213.142,27.910 213.147,25.888 213.684 M138.541 214.682 C 136.671 215.310,134.326 217.402,133.345 219.319 C 132.984 220.023,132.239 221.050,131.690 221.600 C 129.976 223.317,128.896 225.292,128.000 228.350 C 127.130 231.320,126.638 232.005,123.825 234.150 C 120.897 236.384,119.770 241.448,120.390 249.591 C 121.154 259.618,121.769 261.721,125.400 266.717 C 127.181 269.167,128.904 272.283,130.130 275.269 C 131.141 277.731,137.908 280.301,142.000 279.777 C 149.434 278.825,150.136 278.380,153.038 272.795 C 154.722 269.555,155.776 268.039,157.157 266.875 C 160.878 263.737,161.958 259.557,161.983 248.200 C 162.004 238.126,160.615 231.305,157.989 228.591 C 157.346 227.926,156.279 226.266,155.618 224.901 C 152.441 218.344,143.526 213.009,138.541 214.682 M256.075 215.613 C 254.574 216.371,253.216 217.397,252.726 218.144 C 252.273 218.835,250.813 220.120,249.482 221.000 C 246.531 222.951,245.352 225.018,244.372 229.958 C 243.996 231.851,243.137 234.931,242.463 236.802 C 239.643 244.631,239.983 256.282,243.162 260.747 C 244.061 262.009,244.880 264.050,245.756 267.208 C 246.577 270.167,248.522 273.003,250.543 274.188 C 251.455 274.723,252.913 275.890,253.784 276.783 C 256.616 279.685,261.649 280.618,267.828 279.386 C 268.976 279.157,271.496 276.624,272.162 275.029 C 272.687 273.773,275.032 271.600,275.863 271.600 C 276.341 271.600,278.158 269.684,278.708 268.600 C 280.668 264.733,282.012 239.147,280.532 233.872 C 278.461 226.490,270.455 226.928,270.409 234.425 C 270.391 237.268,267.216 238.727,260.914 238.788 C 256.183 238.833,253.176 226.110,257.320 223.583 C 258.767 222.701,264.278 222.477,266.791 223.197 C 267.814 223.491,268.297 223.465,268.636 223.097 C 272.962 218.411,262.675 212.281,256.075 215.613 M379.709 220.400 C 379.709 221.390,379.787 221.795,379.882 221.300 C 379.978 220.805,379.978 219.995,379.882 219.500 C 379.787 219.005,379.709 219.410,379.709 220.400 M20.072 224.500 C 20.004 226.688,20.439 227.518,20.953 226.179 C 21.084 225.838,21.023 225.662,20.818 225.789 C 20.613 225.916,20.377 225.160,20.294 224.110 C 20.145 222.209,20.144 222.211,20.072 224.500 M142.182 222.967 C 145.022 224.154,145.707 227.528,144.257 233.200 C 142.932 238.385,140.543 239.592,136.200 237.269 L 134.200 236.200 134.100 230.600 C 133.991 224.479,134.293 223.233,136.003 222.757 C 137.734 222.276,140.775 222.379,142.182 222.967 M34.800 223.986 C 34.800 224.214,35.010 224.400,35.267 224.400 C 35.523 224.400,35.618 224.516,35.476 224.657 C 35.335 224.798,34.961 224.700,34.645 224.438 C 34.254 224.113,33.989 224.095,33.812 224.381 C 33.669 224.611,33.698 224.806,33.876 224.814 C 34.054 224.822,33.753 225.076,33.207 225.378 C 32.587 225.721,31.973 225.799,31.573 225.586 C 31.124 225.345,30.933 225.415,30.933 225.822 C 30.933 226.165,31.353 226.419,31.967 226.446 C 32.787 226.483,32.835 226.531,32.200 226.680 C 30.908 226.983,30.325 227.982,31.031 228.688 C 31.355 229.012,31.873 229.181,32.181 229.063 C 32.489 228.944,32.980 229.152,33.271 229.524 C 33.738 230.121,33.724 230.140,33.147 229.690 C 32.608 229.269,32.453 229.286,32.261 229.785 C 32.133 230.118,32.157 230.371,32.314 230.348 C 33.310 230.199,34.408 230.463,34.200 230.800 C 34.064 231.020,34.143 231.200,34.376 231.200 C 34.609 231.200,34.803 230.975,34.806 230.700 C 34.810 230.366,34.943 230.399,35.206 230.800 C 35.642 231.464,35.604 231.498,37.163 229.000 C 38.038 227.599,37.886 225.005,36.951 225.363 C 36.641 225.482,36.400 225.324,36.400 225.002 C 36.400 224.686,36.040 224.235,35.600 224.000 C 35.058 223.710,34.800 223.705,34.800 223.986 M382.185 229.010 C 383.497 229.346,384.974 230.000,385.468 230.464 C 386.266 231.213,386.521 231.991,387.350 236.200 C 387.436 236.640,387.527 236.100,387.551 235.000 C 387.654 230.349,386.417 228.830,382.314 228.564 L 379.800 228.401 382.185 229.010 M21.232 232.300 C 21.008 232.685,20.806 232.820,20.784 232.600 C 20.762 232.380,20.589 232.560,20.400 233.000 C 20.072 233.763,20.055 233.759,20.028 232.900 C 19.981 231.401,16.811 233.275,16.214 235.154 C 16.091 235.542,15.408 236.116,14.695 236.430 C 13.202 237.087,12.450 239.185,12.485 242.600 L 12.505 244.600 12.798 242.312 C 13.291 238.473,15.429 236.547,18.838 236.872 C 19.660 236.951,20.247 236.876,20.143 236.707 C 20.038 236.538,20.218 236.400,20.543 236.400 C 20.868 236.400,21.209 236.535,21.301 236.700 C 21.393 236.865,21.419 236.787,21.358 236.527 C 21.293 236.253,21.571 236.117,22.023 236.204 C 23.115 236.415,22.990 236.104,21.655 235.292 C 20.681 234.699,20.563 234.452,20.867 233.630 C 21.156 232.850,21.318 232.764,21.712 233.182 C 22.096 233.590,22.094 233.739,21.700 233.883 C 21.425 233.984,21.200 234.242,21.200 234.457 C 21.200 234.672,21.380 234.736,21.600 234.600 C 21.820 234.464,22.000 234.543,22.000 234.776 C 22.000 235.009,22.191 235.200,22.424 235.200 C 22.657 235.200,22.711 234.979,22.543 234.707 C 22.269 234.264,22.125 233.650,21.930 232.100 C 21.845 231.432,21.716 231.469,21.232 232.300 M371.433 233.947 C 371.315 234.137,371.575 234.615,372.009 235.009 C 372.444 235.402,372.800 235.535,372.800 235.305 C 372.800 235.074,372.519 234.778,372.175 234.646 C 371.831 234.514,371.661 234.224,371.798 234.003 C 371.935 233.781,371.957 233.600,371.847 233.600 C 371.737 233.600,371.551 233.756,371.433 233.947 M371.671 236.190 C 371.261 236.824,371.288 238.513,371.724 239.400 L 372.116 240.200 371.189 239.400 C 370.680 238.960,370.397 238.831,370.562 239.112 C 371.062 239.966,371.173 242.430,370.698 242.137 C 370.442 241.979,370.396 242.069,370.580 242.368 C 370.999 243.046,371.117 245.196,370.721 244.951 C 370.545 244.842,370.400 245.854,370.400 247.200 C 370.400 248.546,370.248 249.553,370.062 249.438 C 369.876 249.323,369.606 251.878,369.462 255.115 C 369.016 265.151,368.091 270.738,365.416 279.545 C 364.857 281.385,364.400 283.108,364.400 283.374 C 364.400 285.442,357.008 299.475,351.640 307.600 C 346.715 315.053,335.278 327.140,330.260 330.194 C 315.176 339.376,314.927 339.504,309.400 340.948 C 302.206 342.827,299.569 343.205,291.948 343.451 L 284.200 343.701 281.831 342.642 C 280.527 342.059,278.682 340.944,277.731 340.165 C 276.779 339.385,276.000 338.803,275.999 338.873 C 275.976 344.416,272.977 349.738,269.366 350.644 C 268.159 350.947,264.306 355.393,263.321 357.618 C 262.386 359.734,259.210 361.877,254.926 363.283 C 252.372 364.122,251.982 364.674,252.359 366.918 C 252.499 367.755,252.456 369.087,252.262 369.898 C 251.831 371.698,252.120 371.717,281.790 371.847 C 321.514 372.022,322.397 371.897,323.143 365.970 L 323.400 363.930 330.722 363.832 C 339.591 363.713,339.396 363.818,339.727 359.000 C 339.859 357.065,339.815 356.195,339.613 356.800 C 339.430 357.350,339.262 358.304,339.240 358.920 C 339.135 361.867,337.629 363.001,333.367 363.346 L 330.600 363.569 332.729 363.021 C 337.074 361.903,338.761 360.317,338.791 357.324 C 338.804 356.013,339.449 355.803,343.465 355.802 C 347.938 355.800,347.802 355.933,347.790 351.565 L 347.781 348.000 349.190 347.950 C 349.966 347.923,351.517 347.938,352.638 347.983 C 355.567 348.102,355.989 347.545,355.938 343.627 C 355.916 341.901,356.008 340.310,356.144 340.091 C 356.472 339.560,358.800 339.234,358.800 339.719 C 358.800 340.135,363.027 339.906,363.467 339.467 C 363.930 339.003,364.133 334.800,363.692 334.800 C 363.433 334.800,363.399 334.290,363.600 333.400 C 363.774 332.630,363.823 332.000,363.709 332.000 C 363.595 332.000,363.726 331.730,364.000 331.400 C 364.274 331.070,364.872 330.800,365.329 330.800 C 366.298 330.800,365.814 331.416,364.600 331.728 C 364.160 331.841,365.240 331.837,367.000 331.720 C 371.633 331.412,372.039 330.551,371.677 321.800 C 371.643 320.977,371.799 316.912,371.928 315.286 C 371.991 314.489,372.107 314.429,372.833 314.818 C 373.508 315.179,373.779 315.125,374.262 314.532 C 374.591 314.129,374.728 314.053,374.567 314.363 C 374.267 314.942,374.825 314.890,376.566 314.177 C 377.161 313.934,377.258 313.990,377.001 314.432 C 376.820 314.744,377.159 314.555,377.756 314.011 C 378.564 313.274,378.781 312.780,378.605 312.077 C 378.437 311.409,378.507 311.219,378.842 311.426 C 379.307 311.713,379.224 310.969,378.564 308.937 C 378.365 308.325,378.398 308.302,378.756 308.800 C 378.994 309.130,379.220 309.220,379.259 309.000 C 379.298 308.780,379.452 309.590,379.600 310.800 C 379.869 312.994,379.870 312.991,379.935 309.900 C 379.986 307.486,379.877 306.800,379.443 306.800 C 379.136 306.800,378.783 306.532,378.657 306.205 C 378.525 305.861,378.634 305.650,378.914 305.705 C 379.559 305.831,379.784 302.692,379.208 301.615 C 378.915 301.068,378.908 300.800,379.186 300.800 C 379.414 300.800,379.600 300.481,379.600 300.092 C 379.600 299.541,380.150 299.279,382.069 298.914 C 385.913 298.183,387.681 295.114,387.549 289.400 L 387.512 287.800 387.170 289.543 C 386.981 290.501,386.665 291.491,386.466 291.743 C 386.267 291.994,385.897 292.845,385.643 293.634 C 385.051 295.473,383.435 297.011,381.305 297.763 C 379.763 298.307,378.576 298.033,379.636 297.378 C 379.955 297.181,379.927 296.998,379.543 296.750 C 379.086 296.456,379.087 296.344,379.547 296.048 C 379.942 295.793,379.983 295.498,379.693 294.981 C 379.464 294.572,379.429 293.796,379.610 293.164 C 379.784 292.557,379.867 292.001,379.795 291.928 C 379.650 291.783,379.255 288.913,378.953 285.800 C 378.846 284.700,378.723 281.775,378.679 279.300 C 378.632 276.625,378.438 274.798,378.200 274.794 C 377.980 274.791,378.044 274.633,378.343 274.444 C 378.721 274.204,378.751 274.017,378.443 273.826 C 378.199 273.676,378.000 273.373,378.000 273.153 C 378.000 272.933,378.160 272.851,378.355 272.972 C 378.858 273.283,379.188 271.748,378.719 271.279 C 378.467 271.027,378.484 270.795,378.765 270.622 C 379.311 270.284,379.336 268.531,378.800 268.200 C 378.580 268.064,378.414 267.468,378.432 266.876 C 378.450 266.239,378.558 266.042,378.696 266.393 C 379.149 267.548,379.899 268.041,380.161 267.357 C 380.519 266.424,380.450 265.922,380.000 266.200 C 379.768 266.344,379.612 265.976,379.628 265.324 C 379.652 264.354,379.700 264.310,379.974 265.000 L 380.292 265.800 380.473 265.000 C 380.593 264.468,380.757 264.769,380.962 265.898 C 381.406 268.348,382.126 268.559,381.797 266.143 C 381.652 265.074,381.446 263.885,381.339 263.500 C 381.233 263.115,381.335 262.800,381.565 262.800 C 381.796 262.800,382.079 263.205,382.194 263.700 C 383.145 267.790,383.196 267.920,382.978 265.700 C 382.850 264.387,382.928 263.600,383.186 263.600 C 383.414 263.600,383.618 264.095,383.640 264.700 C 383.662 265.305,383.839 266.250,384.034 266.800 C 384.276 267.485,384.334 266.890,384.218 264.909 C 384.124 263.319,384.217 261.913,384.424 261.785 C 384.638 261.653,384.800 262.340,384.800 263.376 C 384.800 264.379,384.980 265.200,385.200 265.200 C 385.421 265.200,385.597 266.229,385.594 267.500 C 385.589 269.233,385.483 269.652,385.163 269.200 C 384.882 268.803,384.787 268.779,384.880 269.130 C 385.348 270.899,385.796 268.824,385.771 265.000 C 385.755 262.580,385.848 261.029,385.978 261.553 C 386.188 262.400,386.272 262.436,386.738 261.875 C 387.443 261.026,387.181 259.387,386.350 259.447 C 385.806 259.487,385.717 259.096,385.803 257.047 C 385.887 255.040,385.854 254.888,385.620 256.200 C 385.208 258.505,384.761 259.623,384.353 259.371 C 384.157 259.250,384.099 258.667,384.224 258.075 C 384.432 257.088,384.410 257.065,383.959 257.800 C 383.689 258.240,383.331 258.692,383.164 258.805 C 382.997 258.918,382.786 259.728,382.697 260.605 L 382.534 262.200 382.467 260.500 C 382.418 259.252,382.233 258.800,381.773 258.800 C 381.315 258.800,381.214 258.558,381.399 257.900 C 381.586 257.236,381.549 257.150,381.258 257.572 C 380.788 258.254,379.695 258.478,379.374 257.958 C 379.248 257.754,378.990 257.683,378.801 257.799 C 378.612 257.916,378.342 257.646,378.200 257.200 C 378.058 256.754,377.775 256.492,377.571 256.618 C 377.367 256.744,377.197 256.432,377.194 255.924 C 377.189 255.160,377.114 255.104,376.760 255.600 C 376.434 256.058,376.385 255.896,376.553 254.918 C 376.722 253.930,376.645 253.684,376.217 253.849 C 375.911 253.966,375.484 253.731,375.267 253.325 C 374.818 252.487,374.844 250.381,375.300 250.662 C 375.465 250.764,375.600 250.657,375.600 250.424 C 375.600 250.191,375.429 250.000,375.219 250.000 C 375.009 250.000,374.911 249.423,375.000 248.718 C 375.089 248.013,374.987 247.225,374.773 246.967 C 374.519 246.661,374.525 246.122,374.791 245.423 C 375.334 243.996,375.349 244.026,374.168 244.240 C 373.520 244.358,373.231 244.273,373.392 244.014 C 373.532 243.786,373.943 243.600,374.304 243.600 C 374.799 243.600,374.847 243.487,374.499 243.139 C 374.169 242.809,374.157 242.454,374.456 241.896 C 374.760 241.328,374.739 240.989,374.378 240.657 C 374.106 240.406,373.987 240.388,374.114 240.617 C 374.241 240.846,373.954 241.063,373.477 241.099 C 372.829 241.148,372.753 241.076,373.177 240.814 C 373.489 240.622,373.796 240.225,373.861 239.932 C 374.193 238.417,374.154 237.870,373.700 237.710 C 373.419 237.611,373.197 237.854,373.194 238.267 C 373.189 238.875,373.124 238.900,372.815 238.411 C 372.610 238.086,372.568 237.726,372.721 237.611 C 373.819 236.782,373.970 235.611,372.969 235.694 C 372.401 235.741,371.817 235.964,371.671 236.190 M387.529 241.439 C 387.458 243.331,387.535 244.962,387.700 245.063 C 387.865 245.164,388.000 243.617,388.000 241.624 C 388.000 237.029,387.700 236.912,387.529 241.439 M27.690 239.670 C 27.758 239.998,27.419 240.200,26.800 240.200 C 26.213 240.200,25.841 240.407,25.900 240.700 C 25.955 240.975,25.851 241.200,25.669 241.200 C 25.487 241.200,25.419 241.750,25.518 242.422 C 25.648 243.309,25.450 243.908,24.798 244.602 C 24.303 245.129,23.997 245.817,24.118 246.131 C 24.239 246.445,24.128 246.912,23.872 247.168 C 23.518 247.522,23.550 247.724,24.003 248.011 C 24.402 248.262,24.434 248.390,24.100 248.394 C 23.825 248.397,23.600 248.850,23.600 249.400 C 23.600 249.950,23.398 250.400,23.151 250.400 C 22.855 250.400,22.832 250.570,23.084 250.900 C 23.570 251.536,22.903 254.911,22.359 254.575 C 22.120 254.427,22.069 254.734,22.227 255.366 C 22.581 256.777,22.121 258.015,21.550 257.189 C 21.246 256.749,21.183 256.923,21.299 257.879 C 21.393 258.644,21.299 259.061,21.065 258.917 C 20.814 258.761,20.784 259.875,20.981 262.038 C 21.260 265.107,21.707 274.044,21.628 275.000 C 21.610 275.220,21.542 276.125,21.476 277.011 C 21.411 277.897,21.204 278.870,21.017 279.173 C 20.766 279.579,20.824 279.635,21.238 279.385 C 21.699 279.108,21.710 279.157,21.303 279.660 C 21.030 279.997,20.925 280.392,21.070 280.537 C 21.215 280.682,21.128 280.800,20.877 280.800 C 20.556 280.800,20.532 281.095,20.795 281.786 C 21.001 282.328,21.041 282.851,20.885 282.948 C 20.728 283.044,20.611 284.716,20.625 286.662 C 20.644 289.279,20.553 289.940,20.277 289.200 C 20.072 288.650,19.342 287.838,18.657 287.395 C 17.971 286.952,17.048 286.017,16.605 285.318 C 16.162 284.618,15.320 283.840,14.734 283.588 C 13.680 283.136,12.991 281.937,12.673 280.000 C 12.571 279.377,12.488 279.620,12.454 280.646 C 12.419 281.707,12.664 282.631,13.142 283.246 C 13.550 283.771,14.101 284.866,14.366 285.680 C 14.935 287.425,17.052 289.416,18.730 289.785 C 19.967 290.056,20.384 290.838,20.395 292.900 C 20.398 293.505,20.576 294.000,20.790 294.000 C 21.044 294.000,21.044 294.359,20.790 295.026 C 20.260 296.419,20.298 298.290,20.863 298.639 C 21.183 298.837,21.253 298.647,21.091 298.026 C 20.878 297.213,20.920 297.182,21.528 297.711 C 22.187 298.284,23.384 298.221,23.020 297.633 C 22.918 297.468,23.080 297.333,23.379 297.333 C 23.979 297.333,23.738 298.409,23.029 298.894 C 22.736 299.094,22.753 299.190,23.080 299.194 C 23.344 299.197,23.729 298.899,23.935 298.530 C 24.141 298.162,24.601 297.817,24.957 297.765 C 25.313 297.713,25.507 297.827,25.389 298.019 C 25.270 298.210,25.790 298.288,26.544 298.191 C 27.444 298.076,28.084 298.219,28.407 298.608 C 28.677 298.934,28.764 299.200,28.600 299.200 C 28.436 299.200,28.473 299.425,28.682 299.700 C 28.890 299.975,29.020 300.740,28.971 301.400 C 28.858 302.897,28.783 305.207,28.821 306.000 C 28.836 306.330,28.799 308.365,28.738 310.523 C 28.650 313.623,28.750 314.524,29.214 314.817 C 29.704 315.127,29.685 315.189,29.100 315.194 C 28.303 315.201,28.215 315.706,28.814 316.826 C 29.146 317.446,29.097 317.600,28.567 317.600 C 27.767 317.600,27.897 322.457,28.720 323.280 C 29.544 324.104,34.296 324.223,34.462 323.424 C 34.848 321.563,35.959 323.841,36.163 326.914 C 36.277 328.627,36.478 330.202,36.609 330.414 C 36.740 330.626,36.629 330.800,36.363 330.800 C 35.701 330.800,36.187 338.360,36.895 339.064 C 37.183 339.351,38.858 339.651,40.800 339.764 C 44.080 339.953,44.106 339.948,41.543 339.617 C 38.117 339.175,37.326 338.720,36.820 336.895 C 36.290 334.989,36.268 331.471,36.787 331.792 C 37.000 331.923,37.075 332.609,36.953 333.316 C 36.776 334.345,36.825 334.481,37.199 334.000 C 37.575 333.515,37.618 333.612,37.424 334.503 C 36.923 336.800,39.212 339.072,41.523 338.570 C 42.379 338.383,42.477 338.427,42.000 338.784 C 41.524 339.140,41.681 339.209,42.764 339.116 L 44.128 339.000 44.164 342.880 C 44.209 347.768,44.227 347.786,48.904 347.851 C 51.637 347.890,52.605 348.042,52.714 348.451 C 52.823 348.859,52.742 348.846,52.398 348.400 C 52.041 347.938,51.987 348.575,52.161 351.179 C 52.454 355.553,52.611 355.700,57.070 355.756 L 60.600 355.800 60.617 358.243 C 60.649 363.025,62.020 363.699,71.849 363.760 C 76.277 363.787,78.246 363.935,78.132 364.231 C 77.580 365.674,80.122 368.922,82.366 369.641 C 83.155 369.894,84.118 370.379,84.506 370.718 C 86.249 372.241,148.292 372.545,149.957 371.039 C 150.490 370.557,150.666 370.118,150.439 369.839 C 150.242 369.598,150.067 368.264,150.049 366.876 C 150.010 363.767,150.043 363.818,147.710 363.221 C 143.335 362.103,142.481 361.616,140.427 359.071 C 138.207 356.319,137.973 356.064,135.632 353.822 C 134.726 352.954,133.526 351.275,132.965 350.090 C 132.166 348.400,131.630 347.806,130.473 347.329 C 128.244 346.409,126.443 344.896,125.147 342.852 L 123.979 341.010 119.889 341.131 C 104.383 341.590,82.305 335.199,69.029 326.409 C 66.813 324.941,63.920 323.144,62.600 322.414 C 56.461 319.018,49.181 310.657,44.469 301.591 C 42.940 298.649,40.888 295.332,39.909 294.221 C 37.960 292.008,34.170 285.095,34.561 284.463 C 34.695 284.246,34.633 284.008,34.424 283.934 C 34.214 283.860,33.945 283.260,33.825 282.600 C 33.706 281.940,33.515 280.950,33.402 280.400 C 32.582 276.423,31.858 266.915,31.432 254.525 C 31.348 252.064,31.160 249.859,31.016 249.625 C 30.871 249.391,30.940 249.200,31.168 249.200 C 31.442 249.200,31.427 248.858,31.122 248.189 C 30.839 247.567,30.555 247.349,30.386 247.622 C 30.203 247.918,30.030 247.855,29.868 247.434 C 29.735 247.085,29.806 246.800,30.027 246.800 C 30.289 246.800,30.283 246.529,30.009 246.016 C 29.778 245.585,29.637 245.000,29.695 244.716 C 29.753 244.432,29.545 244.255,29.232 244.323 C 28.783 244.419,28.764 244.325,29.139 243.873 C 29.679 243.223,29.326 241.875,28.715 242.252 C 28.467 242.406,28.417 242.177,28.584 241.650 C 28.755 241.113,28.681 240.800,28.384 240.800 C 28.126 240.800,28.016 240.536,28.140 240.213 C 28.264 239.890,28.188 239.516,27.973 239.383 C 27.757 239.250,27.630 239.379,27.690 239.670 M12.182 262.000 C 12.182 270.470,12.235 273.935,12.299 269.700 C 12.364 265.465,12.364 258.535,12.299 254.300 C 12.235 250.065,12.182 253.530,12.182 262.000 M12.931 261.000 C 12.933 262.540,13.005 263.121,13.092 262.291 C 13.179 261.461,13.177 260.201,13.089 259.491 C 13.000 258.781,12.929 259.460,12.931 261.000 M387.040 274.040 C 386.893 274.957,386.852 275.785,386.947 275.880 C 387.042 275.976,387.246 275.310,387.400 274.400 C 387.554 273.490,387.596 272.662,387.493 272.560 C 387.390 272.457,387.187 273.123,387.040 274.040 M387.505 282.100 C 387.710 286.627,387.886 286.946,387.946 282.900 C 387.975 280.865,387.859 279.200,387.687 279.200 C 387.515 279.200,387.433 280.505,387.505 282.100 M380.975 293.300 L 379.800 294.600 381.100 293.425 C 381.815 292.779,382.400 292.194,382.400 292.125 C 382.400 291.816,382.070 292.088,380.975 293.300 M21.719 296.133 C 21.832 296.427,21.671 296.667,21.362 296.667 C 21.053 296.667,20.800 296.427,20.800 296.133 C 20.800 295.840,20.961 295.600,21.157 295.600 C 21.354 295.600,21.607 295.840,21.719 296.133 M191.399 299.350 C 189.055 299.685,187.824 300.088,186.799 300.854 C 186.030 301.430,184.760 302.106,183.979 302.356 C 181.022 303.301,174.552 304.791,173.381 304.795 C 172.501 304.799,171.751 305.222,170.681 306.317 L 169.200 307.834 169.200 312.312 C 169.200 317.994,170.869 323.995,172.719 324.966 C 174.365 325.831,176.684 328.412,177.419 330.200 C 178.235 332.185,179.385 333.463,181.200 334.402 C 182.997 335.332,184.499 336.939,185.670 339.185 C 186.181 340.167,187.178 341.337,187.885 341.785 C 188.592 342.233,190.007 343.122,191.028 343.759 C 192.139 344.452,193.425 345.762,194.227 347.015 C 195.685 349.295,195.549 349.242,202.498 350.222 L 204.396 350.490 207.098 347.688 C 208.584 346.147,210.520 344.437,211.400 343.889 C 213.377 342.655,214.751 341.159,216.131 338.735 C 216.732 337.679,217.845 336.481,218.696 335.973 C 220.756 334.744,222.956 332.603,224.231 330.586 C 224.817 329.659,225.992 328.472,226.843 327.950 C 228.874 326.703,230.207 324.660,231.009 321.565 C 231.368 320.181,232.030 318.326,232.480 317.444 C 233.724 315.005,233.234 308.716,231.672 307.072 C 230.008 305.322,228.395 304.508,226.000 304.212 C 222.118 303.732,217.867 302.387,215.778 300.975 C 212.708 298.902,200.312 298.075,191.399 299.350 M20.032 303.300 C 20.067 306.140,20.256 305.983,20.510 302.900 C 20.605 301.745,20.529 300.800,20.341 300.800 C 20.154 300.800,20.014 301.925,20.032 303.300 M21.241 309.606 C 21.142 312.027,23.973 314.858,26.394 314.759 C 27.190 314.726,27.084 314.633,25.888 314.316 C 23.957 313.804,22.196 312.043,21.684 310.112 C 21.367 308.916,21.274 308.810,21.241 309.606 M375.294 312.412 C 374.575 313.065,373.765 313.599,373.494 313.599 C 373.222 313.598,373.565 313.252,374.256 312.831 C 374.947 312.410,375.633 311.870,375.780 311.632 C 375.927 311.395,376.172 311.205,376.324 311.212 C 376.476 311.218,376.012 311.758,375.294 312.412 M377.200 312.800 C 376.965 313.240,376.570 313.600,376.324 313.600 C 376.078 313.600,376.202 313.240,376.600 312.800 C 376.998 312.360,377.392 312.000,377.476 312.000 C 377.560 312.000,377.435 312.360,377.200 312.800 M379.078 314.117 C 378.912 314.732,378.376 315.395,377.888 315.592 C 377.329 315.817,377.231 315.959,377.624 315.975 C 378.730 316.020,379.685 315.018,379.528 313.978 C 379.380 313.008,379.377 313.009,379.078 314.117 M29.178 320.040 C 28.672 320.986,28.701 321.308,29.262 320.962 C 29.554 320.781,29.615 320.852,29.427 321.156 C 29.034 321.792,29.979 322.894,30.685 322.623 C 30.991 322.505,31.132 322.587,30.997 322.805 C 30.689 323.303,31.049 323.309,31.960 322.822 C 32.484 322.541,32.667 322.593,32.667 323.022 C 32.667 323.918,30.157 323.757,29.200 322.800 C 28.243 321.843,28.082 319.333,28.978 319.333 C 29.407 319.333,29.459 319.516,29.178 320.040 M371.420 325.491 C 370.984 326.627,370.743 325.707,371.066 324.141 C 371.363 322.705,371.394 322.678,371.522 323.734 C 371.598 324.357,371.552 325.148,371.420 325.491 M371.200 327.181 C 371.200 328.515,370.293 330.035,369.142 330.630 C 367.825 331.311,366.400 331.375,366.400 330.753 C 366.400 330.504,366.753 330.399,367.201 330.516 C 367.641 330.631,367.900 330.562,367.777 330.363 C 367.565 330.019,367.804 329.931,369.199 329.839 C 369.529 329.817,369.817 329.529,369.839 329.199 C 369.931 327.804,370.019 327.565,370.363 327.777 C 370.562 327.900,370.631 327.641,370.516 327.201 C 370.399 326.753,370.504 326.400,370.753 326.400 C 370.999 326.400,371.200 326.752,371.200 327.181 M39.000 332.800 C 38.864 333.020,38.954 333.200,39.200 333.200 C 39.446 333.200,39.548 333.361,39.426 333.558 C 39.216 333.898,40.142 334.491,41.000 334.565 C 41.220 334.584,41.416 334.780,41.435 335.000 C 41.509 335.858,42.102 336.784,42.442 336.574 C 42.639 336.452,42.800 336.554,42.800 336.800 C 42.800 337.046,42.980 337.136,43.200 337.000 C 43.420 336.864,43.600 336.943,43.600 337.176 C 43.600 338.301,40.642 336.409,39.310 334.431 C 38.310 332.948,38.179 332.400,38.824 332.400 C 39.057 332.400,39.136 332.580,39.000 332.800 M40.370 335.312 C 41.343 336.404,42.087 336.869,41.252 335.863 C 41.007 335.568,40.940 335.163,41.103 334.963 C 41.267 334.763,41.237 334.733,41.037 334.897 C 40.837 335.060,40.387 334.975,40.037 334.709 C 39.687 334.442,39.836 334.714,40.370 335.312 M39.908 337.776 C 40.509 338.101,40.761 338.375,40.469 338.384 C 39.780 338.405,37.595 336.220,37.616 335.531 C 37.625 335.239,37.899 335.491,38.224 336.092 C 38.550 336.692,39.308 337.450,39.908 337.776 M363.600 337.971 C 363.600 338.486,362.438 339.600,361.902 339.600 C 361.659 339.600,361.883 339.150,362.400 338.600 C 363.429 337.505,363.600 337.415,363.600 337.971 M53.324 353.100 C 53.186 353.485,53.220 353.667,53.399 353.503 C 53.850 353.095,54.853 353.991,54.530 354.513 C 54.367 354.777,54.520 354.840,54.934 354.681 C 55.300 354.540,55.600 354.599,55.600 354.813 C 55.600 355.477,54.437 355.237,53.600 354.400 C 52.763 353.563,52.523 352.400,53.187 352.400 C 53.401 352.400,53.462 352.715,53.324 353.100 M63.190 357.580 C 63.980 359.128,64.404 359.527,67.169 361.315 C 69.351 362.725,69.165 363.219,66.721 362.504 C 63.274 361.496,62.219 360.415,61.442 357.100 C 61.040 355.380,62.235 355.709,63.190 357.580 M86.096 364.136 C 86.478 364.196,87.444 365.045,88.242 366.023 L 89.694 367.800 88.093 366.165 C 86.683 364.725,86.499 364.637,86.546 365.427 C 86.576 365.920,86.733 366.241,86.895 366.141 C 87.058 366.041,87.091 366.217,86.970 366.534 C 86.713 367.205,88.439 368.547,90.683 369.421 C 91.933 369.908,91.989 369.971,91.000 369.777 C 88.899 369.365,86.658 367.856,85.687 366.199 C 85.046 365.106,84.832 364.916,85.008 365.600 C 85.686 368.229,88.758 370.358,92.101 370.515 C 93.099 370.562,93.844 370.720,93.756 370.866 C 93.667 371.012,93.821 371.228,94.098 371.345 C 94.898 371.686,89.166 371.162,87.400 370.733 C 86.520 370.519,85.260 369.838,84.600 369.219 C 83.940 368.599,82.635 367.373,81.700 366.493 C 78.945 363.902,80.232 363.212,86.096 364.136 M89.825 365.268 L 91.000 366.536 89.712 365.650 C 88.333 364.700,87.735 364.000,88.302 364.000 C 88.493 364.000,89.179 364.571,89.825 365.268 M316.938 365.414 C 316.312 366.190,315.204 367.494,314.475 368.312 L 313.149 369.800 314.116 368.200 C 315.423 366.038,315.795 364.768,315.226 364.416 C 314.974 364.260,315.512 364.103,316.422 364.068 L 318.076 364.003 316.938 365.414 M322.000 364.413 C 322.000 368.113,316.690 371.113,309.470 371.493 C 307.232 371.611,305.508 371.590,305.639 371.448 C 305.771 371.305,307.244 371.115,308.912 371.026 C 312.184 370.850,314.475 370.012,315.408 368.648 C 317.765 365.202,322.000 362.481,322.000 364.413 M97.000 371.200 C 97.147 371.438,96.710 371.589,95.924 371.572 C 94.821 371.548,94.733 371.486,95.400 371.200 C 96.485 370.734,96.712 370.734,97.000 371.200 M247.395 373.310 C 246.952 374.014,246.014 374.952,245.310 375.395 C 244.573 375.859,244.024 376.544,244.015 377.011 C 244.007 377.457,243.716 378.267,243.368 378.811 C 242.739 379.796,242.739 379.796,243.485 378.958 C 243.897 378.496,244.871 377.907,245.651 377.649 C 247.760 376.953,250.000 374.236,250.000 372.374 C 250.000 371.444,248.151 372.109,247.395 373.310 M156.594 377.188 C 156.869 378.914,157.086 379.131,158.813 379.406 L 160.200 379.626 158.800 379.113 C 157.775 378.737,157.263 378.225,156.887 377.200 L 156.374 375.800 156.594 377.188 M234.272 382.084 C 233.895 383.934,232.097 385.779,230.112 386.350 L 228.600 386.786 230.068 386.623 C 232.751 386.326,235.070 383.761,234.713 381.485 C 234.609 380.823,234.497 380.975,234.272 382.084 M172.101 382.600 C 172.105 383.480,172.187 383.793,172.283 383.295 C 172.379 382.798,172.375 382.078,172.275 381.695 C 172.175 381.313,172.096 381.720,172.101 382.600 M172.425 386.051 C 172.393 386.874,173.410 387.741,174.087 387.469 C 174.404 387.342,174.328 387.251,173.887 387.232 C 173.495 387.214,173.011 386.795,172.812 386.300 C 172.568 385.691,172.443 385.610,172.425 386.051 M176.705 387.883 C 177.202 387.979,177.922 387.975,178.305 387.875 C 178.687 387.775,178.280 387.696,177.400 387.701 C 176.520 387.705,176.207 387.787,176.705 387.883 ",
        stroke: "none",
        fill: "#412a16",
        fillRule: "evenodd"
      }
    ), /* @__PURE__ */ import_react35.default.createElement(
      "path",
      {
        id: "path4",
        d: "M97.346 36.424 C 98.856 36.599,100.836 36.595,101.746 36.415 C 103.004 36.166,102.346 36.090,99.000 36.096 C 94.763 36.105,94.702 36.117,97.346 36.424 M85.700 36.676 C 86.085 36.776,86.715 36.776,87.100 36.676 C 87.485 36.575,87.170 36.493,86.400 36.493 C 85.630 36.493,85.315 36.575,85.700 36.676 M129.569 37.700 C 129.179 38.975,129.633 40.117,130.179 39.234 C 130.308 39.026,130.227 38.740,130.000 38.600 C 129.773 38.460,129.691 38.177,129.817 37.972 C 129.944 37.768,129.947 37.600,129.824 37.600 C 129.701 37.600,129.586 37.645,129.569 37.700 M66.770 43.100 L 65.800 44.200 66.830 43.296 C 67.396 42.799,68.010 42.529,68.194 42.696 C 68.378 42.863,68.399 42.775,68.241 42.500 C 67.862 41.842,67.888 41.831,66.770 43.100 M132.000 42.481 C 132.000 43.230,133.003 44.132,133.610 43.930 C 133.851 43.850,133.587 43.351,133.024 42.822 C 132.245 42.091,132.000 42.009,132.000 42.481 M146.700 50.738 C 146.585 51.180,146.724 51.467,147.055 51.467 C 147.661 51.467,147.799 50.570,147.245 50.228 C 147.050 50.108,146.805 50.337,146.700 50.738 M41.339 66.174 C 38.717 68.839,38.691 68.664,41.700 68.629 L 44.200 68.600 44.414 66.741 C 44.812 63.282,44.281 63.185,41.339 66.174 M43.931 66.600 C 44.017 67.878,43.931 68.000,42.943 68.000 L 41.861 68.000 42.630 67.081 C 43.054 66.575,42.892 66.682,42.272 67.319 C 40.689 68.942,40.481 68.391,42.017 66.642 C 43.589 64.851,43.813 64.846,43.931 66.600 M102.200 78.262 C 92.440 79.421,79.602 84.437,73.099 89.633 C 71.883 90.605,70.256 91.888,69.484 92.484 C 65.889 95.264,62.000 105.452,62.000 112.091 C 62.000 121.418,65.954 131.939,70.159 133.799 C 75.627 136.217,75.985 136.135,78.455 131.905 C 79.475 130.159,80.655 128.750,81.664 128.072 C 84.872 125.917,85.934 124.752,87.291 121.896 C 89.211 117.857,97.681 108.210,104.341 102.479 C 105.923 101.117,108.248 98.954,109.508 97.671 C 110.769 96.389,112.880 94.712,114.200 93.945 C 116.266 92.744,116.758 92.220,117.732 90.175 C 119.097 87.313,120.875 85.369,122.671 84.777 C 124.912 84.037,123.530 82.415,118.444 79.815 C 115.788 78.457,107.351 77.651,102.200 78.262 M287.800 79.257 C 284.430 80.273,283.598 80.694,282.515 81.932 C 280.871 83.810,280.793 83.469,283.700 87.144 C 285.075 88.882,286.482 90.823,286.827 91.457 C 287.214 92.168,288.441 93.129,290.027 93.961 C 293.787 95.933,295.027 96.974,296.213 99.153 C 296.797 100.225,297.999 101.619,298.885 102.251 C 301.897 104.398,303.230 105.796,304.553 108.195 C 305.444 109.809,306.631 111.179,308.193 112.395 C 309.892 113.718,310.952 114.988,312.156 117.148 C 313.060 118.769,315.240 121.661,317.000 123.574 C 318.971 125.715,320.877 128.309,321.961 130.326 C 323.299 132.813,323.924 133.602,324.561 133.607 C 325.359 133.614,329.675 134.496,331.415 135.009 C 332.101 135.211,332.506 134.758,333.987 132.124 C 334.954 130.406,336.500 127.898,337.423 126.551 C 341.908 120.007,342.511 109.663,338.841 102.242 C 335.496 95.480,332.459 91.320,329.787 89.841 C 328.460 89.106,326.149 87.682,324.650 86.677 C 314.321 79.750,297.442 76.351,287.800 79.257 M32.951 85.375 C 31.462 86.023,30.367 87.450,30.698 88.312 C 30.867 88.752,30.783 88.837,30.406 88.604 C 30.040 88.378,29.971 88.430,30.183 88.773 C 30.528 89.331,31.203 88.851,31.339 87.952 C 31.496 86.913,32.093 86.328,33.746 85.592 C 34.656 85.188,35.130 84.851,34.800 84.844 C 34.470 84.837,33.638 85.076,32.951 85.375 M35.696 85.429 C 35.419 85.729,35.239 86.144,35.296 86.351 C 35.353 86.557,34.784 87.148,34.031 87.663 C 33.278 88.178,32.576 88.870,32.472 89.200 C 32.335 89.634,32.548 89.579,33.242 89.000 L 34.200 88.200 33.500 89.031 C 33.115 89.489,32.800 90.074,32.800 90.331 C 32.800 90.589,32.626 90.800,32.413 90.800 C 32.199 90.800,32.122 90.485,32.240 90.100 C 32.358 89.715,32.179 89.850,31.842 90.400 C 31.504 90.950,31.222 91.514,31.214 91.653 C 31.184 92.185,33.231 92.264,33.900 91.757 C 34.285 91.465,34.437 91.220,34.238 91.213 C 34.039 91.206,34.198 90.844,34.591 90.409 C 34.985 89.975,35.447 89.705,35.618 89.811 C 35.790 89.917,35.879 89.688,35.817 89.302 C 35.755 88.916,35.871 88.277,36.076 87.882 C 36.653 86.767,36.338 84.734,35.696 85.429 M33.832 86.625 C 33.485 86.973,33.200 87.132,33.200 86.980 C 33.200 86.332,31.907 87.848,31.377 89.117 C 30.576 91.033,30.653 91.136,31.710 89.569 C 32.210 88.826,33.205 87.824,33.922 87.341 C 34.639 86.858,35.054 86.357,34.845 86.228 C 34.636 86.098,34.180 86.277,33.832 86.625 M108.615 90.429 C 109.497 92.135,108.909 92.682,105.834 93.011 C 102.189 93.401,101.600 94.060,101.600 97.745 C 101.600 100.133,100.478 101.598,98.646 101.601 C 96.491 101.605,94.424 103.825,93.805 106.800 C 93.488 108.324,92.184 110.000,91.314 110.000 C 90.025 110.000,87.550 111.683,87.027 112.915 C 86.306 114.611,84.501 119.567,84.198 120.680 C 84.067 121.163,83.624 121.665,83.215 121.795 C 82.805 121.925,81.800 122.565,80.980 123.216 C 80.161 123.867,79.221 124.400,78.892 124.400 C 78.563 124.400,77.713 125.017,77.002 125.771 L 75.709 127.141 74.061 125.462 C 68.015 119.302,74.990 103.277,85.968 98.106 C 96.949 92.933,102.926 90.511,107.890 89.223 C 107.939 89.210,108.265 89.753,108.615 90.429 M33.749 91.117 C 33.856 91.291,33.372 91.457,32.672 91.484 C 31.485 91.531,31.467 91.512,32.400 91.207 C 32.950 91.027,33.434 90.862,33.476 90.840 C 33.518 90.818,33.641 90.943,33.749 91.117 M309.492 94.027 C 310.260 94.702,312.624 96.097,314.744 97.127 C 318.407 98.906,325.668 105.347,327.380 108.336 C 329.265 111.625,330.255 115.929,330.004 119.743 C 329.712 124.174,329.739 124.130,326.601 125.233 L 324.249 126.060 323.544 125.130 C 323.157 124.619,322.718 123.484,322.570 122.610 C 322.249 120.723,320.283 118.562,318.564 118.206 C 315.713 117.616,315.335 117.170,314.373 113.254 C 313.830 111.042,312.564 109.774,310.346 109.219 C 307.638 108.542,307.426 108.318,307.108 105.808 C 306.688 102.486,305.783 101.158,303.441 100.431 L 301.509 99.831 301.726 97.997 C 302.303 93.127,306.198 91.135,309.492 94.027 M198.600 108.179 C 190.123 109.469,180.169 113.869,174.787 118.706 C 173.138 120.188,170.567 122.271,169.074 123.335 C 157.026 131.921,152.700 146.740,158.396 159.906 C 159.278 161.945,160.000 163.813,160.000 164.057 C 160.000 165.270,171.379 175.556,175.413 177.989 C 182.473 182.247,201.048 184.827,207.000 182.376 C 207.660 182.104,209.280 181.481,210.600 180.991 C 220.324 177.379,226.892 173.795,232.799 168.876 L 236.999 165.379 238.952 160.990 C 245.980 145.193,243.741 134.738,230.400 121.066 L 225.000 115.532 218.600 112.404 C 209.549 107.981,205.509 107.128,198.600 108.179 M48.712 165.249 C 49.394 166.326,52.000 168.421,52.000 167.892 C 52.000 167.648,48.352 164.000,48.108 164.000 C 48.005 164.000,48.277 164.562,48.712 165.249 M348.910 177.002 C 349.521 177.540,350.477 178.479,351.034 179.090 C 351.802 179.931,351.949 179.995,351.639 179.355 C 351.210 178.467,348.577 175.991,348.086 176.013 C 347.929 176.020,348.300 176.465,348.910 177.002 M139.100 227.500 C 138.540 228.128,138.538 228.353,139.081 229.700 C 139.851 231.611,140.157 231.587,140.761 229.571 C 141.457 227.250,140.446 225.990,139.100 227.500 M199.000 256.277 C 195.155 257.093,191.577 261.050,189.773 266.482 C 189.289 267.939,188.341 269.347,186.583 271.218 C 185.208 272.683,183.766 274.493,183.381 275.240 C 182.623 276.709,173.587 285.850,170.000 288.776 C 168.790 289.763,166.900 291.480,165.800 292.591 C 164.423 293.982,162.553 295.227,159.800 296.586 C 157.333 297.804,154.916 299.367,153.494 300.665 C 152.213 301.833,149.855 303.402,148.193 304.190 C 146.291 305.093,144.652 306.224,143.700 307.292 C 142.875 308.216,141.092 310.059,139.737 311.386 C 136.043 315.006,134.400 320.236,134.400 328.375 C 134.400 335.543,137.485 347.116,139.952 349.200 C 140.603 349.750,141.976 350.901,143.002 351.758 C 144.029 352.614,145.501 354.268,146.274 355.432 C 147.753 357.660,147.655 357.599,155.200 361.053 C 162.365 364.333,161.791 363.844,161.790 366.665 C 161.790 368.089,161.947 369.033,162.163 368.899 C 162.370 368.771,162.422 368.965,162.281 369.334 C 162.140 369.701,162.218 370.000,162.455 370.000 C 162.692 370.000,162.786 370.261,162.663 370.580 C 162.528 370.932,162.633 371.085,162.931 370.971 C 163.201 370.868,164.137 371.133,165.011 371.561 C 166.243 372.164,166.450 372.398,165.931 372.600 C 164.800 373.042,164.724 373.938,165.827 373.817 C 166.362 373.758,166.800 373.865,166.800 374.055 C 166.800 374.245,166.530 374.400,166.200 374.400 C 165.870 374.400,165.600 374.591,165.600 374.824 C 165.600 375.057,165.778 375.137,165.995 375.003 C 166.222 374.863,166.289 375.023,166.154 375.376 C 166.014 375.740,166.181 376.094,166.558 376.239 C 166.911 376.375,167.200 376.657,167.200 376.866 C 167.200 377.076,166.989 377.117,166.732 376.958 C 166.417 376.764,166.348 376.887,166.519 377.334 C 166.686 377.769,166.571 378.000,166.187 378.000 C 165.864 378.000,165.645 377.792,165.700 377.537 C 165.755 377.282,165.322 377.041,164.739 377.001 C 163.666 376.927,161.098 375.530,161.164 375.057 C 161.184 374.916,161.087 374.815,160.950 374.833 C 160.499 374.892,159.196 372.612,159.388 372.100 C 159.491 371.825,159.401 371.600,159.187 371.600 C 158.974 371.600,158.800 371.765,158.800 371.967 C 158.800 372.169,158.706 372.579,158.591 372.879 C 158.476 373.178,158.657 373.778,158.992 374.211 C 159.598 374.994,159.600 374.994,159.364 374.200 C 159.158 373.509,159.232 373.530,159.907 374.356 C 160.336 374.882,161.118 375.664,161.644 376.093 C 162.470 376.768,162.491 376.842,161.800 376.636 C 161.011 376.401,161.010 376.406,161.779 377.001 C 162.213 377.337,162.900 377.495,163.329 377.359 C 163.906 377.176,164.018 377.251,163.773 377.657 C 163.503 378.107,163.563 378.105,164.123 377.651 C 164.728 377.161,164.828 377.239,165.057 378.383 C 165.237 379.285,165.413 379.507,165.650 379.132 C 165.836 378.840,165.991 378.780,165.994 379.000 C 165.998 379.220,166.721 379.414,167.600 379.432 C 169.155 379.463,169.713 379.074,168.700 378.665 C 168.323 378.513,168.320 378.455,168.686 378.432 C 168.953 378.414,169.352 378.737,169.573 379.150 C 169.913 379.784,170.361 379.880,172.487 379.772 C 183.615 379.207,193.867 379.615,193.867 380.622 C 193.867 380.920,193.699 381.061,193.495 380.935 C 193.290 380.809,193.196 381.042,193.285 381.453 C 193.375 381.864,193.707 382.152,194.024 382.094 C 194.453 382.015,194.429 382.123,193.931 382.516 C 193.305 383.009,193.305 383.075,193.931 383.536 C 194.299 383.808,194.395 383.935,194.145 383.819 C 193.895 383.704,193.445 383.911,193.145 384.281 C 192.813 384.691,192.788 384.841,193.080 384.666 C 193.363 384.496,193.741 384.715,194.000 385.200 C 194.242 385.652,194.609 385.918,194.815 385.790 C 195.022 385.663,195.089 385.824,194.964 386.149 C 194.835 386.486,195.051 386.905,195.469 387.126 C 196.179 387.503,205.918 387.416,206.304 387.029 C 206.409 386.924,206.748 387.091,207.058 387.401 C 207.486 387.829,208.535 387.927,211.445 387.813 C 215.486 387.655,217.021 387.235,213.867 387.150 C 211.488 387.086,211.328 387.062,210.967 386.700 C 210.802 386.535,210.506 386.400,210.310 386.400 C 210.113 386.400,210.036 386.535,210.137 386.700 C 210.551 387.372,207.679 387.176,207.146 386.496 C 206.672 385.892,206.679 385.859,207.200 386.250 C 207.901 386.775,209.481 386.595,210.334 385.892 C 210.806 385.502,210.965 385.504,211.098 385.900 C 211.191 386.175,211.410 386.400,211.585 386.400 C 211.759 386.400,211.621 385.780,211.278 385.022 C 210.934 384.264,210.487 383.746,210.284 383.872 C 210.081 383.997,210.154 384.248,210.446 384.428 C 210.738 384.609,210.851 384.882,210.698 385.035 C 210.325 385.408,209.149 384.407,209.428 383.955 C 209.549 383.760,209.356 383.600,209.000 383.600 C 208.644 383.600,208.466 383.417,208.604 383.193 C 208.742 382.970,209.023 382.891,209.228 383.017 C 209.432 383.144,209.600 382.967,209.600 382.624 C 209.600 382.281,209.465 382.045,209.300 382.100 C 209.135 382.155,209.000 382.020,209.000 381.800 C 209.000 381.580,209.135 381.445,209.300 381.500 C 209.465 381.555,209.600 381.409,209.600 381.176 C 209.600 380.943,209.811 380.883,210.068 381.042 C 210.374 381.231,210.455 381.120,210.302 380.722 C 210.133 380.282,210.309 380.132,210.934 380.181 C 211.410 380.219,211.980 380.153,212.200 380.036 C 213.035 379.590,223.286 379.430,225.417 379.830 C 227.130 380.151,226.170 384.377,224.269 384.877 C 223.986 384.951,224.160 385.354,224.706 385.892 L 225.613 386.784 225.431 385.784 C 225.332 385.234,225.406 384.880,225.597 384.998 C 225.788 385.116,226.058 385.030,226.196 384.807 C 226.526 384.272,227.200 384.284,227.200 384.824 C 227.200 385.057,226.992 385.119,226.738 384.962 C 226.433 384.773,226.386 384.854,226.600 385.200 C 226.828 385.569,226.769 385.628,226.400 385.400 C 226.031 385.172,225.972 385.231,226.200 385.600 C 226.413 385.945,226.367 386.027,226.066 385.841 C 225.769 385.657,225.694 385.779,225.851 386.187 C 226.056 386.723,226.204 386.687,226.846 385.947 C 227.733 384.924,227.725 384.980,227.153 383.913 C 226.788 383.230,226.813 383.119,227.291 383.303 C 227.729 383.471,227.829 383.287,227.692 382.568 C 227.591 382.041,227.366 381.697,227.192 381.805 C 227.017 381.913,227.083 381.552,227.337 381.004 C 227.592 380.455,228.070 379.984,228.400 379.957 C 228.988 379.908,234.127 379.633,235.897 379.555 C 236.391 379.533,236.707 379.373,236.600 379.199 C 236.492 379.026,236.671 378.781,236.997 378.656 C 237.329 378.529,237.548 378.632,237.495 378.891 C 237.443 379.145,237.715 379.421,238.100 379.506 C 238.601 379.615,238.813 379.395,238.846 378.729 C 238.880 378.063,238.944 377.996,239.074 378.493 C 239.345 379.524,240.967 379.150,241.134 378.018 C 241.232 377.349,241.127 377.196,240.734 377.432 C 240.290 377.700,240.289 377.644,240.731 377.098 C 241.152 376.579,241.482 376.527,242.323 376.847 C 242.906 377.068,243.254 377.120,243.095 376.962 C 242.937 376.803,242.994 376.448,243.223 376.172 C 243.515 375.821,243.495 375.583,243.158 375.374 C 242.854 375.186,242.781 375.245,242.959 375.534 C 243.146 375.836,243.016 375.904,242.574 375.735 C 242.002 375.515,242.042 375.403,242.853 374.953 C 243.725 374.470,243.736 374.425,243.000 374.383 C 242.559 374.357,242.426 374.246,242.705 374.134 C 243.605 373.771,244.108 372.413,243.579 371.774 C 242.922 370.983,241.960 371.031,242.271 371.840 C 242.485 372.398,242.408 372.412,241.668 371.950 C 240.966 371.511,240.922 371.364,241.408 371.091 C 241.906 370.813,241.874 370.632,241.197 369.905 C 240.592 369.255,240.520 368.971,240.899 368.730 C 241.220 368.527,241.239 368.410,240.953 368.406 C 240.514 368.400,240.544 365.837,241.000 364.399 C 241.213 363.730,248.234 360.206,250.733 359.513 C 251.517 359.296,252.835 358.314,253.933 357.127 C 256.057 354.832,257.462 353.426,260.389 350.662 C 261.874 349.260,262.872 347.793,263.998 345.357 C 264.853 343.504,265.903 341.496,266.330 340.894 C 269.515 336.405,270.042 325.883,267.370 320.136 C 264.163 313.236,263.873 312.740,262.077 311.054 C 261.108 310.144,259.299 308.386,258.057 307.147 C 256.809 305.901,254.667 304.327,253.264 303.624 C 251.870 302.925,249.587 301.291,248.192 299.993 C 246.622 298.532,244.618 297.164,242.928 296.400 C 241.239 295.636,239.362 294.355,238.000 293.037 C 236.790 291.865,234.804 290.187,233.588 289.306 C 232.371 288.425,230.116 286.466,228.577 284.952 C 227.038 283.439,224.253 280.740,222.389 278.955 C 219.507 276.196,218.613 274.999,216.412 270.955 C 214.909 268.195,213.014 265.361,211.895 264.200 C 210.835 263.100,209.182 261.017,208.222 259.571 C 205.464 255.417,204.566 255.096,199.000 256.277 M205.306 261.130 C 205.863 261.971,207.509 264.061,208.964 265.773 C 210.662 267.770,212.625 270.810,214.442 274.252 C 216.780 278.682,217.658 279.947,219.475 281.509 C 220.686 282.549,222.095 284.221,222.607 285.225 C 223.598 287.168,225.647 289.226,228.100 290.740 C 229.836 291.811,229.894 292.010,228.767 293.030 C 227.969 293.752,226.867 293.785,203.267 293.792 C 172.473 293.802,169.154 293.486,174.181 291.027 C 176.677 289.806,178.499 287.696,179.264 285.143 C 179.516 284.303,180.036 283.515,180.420 283.394 C 182.363 282.777,184.376 280.744,185.640 278.124 C 186.363 276.626,187.783 274.500,188.796 273.400 C 189.844 272.260,191.430 269.764,192.480 267.596 C 194.748 262.919,195.182 262.510,199.524 260.956 C 204.052 259.336,204.120 259.338,205.306 261.130 M305.758 268.890 C 304.901 269.656,303.092 271.032,301.739 271.950 C 299.106 273.734,297.494 275.408,295.098 278.845 C 294.271 280.030,293.055 281.638,292.395 282.417 C 290.968 284.101,291.213 286.662,293.143 290.240 C 295.039 293.756,300.131 294.416,303.378 291.566 C 304.050 290.976,305.426 289.977,306.435 289.347 C 307.444 288.716,309.673 287.255,311.386 286.100 C 313.100 284.945,314.615 283.998,314.751 283.995 C 315.104 283.989,316.204 281.446,317.176 278.388 L 318.007 275.776 317.074 272.988 C 315.475 268.207,309.104 265.900,305.758 268.890 M91.415 275.554 C 91.070 276.640,91.868 278.077,93.331 279.003 C 94.223 279.567,94.797 280.399,95.263 281.802 C 96.145 284.459,99.252 286.315,101.653 285.618 C 103.887 284.969,104.189 284.378,103.441 282.114 C 103.092 281.062,102.689 279.326,102.543 278.258 C 102.154 275.388,101.000 274.803,95.727 274.801 C 92.087 274.800,91.628 274.880,91.415 275.554 M216.000 296.009 C 221.333 296.476,224.012 297.229,226.069 298.839 C 226.877 299.471,228.587 300.379,229.869 300.856 C 232.547 301.853,233.580 302.453,235.772 304.286 C 238.529 306.591,238.794 307.275,238.797 312.084 L 238.800 316.369 237.008 318.569 C 236.023 319.779,234.414 322.441,233.433 324.484 C 232.198 327.056,230.933 328.954,229.324 330.648 C 228.046 331.994,226.292 333.952,225.427 334.999 C 224.562 336.046,222.898 337.515,221.728 338.263 C 220.200 339.241,219.326 340.167,218.623 341.555 C 217.289 344.187,215.841 345.825,213.782 347.032 C 212.768 347.626,211.632 348.757,211.047 349.755 C 207.325 356.107,194.290 356.136,191.112 349.800 C 190.042 347.667,188.919 346.486,187.049 345.527 C 185.070 344.512,183.686 343.030,182.792 340.965 C 182.100 339.366,181.636 338.911,178.028 336.288 C 177.053 335.580,175.727 334.100,175.082 333.000 C 174.436 331.900,172.702 329.730,171.229 328.177 C 167.869 324.638,166.221 319.765,165.826 312.200 C 165.460 305.207,166.858 302.708,172.082 301.019 C 173.247 300.643,174.740 299.829,175.400 299.212 C 178.585 296.233,181.700 295.792,200.400 295.676 C 206.450 295.638,213.470 295.788,216.000 296.009 M237.754 299.267 C 240.377 300.012,240.352 300.400,237.680 300.400 C 235.880 300.400,235.200 300.254,235.200 299.867 C 235.200 298.726,235.554 298.643,237.754 299.267 M165.947 299.813 C 166.028 299.895,165.804 300.253,165.448 300.609 C 163.484 302.574,163.492 311.867,165.466 320.000 C 167.088 326.680,168.154 328.645,171.221 330.603 C 172.192 331.223,172.816 332.036,173.189 333.167 C 173.956 335.491,175.872 337.545,178.406 338.761 C 180.422 339.729,180.604 339.935,181.063 341.775 C 181.858 344.962,183.866 346.946,186.933 347.574 C 188.101 347.813,188.216 347.986,188.496 349.934 C 189.201 354.832,191.133 356.016,199.661 356.780 C 206.732 357.414,213.506 354.528,215.862 349.879 C 216.424 348.768,217.207 347.576,217.601 347.230 C 217.996 346.883,219.339 345.087,220.586 343.237 C 221.833 341.388,223.517 339.387,224.327 338.792 C 225.137 338.197,226.820 336.561,228.067 335.155 C 233.582 328.938,233.584 328.934,234.829 325.317 C 235.374 323.732,236.088 322.671,237.371 321.542 C 240.157 319.090,241.033 316.766,241.574 310.400 C 242.342 301.350,242.865 300.280,245.215 302.956 C 246.659 304.601,248.514 305.677,251.110 306.376 C 252.466 306.741,253.179 307.303,254.586 309.118 C 255.560 310.373,257.401 312.223,258.678 313.228 C 265.600 318.678,266.122 333.526,259.858 346.769 C 259.606 347.302,258.590 348.154,257.600 348.664 C 256.610 349.173,254.810 350.646,253.600 351.936 C 250.697 355.033,247.658 356.632,241.000 358.566 C 239.020 359.142,236.823 359.798,236.117 360.026 C 235.412 360.253,234.485 360.507,234.058 360.589 C 233.209 360.752,230.703 362.271,229.334 363.453 C 227.340 365.173,226.775 365.600,226.495 365.603 C 226.333 365.604,225.313 366.683,224.229 367.999 C 223.144 369.315,221.927 370.496,221.523 370.625 C 221.119 370.753,220.873 370.995,220.977 371.163 C 221.206 371.533,218.893 373.987,217.608 374.738 C 216.024 375.665,212.112 375.990,202.600 375.983 C 193.409 375.977,192.134 375.923,188.000 375.359 C 185.263 374.985,185.554 375.058,184.553 374.500 C 184.087 374.240,183.584 374.149,183.437 374.297 C 183.289 374.444,183.064 374.168,182.937 373.683 C 182.811 373.197,182.580 372.800,182.426 372.800 C 182.271 372.800,181.444 371.733,180.586 370.430 C 179.729 369.126,178.908 368.133,178.762 368.224 C 178.615 368.314,177.619 367.391,176.548 366.172 C 173.281 362.455,171.502 361.623,159.058 357.985 C 156.219 357.155,154.541 356.395,153.058 355.269 C 151.926 354.409,150.460 353.368,149.800 352.955 C 146.719 351.029,140.279 343.567,139.573 341.106 C 137.560 334.086,138.119 316.436,140.379 315.675 C 141.662 315.243,144.599 312.423,146.026 310.252 C 147.590 307.874,147.855 307.660,149.987 307.068 C 151.243 306.718,153.219 305.795,154.376 305.016 C 155.968 303.945,156.896 303.600,158.186 303.600 C 160.112 303.600,162.000 302.409,162.000 301.194 C 162.000 299.742,164.871 298.738,165.947 299.813 M160.334 372.351 C 160.628 372.537,160.862 372.795,160.855 372.925 C 160.848 373.055,161.373 373.728,162.021 374.423 C 162.669 375.117,163.200 375.541,163.200 375.366 C 163.200 375.191,163.464 375.396,163.787 375.824 C 164.110 376.251,164.380 376.405,164.387 376.166 C 164.404 375.586,160.845 371.998,160.260 372.006 C 159.969 372.010,159.996 372.137,160.334 372.351 M241.745 373.000 C 241.871 373.330,241.790 373.600,241.564 373.600 C 241.338 373.600,241.281 373.808,241.438 374.062 C 241.621 374.357,241.547 374.415,241.235 374.222 C 240.931 374.034,240.791 374.124,240.865 374.460 C 240.988 375.022,239.655 376.800,239.111 376.800 C 238.564 376.800,238.778 375.694,239.369 375.467 C 239.716 375.334,239.854 374.929,239.723 374.429 C 239.606 373.978,239.350 373.708,239.155 373.828 C 238.540 374.208,238.770 373.722,239.477 373.149 C 239.937 372.776,240.057 372.760,239.853 373.100 C 239.688 373.375,239.724 373.600,239.934 373.600 C 240.143 373.600,240.418 373.330,240.545 373.000 C 240.671 372.670,240.941 372.400,241.145 372.400 C 241.348 372.400,241.618 372.670,241.745 373.000 M240.452 373.665 C 240.043 374.320,240.038 374.589,240.426 374.947 C 240.798 375.290,240.846 375.274,240.624 374.882 C 240.463 374.598,240.552 374.098,240.823 373.773 C 241.093 373.447,241.237 373.103,241.142 373.009 C 241.047 372.914,240.737 373.209,240.452 373.665 M158.562 376.062 C 158.396 376.330,158.451 376.416,158.693 376.266 C 159.211 375.946,160.102 376.953,159.697 377.401 C 159.533 377.581,159.637 377.592,159.926 377.424 C 160.345 377.182,160.312 376.966,159.764 376.360 C 158.956 375.467,158.933 375.461,158.562 376.062 M241.534 377.282 C 241.832 377.663,241.931 378.194,241.758 378.482 C 241.532 378.858,241.635 378.847,242.133 378.443 C 242.510 378.137,242.770 377.861,242.710 377.830 C 242.649 377.799,242.240 377.510,241.800 377.187 C 241.065 376.648,241.043 376.655,241.534 377.282 M173.037 380.740 C 172.922 380.926,173.406 381.088,174.114 381.099 C 175.162 381.115,175.252 381.057,174.600 380.787 C 173.532 380.345,173.286 380.338,173.037 380.740 M208.700 384.482 C 208.645 384.747,208.825 384.972,209.100 384.982 C 209.800 385.007,209.748 385.731,209.039 385.835 C 208.404 385.929,207.860 384.949,208.222 384.364 C 208.543 383.846,208.818 383.914,208.700 384.482 M178.899 385.919 C 178.913 386.674,179.073 387.087,179.274 386.886 C 179.475 386.685,179.465 386.123,179.250 385.568 C 178.900 384.662,178.878 384.685,178.899 385.919 M180.032 385.676 C 180.014 386.048,180.183 386.466,180.407 386.604 C 180.630 386.742,180.692 387.051,180.545 387.289 C 180.381 387.555,180.463 387.608,180.758 387.426 C 181.060 387.239,181.103 386.957,180.873 386.664 C 180.672 386.409,180.407 385.930,180.285 385.600 C 180.105 385.112,180.057 385.126,180.032 385.676 M192.603 385.595 C 192.457 385.831,192.649 385.886,193.079 385.732 C 193.476 385.589,193.668 385.618,193.506 385.797 C 193.345 385.975,193.525 386.358,193.906 386.648 C 194.706 387.255,193.968 387.409,192.874 386.864 C 192.465 386.660,191.823 386.726,191.240 387.031 C 190.321 387.512,190.359 387.545,192.171 387.816 C 194.542 388.172,195.199 387.668,194.250 386.221 C 193.545 385.144,193.008 384.940,192.603 385.595 M222.270 386.100 C 222.445 386.375,222.591 386.720,222.594 386.867 C 222.597 387.013,222.690 387.193,222.800 387.267 C 222.910 387.340,222.961 387.331,222.914 387.247 C 222.867 387.163,223.008 386.758,223.228 386.347 C 223.560 385.728,223.485 385.600,222.790 385.600 C 222.218 385.600,222.053 385.758,222.270 386.100 M221.200 386.387 C 221.200 386.601,220.930 386.671,220.600 386.545 C 219.759 386.222,219.849 386.691,220.717 387.156 C 221.287 387.460,221.446 387.381,221.492 386.770 C 221.524 386.346,221.471 386.000,221.375 386.000 C 221.279 386.000,221.200 386.174,221.200 386.387 M182.159 386.900 C 182.001 387.175,182.019 387.267,182.199 387.103 C 182.379 386.940,182.776 387.014,183.080 387.267 C 183.499 387.614,183.752 387.607,184.117 387.239 C 184.495 386.858,184.448 386.810,183.900 387.019 C 183.494 387.174,183.200 387.099,183.200 386.843 C 183.200 386.243,182.516 386.281,182.159 386.900 M218.800 386.707 C 218.800 386.876,218.170 386.984,217.400 386.948 C 216.630 386.912,216.000 387.021,216.000 387.190 C 216.000 387.359,216.720 387.479,217.600 387.455 C 218.830 387.423,220.187 386.400,219.000 386.400 C 218.890 386.400,218.800 386.538,218.800 386.707 M185.015 387.224 C 185.296 387.679,186.400 387.727,186.400 387.285 C 186.400 387.112,186.036 386.943,185.591 386.909 C 185.147 386.876,184.887 387.018,185.015 387.224 M188.000 387.700 C 188.000 388.106,188.872 388.068,189.561 387.632 C 189.963 387.378,189.821 387.294,189.062 387.338 C 188.478 387.372,188.000 387.535,188.000 387.700 ",
        stroke: "none",
        fill: "#a7764f",
        fillRule: "evenodd"
      }
    ))
  );
};
var Bera_default = Bera;

// src/assets/icons/Honey.tsx
var import_react36 = __toESM(require("react"), 1);
var HONEY = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ import_react36.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 40 40",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ import_react36.default.createElement(
      "rect",
      {
        width: "40",
        height: "40",
        rx: "10",
        fill: "url(#paint0_radial_6594_45)"
      }
    ),
    /* @__PURE__ */ import_react36.default.createElement(
      "rect",
      {
        width: "40",
        height: "40",
        rx: "10",
        fill: "url(#paint1_radial_6594_45)"
      }
    ),
    /* @__PURE__ */ import_react36.default.createElement("g", { filter: "url(#filter0_dd_6594_45)" }, /* @__PURE__ */ import_react36.default.createElement(
      "path",
      {
        d: "M14.2918 29.3374H11.2243C10.6889 29.3374 10.2114 29.2175 9.7629 28.9777C9.31436 28.738 8.9671 28.405 8.69219 27.9787L7.05717 25.3147C6.79673 24.9151 6.6665 24.4889 6.6665 24.0094C6.6665 23.5299 6.79673 23.1169 7.05717 22.7173L8.72112 20.0134L7.05717 17.3227C6.79673 16.9231 6.6665 16.4836 6.6665 16.0174C6.6665 15.5512 6.79673 15.1116 7.05717 14.712L8.69219 12.048C8.95263 11.6218 9.31436 11.2888 9.7629 11.049C10.2114 10.8092 10.7034 10.676 11.2243 10.676H14.2918L15.9123 8.03868C16.1727 7.61244 16.5345 7.27944 16.983 7.03968C17.4316 6.79992 17.9235 6.66672 18.4444 6.66672H21.5553C22.0906 6.66672 22.5681 6.7866 23.0167 7.03968C23.4652 7.27944 23.8125 7.61244 24.0874 8.03868L25.7224 10.676H28.7899C29.3252 10.676 29.8027 10.7959 30.2512 11.049C30.6998 11.2888 31.047 11.6218 31.322 12.048L32.9425 14.712C33.2029 15.1116 33.3332 15.5378 33.3332 16.0174C33.3332 16.4969 33.2029 16.9231 32.9425 17.3227L31.2786 20.0134L32.9425 22.7173C33.2029 23.1169 33.3332 23.5432 33.3332 24.0094C33.3332 24.4756 33.2029 24.9151 32.9425 25.3147L31.322 27.9787C31.0615 28.405 30.6998 28.738 30.2512 28.9777C29.8027 29.2175 29.3107 29.3374 28.7899 29.3374H25.7224L24.0874 31.9747C23.8269 32.401 23.4652 32.734 23.0167 32.9737C22.5681 33.2135 22.0762 33.3334 21.5553 33.3334H18.4444C17.909 33.3334 17.4316 33.2135 16.983 32.9737C16.5345 32.734 16.1872 32.401 15.9123 31.9747L14.2918 29.3374ZM25.7224 18.6814H28.8333L30.4249 16.0174L28.8333 13.3534H25.7224L24.0874 16.0174L25.7224 18.6814ZM18.4878 22.6774H21.5263L23.1469 20.0134L21.5263 17.3494H18.4878L16.8673 20.0134L18.4878 22.6774ZM18.4878 14.6854H21.5263L23.1903 11.9814L21.5697 9.35736H18.4589L16.8383 11.9814L18.5023 14.6854H18.4878ZM15.9268 16.0174L14.3062 13.3534H11.2388L9.61821 16.0174L11.2388 18.6814H14.3062L15.9268 16.0174ZM15.9268 24.0094L14.3062 21.3454H11.1954L9.60374 24.0094L11.2243 26.6734H14.2918L15.9123 24.0094H15.9268ZM18.4878 25.3414L16.8239 28.032L18.4444 30.6694H21.5553L23.1758 28.032L21.5119 25.3414H18.4733H18.4878ZM25.7224 26.6734H28.7899L30.4104 24.0094L28.7899 21.3454H25.7224L24.0874 24.0094L25.7224 26.6734Z",
        fill: "#EEE1D2"
      }
    )),
    /* @__PURE__ */ import_react36.default.createElement("defs", null, /* @__PURE__ */ import_react36.default.createElement(
      "filter",
      {
        id: "filter0_dd_6594_45",
        x: "5.6665",
        y: "6.16672",
        width: "28.6666",
        height: "28.6667",
        filterUnits: "userSpaceOnUse",
        "color-interpolation-filters": "sRGB"
      },
      /* @__PURE__ */ import_react36.default.createElement("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
      /* @__PURE__ */ import_react36.default.createElement(
        "feColorMatrix",
        {
          in: "SourceAlpha",
          type: "matrix",
          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
          result: "hardAlpha"
        }
      ),
      /* @__PURE__ */ import_react36.default.createElement("feOffset", { dy: "0.5" }),
      /* @__PURE__ */ import_react36.default.createElement("feGaussianBlur", { stdDeviation: "0.5" }),
      /* @__PURE__ */ import_react36.default.createElement("feComposite", { in2: "hardAlpha", operator: "out" }),
      /* @__PURE__ */ import_react36.default.createElement(
        "feColorMatrix",
        {
          type: "matrix",
          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
        }
      ),
      /* @__PURE__ */ import_react36.default.createElement(
        "feBlend",
        {
          mode: "normal",
          in2: "BackgroundImageFix",
          result: "effect1_dropShadow_6594_45"
        }
      ),
      /* @__PURE__ */ import_react36.default.createElement(
        "feColorMatrix",
        {
          in: "SourceAlpha",
          type: "matrix",
          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
          result: "hardAlpha"
        }
      ),
      /* @__PURE__ */ import_react36.default.createElement("feOffset", { dy: "0.5" }),
      /* @__PURE__ */ import_react36.default.createElement("feGaussianBlur", { stdDeviation: "0.5" }),
      /* @__PURE__ */ import_react36.default.createElement("feComposite", { in2: "hardAlpha", operator: "out" }),
      /* @__PURE__ */ import_react36.default.createElement(
        "feColorMatrix",
        {
          type: "matrix",
          values: "0 0 0 0 0.909804 0 0 0 0 0.490196 0 0 0 0 0.247059 0 0 0 0.75 0"
        }
      ),
      /* @__PURE__ */ import_react36.default.createElement(
        "feBlend",
        {
          mode: "normal",
          in2: "effect1_dropShadow_6594_45",
          result: "effect2_dropShadow_6594_45"
        }
      ),
      /* @__PURE__ */ import_react36.default.createElement(
        "feBlend",
        {
          mode: "normal",
          in: "SourceGraphic",
          in2: "effect2_dropShadow_6594_45",
          result: "shape"
        }
      )
    ), /* @__PURE__ */ import_react36.default.createElement(
      "radialGradient",
      {
        id: "paint0_radial_6594_45",
        cx: "0",
        cy: "0",
        r: "1",
        gradientUnits: "userSpaceOnUse",
        gradientTransform: "translate(20 20) rotate(90) scale(20)"
      },
      /* @__PURE__ */ import_react36.default.createElement("stop", { "stop-color": "#E9D0B4" }),
      /* @__PURE__ */ import_react36.default.createElement("stop", { offset: "1", "stop-color": "#DA9713" })
    ), /* @__PURE__ */ import_react36.default.createElement(
      "radialGradient",
      {
        id: "paint1_radial_6594_45",
        cx: "0",
        cy: "0",
        r: "1",
        gradientUnits: "userSpaceOnUse",
        gradientTransform: "translate(20 20) rotate(90) scale(20)"
      },
      /* @__PURE__ */ import_react36.default.createElement("stop", { "stop-color": "#E9D0B4" }),
      /* @__PURE__ */ import_react36.default.createElement("stop", { offset: "1", "stop-color": "#EC8A19" })
    ))
  );
};
var Honey_default = HONEY;

// src/assets/icons/CreditCard.tsx
var import_react37 = __toESM(require("react"), 1);
var CreditCard = ({
  width = 35,
  height = 35,
  stroke = "#86B8CE",
  ...rest
}) => {
  return /* @__PURE__ */ import_react37.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 44 44",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ import_react37.default.createElement(
      "path",
      {
        d: "M8.67188 18H35.3385",
        stroke,
        strokeWidth: "2",
        strokeMiterlimit: "10",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ import_react37.default.createElement(
      "path",
      {
        d: "M14.5918 11.3334H29.4186C34.1653 11.3334 35.3385 12.5053 35.3385 17.1931V28.1403C35.3385 32.8281 34.1653 34 29.4186 34H14.5918C9.84513 34 8.67188 32.8281 8.67188 28.1403V17.1931C8.67188 12.5053 9.84513 11.3334 14.5918 11.3334Z",
        stroke,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ import_react37.default.createElement(
      "path",
      {
        d: "M12.6719 28.6666H15.3385",
        stroke,
        strokeWidth: "2",
        strokeMiterlimit: "10",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ import_react37.default.createElement(
      "path",
      {
        d: "M18.6719 28.6666H24.0052",
        stroke,
        strokeWidth: "2",
        strokeMiterlimit: "10",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
};
var CreditCard_default = CreditCard;

// src/assets/icons/MiniArrow.tsx
var import_react38 = __toESM(require("react"), 1);
var MiniArrow = ({ width = 21, height = 12, fill = "#86b8ce", ...rest }) => {
  return /* @__PURE__ */ import_react38.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 21 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react38.default.createElement(
      "path",
      {
        d: "M19.2837 1.10756e-07L21 1.78471L11.6463 11.5055C11.4965 11.6622 11.3182 11.7866 11.1219 11.8715C10.9256 11.9563 10.7151 12 10.5024 12C10.2898 12 10.0793 11.9563 9.88294 11.8715C9.68663 11.7866 9.5084 11.6622 9.35852 11.5055L-4.46525e-07 1.78471L1.71627 0.00168221L10.5 9.12538L19.2837 1.10756e-07Z",
        fill
      }
    )
  );
};
var MiniArrow_default = MiniArrow;

// src/assets/icons/KimaNetwork.tsx
var import_react39 = __toESM(require("react"), 1);
var KimaNetwork = ({ width = 120, height = 15, ...rest }) => {
  return /* @__PURE__ */ import_react39.default.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 117 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ import_react39.default.createElement(
      "path",
      {
        d: "M2.8313 0.37146C2.96425 0.371569 3.07153 0.475564 3.07153 0.603882V7.43298C3.06992 7.48069 3.08863 7.55236 3.177 7.46228V7.46912C3.19232 7.4527 3.20493 7.43476 3.22192 7.41833C3.59716 7.04802 4.11033 6.90957 4.59985 6.90955C5.90094 6.90955 6.18073 5.79073 6.18091 5.3822C6.18091 4.91639 6.33859 4.44568 6.71216 4.09509C7.05155 3.77583 7.49284 3.6137 7.93286 3.61365H7.94458C8.3999 3.61529 8.85566 3.78678 9.19849 4.12732C9.87568 4.79887 9.86222 5.87426 9.16626 6.52771C8.85072 6.82551 8.44788 6.98319 8.04028 7.00623C6.50189 7.05408 6.25317 8.26411 6.25317 8.60974C6.25327 8.92609 6.47861 10.1795 8.04419 10.2289C8.40076 10.2476 8.75318 10.3727 9.04712 10.6019L9.16626 10.7045C9.51936 11.037 9.69849 11.4769 9.69849 11.9164V11.9261C9.69849 12.3508 9.53136 12.7757 9.20044 13.1049C8.8559 13.4471 8.39874 13.6185 7.94165 13.6185C7.49994 13.6185 7.05622 13.4589 6.71509 13.1381C6.34152 12.7875 6.18481 12.2121 6.18481 11.85C6.18448 11.5856 5.90417 10.3229 4.60376 10.3226C4.10587 10.3226 3.5991 10.1865 3.22388 9.81482C3.20858 9.79842 3.19644 9.78141 3.18286 9.76501V9.7699C3.09269 9.6796 3.07553 9.74983 3.07544 9.79919V13.1322C3.07544 13.2606 2.96728 13.3646 2.83423 13.3646H0.383057C0.250118 13.3645 0.142822 13.2605 0.142822 13.1322V0.603882C0.142822 0.475574 0.250118 0.371586 0.383057 0.37146H2.8313ZM109.276 0.37146C109.409 0.371608 109.516 0.475589 109.516 0.603882V7.43298C109.514 7.4807 109.533 7.55242 109.621 7.46228V7.46912C109.637 7.45268 109.649 7.43477 109.666 7.41833C110.042 7.04801 110.555 6.90956 111.044 6.90955C112.345 6.90955 112.625 5.79073 112.625 5.3822C112.625 4.91659 112.782 4.44564 113.156 4.09509C113.495 3.77581 113.937 3.61368 114.377 3.61365H114.389C114.844 3.61529 115.3 3.78676 115.643 4.12732C116.32 4.79887 116.307 5.87426 115.611 6.52771C115.295 6.82553 114.892 6.98319 114.485 7.00623C112.946 7.05404 112.698 8.2641 112.698 8.60974C112.698 8.92609 112.923 10.1795 114.489 10.2289C114.845 10.2477 115.198 10.3727 115.491 10.6019L115.611 10.7045C115.964 11.037 116.143 11.4769 116.143 11.9164V11.9261C116.143 12.3508 115.976 12.7757 115.645 13.1049C115.3 13.4471 114.843 13.6185 114.386 13.6185C113.944 13.6185 113.501 13.4589 113.159 13.1381C112.786 12.7875 112.629 12.2121 112.629 11.85C112.629 11.5856 112.348 10.3229 111.048 10.3226C110.55 10.3226 110.043 10.1868 109.667 9.81482C109.652 9.79844 109.641 9.7814 109.627 9.76501V9.7699C109.537 9.6796 109.519 9.74983 109.519 9.79919V13.1322C109.519 13.2606 109.412 13.3646 109.279 13.3646H106.827C106.694 13.3645 106.587 13.2605 106.587 13.1322V0.603882C106.587 0.47555 106.694 0.371546 106.827 0.37146H109.276ZM35.5911 4.0238C36.5163 4.0238 37.3248 4.17045 38.0159 4.46326C38.7185 4.75606 39.2632 5.18924 39.6497 5.76306C40.0479 6.32525 40.2463 7.02233 40.2463 7.85388V12.9545C40.2463 13.1257 40.108 13.265 39.9368 13.265H37.9036C37.7325 13.2648 37.594 13.1255 37.594 12.9545V12.3334C37.3442 12.6376 37.0398 12.8901 36.6799 13.0892C36.1414 13.3935 35.5093 13.5462 34.7834 13.5463C34.0926 13.5463 33.4774 13.423 32.9387 13.1771C32.4117 12.9195 32.0011 12.5675 31.7083 12.1224C31.4156 11.6775 31.2698 11.1561 31.2698 10.559C31.2698 9.95008 31.4507 9.42875 31.8137 8.99548C32.1767 8.56222 32.6981 8.22874 33.3772 7.99451C34.0565 7.74855 34.8592 7.62537 35.7844 7.62537H37.3713C37.3865 7.62537 37.4017 7.62718 37.4163 7.62927C37.3637 7.21447 37.1902 6.89127 36.8909 6.65955C36.5395 6.37846 36.0536 6.23767 35.4329 6.23767C34.9644 6.23769 34.5195 6.31981 34.0979 6.48376C33.7856 6.60522 33.5018 6.76469 33.2473 6.96326C33.1035 7.07544 32.8925 7.06273 32.7786 6.92029L31.7659 5.65466C31.6643 5.52769 31.6773 5.34255 31.804 5.2406C32.232 4.89615 32.7448 4.6196 33.342 4.41052C34.0565 4.15286 34.8064 4.02382 35.5911 4.0238ZM61.9348 4.0238C62.8365 4.02387 63.6384 4.22331 64.3411 4.62146C65.0438 5.00797 65.5942 5.55251 65.9924 6.25525C66.3906 6.94616 66.59 7.754 66.5901 8.67908C66.5901 8.68648 66.5867 8.69359 66.5852 8.70056C66.5884 8.71845 66.5901 8.737 66.5901 8.75525V9.33533C66.5901 9.50655 66.4508 9.64587 66.2795 9.64587H60.1184C60.1723 9.83735 60.2433 10.0137 60.3352 10.1732C60.5577 10.548 60.8687 10.8286 61.2668 11.016C61.665 11.2034 62.1217 11.2972 62.637 11.2972C63.4766 11.2972 64.225 11.0405 64.8811 10.5267C65.0216 10.4169 65.2265 10.4305 65.3391 10.5687L66.3987 11.8734C66.4978 11.9955 66.4904 12.1738 66.3723 12.2777C65.955 12.6447 65.4304 12.9388 64.7981 13.1595C64.0719 13.4172 63.2869 13.5463 62.4436 13.5463C61.3545 13.5462 60.406 13.3468 59.5979 12.9486C58.7898 12.5504 58.1572 11.9941 57.7004 11.2797C57.2554 10.5652 57.0325 9.73911 57.0325 8.80212C57.0325 7.85363 57.2496 7.02232 57.6829 6.30798C58.1162 5.58184 58.7019 5.01968 59.4397 4.62146C60.1893 4.22324 61.0213 4.0238 61.9348 4.0238ZM93.5354 4.0238C94.5427 4.0238 95.4274 4.22911 96.1887 4.63904C96.9615 5.03724 97.5591 5.59366 97.9807 6.30798C98.4139 7.02226 98.6301 7.84786 98.6301 8.78455C98.6301 9.70975 98.414 10.536 97.9807 11.2621C97.5591 11.9764 96.9616 12.5387 96.1887 12.9486C95.4274 13.3468 94.5427 13.5463 93.5354 13.5463C92.5283 13.5463 91.6384 13.3467 90.8655 12.9486C90.1042 12.5387 89.5068 11.9764 89.0735 11.2621C88.6518 10.5359 88.4407 9.70982 88.4407 8.78455C88.4407 7.84771 88.6519 7.02234 89.0735 6.30798C89.5068 5.59353 90.1042 5.03726 90.8655 4.63904C91.6384 4.22919 92.5283 4.02382 93.5354 4.0238ZM14.3801 4.30505C14.5513 4.30505 14.6907 4.44341 14.6907 4.61462V12.9545C14.6907 13.1257 14.5514 13.265 14.3801 13.265H12.0315C11.8603 13.265 11.7209 13.1257 11.7209 12.9545V4.61462C11.721 4.44341 11.8603 4.30505 12.0315 4.30505H14.3801ZM27.1301 4.0238C28.1374 4.0238 28.9283 4.34642 29.5022 4.9906C30.0759 5.63476 30.3625 6.56571 30.3625 7.78357V12.9545C30.3625 13.1257 30.2242 13.265 30.053 13.265H27.7034C27.5324 13.2648 27.3938 13.1255 27.3938 12.9545V7.97693C27.3938 7.46159 27.2882 7.08031 27.0774 6.83435C26.8666 6.577 26.5739 6.44868 26.1995 6.44861C25.9301 6.44861 25.6778 6.52486 25.4436 6.67712C25.2095 6.81769 25.0157 7.04559 24.8635 7.36169C24.723 7.67783 24.6536 8.08778 24.6536 8.59119V12.9545C24.6536 13.1257 24.5142 13.265 24.343 13.265H21.9944C21.8232 13.265 21.6838 13.1257 21.6838 12.9545V7.97693C21.6838 7.46159 21.5783 7.08031 21.3674 6.83435C21.1567 6.57702 20.864 6.44863 20.4895 6.44861C20.2201 6.44861 19.9679 6.52486 19.7336 6.67712C19.4997 6.81766 19.3067 7.04579 19.1545 7.36169C19.014 7.67783 18.9436 8.08777 18.9436 8.59119V12.9545C18.9436 13.1257 18.8043 13.265 18.6331 13.265H16.2844C16.1132 13.265 15.9739 13.1257 15.9739 12.9545V4.61462C15.9741 4.44356 16.1133 4.30505 16.2844 4.30505H18.6155C18.7866 4.30505 18.9258 4.44356 18.926 4.61462V5.6781C19.0752 5.30798 19.2618 5.01412 19.4875 4.79724C19.7921 4.50443 20.1206 4.305 20.4719 4.19958C20.8232 4.08251 21.1627 4.02384 21.4905 4.0238C22.1815 4.0238 22.7671 4.2057 23.2473 4.56873C23.6521 4.87478 23.9442 5.31812 24.1243 5.8988C24.2986 5.46494 24.5212 5.121 24.7932 4.86755C25.1446 4.55132 25.5259 4.33429 25.9358 4.21716C26.3573 4.08837 26.7554 4.02382 27.1301 4.0238ZM47.4836 0.703491C47.5871 0.703643 47.684 0.755063 47.7415 0.841187L52.884 8.55505V1.01306C52.8841 0.841912 53.0234 0.703491 53.1946 0.703491H55.5432C55.7144 0.703491 55.8537 0.841912 55.8538 1.01306V12.9545C55.8538 13.1257 55.7144 13.265 55.5432 13.265H52.8743C52.7708 13.2649 52.6739 13.2125 52.6165 13.1263L47.4739 5.41248V12.9545C47.4739 13.1257 47.3346 13.265 47.1633 13.265H44.8147C44.6435 13.265 44.5042 13.1257 44.5042 12.9545V1.01306C44.5042 0.841913 44.6435 0.703491 44.8147 0.703491H47.4836ZM71.0461 2.09119C71.2172 2.09143 71.3557 2.23066 71.3557 2.40173V4.30505H73.0305C73.2017 4.30505 73.3409 4.44351 73.3411 4.61462V6.349C73.3411 6.52022 73.2017 6.65857 73.0305 6.65857H71.3557V9.96228C71.3558 10.3017 71.4203 10.5415 71.5491 10.682C71.6779 10.8108 71.9067 10.8754 72.2346 10.8754H73.1184C73.2896 10.8754 73.429 11.0147 73.429 11.1859V12.9545C73.429 13.1257 73.2896 13.265 73.1184 13.265H71.1096C70.1844 13.265 69.499 13.0421 69.054 12.597C68.609 12.152 68.387 11.4665 68.387 10.5414V6.65857H67.3088C67.1376 6.65857 66.9983 6.52022 66.9983 6.349V4.61462C66.9984 4.44351 67.1377 4.30505 67.3088 4.30505H68.387V2.40173C68.387 2.23056 68.5254 2.09127 68.6965 2.09119H71.0461ZM76.4729 4.30505C76.6153 4.30526 76.7395 4.40216 76.7737 4.54041L78.1448 10.1L79.9485 4.5199C79.9898 4.39203 80.1091 4.3052 80.2434 4.30505H82.0764C82.2109 4.30506 82.33 4.39192 82.3713 4.5199L84.1643 10.0687L85.5295 4.54041C85.5638 4.40209 85.6878 4.30505 85.8303 4.30505H87.9963C88.2047 4.30505 88.3541 4.50621 88.2932 4.70544L85.7424 13.0453C85.7026 13.1756 85.5819 13.265 85.4456 13.265H83.0842C82.9525 13.265 82.8347 13.1814 82.7913 13.057L81.1106 8.24451L79.4573 13.0551C79.4142 13.1803 79.2967 13.265 79.1643 13.265H76.804C76.6677 13.265 76.5479 13.1756 76.5081 13.0453L73.9563 4.70544C73.8955 4.50624 74.0449 4.30505 74.2532 4.30505H76.4729ZM105.365 4.14685C105.536 4.14685 105.675 4.28536 105.675 4.45642V6.47205C105.675 6.64324 105.536 6.78162 105.365 6.78162H105.113C104.55 6.78163 104.082 6.87554 103.707 7.06287C103.344 7.23855 103.069 7.52011 102.881 7.90662C102.694 8.28137 102.601 8.77921 102.601 9.39978V12.9545C102.601 13.1257 102.462 13.265 102.29 13.265H99.9417C99.7704 13.265 99.6311 13.1257 99.6311 12.9545V4.61462C99.6312 4.44352 99.7705 4.30505 99.9417 4.30505H102.273C102.444 4.30505 102.583 4.44352 102.583 4.61462V5.82263C102.664 5.63535 102.757 5.46862 102.864 5.32361C103.191 4.87854 103.573 4.57449 104.006 4.41052C104.451 4.23488 104.873 4.14686 105.271 4.14685H105.365ZM37.4358 9.41052C37.4151 9.41486 37.3933 9.41736 37.3713 9.41736H35.9602C35.4333 9.41736 35.0176 9.5113 34.7131 9.69861C34.4205 9.88592 34.2738 10.1316 34.2737 10.4359C34.2737 10.7287 34.391 10.9634 34.6252 11.139C34.8711 11.3146 35.1813 11.4027 35.5559 11.4027C35.919 11.4027 36.2533 11.3206 36.5579 11.1566C36.8622 10.9927 37.1078 10.7696 37.2952 10.4886C37.348 10.414 37.3945 10.3367 37.4358 10.2572V9.41052ZM93.5354 6.44861C93.1372 6.44862 92.7803 6.54834 92.4641 6.74744C92.1596 6.94655 91.9191 7.22127 91.7434 7.57263C91.5795 7.92391 91.4974 8.32791 91.4973 8.78455C91.4973 9.24133 91.5794 9.64607 91.7434 9.99744C91.9191 10.3487 92.1597 10.6236 92.4641 10.8226C92.7803 11.0217 93.1373 11.1214 93.5354 11.1215C93.9452 11.1215 94.3022 11.0216 94.6067 10.8226C94.9111 10.6236 95.1458 10.3487 95.3098 9.99744C95.4855 9.64607 95.5735 9.24133 95.5735 8.78455C95.5734 8.32791 95.4855 7.92391 95.3098 7.57263C95.1458 7.2213 94.9112 6.94653 94.6067 6.74744C94.3022 6.54838 93.9453 6.44861 93.5354 6.44861ZM61.9172 6.25525C61.5424 6.25525 61.2081 6.35497 60.9153 6.55408C60.6343 6.74147 60.4112 7.01629 60.2473 7.37927C60.1734 7.54291 60.118 7.72487 60.0774 7.92419H63.6682C63.6339 7.69201 63.5794 7.48065 63.4983 7.29138C63.3578 6.96353 63.1523 6.71217 62.8831 6.5365C62.6255 6.34917 62.3035 6.25532 61.9172 6.25525ZM13.1975 0.0179443C13.6775 0.0180312 14.0757 0.176409 14.3918 0.492554C14.7197 0.797037 14.884 1.18335 14.884 1.65173C14.884 2.10841 14.7196 2.49472 14.3918 2.81091C14.0757 3.11535 13.6775 3.26786 13.1975 3.26794C12.729 3.26794 12.3301 3.11543 12.0022 2.81091C11.6745 2.49474 11.511 2.10836 11.511 1.65173C11.511 1.1834 11.6745 0.797023 12.0022 0.492554C12.3301 0.176322 12.729 0.0179443 13.1975 0.0179443Z",
        fill: "black"
      }
    )
  );
};
var KimaNetwork_default = KimaNetwork;

// src/utils/constants.tsx
var import_networks = require("@reown/appkit/networks");
var ChainName = /* @__PURE__ */ ((ChainName4) => {
  ChainName4["ETHEREUM"] = "ETH";
  ChainName4["POLYGON"] = "POL";
  ChainName4["AVALANCHE"] = "AVX";
  ChainName4["SOLANA"] = "SOL";
  ChainName4["BASE"] = "BASE";
  ChainName4["BSC"] = "BSC";
  ChainName4["ARBITRUM"] = "ARB";
  ChainName4["OPTIMISM"] = "OPT";
  ChainName4["POLYGON_ZKEVM"] = "ZKE";
  ChainName4["TRON"] = "TRX";
  ChainName4["FIAT"] = "FIAT";
  ChainName4["BTC"] = "BTC";
  ChainName4["BERA"] = "BERA";
  return ChainName4;
})(ChainName || {});
var CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET = {
  ["ETH" /* ETHEREUM */]: import_networks.mainnet,
  ["POL" /* POLYGON */]: import_networks.polygon,
  ["AVX" /* AVALANCHE */]: import_networks.avalanche,
  ["BASE" /* BASE */]: import_networks.base,
  ["BSC" /* BSC */]: import_networks.bsc,
  ["OPT" /* OPTIMISM */]: import_networks.optimism,
  ["ARB" /* ARBITRUM */]: import_networks.arbitrum,
  ["ZKE" /* POLYGON_ZKEVM */]: import_networks.polygonZkEvm
};
var CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET = {
  ["ETH" /* ETHEREUM */]: import_networks.sepolia,
  ["POL" /* POLYGON */]: import_networks.polygonAmoy,
  ["AVX" /* AVALANCHE */]: import_networks.avalancheFuji,
  ["BSC" /* BSC */]: import_networks.bscTestnet,
  ["BASE" /* BASE */]: import_networks.baseSepolia,
  ["OPT" /* OPTIMISM */]: import_networks.optimismSepolia,
  ["ARB" /* ARBITRUM */]: import_networks.arbitrumSepolia,
  ["ZKE" /* POLYGON_ZKEVM */]: import_networks.polygonZkEvmCardona,
  ["BERA" /* BERA */]: import_networks.berachainBepolia
};
var CHAIN_NAMES_TO_STRING = {
  ["ETH" /* ETHEREUM */]: "Ethereum",
  ["POL" /* POLYGON */]: "Polygon",
  ["AVX" /* AVALANCHE */]: "Avalanche",
  ["SOL" /* SOLANA */]: "Solana",
  ["BSC" /* BSC */]: "BNB Smart Chain",
  ["OPT" /* OPTIMISM */]: "Optimism",
  ["ARB" /* ARBITRUM */]: "Arbitrum",
  ["ZKE" /* POLYGON_ZKEVM */]: "Polygon zkEVM",
  ["TRX" /* TRON */]: "Tron",
  ["FIAT" /* FIAT */]: "Pay with FIAT",
  ["BTC" /* BTC */]: "Bitcoin",
  ["BASE" /* BASE */]: "Base",
  ["BERA" /* BERA */]: "Bera"
};
var CHAIN_STRING_TO_NAME = {
  ["Ethereum"]: "ETH" /* ETHEREUM */,
  ["Polygon"]: "POL" /* POLYGON */,
  ["Avalanche"]: "AVX" /* AVALANCHE */,
  ["Solana"]: "SOL" /* SOLANA */,
  ["Binance"]: "BSC" /* BSC */,
  ["Optimism"]: "OPT" /* OPTIMISM */,
  ["Arbitrum"]: "ARB" /* ARBITRUM */,
  ["Polygon zkEVM"]: "ZKE" /* POLYGON_ZKEVM */,
  ["Tron"]: "TRX" /* TRON */,
  ["Pay with FIAT"]: "FIAT" /* FIAT */,
  ["Bitcoin"]: "BTC" /* BTC */,
  ["Base"]: "BASE" /* BASE */,
  ["Bera"]: "BERA" /* BERA */
};
var networkOptions = [
  {
    id: "ARB" /* ARBITRUM */,
    label: "Arbitrum",
    icon: Arbitrum_default
  },
  {
    id: "AVX" /* AVALANCHE */,
    label: "Avalanche",
    icon: Avalanche_default
  },
  { id: "BASE" /* BASE */, label: "Base", icons: Base_default },
  {
    id: "BSC" /* BSC */,
    label: "Binance",
    icon: BSC_default
  },
  {
    id: "BTC" /* BTC */,
    label: "Bitcoin",
    icon: BTC_default
  },
  {
    id: "ETH" /* ETHEREUM */,
    label: "Ethereum",
    icon: Ethereum_default
  },
  {
    id: "FIAT" /* FIAT */,
    label: "Pay with FIAT",
    icon: Bank_default
  },
  {
    id: "OPT" /* OPTIMISM */,
    label: "Optimism",
    icon: Optimism_default
  },
  {
    id: "POL" /* POLYGON */,
    label: "Polygon",
    icon: Polygon_default
  },
  {
    id: "ZKE" /* POLYGON_ZKEVM */,
    label: "Polygon zkEVM",
    icon: Polygon_zkEVM_default
  },
  {
    id: "SOL" /* SOLANA */,
    label: "Solana",
    icon: Solana_default
  },
  {
    id: "TRX" /* TRON */,
    label: "Tron",
    icon: Tron_default
  },
  {
    id: "BERA" /* BERA */,
    label: "BERA",
    icon: Bera_default
  }
];
var CLUSTER = "devnet";
var SOLANA_HOST = (0, import_web3.clusterApiUrl)(CLUSTER);
var isEVMChain = (chainId) => chainId === "ETH" /* ETHEREUM */ || chainId === "POL" /* POLYGON */ || chainId === "AVX" /* AVALANCHE */ || chainId === "BSC" /* BSC */ || chainId === "OPT" /* OPTIMISM */ || chainId === "ARB" /* ARBITRUM */ || chainId === "ZKE" /* POLYGON_ZKEVM */ || chainId === "BASE" /* BASE */ || chainId === "BERA" /* BERA */;
var lightDemoAccounts = {
  EVM: "0x1150bd27bA25fa13806C98324F201dfe815A4502",
  // EVM: '0x10962c43ea1bfE1186Dbf59985Df4E1ce94Ca4a9', // personal for testing
  SOL: "GtJAoe2hfKqczCnp3hdKnMK4JC96juQWv5nkn5qgpbZ8",
  // SOL: 'HeiUB7M6WESHurGs2nBbX9tyGC3RcTwtnJZjdRigNZRT', // personal for testing
  TRX: "TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU"
  // TRX: 'TL6yGtzbHfQdBRFYh4TLFoU5iiPMmpQtur' // personal for testing
};
var lightDemoNetworks = ["ARB", "AVX", "BASE", "OPT", "BSC", "SOL", "TRX"];

// src/interface.tsx
var NetworkOptions = /* @__PURE__ */ ((NetworkOptions4) => {
  NetworkOptions4["testnet"] = "testnet";
  NetworkOptions4["mainnet"] = "mainnet";
  return NetworkOptions4;
})(NetworkOptions || {});
var ModeOptions = /* @__PURE__ */ ((ModeOptions3) => {
  ModeOptions3["payment"] = "payment";
  ModeOptions3["bridge"] = "bridge";
  ModeOptions3["status"] = "status";
  ModeOptions3["light"] = "light";
  return ModeOptions3;
})(ModeOptions || {});
var CurrencyOptions = /* @__PURE__ */ ((CurrencyOptions2) => {
  CurrencyOptions2["USDK"] = "USDK";
  CurrencyOptions2["USDC"] = "USDC";
  CurrencyOptions2["USDT"] = "USDT";
  CurrencyOptions2["WBTC"] = "WBTC";
  CurrencyOptions2["G$"] = "GDOLLAR";
  return CurrencyOptions2;
})(CurrencyOptions || {});
var ColorModeOptions = /* @__PURE__ */ ((ColorModeOptions2) => {
  ColorModeOptions2["light"] = "light";
  ColorModeOptions2["dark"] = "dark";
  return ColorModeOptions2;
})(ColorModeOptions || {});
var DAppOptions = /* @__PURE__ */ ((DAppOptions2) => {
  DAppOptions2["None"] = "none";
  DAppOptions2["LPAdd"] = "LPAdd";
  DAppOptions2["LPDrain"] = "LPDrain";
  return DAppOptions2;
})(DAppOptions || {});

// src/store/optionSlice.tsx
var import_chains = require("viem/chains");
var { createSlice } = toolkitRaw;
var initialServiceFee = {
  feeId: "",
  sourceFee: {
    value: BigInt(0),
    decimals: 0
  },
  kimaFee: {
    value: BigInt(0),
    decimals: 0
  },
  targetFee: {
    value: BigInt(0),
    decimals: 0
  },
  totalFee: {
    value: BigInt(0),
    decimals: 0
  },
  transactionValues: {
    originChain: "",
    originAddress: "",
    originSymbol: "",
    targetChain: "",
    targetAddress: "",
    targetSymbol: "",
    feeFromOrigin: {
      allowanceAmount: {
        value: BigInt(0),
        decimals: 0
      },
      submitAmount: {
        value: BigInt(0),
        decimals: 0
      },
      message: ""
    },
    feeFromTarget: {
      allowanceAmount: {
        value: BigInt(0),
        decimals: 0
      },
      submitAmount: {
        value: BigInt(0),
        decimals: 0
      },
      message: ""
    }
  },
  peggedTo: "",
  expiration: ""
};
var initialState = {
  networkOption: "testnet" /* testnet */,
  networks: [],
  theme: { colorMode: "light" /* light */ },
  tokenOptions: {},
  pendingTxs: 0,
  pendingTxData: [],
  kimaExplorerUrl: "https://explorer.sardis.kima.network",
  mode: "bridge" /* bridge */,
  sourceChain: {
    ...import_chains.arbitrumSepolia,
    shortName: "ARB",
    supportedTokens: [],
    supportedLocations: ["origin", "target"],
    compatibility: "EVM" /* EVM */
  },
  targetChain: {
    ...import_chains.sepolia,
    shortName: "SEP",
    supportedTokens: [],
    supportedLocations: ["origin", "target"],
    compatibility: "EVM" /* EVM */
  },
  sourceAddress: "",
  targetAddress: "",
  bitcoinAddress: "",
  bitcoinPubkey: "",
  solanaConnectModal: false,
  tronConnectModal: false,
  accountDetailsModal: false,
  helpPopup: false,
  hashPopup: false,
  pendingTxPopup: false,
  bankPopup: false,
  provider: void 0,
  dAppOption: "none" /* None */,
  solanaProvider: void 0,
  tronProvider: void 0,
  submitted: false,
  amount: "",
  feeDeduct: false,
  initChainFromProvider: false,
  serviceFee: initialServiceFee,
  backendUrl: "",
  txId: -1,
  ccTransactionId: "",
  ccTransactionStatus: "idle",
  sourceCurrency: "USDK",
  targetCurrency: "USDK",
  compliantOption: true,
  sourceCompliant: null,
  targetCompliant: null,
  useFIAT: false,
  bankDetails: {
    iban: "",
    recipient: ""
  },
  targetNetworkFetching: false,
  signature: "",
  uuid: "",
  kycStatus: "",
  expireTime: "1 hour"
};
var optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    initialize: (state) => {
      Object.assign(state, initialState);
    },
    setNetworkOption: (state, action) => {
      state.networkOption = action.payload;
    },
    setNetworks: (state, action) => {
      state.networks = action.payload;
    },
    setPendingTxs: (state, action) => {
      state.pendingTxs = action.payload;
    },
    setPendingTxData: (state, action) => {
      state.pendingTxData = action.payload;
    },
    setTokenOptions: (state, action) => {
      state.tokenOptions = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setKimaExplorer: (state, action) => {
      state.kimaExplorerUrl = action.payload;
    },
    setSourceChain: (state, action) => {
      state.sourceChain = action.payload;
    },
    setTargetChain: (state, action) => {
      state.targetChain = action.payload;
    },
    setSourceAddress: (state, action) => {
      state.sourceAddress = action.payload;
    },
    setTargetAddress: (state, action) => {
      state.targetAddress = action.payload;
    },
    setBitcoinAddress: (state, action) => {
      state.bitcoinAddress = action.payload;
    },
    setBitcoinPubkey: (state, action) => {
      state.bitcoinPubkey = action.payload;
    },
    setSolanaConnectModal: (state, action) => {
      state.solanaConnectModal = action.payload;
    },
    setTronConnectModal: (state, action) => {
      state.tronConnectModal = action.payload;
    },
    setAccountDetailsModal: (state, action) => {
      state.accountDetailsModal = action.payload;
    },
    setHelpPopup: (state, action) => {
      state.helpPopup = action.payload;
    },
    setHashPopup: (state, action) => {
      state.hashPopup = action.payload;
    },
    setPendingTxPopup: (state, action) => {
      state.pendingTxPopup = action.payload;
    },
    setBankPopup: (state, action) => {
      state.bankPopup = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setDappOption: (state, action) => {
      state.dAppOption = action.payload;
    },
    setSolanaProvider: (state, action) => {
      state.solanaProvider = action.payload;
    },
    setTronProvider: (state, action) => {
      state.tronProvider = action.payload;
    },
    setSubmitted: (state, action) => {
      state.submitted = action.payload;
    },
    setTransactionOption: (state, action) => {
      state.transactionOption = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setInitChainFromProvider: (state, action) => {
      state.initChainFromProvider = action.payload;
    },
    setServiceFee: (state, action) => {
      state.serviceFee = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setFeeDeduct: (state, action) => {
      state.feeDeduct = action.payload;
    },
    setBackendUrl: (state, action) => {
      state.backendUrl = action.payload;
    },
    setTxId: (state, action) => {
      state.txId = action.payload;
    },
    setCCTransactionId: (state, action) => {
      state.ccTransactionId = action.payload;
    },
    setCCTransactionStatus: (state, action) => {
      state.ccTransactionStatus = action.payload;
    },
    setSourceCurrency: (state, action) => {
      state.sourceCurrency = action.payload;
    },
    setTargetCurrency: (state, action) => {
      state.targetCurrency = action.payload;
    },
    setCompliantOption: (state, action) => {
      state.compliantOption = action.payload;
    },
    setSourceCompliant: (state, action) => {
      state.sourceCompliant = action.payload;
    },
    setTargetCompliant: (state, action) => {
      state.targetCompliant = action.payload;
    },
    setUseFIAT: (state, action) => {
      state.useFIAT = action.payload;
    },
    setBankDetails: (state, action) => {
      state.bankDetails = action.payload;
    },
    setTargetChainFetching: (state, action) => {
      state.targetNetworkFetching = action.payload;
    },
    setSignature: (state, action) => {
      state.signature = action.payload;
    },
    setUuid: (state, action) => {
      state.uuid = action.payload;
    },
    setKYCStatus: (state, action) => {
      state.kycStatus = action.payload;
    },
    setExpireTime: (state, action) => {
      state.expireTime = action.payload;
    },
    resetServiceFee: (state) => {
      state.serviceFee = initialServiceFee;
    }
  }
});
var {
  initialize,
  setNetworkOption,
  setNetworks,
  setTokenOptions,
  setKimaExplorer,
  setTheme,
  setSourceChain,
  setTargetChain,
  setSourceAddress,
  setTargetAddress,
  setBitcoinAddress,
  setBitcoinPubkey,
  setSolanaConnectModal,
  setTronConnectModal,
  setAccountDetailsModal,
  setHelpPopup,
  setHashPopup,
  setPendingTxPopup,
  setBankPopup,
  setSolanaProvider,
  setTronProvider,
  setProvider,
  setDappOption,
  setSubmitted,
  setTransactionOption,
  setAmount,
  setInitChainFromProvider,
  setServiceFee,
  setMode,
  setFeeDeduct,
  setBackendUrl,
  setTxId,
  setCCTransactionId,
  setCCTransactionStatus,
  setSourceCurrency,
  setTargetCurrency,
  setCompliantOption,
  setSourceCompliant,
  setTargetCompliant,
  setUseFIAT,
  setBankDetails,
  setTargetChainFetching,
  setSignature,
  setUuid,
  setKYCStatus,
  setExpireTime,
  setPendingTxData,
  setPendingTxs,
  resetServiceFee
} = optionSlice.actions;
var optionSlice_default = optionSlice.reducer;

// src/store/pluginSlice.tsx
var import_toolkit = require("@reduxjs/toolkit");
var initialState2 = {
  isIndexed: false,
  plugins: {}
  // Empty record of plugins
};
var pluginSlice = (0, import_toolkit.createSlice)({
  name: "plugins",
  initialState: initialState2,
  reducers: {
    // Action to register a plugin with its metadata
    registerPlugin: (state, action) => {
      const { id, pluginData } = action.payload;
      state.plugins[id] = { id, pluginData };
    },
    // update index flag
    setPluginIsIndexed: (state, action) => {
      state.isIndexed = action.payload;
    },
    // Action to update plugin data (e.g., networks or other dynamic values)
    updatePluginData: (state, action) => {
      const { id, pluginData } = action.payload;
      if (state.plugins[id]) {
        state.plugins[id].pluginData = {
          ...state.plugins[id].pluginData,
          // Merge with existing plugin data
          ...pluginData
        };
      }
    }
  }
});
var { registerPlugin, setPluginIsIndexed, updatePluginData } = pluginSlice.actions;
var selectPluginIsIndexed = (state) => state.plugins.isIndexed;
var selectAllPlugins = (state) => Object.values(state.plugins.plugins);
var pluginReducer = pluginSlice.reducer;
var pluginSlice_default = pluginReducer;

// src/store/index.tsx
function safeBigIntReplacer(key, value) {
  return typeof value === "bigint" ? value.toString() : value;
}
var store = (0, import_toolkit2.configureStore)({
  reducer: {
    option: optionSlice_default,
    plugins: pluginSlice_default
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ["payload"],
      ignoredPaths: ["option"]
      // Ignore serialization check for `option`
    }
  }),
  devTools: {
    serialize: {
      replacer: safeBigIntReplacer
    }
  }
});
var store_default = store;

// src/utils/logger.ts
var import_loglevel = __toESM(require("loglevel"), 1);
var DEFAULT_LOG_LEVEL = process?.env.LOG_LEVEL || process?.env.NEXT_PUBLIC_LOG_LEVEL || process?.env.VITE_LOG_LEVEL || "error";
console.info("Setting log level from ENV to:", DEFAULT_LOG_LEVEL);
import_loglevel.default.setLevel(DEFAULT_LOG_LEVEL);
var logger_default = import_loglevel.default;

// src/pluginRegistry.ts
var pluginRegistry = {};
var pluginsByChain = {};
var initializePlugins = (plugins) => {
  for (const plugin of plugins) {
    const { data } = plugin.initialize();
    registerPluginProvider(data.id, plugin);
    store_default.dispatch(registerPlugin(data));
    pluginRegistry[data.id] = plugin;
    logger_default.debug("initialized plugin::", data.id);
  }
};
var registerPluginProvider = (id, plugin) => {
  if (pluginRegistry[id]) {
    logger_default.warn(`Plugin provider with id "${id}" is already registered.`);
  }
  pluginRegistry[id] = plugin;
};
var indexPluginsByChain = (chains) => {
  pluginsByChain = {};
  const plugins = Object.values(pluginRegistry);
  for (const chain of chains) {
    const plugin = plugins.find((p) => p.isCompatible(chain));
    if (!plugin) {
      logger_default.warn(
        `indexPluginsByChain: No plugin found for chain ${chain.shortName}`
      );
      continue;
    }
    pluginsByChain[chain.shortName] = plugin;
  }
  logger_default.debug("pluginsByChain::", pluginsByChain);
  store_default.dispatch(setPluginIsIndexed(true));
};
var getPlugin = (chain) => {
  logger_default.debug("getPlugin::", { chain, pluginsByChain });
  if (!chain) return void 0;
  return pluginsByChain[chain];
};
var getPluginProvider = (id) => {
  return pluginRegistry[id];
};
var getAllPlugins = () => {
  return pluginRegistry;
};

// src/KimaProvider.tsx
var import_react_query13 = require("@tanstack/react-query");

// src/hooks/useGetEnvOptions.tsx
var import_react_query = require("@tanstack/react-query");

// src/helpers/fetch-wrapper.tsx
var fetchWrapper = {
  get,
  post
};
function get(url) {
  const requestOptions = {
    method: "GET"
  };
  requestOptions.headers = {
    "Content-Type": "application/json"
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function post(url, body) {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
      // Authorization: `Bearer ${token}`
    },
    body
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function handleResponse(response) {
  return response.text().then((text) => {
    let data = text;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }
    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
      }
      const error = data || response.statusText;
      return Promise.reject({ status: response.status, error });
    }
    return data;
  });
}

// src/hooks/useGetEnvOptions.tsx
var getEnvOptions = async ({
  kimaBackendUrl
}) => {
  const response = await fetchWrapper.get(`${kimaBackendUrl}/chains/env`);
  if (typeof response === "string")
    return {
      env: "testnet" /* testnet */,
      kimaExplorer: "https://explorer.sardis.kima.network",
      paymentPartnerId: "KimaTest"
    };
  return response;
};
var useGetEnvOptions = ({
  kimaBackendUrl
}) => {
  return (0, import_react_query.useQuery)({
    queryKey: ["envOptions"],
    queryFn: async () => await getEnvOptions({ kimaBackendUrl })
  });
};

// plugins/evm/index.tsx
var import_react81 = __toESM(require("react"), 1);

// plugins/PluginBase.ts
var PluginBase = class {
  _store;
  compatibility;
  data;
  id;
  // hooks
  useAllowance;
  useNativeBalance;
  useTokenBalance;
  useWalletIsReady;
  useDisconnectWallet;
  constructor(args) {
    this._store = args.store;
    this.data = {
      id: args.id,
      pluginData: {}
    };
    this.id = args.id;
    this.compatibility = args.compatibility;
    this.useAllowance = args.useAllowance;
    this.useNativeBalance = args.useNativeBalance;
    this.useTokenBalance = args.useTokenBalance;
    this.useWalletIsReady = args.useWalletIsReady;
    this.useDisconnectWallet = args.useDisconnectWallet;
  }
  initialize = () => {
    return {
      data: this.data,
      provider: this.Provider
    };
  };
};

// plugins/evm/features/walletConnect/WalletProvider.tsx
var import_react41 = __toESM(require("react"), 1);

// plugins/evm/config/modalConfig.ts
var import_react40 = require("@reown/appkit/react");
var import_networks2 = require("@reown/appkit/networks");
var import_appkit_adapter_ethers = require("@reown/appkit-adapter-ethers");
var appkitMainnetChains = [
  import_networks2.mainnet,
  import_networks2.bsc,
  import_networks2.polygon,
  import_networks2.base,
  import_networks2.arbitrum,
  import_networks2.optimism,
  import_networks2.avalanche
];
var appkitTestnetChains = [
  import_networks2.sepolia,
  import_networks2.bscTestnet,
  import_networks2.baseSepolia,
  import_networks2.polygonAmoy,
  import_networks2.arbitrumSepolia,
  import_networks2.optimismSepolia,
  import_networks2.avalancheFuji,
  import_networks2.berachainBepolia
];
var metadata = {
  name: "Kima Transaction Widget",
  description: "Frontend widget for Kima integration for dApps",
  url: "https://kima.network",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};
var appKitModel = null;
var setupAppKit = (projectId, networkOption) => {
  if (appKitModel) {
    logger_default.debug("AppKit already initialized, skipping setup");
    return appKitModel;
  }
  const networks = networkOption === "mainnet" /* mainnet */ ? appkitMainnetChains : appkitTestnetChains;
  appKitModel = (0, import_react40.createAppKit)({
    adapters: [new import_appkit_adapter_ethers.EthersAdapter()],
    metadata,
    networks,
    projectId,
    // Use the provided or default project ID
    features: {
      analytics: false,
      // Disable analytics as per previous configuration
      swaps: false,
      onramp: false,
      email: false,
      socials: false,
      history: false
    }
  });
  return appKitModel;
};

// plugins/evm/features/walletConnect/WalletProvider.tsx
var WalletProvider = ({
  children,
  networkOption,
  walletConnectProjectId,
  isLoading
}) => {
  const [isReady, setIsReady] = (0, import_react41.useState)(false);
  (0, import_react41.useEffect)(() => {
    if (!isLoading && networkOption) {
      setupAppKit(walletConnectProjectId, networkOption);
      setIsReady(true);
    }
  }, [networkOption, isLoading, walletConnectProjectId]);
  if (!isReady) {
    return /* @__PURE__ */ import_react41.default.createElement(import_react41.default.Fragment, null);
  }
  return /* @__PURE__ */ import_react41.default.createElement(import_react41.default.Fragment, null, children);
};
var WalletProvider_default = WalletProvider;

// plugins/evm/core/hooks/useBalance.tsx
var import_react_redux = require("react-redux");
var import_react_query3 = require("@tanstack/react-query");

// src/store/selectors.tsx
var selectNetworkOption = (state) => state.option.networkOption;
var selectNetworks = (state) => state.option.networks;
var selectTokenOptions = (state) => state.option.tokenOptions;
var selectTheme = (state) => state.option.theme;
var selectKimaExplorer = (state) => state.option.kimaExplorerUrl;
var selectSourceChain = (state) => state.option.sourceChain;
var selectTargetChain = (state) => state.option.targetChain;
var selectSourceAddress = (state) => state.option.sourceAddress;
var selectTargetAddress = (state) => state.option.targetAddress;
var selectSolanaConnectModal = (state) => state.option.solanaConnectModal;
var selectTronConnectModal = (state) => state.option.tronConnectModal;
var selectPendingTxs = (state) => state.option.pendingTxs;
var selectDappOption = (state) => state.option.dAppOption;
var selectSubmitted = (state) => state.option.submitted;
var selectTransactionOption = (state) => state.option.transactionOption;
var selectAmount = (state) => state.option.amount;
var selectServiceFee = (state) => state.option.serviceFee;
var selectMode = (state) => state.option.mode;
var selectSourceCurrency = (state) => state.option.sourceCurrency;
var selectTargetCurrency = (state) => state.option.targetCurrency;
var selectCompliantOption = (state) => state.option.compliantOption;
var selectSourceCompliant = (state) => state.option.sourceCompliant;
var selectTargetCompliant = (state) => state.option.targetCompliant;
var selectBackendUrl = (state) => state.option.backendUrl;
var selectFeeDeduct = (state) => state.option.feeDeduct;
var selectTxId = (state) => state.option.txId;
var selectAccountDetailsModal = (state) => state.option.accountDetailsModal;
var selectBankDetails = (state) => state.option.bankDetails;
var selectSignature = (state) => state.option.signature;
var selectCCTransactionId = (state) => state.option.ccTransactionId;
var selectCCTransactionStatus = (state) => state.option.ccTransactionStatus;

// plugins/evm/utils/constants.tsx
var import_web32 = require("@solana/web3.js");

// plugins/evm/assets/icons/Cross.tsx
var import_react42 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Minimize.tsx
var import_react43 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/FooterLogo.tsx
var import_react44 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Check.tsx
var import_react45 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Warning.tsx
var import_react46 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/ArrowRight.tsx
var import_react47 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Arrow.tsx
var import_react48 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Lock.tsx
var import_react49 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Ethereum.tsx
var import_react50 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Solana.tsx
var import_react51 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Polygon.tsx
var import_react52 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Polygon_zkEVM.tsx
var import_react53 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Loader.tsx
var import_react54 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Error.tsx
var import_react55 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Avalanche.tsx
var import_react56 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Arbitrum.tsx
var import_react57 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Optimism.tsx
var import_react58 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/USDC.tsx
var import_react59 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/USDT.tsx
var import_react60 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/USDK.tsx
var import_react61 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Fuse.tsx
var import_react62 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Celo.tsx
var import_react63 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/GoodDollar.tsx
var import_react64 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Copy.tsx
var import_react65 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Bank.tsx
var import_react66 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/BSC.tsx
var import_react67 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/KEUR.tsx
var import_react68 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Tron.tsx
var import_react69 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/BTC.tsx
var import_react70 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Wallet.tsx
var import_react71 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Explorer.tsx
var import_react72 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/ExternalUrl.tsx
var import_react73 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Base.tsx
var import_react74 = __toESM(require("react"), 1);

// plugins/evm/assets/icons/Bera.tsx
var import_react75 = __toESM(require("react"), 1);

// plugins/evm/utils/constants.tsx
var import_networks3 = require("@reown/appkit/networks");
var CLUSTER2 = "devnet";
var SOLANA_HOST2 = (0, import_web32.clusterApiUrl)(CLUSTER2);
var isEVMChain2 = (chainId) => chainId === "ETH" /* ETHEREUM */ || chainId === "POL" /* POLYGON */ || chainId === "AVX" /* AVALANCHE */ || chainId === "BSC" /* BSC */ || chainId === "OPT" /* OPTIMISM */ || chainId === "ARB" /* ARBITRUM */ || chainId === "ZKE" /* POLYGON_ZKEVM */ || chainId === "BASE" /* BASE */ || chainId === "BERA" /* BERA */;

// plugins/evm/core/hooks/useEvmProvider.ts
var import_react76 = require("@reown/appkit/react");
var import_ethers = require("ethers");
var useEvmProvider = () => {
  const { externalProvider } = useKimaContext();
  const { walletProvider: appkitProvider } = (0, import_react76.useAppKitProvider)("eip155");
  const appkitAccountInfo = (0, import_react76.useAppKitAccount)();
  const walletAddress = externalProvider?.signer instanceof import_ethers.JsonRpcSigner && externalProvider.signer.address || appkitAccountInfo?.address;
  const walletProvider = externalProvider?.provider instanceof import_ethers.BrowserProvider ? externalProvider.provider : appkitProvider;
  return {
    walletProvider,
    walletAddress
  };
};

// plugins/evm/utils/getTokenAllowance.tsx
var import_viem = require("viem");

// src/utils/functions.tsx
var import_ethers2 = require("ethers");
var import_web33 = require("@solana/web3.js");
var import_tronweb = require("tronweb");
var getShortenedAddress = (address) => {
  const is0x = (addr) => addr?.startsWith("0x");
  return `${address?.substring(0, is0x(address) ? 6 : 5)}...${address?.substr(
    address.length - (is0x(address) ? 8 : 8)
  )}`;
};
var checkPoolBalance = ({
  pools,
  targetChain,
  targetCurrency,
  amount
}) => {
  const finalTargetCurrency = targetCurrency;
  if (!pools) return { isPoolAvailable: false, error: "Pools data unavailable" };
  const targetPool = pools.find(
    (pool) => pool.chainName === targetChain
    // get the current target network pool info
  );
  if (!targetPool)
    return {
      isPoolAvailable: false,
      error: `Pools for ${CHAIN_NAMES_TO_STRING[targetChain]} unavailable!`
    };
  const { balance: poolTokens } = targetPool;
  const targetToken = poolTokens.find(
    (token) => token.tokenSymbol === finalTargetCurrency
  );
  if (!targetToken) {
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} has no ${targetCurrency} pool!`
    };
  }
  const { amount: targetTokenBalance } = targetToken;
  if (parseFloat(amount) > parseFloat(targetTokenBalance))
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough ${targetCurrency}!`
    };
  return { isPoolAvailable: true, error: "" };
};
var getTokenAddress = (tokenOptions, selectedCoin, chain) => {
  return tokenOptions[selectedCoin][chain] || "";
};
var getPoolAddress = (pools, chain) => {
  return pools.find((pool) => pool.chainName === chain).poolAddress;
};
var getTransactionId = (transactionEvents) => {
  for (const event of transactionEvents) {
    if (event.type === "transaction_requested") {
      for (const attr of event.attributes) {
        if (attr.key === "txId") {
          return attr.value;
        }
      }
    }
  }
};
var isValidExternalProvider = (externalProvider) => {
  const { type, provider, signer } = externalProvider;
  if (type === "evm") {
    if (!(provider instanceof import_ethers2.BrowserProvider) || !(signer instanceof import_ethers2.JsonRpcSigner))
      return false;
  }
  if (type === "solana") {
    if (!isSolProvider(provider) || !(signer instanceof import_web33.PublicKey))
      return false;
  }
  if (type === "tron") {
    if (!isTronProvider(provider) || typeof signer !== "string")
      return false;
  }
  return true;
};
var isSolProvider = (provider) => {
  return provider && provider.connection instanceof import_web33.Connection && typeof provider.signTransaction === "function";
};
var isTronProvider = (provider) => {
  return provider && provider.tronWeb instanceof import_tronweb.TronWeb && typeof provider.signTransaction === "function";
};

// plugins/evm/utils/getTokenAllowance.tsx
var getTokenAllowance = async ({
  tokenOptions,
  selectedCoin,
  userAddress,
  pools,
  chain,
  isTestnet = true
}) => {
  try {
    logger_default.debug("EVM:getTokenAllowance:", {
      tokenOptions,
      selectedCoin,
      chain,
      userAddress,
      pools
    });
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, chain);
    const poolAddress = getPoolAddress(pools, chain);
    if (!tokenAddress || !poolAddress || !userAddress) {
      logger_default.warn("EVM:getTokenAllowance: Missing required data", {
        tokenAddress,
        poolAddress,
        userAddress
      });
      return {};
    }
    const network = isTestnet ? CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[chain] : CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[chain];
    if (!network) {
      throw new Error(`Unsupported network: ${chain}`);
    }
    const viemClient = (0, import_viem.createPublicClient)({
      chain: network,
      transport: (0, import_viem.http)()
    });
    const erc20Contract = (0, import_viem.getContract)({
      address: tokenAddress,
      abi: import_viem.erc20Abi,
      client: viemClient
    });
    const [allowance, balance, decimals] = await Promise.all([
      erc20Contract.read.allowance([
        userAddress,
        poolAddress
      ]),
      erc20Contract.read.balanceOf([
        userAddress
      ]),
      erc20Contract.read.decimals()
    ]);
    logger_default.debug("EVM:getTokenAllowance: data: ", {
      chain,
      userAddress,
      allowance,
      balance,
      decimals
    });
    return {
      allowance,
      balance,
      decimals: Number(decimals)
    };
  } catch (error) {
    logger_default.error("Error getting EVM allowance: ", error);
    throw new Error("Error getting EVM allowance");
  }
};

// src/hooks/useGetPools.tsx
var import_react_query2 = require("@tanstack/react-query");

// src/services/poolsApi.ts
var getPools = async (backenUrl) => {
  const poolsData = await fetchWrapper.get(`${backenUrl}/chains/pool`);
  return poolsData;
};

// src/hooks/useGetPools.tsx
var useGetPools = (backendUrl, networkOption) => {
  const { data, error, isLoading } = (0, import_react_query2.useQuery)({
    queryKey: ["pools", networkOption],
    queryFn: async () => await getPools(backendUrl),
    refetchInterval: 3e5,
    staleTime: 1e3 * 60,
    // 1 min
    enabled: !!backendUrl && !!networkOption
  });
  return {
    pools: data || [],
    error,
    isLoading
  };
};
var useGetPools_default = useGetPools;

// plugins/evm/core/hooks/useBalance.tsx
var emptyResult = {};
function useBalance() {
  const backendUrl = (0, import_react_redux.useSelector)(selectBackendUrl);
  const sourceChain = (0, import_react_redux.useSelector)(selectSourceChain);
  const sourceAddress = (0, import_react_redux.useSelector)(selectSourceAddress);
  const mode = (0, import_react_redux.useSelector)(selectMode);
  const selectedCoin = (0, import_react_redux.useSelector)(selectSourceCurrency);
  const tokenOptions = (0, import_react_redux.useSelector)(selectTokenOptions);
  const networkOption = (0, import_react_redux.useSelector)(selectNetworkOption);
  const { pools } = useGetPools_default(backendUrl, networkOption);
  const { walletAddress, walletProvider } = useEvmProvider();
  const userAddress = mode === "light" /* light */ ? lightDemoAccounts.EVM : walletAddress;
  const enabled = !!userAddress && !!tokenOptions && !!selectedCoin && pools.length > 0 && isEVMChain2(sourceChain.shortName) && (!!walletProvider || mode === "light" /* light */);
  const { data: allowanceData } = (0, import_react_query3.useQuery)({
    queryKey: ["evmAllowance", userAddress, sourceChain.shortName],
    queryFn: () => getTokenAllowance({
      tokenOptions,
      selectedCoin,
      userAddress,
      pools,
      chain: sourceChain.shortName,
      isTestnet: networkOption === "testnet" /* testnet */
    }),
    staleTime: 60 * 1e3,
    refetchInterval: 60 * 1e3,
    enabled
  });
  return allowanceData ?? emptyResult;
}

// plugins/evm/core/hooks/useNativeBalance.ts
var import_react_query4 = require("@tanstack/react-query");
var import_react77 = require("@reown/appkit/react");

// plugins/evm/utils/getBalance.ts
var import_ethers3 = require("ethers");
var import_viem2 = require("viem");
var getEvmBalance = async (input) => {
  const { walletAddress, chain, isTestnet } = input;
  const network = isTestnet ? CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[chain] : CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[chain];
  if (!network) {
    throw new Error(`Unsupported network: ${chain}`);
  }
  try {
    const viemClient = (0, import_viem2.createPublicClient)({
      chain: network,
      transport: (0, import_viem2.http)()
    });
    const balance = await viemClient.getBalance({
      address: walletAddress
    });
    return {
      balance: Number((0, import_ethers3.formatEther)(balance)),
      // Convert BigInt to a readable number
      decimals: 18
    };
  } catch (error) {
    logger_default.error("Failed to fetch EVM balance:", error);
    throw new Error("Failed to retrieve balance from Viem");
  }
};

// plugins/evm/core/hooks/useNativeBalance.ts
var import_react_redux2 = require("react-redux");
var useNativeEvmBalance = () => {
  const { externalProvider } = useKimaContext();
  const appkitAccountInfo = (0, import_react77.useAppKitAccount)();
  const { address: appkitAddress } = appkitAccountInfo || {};
  const { walletProvider } = (0, import_react77.useAppKitProvider)("eip155");
  const sourceChain = (0, import_react_redux2.useSelector)(selectSourceChain);
  const networkOption = (0, import_react_redux2.useSelector)(selectNetworkOption);
  const walletAddress = externalProvider?.signer?.address || appkitAddress;
  const result = (0, import_react_query4.useQuery)({
    queryKey: ["evmNativeBalance", walletAddress, sourceChain],
    queryFn: async () => {
      if (!walletAddress || !sourceChain) return { balance: 0, decimals: 18 };
      try {
        return await getEvmBalance({
          walletAddress,
          chain: sourceChain,
          isTestnet: networkOption === "testnet" /* testnet */
        });
      } catch (error) {
        logger_default.error(
          `Error getting native balance for wallet ${walletAddress}`,
          error
        );
        throw new Error(`Failed to fetch native balance`);
      }
    },
    enabled: !!walletAddress && !!sourceChain,
    staleTime: 1e3 * 60
    // 1 min cache time
  });
  return result.data;
};
var useNativeBalance_default = useNativeEvmBalance;

// plugins/evm/core/hooks/useIsWalletReady.tsx
var import_react78 = require("react");
var import_react_redux4 = require("react-redux");
var import_react79 = require("@reown/appkit/react");

// plugins/evm/utils/switchNetworkEthers.tsx
var import_ethers4 = require("ethers");
var import_viem3 = require("viem");
async function switchNetworkEthers(provider, chainId, chains) {
  try {
    logger_default.debug("Attempting to switch...");
    logger_default.debug("chainId: ", chainId, (0, import_viem3.toHex)(chainId));
    await provider.send("wallet_switchEthereumChain", [
      { chainId: (0, import_viem3.toHex)(chainId) }
    ]);
    logger_default.debug(`Switched to network: ${chainId}`);
  } catch (error) {
    if (error.code === 4902) {
      logger_default.debug("Error switching network: ", error);
      try {
        logger_default.debug("Chains: ", chains);
        const network = chains.find(
          (ethersNetwork) => ethersNetwork.id === chainId
        );
        logger_default.debug("Network found: ", network);
        if (!network) {
          throw new Error(`Network with chainId ${chainId} not found in chains`);
        }
        const chainConfig = {
          chainId: (0, import_ethers4.toBeHex)(network.id),
          chainName: network.name,
          blockExplorerUrls: Object.values(
            network.blockExplorers || {}
          ).flatMap((explorer) => Object.values(explorer)),
          rpcUrls: Object.values(network.rpcUrls || {}).flatMap(
            (item) => item.http
          ),
          nativeCurrency: network.nativeCurrency
        };
        logger_default.debug("Chain Config: ", chainConfig);
        await provider.send("wallet_addEthereumChain", [chainConfig]);
        logger_default.debug(`Added and switched to network: ${chainId}`);
      } catch (addError) {
        logger_default.error("Failed to add the network:", addError);
      }
    } else if (error.code === -32603) {
      logger_default.debug("Network already switched...");
    } else {
      logger_default.error("Failed to switch networks:", error);
    }
  }
}

// src/hooks/useChainData.ts
var import_react_query5 = require("@tanstack/react-query");
var import_react_redux3 = require("react-redux");
var useChainData = (backendURL, chainName) => {
  const dispatch = (0, import_react_redux3.useDispatch)();
  const ouput = (0, import_react_query5.useQuery)({
    queryKey: ["chainData"],
    queryFn: async () => {
      try {
        const response = await fetchWrapper.get(`${backendURL}/chains`);
        const chains = typeof response === "string" ? [] : response;
        const { networks, tokens } = getChainAndTokensOptions(chains);
        dispatch(setNetworks(chains));
        dispatch(setTokenOptions(tokens));
        logger_default.debug("useChainData::Chain data:", { networks, tokens, chains });
        return chains;
      } catch (error) {
        logger_default.error("Error fetching chain data:", error);
        return [];
      }
    },
    select: (data) => {
      if (!chainName) return data;
      return data.filter((chain) => chain.shortName === chainName);
    },
    enabled: !!backendURL,
    staleTime: 1e3 * 60 * 15,
    // Cache for 15 minutes
    gcTime: 1e3 * 60 * 60
    // Garbage collect after 1 hour
  });
  return ouput;
};
function getChainAndTokensOptions(chains) {
  const networks = [];
  const tokens = {};
  chains.forEach((chain) => {
    networks.push({
      id: chain.shortName,
      label: chain.name
    });
    chain.supportedTokens.forEach((token) => {
      if (!tokens[token.symbol]) {
        tokens[token.symbol] = {};
      }
      tokens[token.symbol][chain.shortName] = token.address;
    });
  });
  return { networks, tokens };
}

// plugins/evm/core/hooks/useIsWalletReady.tsx
function useIsWalletReady() {
  const dispatch = (0, import_react_redux4.useDispatch)();
  const { externalProvider } = useKimaContext();
  const backendUrl = (0, import_react_redux4.useSelector)(selectBackendUrl);
  const mode = (0, import_react_redux4.useSelector)(selectMode);
  const { data: chains } = useChainData(backendUrl);
  const { walletProvider: appkitProvider } = (0, import_react79.useAppKitProvider)("eip155");
  const appkitAccountInfo = (0, import_react79.useAppKitAccount)();
  const { chainId: walletChainId } = (0, import_react79.useAppKitNetwork)();
  const { address: walletAddress, isConnected: appkitIsConnected } = appkitAccountInfo || {};
  const isConnected = appkitIsConnected && walletAddress !== void 0;
  const sourceChain = (0, import_react_redux4.useSelector)(selectSourceChain);
  const [isReady, setIsReady] = (0, import_react78.useState)(false);
  const [statusMessage, setStatusMessage] = (0, import_react78.useState)("Wallet not connected");
  const [connectedAddress, setConnectedAddress] = (0, import_react78.useState)("");
  const switchNetwork = (0, import_react78.useCallback)(async () => {
    logger_default.debug("useIsWalletReady:EVM:Attempting to switch network...", {
      hasProvider: !!appkitProvider,
      sourceChain,
      modalExists: appKitModel !== null,
      modal: appKitModel
    });
    if (sourceChain && appKitModel !== null) {
      logger_default.debug("useIsWalletReady:EVM:switching network...");
      try {
        appKitModel.switchNetwork(sourceChain);
        logger_default.debug(
          "useIsWalletReady:EVM:Network switch successful to:",
          sourceChain.name
        );
      } catch (e) {
        logger_default.error("useIsWalletReady:EVM:Network switch failed:", e);
      }
    }
  }, [appkitProvider, sourceChain]);
  (0, import_react78.useEffect)(() => {
    const resolveConnection = async () => {
      if (mode === "light" /* light */) {
        const demoAddress = lightDemoAccounts.EVM;
        setIsReady(true);
        setConnectedAddress(demoAddress);
        setStatusMessage("Connected light demo EVM account");
        dispatch(setSourceAddress(demoAddress));
        return;
      }
      if (externalProvider?.type === "evm" && externalProvider?.provider && sourceChain.compatibility === "EVM" /* EVM */) {
        try {
          const provider = externalProvider.provider;
          const network = await provider.getNetwork();
          const externalChainId = Number(network.chainId);
          if (externalChainId === sourceChain.id) {
            const signer = await provider.getSigner();
            const externalAddress = await signer.getAddress();
            setIsReady(true);
            setConnectedAddress(externalAddress);
            setStatusMessage("Connected with external provider");
            dispatch(setSourceAddress(externalAddress));
          } else {
            setIsReady(false);
            setConnectedAddress("");
            setStatusMessage("Chain mismatch on external provider");
            dispatch(setSourceAddress(""));
            await switchNetworkEthers(
              provider,
              sourceChain.id,
              chains
            );
          }
          return;
        } catch (error) {
          logger_default.error("Error using external provider:", error);
          setIsReady(false);
          setConnectedAddress("");
          setStatusMessage("Failed to connect external provider");
          dispatch(setSourceAddress(""));
          return;
        }
      }
      if (!externalProvider && isConnected) {
        if (walletChainId === sourceChain?.id) {
          setIsReady(true);
          setConnectedAddress(walletAddress ?? "");
          setStatusMessage("Connected with AppKit provider");
          dispatch(setSourceAddress(walletAddress ?? ""));
        } else {
          setIsReady(false);
          setConnectedAddress("");
          setStatusMessage("Switching to correct network...");
          dispatch(setSourceAddress(""));
          switchNetwork();
        }
        return;
      }
      setIsReady(false);
      setConnectedAddress("");
      setStatusMessage("No wallet connected");
      dispatch(setSourceAddress(""));
    };
    resolveConnection();
  }, [
    mode,
    externalProvider,
    sourceChain,
    chains,
    isConnected,
    walletAddress,
    walletChainId,
    switchNetwork,
    dispatch
  ]);
  return { isReady, statusMessage, connectedAddress };
}
var useIsWalletReady_default = useIsWalletReady;

// plugins/evm/core/hooks/useEvmAllowance.tsx
var import_react_redux5 = require("react-redux");
var import_react_query6 = require("@tanstack/react-query");
var import_viem4 = require("viem");
function useEvmAllowance() {
  const queryClient2 = (0, import_react_query6.useQueryClient)();
  const mode = (0, import_react_redux5.useSelector)(selectMode);
  const sourceChain = (0, import_react_redux5.useSelector)(selectSourceChain);
  const sourceAddress = (0, import_react_redux5.useSelector)(selectSourceAddress);
  const networkOption = (0, import_react_redux5.useSelector)(selectNetworkOption);
  const { transactionValues } = (0, import_react_redux5.useSelector)(selectServiceFee);
  const selectedCoin = (0, import_react_redux5.useSelector)(selectSourceCurrency);
  const tokenOptions = (0, import_react_redux5.useSelector)(selectTokenOptions);
  const backendUrl = (0, import_react_redux5.useSelector)(selectBackendUrl);
  const feeDeduct = (0, import_react_redux5.useSelector)(selectFeeDeduct);
  const txValues = feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin;
  const allowanceNumber = BigInt(txValues.allowanceAmount.value);
  const { pools } = useGetPools_default(backendUrl, networkOption);
  const { walletProvider, walletAddress } = useEvmProvider();
  const allowanceData = useBalance();
  const userAddress = mode === "light" /* light */ ? sourceAddress : walletAddress;
  const signMessage = async (data) => {
    if (!walletProvider) {
      logger_default.error("No available provider");
      return;
    }
    if (!allowanceData?.decimals) {
      logger_default.warn("useEvmAllowance: Missing required data");
      return;
    }
    try {
      const walletClient = (0, import_viem4.createWalletClient)({
        account: userAddress,
        chain: sourceChain,
        transport: (0, import_viem4.custom)(window.ethereum)
        // WARNING: NEED TO MAKE SURE THIS USING THE ETHEREUM OBJECT IS STABLE ENOUGH
      });
      logger_default.debug("useEvmAllowance: Signing message:", txValues.message);
      return await walletClient.signMessage({
        account: userAddress,
        message: txValues.message
      });
    } catch (error) {
      logger_default.error("useEvmAllowance: Error on signing message:", error);
      throw new Error("Error on signing message");
    }
  };
  const approveErc20TokenTransfer = async (isCancel = false) => {
    if (!walletProvider) {
      logger_default.error("No available provider");
      return;
    }
    const tokenAddress = getTokenAddress(
      tokenOptions,
      selectedCoin,
      sourceChain.shortName
    );
    const poolAddress = getPoolAddress(pools, sourceChain.shortName);
    if (!allowanceData?.decimals || !tokenAddress || !poolAddress || !txValues) {
      logger_default.warn("useEvmAllowance: Missing required data", {
        txValues,
        allowanceData,
        tokenAddress,
        signer: walletProvider.getSigner(),
        // signer: externalProvider?.signer || appkitProvider.getSigner(),
        poolAddress
      });
      return;
    }
    try {
      const viemClient = (0, import_viem4.createPublicClient)({
        chain: sourceChain,
        transport: (0, import_viem4.http)()
      });
      const walletClient = (0, import_viem4.createWalletClient)({
        account: userAddress,
        chain: sourceChain,
        transport: (0, import_viem4.custom)(window.ethereum)
        // WARNING: NEED TO MAKE SURE THIS USING THE ETHEREUM OBJECT IS STABLE ENOUGH
      });
      const finalAmount = isCancel ? BigInt(0) : allowanceNumber;
      const hash = await walletClient.writeContract({
        chain: sourceChain,
        address: tokenAddress,
        abi: import_viem4.erc20Abi,
        functionName: "approve",
        args: [poolAddress, finalAmount]
      });
      logger_default.info(
        "useEvmAllowance: Transaction sent, waiting for confirmation:",
        hash
      );
      const receipt = await viemClient.waitForTransactionReceipt({ hash });
      if (receipt.status === "success") {
        logger_default.debug("useEvmAllowance: Transaction successful:", receipt);
        await queryClient2.invalidateQueries({ queryKey: ["evmAllowance"] });
      } else {
        logger_default.error("useEvmAllowance: Transaction failed:", receipt);
        throw new Error("Transaction failed");
      }
    } catch (error) {
      logger_default.error("useEvmAllowance: Error on EVM approval:", error);
      throw new Error("Error on EVM approval");
    }
  };
  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance ? allowanceData.allowance >= allowanceNumber : false,
    approve: approveErc20TokenTransfer,
    signMessage
  };
}

// plugins/evm/core/hooks/useDisconnectWallet.tsx
var import_react80 = require("@reown/appkit/react");
function useDisconnectWallet() {
  const { disconnect } = (0, import_react80.useDisconnect)();
  return { disconnectWallet: disconnect };
}
var useDisconnectWallet_default = useDisconnectWallet;

// plugins/evm/index.tsx
var EvmPlugin = class extends PluginBase {
  constructor(store2) {
    super({
      store: store2,
      id: "EVM",
      compatibility: "EVM" /* EVM */,
      useAllowance: useEvmAllowance,
      useNativeBalance: useNativeBalance_default,
      useTokenBalance: useBalance,
      useWalletIsReady: useIsWalletReady_default,
      useDisconnectWallet: useDisconnectWallet_default
    });
  }
  isCompatible = (chain) => {
    return chain.compatibility === "EVM";
  };
  Provider = ({
    children,
    networkOption,
    walletConnectProjectId,
    isLoading
  }) => {
    return /* @__PURE__ */ import_react81.default.createElement(
      WalletProvider_default,
      {
        children,
        networkOption,
        walletConnectProjectId,
        isLoading
      },
      children
    );
  };
};
var evmPlugin = new EvmPlugin(store);
var evm_default = evmPlugin;

// plugins/solana/index.tsx
var import_react84 = __toESM(require("react"), 1);

// plugins/solana/features/walletConnect/WalletProvider.tsx
var import_react82 = __toESM(require("react"), 1);
var import_wallet_adapter_react = require("@solana/wallet-adapter-react");
var import_wallet_adapter_wallets = require("@solana/wallet-adapter-wallets");

// plugins/solana/utils/constants.tsx
var import_web34 = require("@solana/web3.js");
function getHostEndpoint(networkOption) {
  return networkOption === "mainnet" ? "https://solana-rpc.publicnode.com" : (0, import_web34.clusterApiUrl)("devnet");
}
var networkOptions2 = [
  {
    id: "SOL" /* SOLANA */,
    label: "Solana",
    icon: Solana_default
  }
];

// plugins/solana/features/walletConnect/WalletProvider.tsx
var WalletProvider2 = ({
  children,
  networkOption,
  walletConnectProjectId
  // Add this parameter
}) => {
  const endpoint = getHostEndpoint(networkOption);
  logger_default.debug(
    `WalletProvider initialized with projectId: ${walletConnectProjectId}`
  );
  return /* @__PURE__ */ import_react82.default.createElement(import_wallet_adapter_react.ConnectionProvider, { endpoint }, /* @__PURE__ */ import_react82.default.createElement(
    import_wallet_adapter_react.WalletProvider,
    {
      autoConnect: false,
      wallets: [
        new import_wallet_adapter_wallets.PhantomWalletAdapter(),
        new import_wallet_adapter_wallets.SolflareWalletAdapter(),
        new import_wallet_adapter_wallets.CloverWalletAdapter(),
        new import_wallet_adapter_wallets.Coin98WalletAdapter(),
        new import_wallet_adapter_wallets.SolongWalletAdapter(),
        new import_wallet_adapter_wallets.TorusWalletAdapter()
      ]
    },
    children
  ));
};
var WalletProvider_default2 = WalletProvider2;

// plugins/solana/core/hooks/useGetSolBalance.tsx
var import_wallet_adapter_react2 = require("@solana/wallet-adapter-react");
var import_react_query7 = require("@tanstack/react-query");

// plugins/solana/utils/getSolBalance.tsx
var import_web35 = require("@solana/web3.js");
var getSolBalance = async (connection, publicKey) => {
  try {
    const balance = await connection.getBalance(publicKey) / import_web35.LAMPORTS_PER_SOL;
    logger_default.debug("(NEW) SOL balance:", balance);
    return balance ?? 0;
  } catch (error) {
    logger_default.error("Error fetching SOL balance:", error);
    throw new Error("Cant fetch sol balance");
  }
};

// plugins/solana/core/hooks/useGetSolBalance.tsx
var import_web36 = require("@solana/web3.js");
var import_react_redux6 = require("react-redux");
function useGetSolBalance() {
  const { externalProvider } = useKimaContext();
  const { publicKey: internalPublicKey } = (0, import_wallet_adapter_react2.useWallet)();
  const { connection: internalConnection } = (0, import_wallet_adapter_react2.useConnection)();
  const sourceNetwork = (0, import_react_redux6.useSelector)(selectSourceChain);
  const isSolanaPublicKey = (key) => {
    return key instanceof import_web36.PublicKey;
  };
  const publicKey = isSolanaPublicKey(externalProvider?.signer) ? externalProvider.signer : internalPublicKey;
  const connection = externalProvider?.provider.connection || internalConnection;
  const result = (0, import_react_query7.useQuery)({
    queryKey: ["getSolBalance", publicKey ? publicKey.toBase58() : null],
    queryFn: async () => getSolBalance(connection, publicKey),
    enabled: !!publicKey && !!connection && sourceNetwork === "SOL",
    refetchInterval: 6e4,
    // refetch every 60 sec
    staleTime: 1e4,
    gcTime: 6e4
  });
  const { data: balance } = result;
  return { balance };
}
var useGetSolBalance_default = useGetSolBalance;

// plugins/solana/core/hooks/useSolanaAllowance.tsx
var import_react_redux9 = require("react-redux");

// plugins/solana/core/hooks/useBalance.tsx
var import_react_redux8 = require("react-redux");

// plugins/solana/utils/getTokenAllowance.tsx
var import_spl_token = require("@solana/spl-token");
var import_web37 = require("@solana/web3.js");
var getTokenAllowance2 = async ({
  tokenOptions,
  selectedCoin,
  userPublicKey,
  connection,
  pools
}) => {
  try {
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, "SOL");
    const poolAddress = getPoolAddress(pools, "SOL");
    const mintPublicKey = new import_web37.PublicKey(tokenAddress);
    const tokenAccountAddress = await (0, import_spl_token.getAssociatedTokenAddress)(
      mintPublicKey,
      userPublicKey
    );
    const accountInfo = await connection.getParsedAccountInfo(tokenAccountAddress);
    const parsedAccountInfo = accountInfo?.value?.data;
    return {
      allowance: parsedAccountInfo.parsed?.info?.delegate === poolAddress ? BigInt(parsedAccountInfo.parsed?.info?.delegatedAmount?.amount ?? 0) : BigInt(0),
      balance: BigInt(parsedAccountInfo.parsed?.info?.tokenAmount?.amount ?? 0),
      decimals: Number(
        parsedAccountInfo.parsed?.info?.tokenAmount?.decimals ?? 0
      )
    };
  } catch (error) {
    logger_default.error("Error fetching token allowance:", error);
    throw error;
  }
};

// plugins/solana/core/hooks/useBalance.tsx
var import_react_query8 = require("@tanstack/react-query");

// plugins/solana/core/hooks/useSolanaProvider.ts
var import_react_redux7 = require("react-redux");
var import_wallet_adapter_react3 = require("@solana/wallet-adapter-react");
var import_web38 = require("@solana/web3.js");
var useSolanaProvider = () => {
  const sourceChain = (0, import_react_redux7.useSelector)(selectSourceChain);
  const { externalProvider } = useKimaContext();
  const { connection: internalConnection } = (0, import_wallet_adapter_react3.useConnection)();
  const {
    publicKey: internalPublicKey,
    signTransaction: internalSignTransaction,
    signMessage: internalSignMessage
  } = (0, import_wallet_adapter_react3.useWallet)();
  const isSolanaProvider = sourceChain.shortName === "SOL" && externalProvider?.type === "solana" && externalProvider.provider && externalProvider.signer instanceof import_web38.PublicKey;
  const userPublicKey = isSolanaProvider && externalProvider && externalProvider.signer instanceof import_web38.PublicKey ? externalProvider?.signer : sourceChain.shortName === "SOL" ? internalPublicKey : null;
  const signTransaction = isSolanaProvider && externalProvider && "signTransaction" in externalProvider.provider ? externalProvider.provider.signTransaction : sourceChain.shortName === "SOL" ? internalSignTransaction : void 0;
  const signMessage = isSolanaProvider && externalProvider && "signMessage" in externalProvider.provider ? externalProvider.provider.signMessage : sourceChain.shortName === "SOL" ? internalSignMessage : void 0;
  const connection = isSolanaProvider && externalProvider && "connection" in externalProvider.provider ? externalProvider.provider.connection : sourceChain.shortName === "SOL" ? internalConnection : void 0;
  return {
    userPublicKey,
    signTransaction,
    signMessage,
    connection
  };
};

// plugins/solana/core/hooks/useBalance.tsx
var import_web39 = require("@solana/web3.js");
var emptyResult2 = {};
function useBalance2() {
  const sourceChain = (0, import_react_redux8.useSelector)(selectSourceChain);
  const selectedCoin = (0, import_react_redux8.useSelector)(selectSourceCurrency);
  const mode = (0, import_react_redux8.useSelector)(selectMode);
  const tokenOptions = (0, import_react_redux8.useSelector)(selectTokenOptions);
  const backendUrl = (0, import_react_redux8.useSelector)(selectBackendUrl);
  const networkOption = (0, import_react_redux8.useSelector)(selectNetworkOption);
  const { pools } = useGetPools_default(backendUrl, networkOption);
  const { connection, userPublicKey } = useSolanaProvider();
  const resolvedAddress = mode === "light" /* light */ ? lightDemoAccounts.SOL : userPublicKey;
  const publicKey = resolvedAddress ? new import_web39.PublicKey(resolvedAddress) : void 0;
  const { data: allowanceData } = (0, import_react_query8.useQuery)({
    queryKey: [
      "solanaAllowance",
      publicKey?.toBase58(),
      // for different accounts
      selectedCoin
      // for coin selection
    ],
    queryFn: async () => await getTokenAllowance2({
      tokenOptions,
      selectedCoin,
      userPublicKey: publicKey,
      connection,
      pools
    }),
    enabled: !!connection && !!publicKey && !!selectedCoin && !!tokenOptions && pools.length > 0 && sourceChain.shortName === "SOL",
    refetchInterval: 1e3 * 60,
    // 1 min
    staleTime: 1e3 * 60
    // 1 min
  });
  return allowanceData ?? emptyResult2;
}

// plugins/solana/core/hooks/useSolanaAllowance.tsx
var import_spl_token2 = require("@solana/spl-token");
var import_web310 = require("@solana/web3.js");
var import_react_query9 = require("@tanstack/react-query");
function useSolanaAllowance() {
  const queryClient2 = (0, import_react_query9.useQueryClient)();
  const { transactionValues } = (0, import_react_redux9.useSelector)(selectServiceFee);
  const mode = (0, import_react_redux9.useSelector)(selectMode);
  const feeDeduct = (0, import_react_redux9.useSelector)(selectFeeDeduct);
  const backendUrl = (0, import_react_redux9.useSelector)(selectBackendUrl);
  const networkOption = (0, import_react_redux9.useSelector)(selectNetworkOption);
  const txValues = feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin;
  const allowanceNumber = BigInt(txValues.allowanceAmount.value);
  const selectedCoin = (0, import_react_redux9.useSelector)(selectSourceCurrency);
  const tokenOptions = (0, import_react_redux9.useSelector)(selectTokenOptions);
  const { pools } = useGetPools_default(backendUrl, networkOption);
  const { userPublicKey, signTransaction, signMessage, connection } = useSolanaProvider();
  const allowanceData = useBalance2();
  const publicKey = mode === "light" /* light */ ? new import_web310.PublicKey(lightDemoAccounts.SOL) : userPublicKey;
  const signSolanaMessage = async (data) => {
    if (!signMessage) {
      logger_default.warn("useSolanaAllowance: Missing Solana provider setup");
      return;
    }
    try {
      logger_default.debug("useSolanaAllowance: Signing message:", txValues.message);
      const encodedMessage = new TextEncoder().encode(txValues.message);
      const signature = await signMessage(encodedMessage);
      return `0x${Buffer.from(signature).toString("hex")}`;
    } catch (error) {
      logger_default.error("Error signing message:", error);
      throw error;
    }
  };
  const approveSPLTokenTransfer = async (isCancel = false) => {
    if (!allowanceNumber) {
      logger_default.warn("useSolanaAllowance: Missing allowance amount");
      return;
    }
    if (
      // !isSolanaProvider ||
      !signTransaction || !connection || !publicKey
    ) {
      logger_default.warn("useSolanaAllowance: Missing Solana provider setup");
      return;
    }
    const poolAddress = getPoolAddress(pools, "SOL");
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, "SOL");
    try {
      const tokenAccountAddress = await (0, import_spl_token2.getAssociatedTokenAddress)(
        new import_web310.PublicKey(tokenAddress),
        publicKey
      );
      const amount = isCancel ? 0n : allowanceNumber;
      logger_default.debug("useSolanaAllowance: Approving amount:", amount);
      const approveInstruction = (0, import_spl_token2.createApproveInstruction)(
        tokenAccountAddress,
        new import_web310.PublicKey(poolAddress),
        publicKey,
        amount,
        [],
        import_spl_token2.TOKEN_PROGRAM_ID
      );
      const transaction = new import_web310.Transaction().add(approveInstruction);
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const signedTransaction = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: "confirmed"
        }
      );
      logger_default.debug("Solana approval Transaction ID:", signature);
      const confirmation = await connection.confirmTransaction(
        signature,
        "finalized"
      );
      if (confirmation.value.err) {
        logger_default.error("Transaction failed:", confirmation.value.err);
        return;
      }
      await queryClient2.invalidateQueries({ queryKey: ["solanaAllowance"] });
    } catch (error) {
      logger_default.error("Error approving SPL token transfer:", error);
      throw error;
    }
  };
  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance ? allowanceData.allowance >= allowanceNumber : false,
    approve: approveSPLTokenTransfer,
    signMessage: signSolanaMessage
  };
}

// plugins/solana/core/hooks/useIsWalletReady.tsx
var import_react83 = require("react");
var import_wallet_adapter_react4 = require("@solana/wallet-adapter-react");
var import_react_redux10 = require("react-redux");
var import_react_redux11 = require("react-redux");
var createWalletStatus = (isReady, statusMessage = "", connectedAddress) => ({
  isReady,
  statusMessage,
  connectedAddress
});
function useIsWalletReady2() {
  const dispatch = (0, import_react_redux11.useDispatch)();
  const mode = (0, import_react_redux10.useSelector)(selectMode);
  const { externalProvider } = useKimaContext();
  const { publicKey: solanaAddress } = (0, import_wallet_adapter_react4.useWallet)();
  const sourceChain = (0, import_react_redux10.useSelector)(selectSourceChain);
  (0, import_react83.useEffect)(() => {
    if (sourceChain.shortName !== "SOL") return;
    if (mode === "light" /* light */) {
      dispatch(setSourceAddress(lightDemoAccounts.SOL));
      return;
    }
    solanaAddress && dispatch(setSourceAddress(solanaAddress.toBase58()));
  }, [mode, solanaAddress, sourceChain]);
  return (0, import_react83.useMemo)(() => {
    if (mode === "light" /* light */)
      return createWalletStatus(
        true,
        "Connected light demo account",
        lightDemoAccounts.SOL
      );
    if (externalProvider && externalProvider.type === "solana")
      return createWalletStatus(
        true,
        "Connected with external provider",
        externalProvider.signer.toBase58()
      );
    if (solanaAddress)
      return createWalletStatus(
        true,
        "Connected with internal provider",
        solanaAddress.toBase58()
      );
    return createWalletStatus(false, "Solana wallet not connected", "");
  }, [sourceChain, solanaAddress]);
}
var useIsWalletReady_default2 = useIsWalletReady2;

// plugins/solana/core/hooks/useDisconnectWallet.tsx
var import_wallet_adapter_react5 = require("@solana/wallet-adapter-react");
function useDisconnectWallet2() {
  const { disconnect } = (0, import_wallet_adapter_react5.useWallet)();
  return { disconnectWallet: disconnect };
}
var useDisconnectWallet_default2 = useDisconnectWallet2;

// plugins/solana/index.tsx
var SolanaPlugin = class extends PluginBase {
  constructor(store2) {
    super({
      store: store2,
      id: "SOL",
      compatibility: "SELF" /* SELF */,
      useAllowance: useSolanaAllowance,
      useNativeBalance: useGetSolBalance_default,
      useTokenBalance: useSolanaAllowance,
      useWalletIsReady: useIsWalletReady_default2,
      useDisconnectWallet: useDisconnectWallet_default2
    });
  }
  isCompatible = (chain) => {
    return chain.shortName === "SOL";
  };
  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }) => {
    return /* @__PURE__ */ import_react84.default.createElement(
      WalletProvider_default2,
      {
        networkOption,
        walletConnectProjectId
      },
      children
    );
  };
};
var solanaPlugin = new SolanaPlugin(store);
var solana_default = solanaPlugin;

// plugins/tron/index.tsx
var import_react89 = __toESM(require("react"), 1);

// plugins/tron/features/walletConnect/WalletProvider.tsx
var import_react85 = __toESM(require("react"), 1);
var import_tronwallet_adapter_react_hooks = require("@tronweb3/tronwallet-adapter-react-hooks");
var import_tronwallet_adapter_ledger = require("@tronweb3/tronwallet-adapter-ledger");
var import_tronwallet_adapter_tronlink = require("@tronweb3/tronwallet-adapter-tronlink");
var import_tronwallet_adapter_okxwallet = require("@tronweb3/tronwallet-adapter-okxwallet");
var import_tronwallet_adapter_tokenpocket = require("@tronweb3/tronwallet-adapter-tokenpocket");
var import_tronwallet_abstract_adapter = require("@tronweb3/tronwallet-abstract-adapter");
var import_react_hot_toast = require("react-hot-toast");
var WalletProvider3 = ({ children, networkOption }) => {
  const adapters = (0, import_react85.useMemo)(
    () => [
      new import_tronwallet_adapter_tronlink.TronLinkAdapter(),
      new import_tronwallet_adapter_ledger.LedgerAdapter({ accountNumber: 2 }),
      new import_tronwallet_adapter_tokenpocket.TokenPocketAdapter(),
      new import_tronwallet_adapter_okxwallet.OkxWalletAdapter()
    ],
    []
  );
  function onError(e) {
    if (e instanceof import_tronwallet_abstract_adapter.WalletNotFoundError) {
      import_react_hot_toast.toast.error(e.message);
    } else if (e instanceof import_tronwallet_abstract_adapter.WalletDisconnectedError) {
      import_react_hot_toast.toast.error(e.message);
    } else {
      import_react_hot_toast.toast.error(e.message);
    }
  }
  const onChainChanged = (chainData) => {
    if (networkOption === "testnet") {
      if (chainData.chainId === "0xcd8690dc") {
        import_react_hot_toast.toast.error("Please switch to Tron Nile Testnet!");
        adapters[0].switchChain("0x3e9");
      } else if (chainData.chainId !== "0x3e9") {
        adapters[0].switchChain("0x3e9");
      }
    } else if (networkOption === "mainnet" && chainData.chainId !== "0x2b6653dc") {
      adapters[0].switchChain("0x2b6653dc");
    }
  };
  return /* @__PURE__ */ import_react85.default.createElement(
    import_tronwallet_adapter_react_hooks.WalletProvider,
    {
      adapters,
      onError,
      onChainChanged,
      autoConnect: false
    },
    children
  );
};
var WalletProvider_default3 = WalletProvider3;

// plugins/tron/core/hooks/useGetTrxBalance.tsx
var import_react86 = require("react");
var import_react_redux12 = require("react-redux");
var import_react_query10 = require("@tanstack/react-query");

// plugins/tron/tronweb.tsx
var import_tronweb2 = require("tronweb");
var TRON_USDK_OWNER_ADDRESS = "TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU";
var tronWebTestnet = new import_tronweb2.TronWeb({
  fullHost: "https://api.nileex.io"
});
var tronWebMainnet = new import_tronweb2.TronWeb({
  fullHost: "https://api.trongrid.io"
});
tronWebTestnet.setAddress(TRON_USDK_OWNER_ADDRESS);
tronWebMainnet.setAddress(TRON_USDK_OWNER_ADDRESS);

// plugins/tron/core/hooks/useGetTrxBalance.tsx
var import_tronwallet_adapter_react_hooks2 = require("@tronweb3/tronwallet-adapter-react-hooks");

// plugins/tron/utils/getTrxBalance.ts
var getTrxBalance = async (wallet, tronWeb) => {
  if (wallet?.adapter?.address) {
    try {
      const balanceInSun = await tronWeb.trx.getBalance(wallet.adapter.address);
      return balanceInSun / 1e6;
    } catch (error) {
      logger_default.error("Failed to fetch TRX balance:", error);
      throw new Error("Can't get tron balance");
    }
  } else {
    throw new Error("Wallet address is not available");
  }
};

// plugins/tron/core/hooks/useGetTrxBalance.tsx
function useGetTronBalance() {
  const networkOption = (0, import_react_redux12.useSelector)(selectNetworkOption);
  const { wallet } = (0, import_tronwallet_adapter_react_hooks2.useWallet)();
  const sourceNetwork = (0, import_react_redux12.useSelector)(selectSourceChain);
  const tronWeb = (0, import_react86.useMemo)(
    () => networkOption === "testnet" /* testnet */ ? tronWebTestnet : tronWebMainnet,
    [networkOption]
  );
  const result = (0, import_react_query10.useQuery)({
    queryKey: ["tronBalance", wallet?.adapter?.address, networkOption],
    // Query key
    queryFn: async () => getTrxBalance(wallet, tronWeb),
    enabled: !!wallet?.adapter?.address && sourceNetwork === "TRX",
    // Fetch only if wallet address is available
    refetchInterval: 6e4,
    // Refetch every 10 seconds
    staleTime: 1e4,
    // Mark data as stale after 10 seconds
    gcTime: 6e4
  });
  const { data: balance } = result;
  return { balance };
}
var useGetTrxBalance_default = useGetTronBalance;

// plugins/tron/core/hooks/useTronAllowance.tsx
var import_react_redux15 = require("react-redux");
var import_react_query12 = require("@tanstack/react-query");

// plugins/tron/core/hooks/useTronProvider.ts
var import_react_redux13 = require("react-redux");
var import_tronweb4 = require("tronweb");
var import_tronwallet_adapter_react_hooks3 = require("@tronweb3/tronwallet-adapter-react-hooks");
var import_react87 = require("react");
var useTronProvider = () => {
  const { externalProvider } = useKimaContext();
  const networkOption = (0, import_react_redux13.useSelector)(selectNetworkOption);
  const sourceChain = (0, import_react_redux13.useSelector)(selectSourceChain);
  const {
    address: internalUserAddress,
    signTransaction: internalSignTronTransaction,
    signMessage: internalSignMessage
  } = (0, import_tronwallet_adapter_react_hooks3.useWallet)();
  const isTronProvider2 = sourceChain.shortName === "TRX" && externalProvider?.type === "tron" && externalProvider.provider.tronWeb instanceof import_tronweb4.TronWeb && typeof externalProvider.signer === "string";
  const tronWeb = (0, import_react87.useMemo)(() => {
    if (isTronProvider2)
      return externalProvider.provider.tronWeb;
    return networkOption === "mainnet" ? tronWebMainnet : tronWebTestnet;
  }, [isTronProvider2, externalProvider, networkOption]);
  isTronProvider2 && tronWeb.setAddress(TRON_USDK_OWNER_ADDRESS);
  const userAddress = isTronProvider2 ? externalProvider.signer : internalUserAddress;
  const signTronTransaction = isTronProvider2 ? externalProvider.provider.signTransaction : internalSignTronTransaction;
  const signMessage = isTronProvider2 ? externalProvider.provider.signMessage : internalSignMessage;
  return {
    tronWeb,
    userAddress,
    signTronTransaction,
    signMessage
  };
};

// plugins/tron/core/hooks/useBalance.tsx
var import_react_redux14 = require("react-redux");

// plugins/tron/utils/ethereum/erc20ABI.json
var erc20ABI_default = {
  abi: [
    {
      constant: true,
      inputs: [],
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
      inputs: [],
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
      inputs: [],
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
      inputs: [],
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
  ]
};

// plugins/tron/utils/getTokenAllowance.tsx
var getTokenAllowance3 = async ({
  tokenOptions,
  selectedCoin,
  userAddress,
  pools,
  tronWeb,
  abi
}) => {
  try {
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, "TRX");
    const poolAddress = getPoolAddress(pools, "TRX");
    let trcContract = tronWeb.contract(abi.abi, tokenAddress);
    const [balance] = await trcContract.balanceOf(userAddress).call();
    const decimals = await trcContract.decimals().call();
    const allowance = await trcContract.allowance(userAddress, poolAddress).call();
    logger_default.debug("getTronAllowance:", { allowance, balance, decimals });
    return {
      allowance: BigInt(allowance),
      balance: BigInt(balance),
      decimals: Number(decimals)
    };
  } catch (error) {
    logger_default.error("Error getting allowance for tron token", error);
    throw new Error("Error getting allowance for tron token");
  }
};

// plugins/tron/core/hooks/useBalance.tsx
var import_react_query11 = require("@tanstack/react-query");
var emptyResult3 = {};
function useBalance3() {
  const mode = (0, import_react_redux14.useSelector)(selectMode);
  const selectedCoin = (0, import_react_redux14.useSelector)(selectSourceCurrency);
  const sourceChain = (0, import_react_redux14.useSelector)(selectSourceChain);
  const networkOptions3 = (0, import_react_redux14.useSelector)(selectNetworkOption);
  const tokenOptions = (0, import_react_redux14.useSelector)(selectTokenOptions);
  const backendUrl = (0, import_react_redux14.useSelector)(selectBackendUrl);
  const { pools } = useGetPools_default(backendUrl, networkOptions3);
  const { tronWeb, userAddress: walletAddress } = useTronProvider();
  const userAddress = mode === "light" /* light */ ? lightDemoAccounts.TRX : walletAddress;
  const { data: allowanceData } = (0, import_react_query11.useQuery)({
    queryKey: ["tronAllowance", userAddress],
    queryFn: async () => await getTokenAllowance3({
      tokenOptions,
      selectedCoin,
      userAddress,
      pools,
      tronWeb,
      abi: erc20ABI_default
    }),
    refetchInterval: 1e3 * 60,
    // 1 min
    enabled: !!tokenOptions && !!selectedCoin && !!userAddress && !!tronWeb && pools.length > 0 && sourceChain.shortName === "TRX",
    staleTime: 1e3 * 60
    // 1 min
  });
  return allowanceData ?? emptyResult3;
}

// plugins/tron/core/hooks/useTronAllowance.tsx
function useTronAllowance() {
  const queryClient2 = (0, import_react_query12.useQueryClient)();
  const mode = (0, import_react_redux15.useSelector)(selectMode);
  const networkOption = (0, import_react_redux15.useSelector)(selectNetworkOption);
  const backendUrl = (0, import_react_redux15.useSelector)(selectBackendUrl);
  const { transactionValues } = (0, import_react_redux15.useSelector)(selectServiceFee);
  const selectedCoin = (0, import_react_redux15.useSelector)(selectSourceCurrency);
  const tokenOptions = (0, import_react_redux15.useSelector)(selectTokenOptions);
  const feeDeduct = (0, import_react_redux15.useSelector)(selectFeeDeduct);
  const txValues = feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin;
  const allowanceNumber = BigInt(txValues.allowanceAmount.value);
  const { pools } = useGetPools_default(backendUrl, networkOption);
  const {
    tronWeb,
    userAddress: walletAddress,
    signTronTransaction,
    signMessage
  } = useTronProvider();
  const allowanceData = useBalance3();
  const userAddress = mode === "light" /* light */ ? lightDemoAccounts.TRX : walletAddress;
  const signTronMessage = async (data) => {
    if (!tronWeb) {
      logger_default.warn("TronWeb not initialized");
      return;
    }
    try {
      logger_default.debug("useTronAllowance: Signing message:", txValues.message);
      const signedMessage = await signMessage(txValues.message);
      return signedMessage;
    } catch (error) {
      logger_default.error("Error signing message:", error);
      throw error;
    }
  };
  const approveTrc20TokenTransfer = async (isCancel = false) => {
    if (!userAddress || !pools || !tronWeb || !tokenOptions || !selectedCoin || !allowanceNumber) {
      logger_default.warn("Missing required data for approveTrc20TokenTransfer");
      return;
    }
    const poolAddress = getPoolAddress(pools, "TRX");
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, "TRX");
    try {
      const functionSelector = "approve(address,uint256)";
      const amount = isCancel ? "0" : allowanceNumber.toString();
      const parameter = [
        { type: "address", value: poolAddress },
        {
          type: "uint256",
          value: amount
        }
      ];
      logger_default.info("useTronAllowance: Approving amount:", amount);
      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(tokenAddress),
        functionSelector,
        {},
        parameter,
        tronWeb.address.toHex(userAddress)
      );
      const signedTx = await signTronTransaction(transaction.transaction);
      const tx = await tronWeb.trx.sendRawTransaction(signedTx);
      logger_default.debug("useTronAllowance: Transaction sent", {
        hash: tx.txid,
        tx: JSON.stringify(tx, null, 2)
      });
      await queryClient2.invalidateQueries({ queryKey: ["tronAllowance"] });
      return;
    } catch (error) {
      logger_default.error("Error approving token: ", error);
      throw error;
    }
  };
  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance ? allowanceData.allowance >= allowanceNumber : false,
    approve: approveTrc20TokenTransfer,
    signMessage: signTronMessage
  };
}

// plugins/tron/core/hooks/useIsWalletReady.tsx
var import_react88 = require("react");
var import_tronwallet_adapter_react_hooks4 = require("@tronweb3/tronwallet-adapter-react-hooks");
var import_react_redux16 = require("react-redux");
var import_react_redux17 = require("react-redux");
var createWalletStatus2 = (isReady, statusMessage = "", connectedAddress) => ({
  isReady,
  statusMessage,
  connectedAddress
});
function useIsWalletReady3() {
  const dispatch = (0, import_react_redux16.useDispatch)();
  const mode = (0, import_react_redux17.useSelector)(selectMode);
  const sourceChain = (0, import_react_redux17.useSelector)(selectSourceChain);
  const { externalProvider } = useKimaContext();
  const { address: internalTronAddress } = (0, import_tronwallet_adapter_react_hooks4.useWallet)();
  (0, import_react88.useEffect)(() => {
    if (sourceChain.shortName !== "TRX") return;
    if (mode === "light" /* light */) {
      dispatch(setSourceAddress(lightDemoAccounts.TRX));
      return;
    }
    internalTronAddress && dispatch(setSourceAddress(internalTronAddress));
  }, [mode, internalTronAddress, sourceChain]);
  return (0, import_react88.useMemo)(() => {
    if (mode === "light" /* light */)
      return createWalletStatus2(
        true,
        "Connected with light demo account",
        lightDemoAccounts.TRX
      );
    if (externalProvider && externalProvider.type === "tron")
      return createWalletStatus2(
        true,
        "Connected with external provider",
        externalProvider.signer
      );
    if (internalTronAddress)
      return createWalletStatus2(
        true,
        "Connected with internal provider",
        internalTronAddress
      );
    return createWalletStatus2(false, "Tron wallet not connected", "");
  }, [sourceChain, internalTronAddress, externalProvider]);
}
var useIsWalletReady_default3 = useIsWalletReady3;

// plugins/tron/core/hooks/useDisconnectWallet.tsx
var import_tronwallet_adapter_react_hooks5 = require("@tronweb3/tronwallet-adapter-react-hooks");
function useDisconnectWallet3() {
  const { disconnect } = (0, import_tronwallet_adapter_react_hooks5.useWallet)();
  return { disconnectWallet: disconnect };
}
var useDisconnectWallet_default3 = useDisconnectWallet3;

// plugins/tron/index.tsx
var TronPlugin = class extends PluginBase {
  constructor(store2) {
    super({
      store: store2,
      id: "TRX",
      compatibility: "SELF" /* SELF */,
      useAllowance: useTronAllowance,
      useNativeBalance: useGetTrxBalance_default,
      useTokenBalance: useTronAllowance,
      useWalletIsReady: useIsWalletReady_default3,
      useDisconnectWallet: useDisconnectWallet_default3
    });
  }
  isCompatible = (chain) => {
    return chain.shortName === "TRX";
  };
  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }) => {
    return /* @__PURE__ */ import_react89.default.createElement(
      WalletProvider_default3,
      {
        networkOption,
        walletConnectProjectId
      },
      children
    );
  };
};
var tronPlugin = new TronPlugin(store);
var tron_default = tronPlugin;

// plugins/credit-card/index.tsx
var import_react91 = __toESM(require("react"), 1);

// plugins/credit-card/core/hooks/useIsProviderReady.tsx
var import_react_redux18 = require("react-redux");
var import_react90 = require("react");
var useIsProviderReady = () => {
  const [isReady, setIsReady] = (0, import_react90.useState)(false);
  const dispatch = (0, import_react_redux18.useDispatch)();
  const sourceChain = (0, import_react_redux18.useSelector)(selectSourceChain);
  (0, import_react90.useEffect)(() => {
    if (sourceChain.compatibility === "CC" /* CC */) {
      logger_default.debug("CC:useIsProviderReady: dispatching changes from fiat...");
      dispatch(setSourceAddress(""));
      dispatch(setSourceCurrency("USD"));
      setIsReady(true);
    }
  }, [sourceChain]);
  return { isReady, statusMessage: "", walletAddres: "" };
};
var useIsProviderReady_default = useIsProviderReady;

// plugins/credit-card/index.tsx
var useAllowance = () => ({
  isApproved: true,
  // isLoading: false,
  approve: async () => {
  }
  // refetch: async () => {}
});
var useNativeBalance = () => ({
  balance: BigInt(0),
  decimals: 18
});
var useTokenBalance = () => ({
  balance: BigInt(0),
  decimals: 6
});
var useDisconnectWallet4 = () => ({
  disconnectWallet: async () => {
  }
});
var CreditCardPlugin = class extends PluginBase {
  constructor(store2) {
    super({
      store: store2,
      id: "CC",
      compatibility: "CC" /* CC */,
      useTokenBalance,
      useNativeBalance,
      useAllowance,
      useWalletIsReady: useIsProviderReady_default,
      useDisconnectWallet: useDisconnectWallet4
    });
  }
  isCompatible = (chain) => {
    return chain.compatibility === "CC";
  };
  Provider = ({ children }) => {
    return /* @__PURE__ */ import_react91.default.createElement(import_react91.default.Fragment, null, children);
  };
};
var creditCardPlugin = new CreditCardPlugin(store);
var credit_card_default = creditCardPlugin;

// plugins/index.ts
initializePlugins([evm_default, solana_default, tron_default, credit_card_default]);

// src/KimaProvider.tsx
var import_web311 = require("@solana/web3.js");
var import_ethers5 = require("ethers");
var queryClient = new import_react_query13.QueryClient();
var KimaContext = (0, import_react92.createContext)(void 0);
var useKimaContext = () => {
  const context = (0, import_react92.useContext)(KimaContext);
  if (!context) {
    throw new Error("useKimaContext must be used within a KimaProvider");
  }
  return context;
};
var InternalKimaProvider = React81.memo(
  ({ kimaBackendUrl, walletConnectProjectId, children, logLevel }) => {
    const { data: envOptions, isLoading } = useGetEnvOptions({
      kimaBackendUrl
    });
    logger_default.debug("internalkimaprovider: networkoption: ", envOptions?.env);
    logger_default.debug("internalkimaprovider: isLoading: ", isLoading);
    const plugins = (0, import_react_redux19.useSelector)(selectAllPlugins, (prev, next) => prev === next);
    logger_default.debug("Registered Plugins:", plugins);
    const WrappedProviders = (0, import_react92.useMemo)(() => {
      return plugins.reduce((acc, pluginData) => {
        const plugin = getPluginProvider(pluginData.id);
        if (plugin) {
          const { Provider: Provider3 } = plugin;
          return /* @__PURE__ */ React81.createElement(
            Provider3,
            {
              key: plugin.data.id,
              networkOption: envOptions?.env,
              walletConnectProjectId,
              isLoading
            },
            acc
          );
        }
        return acc;
      }, children);
    }, [plugins, walletConnectProjectId, envOptions, isLoading]);
    return /* @__PURE__ */ React81.createElement(React81.Fragment, null, WrappedProviders);
  }
);
var KimaProvider = ({
  walletConnectProjectId,
  children = /* @__PURE__ */ React81.createElement(React81.Fragment, null),
  externalProvider,
  kimaBackendUrl = "http://localhost:3001",
  logLevel,
  keplrHandler,
  successHandler,
  closeHandler,
  errorHandler,
  switchChainHandler
}) => {
  if (logLevel) {
    logger_default.debug("KimaProvider: setting log level to:", logLevel);
    logger_default.setLevel(logLevel, false);
  }
  let validExternalProvider;
  let sourceAddress;
  if (externalProvider && isValidExternalProvider(externalProvider)) {
    validExternalProvider = externalProvider;
    if (externalProvider.type === "evm" && externalProvider.signer instanceof import_ethers5.JsonRpcSigner)
      sourceAddress = externalProvider.signer.address;
    if (externalProvider.type === "solana" && externalProvider.signer instanceof import_web311.PublicKey)
      sourceAddress = externalProvider.signer.toBase58();
    if (externalProvider.type === "tron" && typeof externalProvider.signer === "string")
      sourceAddress = externalProvider.signer;
  }
  const kimaContext = {
    externalProvider: validExternalProvider,
    sourceAddress,
    kimaBackendUrl,
    keplrHandler,
    successHandler,
    closeHandler,
    errorHandler,
    switchChainHandler
  };
  return /* @__PURE__ */ React81.createElement(import_react_query13.QueryClientProvider, { client: queryClient }, /* @__PURE__ */ React81.createElement(import_react_redux19.Provider, { store }, /* @__PURE__ */ React81.createElement(KimaContext.Provider, { value: kimaContext }, /* @__PURE__ */ React81.createElement(
    InternalKimaProvider,
    {
      kimaBackendUrl,
      walletConnectProjectId
    },
    children
  ))));
};
var KimaProvider_default = KimaProvider;

// src/components/KimaTransactionWidget.tsx
var import_react141 = __toESM(require("react"), 1);

// src/components/KimaWidgetWrapper.tsx
var import_react137 = __toESM(require("react"), 1);
var import_react_redux58 = require("react-redux");

// src/components/TransactionWidget.tsx
var import_react122 = __toESM(require("react"), 1);

// src/components/reusable/Progressbar.tsx
var import_react93 = __toESM(require("react"), 1);
var import_react_redux20 = require("react-redux");
var stepInfo = [
  {
    title: "Initialize"
  },
  {
    title: "Source Transfer"
  },
  {
    title: "Validation"
  },
  {
    title: "Target Transfer"
  },
  {
    title: "Finalize"
  }
];
var Progressbar = ({ step, errorStep, setFocus, loadingStep }) => {
  const theme = (0, import_react_redux20.useSelector)(selectTheme);
  return /* @__PURE__ */ import_react93.default.createElement("div", { className: "kima-progressbar" }, /* @__PURE__ */ import_react93.default.createElement(
    "div",
    {
      className: `value step-${step * 100 / 4}`
    }
  ), /* @__PURE__ */ import_react93.default.createElement("div", { className: "step-indicators" }, stepInfo.map((item, index) => /* @__PURE__ */ import_react93.default.createElement(
    "div",
    {
      key: item.title,
      className: `step ${step === index && "active"} 
                  ${step >= index ? index === errorStep ? "error" : "completed" : ""} 
                  ${step < index && "locked"} ${theme.colorMode}`,
      onClick: () => {
        if (index < 4) setFocus(index);
      }
    },
    /* @__PURE__ */ import_react93.default.createElement("div", { className: "step-info" }, step < index && /* @__PURE__ */ import_react93.default.createElement(Lock_default, null), step >= index ? index === loadingStep ? /* @__PURE__ */ import_react93.default.createElement(Loader_default, { className: "loader" }) : index === errorStep ? /* @__PURE__ */ import_react93.default.createElement(Warning_default, null) : /* @__PURE__ */ import_react93.default.createElement(Check_default, null) : null, /* @__PURE__ */ import_react93.default.createElement("span", null, item.title))
  ))));
};
var Progressbar_default = Progressbar;

// src/components/reusable/ExternalLink.tsx
var import_react94 = __toESM(require("react"), 1);
var ExternalLink = ({ to, children, className, rest }) => /* @__PURE__ */ import_react94.default.createElement(
  "a",
  {
    className,
    href: to,
    target: "_blank",
    rel: "noreferrer noopener",
    ...rest
  },
  children
);
var ExternalLink_default = ExternalLink;

// src/components/reusable/NetworkLabel.tsx
var import_react95 = __toESM(require("react"), 1);
var import_react_redux21 = require("react-redux");

// src/components/reusable/PrimaryButton.tsx
var import_react98 = __toESM(require("react"), 1);

// src/assets/loading/180-ring.tsx
var import_react96 = __toESM(require("react"), 1);
var Loading180Ring = ({
  width = 24,
  height = 24,
  fill = "white"
}) => {
  return /* @__PURE__ */ import_react96.default.createElement(
    "svg",
    {
      width,
      height,
      fill,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ import_react96.default.createElement("path", { d: "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" }, /* @__PURE__ */ import_react96.default.createElement(
      "animateTransform",
      {
        attributeName: "transform",
        type: "rotate",
        dur: "0.75s",
        values: "0 12 12;360 12 12",
        repeatCount: "indefinite"
      }
    ))
  );
};
var ring_default = Loading180Ring;

// src/assets/loading/6-dots-scale.tsx
var import_react97 = __toESM(require("react"), 1);

// src/components/reusable/PrimaryButton.tsx
var PrimaryButton = ({
  className,
  clickHandler,
  children,
  isLoading = false,
  disabled = false,
  ref
}) => {
  return /* @__PURE__ */ import_react98.default.createElement("div", { className: "primary-button-wrapper" }, /* @__PURE__ */ import_react98.default.createElement(
    "button",
    {
      className: `primary-button ${className}`,
      onClick: clickHandler,
      ref,
      disabled
    },
    isLoading && /* @__PURE__ */ import_react98.default.createElement("div", { className: "loading-indicator" }, /* @__PURE__ */ import_react98.default.createElement(ring_default, { width: 24, height: 24, fill: "white" })),
    children
  ));
};
var PrimaryButton_default = PrimaryButton;

// src/components/reusable/SecondaryButton.tsx
var import_react99 = __toESM(require("react"), 1);
var SecondaryButton = ({
  className,
  clickHandler,
  children,
  theme,
  style,
  disabled = false,
  isLoading
}) => /* @__PURE__ */ import_react99.default.createElement(
  "button",
  {
    className: `secondary-button ${className} ${theme}`,
    onClick: clickHandler,
    ...style,
    disabled
  },
  isLoading && /* @__PURE__ */ import_react99.default.createElement("div", { className: "loading-indicator" }, /* @__PURE__ */ import_react99.default.createElement(ring_default, { width: 24, height: 24, fill: "black" })),
  children
);
var SecondaryButton_default = SecondaryButton;

// src/components/reusable/Dropdown.tsx
var import_react100 = __toESM(require("react"), 1);
var import_react_redux22 = require("react-redux");
var import_react_redux23 = require("react-redux");

// src/components/reusable/WalletButton.tsx
var import_react106 = __toESM(require("react"), 1);
var import_react_redux25 = require("react-redux");

// src/hooks/useGetCurrentPlugin.tsx
var import_react102 = require("react");
var import_react_redux24 = require("react-redux");

// plugins/default/index.tsx
var import_react101 = __toESM(require("react"), 1);
var DefaultPlugin = class extends PluginBase {
  constructor(store2) {
    super({
      store: store2,
      compatibility: "SELF" /* SELF */,
      id: "DEFAULT",
      useAllowance: () => ({
        isApproved: false,
        poolAddress: "",
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useNativeBalance: () => ({
        balance: 0,
        decimals: 0
      }),
      useTokenBalance: () => ({
        balance: 0,
        decimals: 0
      }),
      useWalletIsReady: () => ({
        isReady: false,
        statusMessage: ""
      })
    });
  }
  isCompatible = () => {
    return false;
  };
  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }) => {
    return /* @__PURE__ */ import_react101.default.createElement("div", null, children);
  };
};
var defaultPlugin = new DefaultPlugin(store);
var default_default = defaultPlugin;

// src/hooks/useGetCurrentPlugin.tsx
var useGetCurrentPlugin = () => {
  const [currentPlugin, setCurrentPlugin] = (0, import_react102.useState)(default_default);
  const isIndexed = (0, import_react_redux24.useSelector)(selectPluginIsIndexed);
  const sourceChain = (0, import_react_redux24.useSelector)(selectSourceChain);
  (0, import_react102.useEffect)(() => {
    if (!isIndexed) return;
    const plugin = getPlugin(sourceChain.shortName);
    if (plugin) setCurrentPlugin(plugin);
  }, [sourceChain, isIndexed]);
  return { currentPlugin };
};
var useGetCurrentPlugin_default = useGetCurrentPlugin;

// src/hooks/useIsWalletReady.tsx
var allPlugins = getAllPlugins();
var defaultStatus = {
  isReady: false,
  statusMessage: "",
  connectedAddress: ""
};
function useIsWalletReady4() {
  const { currentPlugin } = useGetCurrentPlugin_default();
  const currentPluginID = currentPlugin?.data?.id;
  const pluginEntries = Object.entries(allPlugins);
  const allData = pluginEntries.map(([pluginID, plugin]) => {
    try {
      const ready = plugin.useWalletIsReady();
      return { pluginID, ...ready };
    } catch (err) {
      logger_default.warn("useWalletIsReady: error for plugin", pluginID, err);
      return { pluginID, ...defaultStatus };
    }
  });
  const mainConnection = allData.find(
    ({ pluginID }) => pluginID === currentPluginID
  );
  return mainConnection ?? defaultStatus;
}

// src/hooks/useBalance.tsx
var allPlugins2 = getAllPlugins();
var zeroBalance = {
  balance: BigInt(0),
  decimals: 6
};
function useBalance4() {
  const { currentPlugin } = useGetCurrentPlugin_default();
  const currentPluginID = currentPlugin?.data?.id;
  const pluginEntries = Object.entries(allPlugins2);
  const allBalances = pluginEntries.map(([pluginID, plugin]) => {
    const balanceData = plugin?.useTokenBalance?.();
    return { pluginID, ...balanceData };
  });
  if (currentPluginID) {
    const mainBalance = allBalances.find(
      ({ pluginID }) => pluginID === currentPluginID
    );
    return mainBalance ?? zeroBalance;
  }
  return zeroBalance;
}

// src/hooks/useWidth.tsx
var import_react103 = require("react");
var useWidth = () => {
  const [width, setWidth] = (0, import_react103.useState)(0);
  const updateWidth = (width2) => {
    setWidth(width2);
  };
  (0, import_react103.useEffect)(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { width, updateWidth };
};
var useWidth_default = useWidth;

// src/components/reusable/WalletButton.tsx
var import_wallet_adapter_react6 = require("@solana/wallet-adapter-react");
var import_tronwallet_adapter_react_hooks6 = require("@tronweb3/tronwallet-adapter-react-hooks");
var import_react107 = require("@reown/appkit/react");

// src/components/reusable/CopyButton.tsx
var import_react104 = __toESM(require("react"), 1);
var CopyButton = ({ text }) => {
  const [copyClicked, setCopyClicked] = (0, import_react104.useState)(false);
  (0, import_react104.useEffect)(() => {
    if (!copyClicked) return;
    setTimeout(() => {
      setCopyClicked(false);
    }, 2e3);
  }, [copyClicked]);
  return /* @__PURE__ */ import_react104.default.createElement(
    "span",
    {
      className: "copy-btn",
      onClick: () => {
        setCopyClicked(true);
        navigator.clipboard.writeText(text);
      }
    },
    copyClicked ? /* @__PURE__ */ import_react104.default.createElement(Check_default, null) : /* @__PURE__ */ import_react104.default.createElement(Copy_default, null)
  );
};
var CopyButton_default = CopyButton;

// src/helpers/functions.tsx
var import_viem5 = require("viem");
var formatterInt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});
var formatterFloat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 6,
  useGrouping: false
});
var bigIntToNumber = (inputs) => {
  const { value, decimals } = inputs || {};
  if (!value || !decimals) return 0;
  const valBigInt = BigInt(value);
  const valNumberStr = (0, import_viem5.formatUnits)(valBigInt, decimals);
  return Number(valNumberStr);
};
var bigIntChangeDecimals = (inputs) => {
  const { value, decimals, newDecimals } = inputs || {};
  const valBigInt = BigInt(value);
  if (decimals === newDecimals) return { value: valBigInt, decimals };
  if (decimals > newDecimals) {
    return {
      value: valBigInt / BigInt(10 ** (decimals - newDecimals)),
      decimals: newDecimals
    };
  }
  return {
    value: valBigInt * BigInt(10 ** (newDecimals - decimals)),
    decimals: newDecimals
  };
};
var formatBigInt = (inputs) => {
  return formatterFloat.format(bigIntToNumber(inputs));
};
var toBigintAmount = (data) => {
  return {
    value: BigInt(data.value),
    decimals: data.decimals
  };
};
var formatUSD = (amount) => {
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) {
    throw new Error(
      "Invalid input: amount must be a number or a numeric string"
    );
  }
  return numericAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
};
var isEVM = (shortName) => [
  "ETH" /* ETHEREUM */,
  "POL" /* POLYGON */,
  "AVX" /* AVALANCHE */,
  "BSC" /* BSC */,
  "OPT" /* OPTIMISM */,
  "ARB" /* ARBITRUM */,
  "ZKE" /* POLYGON_ZKEVM */,
  "BASE" /* BASE */,
  "BERA" /* BERA */
].includes(shortName);
var isSolana = (shortName) => shortName === "SOL" /* SOLANA */;
var isTron = (shortName) => shortName === "TRX" /* TRON */;
var isAddressCompatible = (address, shortName) => {
  if (isEVM(shortName)) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
  if (isSolana(shortName)) {
    return /^[1-9A-HJ-NP-Za-km-z]{32,45}$/.test(address);
  }
  if (isTron(shortName)) {
    return /^T[a-zA-Z0-9]{33}$/.test(address);
  }
  return false;
};

// src/hooks/useHideActivityTab.tsx
var import_react105 = require("react");
function useHideWuiListItem(isModalOpen) {
  (0, import_react105.useEffect)(() => {
    const modalSelector = "w3m-modal";
    let observer;
    const hideFirstWuiListItem = (parent) => {
      const stack = [parent];
      while (stack.length > 0) {
        const current = stack.shift();
        if (!current) continue;
        if (current.tagName === "WUI-LIST-ITEM") {
          current.style.display = "none";
          break;
        }
        if (current.shadowRoot) {
          stack.push(current.shadowRoot);
        }
        stack.push(...Array.from(current.children));
      }
    };
    const observeModal = () => {
      const modal = document.querySelector(modalSelector);
      if (modal?.shadowRoot) {
        const shadowRoot = modal.shadowRoot;
        const wuiFlex = shadowRoot.querySelector("wui-flex");
        if (wuiFlex) {
          hideFirstWuiListItem(wuiFlex);
        }
      }
    };
    const setupObserver = () => {
      observer = new MutationObserver(() => {
        const modal = document.querySelector(modalSelector);
        if (modal) {
          observeModal();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };
    if (isModalOpen) {
      setupObserver();
      observeModal();
    } else {
      if (observer) {
        observer.disconnect();
      }
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isModalOpen]);
}
var useHideActivityTab_default = useHideWuiListItem;

// src/components/reusable/WalletButton.tsx
var WalletButton = ({
  errorBelow = false,
  initialSelection,
  placeholder = false
}) => {
  const dispatch = (0, import_react_redux25.useDispatch)();
  const theme = (0, import_react_redux25.useSelector)(selectTheme);
  const mode = (0, import_react_redux25.useSelector)(selectMode);
  const selectedCoin = (0, import_react_redux25.useSelector)(selectSourceCurrency);
  const sourceCompliant = (0, import_react_redux25.useSelector)(selectSourceCompliant);
  const compliantOption = (0, import_react_redux25.useSelector)(selectCompliantOption);
  const selectedNetwork = (0, import_react_redux25.useSelector)(selectSourceChain);
  const targetAddress = (0, import_react_redux25.useSelector)(selectTargetAddress);
  const { externalProvider } = useKimaContext();
  const { connected: isSolanaConnected } = (0, import_wallet_adapter_react6.useWallet)();
  const { connected: isTronConnected } = (0, import_tronwallet_adapter_react_hooks6.useWallet)();
  const {
    isReady,
    statusMessage,
    connectedAddress
    /*, connectBitcoinWallet*/
  } = useIsWalletReady4();
  const { balance, decimals } = useBalance4();
  const { open } = (0, import_react107.useAppKit)();
  const { open: isModalOpen } = (0, import_react107.useAppKitState)();
  const { width, updateWidth } = useWidth_default();
  useHideActivityTab_default(isModalOpen);
  const { kimaBackendUrl } = useKimaContext();
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl });
  const networkOption = envOptions?.env || "testnet" /* testnet */;
  (0, import_react106.useEffect)(() => {
    logger_default.debug("WalletBalance:", {
      balance,
      connectedAddress,
      isReady,
      statusMessage,
      externalProvider
    });
  }, [balance, connectedAddress, isReady, externalProvider, networkOption]);
  (0, import_react106.useEffect)(() => {
    if (width === 0) {
      updateWidth(window.innerWidth);
    }
  }, []);
  const handleClick = async () => {
    logger_default.debug("Handling click");
    if (externalProvider || initialSelection || placeholder || mode === "light" /* light */)
      return;
    if (selectedNetwork.shortName === "SOL" /* SOLANA */) {
      logger_default.debug("Handling click: Case SOL", 1);
      isSolanaConnected ? dispatch(setAccountDetailsModal(true)) : dispatch(setSolanaConnectModal(true));
      return;
    }
    if (selectedNetwork.shortName === "TRX" /* TRON */) {
      logger_default.debug("Handling click: Case TRX", 2);
      isTronConnected ? dispatch(setAccountDetailsModal(true)) : dispatch(setTronConnectModal(true));
      return;
    }
    logger_default.debug("Handling click: Case EVM", 4);
    try {
      logger_default.debug("Attempting to open AppKitModal");
      await open();
      logger_default.debug("AppKitModal opened successfully");
    } catch (error) {
      logger_default.error("Failed to open AppKitModal", error);
    }
  };
  const errorMessage = (0, import_react106.useMemo)(() => {
    if (!isReady) return statusMessage;
    if (compliantOption && sourceCompliant !== null && !sourceCompliant?.isCompliant)
      return `Source address has ${sourceCompliant?.results?.[0].result?.risk_score} risk`;
    return "";
  }, [isReady, statusMessage, sourceCompliant, compliantOption]);
  const isConnected = (0, import_react106.useMemo)(() => {
    return isReady && !initialSelection;
  }, [isReady, initialSelection]);
  (0, import_react106.useEffect)(() => {
    if (!isReady) {
      dispatch(setSourceAddress(""));
      return;
    }
    dispatch(setSourceAddress(connectedAddress));
  }, [isReady]);
  return /* @__PURE__ */ import_react106.default.createElement(
    "div",
    {
      className: `wallet-button ${isConnected ? "connected" : "disconnected"} ${theme.colorMode} ${errorBelow ? "error-below" : ""}`,
      "data-testid": "connect-wallet-btn"
    },
    /* @__PURE__ */ import_react106.default.createElement("div", { className: "info-wrapper" }, /* @__PURE__ */ import_react106.default.createElement(
      "button",
      {
        className: `${isConnected ? "connected" : "disconnected"} ${width < 640 && "shortened"} ${theme.colorMode}`,
        onClick: handleClick
      },
      placeholder && !initialSelection && (width >= 640 ? `${targetAddress || ""}` : getShortenedAddress(targetAddress || "")),
      isConnected && !placeholder ? width >= 640 ? `${connectedAddress || ""}` : getShortenedAddress(connectedAddress || "") : "",
      !isConnected && mode === "light" /* light */ && "Select Network to Load Account",
      !isConnected && mode !== "light" /* light */ && initialSelection && "Select Network to Connect",
      !isConnected && mode !== "light" /* light */ && !initialSelection && /* @__PURE__ */ import_react106.default.createElement(Wallet_default, null),
      !isConnected && mode !== "light" /* light */ && !initialSelection && "Connect Wallet"
    ), isConnected && !placeholder && /* @__PURE__ */ import_react106.default.createElement(CopyButton_default, { text: connectedAddress })),
    isConnected && !placeholder && balance !== void 0 && decimals !== void 0 ? /* @__PURE__ */ import_react106.default.createElement("p", { className: "balance-info" }, formatUSD(bigIntToNumber({ value: balance, decimals })), " ", selectedCoin, " available") : null
  );
};
var WalletButton_default = WalletButton;

// src/components/reusable/CoinDropdown.tsx
var import_react110 = __toESM(require("react"), 1);
var import_react_redux28 = require("react-redux");
var import_react_redux29 = require("react-redux");

// src/hooks/useCurrencyOptions.tsx
var import_react108 = require("react");
var import_react_redux26 = require("react-redux");
var import_react_redux27 = require("react-redux");
function useCurrencyOptions(isSourceChain) {
  const dispatch = (0, import_react_redux27.useDispatch)();
  const mode = (0, import_react_redux26.useSelector)(selectMode);
  const sourceChain = (0, import_react_redux26.useSelector)(selectSourceChain);
  const targetChain = (0, import_react_redux26.useSelector)(selectTargetChain);
  const chain = isSourceChain ? sourceChain : targetChain;
  const transactionOption = (0, import_react_redux26.useSelector)(selectTransactionOption);
  const networks = (0, import_react_redux26.useSelector)(selectNetworks);
  const output = (0, import_react108.useMemo)(() => {
    logger_default.debug("useCurrencyOptions: networks: ", networks);
    const networkTokenList = networks.find((network) => network.id === chain.id) || networks[0];
    logger_default.debug("useCurrencyOptions: networkTokenList: ", networkTokenList, chain);
    return !!networks ? { tokenList: networkTokenList?.supportedTokens } : { tokenList: [] };
  }, [networks, chain]);
  const { tokenList } = output;
  (0, import_react108.useEffect)(() => {
    if (!tokenList.length) return;
    if (mode === "payment" /* payment */ && !isSourceChain) return;
    const [firstToken] = tokenList;
    if (isSourceChain) {
      dispatch(setSourceCurrency(firstToken.symbol));
    } else {
      dispatch(setTargetCurrency(firstToken.symbol));
    }
  }, [tokenList, transactionOption, isSourceChain]);
  return output;
}

// src/components/reusable/TokenIcon.tsx
var import_react109 = __toESM(require("react"), 1);
var COIN_LIST = {
  KEUR: KEUR_default,
  KIMAUSD: USDK_default,
  USDC: USDC_default,
  USDK: USDK_default,
  USDT: USDT_default,
  WBTC: BTC_default,
  USD: USD_default,
  HONEY: Honey_default
};
function TokenIcon({
  symbol,
  width = 24,
  height = 24
}) {
  if (!symbol) return null;
  const Icon = COIN_LIST[symbol];
  if (!Icon) {
    logger_default.warn(`Token icon not found for symbol: ${symbol}`);
    return null;
  }
  return /* @__PURE__ */ import_react109.default.createElement("div", { className: "icon-wrapper" }, /* @__PURE__ */ import_react109.default.createElement(Icon, { width, height }));
}

// src/components/reusable/CoinDropdown.tsx
var CoinDropdown = ({
  isSourceChain = true
}) => {
  const ref = (0, import_react110.useRef)();
  const dispatch = (0, import_react_redux29.useDispatch)();
  const [collapsed, setCollapsed] = (0, import_react110.useState)(true);
  const sourceCurrency = (0, import_react_redux28.useSelector)(selectSourceCurrency);
  const targetCurrency = (0, import_react_redux28.useSelector)(selectTargetCurrency);
  const { tokenList } = useCurrencyOptions(isSourceChain);
  const theme = (0, import_react_redux28.useSelector)(selectTheme);
  const tokenSymbol = isSourceChain ? sourceCurrency : targetCurrency;
  (0, import_react110.useEffect)(() => {
    const bodyMouseDowntHandler = (e) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", bodyMouseDowntHandler);
    return () => {
      document.removeEventListener("mousedown", bodyMouseDowntHandler);
    };
  }, [setCollapsed]);
  const handleDropdownItemClick = (symbol) => {
    if (isSourceChain) {
      dispatch(setSourceCurrency(symbol));
    } else {
      dispatch(setTargetCurrency(symbol));
    }
  };
  return /* @__PURE__ */ import_react110.default.createElement(
    "div",
    {
      className: `coin-dropdown ${theme.colorMode} ${collapsed ? "collapsed" : "toggled"}`,
      onClick: () => setCollapsed((prev) => !prev),
      ref
    },
    /* @__PURE__ */ import_react110.default.createElement("div", { className: "coin-wrapper" }, /* @__PURE__ */ import_react110.default.createElement(TokenIcon, { symbol: tokenSymbol, width: 24, height: 24 }), /* @__PURE__ */ import_react110.default.createElement("span", { className: "coin" }, tokenSymbol)),
    /* @__PURE__ */ import_react110.default.createElement(
      "div",
      {
        className: `coin-menu ${theme.colorMode} ${collapsed ? "collapsed" : "toggled"}`
      },
      tokenList.map((token) => /* @__PURE__ */ import_react110.default.createElement(
        "div",
        {
          className: `coin-item ${theme.colorMode}`,
          key: token.symbol,
          onClick: () => handleDropdownItemClick(token.symbol)
        },
        /* @__PURE__ */ import_react110.default.createElement(TokenIcon, { symbol: token.symbol, width: 24, height: 24 }),
        /* @__PURE__ */ import_react110.default.createElement("p", null, token.symbol)
      ))
    ),
    /* @__PURE__ */ import_react110.default.createElement("div", { className: `dropdown-icon ${collapsed ? "toggled" : "collapsed"}` }, /* @__PURE__ */ import_react110.default.createElement(Arrow_default, { fill: "none" }))
  );
};
var CoinDropdown_default = CoinDropdown;

// src/components/reusable/ConfirmDetails.tsx
var import_react113 = __toESM(require("react"), 1);
var import_react_redux31 = require("react-redux");

// src/components/reusable/ChainIcon.tsx
var import_react111 = __toESM(require("react"), 1);
var chainIcons = {
  ETH: Ethereum_default,
  POL: Polygon_default,
  AVX: Avalanche_default,
  BASE: Base_default,
  BSC: BSC_default,
  BTC: BTC_default,
  ARB: Arbitrum_default,
  OPT: Optimism_default,
  TRX: Tron_default,
  SOL: Solana_default,
  FIAT: Bank_default,
  BERA: Bera_default,
  CC: CreditCard_default
};
function ChainIcon({ symbol }) {
  const Icon = symbol === "FIAT" ? chainIcons["CC"] : chainIcons[symbol];
  if (!Icon) {
    logger_default.warn(`Chain icon not found for symbol: ${symbol}`);
    return /* @__PURE__ */ import_react111.default.createElement("div", null);
  }
  return /* @__PURE__ */ import_react111.default.createElement("div", { className: "icon" }, /* @__PURE__ */ import_react111.default.createElement(Icon, null));
}

// src/components/reusable/FeeDeductionRadioButtons.tsx
var import_react112 = __toESM(require("react"), 1);
var import_react_redux30 = require("react-redux");
var FeeDeductionRadioButtons = ({ disabled }) => {
  const dispatch = (0, import_react_redux30.useDispatch)();
  const feeDeduct = (0, import_react_redux30.useSelector)(selectFeeDeduct);
  const amount = (0, import_react_redux30.useSelector)(selectAmount);
  const sourceNetwork = (0, import_react_redux30.useSelector)(selectSourceChain);
  const targetNetwork = (0, import_react_redux30.useSelector)(selectTargetChain);
  const { totalFee: feeTotalBigInt } = (0, import_react_redux30.useSelector)(selectServiceFee);
  const totalFee = bigIntToNumber(feeTotalBigInt);
  const sourceCurrency = (0, import_react_redux30.useSelector)(selectSourceCurrency);
  const targetCurrency = (0, import_react_redux30.useSelector)(selectTargetCurrency);
  const theme = (0, import_react_redux30.useSelector)(selectTheme);
  const isSubmitted = (0, import_react_redux30.useSelector)(selectSubmitted);
  const handleChange = (value) => {
    dispatch(setFeeDeduct(value));
  };
  return /* @__PURE__ */ import_react112.default.createElement("div", { className: `fee-deduction-radio-container ${theme.colorMode}` }, /* @__PURE__ */ import_react112.default.createElement("div", { className: "fee-options" }, /* @__PURE__ */ import_react112.default.createElement("label", { className: `fee-option ${disabled ? "disabled" : ""}` }, /* @__PURE__ */ import_react112.default.createElement(
    "input",
    {
      type: "radio",
      name: "feeDeduction",
      checked: feeDeduct,
      disabled,
      onChange: () => handleChange(true)
    }
  ), /* @__PURE__ */ import_react112.default.createElement("span", { className: `radio-label ${theme.colorMode}` }, `Pay $${formatterFloat.format(
    Number(amount)
  )} ${sourceCurrency} in ${sourceNetwork.name} to receive $${formatterFloat.format(
    Number(amount) - totalFee
  )} ${targetCurrency} in ${targetNetwork.name}`)), /* @__PURE__ */ import_react112.default.createElement("label", { className: `fee-option ${disabled ? "disabled" : ""}` }, /* @__PURE__ */ import_react112.default.createElement(
    "input",
    {
      type: "radio",
      name: "feeDeduction",
      checked: !feeDeduct,
      disabled,
      onChange: () => handleChange(false)
    }
  ), /* @__PURE__ */ import_react112.default.createElement("span", { className: `radio-label ${theme.colorMode}` }, `Pay $${formatterFloat.format(
    Number(amount) + totalFee
  )} ${sourceCurrency} in ${sourceNetwork.name} to receive $${formatterFloat.format(
    Number(amount)
  )} ${targetCurrency} in ${targetNetwork.name}`))));
};
var FeeDeductionRadioButtons_default = FeeDeductionRadioButtons;

// src/components/reusable/ConfirmDetails.tsx
var ConfirmDetails = ({
  isApproved,
  feeOptionDisabled
}) => {
  const feeDeduct = (0, import_react_redux31.useSelector)(selectFeeDeduct);
  const mode = (0, import_react_redux31.useSelector)(selectMode);
  const dAppOption = (0, import_react_redux31.useSelector)(selectDappOption);
  const theme = (0, import_react_redux31.useSelector)(selectTheme);
  const { transactionValues, sourceFee, targetFee, kimaFee, totalFee } = (0, import_react_redux31.useSelector)(selectServiceFee);
  const txValues = feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin;
  const originNetwork = (0, import_react_redux31.useSelector)(selectSourceChain);
  const targetNetwork = (0, import_react_redux31.useSelector)(selectTargetChain);
  const sourceAddress = (0, import_react_redux31.useSelector)(selectSourceAddress);
  const targetAddress = (0, import_react_redux31.useSelector)(selectTargetAddress);
  const bankDetails = (0, import_react_redux31.useSelector)(selectBankDetails);
  const signature = (0, import_react_redux31.useSelector)(selectSignature);
  const networkOptions3 = (0, import_react_redux31.useSelector)(selectNetworks);
  const [feeCollapsed, setFeeCollapsed] = (0, import_react113.useState)(true);
  const transactionOption = (0, import_react_redux31.useSelector)(selectTransactionOption);
  const { connectedAddress } = useIsWalletReady4();
  const originNetworkOption = (0, import_react113.useMemo)(
    () => networkOptions3.filter((network) => network.id === originNetwork.id)[0],
    [networkOptions3, originNetwork]
  );
  const targetNetworkOption = (0, import_react113.useMemo)(
    () => networkOptions3.filter(
      (network) => network.shortName === (mode === "payment" /* payment */ ? transactionOption?.targetChain : targetNetwork.shortName)
    )[0],
    [networkOptions3, originNetwork]
  );
  const sourceCurrency = (0, import_react_redux31.useSelector)(selectSourceCurrency);
  const targetCurrency = (0, import_react_redux31.useSelector)(selectTargetCurrency);
  const { width, updateWidth } = useWidth_default();
  (0, import_react113.useEffect)(() => {
    width === 0 && updateWidth(window.innerWidth);
  }, []);
  return /* @__PURE__ */ import_react113.default.createElement("div", { className: `confirm-details ${theme.colorMode}` }, /* @__PURE__ */ import_react113.default.createElement("p", null, "Step ", isApproved ? "2" : "1", "\xA0of 2\xA0\xA0\xA0", isApproved ? "Submit transaction" : originNetwork.shortName === "FIAT" /* FIAT */ ? "Bank Details" : "Approval"), originNetwork.shortName === "FIAT" /* FIAT */ ? /* @__PURE__ */ import_react113.default.createElement("div", null, /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "label" }, "IBAN:"), /* @__PURE__ */ import_react113.default.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ import_react113.default.createElement(ChainIcon, { symbol: originNetworkOption?.shortName }), "FIAT"), /* @__PURE__ */ import_react113.default.createElement("p", null, "ES6621000418401234567891")), /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "label" }, "Recipient:"), /* @__PURE__ */ import_react113.default.createElement("p", null, "Kima Sandbox")), /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "label" }, "BIC:"), /* @__PURE__ */ import_react113.default.createElement("p", null, "CAIXESBBXXX")), /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "label" }, "Description:"), /* @__PURE__ */ import_react113.default.createElement("p", { className: "signature" }, signature))) : /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "label" }, "Source ", originNetwork.shortName !== "CC" && "wallet", ":"), /* @__PURE__ */ import_react113.default.createElement("div", { className: "network-details" }, /* @__PURE__ */ import_react113.default.createElement("div", { className: "kima-card-network-container" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ import_react113.default.createElement(ChainIcon, { symbol: originNetworkOption?.shortName }), originNetworkOption.name)), originNetwork.shortName !== "CC" && /* @__PURE__ */ import_react113.default.createElement("p", { className: theme.colorMode }, dAppOption === "LPDrain" /* LPDrain */ ? targetAddress : connectedAddress))), /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item amount" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "amount-container" }, /* @__PURE__ */ import_react113.default.createElement("div", { className: "amount-details" }, /* @__PURE__ */ import_react113.default.createElement("span", null, "Amount to Transfer "), /* @__PURE__ */ import_react113.default.createElement("div", { className: "coin-details" }, /* @__PURE__ */ import_react113.default.createElement("p", null, formatBigInt(txValues.allowanceAmount), " ", sourceCurrency))), /* @__PURE__ */ import_react113.default.createElement("div", { className: "amount-details" }, /* @__PURE__ */ import_react113.default.createElement("span", null, "Total Fees"), /* @__PURE__ */ import_react113.default.createElement(
    "div",
    {
      className: "fee-collapse",
      onClick: () => setFeeCollapsed(!feeCollapsed)
    },
    /* @__PURE__ */ import_react113.default.createElement(
      MiniArrow_default,
      {
        width: 15,
        height: 8,
        style: {
          transform: `rotate(${feeCollapsed ? "0deg" : "180deg"})`,
          transition: "transform 0.3s ease"
        }
      }
    ),
    /* @__PURE__ */ import_react113.default.createElement("span", { className: "service-fee" }, formatBigInt(totalFee), " ", sourceCurrency)
  )), /* @__PURE__ */ import_react113.default.createElement("div", { className: `fee-breakdown ${feeCollapsed ? "collapsed" : ""}` }, /* @__PURE__ */ import_react113.default.createElement("div", { className: "amount-details" }, /* @__PURE__ */ import_react113.default.createElement("span", null, originNetwork.shortName === "CC" ? "Credit Card Processing Fee" : `Source Network Fee (${originNetwork.shortName})`), /* @__PURE__ */ import_react113.default.createElement("span", { className: "service-fee" }, formatBigInt(sourceFee), " ", sourceCurrency)), /* @__PURE__ */ import_react113.default.createElement("div", { className: "amount-details" }, /* @__PURE__ */ import_react113.default.createElement("span", null, "Target Network Fee (", targetNetwork.shortName, ")"), /* @__PURE__ */ import_react113.default.createElement("span", { className: "service-fee" }, formatBigInt(targetFee), " ", targetCurrency)), /* @__PURE__ */ import_react113.default.createElement("div", { className: "amount-details" }, /* @__PURE__ */ import_react113.default.createElement("span", null, "KIMA Service Fee"), /* @__PURE__ */ import_react113.default.createElement("span", { className: "service-fee" }, formatBigInt(kimaFee), " ", sourceCurrency))), /* @__PURE__ */ import_react113.default.createElement("div", { className: "amount-details" }, /* @__PURE__ */ import_react113.default.createElement("span", null, "Target Transfer Amount"), /* @__PURE__ */ import_react113.default.createElement("span", { className: "service-fee" }, formatBigInt(txValues.submitAmount), " ", targetCurrency)))), targetNetwork.shortName === "FIAT" /* FIAT */ ? /* @__PURE__ */ import_react113.default.createElement("div", null, /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "label" }, "IBAN:"), /* @__PURE__ */ import_react113.default.createElement("p", null, bankDetails.iban), /* @__PURE__ */ import_react113.default.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ import_react113.default.createElement(ChainIcon, { symbol: targetNetworkOption?.shortName }), "FIAT")), /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "label" }, "Recipient:"), /* @__PURE__ */ import_react113.default.createElement("p", null, bankDetails.recipient))) : /* @__PURE__ */ import_react113.default.createElement("div", { className: "detail-item" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: "label" }, "Target wallet:"), /* @__PURE__ */ import_react113.default.createElement("div", { className: "network-details" }, /* @__PURE__ */ import_react113.default.createElement("div", { className: "kima-card-network-container" }, /* @__PURE__ */ import_react113.default.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ import_react113.default.createElement(ChainIcon, { symbol: targetNetworkOption?.shortName }), targetNetworkOption?.name)), /* @__PURE__ */ import_react113.default.createElement("p", { className: theme.colorMode }, mode === "light" /* light */ ? targetNetwork.shortName === "SOL" ? lightDemoAccounts.SOL : targetNetwork.shortName === "TRX" ? lightDemoAccounts.TRX : lightDemoAccounts.EVM : dAppOption === "LPDrain" /* LPDrain */ ? connectedAddress : targetAddress))), mode === "bridge" /* bridge */ && BigInt(totalFee.value) > BigInt(0) ? (
    // <FeeDeductionSlider />
    /* @__PURE__ */ import_react113.default.createElement(FeeDeductionRadioButtons_default, { disabled: feeOptionDisabled })
  ) : null);
};
var ConfirmDetails_default = ConfirmDetails;

// src/components/reusable/AddressInput.tsx
var import_react114 = __toESM(require("react"), 1);
var import_react_redux32 = require("react-redux");
var AddressInput = ({
  theme,
  placeholder,
  initialSelection
}) => {
  const dispatch = (0, import_react_redux32.useDispatch)();
  const mode = (0, import_react_redux32.useSelector)(selectMode);
  const sourceChain = (0, import_react_redux32.useSelector)(selectSourceChain);
  const targetChain = (0, import_react_redux32.useSelector)(selectTargetChain);
  const { connectedAddress: sourceAddress, isReady } = useIsWalletReady4();
  const targetAddress = (0, import_react_redux32.useSelector)(selectTargetAddress);
  (0, import_react114.useEffect)(() => {
    if (mode === "payment" /* payment */) return;
    if (mode === "light" /* light */ && !initialSelection) {
      if (isEVMChain(targetChain.shortName))
        dispatch(setTargetAddress(lightDemoAccounts.EVM));
      if (isSolana(targetChain.shortName))
        dispatch(setTargetAddress(lightDemoAccounts.SOL));
      if (isTron(targetChain.shortName))
        dispatch(setTargetAddress(lightDemoAccounts.TRX));
      return;
    }
    const bothEVM = isEVMChain(sourceChain.shortName) && isEVMChain(targetChain.shortName);
    if (bothEVM && isReady) {
      if (targetAddress !== "") return;
      dispatch(setTargetAddress(sourceAddress ?? ""));
    } else {
      dispatch(setTargetAddress(""));
    }
  }, [
    sourceChain.shortName,
    targetChain.shortName,
    sourceAddress,
    isReady,
    mode,
    dispatch
  ]);
  return /* @__PURE__ */ import_react114.default.createElement(
    "input",
    {
      className: `kima-address-input ${theme}`,
      type: "text",
      placeholder,
      value: initialSelection.sourceSelection || initialSelection.targetSelection ? "" : targetAddress,
      onChange: (e) => dispatch(setTargetAddress(e.target.value)),
      spellCheck: false
    }
  );
};
var AddressInput_default = AddressInput;

// src/components/reusable/CustomCheckbox.tsx
var import_react115 = __toESM(require("react"), 1);
var import_react_redux33 = require("react-redux");

// src/components/reusable/StepBox.tsx
var import_react116 = __toESM(require("react"), 1);
var import_react_redux34 = require("react-redux");
var stepInfo2 = [
  {
    title: "Initialize"
  },
  {
    title: "Source Transfer"
  },
  {
    title: "Validation"
  },
  {
    title: "Target Transfer"
  },
  {
    title: "Finalize"
  }
];
var StepBox = ({ step, errorStep, loadingStep, data }) => {
  const theme = (0, import_react_redux34.useSelector)(selectTheme);
  const explorerUrl = (0, import_react_redux34.useSelector)(selectKimaExplorer);
  const networkOption = (0, import_react_redux34.useSelector)(selectNetworkOption);
  const networks = (0, import_react_redux34.useSelector)(selectNetworks);
  const sourceChain = (0, import_react116.useMemo)(() => {
    const sourceKey = data?.sourceChain === "FIAT" ? "CC" : data?.sourceChain;
    return networks.find((network) => network.shortName === sourceKey);
  }, [data, networks]);
  const targetChain = (0, import_react116.useMemo)(
    () => networks.find((network) => network.shortName === data?.targetChain),
    [data, networks]
  );
  return /* @__PURE__ */ import_react116.default.createElement("div", { className: "kima-stepbox" }, /* @__PURE__ */ import_react116.default.createElement("div", { className: `content-wrapper ${theme.colorMode}` }, stepInfo2.map((item, index) => /* @__PURE__ */ import_react116.default.createElement("div", { key: item.title, className: "step-item" }, /* @__PURE__ */ import_react116.default.createElement(
    "div",
    {
      className: `info-item
                  ${step >= index ? index === loadingStep ? "active" : index === errorStep ? "error" : "completed" : ""} 
                  ${step < index && "locked"} ${theme.colorMode}`
    },
    step < index && /* @__PURE__ */ import_react116.default.createElement(Lock_default, null),
    step >= index ? index === loadingStep ? /* @__PURE__ */ import_react116.default.createElement(Loader_default, { className: "loader" }) : index === errorStep ? /* @__PURE__ */ import_react116.default.createElement(Warning_default, null) : /* @__PURE__ */ import_react116.default.createElement(Check_default, null) : null,
    /* @__PURE__ */ import_react116.default.createElement("p", null, item.title)
  ), index === 0 && data?.kimaTxHash ? /* @__PURE__ */ import_react116.default.createElement("div", { className: `info-item ${theme.colorMode}` }, /* @__PURE__ */ import_react116.default.createElement("div", { className: "icon" }, /* @__PURE__ */ import_react116.default.createElement(USDK_default, { width: 30, height: 30 })), /* @__PURE__ */ import_react116.default.createElement("p", { className: "chain-name" }, "Kima TX Hash:"), /* @__PURE__ */ import_react116.default.createElement("p", null, /* @__PURE__ */ import_react116.default.createElement(
    ExternalLink_default,
    {
      to: `${explorerUrl}/transactions/?tx=${data?.kimaTxHash}`
    },
    getShortenedAddress(data?.kimaTxHash || "")
  ), /* @__PURE__ */ import_react116.default.createElement(CopyButton_default, { text: data?.kimaTxHash }))) : null, index === 1 && data?.tssPullHash && sourceChain?.shortName !== "CC" ? /* @__PURE__ */ import_react116.default.createElement(
    "div",
    {
      className: `info-item ${theme.colorMode} source-chain ${step >= 3 ? "paid" : ""}`
    },
    /* @__PURE__ */ import_react116.default.createElement(ChainIcon, { symbol: data.sourceChain }),
    /* @__PURE__ */ import_react116.default.createElement("p", { className: "chain-name" }, sourceChain?.name, " TX Hash:"),
    /* @__PURE__ */ import_react116.default.createElement("p", null, /* @__PURE__ */ import_react116.default.createElement(
      ExternalLink_default,
      {
        to: `${sourceChain?.blockExplorers?.default.url}/${data?.sourceChain === "TRX" /* TRON */ ? "#/transaction" : "tx"}/${data?.tssPullHash}${data?.sourceChain === "SOL" /* SOLANA */ && networkOption === "testnet" /* testnet */ ? "?cluster=devnet" : ""}`
      },
      getShortenedAddress(data?.tssPullHash || "")
    ), /* @__PURE__ */ import_react116.default.createElement(CopyButton_default, { text: data?.tssPullHash || "" }))
  ) : null, index === 3 && data?.tssRefundHash ? /* @__PURE__ */ import_react116.default.createElement("div", { className: `info-item ${theme.colorMode} target-chain` }, /* @__PURE__ */ import_react116.default.createElement(ChainIcon, { symbol: data.sourceChain }), /* @__PURE__ */ import_react116.default.createElement("p", { className: "chain-name" }, sourceChain?.name, " TX Hash:"), /* @__PURE__ */ import_react116.default.createElement("p", null, /* @__PURE__ */ import_react116.default.createElement(
    ExternalLink_default,
    {
      to: `${sourceChain?.blockExplorers?.default.url}/${data?.sourceChain === "TRX" /* TRON */ ? "#/transaction" : "tx"}/${data?.tssRefundHash}${data?.sourceChain === "SOL" /* SOLANA */ && networkOption === "testnet" /* testnet */ ? "?cluster=devnet" : ""}`
    },
    getShortenedAddress(data?.tssRefundHash || "")
  ), /* @__PURE__ */ import_react116.default.createElement(CopyButton_default, { text: data?.tssRefundHash || "" }))) : null, index === 3 && data?.tssReleaseHash ? /* @__PURE__ */ import_react116.default.createElement("div", { className: `info-item ${theme.colorMode} target-chain` }, /* @__PURE__ */ import_react116.default.createElement(ChainIcon, { symbol: data.targetChain }), /* @__PURE__ */ import_react116.default.createElement("p", { className: "chain-name" }, targetChain?.name, " TX Hash:"), /* @__PURE__ */ import_react116.default.createElement("p", null, /* @__PURE__ */ import_react116.default.createElement(
    ExternalLink_default,
    {
      to: `${targetChain?.blockExplorers?.default.url}/${data?.targetChain === "TRX" /* TRON */ ? "#/transaction" : "tx"}/${data?.tssReleaseHash}${data?.targetChain === "SOL" /* SOLANA */ && networkOption === "testnet" /* testnet */ ? "?cluster=devnet" : ""}`
    },
    getShortenedAddress(data?.tssReleaseHash || "")
  ), /* @__PURE__ */ import_react116.default.createElement(CopyButton_default, { text: data?.tssReleaseHash || "" }))) : null))));
};
var StepBox_default = StepBox;

// src/components/reusable/BankInput.tsx
var import_react117 = __toESM(require("react"), 1);
var import_react_redux35 = require("react-redux");
var import_react_redux36 = require("react-redux");
var BankInput = () => {
  const dispatch = (0, import_react_redux35.useDispatch)();
  const theme = (0, import_react_redux36.useSelector)(selectTheme);
  const bankDetails = (0, import_react_redux36.useSelector)(selectBankDetails);
  return /* @__PURE__ */ import_react117.default.createElement("div", { className: "bank-input" }, /* @__PURE__ */ import_react117.default.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ import_react117.default.createElement("span", { className: "label" }, "IBAN:"), /* @__PURE__ */ import_react117.default.createElement(
    "input",
    {
      className: "kima-address-input",
      type: "text",
      value: bankDetails.iban,
      onChange: (e) => dispatch(setBankDetails({ ...bankDetails, iban: e.target.value }))
    }
  )), /* @__PURE__ */ import_react117.default.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ import_react117.default.createElement("span", { className: "label" }, "Recipient:"), /* @__PURE__ */ import_react117.default.createElement(
    "input",
    {
      className: "kima-address-input",
      type: "text",
      value: bankDetails.recipient,
      onChange: (e) => dispatch(
        setBankDetails({ ...bankDetails, recipient: e.target.value })
      )
    }
  )));
};
var BankInput_default = BankInput;

// src/components/reusable/TxButton.tsx
var import_react118 = __toESM(require("react"), 1);
var import_react_redux37 = require("react-redux");
var import_react_redux38 = require("react-redux");
var TxButton = ({ theme }) => {
  const dispatch = (0, import_react_redux37.useDispatch)();
  const handleClick = () => {
    dispatch(setPendingTxPopup(true));
  };
  const txCount = (0, import_react_redux38.useSelector)(selectPendingTxs);
  return /* @__PURE__ */ import_react118.default.createElement(
    "button",
    {
      className: `secondary-button tx-button ${theme.colorMode}`,
      onClick: handleClick
    },
    txCount,
    /* @__PURE__ */ import_react118.default.createElement(
      ring_default,
      {
        height: 16,
        width: 16,
        fill: theme.colorMode === "light" ? "black" : "white"
      }
    )
  );
};
var TxButton_default = TxButton;

// src/components/TransactionWidget.tsx
var import_react_redux41 = require("react-redux");
var import_react_redux42 = require("react-redux");
var import_react_redux43 = require("react-redux");
var import_react_hot_toast3 = require("react-hot-toast");

// src/hooks/useGetTxData.ts
var import_react119 = require("react");
var import_react_query14 = require("@tanstack/react-query");

// src/services/transactionApi.ts
var emptyStatus = {
  status: "Available" /* AVAILABLE */,
  sourceChain: "",
  targetChain: "",
  tssPullHash: "",
  tssReleaseHash: "",
  tssRefundHash: "",
  sourceSymbol: "",
  targetSymbol: "",
  amount: "",
  kimaTxHash: "",
  failReason: ""
};
var selectStatus = (response) => {
  if ("liquidity_transaction_data" in response.data) {
    const data2 = response.data.liquidity_transaction_data;
    if (!data2) return emptyStatus;
    return {
      status: data2.txstatus,
      sourceChain: data2.chain,
      targetChain: data2.chain,
      tssPullHash: data2.releasehash,
      tssReleaseHash: data2.releasehash,
      tssRefundHash: data2.refundhash,
      failReason: data2.failreason,
      amount: data2.amount,
      sourceSymbol: data2.symbol,
      targetSymbol: data2.symbol,
      kimaTxHash: data2.kimahash
    };
  }
  const data = response.data.transaction_data;
  if (!data) return emptyStatus;
  return {
    status: data.txstatus,
    sourceChain: data.originchain,
    targetChain: data.targetchain,
    tssPullHash: data.pullhash,
    tssReleaseHash: data.releasehash,
    tssRefundHash: data.refundhash,
    failReason: data.failreason,
    amount: data.amount,
    sourceSymbol: data.originsymbol,
    targetSymbol: data.targetsymbol,
    kimaTxHash: data.kimahash
  };
};
var isFinished = (data) => {
  if (!data) return false;
  return !!data.status && [
    "Completed" /* COMPLETED */,
    "FailedToPull" /* FAILEDTOPULL */,
    "FailedToPay" /* FAILEDTOPAY */,
    "UnAvailable" /* UNAVAILABLE */,
    "RefundFailed" /* REFUNDFAILED */,
    "RefundCompleted" /* REFUNDCOMPLETED */,
    "DeclinedInvalid" /* DECLINEDINVALID */
  ].includes(data.status);
};
var getTxData = async ({
  txId,
  isLP,
  backendUrl,
  refPollForUpdates
}) => {
  try {
    const path = isLP ? "tx/lp" : "tx";
    const response = await fetchWrapper.get(
      `${backendUrl}/${path}/${txId}/status`
    );
    if (typeof response === "string") throw new Error(response);
    const data = selectStatus(
      response
    );
    refPollForUpdates.current = !isFinished(data);
    return data;
  } catch (error) {
    logger_default.error(`Error fetching transaction ${txId} data:`, error);
    throw new Error(
      `Error fetching transaction ${txId} data: ${JSON.stringify(error)}`
    );
  }
};

// src/hooks/useGetTxData.ts
var POLLING_INTERVAL_MS = 1e3 * 10;
var useGetTxData = (txId, dAppOption, backendUrl) => {
  const refPollForUpdates = (0, import_react119.useRef)(false);
  const isLP = dAppOption === "LPAdd" /* LPAdd */ || dAppOption === "LPDrain" /* LPDrain */;
  const validTxId = typeof txId === "number" ? txId > 0 : txId.toString().length > 0;
  const result = (0, import_react_query14.useQuery)({
    queryKey: ["txData", txId, dAppOption],
    queryFn: async () => await getTxData({ txId, isLP, backendUrl, refPollForUpdates }),
    // only poll for updates while the transaction is in progress
    refetchInterval: refPollForUpdates.current ? POLLING_INTERVAL_MS : false,
    // 10 sec
    staleTime: POLLING_INTERVAL_MS,
    enabled: validTxId && !!dAppOption && !!backendUrl
  });
  return result;
};
var useGetTxData_default = useGetTxData;

// src/components/reusable/TransactionStatusMessage.tsx
var import_react120 = __toESM(require("react"), 1);
var TransactionStatusMessage = ({
  isCompleted,
  transactionId
}) => {
  return /* @__PURE__ */ import_react120.default.createElement("div", { className: "transaction-status-message" }, /* @__PURE__ */ import_react120.default.createElement("h2", null, isCompleted !== "Completed" /* COMPLETED */ && "Your transaction is currently being processed.", " ", "Please copy the Transaction ID below for future reference. You can use this ID to track the transaction status or resolve any issues if needed."), /* @__PURE__ */ import_react120.default.createElement("span", { className: "transaction-copy" }, /* @__PURE__ */ import_react120.default.createElement("h3", null, transactionId), /* @__PURE__ */ import_react120.default.createElement(CopyButton_default, { text: transactionId })));
};
var TransactionStatusMessage_default = TransactionStatusMessage;

// src/components/reusable/TransactionSearch.tsx
var import_react121 = __toESM(require("react"), 1);
var import_react_redux39 = require("react-redux");
var import_react_redux40 = require("react-redux");
var import_react_hot_toast2 = __toESM(require("react-hot-toast"), 1);
var TransactionSearch = () => {
  const theme = (0, import_react_redux39.useSelector)(selectTheme);
  const backendUrl = (0, import_react_redux39.useSelector)(selectBackendUrl);
  const dispatch = (0, import_react_redux40.useDispatch)();
  const [transactionId, setTransactionId] = (0, import_react121.useState)("");
  const refPollForUpdates = (0, import_react121.useRef)(false);
  const handleSearch = async () => {
    if (transactionId.length <= 0)
      return import_react_hot_toast2.default.error("You must provide a valid transaction id", {
        icon: /* @__PURE__ */ import_react121.default.createElement(Error_default, null)
      });
    try {
      const data = await getTxData({
        txId: transactionId,
        backendUrl,
        refPollForUpdates,
        isLP: false
      });
      logger_default.debug("transaction data: ", data);
      dispatch(setTxId(transactionId));
      dispatch(setMode("status" /* status */));
      dispatch(setSubmitted(true));
    } catch (error) {
      logger_default.error("Error searching transaction: ", error);
      return import_react_hot_toast2.default.error(
        "Transaction not found. Please check for the proper transaction id.",
        { icon: /* @__PURE__ */ import_react121.default.createElement(Error_default, null) }
      );
    }
  };
  return /* @__PURE__ */ import_react121.default.createElement("div", { className: "form-item transaction-search" }, /* @__PURE__ */ import_react121.default.createElement("div", { className: "transaction-input" }, /* @__PURE__ */ import_react121.default.createElement("span", { className: "label" }, "Search Transaction:"), /* @__PURE__ */ import_react121.default.createElement(
    "input",
    {
      className: `${theme.colorMode}`,
      type: "text",
      placeholder: "Transaction ID",
      value: transactionId,
      onChange: (e) => setTransactionId(e.target.value),
      spellCheck: false
    }
  )), /* @__PURE__ */ import_react121.default.createElement(SecondaryButton_default, { clickHandler: handleSearch }, "Search"));
};
var TransactionSearch_default = TransactionSearch;

// src/components/TransactionWidget.tsx
var TransactionWidget = ({ theme }) => {
  const [step, setStep] = (0, import_react122.useState)(0);
  const [focus, setFocus] = (0, import_react122.useState)(-1);
  const [errorStep, setErrorStep] = (0, import_react122.useState)(-1);
  const [errorMessage, setErrorMessage] = (0, import_react122.useState)("");
  const [loadingStep, setLoadingStep] = (0, import_react122.useState)(-1);
  const [minimized, setMinimized] = (0, import_react122.useState)(false);
  const dispatch = (0, import_react_redux43.useDispatch)();
  const mode = (0, import_react_redux42.useSelector)(selectMode);
  const feeDeduct = (0, import_react_redux42.useSelector)(selectFeeDeduct);
  const amount = (0, import_react_redux42.useSelector)(selectAmount);
  const txId = (0, import_react_redux42.useSelector)(selectTxId);
  const dAppOption = (0, import_react_redux42.useSelector)(selectDappOption);
  const { transactionValues } = (0, import_react_redux42.useSelector)(selectServiceFee);
  const txValues = feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin;
  const transactionOption = (0, import_react_redux42.useSelector)(selectTransactionOption);
  const sourceChain = (0, import_react_redux42.useSelector)(selectSourceChain);
  const targetChain = (0, import_react_redux42.useSelector)(selectTargetChain);
  const sourceSymbol = (0, import_react_redux42.useSelector)(selectSourceCurrency);
  const targetSymbol = (0, import_react_redux42.useSelector)(selectTargetCurrency);
  const networks = (0, import_react_redux42.useSelector)(selectNetworks);
  const { successHandler, closeHandler } = useKimaContext();
  const backendUrl = (0, import_react_redux42.useSelector)(selectBackendUrl);
  const { data, error } = useGetTxData_default(txId, dAppOption, backendUrl);
  const transactionSourceChain = (0, import_react122.useMemo)(
    () => networks.find(
      (network) => network.shortName === (mode === "status" /* status */ ? data?.sourceChain === "FIAT" ? "CC" : data?.sourceChain : sourceChain.shortName)
    ),
    [data, mode, sourceChain]
  );
  const transactionTargetChain = (0, import_react122.useMemo)(
    () => networks.find(
      (network) => network.shortName === (mode === "status" /* status */ ? data?.targetChain : targetChain.shortName)
    ),
    [data, mode, targetChain]
  );
  const isValidTxId = (0, import_react122.useMemo)(() => {
    return !(!txId || typeof txId === "string" && txId.length === 0 || typeof txId === "number" && txId < 0);
  }, [txId]);
  const isEmptyStatus = (0, import_react122.useMemo)(() => {
    if (!data) return true;
    return data?.amount === "";
  }, [data]);
  const { data: chainData } = useChainData(backendUrl);
  (0, import_react122.useEffect)(() => {
    if (!data || data.status !== "Completed" /* COMPLETED */) return;
    successHandler && successHandler({
      txId
    });
  }, [data]);
  (0, import_react122.useEffect)(() => {
    if (error)
      import_react_hot_toast3.toast.error(
        "The provided transaction id is not valid, please use a different one or contact support for further assistance",
        {
          icon: /* @__PURE__ */ import_react122.default.createElement(Error_default, null)
        }
      );
  }, [error]);
  (0, import_react122.useEffect)(() => {
    if (!data) {
      setStep(0);
      setLoadingStep(0);
      return;
    }
    logger_default.debug("tx status:", data.status, data.failReason, errorMessage);
    setErrorStep(-1);
    const status = data.status;
    if (status === "Available" /* AVAILABLE */ || status === "Pulled" /* PULLED */) {
      setStep(1);
      setLoadingStep(1);
    } else if (status === "Pull_Confirmed" /* CONFIRMED */) {
      setStep(2);
      setLoadingStep(2);
    } else if (status.startsWith("UnAvailable" /* UNAVAILABLE */)) {
      setStep(1);
      setErrorStep(1);
      setLoadingStep(-1);
      logger_default.error("transaction failed:", data.failReason);
      import_react_hot_toast3.toast.error("Unavailable", { icon: /* @__PURE__ */ import_react122.default.createElement(Error_default, null) });
      setErrorMessage("Unavailable");
    } else if (status === "Paid" /* PAID */) {
      setStep(3);
      setLoadingStep(3);
    } else if (status === "RefundStart" /* REFUNDSTART */) {
      setStep(3);
      setLoadingStep(3);
      import_react_hot_toast3.toast.error(
        "Failed to release tokens to target! Starting refund process.",
        {
          icon: /* @__PURE__ */ import_react122.default.createElement(Error_default, null)
        }
      );
      setErrorMessage(
        "Failed to release tokens to target! Starting refund process."
      );
    } else if (status === "RefundFailed" /* REFUNDFAILED */) {
      setStep(3);
      setErrorStep(3);
      setLoadingStep(-1);
      import_react_hot_toast3.toast.error("Failed to refund tokens to source!", {
        icon: /* @__PURE__ */ import_react122.default.createElement(Error_default, null)
      });
      setErrorMessage("Failed to refund tokens to source!");
    } else if (status === "RefundCompleted" /* REFUNDCOMPLETED */) {
      setStep(4);
      setErrorStep(3);
      setLoadingStep(-1);
      import_react_hot_toast3.toast.success("Refund completed!", {
        icon: /* @__PURE__ */ import_react122.default.createElement(Error_default, null)
      });
      setErrorMessage("Refund completed!");
    } else if (status === "FailedToPay" /* FAILEDTOPAY */) {
      setStep(3);
      setErrorStep(3);
      setLoadingStep(-1);
      logger_default.error("transaction failed:", data.failReason);
      import_react_hot_toast3.toast.error("Failed to release tokens to target!", {
        icon: /* @__PURE__ */ import_react122.default.createElement(Error_default, null)
      });
      setErrorMessage("Failed to release tokens to target!");
    } else if (status === "FailedToPull" /* FAILEDTOPULL */) {
      setStep(1);
      setErrorStep(1);
      setLoadingStep(-1);
      logger_default.error("transaction failed:", data.failReason);
      import_react_hot_toast3.toast.error("Failed to pull tokens from source!", { icon: /* @__PURE__ */ import_react122.default.createElement(Error_default, null) });
      setErrorMessage("Failed to pull tokens from source!");
    } else if (status === "Completed" /* COMPLETED */) {
      setStep(4);
      setLoadingStep(-1);
    } else if (status === "DeclinedInvalid" /* DECLINEDINVALID */) {
      setStep(0);
      setErrorStep(0);
      setLoadingStep(-1);
      import_react_hot_toast3.toast.error("Invalid signature!");
    }
  }, [data?.status]);
  const resetForm = () => {
    closeHandler && closeHandler();
    dispatch(resetServiceFee());
    if (mode === "light" /* light */) {
      dispatch(setMode("light" /* light */));
      dispatch(setTxId(-1));
      dispatch(setSubmitted(false));
      dispatch(setAmount(""));
      return;
    }
    if (mode === "status" /* status */ && amount === "") {
      dispatch(setMode("status" /* status */));
      dispatch(setTxId(-1));
      return dispatch(setSubmitted(true));
    }
    if (mode !== "payment" /* payment */) {
      if (transactionOption?.sourceChain) {
        const sourceChain2 = chainData?.find(
          (currentChain) => currentChain.shortName === transactionOption.sourceChain
        );
        dispatch(setSourceChain(sourceChain2));
      } else {
        dispatch(setSourceChain(networks[0]));
      }
      if (transactionOption?.sourceChain) {
        const targetChain2 = chainData?.find(
          (currentChain) => currentChain.shortName === transactionOption.targetChain
        );
        dispatch(setTargetChain(targetChain2));
      } else {
        dispatch(setTargetChain(networks[1]));
      }
      dispatch(setTargetAddress(transactionOption?.targetAddress || ""));
      dispatch(
        setTargetCurrency(
          transactionOption?.currency || networks[1].supportedTokens[0].symbol
        )
      );
      dispatch(setAmount(transactionOption?.amount.toString() || ""));
    }
    dispatch(
      setMode(transactionOption ? "payment" /* payment */ : "bridge" /* bridge */)
    );
    dispatch(setAmount(""));
    dispatch(setCCTransactionId(""));
    dispatch(setCCTransactionStatus("idle"));
    dispatch(setTxId(-1));
    dispatch(setSubmitted(false));
  };
  return /* @__PURE__ */ import_react122.default.createElement(import_react_redux41.Provider, { store }, /* @__PURE__ */ import_react122.default.createElement(
    "div",
    {
      className: `kima-card transaction-card ${theme.colorMode} ${minimized ? "minimized" : ""}`,
      style: {
        background: theme.colorMode === "light" /* light */ ? theme.backgroundColorLight : theme.backgroundColorDark
      }
    },
    /* @__PURE__ */ import_react122.default.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ import_react122.default.createElement("div", { className: "topbar" }, /* @__PURE__ */ import_react122.default.createElement("div", { className: "title" }, isValidTxId && !error ? /* @__PURE__ */ import_react122.default.createElement("div", { className: "transaction-title" }, mode !== "status" /* status */ ? data?.status === "Completed" /* COMPLETED */ ? "Transferred " : "Transfering " : isEmptyStatus ? "Fetching transaction status " : data?.status === "Completed" /* COMPLETED */ ? "Transfered " : "Transfering ", mode !== "status" /* status */ ? Number(amount) !== 0 ? transactionSourceChain?.shortName === "CC" ? bigIntToNumber(txValues.allowanceAmount).toFixed(2) : formatBigInt(txValues.allowanceAmount) : "" : data?.amount || "", " ", mode !== "status" /* status */ ? `${sourceSymbol} ` : isEmptyStatus ? "" : `(${data?.sourceSymbol})`, /* @__PURE__ */ import_react122.default.createElement("div", { className: "title-icon" }, /* @__PURE__ */ import_react122.default.createElement(
      ChainIcon,
      {
        symbol: transactionSourceChain?.shortName
      }
    )), " ", mode !== "status" /* status */ ? `${transactionSourceChain?.name}` : isEmptyStatus ? "" : `${data?.sourceChain === "FIAT" ? "CC" : data?.sourceChain}`, " ", mode !== "status" /* status */ ? `\u2192 ` : isEmptyStatus ? "" : `\u2192 `, mode !== "status" /* status */ ? Number(amount) !== 0 ? transactionSourceChain?.shortName === "CC" ? bigIntToNumber(txValues.submitAmount).toFixed(2) : formatBigInt(txValues.submitAmount) : "" : data?.amount || "", " ", mode !== "status" /* status */ ? `${targetSymbol}${" "}` : isEmptyStatus ? "" : `${data?.targetSymbol}${" "}`, /* @__PURE__ */ import_react122.default.createElement("div", { className: "title-icon" }, /* @__PURE__ */ import_react122.default.createElement(
      ChainIcon,
      {
        symbol: transactionTargetChain?.shortName
      }
    )), " ", mode !== "status" /* status */ ? `${transactionTargetChain?.name}${" "}` : isEmptyStatus ? "" : `${data?.targetChain} ${" "}`) : /* @__PURE__ */ import_react122.default.createElement("div", null, /* @__PURE__ */ import_react122.default.createElement("h3", { className: "transaction" }, "Transaction Status"))), !minimized ? /* @__PURE__ */ import_react122.default.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ import_react122.default.createElement(
      "button",
      {
        className: "icon-button minimize",
        onClick: () => {
          setMinimized(true);
        }
      },
      /* @__PURE__ */ import_react122.default.createElement(Minimize_default, null)
    ), !isValidTxId || loadingStep < 0 || error ? /* @__PURE__ */ import_react122.default.createElement("button", { className: "reset-button", onClick: resetForm }, "Reset") : null) : /* @__PURE__ */ import_react122.default.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ import_react122.default.createElement("div", { className: "maximize", onClick: () => setMinimized(false) }, "View")))),
    isValidTxId && !error ? /* @__PURE__ */ import_react122.default.createElement("div", { className: "kima-card-content" }, /* @__PURE__ */ import_react122.default.createElement("div", { className: "transaction-content" }, /* @__PURE__ */ import_react122.default.createElement(
      Progressbar_default,
      {
        step,
        focus,
        errorStep,
        setFocus,
        loadingStep
      }
    ), /* @__PURE__ */ import_react122.default.createElement(
      StepBox_default,
      {
        step,
        errorStep,
        loadingStep,
        data
      }
    )), !error && !isEmptyStatus && /* @__PURE__ */ import_react122.default.createElement(
      TransactionStatusMessage_default,
      {
        isCompleted: data?.status,
        transactionId: txId.toString()
      }
    )) : /* @__PURE__ */ import_react122.default.createElement("div", { className: "kima-card-content" }, /* @__PURE__ */ import_react122.default.createElement("h4", { className: "subtitle" }, "You can follow the status of a previous submitted transaction by entering the provided transaction id"), /* @__PURE__ */ import_react122.default.createElement("div", { className: "single-form" }, /* @__PURE__ */ import_react122.default.createElement(TransactionSearch_default, null))),
    /* @__PURE__ */ import_react122.default.createElement(
      import_react_hot_toast3.Toaster,
      {
        position: "top-right",
        reverseOrder: false,
        containerStyle: {
          position: "absolute"
        },
        toastOptions: {
          duration: 5 * 1e3,
          style: {
            fontFamily: "Manrope",
            position: "relative",
            top: "3rem",
            right: "1.5rem",
            margin: "5px 0",
            padding: ".7rem 1.5rem",
            color: theme.colorMode === "light" /* light */ ? "black" : "white",
            fontSize: "1em",
            borderRadius: "50px",
            border: "1px solid #B900004D",
            background: theme.colorMode === "light" /* light */ ? "#F7F8F9" : "#242732",
            fontWeight: "bolder"
          }
        }
      }
    ),
    /* @__PURE__ */ import_react122.default.createElement("div", { className: "floating-footer status" }, /* @__PURE__ */ import_react122.default.createElement("div", { className: `items ${theme.colorMode}` }, /* @__PURE__ */ import_react122.default.createElement("span", null, "Powered by"), /* @__PURE__ */ import_react122.default.createElement(KimaNetwork_default, null)))
  ));
};

// src/components/TransferWidget.tsx
var import_react135 = __toESM(require("react"), 1);
var import_react_redux57 = require("react-redux");

// src/components/reusable/SingleForm.tsx
var import_react124 = __toESM(require("react"), 1);
var import_react_hot_toast4 = require("react-hot-toast");
var import_react_redux46 = require("react-redux");

// src/components/primary/NetworkSelector.tsx
var import_react123 = __toESM(require("react"), 1);
var import_react_redux44 = require("react-redux");
var NetworkSelector = ({
  type,
  initialSelection,
  setInitialSelection
}) => {
  const [collapsed, setCollapsed] = (0, import_react123.useState)(true);
  const ref = (0, import_react123.useRef)(null);
  const dispatch = (0, import_react_redux44.useDispatch)();
  const theme = (0, import_react_redux44.useSelector)(selectTheme);
  const networkOptions3 = (0, import_react_redux44.useSelector)(selectNetworks);
  const mode = (0, import_react_redux44.useSelector)(selectMode);
  const sourceNetwork = (0, import_react_redux44.useSelector)(selectSourceChain);
  const targetNetwork = (0, import_react_redux44.useSelector)(selectTargetChain);
  const { switchChainHandler } = useKimaContext();
  const isOriginSelector = type === "origin";
  const networks = (0, import_react123.useMemo)(() => {
    return networkOptions3.filter((network) => {
      const isSameAsSource = isOriginSelector ? false : network.shortName === sourceNetwork.shortName;
      const isAllowedInLightMode = mode !== "light" /* light */ || lightDemoNetworks.includes(network.shortName);
      return network.supportedLocations.includes(type) && !isSameAsSource && isAllowedInLightMode;
    });
  }, [networkOptions3, sourceNetwork, type, mode]);
  const selectedNetwork = (0, import_react123.useMemo)(() => {
    if (initialSelection) {
      return {
        shortName: "",
        name: isOriginSelector ? "Select Source Network" : "Select Target Network"
      };
    }
    const selected = isOriginSelector ? sourceNetwork : targetNetwork;
    return networks.find((network) => network.id === selected?.id) || {
      shortName: "",
      name: isOriginSelector ? "Select Source Network" : "Select Target Network"
    };
  }, [
    networks,
    sourceNetwork,
    targetNetwork,
    isOriginSelector,
    initialSelection
  ]);
  (0, import_react123.useEffect)(() => {
    if (!networks.length || selectedNetwork.shortName) return;
    const fallbackNetwork = networks[0];
    if (isOriginSelector) {
      dispatch(setSourceChain(fallbackNetwork));
    } else {
      dispatch(setTargetChain(fallbackNetwork));
    }
  }, [networks, selectedNetwork, isOriginSelector, dispatch]);
  const handleNetworkChange = (chain) => {
    logger_default.debug("NetworkSelector: Handling network change", chain);
    const newCurrency = chain.supportedTokens[0]?.symbol ?? "";
    if (isOriginSelector) {
      if (chain.id !== sourceNetwork.id) {
        logger_default.debug("NetworkSelector: Setting source chain and currency to:", {
          chain: chain.shortName,
          currency: newCurrency
        });
        dispatch(setSourceChain(chain));
        dispatch(setSourceCurrency(newCurrency));
        switchChainHandler && switchChainHandler(chain);
      }
    } else {
      dispatch(setTargetChain(chain));
      const chainCompatibility = chain.compatibility === "EVM" /* EVM */ ? "EVM" : chain.shortName;
      if (mode === "light" /* light */) {
        dispatch(setTargetAddress(lightDemoAccounts[chainCompatibility]));
      }
    }
    type === "origin" ? setInitialSelection((prev) => ({ ...prev, sourceSelection: false })) : setInitialSelection((prev) => ({ ...prev, targetSelection: false }));
    setCollapsed(true);
  };
  (0, import_react123.useEffect)(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  (0, import_react123.useEffect)(() => {
    if (mode !== "light" /* light */) return;
    if (isEVMChain(targetNetwork.shortName)) {
      dispatch(setTargetAddress(lightDemoAccounts.EVM));
    } else if (isSolana(targetNetwork.shortName)) {
      dispatch(setTargetAddress(lightDemoAccounts.SOL));
    } else if (isTron(targetNetwork.shortName)) {
      dispatch(setTargetAddress(lightDemoAccounts.TRX));
    }
  }, [sourceNetwork, targetNetwork, mode]);
  return /* @__PURE__ */ import_react123.default.createElement(
    "div",
    {
      className: `network-dropdown ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`,
      onClick: () => setCollapsed((prev) => !prev),
      ref
    },
    /* @__PURE__ */ import_react123.default.createElement("div", { className: "network-wrapper" }, /* @__PURE__ */ import_react123.default.createElement(ChainIcon, { symbol: selectedNetwork.shortName }), /* @__PURE__ */ import_react123.default.createElement("span", null, selectedNetwork.name)),
    /* @__PURE__ */ import_react123.default.createElement(
      "div",
      {
        className: `network-menu custom-scrollbar ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`
      },
      networks.filter((network) => network.shortName !== selectedNetwork.shortName).map((network) => /* @__PURE__ */ import_react123.default.createElement(
        "div",
        {
          key: network.id,
          className: `network-menu-item ${theme?.colorMode ?? ""}`,
          onClick: (e) => {
            e.stopPropagation();
            handleNetworkChange(network);
          }
        },
        /* @__PURE__ */ import_react123.default.createElement(ChainIcon, { symbol: network.shortName }),
        /* @__PURE__ */ import_react123.default.createElement("p", null, network.name)
      ))
    ),
    /* @__PURE__ */ import_react123.default.createElement("div", { className: `dropdown-icon ${collapsed ? "toggled" : "collapsed"}` }, /* @__PURE__ */ import_react123.default.createElement(Arrow_default, { fill: "none" }))
  );
};
var NetworkSelector_default = import_react123.default.memo(NetworkSelector);

// src/components/reusable/SingleForm.tsx
var import_viem6 = require("viem");

// src/hooks/useGetFees.tsx
var import_react_query15 = require("@tanstack/react-query");
var import_react_redux45 = require("react-redux");

// src/services/feesApi.ts
var getFees = async (amount, originChain, originAddress, originSymbol, targetChain, targetAddress, targetSymbol, backendUrl) => {
  try {
    const response = await fetchWrapper.get(
      `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain}&originAddress=${originChain === "CC" ? targetAddress : originAddress}&originSymbol=${originSymbol}&targetChain=${targetChain}&targetAddress=${targetAddress}&targetSymbol=${targetSymbol}`
    );
    const result = response;
    const output = {
      feeId: result.feeId,
      peggedTo: result.peggedTo,
      expiration: result.expiration,
      sourceFee: toBigintAmount(result.feeOriginGasBigInt),
      targetFee: toBigintAmount(result.feeTargetGasBigInt),
      kimaFee: toBigintAmount(result.feeKimaProcessingBigInt),
      totalFee: toBigintAmount(result.feeTotalBigInt),
      transactionValues: {
        originChain,
        originAddress,
        originSymbol,
        targetChain,
        targetAddress,
        targetSymbol,
        feeFromOrigin: {
          allowanceAmount: toBigintAmount(
            result.transactionValues.feeFromOrigin.allowanceAmount
          ),
          submitAmount: toBigintAmount(
            result.transactionValues.feeFromOrigin.submitAmount
          ),
          message: result.transactionValues.feeFromOrigin.message
        },
        feeFromTarget: {
          allowanceAmount: toBigintAmount(
            result.transactionValues.feeFromTarget.allowanceAmount
          ),
          submitAmount: toBigintAmount(
            result.transactionValues.feeFromTarget.submitAmount
          ),
          message: result.transactionValues.feeFromTarget.message
        }
      }
    };
    return output;
  } catch (e) {
    throw new Error("Failed to fetch fees");
  }
};

// src/hooks/useGetFees.tsx
var useGetFees = ({
  amount,
  sourceNetwork,
  sourceAddress,
  sourceSymbol,
  targetNetwork,
  targetAddress,
  targetSymbol,
  backendUrl
}) => {
  const mode = (0, import_react_redux45.useSelector)(selectMode);
  return (0, import_react_query15.useQuery)({
    queryKey: [
      "fees",
      amount,
      sourceNetwork,
      sourceAddress,
      sourceSymbol,
      targetNetwork,
      targetAddress,
      targetSymbol
    ],
    queryFn: async () => {
      logger_default.debug("useGetFees: ", {
        amount,
        sourceNetwork,
        targetNetwork,
        sourceSymbol,
        targetSymbol,
        targetAddress
      });
      return await getFees(
        amount,
        sourceNetwork,
        sourceAddress,
        sourceSymbol,
        targetNetwork,
        targetAddress,
        targetSymbol,
        backendUrl
      );
    },
    enabled: !!backendUrl && !!amount && !!sourceNetwork && !!sourceSymbol && !!targetNetwork && !!targetAddress && !!targetSymbol && (sourceNetwork === "CC" ? sourceAddress === "" || sourceAddress === null : !!sourceAddress),
    // non-fiat → address must be present
    staleTime: 6e4,
    // Cache for 60 seconds
    retry: 1
  });
};
var useGetFees_default = useGetFees;

// src/components/reusable/SingleForm.tsx
var SingleForm = ({
  balance,
  decimals,
  isLoadingFees,
  initialSelection,
  setInitialSelection
}) => {
  const dispatch = (0, import_react_redux46.useDispatch)();
  const mode = (0, import_react_redux46.useSelector)(selectMode);
  const theme = (0, import_react_redux46.useSelector)(selectTheme);
  const feeDeduct = (0, import_react_redux46.useSelector)(selectFeeDeduct);
  const { totalFee } = (0, import_react_redux46.useSelector)(selectServiceFee);
  const compliantOption = (0, import_react_redux46.useSelector)(selectCompliantOption);
  const targetCompliant = (0, import_react_redux46.useSelector)(selectTargetCompliant);
  const sourceAddress = (0, import_react_redux46.useSelector)(selectSourceAddress);
  const sourceNetwork = (0, import_react_redux46.useSelector)(selectSourceChain);
  const targetNetwork = (0, import_react_redux46.useSelector)(selectTargetChain);
  const targetAddress = (0, import_react_redux46.useSelector)(selectTargetAddress);
  const { isReady } = useIsWalletReady4();
  const [amountValue, setAmountValue] = (0, import_react124.useState)("");
  const amount = (0, import_react_redux46.useSelector)(selectAmount);
  const sourceCurrency = (0, import_react_redux46.useSelector)(selectSourceCurrency);
  const targetCurrency = (0, import_react_redux46.useSelector)(selectTargetCurrency);
  const backendUrl = (0, import_react_redux46.useSelector)(selectBackendUrl);
  const {
    data: fees,
    isLoading,
    error
  } = useGetFees_default({
    amount: parseFloat(amount),
    sourceNetwork: sourceNetwork.shortName,
    sourceAddress,
    sourceSymbol: sourceCurrency,
    targetNetwork: targetNetwork.shortName,
    targetAddress,
    targetSymbol: targetCurrency,
    backendUrl
  });
  (0, import_react124.useEffect)(() => {
    if (fees) {
      dispatch(setServiceFee(fees));
    }
  }, [fees, dispatch]);
  const errorMessage = (0, import_react124.useMemo)(
    () => compliantOption && targetCompliant !== null && !targetCompliant?.isCompliant ? `Target address has ${targetCompliant.results?.[0].result.risk_score} risk` : "",
    [compliantOption, targetCompliant]
  );
  const maxValue = (0, import_react124.useMemo)(() => {
    if (mode === "light" /* light */) return 1e3;
    if (!balance) return 0;
    if (totalFee.value === BigInt(0)) return balance;
    const intAmount = (0, import_viem6.parseUnits)(amount, totalFee.decimals);
    return balance - intAmount;
  }, [balance, totalFee, feeDeduct]);
  (0, import_react124.useEffect)(() => {
    if (!errorMessage) return;
    import_react_hot_toast4.toast.error(errorMessage);
  }, [errorMessage]);
  (0, import_react124.useEffect)(() => {
    if (amountValue && amount !== "") return;
    setAmountValue(amount);
  }, [amount]);
  const isConnected = (0, import_react124.useMemo)(() => {
    return isReady && !initialSelection.sourceSelection;
  }, [isReady, initialSelection]);
  return /* @__PURE__ */ import_react124.default.createElement("div", { className: "single-form" }, /* @__PURE__ */ import_react124.default.createElement("div", { className: "form-item" }, /* @__PURE__ */ import_react124.default.createElement("span", { className: "label" }, "Source Network:"), /* @__PURE__ */ import_react124.default.createElement("div", { className: "items" }, /* @__PURE__ */ import_react124.default.createElement(
    NetworkSelector_default,
    {
      type: "origin",
      ...{
        initialSelection: initialSelection.sourceSelection,
        setInitialSelection
      }
    }
  ), /* @__PURE__ */ import_react124.default.createElement(CoinDropdown_default, null))), /* @__PURE__ */ import_react124.default.createElement(
    "div",
    {
      className: `dynamic-area ${sourceNetwork.shortName === "FIAT" /* FIAT */ ? "reverse" : "1"}`
    },
    sourceNetwork.compatibility !== "CC" /* CC */ && /* @__PURE__ */ import_react124.default.createElement(
      "div",
      {
        className: `form-item wallet-button-item ${isConnected && "connected"}`
      },
      /* @__PURE__ */ import_react124.default.createElement("span", { className: "label" }, "Wallet:"),
      /* @__PURE__ */ import_react124.default.createElement(WalletButton_default, { initialSelection: initialSelection.sourceSelection })
    ),
    mode !== "payment" /* payment */ && /* @__PURE__ */ import_react124.default.createElement("div", { className: "form-item" }, /* @__PURE__ */ import_react124.default.createElement("span", { className: "label" }, "Target Network:"), /* @__PURE__ */ import_react124.default.createElement("div", { className: "items" }, /* @__PURE__ */ import_react124.default.createElement(
      NetworkSelector_default,
      {
        type: "target",
        ...{
          initialSelection: initialSelection.targetSelection,
          setInitialSelection
        }
      }
    ), /* @__PURE__ */ import_react124.default.createElement(CoinDropdown_default, { isSourceChain: false })))
  ), mode === "bridge" /* bridge */ && sourceNetwork.shortName !== "FIAT" /* FIAT */ ? targetNetwork.shortName === "FIAT" /* FIAT */ ? /* @__PURE__ */ import_react124.default.createElement(BankInput_default, null) : /* @__PURE__ */ import_react124.default.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ import_react124.default.createElement("span", { className: "label" }, "Target Address:"), /* @__PURE__ */ import_react124.default.createElement(
    AddressInput_default,
    {
      theme: theme.colorMode,
      placeholder: "Target address",
      initialSelection
    }
  )) : null, mode === "light" /* light */ && /* @__PURE__ */ import_react124.default.createElement(
    "div",
    {
      className: `form-item wallet-button-item ${!initialSelection.targetSelection && "connected"}`,
      style: { display: "flex", alignItems: "center" }
    },
    /* @__PURE__ */ import_react124.default.createElement("span", { className: "label" }, "Target Wallet:"),
    /* @__PURE__ */ import_react124.default.createElement(
      WalletButton_default,
      {
        initialSelection: initialSelection.targetSelection,
        placeholder: true
      }
    )
  ), /* @__PURE__ */ import_react124.default.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ import_react124.default.createElement("span", { className: "label" }, "Amount:"), /* @__PURE__ */ import_react124.default.createElement("div", { className: `amount-label-container items ${theme.colorMode}` }, /* @__PURE__ */ import_react124.default.createElement(
    "input",
    {
      className: `${theme.colorMode}`,
      type: "text",
      placeholder: "Enter amount",
      value: amountValue || "",
      disabled: initialSelection.sourceSelection || initialSelection.targetSelection,
      onChange: (e) => {
        const value = e.target.value;
        const maskedValue = value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1").replace(new RegExp(`(\\.\\d{${decimals}})\\d+`), "$1");
        setAmountValue(maskedValue);
        dispatch(setAmount(maskedValue));
      }
    }
  ), /* @__PURE__ */ import_react124.default.createElement("div", { className: "max-disclaimer" }, /* @__PURE__ */ import_react124.default.createElement(
    "span",
    {
      className: "max-button",
      onClick: () => {
        setAmountValue(maxValue.toString());
        dispatch(setAmount(maxValue.toString()));
      }
    },
    "Max"
  ), +totalFee !== -1 && /* @__PURE__ */ import_react124.default.createElement("p", { className: "fee-amount" }, "Est fees:", " ", /* @__PURE__ */ import_react124.default.createElement("span", { className: `${isLoadingFees ? "loading" : ""}` }, " ", isLoadingFees ? "" : `$ ${formatBigInt(totalFee)} USD`))))));
};
var SingleForm_default = SingleForm;

// src/hooks/useAllowance.tsx
var allPlugins3 = getAllPlugins();
var emptyAllowance = {
  isApproved: false,
  approve: () => Promise.resolve(),
  allowance: 0
};
function useAllowance2({
  setApproving,
  setCancellingApprove
}) {
  const { currentPlugin } = useGetCurrentPlugin_default();
  const currentPluginID = currentPlugin?.data?.id;
  const pluginEntries = Object.entries(allPlugins3);
  const allAllowances = pluginEntries.map(([pluginID, plugin]) => {
    const { approve, ...allowanceOutput } = plugin.useAllowance();
    const wrappedApprove = async (isCancel = false) => {
      if (isCancel) {
        setCancellingApprove(true);
      } else {
        setApproving(true);
      }
      try {
        await approve(isCancel);
      } finally {
        setCancellingApprove(false);
        setApproving(false);
      }
    };
    return {
      ...allowanceOutput,
      approve: wrappedApprove,
      pluginID
    };
  });
  const allowance = allAllowances.find(
    ({ pluginID }) => pluginID === currentPluginID
  );
  return allowance ?? emptyAllowance;
}

// src/components/TransferWidget.tsx
var import_react_hot_toast5 = require("react-hot-toast");

// plugins/solana/components/SolanaWalletConnectModal.tsx
var import_react127 = __toESM(require("react"), 1);
var import_react_redux49 = require("react-redux");

// plugins/solana/components/SolanaWalletSelect.tsx
var import_react125 = __toESM(require("react"), 1);
var import_react_redux47 = require("react-redux");
var import_wallet_adapter_react7 = require("@solana/wallet-adapter-react");
var import_wallet_adapter_base = require("@solana/wallet-adapter-base");
var SolanaWalletSelect = () => {
  const theme = (0, import_react_redux47.useSelector)(selectTheme);
  const sourceChain = (0, import_react_redux47.useSelector)(selectSourceChain);
  const dispatch = (0, import_react_redux47.useDispatch)();
  const sliderRef = (0, import_react125.useRef)();
  const { wallet, wallets, select, connect, connected } = (0, import_wallet_adapter_react7.useWallet)();
  const [detected, undetected] = (0, import_react125.useMemo)(() => {
    const detected2 = [];
    const undetected2 = [];
    for (const wallet2 of wallets) {
      if (wallet2.readyState === import_wallet_adapter_base.WalletReadyState.Installed || wallet2.readyState === import_wallet_adapter_base.WalletReadyState.Loadable) {
        detected2.push(wallet2);
      } else if (wallet2.readyState === import_wallet_adapter_base.WalletReadyState.NotDetected) {
        undetected2.push(wallet2);
      }
    }
    return [detected2, undetected2];
  }, [wallets]);
  (0, import_react125.useEffect)(() => {
    let isDown = false;
    let startX;
    let scrollLeft;
    sliderRef.current?.addEventListener("mousedown", (e) => {
      isDown = true;
      sliderRef.current?.classList.add("active");
      startX = e.pageX - sliderRef.current?.offsetLeft;
      scrollLeft = sliderRef.current?.scrollLeft;
    });
    sliderRef.current?.addEventListener("mouseleave", () => {
      isDown = false;
      sliderRef.current.classList.remove("active");
    });
    sliderRef.current?.addEventListener("mouseup", () => {
      isDown = false;
      sliderRef.current.classList.remove("active");
    });
    sliderRef.current?.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 1;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    });
  }, []);
  const handleWalletClick = (0, import_react125.useCallback)(
    (walletName) => {
      logger_default.debug(
        "SolanaWalletSelect: handleWalletClick: walletName: ",
        walletName
      );
      select(walletName);
    },
    [select]
  );
  (0, import_react125.useEffect)(() => {
    logger_default.debug("SolanaWalletSelect: useEffect: wallet: ", wallet);
    if (!wallet) return;
    if (sourceChain.shortName !== "SOL") {
      logger_default.debug("SolanaWalletSelect: source chain is not sol...");
      return;
    }
    if (!connected) {
      logger_default.debug(
        "SolanaWalletSelect: Wallet exists but not connected, connecting wallet:",
        wallet
      );
      connect().catch((err) => logger_default.error("Solana connect error:", err));
    }
    dispatch(setSolanaConnectModal(false));
  }, [wallet, sourceChain]);
  return /* @__PURE__ */ import_react125.default.createElement("div", { className: `wallet-select` }, /* @__PURE__ */ import_react125.default.createElement("div", { className: "slide-area hide-scrollbar", ref: sliderRef }, /* @__PURE__ */ import_react125.default.createElement("div", { className: "wallet-container" }, detected.map((wallet2, index) => /* @__PURE__ */ import_react125.default.createElement(
    "div",
    {
      className: `card-item ${theme.colorMode}`,
      onClick: () => handleWalletClick(wallet2.adapter.name),
      key: `${wallet2.adapter.name}-${index}`
    },
    /* @__PURE__ */ import_react125.default.createElement("div", { className: "wallet-item" }, /* @__PURE__ */ import_react125.default.createElement("img", { src: wallet2.adapter.icon, alt: wallet2.adapter.name }), /* @__PURE__ */ import_react125.default.createElement("span", null, wallet2.adapter.name))
  )), undetected.map((wallet2, index) => /* @__PURE__ */ import_react125.default.createElement(
    ExternalLink_default,
    {
      to: wallet2.adapter.url,
      className: `card-item ${theme.colorMode}`,
      key: `${wallet2.adapter.name}-${index}`
    },
    /* @__PURE__ */ import_react125.default.createElement("div", { className: "wallet-item" }, /* @__PURE__ */ import_react125.default.createElement("img", { src: wallet2.adapter.icon, alt: wallet2.adapter.name }), /* @__PURE__ */ import_react125.default.createElement("span", null, "Install ", wallet2.adapter.name))
  )))));
};
var SolanaWalletSelect_default = SolanaWalletSelect;

// plugins/solana/components/AccountDetailsModal.tsx
var import_react126 = __toESM(require("react"), 1);
var import_react_redux48 = require("react-redux");
var import_wallet_adapter_react8 = require("@solana/wallet-adapter-react");
var AccountDetailsModal = () => {
  const dispatch = (0, import_react_redux48.useDispatch)();
  const theme = (0, import_react_redux48.useSelector)(selectTheme);
  const networkOption = (0, import_react_redux48.useSelector)(selectNetworkOption);
  const sourceChain = (0, import_react_redux48.useSelector)(selectSourceChain);
  const accountDetailsModal = (0, import_react_redux48.useSelector)(selectAccountDetailsModal);
  const { walletAddress } = useIsWalletReady_default2();
  const { disconnect: solanaWalletDisconnect } = (0, import_wallet_adapter_react8.useWallet)();
  const { balance: solBalance } = useGetSolBalance_default();
  const networkDetails = networkOptions2[0];
  const explorerUrl = (0, import_react126.useMemo)(() => {
    return `https://solscan.io/account/address/${walletAddress}?cluster=${networkOption === "mainnet" ? "mainnet" : "devnet"}`;
  }, [walletAddress, networkOption]);
  const handleDisconnect = () => {
    solanaWalletDisconnect();
    dispatch(setAccountDetailsModal(false));
  };
  if (sourceChain.shortName !== "SOL") return;
  return /* @__PURE__ */ import_react126.default.createElement(
    "div",
    {
      className: `kima-modal ${theme.colorMode} ${accountDetailsModal && "open"}`
    },
    /* @__PURE__ */ import_react126.default.createElement("div", { className: "modal-overlay" }),
    /* @__PURE__ */ import_react126.default.createElement("div", { className: `modal-content-container ${theme.colorMode}` }, /* @__PURE__ */ import_react126.default.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ import_react126.default.createElement("div", { className: "topbar" }, /* @__PURE__ */ import_react126.default.createElement("div", { className: "title" }, /* @__PURE__ */ import_react126.default.createElement("h3", null, "Account Details")), /* @__PURE__ */ import_react126.default.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ import_react126.default.createElement(
      "button",
      {
        className: "cross-icon-button",
        onClick: () => dispatch(setAccountDetailsModal(false))
      },
      /* @__PURE__ */ import_react126.default.createElement(
        Cross_default,
        {
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    )))), /* @__PURE__ */ import_react126.default.createElement("div", { className: "modal-content" }, /* @__PURE__ */ import_react126.default.createElement("div", { className: "summary" }, networkDetails && /* @__PURE__ */ import_react126.default.createElement(networkDetails.icon, { width: 60, height: 60 }), /* @__PURE__ */ import_react126.default.createElement("div", { className: "address" }, /* @__PURE__ */ import_react126.default.createElement("h2", null, getShortenedAddress(walletAddress || "")), /* @__PURE__ */ import_react126.default.createElement(CopyButton_default, { text: walletAddress })), /* @__PURE__ */ import_react126.default.createElement("h3", null, solBalance, " $SOL")), /* @__PURE__ */ import_react126.default.createElement(SecondaryButton_default, { className: "block-explorer" }, /* @__PURE__ */ import_react126.default.createElement(ExternalLink_default, { className: "link", to: explorerUrl }, /* @__PURE__ */ import_react126.default.createElement(Explorer_default, { fill: "#778DA3" }), /* @__PURE__ */ import_react126.default.createElement("p", null, "Block explorer"), /* @__PURE__ */ import_react126.default.createElement(ExternalUrl_default, { fill: "#778DA3" }))), /* @__PURE__ */ import_react126.default.createElement(PrimaryButton_default, { clickHandler: handleDisconnect }, "Discconect")))
  );
};
var AccountDetailsModal_default = AccountDetailsModal;

// plugins/solana/components/SolanaWalletConnectModal.tsx
var SolanaWalletConnectModal = () => {
  const dispatch = (0, import_react_redux49.useDispatch)();
  const theme = (0, import_react_redux49.useSelector)(selectTheme);
  const connectModal = (0, import_react_redux49.useSelector)(selectSolanaConnectModal);
  return /* @__PURE__ */ import_react127.default.createElement("div", null, /* @__PURE__ */ import_react127.default.createElement(AccountDetailsModal_default, null), /* @__PURE__ */ import_react127.default.createElement(
    "div",
    {
      className: `kima-modal wallet-connect ${connectModal ? "open" : ""}`
    },
    /* @__PURE__ */ import_react127.default.createElement("div", { className: `modal-content-container ${theme.colorMode}` }, /* @__PURE__ */ import_react127.default.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ import_react127.default.createElement("div", { className: "topbar" }, /* @__PURE__ */ import_react127.default.createElement("div", { className: "title" }, /* @__PURE__ */ import_react127.default.createElement("h3", null, "Connect Wallet")), /* @__PURE__ */ import_react127.default.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ import_react127.default.createElement(
      "button",
      {
        className: "cross-icon-button",
        onClick: () => dispatch(setSolanaConnectModal(false))
      },
      /* @__PURE__ */ import_react127.default.createElement(
        Cross_default,
        {
          width: 30,
          height: 30,
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    )))), /* @__PURE__ */ import_react127.default.createElement("div", { className: "modal-content" }, /* @__PURE__ */ import_react127.default.createElement(SolanaWalletSelect_default, null)))
  ));
};
var SolanaWalletConnectModal_default = SolanaWalletConnectModal;

// plugins/tron/components/TronWalletConnectModal.tsx
var import_react130 = __toESM(require("react"), 1);
var import_react_redux52 = require("react-redux");

// plugins/tron/components/AccountDetailsModal.tsx
var import_react128 = __toESM(require("react"), 1);
var import_react_redux50 = require("react-redux");
var import_tronwallet_adapter_react_hooks7 = require("@tronweb3/tronwallet-adapter-react-hooks");
var AccountDetailsModal2 = () => {
  const dispatch = (0, import_react_redux50.useDispatch)();
  const theme = (0, import_react_redux50.useSelector)(selectTheme);
  const networkOption = (0, import_react_redux50.useSelector)(selectNetworkOption);
  const accountDetailsModal = (0, import_react_redux50.useSelector)(selectAccountDetailsModal);
  const sourcheChain = (0, import_react_redux50.useSelector)(selectSourceChain);
  const { connectedAddress } = useIsWalletReady_default3();
  const { disconnect: tronWalletDisconnect } = (0, import_tronwallet_adapter_react_hooks7.useWallet)();
  const { balance: tronBalance } = useGetTrxBalance_default();
  const selectedNetwork = (0, import_react_redux50.useSelector)(selectSourceChain);
  const networkDetails = (0, import_react128.useMemo)(
    () => networkOptions.find(({ id }) => id === selectedNetwork.shortName),
    [selectedNetwork]
  );
  const explorerUrl = (0, import_react128.useMemo)(() => {
    return `https://${networkOption === "testnet" && "nile."}tronscan.io/#/address/${connectedAddress}`;
  }, [connectedAddress, networkOption]);
  const handleDisconnect = () => {
    tronWalletDisconnect();
    dispatch(setAccountDetailsModal(false));
  };
  if (sourcheChain.shortName !== "TRX") return;
  return /* @__PURE__ */ import_react128.default.createElement(
    "div",
    {
      className: `kima-modal ${theme.colorMode} ${accountDetailsModal && "open"}`
    },
    /* @__PURE__ */ import_react128.default.createElement("div", { className: "modal-overlay" }),
    /* @__PURE__ */ import_react128.default.createElement("div", { className: `modal-content-container ${theme.colorMode}` }, /* @__PURE__ */ import_react128.default.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ import_react128.default.createElement("div", { className: "topbar" }, /* @__PURE__ */ import_react128.default.createElement("div", { className: "title" }, /* @__PURE__ */ import_react128.default.createElement("h3", null, "Account Details")), /* @__PURE__ */ import_react128.default.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ import_react128.default.createElement(
      "button",
      {
        className: "cross-icon-button",
        onClick: () => dispatch(setAccountDetailsModal(false))
      },
      /* @__PURE__ */ import_react128.default.createElement(
        Cross_default,
        {
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    )))), /* @__PURE__ */ import_react128.default.createElement("div", { className: "modal-content" }, /* @__PURE__ */ import_react128.default.createElement("div", { className: "summary" }, networkDetails && /* @__PURE__ */ import_react128.default.createElement(networkDetails.icon, { width: 60, height: 60 }), /* @__PURE__ */ import_react128.default.createElement("div", { className: "address" }, /* @__PURE__ */ import_react128.default.createElement("h2", null, getShortenedAddress(connectedAddress || "")), /* @__PURE__ */ import_react128.default.createElement(CopyButton_default, { text: connectedAddress })), /* @__PURE__ */ import_react128.default.createElement("h3", null, tronBalance, " ", selectedNetwork.shortName)), /* @__PURE__ */ import_react128.default.createElement(SecondaryButton_default, { className: "block-explorer" }, /* @__PURE__ */ import_react128.default.createElement(ExternalLink_default, { className: "link", to: explorerUrl }, /* @__PURE__ */ import_react128.default.createElement(Explorer_default, { fill: "#778DA3" }), /* @__PURE__ */ import_react128.default.createElement("p", null, "Block explorer"), /* @__PURE__ */ import_react128.default.createElement(ExternalUrl_default, { fill: "#778DA3" }))), /* @__PURE__ */ import_react128.default.createElement(PrimaryButton_default, { clickHandler: handleDisconnect }, "Disconnect")))
  );
};
var AccountDetailsModal_default2 = AccountDetailsModal2;

// plugins/tron/components/TronWalletSelect.tsx
var import_react129 = __toESM(require("react"), 1);
var import_react_redux51 = require("react-redux");
var import_tronwallet_adapter_react_hooks8 = require("@tronweb3/tronwallet-adapter-react-hooks");
var import_tronwallet_abstract_adapter2 = require("@tronweb3/tronwallet-abstract-adapter");
var TronWalletSelect = () => {
  const theme = (0, import_react_redux51.useSelector)(selectTheme);
  const sliderRef = (0, import_react129.useRef)();
  const dispatch = (0, import_react_redux51.useDispatch)();
  const {
    wallets,
    select,
    wallet: currentWallet,
    connect,
    connected
  } = (0, import_tronwallet_adapter_react_hooks8.useWallet)();
  const [detected, undetected] = (0, import_react129.useMemo)(() => {
    const detected2 = [];
    const undetected2 = [];
    for (const wallet of wallets) {
      if (wallet.state === import_tronwallet_abstract_adapter2.AdapterState.Connected || wallet.state === import_tronwallet_abstract_adapter2.AdapterState.Disconnect || wallet.state === import_tronwallet_abstract_adapter2.AdapterState.Loading) {
        detected2.push(wallet);
      } else if (wallet.state === import_tronwallet_abstract_adapter2.AdapterState.NotFound) {
        undetected2.push(wallet);
      }
    }
    return [detected2, undetected2];
  }, [wallets]);
  (0, import_react129.useEffect)(() => {
    let isDown = false;
    let startX;
    let scrollLeft;
    sliderRef.current?.addEventListener("mousedown", (e) => {
      isDown = true;
      sliderRef.current?.classList.add("active");
      startX = e.pageX - sliderRef.current?.offsetLeft;
      scrollLeft = sliderRef.current?.scrollLeft;
    });
    sliderRef.current?.addEventListener("mouseleave", () => {
      isDown = false;
      sliderRef.current.classList.remove("active");
    });
    sliderRef.current?.addEventListener("mouseup", () => {
      isDown = false;
      sliderRef.current.classList.remove("active");
    });
    sliderRef.current?.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 1;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    });
  }, []);
  (0, import_react129.useEffect)(() => {
    connected && dispatch(setTronConnectModal(false));
  }, [connected]);
  const connectWallet = async (walletName) => {
    currentWallet?.adapter.name === walletName ? await connect() : select(walletName);
  };
  return /* @__PURE__ */ import_react129.default.createElement("div", { className: `wallet-select` }, /* @__PURE__ */ import_react129.default.createElement("div", { className: "slide-area hide-scrollbar", ref: sliderRef }, /* @__PURE__ */ import_react129.default.createElement("div", { className: "wallet-container" }, detected.map((wallet, index) => /* @__PURE__ */ import_react129.default.createElement(
    "div",
    {
      className: `card-item ${theme.colorMode}`,
      onClick: () => connectWallet(wallet.adapter.name),
      key: `${wallet.adapter.name}-${index}`
    },
    /* @__PURE__ */ import_react129.default.createElement("div", { className: "wallet-item" }, /* @__PURE__ */ import_react129.default.createElement("img", { src: wallet.adapter.icon, alt: wallet.adapter.name }), /* @__PURE__ */ import_react129.default.createElement("span", null, wallet.adapter.name))
  )), undetected.map((wallet, index) => /* @__PURE__ */ import_react129.default.createElement(
    ExternalLink_default,
    {
      to: wallet.adapter.url,
      className: `card-item ${theme.colorMode}`,
      key: `${wallet.adapter.name}-${index}`
    },
    /* @__PURE__ */ import_react129.default.createElement("div", { className: "wallet-item" }, /* @__PURE__ */ import_react129.default.createElement("img", { src: wallet.adapter.icon, alt: wallet.adapter.name }), /* @__PURE__ */ import_react129.default.createElement("span", null, "Install ", wallet.adapter.name))
  )))));
};
var TronWalletSelect_default = TronWalletSelect;

// plugins/tron/components/TronWalletConnectModal.tsx
var TronWalletConnectModal = () => {
  const dispatch = (0, import_react_redux52.useDispatch)();
  const theme = (0, import_react_redux52.useSelector)(selectTheme);
  const connectModal = (0, import_react_redux52.useSelector)(selectTronConnectModal);
  return /* @__PURE__ */ import_react130.default.createElement("div", null, /* @__PURE__ */ import_react130.default.createElement(AccountDetailsModal_default2, null), /* @__PURE__ */ import_react130.default.createElement(
    "div",
    {
      className: `kima-modal wallet-connect ${theme.colorMode} ${connectModal ? "open" : ""}`
    },
    /* @__PURE__ */ import_react130.default.createElement("div", { className: "modal-overlay" }),
    /* @__PURE__ */ import_react130.default.createElement("div", { className: `modal-content-container ${theme.colorMode}` }, /* @__PURE__ */ import_react130.default.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ import_react130.default.createElement("div", { className: "topbar" }, /* @__PURE__ */ import_react130.default.createElement("div", { className: "title" }, /* @__PURE__ */ import_react130.default.createElement("h3", null, "Connect Wallet")), /* @__PURE__ */ import_react130.default.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ import_react130.default.createElement(
      "button",
      {
        className: "icon-button",
        onClick: () => dispatch(setTronConnectModal(false))
      },
      /* @__PURE__ */ import_react130.default.createElement(
        Cross_default,
        {
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    )))), /* @__PURE__ */ import_react130.default.createElement("div", { className: "modal-content" }, /* @__PURE__ */ import_react130.default.createElement(TronWalletSelect_default, null)))
  ));
};
var TronWalletConnectModal_default = TronWalletConnectModal;

// src/hooks/useValidateTransaction.tsx
var import_react131 = require("react");
var import_viem7 = require("viem");
var import_react_redux53 = require("react-redux");
var import_loglevel2 = __toESM(require("loglevel"), 1);
var useValidateTransaction = (inputs) => {
  const {
    allowance = BigInt(0),
    amount,
    balance = BigInt(0),
    compliantOption,
    decimals,
    feeDeduct,
    formStep,
    isApproved,
    pools,
    sourceChain,
    sourceAddress,
    sourceCompliant,
    targetAddress,
    targetCompliant,
    targetChain,
    targetCurrency,
    totalFee,
    initialSelection
  } = inputs;
  const mode = (0, import_react_redux53.useSelector)(selectMode);
  const maxValue = (0, import_react131.useMemo)(() => {
    import_loglevel2.default.debug("useValidateTransaction: maxValue: ", inputs);
    if (!balance) return BigInt(0);
    if (totalFee <= BigInt(0)) return balance;
    const amountMinusFees = balance - totalFee;
    const maxVal = amountMinusFees > BigInt(0) ? amountMinusFees : BigInt(0);
    import_loglevel2.default.debug("maxValue: ", { maxVal, amountMinusFees });
    return maxVal;
  }, [balance, totalFee, feeDeduct]);
  const validate = (isSubmitting = false) => {
    if (initialSelection.sourceSelection) {
      return {
        error: "ValidationError" /* Error */,
        message: "Select a source network to proceed"
      };
    }
    if (initialSelection.targetSelection) {
      return {
        error: "ValidationError" /* Error */,
        message: "Select a target network to proceed"
      };
    }
    if (!sourceAddress && sourceChain !== "CC" && mode !== "light" /* light */) {
      return {
        error: "ValidationError" /* Error */,
        message: "Wallet is not connected"
      };
    }
    if (!targetAddress && mode !== "light" /* light */) {
      return {
        error: "ValidationError" /* Error */,
        message: "Target address is not provided"
      };
    }
    if (!isAddressCompatible(targetAddress, targetChain)) {
      return {
        error: "ValidationError" /* Error */,
        message: "The provided target address is invalid"
      };
    }
    if (amount <= BigInt(0)) {
      return {
        error: "ValidationError" /* Error */,
        message: "Amount must be greater than zero"
      };
    }
    if (totalFee <= BigInt(0)) {
      return { error: "ValidationError" /* Error */, message: "Fee calculation error" };
    }
    if (compliantOption) {
      if (!sourceCompliant?.isCompliant) {
        return {
          error: "ValidationError" /* Error */,
          message: "Source address compliance check failed"
        };
      }
      if (!targetCompliant?.isCompliant) {
        return {
          error: "ValidationError" /* Error */,
          message: "Target address compliance check failed"
        };
      }
    }
    if (amount > balance && formStep === 0 && sourceChain !== "CC") {
      return {
        error: "Warning" /* Warning */,
        message: "The entered amount exceeds your available balance. This transaction is likely to fail. Proceed with caution."
      };
    }
    if (amount > maxValue && formStep === 0 && sourceChain !== "CC") {
      return {
        error: "Warning" /* Warning */,
        message: "The entered amount exceeds the maximum transferable amount (available balance minus transaction fees). Reduce the amount or allow fees to be deducted from the transferred amount. Otherwise, your transaction may fail. Proceed with caution."
      };
    }
    if (amount < totalFee && formStep === 0) {
      return {
        error: "Warning" /* Warning */,
        message: "Transaction fees exceed the transfer amount. This may result in an ineffective transaction. Proceed with caution."
      };
    }
    if (!isApproved && isSubmitting) {
      return {
        error: "ApprovalNeeded" /* ApprovalNeeded */,
        message: "Allowance is insufficient for the transaction"
      };
    }
    const { isPoolAvailable, error } = checkPoolBalance({
      pools,
      targetChain,
      targetCurrency,
      amount: (0, import_viem7.formatUnits)(amount, decimals)
    });
    if (!isPoolAvailable) {
      return {
        error: "ValidationError" /* Error */,
        message: error || "Pool balance check failed"
      };
    }
    return { error: "None" /* None */, message: "Validation passed" };
  };
  return { validate };
};
var useValidateTransaction_default = useValidateTransaction;

// src/hooks/useSubmitTransaction.tsx
var import_react132 = require("react");
var import_react_redux54 = require("react-redux");
var import_react_redux55 = require("react-redux");
var useSubmitTransaction = () => {
  const dispatch = (0, import_react_redux54.useDispatch)();
  const backendUrl = (0, import_react_redux55.useSelector)(selectBackendUrl);
  const mode = (0, import_react_redux55.useSelector)(selectMode);
  const [isSubmitting, setSubmitting] = (0, import_react132.useState)(false);
  const { feeId, transactionValues, totalFee } = (0, import_react_redux55.useSelector)(selectServiceFee);
  const feeDeduct = (0, import_react_redux55.useSelector)(selectFeeDeduct);
  const txValues = feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin;
  const ccTransactionId = (0, import_react_redux55.useSelector)(selectCCTransactionId);
  const submitTransaction = async (signature) => {
    try {
      setSubmitting(true);
      const params = JSON.stringify({
        originAddress: transactionValues.originChain === "CC" ? transactionValues.targetAddress : transactionValues.originAddress,
        originChain: transactionValues.originChain,
        targetAddress: transactionValues.targetAddress,
        targetChain: transactionValues.targetChain,
        originSymbol: transactionValues.originSymbol,
        targetSymbol: transactionValues.targetSymbol,
        amount: txValues.submitAmount.value.toString(),
        fee: bigIntChangeDecimals({
          ...totalFee,
          newDecimals: txValues.submitAmount.decimals
        }).value.toString(),
        decimals: txValues.submitAmount.decimals,
        htlcCreationHash: "",
        htlcCreationVout: 0,
        htlcExpirationTimestamp: "0",
        htlcVersion: "",
        senderPubKey: "",
        options: JSON.stringify({
          signature: transactionValues.originChain === "CC" ? "" : signature,
          feeId,
          chargeFeeAtTarget: feeDeduct
        }),
        ccTransactionIdSeed: ccTransactionId,
        mode
      });
      const transactionResult = await fetchWrapper.post(
        `${backendUrl}/submit`,
        params
      );
      if (transactionResult?.code !== 0) {
        setSubmitting(false);
        return { success: false, message: "Failed to submit transaction" };
      }
      const transactionId = getTransactionId(transactionResult.events);
      dispatch(setTxId(transactionId));
      dispatch(setSubmitted(true));
      setSubmitting(false);
      return { success: true, message: "Transaction submitted successfully." };
    } catch (error) {
      logger_default.error("Error submitting transaction:", error);
      setSubmitting(false);
      return { success: false, message: "Failed to submit transaction" };
    }
  };
  return { submitTransaction, isSubmitting };
};
var useSubmitTransaction_default = useSubmitTransaction;

// src/hooks/useComplianceCheck.tsx
var import_react_query16 = require("@tanstack/react-query");

// src/services/complianceApi.ts
var getCompliance = async (walletAddress, compliantOption, backendUrl) => {
  if (!walletAddress || !compliantOption) return null;
  try {
    const response = await fetchWrapper.get(
      `${backendUrl}/compliant?address=${walletAddress}`
    );
    logger_default.debug("compliance: ", response);
    return response;
  } catch (error) {
    logger_default.error("compliance error: ", error);
    throw new Error("Cant get compliance");
  }
};

// src/hooks/useComplianceCheck.tsx
var useComplianceCheck = (walletAddress, compliantOption, backendUrl) => {
  const {
    data: complianceData,
    error,
    isFetching
  } = (0, import_react_query16.useQuery)({
    queryKey: ["compliance", walletAddress, compliantOption],
    queryFn: async () => {
      return await getCompliance(walletAddress, compliantOption, backendUrl);
    },
    enabled: !!walletAddress && walletAddress.length >= 34 && // debounce for a minimum of characters (tron length)
    !!compliantOption && compliantOption && !!backendUrl,
    // Only fetch when valid inputs exist
    retry: 1
    // Retry once on failure
  });
  return {
    complianceData,
    error,
    isFetching
  };
};
var useComplianceCheck_default = useComplianceCheck;

// src/hooks/useDisconnectWallet.tsx
var allPlugins4 = getAllPlugins();
var defaultDisconnect = {
  disconnectWallet: () => new Promise((resolve) => {
    resolve();
  })
};
function useDisconnectWallet5() {
  const { currentPlugin } = useGetCurrentPlugin_default();
  const currentPluginID = currentPlugin?.data?.id;
  const pluginEntries = Object.entries(allPlugins4);
  const allData = pluginEntries.map(([pluginID, plugin]) => {
    try {
      const pluginResult = plugin?.useDisconnectWallet?.();
      if (!pluginResult) {
        return {
          pluginID,
          disconnectWallet: defaultDisconnect.disconnectWallet
        };
      }
      return { pluginID, disconnectWallet: pluginResult.disconnectWallet };
    } catch (err) {
      logger_default.warn("useDisconnectWallet: error for plugin", pluginID, err);
      return { pluginID, disconnectWallet: defaultDisconnect.disconnectWallet };
    }
  });
  const mainConnection = allData.find(
    ({ pluginID }) => pluginID === currentPluginID
  );
  return mainConnection ? { disconnectWallet: mainConnection.disconnectWallet } : defaultDisconnect;
}

// src/components/reusable/WarningModal.tsx
var import_react133 = __toESM(require("react"), 1);
var WarningModal = ({
  message,
  cancelButtonText = "Cancel",
  acknowledgeButtonText = "Acknowledge",
  onAcknowledge,
  onCancel
}) => {
  return /* @__PURE__ */ import_react133.default.createElement("div", { className: "warning-modal-overlay" }, /* @__PURE__ */ import_react133.default.createElement("div", { className: "warning-modal" }, /* @__PURE__ */ import_react133.default.createElement("h3", null, "Warning"), /* @__PURE__ */ import_react133.default.createElement("p", null, message), /* @__PURE__ */ import_react133.default.createElement("div", { className: "warning-modal-buttons" }, /* @__PURE__ */ import_react133.default.createElement(
    SecondaryButton_default,
    {
      className: "warning-modal-cancel",
      clickHandler: onCancel
    },
    cancelButtonText
  ), /* @__PURE__ */ import_react133.default.createElement(
    PrimaryButton_default,
    {
      className: "warning-modal-acknowledge",
      clickHandler: onAcknowledge
    },
    acknowledgeButtonText
  ))));
};
var WarningModal_default = WarningModal;

// src/components/reusable/CCWidget.tsx
var import_react134 = __toESM(require("react"), 1);
var import_react_redux56 = require("react-redux");
var import_uuid = require("uuid");

// src/hooks/useCCTransactionId.tsx
var import_react_query17 = require("@tanstack/react-query");
var useCCTransactionId = (backendUrl, transactionIdSeed) => {
  return (0, import_react_query17.useQuery)({
    queryKey: ["transactionId", transactionIdSeed],
    queryFn: async () => {
      const res = await fetch(
        `${backendUrl}/submit/transactionId?transactionIdSeed=${transactionIdSeed}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch transaction ID");
      }
      const data = await res.json();
      return {
        transactionId: data.transactionId
      };
    },
    enabled: !!backendUrl && !!transactionIdSeed,
    staleTime: 0
  });
};

// src/components/reusable/CCWidget.tsx
var CCWidget = () => {
  const dispatch = (0, import_react_redux56.useDispatch)();
  const feeDeduct = (0, import_react_redux56.useSelector)(selectFeeDeduct);
  const backendUrl = (0, import_react_redux56.useSelector)(selectBackendUrl);
  const ccTransactionStatus = (0, import_react_redux56.useSelector)(selectCCTransactionStatus);
  const networkOption = (0, import_react_redux56.useSelector)(selectNetworkOption);
  const { transactionValues } = (0, import_react_redux56.useSelector)(selectServiceFee);
  const randomUserIdRef = (0, import_react134.useRef)((0, import_uuid.v4)());
  const ccTransactionIdSeedRef = (0, import_react134.useRef)((0, import_uuid.v4)());
  const { data: envOptions, isLoading: isEnvLoading } = useGetEnvOptions({
    kimaBackendUrl: backendUrl
  });
  const partnerId = envOptions?.paymentPartnerId;
  const {
    data,
    isLoading: isTransactionIdLoading,
    error
  } = useCCTransactionId(backendUrl, ccTransactionIdSeedRef.current);
  (0, import_react134.useEffect)(() => {
    dispatch(setCCTransactionId(ccTransactionIdSeedRef.current));
  }, [dispatch]);
  const txValues = feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin;
  const allowanceAmount = (0, import_react134.useMemo)(
    () => formatBigInt(txValues.allowanceAmount),
    [txValues]
  );
  const [isLoading, setIsLoading] = (0, import_react134.useState)(true);
  const baseUrl = (0, import_react134.useMemo)(
    () => `https://widget${networkOption === "testnet" /* testnet */ ? "-sandbox" : ""}.depasify.com`,
    [networkOption]
  );
  (0, import_react134.useEffect)(() => {
    const handleMessage = (event) => {
      if (event.origin !== baseUrl) {
        return;
      }
      logger_default.info("postMessage: new message: ", event);
      if (event.data.type === "isCompleted") {
        dispatch(setCCTransactionStatus("success"));
      }
      if (event.data.type === "isFailed") {
        dispatch(setCCTransactionStatus("failed"));
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  return /* @__PURE__ */ import_react134.default.createElement("div", { className: `cc-widget ${isLoading ? "loading" : ""}` }, (isLoading || isTransactionIdLoading || isEnvLoading || ccTransactionStatus === "success") && /* @__PURE__ */ import_react134.default.createElement("div", { className: "cc-widget-loader" }, /* @__PURE__ */ import_react134.default.createElement(ring_default, { width: 50, height: 50, fill: "#86b8ce" })), /* @__PURE__ */ import_react134.default.createElement(
    "iframe",
    {
      width: isLoading || isTransactionIdLoading || ccTransactionStatus === "success" ? 0 : "100%",
      height: isLoading || isTransactionIdLoading || ccTransactionStatus === "success" ? 0 : "100%",
      src: `${baseUrl}/widgets/kyc?partner=${partnerId}&user_uuid=${randomUserIdRef.current}&amount=${allowanceAmount}&currency=USD&trx_uuid=${data?.transactionId}&postmessage=true`,
      loading: "lazy",
      title: "Credit Card Widget",
      onLoad: () => setIsLoading(false),
      style: {
        border: "none",
        transition: "all 0.3s ease",
        display: "block"
      }
    }
  ));
};
var CCWidget_default = CCWidget;

// src/components/TransferWidget.tsx
var import_viem8 = require("viem");
var TransferWidget = ({
  theme,
  helpURL,
  titleOption,
  paymentTitleOption
}) => {
  const dispatch = (0, import_react_redux57.useDispatch)();
  const mainRef = (0, import_react135.useRef)(null);
  const [signature, setSignature2] = (0, import_react135.useState)("");
  const [formStep, setFormStep] = (0, import_react135.useState)(0);
  const [warningModalOpen, setWarningModalOpen] = (0, import_react135.useState)(null);
  const [resetModalOpen, setResetModalOpen] = (0, import_react135.useState)(false);
  const dAppOption = (0, import_react_redux57.useSelector)(selectDappOption);
  const mode = (0, import_react_redux57.useSelector)(selectMode);
  const transactionOption = (0, import_react_redux57.useSelector)(selectTransactionOption);
  const backendUrl = (0, import_react_redux57.useSelector)(selectBackendUrl);
  const sourceAddress = (0, import_react_redux57.useSelector)(selectSourceAddress);
  const targetAddress = (0, import_react_redux57.useSelector)(selectTargetAddress);
  const sourceChain = (0, import_react_redux57.useSelector)(selectSourceChain);
  const targetChain = (0, import_react_redux57.useSelector)(selectTargetChain);
  const sourceCurrency = (0, import_react_redux57.useSelector)(selectSourceCurrency);
  const targetCurrency = (0, import_react_redux57.useSelector)(selectTargetCurrency);
  const amount = (0, import_react_redux57.useSelector)(selectAmount);
  const { totalFee, transactionValues } = (0, import_react_redux57.useSelector)(selectServiceFee);
  const compliantOption = (0, import_react_redux57.useSelector)(selectCompliantOption);
  const networkOptions3 = (0, import_react_redux57.useSelector)(selectNetworkOption);
  const feeDeduct = (0, import_react_redux57.useSelector)(selectFeeDeduct);
  const txValues = feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin;
  const { keplrHandler, closeHandler } = useKimaContext();
  const [isCancellingApprove, setCancellingApprove] = (0, import_react135.useState)(false);
  const [isApproving, setApproving] = (0, import_react135.useState)(false);
  const [isSigning, setSigning] = (0, import_react135.useState)(false);
  const [feeOptionDisabled, setFeeOptionDisabled] = (0, import_react135.useState)(false);
  const [initialSelection, setInitialSelection] = (0, import_react135.useState)({
    sourceSelection: true,
    targetSelection: true
  });
  const pendingTxs = (0, import_react_redux57.useSelector)(selectPendingTxs);
  const networks = (0, import_react_redux57.useSelector)(selectNetworks);
  const submitted = (0, import_react_redux57.useSelector)(selectSubmitted);
  const ccTransactionStatus = (0, import_react_redux57.useSelector)(selectCCTransactionStatus);
  const { width: windowWidth } = useWidth_default();
  const { disconnectWallet } = useDisconnectWallet5();
  const { allowance, balance, isApproved, approve, decimals, signMessage } = useAllowance2({
    setApproving,
    setCancellingApprove
  });
  const { complianceData: sourceCompliant } = useComplianceCheck_default(
    sourceAddress,
    compliantOption,
    backendUrl
  );
  const { complianceData: targetCompliant } = useComplianceCheck_default(
    targetAddress,
    compliantOption,
    backendUrl
  );
  const { pools } = useGetPools_default(backendUrl, networkOptions3);
  const { validate } = useValidateTransaction_default({
    allowance,
    isApproved,
    sourceChain: sourceChain.shortName,
    sourceAddress,
    targetAddress,
    targetChain: targetChain.shortName,
    balance,
    amount: (0, import_viem8.parseUnits)(amount, txValues.allowanceAmount.decimals),
    decimals: txValues.allowanceAmount.decimals,
    totalFee: bigIntChangeDecimals({
      ...totalFee,
      newDecimals: txValues.allowanceAmount.decimals
    }).value,
    sourceCompliant,
    targetCompliant,
    targetCurrency,
    compliantOption,
    pools,
    feeDeduct,
    formStep,
    initialSelection
  });
  const {
    data: fees,
    isLoading: isLoadingFees,
    error
  } = useGetFees_default({
    amount: parseFloat(amount),
    sourceNetwork: sourceChain.shortName,
    sourceAddress,
    sourceSymbol: sourceCurrency,
    targetNetwork: targetChain.shortName,
    targetAddress,
    targetSymbol: targetCurrency,
    backendUrl
  });
  (0, import_react135.useEffect)(() => {
    if (fees) {
      dispatch(setServiceFee(fees));
    }
  }, [fees, dispatch]);
  const { submitTransaction, isSubmitting } = useSubmitTransaction_default();
  const isBackButtonEnabled = (0, import_react135.useMemo)(() => {
    if (formStep !== 0) {
      if (sourceChain.shortName === "CC") {
        return ccTransactionStatus === "idle" || ccTransactionStatus === "failed";
      }
      return true;
    }
    return false;
  }, [ccTransactionStatus, sourceChain, formStep]);
  const isSubmitButtonEnabled = (0, import_react135.useMemo)(() => {
    if (submitted) return false;
    if (sourceChain.shortName === "CC") {
      return ccTransactionStatus === "idle";
    }
    return true;
  }, [sourceChain, ccTransactionStatus]);
  (0, import_react135.useEffect)(() => {
    const submit = async () => {
      if (ccTransactionStatus === "success") {
        const { success, message: submitMessage } = await submitTransaction(signature);
        if (!success) {
          import_react_hot_toast5.toast.error(submitMessage, { icon: /* @__PURE__ */ import_react135.default.createElement(Error_default, null) });
        }
      }
    };
    submit();
  }, [ccTransactionStatus]);
  const handleSubmit = async () => {
    const { error: error2, message: validationMessage } = validate(true);
    if (error2 === "ValidationError" /* Error */) {
      return import_react_hot_toast5.toast.error(validationMessage, { icon: /* @__PURE__ */ import_react135.default.createElement(Error_default, null) });
    }
    if (sourceChain.shortName === "CC") {
      return dispatch(setCCTransactionStatus("initialized"));
    }
    if (error2 === "ApprovalNeeded" /* ApprovalNeeded */ && mode !== "light" /* light */) {
      if (!signature) {
        setFeeOptionDisabled(true);
        const sig2 = await signMessage?.({
          targetAddress,
          targetChain: targetChain.shortName,
          originSymbol: sourceCurrency,
          originChain: sourceChain.shortName
        });
        setSignature2(sig2);
      }
      return approve();
    }
    if (dAppOption === "LPDrain" /* LPDrain */ || dAppOption === "LPAdd" /* LPAdd */) {
      keplrHandler && keplrHandler(sourceAddress);
      return;
    }
    let sig = signature;
    if (!sig && mode !== "light" /* light */) {
      setFeeOptionDisabled(true);
      sig = await signMessage?.({
        targetAddress,
        targetChain: targetChain.shortName,
        originSymbol: sourceCurrency,
        originChain: sourceChain.shortName
      });
      setSignature2(sig);
    }
    const { success, message: submitMessage } = await submitTransaction(sig);
    if (!success) return import_react_hot_toast5.toast.error(submitMessage, { icon: /* @__PURE__ */ import_react135.default.createElement(Error_default, null) });
  };
  const onNext = () => {
    const { error: error2, message: validationMessage } = validate();
    if (error2 === "Warning" /* Warning */ && formStep === 0) {
      logger_default.info("validationError: Warning: ", validationMessage);
      setWarningModalOpen({ message: validationMessage });
      return;
    }
    if (error2 !== "ValidationError" /* Error */ && !formStep) {
      return setFormStep(1);
    }
    if (error2 !== "ValidationError" /* Error */ && formStep > 0) {
      return handleSubmit();
    }
    import_react_hot_toast5.toast.error(validationMessage, { icon: /* @__PURE__ */ import_react135.default.createElement(Error_default, null) });
    mainRef.current?.click();
  };
  const onBack = () => {
    if (isApproving || isSubmitting || isSigning) return;
    if (formStep > 0) {
      setSignature2("");
      setFormStep(0);
      setSignature2("");
      setFeeOptionDisabled(false);
      dispatch(setCCTransactionStatus("idle"));
    }
    if (formStep === 0) {
      closeHandler && closeHandler(0);
    }
  };
  const getButtonLabel = () => {
    if (formStep === 1) {
      if (sourceChain.shortName === "CC" && ccTransactionStatus === "idle") {
        return "Next";
      }
      if (isApproved) {
        return isSubmitting ? "Submitting..." : "Submit";
      } else {
        return isApproving ? "Approving..." : "Approve";
      }
    }
    if (isLoadingFees) {
      return "";
    }
    return "Next";
  };
  const onCancelApprove = () => {
    if (isCancellingApprove) return;
    approve(true);
    setSignature2("");
  };
  const resetForm = async () => {
    if (isApproving || isSubmitting || isSigning) return;
    closeHandler && closeHandler(0);
    setSignature2("");
    setSigning(false);
    setFormStep(0);
    dispatch(setAmount(transactionOption?.amount.toString() || ""));
    dispatch(resetServiceFee());
    if (mode !== "payment" /* payment */) {
      setInitialSelection({
        sourceSelection: true,
        targetSelection: true
      });
      if (transactionOption?.sourceChain) {
        const sourceChain2 = networks.find(
          (currentChain) => currentChain.shortName === transactionOption.sourceChain
        );
        dispatch(setSourceChain(sourceChain2));
      } else {
        dispatch(setSourceChain(networks[0]));
      }
      if (transactionOption?.sourceChain) {
        const targetChain2 = networks.find(
          (currentChain) => currentChain.shortName === transactionOption.targetChain
        );
        dispatch(setTargetChain(targetChain2));
      } else {
        dispatch(setTargetChain(networks[1]));
      }
      dispatch(setTargetAddress(transactionOption?.targetAddress || ""));
      dispatch(
        setTargetCurrency(
          transactionOption?.currency || networks[1].supportedTokens[0].symbol
        )
      );
    }
    await disconnectWallet();
  };
  return /* @__PURE__ */ import_react135.default.createElement(
    "div",
    {
      className: `kima-card ${theme.colorMode}`,
      style: {
        background: theme.colorMode === "light" /* light */ ? theme.backgroundColorLight : theme.backgroundColorDark
      }
    },
    resetModalOpen && /* @__PURE__ */ import_react135.default.createElement(
      WarningModal_default,
      {
        message: "Are you sure you want to reset the widget?",
        acknowledgeButtonText: "Accept",
        onAcknowledge: () => {
          resetForm();
          setResetModalOpen(false);
        },
        onCancel: () => setResetModalOpen(false)
      }
    ),
    warningModalOpen && /* @__PURE__ */ import_react135.default.createElement(
      WarningModal_default,
      {
        message: warningModalOpen.message,
        onAcknowledge: () => {
          setWarningModalOpen(null);
          setFormStep(1);
        },
        onCancel: () => {
          setWarningModalOpen(null);
          setFormStep(0);
        }
      }
    ),
    mode === "payment" /* payment */ && !transactionOption && /* @__PURE__ */ import_react135.default.createElement("h2", { className: "invalid-option-banner" }, "We're unable to process your payment. Please ensure the necessary transaction details are provided. Contact support if the issue persists."),
    /* @__PURE__ */ import_react135.default.createElement("div", { className: "transfer-card" }, /* @__PURE__ */ import_react135.default.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ import_react135.default.createElement("div", { className: "topbar" }, /* @__PURE__ */ import_react135.default.createElement("div", { className: "title" }, /* @__PURE__ */ import_react135.default.createElement("h3", { style: { marginRight: "5px" } }, formStep === 0 ? titleOption?.initialTitle ? titleOption.initialTitle : mode === "payment" /* payment */ ? "New Purchase" : "New Transfer" : titleOption?.confirmTitle ? titleOption.confirmTitle : mode === "payment" /* payment */ ? "Confirm Purchase" : "Transfer Details")), /* @__PURE__ */ import_react135.default.createElement("div", { className: "control-buttons" }, pendingTxs > 0 ? /* @__PURE__ */ import_react135.default.createElement(TxButton_default, { theme }) : null, /* @__PURE__ */ import_react135.default.createElement(
      ExternalLink_default,
      {
        to: helpURL ? helpURL : "https://docs.kima.network/kima-network/try-kima-with-the-demo-app"
      },
      /* @__PURE__ */ import_react135.default.createElement("div", { className: "menu-button" }, "I need help")
    ), sourceChain.shortName === "CC" && formStep > 0 && /* @__PURE__ */ import_react135.default.createElement(ExternalLink_default, { to: "https://docs.kima.network/kima-network/supported-fiat" }, /* @__PURE__ */ import_react135.default.createElement("div", { className: "menu-button" }, "Unsupported Countries")), formStep === 0 && mode !== "payment" /* payment */ && /* @__PURE__ */ import_react135.default.createElement(
      "button",
      {
        className: "reset-button",
        onClick: () => setResetModalOpen(true),
        disabled: isApproving || isSubmitting || isSigning
      },
      "Reset"
    ))), mode === "payment" /* payment */ && paymentTitleOption?.title && /* @__PURE__ */ import_react135.default.createElement("h4", { className: "subtitle" }, paymentTitleOption.title)), /* @__PURE__ */ import_react135.default.createElement("div", { className: "kima-card-content", ref: mainRef }, formStep === 0 ? /* @__PURE__ */ import_react135.default.createElement(
      SingleForm_default,
      {
        ...{
          allowance: (0, import_viem8.parseUnits)(
            allowance?.toString() ?? "0",
            decimals ?? 18
          ),
          balance: (0, import_viem8.parseUnits)(balance?.toString() ?? "0", decimals ?? 18),
          decimals: 2,
          isLoadingFees,
          initialSelection,
          setInitialSelection
        }
      }
    ) : ccTransactionStatus !== "idle" ? /* @__PURE__ */ import_react135.default.createElement(CCWidget_default, null) : /* @__PURE__ */ import_react135.default.createElement(
      ConfirmDetails_default,
      {
        ...{
          isApproved,
          feeOptionDisabled
        }
      }
    )), /* @__PURE__ */ import_react135.default.createElement(
      "div",
      {
        className: `kima-card-footer ${mode === "bridge" /* bridge */ && formStep !== 0 && "confirm"}`
      },
      /* @__PURE__ */ import_react135.default.createElement("div", { className: `button-group` }, isBackButtonEnabled && /* @__PURE__ */ import_react135.default.createElement(
        SecondaryButton_default,
        {
          clickHandler: onBack,
          theme: theme.colorMode,
          disabled: isApproving || isSubmitting || isSigning
        },
        formStep > 0 && ccTransactionStatus !== "initialized" ? "Back" : "Cancel"
      ), !!allowance && allowance > 0 && formStep !== 0 && sourceChain.shortName !== "CC" && mode !== "light" /* light */ ? /* @__PURE__ */ import_react135.default.createElement(
        SecondaryButton_default,
        {
          clickHandler: onCancelApprove,
          isLoading: isCancellingApprove,
          theme: theme.colorMode,
          disabled: isCancellingApprove || isApproving || isSubmitting || isSigning
        },
        isCancellingApprove ? "Cancelling Approval" : "Cancel Approve"
      ) : null, isSubmitButtonEnabled && /* @__PURE__ */ import_react135.default.createElement(
        PrimaryButton_default,
        {
          clickHandler: onNext,
          isLoading: isApproving || isSubmitting || isSigning || isLoadingFees,
          disabled: isApproving || isSubmitting || isSigning || mode === "payment" /* payment */ && !transactionOption || isLoadingFees
        },
        getButtonLabel()
      ))
    ), /* @__PURE__ */ import_react135.default.createElement(SolanaWalletConnectModal_default, null), /* @__PURE__ */ import_react135.default.createElement(TronWalletConnectModal_default, null), /* @__PURE__ */ import_react135.default.createElement(
      import_react_hot_toast5.Toaster,
      {
        position: "top-right",
        reverseOrder: false,
        containerStyle: {
          position: "absolute"
        },
        toastOptions: {
          duration: 3 * 1e3,
          style: {
            fontFamily: "Manrope",
            position: "relative",
            top: windowWidth > 768 ? "3rem" : "1.5rem",
            right: windowWidth > 768 ? "1.5rem" : "0rem",
            margin: "5px 0",
            padding: ".7rem 1.5rem",
            color: theme.colorMode === "light" /* light */ ? "black" : "white",
            fontSize: "1em",
            borderRadius: "50px",
            border: "1px solid #B900004D",
            background: theme.colorMode === "light" /* light */ ? "#F7F8F9" : "#242732"
          }
        }
      }
    ), /* @__PURE__ */ import_react135.default.createElement("div", { className: "floating-footer" }, /* @__PURE__ */ import_react135.default.createElement("div", { className: `items ${theme.colorMode}` }, /* @__PURE__ */ import_react135.default.createElement("span", null, "Powered by"), /* @__PURE__ */ import_react135.default.createElement(KimaNetwork_default, null))))
  );
};

// src/components/KimaWidgetWrapper.tsx
var import_react138 = require("@reown/appkit/react");

// src/hooks/useDebugMode.ts
var import_react136 = require("react");
var useDebugCode = (sequence = ["D", "E", "B", "U", "G"]) => {
  const [debugMode, setDebugMode] = (0, import_react136.useState)(false);
  const [, setInputSequence] = (0, import_react136.useState)([]);
  (0, import_react136.useEffect)(() => {
    const onKeyDown = (e) => {
      setInputSequence((prev) => {
        const next = [...prev, e.key].slice(-sequence.length);
        if (JSON.stringify(next) !== JSON.stringify(sequence)) {
          return next;
        }
        setDebugMode((prev2) => {
          if (prev2) {
            logger_default.info("\u{1F6E0}\uFE0F Disabling debug mode");
            logger_default.setLevel(DEFAULT_LOG_LEVEL);
          } else {
            logger_default.setLevel("debug");
            logger_default.info("\u{1F6E0}\uFE0F Debug Mode enabled");
          }
          return !prev2;
        });
        return next;
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sequence]);
  return debugMode;
};

// src/components/KimaWidgetWrapper.tsx
var import_loglevel3 = __toESM(require("loglevel"), 1);
var KimaWidgetWrapper = ({
  mode,
  txId,
  dAppOption = "none" /* None */,
  theme,
  titleOption,
  paymentTitleOption,
  helpURL = "",
  compliantOption = true,
  transactionOption,
  excludedSourceNetworks = [],
  excludedTargetNetworks = [],
  chainData,
  envOptions
}) => {
  useDebugCode();
  const { kimaBackendUrl } = useKimaContext();
  const submitted = (0, import_react_redux58.useSelector)(selectSubmitted);
  const dispatch = (0, import_react_redux58.useDispatch)();
  const { setThemeMode, setThemeVariables } = (0, import_react138.useAppKitTheme)();
  const sourceChain = (0, import_react_redux58.useSelector)(selectSourceChain);
  const ccTransactionStatus = (0, import_react_redux58.useSelector)(selectCCTransactionStatus);
  const networkOption = envOptions?.env;
  const kimaExplorer = envOptions?.kimaExplorer || "https://explorer.sardis.kima.network";
  (0, import_react137.useEffect)(() => {
    dispatch(setTheme(theme));
    setThemeMode(theme.colorMode === "light" /* light */ ? "light" : "dark");
    setThemeVariables({
      "--w3m-font-family": "Manrope, sans-serif",
      "--w3m-border-radius-master": "42px"
    });
    if (transactionOption) dispatch(setTransactionOption(transactionOption));
    dispatch(setCompliantOption(compliantOption));
    dispatch(setBackendUrl(kimaBackendUrl));
    dispatch(setMode(mode));
    dispatch(setDappOption(dAppOption));
    dispatch(setNetworkOption(networkOption));
    dispatch(setKimaExplorer(kimaExplorer));
    if (transactionOption) {
      if (transactionOption.sourceChain) {
        const sourceChain2 = chainData?.find(
          (currentChain) => currentChain.shortName === transactionOption.sourceChain
        );
        dispatch(setSourceChain(sourceChain2));
      }
      const targetChain = chainData?.find(
        (currentChain) => currentChain.shortName === transactionOption.targetChain
      );
      dispatch(setTargetChain(targetChain));
      dispatch(setTargetAddress(transactionOption.targetAddress || ""));
      dispatch(setTargetCurrency(transactionOption.currency || ""));
      dispatch(setAmount(transactionOption.amount.toString() || ""));
    }
    if (mode === "payment" /* payment */ && !transactionOption) {
      throw new Error(
        "Config error: KimaTransactionWidget.transactionOption is required in payment mode"
      );
    } else if (mode === "status" /* status */) {
      dispatch(setTxId(txId || -1));
      dispatch(setSubmitted(true));
    } else if (mode === "bridge" /* bridge */ || mode === "light" /* light */) {
      dispatch(setTxId(-1));
      dispatch(setSubmitted(false));
    }
  }, [theme, transactionOption, mode, networkOption, chainData]);
  (0, import_react137.useEffect)(() => {
    if (!chainData?.length) return;
    indexPluginsByChain(chainData);
  }, [chainData]);
  if (sourceChain.shortName === "CC") {
    if (submitted && ccTransactionStatus === "success") {
      import_loglevel3.default.debug("will return transaction widget on cc success");
      return /* @__PURE__ */ import_react137.default.createElement(TransactionWidget, { theme });
    }
    return /* @__PURE__ */ import_react137.default.createElement(
      TransferWidget,
      {
        theme,
        helpURL,
        titleOption,
        paymentTitleOption
      }
    );
  }
  return submitted ? /* @__PURE__ */ import_react137.default.createElement(TransactionWidget, { theme }) : /* @__PURE__ */ import_react137.default.createElement(
    TransferWidget,
    {
      theme,
      helpURL,
      titleOption,
      paymentTitleOption
    }
  );
};
var KimaWidgetWrapper_default = KimaWidgetWrapper;

// src/components/KimaTransactionWidget.tsx
var import_react_redux59 = require("react-redux");

// src/SkeletonLoader.tsx
var import_react139 = __toESM(require("react"), 1);
var SkeletonLoader = ({ theme }) => {
  return /* @__PURE__ */ import_react139.default.createElement(
    "div",
    {
      className: `kima-card ${theme.colorMode}`,
      style: {
        background: theme.colorMode === "light" /* light */ ? theme.backgroundColorLight : theme.backgroundColorDark
      }
    },
    /* @__PURE__ */ import_react139.default.createElement("div", { className: "transfer-card" }, /* @__PURE__ */ import_react139.default.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ import_react139.default.createElement("div", { className: "topbar" }, /* @__PURE__ */ import_react139.default.createElement("div", { className: "title skeleton" }, /* @__PURE__ */ import_react139.default.createElement("h3", null))), /* @__PURE__ */ import_react139.default.createElement("h4", { className: "subtitle" })), /* @__PURE__ */ import_react139.default.createElement("div", { className: "kima-card-content skeleton" }, /* @__PURE__ */ import_react139.default.createElement("div", { className: "skeleton" }), /* @__PURE__ */ import_react139.default.createElement("div", { className: "skeleton" }), /* @__PURE__ */ import_react139.default.createElement("div", { className: "skeleton" }), /* @__PURE__ */ import_react139.default.createElement("div", { className: "skeleton" }), /* @__PURE__ */ import_react139.default.createElement("div", { className: "skeleton" })), /* @__PURE__ */ import_react139.default.createElement("div", { className: `kima-card-footer` }, /* @__PURE__ */ import_react139.default.createElement("div", { className: `button-group skeleton` }, /* @__PURE__ */ import_react139.default.createElement("div", { className: "skeleton" }))), /* @__PURE__ */ import_react139.default.createElement("div", { className: "floating-footer" }, /* @__PURE__ */ import_react139.default.createElement("div", { className: `items ${theme.colorMode}` }, /* @__PURE__ */ import_react139.default.createElement("span", null, "Powered by"), /* @__PURE__ */ import_react139.default.createElement(FooterLogo_default, { width: 50, fill: "black" }), /* @__PURE__ */ import_react139.default.createElement("strong", null, "Network"))))
  );
};
var SkeletonLoader_default = SkeletonLoader;

// src/components/ErrorWidget.tsx
var import_react140 = __toESM(require("react"), 1);
var ErrorWidget = ({
  theme,
  title,
  message
}) => {
  return /* @__PURE__ */ import_react140.default.createElement(
    "div",
    {
      className: `kima-card ${theme.colorMode}`,
      style: {
        background: theme.colorMode === "light" /* light */ ? theme.backgroundColorLight : theme.backgroundColorDark
      }
    },
    /* @__PURE__ */ import_react140.default.createElement("div", { className: "transfer-card" }, /* @__PURE__ */ import_react140.default.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ import_react140.default.createElement("div", { className: "topbar" }, /* @__PURE__ */ import_react140.default.createElement("div", { className: "title" }, /* @__PURE__ */ import_react140.default.createElement("h3", null, title))), /* @__PURE__ */ import_react140.default.createElement("h4", { className: "subtitle" })), /* @__PURE__ */ import_react140.default.createElement("div", { className: "kima-card-content error" }, /* @__PURE__ */ import_react140.default.createElement(Error_default, { width: 40, height: 40 }), /* @__PURE__ */ import_react140.default.createElement("h2", null, message)), /* @__PURE__ */ import_react140.default.createElement("div", { className: `kima-card-footer` }), /* @__PURE__ */ import_react140.default.createElement("div", { className: "floating-footer" }, /* @__PURE__ */ import_react140.default.createElement("div", { className: `items ${theme.colorMode}` }, /* @__PURE__ */ import_react140.default.createElement("span", null, "Powered by"), /* @__PURE__ */ import_react140.default.createElement(FooterLogo_default, { width: 50, fill: "black" }), /* @__PURE__ */ import_react140.default.createElement("strong", null, "Network"))))
  );
};
var ErrorWidget_default = ErrorWidget;

// src/components/KimaTransactionWidget.tsx
var KimaTransactionWidget = ({
  mode,
  txId,
  dAppOption = "none" /* None */,
  theme,
  titleOption,
  paymentTitleOption,
  helpURL = "",
  compliantOption = false,
  transactionOption,
  excludedSourceNetworks = [],
  excludedTargetNetworks = []
}) => {
  const dispatch = (0, import_react_redux59.useDispatch)();
  const { kimaBackendUrl } = useKimaContext();
  const [hydrated, setHydrated] = (0, import_react141.useState)(false);
  const {
    data: envOptions,
    error: envOptionsError,
    isLoading: isLoadingEnvs
  } = useGetEnvOptions({ kimaBackendUrl });
  const {
    data: chainData,
    error: chainDataError,
    isLoading: isLoadingChainData
  } = useChainData(kimaBackendUrl);
  (0, import_react141.useEffect)(() => {
    if (typeof window !== "undefined") setHydrated(true);
  }, []);
  (0, import_react141.useEffect)(() => {
    if (!isLoadingChainData && chainData) {
      dispatch(setSourceChain(chainData[0]));
      dispatch(setTargetChain(chainData[1]));
    }
  }, [chainData]);
  (0, import_react141.useEffect)(() => {
    if (theme?.colorMode) {
      dispatch(setTheme(theme));
    }
  }, [theme?.colorMode]);
  if (!hydrated || !theme?.colorMode) return /* @__PURE__ */ import_react141.default.createElement(ring_default, { width: 20, height: 20, fill: "#86b8ce" });
  if (isLoadingEnvs || isLoadingChainData)
    return /* @__PURE__ */ import_react141.default.createElement(SkeletonLoader_default, { theme });
  if (envOptionsError || !envOptions)
    return /* @__PURE__ */ import_react141.default.createElement(
      ErrorWidget_default,
      {
        theme,
        title: "Fatal ENV Initialization Error" /* EnvLoadingError */,
        message: "There was an error loading the required environment variables from the backend. Please check that the backend is running properly and the widget points to the corresponding url." /* EnvLoadingError */
      }
    );
  if (chainDataError || !chainData)
    return /* @__PURE__ */ import_react141.default.createElement(
      ErrorWidget_default,
      {
        theme,
        title: "Fatal Chains Initialization Error" /* ChainLoadingError */,
        message: "There was an error loading the chain data from the backend. Please check that the backend is running properly and the widget points to the corresponding url." /* ChainLoadingError */
      }
    );
  return /* @__PURE__ */ import_react141.default.createElement(
    KimaWidgetWrapper_default,
    {
      ...{
        theme,
        mode,
        txId,
        dAppOption,
        titleOption,
        paymentTitleOption,
        helpURL,
        compliantOption,
        transactionOption,
        excludedSourceNetworks,
        excludedTargetNetworks,
        chainData,
        envOptions
      }
    }
  );
};
var KimaTransactionWidget_default = KimaTransactionWidget;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CHAIN_NAMES_TO_STRING,
  CHAIN_STRING_TO_NAME,
  ColorModeOptions,
  CurrencyOptions,
  DAppOptions,
  KimaProvider,
  KimaTransactionWidget,
  ModeOptions,
  NetworkOptions,
  SupportNetworks
});
//# sourceMappingURL=index.cjs.map