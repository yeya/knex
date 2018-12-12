/*global describe*/

'use strict';

require('source-map-support').install();

global.sinon = require('sinon');

const chai = (global.chai = require('chai'));

chai.use(require('sinon-chai'));
chai.should();

global.Promise = require('bluebird');
global.expect = chai.expect;
global.d = new Date();

global.Promise.longStackTraces();

describe('Integration Tests', function() {
  it('waa', () => {});

  this.timeout(process.env.KNEX_TEST_TIMEOUT || 5000);

  describe('stuff', function() {
    require('./integration');
  });
});
