var assert = require('assert');
var Colr = require('./index');

describe('Colr', function () {

  var colr;

  var equal = function (arr) {
    return colr.r === arr[0] && colr.g === arr[1] && colr.b === arr[2];
  };

  it('should parse hex strings', function () {
    var tests = {
      '#012345': [1, 35, 69],
      '#abcdef': [171, 205, 239],
      'abcdef':  [171, 205, 239],
      '22ccDD':  [34, 204, 221],
      '2CD':     [34, 204, 221],
      '#2CD':    [34, 204, 221],
      '2CDaa':   [34, 204, 221],
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      assert(equal(tests[key]));
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
      assert(equal(expected));

      colr = Colr.fromRgbArray(input);
      assert(equal(expected));

      colr = Colr.fromRgbObject({ r: input[0], g: input[1], b: input[2] });
      assert(equal(expected));
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

  it('should output as a hex string', function () {
    var tests = {
      '#bada55': '#BADA55',
      'abc': '#AABBCC',
      '#010203': '#010203',
      '000': '#000000',
      'fff': '#FFFFFF',
    };

    for (var key in tests) {
      colr = Colr.fromHex(key);
      assert.equal(colr.toHex(), tests[key]);
    }
  });

  it('should output as an rgb array', function () {
    var tests = [
      [[-1, 128, 256], [0, 128, 255]],
      [[20, 30, 40], [20, 30, 40]],
    ];

    tests.forEach(function (test) {
      var input = test[0];
      var expected = test[1];
      
      colr = Colr.fromRgbArray(input);
      assert(equal(expected));
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

});
