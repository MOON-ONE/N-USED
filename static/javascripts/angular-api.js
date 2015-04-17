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