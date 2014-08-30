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
var hsl = {h: 180, s:50, l:50};

suite('FromHsv -> ToRgb', {
  colr: function () {
    Colr.fromHsvObject(hsv).toRgbObject();
  },
  color: function () {
    color(hsv).rgb();
  },
  tinycolor: function () {
    tinycolor(hsv).toRgb();
  },
});

suite('FromHex -> Lighten -> ToHex', {
  colr: function () {
    Colr.fromHex(hex).lighten(20).toHex();
  },
  color: function () {
    color(hex).lighten(0.2).hexString();
  },
  tinycolor: function () {
    tinycolor(hex).lighten(20).toHexString();
  }
});

suite('FromHex -> Lighten -> Darken -> ToHex', {
  colr: function ()  {
    Colr.fromHex(hex).lighten(10).darken(20).toHex();
  },
  color: function () {
    color(hex).lighten(0.1).darken(0.2).hexString();
  },
  tinycolor: function () {
    tinycolor(hex).lighten(10).darken(20).toHexString();
  }
});

suite('FromHex -> ToHex', {
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

suite('FromHsv -> ToRgb -> ToHex', {
  colr: function () {
    var obj = Colr.fromHsvObject(hsv);
    obj.toRgbObject();
    obj.toHex();
  },
  color: function () {
    var obj = color(hsv);
    obj.rgb();
    obj.hexString();
  },
  tinycolor: function () {
    var obj = tinycolor(hsv);
    obj.toRgb();
    obj.toHexString();
  },
});

suite('FromHsv -> ToHsl', {
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

suite('FromHsl -> ToHsv', {
  colr: function () {
    Colr.fromHslObject(hsl).toHsvObject();
  },
  color: function () {
    color(hsl).hsv();
  },
  tinycolor: function() {
    tinycolor(hsl).toHsl();
  }
});
