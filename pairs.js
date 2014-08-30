#!/usr/bin/env node

'use strict';

var convert = require('colr-convert');

var from = process.argv[2];
var to = process.argv[3];

var list = [];

switch (from) {

  case 'rgb':
  case 'hex':
    for (var r = 0; r < 5; r += 1) {
      for (var g = 0; g < 5; g += 1) {
        for (var b = 0; b < 5; b += 1) {
          var color = [rgb(r), rgb(g), rgb(b)];

          var fromValue = round(getValue('rgb', from, color));
          var toValue = round(getValue('rgb', to, color));

          list.push([fromValue, toValue]);
        }
      }
    }
    break;

  case 'grayscale':
    for (var i = 0; i <= 255; i += 3) {
      var rgb = convert.grayscale.rgb(i);
      var toValue = round(getValue('rgb', to, rgb));
      list.push([i, toValue]);
    }
    break;

  case 'hsv':
  case 'hsl':
    for (var h = 0; h <= 360; h += 90) {
      for (var s = 0; s <= 100; s += 25) {
        for (var v = 0; v <= 100; v += 25) {
          var color = [h, s, v];

          var fromValue = color;
          var toValue = round(getValue(from, to, color));

          list.push([fromValue, toValue]);
        }
      }
    }
    break;

}

function rgb (i) {
  return Math.max((i * 64) - 1, 0);
}

function getValue (from, to, color) {
  if (to === from) {
    return color;
  }
  return convert[from][to](color);
}

function round (obj) {
  if (Array.isArray(obj)) {
    return obj.map(round2dp);
  } else if (typeof obj === 'number') {
    return round2dp(obj);
  }
  return obj;
}

function round2dp (n) {
  return Math.floor(n * 100) / 100;
}

function format (obj) {
  var output = JSON.stringify(obj).replace(/"/g, '\'');
  output = output.slice(1, output.length - 1);

  if (typeof(obj[0][0]) === 'object' && typeof(obj[0][1]) === 'object') {
    return output.replace(/\]\],\[\[/g, ']],\n[[');
  } else {
    return output.replace(/\],\[/g, '],\n[');
  }
}

console.log(format(list));
