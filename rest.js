// Task: Develop a RESTful API for managing a list of books using Express and MongoDB. The API should support the following operations:
// Create a new book
// Retrieve all books
// Retrieve a single book by ID
// Update a book by ID
// Delete a book by ID

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
});

const Book = mongoose.model('Book', bookSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/books', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
});

app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

app.get('/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.send(book);
});

app.put('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.send(book);
});

app.delete('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.send(book);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
