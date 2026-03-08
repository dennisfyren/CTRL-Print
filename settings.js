function pause (milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function SaveToLocal() {
    const userName = document.querySelector("#username").value;
    const preferredMode = document.querySelector("#preferred-mode").value;

    localStorage.setItem("name", userName);
    localStorage.setItem("mode", preferredMode);

    localStorage.setItem("company-name", document.querySelector("#company-name").value);
    localStorage.setItem("company-address", document.querySelector("#company-address").value);
    localStorage.setItem("company-post", document.querySelector("#company-post").value);
    localStorage.setItem("company-location", document.querySelector("#company-location").value);
    localStorage.setItem("company-email", document.querySelector("#company-email").value);
    localStorage.setItem("company-tel", document.querySelector("#company-tel").value);

    Notify();
}
async function Notify(){
    const confirm = document.querySelector("#confirm");
    const p = document.createElement("p");

    confirm.appendChild(p);
    p.textContent = "Ändringar sparade!"
    await pause(500);
    location.reload();
}

function LoadSettings(){
    modeSelect = localStorage.getItem("mode");
    currentUserName = localStorage.getItem("name");

    const companyAddress = localStorage.getItem("company-address");
    const companyPost = localStorage.getItem("company-post");
    const companyLocation = localStorage.getItem("company-location");

    const name = document.querySelector("#username");
    name.value = currentUserName;
    const mode = document.querySelector("#preferred-mode");
    if (localStorage.getItem("mode") !== null){
        mode.value = modeSelect;
    }
  

    document.querySelector("#company-name").value = localStorage.getItem("company-name");
    document.querySelector("#company-address").value = localStorage.getItem("company-address");
    document.querySelector("#company-post").value = localStorage.getItem("company-post");
    document.querySelector("#company-location").value = localStorage.getItem("company-location");
    document.querySelector("#company-email").value = localStorage.getItem("company-email");
    document.querySelector("#company-tel").value = localStorage.getItem("company-tel");

}

async function ClearLocal() {
    localStorage.clear();
    Notify();
    location.reload();
}

let customLogoInput = document.querySelector("#company-logo");
customLogoInput.addEventListener("change", handleLogoChange);
function handleLogoChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataURL = e.target.result;
            localStorage.setItem("customLogo", dataURL);
            currentLogoPath = dataURL; // Optionally update the variable
        };
        reader.readAsDataURL(file);
    }
}
