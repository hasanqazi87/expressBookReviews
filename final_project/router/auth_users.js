const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username, password)=>{
    const filteredUsers = users.filter((user) => {
        return user.username == username && user.password == password;
    });
    return filteredUsers.length > 0;
}

const userExists = (username) => {
    const filteredUsers = users.filter((user) => {
        return user.username == username;
    });
    return filteredUsers.length > 0;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) return res.status(404).send('Error logging in');
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({data: password}, 'access', {expiresIn: 60 * 60});
        req.session.authorization = {accessToken, username};
        return res.status(200).send(`User ${username} successfully logged in!`);
    }
    return res.status(208).send('Invalid login. Check username and password')
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const username = req.body.username;
    const isbn = req.params.isbn;
    books[isbn].reviews[username] = {
        date: new Date().toDateString(),
        text: req.body.text,
    };
    res.send(`${username} successfully added review for book with ISBN ${isbn}!`)
});

// Delete a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const username = req.body.username;
    delete books[isbn].reviews[username];
    res.send(`${username} deleted review for book with ISBN ${isbn}!`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.userExists = userExists;