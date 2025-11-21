import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-indigo-600">
                    BookVerse
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex space-x-6 font-medium">
                    <Link to="/" className="hover:text-indigo-600">
                        Home
                    </Link>
                    <Link to="/books" className="hover:text-indigo-600">
                        Books
                    </Link>

                    {/* New Services Link */}
                    <Link to="/services" className="hover:text-indigo-600">
                        Services
                    </Link>

                    <Link to="/about" className="hover:text-indigo-600">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-indigo-600">
                        Contact
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative">
                        <span className="material-icons">shopping_cart</span>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                            2
                        </span>
                    </Link>
                    <Link
                        to="/login"
                        className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
