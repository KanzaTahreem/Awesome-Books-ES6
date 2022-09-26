import Book from './modules/book.js';
import Methods from './modules/method.js';
import { DateTime } from './modules/luxon.js';

window.onload = () => {
  const dateEl = document.querySelector('.date');
  setInterval(() => {
    const now = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
    dateEl.innerHTML = now;
  }, 1000);
};

const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addBtn = document.querySelector('#add-button');
const listEl = document.querySelector('.list');
const addNewEl = document.querySelector('.add-new');
const contactEl = document.querySelector('.contact');
const bookSection = document.querySelector('.all-books');
const formSection = document.querySelector('#form');
const contactSection = document.querySelector('#contact');

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

const menuButtonsUpdate = (button) => {
  document.querySelectorAll('.active').forEach((btn) => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
};

listEl.addEventListener('click', (e) => {
  bookSection.classList.remove('hidden');
  formSection.classList.add('hidden');
  contactSection.classList.add('hidden');
  menuButtonsUpdate(e.target);
});

addNewEl.addEventListener('click', (e) => {
  bookSection.classList.add('hidden');
  formSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
  menuButtonsUpdate(e.target);
});

contactEl.addEventListener('click', (e) => {
  bookSection.classList.add('hidden');
  formSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
  menuButtonsUpdate(e.target);
});