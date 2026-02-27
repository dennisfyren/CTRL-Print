const sideNav = document.getElementById("sidenav");
const menuButton = document.getElementById("menu-button");
const hiddenLinks = document.getElementById("hidden-links");

const form = document.querySelector("#main-form");

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


function StoreData(){
    const fData = new FormData(form);
    const docType = document.querySelector("#doc-type").textContent;
    console.log(fData); 
    
    //Add FormData to object
    const fDataObj = {};
    fData.forEach((value, key) => {
        if(!Reflect.has(fDataObj, key)) {
            fDataObj[key] = value;
            return;
        }
        if (!Array.isArray(fData[key])){
            fDataObj[key] = [fDataObj[key]];
        }
        fDataObj[key].push(value);
    });
    //Filter data before send.
    for(let item in fDataObj) {
        if (fDataObj[item] === null || fDataObj[item] === undefined || fDataObj[item] === ""){
            delete fDataObj[item];
        }
    }
    
    let json = JSON.stringify(fDataObj);
    sessionStorage.setItem("data", json);
    sessionStorage.setItem("doctype", docType);
}

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
    
    //Close all tabs before opening next.
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

