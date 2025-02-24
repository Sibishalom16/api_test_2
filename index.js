const express = require('express');

const app = express();
app.use(express.json()); // Use express's built-in JSON parsing middleware

const PORT = process.env.PORT || 3000;

let books = []; // This will store our books in memory for this example

// Create a New Book (POST)
app.post('/books', (req, res) => {
  const { book_id, title, author, genre, year, copies } = req.body;

  // Validation check for required fields
  if (!book_id || !title || !author || !genre || !year || !copies) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newBook = { book_id, title, author, genre, year, copies };
  books.push(newBook); // Add new book to the array

  res.status(201).json(newBook); // Send back the newly added book
});

// Retrieve All Books (GET)
app.get('/books', (req, res) => {
  res.status(200).json(books); // Return all books
});

// Retrieve a Specific Book by ID (GET)
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.book_id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.status(200).json(book); // Return the book found by ID
});

// Update Book Information (PUT)
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.book_id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Update book details with any provided values
  const { title, author, genre, year, copies } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (year) book.year = year;
  if (copies) book.copies = copies;

  res.status(200).json(book); // Return updated book
});

// Delete a Book (DELETE)
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.book_id === req.params.id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1); // Remove the book from the array
  res.status(200).json({ message: 'Book deleted successfully' }); // Return success message
});

app.listen(PORT, () => {
  console.log(Server is running on port http://localhost:${PORT});
});

