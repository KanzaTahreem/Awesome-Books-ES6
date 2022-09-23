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

function removeBookFromUI(book) {
  bookList = bookList.filter((item) => {
    if (book === item) {
      return false;
    } return true;
  });
}

function addBookToUI(book) {
  const string = `
  <div>
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button type="submit" id="remove-btn">Remove</button>
  </div>
  `;
  const bookElement = parser.parseFromString(string, 'text/html').body.firstChild;
  const removeBtn = bookElement.querySelector('#remove-btn');
  removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeBookFromUI();
    bookElement.remove(book);
  });
  books.append(bookElement);
}

function storeBook(newBook) {
  bookList.push(newBook);
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newBook = new Book(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
  storeBook(newBook);
  addBookToUI(newBook);
});