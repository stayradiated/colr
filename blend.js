/*
 * Blend colors together with different modes.
 * Based on blend.js by Jacob Seidelin.
 * http://www.pixastic.com/lib/docs/actions/blend/
 */

'use strict';

var Colr = require('./index');

Colr.prototype.multiply = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();

  c1[0] = c1[0] * c2[0] / 255;
  c1[1] = c1[1] * c2[1] / 255;
  c1[2] = c1[2] * c2[2] / 255;

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.lighten = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();

  var r = c2[0];
  if (r > c1[0]) { c1[0] = r; }
  var g = c2[1];
  if (g > c1[1]) { c1[1] = g; }
  var b = c2[2];
  if (b > c1[2]) { c1[2] = b; }

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.darken = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();

  var r = c2[0];
  if (r < c1[0]) { c1[0] = r; }
  var g = c2[1];
  if (g < c1[1]) { c1[1] = g; }
  var b = c2[2];
  if (b < c1[2]) { c1[2] = b; }

  this._ = { rgb: c1 };
  return this;
};

module.exports = Colr;
