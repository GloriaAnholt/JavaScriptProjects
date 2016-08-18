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
    for(var i=0; i < mushroom_types.length; i++) {
        // Attach a listener to each label in the form
        document.getElementById(mushroom_types[i]).addEventListener("onmouseover", mushroomOver(mushroom_types[i]));
        document.getElementById(mushroom_types[i]).addEventListener("onmouseout", mushroomOut(mushroom_types[i]));
        document.getElementById(mushroom_types[i]).addEventListener("onclick", mushroomClick(mushroom_types[i]));
    };
    form.addEventListener('click', function(event) { event.preventDefault();
                                                     mformSubmit(); }
                         )

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
    if (localStorage.getItem('currentMushrooms') != '' && localStorage.getItem('currentMushrooms') != null) {
        currentMushrooms = JSON.parse(localStorage.getItem('currentMushrooms'));
    };
    makeInteractive();
}

// All the interactions functionality
function fadeOut() {
    for(var i=0; i < currentMushrooms.length; i++) {
        if (document.getElementById(currentMushrooms[i]).className != 'selected') {
           document.getElementById(currentMushrooms[i]).style.opacity = 0;
        } else {
            selection = currentMushrooms[i];
        };
    };
}

function setupMushrooms() {
    var lenSelection = (m_hash[selection]).length;
    removeOld((currentMushrooms.length - lenSelection));
    insertNew();
    currentMushrooms = selection;
    localStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
}

function removeOld(numToRemove) {
    for(var i=0; i < currentMushrooms.length; i++) {
        if (currentMushrooms[i] != selection) {
            document.getElementById(currentMushrooms[i]).className = 'remove';
        }
    };
}

function insertNew() {
    // TODO It would be better to create new elements than to replace the old ones
    // TODO Look up how to generate the entire tag, rather than just replace
    newMushrooms = m_hash[selection];
    var pic = "img/" + newMushrooms[0] + ".jpg";
    document.getElementById(selection).children[1].src = pic;
    document.getElementById(selection).children[2].src = newMushrooms[0];
    document.getElementById(selection).id = newMushrooms[0];
    document.getElementById("instructions").innerHTML = "Does your mushroom look like these " + selection + "?";

    if (newMushrooms.length > 1) {
        for(var i=1; i < newMushrooms.length; i++) {
            // Make a new label to hold the image and p text
            var newLabel = document.createElement('label');
            newLabel.setAttribute('class', 'unselected');
            newLabel.setAttribute('id', newMushrooms[i]);
            // Make a new image, set src
            var newImg = document.createElement('img');
            var pic = "img/" + newMushrooms[i] + ".jpg";
            newImg.setAttribute('src', pic);
            // Make a new paragraph, set text
            var newPara = document.createElement('p');
            var newText = document.createTextNode(newMushrooms[i]);
            newPara.appendChild(newText);
            // Make the image and paragraph children of the label
            newLabel.appendChild(newImg);
            newLabel.appendChild(newPara);
            // Append the new label to the form
            var element = document.getElementById('mushroom_selector');
            element.appendChild(newLabel);
        }
    };
}
