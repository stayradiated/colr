/*
 * Blend colors together with different modes.
 * Algorithms based on:
 * http://www.simplefilter.de/en/basics/mixmods.html
 */

'use strict';

var Colr = require('./index');

Colr.prototype.opacity = function (val, colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();

  c1[0] = (val * c1[0]) + ((1 - val) * c2[0]);
  c1[1] = (val * c1[1]) + ((1 - val) * c2[1]);
  c1[2] = (val * c1[2]) + ((1 - val) * c2[2]);

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

Colr.prototype.multiply = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();

  c1[0] = (c1[0] * c2[0]) / 255;
  c1[1] = (c1[1] * c2[1]) / 255;
  c1[2] = (c1[2] * c2[2]) / 255;

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.screen = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();

  c1[0] = (1 - ((1 - (c1[0] / 255)) * (1 - (c2[0] / 255)))) * 255;
  c1[1] = (1 - ((1 - (c1[1] / 255)) * (1 - (c2[1] / 255)))) * 255;
  c1[2] = (1 - ((1 - (c1[2] / 255)) * (1 - (c2[2] / 255)))) * 255;

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
  var t, b;

  t = c1[0]; b = c2[0];
  c1[0] = t + b - 2 * t * b / 255;
  t = c1[1]; b = c2[1];
  c1[1] = t + b - 2 * t * b / 255;
  t = c1[2]; b = c2[2];
  c1[2] = t + b - 2 * t * b / 255;

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.overlay = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();
  var t, b;

  t = c1[0]/255; b = c2[0]/255;
  c1[0] = b<0.5 ? 510*t*b : 255*(1-2*(1-t)*(1-b));
  t = c1[1]/255; b = c2[1]/255;
  c1[1] = b<0.5 ? 510*t*b : 255*(1-2*(1-t)*(1-b));
  t = c1[2]/255; b = c2[2]/255;
  c1[2] = b<0.5 ? 510*t*b : 255*(1-2*(1-t)*(1-b));

  this._ = { rgb: c1 };
  return this;
};

Colr.prototype.softLight = function (colr) {
  var c1 = this.toRawRgbArray();
  var c2 = colr.toRawRgbArray();
  var t, b;

  var div = 2 / 255;

  c1[0] = c2[0] < 128 ?
    ((c1[0] >> 1) + 64) * c2[0] * div :
    255 - (191 - (c2[0] >> 1)) * (255 - c2[0]) * div;
  c1[1] = c2[1] < 128 ?
    ((c1[1] >> 1) + 64) * c2[1] * div :
    255 - (191 - (c2[1] >> 1)) * (255 - c2[1]) * div;
  c1[2] = c2[2] < 128 ?
    ((c1[2] >> 1) + 64) * c2[2] * div :
    255 - (191 - (c2[2] >> 1)) * (255 - c2[2]) * div;

  this._ = { rgb: c1 };
  return this;
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
