'use strict';

angular.module('bel.version', [
  'bel.version.interpolate-filter',
  'bel.version.version-directive'
])

.value('version', '0.1');
