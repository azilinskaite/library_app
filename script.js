const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");
const form = document.getElementById("new-book-form");

openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

function render() {
  let libraryBook = document.querySelector("#books-container");
  libraryBook.innerHTML = "";

  if (myLibrary.length === 0) {
    libraryBook.innerHTML = "<h3>Start by adding some books!</h3>";
    return;
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookVisual = document.createElement("div");
    bookVisual.setAttribute("class", "book-card");
    bookVisual.innerHTML = `
        <h2 class="title">${book.title}</h2>
        <h4 class="author">${book.author}</h4>
        <p>${book.pages} pages</p>
        <p class="read-status">${book.read ? "Read" : "Want to read"}</p>
        <button class="toggle-read-btn" onclick="toggleRead(${i})">Change status</button>
        <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
        `;
    libraryBook.appendChild(bookVisual);
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function addBook() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();
  modal.close();
  form.reset();
}

document
  .querySelector("#new-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //stops form submitting
    addBook();
  });

//placeholder books for display
const placeholderBook1 = new Book(
  "A Little Life",
  "Hanya Yanagihara",
  "720",
  "Read"
);
myLibrary.push(placeholderBook1);
const placeholderBook2 = new Book("Just Kids", "Patti Smith", "262", "Read");
myLibrary.push(placeholderBook2);
const placeholderBook3 = new Book("Ulysses", "James Joyce", "782", "Want to read");
myLibrary.push(placeholderBook3);
const placeholderBook4 = new Book("The Road Back", "Erich Maria Remarque", "352", "Read");
myLibrary.push(placeholderBook4);
render();

