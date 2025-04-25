import { send } from "../utilities";

let TheStart = document.getElementById("TheStart") as HTMLButtonElement;
let Login = document.getElementById("Login") as HTMLButtonElement;
let Signup = document.getElementById("Signup") as HTMLButtonElement;

TheStart.onclick = async function () {
    let id = await send("Youre Clicked") as string;
    location.href = "header.html";
}
Login.onclick = function () {
    top!.location.href = "login.html";
};

Signup.onclick = function () {
    top!.location.href = "signup.html";
};
