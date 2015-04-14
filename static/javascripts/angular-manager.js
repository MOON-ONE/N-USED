var app = angular.module('app', [])

//finish render callback
app.directive('onFinishRender', function ($timeout) {
	return {
	    restrict: 'A',
	    link: function (scope, element, attr) {
	        if (scope.$last === true) {
	            $timeout(function () {
	                scope.$emit('ngRepeatFinished');
	            });
	        }
	    }
}});


//main controller
app.controller('main', ['$scope', function($scope) {
    $scope.init = function() {
        $scope.books = books;
    };
    
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    $("#n-home table").floatThead();
                    $("#n-home .toggle").parent().toggleClass('closed');
                    setTimeout(function(){ 
    					$("#n-home .toggle").prev().focus();
                    }, 1000);
                });
    
    $scope.orderList = "moduleCode";
}]);