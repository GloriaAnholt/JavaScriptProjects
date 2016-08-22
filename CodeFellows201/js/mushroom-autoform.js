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

// Mushrooms data structure
var m_hash = {
    alltypes: ["alltypes", "caps", "morels", "trumpets", "puffballs", "corals", "shelves"],
    caps: ["gills", "pores", "teeth"],
    gills: ["shaggymane"],
    pores: ["kingbolete"],
    teeth: ["hedgehog"],
    morels: ["blackmorel"],
    trumpets: ["bluechanterelle", "chanterelle"],
    puffballs: ["commonpuffball"],
    corals: ["cauliflower"],
    shelves: ["chickenofthewoods", "oyster"]
}

var description_hash = {
    caps: "Cap & Stem",
    gills: "Underside of Cap is Gilled",
    pores: "Underside of Cap has Pores",
    teeth: "Underside of Cap has Fine Tooth-like Appendages",
    morels: "Caps has Pits & Ridges",
    trumpets: "Trumpet or Vase-Shaped",
    puffballs: "Ball-like or Ball-on-Stem",
    corals: "Coral or Cauliflower-Like",
    shelves: "Shelf or Cup-Like"
}

// Instruction text
var mInstructions = "Select the outline of your mushroom to get started.";
var capInstructions = "Does the underside of the cap have gills, pores (like foam), or teeth?";

// Form information
var form = document.getElementById('mushroom_selector');
var selection = '';
var currentMushrooms = [];

// Create the mushroom webform
function populateForm(mlist) {

    for(var i=0; i < mlist.length; i++) {
        // Make a new label to hold the image and p text
        var newLabel = document.createElement('label');
        newLabel.setAttribute('class', 'unselected');
        newLabel.setAttribute('id', mlist[i]);
        newId = mlist[i];

        // Make a new input type for the form data
        var newInput = document.createElement('input');
        newInput.setAttribute('type', 'radio');
        newInput.setAttribute('name', mlist);
        newInput.setAttribute('value', mlist[i]);

        // Make a new image, set src
        var newImg = document.createElement('img');
        var pic = "img/" + mlist[i] + ".jpg";
        newImg.setAttribute('src', pic);

        // Make a new paragraph, set text
        var newPara = document.createElement('p');
        var content = currentMushrooms
        var newText = document.createTextNode(mlist[i]);
        newPara.appendChild(newText);

        // Make the input, image, and paragraph children of the label
        newLabel.appendChild(newInput);
        newLabel.appendChild(newImg);
        newLabel.appendChild(newPara);

        // Append the new label to the form, add interactivity
        document.getElementById('mushroom_selector').appendChild(newLabel);
        document.getElementById(newId).addEventListener("onmouseover", mushroomOver(newId));
        document.getElementById(newId).addEventListener("onmouseout", mushroomOut(newId));
        document.getElementById(newId).addEventListener("onclick", mushroomClick(newId));
    }
}

// Functions for mouse events
function makeInteractive() {
    for(var i=0; i < currentMushrooms.length; i++) {
        // Attach a listener to each label in the form
        document.getElementById(currentMushrooms[i]).addEventListener("onmouseover", mushroomOver(currentMushrooms[i]));
        document.getElementById(currentMushrooms[i]).addEventListener("onmouseout", mushroomOut(currentMushrooms[i]));
        document.getElementById(currentMushrooms[i]).addEventListener("onclick", mushroomClick(currentMushrooms[i]));
    };
    form.addEventListener('click', function(event) { event.preventDefault(); mformSubmit(); } );
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
    fadeOut();
    setTimeout(setupMushrooms, 1000);
}


// When the window is ready, set up event listeners and form, then respond to clicks
window.onload = function() {
    // Session Set-up
    // to save things: localStorage.setItem('itemName',JSON.stringify(itemName));
    // to retrieve things: var varName = localStorage.getItem('varName');
    if (sessionStorage.getItem('currentMushrooms') == [] || sessionStorage.getItem('currentMushrooms') === null) {
        currentMushrooms = m_hash["alltypes"];
        sessionStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
    } else {
        currentMushrooms = JSON.parse(sessionStorage.getItem('currentMushrooms'));
    };
    populateForm(currentMushrooms);
    makeInteractive();
}

// All the interactions functionality
function fadeOut() {
    for(var i=0; i < currentMushrooms.length; i++) {
        if (document.getElementById(currentMushrooms[i]) === document.getElementById("alltypes")) {
            continue;
        }
        else if (document.getElementById(currentMushrooms[i]).className != 'selected') {
           document.getElementById(currentMushrooms[i]).style.opacity = 0;
        } else {
            selection = currentMushrooms[i];
        };
    };
}

function setupMushrooms() {
    removeOld();
    insertNew();
    currentMushrooms = m_hash[selection];
    sessionStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
}

function removeOld() {
    for(var i=0; i < currentMushrooms.length; i++) {
        if (document.getElementById(currentMushrooms[i]) === document.getElementById("alltypes")) {
            continue;
        } else if (currentMushrooms[i] != selection) {
            document.getElementById(currentMushrooms[i]).className = 'remove';
        }
    };
}

function insertNew() {
    alert(selection);
    populateForm(m_hash[selection]);
}


