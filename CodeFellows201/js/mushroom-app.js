// Code Fellows 201: Final Website Project for 301 Application
// https://gloriaanholt.github.io/JavaScriptProjects/CodeFellows201/index.html
// @totallygloria
// 2016.08.23


// From the main page, there are six selectable mushroom-types. The grid of
// types are hierarchical: when the user clicks on a type of mushroom, the
// relevant children mushrooms appear, continuing until the leaf nodes are
// displayed.


// Mushrooms data structures
var m_hash = {
    alltypes: ["caps", "morels", "trumpets", "puffballs", "corals", "shelves"],
    caps: ["gills", "pores", "teeth"],
    gills: ["shaggymane"],
    pores: ["kingbolete"],
    teeth: ["hedgehog"],
    morels: ["blackmorel"],
    trumpets: ["bluechanterelle", "chanterelle"],
    puffballs: ["commonpuffball"],
    corals: ["cauliflower"],
    shelves: ["chickenofthewoods", "oyster"]
};

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
};

// Instruction text
// var mInstructions = "Select the outline of your mushroom to get started.";
// var capInstructions = "Does the underside of the cap have gills, pores (like foam), or teeth?";

// Global variables
var selection = '';
var currentMushrooms = [];


// Create the initial website
function populatePage() {

    var mlist = currentMushrooms;

    for(var i=0; i < mlist.length; i++) {
        // Make a new list item to hold the image and p text
        var newList = document.createElement('li');
        newList.setAttribute('class', 'unselected');
        newList.setAttribute('id', mlist[i]);

        // Make a new image, set src
        var newImg = document.createElement('img');
        var pic = "img/" + mlist[i] + ".jpg";
        newImg.setAttribute('src', pic);

        // Make a new paragraph, set text
        var newPara = document.createElement('p');
        var desc = description_hash[mlist[i]];
        var newText = document.createTextNode(desc);
        newPara.appendChild(newText);

        // Make the input, image, and paragraph children of the label
        newList.appendChild(newImg);
        newList.appendChild(newPara);

        // Append the new label to the form, add interactivity
        document.getElementById('mushroom_selector').appendChild(newList);
        makeInteractive(newList.id);
    }
}

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
    fadeOut();
    setTimeout(removeOld, 900);
    currentMushrooms = m_hash[selection];
    sessionStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
    setTimeout(populatePage, 1100);
}

function fadeOut() {
    for(var i=0; i < currentMushrooms.length; i++) {
        if (document.getElementById(currentMushrooms[i]).className != 'selected') {
            document.getElementById(currentMushrooms[i]).style.opacity = 0;
        }
    }
}

function removeOld() {
    for(var i=0; i < currentMushrooms.length; i++) {
        if (currentMushrooms[i] != selection) {
            document.getElementById(currentMushrooms[i]).className = 'remove';
        }
    }
}

function resetPage() {
    var childDivs = document.getElementById('mushroom_selector').getElementsByTagName('li')
    for (var i=1; i < childDivs.length; i++) {
        childDivs[i].className = 'remove';
    }
    currentMushrooms = m_hash["alltypes"];
    sessionStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
    populatePage(currentMushrooms);
}

window.onload = function() {

    document.getElementById('alltypes').addEventListener("mouseover",
        function() { this.className = 'active'; } );
    document.getElementById('alltypes').addEventListener("mouseout",
        function() { if (this.className = 'active') { this.className = 'unselected'; } } );
    document.getElementById('alltypes').addEventListener("click", resetPage);

    if (sessionStorage.getItem('currentMushrooms') == [] || sessionStorage.getItem('currentMushrooms') === null) {
        currentMushrooms = m_hash["alltypes"];
        console.log(currentMushrooms);
        sessionStorage.setItem('currentMushrooms',JSON.stringify(currentMushrooms));
    } else {
        currentMushrooms = JSON.parse(sessionStorage.getItem('currentMushrooms'));
    }
    populatePage(currentMushrooms);
};
