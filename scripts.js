

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

