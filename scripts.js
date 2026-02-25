const sideNav = document.getElementById("sidenav");
const menuButton = document.getElementById("menu-button");
const hiddenLinks = document.getElementById("hidden-links");

const categories = [document.getElementById("test-1"), 
                    document.getElementById("test-2"), 
                    document.getElementById("test-3"),
                    document.getElementById("test-4"),
                    document.getElementById("test-5"),
                    document.getElementById("test-6"),
                    document.getElementById("test-7"),
                    document.getElementById("test-8"),
                    document.getElementById("test-9")];
let menuOpen = 0;
let linksOpen = 0;

hiddenLinks.classList.add("show-links");
function pause (milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
function ToggleSidenav() {
    if (menuOpen === 0){
        sideNav.classList.add("toggle-sidenav");
        menuButton.classList.add("move-button")
        menuOpen = 1;
    } else {
        sideNav.classList.remove("toggle-sidenav");
        menuButton.classList.remove("move-button");
        menuOpen = 0;
    }
}
async function ToggleInputGroup(categoryNumber) {
    categories.forEach(element => {
        element.classList.remove("show-input-group");
    });
    categories[categoryNumber].classList.add("show-input-group");
    await pause(350);
    categories[categoryNumber].scrollIntoView();
}
function ToggleLinks() {
    if (linksOpen === 0) {
        console.log("Hello")
        hiddenLinks.classList.remove("show-links");
        linksOpen = 1;
    } else {
        hiddenLinks.classList.add("show-links");
        linksOpen = 0;
    }
}

function PrintPage(){
    const originalContent = document.body.innerHTML;
    const sectionContent = document.getElementById("printThis").outerHTML;

    document.body.innerHTML = sectionContent;
    window.print();
    document.body.innerHTML = originalContent;
}
let a = document.getElementById("contact");
let b = document.getElementById("central-data");
let c = document.getElementById("other");
let d = document.getElementById("selector-contact");
let e = document.getElementById("selector-facility");
let f = document.getElementById("selector-other");

a.classList.add("hide-content");
b.classList.add("hide-content");
c.classList.add("hide-content");
a.classList.toggle("hide-content");
d.classList.add("new-color");


function SelectCategory(category){

    a.classList.remove("hide-content");
    b.classList.remove("hide-content");
    c.classList.remove("hide-content");
    a.classList.add("hide-content");
    b.classList.add("hide-content");
    c.classList.add("hide-content");
    d.classList.remove("new-color");
    e.classList.remove("new-color");
    f.classList.remove("new-color");
 
    switch(category){
        case 1: console.log("Kontakt")
            a.classList.toggle("hide-content");
            d.classList.add("new-color");
            break;
        case 2: console.log("Anläggning")
            b.classList.toggle("hide-content");
            e.classList.add("new-color");
            break;
        case 3: console.log("Övrigt")
            c.classList.toggle("hide-content");
            f.classList.add("new-color");
            break;
    }
}

