$(document).ready(function() {


// 总
$("#n-post-wrapper").load("view/post.html", function () {
	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
});
$("#n-home-wrapper").load("view/home.html", function () {
	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
}); 
$("#n-account-wrapper").load("view/account.html", function () {
	// $('.n-main .n-container').css('margin-left', $('#n-nav .n-container').css('width'));
}); 
// 总完


// 王狗
$(document).on("click", "#n-home .toggle", function(){
	$(this).parent().toggleClass('closed');
    $(this).prev().focus();
});

// 王狗完






// 林狗





// 林狗完






// 孙狗
$(document).on("click",".n-account-nav a",function(e){
    e.preventDefault();
    $(".n-account-toggle").hide();
    var toShow = $(this).attr('href');
    $(toShow).show();
});






// 孙狗完







// 雷狗
$(document).on("click", "#n-hamburger-icon", function() {
	$(".n-container").toggleClass('active');
	$(this).toggleClass('active');
	
	return false;
});









// 雷狗完
});
