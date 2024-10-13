import { Book } from "../types";
import { send } from "../utilities";

let loggedInDiv = document.getElementById("loggedInDiv") as HTMLDivElement;
let favoritesContainer = document.getElementById("favoritesContainer") as HTMLDivElement;
let uploadedByMeContainer = document.getElementById("uploadedByMeContainer") as HTMLDivElement;
let booksContainer = document.getElementById("booksContainer") as HTMLDivElement;


let userId = localStorage.getItem("userId");

if (userId != null) {
  loggedInDiv.classList.remove("hidden");
  generateSortedPreviews();
}

generatePreviews();


async function generatePreviews() {
  let books = await send("getBooks") as Book[];

  if (books.length == 0) {
    booksContainer.innerText = "There are no books to display yet.";
  }
  else {
    for (let i = 0; i < books.length; i++) {
      let previewAnchor = createPreviewAnchor(books[i]);
      booksContainer.appendChild(previewAnchor);
    }
  }
}

async function generateSortedPreviews() {
  let [favorites, uploadedByMe] = await send("getSortedBooks", userId) as [Book[], Book[]];

  if (favorites.length == 0) {
    favoritesContainer.innerText = "Your favorite books will be displayed here.";
  }
  else {
    for (let i = 0; i < favorites.length; i++) {
      let previewAnchor = createPreviewAnchor(favorites[i]);
      favoritesContainer.appendChild(previewAnchor);
    }
  }

  if (uploadedByMe.length == 0) {
    uploadedByMeContainer.innerText = "Books you upload will be display here.";
  }
  else {
    for (let i = 0; i < uploadedByMe.length; i++) {
      let previewAnchor = createPreviewAnchor(uploadedByMe[i]);
      uploadedByMeContainer.appendChild(previewAnchor);
    }
  }
}

function createPreviewAnchor(book: Book): HTMLAnchorElement {
  let anchor = document.createElement("a");
  anchor.classList.add("preview");
  anchor.href = "book.html?bookId=" + book.Id;

  let img = document.createElement("img");
  img.classList.add("bookImage");
  img.src = book.ImageSource;
  anchor.appendChild(img);

  let titleDiv = document.createElement("div");
  titleDiv.innerText = book.Title;
  anchor.appendChild(titleDiv);

  return anchor;
}