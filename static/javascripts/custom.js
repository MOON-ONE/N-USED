function viewDidLoad() {


// 总
$("#n-post-wrapper").load("view/create-post.html", function () {
	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
});
// $("#n-home-wrapper").load("view/home.html", function () {
// 	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
// }); 
$("#n-account-wrapper").load("view/account.html", function () {
	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
});

$('[data-toggle="tooltip"]').tooltip()

// 总完


// 王狗
$(document).on("click", "#n-home .sort-button", function(){
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

$(document).on("click", "#n-home .grand-checkbox", function() {
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

$(document).on("click", "#selected-only-button", function() {
	
	if ($(this).hasClass("highlight-button")) {
		$(this).removeClass("highlight-button");
		angular.element("body").scope().search.isSelected = ""
	} else {
		$(this).addClass("highlight-button");
		angular.element("body").scope().search.isSelected = true	
	}

	angular.element("body").scope().$apply();
	
})

$(document).on("click", ".col-selection input", function() {
	var row = $(this).closest("tr");
	var newValue = $(this).prop("checked");
	var bookID = row.attr("book-id");
	$.each(books, function() {
	    if (this.id == bookID) {
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
$(document).on("click", ".like", function() {
	if ($(this).hasClass("on")) {
		$(this).removeClass("on");
		$(this).addClass("off");
	} else {
		$(this).removeClass("off");
		$(this).addClass("on");
	}
})



// 林狗完






// 孙狗
$(document).on("click",".n-account-nav a",function(e){
    e.preventDefault();
    $(".n-account-toggle").hide();
    var toShow = $(this).attr('href');
    $(toShow).show();
});

$(document).on("click",".n-account-edit-button", function(){

            var $this = $(this);
            var text = $this.text();
            if(text=="Edit"){
                $this.text("Cancel");
            }
                        else{
                             $this.text("Edit");
                        }
            $(".account-label").toggle();
        });

        $("input.account-label").change(function(){
            $(this).prev().text($(this).text());

        });


// 孙狗完







// 雷狗
$(document).on("click", "#n-hamburger-icon", function() {
	$(".n-container").toggleClass('active');
	$(this).toggleClass('active');
	setTimeout(function (){
		$(".n-nav-text").toggleClass('active');
	}, 200);
	return false;
});

$(document).on("click", "div[id^='n-nav-']", function() {
	var section = $(this).attr('id').substr(6);

	$(".n-nav-icon").removeClass("active");
	$(this).addClass("active");
	$(".n-main >div:visible").fadeOut(200, 'swing', function() {
		$("#n-" + section + "-wrapper").fadeIn(200);
	});

	return false;
});








// 雷狗完
}

$(document).ready(viewDidLoad)
