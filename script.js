const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

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

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function toggleRead(index) {
    myLibrary[index].toggleRead();
    render();
}

function render() {
  let libraryBook = document.querySelector("#books-container"); // why query selector for whole container?
  libraryBook.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookVisual = document.createElement("div");
    bookVisual.setAttribute("class", "book-card");
    bookVisual.innerHTML = `
        <h2 class="title">${book.title}</h2>
        <h4 class="author">${book.author}</h4>
        <p>${book.pages} pages</p>
        <p class="read-status">${book.read ? "Read" : "Want to read"}</p>
        <button class="toggle-read-btn" onclick="toggleRead(${i})">Change read status</button>
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
}

//add event listener directly to the button???
document
  .querySelector("#new-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //stops form submitting
    addBook();
  });

  //placeholder books for display
  const placeholderBook1 = new Book("A Little Life", "Hanya Yanagihara", "720", "Read")
  myLibrary.push(placeholderBook1);
  const placeholderBook2 = new Book("Just Kids", "Patti Smith", "262", "Read")
  myLibrary.push(placeholderBook2);
  render();