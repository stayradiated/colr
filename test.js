'use strict';

var assert = require('assert');
var Colr = require('./index');

describe('Colr', function () {

  var colr;

  var equal = function (arr) {
    assert.deepEqual(colr.toRgbArray(), arr);
  };


  /*
   * IMPORTERS
   */

  // HEX

  it('should parse hex strings', function () {
    var tests = {
      '#012345': [1, 35, 69],
      '#abcdef': [171, 205, 239],
      'abcdef':  [171, 205, 239],
      '22ccDD':  [34, 204, 221],
      '2CD':     [34, 204, 221],
      '#2CD':    [34, 204, 221],
      '2CDaa':   [34, 204, 221],
      '909090':  [144, 144, 144],
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      equal(tests[key]);
    }
  });

  it('should throw an error on an invalid hex', function () {
    var tests = [ '#01', '01', 'ab', 'abcdex' ];

    tests.forEach(function (value) {
      assert.throws(function () {
        colr = Colr.fromHex(value);
      });
    });
  });

  // RGB

  it('should import r, g, b as arguments, arrays and objects', function () {
    var tests = [
      [[10, 20, 30], [10, 20, 30]],
      [[0, 128, 255], [0, 128, 255]],
      [[-1, 128, 256], [0, 128, 255]],
      [[-0.5, 128, 255.5], [0, 128, 255]],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expected = test[1];

      colr = Colr.fromRgb.apply(null, input);
      equal(expected);

      colr = Colr.fromRgbArray(input);
      equal(expected);

      colr = Colr.fromRgbObject({ r: input[0], g: input[1], b: input[2] });
      equal(expected);
    });
  });

  it('should throw an error on invalid rgb arguments', function () { 
    var tests = [
      [],
      [1, 2],
      ['1', '2', '3'],
      [[], {}, true]
    ];

    tests.forEach(function (test) { 
      assert.throws(function () {
        colr = Colr.fromRgb.apply(null, test);
      });
    });
  });

  // GRAYSCALE
  
  it('should convert from grayscale', function () {
    var tests =[
      [0, [0, 0, 0], 0],
      [-1, [0, 0, 0], 0],
      [30, [30, 30, 30], 30],
      [255, [255, 255, 255], 255],
      [128, [128, 128, 128], 128],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expectedRgb = test[1];
      var expectedVal = test[2];

      colr = Colr.fromGrayscale(input);
      equal(expectedRgb);
      assert.equal(colr.toGrayscale(), expectedVal);
    });
  });

  // HSL

 it('should convert from hsl', function () {
    var tests = [
      [[0, 0, 0], [0, 0, 0]],
      [[0, 0, 100], [255, 255, 255]],
      [[20, 30, 40], [133, 92, 71]],
      [[-100, 2000, 50], [255, 0, 0]],
      [[0, 100, 50], [255, 0, 0]],
      [[0.1, 0.2, 0.3], [1, 1, 1]],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expected = test[1];

      colr = Colr.fromHsl.apply(null, input);
      equal(expected);

      colr = Colr.fromHslArray(input);
      equal(expected);

      colr = Colr.fromHslObject({ h: input[0], s: input[1], l: input[2] });
      equal(expected);
    });
  });

  // HSV
  
  it('should convert from hsv', function () {
    var tests = [
      [[0, 0, 0], [0, 0, 0]],
      [[0, 0, 100], [255, 255, 255]],
      [[20, 30, 40], [102, 82, 71]],
      [[-100, 2000, 50], [128, 0, 0]],
      [[0, 100, 50], [128, 0, 0]],
      [[1, 2, 3], [8, 7, 7]],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expected = test[1];

      colr = Colr.fromHsv.apply(null, input);
      equal(expected);

      colr = Colr.fromHsvArray(input);
      equal(expected);

      colr = Colr.fromHsvObject({ h: input[0], s: input[1], v: input[2] });
      equal(expected);
    });
  });

  it('should convert from hsv to hsl', function () {
    var tests = [
      [[0, 0, 0], [0, 0, 0]],
      [[0, 0, 100], [0, 0, 100]],
      [[20, 30, 40], [20, 18, 34]],
      [[-100, 2000, 50], [0, 100, 25]],
      [[0, 100, 50], [0, 100, 25]],
      [[1, 2, 3], [1, 1, 3]],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expected = test[1];

      colr = Colr.fromHsvArray(input);
      assert.deepEqual(colr.toHslArray(), expected);
    });
  });

  it('should convert from hsl to hsv', function () {
    var tests = [
      [[0, 0, 0], [0, 0, 0]],
      [[0, 0, 100], [0, 0, 100]],
      [[20, 30, 40], [20, 46, 52]],
      [[-100, 2000, 50], [0, 100, 100]],
      [[0, 100, 50], [0, 100, 100]],
      [[1, 2, 3], [1, 4, 3]],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expected = test[1];

      colr = Colr.fromHslArray(input);
      assert.deepEqual(colr.toHsvArray(), expected);
    });
  });


  /*
   * EXPORTERS
   */

  // HEX

  it('should output as a hex string', function () {
    var tests = {
      '#bada55': '#bada55',
      'abc': '#aabbcc',
      '#010203': '#010203',
      '000': '#000000',
      'fff': '#ffffff',
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      assert.equal(colr.toHex(), tests[key]);
    }
  });

  // RGB

  it('should output as an rgb array', function () {
    var tests = [
      [[-1, 128, 256], [0, 128, 255]],
      [[20, 30, 40], [20, 30, 40]],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expected = test[1];
      
      colr = Colr.fromRgbArray(input);
      equal(expected);
    });
  });

  it('should output as an rgb object', function () {
    var tests = [
      [[-1, 128, 256], {r: 0, g: 128, b: 255}],
      [[20, 30, 40], {r: 20, g: 30, b: 40}],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expected = test[1];
      
      colr = Colr.fromRgbArray(input);
      assert.deepEqual(colr.toRgbObject(), expected);
    });
  });


  // GRAYSCALE

  it('should convert to grayscale', function () {
    var tests = {
      '#FFFFFF': 255,
      '#000000': 0,
      '#808080': 128,
      '#bada55': 193.27,
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      assert.equal(colr.toGrayscale(), tests[key]);
    }
  });

  // HSL

  it('should convert to hsl', function () {
    var tests = {
      '#000000': [0, 0, 0],
      '#FFFFFF': [0, 0, 100],
      '#bada55': [74, 64, 59],
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      assert.deepEqual(colr.toHslArray(), tests[key]);
      assert.deepEqual(colr.toHslObject(), {
        h: tests[key][0],
        s: tests[key][1],
        l: tests[key][2],
      });
    }
  });

  // HSV 

  it('should convert to hsv', function () {
    var tests = {
      '#000000': [0, 0, 0],
      '#FFFFFF': [0, 0, 100],
      '#bada55': [74, 61, 85],
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      assert.deepEqual(colr.toHsvArray(), tests[key]);
      assert.deepEqual(colr.toHsvObject(), {
        h: tests[key][0],
        s: tests[key][1],
        v: tests[key][2],
      });
    }
  });


  /*
   * MODIFIERS
   */

  it('should lighten the color', function () {
    var tests = {
      '#000000': '#808080',
      '#aabbcc': '#ffffff',
      '#332211': '#d0a273',
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      colr.lighten(50);
      assert.equal(colr.toHex(), tests[key]);
    }
  });

  it('should darken the color', function () {
    var tests = {
      '#FFFFFF': '#808080',
      '#aabbcc': '#2d3c4a',
      '#332211': '#000000',
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      colr.darken(50);
      assert.equal(colr.toHex(), tests[key]);
    }
  });


  /*
   * MISC
   */

  it('should clone a color', function () {
    var a = Colr.fromHex('aaa');
    var b = a.clone();

    a.lighten(20);
    b.darken(20);

    assert.equal(a.toHex(), '#dddddd');
    assert.equal(b.toHex(), '#777777');
  });

});
