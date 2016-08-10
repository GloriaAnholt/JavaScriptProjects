// Code Fellows 201: Final Website Project for 301 Application
// https://gloriaanholt.github.io/JavaScriptProjects/CodeFellows201/index.html
// @totallygloria
// 2016.08.08


// From the main page, there are six selectable mushroom-types.
// The grid of types serve as a js form: when the user clicks on
// a type of mushroom, the main page serves back a sub-selection
// page with a new set of relevant mushrooms to select from, also
// as a form. This continues until one mushroom is left, which then
// displays that mushroom.


// Create the event handler for mouse-over and clicking links




window.onload = function() {
	document.getElementById("caps").onmouseover = function(){this.className = 'active'};
	document.getElementById("caps").onmouseout = function(){this.className = 'unselected'};
}