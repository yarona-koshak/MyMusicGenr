import { send } from "../utilities";

let loggedOutDiv = document.getElementById("loggedOutDiv") as HTMLDivElement;
let logInButton = document.getElementById("logInButton") as HTMLButtonElement;
let signUpButton = document.getElementById("signUpButton") as HTMLButtonElement;
let loggedInDiv = document.getElementById("loggedInDiv") as HTMLDivElement;
let greetingDiv = document.getElementById("greetingDiv") as HTMLDivElement;
let logOutButton = document.getElementById("logOutButton") as HTMLButtonElement;

logInButton.onclick = function () {
  top!.location.href = "logIn.html";
}

signUpButton.onclick = function () {
  top!.location.href = "signUp.html";
}

logOutButton.onclick = function logOut() {
  localStorage.removeItem("userId");
  top!.location.href = "index.html";
}

async function verifyUserId() {
  let userId = localStorage.getItem("userId");

  if (userId == null) {
    return;
  }

  let userExists = await send("verifyUserId", userId) as boolean;

  if (!userExists) {
    localStorage.removeItem("userId");
  }
}

async function makeStatusVisible() {
  let userId = localStorage.getItem("userId");

  if (userId == null) {
    loggedOutDiv.classList.remove("hidden");
  }
  else {
    let username = await send("getUsername", userId);
    greetingDiv.innerText = "Welcome, " + username + "!";
    loggedInDiv.classList.remove("hidden");
  }
}

verifyUserId();
makeStatusVisible();