const books = document.querySelector('#books');
const parser = new DOMParser();

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

export default Methods;