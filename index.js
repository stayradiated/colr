(function () {
  'use strict';


  /*
   * DEPENDENCIES
   */

  var convert = require('color-convert');


  /*
   * CONSTANTS
   */

  var HEX = 'hex';
  var RGB = 'rgb';
  var HSV = 'hsv';
  var HSL = 'hsl';
  var SPACES = [HEX, RGB, HSV, HSL];
  var SPACES_LENGTH = SPACES.length;
  var CLAMP_360 = clamp.bind(null, 0, 360);
  var CLAMP_255 = clamp.bind(null, 0, 255);
  var CLAMP_100 = clamp.bind(null, 0, 100);
  var ERR_NO_DATA = 'There is no data to convert';
  var ERR_INVALID_INPUT = 'An argument is invalid';
  var ERR_TYPE_MISMATCH = 'An argument is not the correct type';


  /*
  * CONSTRUCTOR
  */

  function Colr () {
    if (! (this instanceof Colr)) return new Colr();
    this._bustCache();
  }


  /*
  * STATIC METHODS
  */

  Colr.fromHex = function (hex) {
    return (new Colr()).fromHex(hex);
  };

  Colr.fromRgb = function (r, g, b) {
    return (new Colr()).fromRgb(r, g, b);
  };

  Colr.fromRgbArray = function (arr) {
    return (new Colr()).fromRgbArray(arr);
  };

  Colr.fromRgbObject = function (obj) {
    return (new Colr()).fromRgbObject(obj);
  };

  Colr.fromGrayscale = function (value) {
    return (new Colr()).fromGrayscale(value);
  };

  Colr.fromHsl = function (h, s, l) {
    return (new Colr()).fromHsl(h, s, l);
  };

  Colr.fromHslArray = function (arr) {
    return (new Colr()).fromHslArray(arr);
  };

  Colr.fromHslObject = function (obj) {
    return (new Colr()).fromHslObject(obj);
  };

  Colr.fromHsv = function (h, s, v) {
    return (new Colr()).fromHsv(h, s, v);
  };

  Colr.fromHsvArray = function (arr) {
    return (new Colr()).fromHsvArray(arr);
  };

  Colr.fromHsvObject = function (obj) {
    return (new Colr()).fromHsvObject(obj);
  };


  /*
  * IMPORTERS
  */

  // HEX

  Colr.prototype.fromHex = function (hex) {
    if (typeof hex !== 'string') {
      throw new Error(ERR_TYPE_MISMATCH);
    }
    if (hex[0] === '#') {
      hex = hex.slice(1);
    }
    if (! hex.match(/^[0-9a-f]*$/i)) {
      throw new Error(ERR_INVALID_INPUT);
    }

    var r, g, b;

    if (hex.length >= 6) {
      r = parseInt(hex.slice(0,2), 16);
      g = parseInt(hex.slice(2,4), 16);
      b = parseInt(hex.slice(4,6), 16);
    } else if (hex.length >= 3){
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      throw new Error(ERR_INVALID_INPUT);
    }

    this._bustCache();
    this._addSpace(RGB, [r, g, b]);
    return this;
  };

  // GRAYSCALE
  
  Colr.prototype.fromGrayscale = function (value) {
    if (typeof value != 'number') {
      throw new Error(ERR_TYPE_MISMATCH);
    }

    value = CLAMP_255(value);

    this._bustCache();
    this._addSpace(RGB, [value, value, value]);
    return this;
  };

  // RGB

  Colr.prototype.fromRgb = function (r, g, b) {
    if (typeof r != 'number' || typeof g != 'number' || typeof b != 'number') {
      throw new Error(ERR_TYPE_MISMATCH);
    }

    r = CLAMP_255(r);
    g = CLAMP_255(g);
    b = CLAMP_255(b);

    this._bustCache();
    this._addSpace(RGB, [r, g, b]);
    return this;
  };

  Colr.prototype.fromRgbArray = function (arr) {
    return this.fromRgb.apply(this, arr);
  };

  Colr.prototype.fromRgbObject = function (obj) {
    return this.fromRgb(obj.r, obj.g, obj.b);
  };

  // HSL

  Colr.prototype.fromHsl = function (h, s, l) {
    if (typeof h != 'number' || typeof s != 'number' || typeof l != 'number') {
      throw new Error(ERR_TYPE_MISMATCH);
    }

    h = CLAMP_360(h);
    s = CLAMP_100(s);
    l = CLAMP_100(l);

    this._bustCache();
    this._addSpace(HSL, [h, s, l]);
    return this;
  };

  Colr.prototype.fromHslArray = function (arr) {
    return this.fromHsl.apply(this, arr);
  };

  Colr.prototype.fromHslObject = function (obj) {
    return this.fromHsl(obj.h, obj.s, obj.l);
  };

  // HSV
  
  Colr.prototype.fromHsv = function (h, s, v) {
    if (typeof h != 'number' || typeof s != 'number' || typeof v != 'number') {
      throw new Error(ERR_INVALID_INPUT);
    }

    h = CLAMP_360(h);
    s = CLAMP_100(s);
    v = CLAMP_100(v);

    this._bustCache();
    this._addSpace(HSV, [h, s, v]);
    return this;
  };

  Colr.prototype.fromHsvArray = function (arr) {
    return this.fromHsv.apply(this, arr);
  };

  Colr.prototype.fromHsvObject = function (obj) {
    return this.fromHsv(obj.h, obj.s, obj.v);
  };


  /*
  * EXPORTERS
  */

  // HEX

  Colr.prototype.toHex = function () {
    if (this._hasSpace(HEX)) {
      return this._getSpace(HEX);
    }
    var rgb = this._hasSpace(RGB) ? this._getSpace(RGB) : this.toRgbArray();
    var r = rgb[0].toString(16);
    var g = rgb[1].toString(16);
    var b = rgb[2].toString(16);
    if (r.length < 2) r = '0' + r;
    if (g.length < 2) g = '0' + g;
    if (b.length < 2) b = '0' + b;
    var value = ('#' + r + g + b).toUpperCase();
    this._addSpace(HEX, value);
    return value;
  };

  // GRAYSCALE

  Colr.prototype.toGrayscale = function () {
    var rgb = this._hasSpace(RGB) ? this._getSpace(RGB) : this.toRgbArray();
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  };

  // RGB

  Colr.prototype.toRgbArray = function () {
    if (this._hasSpace(RGB)) {
      return this._getSpace(RGB).slice(0);
    }

    var value;
    if (this._hasSpace(HSV)) {
      value = convert[HSV][RGB](this._getSpace(HSV));
    } else if (this._hasSpace(HSL)) {
      value = convert[HSL][RGB](this._getSpace(HSL));
    } else {
      throw new Error(ERR_NO_DATA);
    }

    this._addSpace(RGB, value);
    return value;
  };

  Colr.prototype.toRgbObject = function () {
    var rgb = this.toRgbArray();
    return {r: rgb[0], g: rgb[1], b: rgb[2]};
  };

  // HSL

  Colr.prototype.toHslArray = function () {
    if (this._hasSpace(HSL)) {
      return this._getSpace(HSL).slice(0);
    }

    var value;
    if (this._hasSpace(RGB)) {
      value = convert.rgb2hslRaw(this._getSpace(RGB));
    } else if (this._hasSpace(HSV)) {
      value = convert.hsv2hslRaw(this._getSpace(HSV));
    } else {
      throw new Error(ERR_NO_DATA);
    }

    this._addSpace(HSL, value);
    return value;
  };

  Colr.prototype.toHslObject = function () {
    var hsl = this.toHslArray();
    return {h: hsl[0], s: hsl[1], l: hsl[2]};
  };

  // HSV
  
  Colr.prototype.toHsvArray = function () {
    if (this._hasSpace(HSV)) {
      return this._getSpace(HSV).slice(0);
    }

    var value;
    if (this._hasSpace(RGB)) {
      value = convert.rgb2hsvRaw(this._getSpace(RGB));
    } else if (this._hasSpace(HSL)) {
      value = convert.hsl2hsvRaw(this._getSpace(HSL));
    } else {
      throw new Error(ERR_NO_DATA);
    }

    this._addSpace(HSV, value);
    return value;
  };

  Colr.prototype.toHsvObject = function () {
    var hsv = this.toHsvArray();
    return {h: hsv[0], s: hsv[1], v: hsv[2]};
  };


  /*
  * MODIFIERS
  */

  Colr.prototype.lighten = function (amount) {
    var hsl = this.toHslArray();
    hsl[2] = CLAMP_100(hsl[2] + amount);
    this._bustCache();
    this._addSpace(HSL, hsl);
    return this;
  };

  Colr.prototype.darken = function (amount) {
    var hsl = this.toHslArray();
    hsl[2] = CLAMP_100(hsl[2] - amount);
    this._bustCache();
    this._addSpace(HSL, hsl);
    return this;
  };

  /*
   * MISC
   */

  Colr.prototype.clone = function () {
    var colr = new Colr();
    colr.fromRgbArray(this.toRgbArray());
    return colr;
  };

  /*
   * CACHE MANAGEMENT
   */

  Colr.prototype._addSpace = function (id, value) {
    this._[id] = value;
  };

  Colr.prototype._hasSpace = function (id) {
    return this._.hasOwnProperty(id);
  };

  Colr.prototype._getSpace = function (id) {
    return this._[id];
  };

  Colr.prototype._bustCache = function () {
    this._ = {};
  };


  /*
   * UTILS
   */

  function clamp(lo, hi, val) {
    return Math.max(Math.min(val, hi), lo);
  }

  module.exports = Colr;

}());
