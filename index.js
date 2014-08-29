'use strict';


/*
 * DEPENDENCIES
 */

var convert = require('colr-convert');


/*
 * CONSTANTS
 */

var HEX = 'hex';
var RGB = 'rgb';
var HSV = 'hsv';
var HSL = 'hsl';

var ERR_NO_DATA = 'There is no data to convert';
var ERR_INVALID_INPUT = 'An argument is invalid';
var ERR_TYPE_MISMATCH = 'An argument is not the correct type';


/*
* CONSTRUCTOR
*/

function Colr () {
  if (! (this instanceof Colr)) { return new Colr(); }
  this._bust();
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
  var value = convert.hex.rgb(hex);

  this._bust();
  this._set(RGB, value);
  return this;
};

// GRAYSCALE

Colr.prototype.fromGrayscale = function (lightness) {
  if (typeof lightness !== 'number') {
    throw new Error(ERR_TYPE_MISMATCH);
  }

  var value = clamp(lightness, 0, 255);

  this._bust();
  this._set(RGB, [value, value, value]);
  return this;
};

// RGB

Colr.prototype.fromRgb = function (r, g, b) {
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
    throw new Error(ERR_TYPE_MISMATCH);
  }

  r = clamp(r, 0, 255);
  g = clamp(g, 0, 255);
  b = clamp(b, 0, 255);

  this._bust();
  this._set(RGB, [r, g, b]);
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
  if (typeof h !== 'number' || typeof s !== 'number' || typeof l !== 'number') {
    throw new Error(ERR_TYPE_MISMATCH);
  }

  h = clamp(h, 0, 360);
  s = clamp(s, 0, 100);
  l = clamp(l, 0, 100);

  this._bust();
  this._set(HSL, [h, s, l]);
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
  if (typeof h !== 'number' || typeof s !== 'number' || typeof v !== 'number') {
    throw new Error(ERR_INVALID_INPUT);
  }

  h = clamp(h, 0, 360);
  s = clamp(s, 0, 100);
  v = clamp(v, 0, 100);

  // this._bust();
  this._set(HSV, [h, s, v]);
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
  if (this._has(HEX)) { return this._get(HEX); }
  var rgb = this._has(RGB) ? this._get(RGB) : this.toRawRgbArray();
  var value = convert.rgb.hex([
    Math.round(rgb[0]),
    Math.round(rgb[1]),
    Math.round(rgb[2]),
  ]);
  this._set(HEX, value);
  return value;
};

// GRAYSCALE

Colr.prototype.toGrayscale = function () {
  var rgb = this._has(RGB) ? this._get(RGB) : this.toRawRgbArray();
  return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
};

// RGB

Colr.prototype.toRawRgbArray = function () {
  if (this._has(RGB)) {
    return this._get(RGB);
  }

  var value;
  if (this._has(HSV)) {
    value = convert.hsv.rgb(this._get(HSV));
  } else if (this._has(HSL)) {
    value = convert.hsl.rgb(this._get(HSL));
  } else {
    throw new Error(ERR_NO_DATA);
  }

  this._set(RGB, value);
  return value;
};

Colr.prototype.toRgbArray = function () {
  return this.toRawRgbArray().map(Math.round);
};

Colr.prototype.toRgbObject = function () {
  var rgb = this.toRgbArray();
  return {r: rgb[0], g: rgb[1], b: rgb[2]};
};

// HSL

Colr.prototype.toRawHslArray = function () {
  if (this._has(HSL)) {
    return this._get(HSL);
  }

  var value;
  if (this._has(HSV)) {
    value = convert.hsv.hsl(this._get(HSV));
  } else if (this._has(RGB)) {
    value = convert.rgb.hsl(this._get(RGB));
  } else {
    throw new Error(ERR_NO_DATA);
  }

  this._set(HSL, value);
  return value;
};

Colr.prototype.toHslArray = function () {
  return this.toRawHslArray().map(Math.round);
};

Colr.prototype.toHslObject = function () {
  var hsl = this.toHslArray();
  return {h: hsl[0], s: hsl[1], l: hsl[2]};
};


// HSV

Colr.prototype.toRawHsvArray = function () {
  if (this._has(HSV)) {
    return this._get(HSV);
  }

  var value;
  if (this._has(HSL)) {
    value = convert.hsl.hsv(this._get(HSL));
  } else if (this._has(RGB)) {
    value = convert.rgb.hsv(this._get(RGB));
  } else {
    throw new Error(ERR_NO_DATA);
  }

  this._set(HSV, value);
  return value;
};

Colr.prototype.toHsvArray = function () {
  return this.toRawHsvArray().map(Math.round);
};

Colr.prototype.toHsvObject = function () {
  var hsv = this.toHsvArray();
  return {h: hsv[0], s: hsv[1], v: hsv[2]};
};


/*
* MODIFIERS
*/

Colr.prototype.lighten = function (amount) {
  var hsl = this.toRawHslArray();
  hsl[2] = clamp(hsl[2] + amount, 0, 100);
  this._bust();
  this._set(HSL, hsl);
  return this;
};

Colr.prototype.darken = function (amount) {
  var hsl = this.toRawHslArray();
  hsl[2] = clamp(hsl[2] - amount, 0, 100);
  this._bust();
  this._set(HSL, hsl);
  return this;
};

/*
 * MISC
 */

Colr.prototype.clone = function () {
  var colr = new Colr();
  if (this._has(HEX)) { colr._[HEX] = this._[HEX]; }
  if (this._has(RGB)) { colr._[RGB] = this._[RGB]; }
  if (this._has(HSV)) { colr._[HSV] = this._[HSV]; }
  if (this._has(HSL)) { colr._[HSL] = this._[HSL]; }
  return colr;
};

/*
 * CACHE MANAGEMENT
 */

Colr.prototype._set = function (id, value) {
  this._[id] = value;
};

Colr.prototype._has = function (id) {
  return this._.hasOwnProperty(id);
};

Colr.prototype._get = function (id) {
  return this._[id];
};

Colr.prototype._bust = function () {
  this._ = {};
};


/*
 * UTILS
 */

function clamp(val, lo, hi) {
  return Math.max(Math.min(val, hi), lo);
}

module.exports = Colr;
