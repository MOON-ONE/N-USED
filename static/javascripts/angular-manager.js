var app = angular.module('app', [])

//main controller
app.controller('main', ['$scope', function($scope) {
    $scope.init = function() {
        $scope.books = books;
    };
    
    $scope.orderList = "moduleCode";
}]);
