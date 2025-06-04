import { Genr } from "types";
import { send } from "../utilities";

let loggedInDiv = document.getElementById("loggedInDiv") as HTMLDivElement;
let favoritesContainer = document.getElementById("favoritesContainer") as HTMLDivElement;
let uploadedByMeContainer = document.getElementById("uploadedByMeContainer") as HTMLDivElement;
let genresContainer = document.getElementById("genresContainer") as HTMLDivElement;


let userId = localStorage.getItem("userId");

if (userId != null) {
  loggedInDiv.classList.remove("hidden");
  generateSortedPreviews();
}

generatePreviews();


async function generatePreviews() {
  let genres = await send("getGenres") as Genr[];

  console.log(genres);

  if (genres.length == 0) {
    genresContainer.innerText = "There are no genres to display yet.";
  }
  else {
    for (let i = 0; i < genres.length; i++) {
      let previewAnchor = createPreviewAnchor(genres[i]);
      genresContainer.appendChild(previewAnchor);
    }
  }
}

async function generateSortedPreviews() {
  let [favorites] = await send("getSortedGenres", userId) as [Genr[], Genr[]];

  if (favorites.length == 0) {
    favoritesContainer.innerText = "Your favorite genres will be displayed here.";
  }
  else {
    for (let i = 0; i < favorites.length; i++) {
      let previewAnchor = createPreviewAnchor(favorites[i]);
      favoritesContainer.appendChild(previewAnchor);
    }
  }
}

function createPreviewAnchor(genr: Genr): HTMLAnchorElement {
  let anchor = document.createElement("a");
  anchor.classList.add("preview");
  anchor.classList.add("cssdiv");
  anchor.href = "genr.html?genrId=" + genr.Id;

  let img = document.createElement("img");
  img.classList.add("genrImage");
  img.src = genr.ImageSource;
  anchor.appendChild(img);

  let titleDiv = document.createElement("div");
  titleDiv.innerText = genr.Title;
  anchor.appendChild(titleDiv);

  return anchor;
}