import { Genr } from "../types";
import { send } from "../utilities";

let loggedInDiv = document.getElementById("loggedInDiv") as HTMLDivElement;
let favoritesContainer = document.getElementById("favoritesContainer") as HTMLDivElement;
let uploadedByMeContainer = document.getElementById("uploadedByMeContainer") as HTMLDivElement;
let booksContainer = document.getElementById("GenresContainer") as HTMLDivElement;


let userId = localStorage.getItem("userId");

if (userId != null) {
  loggedInDiv.classList.remove("hidden");
  generateSortedPreviews();
}

generatePreviews();


async function generatePreviews() {
  let genres = await send("getGenres") as Genr[];

  if (genres.length == 0) {
    booksContainer.innerText = "There are no Genres to display yet.";
  }
  else {
    for (let i = 0; i < genres.length; i++) {
      let previewAnchor = createPreviewAnchor(genres[i]);
      booksContainer.appendChild(previewAnchor);
    }
  }
}

async function generateSortedPreviews() {
  let [favorites, uploadedByMe] = await send("getSortedGenres", userId) as [Genr[], Genr[]];

  if (favorites.length == 0) {
    favoritesContainer.innerText = "Your favorite Genres will be displayed here.";
  }
  else {
    for (let i = 0; i < favorites.length; i++) {
      let previewAnchor = createPreviewAnchor(favorites[i]);
      favoritesContainer.appendChild(previewAnchor);
    }
  }

  if (uploadedByMe.length == 0) {
    uploadedByMeContainer.innerText = "Genres you upload will be display here.";
  }
  else {
    for (let i = 0; i < uploadedByMe.length; i++) {
      let previewAnchor = createPreviewAnchor(uploadedByMe[i]);
      uploadedByMeContainer.appendChild(previewAnchor);
    }
  }
}

function createPreviewAnchor(genr: Genr): HTMLAnchorElement {
  let anchor = document.createElement("a");
  anchor.classList.add("preview");
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