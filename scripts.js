

function PrintPage(){
    const originalContent = document.body.innerHTML;
    const sectionContent = document.getElementById("printThis").outerHTML;

    document.body.innerHTML = sectionContent;
    window.print();
    document.body.innerHTML = originalContent;
}
let a = document.getElementById("contact");
let b = document.getElementById("facility");
let c = document.getElementById("other");

a.classList.add("hide-content");
b.classList.add("hide-content");
c.classList.add("hide-content");
a.classList.toggle("hide-content");

function SelectCategory(category){

    a.classList.remove("hide-content");
    b.classList.remove("hide-content");
    c.classList.remove("hide-content");
    a.classList.add("hide-content");
    b.classList.add("hide-content");
    c.classList.add("hide-content");
    
    switch(category){
        case 1: console.log("Kontakt")
            a.classList.toggle("hide-content");
            break;
        case 2: console.log("Anläggning")
            b.classList.toggle("hide-content");
            break;
        case 3: console.log("Övrigt")
            c.classList.toggle("hide-content");
            break;
    }
}
console.log("Hello World!")
