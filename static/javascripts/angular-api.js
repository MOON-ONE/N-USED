function updateBookList(delay) {
	delay = typeof delay !== 'undefined' ? delay : 0;

	setTimeout(function(){
		angular.element("body").scope().updateBooks();
	}, delay)
}

function addBook(book) {
	angular.element("body").scope().addBook(book)
}

function getBook(bookID) {
	return books.filter(function (book) {
		return book.pid === (bookID + "");
	})[0];
}

function getUser(userID) {
	return users.filter(function (user) {
		return user.id === (userID + "");
	})[0];
}

function updateCurrentUser(currentUserID) {
	angular.element("body").scope().updateUser(getUser(currentUserID));
}

function updateCurrentBook(book) {
	angular.element("body").scope().updateCurrentBook(book);
}

function getBookSeller(bookID) {
	return getUser(getBook(bookID).sid);
}