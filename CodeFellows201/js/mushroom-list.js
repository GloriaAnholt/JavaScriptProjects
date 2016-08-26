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
    alltypes: ["alltypes", "caps", "morels", "trumpets", "puffballs", "corals", "shelves"],
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

var leafText = {
    "shaggymane": "Cap is up to 15cm wide, narrow, cylidrical, white, and covered in thin, shaggy red/brown scales. \
    Older specimens have a cap that is bell-shaped. Flesh is white, soft. Gills are narrowly attached to the \
    stem and white/grey when young. The flesh and gills of older specimens liquefies into a black inky mass. \
    partial veil leaves an inferior, possibly moveable ring on the white stem. Shaggy manes grows scattered \
    or grouped together in grassy areas covering decomposing wood. They appear in the early spring and late fall. \
    Has a pleasant taste with no odor; cook before eating. An edible look-alike is Coprinus sterquilinus, which \
    similar in appearance but smaller, with fewer scales and growing on dung. Tip: collect younger specimens \
    and/or remove blackening areas which have a more bitter taste. Tip: cooking with water shortly after \
    collecting helps to prevent the dish from turning into a black inky mess.",

    "kingbolete": "Cap is up to 35cm wide, convex, reddish to yellowish brown, smooth but often uneven. \
    Underside of cap consists of pores, off-white to olive in age, with no pink tinge.  Flesh is white; \
    flesh and pores unchanging when bruised. Stem is white or tinted yellow/brown with a characteristic fine, \
    white network extending down from the top of the stem, variable in shape. Partial veil absent. Grows singly \
    or as many in conifer and hardwood stands. Appears in spring, summer and fall. Has a mild and pleasant taste \
    with no odor; cook before eating. Tip: boletes are mushrooms that grow on the ground and have a sponge-like \
    surface on the underside of the cap - tiny pores, rather than gills. There are no deadly-poisonous boletes, \
    though some varieties can cause nausea/vomiting. An unknown bolete is safe if it does not bruise blue after \
    being cut, is not red on the underside of the cap, and does not taste foul. Small amounts should be consumed \
    when testing an unfamiliar bolete.",

    "hedgehog": "The cap is up to 10cm wide, convex, smooth, dry, wavy at the edges, light brown with an orange tint. \
    Underside has distinctive spines that are cream-colored. Flesh is white when cut, coloring unevenly to yellow-brown.\
    Stem is solid, white, possibly enlarging slightly towards the base. Grows solitary or numerous on the ground in \
    areas with conifers and hardwoods. Appears in the summer and fall. Has a pleasant taste with no odor; cook before \
    eating. An edible look-alike is Hydnum umbilicatum, which is similar in appearance but smaller and with a darker \
    cap, growing in bogs and swamps. An inedible (but not poisonous) look-alike is Bankera fuligineo-alba, which is \
    similar in appearance but instead of a smooth cap has one with embedded pine needles and organic debris.",

    "blackmorel": "The cap up to 8cm wide, hollow inside with characteristic honeycomb surface consisting of black/brown \
    ridges and dark brown pits, darkening with age. Stem is white, smooth, irregular and hollow. Bottom of cap does not \
    hang loose but is joined to the stem. Grows single or numerous on the ground, usually near conifers. Appears in \
    early spring. Mild pleasant taste and odor; cook before eating. Tip: morels are variable shape, size and color \
    (white/gray/yellow/brown/black), but are characterized by their distinctively shaped caps that do not hang loose \
    and their hollowness; all morels are prized edibles. Warning: may be poisonous if consumed with alcohol. Warning: \
    do not confuse with a False morel, which is not hollow inside and has a cap attached at the top of the stalk rather \
    than a continuous hollow chamber.",

    "chanterelle": "The cap is up to 15cm wide, depressed in the center, smooth, dry, uniform egg-yolk yellow. Mature \
    specimen is funnel shaped, immature specimens should be avoided. Forking ridges (rib-like folds) are present rather \
    than gills; they descend onto the stem. Flesh is firm, yellowish, does does not change color when bruised. Stem is \
    solid, orange tinted, tapering slightly to the base. Grows solitary or in groups on the ground, but not clustered \
    at base of trees, and never on wood. Appears in the summer and fall. Has a pleasant, mild taste and mild, fruity \
    odor; cook before eating. An edible look-alike is the Smooth chanterelle (Cantharallus lateritis), which is similar \
    in appearance but grows under oaks, has a pinkish hue and reduced ridges. Warning: do not confuse with the poisonous \
    False Chantarelle (Hygrophoropsis aurantiaca), has gills rather than ridges, often grown on decaying wood, tastes \
    foul and causes stomach upset. Warning: do not confuse with the poisonous Jack-O'Lantern Fungus (Omphalotus illudens), \
    which grows in large clusters on roots, stumps, or at the base of trees and has an unpleasantly sweet odor.",

    "bluechanterelle": "The caps are up to 10cm wide, flat, smooth, dark purple to blue/black with incurved edges. \
    Fruiting body is funnel-shaped. Outside of the mushroom is pale violet with small ridges running down almost to the \
    base. Flesh is thick, soft, blue to black. Stems are fused together. Appears in sumer and fall. Grows in large, \
    dense clusters under conifers such as spruce and fir. Taste is mild and pleasant, with an indistinct odor; cook \
    before eating.",

    "blackchanterelle": "Also known as the Horn of Plenty or Black Trumpet. The cap is up to 8cm wide, with a hollow \
    tube-like depresson, dark brown or soot-grey/black. In older specimens the cap margins are wavy/split, otherwise \
    they are rolled out. Fruiting body is funnel-shaped with smooth-looking but slightly wrinkled outer surface that is \
    smokey grey with a lilac tint, and extends almost to the base. Stem is very short, hollow, brown. Grows on the \
    ground grouped together under conifer/hardwood stands. Appears in the early summer and fall. Has a mild/pleasant \
    taste and odor; cook before eating. An edible look-alike is Craterellus fallax, which is practically identical but \
    has an orange spore print rather than whitish.",

    "commonpuffball": "The fruiting body is up to 6cm wide, pear-shaped, white to dull white, with small conical spines \
    that break off but leave a network of spots behind. Flesh must be firm and all-white. Flesh must be undifferentiated \
    with no trace of gills, no thick rind and no outline of mushroom visible in cross section. appears in the summer \
    and fall. Has a mild taste with no odor; cook before eating. A non-poisonous look-alike is Lycoperdon foetidum, \
    which is similar in appearance but are brown/greyish-beige rather than white and has an unpleasant odor. Grows \
    singly, in groups or clumped together on forest beds under conifers and hardwoods. A look-alike with unknown \
    edibility is Lycoperdon umbrinum, which is similar in appearance but are brown/tan rather than white. Warning: do \
    not confuse with young specimens of the deadly Destroying Angel or other poisonous white mushrooms, which have no \
    spines and have faint differentiation inside rather than being solid white.",

    "cauliflower": "The fruiting body is up to 30cm wide, white or yellow/brown tinted, shaped like a cauliflower head \
    with a spongy, curly rosette exterior. Has no visible stem, gills, tubes, pores or spines. Flesh is white, firm, \
    with many branches arising from a hidden central stalk. Appears in the late summer and fall. Grows singly or in \
    small groups on the ground at or near the base of conifers. Has a mild, pleasant taste and indistinct odor; cook \
    thoroughly before eating, younger specimens are preferred. An edible look-alike is Sparassis spathulata, which is \
    similar in appearance but has multiple anchor points to the ground.",

    "chickenofthewoods": "The fruiting bodies are up to 20cm wide, shelf-like, rubbery, sulphur yellow to orange, \
    sometimes with bright orange tips. Older specimens become pale and brittle, chalk-like. Flesh is white to yellow \
    tinted, firm, softer towards the edges. Underside is characteristically white to bright yellow, with tiny pores \
    instead of gills. Has no stem. Grows in overlapping groups on logs, stumps, or wounds of trees. Appears in spring, \
    summer, and fall. Has a mild taste and odor; cook before eating. Tip: harvest the soft outer margin of the younger \
    specimens to avoid bitterness. An inedible (but not poisonous) look-alike is Pycnoporus cinnabarinus, which is \
    corky/rigid rather than rubbery, and orange/red on the top and underside, rather than bright yellow on the underside. \
    an inedible (but not poisonous) look-alike is Hapalopilus nidulans, which is cinnamon brown/orange on the top and \
    the underside, rather than bright yellow on the underside. Warning: can cause allergic reaction in some people due \
    to toxins absorbed from the tree; begin by sampling small amounts.",

    "oyster": "The cap up to 8cm wide, fanlike convex shape, smooth, moist, cream to light brown. Flesh is off-white, \
    firm. Stem usually not present, otherwise white, dry, with white hairs at base. Usually grows in large overlapping \
    custers, on trees, logs and stumps of hardwoods and conifers, never on the ground. Appears in spring and fall. Has \
    a mild, pleasant taste and fragrant fruity odor; cook before eating. Tip: the oyster mushroom has several \
    look-alikes that are indistinguishable in the field, all are edible as long as they grow on trees (avoid those \
    growing on dead wood/logs/stumps). A potentially poisonous look-alike is the Angel wings mushroom (Pleurocybella \
    porrigens), which is similar in appearance but is white rather than cream, has thinner flesh, no odor, and grows on \
    dead wood (logs/stumps) rather than trees."
};


