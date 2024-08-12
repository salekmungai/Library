

const myLibrary = [
    new Book("48 Laws of Power","Robert Greene",480,"Yes"),
    new Book("The Lord of the Rings","J.R.R Tolkein",1077, "No"),
    new Book("The Alchemist","Paulo Coelho",177,"Yes"),
    new Book("To Kill a Mockingbird","Harper Lee",281,"Yes"),
];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function addBook(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
    displayBooks(myLibrary);

    // Clear the form
    document.getElementById('add-book-form').reset();

    // Close the modal
    document.getElementById('modal').classList.add('hidden');
}

document.getElementById('add-book-form').addEventListener('submit', addBook);
document.getElementById('open-modal-btn').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});


function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    myLibrary.forEach(book =>{
        
    })
}


