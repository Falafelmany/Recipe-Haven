const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);
    db.run(`CREATE TABLE recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        ingredients TEXT,
        instructions TEXT,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
