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

// Broader categories
var mushroom_types = ["caps", "morels", "trumpets", "puffballs", "corals", "shelves"];
var cap_types = ["gills", "pores", "teeth"];

// Specific mushrooms per type
var gills = ["shaggy_mane"];
var pores = ["bolete"];
var teeth = ["hedgehog_mushroom"];
var morels = ["black_morel"];
var trumpets = ["blue_chanterelle", "chanterelle"];
var puffballs = ["common_puffball"];
var corals = ["cauliflower_mushroom"];
var shelves = ["chicken_of_the_woods", "oyster_mushroom"];

// Instruction text
var mInstructions = "Select the outline of your mushroom to get started.";
var capInstructions = "Does the underside of the cap have gills, pores (like foam), or teeth?";

// Form information
var form = document.getElementById('mushroom_selector');
var options = form.elements.allShrooms;
var selection = '';

// Session Set-up
// to save things: localStorage.setItem('itemName',JSON.stringify(itemName));
// to retrieve things: var varName = localStorage.getItem('varName');
var currentMushrooms = mushroom_types;
localStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));


// Functions for mouse events
function makeInteractive() {
    var all = mushroom_types.length;
    for(var i=0; i<all; i++) {
        // Attach a listener to each label in the form
        document.getElementById(mushroom_types[i]).addEventListener("onmouseover", mushroomOver(mushroom_types[i]));
        document.getElementById(mushroom_types[i]).addEventListener("onmouseout", mushroomOut(mushroom_types[i]));
        document.getElementById(mushroom_types[i]).addEventListener("onclick", mushroomClick(mushroom_types[i]));
    };
    form.addEventListener('click', mformSubmit);
}

function mushroomOver(mtype) {
    if (document.getElementById(mtype).className === 'unselected') {
        document.getElementById(mtype).onmouseover = function(){this.className = 'active'};
        }
}

function mushroomOut(mtype) {
    if (document.getElementById(mtype).className != 'selected') {
        document.getElementById(mtype).onmouseout = function(){this.className = 'unselected'};
    }
}

function mushroomClick(mtype) {
        document.getElementById(mtype).onclick = function(){this.className = 'selected'};

}

// Functions for what to do when the form is submitted
function mformSubmit() {
    // Once the fade is completed, call the setup function
    fadeOut(setupMushrooms);
}

function fadeOut (callback) {
    for(var i=0; i<mushroom_types.length; i++) {
        if (document.getElementById(mushroom_types[i]).className != 'selected') {
           document.getElementById(mushroom_types[i]).style.opacity = 0;
       } else {
            selection = mushroom_types[i]; }
       };
    if (typeof callback === "function") {
        callback();
    }
}


window.onload = function() {
    if (localStorage.getItem('currentMushrooms') != '' && localStorage.getItem('currentMushrooms') != null) {
        currentMushrooms = JSON.parse(localStorage.getItem('currentMushrooms'));
    };
    makeInteractive();
}

function setupMushrooms() {

    switch(selection) {
        case "caps":
            removeOld((currentMushrooms.length - caps.length));
            break;
        case "morels":
            removeOld((currentMushrooms.length - morels.length));
            insertNew(currentMushrooms, morels);
            break;
        case "trumpets":
            removeOld((currentMushrooms.length - trumpets.length));
            break;
        case "puffballs":
            removeOld((currentMushrooms.length - puffballs.length));
            break;
        case "corals":
            removeOld((currentMushrooms.length - corals.length));
            break;
        case "shelves":
            removeOld((currentMushrooms.length - shelves.length));
            break;
        case "gills":
            removeOld((currentMushrooms.length - gills.length));
            break;
        case "pores":
            removeOld((currentMushrooms.length - pores.length));
            break;
        case "teeth":
            removeOld((currentMushrooms.length - teeth.length));
            break;
        default:
            break;
    }; // close switch statement

    function insertNew(oldMushrooms, newMushrooms) {
        for(var i=0; i < newMushrooms.length; i++) {
            pic = "../img/" + newMushrooms[i] + ".jpg";
            document.getElementById(oldMushrooms[i]).src = pic }
        };

    function removeOld(numToRemove) {
        alert("i arrived in remove");
        var total=0;
        while(total < numToRemove) {
            for(var i=mushroom_types.length - 1; i>=0; i--) {
                if (document.getElementById(mushroom_types[i]).className != 'selected') {
                    document.getElementById(mushroom_types[i]).className = 'hidden'; };
                };
            total++; }
        };


}
