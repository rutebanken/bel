'use strict';

describe('bel.version module', function() {
  beforeEach(module('bel.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
