function pause (milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function SaveToLocal() {
    const userName = document.querySelector("#username").value;
    const preferredMode = document.querySelector("#preferred-mode").value;
    const confirm = document.querySelector("#confirm");
    const p = document.createElement("p");

    localStorage.setItem("name", userName);
    localStorage.setItem("mode", preferredMode);
    

    confirm.appendChild(p);
    p.textContent = "Sparat!"
    await pause(500);
    location.reload();
}

function LoadSettings(){
    modeSelect = localStorage.getItem("mode");
    currentUserName = localStorage.getItem("name");

    const name = document.querySelector("#username");
    name.value = currentUserName;
    const mode = document.querySelector("#preferred-mode");
    mode.value = modeSelect;
}