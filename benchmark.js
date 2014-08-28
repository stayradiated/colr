'use strict';

var Benchmark = require('benchmark');

var Colr = require('./index');
var color = require('color');
var tinycolor = require('tinycolor2');

var suite = function (name, tests) {
  console.log('\n#', name);

  var suite = new Benchmark.Suite();

  for (var test in tests) {
    suite.add(test, tests[test]);
  }

  suite.on('cycle', function (event) {
    console.log(String(event.target));
  });
  suite.on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  });

  suite.run();
};

var hex = '#bada55';
var hsv = {h: 180, s:50, v:50};

suite('Lighten', {
  colr: function () {
    Colr.fromHex(hex).lighten(20).toHex();
  },
  color: function () {
    color(hex).lighten(20).hexString();
  },
  tinycolor: function () {
    tinycolor(hex).lighten(20).toHexString();
  }
});

suite('Lighten & Darken', {
  colr: function ()  {
    Colr.fromHex(hex).lighten(10).darken(20).toHex();
  },
  color: function () {
    color(hex).lighten(10).darken(20).hexString();
  },
  tinycolor: function () {
    tinycolor(hex).lighten(10).darken(20).toHexString();
  }
});

suite('toHex', {
  colr: function () {
    Colr.fromHex(hex).toHex();
  },
  color: function () {
    color(hex).hexString();
  },
  tinycolor: function () {
    tinycolor(hex).toHexString();
  },
});

suite('toHex x2', {
  colr: function () {
    var obj = Colr.fromHex(hex);
    obj.toHex();
    obj.toHex();
  },
  color: function () {
    var obj = color(hex);
    obj.hexString();
    obj.hexString();
  },
  tinycolor: function () {
    var obj = tinycolor(hex);
    obj.toHexString();
    obj.toHexString();
  },
});

suite('HSV to HSL', {
  colr: function () {
    Colr.fromHsvObject(hsv).toHslObject();
  },
  color: function () {
    color(hsv).hsl();
  },
  tinycolor: function() {
    tinycolor(hsv).toHsv();
  }
});
