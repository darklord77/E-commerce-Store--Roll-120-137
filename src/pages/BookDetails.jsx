import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        // Dummy book data — later replaced with API call
        const sampleBooks = [
            {
                _id: "1",
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                category: "Classic Literature",
                description:
                    "A novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the mysterious Jay Gatsby.",
                price: 999,
                image:
                    "https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                _id: "2",
                title: "Atomic Habits",
                author: "James Clear",
                category: "Self Help",
                description:
                    "A guide to building good habits and breaking bad ones through small, incremental changes that lead to remarkable results.",
                price: 1499,
                image:
                    "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                _id: "3",
                title: "Harry Potter and the Sorcerer’s Stone",
                author: "J.K. Rowling",
                category: "Fantasy",
                description:
                    "The first book in the Harry Potter series, introducing the young wizard Harry and his adventures at Hogwarts School of Witchcraft and Wizardry.",
                price: 1299,
                image:
                    "https://m.media-amazon.com/images/I/71rOzy4cyAL._AC_UF1000,1000_QL80_.jpg",
            },
        ];

        const found = sampleBooks.find((item) => item._id === id);
        setBook(found);
    }, [id]);

    if (!book) return <div className="text-center py-20">Book not found.</div>;

    return (
        <motion.div
            className="max-w-7xl mx-auto px-6 py-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left: Book Image */}
                <div className="flex-shrink-0">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-80 h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right: Book Info */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
                        <p className="text-gray-600 mt-2">by {book.author}</p>
                        <p className="text-indigo-600 font-semibold mt-4 text-xl">
                            Rs. {book.price}
                        </p>
                        <p className="text-gray-700 mt-6 leading-relaxed">
                            {book.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Category: <span className="font-medium">{book.category}</span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                            Add to Cart
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
