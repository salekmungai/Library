// Book constructor
function Book(title, author, pages, imageUrl, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.imageUrl = imageUrl;
    this.read = read;
}

// Sample books
const books = [
    new Book("The Alchemist", "Paulo Coelho", 177, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg", "yes"),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, "https://m.media-amazon.com/images/I/51IXWZzlgSL._SY445_SX342_.jpg", "no"),
    new Book("1984", "George Orwell", 328, "https://m.media-amazon.com/images/I/71rpa1-kyvL._SY342_.jpg", "no"),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, "https://m.media-amazon.com/images/I/61dRoDRubtL._AC_UY218_.jpg", "yes"),
    new Book("Moby Dick", "Herman Melville", 635, "https://m.media-amazon.com/images/I/61f8m4caUPL._AC_UY218_.jpg", "no"),
    new Book("Pride and Prejudice", "Jane Austen", 279, "https://m.media-amazon.com/images/I/71fwA1RuPkL._AC_UY218_.jpg", "yes"),
    new Book("The Philosophy of Money", "Georg Simmel", 640, "https://m.media-amazon.com/images/I/6175bztLdWL._AC_UY218_.jpg", "yes"),
    new Book("The Catcher in the Rye", "J.D. Salinger", 214, "https://m.media-amazon.com/images/I/71nXPGovoTL._AC_UY218_.jpg", "no"),
    new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, "https://m.media-amazon.com/images/I/81nV6x2ey4L._AC_UY218_.jpg", "yes"),
    new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 321, "https://m.media-amazon.com/images/I/91ocU8970hL.jpg", "yes"),
    new Book("The Hobbit", "J.R.R. Tolkien", 310, "https://m.media-amazon.com/images/I/91ZX8zNpwZL._AC_UY218_.jpg", "yes"),
    new Book("Atomic Habits", "James Clear", 320, "https://m.media-amazon.com/images/I/51-uspgqWIL._SY445_.jpg", "yes"),
];

// Function to display books
function displayBooks(books) {
    const container = document.getElementById('book-container');
    container.innerHTML = '';

    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'bg-white rounded-lg shadow-lg overflow-hidden flex flex-col';

        const bookImage = document.createElement('img');
        bookImage.src = book.imageUrl;
        bookImage.alt = book.title;
        bookImage.className = 'w-full h-56 object-contain';

        const bookContent = document.createElement('div');
        bookContent.className = 'p-4 flex-grow';

        const bookTitle = document.createElement('h2');
        bookTitle.className = 'text-xl font-semibold mb-2';
        bookTitle.innerText = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.className = 'text-gray-600 mb-4';
        bookAuthor.innerText = book.author;

        const bookPages = document.createElement('p');
        bookPages.className = 'text-gray-600 mb-4 flex-grow';
        bookPages.innerText = `Pages: ${book.pages}`;

        const bookRead = document.createElement('p');
        bookRead.className = 'inline-block mt-auto text-gray-700'; // Changed to gray
        bookRead.innerText = `Read: ${book.read}`;

        // Edit and Delete buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex justify-end space-x-2 mt-4';

        const editButton = document.createElement('button');
        editButton.className = 'bg-blue-600 text-white px-2 py-1 rounded hover:bg-yellow-600';
        editButton.innerText = 'Edit';
        editButton.onclick = () => openEditModal(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'bg-red-600 text-white px-2 py-1 rounded hover:bg-red-600';
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteBook(index);

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        bookContent.appendChild(bookTitle);
        bookContent.appendChild(bookAuthor);
        bookContent.appendChild(bookPages);
        bookContent.appendChild(bookRead);
        bookContent.appendChild(buttonContainer);

        bookCard.appendChild(bookImage);
        bookCard.appendChild(bookContent);

        container.appendChild(bookCard);
    });
}

// Search and filter functionality
function searchAndFilterBooks() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filterStatus = document.getElementById('filter-status').value;

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                              book.author.toLowerCase().includes(searchTerm);
        const matchesStatus = filterStatus === "" || book.read === filterStatus;

        return matchesSearch && matchesStatus;
    });

    displayBooks(filteredBooks);
}

// Open edit modal with pre-filled data
function openEditModal(index) {
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('pages').value = book.pages;
    document.getElementById('imageUrl').value = book.imageUrl;
    document.getElementById('read').value = book.read;
    editingIndex = index;
    document.getElementById('modal').classList.remove('hidden');
}

// Delete a book
function deleteBook(index) {
    books.splice(index, 1);
    searchAndFilterBooks(); // Update the displayed list
}

// Save changes from the edit modal
function addBook(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const read = document.getElementById('read').value;

    if (editingIndex >= 0) {
        // Update existing book
        books[editingIndex] = new Book(title, author, pages, imageUrl, read);
        editingIndex = -1;
    } else {
        // Add new book
        const newBook = new Book(title, author, pages, imageUrl, read);
        books.push(newBook);
    }

    searchAndFilterBooks();
    document.getElementById('add-book-form').reset();
    document.getElementById('modal').classList.add('hidden');
}

// Event listeners
document.getElementById('add-book-form').addEventListener('submit', addBook);
document.getElementById('open-modal-btn').addEventListener('click', () => {
    editingIndex = -1; // Reset editing index for adding new book
    document.getElementById('modal').classList.remove('hidden');
});
document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});
document.getElementById('search-bar').addEventListener('input', searchAndFilterBooks);
document.getElementById('filter-status').addEventListener('change', searchAndFilterBooks);

// Initialize display
searchAndFilterBooks();
