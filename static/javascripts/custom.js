function viewDidLoad() {


// 总
// $("#n-view-post-wrapper").load("view/view-post.html", function () {
	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
// });
// $("#n-post-wrapper").load("view/post.html", function () {
	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
// });
// $("#n-home-wrapper").load("view/home.html", function () {
// 	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
// }); 
// $("#n-account-wrapper").load("view/account.html", function () {
// 	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
// });

$('[data-toggle="tooltip"]').tooltip();
updateCurrentUser(currentUserID);

// 总完


// 王狗
$("#n-home .sort-button").click(function() {
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

$("#n-home .grand-checkbox").click(function() {
	$("#n-home .col-selection input").each(function(index) {
		$(this).prop('checked', $("#n-home .grand-checkbox").prop('checked'));
		var row = $(this).closest("tr");
		var newValue = $(this).prop("checked");
		var bookID = row.attr("book-id");
		$.each(books, function() {
		    if (this.id == bookID) {
		        this.isSelected = newValue;
		    }
		});
	})
	updateBookList();
})

$("#selected-only-button").click(function() {
	
	if ($(this).hasClass("highlight-button")) {
		$(this).removeClass("highlight-button");
		angular.element("body").scope().search.isSelected = ""
	} else {
		$(this).addClass("highlight-button");
		angular.element("body").scope().search.isSelected = true	
	}

	angular.element("body").scope().$apply();
	
})

$("#n-home .col-selection input").click(function() {
	var row = $(this).closest("tr");
	var newValue = $(this).prop("checked");
	var bookID = row.attr("book-id");
	$.each(books, function() {
	    if (this.pid == bookID) {
	        this.isSelected = newValue;
	    }
	});
	updateBookList();
})

function updateTableContainerHeight(height) {
	var windowHeight = $(window).height();
	var tableContainer = $(".n-book-list-table").css("height", (windowHeight - height) + "px");
}

var table = $(".n-book-list-table table");
table.floatThead({
    scrollContainer: function($table){
        return $('.n-book-list-table');
    }
});




// 王狗完






// 林狗
$(".fancybox").fancybox();
$(".like").click(function() {
	if ($(this).hasClass("on")) {
		$(this).removeClass("on").addClass("off");
	} else if ($(this).hasClass("off")){
		$(this).removeClass("off").addClass("on");
	} else {

	}
})

$(".book-item .navigation").click(function() {
	var bid = $(this).parents().attr("book-id");
	return renderViewPostPage(bid);
})

$(document).on("click", ".post-back-button", function() {
	$("#n-home-wrapper").fadeIn(200);
})


function renderViewPostPage(bid) {
	var book = getBook(bid);
	updateCurrentBook(book);
	var seller = getBookSeller(bid);
	updateCurrentSeller(seller);
	$(".n-main >div:visible").fadeOut(200, 'swing', function() {
		$("#n-view-post-wrapper").fadeIn(200);
	});
}

// 林狗完






// 孙狗
// $(document).on("click",".n-account-nav a",function(e){
//     e.preventDefault();
//     $(".n-account-toggle").hide();
//     var toShow = $(this).attr('href');
//     $(toShow).show();
// });

// $(document).on("click",".n-account-edit-button", function(){

//             var $this = $(this);
//             var text = $this.text();
//             if(text=="Edit"){
//                 $this.text("Cancel");
//             }
//                         else{
//                              $this.text("Edit");
//                         }
//             $(".account-label").toggle();
//         });

//         $("input.account-label").change(function(){
//             $(this).prev().text($(this).text());

//         });


$(document).on("click", "#n-account .content h4 span", function() {
	$("#n-account .content h4 span").removeClass("selected");
	$(this).addClass("selected")
	var showContentID = $(this).attr("href");
	$("#n-account .content .content-block").css("display", "none");
	console.log("#n-account .content .content-block " + showContentID)
	$("#n-account .content .content-block" + showContentID).css("display", "block");
})


$("#n-account tr").each(function(index) {
	if ($(this).attr("is-sold") == "true") {
		$(this).addClass("sold-entry-row");
		$(this).children().addClass("sold-entry-row");
	}
})

// 孙狗完



}

$(document).ready(viewDidLoad)

// 雷狗

$(document).on("click", "div[id^='n-nav-']", function() {
	if ($(this).attr('id') == 'n-nav-logout') {
		// logout
		currentUserID = "-1";
		updateCurrentUser(currentUserID);
		$('#n-nav-home').click();
	} else {
		var section = $(this).attr('id').substr(6);
		$(".n-nav-icon").removeClass("active");
		$(this).addClass("active");
		$(".n-main >div:visible").fadeOut(200, 'swing', function() {
			$("#n-" + section + "-wrapper").fadeIn(200);
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



// 雷狗完


//Home

$(document).on("click", ".book-item .check", function() {
	var checkbox = $(this).find("input");
	checkbox.prop("checked", !checkbox.prop("checked"))
	var newValue = checkbox.prop("checked");
	var row = $(this).closest("tr");
	var bookID = row.attr("book-id");
	$.each(books, function() {
	    if (this.pid == bookID) {
	        this.isSelected = newValue;
	    }
	});
	updateBookList(1000);
})

//End of Home

//Account

$(document).on("click", "#n-account .stars .btn-danger", function() {
	var res = confirm("This action is not recoverable! Do you still want to continue?");
	if (res == true) {
	    removeFavorates(getSelectedFavorite());
	}
})

function getSelectedFavorite() {
	var selectedItems = []
	$("#n-account .stars .acc-col-selection input").each(function(index) {
		if ($(this).prop("checked")) {
			var thisFavoriteObject = {
				uid: currentUserID,
				pid: $(this).closest("tr").attr("book-id")
			}
			selectedItems.push(thisFavoriteObject);
		}
	})
	return selectedItems;
}


//End of Account