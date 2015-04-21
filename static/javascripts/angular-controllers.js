
angular.module('app.controllers', []).
controller('main', function($scope) {
	$scope.init = function() {
		loadData();
		$scope.books = data.books;
		$scope.users = data.users;
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

		if ($scope.orderKeyArray[1] === order) {
			if ($scope.orderKeyArray[1].substring(0, 1) === "-") {
				$scope.orderKeyArray[1] = order;
			} else {
				$scope.orderKeyArray[1] = "-" + order;
			}
		} else {
			$scope.orderKeyArray[1] = order;
		}
	}


	$scope.addBook = function(book) {
		data.books.push(book);
		$scope.updateBooks();
	}

	$scope.updateBooks = function() {
		$scope.books = data.books;
		$scope.$apply();
	}

	$scope.updateBook = function(updatedBook) {
		angular.forEach($scope.books, function(book, key) {
			if (book.pid == updatedBook.pid) {
				book = updatedBook;
			}
		});
		$scope.$apply();
	}

	$scope.updateCurrentBook = function(book) {
		$scope.currentBook = book;
		$scope.$apply();
	}

	$scope.removeBook = function(deletedBook) {
		for(var i = $scope.books.length; i--;) {
		  if($scope.books[i].pid === deletedBook.pid) {
		      $scope.books.splice(i, 1);
		  }
		}
		$scope.$apply();
	}

	$scope.updateCurrentSeller = function(seller) {
		$scope.currentSeller = seller;
		$scope.$apply();
	}

	$scope.updateUser = function(user) {
		var id = user? user.id : -1;
		$scope.currentUser = user;
		$scope.currentUserPastPostFilter = { sid: id };
		$scope.currentUserFavoriteFilter = function (book) {
			return data.favorites.filter(function (b) {
				return (b.uid === data.currentUserID) && (b.pid === book.pid);
			}).length != 0;
		};
		$scope.$apply();
	}


	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
					viewDidLoad();
				});
	
	$scope.orderKey = "-postTime";
	$scope.orderKeyArray = ["isSold", "-postTime"];
})
;