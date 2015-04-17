function updateBookList() {
	angular.element("body").scope().updateBooks();
}

function addBook(book) {
	angular.element("body").scope().addBook(book)
}

function getBook(bookID) {
	return books.filter(function (book) {
		return book.id === (bookID + "")
	})[0]
}

function getUser(userID) {
	if (userID == -1) {
		return null;
	}

	return users.filter(function (user) {
		return user.id === (userID + "")
	})[0]
}

function updateCurrentUser(currentUserID) {
	angular.element("body").scope().updateUser(getUser(currentUserID))
}