
let contact = document.getElementById("#cat-contact");

function PrintPage(){
    const originalContent = document.body.innerHTML;
    const sectionContent = document.getElementById("printThis").outerHTML;

    document.body.innerHTML = sectionContent;
    window.print();
    document.body.innerHTML = originalContent;
}

function SelectCategory(category){
    switch(category){
        case 1: console.log("Kontakt")
            break;
        case 2: console.log("Anläggning")
            break;
        case 3: console.log("Övrigt")
            break;
    }
}
console.log("Hello World!")
