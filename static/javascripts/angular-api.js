function updateBookList(delay) {
	delay = typeof delay !== 'undefined' ? delay : 0;

	setTimeout(function(){
		angular.element("body").scope().updateBooks();
	}, delay)
}

function addBook(book) {
	angular.element("body").scope().addBook(book);
}

function getBook(bookID) {
	return data.books.filter(function (book) {
		return book.pid === (bookID + "");
	})[0];
}

function getUser(userID) {
	return data.users.filter(function (user) {
		return user.id === (userID + "");
	})[0];
}

function updateCurrentUser(currentUserID) {
	angular.element("body").scope().updateUser(getUser(currentUserID));
}

function updateBook(book) {
	angular.element("body").scope().updateBook(book);
}

function updateCurrentBook(book) {
	angular.element("body").scope().updateCurrentBook(book);
}

function removeBook(book) {
	angular.element("body").scope().removeBook(book);
}

function getBookSeller(bookID) {
	return getUser(getBook(bookID).sid);
}

function updateCurrentSeller(seller) {
	angular.element("body").scope().updateCurrentSeller(seller);
}

function removeFavorites(itemsToRemove) {
	data.favorites = data.favorites.filter(function(itemInFavorite) {
		return !containsObject(itemsToRemove, itemInFavorite);
	})
	angular.element("body").scope().$apply();
}

//Helper Functions

function containsObject(array, object) {
	for (var i = 0; i < array.length; i++) {
		if (JSON.stringify(array[i]) === JSON.stringify(object)) {
			return true;
		}
	}
	return false;
}



