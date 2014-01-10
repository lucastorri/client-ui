angular.module('pcur-config', [])
.constant('origin', window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''));