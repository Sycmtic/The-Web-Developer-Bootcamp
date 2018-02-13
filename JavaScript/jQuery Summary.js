/** jQuery Summary - a DOM manipulation library **/
// use $ to select element: $("selector")
// the .css() method is jQuery's interface to styling: .css(property, value)
$("#special").css("border", "2px solid red");

var styles = {
	color: "red",
	background: "pink"
}
// can directly add object to element
$("div:first-of-type").css(styles);

// same as DOM method textContent to get the text of selected element 
$("h1").text();
// same as DOM method innerHTML to get/set the HTML contained of selected element 
$("ul").html("<li>I hacked your ul</li><li>Rusty is still adorable</li>");

// get or set a attribute of selected element
$("img").attr("src", "https://c3.staticflickr.com/3/2418/2243463214_f32ab004af_b.jpg");
$("input").attr("type", "checkbox");

// get or set a value of selected element
$("input").val("Rusty");

// add class to selected element, same as DOM method .classList.add()
$("li").addClass("correct");
// remove class from selected element, same as DOM method .classList.remove()
$("li").removeClass("correct");
// toggle a class, same as DOM method .classList.retoggle()
$("li").toggleClass("correct");

/* Events */
// add click listener to selected element
$("button").click(function() {
	var text = $(this).text();
	alert("Someone click " + text + " button");
});
// add keypress listener to selected element
// event argument contains the information about keypress event (keycode, which is inside this object)
$("input[type="text"]").keypress(function(event) {
	if (event.which === 13) {
		alert("You hit enter");
	}
});
// jQuery's on() works similarly to addEventListener. It lets you specify the type of event to listen for
$("h1").on("click", function() {
	// this refers to the item we clicked
	$(this).css("color", "purple");
});
/* pay attention, there is a key difference between click() and on("click"):
 * click only adds listener for exist elements
 * on() will add listeners for all potential future elements
 */

 /* Animation */
 // hide the selected elements by fading them to transparent, argument is duration-time
 // similar methods are: fadeIn(), fadeToggle(), slideDown(), slideUp(), slideToggle()
 $("button").on("click", function() {
 	// use callback function to make sure it execute after fadeOut completed
 	 $("div").fadeOut(1000, function() {
 	 	console.log("Fade Completed!");
 	 });
 });