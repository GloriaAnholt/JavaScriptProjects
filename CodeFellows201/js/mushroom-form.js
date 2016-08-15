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
var caps = ["gills", "pores", "teeth"];

// Specific mushrooms per type
var m_hash = {
    caps: ["gills", "pores", "teeth"],
    gills: ["shaggymane"],
    pores: ["bolete"],
    teeth: ["hedgehog"],
    morels: ["blackmorel"],
    trumpets: ["bluechanterelle", "chanterelle"],
    puffballs: ["commonpuffball"],
    corals: ["cauliflower"],
    shelves: ["chickenofthewoods", "oyster"]
}

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
    for(var i=0; i<mushroom_types.length; i++) {
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
            selection = mushroom_types[i];
       }
    };

    setTimeout( function() {
        if (typeof callback === "function") {
            callback();
        };
    }, 1000);
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
            insertNew("caps");
            break;
        case "morels":
            removeOld((currentMushrooms.length - morels.length));
            insertNew("morels");
            break;
        case "trumpets":
            removeOld((currentMushrooms.length - trumpets.length));
            insertNew("trumpets");
            break;
        case "puffballs":
            removeOld((currentMushrooms.length - puffballs.length));
            insertNew("puffballs");
            break;
        case "corals":
            removeOld((currentMushrooms.length - corals.length));
            insertNew("corals");
            break;
        case "shelves":
            removeOld((currentMushrooms.length - shelves.length));
            insertNew("shelves");
            break;
        case "gills":
            removeOld((currentMushrooms.length - gills.length));
            insertNew("gills");
            break;
        case "pores":
            removeOld((currentMushrooms.length - pores.length));
            insertNew("pores");
            break;
        case "teeth":
            removeOld((currentMushrooms.length - teeth.length));
            insertNew("teeth");
            break;
        default:
            break;
    }; // close switch statement

    function insertNew(mtype) {

        newMushrooms = m_hash[mtype];
        for(var i=0; i < newMushrooms.length; i++) {
            pic = "img/" + newMushrooms[i] + ".jpg";
            if (newMushrooms.length === 1) {
                document.getElementById(selection).children[1].src = pic;
                break;
            } else {
                document.getElementById(currentMushrooms[i]).children[1].src = pic;
                document.getElementById(currentMushrooms[i]).className = 'unselected';
            }
        };
    currentMushrooms = selection;
    localStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
    };

    function removeOld(numToRemove) {  // TODO this seems have an off by one error
        for(var i=0, total=0; (i<mushroom_types.length) && (total < numToRemove); i++) {
            if (document.getElementById(mushroom_types[i]).className != 'selected') {
                document.getElementById(mushroom_types[i]).className = 'hidden';
                total++; };
        };
    };


}
