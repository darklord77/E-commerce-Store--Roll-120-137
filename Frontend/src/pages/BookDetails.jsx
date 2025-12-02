import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { bookAPI } from "../services/adminAPI";
import { cartAPI } from "../services/cartAPI";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState('description');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const data = await bookAPI.getBookById(id);
            setBook(data);
        } catch (error) {
            console.error('Error fetching book:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        setAddingToCart(true);
        try {
            await cartAPI.addToCart(book._id, quantity);
            alert(`${quantity} book(s) added to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert(error.response?.data?.message || 'Failed to add to cart');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading book details...</p>
                </motion.div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="text-6xl mb-4">📚</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Book not found</h2>
                    <Link
                        to="/books"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                    >
                        Back to Books
                    </Link>
                </motion.div>
            </div>
        );
    }

    const tabs = [
        { id: 'description', label: 'Description', icon: '📖' },
        { id: 'details', label: 'Details', icon: 'ℹ️' },
        { id: 'reviews', label: 'Reviews', icon: '⭐' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
            {/* Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/50 backdrop-blur-sm border-b"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link to="/books" className="text-indigo-600 hover:text-indigo-800 transition-colors">Books</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600 truncate">{book.title}</span>
                    </nav>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Book Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative group">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={book.image || "https://via.placeholder.com/400x600?text=No+Image"}
                                alt={book.title}
                                className="w-full max-w-md mx-auto h-auto object-cover rounded-2xl shadow-2xl"
                            />
                            
                            {/* Floating badges */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                            >
                                ${book.price}
                            </motion.div>
                            
                            {book.stock === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
                                >
                                    Out of Stock
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Book Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Title and Author */}
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-display"
                            >
                                {book.title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-gray-600 mb-2"
                            >
                                by <span className="font-semibold text-indigo-600">{book.author}</span>
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center space-x-4"
                            >
                                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    {book.category}
                                </span>
                                <span className="text-gray-500">
                                    Stock: <span className="font-semibold">{book.stock} available</span>
                                </span>
                            </motion.div>
                        </div>

                        {/* Price */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Price</p>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        ${book.price}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 mb-1">Rating</p>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 text-2xl">★★★★☆</span>
                                        <span className="text-gray-600 ml-2">(4.2)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quantity Selector */}
                        {book.stock > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold"
                                        >
                                            -
                                        </button>
                                        <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                                            className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Total: <span className="font-semibold text-indigo-600">${(book.price * quantity).toFixed(2)}</span>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                disabled={book.stock === 0 || addingToCart}
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {addingToCart ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding to Cart...
                                    </span>
                                ) : book.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="border-2 border-indigo-600 text-indigo-600 py-4 px-8 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300"
                            >
                                ❤️ Add to Wishlist
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Tabs Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-16"
                >
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${
                                    selectedTab === tab.id
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                                        : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-md'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-8"
                    >
                        {selectedTab === 'description' && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-display">Description</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {book.description || "This is an amazing book that will captivate your imagination and take you on an incredible journey. With compelling characters and an engaging plot, this book is perfect for readers who enjoy quality literature."}
                                </p>
                            </div>
                        )}

                        {selectedTab === 'details' && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">Book Details</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-semibold text-gray-700">Author:</span>
                                            <span className="text-gray-600">{book.author}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-semibold text-gray-700">Category:</span>
                                            <span className="text-gray-600">{book.category}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-semibold text-gray-700">Price:</span>
                                            <span className="text-gray-600">${book.price}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-semibold text-gray-700">Stock:</span>
                                            <span className="text-gray-600">{book.stock} available</span>
                                        </div>
                                        {book.isbn && (
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="font-semibold text-gray-700">ISBN:</span>
                                                <span className="text-gray-600">{book.isbn}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-semibold text-gray-700">Language:</span>
                                            <span className="text-gray-600">English</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === 'reviews' && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">Customer Reviews</h3>
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">⭐</div>
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">No reviews yet</h4>
                                    <p className="text-gray-600">Be the first to review this book!</p>
                                    <button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
                                        Write a Review
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-center"
                >
                    <Link
                        to="/books"
                        className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Books</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default BookDetails;