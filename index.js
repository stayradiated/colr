'use strict';


/*
 * DEPENDENCIES
 */

var convert = require('colr-convert');


/*
 * CONSTRUCTOR
 */

function Colr () {
  if ((this instanceof Colr) === false) { return new Colr(); }
  this._ = {};
}


/*
 * STATIC METHODS
 */

Colr.fromHex = function (hex) {
  return (new Colr()).fromHex(hex);
};

Colr.fromGrayscale = function (value) {
  return (new Colr()).fromGrayscale(value);
};

Colr.fromRgb = function (r, g, b) {
  return (new Colr()).fromRgb(r, g, b);
};

Colr.fromRgbArray = function (arr) {
  return (new Colr()).fromRgb(arr[0], arr[1], arr[2]);
};

Colr.fromRgbObject = function (obj) {
  return (new Colr()).fromRgb(obj.r, obj.g, obj.b);
};
Colr.fromHsl = function (h, s, l) {
  return (new Colr()).fromHsl(h, s, l);
};

Colr.fromHslArray = function (arr) {
  return (new Colr()).fromHsl(arr[0], arr[1], arr[2]);
};

Colr.fromHslObject = function (obj) {
  return (new Colr()).fromHsl(obj.h, obj.s, obj.l);
};

Colr.fromHsv = function (h, s, v) {
  return (new Colr()).fromHsv(h, s, v);
};

Colr.fromHsvArray = function (arr) {
  return (new Colr()).fromHsv(arr[0], arr[1], arr[2]);
};

Colr.fromHsvObject = function (obj) {
  return (new Colr()).fromHsv(obj.h, obj.s, obj.v);
};


/*
 * IMPORTERS
 */

// HEX

Colr.prototype.fromHex = function (input) {
  var value = convert.hex.rgb(input);
  this._ = { rgb: value };
  return this;
};

// GRAYSCALE

Colr.prototype.fromGrayscale = function (input) {
  input = clampByte(input);
  var value = convert.grayscale.rgb(input);
  this._ = { rgb: value };
  return this;
};

// RGB

