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


// data structures
var m_hash = {
    alltypes: ["caps", "morels", "trumpets", "puffballs", "corals", "shelves"],
    caps: ["gills", "pores", "teeth"],
    gills: ["shaggymane"],
    pores: ["kingbolete"],
    teeth: ["hedgehog"],
    morels: ["blackmorel"],
    trumpets: ["chanterelle", "bluechanterelle", "blackchanterelle"],
    puffballs: ["commonpuffball"],
    corals: ["cauliflower"],
    shelves: ["chickenofthewoods", "oyster"]
};

var leafNodes = ["shaggymane", "kingbolete", "hedgehog", "blackmorel",
    "chanterelle", "bluechanterelle", "blackchanterelle", "commonpuffball",
    "cauliflower", "chickenofthewoods", "oyster"];

// Instruction text
// var mInstructions = "Select the outline of your mushroom to get started.";
// var capInstructions = "Does the underside of the cap have gills, pores (like foam), or teeth?";

// Form information
var selection = '';
var currentMushrooms = [];


// Functions for mouse events
function makeInteractive() {
    var elemList = document.body.getElementsByTagName('li');
    for (var i = 0; i < elemList.length; i++) {
        elemList[i].addEventListener("mouseover", mushroomOver);
        elemList[i].addEventListener("mouseout", mushroomOut);
        if (elemList[i].id != "alltypes") {
            elemList[i].addEventListener("click", mushroomClick);
        } else {
            elemList[i].addEventListener("click", resetPage);
        }
    }
}

function mushroomOver() {
    if (this.className == 'unselected') {
        this.className = 'active'
    }
}

function mushroomOut() {
    if (this.className == 'active') {
        this.className = 'unselected'
    }
}

function resetPage() {
    var totalList = document.getElementById('mushroom_selector');
    var elemList = totalList.getElementsByTagName('li');
    var startingSet = m_hash["alltypes"];
    for (var i=1; i < elemList.length; i++) {
        elemList[i].className = 'remove';
        }
    currentMushrooms = ["alltypes"];
    for (var i=0; i < startingSet.length; i++) {
        document.getElementById(startingSet[i]).className = 'unselected';
        document.getElementById(startingSet[i]).style.opacity = 100;
        currentMushrooms.push(startingSet[i]);
        }
    sessionStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
}

function mushroomClick() {
    this.className = 'selected';
    selection = this.id;
    // Reset the session data
    currentMushrooms = ["alltypes", selection];

    if (isLeaf(selection)) {
        secondPic = "img/" + selection + "_2.jpg";
        window.location = 'results.html'
        document.getElementById("explanation").children[0].src = secondPic;
        document.getElementById(selection).children[2].innerHTML = "More on black morels";
    } else {
        for (var i = 0; i < m_hash[selection].length; i++) {
            currentMushrooms.push(m_hash[selection][i]);
        }
        sessionStorage.setItem('currentMushrooms', JSON.stringify(currentMushrooms));

        // Change the displayed mushrooms to match selection
        fadeOut();
        setTimeout(removeOld, 800);
        setTimeout(showChildren, 810);
    }
}

function isLeaf(item) {
    for (var i=0; i < leafNodes.length; i++) {
        if (leafNodes[i] === item) {
            return true;
        }
    }
    return false;
}

/* When the window is ready, set up event listeners, then respond to clicks */
window.onload = function() {

    makeInteractive();

    // This needs to change what is displayed on load, right now it doesn't do anything
    if (sessionStorage.getItem('currentMushrooms') == [] || sessionStorage.getItem('currentMushrooms') === null) {
        // If there's nothing in current, put the master list in it
        currentMushrooms.push("alltypes");
        var startingSet = m_hash["alltypes"];
        for (var i=0; i < startingSet.length; i++) {
            currentMushrooms.push(startingSet[i]);
            document.getElementById(startingSet[i]).className = 'unselected';
            document.getElementById(startingSet[i]).style.opacity = 100;
        }
        sessionStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
    } else {
        currentMushrooms = JSON.parse(sessionStorage.getItem('currentMushrooms'));
        var totalList = document.getElementById('mushroom_selector');
        var elemList = totalList.getElementsByTagName('li');
        for (var i=0, j=0; i < elemList.length; i++) {
            if (elemList[i].id == currentMushrooms[j]) {
                elemList[i].className = 'unselected';
                elemList[i].style.opacity = 100;
                j++;
            } else {
                elemList[i].className = 'remove';
            }
        }
    }
};



function fadeOut() {
// Takes all of the selected item's siblings and fades them to zero
    var elem = document.getElementById('alltypes').nextElementSibling;
    while (elem) {
        if (elem.className != 'selected') {
            elem.style.opacity = 0;
        }
        elem = elem.nextElementSibling;
    }
}

function removeOld() {
// Takes all of the selected item's siblings and sets their display to none
    var elem = document.getElementById('alltypes').nextElementSibling;
    while (elem) {
        if (elem.className != 'selected') {
            elem.className = 'remove';
        }
        elem = elem.nextElementSibling;
    }
}

function showChildren() {
// Takes all of the selected item's children and sets them to be visible
    var children = m_hash[selection];
    for (var i=0; i < children.length; i++) {
        document.getElementById(children[i]).className = 'unselected';
        document.getElementById(children[i]).style.opacity = 100;
    }
}
