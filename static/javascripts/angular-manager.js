var app = angular.module('app', [
	'app.directives',
	'app.controllers'
]);


angular.module('app.directives', []).
  directive('onFinishRender', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('ngRepeatFinished');
				});
			}
		}
	}
});
