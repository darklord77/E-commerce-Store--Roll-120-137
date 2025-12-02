import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bookAPI } from '../services/adminAPI';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.min(featuredBooks.length, 5));
        }, 4000);
        return () => clearInterval(timer);
    }, [featuredBooks]);

    const fetchBooks = async () => {
        try {
            const data = await bookAPI.getAllBooks();
            setBooks(data);
            setFeaturedBooks(data.slice(0, 5)); // First 5 books for slider
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Fiction', icon: '📚', color: 'from-purple-400 to-purple-600' },
        { name: 'Comics', icon: '🦸', color: 'from-red-400 to-red-600' },
        { name: 'Science', icon: '🔬', color: 'from-blue-400 to-blue-600' },
        { name: 'History', icon: '🏛️', color: 'from-yellow-400 to-yellow-600' },
        { name: 'Romance', icon: '💕', color: 'from-pink-400 to-pink-600' },
        { name: 'Mystery', icon: '🔍', color: 'from-gray-400 to-gray-600' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
                <div className="max-w-7xl mx-auto px-6 py-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                            BookVerse
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover endless stories, explore new worlds, and find your next favorite book in our curated collection
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/books"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Explore Books
                            </Link>
                            <Link
                                to="/about"
                                className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300"
                            >
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Books Slider */}
            {!loading && featuredBooks.length > 0 && (
                <section className="py-16 bg-white/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Books</h2>
                            <p className="text-gray-600">Discover our handpicked selection of amazing reads</p>
                        </motion.div>

                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                            {featuredBooks.map((book, index) => (
                                <motion.div
                                    key={book._id}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${
                                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${book.image || 'https://via.placeholder.com/800x400?text=Book'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
                                        <div>
                                            <h3 className="text-4xl font-bold mb-4">{book.title}</h3>
                                            <p className="text-xl mb-2">by {book.author}</p>
                                            <p className="text-lg mb-6">${book.price}</p>
                                            <Link
                                                to={`/books/${book._id}`}
                                                className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {/* Slider Indicators */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {featuredBooks.slice(0, 5).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${
                                            index === currentSlide ? 'bg-white' : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Categories Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Browse Categories</h2>
                        <p className="text-gray-600">Find books in your favorite genres</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                    >
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-white text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                                <div className="text-4xl mb-3">{category.icon}</div>
                                <h3 className="font-semibold text-lg">{category.name}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Best Sellers & New Arrivals */}
            {!loading && books.length > 0 && (
                <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Best Sellers */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                                    <span className="text-yellow-500 mr-3">🏆</span>
                                    Best Sellers
                                </h2>
                                <div className="space-y-4">
                                    {books.slice(0, 4).map((book, index) => (
                                    <Link key={book._id} to={`/books/${book._id}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                        >
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {index + 1}
                                            </div>
                                            <img
                                                src={book.image || 'https://via.placeholder.com/60x80?text=Book'}
                                                alt={book.title}
                                                className="w-12 h-16 object-cover rounded ml-4"
                                            />
                                            <div className="ml-4 flex-1">
                                                <h3 className="font-semibold text-gray-800">{book.title}</h3>
                                                <p className="text-gray-600 text-sm">{book.author}</p>
                                                <p className="text-indigo-600 font-semibold">${book.price}</p>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                                </div>
                            </motion.div>

                            {/* New Arrivals */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                                    <span className="text-green-500 mr-3">✨</span>
                                    New Arrivals
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {books.slice(-4).map((book, index) => (
                                        <Link key={book._id} to={`/books/${book._id}`}>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ y: -5 }}
                                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                                            >
                                            <img
                                                src={book.image || 'https://via.placeholder.com/200x250?text=Book'}
                                                alt={book.title}
                                                className="w-full h-32 object-cover"
                                            />
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{book.title}</h3>
                                                <p className="text-gray-600 text-xs mb-2">{book.author}</p>
                                                <p className="text-indigo-600 font-semibold">${book.price}</p>
                                            </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Start Reading?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8">
                            Join thousands of readers who have found their next favorite book with us
                        </p>
                        <Link
                            to="/books"
                            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 inline-block"
                        >
                            Start Exploring Now
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;