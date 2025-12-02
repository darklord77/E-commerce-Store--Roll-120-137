import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bookAPI } from '../../services/adminAPI';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create', 'edit', 'view'
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    isbn: '',
    image: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await bookAPI.getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = () => {
    setModalType('create');
    setFormData({
      title: '',
      author: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      isbn: '',
      image: '',
    });
    setShowModal(true);
  };

  const handleEditBook = (book) => {
    setModalType('edit');
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      description: book.description,
      category: book.category,
      stock: book.stock,
      isbn: book.isbn || '',
      image: book.image || '',
    });
    setShowModal(true);
  };

  const handleViewBook = (book) => {
    setModalType('view');
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookAPI.deleteBook(bookId);
        setBooks(books.filter(book => book._id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'create') {
        const newBook = await bookAPI.createBook(formData);
        setBooks([...books, newBook]);
      } else if (modalType === 'edit') {
        const updatedBook = await bookAPI.updateBook(selectedBook._id, formData);
        setBooks(books.map(book => 
          book._id === selectedBook._id ? updatedBook : book
        ));
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Book Management</h2>
        <button
          onClick={handleCreateBook}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add New Book
        </button>
      </div>

      {/* Books Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {books.map((book, index) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={book.image || "https://via.placeholder.com/300x400?text=No+Image"}
              alt={book.title}
              className="w-full h-80 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {book.title}
              </h3>
              <p className="text-gray-500 text-sm">{book.author}</p>
              <p className="text-indigo-600 font-semibold mt-2">
                ${book.price}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Stock: {book.stock}
              </p>
              
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleViewBook(book)}
                  className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  View Details
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditBook(book)}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {modalType === 'create' && 'Add New Book'}
                {modalType === 'edit' && 'Edit Book'}
                {modalType === 'view' && 'Book Details'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {modalType === 'view' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="text-sm text-gray-900">{selectedBook?.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <p className="text-sm text-gray-900">{selectedBook?.author}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <p className="text-sm text-gray-900">${selectedBook?.price}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="text-sm text-gray-900">{selectedBook?.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <p className="text-sm text-gray-900">{selectedBook?.stock}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900">{selectedBook?.description}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ISBN</label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/book-image.jpg"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {modalType === 'create' ? 'Create Book' : 'Update Book'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BookManagement;