import Book from '../models/bookModel.js';

// @desc    Get all books
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req, res) => {
    try {
        const { title, author, price, description, category, stock, isbn, image } = req.body;

        const book = new Book({
            title,
            author,
            price,
            description,
            category,
            stock,
            isbn,
            image,
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req, res) => {
    try {
        const { title, author, price, description, category, stock, isbn, image } = req.body;

        const book = await Book.findById(req.params.id);

        if (book) {
            book.title = title || book.title;
            book.author = author || book.author;
            book.price = price || book.price;
            book.description = description || book.description;
            book.category = category || book.category;
            book.stock = stock || book.stock;
            book.isbn = isbn || book.isbn;
            book.image = image || book.image;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            await Book.findByIdAndDelete(req.params.id);
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};