/* eslint-disable max-classes-per-file */

const books = document.querySelector('#books');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addBtn = document.querySelector('#add-button');
const listEl = document.querySelector('.list');
const addNewEl = document.querySelector('.add-new');
const contactEl = document.querySelector('.contact');
const bookSection = document.querySelector('.all-books');
const formSection = document.querySelector('#form');
const contactSection = document.querySelector('#contact');
const parser = new DOMParser();

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
class Methods {
  constructor() {
    this.bookList = [];
  }

  removeBookFromUI = (book) => {
    this.bookList = this.bookList.filter((item) => {
      if (book === item) {
        return false;
      } return true;
    });
    localStorage.setItem('bookArray', JSON.stringify(this.bookList));
  };

  addBookToUI = (book) => {
    const string = `
    <div class="book-row">
      <p>"${book.title}" by ${book.author}</p>
      <button type="submit" id="remove-btn">Remove</button>
    </div>
    `;
    const bookElement = parser.parseFromString(string, 'text/html').body.firstChild;
    const removeBtn = bookElement.querySelector('#remove-btn');
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeBookFromUI(book);
      bookElement.remove(book);
    });
    books.append(bookElement);
  }

  storeBook = (newBook) => {
    this.bookList.push(newBook);
    localStorage.setItem('bookArray', JSON.stringify(this.bookList));
  };
}

const method = new Methods();

const booksFromLocalStorage = localStorage.getItem('bookArray');
if (booksFromLocalStorage !== null) {
  const bookObjectList = JSON.parse(booksFromLocalStorage);
  bookObjectList.forEach((bookObject) => {
    const newBookObject = new Book(bookObject.title, bookObject.author);
    method.bookList.push(newBookObject);
    method.addBookToUI(newBookObject);
  });
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newBook = new Book(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
  method.storeBook(newBook);
  method.addBookToUI(newBook);
});

listEl.addEventListener('click', (e) => {
  bookSection.classList.remove('hidden');
  formSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

addNewEl.addEventListener('click', (e) => {
  bookSection.classList.add('hidden');
  formSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
});

contactEl.addEventListener('click', (e) => {
  bookSection.classList.add('hidden');
  formSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
});