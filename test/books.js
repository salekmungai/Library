// books.js

// Book constructor function
function Book(title, author, description, imageUrl, link) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.imageUrl = imageUrl;
    this.link = link;
}

// Sample books array
const books = [
    new Book("Book Title 1", "Author Name 1", "This is a brief description of the book. It provides some context about the content.", "https://via.placeholder.com/400x250", "#"),
    new Book("Book Title 2", "Author Name 2", "This is a brief description of the book. It provides some context about the content.", "https://via.placeholder.com/400x250", "#"),
    new Book("Book Title 3", "Author Name 3", "This is a brief description of the book. It provides some context about the content.", "https://via.placeholder.com/400x250", "#"),
    new Book("Book Title 4", "Author Name 4", "This is a brief description of the book. It provides some context about the content.", "https://via.placeholder.com/400x250", "#")
];

function displayBooks(books) {
    const container = document.getElementById('book-container');
    container.innerHTML = ''; // Clear existing content

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'bg-white rounded-lg shadow-lg overflow-hidden flex flex-col';

        const bookImage = document.createElement('img');
        bookImage.src = book.imageUrl;
        bookImage.alt = book.title;
        bookImage.className = 'w-full h-56 object-cover';

        const bookContent = document.createElement('div');
        bookContent.className = 'p-4 flex-grow';

        const bookTitle = document.createElement('h2');
        bookTitle.className = 'text-xl font-semibold mb-2';
        bookTitle.innerText = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.className = 'text-gray-600 mb-4';
        bookAuthor.innerText = book.author;

        const bookDescription = document.createElement('p');
        bookDescription.className = 'text-gray-600 mb-4 flex-grow';
        bookDescription.innerText = book.description;

        const bookLink = document.createElement('a');
        bookLink.href = book.link;
        bookLink.className = 'inline-block mt-auto text-blue-500 hover:underline';
        bookLink.innerText = 'Read More';

        bookContent.appendChild(bookTitle);
        bookContent.appendChild(bookAuthor);
        bookContent.appendChild(bookDescription);
        bookContent.appendChild(bookLink);

        bookCard.appendChild(bookImage);
        bookCard.appendChild(bookContent);

        container.appendChild(bookCard);
    });
}

function addBook(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const link = document.getElementById('link').value;

    const newBook = new Book(title, author, description, imageUrl, link);

    books.push(newBook);
    displayBooks(books);

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

// Call the function to display books initially
displayBooks(books);
