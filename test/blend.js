'use strict';

var assert = require('assert');
var Colr = require('../blend');

describe('Colr/blend', function () {

  /* 
   * format:
   * 'blendmode': [
   *   ['a_hex', 'b_hex', output_hex'],
   * ]
   */

  var tests = {

    multiply: [
  ['000', '000', '#000000'],
  ['000', 'fff', '#000000'],
  ['fff', 'fff', '#ffffff'],
  ['abc', '123', '#0b1929'],
  ['84252c', '26343f', '#14080b'],
  ['808080', '808080', '#404040'],
  ['2888b3', '9b6d44', '#183a30'],
  ],

  lighten: [
    ['000', '000', '#000000'],
  ['000', 'fff', '#ffffff'],
  ['08f', 'fff', '#ffffff'],
  ['fff', 'fff', '#ffffff'],
  ['2888b3', '9b6d44', '#9b88b3'],
  ],

  darken: [
    ['000', '000', '#000000'],
  ['000', 'fff', '#000000'],
  ['fff', 'fff', '#ffffff'],
  ['08f', 'fff', '#0088ff'],
  ['2888b3', '9b6d44', '#286d44'],
  ],

  lineardodge: [
    ['', '', '']
    ],

  };

  for (var mode in tests) {
    blend(mode, tests[mode]);
  }

  function blend (mode, tests) {
    it ('should blend using '+mode, function () {
      tests.forEach(function (test) {
        var c1 = Colr.fromHex(test[0]);
        var c2 = Colr.fromHex(test[1]);
        c1[mode](c2);
        assert.equal(c1.toHex(), test[2], test[0]+'+'+test[1]+'='+test[2]);
      });
    });
  }


});
