import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { bookAPI } from "../services/adminAPI";
import { cartAPI } from "../services/cartAPI";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
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

    const categories = ["All", "Fiction", "Science", "History", "Romance", "Mystery", "Comics"];

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || 
                              book.category.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading amazing books...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
                            Discover Books
                        </h1>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Explore our curated collection of amazing books across all genres
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search books or authors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                            />
                            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                                        : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-md hover:shadow-lg'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Books Grid */}
                {filteredBooks.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No books found</h3>
                        <p className="text-gray-600">Try adjusting your search or category filter</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
                    >
                        {filteredBooks.map((book, index) => (
                            <BookCard
                                key={book._id}
                                book={book}
                                index={index}
                                addingToCart={addingToCart}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// Separate BookCard component for cursor tracking
const BookCard = ({ book, index, addingToCart, onAddToCart }) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const rotateXValue = (e.clientY - centerY) / 10;
        const rotateYValue = (centerX - e.clientX) / 10;
        
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <Link to={`/books/${book._id}`}>
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
                
                {/* Book Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                        src={book.image || "https://via.placeholder.com/300x400?text=No+Image"}
                        alt={book.title}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Stock Badge */}
                    {book.stock === 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Out of Stock
                        </div>
                    )}
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                        ${book.price}
                    </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">by {book.author}</p>
                    
                    {/* Category Tag */}
                    <div className="mb-4">
                        <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {book.category}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                        onClick={(e) => onAddToCart(e, book._id)}
                        disabled={addingToCart === book._id || book.stock === 0}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        {addingToCart === book._id ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </span>
                        ) : book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </motion.div>
        </Link>
    );
};

export default Books;