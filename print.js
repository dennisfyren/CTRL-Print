const json = sessionStorage.getItem("data");
const recieveDocType = sessionStorage.getItem("doctype");
const fData = JSON.parse(json);
const docType = document.querySelector("#doc-type");
docType.textContent = recieveDocType;
comments = sessionStorage.getItem("comments");
let sortedComments = comments.split(",");


function Print(){
    window.print();
}

function GetElements(){
    const elements = document.getElementsByTagName("p");
    return Object.entries(elements);
}
const elements = GetElements();

function FillData(dataObject) {
    document.querySelectorAll('p[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (key in dataObject) {
            element.textContent = dataObject[key];
        }
    });
}
function GoHome(){
    document.location.href="index.html";
}

FillData(fData);
document.querySelector("#central-comment").textContent = sortedComments[0];
document.querySelector("#document-comment").textContent = sortedComments[5];
document.querySelector("#test-comment").textContent = sortedComments[1];
document.querySelector("#facility-comment").textContent = sortedComments[2];
document.querySelector("#out-comment").textContent = sortedComments[3];
document.querySelector("#send-comment").textContent = sortedComments[4];
document.querySelector("#improvements").textContent = sortedComments[6];





