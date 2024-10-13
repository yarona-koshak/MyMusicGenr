import { send } from "../utilities";
let loggedInDiv = document.getElementById("loggedInDiv");
let favoritesContainer = document.getElementById("favoritesContainer");
let uploadedByMeContainer = document.getElementById("uploadedByMeContainer");
let booksContainer = document.getElementById("booksContainer");
let userId = localStorage.getItem("userId");
if (userId != null) {
    loggedInDiv.classList.remove("hidden");
    generateSortedPreviews();
}
generatePreviews();
async function generatePreviews() {
    let books = await send("getBooks");
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
    let [favorites, uploadedByMe] = await send("getSortedBooks", userId);
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
function createPreviewAnchor(book) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXBDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFtQixDQUFDO0FBQzNFLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBbUIsQ0FBQztBQUN6RixJQUFJLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQW1CLENBQUM7QUFDL0YsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBbUIsQ0FBQztBQUdqRixJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTVDLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtJQUNsQixXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxzQkFBc0IsRUFBRSxDQUFDO0NBQzFCO0FBRUQsZ0JBQWdCLEVBQUUsQ0FBQztBQUduQixLQUFLLFVBQVUsZ0JBQWdCO0lBQzdCLElBQUksS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBVyxDQUFDO0lBRTdDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDckIsY0FBYyxDQUFDLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztLQUNqRTtTQUNJO1FBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzQztLQUNGO0FBQ0gsQ0FBQztBQUVELEtBQUssVUFBVSxzQkFBc0I7SUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQXFCLENBQUM7SUFFekYsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUN6QixrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsNkNBQTZDLENBQUM7S0FDOUU7U0FDSTtRQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksYUFBYSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMvQztLQUNGO0lBRUQsSUFBSSxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM1QixxQkFBcUIsQ0FBQyxTQUFTLEdBQUcsd0NBQXdDLENBQUM7S0FDNUU7U0FDSTtRQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQUksYUFBYSxHQUFHLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsRDtLQUNGO0FBQ0gsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUMsSUFBVTtJQUNyQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUU1QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXhCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFN0IsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyJ9