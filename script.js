const books = document.querySelector('#books');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addBtn = document.querySelector('#add-button');
const parser = new DOMParser();

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

let bookList = [];

function addBookToUI(book) {
  const string = `
  <div>
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button type="submit" id="remove">Remove</button>
  </div>
  `;
  const bookElement = parser.parseFromString(string, 'text/html').body.firstChild;
  books.append(bookElement);
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newBook = new Book(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
  addBookToUI(newBook);
});