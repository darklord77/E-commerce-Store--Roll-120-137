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
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Book not found.</p>
                <Link to="/books" className="text-indigo-600 hover:underline mt-4 inline-block">
                    Back to Books
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-7xl mx-auto px-6 py-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left: Book Image */}
                <div className="shrink-0">
                    <img
                        src={book.image || "https://via.placeholder.com/320x480?text=No+Image"}
                        alt={book.title}
                        className="w-80 h-[480px] object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right: Book Info */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
                        <p className="text-gray-600 mt-2">by {book.author}</p>
                        <p className="text-indigo-600 font-semibold mt-4 text-xl">
                            ${book.price}
                        </p>
                        <p className="text-gray-700 mt-6 leading-relaxed">
                            {book.description}
                        </p>
                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-500">
                                Category: <span className="font-medium">{book.category}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Stock: <span className="font-medium">{book.stock} available</span>
                            </p>
                            {book.isbn && (
                                <p className="text-sm text-gray-500">
                                    ISBN: <span className="font-medium">{book.isbn}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    {book.stock > 0 && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-1 border rounded hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border rounded bg-gray-50">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                                    className="px-3 py-1 border rounded hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button 
                            onClick={handleAddToCart}
                            disabled={book.stock === 0 || addingToCart}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {addingToCart ? 'Adding...' : book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <Link
                            to="/books"
                            className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition"
                        >
                            Back to Books
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BookDetails;