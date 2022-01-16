let myLibrary = [];

function Book(name, pages, author, read) {
  this.id = ++uniqueId;
  this.name = name;
  this.pages = pages;
  this.author = author;
  this.read = read;
  this.show_congrats = false;
}

function addBookToLibrary(name, pages, author, read) {
  const book = new Book(name, pages, author, read);
  myLibrary.push(book);
  displayBooks()
}


function displayBooks(testing) {
  remove_books()
  if (testing) {
    myLibrary.push(new Book("Test", 12, "Test Author", true))
  }
  for (let i = 0; i < myLibrary.length; i++){
      create_book(myLibrary[i]);
  }
}

function create_book(book) {
  const book_div = document.createElement("div");
  const left_div = document.createElement("div");
  const right_div = document.createElement("div");
  const hide = document.createElement("div");
  const congrats = document.createElement("div");
  book_div.className = "book_wrapper";
  left_div.className = "left";
  right_div.className = "right";
  hide.className = "hide";

  const book_name = document.createElement("h2")
  const book_pages = document.createElement("p")
  book_name.textContent = book.name;
  book_pages.textContent = "Pages: " + book.pages

  left_div.appendChild(book_name);
  left_div.appendChild(book_pages);

  const book_author = document.createElement("h2");
  const read_status = document.createElement("i");
  book_author.textContent = book.author;
  read_status.className = book.read ? "fas fa-check" : "fas fa-times"

  right_div.append(book_author);
  right_div.append(read_status);

  const trash_icon = document.createElement("i");
  trash_icon.className = "fas fa-trash trash-icon";
  trash_icon.addEventListener("click", remove_book);

  const change_read_status_icon = document.createElement("i");
  change_read_status_icon.className = (book.read ? "fas fa-times" : "fas fa-check") + " change_status_icon";
  change_read_status_icon.addEventListener("click", change_status);

  hide.append(trash_icon, change_read_status_icon);
  congrats.textContent = "Well Done!";
  congrats.classList.add("congrats");
  congrats.addEventListener("animationend", () => {

    left_div.style.visibility = "visible";
    right_div.style.visibility = "visible";
    hide.style.visibility = "visible";
    congrats.classList.remove("show");
    book.show_congrats = false;

  });
  if (book.show_congrats) {
    congrats.classList.add("show");
    left_div.style.visibility = "hidden";
    right_div.style.visibility = "hidden";
    hide.style.visibility = "hidden";
  }
  book_div.append(left_div);
  book_div.append(right_div);
  book_div.append(hide);
  book_div.append(congrats);

  book_div.setAttribute("book-id", book.id)

  books_display.append(book_div);
}


function display_form() {
  overlay.style.display = "flex";
  form.classList.add("form-active");
  console.log("I ran")
}

function close_form_and_display() {
  console.log("ran")
  form.classList.remove("form-active");
  form.classList.remove("fadeOut");
  overlay.style.display = "none";
  form.removeEventListener("webkitAnimationEnd", close_form_and_display);
}

function remove_form(e) {
  
  if (e.target.id === "overlay") {
    form.classList.add("fadeOut");
    form.addEventListener("webkitAnimationEnd", close_form_and_display);
  }
}

function get_form_values(e) {
  e.preventDefault();
  addBookToLibrary(book_name.value, pages.value, author.value, read.checked);
  overlay.style.display = "none";
  form.classList.remove("form-active");
  clear_input_values();
  
}

function clear_input_values() {
  book_name.value = "";
  pages.value = "";
  author.value = "";
}

function remove_books() {
  while (books_display.firstChild) {
    books_display.removeChild(books_display.firstChild);
  }
}

function remove_book(e) {
  const book_id = ((e.target.parentNode).parentNode).getAttribute("book-id");
  console.log(typeof book_id)
  myLibrary = myLibrary.filter((book)=>book.id !== parseInt(book_id));
  console.log(myLibrary)
  displayBooks();
}

function change_status(e) {
  const book_id = ((e.target.parentNode).parentNode).getAttribute("book-id");
  myLibrary.map((book) => {
    if (parseInt(book_id) === book.id) {
      book.read = !book.read
    }
    if (parseInt(book_id) === book.id & book.read) {
      book.show_congrats = true;
    }
  });
  displayBooks()
}

const books_display = document.getElementById("books-display");
const add_book_button = document.getElementById("add-book");
const form = document.getElementById("foo");
const overlay = document.getElementById("overlay");
const submit_button = document.getElementById("add-btn");
const book_name = document.getElementById("name");
const pages = document.getElementById("pages");
const author = document.getElementById("author");
const read = document.getElementById("yes");
const trash_icons = document.querySelectorAll(".trash-icon");
const change_status_icon = document.getElementsByClassName("change_status_icon");
let uniqueId = 0;

add_book_button.addEventListener("click", display_form);
window.addEventListener("click", remove_form);
submit_button.addEventListener("click", get_form_values);

displayBooks(true)

document.body.getElementById