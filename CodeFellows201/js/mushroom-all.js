// Code Fellows 201: Final Website Project for 301 Application
// https://gloriaanholt.github.io/JavaScriptProjects/CodeFellows201/index.html
// @totallygloria
// 2016.08.11

// From the main page, there are six selectable mushroom-types, and a View All.
// The grid of types uses eventListeners to function like a js form:
// when the user clicks on a type of mushroom, the main page first hides and
// removes non-related mushrooms, and then displays a new set of relevant 'child'
// mushrooms. This continues until one mushroom type is left, which, when selected,
// displays some basic information about that variety of mushroom.


// Global variables
var selection = '';
var previous = '';

// Functions for mouse events
function makeInteractive() {
    var totalList = document.getElementById('all_mushrooms');
    var elemList = totalList.getElementsByClassName('unselected');
    var allelem = elemList.length;
    for (var i = 0; i < allelem; i++) {
        elemList[i].addEventListener("mouseover", mushroomOver);
        elemList[i].addEventListener("mouseout", mushroomOut);
        elemList[i].addEventListener("click", mushroomClick);
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


function mushroomClick() {
    previous = selection;
    this.className = 'selected';
    selection = this.id;
    console.log('previous is ', previous, 'selection is', selection);

    if (previous === '' || previous === null) {
        showChildren();
    } else if (previous != selection) {
        removeOld();
        showChildren();
    }
    sessionStorage.setItem('selectedFromAll', JSON.stringify(selection));
}

function removeOld() {
// Takes previously selected's children and sets their display to none
    var oldimg = "add_" + previous;
    var oldexp = "exp_" + previous;
    document.getElementById(oldimg).className = 'remove';
    document.getElementById(oldexp).className = 'remove';
}

function showChildren() {
// Edits the final two li styles and displays them. Could also be in CSS.
    var addpic = "add_" + selection;
    var exp = "exp_" + selection;
    console.log(addpic, exp);
    document.getElementById(addpic).className = 'unselected';
    document.getElementById(addpic).firstChild.style.width = '100%';
    document.getElementById(addpic).style.width = '40%';
    document.getElementById(addpic).style.cssFloat = 'left';
    document.getElementById(addpic).style.opacity = 100;

    document.getElementById(exp).className = 'unselected';
    document.getElementById(exp).style.width = '40%';
    document.getElementById(exp).style.cssFloat = 'left';
    document.getElementById(exp).children[1].style.textAlign = 'left';
    document.getElementById(exp).style.opacity = 100;
}



window.onload = function() {
// When the window is ready, set up event listeners.
    makeInteractive();

    selection = JSON.parse(sessionStorage.getItem('selectedFromAll'));
    if (selection != null || selection != '') {
        showChildren();
    }
};

