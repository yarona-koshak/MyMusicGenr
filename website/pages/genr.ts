import { Genr } from "../types";
import { send } from "../utilities";

let query = new URLSearchParams(location.search);

let titleHeading = document.getElementById("titleHeading") as HTMLHeadingElement;
let authorHeading = document.getElementById("authorHeading") as HTMLHeadingElement;
let coverImg = document.getElementById("coverImg") as HTMLImageElement;
let uploaderHeading = document.getElementById("uploaderHeading") as HTMLHeadingElement;
let favoriteDiv = document.getElementById("favoriteDiv") as HTMLDivElement;
let favoriteCheckbox = document.getElementById("favoriteCheckbox") as HTMLInputElement;
let descriptionDiv = document.getElementById("descriptionDiv") as HTMLDivElement;

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
  let [genr, uploader, isFavorite] = await send("getGenrInfo", [userId, genrId]) as [Genr, string, boolean];

  document.title = genr.Title;
  titleHeading.innerText = genr.Title;
  authorHeading.innerText = `by ${genr.Author}`;
  uploaderHeading.innerText = `Uploaded by ${uploader}`
  coverImg.src = genr.ImageSource;

  if (userId != null) {
    favoriteDiv.classList.remove("hidden");
    favoriteCheckbox.checked = isFavorite;
  }

  descriptionDiv.innerText = genr.Description;
}