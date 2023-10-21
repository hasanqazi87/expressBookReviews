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
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.userExists = userExists;