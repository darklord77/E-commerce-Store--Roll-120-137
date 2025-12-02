import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { bookAPI } from "../services/adminAPI";
import { cartAPI } from "../services/cartAPI";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(null);
    const navigate = useNavigate();

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

    const handleAddToCart = async (e, bookId) => {
        e.preventDefault();
        e.stopPropagation();
        
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        setAddingToCart(bookId);
        try {
            await cartAPI.addToCart(bookId, 1);
            alert('Book added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert(error.response?.data?.message || 'Failed to add to cart');
        } finally {
            setAddingToCart(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Explore Our Collection 📚
            </h2>

            {books.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No books available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <Link to={`/books/${book._id}`} key={book._id}>
                            <motion.div
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
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
                                    <button 
                                        onClick={(e) => handleAddToCart(e, book._id)}
                                        disabled={addingToCart === book._id || book.stock === 0}
                                        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                    >
                                        {addingToCart === book._id ? 'Adding...' : book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Books;