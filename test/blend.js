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

    screen: [
      ['000', '000', '#000000'],
      ['000', 'fff', '#ffffff'],
      ['fff', 'fff', '#ffffff'],
      ['abc', '123', '#b0c4d6'],
      ['808080', '808080', '#c0c0c0'],
      ['84252c', 'dddddd', '#efe2e3'],
      ['2888b3', '9b6d44', '#abbbc7'],
    ],

    multiply: [
      ['000', '000', '#000000'],
      ['000', 'fff', '#000000'],
      ['fff', 'fff', '#ffffff'],
      ['abc', '123', '#0b1929'],
      ['808080', '808080', '#404040'],
      ['84252c', 'dddddd', '#722026'],
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

    linearDodge: [
      ['000', '000', '#000000'],
      ['000', 'fff', '#ffffff'],
      ['fff', 'fff', '#ffffff'],
      ['abc', '123', '#bbddff'],
      ['808080', '808080', '#ffffff'],
      ['84252c', 'dddddd', '#ffffff'],
      ['2888b3', '9b6d44', '#c3f5f7'],
    ],

    linearBurn: [
      ['000', '000', '#000000'],
      ['000', 'fff', '#000000'],
      ['fff', 'fff', '#ffffff'],
      ['abc', '123', '#000000'],
      ['808080', '808080', '#010101'],
      ['dddddd', '84252c', '#62030a'],
      ['2888b3', '9b6d44', '#000000'],
    ],

    difference: [
      ['000', '000', '#000000'],
      ['000', 'fff', '#ffffff'],
      ['fff', 'fff', '#000000'],
      ['abc', '123', '#999999'],
      ['808080', '808080', '#000000'],
      ['dddddd', '84252c', '#59b8b1'],
      ['2888b3', '9b6d44', '#731b6f'],
    ],

    exclusion: [
      ['000', '000', '#000000'],
      ['000', 'fff', '#ffffff'],
      ['fff', 'fff', '#000000'],
      ['abc', '123', '#a4abad'],
      ['808080', '808080', '#7f7f7f'],
      ['dddddd', '84252c', '#7cc2bd'],
      ['2888b3', '9b6d44', '#928198'],
    ],

    overlay: [
      ['000', '000', '#000000'],
      ['000', 'fff', '#ffffff'],
      ['fff', '000', '#000000'],
      ['fff', 'fff', '#ffffff'],
      ['abc', '123', '#173252'],
      ['808080', '808080', '#808080'],
      ['84252c', 'dddddd', '#dec5c7'],
      ['2888b3', '9b6d44', '#56745f'],
    ],

    softLight: [
      ['000', '000', '#000000'],
      ['000', 'fff', '#ffffff'],
      ['fff', '000', '#000000'],
      ['fff', 'fff', '#ffffff'],
      ['abc', '123', '#1e3c59'],
      ['808080', '808080', '#808080'],
      ['84252c', 'dddddd', '#dec8ca'],
      ['2888b3', '9b6d44', '#71715e'],
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
