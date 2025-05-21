import { send } from "../utilities";

let titleInput = document.getElementById("titleInput") as HTMLInputElement;
let imageSourceInput = document.getElementById("imageSourceInput") as HTMLInputElement;
let descriptionTextarea = document.getElementById("descriptionTextarea") as HTMLTextAreaElement;
let addButton = document.getElementById("addButton") as HTMLButtonElement;

addButton.onclick = async function () {
  await send(
    "addGenr",
    [
      titleInput.value,
      imageSourceInput.value,
      descriptionTextarea.value,
      localStorage.getItem("userId"),
    ]
  );

  location.href = "index.html";
}