Colr.prototype.fromRgb = function (r, g, b) {
  if (typeof(r) !== 'number' || typeof(g) !== 'number' || typeof(b) !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  var value = clampRgb(r, g, b);
  this._ = { rgb: value };
  return this;
};

Colr.prototype.fromRgbArray = function (arr) {
  return this.fromRgb(arr[0], arr[1], arr[2]);
};

Colr.prototype.fromRgbObject = function (obj) {
  return this.fromRgb(obj.r, obj.g, obj.b);
};

// HSL

Colr.prototype.fromHsl = function (h, s, l) {
  if (typeof(h) !== 'number' || typeof(s) !== 'number' || typeof(l) !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  this._ = { hsl: clampHsx(h, s, l) };
  return this;
};

Colr.prototype.fromHslArray = function (arr) {
  return this.fromHsl(arr[0], arr[1], arr[2]);
};

Colr.prototype.fromHslObject = function (obj) {
  return this.fromHsl(obj.h, obj.s, obj.l);
};

// HSV

Colr.prototype.fromHsv = function (h, s, v) {
  if (typeof(h) !== 'number' || typeof(s) !== 'number' || typeof(v) !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  this._ = { hsv: clampHsx(h, s, v) };
  return this;
};

Colr.prototype.fromHsvArray = function (arr) {
  return this.fromHsv(arr[0], arr[1], arr[2]);
};

Colr.prototype.fromHsvObject = function (obj) {
  return this.fromHsv(obj.h, obj.s, obj.v);
};


/*
 * EXPORTERS
 */

// HEX

Colr.prototype.toHex = function () {
  var cached = this._.hex;
  if (cached !== undefined) { return cached; }

  var input;
  var cachedFrom = this._.rgb;

  if (cachedFrom !== undefined) { input = cachedFrom; }
  else { input = this.toRawRgbArray(); }

  input[0] = Math.round(input[0]);
  input[1] = Math.round(input[1]);
  input[2] = Math.round(input[2]);

  var value = convert.rgb.hex(input);
  this._.hex = value;

  return value;
};

// GRAYSCALE

Colr.prototype.toGrayscale = function () {
  var cached = this._.grayscale;
  if (cached !== undefined) { return cached; }

  var input;
  var cachedFrom = this._.rgb;

  if (cachedFrom !== undefined) { input = cachedFrom; }
  else { input = this.toRawRgbArray(); }

  var value = convert.rgb.grayscale(input);
  this._.grayscale = value;
  return value;
};

// RGB

Colr.prototype.toRawRgbArray = function () {
  var cached = this._.rgb;
  if (cached !== undefined) { return cached; }

  var value;

  if ((value = this._.hsv) !== undefined) {
    value = convert.hsv.rgb(value);
  } else if ((value = this._.hsl) !== undefined) {
    value = convert.hsl.rgb(value);
  } else {
    throw new Error('No data to convert');
  }

  this._.rgb = value;
  return value;
};

Colr.prototype.toRawRgbObject = function () {
  var arr = this.toRawRgbArray();
  return { r: arr[0], g: arr[1], b: arr[2] };
};

Colr.prototype.toRgbArray = function () {
  var arr = this.toRawRgbArray();
  return [ Math.round(arr[0]), Math.round(arr[1]), Math.round(arr[2]) ];
};

Colr.prototype.toRgbObject = function () {
  var arr = this.toRgbArray();
  return { r: arr[0], g: arr[1], b: arr[2] };
};

// HSL

Colr.prototype.toRawHslArray = function () {
  var cached = this._.hsl;
  if (cached !== undefined) { return cached; }

  var value;

  if ((value = this._.hsv) !== undefined) {
    value = convert.hsv.hsl(value);
  } else if ((value = this._.rgb) !== undefined) {
    value = convert.rgb.hsl(value);
  } else {
    throw new Error('No data to convert');
  }

  this._.hsl = value;
  return value;
};

Colr.prototype.toRawHslObject = function () {
  var arr = this.toRawHslArray();
  return { h: arr[0], s: arr[1], l: arr[2] };
};

Colr.prototype.toHslArray = function () {
  var arr = this.toRawHslArray();
  return [ Math.round(arr[0]), Math.round(arr[1]), Math.round(arr[2]) ];
};

Colr.prototype.toHslObject = function () {
  var arr = this.toHslArray();
  return { h: arr[0], s: arr[1], l: arr[2] };
};

// HSV

Colr.prototype.toRawHsvArray = function () {
  var cached = this._.hsv;
  if (cached !== undefined) { return cached; }

  var value;

  if ((value = this._.hsl) !== undefined) {
    value = convert.hsl.hsv(value);
  } else if ((value = this._.rgb) !== undefined) {
    value = convert.rgb.hsv(value);
  } else {
    throw new Error('No data to convert');
  }

  this._.hsv = value;
  return value;
};

Colr.prototype.toRawHsvObject = function () {
  var arr = this.toRawHsvArray();
  return { h: arr[0], s: arr[1], v: arr[2] };
};

Colr.prototype.toHsvArray = function () {
  var arr = this.toRawHsvArray();
  return [ Math.round(arr[0]), Math.round(arr[1]), Math.round(arr[2]) ];
};

Colr.prototype.toHsvObject = function () {
  var arr = this.toHsvArray();
  return { h: arr[0], s: arr[1], v: arr[2] };
};


/*
 * MODIFIERS
 */

Colr.prototype.lighten = function (amount) {
  var hsl = this.toRawHslArray();
  hsl[2] = clampPercentage(hsl[2] + amount);
  this._ = { hsl: hsl };
  return this;
};

Colr.prototype.darken = function (amount) {
  var hsl = this.toRawHslArray();
  hsl[2] = clampPercentage(hsl[2] - amount);
  this._ = { hsl: hsl };
  return this;
};

/*
 * MISC
 */

Colr.prototype.clone = function () {
  var colr = new Colr();
  colr._.hex = this._.hex;
  colr._.grayscale = this._.grayscale;

  if (this._.rgb !== undefined) {
    colr._.rgb = this._.rgb.slice(0);
  }
  if (this._.hsv !== undefined) {
    colr._.hsv = this._.hsv.slice(0);
  }
  if (this._.hsl !== undefined) {
    colr._.hsl = this._.hsl.slice(0);
  }

  return colr;
};

/*
 * UTILS
 */

function clampPercentage (val) {
  return Math.max(Math.min(val, 100), 0);
}

function clampByte (byte) {
  return Math.max(Math.min(byte, 255), 0);
}

function clampRgb (r, g, b) {
  return [
    Math.max(Math.min(r, 255), 0),
    Math.max(Math.min(g, 255), 0),
    Math.max(Math.min(b, 255), 0),
  ];
}

function clampHsx (h, s, x) {
  return [
    Math.max(Math.min(h, 360), 0),
    Math.max(Math.min(s, 100), 0),
    Math.max(Math.min(x, 100), 0),
  ];
}


module.exports = Colr;
