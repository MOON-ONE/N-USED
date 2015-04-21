$(document).ready(function() {
	// loadData();
	updateCurrentUser(data.currentUserID);
	viewDidLoad();
});

function viewDidLoad() {
	updateGrandCheckbox();
	$('[data-toggle="tooltip"]').tooltip();

	var table = $(".n-book-list-table table");
	table.floatThead({
		scrollContainer: function($table){
			return $('.n-book-list-table');
		}
	});

	$(".fancybox").fancybox();
	saveData();
}

// Nav
$(document).on("click", "div[id^='n-nav-']", function() {
	if ($(this).attr('id') == 'n-nav-logout') {
		// logout
		data.currentUserID = "-1";
		updateCurrentUser(data.currentUserID);
		$('#n-nav-home').click();
		saveData();
	} else {
		if ($(this).attr('id') == 'n-nav-login') {
			resetLoginButton();
		}

		var section = $(this).attr('id').substr(6);
		$(".n-nav-icon").removeClass("active");
		$(this).addClass("active");
		$(".n-main >div:visible").fadeOut(200, 'swing', function() {
			$("#n-" + section + "-wrapper").fadeIn(200);
			$(window).resize();
		});
		return false;
	}
});

var textTimeout = 200;

$(document).on("click", "#n-hamburger-icon", function() {
	$(".n-container").toggleClass('active');
	$(this).toggleClass('active');
	setTimeout(function (){
		$(".n-nav-text").toggleClass('active');
	}, textTimeout);
	textTimeout = 200 - textTimeout;
	return false;
});
// Nav End


// Home
function updateTableContainerHeight(height) {
	var windowHeight = $(window).height();
	var tableContainer = $(".n-book-list-table").css("height", (windowHeight - height) + "px");
}

function updateGrandCheckbox() {
	// only works for home page, might need generalization?
	if ($("#n-home-wrapper").css("display") != "none") {
		var checked = 0;
		var unchecked = 0;
		$("#n-home .col-selection input").each(function(index) {
			$(this).prop('checked') ? checked ++ : unchecked ++;
		});

		if (checked == 0) {
			$('#home-grand-checkbox').prop('checked', false);
			$('#home-grand-checkbox').prop('indeterminate', false);
		} else if (unchecked == 0) {
			$('#home-grand-checkbox').prop('checked', true);
			$('#home-grand-checkbox').prop('indeterminate', false);
		} else {
			$('#home-grand-checkbox').prop('indeterminate', true);
		}
	}
}

$(document).on("click", "#n-home .sort-button", function() {
	var moreOptionBar = $("#n-home .n-more-option-bar");
	if (moreOptionBar.css("display") == "none") {
		moreOptionBar.show();
		$(this).html('<i class="fa fa-chevron-up">');
		updateTableContainerHeight(235 + moreOptionBar.height());
	} else {
		moreOptionBar.hide();
		$(this).html('<i class="fa fa-chevron-down">');
		updateTableContainerHeight(70);
	}
});

$(document).on("click", "#selected-only-button", function() {
	
	if ($(this).hasClass("highlight-button")) {
		$(this).removeClass("highlight-button");
		angular.element("body").scope().search.isSelected = ""
	} else {
		$(this).addClass("highlight-button");
		angular.element("body").scope().search.isSelected = true	
	}

	angular.element("body").scope().$apply();
});

$(document).on("click", "#n-home #home-grand-checkbox", function() {
	$("#n-home .col-selection input").each(function(index) {
		if ($(this).prop('checked') != $("#n-home .grand-checkbox").prop('checked')) {
			var checkbox = $(this);
			checkbox.prop("checked", !checkbox.prop("checked"));
			var newValue = checkbox.prop("checked");
			var row = $(this).closest("tr");
			var bookID = row.attr("book-id");
			$.each(data.books, function() {
				if (this.pid == bookID) {
					this.isSelected = newValue;
				}
			});
		}
	});
	updateBookList();
});

$(document).on("click", ".book-item .check", function() {
	var checkbox = $(this).find("input");
	checkbox.prop("checked", !checkbox.prop("checked"));
	var newValue = checkbox.prop("checked");
	var row = $(this).closest("tr");
	var bookID = row.attr("book-id");
	$.each(data.books, function() {
		if (this.pid == bookID) {
			this.isSelected = newValue;
		}
	});
	updateGrandCheckbox();
	updateBookList(1000);
});

$(document).on("click", "#n-home .col-selection input", function() {
	var row = $(this).closest("tr");
	var newValue = $(this).prop("checked");
	var bookID = row.attr("book-id");
	$.each(data.books, function() {
		if (this.pid == bookID) {
			this.isSelected = newValue;
		}
	});
	updateGrandCheckbox();
	updateBookList();
	return false;
});

//End of Home

