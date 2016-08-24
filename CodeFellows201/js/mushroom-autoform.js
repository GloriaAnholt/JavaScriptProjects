// Code Fellows 201: Final Website Project for 301 Application
// https://gloriaanholt.github.io/JavaScriptProjects/CodeFellows201/index.html
// @totallygloria
// 2016.08.11

// From the main page, there are six selectable mushroom-types.
// The grid of types serve as a js form: when the user clicks on
// a type of mushroom, the main page serves back a sub-selection
// page with a new set of relevant mushrooms to select from, also
// as a form. This continues until one mushroom type is left, which then
// displays that/those mushroom(s).


// Instruction text
var mInstructions = "Select the outline of your mushroom to get started.";
var capInstructions = "Does the underside of the cap have gills, pores (like foam), or teeth?";

// Form information
var selection = '';
var currentMushrooms = [];


// Functions for mouse events
function makeInteractive(mtype) {
    document.getElementById(mtype).addEventListener("mouseover",
        function() { this.className = 'active'; }
        );
    document.getElementById(mtype).addEventListener("mouseout",
        function() { if (this.className != 'selected') { this.className = 'unselected'; } }
        );
    document.getElementById(mtype).addEventListener("click", mushroomClick);
}


function mushroomClick() {
    this.className = 'selected';
    selection = this.id;
    console.log("clicked things are ", arguments)
    fadeOut();
    setTimeout(setupMushrooms, 1000);
}


// When the window is ready, set up event listeners and form, then respond to clicks
window.onload = function() {
    // Session Set-up
    // to save things: localStorage.setItem('itemName',JSON.stringify(itemName));
    // to retrieve things: var varName = localStorage.getItem('varName');
    makeInteractive('alltypes');

    if (sessionStorage.getItem('currentMushrooms') == [] || sessionStorage.getItem('currentMushrooms') === null) {
        currentMushrooms = m_hash["alltypes"];
        sessionStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
    } else {
        currentMushrooms = JSON.parse(sessionStorage.getItem('currentMushrooms'));
    };
    populateForm(currentMushrooms);
}



function fadeOut() {
    for(var i=0; i < currentMushrooms.length; i++) {
        if (document.getElementById(currentMushrooms[i]).className != 'selected') {
           document.getElementById(currentMushrooms[i]).style.opacity = 0;
        }
    };
}


