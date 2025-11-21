import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Books = () => {
    // Dummy data (you’ll replace this later with API data)
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const sampleBooks = [
            {
                _id: 1,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                price: 999,
                category: "Classic Literature",
                image:
                    "https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                _id: 2,
                title: "Atomic Habits",
                author: "James Clear",
                price: 1499,
                category: "Self Help",
                image:
                    "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                _id: 3,
                title: "Harry Potter and the Sorcerer’s Stone",
                author: "J.K. Rowling",
                price: 1299,
                category: "Fantasy",
                image:
                    "https://m.media-amazon.com/images/I/71rOzy4cyAL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                _id: 4,
                title: "Rich Dad Poor Dad",
                author: "Robert Kiyosaki",
                price: 899,
                category: "Finance",
                image:
                    "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
            },
        ];
        setBooks(sampleBooks);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Explore Our Collection 📚
            </h2>

            {/* Book Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {books.map((book) => (
                    <Link to={`/books/${book._id}`}>
                        <motion.div
                            key={book._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-64 object-cover rounded-t-xl"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {book.title}
                                </h3>
                                <p className="text-gray-500 text-sm">{book.author}</p>
                                <p className="text-indigo-600 font-semibold mt-2">
                                    Rs. {book.price}
                                </p>
                                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Books;