//Account
function getSelectedFavorite() {
	var selectedItems = []
	$("#n-account .stars .acc-col-selection input").each(function(index) {
		if ($(this).prop("checked")) {
			var thisFavoriteObject = {
				uid: data.currentUserID,
				pid: $(this).closest("tr").attr("book-id")
			}
			selectedItems.push(thisFavoriteObject);
		}

	})
	return selectedItems;
}

function getSelectedPosts() {
	var selectedItems = []
	$("#n-account .content-block.posts .acc-col-selection input").each(function(index) {
		if ($(this).prop("checked")) {
			var thisSelectedObject = {
				pid: $(this).parents('tr').attr('book-id'),
				isSold: $(this).parents('tr').attr('is-sold')
			}
			selectedItems.push(thisSelectedObject);
			// uncheck it
			$(this).prop("checked", false);
		}
	})
	return selectedItems;
}

$(document).on("click", "#n-account #post-grand-checkbox", function() {
	$("#n-account .posts input").each(function(index) {
		if ($(this).prop('checked') != $("#n-account #post-grand-checkbox").prop('checked')) {
			var checkbox = $(this);
			checkbox.prop("checked", !checkbox.prop("checked"));
		}
	});
});

$(document).on("click", "#n-account #star-grand-checkbox", function() {
	$("#n-account .stars input").each(function(index) {
		if ($(this).prop('checked') != $("#n-account #star-grand-checkbox").prop('checked')) {
			var checkbox = $(this);
			checkbox.prop("checked", !checkbox.prop("checked"));
		}
	});
});

$(document).on("click", "#n-account .content h4 span", function() {
	$("#n-account .content h4 span").removeClass("selected");
	$(this).addClass("selected")
	var showContentID = $(this).attr("href");
	$("#n-account .content .content-block").css("display", "none");
	$("#n-account .content .content-block" + showContentID).css("display", "block");
});

$(document).on("click", "#n-account .stars .btn-danger", function() {
	var res = confirm("This action is not recoverable! Do you still want to continue?");
	if (res == true) {
		removeFavorites(getSelectedFavorite());
	}
	saveData();
});

// re-list the selected sold-out posts
$(document).on("click", "#n-account .content-block.posts .btn-success", function() {
	var posts = getSelectedPosts();
	// only manipulate sold-out posts
	$.each(posts, function(index, item) {
		// get this book
		var book = getBook(item.pid);
		if (book.isSold) {
			// reverse its status
			book.isSold = false
		}
		updateBook(book);
	});
	saveData();
});

// mark the selected posts as sold out
$(document).on("click", "#n-account .content-block.posts .btn-primary", function() {

	var posts = getSelectedPosts();
	// only manipulate un-sold posts	
	$.each(posts, function(index, item) {
		// get this book
		var book = getBook(item.pid);
		if (!book.isSold) {
			// reverse its status
			book.isSold = true
		}
		updateBook(book);
	});
	saveData();
});

// delete the selected posts
$(document).on("click", "#n-account .content-block.posts .btn-danger", function() {
	var posts = getSelectedPosts();
	// delete selected posts
	$.each(posts, function(index, item) {
		// get this book
		var book = getBook(item.pid);
		removeBook(book);
	});
	saveData();
});


//End of Account

// Post
function renderViewPostPage(pid) {
	var book = getBook(pid);
	updateCurrentBook(book);
	data.currentBook = angular.element("body").scope().currentBook;
	var seller = getBookSeller(pid);
	updateCurrentSeller(seller);
	$(".n-main >div:visible").fadeOut(200, 'swing', function() {
		$("#n-view-post-wrapper").fadeIn(200);
	});

	var filteredFavorite = data.favorites.filter(function (obj) {
		return (obj.pid == pid) && (obj.uid == data.currentUserID);
	});

	if (filteredFavorite.length > 0) {
		$(".like").addClass("on");
	}
}

function validateNotNull(item) {
	var notNullReg = new RegExp(/^(.+)$/);
	var value = $(item).val().trim();
	$(item).val($(item).val().trim());
	if (!notNullReg.test(value)) {
		$(item).parent().addClass("has-error");
	}
}

function validateCondition(item) {
	var conditionReg = new RegExp(/^([0-9]|10|[0-9]\.[0-9]+)$/);
	var value = $(item).val();
	if (!conditionReg.test(value)) {
		$(item).parent().addClass("has-error");
	}
}

function validatePrice(item) {
	var priceReg = new RegExp(/^(\d+|\d+\.\d+)$/);
	var value = $(item).val();
	if (!priceReg.test(value)) {
		$(item).parent().addClass("has-error");
	}
}

function clearError(item) {
	$(item).parent().removeClass("has-error");
}

