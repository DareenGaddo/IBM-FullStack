// Define a database of books
let books = {
    1: {
        "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {
            "user1": "Great book!"
        }
    },
    2: { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
    3: { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
    4: { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
    5: { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
    6: { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
    7: { "author": "Unknown", "title": "Nj\u00e1l's Saga", "reviews": {} },
    8: { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
    9: { "author": "Honor\u00e9 de Balzac", "title": "Le P\u00e8re Goriot", "reviews": {} },
    10: { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
};

// Function to fetch book details by ISBN
const getBookByISBN = (isbn) => {
    // Convert ISBN to a number since the keys are numeric
    const book = books[isbn];
    return book || null; // Return the book if found, otherwise null
};

// Function to fetch books by author
const getBooksByAuthor = (author) => {
    // Use Object.values to get an array of book objects and filter by author
    const booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
    return booksByAuthor; // Return an array of matching books
};

// Function to fetch books by title
const getBooksByTitle = (title) => {
    // Use Object.values to get an array of book objects and filter by title
    const booksByTitle = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());
    return booksByTitle; // Return an array of matching books
};

// Function to get a book's review by ISBN
const getBookReviewByISBN = (isbn) => {
    // Check if the ISBN exists in the books database
    const book = books[isbn];

    if (book) {
        return book.reviews; // Return the reviews for the book
    } else {
        return null; // Return null if the book isn't found
    }
};

// Async function to simulate fetching books
const getAllBooks = (callback) => {
    setTimeout(() => {
        // Simulating an async operation (e.g., database query or API request)
        callback(null, books); // Pass the books object as the second argument
    }, 2000); // Simulate a delay of 2 seconds
};

// Example usage of the async function with a callback
getAllBooks((err, booksData) => {
    if (err) {
        console.error("Error retrieving books:", err);
    } else {
        console.log("Books retrieved successfully:", booksData);
    }
});


// Function to search for a book by ISBN using Promises
const searchBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        // Check if the ISBN exists in the books object
        const book = books[isbn];

        if (book) {
            // If the book is found, resolve the Promise with the book data
            resolve(book);
        } else {
            // If the book is not found, reject the Promise with an error message
            reject(`Book with ISBN ${isbn} not found.`);
        }
    });
};

// Example usage of the searchBookByISBN function with Promises
searchBookByISBN(1)
    .then((book) => {
        console.log("Book found:", book);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// Example with a non-existent ISBN
searchBookByISBN(10)
    .then((book) => {
        console.log("Book found:", book);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// Function to search for books by Author using Promises

const searchBookByAuthor = (author) => {
    return new Promise((resolve, reject) => {
        // Find books that match the author's name
        const booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());

        if (booksByAuthor.length > 0) {
            resolve(booksByAuthor);
        } else {
            reject(`No books found by author ${author}.`);
        }
    });
};

// Search by Author
searchBookByAuthor("Chinua Achebe")
    .then((books) => {
        console.log("Books found by author:", books);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    
// Function to search for books by Title using Promises
const searchBookByTitle = (title) => {
    return new Promise((resolve, reject) => {
        // Find books that match the title
        const booksByTitle = Object.values(books).filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

        if (booksByTitle.length > 0) {
            resolve(booksByTitle);
        } else {
            reject(`No books found with title ${title}.`);
        }
    });
};


// Search by Title
searchBookByTitle("The Divine Comedy")
    .then((books) => {
        console.log("Books found by title:", books);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// Export the database of books
module.exports = { books, getBookByISBN, getBooksByAuthor, getBooksByTitle, getBookReviewByISBN };
// Function to search for books by Author using Promises
