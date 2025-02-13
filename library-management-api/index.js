const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

let books = []; // This will store books

// 1️ Add a new book (POST /books)
app.post('/books', (req, res) => {
    const book = req.body;

    // Validate input
    if (!book.book_id || !book.title || !book.author || !book.genre || !book.year || !book.copies) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    books.push(book);
    res.status(201).json(book);
});

// 2️ Get all books (GET /books)
app.get('/books', (req, res) => {
    res.json(books);
});

// 3️ Get a specific book (GET /books/:id)
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.book_id === req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found!" });
    res.json(book);
});

// 4️ Update a book (PUT /books/:id)
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.book_id === req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found!" });

    Object.assign(book, req.body);
    res.json(book);
});

// 5️ Delete a book (DELETE /books/:id)
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.book_id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Book not found!" });

    books.splice(index, 1);
    res.json({ message: "Book deleted successfully!" });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
