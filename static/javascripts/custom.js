
$(function() {


// 王狗











// 王狗完






// 林狗





// 林狗完






// 孙狗
$(document).on("click","#nav a", function(e){
    e.preventDefault();
    $(".toggle").hide();
    var toShow = $(this).attr('href');
    $(toShow).show();
});






// 孙狗完







// 雷狗
$(document).on("click", "#n-hamburger-icon", function() {
	$(this).toggleClass('active');
	return false;
});









// 雷狗完


});
