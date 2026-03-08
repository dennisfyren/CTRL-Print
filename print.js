// Old code is saved and commented for testing. 

// const json = sessionStorage.getItem("data");
const recieveDocType = sessionStorage.getItem("doctype");
// const fData = JSON.parse(json);
const docType = document.querySelector("#doc-type");
docType.textContent = recieveDocType;

const jsonComments = sessionStorage.getItem("comments");
const sortedComments = JSON.parse(jsonComments);
const storedLogo = localStorage.getItem("customLogo");

if (storedLogo) {
    // Set it as the src of an img element
    document.querySelector("#logo-display").src = storedLogo;
}

async function decryptData() {
    const stored = JSON.parse(sessionStorage.getItem("data"));
    if (!stored) return null;

    // Import the key
    const key = await crypto.subtle.importKey(
        'jwk',
        stored.key,
        { name: 'AES-GCM', length: 256 },
        true,
        ['decrypt']
    );

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(stored.iv) },
        key,
        new Uint8Array(stored.encrypted)
    );

    // Parse back to object
    return JSON.parse(new TextDecoder().decode(decrypted));
}

function Print(){
    window.print();
}

function GetElements(){
    const elements = document.getElementsByTagName("p");
    return Object.entries(elements);
}
const elements = GetElements();

async function FillData(dataObject) {
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
async function getData(){
    const fData = await decryptData();
    FillData(fData);
}
getData();
document.querySelector("#central-comment").textContent = sortedComments[0];
document.querySelector("#document-comment").textContent = sortedComments[5];
document.querySelector("#test-comment").textContent = sortedComments[1];
document.querySelector("#facility-comment").textContent = sortedComments[2];
document.querySelector("#out-comment").textContent = sortedComments[3];
document.querySelector("#send-comment").textContent = sortedComments[4];
document.querySelector("#improvements").textContent = sortedComments[6];
document.querySelector("#send-signals-comment").textContent = sortedComments [7];

document.querySelector("#company-name").textContent = localStorage.getItem("company-name");
document.querySelector("#company-address").textContent = localStorage.getItem("company-address");
document.querySelector("#company-post").textContent = localStorage.getItem("company-post");
document.querySelector("#company-location").textContent = localStorage.getItem("company-location");
document.querySelector("#company-email").textContent = localStorage.getItem("company-email");
document.querySelector("#company-tel").textContent = localStorage.getItem("company-tel");

Print();