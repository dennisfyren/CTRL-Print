const json = sessionStorage.getItem("data");
const recieveDocType = sessionStorage.getItem("doctype");
const fData = JSON.parse(json);
const docType = document.querySelector("#doc-type");
docType.textContent = recieveDocType;

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
FillData(fData);

