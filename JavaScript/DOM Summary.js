/** DOM Summary **/

/*
 * Method to select:
 * getElementById(): take a string argument and returns the one element with a matching ID
 * getElementByClass(): take a string argument and returns a list of elements that have a matching class
 * getElementByTag(): returns a list of all elements of a given tag name
 * querySelector(): returns the first element that matches a given CSS-style selector
 * querySelectorAll(): returns a list of elements that matches a given CSS-style selector
 */
var p1Button = document.querySelector("#id");
var p2Button = document.getElementById("id");
var p1Button = document.querySelector(".class");
var numInput = document.getElementByClass("class");
var tag = document.querySelector("p span");
var link = document.getElementByTag("a");


// use style property to manipulate an element's style
tag.style.color = "blue";
tag.style.fontSize = "70px"
/* a better way is to define a CSS class and then toggle it on or off with JS */
// add a class to the selected element
tag.classList.add("another-class");
// remove a class
tag.classList.remove("another-class");
// toggle a class
tag.classList.toggle("another-class");

/* Manipulating text and content */
// retrieve the textContent and alter it
tag.textContent = "blah blah blah";
// similar to textContent, except it returns a string of all the HTML contained in a given element
tag.innerHTML = "<h1>Hello!</h1>";

/* Manipulating attributes */
// get the attribute of a tag
link.getAttribute("href");
// change href attribute
link.setAttribute("href", "www.dogs.com");
// change the image src
img.setAttribute("src", "corgi.png");


/* Events */
// element.addEventListener(type, functionToCall)
p1Button.addEventListener("click", reset);
function reset {
	var score = 0;
}