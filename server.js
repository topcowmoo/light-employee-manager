// Import dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = expresss();

// Express middleware
app.use(express.urlencoded({ extend: false }));
app.use(express.json());






// connect to sql
// define questions
// handle user input