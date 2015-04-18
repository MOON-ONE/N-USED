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
        $scope.users = users;
    };

    $scope.filter = "$";
    $scope.search = {
        moduleCode: '',
        title: '',
        conditionRank: '',
        price: '',
        isSelected: '',
        $:''
    };
    
    
    $scope.setOrder = function (order) {
        if ($scope.orderKey === order) {
            if ($scope.orderKey.substring(0, 1) === "-") {
                $scope.orderKey = order;
            } else {
                $scope.orderKey = "-" + order;
            }
        } else {
            $scope.orderKey = order;
        }
    }


    $scope.addBook = function(book) {
        books.push(book);
        $scope.updateBooks();
    }

    $scope.updateBooks = function() {
        $scope.books = books;
        $scope.$apply();
    }

    $scope.updateCurrentBook = function(book) {
        $scope.currentBook = book;
        $scope.$apply();
    }

    $scope.updateUser = function(user) {
        var id = user? user.id : -1;
        $scope.currentUser = user;
        $scope.currentUserPastPostFilter = { sid: id };
        $scope.currentUserFavoriteFilter = function (book) {
            return favorites.filter(function (b) {
                return (b.uid === currentUserID) && (b.pid === book.pid);
            }).length != 0;
        };
        $scope.$apply();
    }


    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    viewDidLoad();
                });
    
    $scope.orderKey = "-postTime";
}]);

