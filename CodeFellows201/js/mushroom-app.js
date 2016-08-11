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

var mushroom_types = ["caps", "morels", "trumpets", "puffballs", "corals", "shelves"];
var cap_types = ["gills", "pores", "teeth"];


function makeInteractive() {
    var all = mushroom_types.length;
    for(var i=0; i<all; i++) {
        // Attach a listener to each li
        document.getElementById(mushroom_types[i]).addEventListener("onmouseover", mushroomOver(mushroom_types[i]));
        document.getElementById(mushroom_types[i]).addEventListener("onmouseout", mushroomOut(mushroom_types[i]));
        document.getElementById(mushroom_types[i]).addEventListener("click", mushroomClick(mushroom_types[i]));
    };
    }

function mushroomOver(mtype) {
    document.getElementById(mtype).onmouseover = function(){this.className = 'active'};
}

function mushroomOut(mtype) {
    document.getElementById(mtype).onmouseout = function(){this.className = 'unselected'};
}

function mushroomClick(mtype) {

    var selected = document.getElementById(mtype)

    document.getElementById(mtype).onclick = function(){
        for(var i=0; i<mushroom_types.length; i++) {
            document.getElementById(mushroom_types[i]).style.opacity = 0;
        }
    selected.style.opacity = 1;
    selected.className = 'active';
    }
    return false;
 }

window.onload = makeInteractive();
