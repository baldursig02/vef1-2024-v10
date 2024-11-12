import { el } from "./lib/elements.js";
import { fetchJson } from "./lib/fetch.js";

const booksJson = await fetchJson("./api/books.json");

const bookElement = document.querySelector(".book");

const nextbtn = document.querySelector('.nextbtn');

let booknum = 0;

async function nextBook(){
    bookElement.innerHTML = '';
    const bookTitle = booksJson.reading_log_entries[booknum].work.title;
    const bookAuthor = booksJson.reading_log_entries[booknum].work.author_names;
    const bookKey = booksJson.reading_log_entries[booknum].work.cover_id;

    const img = el('img', {src: `https://covers.openlibrary.org/b/id/${bookKey}-M.jpg`}, "");
    
    // Wait for the image to load
    await new Promise((resolve, reject) => {
        img.onload = resolve; // Resolve the promise when image loads
        img.onerror = reject; // Reject the promise if image fails to load
    });

    bookElement.appendChild(img);
    bookElement.appendChild(el('h1',{}, `${bookTitle}`));
    bookElement.appendChild(el('p',{}, `${bookAuthor}`));

    booknum++;
}

console.log(booknum);

nextbtn.addEventListener('click', nextBook);

function getData(form) {
    var formData = new FormData(form);
    for (var pair of formData.entries()) {
        var value = pair[1];
    }
    console.log(value);
    return(value);
}
  
document.getElementById("rating").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = getData(e.target);
    console.log(text);
    if (text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == 10){
        if (text < 4){
            console.log(text);
            const ratingElement = document.querySelector(".bookRatings");
            const currentBookElement = document.querySelector(".book img");
            const copiedBookElement = currentBookElement.cloneNode(true)
            ratingElement.appendChild(el("li", {class: "bad"}, copiedBookElement, `Receives a score of ${text}`));
        } else if (4 < text && text < 7) {
            console.log(text);
            const ratingElement = document.querySelector(".bookRatings");
            const currentBookElement = document.querySelector(".book img");
            const copiedBookElement = currentBookElement.cloneNode(true)
            ratingElement.appendChild(el("li", {class: "mid"}, copiedBookElement, `Receives a score of ${text}`));
        } else {
            console.log(text);
            const ratingElement = document.querySelector(".bookRatings");
            const currentBookElement = document.querySelector(".book img");
            const copiedBookElement = currentBookElement.cloneNode(true)
            ratingElement.appendChild(el("li", {class: "great"}, copiedBookElement, `Receives a score of ${text}`));
        }

        
        nextBook();
    }
});