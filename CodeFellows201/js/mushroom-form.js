// Code Fellows 201: Final Website Project for 301 Application
// https://gloriaanholt.github.io/JavaScriptProjects/CodeFellows201/index.html
// @totallygloria
// 2016.08.11

// From the main page, there are six selectable mushroom-types.
// The grid of types serve as a js form: when the user clicks on
// a type of mushroom, the main page serves back a sub-selection
// page with a new set of relevant mushrooms to select from, also
// as a form. This continues until one mushroom is left, which then
// displays that mushroom.

var mushroom_types = ["caps", "morels", "trumpets", "puffballs", "corals", "shelves"];
var mInstructions = "Select the outline of your mushroom to get started.";
var cap_types = ["gills", "pores", "teeth"];
var capInstructions = "Does the underside of the cap have gills, pores (like foam), or teeth?";

var form = document.getElementById('mushroom_selector');
var options = form.elements.allShrooms;
var selection = '';



// for stability between sessions: var varName = localStorage.getItem('varName');
// to save things:  localStorage.setItem('itemName',JSON.stringify(itemName));

function makeInteractive() {
    var all = mushroom_types.length;
    for(var i=0; i<all; i++) {
        // Attach a listener to each li
        document.getElementById(mushroom_types[i]).addEventListener("onmouseover", mushroomOver(mushroom_types[i]));
        document.getElementById(mushroom_types[i]).addEventListener("onmouseout", mushroomOut(mushroom_types[i]));
        document.getElementById(mushroom_types[i]).addEventListener("onclick", mushroomClick(mushroom_types[i]));
    };
    form.addEventListener('click', mformSubmit);
}

function mushroomOver(mtype) {
    document.getElementById(mtype).onmouseover = function(){this.className = 'active'};
}

function mushroomOut(mtype) {
    document.getElementById(mtype).onmouseout = function(){this.className = 'unselected'};
}

function mushroomClick(mtype) {
        document.getElementById(mtype).onclick = function(){this.className = 'selected'};
}


function mformSubmit() {
        alert("selected is " + selection);
        for(var i=0; i<mushroom_types.length; i++) {
            document.getElementById(mushroom_types[i]).style.opacity = 0;
            }
}


window.onload = function() {


// if (localStorage.getItem('itemName') != '' && localStorage.getItem('itemName') != null) {
// itemName = JSON.parse(localStorage.getItem('itemName'));

makeInteractive();


}


