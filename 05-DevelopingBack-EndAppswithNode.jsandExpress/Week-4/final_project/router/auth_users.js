const express = require('express');
const jwt = require('jsonwebtoken');
let { books, getBookByISBN } = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
        "username": "cagri",
        "password": "32"
    },
    {
        "username": "user1",
        "password": "pwd1"
    },
    {
        "username": "dareen",
        "password": "test"
    }
];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password)
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign(
            { data: password },
            'access',
            { expiresIn: 6000000 * 60 }
        );

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.query.username;
    //const book = Object.values(books).find(book => book.isbn === isbn);
    // Ensure that ISBN is parsed as an integer
    const booksArray = Object.values(books);
    console.log("Books array:", booksArray);
    // Find the book by ISBN in the array
    const book = getBookByISBN(isbn);
    // Use parseInt to ensure ISBN is a number
    console.log("Book retrieved:", book); // Debug retrieved book

    const bookReviews = book.reviews;
    console.log("Book reviews:", bookReviews);

    if (!book) {
        res.send(`Book with isbn ${isbn} not found.`);
    } else if (!username || !review) {
        res.send(`Review or user name is missing`);
    } else {
        //const userReview = bookReviews.find(review => review.username === username);
        // Check if the user already has a review
        if (bookReviews[username]) {
            // If user has already reviewed, update the review
            bookReviews[username] = review;
            return res.send(`Review updated for user ${username} on book with ISBN ${isbn}`);
        } else {
            // If user hasn't reviewed yet, add a new review
            bookReviews[username] = review;
            return res.send(`Review added for user ${username} on book with ISBN ${isbn}`);
        }
    }
});
// Delete a book review
// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username; // Retrieve username from session

    // Get the book by ISBN using the getBookByISBN function
    const book = getBookByISBN(isbn);

    // If book is not found, return an error
    if (!book) {
        return res.status(404).send(`Book with ISBN ${isbn} not found.`);
    }

    // If user is not authenticated, return an error
    if (!username) {
        return res.status(401).send(`User is not authenticated. Please log in.`);
    }

    const bookReviews = book.reviews;

    // Check if the user has a review for this book
    if (bookReviews[username]) {
        // If the user has a review, delete it
        delete bookReviews[username];
        return res.send(`Review deleted for user ${username} on book with ISBN ${isbn}`);
    } else {
        // If the user has not reviewed the book
        return res.send(`The user ${username} has no review on book with ISBN ${isbn}`);
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;