function isValidPost(){
	var conditionReg = new RegExp(/^([0-9]|10|[0-9]\.[0-9]+)$/);
	var priceReg = new RegExp(/^(\d+|\d+\.\d+)$/);
	var notNullReg = new RegExp(/^(.+)$/);

	var code = $("#post-code").val();
	var title = $("#post-title").val();
	var price = $("#post-price").val();
	var condition = $("#post-condition").val();

	if (!notNullReg.test(code)) {
		$("#post-code").parent().addClass("has-error");
		return false;
	}

	if (!notNullReg.test(title)) {
		$("#post-title").parent().addClass("has-error");
		return false;
	}

	if (!priceReg.test(price)) {
		$("#post-price").parent().addClass("has-error");
		return false;
	}

	if (!conditionReg.test(condition)) {
		$("#post-condition").parent().addClass("has-error");
		return false;
	}

	return true;
}

function clearPostInput() {
	$("#post-code").val("");
	$("#post-title").val("");
	$("#post-description").val("");
	$("#post-price").val("");
	$("#post-edition").val("");
	$("#post-authors").val("");
	$("#post-condition").val("");
	$("#post-cond-check-1").prop('checked', false);
	$("#post-cond-check-2").prop('checked', false);
	$("#post-cond-check-3").prop('checked', false);
	$("#post-cond-check-4").prop('checked', false);
}

$(document).on("click", ".book-item .navigation", function() {
	var bid = $(this).parents().attr("book-id");
	return renderViewPostPage(bid);
});

$(document).on("click", ".post-back-button", function() {
	$("#n-view-post-wrapper").hide();
	$("#n-gpost-wrapper").hide();
	$("#n-home-wrapper").fadeIn(200);
});	

$(document).on("click", ".like", function() {
	$(this).toggleClass("on");
	var pid = data.currentBook.pid;
	var uid = data.currentUserID;

	var filteredFavorite = data.favorites.filter(function (obj) {
		return ((obj.pid != pid) || (obj.uid != uid));
	});

	if ($(this).hasClass("on")) {
		// mark on
		if (filteredFavorite.length == data.favorites.length) {
			data.favorites.push({uid: uid, pid: pid});
		}
	} else {
		if (filteredFavorite.length == data.favorites.length - 1) {
			data.favorites = filteredFavorite;
		}
	}

	angular.element("body").scope().$apply();
	saveData();
});

$(document).on("click", ".post-create", function() {
	if (isValidPost()) {
		var pid = Math.random().toString(36).substring(7);
		var code = $("#post-code").val();
		var title = $("#post-title").val();
		var description = $("#post-description").val();
		var price = $("#post-price").val();
		var edition = $("#post-edition").val();
		var authors = $("#post-authors").val();
		var condition = $("#post-condition").val();
		var check1 = $("#post-cond-check-1").is(':checked') == true ? 1 : 0;
		var check2 = $("#post-cond-check-2").is(':checked') == true ? 1 : 0;
		var check3 = $("#post-cond-check-3").is(':checked') == true ? 1 : 0;
		var check4 = $("#post-cond-check-4").is(':checked') == true ? 1 : 0;
		var check = check1.toString() + check2.toString() + check3.toString() + check4.toString();
		var check_binary = parseInt(check, 2);
		var date = new Date();
		var day = parseInt(date.getDate()) < 10 ? "0" + date.getDate() : date.getDate();
		var month = parseInt(date.getMonth()) < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
		var year = date.getFullYear();
		var post_date = year + "/" + month + "/" + day;
		var book = {
			pid                : pid,
			moduleCode         : code.toUpperCase(),
			title              : title,
			edition            : edition,
			authors            : authors,
			conditionRank      : condition,
			conditionCheckList : check_binary,
			description        : description,
			price              : price,
			sid                : data.currentUserID,
			isSelected         : false,
			postTime           : post_date,
			isSold             : false
		};
		addBook(book);
		clearPostInput();
		$('#n-nav-home').click();
	} else {
		alert("Please check your input.");
		return false;
	}
	saveData();
});
// End of Post

// Login
function resetLoginButton() {
	$('#n-login-btn').removeClass('btn-danger');
	$('#n-login-btn').html('<i class="fa fa-check"></i>');
}

$(document).on("click", "#n-login-btn", function() {
	var email = $('#n-login-email').val();
	var password = $('#n-login-password').val();
	var user = data.users.filter(function (obj) {
		return obj.email == email && obj.password == password;
	});

	if (user.length > 0) {
		data.currentUserID = user[0].id;
		updateCurrentUser(data.currentUserID);
		$('#n-login-email').val('');
		$('#n-login-password').val('');
		$('#n-nav-home').click();
	} else {
		$('#n-login-btn').addClass('btn-danger');
		$('#n-login-btn').html('<i class="fa fa-times"></i>');
	}
	saveData();
});

$(document).on("focus", "#n-login-email", function() {
	resetLoginButton();
});

$(document).on("focus", "#n-login-password", function() {
	resetLoginButton();
});
// End of Login



function saveData() {
	localStorage.setItem("isStored", true);
	localStorage.setItem("data", JSON.stringify(data));
}

function loadData() {
	if (localStorage.isStored) {
		data = JSON.parse(localStorage.getItem("data"));
	} else {
		data = defaultData;
	}
}