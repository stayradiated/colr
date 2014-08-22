var Colr = function () {
  this.r = 0;
  this.g = 0;
  this.b = 0;
};

Colr.prototype.fromHex = function (hex) {
  if (typeof hex !== 'string') {
    throw new Error('colr.fromHex: requires string');
  }
  if (hex[0] === '#') {
    hex = hex.slice(1);
  }
  if (! hex.match(/^[0-9a-f]*$/i)) {
    throw new Error('colr.fromHex: invalid hex characters');
  }
  if (hex.length >= 6) {
    this.r = parseInt(hex.slice(0,2), 16);
    this.g = parseInt(hex.slice(2,4), 16);
    this.b = parseInt(hex.slice(4,6), 16);
  } else if (hex.length >= 3){
    this.r = parseInt(hex[0] + hex[0], 16);
    this.g = parseInt(hex[1] + hex[1], 16);
    this.b = parseInt(hex[2] + hex[2], 16);
  } else {
    throw new Error('colr.fromHex: invalid hex length');
  }
  this._sanitize();
  return this;
};

Colr.prototype.fromRgb = function (r, g, b) {
  if (typeof r != 'number' || typeof g != 'number' || typeof b != 'number') {
    throw new Error('colr.fromRgb requires three numbers');
  }
  this.r = r;
  this.g = g;
  this.b = b;
  this._sanitize();
  return this;
};

Colr.prototype.fromRgbArray = function (arr) {
  return this.fromRgb.apply(this, arr);
};

Colr.prototype.fromRgbObject = function (obj) {
  return this.fromRgb(obj.r, obj.g, obj.b);
};

Colr.prototype.toHex = function () {
  var r = this.r.toString(16);
  var g = this.g.toString(16);
  var b = this.b.toString(16);
  if (r.length < 2) r = '0' + r;
  if (g.length < 2) g = '0' + g;
  if (b.length < 2) b = '0' + b;
  return ('#' + r + g + b).toUpperCase();
};

Colr.prototype.toRgbArray = function () {
  return [ this.r, this.g, this.b ];
};

Colr.prototype.toRgbObject = function () {
  return {
    r: this.r,
    g: this.g,
    b: this.b,
  };
};

Colr.prototype.clone = function () {
  var colr = new Colr();
  colr.fromRgbArray(this.toRgbArray());
  return colr;
};

Colr.prototype._sanitize = function () {
  this.r = Math.max(0, Math.min(255, this.r));
  this.g = Math.max(0, Math.min(255, this.g));
  this.b = Math.max(0, Math.min(255, this.b));
};

module.exports = Colr;
