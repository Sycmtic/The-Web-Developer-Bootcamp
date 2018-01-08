/* Check Off Specific Todos By Clicking
 * Key different between on() and click():
 * click() only add listeners for existing elements
 * on() will add listeners for all potential future elements
 * 
 * so we must use on() to add listener to entire ul parent which exists at the beginning 
 * instead of click() this time
 */
$("ul").on("click", "li", function() {
	//use single line to do the same thing as below
	$(this).toggleClass("completed");
	/*
	 * if li is gray turn it black, else turn it gray
	 * pay attention $(this).css("color") is actually rgb(128, 128, 128) instead of gray
	 */
	// if ($(this).css("color") === "rgb(128, 128, 128)") {
	// 	$(this).css({
	// 		color: "black",
	// 		textDecoration: "none"
	// 	});
	// } else {
	// 	$(this).css({
	// 		color: "gray",
	// 		textDecoration: "line-through"
	// 	});
	// }
});

// Click on X to delete Todo
$("ul").on("click", "span", function(event) {
	// .parent() gives us the parent element
	// fadeOut only hide the element, so we need the callback function to remove the element After fadeOut completed
	// note that if we put remove after fadeout function, when fadeOut starts, it executes remove immediately
	$(this).parent().fadeOut(function() {
		$(this).remove();
	});
	// to prevent bubbles up: happen only to the span listener but not to ul, container or body
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
	// enter key is 13
	if (event.which === 13) {
		// grabbing new todo text from input using .val() method when hit enter
		var todoText = $(this).val();
		// clear the input by giving its value ""
		$(this).val("");
		// create a new li and add to ul
		// append() method which can take a string of HTML and append to the select elements
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li");
	}
});

$(".fa-plus").click(function() {
	$("input[type='text']").fadeToggle();
})