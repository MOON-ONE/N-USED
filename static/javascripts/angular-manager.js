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
    
    $scope.changeFilterTo = function(pr) {
        $scope.filter = pr; 
    }

    $scope.addBook = function(book) {
        books.push(book);
        $scope.updateBooks();
    }

    $scope.updateBooks = function() {
        $scope.books = books;
        $scope.$apply();
    }

    $scope.updateUser = function(user) {
        var id = user? user.id : -1;
        $scope.currentUser = user;
        $scope.currentUserPastPostFilter = { sid: id };
        $scope.currentUserFavoriteFilter = function (book) {
            return favorites.filter(function (b) {
                var bool = (b.uid === id) && (b.pid === book.pid);
                if (bool) {
                    console.log("True:      " + b.uid + " " + book.pid)
                } else {
                    console.log("False:     " + b.uid + " " + book.pid)
                }
                return bool;
            });
        };
        $scope.$apply();
    }


    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    viewDidLoad();
                });
    
    $scope.orderList = "postTime";
}]);

