
import { Genr } from "../../types";
import { send } from "../utilities";

let query = new URLSearchParams(location.search);

let titleHeading = document.getElementById("titleHeading") as HTMLHeadingElement;
let coverImg = document.getElementById("coverImg") as HTMLImageElement;
let favoriteDiv = document.getElementById("favoriteDiv") as HTMLDivElement;
let favoriteCheckbox = document.getElementById("favoriteCheckbox") as HTMLInputElement;
let descriptionDiv = document.getElementById("descriptionDiv") as HTMLDivElement;
let backhome = document.getElementById("backhome") as HTMLButtonElement;


let userId = localStorage.getItem("userId");
let genrId = Number(query.get("genrId"));

appendGenr();

favoriteCheckbox.onchange = function () {
  if (favoriteCheckbox.checked) {
    send("addToFavorites", [userId, genrId]);
  }
  else {
    send("removeFromFavorites", [userId, genrId]);
  }
}

async function appendGenr() {
  let [genr, isFavorite] = await send("getGenrInfo", [userId, genrId]) as [Genr, boolean];

  document.title = genr.Title;
  titleHeading.innerText = genr.Title;
  coverImg.src = genr.ImageSource;

  if (userId != null) {
    favoriteDiv.classList.remove("hidden");
    favoriteCheckbox.checked = isFavorite;
  }

  descriptionDiv.innerText = genr.Description;
}

backhome.onclick = function () {
  top!.location.href = "index.html";
};