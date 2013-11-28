/*jshint unused:false*/
angular.module('pcur-base', ['pcur-config', 'pcur-user'])
.constant('routes', {
    root: '/',
    login: '/login'
})
.controller('PcurCtrl', ['config', 'user', function(config, user) {
    
}]);