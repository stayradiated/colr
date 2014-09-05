/*
 * Blend colors together with different modes.
 * Based on blend.js by Jacob Seidelin.
 * http://www.pixastic.com/lib/docs/actions/blend/
 */

'use strict';

var Colr = require('./index');

Colr.prototype.screen = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();

  c1[0] = (1 - ((1-c1[0]/255) * (1-c2[0]/255))) * 255;
  c1[1] = (1 - ((1-c1[1]/255) * (1-c2[1]/255))) * 255;
  c1[2] = (1 - ((1-c1[2]/255) * (1-c2[2]/255))) * 255;

  this._ = { rgb: c1 };
  return this;
};

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
  var x;

  x = c2[0];
  if (x > c1[0]) { c1[0] = x; }
  x = c2[1];
  if (x > c1[1]) { c1[1] = x; }
  x = c2[2];
  if (x > c1[2]) { c1[2] = x; }

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.darken = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();
  var x;

  x = c2[0];
  if (x < c1[0]) { c1[0] = x; }
  x = c2[1];
  if (x < c1[1]) { c1[1] = x; }
  x = c2[2];
  if (x < c1[2]) { c1[2] = x; }

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.linearDodge = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();
  var x;

  x = c1[0] + c2[0];
  c1[0] = x > 255 ? 255 : x;
  x = c1[1] + c2[1];
  c1[1] = x > 255 ? 255 : x;
  x = c1[2] + c2[2];
  c1[2] = x > 255 ? 255 : x;

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.linearBurn = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();
  var x;

  x = c1[0] + c2[0];
  c1[0] = x < 255 ? 0 : x - 255;
  x = c1[1] + c2[1];
  c1[1] = x < 255 ? 0 : x - 255;
  x = c1[2] + c2[2];
  c1[2] = x < 255 ? 0 : x - 255;

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.difference = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();
  var x;

  x = c1[0] - c2[0];
  c1[0] = x < 0 ? -x : x;
  x = c1[1] - c2[1];
  c1[1] = x < 0 ? -x : x;
  x = c1[2] - c2[2];
  c1[2] = x < 0 ? -x : x;

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.exclusion = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();

  // (source*(1-dest)) (dest*(1-source))
  c1[0] = (c1[0] * (1 - c2[0])) * (c2[0] * (1 - c1[0]));
  c1[1] = (c1[1] * (1 - c2[1])) * (c2[1] * (1 - c1[1]));
  c1[2] = (c1[2] * (1 - c2[2])) * (c2[2] * (1 - c1[2]));

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.overlay = function (colr) {
};

Colr.prototype.softLight = function (colr) {
};

Colr.prototype.hardLight = function (colr) {
};

Colr.prototype.colorDodge = function (colr) {
};

Colr.prototype.colorBurn = function (colr) {
};

Colr.prototype.linearLight = function (colr) {
};

Colr.prototype.vividLight = function (colr) {
};

Colr.prototype.pinLight = function (colr) {
};

Colr.prototype.hardMix = function (colr) {
};

module.exports = Colr;
