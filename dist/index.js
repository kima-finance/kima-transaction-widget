var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    "use strict";
    (function(module2, exports2) {
      "use strict";
      function assert(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN2(number, base, endian) {
        if (BN2.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2;
      } else {
        exports2.BN = BN2;
      }
      BN2.BN = BN2;
      BN2.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = __require("buffer").Buffer;
        }
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      };
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN2.prototype._init = function init(number, base, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert(base === (base | 0) && base >= 2 && base <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN2.prototype._initNumber = function _initNumber(number, base, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initArray = function _initArray(number, base, endian) {
        assert(typeof number.length === "number");
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
        if (endian === "be") {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this._strip();
      };
      function parseHex4Bits(string, index) {
        var c = string.charCodeAt(index);
        if (c >= 48 && c <= 57) {
          return c - 48;
        } else if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          assert(false, "Invalid character in " + string);
        }
      }
      function parseHexByte(string, lowerBound, index) {
        var r = parseHex4Bits(string, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index - 1) << 4;
        }
        return r;
      }
      BN2.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
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
            this.words[j] |= w & 67108863;
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
      function parseBase(str, start, end, mul) {
        var r = 0;
        var b = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            b = c - 49 + 10;
          } else if (c >= 17) {
            b = c - 17 + 10;
          } else {
            b = c;
          }
          assert(c >= 0 && b < mul, "Invalid character");
          r += b;
        }
        return r;
      }
      BN2.prototype._parseBase = function _parseBase(number, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
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
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this._strip();
      };
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      BN2.prototype._move = function _move(dest) {
        move(dest, this);
      };
      BN2.prototype.clone = function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      };
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN2.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN2.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
        } catch (e) {
          BN2.prototype.inspect = inspect;
        }
      } else {
        BN2.prototype.inspect = inspect;
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN2.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
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
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
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
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert(false, "Base should be between 2 and 36");
      };
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16, 2);
      };
      if (Buffer2) {
        BN2.prototype.toBuffer = function toBuffer(endian, length) {
          return this.toArrayLike(Buffer2, endian, length);
        };
      }
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      var allocate = function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size);
        }
        return new ArrayType(size);
      };
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert(byteLength <= reqLength, "byte array longer than desired length");
        assert(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      };
      BN2.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position++] = word & 255;
          if (position < res.length) {
            res[position++] = word >> 8 & 255;
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255;
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
      BN2.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position--] = word & 255;
          if (position >= 0) {
            res[position--] = word >> 8 & 255;
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255;
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
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      };
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN2.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      };
      BN2.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN2.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN2.prototype.iuand = function iuand(num) {
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
      BN2.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN2.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN2.prototype.iuxor = function iuxor(num) {
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
      BN2.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN2.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this._strip();
      };
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN2.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this._strip();
      };
      BN2.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
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
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN2.prototype.add = function add(num) {
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
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
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
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
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
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        var len = self.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
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
      var comb10MulTo = function comb10MulTo2(self, num, out) {
        var a = self.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
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
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        out.length = self.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
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
      function jumboMulTo(self, num, out) {
        return bigMulTo(self, num, out);
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
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
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert(carry === 0);
        assert((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out._strip();
      };
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN2.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert(typeof num === "number");
        assert(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN2.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN2.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0) return new BN2(1);
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
      BN2.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
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
      BN2.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0);
        return this.iushln(bits);
      };
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
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
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this._strip();
      };
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN2.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN2.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this._strip();
      };
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN2.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0) return this.isubn(-num);
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
        return this._iaddn(num);
      };
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN2.prototype.isubn = function isubn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
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
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this._strip();
      };
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN2.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN2.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0) return this._strip();
        assert(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this._strip();
      };
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN2(null);
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
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
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
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modrn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modrn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN2.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN2.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      };
      BN2.prototype.modn = function modn(num) {
        return this.modrn(num);
      };
      BN2.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        this._strip();
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN2.prototype.egcd = function egcd(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN2(1);
        var B = new BN2(0);
        var C = new BN2(0);
        var D = new BN2(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
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
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
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
      BN2.prototype._invmp = function _invmp(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN2(1);
        var x2 = new BN2(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
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
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
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
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN2.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN2.prototype.cmpn = function cmpn(num) {
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
          assert(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.ucmp = function ucmp(num) {
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
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN2.red = function red(num) {
        return new Red(num);
      };
      BN2.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        assert(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN2.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN2.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN2.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN2.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN2.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN2.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN2.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN2.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN2.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN2.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN2.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN2.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN2.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN2(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN2(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
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
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
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
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
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
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN2._prime = function prime(name) {
        if (primes[name]) return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert(a.negative === 0, "red works only with positives");
        assert(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert((a.negative | b.negative) === 0, "red works only with positives");
        assert(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone();
        var mod3 = this.m.andln(3);
        assert(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN2(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert(!q.isZero());
        var one = new BN2(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN2(2 * z * z).toRed(this);
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
          var b = this.pow(c, new BN2(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN2(1).toRed(this);
        if (num.cmpn(1) === 0) return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN2(1).toRed(this);
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
            var bit = word >> j & 1;
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
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN2.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN2(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
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
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN2(0)._forceRed(this);
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
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// src/KimaProvider.tsx
import React135, { useMemo as useMemo7 } from "react";
import { Provider, useSelector as useSelector7 } from "react-redux";

// src/store/index.tsx
import { configureStore } from "@reduxjs/toolkit";

// src/store/optionSlice.tsx
import * as toolkitRaw from "@reduxjs/toolkit";

// src/utils/constants.tsx
import { clusterApiUrl } from "@solana/web3.js";

// src/assets/icons/Cross.tsx
import React from "react";
var Cross = ({ width = 60, height = 60, fill = "white", ...rest }) => {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 25 26",
      fill,
      ...rest
    },
    /* @__PURE__ */ React.createElement(
      "path",
      {
        d: "M0.832764 1.33276L24.1673 24.6673",
        stroke: "#778DA3",
        strokeWidth: "2"
      }
    ),
    /* @__PURE__ */ React.createElement(
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
import React2 from "react";
var Minimize = ({ width = 16, height = 1, fill = "#86B8CE", ...rest }) => {
  return /* @__PURE__ */ React2.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 11 1",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React2.createElement("rect", { width: "11", height: "1", fill })
  );
};
var Minimize_default = Minimize;

// src/assets/icons/FooterLogo.tsx
import React3 from "react";
var FooterLogo = ({ width = 40, height = 40, fill = "#C5C5C5", ...rest }) => {
  return /* @__PURE__ */ React3.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 49 18",
      fill,
      ...rest
    },
    /* @__PURE__ */ React3.createElement(
      "path",
      {
        d: "M30.1884 10.576C30.1884 9.5081 30.7939 8.62496 31.9158 8.62496C32.8449 8.6572 33.5977 9.53173 33.5977 10.576V17.2908C33.5977 17.4584 33.7284 17.5938 33.8901 17.5938H36.8246C36.9863 17.5938 37.117 17.4584 37.117 17.2908V9.83256C37.117 7.1144 35.5699 5.34813 33.1021 5.34813C31.3974 5.34813 30.2755 6.11523 29.5579 6.94895C29.5455 6.96399 29.5268 6.96184 29.5144 6.9468C28.8632 6.04648 27.8304 5.34813 26.3497 5.34813C25.0038 5.34813 23.8612 5.92829 23.2971 6.78349C23.2784 6.77705 23.2971 6.78349 23.2763 6.77705V5.93259C23.2763 5.76499 23.1457 5.62962 22.9839 5.62962H20.0702C19.9085 5.62962 19.7778 5.76714 19.7778 5.93259V17.293C19.7778 17.4606 19.9085 17.596 20.0702 17.596H22.9839C23.1457 17.596 23.2763 17.4606 23.2763 17.293V10.5782C23.2763 9.51025 23.8819 8.62711 24.981 8.62711C25.9225 8.65934 26.6857 9.53388 26.6857 10.5782V17.293C26.6857 17.4606 26.8163 17.596 26.9781 17.596H29.8918C30.0536 17.596 30.1842 17.4606 30.1842 17.293V10.5782L30.1884 10.576ZM45.6134 17.2887C45.6134 17.4563 45.744 17.5917 45.9058 17.5917H48.7075C48.8692 17.5917 48.9999 17.4563 48.9999 17.2887V10.1807C48.9999 7.1144 47.0713 5.34813 43.7739 5.34813C42.5711 5.33739 40.9203 5.69838 39.9643 6.1711C39.8648 6.22052 39.8025 6.32796 39.8025 6.44184V8.89141C39.8025 9.11703 40.0307 9.26099 40.2256 9.16215C41.051 8.74314 41.9946 8.44017 42.9858 8.44017C44.4354 8.41009 45.6092 9.25455 45.6092 10.3225V10.4084C45.6092 10.576 45.4329 10.6856 45.294 10.5997C44.7527 10.2666 43.8651 9.97437 42.9174 9.97437C40.4724 9.97437 38.4546 11.5086 38.4546 13.8314C38.4546 16.3411 40.4724 17.8753 42.8054 17.8753C44.1513 17.8753 45.2048 17.3166 45.6092 16.8525V17.293L45.6134 17.2887ZM45.659 13.8292C45.659 14.7811 44.649 15.2925 43.6847 15.2925C42.7204 15.2925 41.6897 14.7811 41.6897 13.8292C41.6897 12.8773 42.6768 12.3896 43.6847 12.3896C44.6926 12.3896 45.659 12.901 45.659 13.8292Z",
        fill
      }
    ),
    /* @__PURE__ */ React3.createElement(
      "path",
      {
        d: "M14.1994 17.594H17.1131C17.2749 17.594 17.4055 17.4586 17.4055 17.291V5.92846C17.4055 5.76086 17.2749 5.62549 17.1131 5.62549H14.1994C14.0376 5.62549 13.907 5.76086 13.907 5.92846V17.2889C13.907 17.4565 14.0376 17.5918 14.1994 17.5918",
        fill
      }
    ),
    /* @__PURE__ */ React3.createElement(
      "path",
      {
        d: "M15.6801 0H15.6324C14.4378 0 13.488 0.960487 13.488 2.2218C13.488 3.48311 14.4378 4.41996 15.6324 4.41996H15.6801C16.8497 4.41996 17.8244 3.45947 17.8244 2.2218C17.8244 0.984123 16.8497 0 15.6801 0Z",
        fill
      }
    ),
    /* @__PURE__ */ React3.createElement(
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
import React4 from "react";
var Check = ({ width = 60, height = 60, fill = "#86B8CE", ...rest }) => {
  return /* @__PURE__ */ React4.createElement(
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
    /* @__PURE__ */ React4.createElement(
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
import React5 from "react";
var Warning = ({ width = 14, height = 13, ...rest }) => {
  return /* @__PURE__ */ React5.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 14 13",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React5.createElement(
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
import React6 from "react";

// src/assets/icons/Arrow.tsx
import React7 from "react";
var Arrow = ({ width = 22, height = 25, fill = "none", ...rest }) => {
  return /* @__PURE__ */ React7.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 22 25",
      fill,
      ...rest
    },
    /* @__PURE__ */ React7.createElement("path", { d: "M10.9974 0L10.9974 16.625", stroke: "#778DA3", strokeWidth: "2" }),
    /* @__PURE__ */ React7.createElement(
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
import React8 from "react";
var Lock = ({ width = 24, height = 27, fill = "none", ...rest }) => {
  return /* @__PURE__ */ React8.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 24 27",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React8.createElement(
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
    /* @__PURE__ */ React8.createElement(
      "path",
      {
        d: "M11.9004 18.7014L11.9004 16.0376",
        stroke: "#86B8CE",
        strokeWidth: "1.86364",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ React8.createElement(
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
import React9 from "react";
var Ethereum = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React9.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 22 36",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React9.createElement("path", { d: "M10.9966 13.3093V0L0 18.3307L10.9966 13.3093Z", fill: "#8A92B2" }),
    /* @__PURE__ */ React9.createElement(
      "path",
      {
        d: "M10.9966 24.8639V13.3093L0 18.3307L10.9966 24.8639ZM10.9966 13.3093L21.9933 18.3307L10.9966 0V13.3093Z",
        fill: "#62688F"
      }
    ),
    /* @__PURE__ */ React9.createElement(
      "path",
      {
        d: "M10.9966 13.3093V24.8639L21.9933 18.3307L10.9966 13.3093Z",
        fill: "#454A75"
      }
    ),
    /* @__PURE__ */ React9.createElement("path", { d: "M10.9966 26.9561L0 20.4297L10.9966 36V26.9561Z", fill: "#8A92B2" }),
    /* @__PURE__ */ React9.createElement("path", { d: "M22 20.4297L10.9966 26.9561V36L22 20.4297Z", fill: "#62688F" })
  );
};
var Ethereum_default = Ethereum;

// src/assets/icons/Solana.tsx
import React10 from "react";
var Solana = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React10.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 26 21",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React10.createElement(
      "path",
      {
        d: "M22.2506 4.97063C22.1771 5.05109 22.0851 5.11367 21.984 5.14943C21.8828 5.19413 21.7725 5.21201 21.6622 5.21201H0.835479C0.0998792 5.21201 -0.277116 4.31801 0.237804 3.78161L3.65835 0.25032C3.73191 0.16986 3.82386 0.107281 3.9342 0.0625809C4.03534 0.017881 4.14568 0 4.25602 0H25.1655C25.9102 0 26.2781 0.902938 25.7539 1.43934L22.2506 4.97063ZM22.2506 20.7586C22.0943 20.9106 21.8828 21 21.6622 21H0.835479C0.0998792 21 -0.277116 20.1239 0.237804 19.6054L3.65835 16.1545C3.73191 16.0741 3.83305 16.0115 3.9342 15.9757C4.03534 15.931 4.14568 15.9132 4.25602 15.9132H25.1655C25.9102 15.9132 26.2781 16.7982 25.7539 17.3167L22.2506 20.7586ZM22.2506 8.19796C22.0943 8.04598 21.8828 7.95658 21.6622 7.95658H0.835479C0.0998792 7.95658 -0.277116 8.8327 0.237804 9.35121L3.65835 12.802C3.73191 12.8825 3.83305 12.9451 3.9342 12.9808C4.03534 13.0255 4.14568 13.0434 4.25602 13.0434H25.1655C25.9102 13.0434 26.2781 12.1584 25.7539 11.6398L22.2506 8.19796Z",
        fill: "url(#paint0_linear_721_5435)"
      }
    ),
    /* @__PURE__ */ React10.createElement("defs", null, /* @__PURE__ */ React10.createElement(
      "linearGradient",
      {
        id: "paint0_linear_721_5435",
        x1: "1.58985",
        y1: "21.2621",
        x2: "23.7184",
        y2: "-0.89642",
        gradientUnits: "userSpaceOnUse"
      },
      /* @__PURE__ */ React10.createElement("stop", { "stop-color": "#CF41E8" }),
      /* @__PURE__ */ React10.createElement("stop", { offset: "1", "stop-color": "#10F2B0" })
    ))
  );
};
var Solana_default = Solana;

// src/assets/icons/Polygon.tsx
import React11 from "react";
var Polygon = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React11.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 25",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React11.createElement(
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
import React12 from "react";
var PolygonzkEVM = ({ width = 29, height = 32, ...rest }) => {
  return /* @__PURE__ */ React12.createElement(
    "svg",
    {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      ...rest
    },
    /* @__PURE__ */ React12.createElement(
      "path",
      {
        d: "M0 0 C2.640625 1.33984375 2.640625 1.33984375 5.25 2.9375 C6.12140625 3.46214844 6.9928125 3.98679687 7.890625 4.52734375 C10 6 10 6 11 8 C11.17484831 10.2873598 11.26720049 12.58141443 11.3125 14.875 C11.34988281 16.10992188 11.38726563 17.34484375 11.42578125 18.6171875 C11 22 11 22 9.2578125 24.26953125 C7.07701959 25.94096941 4.94591023 27.4452404 2.5625 28.8125 C1.82128906 29.25207031 1.08007812 29.69164063 0.31640625 30.14453125 C-2.63165451 31.23327544 -4.0243054 30.95990148 -7 30 C-9.640625 28.66015625 -9.640625 28.66015625 -12.25 27.0625 C-13.12140625 26.53785156 -13.9928125 26.01320313 -14.890625 25.47265625 C-17 24 -17 24 -18 22 C-18.17484831 19.7126402 -18.26720049 17.41858557 -18.3125 15.125 C-18.34988281 13.89007813 -18.38726563 12.65515625 -18.42578125 11.3828125 C-18 8 -18 8 -16.2578125 5.73046875 C-14.07701959 4.05903059 -11.94591023 2.5547596 -9.5625 1.1875 C-8.82128906 0.74792969 -8.08007812 0.30835937 -7.31640625 -0.14453125 C-4.36834549 -1.23327544 -2.9756946 -0.95990148 0 0 Z M-4 2 C-5.65 3.32 -7.3 4.64 -9 6 C-6.525 6.495 -6.525 6.495 -4 7 C-4 8.98 -4 10.96 -4 13 C-3.67 13 -3.34 13 -3 13 C-2.5978125 11.576875 -2.5978125 11.576875 -2.1875 10.125 C-1 7 -1 7 2 5 C0.02 4.01 -1.96 3.02 -4 2 Z M-15 9 C-15.25030977 11.58380177 -15.25030977 11.58380177 -15 14 C-13.68 13.67 -12.36 13.34 -11 13 C-11 11.02 -11 9.04 -11 7 C-12.46225016 6.90754997 -12.46225016 6.90754997 -15 9 Z M5 8 C5 9.65 5 11.3 5 13 C5.66 13 6.32 13 7 13 C7.33 11.68 7.66 10.36 8 9 C7.01 8.67 6.02 8.34 5 8 Z M-8 10 C-7 13 -7 13 -7 13 Z M1 10 C2 13 2 13 2 13 Z M6 16 C4.70366379 17.06645115 4.70366379 17.06645115 4.9375 19.5625 C4.958125 20.366875 4.97875 21.17125 5 22 C5.99 21.67 6.98 21.34 8 21 C8 19.35 8 17.7 8 16 C7.34 16 6.68 16 6 16 Z M-14 17 C-14.33 17.99 -14.66 18.98 -15 20 C-14.02149805 21.02104551 -13.02019573 22.0206121 -12 23 C-11.67 23 -11.34 23 -11 23 C-11 21.02 -11 19.04 -11 17 C-11.99 17 -12.98 17 -14 17 Z M-8 17 C-7 20 -7 20 -7 20 Z M-4 17 C-4 18.98 -4 20.96 -4 23 C-5.65 23.33 -7.3 23.66 -9 24 C-7.30504044 25.66846734 -7.30504044 25.66846734 -5 27 C-1.62963689 26.75925978 -0.41201979 26.41201979 2 24 C1.360625 23.773125 0.72125 23.54625 0.0625 23.3125 C-2 22 -2 22 -2.75 19.375 C-2.8325 18.59125 -2.915 17.8075 -3 17 C-3.33 17 -3.66 17 -4 17 Z M1 17 C2 20 2 20 2 20 Z ",
        fill: "#8751E7",
        transform: "translate(18,1)"
      }
    ),
    /* @__PURE__ */ React12.createElement(
      "path",
      {
        d: "M0 0 C2.475 0.495 2.475 0.495 5 1 C5 1.99 5 2.98 5 4 C4.01 4.495 4.01 4.495 3 5 C2.34 4.67 1.68 4.34 1 4 C1 5.98 1 7.96 1 10 C-4.94 10 -10.88 10 -17 10 C-16.34 9.67 -15.68 9.34 -15 9 C-15 7.02 -15 5.04 -15 3 C-12.6875 2.375 -12.6875 2.375 -10 2 C-9.01 2.66 -8.02 3.32 -7 4 C-6.67 3.67 -6.34 3.34 -6 3 C-4.00041636 2.95919217 -1.99954746 2.95745644 0 3 C0 2.01 0 1.02 0 0 Z M-12 6 C-11 9 -11 9 -11 9 Z M-3 6 C-2 9 -2 9 -2 9 Z ",
        fill: "#905FE8",
        transform: "translate(22,5)"
      }
    ),
    /* @__PURE__ */ React12.createElement(
      "path",
      {
        d: "M0 0 C0.66 0.33 1.32 0.66 2 1 C2 4.96 2 8.92 2 13 C1.01 13.495 1.01 13.495 0 14 C0 12.35 0 10.7 0 9 C-10.89 9.495 -10.89 9.495 -22 10 C-22.33 11.32 -22.66 12.64 -23 14 C-23.66 14 -24.32 14 -25 14 C-25 10.04 -25 6.08 -25 2 C-24.01 2.495 -24.01 2.495 -23 3 C-23 4.32 -23 5.64 -23 7 C-15.74 6.67 -8.48 6.34 -1 6 C-0.67 4.02 -0.34 2.04 0 0 Z ",
        fill: "#7C41E4",
        transform: "translate(26,8)"
      }
    ),
    /* @__PURE__ */ React12.createElement(
      "path",
      {
        d: "M0 0 C5.94 0 11.88 0 18 0 C18 0.33 18 0.66 18 1 C13.545 1.495 13.545 1.495 9 2 C8.67 3.65 8.34 5.3 8 7 C3.25 8.125 3.25 8.125 1 7 C0.67 4.69 0.34 2.38 0 0 Z M4 1 C5 4 5 4 5 4 Z ",
        fill: "#9869E9",
        transform: "translate(6,17)"
      }
    ),
    /* @__PURE__ */ React12.createElement(
      "path",
      {
        d: "M0 0 C1.134375 0.020625 2.26875 0.04125 3.4375 0.0625 C3.480221 1.72861905 3.47813832 3.39632885 3.4375 5.0625 C2.4375 6.0625 2.4375 6.0625 -0.625 6.125 C-1.594375 6.104375 -2.56375 6.08375 -3.5625 6.0625 C-3.94468767 4.40635343 -4.27645102 2.73792976 -4.5625 1.0625 C-3.5625 0.0625 -3.5625 0.0625 0 0 Z ",
        fill: "#844DE6",
        transform: "translate(19.5625,17.9375)"
      }
    ),
    /* @__PURE__ */ React12.createElement(
      "path",
      {
        d: "M0 0 C0 1.65 0 3.3 0 5 C-2.49064888 5.68707555 -4.37886292 6 -7 6 C-7 4.02 -7 2.04 -7 0 C-4.3333581 -1.33332095 -2.83319697 -0.67102033 0 0 Z ",
        fill: "#844DE5",
        transform: "translate(14,8)"
      }
    ),
    /* @__PURE__ */ React12.createElement(
      "path",
      {
        d: "M0 0 C0.33 0 0.66 0 1 0 C1 4.29 1 8.58 1 13 C1.99 12.67 2.98 12.34 4 12 C4 12.66 4 13.32 4 14 C4.66 14.33 5.32 14.66 6 15 C4.02 15.99 4.02 15.99 2 17 C-0.49118953 13.2632157 -0.2065226 11.25548181 -0.125 6.8125 C-0.10695312 5.54019531 -0.08890625 4.26789062 -0.0703125 2.95703125 C-0.04710937 1.98121094 -0.02390625 1.00539063 0 0 Z ",
        fill: "#935FE8",
        transform: "translate(0,9)"
      }
    ),
    /* @__PURE__ */ React12.createElement(
      "path",
      {
        d: "M0 0 C1.65 0.33 3.3 0.66 5 1 C4.25 3.4375 4.25 3.4375 3 6 C0.875 6.8125 0.875 6.8125 -1 7 C-1 6.34 -1 5.68 -1 5 C-1.66 4.67 -2.32 4.34 -3 4 C-1.68 3.34 -0.36 2.68 1 2 C0.67 1.34 0.34 0.68 0 0 Z ",
        fill: "#9768E9",
        transform: "translate(17,24)"
      }
    ),
    /* @__PURE__ */ React12.createElement(
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
import React13 from "react";
var Loader = ({ width = 50, height = 49, ...rest }) => {
  return /* @__PURE__ */ React13.createElement(
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
    /* @__PURE__ */ React13.createElement(
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
import React14 from "react";
var Error2 = ({ width = 21, height = 20, ...rest }) => {
  return /* @__PURE__ */ React14.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 21 20",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React14.createElement("circle", { cx: "10.9331", cy: "10", r: "10", fill: "#B90000" }),
    /* @__PURE__ */ React14.createElement("rect", { x: "8.93311", y: "3", width: "4", height: "9", rx: "2", fill: "white" }),
    /* @__PURE__ */ React14.createElement("rect", { x: "8.93311", y: "13", width: "4", height: "4", rx: "2", fill: "white" })
  );
};
var Error_default = Error2;

// src/assets/icons/Avalanche.tsx
import React15 from "react";
var Avalanche = ({ width = 29, height = 29, ...rest }) => {
  return /* @__PURE__ */ React15.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 30 29",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React15.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M29.8779 14.5C29.8779 22.5082 23.3854 29 15.3762 29C7.36707 29 0.874512 22.5082 0.874512 14.5C0.874512 6.49179 7.36707 0 15.3762 0C23.3854 0 29.8779 6.49179 29.8779 14.5ZM11.2669 20.2703H8.45247C7.86101 20.2703 7.56905 20.2703 7.39082 20.1563C7.19849 20.0316 7.08089 19.825 7.0666 19.597C7.05598 19.3869 7.20197 19.1303 7.49412 18.6175L14.4432 6.37035C14.7388 5.8502 14.8884 5.59032 15.0773 5.49397C15.2804 5.39068 15.5226 5.39068 15.7257 5.49397C15.9146 5.59013 16.0642 5.8502 16.3599 6.37035L17.7884 8.86373L17.7957 8.87647C18.1151 9.43446 18.2771 9.71732 18.3478 10.0143C18.4262 10.3384 18.4262 10.6804 18.3478 11.0046C18.2766 11.3038 18.1163 11.5888 17.7921 12.1551L14.1419 18.6067L14.1325 18.6233C13.811 19.186 13.6482 19.4709 13.4223 19.686C13.1764 19.9212 12.8808 20.0921 12.5566 20.1884C12.261 20.2703 11.9296 20.2703 11.2669 20.2703ZM18.3741 20.2703H22.4067C23.0017 20.2703 23.301 20.2703 23.4792 20.1529C23.6715 20.0281 23.7926 19.8179 23.8034 19.5901C23.8137 19.3868 23.6708 19.1402 23.3908 18.6571C23.3811 18.6407 23.3715 18.6239 23.3616 18.6069L21.3416 15.1516L21.3186 15.1126C21.0348 14.6326 20.8915 14.3903 20.7075 14.2967C20.5045 14.1934 20.2657 14.1934 20.0627 14.2967C19.8775 14.3928 19.7279 14.6458 19.4323 15.1551L17.4194 18.6104L17.4124 18.6224C17.1178 19.1309 16.9706 19.385 16.9813 19.5935C16.9955 19.8216 17.1131 20.0316 17.3055 20.1563C17.48 20.2703 17.7793 20.2703 18.3743 20.2703H18.3741Z",
        fill: "#E84142"
      }
    )
  );
};
var Avalanche_default = Avalanche;

// src/assets/icons/Arbitrum.tsx
import React16 from "react";
var Arbitrum = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React16.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 33 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React16.createElement(
      "path",
      {
        d: "M2.84064 10.032V22.968C2.84064 23.7996 3.27629 24.552 4.00237 24.9744L15.2105 31.4424C15.9234 31.8516 16.8079 31.8516 17.5208 31.4424L28.7289 24.9744C29.4418 24.5652 29.8906 23.7996 29.8906 22.968V10.032C29.8906 9.2004 29.455 8.448 28.7289 8.0256L17.5208 1.5576C16.8079 1.1484 15.9234 1.1484 15.2105 1.5576L4.00237 8.0256C3.28949 8.4348 2.85384 9.2004 2.85384 10.032H2.84064Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ React16.createElement(
      "path",
      {
        d: "M18.8013 19.008L17.204 23.3904C17.1644 23.5092 17.1644 23.6412 17.204 23.7732L19.9499 31.3104L23.1315 29.4756L19.3162 19.008C19.2238 18.7704 18.8938 18.7704 18.8013 19.008Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ React16.createElement(
      "path",
      {
        d: "M22.0094 11.6424C21.917 11.4048 21.5869 11.4048 21.4945 11.6424L19.8971 16.0248C19.8575 16.1436 19.8575 16.2756 19.8971 16.4076L24.3989 28.7496L27.5804 26.9148L22.0094 11.6556V11.6424Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ React16.createElement(
      "path",
      {
        d: "M16.3592 2.046C16.4384 2.046 16.5176 2.0724 16.5836 2.112L28.7026 9.108C28.8479 9.1872 28.9271 9.3456 28.9271 9.504V23.496C28.9271 23.6544 28.8347 23.8128 28.7026 23.892L16.5836 30.888C16.5176 30.9276 16.4384 30.954 16.3592 30.954C16.28 30.954 16.2008 30.9276 16.1348 30.888L4.01574 23.892C3.87052 23.8128 3.79131 23.6544 3.79131 23.496V9.4908C3.79131 9.3324 3.88373 9.174 4.01574 9.0948L16.1348 2.0988C16.2008 2.0592 16.28 2.0328 16.3592 2.0328V2.046ZM16.3592 0C15.9235 0 15.5011 0.1056 15.105 0.33L2.98602 7.326C2.20713 7.7748 1.73187 8.5932 1.73187 9.4908V23.4828C1.73187 24.3804 2.20713 25.1988 2.98602 25.6476L15.105 32.6436C15.4879 32.868 15.9235 32.9736 16.3592 32.9736C16.7948 32.9736 17.2173 32.868 17.6133 32.6436L29.7324 25.6476C30.5113 25.1988 30.9865 24.3804 30.9865 23.4828V9.4908C30.9865 8.5932 30.5113 7.7748 29.7324 7.326L17.6001 0.33C17.2173 0.1056 16.7816 0 16.346 0H16.3592Z",
        fill: "#9DCCED"
      }
    ),
    /* @__PURE__ */ React16.createElement(
      "path",
      {
        d: "M8.3327 28.7628L9.45483 25.7004L11.6991 27.5616L9.60005 29.4888L8.3327 28.7628Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ React16.createElement(
      "path",
      {
        d: "M15.3295 8.5008H12.2535C12.0291 8.5008 11.8178 8.646 11.7386 8.8572L5.15106 26.9148L8.33264 28.7496L15.5935 8.8572C15.6595 8.6724 15.5275 8.4876 15.3427 8.4876L15.3295 8.5008Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ React16.createElement(
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
import React17 from "react";
var Optimism = ({ width = 31, height = 30, ...rest }) => {
  return /* @__PURE__ */ React17.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 31 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React17.createElement(
      "path",
      {
        d: "M15.8719 30C24.1572 30 30.8737 23.2843 30.8737 15C30.8737 6.71573 24.1572 0 15.8719 0C7.5867 0 0.870178 6.71573 0.870178 15C0.870178 23.2843 7.5867 30 15.8719 30Z",
        fill: "#FF0420"
      }
    ),
    /* @__PURE__ */ React17.createElement(
      "path",
      {
        d: "M11.4976 18.984C10.6035 18.984 9.87137 18.774 9.3013 18.354C8.73723 17.928 8.4552 17.316 8.4552 16.53C8.4552 16.362 8.4732 16.164 8.50921 15.924C8.60522 15.384 8.74323 14.736 8.92325 13.974C9.43331 11.91 10.7535 10.878 12.8777 10.878C13.4538 10.878 13.9758 10.974 14.4319 11.172C14.888 11.358 15.248 11.646 15.512 12.03C15.7761 12.408 15.9081 12.858 15.9081 13.38C15.9081 13.536 15.8901 13.734 15.8541 13.974C15.7401 14.64 15.608 15.294 15.446 15.924C15.182 16.95 14.7319 17.724 14.0839 18.234C13.4418 18.738 12.5777 18.984 11.4976 18.984ZM11.6596 17.364C12.0796 17.364 12.4337 17.238 12.7277 16.992C13.0277 16.746 13.2438 16.368 13.3698 15.852C13.5438 15.144 13.6758 14.532 13.7658 14.004C13.7958 13.848 13.8138 13.686 13.8138 13.518C13.8138 12.834 13.4598 12.492 12.7457 12.492C12.3257 12.492 11.9656 12.618 11.6656 12.864C11.3715 13.11 11.1615 13.488 11.0355 14.004C10.8975 14.508 10.7655 15.12 10.6275 15.852C10.5975 16.002 10.5795 16.158 10.5795 16.326C10.5734 17.022 10.9395 17.364 11.6596 17.364Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ React17.createElement(
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
import React18 from "react";
var USDC = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ React18.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React18.createElement("rect", { width: "37", height: "37", fill: "url(#pattern4)" }),
    /* @__PURE__ */ React18.createElement("defs", null, /* @__PURE__ */ React18.createElement(
      "pattern",
      {
        id: "pattern4",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ React18.createElement("use", { href: "#image0_214_308", transform: "scale(0.00552486)" })
    ), /* @__PURE__ */ React18.createElement(
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
import React19 from "react";
var USDT = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ React19.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React19.createElement("rect", { width: "37", height: "37", fill: "url(#pattern5)" }),
    /* @__PURE__ */ React19.createElement("defs", null, /* @__PURE__ */ React19.createElement(
      "pattern",
      {
        id: "pattern5",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ React19.createElement("use", { href: "#image0_214_312", transform: "scale(0.00390625)" })
    ), /* @__PURE__ */ React19.createElement(
      "image",
      {
        id: "image0_214_312",
        width: "256",
        height: "256",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAgAElEQVR4nOy9B5Ak2Xke+L2Xtlz7aTPez+7OrJnFOiwWILiED4I8kQRxoiAGJNo70FyQIkVRJo5BxpEK8GhO0okEdXG8OB15EhU8kAQJQ/gF1szM7njTMz097V11d3mT9l28l5lVWdVVbaZ9T/0buVNdlfbl+//32+9Hi1rUokeXyOX09LY/PAGBCwYHLghYzW8UBAqhUGQZhmXBsEzxeSaXRltnJ7riHeiCjpJj4EFuBvvi7YjIGhzDxOTiPAwwDHR0QbFdzOXT0DQNCpVRKBehKRqyRhl510S3oqNklKGoGs509WO2kAFTJSzkszi57zjmzCxyhTQiTEZ3pA0GXIyWFrCYzeBd+08gU8yDWS4e7zuKe1YK8+kFxCyCglFEIhqFBgmQJMybeXRFoogxCSXLRKqUF9fd396F7rYOLBpFZEwDebOE8x0DUCQZJdfmgwSTuciXyuKeyuUy9sXaIFGKTLmIvFnGmaMn0B5tEyPIx9OE5W2ui5grQ3JcTBhZ9CsxJCT1vMXcYwDKRLwEoiqEZstwv56FDUmWoRAZMiRokKGDfwYujt5EsVRET7QNuXIRGf58kSgSsSi6Yu3QqMRvFW2yhsliGsPFDKJURrumIyFraKMq5gsZLJaLUBQNnZoORVKRcgyUbQO9WhyGY2Eyn4LEKPa1daOsujiV2I+b43eRLuXx7NEzIKC4lhpDmxLF0+0HMZKZQdEuo6+rFyXbRi61iFg8ggOJfRjKzyNKJbhlAyXTQJseheW60BgRc2rCyOBoVy9MwxT3PhBpR942kLMN6FSGw+egqiMWiSBp5pAvlXAk1oUuJYYSLJSYgZnUgpin3WoUZceFaTtQZAkxPQLXdUEJH2LUze7tpRN6p3inLdqBxIWiQiXIlEKBBCJREObCUhyokgxXkqHLCiRJ6jMcu88Fs7P5LC2aZRkSkW3mENOxqGFbkuMwZrousR1bNx27NOLMRCjoZwE8CzCLEMKvo1BK04TSn1SpfCsqKx2SJHNh62hEtiOS6ihEdikhLKbqJKKoE6ZtpRRbFvejyYq4H37P/D4VSQIltDW1dji1BMAOIs70nBkp8TSigm2hXZZl23WizHWYwRxaNk3Vsu32omkoN6dHowWj/FvZUuH9BaNsp4t5UrJNOIwRwzXEKmTaDmGuK85ngxFCCLPBKGNM859cAbzVCUAHAfkzlVFDJkSWZcHcTJZkRBSFaZKCmKKRuB4lcU3/85gW+cOIrquaLBcMU8mXFDPvSpItESLZ1M1RSh1ZkvznqlxD/A3yiL/sHUItAbBDiKv6mqJAc5VIhDGpaJu4tDDeYZWNfzeTXji9kM/Y2VKJFAyDGo6tOY5DC5Yhlx3rsOk6cBxHqJqOMKUYXOZ4pgADGGOC34T6ST0hExDxdVImNvGHCpepgSAiPsNKvnCSCRVaiUTpp6OK9r1RRaeKRB2JEkujqtUWjbrdiYTck+j4ens8/gftsba8rihlTVYtTVYsnSoWpQRsJ+nCjzC1BMAWE2ci7oOIEEXY7zZfm5mLhVyWDM9O/eR0ZvFHF0p5N10ussVSIZ4s5d6Tt01hj5ZtCxZnUp8xKaXCNGASQGUKSiSPhcUCq3iMzrzF1vvMaphfEPOEgPh56U9wfU61GBOCRAgJ5gLMocw0jrlGRvzuug4II9AlGXGZawrK6XY18lyv3mZ16lGjO5pweuIJ92DHvj9xCfn/iCyhIxpDTFKEPS8zSwialmDYWmoJgC0gzjRcjdZ1HWm3jJxjIl3Knp6Yn/sfFgvZ9oVCVpnNZuTZbOb9OaPYX7QMlB0bLmFgsgSmSHAlCVC4A3Op+kz8jQWrvOAiIhiaBb8RVjmO1bmiKs6pRmo5If4Rvi7AWEWX56ekwTn907u2i5xrI18y5dlc9qV7zrTwYcRkFXFdQ0c0caY30fHxnlgb6Ym3u31tHcn93X2/axJ3ngvEqKbDKts7ylm2l6klADaFmFjNuKqsyorndS6bmE8vfnA6O/eesVTSfrAw8/zYYvIHMqUiiowzOwHl9rJMQVS+eqvixoIFW7jTKnq8t6KzBsslCZjR37fC05XjAknhiYFAIyChfSrn8q/BN1rRHOpc2aHPYg/urJQl7yfX1x4ApFwXKbeE8UzhOEtNH+d7xGUdvYl2HO3uHxiIdwwe79ontxHli1FduxhVNSFMuFDgMY0WbQ61BMAGEWcnPlUjAKJKBFklB+a4Hfly8dXJdLLr3vR4x/Dc1E/PZFOnslYZlkLgKJIINbqSLlZop54hfSJhhqusuM3XyCVqfoiC41azwop916KTE087cX3hAil0Lm6qMOpdmXm+ibRrI5edx2hy9sc1HvKLJXC4p/vjp/cf+ffdiQ7WE21LgeBvI5ruRiEJYVCvvbRofdQSAOugYCryvISIqsFxLcyVCwPzpcXHhmbGo3fGRl4ZSU7982QhR8quDZswuBLAFBWu5LnFeahMCqnvZE381lgLWO2xq9yxscO+ToOALzD434G/YYl2EOhGwR/crKEMtkRgM6DoFDA+nX3uzemRP+3U49jf0WWcHjjyq+cOHbvU1qGMuI4zFVFUEXJ0G5y7RWunlgBYA3lzzptu1PeS83i349gyYei7PjW8/+qDr/z62Pzc9y86ZZJmhlRkjq8WUxDqb8RbAWlFcyC1+n0dBUxWz+zc679qRt5gEs/R4J7CQqCZiRL+wE0fRqWq5uDw52LIWXlMzeW0O7OTf/jtK5fMA23t/+/j+4/818ePnJgxbXtEkqQF7gSlLfZfF7UEwJqJO/QkcBu1wyn1zDup3v/7u199cWpx/icmc4vH5ku5/YZjC5WXqDJkWfWYNGw6+8wfTF13BbW22Sq/XcyPFUyQh9JKmCdUIUuQ4UtIl6Fg2chbeTWZKv6j0ULmQ5cmH7gD7V3XTx089NmjBw5d74m2lTVJzvJjW8bB2qklAJahYEIFKxp35sF0MTQ/idmF+U9dnbj/mdFcKjGcTnbnbKOfqRRElyFJEYRcZh6xlqrajOodlZXB4maSpIBGVJiOK01apf7xdA63MjP7r86Nnjw90pc61bU//8T+o/+zFJG/dayzT5gHZdtuhRNXSS0BsALxlSVCZEQ0DYPJid7x6emfuDH54OXhuenzs/nMAZur9hENciRSCbt5RNbmQGtR1Q9S4zPww5aUQNIUsfHoQtIonkiODOLy2BAOjt35D6f7D95JHzr5lTNHT3yuTY/BUNTWgK6CWgKgAfGiDpVK0KIxFEolvHn/2omh1PSn3hq788zduckPlxw7QhQNtCsBbvxzPndDsfAgZNdi/7URC2td4X/rB5ISoRUQXUPJsXE7P3f27uDs2bcn77/y1PixF873H792vLvvc516dzkO1Q9htt5GI2oJAJ8Cu5Xnv6dcEznLOPZgYuHVq6ND+94YvPH8WGb+hyxNAtMVMJ2H7aiXXNPACx0k46zHS/8o0hKzaRlyfUnrcgcir/50GaaNQt/cjXd+4uKtG3jqyMnTL5587NK5Ayf+XomqkzzjsGhYrTBiHbUEgCDPscdDTMx2cG1y5LGLo4O/c33ywQ9O5lKweXFOIuLZpNzz3MBpT1rhqHXTmsbQT2by6g0peIoB4XkVCRlpx8Vrk/c+c3n6AR7ff/hP3/v4M3/1VO+hazLIMPcRSISKkGxLFrQEgCCepitRSVosZs69fvfmc1cnhn92yso/V5AYHI0Xvsi+I9D3TwVhOSwNgSHknd/OMN2jRuLVcI1AIiJ92pUBw3FwaeL+p4cmxz59srP/yy+cePx3nzp09J6kS6OOw/MT6SMvtR9RAeAxKk/gaUeUZvMLB798/877ro/d//WxbOpw3rVijuKltPLce1ZZ7f1wXgO1nvkxbRpSDpgfmmpVxa+OmuU7rERBojAJEql48EDmGAoSHOJg3rSQW5j88Gh+8flr0w9uPX/iiV872t13sy/enV5wso+0WfCICQDvVWuyijIxMJNZxMjM9I99d/jmr93Nzu1PuUYnZBmUx+6pX/gSzs7z8+Ir2W4rpNa2NMy10Xr8JUFWouc09P0v/D+FF1HJKDo28mahKzk59MrI4txfnO8/OpI/9vgvxiKRizFVf2QNuEdKAPDpwRN4uP13b376n75x79aPD85Onpgz8gcdXYLEnXvUc98HNfRLzlGX+lofugq7Blor/8ZRBbegwUupjD2rruVhYcKdtVyb434ex3YxWkgPzN29MjCYnPq/zh8++W+fPn7yv8Q0vezaNmzH2U3Dsm56JAQAZ3zu4IvrEYzNTMUvTQz/7Bvjd39lIrPQ6yoKSFvUS8/1C1VWsxYEEyxQP+lSv+Cjbl5uODUTAiuNc1AJTfyiJMR0FBwb13Mzj48Ppn57MjP/0fTR1JeO9x/4U44pqRJJpBg/ChrcnhUAwaosUwmqomA2k2q/Onrvk9++c+Ol2wtTP1aQmcaiKsDBIikLitTWzLThVb6l8m8eBS6YRhrAaon5wkOcg8p8ciBr2QOvjwx+cmh64vueP3b69Cunn7pwtLv/8xzOMCIrXkryHn6ze1YAUL/SjquFQzMTB752+52fvzB851cWbYMionhIOv6yEKwsDzO3Wqv85hB1Q8yKjUusImFNgq/zsgorxjBllXu+fO/qv7i3MFt472NP/9KLB09+jluDHMhkLwv2PScAPNudQFdVDsjR9c6DwVdeu3v9E0PpuU+VFQonqojqPLFyN3iz9aG8Fm0PrWelX/VcQaAmErhUQdFxcSc9E5u/kP7jyempgWePnf7i+UPHL1u2be3VabCnBABnWo7AwwEsR9PzbV++c/lfvzZ4/aeSZj5mqxRQFZ7H42fqVY9jYaw8gchbW63Xoq2njRIAjfwGYb9NQAIAlecPEIJZ08A3Ru78q+lC+jMmxW+dGTj8v3VoXqRgr2kDe0IAiMIxKgnQzIJZxtD06Ik/f+ubv3MzNf0jOQ42Gaj8vnawHOhG2JPfEgB7gypJf6S23gAVsFQvUiC+lznIqopFy5IvzY3vW3g993vfc/rJvo89/fK/2RfvcjyIsr0jBvaAAPCYOk44UoyMv7v8xqsX7t755aF08mOOJkPStZAt2Zilg0kg/AGEeAg9DJU8gK1QR1u0OcTqHIek3nHbKPeAAIqqCLSikUJKWrz6xq9PpBc6Pnr+pc8e3394pFgu7ZlKz10sADy1XYeKIitjNDl96Gs3L/3GlwevvDBnl89qiQioWPX9fVd4XyLs48Neewkl3jEt5t971Kh4qz6XQ2wKhSvrmC+Z+Nrwzf9xJpfu++iTz//m2cPHr7ZrMV5niOIuFwS7VwD4WV/cnrv44Nazf3vl9X95ZXz0hwoqhRKPwg28fKtsyFZN9w2tCi3mf2QpEAq86pBGFLiyixvJiR9OvZ7t/P5i8WvOKff/6I22zyZUXSweu9VpvCsFQCWjzzTxjYmL7/vLC9/6rZHMwnvtqAKqSHUZOauT0KxBBlBr9X80qGkVYqXa0IMqQ1THRLnw6p9d/Oard1PTp/7B0y//6gt9p5JlmHCZC0J3Hzvtqjv2wDRdkdJJGE589eqFD37r3o1/OmsVnrejKphMa+K8LWrRRk4+VyZgEQVp08Ibd2992s6Xo/bz5r8+0X/gLk84243YD7tCAATDyrvQmlTC3YWZw9+9d+OPvn3vxgeyxIGrq3733G2+0RbtXSI+ejP3K2m8mMzGW1PDP5p8Ld/5Q+ff/c9P9u6/zCNRfCPO7ske3DUagOTDUE9lFo59/p3v/MXbM6PvKisEUAPmZ7Xx/Ba1aCOJhfAfeC6JLqMo2biVnvlg6btfi7x66txvfuiZF75BCLHcXTQPd4EAYNAVhbe8xoXRey988dqb/+7G3OS7TEUSAJEIDXSL+Vu0VcRFgaTIAiFqrJh95YuDVz5nU1x435lnfrYv1r7oGrujndnOEgCV1jjVWntN1YQz5ruD19/3+Rtv/d697Py7XJ07+2S/ZSXbkxlaLdoZFO6PWNNWPVDyJQo3pmLSKB35mxuXjhSLZfrquXf9Qk+sbUqTfPbawaCkO6pkXfSk9zrRiwGOqRos18FX71z9vr+88uYf3E/Pv8vlq74sC2dgJVTjtppHtmibiEeZOUqxriLNLPz93Ss//NdXX/+j2UK633AdgT+4k5OGdowACBJwRAUfeMGexptr4lu3r37kL6+++fv3i6nzLKaDyLKf/dcK07do82m54rAg4kSCRT6qIqMB33lw++NfuPzGH42lksf4QlWyy7CZgyZdFreVdpwPgA83r+QrWWV859bVD//1tYu/P2nnHxNVfJSELISW7d+i7aN6k4D5oKRMU1BgNr57//YPGpYVUV94788e6tr3gEewJFGe7gaAxpVsVn4WZ5u02J0jAHzG1mUFjuPgG3euffSLt9/+3Ukr9xjH4ucYffXJOszPBKzP725RizaDwpWFSxcdrzuMKDRXZeSJjTenhj6kXpH+8L979j0/fbC9Z4YLAN6/gBJUtAHXQy6EKnpIbr21sHMEAIHo62Y6Nr529cKHvnDr0n+cdApHGM/uo5V8rBa1aIdSFTaeo0G7mowisfH6g8GPG2XjLz727EufPNbVP2VYDjRJgeKHtcuuBYu46I/EVpu1vqEk7wT3BJeAMUWDyRx8Y/Dah740eOX3Z4z8ERJThZe12aiIMuCtvtkWPbK0mtRwxtUAv4cEURXkHZMnDL0SiUb+RDun/+TB9p5pyU9nJ4Hj20cwrilI2SKSo/L2KwGUSrBsB6/dufKBv7n+1u+NGZknOPNzXPdWg80W7SaqWAa+jc9Th/OU4dvDdz4mu/Q/ffipF35qf3vXlC7Joskp3Wa9VpbJFlvPdc/LnSMl18YbD2698oXrFz87WUif5d5UXnzBQjDPZDsMpBa1aAUKnNKsMj+XQhbLmoqia+FbD259zCbsjz/5/Pv/saRL6YJd9nbZRie2bOtbpwEIBcdx4RYNmMwGoVTE8y+N3nvhb25c/L2RUvoZVoPe41ELoqtFO5FIGEigCQVhQuheEdF3Rwe/v1OPfe7D557/FVelo8R1ESHb18rc63S5RRujVCRNcKaH34n35vTo439z5Y0/uLc4+7zDhRFf+VHblCPo9tKiFu04qqj8zeeniFbxNoSaghx18dXBK5/41uDVn+GH8n4VvHZguxIFPcicrdpCtdeKJGMsnTz6Nzfe+uMb8xPv5vBd8KG661Mu61d/IVVZq+y3RTuAfLDBYM42U+f5XBVdpVUZSWLgC3cufeDy8N2XuAnOo1/+KlfJbt2KDdsRPuePqCkakoXsvr9++zt/fmli+L2GrnJnwJp1/Bb/t2jbiVR7RmKl/oaiUywBr2WZs4vPf/n6xX/71t1b52N6BDpRK0lBtKb79GZugOxuIRtRuFAkDQXV6Pru3ZufuzQ29FKZg3goypo6tLaQelq0Ei3XS3Cj6GHPTYkEomp4kE2978uDV/+XAwP7f/LZgZOTrutB2PF/Zd6ebAucg3KcRDf9IqjE7ClMWPjmncsvfWXw8kfScEC1CFzSuBFni1q0Z0miMCISbixOfeRvr7z1WZnQnzrRvb/ATeOSbYrW9Vwr2OwEYVmDsqkXCJyk3M/J+66+8eD641+5/NYvz5oFiQjIbm4/bZwTpBI2DH23FatBi3YWhd91ozmx3cQ8Rxgsx8GFkcF/2BWJZwde3vfLGlDgGAO8KM71U4U3k+RsOb1pp+f2kK5HsGAWQFwgVyqc+vyFb/+vI5mFVx0R6/d7sG7gMwYWU9hx2IL3fnSJhcLIO43EPNUUpIomvn732s+0tbd94YNPPv+FuKSLsvi1mMUPS7LlmJt3dsbgMBWyTDGxMIev37j8iRtzEx81eZsuRQpwljaUGvF5I+Zvdf55NGgt73mr5kRQSSj8h8TDEpgrFfDVq5d+6nhX373njjw+qKAKe49NdHjL3CGxWcTzojlIYgw67owOv+/rty9/PKcSIfUQlFOSFTyna6RGOAH1AqBVRfjo0HLvN6wZriKnZ8OoEjIMricR8IrXiULqBz5/8VuL3bH2f/FUz5GZomOJByDu5mkC8qaoGRxPnVDIkizk2KXhW+f+/vo7/yoL5yWmaaJuWgz+Nif3tDSAFgW0nQAzIvdFkWA7DNenxz79xRtvptuei/5LWVGKjsygFc1NM2NlXnu/0cQlXMk2EJUVDM+M9P3djUu/NppPfZAGoB4b/xxrolYVYYuwjU7hQK2vtCAL6gkUSbQof+3ujZ8/1tk38tITz/yhKikgxPZa1W1CWFDmDQ02mniOf9opI5cvSF+5cvF33p4Y/keW35cffqyzRS3aMRTCmdkKoUD8FvRwXR/cyu9QzJOEIgrmCiXpS1ff+lhfZ/d/PX/4zLSB8qapJ5tiAnMM/4is4tro0Lm3R++9WuIBQA6hvBWMX98Odq2Ht2oOHjlqlGa+mSTSgis+sDC0HQTyFXcK3k8ln/v6zXf+WbKwSHnXaw5862zwBpEJuGET3tNjRNsuAA/mpo69NnTjl6aN3D4pHhHxTBKCQtpUCgTAGt8kCaVg7kQAxxatnXZms5gmiW+BJsKThHSp683xoc/sv9Y9+4Ezz/yhrKqGRja+/ZhsufYGnYrjp7twXQcl28I3bl3+zN3s/KfciEq5l3NL6SHEeHVvDjxKWpVGu5zWwvg76XX7tUWicnCxUNJev3vzZ/vjHV947sy5WwrjmIIb67OjCNSQdWwC1shDOkTJNOjVsaGfvjI5+otZMMpUL9Nwy0TAMsy/nFwQoUFR1BF80dIA9gI1EwL1K2lgOa7Tglw3BQls/B6opmI0t9D1nbvXfixbyOm8NsB2HAGauxEbJ3kjnpXX9/M8f97FZ3hx7pWv3njn3y9YJZlwx98GpvluFgkBxpiPOuwbACFhEJgDLPT/6ne1fzf6LjiuGv1tvk/j41Y+98Yct/PvafnjwnuRZQP7uwFKnigUJYu130pO/MLrg9eHPvDYs//ZZa5tOfaGmaiyTtZXC8Dj/Xm7DMOxUbQs6Z3x+6/cyyUVWyIVNN+dQo0Sgry0YSaSllzHgVeRFbQb8yYsZd5zuNyTwbvEMi4gqPjMiJetzffhpgP/ziVuk+Pq94E4j/ed6xVFMeJBS/PjiAca3fjc3lIl9gmO8xMsXMKWOe4hnmU997Sq42rvqfZZ1ji+/ntjzGNyifuk6O7U5kQKs65ioWQmvnPv+mcf6z1442hP/yXTtsSYOMxdtxiQ6ToxAfnRUS0KwzHx9v3bn3zt7vVfzUoOiOLDHO0CU5qv9rILqFSFwr2wbjU26w0w9T00zBcK1DeZXH81Iv53oX2EYRkc5/p7reK4ihLoTerqPlj5ONLouOo+le/W+ixVxfQhj1vFs6xrfEPH+VKeSYBNGEpwYVXOsnuowjYSha3JGMule7596/L39LzwPVcUVbNN00CHHlm3U3DdgIBMwJ0pmE7Pk4vDg+9OlvLtblSBTOmWFDOshparBhTFSJaNGFHwnnNP4/GBw9AtgDjhQkwamkCufxQJtSRldfswX1Gl1WuArfK4sKK8UcehTt9Zz7Os5biHeZb13xPXPImsYKqQwpduXOR2NIgiV2P9lXe/c4n4AKNccEoygWk7uDz54GfOzp8eeuLAkb/iD8ET7Ry2voJh2V6HV5EPIG9ykMxn8ObwrR+7MvXg+11VEXDeO4X5sWw1IJ8uLmA5iMganj96Bh/pexKJ6nrXol1GzM/y5O/vplvApaHbeLA4C4nD35NqHQh2eDYoCbqEMC82aMkMU6XCqa8OXv1oT6zty6d7+ss2j7qtVwN42M66XD47nIEow/hi8tW3J4f/Tco1j3KEAVLVFneEM735PXjlQFTYmFwaeirR5iIktGirSLYcSG6AzOtNRr/+bHeYA8T/H2NwqQRDdXF7euz9Q1MT3/v4vv1f5M9krjOML+v04awA4rdCWjTKeGf0/s/fW5g7bUdUYZbtNMDO5YWQpzby+eGyWkW1pQHsLiIVQ8AvteXQ86xqTATTYPdVgHrReqZSFB37zKXRwV8/1ds/fXr/oSu8fX7YWForyQZ7OBOAqyi6pGB0burpK6NDJ3KuCSJplVEmZBewUKDns1rrkKCl/+9GCpi8GuFzfVt691HYuUeCVmO8hkCRcGdu4pU3R+/+4kD/wD/pVHURhn9oASA9RJaekK+UYM4qqhdGBn97PJ18UooropghCJ67QetjDgriH9eqvW9Ri1ZHjfIUxHpFgRx18M7Mg3NPzZ48+eKB40OGaVV6bayVZOkhEiIk4eEnuDU19uTV2bEnCtQBkdQly2bQ2mu3hWBa1KKdSMKs5rwXUTCSmXv24tCt3zjZNfCpzmgbC+IiayW5SNYgObzsCmiKDMu2I5dH7v3GRCmzn6OZeL83PqxZW6+wcGgJiBa1aHliPv9BllEum/RecvLs6OJs/7GO/mnmg+6ulWRbXkMwhLf3shzQsoXxzHzvndnxD2RdU1EietNDlmPslnbQohatncQ6q6qYyKZOXRi+9ZtPH3/s52JQywaz1nwumUmrFwCiVhkSSuViz1u3b/zSXCFDqCo/dDVVi/Fb1KLVU9VVzSApMnLlcvTazNiP3lmY+I0nuw6Nl+zymltoymQteQAM0KUI7pan331x5M4vcNBCWYk8dPOClurfohatgUiQmO6D6WocSDSjvXn72qd7n47/geM4ubWmBstmsbjqnRVJQpGYuDwyODBjFgSGGViLiVvUom0hVUauUFQvj9771ZdPPfn5x7sPXjcsY01agBzVYqvakZ+zTdEwNDu2/8LwnXdneUUWT/sNpVa2qEUt2jriLcddmWImn47eHB1612Pd+28oisKsNaT3y5K0msRXBo5Oym2PO9MTH5lMpz5pqxz+i7QSZlrUou0gP8ROVQXFkkPfvn/7d148fXbiUMeBr1qssGqtnMq8FHbFzUuNHZ2bjr81dOu8SdwI8Xv516fZui6G4fEAACAASURBVC2NoEUt2nzyOwvxnBybAA/Syb5rM6OnePNdDbLAZlhp4yS3BXX7y5ACinkYuDEz8qN3p8d+xNGlhmAfrJVB26IWbRkFCFOuQpE2TLxx98bA+YET2uH2XqO8ypZ/8moYVoKEvFHErfmJ53Nw+hn1SivrQ3+kle7bohZtMTFAkmDJDu5Pj//ISHLqW/vbur8Wl3VRrbsSyQXLWHEnqki4Oz76sVuTY6/wij8mkaZx/1ZEoEUt2mKigCNTpIrlx29NDL94/uDJr7XrKlbmbEDO2eVld+DNPR2niHszkz82l8ucY1FZdP5pUYtatDNIZNNKFK4q4/bk2CtjyZmz+w613yxjZawAuUfrbPojdzPwYqG7cyP6vZmJdoPXDVDSNLd/OWK7oCNvy3/Rot1KhANxSMDo4txHbyXHHxw7dPwzZVZeETNQXm41l0TiLzA0OXZ+dGG2n7f3Eqdje7O/X8t8adFupAA4iG9518Lt5ETv86VFSaeyY1jWshNbHjGSzX+UJOhUidybn/y5+WL2XVJ7HAKQ+SES/8mu6MhbhZxsCYO9Rh76SwAXvueejiNaUQJHlXFvfrprZGri2GN9h4Zcy162TFiG3cxOIALZ98H81KGhdPJZixIBrx7oCzuz59qjQa2xfxjy4cX34LAFar5A4dIUjKeSL9+fnvjJ9514+tdsOFgO+Fc+Exto+IPKKAxi46ujFwYmc2lCdHXXdstqCgPNatd6FoYEa1HtUAVAr8FE241QW/6LXU6A7gbI8Kbkdxc2HVufTCdfnM0vagk9avBGIs1IXihnlv7EmID7LjumNjQ9+d/PG4VD4ICf3o/i/7tlBWoKA72Mnr/TTYBtG3tfCOwe5idrwpzYLZDh9RSeD6JUWNM4Urc6NDHSf/bQidFcqdjUZycXjMbVgI7qYiazoM5lMz9iE0RliVbw/naTCtq05DhAjwzNZcJq99+JT7jdrCdkgMv8prDbfDMrkNc9iFRfpC8Jms3d3VievoQXeTs0RUEylz1+f3ri4ycOHf0PTCKsmdCWFbYUFpznF6uQpQczUx9IlQsRKlG/9VJwjd01TPVxjnBIMvwkPL25Ivl36DOG72o9K3HYnFuNT7eyD+d9SncFp0iS7PeoqEV7Xs6U3W0ZLkt4kXg5AQW72D+0OPPL36dJ/2VfrDtpOVbDxUPmgJ61J+Tc4cApls4NzUz9fs4sxyRNqqkx3vVOKL+QItT+Fw4FDMqQD2EYOnVCohGGYaAyBt812qf+u3DNBF3m3I2Og6+eSh5C26b2XwjecSBoOONYpHovzjqfZaV98JDjG3xflJgolMGG9dLd2cR8n5aYu5RgqpDWJ+ZmuvYNHEs6Lmu4YMiuutTaURUFi4sLnfeTUwfKjgUiR73mjgG/7HJXqtcsojpxmSyhLBHcWZhEJBbzewM6lYaW3tR2a6zJYBUhLLSqBI6yJUYnrXMvVesl688D0vg7BJqL46KdKjjT2Yc+JeZfs/bFLtcLsX6f5ShAdRbjRam46yIcDKemMVfMwVYUDw6uRgSE9asNHCcsPa7ZOAkNRZYxkZvHol3iLXCrHQobjMluA6dtdr8VgU08sJCkUaTDU+PHz3YODPLu3d40qX3xsmbXfkFFvz+K2Vw6PlvKFWyKdolUOwHtSu9vE6oMnkxRBsN3bl3DtXt3IDtMdAiuTu3qekSIZwwx0Yra6/zrEQUTrafcpZxcETfVNYuIjrnwGlzWHceYxwikwjXeBOZtv41SCcfiXfgn7/0IBvbF/LtiS9e4jfRkVqCoILrt/v3lN3Fh6DbQHoVDqi3Am41TzbNUxikkKJaMU/VzME6Nxpf5x5F66cL/kRhKroP5Qh6yUu0L2IhY3VV3DRGyRPgHuQ5QFeTKxr77s5O/VDhj3dQIHTNsc4llKxOjNkSgSjIMM4874w/68sRWRPZf3WTaa3Fo3tDEYi6mU4uYskzRh9arl652pGUhnzIj9csParsL+U0RqeiVv3RS+WwgfltyXIOljYge/kQgwJSLeTiJEvJmuXKuevav8MEqNIGVqLLK+NmfBlyMp+ZwZ3IUrBSHQyX4orCiJzUfJ0+YVYh4e1N3g8eJCx9+bomCarqwiZdLhtmNzj9BDR/JfxIeDmQumUzNv5jKZ/ef7u4fKzTA/5SL4WpA4jFCpph//N70+D8sMDvCBUDF+79ZD7IDSEwyTQZVqb+mUn/6hZ89ULHCDpE6QeDvJzKzBBM0Hjg30C7qzxV4qkLXCyQw4x1MJQeIqgIKqnKkv7o1VOv9yMb6czhEH2VRXkJ4SDgRgRuPCiYLTIVgegVjxcLP0mScEIxTo1snvF/jasa8Ok7Mb6kN3imHBPe0/MzdjcwfzMr6eycIPZBEkSmXSoMTI8rBWJv42q4TAvK+aKLyh0Il5G0D9/KZp+YL2e/jL1siPhOEUij3ahaat2AFK39VLQ05wCvfLf1YOyYs9CZWak668rl8FFjeG44n4RDimw+hQ5vN8QaoTesh5gtLh1I4hAqthPqM3PgWSM0/S9iNVKdxMyGwpnEKvg/m6h51/zXSWmqMTMJAJQklx05MzM9+vHTMvCGrSqrEfXqhI6lCJAQbZ/aopCCVz5KCZYH54Z56b/BeJq+zLK10mN0xG/Pi2qQuUEWWYf5GkG3rJRKMke9QCjSPHTVWnmGxZKz2CpEG3bbckJu6wtySBMO2IpOL8/9s1ig+xxePTiWCuKyKTezDEUSDjatiuXIxOptePOkwb0msaFsi8ePREQQ7lwKVmtZM+K2mevdoi3Ye8bRgmzAslHJkvpxzZUIRozIi/gbhA2DVYiCXUCQLuU9MLSZ/zSFMnKARtQpRtolI1cFXswI08TMsR41M6rVQOEC6V6hRTsNuoSX3yzxNjTu4M3bZWizmOnlxn+m4sEOdhOUFs5oK3CERpMqFA8lCLuaI0I3n4Hk00ih2B7G18/qy9LAmAnk4ubPjaW89DxMlwkXXUabTC7+dM0pJVYt+y3aqT0kljvojNoqMZSBZylvpUlEcyFNjW8y/Am2kob3SeVjgC1i/IKi/7WaXrnc2btgFd8q5QhRoNHtBq6k4AymBQYCp1MLJXLl4kuN5cu3e8VVA+US0S3xQqYR7pRSmcmlS5JDCxGsYQvaimN9o2oikG9Ygt6ABVWL7G/gIKzH/hs2Bh+0iu+SmNi8Heq8td0yiMF0HyVwa2VKxZNgOSmY190e2/XipTCQQx306Vch92JW8GDMLFVHsHQdgXRx6I2gjTkPY6uRIKNK1Ucl+pEmBTCVVd5mEE7ba3pDhnIA6WlMW3mYWP+xB4nzLHYGZchH5UkkpmzZKplkZbdklQZIJwWI+++PJfO5Vi5f+0rrssj3h+Q/n82+QGyucbhesTHWTVMTvGVsWTNWLr7Pl74h4MXhGSDW3fQNuG8vwFVmRwVcnhrzK6+YCgDUIbTU/2frm4kZkSO4a8vNG8mYJC8V8G38PuqLC9R2BsgsSLPHIFItsvpCDLXn4Yns3hSL4d6OD5E0meEh4iiuuA1EnYPuwdrYedmi2+q9M/vVDmArLIu20QsfbQox42ajcqZ/MpVVe6TuQaIPleFXA1IQDkzmwCEO6mHfTxTy4CbBcqG+39f+r3i+t25o/I1vlc1YWfMIarv7BVaUQszZiBhKU+C53sWaXeAjeChSWjVwFw3MmnDdSs0+TZ9jKxWa5527yCncfhZCbKPEyIxdzmYF8qajzhL/g8eVsqSA+uK6LollWuTBgVGmKh7HRYajNJLLO+90oG3uttBbMPbYN91lTF9Hk2svdfyOtY7vGes+SX8FbRUEmfIH/dNYoDloUf2JSPwoQJTJkKsG2bKRK+aizwqqwW5I/GNbXiGS1x23ECspQO/sZlhreLCiOIbX7B595mvByFW+ruo+VgxD+fTB/FSWV2gDv0JBBEvbsMVRZvMH82qiMxrAwfNhz7UW/ACFeheRiIdudNkpP2BKFFXQH5is/CEXRKCNdKlSr35aJtOyWMQpuX3pILWBTnjN0I+Hz1zjbQoU1lRAcY8KOI6YDoriA49RoOGyDhMBKJMqkLAZm2iCWLRrHBt6iQGusrjqs8izhdLJwZS8alAGvh9YUUXhUiAtdKiFTKiJbLpZ5pwA7yAMomgYc2UWuVPhoyTBeqrzMBoJ8N9JmpDHUnK/BwCxZ/Di5wijzxpV/5oKX+QzCM7O4UyYoqhFYAswHHAG4tiZSsiQK3XDRrhNobrVekQX/JxuVtdOYuEakgyJhUbQZDHaRd6NHxaPMOZuRag2Jh6niRZiYcHBQMJ5dKlXBOnnBTg1EQOiZlgwtq91nc2kviRKBFw7TMVG0DLngGCiWPTwJuWybIuSXKxf/p2K59CQhdeG/tYZodhCRZhNprRTSjYm/mrlinJjHqL4qzFwXro+9xj97G/MAVZnowyaarfBNkSQoVIYmqdCoDJlwOAIJmqxCpQpUWYFCCRRIUPl+VIbCvyMU++NtGEh0VfPWK8J6Y8Jj9cQqxT8EMSh4z6mn0B3rQFEGSrYJjjtvwYYNF6Zrc1x6sfGkE8t2YTEbhmuJ3wyb7+PCYV5OuuV/FmFn4mWkckHHYb28LcBvXN3zkbrPDz8iu3nmV6milYHBoQxZsxwplcpwLK8GSOZqf9R1uGpgFTjKDF2qk+3Gx69dHddGrP4kwR+csflk5VYTX4F5xxXbX9nBIIMITAVF5n4VBZJEoSgSFEmGrmmI6RHxb1TXEI9EEYtEkdATiMeiiOgaYloEUTUKXdIQkVXIkDk6MxSRql0VZhEACR+UkzYAhdiMseTXtoQ5RfDSk8/j/JPPw/TvwRW/MSEEuCgo8RXGKvNSVGFaFstFFLn6WSwgWyigWCqjbBooGkUUzBLKhgnLNkVoynEYbNsR2WsOs4SQEE/IZzKfmzxHRfJWNEZ9mDpSvU+golht0JPvdiIV7ZD79zLloktthj4lKp5LPnLgkIABH5qZsIuW6Q1uiHYdTDKrnRCVqP8ynvVw/DpwqolJ5HoM72m4/irOAIURsWlQBX6iSgk0IqNTT6CnvR3diTZ0tXWgLRZDR6wN7fE2xCIRqKoKhSqi5aq/1vmod1VGCu6BT3sDBtKsCNu2wUEdy7aBUrmAuEvwdOdBxJW4b1lvzHRv5gQMOx05duJgahJJIw85FhPPxJvIcKGnQkUUOuJSBJBcgRVI4qTiUBX4fuJ8LlzesoqZsCwTZcNCtphFJp9DOp/HQjaN+XQK89k0UsUsSlxz8IWMwTzhYFMmuto5wX1zbEIOAeZrsFWkxqVsvBpIOw9/cGcKgMDBvRrdhAkfH/FHnSFnlHrLZrk9psZERyC5I9EmstRKlilxtY3bars9DNowzLRcWEqk2HnLBnVdH2KOCTRcyryTcbkYVXS0RWPoiCfQ09aBvq5u9HR0oCfagU7ahpgcQURTEFGoUOMVweie+uzwfAu+Opol5Ao8LbO68c4thXJJZGvxNE2+lS2+twmT2XAY89Rl5qKUz+NwtAO9H/gHONQb955tswfUJ0kIAAdfu/AdXLh3E0pXHESWoIKKSJLECFTCn19FRFWhqzrimo6oFkEiEkMiEhWaTzwaEdpPTNORUBOQVQ4x1g+3jzM5HycHhmGjaJrIW2Vk3DzmjZwQCrOpJOYyKaQLOeQKBRTKZQ/miqMWU8fL9fSbWBIS+BpIdTVo0By0UZr7bih5X8m8ZUEXb981xMelaBkfL5jlYYfg1/k+cs4sCXFXtE2JS1ZQeVcrPh4GHwvh66FmPQgEQ5CQQwIb2rYhOS4k04VkOUgoOva1daC/swvdbV0Y6O5GT1s32mPtiMfiiESiiJAoNP8lcPU4AxsLZhrZTAbpXA7ZfB65Uh6lchGFUgnlsiFUX87chmN5tjO3ly1LqL82/8xXN24Xu061EqfyAinKpRKkNhcF7rsJyF/yhK8h3CaqLpKzUtbfslEffzw5g87l0xhOTgNmDC6l3vgxz9/BbXbh5yCS6C7NzR/+ryYrAm6e/801Bv43N4ciuoqoHhNmUUyPIhFLCI2pI9EutoPowCn/fZUPcAFUFlpQrphHtpBGOp/FbCqFZCqFycUk72bF7Vw4MhFw77YswZGlqipLqj6Fqsmwsma4k4isYvUPZ4oGz+1SCQXTjBbKpbOOzxMyt9MYY0rJNiWLOSBEqUnv3I1Uw/uh6DARKzwqDjvuCGG2A4kQtEUi6O3sxP6uHgy0deNgtBt98Q70dnSiK55AO41CESsgkLEKWEilMZIaxkI+i4VyFhmriLTBwyx55I0icga3cbnX1YTteB1aLZ+piUR8+5UIGDZxbwoB4T0aiOTXYZAq+G0wYfn3KgGJchVbql0BmlgCFSGwQe9TqJ4RBVIiCqc95tnkoc6hwlfAwBFpPTks/uW+EgPMZiLhjPkREep3oBbaAyHQFRlRTUNc1dGuR9GmR9GuxdAux9CjJdCdaMe+9g70tnfgaNch6F1HxP0UYGOxmMV0KoWZ3CJmyilMZpKYTi9gKrUIXt5u8CiLRCHJkoDKYmGwm1244q10yzWCyxf8jtAATBQNY9F2vJcmG7yHAiPUZg6ptBFeYbLs9ABJbRMIT/cTCNSWA7dsgZoWEpqO/vZu9Cba0d/Vg/3dfdjf04eBvgH0IwFVTCy+qucxml3EQvY+0rk0FjNpzGezYuXhqmiqmOMD6tnwXA3ldRScwXlFpSQJ0EzedwACd5FUUYLr7W0SbqdRQeGusb9dv4ORqNMIpXNWwmP1qxVbWUCsYVAropQnlfB74M/rUFRRo2suX4VUDz9yuHsQ9dNubW7iuAymYyGXN5F0MpB4bwaH8QpVYYrFFA1dsTZ0JbiPhftaOtDZ3oV2YY51oT3RjmMHTuBpnBDjOIMSphdnMDk3henUHKYW5jGXyWAuu4hUNg9HoYCugapytey5bsz2BPJVqHcAf86yY4LnAWia7gmA/VIUizBkg7nUCUEGN6qYCl7k7uigSsQEc10btmWB2i4SVEdfZy/2t7XhSEcfzg4cxcn9h3Ao1iM867wtWLKcxXBuHBPlBdFZZiI5i5nUApKZFLLFIkzbFswtsOa5WsVXZE33nU+sEvtGpZa+OoBBuLAm0yeguokXdGIKJqXfp2SNI1B3iXXM5/B7D7QTHgnxOLo2d6T++sSvhqwPLwdw52KMJL/RBxegiueSEX4Y4qlsJRdYcHIgizmweUfkUSiSgrjOTbV29HV04WBPLw539mNA60Zfog3PdB3Fq13HhHk2aaZxf2oCg7PjGFqYwkR2AdP5LHLFMmweWFAUELlq/m52QtVWUVju8+EVHYIIIZoSFY8qdzgyZux8vuTYJscHWo5Y7eK146jixXY9m56ZFlQG9Kg6Bro7cXTfQTx57AzOHT2BfpIQKj2fHEm7gLnMAoZnRjE4PoL7s9OYK2RQ4s4oymBRiGIpV6Fgquqp1b4KH1haNKR5oMkYrTq/v5JbUBEXy553K/r1k0bXXmUWH/NsgZqGq55ytvRot/J19YrMj8cHQoO53ribDDC4k3C+hNHkDK4O3kYUEjr0GI717cepg4dwZuAYetu7ENfieO7oObxw9BzmYeDmzH1cHbqN4ZkJTGdSyBjct1ACU2XRVqty32R3V8WG+zpyDVKYorZFbSH24Mi800vZtA6ZjttZFdkNF6h15dZvCTGvqIlYLiIuExDIJ7oGcP7oKbx45hyOxXoRJZKIXy/Cws38LK6P3se1+4OYnJ9F1izCFB53HzKJ+lls1MNHkGil502w5lUQMRqFZuoZcy1AnPUlxIFv06tWq230uCWltqw+RcQXfav0F3F4uZpwa6OKyAbMxoJxE858v3eg39BaCHrKwBtfcscph77KuTZmymncH8vgtfE7iKtR9HZ04fEjx/D0icfwePt+9JMIjvQ/gQ/2P46p8gIujw7h7fuDuDU9ghmrKEw6SFwjoJuTSroJFHbwhlOYKmPr51JwLZ87n23XTwRizNVNy/zfbdd5ngVveBdqP3wy8IaesuUiBooz/Yfw8tln8NzAaRyIJNAj62LezDEbl8bu4M17N3BnbhyzpSJSVgllHm7jOIiKJNpK8wkrqE51JXUrfbUBxdLSYeYzasUMIMTH82NLPMz1jNF0Vfe/onVSOFhRt6PufjUaSGUlWsV+XikxrZpKYccI6pxQfqoxn+6uP4Y8NZmj3+YcBwtmDtPJAkZSs7h0+xqOd/Th3SfP4t2nzuGQFENc70Hv6Q6cP3QG1xbH8M1b7+DG2DDSpikWAvjgOLuBSKiEfekixMRU5VmXluMQxxXeGy4AIFu29aTtOtJyPfFXE3p4WAqbFms9f2V+2A6UsoOT7T343ifP4+XjZ3GovR9dfuvKeTC8MX0H37rxDganxpDMZ5C1DE/l0xTIsi480ZXM+vowSjAOYc98neRtpBnVhOVCnvL6ta6eMZoyCmmyP0IMsgyRRq22lqGQg78pbaS9XCsI69exFe618s6IEOIyb37hOmCOi7RliCSjsdQibs9N4ttD1/Des8/ixWNP4TBR0B3txMFoJ851H8Tlifv40pULGJybREl24GqycObuZJyA8OqPGplZ/UZoqVxbcmxiMcfzAfD6Dctx5hzmHsEKCsBmysGHiSx404N7NmyotosnDx3FDzz9Et537BwG4HU+4d75SVbCF66+jq8PXsPt+WmUmANZV0FisRqZR1ZgoGaAnGtB1dmUObRJWtuqQUE35aHWftKaV1BJ5vLbhesqWERD2XVxv5zF+P0UxtMLGJmbxg8+9QrORDrQDuDJSDcOnepGb1s3vnTjAr577yYyhgWiq7tCNV7+VXkmgO3wiJ/rawBgxHJs6oGDkm15xIf2K3CVxrKQsIGn+o/ik698EO/pOYmYz/jcpTltF/GFW2/iv73xTUwbBbgJHYrfFmmt4LI7FsSiWQfSul2WL/ZZSsuDgm4frUrgBk4T6jlTPTRIV0Qb5JgOqC7up5JYvPgaiOXgh559H45HO8U85ILg/X0n0JPoFKd64/5NZE0Lrt9mvNkY1l9+u6gZLxFfI3BcYQKIWxTWDU9UcQN41w2uz14tPYz6L2rkDQNHunrwiRfej1d7TqItpDjyl355ehh//c7rGHfycOOaZ9P5tB6VLlBQNwmifm03Iqj5TQQruXevrEb9XwkabGVQ0K2lZZDXau+bVG+e+bHwwIEqnKgcHz+mYZE4+NrVi3jt7jWR90F8ZVkH8Gy0Cz/84vfi2SMnoBq2yElodFkWsr0b9ejbSiLL8ZIfU2asCiopsjgdzy0VCrtsH6362syz+3mCyJPHTuO5g2dEWi5/Dsn30vMCktmFJGazKdiqJOz91TArq/OyN3vh20chnWkVz7McE+80Bl+JVitwa5yOFcdiCE2ZJ1QpnmmQzGUxnuSpQ643qp5DRex5Nt6Pl06cQ08kwWNoTecFabDtJKosAv7/gqegrsCeYCRQALZ7cq/m+hWHoeWgP9GBMwOHkWig+PA4f0TVRI29KPJxm7c5CyrydnKeQyNy/cw8NFjVw7TcqrnbgDA3TOviYWPHhSrLiGiaKN3yeb+SfMXNyVNdAzja0y/mkIfvUHsDgTgOb6vVVDaTlhQ9gfgmgIdVgWAZqSZqbN/NBlTNxFqB/KJvWfKAMiphj9CBPOx3YuAwnjx8DFGLACUTcFYh3pog2rYooF2cJRd4y20GWrKglE2cGjiAJw6fRNQvza6J8gLQBJ6DXk3O2iWP30hbqZh8/t+UMp6+7nWeZ7XK5ZZSwLirCTcG/h1ux6VKeUxnFmDW/IiKUXOu8yD+8Xs+hJcPnELCImBlC67tihJbN5TfXrluZXlZPiS6IoR3oxeyCfZhpZdd6KS7Fdq60fisF4I+jLUQhMEcvgiYFuKGi3NdA/jEyx/Ae48+Iez+8NWJf+xsIYPZzIJICBMds0Xn7Oo1Gi0WmwG7vn7yTSFaXeBkMZmp5GGHu6zq+d1CqjD/KsNpYn8e2lFlLBZzuDU2hPHjT6JN6/TUHIGj54mAOCF4rvMoyPd8BL2DV/Da3euYyiwCiiwKQTiIhMj2C5lA4Qy/jX8FCK6wYUS2fFF6KJftisRC40NDn9k6TTPqJ3MRh8HhYKamjW49gpfPPoH3n3kW7zl4Bp0i1Vg4yMTCEJRazcHBjekHmFhIgqlBghIqzIRVJDftBKpoyGI8qr4QWfhDfCQVUTzDglTXrZMCK4XjliQ3ED+tgVA4EsGNiQf4/OXvQHnh+3CCRr3J4xfnOMKjS/Bi91H0vdiDcwOHcXV0CHcmRjG2kESZV7jrErclvAo+guqUC4XANmI0SJC3sFLILnBa+beyVCiymqSfjeqVuWz9O6l+IFi5a7Tr51UsZ0otyYZsYALWjEUzIo3QkD31jtvtvAqUmjZ0m2FfrB2PHT2Cp4+ewAtHn8CxSBeiPgIT9XvqB1pDCsBX7l3Et+5cQw5+v4yQBrqrTCEWFJcRzuuCIDQARphMqCtts83btENtKLUxvIvLPDElqTrmSyV88cYFQJHwA4+/iCei3Z5k8/QB8R+v8zotxXHi2LN44fBpXBsZwtXJYQynkhjNzCNZyCJvl0FlCplXhcmSp+75DMs2QDMiqKnObPy84R8DOUTCDAGBrEsUpfbMIbmy9sw8/xlJYAaSyoXDGqFn+igilLpcJmH4na2lYrQ62kvPt+xxLJRZyZ1cHFuQl37bDnRC0RmJ4VB3F4539OKJ3sN49vgpnIjtExWgbmi8xHzxwIQw4pbx2oPr+KsL38a99BxIVNvVhUHMX9h5irskSYxS7wVyPqGKJPXwH9xKzufOesxGCmcVw4+DZGiYN0r4u4vfQSGdxQeffB7neo+igyPqolrAAx/U8qAUR++JZ3D+xDkM56Zxc+wB7s9MYSqVRKaQ5wjJyObLAoKL+xl4qzRe+86LQ0RRC11hFa/TGoKqQTcISTU7LFQHEPxdP+X4bxYl565JQgAAIABJREFUyMLCYp0HWiYBw5GalbTRytpolElV5lTKnby+ct7Gy0fSMEUmpU2WTxulTWzj+mepp2rJcRXrDwgJzUAY+YVf4JgBtiMiPJQjOjGCNkVDWySGNj2G/vYuHO0dwNkjx3C65zAGoAnGDxT5KmqBp/pnAdwvzOEbdy7j69cu4UEhBUQ1gfFAGzxr/TvbSdRIoxMgNJQymUhiqPnC6MiScl8CPeYVYe+s7K/lrE3iJ22I2nxdw4Jp4u8G38atuXG8/+yzeOnoWZyIdaOTg1aGziL5yLr7IaM3cQjvOnsQpSdszJQyuD81jqGpCYwsziBZzCBtlpF3bOQdE4blwGKWt7pxR4rvFOJCIRjoQOcIU3hVb1RRWVN30KBAqPq8DJIio+ha+O7wbczl0tAohaqoULmnmsOJSyoo8WBHaYhJKcgSVTpY94LVIfiOm01cWImiGg7zbZvg8PEl4mC2lMdULivqJ5rVjoRj4uECpZVs5kADCYSkX5Dphd5c734CRCFuXnCBpxIJcVlFTNbQJmvoicRxoGMfTg8cwon9B3EwsQ9tHIKM4xbWAZKQyt1yxncxUcri0twwvnn9Em6MjyDHbDGvKJG83JBKYXK1yCYQ7s4WOtBXW1W6pFejqG3iKEwS1/o9DUCitKQqys9JhP4/hLF31ZmXO54qCgtfmTUVRcfGvewcFt74Oq4O3sK7Tz2F88dP43hbL2KeAltRS2V/4z6ChCgI6cHRk1148cgTSDtlzBo5jKVnMTk/h7H5WcxlM1jMpUW5qLf4uHBtJnDv3SCVyveyugQVrHshVymptFxfWkEbaDNV2VvPqIHJyc2TgmPim9ffxpuMT2omipgoq0h3L0JBPUw+6jut+G/Cz+MLBuYng1R6GPgroOvjEfLUcP6tGzAfh/2mDCUARceCpKtwQvfXaB5WBAwCk7y6wJDQPKO+dx4cki7I1nM92DbqZ6vxngrc7ysxDj5KockUnbGEQF8+vK8fB7r24VBXL/ZHO9ElaUgoGmJE9itCGt0XROSIoxxPWWncGH+A1wdv4Nr0A8yZBRgcoISDhPCLsirMZOUcu7DbsShuJJQjODNZ8jUALhkjqnpPkeV54lZ9XwGFVbLtUnKW6+cerBgIJrmkwCEukmUTmdlRDGeT+MrgOzi9/xDOHzuNcwdPoA8xoQFodTYq/9wGKlTIAUXDCb0dz7QfQPmQgbxZFmCTmXIei/kskpk0ZrnvIJPFXHoR2WJeMAZvuWQ7zAMQ4emm/prhClwBbxAdX0sIgC8qQsx3ELBQR9clY0E8vL15qyBwDyrdhvwVKnh/XpMNX60PoMhQ/a0xnkA1zi1W20CgwUOUFWEtjqunKELAVPwAQfuvigO1KrACrZKhXl3m9+0KjEaIjDTGkcR5v3qhrXHwdOpQaFRCux4TeIA97W3o6+hGX+c+AQvWGYmjTY0irvFeCgoikGrU+0Zk+riOadi4k5nElaE7uDk2JCJDC8UiCswC0zwfUKUKilTNtkY8sFZfx3rpYUKLzJdifEHwgFo9UAV5HhaoqiSikqLCzw5qtAJtJ/OvqYc988AnENNFB5pJq4TJxRweZOdwc+IBjrT34GT3fpwZOIITAwfQqyREkw1SF3MmfiahQEmhOqDzDWBtQLEXyDolZDiUt2GIf3N2CSmrgHQxJ3qw8Tbr3J+QKuRQMA0Ouw6D4/tbllCpRZ8/PscEfjUN9MoKEwaaRKWFlo90GnifJVkBlYlfw1Gr2rthgz9Y6f3v3JCWgdCzVv+o4vhLNYGQqlNQMDK3twPzIpR3Iezyiirjr+Tww0uufy/wjtVlDx1YU1UPCDQSR2csjo5oHJ3RBDqjMXSqCbQpUSRU3jhFFWChHWpUYD7UM13g67FDyn2QU2IIr76Jkflp3Joaw93kBB6k5jCRW8R8qSB8GpLGxzTi33pd67Um9vRu0QSI/554sxpZkpksRC0XAIoLhalmRFJsEQIhS8OA2+neqNQ5r/YmKtVfXsGHJGkAU5E3HQwmp4V9/07knlAZD3T1oa+zEwf5507+dy/6EBFhoXonWkDETw+NSRH0xyIgMb8sARDqcQEOCi5HBC4JKHCO91+0DJTsMoqmBd59iXfE4YjBJd49x7D8PgBcSBiegLAs8Tf/jQNlchinAJ6qIqB8AeEE74t3yvFj2IHKVJmaFSES6BvEw9qrxBgD77/rr+akkkwleiN4J/HGIcgVQbi4xtNYuHnCob813hdA0bwUWw7/rfLeALr4Tlc16JoCXVFFJ6SIoiDC+weoEcT1CKJ6RPQLiCsRxKGId6E0MY0azhd/Dw/1ycFUcR7Ti/MYT/F/5zC1OIfxhXnMZtPgLbJZRBVOPslHLHJEPUBV2BIS9Ghs4u9YDRhKaO5sJdVfl78nntWoyYrL9SsITEApwtnF0RXV5YPgMLak2dR2agBYq8oTyuGpOEv4CRRZgD5ywbDguJhbmMSV5AR0WUVPPI7D3ftwuLsPB+M9GIi2oy/ehq5YQqxECTS2JeE7f+CvNAmxccjpKEiEb7X7Of7ENGCjxBs1GiXR/IL7FHivAP45EAJcY+Dfcfgm0WuPt93iXXEcW4S5hJOO2+W8hZbYfGgs5nXdCQqaKlsFXpz4IU3Xn9MerLengAQxd+ptfhcugfEvSwK+W9ji8HwN3PHI+xvKPNpCvJZomqp5TK0oYmw500dVTcB9R9Wg/ZkOzR9T2Vefm/kQXN8pCQQZCEv35b8WuVpvFwXQy1wug9liBlOlFMYW5jG+yCHCF5E1igLqjSu7pCMqhJZLqtpK5WSk/uxLWXi13v9mYezNJhbSZiuaEmPe+9B0V/LvRuZ2GGHMVqnk8hdsoNZLtfOCGx41ewENpXGg/gYIttx+lT1GKDNgqpRHciSNq/cGobkE3bE2HNrXj4HuHgzw7j/xTnTzhhVaBDE1IgpHIkRDAqShYGg0ZpK/8f3jkOFyGywahRutTXWtbxEWvEjTV2OD/nu8Y5DtNxGxfaEg+g8wFx66s4fB71YKWDztIKj7CPsZvCanpBLR4HaicBjyzz7Tc+bmtqMq4NKIYHrOxtyHpDRYpWlI/Q7GQ16jl7xqW5PK2BQFerONklkWfQVzJm9rX8JiISWYfGohifHkNCZTi6KlGG8MYikUjkLAYlqlRx6tds0Mfa4DLiUIr59L7o+FqgyX7zy1PXwU1mK9NHcmhLJKaYfLvOR52TFNfvOuDOoqVKo5sObmw+DpOyDR/GHiruHbFqE7n8NcmcGUFNj8XwA5VsTo7APQ2WERJ43KGtpjMfT48NP9bZ3o5q3BYl3olmOISXy14+qut2lEEQ7G5SY7rfs3YHSpbsrV58Fzv78LWUxi7kMQrdyU2pddv17Vv6367+vfd5jC+9RPKFp3bhISAvW0WiZgPlKzAKu1LZRsri1Zwn+SdS0kraxwvs6mFgXDJ3NpZPJe7gZv/iHyFogLRyUic48FTViC/HdSN0grevQb3/lq04A3m/mbOchr35enCUpcAEiSCZc9KJTy4jeZ21/8x6isuiqVhGe26TPtVHXgISjckEN06hEJERDAksKH4LhwHa85aJaVkMyWMZZbgD41Al2ElyhUQoUXuifRgR7fS80/d8fb0RGPI6JEEOU2MY/PU6+1t69cVxidhgqLwqtnQI1U3kCb2A7jspk56IbuO8xjLFSI44RuOdB0HL/nocFMlB1LdBXOlopYzGawkEshmc0imU2LLVcuiEgL709YFscwcaxJXaHdcWYXkSDe3i6EmrpEo3/kiHi+HJchqmhfjGn678q+xJDHpieFWhdVNcqbOhK31Pg178bysjVQddKySiSBBuhBIkTNRFSB9+7L2lbFq02KGWjZJDShInu9/FXRy19CRNERj/D+dzraeMiKZ6dFY36jTK9hZkzVPbOCaxGQhW0s+bauFJLk4epDqfJ3yG5dxltdQ2t06IR3F9jyAbik7/hkIeZGJZLC/N8ZilxdZ55vQ6jsvCkq75VYNkSjlUwxh3yxiLzpfVcwSqJ/ounwLsC8Z6Lr+UBsSwgLXpFXXdUl4aQgwhfhO0H5HYbV+D3O8KvyjwUOYIfxaMt0VNdnigEseD6XE86ZhB7ROXgGyqXt9/ptMjXzH4TC2L6tHNpHTDRJWLKV46ln+5VchoKwt20wqyRQaLlw8Pre8Y1A5Q0yqQpd1qDzjrqUCjSjiKSJDjeqTBER2XyqEBy6piIqvOk8y08R3nNNUSATgi49gqOdfaLvAVgIzDSAv1qGgmdci2O1ykNEmEhjqRnM5bIoMVe0mjJsL8Rpml70osgjHbwJKl+tXQuG6zEw36cowqGO6FBT5MeK32zB5Hw1d/wEJO6H4BmefCXn9Rk0olfG3Ovm7FbmqPdM3l16ZUq7Jzy32RRWEvmq36lFJZOAjpWzXhiwKxoXIRnTsv4orkUOsuLimZ3e9Gu9tBr/QcMab///VQhmH3OOu8p5Bh6RKjsGK4/AHeBNK1wHObsIUi6KGDpzHW+l90EJPEecl9Uneu3LXidd8S/3uMuyaGxpGxZOtHXjU+/7MDq7D1d9Vqt02q6mcrBR3kWgIeXg4kvXLuDi3VuwoioM4ooOx7zGXjScsAOG9sKXTmiVYkFjFR/L3w2EKn8IlaPSy0JYNorBBrh+rNIdpfZ5qxO9xfyNiPl5AO16LKdoqlssFcVeckxAZim8O+5/i6ja98NlZxjqStAeUWrm3a3wRojpmsEHeMk8kq89+BF3Vk24YazaO49vIp9A6LJ8HTREV12h1pc5gImLou/w+hhv6x7cxhq1tdViLrA6JoPIdWC4tziLi1PDcHva4Mq0kifg+VN40RR/JtXvcYhqDkHlXJ6ZUu9EbOi1rBFsyyPysB2CarWjKHiHvHaC18AoqtEdbUdE1sT3slBjCeMqJ+WNFoOI6x63AlZFa1lJlmgMYZd46KdARa+kytL6A1BTTMT8hBveOJOnElOeLx9RPTt4E99RIyFR6TqjK6AxHW5U9Zt6Vp+A1UHLLzkNQ4idV0+i5dsK2ALBv48inFszf7ComvQze3hyVULVI9yJzWQ/FdhgjnC0aIrqdkbihUpefUuLWjc1qgxEsB7WtLkKxZ+XlAv7QsFfSXkCLK0H5FjDu1qurqJyumX5h1Ri39QXWjXhzg2eN2EtbDnmftQxHFloPaloW6z6I//cGU9k27TIA8psSD42pszTNjnF9CjatGiBF2JYrHnq46NCDwP3VH9Ms95+DQE7VroOq1tXGa35cy2Mt16cOhb60Oiyy2XJrdQctP63R3VF3yhivp3Jw/sdsfifdUZi/1lj1fkj89RA4hdmtEWiTpsWxaJjBilSO6IacDvoYRxJm+l8IpXqwId7Ew0rKSv24ZrPVr2vBr+uRlWv2b+iDDW+kZZTb2VqlHQWgJI6zKtn6IwnJmJ6dDGsZcqS74ziToJENEp5NVYmt+glVgQnavkDdhitnyEeXguoZf6NmBc7Czl371DQ7EfgKrhAf1uXwRf04eSsEAqcqOTDZFHPRoj0JBKQ3WoHFNIgG207Wx/tJtoMeO61nC587Y27l7U78Fq0TcSq1Zs80tedaEtRSUKZ51y4XuoWFUUg/o6dsba/6o61XaGOh7GGBlI+nOLZoq2nRrn+y7LrJr2ojTwta1Dz0KL1kzDFXG+Bj2uizNrUVcWrzNS8MCDl+ex840UvqqJ8rSfW/n+qTBICoMXoO4+Ij9WwqsKa5Wx8tsxvW0ytObZ5xOeL6hL0RNvQpkc0UbTml2tzkmctL6GEl0SWKENvNBHjeGo5mM1t/1aUYFW0Xts2UNvdOoc/8eO6axICbpAqXD3PTuG81ZQIh5GhWj6D1RPP/1cZQW9753hbJDbGodY0KleOpznHBN8yloEIldEbiae6IwlbYqRhZhVpxVy3lBo2BXkYhXkPvLIW46+e/v/2zgQ4ruO881+/e04AMxgcg/skQIAAeMukbisKLVuSValy4rJ3k6qsy+vyxhuvY8VyKrGdXSeOvfF61xs7ZcUbp7y2E29sx5EP2ZIcypIpyTookZRIiuIBkABJ3Mcc7+ze6n7vDQbgDIgBQRJH/1ivhhjMYGbevP66+zv+X87Q0+anBDm1FfHPRLXgE3RlT1f7kndBCAlJA3bIGkSQSGWVv1tbHvuy7Bdc5Dn95hNAbk7/wI1MoW6yxWY7sgJH7HqfOZfVa28NdORdM+Rt8aKS7JQHw0MWwUQT3EI0xSuXFnJ902nGFSa0bHUyWZE4wiSDvIkG5WWp8Zjs9aPUC5d/EwtBPIN1Hi/ZlAq7lkmaUBUqE2i15YxtwpxtsYMi2Xh+OUlLMVVNpYKZWRmJhGAH+ZVqJL/5wTpSQ10v8L3ttcPPoYvfIJeWp1MHf000JtUFywhtcHLZyCzYDUpZzxKAN7ipIk55KIzLtCAap/30aRzRywjkQ57DWfsQr6EjLdFWJNVsTNR8p0wJHKU1JKqoLnj/gmU74B9UqMG0bFozfLw+lnghIIhkcT4A4qmZHM7axveDOA5EJO1yoqziC6ogXQyJCgRFOXdQpIiiLfgsTHwiIB1rqKz68rGRc39r2maYts6mf1XkqwAOZ+3jBe9oJK8yGI5qiirTDti03sfBCyNIgixLkH9Q4YpwKASdNXUTZYKsgempvXF9EA5n3UAsB4KiBHXxytMNscQcVZGeNrOsya1/UCS82GlCMEvyaY5XT9WXVUwO63NV1HuIvUiAwJ2AHM6axRObArAsKA+EL25paP7junj1WZs1k7kyf0QwmFhj/mGzRpcRJB/ZUlP/Z0FFSdkOXiBwwwc/h7NGofKUtNOTjSEeCGc66ppejkhBTNutUc2P/IMi0H5sC45AkElVlwVC2a6G5p+UKYFZYtk5A8ATgDicNYxX2KcSARrDFYHKYNShyst0crechQfkKwItRhEV2h7LigfDkbOZaTeXHHgdKIezlmHOf5su/4NjWxINf+Nk9PSQMV30HUuDE5cL/oJm/ymSPNlelfzeialLv63bToBI83LhXKqJw1ljeL45yzKhpir5cndj61+VKSFHQsVl/iVJlAr+glqSkBIwO+ub/3viwpvbh+am+kEKFHwsh8O5+bgVnoT1naiPJcTmqqRDuzcHxeITtRSJRIr+kjal6GhoOt90vMoYGhsDFCCABVdAhM/+HM7awF+N0/Z1gmVDIhjBbYnkCTrvp0y9oPffR9JkrfgvkQj1mpZpL68aeUU8BWnaLFNcnhgFh8O5Mfhdj6mup2ja0FZXf7C9tuEvpzIpyNrmku9BiqHiBkBgdcNgdycbP5McfKPxZHpqB8hq0cdzOJybA+sJgAkoDkBHInmqJZG8qIIIptcEtOgYt4kNxQ6L2EAbh7TU1r3aXlV3Atk2AHb4V8zhrCFY5R9xu1VXBaKHeiob/jEKAXAAg0h7VhY5KNKEOVf0k/iJP2XBCLRX1T8RPnt8fxqTpk3XJIDDWcMwqTSarGfb0F5f93RrVfKgq/Z99awdIaAoUOzQvPtDSIUt9Q3f76hOPiUaDvMycjicmw8T86FLABuDggG2NbVlKivioBMr13C22AGs2f0yWoHr4EBTon62N9lsnDh7DrAkApaFXNURh8O5idDOvxigtix2tqO6/iUFiTBnZpY1NiV7GRIqtItIRAjCQHXzi4ci5b816GSqHD8RiJcFcDg3DVaXY1oQxAh2d/Z8pSVe+7hG3ffi8pz1kpinCLQUWCLQkaj/1kDrlvbzJ1/5pGNjkGQpr1UFzvUQ4lmCHM61g+BKDej8DsBs7sYAgoMhoYRn+xvajkflMNUCAlm8+sqeImVMY1kP1C0TRFE0e+tbXnv27HHQ7SwggcqFXbkI4IOfw7l2CjXmWTyyHMeGEJLIQH3rX7dFq5/WsQEyEgAvUzpeSllLJwr40DeiyQq0Vdcf7Eo2PTo9dPIDpu3QdEGvgciVFoeuBAia7yXHzQKHszz8wb9UBS71/jumDXGt3NrW1P7zikAohYFA+irJP/lIibKKZT9YpC3EkDS6t6P7x28Mnv7AmGUAUr1aggK+ALTIinEDwOEsn6XGDbvPoWW/CHckkv8nWZ54cyabAVW+UvZrKSRcwoNpTrEkSdBb3fTKlljtP8+Mn3vIdGyRiGLhNykIIJBiXd85HE4xlpr5CUv7RQC6ATVK0NjV2f1ofaJmMmNkYc7SS5poJd3QS/oSDMuAmBo6v6+r94snXhh56JKpgxQoXiXIZ30OZ2UUGzsshI8xKDa226qqntre2HlOlVaWoi8FlNKfGJQ12NPR88a/nXrtucnRwf3EwQiEK+3VYumwos1GORzOsmGSf4YOdcHI0b3tWz9dr8UnEaveLVzavxRSRA6W+BQCCoiQDFbO7Oro+Yuh2YmvX9bTtUIw4Hoei5QK++EMLivG4VwDLPkOA9g2dNTVp3e0dR2bdxaWPr1KBl5eHkA+NsJsQO/u2HroxNCZ0+On36glGgEisKZEuUfyfAAOZ3VhjnXdgiotCntauy42R6oMi5isbd9KvG3SZGZqRW9QEATaVXh2oKb58ydGLtRdNPUWCMiAWGIAH/gcTinkmpoKXifORWOZ/UgVfx0CsuFAT239s23VdY8IxKaefNbXcyUjTpJXuCunb1hwMOlrav3RqyNnP3L5/MkWwhqL+KE/7vvncEqmiOQ+7cXBwnuWA8lg+eE9jZ2fKQ+GT89QJzxL/FnZeJNghTM1fTnDsaEiGCE7mzq+cWryUstFPdWGNZltBVhT0by/zff+HE5xrlqSQ/v1OBgkC0N/W+uh3obWJyVBgkkje01nVWClvSs6XAECmna4rbHtWwPJlhdUCwNyPEtU4APxbEAOZyUgIBiDaGFIRiveHGhqfzKoaqDTOh5PDsy9LfGgBoCuOFZ2uPsU2nIoHorCra1bf9xanhhFpsXeLPcBcDirA91OU7GPsI3gltaub3Y3NP2LihDIhEbkABRA3m1pB7AtQAmZgIVwaNdgA6AtXv3tgca2mnNvTH521rE1EAo3HOFwOFfHdwrSrQFxbJBsBzoqktN9tc2/lgSRpeUTx7nmJbXkLCEZvFwsxwGbYLoVePTU5OX2w5fPfchCDu064Fov/oVzOCXhpvvSJTrt9GtDXAqk79g68MGeRP3PsY3BgtXR5pSm7eWVAy+N6/Criyfmbm3vffri2OiHhs0sYFqTzEc/h1MyxCurJ4YFmoNId2PT/+ita/4B7fGfNU0vx+baz6tUESjeGKRUaFrxrvr2JwabLnz2Z2eOfHzWshRBUQqXCnI4nCWhg1wwLGiMxFN39+76rhrQrJHszKqOJimirF67LxqrrIyWT966tf8fXh8bevjk3Dhg2npMFHKNC64X+XumjUyh+go3dux+8OuWfUlgVWacTY1/cXoXq/9dFvq+6H3YMKFSCRn7mru/0FtVf4JW4yJpdceQhFdR5596EyQiQGcieeHWLdv+dvLI839w2cgCCgYLWi2eKrwSilaHXz+KR3Y5JULyDCnymnle8W16Lb4lm2T7G5q+trt1y+clTCxFUiCASi/4WQpJsJfuHFIqNBVYEYXsvvbej41OjmtPnXn9Aykar5RX941vVtyLZ2GClbsKcH+4LgbVexG+kbtWrpTRXvx95dZyKR064zWn7ugZ+HwyFjeyjgU67fKzyqtoyVnl64VWBGLbgRotat3TtfNPzk2ON786Nfx2GrdgsmF5r1fqxbrUMn+jL/0XslAtjniXzXzXxuswVLkA9LWDlreKwoYFlYIM93T2/3RLsmkkk0mzlQJeJcdfPpK9CmHAfHKliYRAc3Vy7O09Ox+ePpz9+lBmZgcEBNcfgPmltGL8JCw0H14VvCvrxpxV/t2tFLavXypJjp5a2wHVdmB/Z9+X7ura8ae1WhxmWf/O66OmserrcuTNRSZ2IONY0Nfa8epkevb5H7z8qx2zpgOYdhdG3l6oxI+0eJbffBoD3sAveAG557WUJWLuklqmaCMq8n/OMs/3Ip+X///czG45IOkmdFXV//DO3p1/XRYKW7Q2MKyWqtmxfFbVCejDLB0hkLKyEFKDcKB3z3+9PD1Z+9TpYw9ZkkA9D96H5pdR6XiWUxByBpAqL/sGkJS6rYL5kV3MdPg69G7NucAcEdcxoLNpyEUB6P9pb3/Dhlo59Pg7B9722f7azgsWmDBNSpPsKxUppIVX/Y/6jilBVoGmLdZqZZfeObDvkbOTl2OnpsbucIIqCFLpc7a/WfGfmT/zYyh9RbEuoTVYIgKsKpAv5YILTOT5Y3Q59xXzIOQbAFp17lADjrgFWC3oqcSGDVGQ4Z5tu/6pp7njRRsIWMTxynyv31UtBdXVSwRaTMTf1gDA1mTryQd23vrpbz79+Jcu6Xo/hLSSP1ehS07I2woQWE6nw3UM7QEnicwb/PLZE5ApT7ESUSCO2yEW5dYBTDaKzdbeGUK5ivH5x8wH95G3sPCVHND8mfWFJpAIjiTCONLhcmoKkCq7WzJuB64J5rg1bQg4ALtaO7//jv5bfhZVwkCTfeUbsLFF58nqhgELvgirUhJhnKTgR88ffNc/H/7V5yYEu1vU1JJkzJbaqi5eHWxEmLcfYwiABHFRg4goubnidDvlS8bkpFiIFxVYfJ+QO5f+U3IybiT/eW7MkZkD4jakciQEOsIwbWQhjW2wqRAsXwmUDPK+EzZp2RjUrA0DifqfvO/OAx/YVd02EgQRXJGv67uejSERpBuxZKavYXpz9P6evseHZieaD7519H9lDRMkTS2oHlQoS2qp97oZFIeZ4qJAVwAEho0UCNjJTeB0OkaYjmbMludsyBKRRWPozxi5A1sgrgHAC/4uYYf7PAQicWXdiEDm+8+BwJ7D1hUKze4UvTpyxI1AyRCm608Nq6UbpC0cP/RA/9s+sbO6bYSe3wzYOYN9vblh2Tn0OsqaOlgE2/cO7P2Rruu/fWjwzVttyWFOQUSu9PKjEoYIWRKmAAAU1ElEQVT0ZnEnsrFOx6cigMMGMwb/5CH6MxLducU3CgQBoQMbYfeiAwHyFgu5WzbXewPZLvQ8z3Cw3QJaKP7KKe0LxJiAgAmIugX1cujiu7bv/eM9XT1H6RmlVX4rlfdaCaucWVwY5M0xNDRo2TZ0x5Ln1J13fHB8dvZ7x+dGuzDVDljkvS41QrCZ5Mb8UKtrMMXcnf4pI3n3uUt8b0+P5u/OJaXk8gfyzG3+85CwwLk6b6SvzGrjXEn+ShZ7ORv0HDqmBRVYhN/oHHhxX3f/rzLYZPcrSLqhxlWSbkg8x32NWiUKjhiGiBSAvfVdbwztGv9Q9sVn/+bc7MRWqihMVhAZ2MwUG3/LGpdk/nbJx/OJftVg55lqZVo2qKYD+7f2/eu79975+zElDKPGNAQU+Ya/JxZNvlFHWFShXAmxqkELMLytbevBe1p6PlmF1LPUE3q14iC8aO/KmYcsCgVejZIfjzZbuvXqQK9nVvTDzh/V0LMgqNuwM9n87O2dfX+oifIE22J5y7Eb+Q/YCmCVq4uWgwgC2+toogy3b+n7YcrQyx5/67XPzFhOM8jF01r5ZLQ0pXRhJpvEcbomIF4pPJX2MmzoTTQ8++7tt36kPVZ71tJ1sESJOV4JJuAg54ZK6kujK2wMci0gLyqdsQzQAhrc3bfrHy1ClKdOHv7EtGMyafFCKwG+QShOoXToQolAi39GAAUdsJyVsTh6RbyZXTAdNvjbI4lXDvTt/c9dNY2Hg4oKpm2BZRoQBBmwaYEOpXfquhak8dTMDf+q/ZlHFASwkQABRTPv7tn5zVQ6Xf3M8Mn/NmvaICqy78jOwa/RpVl8fvJn+UIGwB/8m0VM5YZDPGctxiBYNjSHYkfu67/lj3Y1d7wiCQgsx14U6yol7rU6SLJ4c3Pn6AdOmwaoqmo8uOf2x5yX4Xd+NXiiN0ssN9vspr679U3+LF8MPuhXl/yZny77BQsDGCY0hypefbB/30f2bdn2jCQKgB3sJWXd3Cv85qt00JAIwaASAi3l8SPv6Nv970w9+70XLp1pzYoEQJavsIuFHIGLl7/5uSmlXeS+e0xY92uO5dZGcCOwPIop+BSGsBRtwbShVg2fOdC18+P7O7Y9QwVzZgzD6+R7/bNwr8aa2Fb7cha2bUNnou7V9+6758Ceho4zQdOtkEJ5I76gJt6qvxsOp8CVsdwKVirnbWMQdRuaghWv3T+w74N39+1+kmr565bhTTGE9dS4mQesFQOAvJpoBiFQHo6eeqD/be/dV9txRNMdIJaTKz9lYRXvjQteGkz+h/Dnb4xWGroSNsTsz7k6vv8j/1gKpsrjNdLJLfXzJqScz4Vm+WUtqJXDx+/r3f3w7V39TwqiCLpt5nQwIN8Pc5MOWEuOdf8N0Q6oM9kUVISjv35w522/d0tz15GAjdlSCuGrL2vJqszhfPBvBlZj67OgVoXN/HTwm3TmP/zgwP6P3dk98POAJIFhme61u8YurTUVWfOLUcOyCjQnqimWOPye3bf/pzsat/xT2CQXaJMEhywdJUV8/uYUoeAMn3ehXM0g+Ek94M38/mRD/PoIuuzP6NASqjj87r63/eHtXQM/BVGCtGmyFe5a3FyuvdA6AYjKGsS0EGt6GA+GnznQt/u9d7f1fC4K0gWsW2yJtVQaLB/8nMUUWuYv3i6uFLYptWyQdAs6yhIvPTiw77/c3tn/S5rVT3NdHOY8xKuu6LsarEmtbtav0C1Bh8nMHGiaRt61c9/fy7KS+eXpNz41ntGbSEBmVYQMrk/FuQoFlaS92xWPfb+iMmuBZjnQm6j79Tv7bvnw9ubOl2j7fJMu+3P1LWtzWlrjyXXuSctaJoS1YOaBgVv+731bBj5aLQdHiG4x+XE++DnLZbFTeLnu3vylf96dbuquboJmOrA90XD4oR23vX9XU+dLkiCwPf96YF1066Cn3rAtCCmq9a6d+36ghULWT19/+QvD6ekurIpARBEIzxPmXCfyPf25XADLAdF0oBwkuK2z+2cHend/sKMyOWhjDMYqN9u5nqyfdj2EQNYyoCwUgXu6+38UV0OTPz7ywldPTF3s0xUbQFWACK6SDfcBcJaDn15Sit+IhQIdG5BuQpUQePHebbv+4a6t2x+PqeFB8Ppj4nW0Kl13/bqypgFhRYPdTR2HKiLR//jkqVcf+uWbRx/IYmsLaLIbZ+EWgLNMllsRibwSVWJZIBkm1IfLD/3Wjlv/ZHtb10Eq7pExdKaALXj9GdaLCVh3BoB+EXQ7YFkGhMKh5+7q3/1cZTBy+Iljrzx8OZUeQEENiCSy2mvk9bPzM7i4XeDkg5Yx++eUj2kYT7dA0R3oTzb98L7tt3xuV3v382nq5bfsnIFYbxfZuuzY6WcOzpk6aMEAvHv3bd+JR6ITP3rthT8/Mz2+F2sKCKqc08P147VCnow4h7PUWEXeNM4mEYzBSmehQtDeunNr/8v39+15pLum5ewUTrPZPhwMgp1ZH06/xazrlr10ZnccG4JqAA707/95LFw++pNXD/3VkYtD92ZsG1BAASQIIAheJxuvN3NpRR2czYYvmsoKdnST7fe3hOM/39G65Uu39Q4c7Klsy1LhVQc7boerddzrckP07DYdi7Ykh7vaBl5trKh8309fee5rv3jr6IGxbDaAFRlEyRMY8fdmfPBzCpC7NhBiy3rHdCBCELTFan/8nj13PlJfkzw6mU1BysmAJiob4hRumKb9tI2SARbURGLj9++57d9XJRJ7njz60kfPzU68i/oMgGnZo1wLMQ4nH+Ln6RO3U4+k2xCXg+b+zq2P3juw5y864vUjKSsDdM9PQ30bpQXVhjEAyCskSptZsBBJ3drV94uuRN3gD196ZvrlC2ffP2kY4CgycxAKdHm3aBGQ31uQK+RsLnJ+Iux26FUMBzoiiW/f0b39+/s7tz1dV1E9boLNknvWZkb/ytkwBsCHemPp3ozKLe1IdpyuuTv2R7946+jTP3nthQeGZifvd1TatFT0GlysjffMuYnQCj7slvASw4awKJE97d3/853b9n4xqAbOU5tgEBMc5KtWbCw2nAHw7TM1APSLE2T58tamtr+LKYFfPffm60OHL5z58JSZARJQ2GrA75CB8uq0uWG4sZSy4lpK57AUWFowFeWiXXoMC2TTgYZopbWvfesjt3f3PZqIVc0OTYzmHH0bdd+44QyAj2+rxzKzYNgmbG9sP94Wq3mk80zdxC8H37j11PTlfbpla6KiUnXSvAaanJvyfS1TmRgtMgLFKKTeg3LPQ+7r0VqSrAEJLXx5oKn56Ttatz3RVlX7d4FAAAh23JJfMv+8jciGNQA+VIbJdhz2JTbGq+eUUPBTsVis4ci5U//h8PCZj4ym58pN2ptQdTsTud1wCyjs+slEi5RgrrmijOOexxJO4IoGJPKan9Olvm0xqblyJE+0VTacu6Vt6ze6G1u/0lJeiTWbwAx1GovzvRA3MhveAEBeUgeNBmRMA6qj5efft+fOT/UONlx89vQbD78+OZyYMqyw4wisfBMJQi4k5A/43PZgUQgxvy05NwIrY1kzf942gT3cC9flfr/IMC+e/d0cfgeIaUGAIGiMxEd217b86e627h901zRNjWRmYE7PgiKqm+qL3BQGAPKWjfRCSNMMwlA5bG/q+FqkouKxztHh+1468+Ynz02N1aYtS3XoSoA6CgXkXXDFk4eWI73NWT1yy/gCAzz/S2F6/MTtxQeOA4LlQAADVKihdF996+ltje0f21rd8KQqCCyPxMaOd51sro3gpjEA+fjlxbpt49poxXBLeeIb3ZX1L710+sTOV4dOfXLEmG2ZwxbYMi01RqyBCfa8CosH+lJVyIWcWzzEWJylpNwLna9iRpl4qeKEau/bNqgOgRhRoLOy9pW9nb2f7K1vOR1RlLeo5PxUao515N2sbNJP7s4jAnJ7atuObZUHw4cf2LH/8M6OrpMvDJ4ceOnsyd+9lJ7dqYsI6PVBDQG5RlVHX5KKD/7iXO38sBmaLFwB5KICvi1gA59247GgTFSht7n1X29p7vrG1ljdicpQ2fGMY7KmHfTxVH1qM38dm9f05c8UTMTBgmggBFUV8WduU7Y9s7u+7ciJ0eF9z7557DeGJkbvMhUEEFAB005Kef6hxUKTCzzUiyqTS5Up3+irhcWfbznnB+WdVPZ0mtVFXKPAVgO0j0TWhApJgW2N7d/Zv6X/UHt1wxMpbJ4MqyEm623aNgi0RoQFAje3Nd7UBmAx1AiY2IIKLQjVVcmnq+OVT/fWND/2+uWh978wdLL/7MTogRTWASkySKzk2G1y6l9D+SGq/J+vhQ1tBK6xfJbJcBMAbBPApkkluY36aPz5/vamsYGa5mPVZRX/uylZOxESA/Dc+ZNQjhSQqJMv9+IcbgDy8K9FmkQ0k03DbDYDu1p6jnW0dH6iva6x8ezw4EePjQxtPzU6smM6lY7YsgCgKQBeZiGLCKxyzsh678u/ZJj0KrXZ+fbBr9DL3ecQIFRuO2tCEElTLfHqs93J5n+rLCv/ZlND8q3bqnrSb40OwvjcNAhhMdd1n7MQbgCK4GoOYCbrbEoOtMZrhhJa8KO99a1o8OLFjx8ZPvO7Z+fGtQvZ2YrZjF5BFYoFSQRREFmdCFkUpvIpFqZieNrxC1tLrx/ycyV83fz8GosrPjuLzS/eQ+VaQC0I9SFfhNO2AVs26xsRU7TRltrayz2VDd9oran7bl9Lx6UzE5ftaT0LGbCYIZf5Jb4k/OwsgXuhEtcQmAaMp2ahOlxO7tux/4u9W7d+69iFMzWnhgf3nxm7+AeX5mbis1mjwiQWEJpEIrvVhwvESpca/O4v1vUclZ8oxcJwsFCfccnQXW6WR3lbKsTCeIQmctH++jSMJ2tTleFyXB0pu9jV0PLnHXVNz7VEq0bHpifMuWyG6e/TojCe17k8uAEoAXpdWrYNaWLZWWIPx0LR4d/b95uvj8yMPfH6ubPNR8+99emh6fE908SEtG2D6SDANIogIM/ptPwBTgeHAOtjJZCfDLVAQbfA0j8/dJf/f+I16HD/g938eweDiDFoBEEUZFIVjBzcWt/89d6WtvOdNQ3D5YHI6XPpSZgzsmBYFmiynHtdzvLgBqBUiF8yboFpWXRw61XhiuPNfTXHf7Nn75kTsyPdJy6eD50cHnzg/MToeyYyGXBEAlhw2KVJHYduSNEXKCFXzPy5PHbPo4jyZsW1pmRUSi9G5KXj+s/zvfcs45IQkLzEHUQHPgFQEIJktBLaq+u/sq2x7bHequZzmUz6xJQ+C7IkuR2lHQcUxDXhVwo3AKWC8lKEkRs5EAkCTVYhHAicnFLMk4qkQm9l/fOTc9OPT2cylceHB+tOXx7+wGR2LmiIAI4iApFl1xCwl58XLXUHlNcBGfmhRJKnTrn2TsdSw4/kPdCP4YO3qsFeLJ610japzr4NUVmFqkhsbEuy8ctbkg1j0UAoFQuW/QyF1bGacBWMOCOQnTOYAbZFh3vzrxFuAFYB6iOgDqesZEFG18Ghe1YCp6vKY6d76luhp7pJmcrOvTaSmRoYnB4jJ0eHb784M709rZtsIIiSCEgUXKMiCDmBigUucL8sbQ2ubws68z3/nQDuMh/5+wS6p6eVdg5mTj06e1doYUjGY8+2x6ueTUZjakcs+ZwsSv8vWV0F43OzoOs6WKYBaZIFixV28UX+asENwHXATS5ywDYtSOlZ0BTVbKuI/X1XtBtGZyZg/8Tk289cuvD7l2ZnQik9K4+mpoPj6dl9KSMrm3RwiIg5EZkzkXU9Qrlqo/yBtuQwIFc+bvEgLfT8K0Jv+Q8m87ek2B/If6LtALIdNsNTpR0JCRCQFIgoaiYejT5TUxY3YuGwVR2Jpeviia+WxyueT2WyUKWWw+TcNEymZ5kKD5Pg2igaXGsMbgCuJ57Xm2kSGjrItghBUYHWutanqoORp3TLprNbaDo9WzmZnvvQyMzkXVPZlDBtZYVxI1M5axuNKdMAk3q1kWcEBOQqHXtpzL7KcX7N4vxmYeGQ9zcZxQwCLJrNF/xN4o5+1wXh/g1WWksPggFjN6OSZtrRP0AHuyYIUCZpUBbUIKoE3qgMRC7WhspCtdHyxypC0a9GwtFZJCEnqgQhLCuQFhGkIAOz2TTz5BeNlnBWDW4AbgCeL58NFAvbrOyUNjylY2XOyKbbaxrSZdHon42kpqNp2wjOZdPy5Mx031hq5uHL05OJOT2LdctRdGzhtGVUmo4Voc4vC2NwaJjSH+6E5LYPWPCMg3cLOXuE5idyP9xGXE++L4viD3K2XPccdci7pUt6ESFmgKjvg+otiEgERRImQ4FgRhVEIouiGVQ0uyIYgtryuFRdHp+qjVV+WBWkY6ogatXB8Mzk7KxzYWYKBFp+TQQ2v9ui5PoFNuZlsCbhBuAmwRKNMGZebNOxaX66mbXM8WkrC2FJhXe09Z9GonAwZRvBjGkK0+l0dGJu2p7Ts/em9exfTszNKBOpGZKxTESTlQzHQpbjIFrc4iBADm2TiBAyiE0sjAXaKYmJXiKS65GAke9WQGyb4Quluo49BKogYZlaEEJ3JQIRCBAZBNBEGTRRIiFJISE1IMQi0YtloeAjsXD5ibJgiJSFItNlgVBGFUUiC6KgiXJWFITpUSMDc2Y2Q9u70Xx8WoKr5IKdnJsBNwA3GYT8Wdedu2lo0URupaIsSlOaQKZovVqIGgorCE3liVMAcNAgjhIOh8WUqYtZy5R121R0ywwYjq04CATdNgOGZSpzhp7JWsbv2LZ9v+0NOoy9Jbu3mWc5CqI7EEVRAkWRQRXlbwcV9V/CqhZWJUUPaoFMQFF15GBqBJygpOghSTU1WUbYtmZCinrywtQEMyqaokBAUUH2jApdPViWxYwOfRXsfVY+8G8+3ACsMfzwos085QgMbDNNQ5MlFtmg2xa2HeeorCpQE6+ClJkF3TZZS2p269hsOZ8ysjCVmYMdde3QGkm8mMHWd2xsOwTTnToRWCQTvN0DcyO4aY+CICBZlFBQkA+9NTc6NJiagFgwAtFQGAKqBsSy2dI/KCkQEBVQJBHGJ8dAlRXmobfB8bQWLMCCABLbLsxXXq56sQSHw+FwVgAA/H9uGNAcZjDwgAAAAABJRU5ErkJggg=="
      }
    ))
  );
};
var USDT_default = USDT;

// src/assets/icons/USDK.tsx
import React20 from "react";
var USDT2 = ({ width = 23, height = 23, ...rest }) => {
  return /* @__PURE__ */ React20.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 23 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React20.createElement(
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
import React21 from "react";

// src/assets/icons/Celo.tsx
import React22 from "react";

// src/assets/icons/GoodDollar.tsx
import React23 from "react";

// src/assets/icons/Copy.tsx
import React24 from "react";
var Copy = ({ width = 20, height = 20, fill = "#86B8CE", ...rest }) => {
  return /* @__PURE__ */ React24.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 17 19",
      fill,
      ...rest
    },
    /* @__PURE__ */ React24.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M0.373779 0.750078C0.373779 0.362788 0.68774 0.0488281 1.07503 0.0488281H12.2125C12.5998 0.0488281 12.9138 0.362788 12.9138 0.750078C12.9138 1.13737 12.5998 1.45133 12.2125 1.45133H1.77628V12.8157C1.77628 13.203 1.46232 13.517 1.07503 13.517C0.68774 13.517 0.373779 13.203 0.373779 12.8157V0.750078Z",
        fill
      }
    ),
    /* @__PURE__ */ React24.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M4.0863 4.46297C4.0863 4.07568 4.40026 3.76172 4.78755 3.76172H15.9251C16.3123 3.76172 16.6263 4.07568 16.6263 4.46297V15.6005C16.6263 16.2788 16.3569 16.9293 15.8772 17.4089C15.3976 17.8885 14.7471 18.158 14.0688 18.158H6.6438C5.96551 18.158 5.315 17.8885 4.83538 17.4089C4.35575 16.9293 4.0863 16.2788 4.0863 15.6005V4.46297ZM5.4888 5.16422V15.6005C5.4888 15.9068 5.61049 16.2006 5.8271 16.4172C6.0437 16.6338 6.33748 16.7555 6.6438 16.7555H14.0688C14.3751 16.7555 14.6689 16.6338 14.8855 16.4172C15.1021 16.2006 15.2238 15.9068 15.2238 15.6005V5.16422H5.4888Z",
        fill
      }
    )
  );
};
var Copy_default = Copy;

// src/assets/icons/Bank.tsx
import React25 from "react";
var Bank = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ React25.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 256 256",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React25.createElement("defs", null),
    /* @__PURE__ */ React25.createElement(
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
      /* @__PURE__ */ React25.createElement(
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
import React26 from "react";
var BNB = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React26.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React26.createElement(
      "path",
      {
        d: "M9.17376 12.6062L15 6.78L20.829 12.6088L24.219 9.21876L15 0L5.784 9.216L9.17388 12.606M0 15L3.39012 11.6094L6.78 14.9993L3.38988 18.3894L0 15ZM9.17376 17.3941L15 23.22L20.8289 17.3914L24.2207 20.7796L24.219 20.7814L15 30L5.784 20.784L5.7792 20.7792L9.17412 17.3938M23.22 15.0014L26.6101 11.6113L30 15.0012L26.61 18.3913L23.22 15.0014Z",
        fill: "#F3BA2F"
      }
    ),
    /* @__PURE__ */ React26.createElement(
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
import React27 from "react";
var KEUR = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ React27.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React27.createElement("g", { fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ React27.createElement("circle", { cx: "16", cy: "16", fill: "#0f8ff8", r: "16" }), /* @__PURE__ */ React27.createElement(
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
import React28 from "react";
var Tron = ({ width = 30, height = 28, ...rest }) => {
  return /* @__PURE__ */ React28.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 29 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React28.createElement(
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
import React29 from "react";
var BTC = ({ width = 28, height = 28, ...rest }) => {
  return /* @__PURE__ */ React29.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 21 28",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React29.createElement(
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
import React30 from "react";
var Wallet = ({ width = 28, height = 23, ...rest }) => {
  return /* @__PURE__ */ React30.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 28 23",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React30.createElement(
      "path",
      {
        d: "M23.0751 11.375C23.0751 11.7198 22.9381 12.0504 22.6943 12.2942C22.4505 12.538 22.1199 12.675 21.7751 12.675C21.4303 12.675 21.0997 12.538 20.8559 12.2942C20.6121 12.0504 20.4751 11.7198 20.4751 11.375C20.4751 11.0302 20.6121 10.6996 20.8559 10.4558C21.0997 10.212 21.4303 10.075 21.7751 10.075C22.1199 10.075 22.4505 10.212 22.6943 10.4558C22.9381 10.6996 23.0751 11.0302 23.0751 11.375Z",
        fill: "#86B8CE"
      }
    ),
    /* @__PURE__ */ React30.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M11.3022 0H15.3478C17.7372 0 19.63 1.54972e-07 21.1107 0.1989C22.6343 0.4043 23.868 0.8359 24.8417 1.8083C26.0429 3.0108 26.4264 4.6202 26.5655 6.7093C27.3156 7.0382 27.8824 7.7363 27.9435 8.6203C27.95 8.6996 27.95 8.7841 27.95 8.8621V13.8879C27.95 13.9659 27.95 14.0504 27.9448 14.1284C27.8824 15.0124 27.3156 15.7118 26.5655 16.042C26.4264 18.1298 26.0429 19.7392 24.8417 20.9417C23.868 21.9141 22.6343 22.3457 21.1107 22.5511C19.6287 22.75 17.7372 22.75 15.3478 22.75H11.3022C8.9128 22.75 7.02 22.75 5.5393 22.5511C4.0157 22.3457 2.782 21.9141 1.8083 20.9417C0.8359 19.968 0.4043 18.7343 0.1989 17.2107C0 15.7287 0 13.8372 0 11.4478V11.3022C0 8.9128 0 7.02 0.1989 5.5393C0.4043 4.0157 0.8359 2.782 1.8083 1.8083C2.782 0.8359 4.0157 0.4043 5.5393 0.1989C7.0213 1.54972e-07 8.9128 0 11.3022 0ZM24.5934 16.25H22.074C19.2855 16.25 16.8987 14.1336 16.8987 11.375C16.8987 8.6164 19.2855 6.5 22.0727 6.5H24.5921C24.4439 4.7567 24.1098 3.835 23.4611 3.1876C22.9112 2.6377 22.1572 2.3075 20.8494 2.132C19.5143 1.9526 17.7528 1.95 15.2737 1.95H11.3737C8.8946 1.95 7.1344 1.9526 5.7967 2.132C4.4902 2.3075 3.7362 2.6377 3.1863 3.1876C2.6364 3.7375 2.3062 4.4915 2.1307 5.7993C1.9513 7.1357 1.9487 8.8959 1.9487 11.375C1.9487 13.8541 1.9513 15.6156 2.1307 16.952C2.3062 18.2585 2.6364 19.0125 3.1863 19.5624C3.7362 20.1123 4.4902 20.4425 5.798 20.618C7.1344 20.7974 8.8946 20.8 11.3737 20.8H15.2737C17.7528 20.8 19.5143 20.7974 20.8507 20.618C22.1572 20.4425 22.9112 20.1123 23.4611 19.5624C24.1098 18.915 24.4452 17.9946 24.5934 16.25ZM25.5762 8.45H22.074C20.2228 8.45 18.8487 9.8267 18.8487 11.375C18.8487 12.9233 20.2228 14.3 22.0727 14.3H25.6061C25.8739 14.2831 25.9896 14.1024 25.9987 13.9932V8.7568C25.9896 8.6476 25.8739 8.4669 25.6061 8.4513L25.5762 8.45Z",
        fill: "white"
      }
    )
  );
};
var Wallet_default = Wallet;

// src/assets/icons/Explorer.tsx
import React31 from "react";
var Explorer = ({ width = 40, height = 40, fill = "black", ...rest }) => {
  return /* @__PURE__ */ React31.createElement(
    "svg",
    {
      width: "21",
      height: "24",
      viewBox: "0 0 21 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React31.createElement(
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
import React32 from "react";
var ExternalUrl = ({ width = 40, height = 40, fill = "black", ...rest }) => {
  return /* @__PURE__ */ React32.createElement(
    "svg",
    {
      width: "40",
      height: "40",
      viewBox: "0 0 40 40",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React32.createElement(
      "path",
      {
        d: "M19.1699 11.6226H15.4812C12.7198 11.6226 10.4812 13.8611 10.4812 16.6226V24C10.4812 26.7614 12.7198 29 15.4812 29H22.8586C25.6201 29 27.8586 26.7614 27.8586 24V20.3113",
        stroke: fill,
        strokeWidth: "2"
      }
    ),
    /* @__PURE__ */ React32.createElement("mask", { id: "path-2-inside-1_883_418", fill: "white" }, /* @__PURE__ */ React32.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M30.4872 9.53075C30.5107 9.22503 30.2561 8.97036 29.9503 8.99388L22.9271 9.53412C22.5012 9.56689 22.3099 10.0841 22.6119 10.3862L24.616 12.3902C24.8112 12.5855 24.8112 12.9021 24.616 13.0973L18.9543 18.7591C18.4661 19.2472 18.4661 20.0387 18.9543 20.5268C19.4424 21.015 20.2339 21.015 20.722 20.5268L26.3837 14.8651C26.579 14.6698 26.8956 14.6698 27.0908 14.8651L29.0949 16.8692C29.3969 17.1712 29.9142 16.9799 29.947 16.5539L30.4872 9.53075Z"
      }
    )),
    /* @__PURE__ */ React32.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M30.4872 9.53075C30.5107 9.22503 30.2561 8.97036 29.9503 8.99388L22.9271 9.53412C22.5012 9.56689 22.3099 10.0841 22.6119 10.3862L24.616 12.3902C24.8112 12.5855 24.8112 12.9021 24.616 13.0973L18.9543 18.7591C18.4661 19.2472 18.4661 20.0387 18.9543 20.5268C19.4424 21.015 20.2339 21.015 20.722 20.5268L26.3837 14.8651C26.579 14.6698 26.8956 14.6698 27.0908 14.8651L29.0949 16.8692C29.3969 17.1712 29.9142 16.9799 29.947 16.5539L30.4872 9.53075Z",
        fill
      }
    ),
    /* @__PURE__ */ React32.createElement(
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

// src/utils/constants.tsx
import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  polygonZkEvm,
  polygonZkEvmCardona,
  sepolia
} from "@reown/appkit/networks";
var ChainName = /* @__PURE__ */ ((ChainName3) => {
  ChainName3["ETHEREUM"] = "ETH";
  ChainName3["POLYGON"] = "POL";
  ChainName3["AVALANCHE"] = "AVX";
  ChainName3["SOLANA"] = "SOL";
  ChainName3["BSC"] = "BSC";
  ChainName3["ARBITRUM"] = "ARB";
  ChainName3["OPTIMISM"] = "OPT";
  ChainName3["POLYGON_ZKEVM"] = "ZKE";
  ChainName3["TRON"] = "TRX";
  ChainName3["FIAT"] = "FIAT";
  ChainName3["BTC"] = "BTC";
  return ChainName3;
})(ChainName || {});
var SupportedChainIdTestnet = /* @__PURE__ */ ((SupportedChainIdTestnet2) => {
  SupportedChainIdTestnet2[SupportedChainIdTestnet2["ETHEREUM"] = 11155111] = "ETHEREUM";
  SupportedChainIdTestnet2[SupportedChainIdTestnet2["POLYGON"] = 80002] = "POLYGON";
  SupportedChainIdTestnet2[SupportedChainIdTestnet2["AVALANCHE"] = 43113] = "AVALANCHE";
  SupportedChainIdTestnet2[SupportedChainIdTestnet2["BSC"] = 97] = "BSC";
  SupportedChainIdTestnet2[SupportedChainIdTestnet2["ARBITRUM"] = 421614] = "ARBITRUM";
  SupportedChainIdTestnet2[SupportedChainIdTestnet2["OPTIMISM"] = 11155420] = "OPTIMISM";
  SupportedChainIdTestnet2[SupportedChainIdTestnet2["POLYGON_ZKEM"] = 2442] = "POLYGON_ZKEM";
  return SupportedChainIdTestnet2;
})(SupportedChainIdTestnet || {});
var CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET = {
  ["ETH" /* ETHEREUM */]: mainnet,
  ["POL" /* POLYGON */]: polygon,
  ["AVX" /* AVALANCHE */]: avalanche,
  ["BSC" /* BSC */]: bsc,
  ["OPT" /* OPTIMISM */]: optimism,
  ["ARB" /* ARBITRUM */]: arbitrum,
  ["ZKE" /* POLYGON_ZKEVM */]: polygonZkEvm
};
var CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET = {
  ["ETH" /* ETHEREUM */]: sepolia,
  ["POL" /* POLYGON */]: polygonAmoy,
  ["AVX" /* AVALANCHE */]: avalancheFuji,
  ["BSC" /* BSC */]: bscTestnet,
  ["OPT" /* OPTIMISM */]: optimismSepolia,
  ["ARB" /* ARBITRUM */]: arbitrumSepolia,
  ["ZKE" /* POLYGON_ZKEVM */]: polygonZkEvmCardona
};
var CHAIN_NAMES_TO_IDS_TESTNET = {
  ["ETH" /* ETHEREUM */]: 11155111 /* ETHEREUM */,
  ["POL" /* POLYGON */]: 80002 /* POLYGON */,
  ["AVX" /* AVALANCHE */]: 43113 /* AVALANCHE */,
  ["BSC" /* BSC */]: 97 /* BSC */,
  ["OPT" /* OPTIMISM */]: 11155420 /* OPTIMISM */,
  ["ARB" /* ARBITRUM */]: 421614 /* ARBITRUM */,
  ["ZKE" /* POLYGON_ZKEVM */]: 2442 /* POLYGON_ZKEM */
};
var SupportedChainIdMainnet = /* @__PURE__ */ ((SupportedChainIdMainnet2) => {
  SupportedChainIdMainnet2[SupportedChainIdMainnet2["ETHEREUM"] = 1] = "ETHEREUM";
  SupportedChainIdMainnet2[SupportedChainIdMainnet2["POLYGON"] = 137] = "POLYGON";
  SupportedChainIdMainnet2[SupportedChainIdMainnet2["AVALANCHE"] = 43114] = "AVALANCHE";
  SupportedChainIdMainnet2[SupportedChainIdMainnet2["BSC"] = 56] = "BSC";
  SupportedChainIdMainnet2[SupportedChainIdMainnet2["ARBITRUM"] = 42161] = "ARBITRUM";
  SupportedChainIdMainnet2[SupportedChainIdMainnet2["OPTIMISM"] = 10] = "OPTIMISM";
  SupportedChainIdMainnet2[SupportedChainIdMainnet2["POLYGON_ZKEM"] = 1101] = "POLYGON_ZKEM";
  return SupportedChainIdMainnet2;
})(SupportedChainIdMainnet || {});
var CHAIN_NAMES_TO_IDS_MAINNET = {
  ["ETH" /* ETHEREUM */]: 1 /* ETHEREUM */,
  ["POL" /* POLYGON */]: 137 /* POLYGON */,
  ["AVX" /* AVALANCHE */]: 43114 /* AVALANCHE */,
  ["BSC" /* BSC */]: 56 /* BSC */,
  ["OPT" /* OPTIMISM */]: 10 /* OPTIMISM */,
  ["ARB" /* ARBITRUM */]: 42161 /* ARBITRUM */,
  ["ZKE" /* POLYGON_ZKEVM */]: 1101 /* POLYGON_ZKEM */
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
  ["BTC" /* BTC */]: "Bitcoin"
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
  ["Bitcoin"]: "BTC" /* BTC */
};
var CHAIN_NAMES_TO_EXPLORER_TESTNET = {
  ["ETH" /* ETHEREUM */]: "sepolia.etherscan.io",
  ["POL" /* POLYGON */]: "www.oklink.com/amoy",
  ["AVX" /* AVALANCHE */]: "testnet.snowtrace.io",
  ["SOL" /* SOLANA */]: "solscan.io",
  ["BSC" /* BSC */]: "testnet.bscscan.com",
  ["OPT" /* OPTIMISM */]: "sepolia-optimism.etherscan.io",
  ["ARB" /* ARBITRUM */]: "sepolia.arbiscan.io",
  ["ZKE" /* POLYGON_ZKEVM */]: "cardona-zkevm.polygonscan.com",
  ["TRX" /* TRON */]: "nile.tronscan.org/#",
  ["BTC" /* BTC */]: "mempool.space/testnet"
};
var CHAIN_NAMES_TO_EXPLORER_MAINNET = {
  ["ETH" /* ETHEREUM */]: "etherscan.io",
  ["POL" /* POLYGON */]: "polygonscan.com",
  ["AVX" /* AVALANCHE */]: "snowtrace.io",
  ["SOL" /* SOLANA */]: "solscan.io",
  ["BSC" /* BSC */]: "bscscan.com",
  ["OPT" /* OPTIMISM */]: "optimistic.etherscan.io",
  ["ARB" /* ARBITRUM */]: "arbiscan.io",
  ["ZKE" /* POLYGON_ZKEVM */]: "zkevm.polygonscan.com",
  ["TRX" /* TRON */]: "tronscan.org/#",
  ["BTC" /* BTC */]: "mempool.space"
};
var CHAIN_IDS_TO_NAMES_TESTNET = {
  [11155111 /* ETHEREUM */]: "ETH" /* ETHEREUM */,
  [80002 /* POLYGON */]: "POL" /* POLYGON */,
  [43113 /* AVALANCHE */]: "AVX" /* AVALANCHE */,
  [97 /* BSC */]: "BSC" /* BSC */,
  [11155420 /* OPTIMISM */]: "OPT" /* OPTIMISM */,
  [421614 /* ARBITRUM */]: "ARB" /* ARBITRUM */,
  [2442 /* POLYGON_ZKEM */]: "ZKE" /* POLYGON_ZKEVM */
};
var CHAIN_IDS_TO_NAMES_MAINNET = {
  [1 /* ETHEREUM */]: "ETH" /* ETHEREUM */,
  [137 /* POLYGON */]: "POL" /* POLYGON */,
  [43114 /* AVALANCHE */]: "AVX" /* AVALANCHE */,
  [56 /* BSC */]: "BSC" /* BSC */,
  [10 /* OPTIMISM */]: "OPT" /* OPTIMISM */,
  [42161 /* ARBITRUM */]: "ARB" /* ARBITRUM */,
  [1101 /* POLYGON_ZKEM */]: "ZKE" /* POLYGON_ZKEVM */
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
  }
];
var getNetworkOption = (id) => {
  const index = networkOptions.findIndex((item) => item.id === id);
  if (index < 0) return;
  return networkOptions[index];
};
var CLUSTER = "devnet";
var SOLANA_HOST = clusterApiUrl(CLUSTER);
var isEVMChain = (chainId) => chainId === "ETH" /* ETHEREUM */ || chainId === "POL" /* POLYGON */ || chainId === "AVX" /* AVALANCHE */ || chainId === "BSC" /* BSC */ || chainId === "OPT" /* OPTIMISM */ || chainId === "ARB" /* ARBITRUM */ || chainId === "ZKE" /* POLYGON_ZKEVM */;
var COIN_LIST = {
  USDK: {
    symbol: "USDK",
    icon: USDK_default
  },
  USDT: {
    symbol: "USDT",
    icon: USDT_default
  },
  USDC: {
    symbol: "USDC",
    icon: USDC_default
  },
  KEUR: {
    symbol: "KEUR",
    icon: KEUR_default
  },
  WBTC: {
    symbol: "WBTC",
    icon: BTC_default
  }
};
var TRON_USDK_OWNER_ADDRESS = "TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU";

// src/interface.tsx
var NetworkOptions = /* @__PURE__ */ ((NetworkOptions2) => {
  NetworkOptions2["testnet"] = "testnet";
  NetworkOptions2["mainnet"] = "mainnet";
  return NetworkOptions2;
})(NetworkOptions || {});
var ModeOptions = /* @__PURE__ */ ((ModeOptions2) => {
  ModeOptions2["payment"] = "payment";
  ModeOptions2["bridge"] = "bridge";
  ModeOptions2["status"] = "status";
  return ModeOptions2;
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
var { createSlice } = toolkitRaw;
var initialState = {
  networkOption: "testnet" /* testnet */,
  theme: {},
  tokenOptions: {},
  pendingTxs: 0,
  pendingTxData: [],
  kimaExplorerUrl: "https://explorer.kima.network",
  graphqlProviderQuery: "https://graphql.kima.finance",
  mode: "bridge" /* bridge */,
  sourceChain: "",
  targetChain: "",
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
  walletAutoConnect: true,
  provider: void 0,
  dAppOption: "none" /* None */,
  solanaProvider: void 0,
  tronProvider: void 0,
  submitted: false,
  amount: "",
  feeDeduct: false,
  errorHandler: () => void 0,
  closeHandler: () => void 0,
  successHandler: () => void 0,
  switchChainHandler: () => void 0,
  keplrHandler: () => void 0,
  initChainFromProvider: false,
  serviceFee: { totalFeeUsd: -1 },
  backendUrl: "",
  nodeProviderQuery: "",
  txId: -1,
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
    setWalletAutoConnect: (state, action) => {
      state.walletAutoConnect = action.payload;
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
    setErrorHandler: (state, action) => {
      state.errorHandler = action.payload;
    },
    setKeplrHandler: (state, action) => {
      state.keplrHandler = action.payload;
    },
    setCloseHandler: (state, action) => {
      state.closeHandler = action.payload;
    },
    setSwitchChainHandler: (state, action) => {
      state.switchChainHandler = action.payload;
    },
    setInitChainFromProvider: (state, action) => {
      state.initChainFromProvider = action.payload;
    },
    setSuccessHandler: (state, action) => {
      state.successHandler = action.payload;
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
    setNodeProviderQuery: (state, action) => {
      state.nodeProviderQuery = action.payload;
    },
    setGraphqlProviderQuery: (state, action) => {
      state.graphqlProviderQuery = action.payload;
    },
    setTxId: (state, action) => {
      state.txId = action.payload;
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
    }
  }
});
var {
  initialize,
  setNetworkOption,
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
  setWalletAutoConnect,
  setSubmitted,
  setTransactionOption,
  setAmount,
  setErrorHandler,
  setKeplrHandler,
  setCloseHandler,
  setSuccessHandler,
  setSwitchChainHandler,
  setInitChainFromProvider,
  setServiceFee,
  setMode,
  setFeeDeduct,
  setBackendUrl,
  setNodeProviderQuery,
  setGraphqlProviderQuery,
  setTxId,
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
  setPendingTxs
} = optionSlice.actions;
var optionSlice_default = optionSlice.reducer;

// src/store/pluginSlice.tsx
import { createSlice as createSlice2 } from "@reduxjs/toolkit";
var initialState2 = {
  plugins: {}
  // Empty record of plugins
};
var pluginSlice = createSlice2({
  name: "plugins",
  initialState: initialState2,
  reducers: {
    // Action to register a plugin with its metadata
    registerPlugin: (state, action) => {
      const { id, pluginData } = action.payload;
      state.plugins[id] = { id, pluginData };
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
var { registerPlugin, updatePluginData } = pluginSlice.actions;
var selectAllPlugins = (state) => Object.values(state.plugins.plugins);
var pluginReducer = pluginSlice.reducer;
var pluginSlice_default = pluginReducer;

// src/store/index.tsx
var store = configureStore({
  reducer: {
    option: optionSlice_default,
    plugins: pluginSlice_default
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ["option"]
      // Ignore serialization check for `option`
    }
  })
});
var store_default = store;

// src/pluginRegistry.ts
var pluginRegistry = {};
var initializePlugins = (plugins) => {
  for (const plugin of plugins) {
    const { data, provider } = plugin.initialize();
    console.log("initialized plugin::", data.id);
    registerPluginProvider(data.id, provider);
    store_default.dispatch(registerPlugin(data));
  }
};
var registerPluginProvider = (id, provider) => {
  if (pluginRegistry[id]) {
    console.warn(`Plugin provider with id "${id}" is already registered.`);
  }
  pluginRegistry[id] = provider;
};
var getPluginProvider = (id) => {
  return pluginRegistry[id];
};
var getAllPluginProviders = () => {
  return pluginRegistry;
};

// src/KimaProvider.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// plugins/evm/index.tsx
import React66 from "react";

// plugins/PluginBase.ts
var PluginBase = class {
  _store;
  data;
  fetchChains;
  // hooks
  useAllowance;
  useBalance;
  useTokenBalance;
  useWalletIsReady;
  constructor(args) {
    this._store = args.store;
    this.data = {
      id: args.id,
      pluginData: {
        networks: []
      }
    };
    this.fetchChains = args.fetchChains;
    this.useAllowance = args.useAllowance;
    this.useBalance = args.useBalance;
    this.useTokenBalance = args.useTokenBalance;
    this.useWalletIsReady = args.useWalletIsReady;
  }
  initialize = () => {
    this.getData();
    return {
      data: this.data,
      provider: this.Provider
    };
  };
  getData = async () => {
    try {
      const networks = await this.fetchChains();
      console.info(`${this.data.id} networks fetched:`, networks);
      this.data = {
        ...this.data,
        pluginData: {
          ...this.data.pluginData,
          networks
        }
      };
      this._store.dispatch(updatePluginData(this.data));
    } catch (error) {
      console.error(`Failed to fetch ${this.data.id} networks:`, error);
    }
  };
};

// plugins/evm/features/walletConnect/WalletProvider.tsx
import React33 from "react";

// src/contexts/useModal.tsx
import { createContext, useContext } from "react";
var ModalContext = createContext(null);
var useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// plugins/evm/config/modalConfig.ts
import { createAppKit } from "@reown/appkit/react";
import {
  arbitrum as arbitrum2,
  arbitrumSepolia as arbitrumSepolia2,
  avalanche as avalanche2,
  avalancheFuji as avalancheFuji2,
  bsc as bsc2,
  bscTestnet as bscTestnet2,
  mainnet as mainnet2,
  optimism as optimism2,
  optimismSepolia as optimismSepolia2,
  polygon as polygon2,
  polygonAmoy as polygonAmoy2,
  polygonZkEvm as polygonZkEvm2,
  polygonZkEvmCardona as polygonZkEvmCardona2,
  sepolia as sepolia2
} from "@reown/appkit/networks";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
var appkitMainnetChains = [
  mainnet2,
  bsc2,
  polygon2,
  arbitrum2,
  optimism2,
  avalanche2,
  polygonZkEvm2
];
var appkitTestnetChains = [
  sepolia2,
  bscTestnet2,
  polygonAmoy2,
  arbitrumSepolia2,
  optimismSepolia2,
  avalancheFuji2,
  polygonZkEvmCardona2
];
var metadata = {
  name: "Kima Transaction Widget",
  description: "Frontend widget for Kima integration for dApps",
  url: "https://kima.network",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};
var setupAppKit = (projectId, networkOption) => {
  const networks = networkOption === "mainnet" ? appkitMainnetChains : appkitTestnetChains;
  return createAppKit({
    adapters: [new Ethers5Adapter()],
    metadata,
    networks,
    projectId,
    // Use the provided or default project ID
    features: {
      analytics: false
      // Disable analytics as per previous configuration
    }
  });
};

// plugins/evm/features/walletConnect/WalletProvider.tsx
var WalletProvider = ({
  children,
  networkOption,
  walletConnectProjectId
}) => {
  return /* @__PURE__ */ React33.createElement(
    ModalContext.Provider,
    {
      value: setupAppKit(walletConnectProjectId, networkOption)
    },
    children
  );
};
var WalletProvider_default = WalletProvider;

// plugins/evm/assets/icons/Cross.tsx
import React34 from "react";

// plugins/evm/assets/icons/Minimize.tsx
import React35 from "react";

// plugins/evm/assets/icons/FooterLogo.tsx
import React36 from "react";

// plugins/evm/assets/icons/Check.tsx
import React37 from "react";

// plugins/evm/assets/icons/Warning.tsx
import React38 from "react";

// plugins/evm/assets/icons/ArrowRight.tsx
import React39 from "react";

// plugins/evm/assets/icons/Arrow.tsx
import React40 from "react";

// plugins/evm/assets/icons/Lock.tsx
import React41 from "react";

// plugins/evm/assets/icons/Ethereum.tsx
import React42 from "react";
var Ethereum2 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React42.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 22 36",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React42.createElement("path", { d: "M10.9966 13.3093V0L0 18.3307L10.9966 13.3093Z", fill: "#8A92B2" }),
    /* @__PURE__ */ React42.createElement(
      "path",
      {
        d: "M10.9966 24.8639V13.3093L0 18.3307L10.9966 24.8639ZM10.9966 13.3093L21.9933 18.3307L10.9966 0V13.3093Z",
        fill: "#62688F"
      }
    ),
    /* @__PURE__ */ React42.createElement(
      "path",
      {
        d: "M10.9966 13.3093V24.8639L21.9933 18.3307L10.9966 13.3093Z",
        fill: "#454A75"
      }
    ),
    /* @__PURE__ */ React42.createElement("path", { d: "M10.9966 26.9561L0 20.4297L10.9966 36V26.9561Z", fill: "#8A92B2" }),
    /* @__PURE__ */ React42.createElement("path", { d: "M22 20.4297L10.9966 26.9561V36L22 20.4297Z", fill: "#62688F" })
  );
};
var Ethereum_default2 = Ethereum2;

// plugins/evm/assets/icons/Solana.tsx
import React43 from "react";
var Solana2 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React43.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 26 21",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React43.createElement(
      "path",
      {
        d: "M22.2506 4.97063C22.1771 5.05109 22.0851 5.11367 21.984 5.14943C21.8828 5.19413 21.7725 5.21201 21.6622 5.21201H0.835479C0.0998792 5.21201 -0.277116 4.31801 0.237804 3.78161L3.65835 0.25032C3.73191 0.16986 3.82386 0.107281 3.9342 0.0625809C4.03534 0.017881 4.14568 0 4.25602 0H25.1655C25.9102 0 26.2781 0.902938 25.7539 1.43934L22.2506 4.97063ZM22.2506 20.7586C22.0943 20.9106 21.8828 21 21.6622 21H0.835479C0.0998792 21 -0.277116 20.1239 0.237804 19.6054L3.65835 16.1545C3.73191 16.0741 3.83305 16.0115 3.9342 15.9757C4.03534 15.931 4.14568 15.9132 4.25602 15.9132H25.1655C25.9102 15.9132 26.2781 16.7982 25.7539 17.3167L22.2506 20.7586ZM22.2506 8.19796C22.0943 8.04598 21.8828 7.95658 21.6622 7.95658H0.835479C0.0998792 7.95658 -0.277116 8.8327 0.237804 9.35121L3.65835 12.802C3.73191 12.8825 3.83305 12.9451 3.9342 12.9808C4.03534 13.0255 4.14568 13.0434 4.25602 13.0434H25.1655C25.9102 13.0434 26.2781 12.1584 25.7539 11.6398L22.2506 8.19796Z",
        fill: "url(#paint0_linear_721_5435)"
      }
    ),
    /* @__PURE__ */ React43.createElement("defs", null, /* @__PURE__ */ React43.createElement(
      "linearGradient",
      {
        id: "paint0_linear_721_5435",
        x1: "1.58985",
        y1: "21.2621",
        x2: "23.7184",
        y2: "-0.89642",
        gradientUnits: "userSpaceOnUse"
      },
      /* @__PURE__ */ React43.createElement("stop", { "stop-color": "#CF41E8" }),
      /* @__PURE__ */ React43.createElement("stop", { offset: "1", "stop-color": "#10F2B0" })
    ))
  );
};
var Solana_default2 = Solana2;

// plugins/evm/assets/icons/Polygon.tsx
import React44 from "react";
var Polygon2 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React44.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 25",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React44.createElement(
      "path",
      {
        d: "M22.7154 7.64095C22.1671 7.34421 21.4621 7.34421 20.8355 7.64095L16.4491 10.089L13.4726 11.6469L9.16449 14.095C8.61619 14.3917 7.91123 14.3917 7.2846 14.095L3.91645 12.1662C3.36815 11.8694 2.9765 11.276 2.9765 10.6083V6.89911C2.9765 6.30564 3.28982 5.71217 3.91645 5.34125L7.2846 3.48665C7.8329 3.18991 8.53786 3.18991 9.16449 3.48665L12.5326 5.41543C13.0809 5.71217 13.4726 6.30564 13.4726 6.97329V9.42136L16.4491 7.78932V5.26706C16.4491 4.67359 16.1358 4.08012 15.5091 3.7092L9.24282 0.222552C8.69452 -0.074184 7.98956 -0.074184 7.36292 0.222552L0.939948 3.78338C0.313316 4.08012 0 4.67359 0 5.26706V12.2404C0 12.8338 0.313316 13.4273 0.939948 13.7982L7.2846 17.2849C7.8329 17.5816 8.53786 17.5816 9.16449 17.2849L13.4726 14.911L16.4491 13.2789L20.7572 10.905C21.3055 10.6083 22.0104 10.6083 22.6371 10.905L26.0052 12.7596C26.5535 13.0564 26.9452 13.6499 26.9452 14.3175V18.0267C26.9452 18.6202 26.6319 19.2136 26.0052 19.5846L22.7154 21.4392C22.1671 21.7359 21.4621 21.7359 20.8355 21.4392L17.4674 19.5846C16.9191 19.2878 16.5274 18.6944 16.5274 18.0267V15.6528L13.5509 17.2849V19.7329C13.5509 20.3264 13.8642 20.9199 14.4909 21.2908L20.8355 24.7774C21.3838 25.0742 22.0888 25.0742 22.7154 24.7774L29.0601 21.2908C29.6084 20.9941 30 20.4006 30 19.7329V12.6855C30 12.092 29.6867 11.4985 29.0601 11.1276L22.7154 7.64095Z",
        fill: "#8247E5"
      }
    )
  );
};
var Polygon_default2 = Polygon2;

// plugins/evm/assets/icons/Polygon_zkEVM.tsx
import React45 from "react";

// plugins/evm/assets/icons/Loader.tsx
import React46 from "react";

// plugins/evm/assets/icons/Error.tsx
import React47 from "react";

// plugins/evm/assets/icons/Avalanche.tsx
import React48 from "react";
var Avalanche2 = ({ width = 29, height = 29, ...rest }) => {
  return /* @__PURE__ */ React48.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 30 29",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React48.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M29.8779 14.5C29.8779 22.5082 23.3854 29 15.3762 29C7.36707 29 0.874512 22.5082 0.874512 14.5C0.874512 6.49179 7.36707 0 15.3762 0C23.3854 0 29.8779 6.49179 29.8779 14.5ZM11.2669 20.2703H8.45247C7.86101 20.2703 7.56905 20.2703 7.39082 20.1563C7.19849 20.0316 7.08089 19.825 7.0666 19.597C7.05598 19.3869 7.20197 19.1303 7.49412 18.6175L14.4432 6.37035C14.7388 5.8502 14.8884 5.59032 15.0773 5.49397C15.2804 5.39068 15.5226 5.39068 15.7257 5.49397C15.9146 5.59013 16.0642 5.8502 16.3599 6.37035L17.7884 8.86373L17.7957 8.87647C18.1151 9.43446 18.2771 9.71732 18.3478 10.0143C18.4262 10.3384 18.4262 10.6804 18.3478 11.0046C18.2766 11.3038 18.1163 11.5888 17.7921 12.1551L14.1419 18.6067L14.1325 18.6233C13.811 19.186 13.6482 19.4709 13.4223 19.686C13.1764 19.9212 12.8808 20.0921 12.5566 20.1884C12.261 20.2703 11.9296 20.2703 11.2669 20.2703ZM18.3741 20.2703H22.4067C23.0017 20.2703 23.301 20.2703 23.4792 20.1529C23.6715 20.0281 23.7926 19.8179 23.8034 19.5901C23.8137 19.3868 23.6708 19.1402 23.3908 18.6571C23.3811 18.6407 23.3715 18.6239 23.3616 18.6069L21.3416 15.1516L21.3186 15.1126C21.0348 14.6326 20.8915 14.3903 20.7075 14.2967C20.5045 14.1934 20.2657 14.1934 20.0627 14.2967C19.8775 14.3928 19.7279 14.6458 19.4323 15.1551L17.4194 18.6104L17.4124 18.6224C17.1178 19.1309 16.9706 19.385 16.9813 19.5935C16.9955 19.8216 17.1131 20.0316 17.3055 20.1563C17.48 20.2703 17.7793 20.2703 18.3743 20.2703H18.3741Z",
        fill: "#E84142"
      }
    )
  );
};
var Avalanche_default2 = Avalanche2;

// plugins/evm/assets/icons/Arbitrum.tsx
import React49 from "react";
var Arbitrum2 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React49.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 33 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React49.createElement(
      "path",
      {
        d: "M2.84064 10.032V22.968C2.84064 23.7996 3.27629 24.552 4.00237 24.9744L15.2105 31.4424C15.9234 31.8516 16.8079 31.8516 17.5208 31.4424L28.7289 24.9744C29.4418 24.5652 29.8906 23.7996 29.8906 22.968V10.032C29.8906 9.2004 29.455 8.448 28.7289 8.0256L17.5208 1.5576C16.8079 1.1484 15.9234 1.1484 15.2105 1.5576L4.00237 8.0256C3.28949 8.4348 2.85384 9.2004 2.85384 10.032H2.84064Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ React49.createElement(
      "path",
      {
        d: "M18.8013 19.008L17.204 23.3904C17.1644 23.5092 17.1644 23.6412 17.204 23.7732L19.9499 31.3104L23.1315 29.4756L19.3162 19.008C19.2238 18.7704 18.8938 18.7704 18.8013 19.008Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ React49.createElement(
      "path",
      {
        d: "M22.0094 11.6424C21.917 11.4048 21.5869 11.4048 21.4945 11.6424L19.8971 16.0248C19.8575 16.1436 19.8575 16.2756 19.8971 16.4076L24.3989 28.7496L27.5804 26.9148L22.0094 11.6556V11.6424Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ React49.createElement(
      "path",
      {
        d: "M16.3592 2.046C16.4384 2.046 16.5176 2.0724 16.5836 2.112L28.7026 9.108C28.8479 9.1872 28.9271 9.3456 28.9271 9.504V23.496C28.9271 23.6544 28.8347 23.8128 28.7026 23.892L16.5836 30.888C16.5176 30.9276 16.4384 30.954 16.3592 30.954C16.28 30.954 16.2008 30.9276 16.1348 30.888L4.01574 23.892C3.87052 23.8128 3.79131 23.6544 3.79131 23.496V9.4908C3.79131 9.3324 3.88373 9.174 4.01574 9.0948L16.1348 2.0988C16.2008 2.0592 16.28 2.0328 16.3592 2.0328V2.046ZM16.3592 0C15.9235 0 15.5011 0.1056 15.105 0.33L2.98602 7.326C2.20713 7.7748 1.73187 8.5932 1.73187 9.4908V23.4828C1.73187 24.3804 2.20713 25.1988 2.98602 25.6476L15.105 32.6436C15.4879 32.868 15.9235 32.9736 16.3592 32.9736C16.7948 32.9736 17.2173 32.868 17.6133 32.6436L29.7324 25.6476C30.5113 25.1988 30.9865 24.3804 30.9865 23.4828V9.4908C30.9865 8.5932 30.5113 7.7748 29.7324 7.326L17.6001 0.33C17.2173 0.1056 16.7816 0 16.346 0H16.3592Z",
        fill: "#9DCCED"
      }
    ),
    /* @__PURE__ */ React49.createElement(
      "path",
      {
        d: "M8.3327 28.7628L9.45483 25.7004L11.6991 27.5616L9.60005 29.4888L8.3327 28.7628Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ React49.createElement(
      "path",
      {
        d: "M15.3295 8.5008H12.2535C12.0291 8.5008 11.8178 8.646 11.7386 8.8572L5.15106 26.9148L8.33264 28.7496L15.5935 8.8572C15.6595 8.6724 15.5275 8.4876 15.3427 8.4876L15.3295 8.5008Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ React49.createElement(
      "path",
      {
        d: "M20.7157 8.5008H17.6397C17.4153 8.5008 17.2041 8.646 17.1249 8.8572L9.59998 29.4756L12.7815 31.3104L20.9665 8.8572C21.0325 8.6724 20.9005 8.4876 20.7157 8.4876V8.5008Z",
        fill: "white"
      }
    )
  );
};
var Arbitrum_default2 = Arbitrum2;

// plugins/evm/assets/icons/Optimism.tsx
import React50 from "react";
var Optimism2 = ({ width = 31, height = 30, ...rest }) => {
  return /* @__PURE__ */ React50.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 31 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React50.createElement(
      "path",
      {
        d: "M15.8719 30C24.1572 30 30.8737 23.2843 30.8737 15C30.8737 6.71573 24.1572 0 15.8719 0C7.5867 0 0.870178 6.71573 0.870178 15C0.870178 23.2843 7.5867 30 15.8719 30Z",
        fill: "#FF0420"
      }
    ),
    /* @__PURE__ */ React50.createElement(
      "path",
      {
        d: "M11.4976 18.984C10.6035 18.984 9.87137 18.774 9.3013 18.354C8.73723 17.928 8.4552 17.316 8.4552 16.53C8.4552 16.362 8.4732 16.164 8.50921 15.924C8.60522 15.384 8.74323 14.736 8.92325 13.974C9.43331 11.91 10.7535 10.878 12.8777 10.878C13.4538 10.878 13.9758 10.974 14.4319 11.172C14.888 11.358 15.248 11.646 15.512 12.03C15.7761 12.408 15.9081 12.858 15.9081 13.38C15.9081 13.536 15.8901 13.734 15.8541 13.974C15.7401 14.64 15.608 15.294 15.446 15.924C15.182 16.95 14.7319 17.724 14.0839 18.234C13.4418 18.738 12.5777 18.984 11.4976 18.984ZM11.6596 17.364C12.0796 17.364 12.4337 17.238 12.7277 16.992C13.0277 16.746 13.2438 16.368 13.3698 15.852C13.5438 15.144 13.6758 14.532 13.7658 14.004C13.7958 13.848 13.8138 13.686 13.8138 13.518C13.8138 12.834 13.4598 12.492 12.7457 12.492C12.3257 12.492 11.9656 12.618 11.6656 12.864C11.3715 13.11 11.1615 13.488 11.0355 14.004C10.8975 14.508 10.7655 15.12 10.6275 15.852C10.5975 16.002 10.5795 16.158 10.5795 16.326C10.5734 17.022 10.9395 17.364 11.6596 17.364Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ React50.createElement(
      "path",
      {
        d: "M16.43 18.876C16.346 18.876 16.286 18.852 16.238 18.798C16.202 18.738 16.19 18.672 16.202 18.594L17.7562 11.274C17.7682 11.19 17.8102 11.124 17.8822 11.07C17.9482 11.016 18.0202 10.992 18.0982 10.992H21.0926C21.9267 10.992 22.5928 11.166 23.0968 11.508C23.6069 11.856 23.8649 12.354 23.8649 13.008C23.8649 13.194 23.8409 13.392 23.7989 13.596C23.6129 14.46 23.2348 15.096 22.6588 15.51C22.0947 15.924 21.3206 16.128 20.3365 16.128H18.8183L18.3023 18.594C18.2843 18.678 18.2483 18.744 18.1762 18.798C18.1102 18.852 18.0382 18.876 17.9602 18.876H16.43ZM20.4145 14.574C20.7325 14.574 21.0026 14.49 21.2366 14.316C21.4766 14.142 21.6326 13.896 21.7107 13.572C21.7347 13.446 21.7467 13.332 21.7467 13.236C21.7467 13.02 21.6807 12.852 21.5546 12.738C21.4286 12.618 21.2066 12.558 20.9006 12.558H19.5504L19.1244 14.574H20.4145Z",
        fill: "white"
      }
    )
  );
};
var Optimism_default2 = Optimism2;

// plugins/evm/assets/icons/USDC.tsx
import React51 from "react";
var USDC2 = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ React51.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React51.createElement("rect", { width: "37", height: "37", fill: "url(#pattern4)" }),
    /* @__PURE__ */ React51.createElement("defs", null, /* @__PURE__ */ React51.createElement(
      "pattern",
      {
        id: "pattern4",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ React51.createElement("use", { href: "#image0_214_308", transform: "scale(0.00552486)" })
    ), /* @__PURE__ */ React51.createElement(
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
var USDC_default2 = USDC2;

// plugins/evm/assets/icons/USDT.tsx
import React52 from "react";
var USDT3 = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ React52.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React52.createElement("rect", { width: "37", height: "37", fill: "url(#pattern5)" }),
    /* @__PURE__ */ React52.createElement("defs", null, /* @__PURE__ */ React52.createElement(
      "pattern",
      {
        id: "pattern5",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ React52.createElement("use", { href: "#image0_214_312", transform: "scale(0.00390625)" })
    ), /* @__PURE__ */ React52.createElement(
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
var USDT_default2 = USDT3;

// plugins/evm/assets/icons/USDK.tsx
import React53 from "react";
var USDT4 = ({ width = 23, height = 23, ...rest }) => {
  return /* @__PURE__ */ React53.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 23 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React53.createElement(
      "path",
      {
        d: "M21.7206 25.7417C20.9608 25.001 19.9922 24.6072 19.0104 24.5498H19.0131C15.2454 24.4272 14.705 21.3028 14.705 20.5151C14.705 19.6545 15.3029 16.6395 19.0052 16.5222C19.9869 16.4674 20.9556 16.071 21.7154 15.3303C23.389 13.7002 23.4256 11.0243 21.7937 9.35256C20.9687 8.50494 19.8721 8.07982 18.7755 8.07461H18.7467C17.6867 8.07722 16.6266 8.47625 15.8068 9.27432C14.9086 10.148 14.5326 11.3217 14.5326 12.4823C14.5326 13.4994 13.859 16.2874 10.7285 16.2874C9.55091 16.2874 8.31332 16.6317 7.41253 17.555C7.37337 17.5941 7.34204 17.641 7.30548 17.6828V17.6671C7.09138 17.8914 7.04961 17.7141 7.05222 17.5915V0.578993C7.05222 0.2582 6.79373 0 6.47259 0H0.579635C0.258486 0 0 0.2582 0 0.578993V31.7872C0 32.108 0.258486 32.3662 0.579635 32.3662H6.47781C6.79896 32.3662 7.05744 32.108 7.05744 31.7872V23.4883C7.05744 23.3658 7.09922 23.1884 7.31593 23.4127V23.3997C7.34987 23.4388 7.37859 23.4831 7.41514 23.5222C8.31854 24.4481 9.53525 24.7898 10.7363 24.7898C13.8695 24.7898 14.5405 27.9403 14.5405 28.595C14.5405 29.4947 14.9191 30.9292 15.8146 31.8003C16.6371 32.601 17.7024 33 18.765 33H18.7676C19.8695 33 20.9687 32.5723 21.799 31.722C22.5979 30.9031 22.9974 29.8442 23 28.7853V28.7593C22.9974 27.6639 22.5692 26.5685 21.7206 25.7443",
        fill: "#86B8CE"
      }
    )
  );
};
var USDK_default2 = USDT4;

// plugins/evm/assets/icons/Fuse.tsx
import React54 from "react";

// plugins/evm/assets/icons/Celo.tsx
import React55 from "react";

// plugins/evm/assets/icons/GoodDollar.tsx
import React56 from "react";

// plugins/evm/assets/icons/Copy.tsx
import React57 from "react";

// plugins/evm/assets/icons/Bank.tsx
import React58 from "react";
var Bank2 = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ React58.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 256 256",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React58.createElement("defs", null),
    /* @__PURE__ */ React58.createElement(
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
      /* @__PURE__ */ React58.createElement(
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
var Bank_default2 = Bank2;

// plugins/evm/assets/icons/BSC.tsx
import React59 from "react";
var BNB2 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React59.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React59.createElement(
      "path",
      {
        d: "M9.17376 12.6062L15 6.78L20.829 12.6088L24.219 9.21876L15 0L5.784 9.216L9.17388 12.606M0 15L3.39012 11.6094L6.78 14.9993L3.38988 18.3894L0 15ZM9.17376 17.3941L15 23.22L20.8289 17.3914L24.2207 20.7796L24.219 20.7814L15 30L5.784 20.784L5.7792 20.7792L9.17412 17.3938M23.22 15.0014L26.6101 11.6113L30 15.0012L26.61 18.3913L23.22 15.0014Z",
        fill: "#F3BA2F"
      }
    ),
    /* @__PURE__ */ React59.createElement(
      "path",
      {
        d: "M18.4383 14.9981H18.4397L15.0001 11.5582L12.4576 14.0999L12.1655 14.3921L11.5631 14.9947L11.5583 14.9993L11.5631 15.0043L15.0001 18.4417L18.44 15.0017L18.4417 14.9998L18.4385 14.9981",
        fill: "#F3BA2F"
      }
    )
  );
};
var BSC_default2 = BNB2;

// plugins/evm/assets/icons/KEUR.tsx
import React60 from "react";
var KEUR2 = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ React60.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React60.createElement("g", { fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ React60.createElement("circle", { cx: "16", cy: "16", fill: "#0f8ff8", r: "16" }), /* @__PURE__ */ React60.createElement(
      "path",
      {
        d: "M8 19.004L8.81 17h.857a16.279 16.279 0 01-.034-1.03c0-.448.019-.864.056-1.25H8l.81-2.003h1.274C11.27 8.906 13.944 7 18.103 7c1.367 0 2.666.177 3.897.532v2.524a8.92 8.92 0 00-3.683-.776c-2.493 0-4.096 1.146-4.81 3.438h7.423l-.81 2.003h-7.097a6.938 6.938 0 00-.056.995c0 .479.015.907.045 1.285h6.183l-.8 2.003H13.44c.533 1.389 1.183 2.355 1.949 2.9.765.544 1.858.816 3.277.816 1.014 0 2.125-.247 3.334-.741v2.373c-1.149.432-2.515.648-4.1.648-4.167 0-6.803-1.999-7.906-5.996z",
        fill: "#ffffff"
      }
    ))
  );
};
var KEUR_default2 = KEUR2;

// plugins/evm/assets/icons/Tron.tsx
import React61 from "react";
var Celo = ({ width = 30, height = 28, ...rest }) => {
  return /* @__PURE__ */ React61.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 29 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React61.createElement(
      "path",
      {
        d: "M28.6056 9.03778C27.1753 7.73936 25.1967 5.75657 23.5853 4.35034L23.4899 4.28472C23.3313 4.15946 23.1524 4.06122 22.9607 3.9941C19.0751 3.28161 0.99166 -0.0417889 0.638858 0.000398088C0.540001 0.0140104 0.445508 0.0492499 0.362337 0.103522L0.271753 0.173833C0.160212 0.285207 0.0754953 0.419757 0.023838 0.567578L0 0.628515V0.961323V1.01288C2.03576 6.58625 10.0739 24.8438 11.6568 29.1281C11.7521 29.4188 11.9333 29.9719 12.2718 30H12.3481C12.5292 30 13.3016 28.9969 13.3016 28.9969C13.3016 28.9969 27.1085 12.5346 28.5054 10.7815C28.6863 10.5656 28.8459 10.3333 28.9822 10.0878C29.017 9.89567 29.0006 9.69799 28.9346 9.51398C28.8686 9.32998 28.7552 9.16591 28.6056 9.03778ZM16.8439 10.9549L22.7367 6.15032L26.1932 9.28152L16.8439 10.9549ZM14.5555 10.6409L4.41002 2.46599L20.8249 5.44251L14.5555 10.6409ZM15.4708 12.783L25.8547 11.1378L13.9834 25.2001L15.4708 12.783ZM3.03219 3.2816L13.7068 12.1877L12.1621 25.2094L3.03219 3.2816Z",
        fill: "#FF060A"
      }
    )
  );
};
var Tron_default2 = Celo;

// plugins/evm/assets/icons/BTC.tsx
import React62 from "react";
var BTC2 = ({ width = 28, height = 28, ...rest }) => {
  return /* @__PURE__ */ React62.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 21 28",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React62.createElement(
      "path",
      {
        d: "M19.4041 8.61541C19.6137 10.6571 18.8511 12.1042 17.1161 12.9568C18.4783 13.2709 19.4972 13.8486 20.1725 14.69C20.8477 15.5313 21.1099 16.7318 20.9584 18.291C20.8769 19.0875 20.6877 19.7886 20.3908 20.3944C20.0939 21.0002 19.7184 21.4994 19.2642 21.892C18.8101 22.2846 18.2455 22.6128 17.5701 22.8764C16.8948 23.1401 16.1873 23.3335 15.448 23.4568C14.7086 23.5801 13.8615 23.6643 12.9068 23.7092V27.9999H10.2171V23.7765C9.28563 23.7765 8.57533 23.7709 8.08629 23.7596V28H5.39686V23.7091C5.1873 23.7091 4.87292 23.7063 4.4537 23.7007C4.03446 23.6951 3.71429 23.6922 3.49317 23.6922H0L0.541458 20.6129H2.48022C3.06236 20.6129 3.40008 20.3269 3.49317 19.7547V8.14428C3.34184 7.38139 2.82372 7.00008 1.93876 7.00008H0V4.2404L3.70272 4.25727C4.44792 4.25727 5.01271 4.2517 5.39689 4.2404V0H8.08663V4.15628C9.04139 4.13379 9.75169 4.12265 10.2174 4.12265V0H12.9071V4.2404C13.827 4.31895 14.642 4.44514 15.3523 4.61899C16.0626 4.79283 16.7205 5.04522 17.3259 5.37613C17.9314 5.70705 18.4117 6.14459 18.7669 6.68857C19.1218 7.23272 19.3343 7.87501 19.4041 8.61541ZM15.649 17.786C15.649 17.3821 15.5617 17.0231 15.387 16.709C15.2124 16.395 14.9969 16.1369 14.7409 15.935C14.4847 15.7331 14.15 15.5619 13.7367 15.4218C13.3234 15.2815 12.942 15.1778 12.5927 15.1104C12.2434 15.0432 11.8126 14.9927 11.3003 14.959C10.7879 14.9254 10.3862 14.9085 10.0952 14.9085C9.80407 14.9085 9.42849 14.9141 8.9686 14.9254C8.50867 14.9366 8.23214 14.9423 8.13905 14.9423V20.6298C8.23218 20.6298 8.44765 20.6326 8.7852 20.6382C9.12292 20.6438 9.40223 20.6467 9.62353 20.6467C9.84482 20.6467 10.1532 20.6382 10.5492 20.6215C10.9451 20.6048 11.2856 20.5823 11.5709 20.5543C11.8562 20.5262 12.1879 20.4786 12.5665 20.4112C12.9449 20.344 13.2681 20.2654 13.5358 20.1756C13.8036 20.0858 14.0801 19.9681 14.3654 19.8222C14.6506 19.6764 14.8805 19.5081 15.0552 19.3174C15.2298 19.1267 15.3725 18.9023 15.483 18.6444C15.5934 18.3863 15.649 18.1002 15.649 17.786ZM14.409 9.77635C14.409 9.40621 14.3362 9.07799 14.1907 8.79197C14.0451 8.50596 13.8675 8.27031 13.658 8.08516C13.4484 7.90001 13.1689 7.74307 12.8197 7.61399C12.4704 7.48494 12.1502 7.3925 11.8591 7.33627C11.568 7.2802 11.21 7.23524 10.785 7.20161C10.3599 7.16799 10.0222 7.15397 9.77203 7.15954C9.52166 7.16511 9.20727 7.17068 8.82887 7.17641C8.45047 7.18198 8.22044 7.18487 8.13905 7.18487V12.3507C8.19728 12.3507 8.3982 12.3535 8.74153 12.3591C9.08503 12.3647 9.35574 12.3647 9.5537 12.3591C9.75165 12.3536 10.0427 12.3423 10.4269 12.3255C10.8111 12.3086 11.1313 12.2779 11.3875 12.2329C11.6436 12.188 11.9435 12.1263 12.287 12.0478C12.6305 11.9692 12.9128 11.8655 13.134 11.7364C13.3553 11.6074 13.5706 11.456 13.7802 11.2822C13.9897 11.1083 14.147 10.8923 14.2517 10.6343C14.3564 10.3764 14.409 10.0905 14.409 9.77635Z",
        fill: "#FDA806"
      }
    )
  );
};
var BTC_default2 = BTC2;

// plugins/evm/assets/icons/Wallet.tsx
import React63 from "react";

// plugins/evm/assets/icons/Explorer.tsx
import React64 from "react";

// plugins/evm/assets/icons/ExternalUrl.tsx
import React65 from "react";

// plugins/evm/utils/getChainIcon.tsx
var chainIcons = {
  ETH: Ethereum_default2,
  POL: Polygon_default2,
  AVX: Avalanche_default2,
  BSC: BSC_default2,
  BTC: BTC_default2,
  ARB: Arbitrum_default2,
  OPT: Optimism_default2,
  TRX: Tron_default2,
  SOL: Solana_default2,
  FIAT: Bank_default2,
  KEUR: KEUR_default2,
  USDC: USDC_default2,
  USDK: USDK_default2
};
var getChainIcon = (symbol) => {
  return chainIcons[symbol] || null;
};
var getChainIcon_default = getChainIcon;

// plugins/evm/utils/getTokenIcon.tsx
var COIN_LIST2 = {
  USDK: {
    symbol: "USDK",
    icon: USDK_default2
  },
  USDT: {
    symbol: "USDT",
    icon: USDT_default2
  },
  USDC: {
    symbol: "USDC",
    icon: USDC_default2
  },
  KEUR: {
    symbol: "KEUR",
    icon: KEUR_default2
  },
  WBTC: {
    symbol: "WBTC",
    icon: BTC_default2
  }
};
function getTokenIcon(symbol) {
  const token = COIN_LIST2[symbol];
  if (!token) {
    console.warn(`Token icon not found for symbol: ${symbol}`);
    return null;
  }
  return token.icon;
}

// plugins/evm/utils/getChainData.ts
async function getChainData(backendURL = "http://localhost:3001") {
  const _fetch = async (URL, method = "GET", JSON2 = true) => {
    const response = await fetch(URL, {
      method,
      headers: {
        Accept: "application/json"
      }
    });
    return JSON2 ? await response.json() : response;
  };
  const envURL = `${backendURL}/chains/env`;
  const { env } = await _fetch(envURL);
  const chainsURL = `${backendURL}/chains?env=${env}`;
  const chains = await _fetch(chainsURL);
  const formattedChains = [...chains].filter(
    (chain) => chain.compatibility === "EVM" && chain.shortName !== "TRX"
  ).map(async (chain) => {
    const { name, shortName: symbol, supportedTokens } = chain;
    const icon = getChainIcon_default(symbol);
    const tokens = [...supportedTokens].filter((token) => token.symbol === "USDK").map((token) => {
      const { symbol: symbol2, address } = token;
      return { symbol: symbol2, address };
    });
    const tokensWithIcons = tokens.map((token) => ({
      ...token,
      icon: getTokenIcon(token.symbol)
      // Add token icon
    }));
    const pluginID = "EVM";
    const availableChainsURL = `${backendURL}/chains/get_available_chains/${symbol}`;
    const { Chains: chains2 } = await _fetch(availableChainsURL);
    const filteredChains = [...chains2].filter((chain2) => chain2 !== "BTC").sort();
    return {
      pluginID,
      name,
      symbol,
      tokens: tokensWithIcons,
      icon,
      chains: filteredChains
    };
  });
  const resolvedChains = await Promise.all(formattedChains);
  return resolvedChains;
}

// plugins/evm/core/hooks/useBalance.tsx
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";

// src/store/selectors.tsx
var selectNetworkOption = (state) => state.option.networkOption;
var selectTokenOptions = (state) => state.option.tokenOptions;
var selectTheme = (state) => state.option.theme;
var selectKimaExplorer = (state) => state.option.kimaExplorerUrl;
var selectSourceChain = (state) => state.option.sourceChain;
var selectTargetChain = (state) => state.option.targetChain;
var selectSourceAddress = (state) => state.option.sourceAddress;
var selectTargetAddress = (state) => state.option.targetAddress;
var selectBitcoinAddress = (state) => state.option.bitcoinAddress;
var selectSolanaConnectModal = (state) => state.option.solanaConnectModal;
var selectTronConnectModal = (state) => state.option.tronConnectModal;
var selectPendingTxs = (state) => state.option.pendingTxs;
var selectDappOption = (state) => state.option.dAppOption;
var selectWalletAutoConnect = (state) => state.option.walletAutoConnect;
var selectSubmitted = (state) => state.option.submitted;
var selectTransactionOption = (state) => state.option.transactionOption;
var selectAmount = (state) => state.option.amount;
var selectErrorHandler = (state) => state.option.errorHandler;
var selectKeplrHandler = (state) => state.option.keplrHandler;
var selectCloseHandler = (state) => state.option.closeHandler;
var selectSuccessHandler = (state) => state.option.successHandler;
var selectServiceFee = (state) => state.option.serviceFee;
var selectMode = (state) => state.option.mode;
var selectSourceCurrency = (state) => state.option.sourceCurrency;
var selectTargetCurrency = (state) => state.option.targetCurrency;
var selectCompliantOption = (state) => state.option.compliantOption;
var selectSourceCompliant = (state) => state.option.sourceCompliant;
var selectTargetCompliant = (state) => state.option.targetCompliant;
var selectBackendUrl = (state) => state.option.backendUrl;
var selectFeeDeduct = (state) => state.option.feeDeduct;
var selectNodeProviderQuery = (state) => state.option.nodeProviderQuery;
var selectGraphqlProviderQuery = (state) => state.option.graphqlProviderQuery;
var selectTargetChainFetching = (state) => state.option.targetNetworkFetching;
var selectTxId = (state) => state.option.txId;
var selectAccountDetailsModal = (state) => state.option.accountDetailsModal;
var selectUseFIAT = (state) => state.option.useFIAT;
var selectBankDetails = (state) => state.option.bankDetails;
var selectSignature = (state) => state.option.signature;

// plugins/evm/utils/constants.tsx
import { clusterApiUrl as clusterApiUrl2 } from "@solana/web3.js";
import {
  arbitrum as arbitrum3,
  arbitrumSepolia as arbitrumSepolia3,
  avalanche as avalanche3,
  avalancheFuji as avalancheFuji3,
  bsc as bsc3,
  bscTestnet as bscTestnet3,
  mainnet as mainnet3,
  optimism as optimism3,
  optimismSepolia as optimismSepolia3,
  polygon as polygon3,
  polygonAmoy as polygonAmoy3,
  polygonZkEvm as polygonZkEvm3,
  polygonZkEvmCardona as polygonZkEvmCardona3,
  sepolia as sepolia3
} from "@reown/appkit/networks";
var CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET2 = {
  ["ETH" /* ETHEREUM */]: mainnet3,
  ["POL" /* POLYGON */]: polygon3,
  ["AVX" /* AVALANCHE */]: avalanche3,
  ["BSC" /* BSC */]: bsc3,
  ["OPT" /* OPTIMISM */]: optimism3,
  ["ARB" /* ARBITRUM */]: arbitrum3,
  ["ZKE" /* POLYGON_ZKEVM */]: polygonZkEvm3
};
var CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET2 = {
  ["ETH" /* ETHEREUM */]: sepolia3,
  ["POL" /* POLYGON */]: polygonAmoy3,
  ["AVX" /* AVALANCHE */]: avalancheFuji3,
  ["BSC" /* BSC */]: bscTestnet3,
  ["OPT" /* OPTIMISM */]: optimismSepolia3,
  ["ARB" /* ARBITRUM */]: arbitrumSepolia3,
  ["ZKE" /* POLYGON_ZKEVM */]: polygonZkEvmCardona3
};
var CLUSTER2 = "devnet";
var SOLANA_HOST2 = clusterApiUrl2(CLUSTER2);
var isEVMChain2 = (chainId) => chainId === "ETH" /* ETHEREUM */ || chainId === "POL" /* POLYGON */ || chainId === "AVX" /* AVALANCHE */ || chainId === "BSC" /* BSC */ || chainId === "OPT" /* OPTIMISM */ || chainId === "ARB" /* ARBITRUM */ || chainId === "ZKE" /* POLYGON_ZKEVM */;

// plugins/evm/utils/ethereum/erc20ABI.json
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

// plugins/evm/helpers/functions.tsx
var formatterInt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});
var formatterFloat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 9
});
function isEmptyObject(arg) {
  return typeof arg === "object" && Object.keys(arg).length === 0;
}

// plugins/evm/core/hooks/useBalance.tsx
function useBalance() {
  const [balance, setBalance] = useState(0);
  const appkitAccountInfo = useAppKitAccount();
  const { address: signerAddress } = appkitAccountInfo || {};
  const { walletProvider } = useAppKitProvider("eip155");
  const errorHandler = useSelector(selectErrorHandler);
  const sourceChain = useSelector(selectSourceChain);
  const sourceCurrency = useSelector(selectSourceCurrency);
  const tokenOptions = useSelector(selectTokenOptions);
  const tokenAddress = useMemo(() => {
    if (isEmptyObject(tokenOptions) || sourceChain === "FIAT" /* FIAT */) return "";
    const coinOptions = tokenOptions[sourceCurrency];
    if (coinOptions && typeof coinOptions === "object") {
      return coinOptions[sourceChain];
    }
    return "";
  }, [sourceCurrency, sourceChain, tokenOptions]);
  useEffect(() => {
    setBalance(0);
  }, [sourceChain]);
  useEffect(() => {
    ;
    (async () => {
      if (!tokenAddress || !isEVMChain2(sourceChain) || !walletProvider) return;
      try {
        const provider = new ethers.providers.Web3Provider(
          walletProvider
        );
        const signer = provider.getSigner();
        if (!signer || !signerAddress) return;
        const erc20Contract = new Contract(tokenAddress, erc20ABI_default.abi, signer);
        const [decimals, userBalance] = await Promise.all([
          erc20Contract.decimals(),
          erc20Contract.balanceOf(signerAddress)
        ]);
        setBalance(+formatUnits(userBalance, decimals));
      } catch (error) {
        errorHandler(error);
      }
    })();
  }, [signerAddress, tokenAddress, sourceChain, walletProvider]);
  return useMemo(() => ({ balance }), [balance]);
}

// plugins/evm/core/hooks/useIsWalletReady.tsx
import { useCallback, useEffect as useEffect2, useMemo as useMemo2 } from "react";
import { useDispatch, useSelector as useSelector2 } from "react-redux";
import {
  useAppKitAccount as useAppKitAccount2,
  useAppKitNetwork,
  useAppKitProvider as useAppKitProvider2
} from "@reown/appkit/react";

// plugins/evm/core/contexts/useModal.tsx
import { createContext as createContext2, useContext as useContext2 } from "react";
var ModalContext2 = createContext2(null);
var useModal2 = () => {
  const context = useContext2(ModalContext2);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// plugins/evm/core/hooks/useIsWalletReady.tsx
import toast from "react-hot-toast";
function useIsWalletReady() {
  const dispatch = useDispatch();
  const { walletProvider: evmProvider } = useAppKitProvider2("eip155");
  const appkitAccountInfo = useAppKitAccount2();
  const { chainId: walletChainId } = useAppKitNetwork();
  const modal = useModal2();
  const { address: walletAddress, isConnected } = appkitAccountInfo || {};
  const sourceChain = useSelector2(selectSourceChain);
  const networkOption = useSelector2(selectNetworkOption);
  const correctEvmNetwork = useMemo2(() => {
    return networkOption === "mainnet" /* mainnet */ ? CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET2[sourceChain] : CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET2[sourceChain];
  }, [networkOption, sourceChain]);
  const switchNetwork = useCallback(async () => {
    if (evmProvider && correctEvmNetwork) {
      try {
        await modal.switchNetwork(correctEvmNetwork);
        toast.success(`Switched to ${correctEvmNetwork.name}`);
      } catch (e) {
        toast.error(`Failed to switch to ${correctEvmNetwork.name}`);
      }
    }
  }, [evmProvider, correctEvmNetwork, modal]);
  useEffect2(() => {
    if (!isConnected) {
      toast.error("Wallet not connected");
    } else if (walletChainId !== correctEvmNetwork?.id) {
      switchNetwork();
    }
  }, [isConnected, walletChainId, correctEvmNetwork, switchNetwork]);
  useEffect2(() => {
    isConnected && dispatch(setSourceAddress(walletAddress));
  }, [walletAddress, isConnected]);
  return useMemo2(
    () => ({
      isReady: isConnected && walletChainId === correctEvmNetwork?.id,
      statusMessage: isConnected ? walletChainId === correctEvmNetwork?.id ? "" : `Switching to ${correctEvmNetwork.name}...` : "Wallet not connected",
      walletAddress: isConnected ? walletAddress : void 0
    }),
    [isConnected, walletChainId, correctEvmNetwork, walletAddress]
  );
}
var useIsWalletReady_default = useIsWalletReady;

// plugins/evm/index.tsx
var EvmPlugin = class extends PluginBase {
  constructor(store2) {
    super({
      store: store2,
      id: "evm",
      fetchChains: getChainData,
      // provider: Provider,
      // TODO: implement approve hook
      useAllowance: () => ({
        isApproved: false,
        poolAddress: "",
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useBalance,
      useTokenBalance: useBalance,
      useWalletIsReady: useIsWalletReady_default
    });
  }
  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }) => {
    return /* @__PURE__ */ React66.createElement(
      WalletProvider_default,
      {
        networkOption,
        walletConnectProjectId
      },
      children
    );
  };
};
var evmPlugin = new EvmPlugin(store);
var evm_default = evmPlugin;

// plugins/solana/index.tsx
import React100 from "react";

// plugins/solana/features/walletConnect/WalletProvider.tsx
import React67 from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";

// plugins/solana/utils/constants.tsx
import { clusterApiUrl as clusterApiUrl3 } from "@solana/web3.js";
function getHostEndpoint(networkOption) {
  console.log("network option: ", networkOption);
  return networkOption === "mainnet" ? "https://solana-rpc.publicnode.com" : clusterApiUrl3("devnet");
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
  console.info(
    `WalletProvider initialized with projectId: ${walletConnectProjectId}`
  );
  return /* @__PURE__ */ React67.createElement(ConnectionProvider, { endpoint }, /* @__PURE__ */ React67.createElement(
    SolanaWalletProvider,
    {
      wallets: [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new CloverWalletAdapter(),
        new Coin98WalletAdapter(),
        new SolongWalletAdapter(),
        new TorusWalletAdapter()
      ],
      autoConnect: true
    },
    children
  ));
};
var WalletProvider_default2 = WalletProvider2;

// plugins/solana/assets/icons/Cross.tsx
import React68 from "react";

// plugins/solana/assets/icons/Minimize.tsx
import React69 from "react";

// plugins/solana/assets/icons/FooterLogo.tsx
import React70 from "react";

// plugins/solana/assets/icons/Check.tsx
import React71 from "react";

// plugins/solana/assets/icons/Warning.tsx
import React72 from "react";

// plugins/solana/assets/icons/ArrowRight.tsx
import React73 from "react";

// plugins/solana/assets/icons/Arrow.tsx
import React74 from "react";

// plugins/solana/assets/icons/Lock.tsx
import React75 from "react";

// plugins/solana/assets/icons/Ethereum.tsx
import React76 from "react";
var Ethereum3 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React76.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 22 36",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React76.createElement("path", { d: "M10.9966 13.3093V0L0 18.3307L10.9966 13.3093Z", fill: "#8A92B2" }),
    /* @__PURE__ */ React76.createElement(
      "path",
      {
        d: "M10.9966 24.8639V13.3093L0 18.3307L10.9966 24.8639ZM10.9966 13.3093L21.9933 18.3307L10.9966 0V13.3093Z",
        fill: "#62688F"
      }
    ),
    /* @__PURE__ */ React76.createElement(
      "path",
      {
        d: "M10.9966 13.3093V24.8639L21.9933 18.3307L10.9966 13.3093Z",
        fill: "#454A75"
      }
    ),
    /* @__PURE__ */ React76.createElement("path", { d: "M10.9966 26.9561L0 20.4297L10.9966 36V26.9561Z", fill: "#8A92B2" }),
    /* @__PURE__ */ React76.createElement("path", { d: "M22 20.4297L10.9966 26.9561V36L22 20.4297Z", fill: "#62688F" })
  );
};
var Ethereum_default3 = Ethereum3;

// plugins/solana/assets/icons/Solana.tsx
import React77 from "react";
var Solana3 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React77.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 26 21",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React77.createElement(
      "path",
      {
        d: "M22.2506 4.97063C22.1771 5.05109 22.0851 5.11367 21.984 5.14943C21.8828 5.19413 21.7725 5.21201 21.6622 5.21201H0.835479C0.0998792 5.21201 -0.277116 4.31801 0.237804 3.78161L3.65835 0.25032C3.73191 0.16986 3.82386 0.107281 3.9342 0.0625809C4.03534 0.017881 4.14568 0 4.25602 0H25.1655C25.9102 0 26.2781 0.902938 25.7539 1.43934L22.2506 4.97063ZM22.2506 20.7586C22.0943 20.9106 21.8828 21 21.6622 21H0.835479C0.0998792 21 -0.277116 20.1239 0.237804 19.6054L3.65835 16.1545C3.73191 16.0741 3.83305 16.0115 3.9342 15.9757C4.03534 15.931 4.14568 15.9132 4.25602 15.9132H25.1655C25.9102 15.9132 26.2781 16.7982 25.7539 17.3167L22.2506 20.7586ZM22.2506 8.19796C22.0943 8.04598 21.8828 7.95658 21.6622 7.95658H0.835479C0.0998792 7.95658 -0.277116 8.8327 0.237804 9.35121L3.65835 12.802C3.73191 12.8825 3.83305 12.9451 3.9342 12.9808C4.03534 13.0255 4.14568 13.0434 4.25602 13.0434H25.1655C25.9102 13.0434 26.2781 12.1584 25.7539 11.6398L22.2506 8.19796Z",
        fill: "url(#paint0_linear_721_5435)"
      }
    ),
    /* @__PURE__ */ React77.createElement("defs", null, /* @__PURE__ */ React77.createElement(
      "linearGradient",
      {
        id: "paint0_linear_721_5435",
        x1: "1.58985",
        y1: "21.2621",
        x2: "23.7184",
        y2: "-0.89642",
        gradientUnits: "userSpaceOnUse"
      },
      /* @__PURE__ */ React77.createElement("stop", { "stop-color": "#CF41E8" }),
      /* @__PURE__ */ React77.createElement("stop", { offset: "1", "stop-color": "#10F2B0" })
    ))
  );
};
var Solana_default3 = Solana3;

// plugins/solana/assets/icons/Polygon.tsx
import React78 from "react";
var Polygon3 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React78.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 25",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React78.createElement(
      "path",
      {
        d: "M22.7154 7.64095C22.1671 7.34421 21.4621 7.34421 20.8355 7.64095L16.4491 10.089L13.4726 11.6469L9.16449 14.095C8.61619 14.3917 7.91123 14.3917 7.2846 14.095L3.91645 12.1662C3.36815 11.8694 2.9765 11.276 2.9765 10.6083V6.89911C2.9765 6.30564 3.28982 5.71217 3.91645 5.34125L7.2846 3.48665C7.8329 3.18991 8.53786 3.18991 9.16449 3.48665L12.5326 5.41543C13.0809 5.71217 13.4726 6.30564 13.4726 6.97329V9.42136L16.4491 7.78932V5.26706C16.4491 4.67359 16.1358 4.08012 15.5091 3.7092L9.24282 0.222552C8.69452 -0.074184 7.98956 -0.074184 7.36292 0.222552L0.939948 3.78338C0.313316 4.08012 0 4.67359 0 5.26706V12.2404C0 12.8338 0.313316 13.4273 0.939948 13.7982L7.2846 17.2849C7.8329 17.5816 8.53786 17.5816 9.16449 17.2849L13.4726 14.911L16.4491 13.2789L20.7572 10.905C21.3055 10.6083 22.0104 10.6083 22.6371 10.905L26.0052 12.7596C26.5535 13.0564 26.9452 13.6499 26.9452 14.3175V18.0267C26.9452 18.6202 26.6319 19.2136 26.0052 19.5846L22.7154 21.4392C22.1671 21.7359 21.4621 21.7359 20.8355 21.4392L17.4674 19.5846C16.9191 19.2878 16.5274 18.6944 16.5274 18.0267V15.6528L13.5509 17.2849V19.7329C13.5509 20.3264 13.8642 20.9199 14.4909 21.2908L20.8355 24.7774C21.3838 25.0742 22.0888 25.0742 22.7154 24.7774L29.0601 21.2908C29.6084 20.9941 30 20.4006 30 19.7329V12.6855C30 12.092 29.6867 11.4985 29.0601 11.1276L22.7154 7.64095Z",
        fill: "#8247E5"
      }
    )
  );
};
var Polygon_default3 = Polygon3;

// plugins/solana/assets/icons/Polygon_zkEVM.tsx
import React79 from "react";

// plugins/solana/assets/icons/Loader.tsx
import React80 from "react";

// plugins/solana/assets/icons/Error.tsx
import React81 from "react";

// plugins/solana/assets/icons/Avalanche.tsx
import React82 from "react";
var Avalanche3 = ({ width = 29, height = 29, ...rest }) => {
  return /* @__PURE__ */ React82.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 30 29",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React82.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M29.8779 14.5C29.8779 22.5082 23.3854 29 15.3762 29C7.36707 29 0.874512 22.5082 0.874512 14.5C0.874512 6.49179 7.36707 0 15.3762 0C23.3854 0 29.8779 6.49179 29.8779 14.5ZM11.2669 20.2703H8.45247C7.86101 20.2703 7.56905 20.2703 7.39082 20.1563C7.19849 20.0316 7.08089 19.825 7.0666 19.597C7.05598 19.3869 7.20197 19.1303 7.49412 18.6175L14.4432 6.37035C14.7388 5.8502 14.8884 5.59032 15.0773 5.49397C15.2804 5.39068 15.5226 5.39068 15.7257 5.49397C15.9146 5.59013 16.0642 5.8502 16.3599 6.37035L17.7884 8.86373L17.7957 8.87647C18.1151 9.43446 18.2771 9.71732 18.3478 10.0143C18.4262 10.3384 18.4262 10.6804 18.3478 11.0046C18.2766 11.3038 18.1163 11.5888 17.7921 12.1551L14.1419 18.6067L14.1325 18.6233C13.811 19.186 13.6482 19.4709 13.4223 19.686C13.1764 19.9212 12.8808 20.0921 12.5566 20.1884C12.261 20.2703 11.9296 20.2703 11.2669 20.2703ZM18.3741 20.2703H22.4067C23.0017 20.2703 23.301 20.2703 23.4792 20.1529C23.6715 20.0281 23.7926 19.8179 23.8034 19.5901C23.8137 19.3868 23.6708 19.1402 23.3908 18.6571C23.3811 18.6407 23.3715 18.6239 23.3616 18.6069L21.3416 15.1516L21.3186 15.1126C21.0348 14.6326 20.8915 14.3903 20.7075 14.2967C20.5045 14.1934 20.2657 14.1934 20.0627 14.2967C19.8775 14.3928 19.7279 14.6458 19.4323 15.1551L17.4194 18.6104L17.4124 18.6224C17.1178 19.1309 16.9706 19.385 16.9813 19.5935C16.9955 19.8216 17.1131 20.0316 17.3055 20.1563C17.48 20.2703 17.7793 20.2703 18.3743 20.2703H18.3741Z",
        fill: "#E84142"
      }
    )
  );
};
var Avalanche_default3 = Avalanche3;

// plugins/solana/assets/icons/Arbitrum.tsx
import React83 from "react";
var Arbitrum3 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React83.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 33 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M2.84064 10.032V22.968C2.84064 23.7996 3.27629 24.552 4.00237 24.9744L15.2105 31.4424C15.9234 31.8516 16.8079 31.8516 17.5208 31.4424L28.7289 24.9744C29.4418 24.5652 29.8906 23.7996 29.8906 22.968V10.032C29.8906 9.2004 29.455 8.448 28.7289 8.0256L17.5208 1.5576C16.8079 1.1484 15.9234 1.1484 15.2105 1.5576L4.00237 8.0256C3.28949 8.4348 2.85384 9.2004 2.85384 10.032H2.84064Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M18.8013 19.008L17.204 23.3904C17.1644 23.5092 17.1644 23.6412 17.204 23.7732L19.9499 31.3104L23.1315 29.4756L19.3162 19.008C19.2238 18.7704 18.8938 18.7704 18.8013 19.008Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M22.0094 11.6424C21.917 11.4048 21.5869 11.4048 21.4945 11.6424L19.8971 16.0248C19.8575 16.1436 19.8575 16.2756 19.8971 16.4076L24.3989 28.7496L27.5804 26.9148L22.0094 11.6556V11.6424Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M16.3592 2.046C16.4384 2.046 16.5176 2.0724 16.5836 2.112L28.7026 9.108C28.8479 9.1872 28.9271 9.3456 28.9271 9.504V23.496C28.9271 23.6544 28.8347 23.8128 28.7026 23.892L16.5836 30.888C16.5176 30.9276 16.4384 30.954 16.3592 30.954C16.28 30.954 16.2008 30.9276 16.1348 30.888L4.01574 23.892C3.87052 23.8128 3.79131 23.6544 3.79131 23.496V9.4908C3.79131 9.3324 3.88373 9.174 4.01574 9.0948L16.1348 2.0988C16.2008 2.0592 16.28 2.0328 16.3592 2.0328V2.046ZM16.3592 0C15.9235 0 15.5011 0.1056 15.105 0.33L2.98602 7.326C2.20713 7.7748 1.73187 8.5932 1.73187 9.4908V23.4828C1.73187 24.3804 2.20713 25.1988 2.98602 25.6476L15.105 32.6436C15.4879 32.868 15.9235 32.9736 16.3592 32.9736C16.7948 32.9736 17.2173 32.868 17.6133 32.6436L29.7324 25.6476C30.5113 25.1988 30.9865 24.3804 30.9865 23.4828V9.4908C30.9865 8.5932 30.5113 7.7748 29.7324 7.326L17.6001 0.33C17.2173 0.1056 16.7816 0 16.346 0H16.3592Z",
        fill: "#9DCCED"
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M8.3327 28.7628L9.45483 25.7004L11.6991 27.5616L9.60005 29.4888L8.3327 28.7628Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M15.3295 8.5008H12.2535C12.0291 8.5008 11.8178 8.646 11.7386 8.8572L5.15106 26.9148L8.33264 28.7496L15.5935 8.8572C15.6595 8.6724 15.5275 8.4876 15.3427 8.4876L15.3295 8.5008Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M20.7157 8.5008H17.6397C17.4153 8.5008 17.2041 8.646 17.1249 8.8572L9.59998 29.4756L12.7815 31.3104L20.9665 8.8572C21.0325 8.6724 20.9005 8.4876 20.7157 8.4876V8.5008Z",
        fill: "white"
      }
    )
  );
};
var Arbitrum_default3 = Arbitrum3;

// plugins/solana/assets/icons/Optimism.tsx
import React84 from "react";
var Optimism3 = ({ width = 31, height = 30, ...rest }) => {
  return /* @__PURE__ */ React84.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 31 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React84.createElement(
      "path",
      {
        d: "M15.8719 30C24.1572 30 30.8737 23.2843 30.8737 15C30.8737 6.71573 24.1572 0 15.8719 0C7.5867 0 0.870178 6.71573 0.870178 15C0.870178 23.2843 7.5867 30 15.8719 30Z",
        fill: "#FF0420"
      }
    ),
    /* @__PURE__ */ React84.createElement(
      "path",
      {
        d: "M11.4976 18.984C10.6035 18.984 9.87137 18.774 9.3013 18.354C8.73723 17.928 8.4552 17.316 8.4552 16.53C8.4552 16.362 8.4732 16.164 8.50921 15.924C8.60522 15.384 8.74323 14.736 8.92325 13.974C9.43331 11.91 10.7535 10.878 12.8777 10.878C13.4538 10.878 13.9758 10.974 14.4319 11.172C14.888 11.358 15.248 11.646 15.512 12.03C15.7761 12.408 15.9081 12.858 15.9081 13.38C15.9081 13.536 15.8901 13.734 15.8541 13.974C15.7401 14.64 15.608 15.294 15.446 15.924C15.182 16.95 14.7319 17.724 14.0839 18.234C13.4418 18.738 12.5777 18.984 11.4976 18.984ZM11.6596 17.364C12.0796 17.364 12.4337 17.238 12.7277 16.992C13.0277 16.746 13.2438 16.368 13.3698 15.852C13.5438 15.144 13.6758 14.532 13.7658 14.004C13.7958 13.848 13.8138 13.686 13.8138 13.518C13.8138 12.834 13.4598 12.492 12.7457 12.492C12.3257 12.492 11.9656 12.618 11.6656 12.864C11.3715 13.11 11.1615 13.488 11.0355 14.004C10.8975 14.508 10.7655 15.12 10.6275 15.852C10.5975 16.002 10.5795 16.158 10.5795 16.326C10.5734 17.022 10.9395 17.364 11.6596 17.364Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ React84.createElement(
      "path",
      {
        d: "M16.43 18.876C16.346 18.876 16.286 18.852 16.238 18.798C16.202 18.738 16.19 18.672 16.202 18.594L17.7562 11.274C17.7682 11.19 17.8102 11.124 17.8822 11.07C17.9482 11.016 18.0202 10.992 18.0982 10.992H21.0926C21.9267 10.992 22.5928 11.166 23.0968 11.508C23.6069 11.856 23.8649 12.354 23.8649 13.008C23.8649 13.194 23.8409 13.392 23.7989 13.596C23.6129 14.46 23.2348 15.096 22.6588 15.51C22.0947 15.924 21.3206 16.128 20.3365 16.128H18.8183L18.3023 18.594C18.2843 18.678 18.2483 18.744 18.1762 18.798C18.1102 18.852 18.0382 18.876 17.9602 18.876H16.43ZM20.4145 14.574C20.7325 14.574 21.0026 14.49 21.2366 14.316C21.4766 14.142 21.6326 13.896 21.7107 13.572C21.7347 13.446 21.7467 13.332 21.7467 13.236C21.7467 13.02 21.6807 12.852 21.5546 12.738C21.4286 12.618 21.2066 12.558 20.9006 12.558H19.5504L19.1244 14.574H20.4145Z",
        fill: "white"
      }
    )
  );
};
var Optimism_default3 = Optimism3;

// plugins/solana/assets/icons/USDC.tsx
import React85 from "react";
var USDC3 = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ React85.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React85.createElement("rect", { width: "37", height: "37", fill: "url(#pattern4)" }),
    /* @__PURE__ */ React85.createElement("defs", null, /* @__PURE__ */ React85.createElement(
      "pattern",
      {
        id: "pattern4",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ React85.createElement("use", { href: "#image0_214_308", transform: "scale(0.00552486)" })
    ), /* @__PURE__ */ React85.createElement(
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
var USDC_default3 = USDC3;

// plugins/solana/assets/icons/USDT.tsx
import React86 from "react";
var USDT5 = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ React86.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React86.createElement("rect", { width: "37", height: "37", fill: "url(#pattern5)" }),
    /* @__PURE__ */ React86.createElement("defs", null, /* @__PURE__ */ React86.createElement(
      "pattern",
      {
        id: "pattern5",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ React86.createElement("use", { href: "#image0_214_312", transform: "scale(0.00390625)" })
    ), /* @__PURE__ */ React86.createElement(
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
var USDT_default3 = USDT5;

// plugins/solana/assets/icons/USDK.tsx
import React87 from "react";
var USDT6 = ({ width = 23, height = 23, ...rest }) => {
  return /* @__PURE__ */ React87.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 23 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React87.createElement(
      "path",
      {
        d: "M21.7206 25.7417C20.9608 25.001 19.9922 24.6072 19.0104 24.5498H19.0131C15.2454 24.4272 14.705 21.3028 14.705 20.5151C14.705 19.6545 15.3029 16.6395 19.0052 16.5222C19.9869 16.4674 20.9556 16.071 21.7154 15.3303C23.389 13.7002 23.4256 11.0243 21.7937 9.35256C20.9687 8.50494 19.8721 8.07982 18.7755 8.07461H18.7467C17.6867 8.07722 16.6266 8.47625 15.8068 9.27432C14.9086 10.148 14.5326 11.3217 14.5326 12.4823C14.5326 13.4994 13.859 16.2874 10.7285 16.2874C9.55091 16.2874 8.31332 16.6317 7.41253 17.555C7.37337 17.5941 7.34204 17.641 7.30548 17.6828V17.6671C7.09138 17.8914 7.04961 17.7141 7.05222 17.5915V0.578993C7.05222 0.2582 6.79373 0 6.47259 0H0.579635C0.258486 0 0 0.2582 0 0.578993V31.7872C0 32.108 0.258486 32.3662 0.579635 32.3662H6.47781C6.79896 32.3662 7.05744 32.108 7.05744 31.7872V23.4883C7.05744 23.3658 7.09922 23.1884 7.31593 23.4127V23.3997C7.34987 23.4388 7.37859 23.4831 7.41514 23.5222C8.31854 24.4481 9.53525 24.7898 10.7363 24.7898C13.8695 24.7898 14.5405 27.9403 14.5405 28.595C14.5405 29.4947 14.9191 30.9292 15.8146 31.8003C16.6371 32.601 17.7024 33 18.765 33H18.7676C19.8695 33 20.9687 32.5723 21.799 31.722C22.5979 30.9031 22.9974 29.8442 23 28.7853V28.7593C22.9974 27.6639 22.5692 26.5685 21.7206 25.7443",
        fill: "#86B8CE"
      }
    )
  );
};
var USDK_default3 = USDT6;

// plugins/solana/assets/icons/Fuse.tsx
import React88 from "react";

// plugins/solana/assets/icons/Celo.tsx
import React89 from "react";

// plugins/solana/assets/icons/GoodDollar.tsx
import React90 from "react";

// plugins/solana/assets/icons/Copy.tsx
import React91 from "react";

// plugins/solana/assets/icons/Bank.tsx
import React92 from "react";
var Bank3 = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ React92.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 256 256",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React92.createElement("defs", null),
    /* @__PURE__ */ React92.createElement(
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
      /* @__PURE__ */ React92.createElement(
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
var Bank_default3 = Bank3;

// plugins/solana/assets/icons/BSC.tsx
import React93 from "react";
var BNB3 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React93.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React93.createElement(
      "path",
      {
        d: "M9.17376 12.6062L15 6.78L20.829 12.6088L24.219 9.21876L15 0L5.784 9.216L9.17388 12.606M0 15L3.39012 11.6094L6.78 14.9993L3.38988 18.3894L0 15ZM9.17376 17.3941L15 23.22L20.8289 17.3914L24.2207 20.7796L24.219 20.7814L15 30L5.784 20.784L5.7792 20.7792L9.17412 17.3938M23.22 15.0014L26.6101 11.6113L30 15.0012L26.61 18.3913L23.22 15.0014Z",
        fill: "#F3BA2F"
      }
    ),
    /* @__PURE__ */ React93.createElement(
      "path",
      {
        d: "M18.4383 14.9981H18.4397L15.0001 11.5582L12.4576 14.0999L12.1655 14.3921L11.5631 14.9947L11.5583 14.9993L11.5631 15.0043L15.0001 18.4417L18.44 15.0017L18.4417 14.9998L18.4385 14.9981",
        fill: "#F3BA2F"
      }
    )
  );
};
var BSC_default3 = BNB3;

// plugins/solana/assets/icons/KEUR.tsx
import React94 from "react";
var KEUR3 = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ React94.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React94.createElement("g", { fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ React94.createElement("circle", { cx: "16", cy: "16", fill: "#0f8ff8", r: "16" }), /* @__PURE__ */ React94.createElement(
      "path",
      {
        d: "M8 19.004L8.81 17h.857a16.279 16.279 0 01-.034-1.03c0-.448.019-.864.056-1.25H8l.81-2.003h1.274C11.27 8.906 13.944 7 18.103 7c1.367 0 2.666.177 3.897.532v2.524a8.92 8.92 0 00-3.683-.776c-2.493 0-4.096 1.146-4.81 3.438h7.423l-.81 2.003h-7.097a6.938 6.938 0 00-.056.995c0 .479.015.907.045 1.285h6.183l-.8 2.003H13.44c.533 1.389 1.183 2.355 1.949 2.9.765.544 1.858.816 3.277.816 1.014 0 2.125-.247 3.334-.741v2.373c-1.149.432-2.515.648-4.1.648-4.167 0-6.803-1.999-7.906-5.996z",
        fill: "#ffffff"
      }
    ))
  );
};
var KEUR_default3 = KEUR3;

// plugins/solana/assets/icons/Tron.tsx
import React95 from "react";
var Celo2 = ({ width = 30, height = 28, ...rest }) => {
  return /* @__PURE__ */ React95.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 29 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React95.createElement(
      "path",
      {
        d: "M28.6056 9.03778C27.1753 7.73936 25.1967 5.75657 23.5853 4.35034L23.4899 4.28472C23.3313 4.15946 23.1524 4.06122 22.9607 3.9941C19.0751 3.28161 0.99166 -0.0417889 0.638858 0.000398088C0.540001 0.0140104 0.445508 0.0492499 0.362337 0.103522L0.271753 0.173833C0.160212 0.285207 0.0754953 0.419757 0.023838 0.567578L0 0.628515V0.961323V1.01288C2.03576 6.58625 10.0739 24.8438 11.6568 29.1281C11.7521 29.4188 11.9333 29.9719 12.2718 30H12.3481C12.5292 30 13.3016 28.9969 13.3016 28.9969C13.3016 28.9969 27.1085 12.5346 28.5054 10.7815C28.6863 10.5656 28.8459 10.3333 28.9822 10.0878C29.017 9.89567 29.0006 9.69799 28.9346 9.51398C28.8686 9.32998 28.7552 9.16591 28.6056 9.03778ZM16.8439 10.9549L22.7367 6.15032L26.1932 9.28152L16.8439 10.9549ZM14.5555 10.6409L4.41002 2.46599L20.8249 5.44251L14.5555 10.6409ZM15.4708 12.783L25.8547 11.1378L13.9834 25.2001L15.4708 12.783ZM3.03219 3.2816L13.7068 12.1877L12.1621 25.2094L3.03219 3.2816Z",
        fill: "#FF060A"
      }
    )
  );
};
var Tron_default3 = Celo2;

// plugins/solana/assets/icons/BTC.tsx
import React96 from "react";
var BTC3 = ({ width = 28, height = 28, ...rest }) => {
  return /* @__PURE__ */ React96.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 21 28",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React96.createElement(
      "path",
      {
        d: "M19.4041 8.61541C19.6137 10.6571 18.8511 12.1042 17.1161 12.9568C18.4783 13.2709 19.4972 13.8486 20.1725 14.69C20.8477 15.5313 21.1099 16.7318 20.9584 18.291C20.8769 19.0875 20.6877 19.7886 20.3908 20.3944C20.0939 21.0002 19.7184 21.4994 19.2642 21.892C18.8101 22.2846 18.2455 22.6128 17.5701 22.8764C16.8948 23.1401 16.1873 23.3335 15.448 23.4568C14.7086 23.5801 13.8615 23.6643 12.9068 23.7092V27.9999H10.2171V23.7765C9.28563 23.7765 8.57533 23.7709 8.08629 23.7596V28H5.39686V23.7091C5.1873 23.7091 4.87292 23.7063 4.4537 23.7007C4.03446 23.6951 3.71429 23.6922 3.49317 23.6922H0L0.541458 20.6129H2.48022C3.06236 20.6129 3.40008 20.3269 3.49317 19.7547V8.14428C3.34184 7.38139 2.82372 7.00008 1.93876 7.00008H0V4.2404L3.70272 4.25727C4.44792 4.25727 5.01271 4.2517 5.39689 4.2404V0H8.08663V4.15628C9.04139 4.13379 9.75169 4.12265 10.2174 4.12265V0H12.9071V4.2404C13.827 4.31895 14.642 4.44514 15.3523 4.61899C16.0626 4.79283 16.7205 5.04522 17.3259 5.37613C17.9314 5.70705 18.4117 6.14459 18.7669 6.68857C19.1218 7.23272 19.3343 7.87501 19.4041 8.61541ZM15.649 17.786C15.649 17.3821 15.5617 17.0231 15.387 16.709C15.2124 16.395 14.9969 16.1369 14.7409 15.935C14.4847 15.7331 14.15 15.5619 13.7367 15.4218C13.3234 15.2815 12.942 15.1778 12.5927 15.1104C12.2434 15.0432 11.8126 14.9927 11.3003 14.959C10.7879 14.9254 10.3862 14.9085 10.0952 14.9085C9.80407 14.9085 9.42849 14.9141 8.9686 14.9254C8.50867 14.9366 8.23214 14.9423 8.13905 14.9423V20.6298C8.23218 20.6298 8.44765 20.6326 8.7852 20.6382C9.12292 20.6438 9.40223 20.6467 9.62353 20.6467C9.84482 20.6467 10.1532 20.6382 10.5492 20.6215C10.9451 20.6048 11.2856 20.5823 11.5709 20.5543C11.8562 20.5262 12.1879 20.4786 12.5665 20.4112C12.9449 20.344 13.2681 20.2654 13.5358 20.1756C13.8036 20.0858 14.0801 19.9681 14.3654 19.8222C14.6506 19.6764 14.8805 19.5081 15.0552 19.3174C15.2298 19.1267 15.3725 18.9023 15.483 18.6444C15.5934 18.3863 15.649 18.1002 15.649 17.786ZM14.409 9.77635C14.409 9.40621 14.3362 9.07799 14.1907 8.79197C14.0451 8.50596 13.8675 8.27031 13.658 8.08516C13.4484 7.90001 13.1689 7.74307 12.8197 7.61399C12.4704 7.48494 12.1502 7.3925 11.8591 7.33627C11.568 7.2802 11.21 7.23524 10.785 7.20161C10.3599 7.16799 10.0222 7.15397 9.77203 7.15954C9.52166 7.16511 9.20727 7.17068 8.82887 7.17641C8.45047 7.18198 8.22044 7.18487 8.13905 7.18487V12.3507C8.19728 12.3507 8.3982 12.3535 8.74153 12.3591C9.08503 12.3647 9.35574 12.3647 9.5537 12.3591C9.75165 12.3536 10.0427 12.3423 10.4269 12.3255C10.8111 12.3086 11.1313 12.2779 11.3875 12.2329C11.6436 12.188 11.9435 12.1263 12.287 12.0478C12.6305 11.9692 12.9128 11.8655 13.134 11.7364C13.3553 11.6074 13.5706 11.456 13.7802 11.2822C13.9897 11.1083 14.147 10.8923 14.2517 10.6343C14.3564 10.3764 14.409 10.0905 14.409 9.77635Z",
        fill: "#FDA806"
      }
    )
  );
};
var BTC_default3 = BTC3;

// plugins/solana/assets/icons/Wallet.tsx
import React97 from "react";

// plugins/solana/assets/icons/Explorer.tsx
import React98 from "react";

// plugins/solana/assets/icons/ExternalUrl.tsx
import React99 from "react";

// plugins/solana/utils/getChainIcon.tsx
var chainIcons2 = {
  ETH: Ethereum_default3,
  POL: Polygon_default3,
  AVX: Avalanche_default3,
  BSC: BSC_default3,
  BTC: BTC_default3,
  ARB: Arbitrum_default3,
  OPT: Optimism_default3,
  TRX: Tron_default3,
  SOL: Solana_default3,
  FIAT: Bank_default3,
  KEUR: KEUR_default3,
  USDC: USDC_default3,
  USDK: USDK_default3
};
var getChainIcon2 = (symbol) => {
  return chainIcons2[symbol] || null;
};
var getChainIcon_default2 = getChainIcon2;

// plugins/solana/utils/getTokenIcon.tsx
var COIN_LIST3 = {
  USDK: {
    symbol: "USDK",
    icon: USDK_default3
  },
  USDT: {
    symbol: "USDT",
    icon: USDT_default3
  },
  USDC: {
    symbol: "USDC",
    icon: USDC_default3
  },
  KEUR: {
    symbol: "KEUR",
    icon: KEUR_default3
  },
  WBTC: {
    symbol: "WBTC",
    icon: BTC_default3
  }
};
function getTokenIcon2(symbol) {
  const token = COIN_LIST3[symbol];
  if (!token) {
    console.warn(`Token icon not found for symbol: ${symbol}`);
    return null;
  }
  return token.icon;
}

// plugins/solana/utils/getChainData.ts
async function getChainData2(backendURL = "http://localhost:3001") {
  const _fetch = async (URL, method = "GET", JSON2 = true) => {
    const response = await fetch(URL, {
      method,
      headers: {
        Accept: "application/json"
      }
    });
    return JSON2 ? await response.json() : response;
  };
  const envURL = `${backendURL}/chains/env`;
  const { env } = await _fetch(envURL);
  const chainsURL = `${backendURL}/chains?env=${env}`;
  const chains = await _fetch(chainsURL);
  const formattedChains = [...chains].filter(
    (chain) => chain.shortName === "SOL"
  ).map(async (chain) => {
    const { name, shortName: symbol, supportedTokens } = chain;
    const icon = getChainIcon_default2(symbol);
    const tokens = [...supportedTokens].filter((token) => token.symbol === "USDK").map((token) => {
      const { symbol: symbol2, address } = token;
      return { symbol: symbol2, address };
    });
    const tokensWithIcons = tokens.map((token) => ({
      ...token,
      icon: getTokenIcon2(token.symbol)
      // Add token icon
    }));
    const pluginID = "SOL";
    const availableChainsURL = `${backendURL}/chains/get_available_chains/${symbol}`;
    const { Chains: chains2 } = await _fetch(availableChainsURL);
    const filteredChains = [...chains2].filter((chain2) => chain2 !== "BTC").sort();
    return {
      pluginID,
      name,
      symbol,
      tokens: tokensWithIcons,
      icon,
      chains: filteredChains
    };
  });
  const resolvedChains = await Promise.all(formattedChains);
  return resolvedChains;
}

// plugins/solana/core/hooks/useGetSolBalance.tsx
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

// plugins/solana/utils/getSolBalance.tsx
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
var getSolBalance = async (connection, publicKey) => {
  try {
    const balance = await connection.getBalance(publicKey) / LAMPORTS_PER_SOL;
    console.log("(NEW) SOL balance:", balance);
    return balance ?? 0;
  } catch (error) {
    console.error("Error fetching SOL balance:", error);
    throw new Error("Cant fetch sol balance");
  }
};

// plugins/solana/core/hooks/useGetSolBalance.tsx
import { useSelector as useSelector3 } from "react-redux";
function useGetSolBalance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const sourceNetwork = useSelector3(selectSourceChain);
  const result = useQuery({
    queryKey: ["getSolBalance", publicKey?.toBase58()],
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

// plugins/solana/core/hooks/useIsWalletReady.tsx
import { useEffect as useEffect3, useMemo as useMemo3 } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useSelector as useSelector4 } from "react-redux";
import { useDispatch as useDispatch2 } from "react-redux";
var createWalletStatus = (isReady, statusMessage = "", walletAddress) => ({
  isReady,
  statusMessage,
  walletAddress
});
function useIsWalletReady2() {
  const dispatch = useDispatch2();
  const { publicKey: solanaAddress } = useSolanaWallet();
  const sourceChain = useSelector4(selectSourceChain);
  useEffect3(() => {
    solanaAddress && sourceChain === "SOL" && dispatch(setSourceAddress(solanaAddress.toBase58()));
  }, [solanaAddress, sourceChain]);
  return useMemo3(() => {
    if (solanaAddress)
      return createWalletStatus(true, void 0, solanaAddress.toBase58());
    return createWalletStatus(false, "Wallet not connected", "");
  }, [sourceChain, solanaAddress]);
}
var useIsWalletReady_default2 = useIsWalletReady2;

// plugins/solana/index.tsx
var SolanaPlugin = class extends PluginBase {
  constructor(store2) {
    super({
      store: store2,
      id: "solana",
      fetchChains: getChainData2,
      // provider: Provider,
      // TODO: implement approve hook
      useAllowance: () => ({
        isApproved: false,
        poolAddress: "",
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useBalance: useGetSolBalance_default,
      useTokenBalance: useGetSolBalance_default,
      useWalletIsReady: useIsWalletReady_default2
    });
  }
  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }) => {
    return /* @__PURE__ */ React100.createElement(
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
import React134 from "react";

// plugins/tron/features/walletConnect/WalletProvider.tsx
import React101, { useMemo as useMemo4 } from "react";
import { WalletProvider as TronWalletProviderBase } from "@tronweb3/tronwallet-adapter-react-hooks";
import { LedgerAdapter } from "@tronweb3/tronwallet-adapter-ledger";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapter-tronlink";
import { OkxWalletAdapter } from "@tronweb3/tronwallet-adapter-okxwallet";
import { TokenPocketAdapter } from "@tronweb3/tronwallet-adapter-tokenpocket";
import {
  WalletDisconnectedError,
  WalletNotFoundError
} from "@tronweb3/tronwallet-abstract-adapter";
import { toast as toast2 } from "react-hot-toast";
var WalletProvider3 = ({ children, networkOption }) => {
  const adapters = useMemo4(
    () => [
      new TronLinkAdapter(),
      new LedgerAdapter({ accountNumber: 2 }),
      new TokenPocketAdapter(),
      new OkxWalletAdapter()
    ],
    []
  );
  function onError(e) {
    if (e instanceof WalletNotFoundError) {
      toast2.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast2.error(e.message);
    } else {
      toast2.error(e.message);
    }
  }
  const onChainChanged = (chainData) => {
    if (networkOption === "testnet") {
      if (chainData.chainId === "0xcd8690dc") {
        toast2.error("Please switch to Tron Shasta Testnet!");
        adapters[0].switchChain("0x3e9");
      } else if (chainData.chainId !== "0x3e9") {
        adapters[0].switchChain("0x3e9");
      }
    } else if (networkOption === "mainnet" && chainData.chainId !== "0x2b6653dc") {
      adapters[0].switchChain("0x2b6653dc");
    }
  };
  return /* @__PURE__ */ React101.createElement(
    TronWalletProviderBase,
    {
      adapters,
      autoConnect: true,
      onError,
      onChainChanged
    },
    children
  );
};
var WalletProvider_default3 = WalletProvider3;

// plugins/tron/assets/icons/Cross.tsx
import React102 from "react";

// plugins/tron/assets/icons/Minimize.tsx
import React103 from "react";

// plugins/tron/assets/icons/FooterLogo.tsx
import React104 from "react";

// plugins/tron/assets/icons/Check.tsx
import React105 from "react";

// plugins/tron/assets/icons/Warning.tsx
import React106 from "react";

// plugins/tron/assets/icons/ArrowRight.tsx
import React107 from "react";

// plugins/tron/assets/icons/Arrow.tsx
import React108 from "react";

// plugins/tron/assets/icons/Lock.tsx
import React109 from "react";

// plugins/tron/assets/icons/Ethereum.tsx
import React110 from "react";
var Ethereum4 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React110.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 22 36",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React110.createElement("path", { d: "M10.9966 13.3093V0L0 18.3307L10.9966 13.3093Z", fill: "#8A92B2" }),
    /* @__PURE__ */ React110.createElement(
      "path",
      {
        d: "M10.9966 24.8639V13.3093L0 18.3307L10.9966 24.8639ZM10.9966 13.3093L21.9933 18.3307L10.9966 0V13.3093Z",
        fill: "#62688F"
      }
    ),
    /* @__PURE__ */ React110.createElement(
      "path",
      {
        d: "M10.9966 13.3093V24.8639L21.9933 18.3307L10.9966 13.3093Z",
        fill: "#454A75"
      }
    ),
    /* @__PURE__ */ React110.createElement("path", { d: "M10.9966 26.9561L0 20.4297L10.9966 36V26.9561Z", fill: "#8A92B2" }),
    /* @__PURE__ */ React110.createElement("path", { d: "M22 20.4297L10.9966 26.9561V36L22 20.4297Z", fill: "#62688F" })
  );
};
var Ethereum_default4 = Ethereum4;

// plugins/tron/assets/icons/Solana.tsx
import React111 from "react";
var Solana4 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React111.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 26 21",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React111.createElement(
      "path",
      {
        d: "M22.2506 4.97063C22.1771 5.05109 22.0851 5.11367 21.984 5.14943C21.8828 5.19413 21.7725 5.21201 21.6622 5.21201H0.835479C0.0998792 5.21201 -0.277116 4.31801 0.237804 3.78161L3.65835 0.25032C3.73191 0.16986 3.82386 0.107281 3.9342 0.0625809C4.03534 0.017881 4.14568 0 4.25602 0H25.1655C25.9102 0 26.2781 0.902938 25.7539 1.43934L22.2506 4.97063ZM22.2506 20.7586C22.0943 20.9106 21.8828 21 21.6622 21H0.835479C0.0998792 21 -0.277116 20.1239 0.237804 19.6054L3.65835 16.1545C3.73191 16.0741 3.83305 16.0115 3.9342 15.9757C4.03534 15.931 4.14568 15.9132 4.25602 15.9132H25.1655C25.9102 15.9132 26.2781 16.7982 25.7539 17.3167L22.2506 20.7586ZM22.2506 8.19796C22.0943 8.04598 21.8828 7.95658 21.6622 7.95658H0.835479C0.0998792 7.95658 -0.277116 8.8327 0.237804 9.35121L3.65835 12.802C3.73191 12.8825 3.83305 12.9451 3.9342 12.9808C4.03534 13.0255 4.14568 13.0434 4.25602 13.0434H25.1655C25.9102 13.0434 26.2781 12.1584 25.7539 11.6398L22.2506 8.19796Z",
        fill: "url(#paint0_linear_721_5435)"
      }
    ),
    /* @__PURE__ */ React111.createElement("defs", null, /* @__PURE__ */ React111.createElement(
      "linearGradient",
      {
        id: "paint0_linear_721_5435",
        x1: "1.58985",
        y1: "21.2621",
        x2: "23.7184",
        y2: "-0.89642",
        gradientUnits: "userSpaceOnUse"
      },
      /* @__PURE__ */ React111.createElement("stop", { "stop-color": "#CF41E8" }),
      /* @__PURE__ */ React111.createElement("stop", { offset: "1", "stop-color": "#10F2B0" })
    ))
  );
};
var Solana_default4 = Solana4;

// plugins/tron/assets/icons/Polygon.tsx
import React112 from "react";
var Polygon4 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React112.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 25",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React112.createElement(
      "path",
      {
        d: "M22.7154 7.64095C22.1671 7.34421 21.4621 7.34421 20.8355 7.64095L16.4491 10.089L13.4726 11.6469L9.16449 14.095C8.61619 14.3917 7.91123 14.3917 7.2846 14.095L3.91645 12.1662C3.36815 11.8694 2.9765 11.276 2.9765 10.6083V6.89911C2.9765 6.30564 3.28982 5.71217 3.91645 5.34125L7.2846 3.48665C7.8329 3.18991 8.53786 3.18991 9.16449 3.48665L12.5326 5.41543C13.0809 5.71217 13.4726 6.30564 13.4726 6.97329V9.42136L16.4491 7.78932V5.26706C16.4491 4.67359 16.1358 4.08012 15.5091 3.7092L9.24282 0.222552C8.69452 -0.074184 7.98956 -0.074184 7.36292 0.222552L0.939948 3.78338C0.313316 4.08012 0 4.67359 0 5.26706V12.2404C0 12.8338 0.313316 13.4273 0.939948 13.7982L7.2846 17.2849C7.8329 17.5816 8.53786 17.5816 9.16449 17.2849L13.4726 14.911L16.4491 13.2789L20.7572 10.905C21.3055 10.6083 22.0104 10.6083 22.6371 10.905L26.0052 12.7596C26.5535 13.0564 26.9452 13.6499 26.9452 14.3175V18.0267C26.9452 18.6202 26.6319 19.2136 26.0052 19.5846L22.7154 21.4392C22.1671 21.7359 21.4621 21.7359 20.8355 21.4392L17.4674 19.5846C16.9191 19.2878 16.5274 18.6944 16.5274 18.0267V15.6528L13.5509 17.2849V19.7329C13.5509 20.3264 13.8642 20.9199 14.4909 21.2908L20.8355 24.7774C21.3838 25.0742 22.0888 25.0742 22.7154 24.7774L29.0601 21.2908C29.6084 20.9941 30 20.4006 30 19.7329V12.6855C30 12.092 29.6867 11.4985 29.0601 11.1276L22.7154 7.64095Z",
        fill: "#8247E5"
      }
    )
  );
};
var Polygon_default4 = Polygon4;

// plugins/tron/assets/icons/Polygon_zkEVM.tsx
import React113 from "react";

// plugins/tron/assets/icons/Loader.tsx
import React114 from "react";

// plugins/tron/assets/icons/Error.tsx
import React115 from "react";

// plugins/tron/assets/icons/Avalanche.tsx
import React116 from "react";
var Avalanche4 = ({ width = 29, height = 29, ...rest }) => {
  return /* @__PURE__ */ React116.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 30 29",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React116.createElement(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M29.8779 14.5C29.8779 22.5082 23.3854 29 15.3762 29C7.36707 29 0.874512 22.5082 0.874512 14.5C0.874512 6.49179 7.36707 0 15.3762 0C23.3854 0 29.8779 6.49179 29.8779 14.5ZM11.2669 20.2703H8.45247C7.86101 20.2703 7.56905 20.2703 7.39082 20.1563C7.19849 20.0316 7.08089 19.825 7.0666 19.597C7.05598 19.3869 7.20197 19.1303 7.49412 18.6175L14.4432 6.37035C14.7388 5.8502 14.8884 5.59032 15.0773 5.49397C15.2804 5.39068 15.5226 5.39068 15.7257 5.49397C15.9146 5.59013 16.0642 5.8502 16.3599 6.37035L17.7884 8.86373L17.7957 8.87647C18.1151 9.43446 18.2771 9.71732 18.3478 10.0143C18.4262 10.3384 18.4262 10.6804 18.3478 11.0046C18.2766 11.3038 18.1163 11.5888 17.7921 12.1551L14.1419 18.6067L14.1325 18.6233C13.811 19.186 13.6482 19.4709 13.4223 19.686C13.1764 19.9212 12.8808 20.0921 12.5566 20.1884C12.261 20.2703 11.9296 20.2703 11.2669 20.2703ZM18.3741 20.2703H22.4067C23.0017 20.2703 23.301 20.2703 23.4792 20.1529C23.6715 20.0281 23.7926 19.8179 23.8034 19.5901C23.8137 19.3868 23.6708 19.1402 23.3908 18.6571C23.3811 18.6407 23.3715 18.6239 23.3616 18.6069L21.3416 15.1516L21.3186 15.1126C21.0348 14.6326 20.8915 14.3903 20.7075 14.2967C20.5045 14.1934 20.2657 14.1934 20.0627 14.2967C19.8775 14.3928 19.7279 14.6458 19.4323 15.1551L17.4194 18.6104L17.4124 18.6224C17.1178 19.1309 16.9706 19.385 16.9813 19.5935C16.9955 19.8216 17.1131 20.0316 17.3055 20.1563C17.48 20.2703 17.7793 20.2703 18.3743 20.2703H18.3741Z",
        fill: "#E84142"
      }
    )
  );
};
var Avalanche_default4 = Avalanche4;

// plugins/tron/assets/icons/Arbitrum.tsx
import React117 from "react";
var Arbitrum4 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React117.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 33 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React117.createElement(
      "path",
      {
        d: "M2.84064 10.032V22.968C2.84064 23.7996 3.27629 24.552 4.00237 24.9744L15.2105 31.4424C15.9234 31.8516 16.8079 31.8516 17.5208 31.4424L28.7289 24.9744C29.4418 24.5652 29.8906 23.7996 29.8906 22.968V10.032C29.8906 9.2004 29.455 8.448 28.7289 8.0256L17.5208 1.5576C16.8079 1.1484 15.9234 1.1484 15.2105 1.5576L4.00237 8.0256C3.28949 8.4348 2.85384 9.2004 2.85384 10.032H2.84064Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ React117.createElement(
      "path",
      {
        d: "M18.8013 19.008L17.204 23.3904C17.1644 23.5092 17.1644 23.6412 17.204 23.7732L19.9499 31.3104L23.1315 29.4756L19.3162 19.008C19.2238 18.7704 18.8938 18.7704 18.8013 19.008Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ React117.createElement(
      "path",
      {
        d: "M22.0094 11.6424C21.917 11.4048 21.5869 11.4048 21.4945 11.6424L19.8971 16.0248C19.8575 16.1436 19.8575 16.2756 19.8971 16.4076L24.3989 28.7496L27.5804 26.9148L22.0094 11.6556V11.6424Z",
        fill: "#12AAFF"
      }
    ),
    /* @__PURE__ */ React117.createElement(
      "path",
      {
        d: "M16.3592 2.046C16.4384 2.046 16.5176 2.0724 16.5836 2.112L28.7026 9.108C28.8479 9.1872 28.9271 9.3456 28.9271 9.504V23.496C28.9271 23.6544 28.8347 23.8128 28.7026 23.892L16.5836 30.888C16.5176 30.9276 16.4384 30.954 16.3592 30.954C16.28 30.954 16.2008 30.9276 16.1348 30.888L4.01574 23.892C3.87052 23.8128 3.79131 23.6544 3.79131 23.496V9.4908C3.79131 9.3324 3.88373 9.174 4.01574 9.0948L16.1348 2.0988C16.2008 2.0592 16.28 2.0328 16.3592 2.0328V2.046ZM16.3592 0C15.9235 0 15.5011 0.1056 15.105 0.33L2.98602 7.326C2.20713 7.7748 1.73187 8.5932 1.73187 9.4908V23.4828C1.73187 24.3804 2.20713 25.1988 2.98602 25.6476L15.105 32.6436C15.4879 32.868 15.9235 32.9736 16.3592 32.9736C16.7948 32.9736 17.2173 32.868 17.6133 32.6436L29.7324 25.6476C30.5113 25.1988 30.9865 24.3804 30.9865 23.4828V9.4908C30.9865 8.5932 30.5113 7.7748 29.7324 7.326L17.6001 0.33C17.2173 0.1056 16.7816 0 16.346 0H16.3592Z",
        fill: "#9DCCED"
      }
    ),
    /* @__PURE__ */ React117.createElement(
      "path",
      {
        d: "M8.3327 28.7628L9.45483 25.7004L11.6991 27.5616L9.60005 29.4888L8.3327 28.7628Z",
        fill: "#213147"
      }
    ),
    /* @__PURE__ */ React117.createElement(
      "path",
      {
        d: "M15.3295 8.5008H12.2535C12.0291 8.5008 11.8178 8.646 11.7386 8.8572L5.15106 26.9148L8.33264 28.7496L15.5935 8.8572C15.6595 8.6724 15.5275 8.4876 15.3427 8.4876L15.3295 8.5008Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ React117.createElement(
      "path",
      {
        d: "M20.7157 8.5008H17.6397C17.4153 8.5008 17.2041 8.646 17.1249 8.8572L9.59998 29.4756L12.7815 31.3104L20.9665 8.8572C21.0325 8.6724 20.9005 8.4876 20.7157 8.4876V8.5008Z",
        fill: "white"
      }
    )
  );
};
var Arbitrum_default4 = Arbitrum4;

// plugins/tron/assets/icons/Optimism.tsx
import React118 from "react";
var Optimism4 = ({ width = 31, height = 30, ...rest }) => {
  return /* @__PURE__ */ React118.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height: width,
      viewBox: "0 0 31 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React118.createElement(
      "path",
      {
        d: "M15.8719 30C24.1572 30 30.8737 23.2843 30.8737 15C30.8737 6.71573 24.1572 0 15.8719 0C7.5867 0 0.870178 6.71573 0.870178 15C0.870178 23.2843 7.5867 30 15.8719 30Z",
        fill: "#FF0420"
      }
    ),
    /* @__PURE__ */ React118.createElement(
      "path",
      {
        d: "M11.4976 18.984C10.6035 18.984 9.87137 18.774 9.3013 18.354C8.73723 17.928 8.4552 17.316 8.4552 16.53C8.4552 16.362 8.4732 16.164 8.50921 15.924C8.60522 15.384 8.74323 14.736 8.92325 13.974C9.43331 11.91 10.7535 10.878 12.8777 10.878C13.4538 10.878 13.9758 10.974 14.4319 11.172C14.888 11.358 15.248 11.646 15.512 12.03C15.7761 12.408 15.9081 12.858 15.9081 13.38C15.9081 13.536 15.8901 13.734 15.8541 13.974C15.7401 14.64 15.608 15.294 15.446 15.924C15.182 16.95 14.7319 17.724 14.0839 18.234C13.4418 18.738 12.5777 18.984 11.4976 18.984ZM11.6596 17.364C12.0796 17.364 12.4337 17.238 12.7277 16.992C13.0277 16.746 13.2438 16.368 13.3698 15.852C13.5438 15.144 13.6758 14.532 13.7658 14.004C13.7958 13.848 13.8138 13.686 13.8138 13.518C13.8138 12.834 13.4598 12.492 12.7457 12.492C12.3257 12.492 11.9656 12.618 11.6656 12.864C11.3715 13.11 11.1615 13.488 11.0355 14.004C10.8975 14.508 10.7655 15.12 10.6275 15.852C10.5975 16.002 10.5795 16.158 10.5795 16.326C10.5734 17.022 10.9395 17.364 11.6596 17.364Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ React118.createElement(
      "path",
      {
        d: "M16.43 18.876C16.346 18.876 16.286 18.852 16.238 18.798C16.202 18.738 16.19 18.672 16.202 18.594L17.7562 11.274C17.7682 11.19 17.8102 11.124 17.8822 11.07C17.9482 11.016 18.0202 10.992 18.0982 10.992H21.0926C21.9267 10.992 22.5928 11.166 23.0968 11.508C23.6069 11.856 23.8649 12.354 23.8649 13.008C23.8649 13.194 23.8409 13.392 23.7989 13.596C23.6129 14.46 23.2348 15.096 22.6588 15.51C22.0947 15.924 21.3206 16.128 20.3365 16.128H18.8183L18.3023 18.594C18.2843 18.678 18.2483 18.744 18.1762 18.798C18.1102 18.852 18.0382 18.876 17.9602 18.876H16.43ZM20.4145 14.574C20.7325 14.574 21.0026 14.49 21.2366 14.316C21.4766 14.142 21.6326 13.896 21.7107 13.572C21.7347 13.446 21.7467 13.332 21.7467 13.236C21.7467 13.02 21.6807 12.852 21.5546 12.738C21.4286 12.618 21.2066 12.558 20.9006 12.558H19.5504L19.1244 14.574H20.4145Z",
        fill: "white"
      }
    )
  );
};
var Optimism_default4 = Optimism4;

// plugins/tron/assets/icons/USDC.tsx
import React119 from "react";
var USDC4 = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ React119.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React119.createElement("rect", { width: "37", height: "37", fill: "url(#pattern4)" }),
    /* @__PURE__ */ React119.createElement("defs", null, /* @__PURE__ */ React119.createElement(
      "pattern",
      {
        id: "pattern4",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ React119.createElement("use", { href: "#image0_214_308", transform: "scale(0.00552486)" })
    ), /* @__PURE__ */ React119.createElement(
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
var USDC_default4 = USDC4;

// plugins/tron/assets/icons/USDT.tsx
import React120 from "react";
var USDT7 = ({ width = 37, height = 37, ...rest }) => {
  return /* @__PURE__ */ React120.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 37 37",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React120.createElement("rect", { width: "37", height: "37", fill: "url(#pattern5)" }),
    /* @__PURE__ */ React120.createElement("defs", null, /* @__PURE__ */ React120.createElement(
      "pattern",
      {
        id: "pattern5",
        patternContentUnits: "objectBoundingBox",
        width: "1",
        height: "1"
      },
      /* @__PURE__ */ React120.createElement("use", { href: "#image0_214_312", transform: "scale(0.00390625)" })
    ), /* @__PURE__ */ React120.createElement(
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
var USDT_default4 = USDT7;

// plugins/tron/assets/icons/USDK.tsx
import React121 from "react";
var USDT8 = ({ width = 23, height = 23, ...rest }) => {
  return /* @__PURE__ */ React121.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 23 33",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React121.createElement(
      "path",
      {
        d: "M21.7206 25.7417C20.9608 25.001 19.9922 24.6072 19.0104 24.5498H19.0131C15.2454 24.4272 14.705 21.3028 14.705 20.5151C14.705 19.6545 15.3029 16.6395 19.0052 16.5222C19.9869 16.4674 20.9556 16.071 21.7154 15.3303C23.389 13.7002 23.4256 11.0243 21.7937 9.35256C20.9687 8.50494 19.8721 8.07982 18.7755 8.07461H18.7467C17.6867 8.07722 16.6266 8.47625 15.8068 9.27432C14.9086 10.148 14.5326 11.3217 14.5326 12.4823C14.5326 13.4994 13.859 16.2874 10.7285 16.2874C9.55091 16.2874 8.31332 16.6317 7.41253 17.555C7.37337 17.5941 7.34204 17.641 7.30548 17.6828V17.6671C7.09138 17.8914 7.04961 17.7141 7.05222 17.5915V0.578993C7.05222 0.2582 6.79373 0 6.47259 0H0.579635C0.258486 0 0 0.2582 0 0.578993V31.7872C0 32.108 0.258486 32.3662 0.579635 32.3662H6.47781C6.79896 32.3662 7.05744 32.108 7.05744 31.7872V23.4883C7.05744 23.3658 7.09922 23.1884 7.31593 23.4127V23.3997C7.34987 23.4388 7.37859 23.4831 7.41514 23.5222C8.31854 24.4481 9.53525 24.7898 10.7363 24.7898C13.8695 24.7898 14.5405 27.9403 14.5405 28.595C14.5405 29.4947 14.9191 30.9292 15.8146 31.8003C16.6371 32.601 17.7024 33 18.765 33H18.7676C19.8695 33 20.9687 32.5723 21.799 31.722C22.5979 30.9031 22.9974 29.8442 23 28.7853V28.7593C22.9974 27.6639 22.5692 26.5685 21.7206 25.7443",
        fill: "#86B8CE"
      }
    )
  );
};
var USDK_default4 = USDT8;

// plugins/tron/assets/icons/Fuse.tsx
import React122 from "react";

// plugins/tron/assets/icons/Celo.tsx
import React123 from "react";

// plugins/tron/assets/icons/GoodDollar.tsx
import React124 from "react";

// plugins/tron/assets/icons/Copy.tsx
import React125 from "react";

// plugins/tron/assets/icons/Bank.tsx
import React126 from "react";
var Bank4 = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ React126.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 256 256",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React126.createElement("defs", null),
    /* @__PURE__ */ React126.createElement(
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
      /* @__PURE__ */ React126.createElement(
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
var Bank_default4 = Bank4;

// plugins/tron/assets/icons/BSC.tsx
import React127 from "react";
var BNB4 = ({ width = 30, height = 30, ...rest }) => {
  return /* @__PURE__ */ React127.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 30 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React127.createElement(
      "path",
      {
        d: "M9.17376 12.6062L15 6.78L20.829 12.6088L24.219 9.21876L15 0L5.784 9.216L9.17388 12.606M0 15L3.39012 11.6094L6.78 14.9993L3.38988 18.3894L0 15ZM9.17376 17.3941L15 23.22L20.8289 17.3914L24.2207 20.7796L24.219 20.7814L15 30L5.784 20.784L5.7792 20.7792L9.17412 17.3938M23.22 15.0014L26.6101 11.6113L30 15.0012L26.61 18.3913L23.22 15.0014Z",
        fill: "#F3BA2F"
      }
    ),
    /* @__PURE__ */ React127.createElement(
      "path",
      {
        d: "M18.4383 14.9981H18.4397L15.0001 11.5582L12.4576 14.0999L12.1655 14.3921L11.5631 14.9947L11.5583 14.9993L11.5631 15.0043L15.0001 18.4417L18.44 15.0017L18.4417 14.9998L18.4385 14.9981",
        fill: "#F3BA2F"
      }
    )
  );
};
var BSC_default4 = BNB4;

// plugins/tron/assets/icons/KEUR.tsx
import React128 from "react";
var KEUR4 = ({ width = 32, height = 32, ...rest }) => {
  return /* @__PURE__ */ React128.createElement(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      ...rest
    },
    /* @__PURE__ */ React128.createElement("g", { fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ React128.createElement("circle", { cx: "16", cy: "16", fill: "#0f8ff8", r: "16" }), /* @__PURE__ */ React128.createElement(
      "path",
      {
        d: "M8 19.004L8.81 17h.857a16.279 16.279 0 01-.034-1.03c0-.448.019-.864.056-1.25H8l.81-2.003h1.274C11.27 8.906 13.944 7 18.103 7c1.367 0 2.666.177 3.897.532v2.524a8.92 8.92 0 00-3.683-.776c-2.493 0-4.096 1.146-4.81 3.438h7.423l-.81 2.003h-7.097a6.938 6.938 0 00-.056.995c0 .479.015.907.045 1.285h6.183l-.8 2.003H13.44c.533 1.389 1.183 2.355 1.949 2.9.765.544 1.858.816 3.277.816 1.014 0 2.125-.247 3.334-.741v2.373c-1.149.432-2.515.648-4.1.648-4.167 0-6.803-1.999-7.906-5.996z",
        fill: "#ffffff"
      }
    ))
  );
};
var KEUR_default4 = KEUR4;

// plugins/tron/assets/icons/Tron.tsx
import React129 from "react";
var Tron2 = ({ width = 30, height = 28, ...rest }) => {
  return /* @__PURE__ */ React129.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 29 30",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React129.createElement(
      "path",
      {
        d: "M28.6056 9.03778C27.1753 7.73936 25.1967 5.75657 23.5853 4.35034L23.4899 4.28472C23.3313 4.15946 23.1524 4.06122 22.9607 3.9941C19.0751 3.28161 0.99166 -0.0417889 0.638858 0.000398088C0.540001 0.0140104 0.445508 0.0492499 0.362337 0.103522L0.271753 0.173833C0.160212 0.285207 0.0754953 0.419757 0.023838 0.567578L0 0.628515V0.961323V1.01288C2.03576 6.58625 10.0739 24.8438 11.6568 29.1281C11.7521 29.4188 11.9333 29.9719 12.2718 30H12.3481C12.5292 30 13.3016 28.9969 13.3016 28.9969C13.3016 28.9969 27.1085 12.5346 28.5054 10.7815C28.6863 10.5656 28.8459 10.3333 28.9822 10.0878C29.017 9.89567 29.0006 9.69799 28.9346 9.51398C28.8686 9.32998 28.7552 9.16591 28.6056 9.03778ZM16.8439 10.9549L22.7367 6.15032L26.1932 9.28152L16.8439 10.9549ZM14.5555 10.6409L4.41002 2.46599L20.8249 5.44251L14.5555 10.6409ZM15.4708 12.783L25.8547 11.1378L13.9834 25.2001L15.4708 12.783ZM3.03219 3.2816L13.7068 12.1877L12.1621 25.2094L3.03219 3.2816Z",
        fill: "#FF060A"
      }
    )
  );
};
var Tron_default4 = Tron2;

// plugins/tron/assets/icons/BTC.tsx
import React130 from "react";
var BTC4 = ({ width = 28, height = 28, ...rest }) => {
  return /* @__PURE__ */ React130.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      viewBox: "0 0 21 28",
      fill: "none",
      ...rest
    },
    /* @__PURE__ */ React130.createElement(
      "path",
      {
        d: "M19.4041 8.61541C19.6137 10.6571 18.8511 12.1042 17.1161 12.9568C18.4783 13.2709 19.4972 13.8486 20.1725 14.69C20.8477 15.5313 21.1099 16.7318 20.9584 18.291C20.8769 19.0875 20.6877 19.7886 20.3908 20.3944C20.0939 21.0002 19.7184 21.4994 19.2642 21.892C18.8101 22.2846 18.2455 22.6128 17.5701 22.8764C16.8948 23.1401 16.1873 23.3335 15.448 23.4568C14.7086 23.5801 13.8615 23.6643 12.9068 23.7092V27.9999H10.2171V23.7765C9.28563 23.7765 8.57533 23.7709 8.08629 23.7596V28H5.39686V23.7091C5.1873 23.7091 4.87292 23.7063 4.4537 23.7007C4.03446 23.6951 3.71429 23.6922 3.49317 23.6922H0L0.541458 20.6129H2.48022C3.06236 20.6129 3.40008 20.3269 3.49317 19.7547V8.14428C3.34184 7.38139 2.82372 7.00008 1.93876 7.00008H0V4.2404L3.70272 4.25727C4.44792 4.25727 5.01271 4.2517 5.39689 4.2404V0H8.08663V4.15628C9.04139 4.13379 9.75169 4.12265 10.2174 4.12265V0H12.9071V4.2404C13.827 4.31895 14.642 4.44514 15.3523 4.61899C16.0626 4.79283 16.7205 5.04522 17.3259 5.37613C17.9314 5.70705 18.4117 6.14459 18.7669 6.68857C19.1218 7.23272 19.3343 7.87501 19.4041 8.61541ZM15.649 17.786C15.649 17.3821 15.5617 17.0231 15.387 16.709C15.2124 16.395 14.9969 16.1369 14.7409 15.935C14.4847 15.7331 14.15 15.5619 13.7367 15.4218C13.3234 15.2815 12.942 15.1778 12.5927 15.1104C12.2434 15.0432 11.8126 14.9927 11.3003 14.959C10.7879 14.9254 10.3862 14.9085 10.0952 14.9085C9.80407 14.9085 9.42849 14.9141 8.9686 14.9254C8.50867 14.9366 8.23214 14.9423 8.13905 14.9423V20.6298C8.23218 20.6298 8.44765 20.6326 8.7852 20.6382C9.12292 20.6438 9.40223 20.6467 9.62353 20.6467C9.84482 20.6467 10.1532 20.6382 10.5492 20.6215C10.9451 20.6048 11.2856 20.5823 11.5709 20.5543C11.8562 20.5262 12.1879 20.4786 12.5665 20.4112C12.9449 20.344 13.2681 20.2654 13.5358 20.1756C13.8036 20.0858 14.0801 19.9681 14.3654 19.8222C14.6506 19.6764 14.8805 19.5081 15.0552 19.3174C15.2298 19.1267 15.3725 18.9023 15.483 18.6444C15.5934 18.3863 15.649 18.1002 15.649 17.786ZM14.409 9.77635C14.409 9.40621 14.3362 9.07799 14.1907 8.79197C14.0451 8.50596 13.8675 8.27031 13.658 8.08516C13.4484 7.90001 13.1689 7.74307 12.8197 7.61399C12.4704 7.48494 12.1502 7.3925 11.8591 7.33627C11.568 7.2802 11.21 7.23524 10.785 7.20161C10.3599 7.16799 10.0222 7.15397 9.77203 7.15954C9.52166 7.16511 9.20727 7.17068 8.82887 7.17641C8.45047 7.18198 8.22044 7.18487 8.13905 7.18487V12.3507C8.19728 12.3507 8.3982 12.3535 8.74153 12.3591C9.08503 12.3647 9.35574 12.3647 9.5537 12.3591C9.75165 12.3536 10.0427 12.3423 10.4269 12.3255C10.8111 12.3086 11.1313 12.2779 11.3875 12.2329C11.6436 12.188 11.9435 12.1263 12.287 12.0478C12.6305 11.9692 12.9128 11.8655 13.134 11.7364C13.3553 11.6074 13.5706 11.456 13.7802 11.2822C13.9897 11.1083 14.147 10.8923 14.2517 10.6343C14.3564 10.3764 14.409 10.0905 14.409 9.77635Z",
        fill: "#FDA806"
      }
    )
  );
};
var BTC_default4 = BTC4;

// plugins/tron/assets/icons/Wallet.tsx
import React131 from "react";

// plugins/tron/assets/icons/Explorer.tsx
import React132 from "react";

// plugins/tron/assets/icons/ExternalUrl.tsx
import React133 from "react";

// plugins/tron/utils/getChainIcon.tsx
var chainIcons3 = {
  ETH: Ethereum_default4,
  POL: Polygon_default4,
  AVX: Avalanche_default4,
  BSC: BSC_default4,
  BTC: BTC_default4,
  ARB: Arbitrum_default4,
  OPT: Optimism_default4,
  TRX: Tron_default4,
  SOL: Solana_default4,
  FIAT: Bank_default4,
  KEUR: KEUR_default4,
  USDC: USDC_default4,
  USDK: USDK_default4
};
var getChainIcon3 = (symbol) => {
  return chainIcons3[symbol] || null;
};
var getChainIcon_default3 = getChainIcon3;

// plugins/tron/utils/getTokenIcon.tsx
var COIN_LIST4 = {
  USDK: {
    symbol: "USDK",
    icon: USDK_default4
  },
  USDT: {
    symbol: "USDT",
    icon: USDT_default4
  },
  USDC: {
    symbol: "USDC",
    icon: USDC_default4
  },
  KEUR: {
    symbol: "KEUR",
    icon: KEUR_default4
  },
  WBTC: {
    symbol: "WBTC",
    icon: BTC_default4
  }
};
function getTokenIcon3(symbol) {
  const token = COIN_LIST4[symbol];
  if (!token) {
    console.warn(`Token icon not found for symbol: ${symbol}`);
    return null;
  }
  return token.icon;
}

// plugins/tron/utils/getChainData.ts
async function getChainData3(backendURL = "http://localhost:3001") {
  const _fetch = async (URL, method = "GET", JSON2 = true) => {
    const response = await fetch(URL, {
      method,
      headers: {
        Accept: "application/json"
      }
    });
    return JSON2 ? await response.json() : response;
  };
  const envURL = `${backendURL}/chains/env`;
  const { env } = await _fetch(envURL);
  const chainsURL = `${backendURL}/chains?env=${env}`;
  const chains = await _fetch(chainsURL);
  const formattedChains = [...chains].filter(
    (chain) => chain.shortName === "TRX"
  ).map(async (chain) => {
    const { name, shortName: symbol, supportedTokens } = chain;
    const icon = getChainIcon_default3(symbol);
    const tokens = [...supportedTokens].filter((token) => token.symbol === "USDK").map((token) => {
      const { symbol: symbol2, address } = token;
      return { symbol: symbol2, address };
    });
    const tokensWithIcons = tokens.map((token) => ({
      ...token,
      icon: getTokenIcon3(token.symbol)
      // Add token icon
    }));
    const pluginID = "EVM";
    const availableChainsURL = `${backendURL}/chains/get_available_chains/${symbol}`;
    const { Chains: chains2 } = await _fetch(availableChainsURL);
    const filteredChains = [...chains2].filter((chain2) => chain2 !== "BTC").sort();
    return {
      pluginID,
      name,
      symbol,
      tokens: tokensWithIcons,
      icon,
      chains: filteredChains
    };
  });
  const resolvedChains = await Promise.all(formattedChains);
  return resolvedChains;
}

// plugins/tron/core/hooks/useGetTrxBalance.tsx
import { useMemo as useMemo5 } from "react";
import { useSelector as useSelector5 } from "react-redux";
import { useQuery as useQuery2 } from "@tanstack/react-query";

// plugins/tron/tronweb.tsx
import { TronWeb } from "tronweb";
var TRON_USDK_OWNER_ADDRESS2 = "TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU";
var tronWebTestnet = new TronWeb({
  fullHost: "https://api.nileex.io"
});
var tronWebMainnet = new TronWeb({
  fullHost: "https://api.trongrid.io"
});
tronWebTestnet.setAddress(TRON_USDK_OWNER_ADDRESS2);
tronWebMainnet.setAddress(TRON_USDK_OWNER_ADDRESS2);

// plugins/tron/core/hooks/useGetTrxBalance.tsx
import { useWallet as useWallet2 } from "@tronweb3/tronwallet-adapter-react-hooks";

// plugins/tron/utils/getTrxBalance.ts
var getTrxBalance = async (wallet, tronWeb) => {
  if (wallet?.adapter?.address) {
    try {
      const balanceInSun = await tronWeb.trx.getBalance(wallet.adapter.address);
      return balanceInSun / 1e6;
    } catch (error) {
      console.error("Failed to fetch TRX balance:", error);
      throw new Error("Can't get tron balance");
    }
  } else {
    throw new Error("Wallet address is not available");
  }
};

// plugins/tron/core/hooks/useGetTrxBalance.tsx
function useGetTronBalance() {
  const networkOption = useSelector5(selectNetworkOption);
  const { wallet } = useWallet2();
  const sourceNetwork = useSelector5(selectSourceChain);
  const tronWeb = useMemo5(
    () => networkOption === "testnet" /* testnet */ ? tronWebTestnet : tronWebMainnet,
    [networkOption]
  );
  const result = useQuery2({
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

// plugins/tron/core/hooks/useIsWalletReady.tsx
import { useEffect as useEffect4, useMemo as useMemo6 } from "react";
import { useWallet as useTronWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useDispatch as useDispatch3 } from "react-redux";
import { useSelector as useSelector6 } from "react-redux";
var createWalletStatus2 = (isReady, statusMessage = "", walletAddress) => ({
  isReady,
  statusMessage,
  walletAddress
});
function useIsWalletReady3() {
  const dispatch = useDispatch3();
  const sourceChain = useSelector6(selectSourceChain);
  const { address: tronAddress } = useTronWallet();
  useEffect4(() => {
    tronAddress && sourceChain === "TRX" && dispatch(setSourceAddress(tronAddress));
  }, [tronAddress, sourceChain]);
  return useMemo6(() => {
    if (tronAddress) {
      return createWalletStatus2(true, void 0, tronAddress);
    }
    return createWalletStatus2(false, "Wallet not connected", "");
  }, [tronAddress]);
}
var useIsWalletReady_default3 = useIsWalletReady3;

// plugins/tron/index.tsx
var TronPlugin = class extends PluginBase {
  constructor(store2) {
    super({
      store: store2,
      id: "tron",
      fetchChains: getChainData3,
      // provider: Provider,
      // TODO: implement approve hook
      useAllowance: () => ({
        isApproved: false,
        poolAddress: "",
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useBalance: useGetTrxBalance_default,
      useTokenBalance: useGetTrxBalance_default,
      useWalletIsReady: useIsWalletReady_default3
    });
  }
  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }) => {
    return /* @__PURE__ */ React134.createElement(
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

// plugins/index.ts
initializePlugins([evm_default, solana_default, tron_default]);

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

// src/services/envsApi.ts
var getNetworkOption2 = async (kimaBackendUrl) => {
  try {
    const response = await fetchWrapper.get(`${kimaBackendUrl}/chains/env`);
    return response.env;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting network option env variable");
  }
};

// src/KimaProvider.tsx
import { useQuery as useQuery3 } from "@tanstack/react-query";
var InternalKimaProvider = React135.memo(
  ({ walletConnectProjectId, children }) => {
    const backendUrl = useSelector7(selectBackendUrl);
    const plugins = useSelector7(selectAllPlugins, (prev, next) => prev === next);
    console.info("Registered Plugins:", plugins);
    const {
      data: networkOption,
      isLoading,
      error
    } = useQuery3({
      queryKey: ["networkOption"],
      queryFn: async () => getNetworkOption2(backendUrl)
    });
    console.log("network option: ", networkOption);
    const WrappedProviders = useMemo7(() => {
      return plugins.reduce((acc, plugin) => {
        const PluginProvider = getPluginProvider(plugin.id);
        if (PluginProvider) {
          return /* @__PURE__ */ React135.createElement(
            PluginProvider,
            {
              key: plugin.id,
              networkOption: networkOption || "testnet",
              walletConnectProjectId
            },
            acc
          );
        }
        return acc;
      }, children);
    }, [plugins, walletConnectProjectId]);
    return /* @__PURE__ */ React135.createElement(React135.Fragment, null, WrappedProviders);
  }
);
var KimaProvider = ({
  walletConnectProjectId,
  children
}) => {
  const queryClient = new QueryClient();
  return /* @__PURE__ */ React135.createElement(QueryClientProvider, { client: queryClient }, /* @__PURE__ */ React135.createElement(Provider, { store }, /* @__PURE__ */ React135.createElement(InternalKimaProvider, { walletConnectProjectId }, children)));
};
var KimaProvider_default = KimaProvider;

// src/components/KimaTransactionWidget.tsx
import React170, { useEffect as useEffect28 } from "react";
import { useDispatch as useDispatch29, useSelector as useSelector42 } from "react-redux";

// src/components/TransactionWidget.tsx
import React155, { useEffect as useEffect17, useState as useState10 } from "react";

// src/components/reusable/Progressbar.tsx
import React136 from "react";
import { useSelector as useSelector8 } from "react-redux";
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
  const theme = useSelector8(selectTheme);
  return /* @__PURE__ */ React136.createElement("div", { className: "kima-progressbar" }, /* @__PURE__ */ React136.createElement(
    "div",
    {
      className: `value step-${step * 100 / 4}`
    }
  ), /* @__PURE__ */ React136.createElement("div", { className: "step-indicators" }, stepInfo.map((item, index) => /* @__PURE__ */ React136.createElement(
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
    /* @__PURE__ */ React136.createElement("div", { className: "step-info" }, step < index && /* @__PURE__ */ React136.createElement(Lock_default, null), step >= index ? index === loadingStep ? /* @__PURE__ */ React136.createElement(Loader_default, { className: "loader" }) : index === errorStep ? /* @__PURE__ */ React136.createElement(Warning_default, null) : /* @__PURE__ */ React136.createElement(Check_default, null) : null, /* @__PURE__ */ React136.createElement("span", null, item.title))
  ))));
};
var Progressbar_default = Progressbar;

// src/components/reusable/ExternalLink.tsx
import React137 from "react";
var ExternalLink = ({ to, children, className, rest }) => /* @__PURE__ */ React137.createElement(
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
import React138 from "react";
import { useSelector as useSelector9 } from "react-redux";
var NetworkLabel = ({ sourceChain, targetChain }) => {
  const theme = useSelector9(selectTheme);
  const SourceInfo = getNetworkOption(sourceChain);
  const TargetInfo = getNetworkOption(targetChain);
  return /* @__PURE__ */ React138.createElement("div", { className: "header-network-labels" }, SourceInfo?.label && /* @__PURE__ */ React138.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ React138.createElement("div", { className: "icon" }, /* @__PURE__ */ React138.createElement(SourceInfo.icon, null)), /* @__PURE__ */ React138.createElement("p", null, SourceInfo.label)), SourceInfo?.label && TargetInfo?.label && /* @__PURE__ */ React138.createElement("div", { className: "arrow" }, /* @__PURE__ */ React138.createElement(Arrow_default, null)), TargetInfo?.label && /* @__PURE__ */ React138.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ React138.createElement("div", { className: "icon" }, /* @__PURE__ */ React138.createElement(TargetInfo.icon, null)), /* @__PURE__ */ React138.createElement("p", null, TargetInfo.label)));
};
var NetworkLabel_default = NetworkLabel;

// src/components/reusable/PrimaryButton.tsx
import React141 from "react";

// src/assets/loading/180-ring.tsx
import React139 from "react";
var Loading180Ring = ({
  width = 24,
  height = 24,
  fill = "white"
}) => {
  return /* @__PURE__ */ React139.createElement(
    "svg",
    {
      width,
      height,
      fill,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React139.createElement("path", { d: "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" }, /* @__PURE__ */ React139.createElement(
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
import React140 from "react";

// src/components/reusable/PrimaryButton.tsx
var PrimaryButton = ({
  className,
  clickHandler,
  children,
  isLoading = false,
  disabled = false,
  ref
}) => {
  return /* @__PURE__ */ React141.createElement("div", { className: "primary-button-wrapper" }, /* @__PURE__ */ React141.createElement(
    "button",
    {
      className: `primary-button ${className}`,
      onClick: clickHandler,
      ref,
      disabled
    },
    isLoading && /* @__PURE__ */ React141.createElement("div", { className: "loading-indicator" }, /* @__PURE__ */ React141.createElement(ring_default, { width: 24, height: 24, fill: "white" })),
    children
  ));
};
var PrimaryButton_default = PrimaryButton;

// src/components/reusable/SecondaryButton.tsx
import React142 from "react";
var SecondaryButton = ({
  className,
  clickHandler,
  children,
  theme,
  style,
  disabled = false
}) => /* @__PURE__ */ React142.createElement(
  "button",
  {
    className: `secondary-button ${className} ${theme}`,
    onClick: clickHandler,
    ...style,
    disabled
  },
  children
);
var SecondaryButton_default = SecondaryButton;

// src/components/reusable/NetworkSelect.tsx
import React143, { useEffect as useEffect6, useMemo as useMemo9, useRef, useState as useState3 } from "react";
import { useSelector as useSelector11, useDispatch as useDispatch5 } from "react-redux";

// src/hooks/useNetworkOptions.tsx
import { useEffect as useEffect5, useMemo as useMemo8, useState as useState2 } from "react";
import { useSelector as useSelector10 } from "react-redux";
import { useDispatch as useDispatch4 } from "react-redux";
import toast3 from "react-hot-toast";
function useNetworkOptions() {
  const dispatch = useDispatch4();
  const useFIAT = useSelector10(selectUseFIAT);
  const backendUrl = useSelector10(selectBackendUrl);
  const [options, setOptions] = useState2(networkOptions);
  useEffect5(() => {
    if (!backendUrl) return;
    (async function() {
      try {
        const networks = await fetchWrapper.get(
          `${backendUrl}/chains/chain`
        );
        setOptions(
          networkOptions.filter(
            (network) => networks.Chain.findIndex(
              (chain) => chain.symbol === network.id && !chain.disabled
            ) >= 0 || network.id === "FIAT" /* FIAT */ && useFIAT
          )
        );
        let tokenOptions = {};
        for (const network of networks.Chain) {
          for (const token of network.tokens) {
            if (!tokenOptions[token.symbol]) {
              tokenOptions[token.symbol] = {};
            }
            tokenOptions[token.symbol][network.symbol] = token.address;
          }
        }
        dispatch(setTokenOptions(tokenOptions));
      } catch (e) {
        console.log("rpc disconnected", e);
        toast3.error("rpc disconnected");
      }
    })();
  }, [backendUrl]);
  return useMemo8(
    () => ({
      options
    }),
    [options]
  );
}

// src/components/reusable/NetworkSelect.tsx
import toast4 from "react-hot-toast";
var Network = ({ isOriginChain = true }) => {
  const sourceChangeRef = useRef(false);
  const theme = useSelector11(selectTheme);
  const mode = useSelector11(selectMode);
  const dAppOption = useSelector11(selectDappOption);
  const originNetwork = useSelector11(selectSourceChain);
  const targetNetwork = useSelector11(selectTargetChain);
  const nodeProviderQuery = useSelector11(selectNodeProviderQuery);
  const dispatch = useDispatch5();
  const sliderRef = useRef();
  const [availableNetworks, setAvailableNetworks] = useState3(
    []
  );
  const { options: networkOptions3 } = useNetworkOptions();
  const selectedNetwork = useMemo9(() => {
    const index = networkOptions3.findIndex(
      (option) => option.id === (isOriginChain ? originNetwork : targetNetwork)
    );
    if (index >= 0) return networkOptions3[index];
    return networkOptions3[3];
  }, [originNetwork, targetNetwork, networkOptions3]);
  const networks = useMemo9(() => {
    if (isOriginChain && mode === "bridge" /* bridge */) {
      return networkOptions3;
    }
    return networkOptions3.filter(
      (network) => availableNetworks.findIndex((id) => id === network.id) >= 0
    );
  }, [networkOptions3, isOriginChain, availableNetworks, dAppOption]);
  useEffect6(() => {
    if (!nodeProviderQuery || mode !== "bridge" /* bridge */) return;
    (async function() {
      try {
        const networks2 = await fetchWrapper.get(
          `${nodeProviderQuery}/kima-finance/kima-blockchain/chains/get_available_chains/${originNetwork}`
        );
        setAvailableNetworks(networks2.Chains);
        if (isOriginChain && !targetNetwork) {
          dispatch(setTargetChain(networks2.Chains[0]));
        }
        if (sourceChangeRef.current) {
          sourceChangeRef.current = false;
          dispatch(setTargetChain(networks2.Chains[0]));
        }
      } catch (e) {
        console.log("rpc disconnected", e);
        toast4.error("rpc disconnected");
      }
    })();
  }, [nodeProviderQuery, originNetwork, targetNetwork, mode, isOriginChain]);
  useEffect6(() => {
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
  });
  const slideLeft = () => {
    let temp = 0;
    const timerId = setInterval(() => {
      sliderRef.current.scrollLeft -= 10;
      if (temp++ === 20) clearInterval(timerId);
    }, 10);
  };
  const slideRight = () => {
    let temp = 0;
    const timerId = setInterval(() => {
      sliderRef.current.scrollLeft += 10;
      if (temp++ === 20) clearInterval(timerId);
    }, 10);
  };
  return /* @__PURE__ */ React143.createElement("div", { className: `network-select` }, /* @__PURE__ */ React143.createElement("p", null, isOriginChain ? "Which network are you funding from?" : "Which network are you funding to?"), /* @__PURE__ */ React143.createElement("div", { className: "scroll-button" }, /* @__PURE__ */ React143.createElement(
    Arrow_default,
    {
      fill: theme.colorMode === "light" ? "black" : "white",
      onClick: slideLeft
    }
  ), /* @__PURE__ */ React143.createElement(
    Arrow_default,
    {
      fill: theme.colorMode === "light" ? "black" : "white",
      onClick: slideRight
    }
  )), /* @__PURE__ */ React143.createElement("div", { className: "slide-area hide-scrollbar", ref: sliderRef }, /* @__PURE__ */ React143.createElement("div", { className: "network-container" }, networks.map((network) => /* @__PURE__ */ React143.createElement(
    "div",
    {
      className: `card-item ${theme.colorMode} ${network.id === selectedNetwork.id ? "active" : ""}`,
      key: network.id,
      onClick: () => {
        if (isOriginChain) {
          dispatch(setSourceChain(network.id));
          sourceChangeRef.current = true;
        } else {
          dispatch(setTargetChain(network.id));
          dispatch(setServiceFee(-1));
        }
      }
    },
    /* @__PURE__ */ React143.createElement(network.icon, null),
    /* @__PURE__ */ React143.createElement("span", null, network.label)
  )))));
};
var NetworkSelect_default = Network;

// src/components/reusable/Dropdown.tsx
import React144 from "react";
import { useDispatch as useDispatch6 } from "react-redux";
import { useSelector as useSelector12 } from "react-redux";

// src/components/reusable/WalletButton.tsx
import React146, { useEffect as useEffect11, useMemo as useMemo12 } from "react";
import { toast as toast6 } from "react-hot-toast";
import { useDispatch as useDispatch8, useSelector as useSelector15 } from "react-redux";

// src/hooks/useIsWalletReady.tsx
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress
} from "sats-connect";
import { useCallback as useCallback2, useEffect as useEffect7, useMemo as useMemo10 } from "react";
import { useWallet as useSolanaWallet2 } from "@solana/wallet-adapter-react";
import { useWallet as useTronWallet2 } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useSelector as useSelector13 } from "react-redux";
import { useDispatch as useDispatch7 } from "react-redux";
import toast5 from "react-hot-toast";
import {
  useAppKitAccount as useAppKitAccount3,
  useAppKitEvents,
  useAppKitNetwork as useAppKitNetwork2,
  useAppKitProvider as useAppKitProvider3
} from "@reown/appkit/react";
import { mainnet as mainnet4, sepolia as sepolia4 } from "@reown/appkit/networks";
var createWalletStatus3 = (isReady, statusMessage = "", connectBitcoinWallet, walletAddress) => ({
  isReady,
  statusMessage,
  connectBitcoinWallet,
  walletAddress
});
function useIsWalletReady4() {
  const dispatch = useDispatch7();
  const autoSwitch = useSelector13(selectWalletAutoConnect);
  const { publicKey: solanaAddress } = useSolanaWallet2();
  const { address: tronAddress } = useTronWallet2();
  const { walletProvider: evmProvider } = useAppKitProvider3("eip155");
  const bitcoinAddress = useSelector13(selectBitcoinAddress);
  const appkitAccountInfo = useAppKitAccount3();
  const { chainId: evmChainId } = useAppKitNetwork2();
  const modal = useModal();
  const { address: evmAddress, isConnected } = appkitAccountInfo || {
    address: null,
    chainId: null,
    isConnected: null
  };
  const sourceChain = useSelector13(selectSourceChain);
  const targetChain = useSelector13(selectTargetChain);
  const networkOption = useSelector13(selectNetworkOption);
  const targetNetworkFetching = useSelector13(selectTargetChainFetching);
  const correctChain = useMemo10(() => {
    if (sourceChain === "FIAT" /* FIAT */ && !targetNetworkFetching)
      return targetChain;
    return sourceChain;
  }, [sourceChain, targetChain, targetNetworkFetching]);
  const hasEthInfo = isConnected && !!evmAddress;
  const errorHandler = useSelector13(selectErrorHandler);
  const correctEvmNetwork = useMemo10(() => {
    return networkOption === "mainnet" /* mainnet */ ? CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[correctChain] || mainnet4 : CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[correctChain] || sepolia4;
  }, [networkOption, correctChain]);
  const hasCorrectEvmNetwork = evmChainId === correctEvmNetwork.id;
  const events = useAppKitEvents();
  useEffect7(() => {
    if (events.data?.event === "SELECT_WALLET" || events.data?.event === "CONNECT_SUCCESS") {
      localStorage.setItem("wallet", events.data?.properties?.name);
    }
  }, [events]);
  const connectBitcoinWallet = useCallback2(async () => {
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Payment],
        message: "SATS Connect Demo",
        network: {
          type: BitcoinNetworkType.Testnet
        }
      },
      onFinish: (response) => {
        const paymentAddressItem = response.addresses.find(
          (address) => address.purpose === AddressPurpose.Payment
        );
        dispatch(setBitcoinAddress(paymentAddressItem?.address || ""));
        dispatch(setBitcoinPubkey(paymentAddressItem?.publicKey || ""));
      },
      onCancel: () => {
        toast5.error("Request cancelled");
      }
    });
  }, [getAddress]);
  const forceNetworkSwitch = useCallback2(async () => {
    if (evmProvider && correctEvmNetwork) {
      if (!isEVMChain(correctChain)) {
        return;
      }
      try {
        const wallet = localStorage.getItem("wallet");
        if (wallet === "Phantom" && correctEvmNetwork.id !== 11155111) return;
        await modal.switchNetwork(correctEvmNetwork);
      } catch (e) {
        errorHandler(e);
      }
    }
  }, [evmProvider, correctEvmNetwork, correctChain]);
  return useMemo10(() => {
    const CHAIN_IDS_TO_NAMES = networkOption === "mainnet" /* mainnet */ ? CHAIN_IDS_TO_NAMES_MAINNET : CHAIN_IDS_TO_NAMES_TESTNET;
    const SupportedChainId = networkOption === "mainnet" /* mainnet */ ? SupportedChainIdMainnet : SupportedChainIdTestnet;
    if (correctChain === "SOL" /* SOLANA */) {
      if (solanaAddress) {
        return createWalletStatus3(
          true,
          void 0,
          connectBitcoinWallet,
          solanaAddress.toBase58()
        );
      }
      return createWalletStatus3(
        false,
        "Wallet not connected",
        connectBitcoinWallet,
        ""
      );
    } else if (correctChain === "TRX" /* TRON */) {
      if (tronAddress) {
        return createWalletStatus3(
          true,
          void 0,
          connectBitcoinWallet,
          tronAddress
        );
      }
      return createWalletStatus3(
        false,
        "Wallet not connected",
        connectBitcoinWallet,
        ""
      );
    } else if (correctChain === "BTC" /* BTC */) {
      if (bitcoinAddress) {
        return createWalletStatus3(
          true,
          void 0,
          connectBitcoinWallet,
          bitcoinAddress
        );
      }
      return createWalletStatus3(
        false,
        // capabilityMessage,
        "Xverse wallet not connected",
        connectBitcoinWallet,
        ""
      );
    } else if (isEVMChain(correctChain) && hasEthInfo && evmAddress) {
      if (hasCorrectEvmNetwork) {
        dispatch(setSourceAddress(evmAddress));
        return createWalletStatus3(
          true,
          void 0,
          connectBitcoinWallet,
          evmAddress
        );
      } else {
        if (evmProvider && correctEvmNetwork) {
          if (autoSwitch) {
            forceNetworkSwitch();
            dispatch(setSourceAddress(evmAddress));
          } else {
            dispatch(
              setSourceChain(
                CHAIN_IDS_TO_NAMES[evmChainId || SupportedChainId.ETHEREUM]
              )
            );
            toast5.success(
              `Wallet connected to ${CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[evmChainId || SupportedChainId.ETHEREUM]]}`
            );
          }
        }
        if (evmChainId && autoSwitch)
          return createWalletStatus3(
            false,
            `Wallet not connected to ${CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[correctEvmNetwork.id]]}`,
            connectBitcoinWallet,
            evmAddress
          );
      }
    }
    return createWalletStatus3(false, "", connectBitcoinWallet, void 0);
  }, [
    correctChain,
    autoSwitch,
    forceNetworkSwitch,
    connectBitcoinWallet,
    solanaAddress,
    tronAddress,
    hasEthInfo,
    correctEvmNetwork,
    hasCorrectEvmNetwork,
    bitcoinAddress,
    evmProvider,
    evmAddress,
    evmChainId,
    networkOption
  ]);
}
var useIsWalletReady_default4 = useIsWalletReady4;

// src/hooks/useBalance.tsx
import { useEffect as useEffect8, useMemo as useMemo11, useState as useState4 } from "react";
import { useSelector as useSelector14 } from "react-redux";
import { Contract as Contract2 } from "@ethersproject/contracts";
import { formatUnits as formatUnits2 } from "@ethersproject/units";
import {
  useConnection as useConnection2,
  useWallet as useSolanaWallet3
} from "@solana/wallet-adapter-react";

// src/utils/ethereum/erc20ABI.json
var erc20ABI_default2 = {
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

// src/utils/solana/getOrCreateAssociatedTokenAccount.ts
import {
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID4,
  ASSOCIATED_TOKEN_PROGRAM_ID as ASSOCIATED_TOKEN_PROGRAM_ID3
} from "@solana/spl-token";
import { Transaction } from "@solana/web3.js";

// src/utils/solana/createAssociatedTokenAccountInstruction.ts
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TransactionInstruction, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
function createAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, programId = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedToken, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: false, isWritable: false },
    { pubkey: mint, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    { pubkey: programId, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false }
  ];
  return new TransactionInstruction({
    keys,
    programId: associatedTokenProgramId,
    data: Buffer.alloc(0)
  });
}

// src/utils/solana/getAccountInfo.ts
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID2, AccountLayout } from "@solana/spl-token";
async function getAccountInfo(connection, address, commitment, programId = TOKEN_PROGRAM_ID2) {
  const info = await connection.getAccountInfo(address, commitment);
  if (!info) throw new Error("TokenAccountNotFoundError");
  if (!info.owner.equals(programId)) throw new Error("TokenInvalidAccountOwnerError");
  if (info.data.length != AccountLayout.span) throw new Error("TokenInvalidAccountSizeError");
  const rawAccount = AccountLayout.decode(Buffer.from(info.data));
  return {
    address,
    mint: rawAccount.mint,
    owner: rawAccount.owner,
    amount: rawAccount.amount,
    delegate: rawAccount.delegateOption ? rawAccount.delegate : null,
    delegatedAmount: rawAccount.delegatedAmount,
    isInitialized: rawAccount.state !== 0 /* Uninitialized */,
    isFrozen: rawAccount.state === 2 /* Frozen */,
    isNative: !!rawAccount.isNativeOption,
    rentExemptReserve: rawAccount.isNativeOption ? rawAccount.isNative : null,
    closeAuthority: rawAccount.closeAuthorityOption ? rawAccount.closeAuthority : null
  };
}

// src/utils/solana/getAssociatedTokenAddress.ts
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID3, ASSOCIATED_TOKEN_PROGRAM_ID as ASSOCIATED_TOKEN_PROGRAM_ID2 } from "@solana/spl-token";
import { PublicKey as PublicKey3 } from "@solana/web3.js";
async function getAssociatedTokenAddress(mint, owner, allowOwnerOffCurve = false, programId = TOKEN_PROGRAM_ID3, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID2) {
  if (!allowOwnerOffCurve && !PublicKey3.isOnCurve(owner.toBuffer())) throw new Error("TokenOwnerOffCurveError");
  const [address] = await PublicKey3.findProgramAddress(
    [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
    associatedTokenProgramId
  );
  return address;
}

// src/utils/solana/getOrCreateAssociatedTokenAccount.ts
async function getOrCreateAssociatedTokenAccount(connection, payer, mint, owner, signTransaction, allowOwnerOffCurve = false, commitment, programId = TOKEN_PROGRAM_ID4, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID3) {
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId
  );
  let account;
  try {
    account = await getAccountInfo(
      connection,
      associatedToken,
      commitment,
      programId
    );
  } catch (error) {
    const err = error;
    if (err.message === "TokenAccountNotFoundError" || err.message === "TokenInvalidAccountOwnerError") {
      try {
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            payer,
            associatedToken,
            owner,
            mint,
            programId,
            associatedTokenProgramId
          )
        );
        const blockHash = await connection.getRecentBlockhash();
        transaction.feePayer = await payer;
        transaction.recentBlockhash = await blockHash.blockhash;
        const signed = await signTransaction(transaction);
        const signature = await connection.sendRawTransaction(
          signed.serialize()
        );
        await connection.confirmTransaction(signature);
      } catch (error2) {
      }
      account = await getAccountInfo(
        connection,
        associatedToken,
        commitment,
        programId
      );
    } else {
      throw error;
    }
  }
  if (!account.mint.equals(mint)) throw Error("TokenInvalidMintError");
  if (!account.owner.equals(owner)) throw new Error("TokenInvalidOwnerError");
  return account;
}

// src/hooks/useBalance.tsx
import { PublicKey as PublicKey5 } from "@solana/web3.js";
import { useWallet as useTronWallet3 } from "@tronweb3/tronwallet-adapter-react-hooks";

// src/tronweb.tsx
import { TronWeb as TronWeb2 } from "tronweb";
var tronWebTestnet2 = new TronWeb2({
  fullHost: "https://api.nileex.io"
});
var tronWebMainnet2 = new TronWeb2({
  fullHost: "https://api.trongrid.io"
});
tronWebTestnet2.setAddress(TRON_USDK_OWNER_ADDRESS);
tronWebMainnet2.setAddress(TRON_USDK_OWNER_ADDRESS);

// src/hooks/useBalance.tsx
import { ethers as ethers2 } from "ethers";

// src/helpers/functions.tsx
var formatterInt2 = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});
var formatterFloat2 = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 9
});
function isEmptyObject2(arg) {
  return typeof arg === "object" && Object.keys(arg).length === 0;
}
var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// src/hooks/useBalance.tsx
import { useAppKitAccount as useAppKitAccount4, useAppKitNetwork as useAppKitNetwork3, useAppKitProvider as useAppKitProvider4 } from "@reown/appkit/react";
function useBalance2() {
  const [balance, setBalance] = useState4(0);
  const appkitAccountInfo = useAppKitAccount4();
  const { chainId: evmChainId } = useAppKitNetwork3();
  const { address: signerAddress } = appkitAccountInfo || {
    address: null,
    chainId: null,
    isConnected: null
  };
  const { walletProvider } = useAppKitProvider4("eip155");
  const selectedNetwork = useSelector14(selectSourceChain);
  const errorHandler = useSelector14(selectErrorHandler);
  const networkOption = useSelector14(selectNetworkOption);
  const sourceChain = useMemo11(() => {
    if (selectedNetwork === "SOL" /* SOLANA */ || selectedNetwork === "TRX" /* TRON */ || selectedNetwork === "BTC" /* BTC */)
      return selectedNetwork;
    const CHAIN_NAMES_TO_IDS = networkOption === "mainnet" /* mainnet */ ? CHAIN_NAMES_TO_IDS_MAINNET : CHAIN_NAMES_TO_IDS_TESTNET;
    const CHAIN_IDS_TO_NAMES = networkOption === "mainnet" /* mainnet */ ? CHAIN_IDS_TO_NAMES_MAINNET : CHAIN_IDS_TO_NAMES_TESTNET;
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId];
    }
    return selectedNetwork;
  }, [selectedNetwork, evmChainId, networkOption]);
  const { publicKey: solanaAddress, signTransaction } = useSolanaWallet3();
  const { address: tronAddress } = useTronWallet3();
  const btcAddress = useSelector14(selectBitcoinAddress);
  const { connection } = useConnection2();
  const kimaBackendUrl = useSelector14(selectBackendUrl);
  const sourceCurrency = useSelector14(selectSourceCurrency);
  const tokenOptions = useSelector14(selectTokenOptions);
  const tokenAddress = useMemo11(() => {
    if (isEmptyObject2(tokenOptions) || sourceChain === "FIAT" /* FIAT */) return "";
    if (tokenOptions && typeof tokenOptions === "object") {
      const coinOptions = tokenOptions[sourceCurrency];
      if (coinOptions && typeof coinOptions === "object") {
        return tokenOptions[sourceCurrency][sourceChain];
      }
    }
    return "";
  }, [sourceCurrency, sourceChain, tokenOptions]);
  useEffect8(() => {
    setBalance(0);
  }, [sourceChain]);
  useEffect8(() => {
    ;
    (async () => {
      if (!tokenAddress) return;
      const tronWeb = networkOption === "mainnet" /* mainnet */ ? tronWebMainnet2 : tronWebTestnet2;
      try {
        if (!isEVMChain(sourceChain)) {
          if (sourceChain === "SOL" /* SOLANA */ && solanaAddress && connection) {
            const mint = new PublicKey5(tokenAddress);
            const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
              connection,
              solanaAddress,
              mint,
              solanaAddress,
              signTransaction
              /* as SignerWalletAdapterProps['signTransaction']*/
            );
            const accountInfo = await connection.getParsedAccountInfo(
              fromTokenAccount.address
            );
            const parsedAccountInfo = accountInfo?.value?.data;
            setBalance(
              +formatUnits2(
                parsedAccountInfo.parsed?.info?.tokenAmount?.amount,
                parsedAccountInfo.parsed?.info?.tokenAmount?.decimals
              )
            );
            return;
          }
          if (sourceChain === "TRX" /* TRON */ && tronAddress) {
            let trc20Contract = await tronWeb.contract(
              erc20ABI_default2.abi,
              tokenAddress
            );
            const decimals = await trc20Contract.decimals().call();
            const userBalance = await trc20Contract.balanceOf(tronAddress).call();
            setBalance(+formatUnits2(userBalance.balance, decimals));
            return;
          }
          if (sourceChain === "BTC" /* BTC */ && btcAddress) {
            const btcInfo = await fetchWrapper.get(
              `${kimaBackendUrl}/btc/balance?address=${btcAddress}`
            );
            const balance2 = parseFloat(btcInfo.balance) / Math.pow(10, 8);
            setBalance(balance2);
            return;
          }
        }
        if (walletProvider) {
          const provider = new ethers2.providers.Web3Provider(
            walletProvider
          );
          const signer = provider?.getSigner();
          if (!tokenAddress || !signer || !signerAddress) return;
          const erc20Contract = new Contract2(tokenAddress, erc20ABI_default2.abi, signer);
          const decimals = await erc20Contract.decimals();
          const userBalance = await erc20Contract.balanceOf(signerAddress);
          setBalance(+formatUnits2(userBalance, decimals));
        }
      } catch (error) {
        errorHandler(error);
      }
    })();
  }, [
    signerAddress,
    tokenAddress,
    sourceChain,
    solanaAddress,
    tronAddress,
    btcAddress,
    walletProvider,
    networkOption
  ]);
  return useMemo11(
    () => ({
      balance
    }),
    [balance]
  );
}

// src/hooks/useWidth.tsx
import { useEffect as useEffect9, useState as useState5 } from "react";
var useWidth = () => {
  const [width, setWidth] = useState5(0);
  const updateWidth = (width2) => {
    setWidth(width2);
  };
  useEffect9(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { width, updateWidth };
};
var useWidth_default = useWidth;

// src/utils/functions.tsx
var getShortenedAddress = (address) => {
  const is0x = (addr) => addr?.startsWith("0x");
  return `${address?.substring(0, is0x(address) ? 6 : 4)}...${address?.substr(
    address.length - (is0x(address) ? 8 : 5)
  )}`;
};
var checkPoolBalance = ({
  pools,
  targetChain,
  targetCurrency,
  amount,
  targetNetworkFee
}) => {
  if (!pools) return { isPoolAvailable: false, error: "Pools data unavailable" };
  if (!targetNetworkFee)
    return { isPoolAvailable: false, error: "Undefined target network fee" };
  const targetPool = pools.find(
    (pool) => pool.chainName === targetChain
    // get the current target network pool info
  );
  if (!targetPool)
    return {
      isPoolAvailable: false,
      error: `Pools for ${CHAIN_NAMES_TO_STRING[targetChain]} unavailable!`
    };
  const { balance: poolTokens, nativeGasAmount: poolGasAvailable } = targetPool;
  const targetToken = poolTokens.find(
    (token) => token.tokenSymbol === targetCurrency
  );
  const { amount: targetTokenBalance } = targetToken;
  if (parseFloat(amount) > parseFloat(targetTokenBalance))
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough ${targetCurrency}!`
    };
  if (targetNetworkFee.amount >= poolGasAvailable)
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough gas!`
    };
  return { isPoolAvailable: true, error: "" };
};

// src/components/reusable/WalletButton.tsx
import { useWallet as useSolanaWallet4 } from "@solana/wallet-adapter-react";
import { useWallet as useTronWallet4 } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useAppKit } from "@reown/appkit/react";

// src/components/reusable/CopyButton.tsx
import React145, { useEffect as useEffect10, useState as useState6 } from "react";
var CopyButton = ({ text }) => {
  const [copyClicked, setCopyClicked] = useState6(false);
  useEffect10(() => {
    if (!copyClicked) return;
    setTimeout(() => {
      setCopyClicked(false);
    }, 2e3);
  }, [copyClicked]);
  return /* @__PURE__ */ React145.createElement(
    "span",
    {
      className: "copy-btn",
      onClick: () => {
        setCopyClicked(true);
        navigator.clipboard.writeText(text);
      }
    },
    copyClicked ? /* @__PURE__ */ React145.createElement(Check_default, null) : /* @__PURE__ */ React145.createElement(Copy_default, null)
  );
};
var CopyButton_default = CopyButton;

// src/components/reusable/WalletButton.tsx
var WalletButton = ({ errorBelow = false }) => {
  const dispatch = useDispatch8();
  const theme = useSelector15(selectTheme);
  const selectedCoin = useSelector15(selectSourceCurrency);
  const sourceCompliant = useSelector15(selectSourceCompliant);
  const compliantOption = useSelector15(selectCompliantOption);
  const selectedNetwork = useSelector15(selectSourceChain);
  const { connected: isSolanaConnected } = useSolanaWallet4();
  const { connected: isTronConnected } = useTronWallet4();
  const { isReady, statusMessage, walletAddress, connectBitcoinWallet } = useIsWalletReady_default4();
  const { balance } = useBalance2();
  const { open } = useAppKit();
  const { width, updateWidth } = useWidth_default();
  useEffect11(() => {
    if (width === 0) {
      updateWidth(window.innerWidth);
    }
  }, []);
  const handleClick = async () => {
    console.info("Handling click");
    console.info("Handling click: Case", 1);
    if (selectedNetwork === "SOL" /* SOLANA */) {
      isSolanaConnected ? dispatch(setAccountDetailsModal(true)) : dispatch(setSolanaConnectModal(true));
      return;
    }
    console.info("Handling click: Case", 2);
    if (selectedNetwork === "TRX" /* TRON */) {
      isTronConnected ? dispatch(setAccountDetailsModal(true)) : dispatch(setTronConnectModal(true));
      return;
    }
    console.info("Handling click: Case", 3);
    if (selectedNetwork === "BTC" /* BTC */) {
      connectBitcoinWallet();
      return;
    }
    console.info("Handling click: Case", 4);
    try {
      console.info("Attempting to open AppKitModal");
      await open();
      console.info("AppKitModal opened successfully");
    } catch (error) {
      console.error("Failed to open AppKitModal", error);
    }
  };
  const errorMessage = useMemo12(() => {
    if (!isReady) return statusMessage;
    if (compliantOption && sourceCompliant !== null && !sourceCompliant?.isCompliant)
      return `Source address has ${sourceCompliant?.results?.[0].result?.risk_score} risk`;
    return "";
  }, [isReady, statusMessage, sourceCompliant, compliantOption]);
  useEffect11(() => {
    if (!errorMessage) return;
    toast6.error(errorMessage);
  }, [errorMessage]);
  return /* @__PURE__ */ React146.createElement(
    "div",
    {
      className: `wallet-button ${isReady ? "connected" : "disconnected"} ${theme.colorMode} ${errorBelow ? "error-below" : ""}`,
      "data-testid": "connect-wallet-btn"
    },
    /* @__PURE__ */ React146.createElement("div", { className: "info-wrapper" }, /* @__PURE__ */ React146.createElement(
      "button",
      {
        className: `${isReady ? "connected" : "disconnected"} ${width < 640 && "shortened"} ${theme.colorMode}`,
        onClick: handleClick
      },
      isReady ? width >= 640 ? `${walletAddress || ""}` : getShortenedAddress(walletAddress || "") : "",
      !isReady && /* @__PURE__ */ React146.createElement(Wallet_default, null),
      !isReady && "Connect Wallet"
    ), isReady && /* @__PURE__ */ React146.createElement(CopyButton_default, { text: walletAddress })),
    isReady ? /* @__PURE__ */ React146.createElement("p", { className: "balance-info" }, balance.toFixed(2), " ", selectedCoin, " available") : null
  );
};
var WalletButton_default = WalletButton;

// src/components/reusable/CoinDropdown.tsx
import React147, { useEffect as useEffect13, useMemo as useMemo14, useRef as useRef2, useState as useState8 } from "react";
import { useSelector as useSelector17 } from "react-redux";
import { useDispatch as useDispatch10 } from "react-redux";

// src/hooks/useCurrencyOptions.tsx
import { useEffect as useEffect12, useMemo as useMemo13, useState as useState7 } from "react";
import { useSelector as useSelector16 } from "react-redux";
import { useDispatch as useDispatch9 } from "react-redux";
import toast7 from "react-hot-toast";

// src/components/reusable/NetworkDropdown.tsx
import React148, { useEffect as useEffect14, useMemo as useMemo15, useRef as useRef3, useState as useState9 } from "react";
import { useSelector as useSelector18, useDispatch as useDispatch11 } from "react-redux";
import toast8 from "react-hot-toast";
var NetworkDropdown = React148.memo(
  ({ isSourceChain = true }) => {
    const [collapsed, setCollapsed] = useState9(true);
    const [availableNetworks, setAvailableNetworks] = useState9([]);
    const ref = useRef3();
    const sourceChangeRef = useRef3(false);
    const mode = useSelector18(selectMode);
    const autoSwitchChain = useSelector18(selectWalletAutoConnect);
    const useFIAT = useSelector18(selectUseFIAT);
    const dAppOption = useSelector18(selectDappOption);
    const originNetwork = useSelector18(selectSourceChain);
    const targetNetwork = useSelector18(selectTargetChain);
    const nodeProviderQuery = useSelector18(selectNodeProviderQuery);
    const { options: networkOptions3 } = useNetworkOptions();
    const selectedNetwork = useMemo15(() => {
      const index = networkOptions3.findIndex(
        (option) => option.id === (isSourceChain ? originNetwork : targetNetwork)
      );
      if (index >= 0) return networkOptions3[index];
      return networkOptions3[3];
    }, [originNetwork, targetNetwork, networkOptions3]);
    const networks = useMemo15(() => {
      if (isSourceChain && mode === "bridge" /* bridge */) {
        return networkOptions3;
      }
      return networkOptions3.filter(
        (network) => availableNetworks.findIndex((id) => id === network.id) >= 0
      );
    }, [
      networkOptions3,
      isSourceChain,
      availableNetworks,
      dAppOption,
      originNetwork
    ]);
    const theme = useSelector18(selectTheme);
    const dispatch = useDispatch11();
    useEffect14(() => {
      if (!nodeProviderQuery || mode !== "bridge" /* bridge */) return;
      (async function() {
        try {
          let chains = [];
          if (originNetwork === "FIAT" /* FIAT */) {
            chains = ["ETH" /* ETHEREUM */, "POL" /* POLYGON */];
          } else {
            const networks2 = await fetchWrapper.get(
              `${nodeProviderQuery}/kima-finance/kima-blockchain/chains/get_available_chains/${originNetwork}`
            );
            chains = networks2.Chains;
            if (useFIAT) chains.push("FIAT" /* FIAT */);
          }
          setAvailableNetworks(chains);
          if (isSourceChain && !targetNetwork) {
            dispatch(setTargetChain(chains[0]));
          }
          if (sourceChangeRef.current) {
            sourceChangeRef.current = false;
            dispatch(
              setTargetChain(
                chains.findIndex((chain) => chain === targetNetwork) < 0 || targetNetwork === originNetwork ? chains[0] : targetNetwork
              )
            );
            dispatch(setTargetChainFetching(false));
          }
        } catch (e) {
          console.log("rpc disconnected", e);
          toast8.error("rpc disconnected");
        }
      })();
    }, [
      nodeProviderQuery,
      originNetwork,
      targetNetwork,
      mode,
      isSourceChain,
      useFIAT
    ]);
    useEffect14(() => {
      if (!nodeProviderQuery || mode !== "payment" /* payment */) return;
      (async function() {
        try {
          if (dAppOption === "LPAdd" /* LPAdd */ || dAppOption === "LPDrain" /* LPDrain */) {
            setAvailableNetworks([targetNetwork]);
          } else {
            if (targetNetwork === "FIAT" /* FIAT */) {
              setAvailableNetworks(["ETH" /* ETHEREUM */, "POL" /* POLYGON */]);
              return;
            }
            const networks2 = await fetchWrapper.get(
              `${nodeProviderQuery}/kima-finance/kima-blockchain/chains/get_available_chains/${targetNetwork}`
            );
            setAvailableNetworks(networks2.Chains);
          }
        } catch (e) {
          console.log("rpc disconnected", e);
          toast8.error("rpc disconnected");
        }
      })();
    }, [nodeProviderQuery, mode, targetNetwork, dAppOption]);
    useEffect14(() => {
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
    return /* @__PURE__ */ React148.createElement(
      "div",
      {
        className: `network-dropdown ${theme.colorMode} ${collapsed ? "collapsed" : "toggled"}`,
        onClick: () => {
          if (!autoSwitchChain && isSourceChain) return;
          setCollapsed((prev) => !prev);
        },
        ref
      },
      /* @__PURE__ */ React148.createElement("div", { className: "network-wrapper" }, /* @__PURE__ */ React148.createElement("div", { className: "icon" }, /* @__PURE__ */ React148.createElement(selectedNetwork.icon, null)), /* @__PURE__ */ React148.createElement("span", null, selectedNetwork.label)),
      /* @__PURE__ */ React148.createElement(
        "div",
        {
          className: `network-menu ${networks.length > 1 && "custom-scrollbar"} ${theme.colorMode} ${collapsed ? "collapsed" : "toggled"}`
        },
        networks.map((network) => /* @__PURE__ */ React148.createElement(
          "div",
          {
            className: `network-menu-item ${theme.colorMode}`,
            key: network.label,
            onClick: async () => {
              if (isSourceChain) {
                dispatch(setTargetChainFetching(true));
                dispatch(setSourceChain(network.id));
                sourceChangeRef.current = true;
              } else {
                dispatch(setTargetChain(network.id));
                dispatch(setServiceFee(-1));
              }
            }
          },
          /* @__PURE__ */ React148.createElement("div", { className: "icon" }, /* @__PURE__ */ React148.createElement(network.icon, null)),
          /* @__PURE__ */ React148.createElement("p", null, network.label)
        ))
      ),
      /* @__PURE__ */ React148.createElement("div", { className: `dropdown-icon ${collapsed ? "toggled" : "collapsed"}` }, /* @__PURE__ */ React148.createElement(Arrow_default, { fill: "none" }))
    );
  }
);

// src/components/reusable/ConfirmDetails.tsx
import React149, { useEffect as useEffect15, useMemo as useMemo16 } from "react";
import { useSelector as useSelector19 } from "react-redux";
var ConfirmDetails = ({ isApproved }) => {
  const feeDeduct = useSelector19(selectFeeDeduct);
  const mode = useSelector19(selectMode);
  const dAppOption = useSelector19(selectDappOption);
  const theme = useSelector19(selectTheme);
  const amount = useSelector19(selectAmount);
  const { totalFeeUsd } = useSelector19(selectServiceFee);
  const originNetwork = useSelector19(selectSourceChain);
  const targetNetwork = useSelector19(selectTargetChain);
  const targetAddress = useSelector19(selectTargetAddress);
  const bankDetails = useSelector19(selectBankDetails);
  const signature = useSelector19(selectSignature);
  const transactionOption = useSelector19(selectTransactionOption);
  const { walletAddress } = useIsWalletReady_default4();
  const originNetworkOption = useMemo16(
    () => networkOptions.filter((network) => network.id === originNetwork)[0],
    [networkOptions, originNetwork]
  );
  const targetNetworkOption = useMemo16(
    () => networkOptions.filter(
      (network) => network.id === (mode === "payment" /* payment */ ? transactionOption?.targetChain : targetNetwork)
    )[0],
    [networkOptions, originNetwork]
  );
  const sourceCurrency = useSelector19(selectSourceCurrency);
  const targetCurrency = useSelector19(selectTargetCurrency);
  const { width, updateWidth } = useWidth_default();
  useEffect15(() => {
    width === 0 && updateWidth(window.innerWidth);
  }, []);
  const SourceCoinIcon = COIN_LIST[sourceCurrency].icon || COIN_LIST["USDK"].icon;
  const TargetCoinIcon = COIN_LIST[targetCurrency].icon || COIN_LIST["USDK"].icon;
  const sourceWalletAddress = useMemo16(() => {
    return width >= 916 ? walletAddress : getShortenedAddress(walletAddress || "");
  }, [walletAddress]);
  const targetWalletAddress = useMemo16(() => {
    return getShortenedAddress(
      (mode === "payment" /* payment */ ? transactionOption?.targetAddress : targetAddress) || ""
    );
  }, [mode, transactionOption, targetAddress]);
  const amountToShow = useMemo16(() => {
    if (originNetwork === "BTC" /* BTC */ || targetNetwork === "BTC" /* BTC */) {
      return (feeDeduct ? +amount : +amount + totalFeeUsd).toFixed(8);
    }
    return formatterFloat2.format(feeDeduct ? +amount : +amount + totalFeeUsd);
  }, [amount, totalFeeUsd, originNetwork, targetNetwork, feeDeduct]);
  return /* @__PURE__ */ React149.createElement("div", { className: `confirm-details ${theme.colorMode}` }, /* @__PURE__ */ React149.createElement("p", null, "Step ", isApproved ? "2" : "1", "\xA0of 2\xA0\xA0\xA0", isApproved ? "Submit transaction" : originNetwork === "FIAT" /* FIAT */ ? "Bank Details" : "Approval"), originNetwork === "FIAT" /* FIAT */ ? /* @__PURE__ */ React149.createElement("div", null, /* @__PURE__ */ React149.createElement("div", { className: "detail-item" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "IBAN:"), /* @__PURE__ */ React149.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ React149.createElement("div", { className: "icon" }, /* @__PURE__ */ React149.createElement(originNetworkOption.icon, null)), "FIAT"), /* @__PURE__ */ React149.createElement("p", null, "ES6621000418401234567891")), /* @__PURE__ */ React149.createElement("div", { className: "detail-item" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "Recipient:"), /* @__PURE__ */ React149.createElement("p", null, "Kima Sandbox")), /* @__PURE__ */ React149.createElement("div", { className: "detail-item" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "BIC:"), /* @__PURE__ */ React149.createElement("p", null, "CAIXESBBXXX")), /* @__PURE__ */ React149.createElement("div", { className: "detail-item" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "Description:"), /* @__PURE__ */ React149.createElement("p", { className: "signature" }, signature))) : /* @__PURE__ */ React149.createElement("div", { className: "detail-item" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "Source wallet:"), /* @__PURE__ */ React149.createElement("div", { className: "network-details" }, /* @__PURE__ */ React149.createElement("div", { className: "kima-card-network-container" }, /* @__PURE__ */ React149.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ React149.createElement("div", { className: "icon" }, /* @__PURE__ */ React149.createElement(originNetworkOption.icon, null)), originNetworkOption.label)), /* @__PURE__ */ React149.createElement("p", { className: theme.colorMode }, width >= 916 ? dAppOption === "LPDrain" /* LPDrain */ ? targetAddress : walletAddress : dAppOption === "LPDrain" /* LPDrain */ ? targetWalletAddress : sourceWalletAddress))), /* @__PURE__ */ React149.createElement("div", { className: "detail-item amount" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "Amount:"), /* @__PURE__ */ React149.createElement("span", { className: "amount-container" }, /* @__PURE__ */ React149.createElement("div", { className: "coin-details" }, /* @__PURE__ */ React149.createElement(SourceCoinIcon, null), /* @__PURE__ */ React149.createElement("p", null, amountToShow, " ", sourceCurrency)), sourceCurrency !== targetCurrency && /* @__PURE__ */ React149.createElement("div", { className: "coin-details" }, "\u2192 ", /* @__PURE__ */ React149.createElement(TargetCoinIcon, null), " ", targetCurrency), /* @__PURE__ */ React149.createElement("div", { className: "amount-details" }, /* @__PURE__ */ React149.createElement("span", null, feeDeduct ? "Gas fee deduction" : "Gas fees (Source + Dest)"), /* @__PURE__ */ React149.createElement("span", { className: "service-fee" }, formatterFloat2.format(totalFeeUsd), " ", sourceCurrency)), /* @__PURE__ */ React149.createElement("div", { className: "amount-details" }, /* @__PURE__ */ React149.createElement("span", null, "Total"), /* @__PURE__ */ React149.createElement("span", { className: "service-fee" }, formatterFloat2.format(parseFloat(amountToShow) - totalFeeUsd), " ", targetCurrency)))), targetNetwork === "FIAT" /* FIAT */ ? /* @__PURE__ */ React149.createElement("div", null, /* @__PURE__ */ React149.createElement("div", { className: "detail-item" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "IBAN:"), /* @__PURE__ */ React149.createElement("p", null, bankDetails.iban), /* @__PURE__ */ React149.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ React149.createElement("div", { className: "icon" }, /* @__PURE__ */ React149.createElement(targetNetworkOption.icon, null)), "FIAT")), /* @__PURE__ */ React149.createElement("div", { className: "detail-item" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "Recipient:"), /* @__PURE__ */ React149.createElement("p", null, bankDetails.recipient))) : /* @__PURE__ */ React149.createElement("div", { className: "detail-item" }, /* @__PURE__ */ React149.createElement("span", { className: "label" }, "Target wallet:"), /* @__PURE__ */ React149.createElement("div", { className: "network-details" }, /* @__PURE__ */ React149.createElement("div", { className: "kima-card-network-container" }, /* @__PURE__ */ React149.createElement("span", { className: `kima-card-network-label ${theme.colorMode}` }, /* @__PURE__ */ React149.createElement("div", { className: "icon" }, /* @__PURE__ */ React149.createElement(targetNetworkOption.icon, null)), targetNetworkOption.label)), /* @__PURE__ */ React149.createElement("p", { className: theme.colorMode }, width >= 916 ? dAppOption === "LPDrain" /* LPDrain */ ? walletAddress : targetAddress : dAppOption === "LPDrain" /* LPDrain */ ? sourceWalletAddress : targetWalletAddress))));
};
var ConfirmDetails_default = ConfirmDetails;

// src/components/reusable/AddressInput.tsx
import React150, { useEffect as useEffect16 } from "react";
import { useDispatch as useDispatch12 } from "react-redux";
import { useSelector as useSelector20 } from "react-redux";
var AddressInput = ({
  theme,
  placeholder
}) => {
  const dispatch = useDispatch12();
  const mode = useSelector20(selectMode);
  const sourceChain = useSelector20(selectSourceChain);
  const targetChain = useSelector20(selectTargetChain);
  const { walletAddress: sourceAddress, isReady } = useIsWalletReady_default4();
  const targetAddress = useSelector20(selectTargetAddress);
  const isEvm = (chain) => {
    return chain !== "SOL" && chain !== "TRX" && chain !== "BTC";
  };
  useEffect16(() => {
    if (mode === "payment" /* payment */) return;
    if (isEvm(sourceChain) && isEvm(targetChain)) {
      dispatch(setTargetAddress(isReady && sourceAddress ? sourceAddress : ""));
      return;
    }
    console.log(
      "AddressInput:: source or target chain non EVM. resetting target address"
    );
    dispatch(setTargetAddress(""));
  }, [sourceChain, targetChain, sourceAddress, isReady, mode, dispatch]);
  return /* @__PURE__ */ React150.createElement(
    "input",
    {
      className: `kima-address-input ${theme}`,
      type: "text",
      placeholder,
      value: targetAddress,
      onChange: (e) => dispatch(setTargetAddress(e.target.value)),
      spellCheck: false
    }
  );
};
var AddressInput_default = AddressInput;

// src/components/reusable/CustomCheckbox.tsx
import React151 from "react";
import { useSelector as useSelector21 } from "react-redux";
var CustomCheckbox = ({ text, checked, setCheck }) => {
  const theme = useSelector21(selectTheme);
  return /* @__PURE__ */ React151.createElement("div", { className: "kima-custom-checkbox" }, /* @__PURE__ */ React151.createElement(
    "div",
    {
      className: "custom-checkbox-content",
      onClick: () => setCheck(!checked)
    },
    /* @__PURE__ */ React151.createElement("div", { className: `custom-checkbox-icon-wrapper ${theme.colorMode}` }, checked && /* @__PURE__ */ React151.createElement(Check_default, null)),
    /* @__PURE__ */ React151.createElement("span", null, text)
  ));
};
var CustomCheckbox_default = CustomCheckbox;

// src/components/reusable/StepBox.tsx
import React152 from "react";
import { useSelector as useSelector22 } from "react-redux";
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
  const theme = useSelector22(selectTheme);
  const explorerUrl = useSelector22(selectKimaExplorer);
  const networkOption = useSelector22(selectNetworkOption);
  const SourceInfo = getNetworkOption(data?.sourceChain);
  const TargetInfo = getNetworkOption(data?.targetChain);
  const CHAIN_NAMES_TO_EXPLORER = networkOption === "mainnet" /* mainnet */ ? CHAIN_NAMES_TO_EXPLORER_MAINNET : CHAIN_NAMES_TO_EXPLORER_TESTNET;
  return /* @__PURE__ */ React152.createElement("div", { className: "kima-stepbox" }, /* @__PURE__ */ React152.createElement("div", { className: `content-wrapper ${theme.colorMode}` }, stepInfo2.map((item, index) => /* @__PURE__ */ React152.createElement("div", { key: item.title, className: "step-item" }, /* @__PURE__ */ React152.createElement(
    "div",
    {
      className: `info-item
                  ${step >= index ? index === loadingStep ? "active" : index === errorStep ? "error" : "completed" : ""} 
                  ${step < index && "locked"} ${theme.colorMode}`
    },
    step < index && /* @__PURE__ */ React152.createElement(Lock_default, null),
    step >= index ? index === loadingStep ? /* @__PURE__ */ React152.createElement(Loader_default, { className: "loader" }) : index === errorStep ? /* @__PURE__ */ React152.createElement(Warning_default, null) : /* @__PURE__ */ React152.createElement(Check_default, null) : null,
    /* @__PURE__ */ React152.createElement("p", null, item.title)
  ), index === 0 && data?.kimaTxHash ? /* @__PURE__ */ React152.createElement("div", { className: `info-item ${theme.colorMode}` }, /* @__PURE__ */ React152.createElement("div", { className: "icon" }, /* @__PURE__ */ React152.createElement(USDK_default, null)), /* @__PURE__ */ React152.createElement("p", { className: "chain-name" }, "Kima TX ID:"), /* @__PURE__ */ React152.createElement("p", null, /* @__PURE__ */ React152.createElement(
    ExternalLink_default,
    {
      to: `${explorerUrl}/transactions/?tx=${data?.kimaTxHash}`
    },
    getShortenedAddress(data?.kimaTxHash || "")
  ), /* @__PURE__ */ React152.createElement(CopyButton_default, { text: data?.kimaTxHash }))) : null, index === 1 && data?.tssPullHash ? /* @__PURE__ */ React152.createElement("div", { className: `info-item ${theme.colorMode} source-chain` }, /* @__PURE__ */ React152.createElement("div", { className: "icon" }, SourceInfo ? /* @__PURE__ */ React152.createElement(SourceInfo.icon, null) : /* @__PURE__ */ React152.createElement(Ethereum_default, null)), /* @__PURE__ */ React152.createElement("p", { className: "chain-name" }, CHAIN_NAMES_TO_STRING[data?.sourceChain || "ETH" /* ETHEREUM */], " ", "TX ID:"), /* @__PURE__ */ React152.createElement("p", null, /* @__PURE__ */ React152.createElement(
    ExternalLink_default,
    {
      to: `https://${CHAIN_NAMES_TO_EXPLORER[data?.sourceChain || "ETH" /* ETHEREUM */]}/${data?.sourceChain === "TRX" /* TRON */ ? "transaction" : "tx"}/${data?.tssPullHash}${data?.sourceChain === "SOL" /* SOLANA */ && networkOption === "testnet" /* testnet */ ? "?cluster=devnet" : ""}`
    },
    getShortenedAddress(data?.tssPullHash || "")
  ), /* @__PURE__ */ React152.createElement(CopyButton_default, { text: data?.tssPullHash || "" }))) : null, index === 3 && data?.tssReleaseHash ? /* @__PURE__ */ React152.createElement("div", { className: `info-item ${theme.colorMode} target-chain` }, /* @__PURE__ */ React152.createElement("div", { className: "icon" }, TargetInfo ? /* @__PURE__ */ React152.createElement(TargetInfo.icon, null) : /* @__PURE__ */ React152.createElement(Ethereum_default, null)), /* @__PURE__ */ React152.createElement("p", { className: "chain-name" }, CHAIN_NAMES_TO_STRING[data?.targetChain || "ETH" /* ETHEREUM */], " ", "TX ID:"), /* @__PURE__ */ React152.createElement("p", null, /* @__PURE__ */ React152.createElement(
    ExternalLink_default,
    {
      to: `https://${CHAIN_NAMES_TO_EXPLORER[data?.targetChain || "ETH" /* ETHEREUM */]}/${data?.targetChain === "TRX" /* TRON */ ? "transaction" : "tx"}/${data?.tssReleaseHash}${data?.targetChain === "SOL" /* SOLANA */ && networkOption === "testnet" /* testnet */ ? "?cluster=devnet" : ""}`
    },
    getShortenedAddress(data?.tssReleaseHash || "")
  ), /* @__PURE__ */ React152.createElement(CopyButton_default, { text: data?.tssReleaseHash || "" }))) : null))));
};
var StepBox_default = StepBox;

// src/components/reusable/BankInput.tsx
import React153 from "react";
import { useDispatch as useDispatch13 } from "react-redux";
import { useSelector as useSelector23 } from "react-redux";
var BankInput = () => {
  const dispatch = useDispatch13();
  const theme = useSelector23(selectTheme);
  const bankDetails = useSelector23(selectBankDetails);
  return /* @__PURE__ */ React153.createElement("div", { className: "bank-input" }, /* @__PURE__ */ React153.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ React153.createElement("span", { className: "label" }, "IBAN:"), /* @__PURE__ */ React153.createElement(
    "input",
    {
      className: "kima-address-input",
      type: "text",
      value: bankDetails.iban,
      onChange: (e) => dispatch(setBankDetails({ ...bankDetails, iban: e.target.value }))
    }
  )), /* @__PURE__ */ React153.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ React153.createElement("span", { className: "label" }, "Recipient:"), /* @__PURE__ */ React153.createElement(
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
import React154 from "react";
import { useDispatch as useDispatch14 } from "react-redux";
import { useSelector as useSelector24 } from "react-redux";
var TxButton = ({ theme }) => {
  const dispatch = useDispatch14();
  const handleClick = () => {
    dispatch(setPendingTxPopup(true));
  };
  const txCount = useSelector24(selectPendingTxs);
  return /* @__PURE__ */ React154.createElement(
    "button",
    {
      className: `secondary-button tx-button ${theme.colorMode}`,
      onClick: handleClick
    },
    txCount,
    /* @__PURE__ */ React154.createElement(
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
import { Provider as Provider2 } from "react-redux";
import { useSelector as useSelector25 } from "react-redux";
import { useDispatch as useDispatch15 } from "react-redux";
import { toast as toast9, Toaster } from "react-hot-toast";
var TransactionWidget = ({ theme }) => {
  const [step, setStep] = useState10(0);
  const [focus, setFocus] = useState10(-1);
  const [errorStep, setErrorStep] = useState10(-1);
  const [errorMessage, setErrorMessage] = useState10("");
  const [loadingStep, setLoadingStep] = useState10(-1);
  const [minimized, setMinimized] = useState10(false);
  const [percent, setPercent] = useState10(0);
  const [data, setData] = useState10();
  const dispatch = useDispatch15();
  const txId = useSelector25(selectTxId);
  const dAppOption = useSelector25(selectDappOption);
  const closeHandler = useSelector25(selectCloseHandler);
  const successHandler = useSelector25(selectSuccessHandler);
  const graphqlProviderQuery = useSelector25(selectGraphqlProviderQuery);
  useEffect17(() => {
    if (!graphqlProviderQuery || txId < 0) return;
    const updateTxData = async () => {
      if (data?.status === "Completed" /* COMPLETED */) return;
      try {
        let data2;
        const isLP = dAppOption === "LPAdd" /* LPAdd */ || dAppOption === "LPDrain" /* LPDrain */;
        const result = await fetchWrapper.post(
          graphqlProviderQuery,
          JSON.stringify({
            query: isLP ? `query TransactionDetailsKima($txId: String) {
                  liquidity_transaction_data(where: { tx_id: { _eq: ${txId.toString()} } }, limit: 1) {
                    failreason
                    pullfailcount
                    pullhash
                    releasefailcount
                    releasehash
                    txstatus
                    amount
                    creator
                    chain
                    providerchainaddress
                    symbol
                    tx_id
                    kimahash
                  }
                }` : `query TransactionDetailsKima($txId: String) {
                  transaction_data(where: { tx_id: { _eq: ${txId.toString()} } }, limit: 1) {
                    failreason
                    pullfailcount
                    pullhash
                    releasefailcount
                    releasehash
                    txstatus
                    amount
                    creator
                    originaddress
                    originchain
                    originsymbol
                    targetsymbol
                    targetaddress
                    targetchain
                    tx_id
                    kimahash
                  }
                }`
          })
        );
        if (isLP && !result?.data?.liquidity_transaction_data?.length || !isLP && !result?.data?.transaction_data?.length) {
          return;
        }
        if (isLP) {
          data2 = result?.data.liquidity_transaction_data[0];
        } else {
          data2 = result?.data.transaction_data[0];
        }
        console.log(data2);
        if (!data2) return;
        if (isLP) {
          setData({
            status: data2.txstatus,
            sourceChain: data2.chain,
            targetChain: data2.chain,
            tssPullHash: dAppOption === "LPAdd" /* LPAdd */ ? data2.releasehash : "",
            tssReleaseHash: dAppOption === "LPDrain" /* LPDrain */ ? data2.releasehash : "",
            failReason: data2.failreason,
            amount: +data2.amount,
            sourceSymbol: data2.symbol,
            targetSymbol: data2.symbol,
            kimaTxHash: data2.kimahash
          });
        } else {
          setData({
            status: data2.txstatus,
            sourceChain: data2.originchain,
            targetChain: data2.targetchain,
            tssPullHash: data2.pullhash,
            tssReleaseHash: data2.releasehash,
            failReason: data2.failreason,
            amount: +data2.amount,
            sourceSymbol: data2.originsymbol,
            targetSymbol: data2.targetsymbol,
            kimaTxHash: data2.kimahash
          });
        }
        if (data2.status === "Completed" /* COMPLETED */) {
          clearInterval(timerId);
          setTimeout(() => {
            successHandler({
              txId
            });
          }, 3e3);
        }
      } catch (e) {
        toast9.error("rpc disconnected", { icon: /* @__PURE__ */ React155.createElement(Error_default, null) });
        console.log("rpc disconnected", e);
      }
    };
    const timerId = setInterval(() => {
      updateTxData();
    }, 1e4);
    updateTxData();
    return () => {
      clearInterval(timerId);
    };
  }, [graphqlProviderQuery, txId, dAppOption]);
  useEffect17(() => {
    if (!data) {
      setStep(0);
      setLoadingStep(0);
      return;
    }
    console.log(data.status, errorMessage);
    setErrorStep(-1);
    const status = data.status;
    if (status === "Available" /* AVAILABLE */ || status === "Pulled" /* PULLED */) {
      setStep(1);
      setPercent(25);
      setLoadingStep(1);
    } else if (status === "Pull_Confirmed" /* CONFIRMED */) {
      setStep(2);
      setPercent(50);
      setLoadingStep(2);
    } else if (status.startsWith("UnAvailable" /* UNAVAILABLE */)) {
      setStep(1);
      setPercent(25);
      setErrorStep(1);
      setLoadingStep(-1);
      console.log(data.failReason);
      toast9.error("Unavailable", { icon: /* @__PURE__ */ React155.createElement(Error_default, null) });
      setErrorMessage("Unavailable");
    } else if (status === "KeySigned" /* KEYSIGNED */) {
      setStep(3);
      setPercent(75);
      setLoadingStep(3);
    } else if (status === "Paid" /* PAID */) {
      setStep(3);
      setPercent(90);
      setLoadingStep(3);
    } else if (status === "FailedToPay" /* FAILEDTOPAY */) {
      setStep(3);
      setPercent(90);
      setErrorStep(3);
      setLoadingStep(-1);
      console.log(data.failReason);
      toast9.error("Failed to release tokens to target!", {
        icon: /* @__PURE__ */ React155.createElement(Error_default, null)
      });
      setErrorMessage("Failed to release tokens to target!");
    } else if (status === "FailedToPull" /* FAILEDTOPULL */) {
      setStep(1);
      setPercent(25);
      setErrorStep(1);
      setLoadingStep(-1);
      console.log(data.failReason);
      toast9.error("Failed to pull tokens from source!", { icon: /* @__PURE__ */ React155.createElement(Error_default, null) });
      setErrorMessage("Failed to pull tokens from source!");
    } else if (status === "Completed" /* COMPLETED */) {
      setStep(4);
      setPercent(100);
      setLoadingStep(-1);
    }
  }, [data?.status]);
  return /* @__PURE__ */ React155.createElement(Provider2, { store }, /* @__PURE__ */ React155.createElement(
    "div",
    {
      className: `kima-card transaction-card ${theme.colorMode} ${minimized ? "minimized" : ""}`,
      style: {
        background: theme.colorMode === "light" /* light */ ? theme.backgroundColorLight : theme.backgroundColorDark
      }
    },
    /* @__PURE__ */ React155.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ React155.createElement("div", { className: "topbar" }, /* @__PURE__ */ React155.createElement("div", { className: "title" }, /* @__PURE__ */ React155.createElement("h3", null, "Transferring ", formatterFloat2.format(data?.amount || 0), " ", `${data?.sourceSymbol || "USDK"} \u2192 ${data?.targetSymbol || "USDK"}`, "\xA0\xA0", `(${percent}%)`)), !minimized ? /* @__PURE__ */ React155.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ React155.createElement(
      "button",
      {
        className: "icon-button minimize",
        onClick: () => {
          setMinimized(true);
        }
      },
      /* @__PURE__ */ React155.createElement(Minimize_default, null)
    ), loadingStep < 0 ? /* @__PURE__ */ React155.createElement(
      "button",
      {
        className: "cross-icon-button",
        onClick: () => {
          dispatch(initialize());
          closeHandler();
        }
      },
      /* @__PURE__ */ React155.createElement(
        Cross_default,
        {
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    ) : null) : /* @__PURE__ */ React155.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ React155.createElement("div", { className: "maximize", onClick: () => setMinimized(false) }, "View"))), !minimized && data?.sourceChain && data?.targetChain && /* @__PURE__ */ React155.createElement(
      NetworkLabel_default,
      {
        sourceChain: data?.sourceChain,
        targetChain: data?.targetChain
      }
    )),
    /* @__PURE__ */ React155.createElement("div", { className: "kima-card-content" }, /* @__PURE__ */ React155.createElement(
      Progressbar_default,
      {
        step,
        focus,
        errorStep,
        setFocus,
        loadingStep
      }
    ), /* @__PURE__ */ React155.createElement(
      StepBox_default,
      {
        step,
        errorStep,
        loadingStep,
        data
      }
    )),
    /* @__PURE__ */ React155.createElement(
      Toaster,
      {
        position: "top-right",
        reverseOrder: false,
        containerStyle: {
          position: "absolute"
        },
        toastOptions: {
          duration: 10 * 1e3,
          style: {
            position: "relative",
            top: "3rem",
            right: "1.5rem",
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
    ),
    /* @__PURE__ */ React155.createElement("div", { className: "floating-footer" }, /* @__PURE__ */ React155.createElement("div", { className: `items ${theme.colorMode}` }, /* @__PURE__ */ React155.createElement("span", null, "Powered by"), /* @__PURE__ */ React155.createElement(FooterLogo_default, { fill: "black" }), /* @__PURE__ */ React155.createElement("strong", null, "Network")))
  ));
};

// src/components/TransferWidget.tsx
import React169, { useEffect as useEffect27, useState as useState19, useRef as useRef10 } from "react";
import { useDispatch as useDispatch28, useSelector as useSelector41 } from "react-redux";

// src/components/reusable/SingleForm.tsx
import React160, { useEffect as useEffect23, useMemo as useMemo21, useState as useState16 } from "react";
import { toast as toast10 } from "react-hot-toast";
import { useDispatch as useDispatch20, useSelector as useSelector31 } from "react-redux";

// src/components/primary/SourceNetworkSelector.tsx
import React156, { useState as useState12, useMemo as useMemo17, useRef as useRef4, useEffect as useEffect19 } from "react";
import { useSelector as useSelector27, useDispatch as useDispatch16 } from "react-redux";

// src/hooks/useGetChainData.tsx
import { useEffect as useEffect18, useState as useState11, useCallback as useCallback3 } from "react";
import { useSelector as useSelector26 } from "react-redux";
var useGetChainData = () => {
  const [chainData, setChainData] = useState11([]);
  const plugins = useSelector26(selectAllPlugins);
  const fetchChainData = useCallback3(async () => {
    try {
      const allProviders = getAllPluginProviders();
      const collatedData = [];
      for (const pluginId of Object.keys(allProviders)) {
        const plugin = plugins.find((p) => p.id === pluginId);
        if (plugin?.pluginData?.networks) {
          collatedData.push(...plugin.pluginData.networks);
        }
      }
      setChainData(collatedData);
      console.info("Collated chain data:", collatedData);
    } catch (error) {
      console.error("Error fetching chain data:", error);
    }
  }, [plugins]);
  useEffect18(() => {
    fetchChainData();
  }, [fetchChainData]);
  return { chainData };
};
var useGetChainData_default = useGetChainData;

// src/components/primary/SourceNetworkSelector.tsx
var SourceNetworkSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState12(true);
  const ref = useRef4();
  const originNetwork = useSelector27(selectSourceChain);
  const dispatch = useDispatch16();
  const theme = useSelector27(selectTheme);
  const { chainData } = useGetChainData_default();
  const targetChain = useSelector27(selectTargetChain);
  const networks = useMemo17(() => {
    const data = chainData.filter((network) => network.symbol !== targetChain).map((network) => ({
      id: network.symbol,
      label: network.name,
      icon: network.icon ? /* @__PURE__ */ React156.createElement(network.icon, null) : /* @__PURE__ */ React156.createElement("div", null)
      // Render the icon as JSX
    })) || [];
    console.info("Final data: ", data);
    return data;
  }, [chainData]);
  const selectedNetwork = useMemo17(() => {
    return networks.find((option) => option.id === originNetwork) || networks[0] || { label: "Loading...", icon: null };
  }, [originNetwork, networks]);
  useEffect19(() => {
    console.info("Final networks:", networks);
  }, [chainData]);
  const handleNetworkChange = (networkId) => {
    console.info(`networkId: ${networkId} | originNetwork:`, originNetwork);
    if (networkId === originNetwork) return;
    dispatch(setSourceChain(networkId));
    setCollapsed(false);
  };
  useEffect19(() => {
    const bodyMouseDownHandler = (e) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", bodyMouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", bodyMouseDownHandler);
    };
  }, []);
  return /* @__PURE__ */ React156.createElement(
    "div",
    {
      className: `network-dropdown ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`,
      onClick: () => setCollapsed((prev) => !prev),
      ref
    },
    /* @__PURE__ */ React156.createElement("div", { className: "network-wrapper" }, /* @__PURE__ */ React156.createElement("div", { className: "icon" }, selectedNetwork.icon), /* @__PURE__ */ React156.createElement("span", null, selectedNetwork.label)),
    /* @__PURE__ */ React156.createElement(
      "div",
      {
        className: `network-menu custom-scrollbar ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`
      },
      networks.filter((network) => network.id !== selectedNetwork.id).map((filteredNetwork) => /* @__PURE__ */ React156.createElement(
        "div",
        {
          key: filteredNetwork.id,
          className: `network-menu-item ${theme?.colorMode ?? ""}`,
          onClick: () => handleNetworkChange(filteredNetwork.id)
        },
        /* @__PURE__ */ React156.createElement("div", { className: "icon" }, filteredNetwork.icon),
        /* @__PURE__ */ React156.createElement("p", null, filteredNetwork.label)
      ))
    ),
    /* @__PURE__ */ React156.createElement("div", { className: `dropdown-icon ${collapsed ? "toggled" : "collapsed"}` }, /* @__PURE__ */ React156.createElement(Arrow_default, { fill: "none" }))
  );
};
var SourceNetworkSelector = React156.memo(SourceNetworkSelectorComponent);
var SourceNetworkSelector_default = SourceNetworkSelector;

// src/components/primary/SourceTokenSelector.tsx
import React157, { useState as useState13, useMemo as useMemo18, useRef as useRef5, useEffect as useEffect20 } from "react";
import { useSelector as useSelector28, useDispatch as useDispatch17 } from "react-redux";
var SourceTokenSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState13(true);
  const ref = useRef5();
  const dispatch = useDispatch17();
  const theme = useSelector28(selectTheme);
  const originNetwork = useSelector28(selectSourceChain);
  const sourceCurrency = useSelector28(selectSourceCurrency);
  const { chainData } = useGetChainData_default();
  const tokens = useMemo18(() => {
    const network = chainData.find(
      (network2) => network2.symbol === originNetwork
    );
    if (network && network.tokens) {
      return network.tokens.map((token) => ({
        id: token.symbol,
        label: token.symbol,
        icon: token.icon ? /* @__PURE__ */ React157.createElement(token.icon, null) : /* @__PURE__ */ React157.createElement("div", null)
        // Render the icon as JSX
      }));
    }
    return [];
  }, [chainData, originNetwork]);
  const selectedToken = useMemo18(() => {
    return tokens.find((token) => token.id === sourceCurrency) || tokens[0] || { label: "Select Token", icon: null };
  }, [tokens, sourceCurrency]);
  const handleTokenChange = (tokenId) => {
    if (tokenId === sourceCurrency) return;
    dispatch(setSourceCurrency(tokenId));
    setCollapsed(false);
  };
  useEffect20(() => {
    const bodyMouseDownHandler = (e) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", bodyMouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", bodyMouseDownHandler);
    };
  }, []);
  return /* @__PURE__ */ React157.createElement(
    "div",
    {
      className: `coin-dropdown ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`,
      onClick: () => setCollapsed((prev) => !prev),
      ref
    },
    /* @__PURE__ */ React157.createElement("div", { className: "coin-wrapper" }, /* @__PURE__ */ React157.createElement("div", { className: "icon" }, selectedToken.icon), /* @__PURE__ */ React157.createElement("span", null, selectedToken.label)),
    /* @__PURE__ */ React157.createElement(
      "div",
      {
        className: `coin-menu custom-scrollbar ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`
      },
      tokens.map((token) => /* @__PURE__ */ React157.createElement(
        "div",
        {
          key: token.id,
          className: `coin-item ${theme?.colorMode ?? ""}`,
          onClick: () => handleTokenChange(token.id)
        },
        /* @__PURE__ */ React157.createElement("div", { className: "icon" }, token.icon),
        /* @__PURE__ */ React157.createElement("p", null, token.label)
      ))
    ),
    /* @__PURE__ */ React157.createElement("div", { className: `dropdown-icon ${collapsed ? "toggled" : "collapsed"}` }, /* @__PURE__ */ React157.createElement(Arrow_default, { fill: "none" }))
  );
};
var SourceTokenSelector = React157.memo(SourceTokenSelectorComponent);
var SourceTokenSelector_default = SourceTokenSelector;

// src/components/primary/TargetNetworkSelector.tsx
import React158, { useState as useState14, useMemo as useMemo19, useRef as useRef6, useEffect as useEffect21 } from "react";
import { useSelector as useSelector29, useDispatch as useDispatch18 } from "react-redux";
var TargetNetworkSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState14(true);
  const ref = useRef6();
  const dispatch = useDispatch18();
  const theme = useSelector29(selectTheme);
  const sourceNetwork = useSelector29(selectSourceChain);
  const targetNetwork = useSelector29(selectTargetChain);
  const { chainData } = useGetChainData_default();
  const networks = useMemo19(() => {
    const data = chainData.map((network) => ({
      id: network.symbol,
      label: network.name,
      icon: network.icon ? /* @__PURE__ */ React158.createElement(network.icon, null) : /* @__PURE__ */ React158.createElement("div", null)
      // Render the icon as JSX
    })) || [];
    console.info("Final data (target): ", data);
    return data;
  }, [chainData]);
  useEffect21(() => {
    if (sourceNetwork === targetNetwork || !targetNetwork) {
      const validTarget = networks.find((network) => network.id !== sourceNetwork) || null;
      if (validTarget) {
        dispatch(setTargetChain(validTarget.id));
      } else {
        console.warn("No valid target networks available");
      }
    }
  }, [sourceNetwork, targetNetwork, networks, dispatch]);
  const selectedNetwork = useMemo19(() => {
    return networks.find((network) => network.id === targetNetwork) || networks.find((network) => network.id !== sourceNetwork) || { label: "Select Network", icon: null };
  }, [sourceNetwork, targetNetwork, networks]);
  const availableTargetNetworks = useMemo19(() => {
    return networks.filter(
      (network) => network.id !== sourceNetwork
    );
  }, [networks, sourceNetwork]);
  const handleNetworkChange = (networkId) => {
    if (networkId === targetNetwork) return;
    dispatch(setTargetChain(networkId));
    setCollapsed(false);
  };
  useEffect21(() => {
    const bodyMouseDownHandler = (e) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", bodyMouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", bodyMouseDownHandler);
    };
  }, []);
  return /* @__PURE__ */ React158.createElement(
    "div",
    {
      className: `network-dropdown ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`,
      onClick: () => setCollapsed((prev) => !prev),
      ref
    },
    /* @__PURE__ */ React158.createElement("div", { className: "network-wrapper" }, /* @__PURE__ */ React158.createElement("div", { className: "icon" }, selectedNetwork.icon), /* @__PURE__ */ React158.createElement("span", null, selectedNetwork.label)),
    /* @__PURE__ */ React158.createElement(
      "div",
      {
        className: `network-menu custom-scrollbar ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`
      },
      availableTargetNetworks.map((network) => /* @__PURE__ */ React158.createElement(
        "div",
        {
          key: network.id,
          className: `network-menu-item ${theme?.colorMode ?? ""}`,
          onClick: () => handleNetworkChange(network.id)
        },
        /* @__PURE__ */ React158.createElement("div", { className: "icon" }, network.icon),
        /* @__PURE__ */ React158.createElement("p", null, network.label)
      ))
    ),
    /* @__PURE__ */ React158.createElement("div", { className: `dropdown-icon ${collapsed ? "toggled" : "collapsed"}` }, /* @__PURE__ */ React158.createElement(Arrow_default, { fill: "none" }))
  );
};
var TargetNetworkSelector = React158.memo(TargetNetworkSelectorComponent);
var TargetNetworkSelector_default = TargetNetworkSelector;

// src/components/primary/TargetTokenSelector.tsx
import React159, { useState as useState15, useMemo as useMemo20, useRef as useRef7, useEffect as useEffect22 } from "react";
import { useSelector as useSelector30, useDispatch as useDispatch19 } from "react-redux";
var TargetTokenSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState15(true);
  const ref = useRef7();
  const dispatch = useDispatch19();
  const theme = useSelector30(selectTheme);
  const targetNetwork = useSelector30(selectTargetChain);
  const targetCurrency = useSelector30(selectTargetCurrency);
  const { chainData } = useGetChainData_default();
  const tokens = useMemo20(() => {
    const network = chainData.find(
      (network2) => network2.symbol === targetNetwork
    );
    if (network && network.tokens) {
      return network.tokens.map((token) => ({
        id: token.symbol,
        label: token.symbol,
        icon: token.icon ? /* @__PURE__ */ React159.createElement(token.icon, null) : /* @__PURE__ */ React159.createElement("div", null)
        // Render the icon as JSX
      }));
    }
    return [];
  }, [chainData, targetNetwork]);
  const selectedToken = useMemo20(() => {
    return tokens.find((token) => token.id === targetCurrency) || tokens[0] || { label: "Select Token", icon: null };
  }, [tokens, targetCurrency]);
  const handleTokenChange = (tokenId) => {
    if (tokenId === targetCurrency) return;
    dispatch(setTargetCurrency(tokenId));
    setCollapsed(false);
  };
  useEffect22(() => {
    const bodyMouseDownHandler = (e) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", bodyMouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", bodyMouseDownHandler);
    };
  }, []);
  return /* @__PURE__ */ React159.createElement(
    "div",
    {
      className: `coin-dropdown ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`,
      onClick: () => setCollapsed((prev) => !prev),
      ref
    },
    /* @__PURE__ */ React159.createElement("div", { className: "coin-wrapper" }, /* @__PURE__ */ React159.createElement("div", { className: "icon" }, selectedToken.icon), /* @__PURE__ */ React159.createElement("span", null, selectedToken.label)),
    /* @__PURE__ */ React159.createElement(
      "div",
      {
        className: `coin-menu custom-scrollbar ${theme?.colorMode ?? ""} ${collapsed ? "collapsed" : "toggled"}`
      },
      tokens.map((token) => /* @__PURE__ */ React159.createElement(
        "div",
        {
          key: token.id,
          className: `coin-item ${theme?.colorMode ?? ""}`,
          onClick: () => handleTokenChange(token.id)
        },
        /* @__PURE__ */ React159.createElement("div", { className: "icon" }, token.icon),
        /* @__PURE__ */ React159.createElement("p", null, token.label)
      ))
    ),
    /* @__PURE__ */ React159.createElement("div", { className: `dropdown-icon ${collapsed ? "toggled" : "collapsed"}` }, /* @__PURE__ */ React159.createElement(Arrow_default, { fill: "none" }))
  );
};
var TargetTokenSelector = React159.memo(TargetTokenSelectorComponent);
var TargetTokenSelector_default = TargetTokenSelector;

// src/hooks/useGetFees.tsx
import { useQuery as useQuery4 } from "@tanstack/react-query";

// src/services/feesApi.ts
var getFees = async (amount, originChain, targetChain, backendUrl) => {
  try {
    const response = await fetchWrapper.get(
      `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain}&targetChain=${targetChain}`
    );
    console.log("response: ", response);
    const { totalFeeUsd, breakdown } = response;
    const [sourceNetworkFee, targetNetworkFee] = breakdown;
    const serviceFees = {
      totalFeeUsd,
      sourceNetworkFee,
      targetNetworkFee
    };
    return serviceFees;
  } catch (e) {
    console.error("Failed to fetch fees:", e);
    throw new Error("Failed to fetch fees");
  }
};

// src/hooks/useGetFees.tsx
var useGetFees = (amount, sourceNetwork, targetNetwork, backendUrl) => {
  console.log("amount: ", amount);
  console.log("sourceNetwork: ", sourceNetwork);
  console.log("targetNetwork: ", targetNetwork);
  return useQuery4({
    queryKey: ["fees", amount, sourceNetwork, targetNetwork],
    queryFn: async () => {
      console.log("new call: ", amount, sourceNetwork, targetNetwork);
      return await getFees(amount, sourceNetwork, targetNetwork, backendUrl);
    },
    enabled: !!amount && !!sourceNetwork && !!targetNetwork,
    // Only run when all params are valid
    staleTime: 6e4,
    // Cache for 60 seconds
    retry: 1
  });
};
var useGetFees_default = useGetFees;

// src/components/reusable/SingleForm.tsx
var SingleForm = ({}) => {
  const dispatch = useDispatch20();
  const mode = useSelector31(selectMode);
  const theme = useSelector31(selectTheme);
  const networkOpion = useSelector31(selectNetworkOption);
  const feeDeduct = useSelector31(selectFeeDeduct);
  const { totalFeeUsd } = useSelector31(selectServiceFee);
  const compliantOption = useSelector31(selectCompliantOption);
  const targetCompliant = useSelector31(selectTargetCompliant);
  const transactionOption = useSelector31(selectTransactionOption);
  const sourceNetwork = useSelector31(selectSourceChain);
  const targetNetwork = useSelector31(selectTargetChain);
  const { isReady } = useIsWalletReady_default4();
  const [amountValue, setAmountValue] = useState16("");
  const amount = useSelector31(selectAmount);
  const targetCurrency = useSelector31(selectTargetCurrency);
  const backendUrl = useSelector31(selectBackendUrl);
  const targetAddress = useSelector31(selectTargetAddress);
  const {
    data: fees,
    isLoading,
    error
  } = useGetFees_default(parseFloat(amount), sourceNetwork, targetNetwork, backendUrl);
  useEffect23(() => {
    if (fees) {
      dispatch(setServiceFee(fees));
    }
  }, [fees, dispatch]);
  const TargetIcon = COIN_LIST[targetCurrency || "USDK"]?.icon || COIN_LIST["USDK"].icon;
  const errorMessage = useMemo21(
    () => compliantOption && targetCompliant !== null && !targetCompliant?.isCompliant ? `Target address has ${targetCompliant.results?.[0].result.risk_score} risk` : "",
    [compliantOption, targetCompliant]
  );
  useEffect23(() => {
    if (!errorMessage) return;
    toast10.error(errorMessage);
  }, [errorMessage]);
  useEffect23(() => {
    if (amountValue && amount != "") return;
    setAmountValue(amount);
  }, [amount]);
  return /* @__PURE__ */ React160.createElement("div", { className: "single-form" }, /* @__PURE__ */ React160.createElement("div", { className: "form-item" }, /* @__PURE__ */ React160.createElement("span", { className: "label" }, "Source Network:"), /* @__PURE__ */ React160.createElement("div", { className: "items" }, /* @__PURE__ */ React160.createElement(SourceNetworkSelector_default, null), networkOpion === "mainnet" /* mainnet */ ? /* @__PURE__ */ React160.createElement(SourceTokenSelector_default, null) : /* @__PURE__ */ React160.createElement("div", { className: `amount-label-container items ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement("div", { className: `coin-wrapper ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement("div", { className: "icon-wrapper" }, /* @__PURE__ */ React160.createElement(TargetIcon, null)), targetCurrency)))), /* @__PURE__ */ React160.createElement(
    "div",
    {
      className: `dynamic-area ${sourceNetwork === "FIAT" /* FIAT */ ? "reverse" : "1"}`
    },
    /* @__PURE__ */ React160.createElement(
      "div",
      {
        className: `form-item wallet-button-item ${isReady && "connected"}`
      },
      /* @__PURE__ */ React160.createElement("span", { className: "label" }, "Connect wallet:"),
      /* @__PURE__ */ React160.createElement(WalletButton_default, null)
    ),
    /* @__PURE__ */ React160.createElement("div", { className: "form-item" }, /* @__PURE__ */ React160.createElement("span", { className: "label" }, "Target Network:"), /* @__PURE__ */ React160.createElement("div", { className: "items" }, /* @__PURE__ */ React160.createElement(TargetNetworkSelector_default, null), networkOpion === "mainnet" /* mainnet */ ? /* @__PURE__ */ React160.createElement(TargetTokenSelector_default, null) : /* @__PURE__ */ React160.createElement(
      "div",
      {
        className: `amount-label-container items ${theme.colorMode}`
      },
      /* @__PURE__ */ React160.createElement("div", { className: `coin-wrapper ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement("div", { className: "icon-wrapper" }, /* @__PURE__ */ React160.createElement(TargetIcon, null)), targetCurrency)
    )))
  ), mode === "bridge" /* bridge */ && sourceNetwork !== "FIAT" /* FIAT */ ? targetNetwork === "FIAT" /* FIAT */ ? /* @__PURE__ */ React160.createElement(BankInput_default, null) : /* @__PURE__ */ React160.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement("span", { className: "label" }, "Target Address:"), /* @__PURE__ */ React160.createElement(
    AddressInput_default,
    {
      theme: theme.colorMode,
      placeholder: "Target address"
    }
  )) : /* @__PURE__ */ React160.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement("span", { className: "label" }, "Target Address:"), /* @__PURE__ */ React160.createElement("span", null, targetAddress)), mode === "bridge" /* bridge */ ? /* @__PURE__ */ React160.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement("span", { className: "label" }, "Amount:"), /* @__PURE__ */ React160.createElement("div", { className: `amount-label-container items ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement(
    "input",
    {
      className: `${theme.colorMode}`,
      type: "number",
      placeholder: "Amount",
      value: amountValue || "",
      onChange: (e) => {
        let _amount = +e.target.value;
        const decimal = sourceNetwork === "BTC" /* BTC */ || targetNetwork === "BTC" /* BTC */ ? 8 : 2;
        setAmountValue(e.target.value);
        dispatch(setAmount(_amount.toFixed(decimal)));
      }
    }
  ))) : /* @__PURE__ */ React160.createElement("div", { className: `form-item ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement("span", { className: "label" }, "Amount:"), /* @__PURE__ */ React160.createElement("div", { className: `amount-label-container items ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement(
    "input",
    {
      className: `${theme.colorMode}`,
      type: "number",
      placeholder: "Amount",
      value: transactionOption?.amount || amountValue || "",
      onChange: (e) => {
        let _amount = +e.target.value;
        const decimal = sourceNetwork === "BTC" /* BTC */ || targetNetwork === "BTC" /* BTC */ ? 8 : 2;
        setAmountValue(e.target.value);
        dispatch(setAmount(_amount.toFixed(decimal)));
      },
      disabled: transactionOption?.amount !== void 0
    }
  ), /* @__PURE__ */ React160.createElement("div", { className: `coin-wrapper ${theme.colorMode}` }, /* @__PURE__ */ React160.createElement("div", { className: "icon-wrapper" }, /* @__PURE__ */ React160.createElement(TargetIcon, null)), targetCurrency))), totalFeeUsd > 0 ? /* @__PURE__ */ React160.createElement(
    CustomCheckbox_default,
    {
      text: sourceNetwork === "BTC" /* BTC */ ? `Deduct ${formatterFloat2.format(totalFeeUsd)} BTC fee` : `Deduct $${formatterFloat2.format(totalFeeUsd)} fee`,
      checked: feeDeduct,
      setCheck: (value) => dispatch(setFeeDeduct(value))
    }
  ) : null);
};
var SingleForm_default = SingleForm;

// src/components/reusable/CoinSelect.tsx
import React161, { useState as useState17 } from "react";
import { useSelector as useSelector32 } from "react-redux";
import { useDispatch as useDispatch21 } from "react-redux";
var CoinSelect = () => {
  const dispatch = useDispatch21();
  const theme = useSelector32(selectTheme);
  const mode = useSelector32(selectMode);
  const selectedCoin = useSelector32(selectSourceCurrency);
  const sourceNetwork = useSelector32(selectSourceChain);
  const targetNetwork = useSelector32(selectTargetChain);
  const [amountValue, setAmountValue] = useState17("");
  const Icon = COIN_LIST[selectedCoin || "USDK"].icon;
  return /* @__PURE__ */ React161.createElement("div", { className: `coin-select` }, /* @__PURE__ */ React161.createElement("p", null, "Select Amount of Token for Funding"), /* @__PURE__ */ React161.createElement("div", { className: `amount-input ${theme.colorMode}` }, /* @__PURE__ */ React161.createElement("span", null, "Amount:"), /* @__PURE__ */ React161.createElement("div", { className: "input-wrapper" }, /* @__PURE__ */ React161.createElement(
    "input",
    {
      type: "number",
      value: amountValue || "",
      readOnly: mode === "payment" /* payment */,
      onChange: (e) => {
        const _amount = +e.target.value;
        const decimal = sourceNetwork === "BTC" /* BTC */ || targetNetwork === "BTC" /* BTC */ ? 8 : 2;
        setAmountValue(e.target.value);
        dispatch(setAmount(_amount.toFixed(decimal)));
      }
    }
  ), /* @__PURE__ */ React161.createElement("div", { className: "coin-label" }, /* @__PURE__ */ React161.createElement(Icon, null), /* @__PURE__ */ React161.createElement("span", null, selectedCoin)))));
};
var CoinSelect_default = CoinSelect;

// src/hooks/useAllowance.tsx
import { useCallback as useCallback4, useEffect as useEffect24, useMemo as useMemo22, useState as useState18 } from "react";
import { useSelector as useSelector33 } from "react-redux";
import { Contract as Contract3 } from "@ethersproject/contracts";
import { formatUnits as formatUnits3, parseUnits } from "@ethersproject/units";
import {
  useConnection as useConnection3,
  useWallet as useSolanaWallet5
} from "@solana/wallet-adapter-react";
import { PublicKey as PublicKey7, Transaction as Transaction2 } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID6 } from "@solana/spl-token";

// src/utils/solana/createTransferInstruction.ts
var import_bn = __toESM(require_bn(), 1);
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID5 } from "@solana/spl-token";
import {
  TransactionInstruction as TransactionInstruction2
} from "@solana/web3.js";
import BufferLayout from "buffer-layout";
function createApproveTransferInstruction(source, destination, owner, amount, multiSigners = [], programId = TOKEN_PROGRAM_ID5) {
  const dataLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    BufferLayout.blob(8, "amount")
  ]);
  const keys = addSigners(
    [
      { pubkey: source, isSigner: false, isWritable: true },
      { pubkey: destination, isSigner: false, isWritable: true }
    ],
    owner,
    multiSigners
  );
  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: 4 /* Approve */,
      amount: new TokenAmount(amount).toBuffer()
    },
    data
  );
  return new TransactionInstruction2({ keys, programId, data });
}
function addSigners(keys, ownerOrAuthority, multiSigners) {
  if (multiSigners.length) {
    keys.push({ pubkey: ownerOrAuthority, isSigner: false, isWritable: false });
    for (const signer of multiSigners) {
      keys.push({ pubkey: signer.publicKey, isSigner: true, isWritable: false });
    }
  } else {
    keys.push({ pubkey: ownerOrAuthority, isSigner: true, isWritable: false });
  }
  return keys;
}
var TokenAmount = class extends import_bn.default {
  /**
   * Convert to Buffer representation
   */
  toBuffer() {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }
    if (b.length >= 8) {
      throw new Error("TokenAmount too large");
    }
    const zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  }
  /**
   * Construct a TokenAmount from Buffer representation
   */
  // static fromBuffer(buffer: Buffer): TokenAmount {
  //     if (buffer.length !== 8) {
  //         throw new Error(`Invalid buffer length: ${buffer.length}`)
  //     }
  //     return new BN(
  //         [...buffer]
  //             .reverse()
  //             .map((i) => `00${i.toString(16)}`.slice(-2))
  //             .join(''),
  //         16
  //     )
  // }
};

// src/hooks/useAllowance.tsx
import { useWallet as useTronWallet5 } from "@tronweb3/tronwallet-adapter-react-hooks";

// src/utils/func/index.js
import { utils as ethersUtils } from "ethers";

// src/utils/func/bytes.js
function byte2hexStr(byte) {
  if (typeof byte !== "number") throw new Error("Input must be a number");
  if (byte < 0 || byte > 255) throw new Error("Input must be a byte");
  const hexByteMap = "0123456789ABCDEF";
  let str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 15);
  return str;
}
function byteArray2hexStr(byteArray) {
  let str = "";
  for (let i = 0; i < byteArray.length; i++) str += byte2hexStr(byteArray[i]);
  return str;
}

// src/utils/func/code.js
function isHexChar(c) {
  if (c >= "A" && c <= "F" || c >= "a" && c <= "f" || c >= "0" && c <= "9") {
    return 1;
  }
  return 0;
}
function hexChar2byte(c) {
  let d;
  if (c >= "A" && c <= "F") d = c.charCodeAt(0) - "A".charCodeAt(0) + 10;
  else if (c >= "a" && c <= "f") d = c.charCodeAt(0) - "a".charCodeAt(0) + 10;
  else if (c >= "0" && c <= "9") d = c.charCodeAt(0) - "0".charCodeAt(0);
  if (typeof d === "number") return d;
  else throw new Error("The passed hex char is not a valid hex char");
}
function hexStr2byteArray(str, strict = false) {
  if (typeof str !== "string")
    throw new Error("The passed string is not a string");
  let len = str.length;
  if (strict) {
    if (len % 2) {
      str = `0${str}`;
      len++;
    }
  }
  const byteArray = [];
  let d = 0;
  let j = 0;
  let k = 0;
  for (let i = 0; i < len; i++) {
    const c = str.charAt(i);
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

// src/utils/func/base58.js
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var ALPHABET_MAP = {};
for (let i = 0; i < ALPHABET.length; i++) ALPHABET_MAP[ALPHABET.charAt(i)] = i;
var BASE = 58;
function encode58(buffer) {
  if (buffer.length === 0) return "";
  let i;
  let j;
  const digits = [0];
  for (i = 0; i < buffer.length; i++) {
    for (j = 0; j < digits.length; j++) digits[j] <<= 8;
    digits[0] += buffer[i];
    let carry = 0;
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
  return digits.reverse().map((digit) => ALPHABET[digit]).join("");
}

// src/utils/func/index.js
var ADDRESS_PREFIX = "41";
function isHex(string) {
  return typeof string === "string" && !isNaN(parseInt(string, 16)) && /^(0x|)[a-fA-F0-9]+$/.test(string);
}
function SHA256(msgBytes) {
  const msgHex = byteArray2hexStr(msgBytes);
  const hashHex = ethersUtils.sha256("0x" + msgHex).replace(/^0x/, "");
  return hexStr2byteArray(hashHex);
}
function getBase58CheckAddress(addressBytes) {
  const hash0 = SHA256(addressBytes);
  const hash1 = SHA256(hash0);
  let checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  return encode58(checkSum);
}
function fromHex(address) {
  if (!isHex(address)) return address;
  return getBase58CheckAddress(
    hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX))
  );
}

// src/hooks/useAllowance.tsx
import { ethers as ethers3 } from "ethers";
import toast11 from "react-hot-toast";
import {
  useAppKitAccount as useAppKitAccount5,
  useAppKitNetwork as useAppKitNetwork4,
  useAppKitProvider as useAppKitProvider5
} from "@reown/appkit/react";
function useAllowance({
  setApproving,
  setCancellingApprove
}) {
  const [allowance, setAllowance] = useState18(0);
  const [decimals, setDecimals] = useState18(null);
  const appkitAccountInfo = useAppKitAccount5();
  const { chainId: evmChainId } = useAppKitNetwork4();
  const { address: signerAddress } = appkitAccountInfo || {
    address: null,
    chainId: null,
    isConnected: null
  };
  const { walletProvider } = useAppKitProvider5("eip155");
  const selectedNetwork = useSelector33(selectSourceChain);
  const errorHandler = useSelector33(selectErrorHandler);
  const dAppOption = useSelector33(selectDappOption);
  const targetChain = useSelector33(selectTargetChain);
  const feeDeduct = useSelector33(selectFeeDeduct);
  const networkOption = useSelector33(selectNetworkOption);
  const sourceChain = useMemo22(() => {
    if (selectedNetwork === "SOL" /* SOLANA */ || selectedNetwork === "TRX" /* TRON */ || selectedNetwork === "BTC" /* BTC */)
      return selectedNetwork;
    const CHAIN_NAMES_TO_IDS = networkOption === "mainnet" /* mainnet */ ? CHAIN_NAMES_TO_IDS_MAINNET : CHAIN_NAMES_TO_IDS_TESTNET;
    const CHAIN_IDS_TO_NAMES = networkOption === "mainnet" /* mainnet */ ? CHAIN_IDS_TO_NAMES_MAINNET : CHAIN_IDS_TO_NAMES_TESTNET;
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId];
    }
    return selectedNetwork;
  }, [selectedNetwork, evmChainId, networkOption]);
  const amount = useSelector33(selectAmount);
  const { totalFeeUsd } = useSelector33(selectServiceFee);
  const nodeProviderQuery = useSelector33(selectNodeProviderQuery);
  const { connection } = useConnection3();
  const { publicKey: solanaAddress, signTransaction: signSolanaTransaction } = useSolanaWallet5();
  const { address: tronAddress, signTransaction: signTronTransaction } = useTronWallet5();
  const selectedCoin = useSelector33(selectSourceCurrency);
  const tokenOptions = useSelector33(selectTokenOptions);
  const tokenAddress = useMemo22(() => {
    if (isEmptyObject2(tokenOptions) || sourceChain === "FIAT" /* FIAT */) return "";
    if (tokenOptions && typeof tokenOptions === "object") {
      const coinOptions = tokenOptions[selectedCoin];
      if (coinOptions && typeof coinOptions === "object") {
        return tokenOptions[selectedCoin][sourceChain];
      }
    }
    return "";
  }, [selectedCoin, sourceChain, tokenOptions]);
  const [targetAddress, setTargetAddress2] = useState18();
  const [poolAddress, setPoolAddress] = useState18("");
  const amountToShow = useMemo22(() => {
    if (sourceChain === "BTC" /* BTC */ || targetChain === "BTC" /* BTC */) {
      return (feeDeduct ? +amount : +amount + totalFeeUsd).toFixed(8);
    }
    return (feeDeduct ? +amount : +amount + totalFeeUsd).toFixed(2);
  }, [amount, totalFeeUsd, sourceChain, targetChain, feeDeduct]);
  const isApproved = useMemo22(() => {
    return allowance >= +amountToShow;
  }, [allowance, amountToShow, dAppOption]);
  const updatePoolAddress = async () => {
    try {
      const result = await fetchWrapper.get(
        `${nodeProviderQuery}/kima-finance/kima-blockchain/kima/tss_pubkey`
      );
      if (result?.tssPubkey?.length < 1) {
        return;
      }
      if (sourceChain === "SOL" /* SOLANA */ && !result.tssPubkey[0].eddsa) {
        console.log("solana pool address is missing");
        toast11.error("solana pool address is missing");
      }
      setPoolAddress(result.tssPubkey[0].reserved);
      setTargetAddress2(
        sourceChain === "SOL" /* SOLANA */ ? result.tssPubkey[0].eddsa : sourceChain === "TRX" /* TRON */ ? fromHex(result.tssPubkey[0].ecdsa) : result.tssPubkey[0].ecdsa
      );
    } catch (e) {
      console.log("rpc disconnected", e);
      toast11.error("rpc disconnected");
    }
  };
  useEffect24(() => {
    if (!nodeProviderQuery) return;
    updatePoolAddress();
  }, [nodeProviderQuery, sourceChain]);
  useEffect24(() => {
    ;
    (async () => {
      try {
        const tronWeb = networkOption === "mainnet" /* mainnet */ ? tronWebMainnet2 : tronWebTestnet2;
        if (!isEVMChain(sourceChain)) {
          if (solanaAddress && tokenAddress && connection) {
            const mint = new PublicKey7(tokenAddress);
            const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
              connection,
              solanaAddress,
              mint,
              solanaAddress,
              signSolanaTransaction
              /* as SignerWalletAdapterProps['signTransaction']*/
            );
            const accountInfo = await connection.getParsedAccountInfo(
              fromTokenAccount.address
            );
            console.log("solana token account: ", accountInfo);
            const parsedAccountInfo = accountInfo?.value?.data;
            setDecimals(parsedAccountInfo.parsed?.info?.tokenAmount?.decimals);
            setAllowance(
              parsedAccountInfo.parsed?.info?.delegate === targetAddress ? parsedAccountInfo.parsed?.info?.delegatedAmount?.uiAmount : 0
            );
          } else if (tronAddress && tokenAddress) {
            let trc20Contract = await tronWeb.contract(
              erc20ABI_default2.abi,
              tokenAddress
            );
            const decimals3 = await trc20Contract.decimals().call();
            const userAllowance2 = await trc20Contract.allowance(tronAddress, targetAddress).call();
            setDecimals(+decimals3);
            setAllowance(+formatUnits3(userAllowance2, decimals3));
          } else {
            setAllowance(0);
          }
          return;
        }
        const provider = new ethers3.providers.Web3Provider(
          walletProvider
        );
        const signer = provider?.getSigner();
        if (!tokenAddress || !targetAddress || !signer || !signerAddress) return;
        const erc20Contract = new Contract3(tokenAddress, erc20ABI_default2.abi, signer);
        const decimals2 = await erc20Contract.decimals();
        const userAllowance = await erc20Contract.allowance(
          signerAddress,
          targetAddress
        );
        setDecimals(+decimals2);
        setAllowance(+formatUnits3(userAllowance, decimals2));
      } catch (error) {
        errorHandler(error);
      }
    })();
  }, [
    signerAddress,
    tokenAddress,
    targetAddress,
    sourceChain,
    solanaAddress,
    tronAddress,
    walletProvider,
    networkOption
  ]);
  const approve = useCallback4(
    async (isCancel = false) => {
      if (isEVMChain(sourceChain)) {
        const provider = new ethers3.providers.Web3Provider(
          walletProvider
        );
        const signer = provider.getSigner();
        if (!decimals || !tokenAddress || !signer || !targetAddress) return;
        try {
          const erc20Contract = new Contract3(tokenAddress, erc20ABI_default2.abi, signer);
          isCancel ? setCancellingApprove(true) : setApproving(true);
          const approve2 = await erc20Contract.approve(
            targetAddress,
            parseUnits(isCancel ? "0" : amountToShow, decimals),
            networkOption === "mainnet" /* mainnet */ && sourceChain === "ETH" /* ETHEREUM */ ? { gasLimit: 6e4 } : {}
          );
          await approve2.wait();
          isCancel ? setCancellingApprove(false) : setApproving(false);
          setAllowance(isCancel ? 0 : +amountToShow);
        } catch (error) {
          errorHandler(error);
          isCancel ? setCancellingApprove(false) : setApproving(false);
        }
        return;
      }
      if (sourceChain === "TRX" /* TRON */) {
        if (!decimals || !tokenAddress || !targetAddress || !signTronTransaction)
          return;
        try {
          isCancel ? setCancellingApprove(true) : setApproving(true);
          const functionSelector = "approve(address,uint256)";
          const parameter = [
            { type: "address", value: targetAddress },
            {
              type: "uint256",
              value: parseUnits(
                isCancel ? "0" : amountToShow,
                decimals
              ).toString()
            }
          ];
          const tronWeb = networkOption === "mainnet" /* mainnet */ ? tronWebMainnet2 : tronWebTestnet2;
          const tx = await tronWeb.transactionBuilder.triggerSmartContract(
            tronWeb.address.toHex(tokenAddress),
            functionSelector,
            {},
            parameter,
            tronWeb.address.toHex(tronAddress)
          );
          const signedTx = await signTronTransaction(tx.transaction);
          await tronWeb.trx.sendRawTransaction(signedTx);
          isCancel ? setCancellingApprove(false) : setApproving(false);
          setAllowance(isCancel ? 0 : +amountToShow);
        } catch (error) {
          errorHandler(error);
          isCancel ? setCancellingApprove(false) : setApproving(false);
        }
        return;
      }
      if (!signSolanaTransaction) return;
      try {
        isCancel ? setCancellingApprove(true) : setApproving(true);
        const mint = new PublicKey7(tokenAddress);
        const toPublicKey = new PublicKey7(targetAddress);
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          solanaAddress,
          mint,
          solanaAddress,
          signSolanaTransaction
          /* as SignerWalletAdapterProps['signTransaction']*/
        );
        const transaction = new Transaction2().add(
          createApproveTransferInstruction(
            fromTokenAccount.address,
            // source
            toPublicKey,
            // dest
            solanaAddress,
            isCancel ? 0 : +amountToShow * Math.pow(10, decimals ?? 6),
            // amount * LAMPORTS_PER_SOL,
            [],
            TOKEN_PROGRAM_ID6
          )
        );
        const blockHash = await connection.getLatestBlockhash();
        transaction.feePayer = solanaAddress;
        transaction.recentBlockhash = await blockHash.blockhash;
        const signed = await signSolanaTransaction(transaction);
        await connection.sendRawTransaction(signed.serialize());
        let accountInfo;
        let allowAmount = 0;
        let retryCount = 0;
        if (isCancel) {
          do {
            accountInfo = await connection.getParsedAccountInfo(
              fromTokenAccount.address
            );
            const parsedAccountInfo = accountInfo?.value?.data;
            allowAmount = parsedAccountInfo.parsed?.info?.delegate === targetAddress ? parsedAccountInfo.parsed?.info?.delegatedAmount?.uiAmount : 0;
            await sleep(1e3);
          } while (allowAmount < +amountToShow || retryCount++ < 5);
          setAllowance(+amountToShow);
        } else {
          setAllowance(0);
        }
        isCancel ? setCancellingApprove(false) : setApproving(false);
      } catch (e) {
        errorHandler(e);
        isCancel ? setCancellingApprove(false) : setApproving(false);
      }
    },
    [
      decimals,
      tokenAddress,
      walletProvider,
      targetAddress,
      tronAddress,
      signSolanaTransaction,
      signTronTransaction,
      amountToShow,
      networkOption
    ]
  );
  return useMemo22(
    () => ({
      isApproved,
      poolAddress,
      approve,
      allowance
    }),
    [isApproved, poolAddress, approve, allowance]
  );
}

// src/components/reusable/AddressInputWizard.tsx
import React162 from "react";
import { useSelector as useSelector34 } from "react-redux";
var AddressInputWizard = () => {
  const theme = useSelector34(selectTheme);
  return /* @__PURE__ */ React162.createElement("div", { className: `coin-select` }, /* @__PURE__ */ React162.createElement("p", null, "Select Target Address for Funding"), /* @__PURE__ */ React162.createElement("div", { className: `address-input ${theme.colorMode}` }, /* @__PURE__ */ React162.createElement("span", null, "Target Address:"), /* @__PURE__ */ React162.createElement(AddressInput_default, { theme: theme.colorMode, placeholder: "Target address" })));
};
var AddressInputWizard_default = AddressInputWizard;

// src/components/TransferWidget.tsx
import { toast as toast12, Toaster as Toaster2 } from "react-hot-toast";

// plugins/solana/components/SolanaWalletConnectModal.tsx
import React165 from "react";
import { useDispatch as useDispatch24, useSelector as useSelector37 } from "react-redux";

// plugins/solana/components/SolanaWalletSelect.tsx
import React163, { useEffect as useEffect25, useMemo as useMemo23, useRef as useRef8 } from "react";
import { useDispatch as useDispatch22, useSelector as useSelector35 } from "react-redux";
import { useWallet as useWallet3 } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
var SolanaWalletSelect = () => {
  const theme = useSelector35(selectTheme);
  const dispatch = useDispatch22();
  const sliderRef = useRef8();
  const { wallets, select } = useWallet3();
  const [detected, undetected] = useMemo23(() => {
    const detected2 = [];
    const undetected2 = [];
    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable) {
        detected2.push(wallet);
      } else if (wallet.readyState === WalletReadyState.NotDetected) {
        undetected2.push(wallet);
      }
    }
    return [detected2, undetected2];
  }, [wallets]);
  useEffect25(() => {
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
  });
  const connectWallet = (walletName) => {
    select(walletName);
    dispatch(setSolanaConnectModal(false));
  };
  return /* @__PURE__ */ React163.createElement("div", { className: `wallet-select` }, /* @__PURE__ */ React163.createElement("div", { className: "slide-area hide-scrollbar", ref: sliderRef }, /* @__PURE__ */ React163.createElement("div", { className: "wallet-container" }, detected.map((wallet, index) => /* @__PURE__ */ React163.createElement(
    "div",
    {
      className: `card-item ${theme.colorMode}`,
      onClick: () => connectWallet(wallet.adapter.name),
      key: `${wallet.adapter.name}-${index}`
    },
    /* @__PURE__ */ React163.createElement("div", { className: "wallet-item" }, /* @__PURE__ */ React163.createElement("img", { src: wallet.adapter.icon, alt: wallet.adapter.name }), /* @__PURE__ */ React163.createElement("span", null, wallet.adapter.name))
  )), undetected.map((wallet, index) => /* @__PURE__ */ React163.createElement(
    ExternalLink_default,
    {
      to: wallet.adapter.url,
      className: `card-item ${theme.colorMode}`,
      key: `${wallet.adapter.name}-${index}`
    },
    /* @__PURE__ */ React163.createElement("div", { className: "wallet-item" }, /* @__PURE__ */ React163.createElement("img", { src: wallet.adapter.icon, alt: wallet.adapter.name }), /* @__PURE__ */ React163.createElement("span", null, "Install ", wallet.adapter.name))
  )))));
};
var SolanaWalletSelect_default = SolanaWalletSelect;

// plugins/solana/components/AccountDetailsModal.tsx
import React164, { useMemo as useMemo24 } from "react";
import { useDispatch as useDispatch23, useSelector as useSelector36 } from "react-redux";
import { useWallet as useSolanaWallet6 } from "@solana/wallet-adapter-react";
var AccountDetailsModal = () => {
  const dispatch = useDispatch23();
  const theme = useSelector36(selectTheme);
  const networkOption = useSelector36(selectNetworkOption);
  const sourceChain = useSelector36(selectSourceChain);
  const accountDetailsModal = useSelector36(selectAccountDetailsModal);
  const { walletAddress } = useIsWalletReady_default2();
  const { disconnect: solanaWalletDisconnect } = useSolanaWallet6();
  const { balance: solBalance } = useGetSolBalance_default();
  const networkDetails = networkOptions2[0];
  const explorerUrl = useMemo24(() => {
    return `https://solscan.io/account/address/${walletAddress}?cluster=${networkOption === "mainnet" ? "mainnet" : "devnet"}`;
  }, [walletAddress, networkOption]);
  const handleDisconnect = () => {
    solanaWalletDisconnect();
    dispatch(setAccountDetailsModal(false));
  };
  if (sourceChain !== "SOL") return;
  return /* @__PURE__ */ React164.createElement(
    "div",
    {
      className: `kima-modal ${theme.colorMode} ${accountDetailsModal && "open"}`
    },
    /* @__PURE__ */ React164.createElement("div", { className: "modal-overlay" }),
    /* @__PURE__ */ React164.createElement("div", { className: `modal-content-container ${theme.colorMode}` }, /* @__PURE__ */ React164.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ React164.createElement("div", { className: "topbar" }, /* @__PURE__ */ React164.createElement("div", { className: "title" }, /* @__PURE__ */ React164.createElement("h3", null, "Account Details")), /* @__PURE__ */ React164.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ React164.createElement(
      "button",
      {
        className: "cross-icon-button",
        onClick: () => dispatch(setAccountDetailsModal(false))
      },
      /* @__PURE__ */ React164.createElement(
        Cross_default,
        {
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    )))), /* @__PURE__ */ React164.createElement("div", { className: "modal-content" }, /* @__PURE__ */ React164.createElement("div", { className: "summary" }, networkDetails && /* @__PURE__ */ React164.createElement(networkDetails.icon, { width: 60, height: 60 }), /* @__PURE__ */ React164.createElement("div", { className: "address" }, /* @__PURE__ */ React164.createElement("h2", null, getShortenedAddress(walletAddress || "")), /* @__PURE__ */ React164.createElement(CopyButton_default, { text: walletAddress })), /* @__PURE__ */ React164.createElement("h3", null, solBalance, " $SOL")), /* @__PURE__ */ React164.createElement(SecondaryButton_default, { className: "block-explorer" }, /* @__PURE__ */ React164.createElement(ExternalLink_default, { className: "link", to: explorerUrl }, /* @__PURE__ */ React164.createElement(Explorer_default, { fill: "#778DA3" }), /* @__PURE__ */ React164.createElement("p", null, "Block explorer"), /* @__PURE__ */ React164.createElement(ExternalUrl_default, { fill: "#778DA3" }))), /* @__PURE__ */ React164.createElement(PrimaryButton_default, { clickHandler: handleDisconnect }, "Discconect")))
  );
};
var AccountDetailsModal_default = AccountDetailsModal;

// plugins/solana/components/SolanaWalletConnectModal.tsx
var SolanaWalletConnectModal = () => {
  const dispatch = useDispatch24();
  const theme = useSelector37(selectTheme);
  const connectModal = useSelector37(selectSolanaConnectModal);
  return /* @__PURE__ */ React165.createElement("div", null, /* @__PURE__ */ React165.createElement(AccountDetailsModal_default, null), /* @__PURE__ */ React165.createElement(
    "div",
    {
      className: `kima-modal wallet-connect ${connectModal ? "open" : ""}`
    },
    /* @__PURE__ */ React165.createElement("div", { className: `modal-content-container ${theme.colorMode}` }, /* @__PURE__ */ React165.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ React165.createElement("div", { className: "topbar" }, /* @__PURE__ */ React165.createElement("div", { className: "title" }, /* @__PURE__ */ React165.createElement("h3", null, "Connect Wallet")), /* @__PURE__ */ React165.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ React165.createElement(
      "button",
      {
        className: "cross-icon-button",
        onClick: () => dispatch(setSolanaConnectModal(false))
      },
      /* @__PURE__ */ React165.createElement(
        Cross_default,
        {
          width: 30,
          height: 30,
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    )))), /* @__PURE__ */ React165.createElement("div", { className: "modal-content" }, /* @__PURE__ */ React165.createElement(SolanaWalletSelect_default, null)))
  ));
};
var SolanaWalletConnectModal_default = SolanaWalletConnectModal;

// plugins/tron/components/TronWalletConnectModal.tsx
import React168 from "react";
import { useDispatch as useDispatch27, useSelector as useSelector40 } from "react-redux";

// plugins/tron/components/AccountDetailsModal.tsx
import React166, { useMemo as useMemo25 } from "react";
import { useDispatch as useDispatch25, useSelector as useSelector38 } from "react-redux";
import { useWallet as useTronWallet6 } from "@tronweb3/tronwallet-adapter-react-hooks";
var AccountDetailsModal2 = () => {
  const dispatch = useDispatch25();
  const theme = useSelector38(selectTheme);
  const networkOption = useSelector38(selectNetworkOption);
  const accountDetailsModal = useSelector38(selectAccountDetailsModal);
  const sourcheChain = useSelector38(selectSourceChain);
  const { walletAddress } = useIsWalletReady_default3();
  const { disconnect: tronWalletDisconnect } = useTronWallet6();
  const { balance: tronBalance } = useGetTrxBalance_default();
  const selectedNetwork = useSelector38(selectSourceChain);
  const networkDetails = useMemo25(
    () => networkOptions.find(({ id }) => id === selectedNetwork),
    [selectedNetwork]
  );
  const explorerUrl = useMemo25(() => {
    return `https://${networkOption === "testnet" && "nile."}tronscan.io/#/address/${walletAddress}`;
  }, [walletAddress, networkOption]);
  const handleDisconnect = () => {
    tronWalletDisconnect();
    dispatch(setAccountDetailsModal(false));
  };
  if (sourcheChain !== "TRX") return;
  return /* @__PURE__ */ React166.createElement(
    "div",
    {
      className: `kima-modal ${theme.colorMode} ${accountDetailsModal && "open"}`
    },
    /* @__PURE__ */ React166.createElement("div", { className: "modal-overlay" }),
    /* @__PURE__ */ React166.createElement("div", { className: `modal-content-container ${theme.colorMode}` }, /* @__PURE__ */ React166.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ React166.createElement("div", { className: "topbar" }, /* @__PURE__ */ React166.createElement("div", { className: "title" }, /* @__PURE__ */ React166.createElement("h3", null, "Account Details")), /* @__PURE__ */ React166.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ React166.createElement(
      "button",
      {
        className: "cross-icon-button",
        onClick: () => dispatch(setAccountDetailsModal(false))
      },
      /* @__PURE__ */ React166.createElement(
        Cross_default,
        {
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    )))), /* @__PURE__ */ React166.createElement("div", { className: "modal-content" }, /* @__PURE__ */ React166.createElement("div", { className: "summary" }, networkDetails && /* @__PURE__ */ React166.createElement(networkDetails.icon, { width: 60, height: 60 }), /* @__PURE__ */ React166.createElement("div", { className: "address" }, /* @__PURE__ */ React166.createElement("h2", null, getShortenedAddress(walletAddress || "")), /* @__PURE__ */ React166.createElement(CopyButton_default, { text: walletAddress })), /* @__PURE__ */ React166.createElement("h3", null, tronBalance, " ", selectedNetwork)), /* @__PURE__ */ React166.createElement(SecondaryButton_default, { className: "block-explorer" }, /* @__PURE__ */ React166.createElement(ExternalLink_default, { className: "link", to: explorerUrl }, /* @__PURE__ */ React166.createElement(Explorer_default, { fill: "#778DA3" }), /* @__PURE__ */ React166.createElement("p", null, "Block explorer"), /* @__PURE__ */ React166.createElement(ExternalUrl_default, { fill: "#778DA3" }))), /* @__PURE__ */ React166.createElement(PrimaryButton_default, { clickHandler: handleDisconnect }, "Disconnect")))
  );
};
var AccountDetailsModal_default2 = AccountDetailsModal2;

// plugins/tron/components/TronWalletSelect.tsx
import React167, { useEffect as useEffect26, useMemo as useMemo26, useRef as useRef9 } from "react";
import { useDispatch as useDispatch26, useSelector as useSelector39 } from "react-redux";
import { useWallet as useWallet4 } from "@tronweb3/tronwallet-adapter-react-hooks";
import { AdapterState } from "@tronweb3/tronwallet-abstract-adapter";
var TronWalletSelect = () => {
  const theme = useSelector39(selectTheme);
  const sliderRef = useRef9();
  const dispatch = useDispatch26();
  const {
    wallets,
    select,
    wallet: currentWallet,
    connect,
    connected
  } = useWallet4();
  const [detected, undetected] = useMemo26(() => {
    const detected2 = [];
    const undetected2 = [];
    for (const wallet of wallets) {
      if (wallet.state === AdapterState.Connected || wallet.state === AdapterState.Disconnect || wallet.state === AdapterState.Loading) {
        detected2.push(wallet);
      } else if (wallet.state === AdapterState.NotFound) {
        undetected2.push(wallet);
      }
    }
    return [detected2, undetected2];
  }, [wallets]);
  useEffect26(() => {
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
  });
  useEffect26(() => {
    connected && dispatch(setTronConnectModal(false));
  }, [connected]);
  const connectWallet = async (walletName) => {
    currentWallet?.adapter.name === walletName ? await connect() : select(walletName);
  };
  return /* @__PURE__ */ React167.createElement("div", { className: `wallet-select` }, /* @__PURE__ */ React167.createElement("div", { className: "slide-area hide-scrollbar", ref: sliderRef }, /* @__PURE__ */ React167.createElement("div", { className: "wallet-container" }, detected.map((wallet, index) => /* @__PURE__ */ React167.createElement(
    "div",
    {
      className: `card-item ${theme.colorMode}`,
      onClick: () => connectWallet(wallet.adapter.name),
      key: `${wallet.adapter.name}-${index}`
    },
    /* @__PURE__ */ React167.createElement("div", { className: "wallet-item" }, /* @__PURE__ */ React167.createElement("img", { src: wallet.adapter.icon, alt: wallet.adapter.name }), /* @__PURE__ */ React167.createElement("span", null, wallet.adapter.name))
  )), undetected.map((wallet, index) => /* @__PURE__ */ React167.createElement(
    ExternalLink_default,
    {
      to: wallet.adapter.url,
      className: `card-item ${theme.colorMode}`,
      key: `${wallet.adapter.name}-${index}`
    },
    /* @__PURE__ */ React167.createElement("div", { className: "wallet-item" }, /* @__PURE__ */ React167.createElement("img", { src: wallet.adapter.icon, alt: wallet.adapter.name }), /* @__PURE__ */ React167.createElement("span", null, "Install ", wallet.adapter.name))
  )))));
};
var TronWalletSelect_default = TronWalletSelect;

// plugins/tron/components/TronWalletConnectModal.tsx
var TronWalletConnectModal = () => {
  const dispatch = useDispatch27();
  const theme = useSelector40(selectTheme);
  const connectModal = useSelector40(selectTronConnectModal);
  return /* @__PURE__ */ React168.createElement("div", null, /* @__PURE__ */ React168.createElement(AccountDetailsModal_default2, null), /* @__PURE__ */ React168.createElement(
    "div",
    {
      className: `kima-modal wallet-connect ${theme.colorMode} ${connectModal ? "open" : ""}`
    },
    /* @__PURE__ */ React168.createElement("div", { className: "modal-overlay" }),
    /* @__PURE__ */ React168.createElement("div", { className: `modal-content-container ${theme.colorMode}` }, /* @__PURE__ */ React168.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ React168.createElement("div", { className: "topbar" }, /* @__PURE__ */ React168.createElement("div", { className: "title" }, /* @__PURE__ */ React168.createElement("h3", null, "Connect Wallet")), /* @__PURE__ */ React168.createElement("div", { className: "control-buttons" }, /* @__PURE__ */ React168.createElement(
      "button",
      {
        className: "icon-button",
        onClick: () => dispatch(setTronConnectModal(false))
      },
      /* @__PURE__ */ React168.createElement(
        Cross_default,
        {
          fill: theme.colorMode === "light" ? "black" : "white"
        }
      )
    )))), /* @__PURE__ */ React168.createElement("div", { className: "modal-content" }, /* @__PURE__ */ React168.createElement(TronWalletSelect_default, null)))
  ));
};
var TronWalletConnectModal_default = TronWalletConnectModal;

// src/hooks/useComplianceCheck.tsx
import { useQuery as useQuery5 } from "@tanstack/react-query";

// src/services/complianceApi.ts
var getCompliance = async (walletAddress, compliantOption, backendUrl) => {
  if (!walletAddress || !compliantOption) return null;
  try {
    const response = await fetchWrapper.get(
      `${backendUrl}/compliant?address=${walletAddress}`
    );
    console.log("compliance: ", response);
    return response;
  } catch (error) {
    console.error("compliance error: ", error);
    throw new Error("Cant get compliance");
  }
};

// src/hooks/useComplianceCheck.tsx
var useComplianceCheck = (walletAddress, compliantOption, backendUrl) => {
  const {
    data: complianceData,
    error,
    isFetching
  } = useQuery5({
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

// src/hooks/useGetPools.tsx
import { useQuery as useQuery6 } from "@tanstack/react-query";

// src/services/poolsApi.ts
var getPools = async (backenUrl) => {
  const poolsData = await fetchWrapper.get(`${backenUrl}/chains/pool`);
  return poolsData;
};

// src/hooks/useGetPools.tsx
var useGetPools = (backendUrl, networkOption) => {
  const { data, error, isLoading } = useQuery6({
    queryKey: ["pools", networkOption],
    queryFn: async () => await getPools(backendUrl),
    refetchInterval: 3e5,
    enabled: !!backendUrl && !!networkOption
  });
  return {
    pools: data || [],
    error,
    isLoading
  };
};
var useGetPools_default = useGetPools;

// src/components/TransferWidget.tsx
var TransferWidget = ({
  theme,
  feeURL,
  helpURL,
  titleOption
}) => {
  const dispatch = useDispatch28();
  const mainRef = useRef10(null);
  const [isWizard, setWizard] = useState19(false);
  const [formStep, setFormStep] = useState19(0);
  const [wizardStep, setWizardStep] = useState19(0);
  const mode = useSelector41(selectMode);
  const dAppOption = useSelector41(selectDappOption);
  const amount = useSelector41(selectAmount);
  const feeDeduct = useSelector41(selectFeeDeduct);
  const sourceChain = useSelector41(selectSourceChain);
  const sourceAddress = useSelector41(selectSourceAddress);
  const targetAddress = useSelector41(selectTargetAddress);
  const targetChain = useSelector41(selectTargetChain);
  const compliantOption = useSelector41(selectCompliantOption);
  const errorHandler = useSelector41(selectErrorHandler);
  const keplrHandler = useSelector41(selectKeplrHandler);
  const closeHandler = useSelector41(selectCloseHandler);
  const sourceCurrency = useSelector41(selectSourceCurrency);
  const targetCurrency = useSelector41(selectTargetCurrency);
  const backendUrl = useSelector41(selectBackendUrl);
  const networkOption = useSelector41(selectNetworkOption);
  const { totalFeeUsd, targetNetworkFee } = useSelector41(selectServiceFee);
  const [isCancellingApprove, setCancellingApprove] = useState19(false);
  const [isApproving, setApproving] = useState19(false);
  const [isSubmitting, setSubmitting] = useState19(false);
  const [isSigning, setSigning] = useState19(false);
  const [isConfirming, setConfirming] = useState19(false);
  const pendingTxs = useSelector41(selectPendingTxs);
  const { allowance, isApproved, approve } = useAllowance({
    setApproving,
    setCancellingApprove
  });
  const { balance } = useBalance2();
  const { width: windowWidth } = useWidth_default();
  const { complianceData: sourceCompliant, error: sourceComplianceError } = useComplianceCheck_default(sourceAddress, compliantOption, backendUrl);
  const { complianceData: targetCompliant, error: targetComplianceError } = useComplianceCheck_default(targetAddress, compliantOption, backendUrl);
  const {
    pools,
    error: poolsBalanceError,
    isLoading
  } = useGetPools_default(backendUrl, networkOption);
  useEffect27(() => {
    if (sourceComplianceError || targetComplianceError)
      toast12.error("Compliance check failed", {
        icon: /* @__PURE__ */ React169.createElement(Error_default, null)
      });
  }, [sourceComplianceError, targetComplianceError]);
  const handleSubmit = async () => {
    if (totalFeeUsd < 0) {
      toast12.error("Fee is not calculated!", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
      errorHandler("Fee is not calculated!");
      return;
    }
    if (dAppOption !== "LPDrain" /* LPDrain */ && balance < (feeDeduct ? +amount : +amount + totalFeeUsd)) {
      toast12.error("Insufficient balance!", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
      errorHandler("Insufficient balance!");
      return;
    }
    const amountToShow = feeDeduct ? +amount : +amount + totalFeeUsd;
    if (allowance < amountToShow) {
      return approve(false);
    }
    try {
      setSubmitting(true);
      if (dAppOption === "LPDrain" /* LPDrain */ || dAppOption === "LPAdd" /* LPAdd */) {
        keplrHandler(sourceAddress);
        return;
      }
      console.log("continues...");
      const feeParam = totalFeeUsd.toFixed(2);
      const params = JSON.stringify({
        originAddress: sourceAddress,
        originChain: sourceChain,
        targetAddress,
        targetChain,
        originSymbol: sourceCurrency,
        targetSymbol: targetCurrency,
        amount: feeDeduct ? (+amount - totalFeeUsd).toFixed(8) : amount,
        fee: feeParam,
        htlcCreationHash: "",
        htlcCreationVout: 0,
        htlcExpirationTimestamp: "0",
        htlcVersion: "",
        senderPubKey: ""
      });
      console.log(params);
      const result = await fetchWrapper.post(
        `${backendUrl}/submit`,
        params
      );
      console.log(result);
      if (result?.code !== 0) {
        errorHandler(result);
        toast12.error("Failed to submit transaction!", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
        setSubmitting(false);
        return;
      }
      let txId = -1;
      for (const event of result.events) {
        if (event.type === "transaction_requested") {
          for (const attr of event.attributes) {
            if (attr.key === "txId") {
              txId = attr.value;
            }
          }
        }
      }
      console.log(txId);
      setSubmitting(false);
      dispatch(setTxId(txId));
      dispatch(setSubmitted(true));
    } catch (e) {
      errorHandler(e);
      setSubmitting(false);
      console.log(e?.status !== 500 ? "rpc disconnected" : "", e);
      toast12.error("rpc disconnected", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
      toast12.error("Failed to submit transaction", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
    }
  };
  const onNext = () => {
    if (isWizard && wizardStep < 5) {
      if (wizardStep === 1 && !sourceAddress) {
        toast12.error("Wallet is not connected!", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
        errorHandler("Wallet is not connected!");
        return;
      }
      if (wizardStep === 3) {
        if (targetAddress) {
          setWizardStep(4);
        }
        return;
      }
      if (wizardStep === 4) {
        if (totalFeeUsd >= 0 && +amount > 0) {
          setWizardStep(5);
        }
        return;
      }
      if (totalFeeUsd > 0 && totalFeeUsd > +amount && feeDeduct) {
        toast12.error("Fee is greater than amount to transfer!", {
          icon: /* @__PURE__ */ React169.createElement(Error_default, null)
        });
        errorHandler("Fee is greater than amount to transfer!");
        return;
      }
      setWizardStep((step) => step + 1);
    }
    if (!isWizard && !formStep) {
      if (sourceAddress) {
        if (+amount <= 0) {
          toast12.error("Invalid amount!", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
          errorHandler("Invalid amount!");
          return;
        }
        if (totalFeeUsd < 0) {
          toast12.error("Fee is not calculated!", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
          errorHandler("Fee is not calculated!");
          return;
        }
        if (!targetAddress) {
          toast12.error("Invalid target address!", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
          errorHandler("Invalid target address!");
          return;
        }
        if (compliantOption) {
          if (!sourceCompliant?.isCompliant) {
            toast12.error(
              "The source address provided does not meet our compliance standards.",
              {
                icon: /* @__PURE__ */ React169.createElement(Error_default, null)
              }
            );
            errorHandler(
              "The source address provided does not meet our compliance standards."
            );
            return;
          }
          if (!targetCompliant?.isCompliant) {
            toast12.error(
              "The target address provided does not meet our compliance standards.",
              {
                icon: /* @__PURE__ */ React169.createElement(Error_default, null)
              }
            );
            errorHandler(
              "The target address provided does not meet our compliance standards."
            );
            return;
          }
        }
        if (totalFeeUsd > 0 && totalFeeUsd > +amount && feeDeduct) {
          toast12.error("Fee is greater than amount to transfer!", {
            icon: /* @__PURE__ */ React169.createElement(Error_default, null)
          });
          errorHandler("Fee is greater than amount to transfer!");
          return;
        }
        const { isPoolAvailable, error } = checkPoolBalance({
          pools,
          targetChain,
          targetCurrency,
          amount,
          targetNetworkFee
        });
        if (!isPoolAvailable || error != "") {
          toast12.error(error, {
            icon: /* @__PURE__ */ React169.createElement(Error_default, null)
          });
          errorHandler(error);
          return;
        }
        if (mode === "payment" /* payment */ || targetAddress && +amount > 0) {
          setConfirming(true);
          setFormStep(1);
        }
        return;
      } else {
        toast12.error("Wallet is not connected!", { icon: /* @__PURE__ */ React169.createElement(Error_default, null) });
        errorHandler("Wallet is not connected!");
      }
    }
    if (isWizard && wizardStep === 5 || !isWizard && formStep > 0) {
      handleSubmit();
    }
    mainRef.current?.click();
  };
  const onBack = () => {
    if (isApproving || isSubmitting || isSigning) return;
    if (isWizard && wizardStep > 0) {
      if (mode === "payment" /* payment */ && wizardStep === 5) setWizardStep(1);
      else setWizardStep((step) => step - 1);
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
  const getButtonLabel = () => {
    if (isWizard && wizardStep === 5 || !isWizard && formStep === 1) {
      if (isApproved) {
        return isSubmitting ? "Submitting..." : "Submit";
      } else {
        return isApproving ? "Approving..." : "Approve";
      }
    }
    return "Next";
  };
  const onCancelApprove = () => {
    if (isCancellingApprove) return;
    approve(true);
  };
  const resetForm = () => {
    if (isApproving || isSubmitting || isSigning) return;
    dispatch(setTargetAddress(""));
    dispatch(setAmount(""));
    closeHandler();
  };
  useEffect27(() => {
    dispatch(setTheme(theme));
  }, [theme]);
  return /* @__PURE__ */ React169.createElement(
    "div",
    {
      className: `kima-card ${theme.colorMode}`,
      style: {
        background: theme.colorMode === "light" /* light */ ? theme.backgroundColorLight : theme.backgroundColorDark
      }
    },
    /* @__PURE__ */ React169.createElement("div", { className: "kima-card-header" }, /* @__PURE__ */ React169.createElement("div", { className: "topbar" }, /* @__PURE__ */ React169.createElement("div", { className: "title" }, /* @__PURE__ */ React169.createElement("h3", null, formStep === 0 ? titleOption?.initialTitle ? titleOption.initialTitle : "New Transfer" : titleOption?.confirmTitle ? titleOption.confirmTitle : "Transfer Details")), /* @__PURE__ */ React169.createElement("div", { className: "control-buttons" }, pendingTxs > 0 ? /* @__PURE__ */ React169.createElement(TxButton_default, { theme }) : null, /* @__PURE__ */ React169.createElement(
      ExternalLink_default,
      {
        to: helpURL ? helpURL : "https://docs.kima.network/kima-network/try-kima-with-the-demo-app"
      },
      /* @__PURE__ */ React169.createElement("div", { className: "menu-button" }, "I need help")
    ), formStep !== 1 && /* @__PURE__ */ React169.createElement("div", { className: "reset-button", onClick: resetForm }, "Reset")))),
    /* @__PURE__ */ React169.createElement("div", { className: "kima-card-content", ref: mainRef }, isWizard ? wizardStep === 0 ? /* @__PURE__ */ React169.createElement(NetworkSelect_default, null) : wizardStep === 1 ? /* @__PURE__ */ React169.createElement("div", { className: "connect-wallet-step" }, /* @__PURE__ */ React169.createElement("p", null, "Connect your wallet"), /* @__PURE__ */ React169.createElement(WalletButton_default, { errorBelow: true })) : wizardStep === 2 ? /* @__PURE__ */ React169.createElement(NetworkSelect_default, { isOriginChain: false }) : wizardStep === 3 ? /* @__PURE__ */ React169.createElement(AddressInputWizard_default, null) : wizardStep === 4 ? /* @__PURE__ */ React169.createElement(CoinSelect_default, null) : /* @__PURE__ */ React169.createElement(ConfirmDetails_default, { isApproved }) : formStep === 0 ? /* @__PURE__ */ React169.createElement(SingleForm_default, null) : /* @__PURE__ */ React169.createElement(ConfirmDetails_default, { isApproved })),
    /* @__PURE__ */ React169.createElement(
      "div",
      {
        className: `kima-card-footer ${mode === "bridge" /* bridge */ && formStep === 0 && "bridge"}`
      },
      /* @__PURE__ */ React169.createElement(
        "div",
        {
          className: `button-group ${formStep !== 0 && allowance > 0 && "confirm"}`
        },
        formStep !== 0 && /* @__PURE__ */ React169.createElement(
          SecondaryButton_default,
          {
            clickHandler: onBack,
            theme: theme.colorMode,
            disabled: isApproving || isSubmitting || isSigning
          },
          isWizard && wizardStep > 0 || !isWizard && formStep > 0 ? "Back" : "Cancel"
        ),
        allowance > 0 && (isWizard && wizardStep === 5 || !isWizard && formStep === 1) ? /* @__PURE__ */ React169.createElement(
          PrimaryButton_default,
          {
            clickHandler: onCancelApprove,
            isLoading: isCancellingApprove,
            disabled: isCancellingApprove || isApproving || isSubmitting || isSigning
          },
          isCancellingApprove ? "Cancelling Approval" : "Cancel Approve"
        ) : null,
        /* @__PURE__ */ React169.createElement(
          PrimaryButton_default,
          {
            clickHandler: onNext,
            isLoading: isApproving || isSubmitting || isSigning,
            disabled: isApproving || isSubmitting || isSigning
          },
          getButtonLabel()
        )
      )
    ),
    /* @__PURE__ */ React169.createElement(SolanaWalletConnectModal_default, null),
    /* @__PURE__ */ React169.createElement(TronWalletConnectModal_default, null),
    /* @__PURE__ */ React169.createElement(
      Toaster2,
      {
        position: "top-right",
        reverseOrder: false,
        containerStyle: {
          position: "absolute"
        },
        toastOptions: {
          duration: 3 * 1e3,
          style: {
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
    ),
    /* @__PURE__ */ React169.createElement("div", { className: "floating-footer" }, /* @__PURE__ */ React169.createElement("div", { className: `items ${theme.colorMode}` }, /* @__PURE__ */ React169.createElement("span", null, "Powered by"), /* @__PURE__ */ React169.createElement(FooterLogo_default, { width: 50, fill: "black" }), /* @__PURE__ */ React169.createElement("strong", null, "Network")))
  );
};

// src/components/KimaTransactionWidget.tsx
import { useAppKitTheme } from "@reown/appkit/react";
var KimaTransactionWidget = ({
  mode,
  txId,
  autoSwitchChain = true,
  networkOption = "testnet" /* testnet */,
  provider,
  dAppOption = "none" /* None */,
  theme,
  titleOption,
  paymentTitleOption,
  helpURL = "",
  compliantOption = true,
  transactionOption,
  kimaBackendUrl,
  kimaNodeProviderQuery,
  kimaExplorer = "https://explorer.kima.finance",
  feeURL = "https://fee.kima.finance",
  kimaGraphqlProviderQuery = "https://graphql.kima.finance/v1/graphql",
  errorHandler = () => void 0,
  closeHandler = () => void 0,
  successHandler = () => void 0,
  switchChainHandler = () => void 0,
  keplrHandler = () => void 0
}) => {
  const submitted = useSelector42(selectSubmitted);
  const dispatch = useDispatch29();
  const { setThemeMode, setThemeVariables } = useAppKitTheme();
  useEffect28(() => {
    dispatch(setTheme(theme));
    setThemeMode(theme.colorMode === "light" /* light */ ? "light" : "dark");
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
    dispatch(setNetworkOption(networkOption));
  }, [
    provider,
    theme,
    transactionOption,
    errorHandler,
    closeHandler,
    mode,
    networkOption
  ]);
  useEffect28(() => {
    if (dAppOption === "none" /* None */ && mode === "bridge" /* bridge */) {
      dispatch(setTargetChain(""));
      dispatch(setSourceChain("ETH"));
    } else if (mode === "status" /* status */) {
      dispatch(setTxId(txId || 1));
      dispatch(setSubmitted(true));
    }
  }, [dAppOption, mode]);
  return submitted ? /* @__PURE__ */ React170.createElement(TransactionWidget, { theme }) : /* @__PURE__ */ React170.createElement(
    TransferWidget,
    {
      theme,
      feeURL,
      helpURL,
      titleOption
    }
  );
};
var KimaTransactionWidget_default = KimaTransactionWidget;
export {
  CHAIN_NAMES_TO_STRING,
  CHAIN_STRING_TO_NAME,
  ColorModeOptions,
  CurrencyOptions,
  DAppOptions,
  KimaProvider_default as KimaProvider,
  KimaTransactionWidget_default as KimaTransactionWidget,
  ModeOptions,
  NetworkOptions,
  ChainName as SupportNetworks
};
//# sourceMappingURL=index.js.map