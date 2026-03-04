const sideNav = document.getElementById("sidenav");
const menuButton = document.getElementById("menu-button");
const hiddenLinks = document.getElementById("hidden-links");
let modeSelect;
let currentUserName;
let currentLogoPath;
const change = "change";

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
    
    //Filter data before sending to sessionStorage.
    for(let item in fDataObj) {
        if (fDataObj[item] === null || fDataObj[item] === undefined || fDataObj[item] === ""){
            delete fDataObj[item];
        }
    }
    
    sessionStorage.setItem("data", JSON.stringify(fDataObj));
    sessionStorage.setItem("doctype", docType);

    const comments = [
        document.querySelector("#central-comment").value,
        document.querySelector("#test-comment").value,
        document.querySelector("#facility-comment").value,
        document.querySelector("#out-comment").value,
        document.querySelector("#send-comment").value,
        document.querySelector("#document-comment").value,
        document.querySelector("#improvements").value,
        document.querySelector("#send-signals-comment").value,
    ]
    sessionStorage.setItem("comments", JSON.stringify(comments));
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
    } else if (menuOpen === 1){
        sideNav.classList.remove("toggle-sidenav");
        menuButton.classList.remove("move-button");
        menuOpen = 0;
    } else {
        console.log("Something went wrong...");
        return;
    }
}
function CloseSideNav(){
    if (menuOpen === 1){
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
        hiddenLinks.classList.remove("show-links");
        linksOpen = 1;
    } else {
        hiddenLinks.classList.add("show-links");
        linksOpen = 0;
    }
}
window.addEventListener("load", (LoadSettings()));


function LoadSettings(){
    modeSelect = localStorage.getItem("mode");
    currentUserName = localStorage.getItem("name");
    currentLogoPath = localStorage.getItem("logo");

    const name = document.querySelector("#installer");
    name.value = currentUserName;
}

function setTheme(mode) {
    const body = document.querySelector("#set-theme");
    if (mode === "dark"){
        body.classList.add("dark");
    } else if (mode === "change") {
        if (modeSelect === "dark") {
            localStorage.setItem("mode", "light");
             location.reload();
        } else {
            localStorage.setItem("mode", "dark");
            location.reload();
        }
    } else if (mode === "light") {
        body.classList.remove("dark");
        body.classList.add("light");
    }

}