// Global variables
var selection = '';
var currentMushrooms = {};


// Functions for mouse events
function makeInteractive() {
    var totalList = document.getElementById('mushroom_selector');
    var elemList = totalList.getElementsByTagName('li');
    var allelem = elemList.length;
    for (var i = 0; i < allelem; i++) {
        if ((m_hash[elemList[i].id] != undefined) || (leafText[elemList[i].id] != undefined))  {
            elemList[i].addEventListener("mouseover", mushroomOver);
            elemList[i].addEventListener("mouseout", mushroomOut);
            if (elemList[i].id != "alltypes") {
                elemList[i].addEventListener("click", mushroomClick);
            } else {
                elemList[i].addEventListener("click", resetPage);
            }
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
    currentMushrooms = {};
    var totalList = document.getElementById('mushroom_selector');
    var elemList = totalList.getElementsByTagName('li');
    var startingSet = m_hash["alltypes"];
    var allelem = elemList.length;
    for (var i=0, j=0; i < allelem; i++) {
        if (elemList[i].id == startingSet[j]) {
            elemList[i].className = 'unselected';
            elemList[i].style.opacity = 100;
            currentMushrooms[elemList[i].id] = elemList[i].className;
            j++;
        } else {
            elemList[i].className = 'remove';
        }
    }
    sessionStorage.setItem('currentMushrooms', JSON.stringify(currentMushrooms));
}


function mushroomClick() {
    this.className = 'selected';
    selection = this.id;
    fadeOut();
    setTimeout(removeOld, 800);
    // check m_hash, if selection doesn't exist, then it must be a leaf node
    if (isLeaf(selection)) {
        setTimeout(showLeaf, 810);
    } else {
        setTimeout(showChildren, 810);
    }
    updateSession();
}

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

function isLeaf(node) {
    if (m_hash[node] == undefined) return true;
    return false;
}

function showLeaf() {
    secondPic = "img/" + selection + "_2.jpg";
    document.getElementById("additionalImg").firstElementChild.src = secondPic;
    document.getElementById("additionalImg").className = 'unselected';
    document.getElementById("additionalImg").style.opacity = 100;
    document.getElementById("explanation").firstElementChild.innerHTML = leafText[selection];
    document.getElementById("explanation").className = 'unselected';
    document.getElementById("explanation").style.opacity = 100;
}

function showChildren() {
// Takes all of the selected item's children and sets them to be visible
    var children = m_hash[selection];
    var allelem = children.length;
    for (var i=0; i < allelem; i++) {
        document.getElementById(children[i]).className = 'unselected';
        document.getElementById(children[i]).style.opacity = 100;
    }
}

function updateSession() {

    switch (selection) {
        case "caps":
            var subset = ["alltypes", "caps", "gills", "pores", "teeth"];
            break;
        case "gills":
            subset = ["alltypes", "caps", "gills", "shaggymane"];
            break;
        case "pores":
            subset = ["alltypes", "caps", "pores", "kingbolete"];
            break;
        case "teeth":
            subset = ["alltypes", "caps", "teeth", "hedgehog"];
            break;
        case "morels":
            subset = ["alltypes", "morels", "blackmorel"];
            break;
        case "trumpets":
            subset = ["alltypes", "trumpets", "chanterelle", "bluechanterelle", "blackchanterelle"];
            break;
        case "puffballs":
            subset = ["alltypes", "puffballs", "commonpuffball"];
            break;
        case "corals":
            subset = ["alltypes", "corals", "cauliflower"];
            break;
        case "shelves":
            subset = ["alltypes", "shelves", "chickenofthewoods", "oyster"];
            break;
    }
    currentMushrooms = {};
    var allelem = subset.length;
    for (i=0; i < allelem; i++) {
        currentMushrooms[subset[i]] = document.getElementById(subset[i]).className;
    }
    sessionStorage.setItem('currentMushrooms', JSON.stringify(currentMushrooms));
}



/* When the window is ready, set up event listeners, then respond to clicks */
window.onload = function() {

    makeInteractive();

    if ((sessionStorage.getItem('currentMushrooms') == {}) || (sessionStorage.getItem('currentMushrooms') === null)) {
        resetPage();
    } else {
        currentMushrooms = JSON.parse(sessionStorage.getItem('currentMushrooms'));
        console.log('on load, current is ', currentMushrooms);
        var totalList = document.getElementById('mushroom_selector');
        var elemList = totalList.getElementsByTagName('li');
        var allelem = elemList.length;
        for (var i = 0; i < allelem; i++) {
            if (elemList[i].id in currentMushrooms) {
                elemList[i].style.opacity = 100;
                elemList[i].className = currentMushrooms[elemList[i].id];
            } else {
                elemList[i].className = 'remove';
            }
        }
    }
}

