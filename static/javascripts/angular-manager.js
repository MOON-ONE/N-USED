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
        $scope.favourite = favourite;
        $scope.historyPost = historyPost;
        $scope.user = user;
    };

    $scope.filter = "$";
    $scope.search = {
        moduleCode: '',
        title: '',
        conditionRank: '',
        price: "",
        isSelected: '',
        $:''};
    
    $scope.changeFilterTo = function(pr) {
        $scope.filter = pr; 
    }


    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    viewDidLoad();
                });
    
    $scope.orderList = "moduleCode";
}]);

