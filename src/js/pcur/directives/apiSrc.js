angular.module('pcur-directives-api-src', ['pcur-config'])
.directive('apiSrc', ['$sce', 'config', function($sce, config) {
    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, element, attrs) {
            angular.element(element).attr('src', $sce.getTrustedUrl($sce.trustAsUrl(config.api + attrs.apiSrc)));
        }
    };
}]);