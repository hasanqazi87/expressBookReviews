const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let userExists = require('./auth_users.js').userExists;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!userExists(username)) {
            users.push({username: username, password: password});
            return res.status(200).send(`User ${username} created! You may now log in`);
        }
        return res.send(`User ${username} already exists! Please enter another`);
    }
    return res.status(404).send('Unable to register user');
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn]
    if (book) return res.send(JSON.stringify(books[req.params.isbn]));
    return res.send(`No book with ISBN ${isbn}!`);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filteredBooks = [];
    for (let isbn in books) {
        let book = books[isbn];
        if (book.author.toLowerCase().search(author.toLowerCase()) != -1) filteredBooks.push(book);
    }
    if (filteredBooks.length > 0) return res.send(JSON.stringify(filteredBooks));
    return res.send(`No books found with author ${author}!`);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filteredBooks = [];
    for (let isbn in books) {
        let book = books[isbn];
        if (book.title.toLowerCase().search(title.toLowerCase()) != -1) filteredBooks.push(book);
    }
    if (filteredBooks.length > 0) return res.send(JSON.stringify(filteredBooks));
    return res.send(`No books with title ${title}!`);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) return res.send(JSON.stringify(book.review));
    return res.send(`No book with ISBN ${isbn}!`);
});

module.exports.general = public_users;
