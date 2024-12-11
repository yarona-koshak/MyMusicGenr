import { Book } from "../types";
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
let bookId = Number(query.get("bookId"));

appendBook();

favoriteCheckbox.onchange = function () {
  if (favoriteCheckbox.checked) {
    send("addToFavorites", [userId, bookId]);
  }
  else {
    send("removeFromFavorites", [userId, bookId]);
  }
}

async function appendBook() {
  let [book, uploader, isFavorite] = await send("getBookInfo", [userId, bookId]) as [Book, string, boolean];

  document.title = book.Title;
  titleHeading.innerText = book.Title;
  authorHeading.innerText = `by ${book.Author}`;
  uploaderHeading.innerText = `Uploaded by ${uploader}`
  coverImg.src = book.ImageSource;

  if (userId != null) {
    favoriteDiv.classList.remove("hidden");
    favoriteCheckbox.checked = isFavorite;
  }

  descriptionDiv.innerText = book.Description;
}