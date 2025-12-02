import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { cartAPI } from "../services/cartAPI";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            fetchCartCount();
        }
    }, []);

    const fetchCartCount = async () => {
        try {
            const cart = await cartAPI.getCart();
            const count = cart.items.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            // Even if API call fails, clear local state
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        }
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-indigo-600">
                    BookVerse
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex space-x-6 font-medium">
                    <Link to="/" className="hover:text-indigo-600 transition-colors">
                        Home
                    </Link>
                    <Link to="/books" className="hover:text-indigo-600 transition-colors">
                        Books
                    </Link>
                    <Link to="/services" className="hover:text-indigo-600 transition-colors">
                        Services
                    </Link>
                    <Link to="/about" className="hover:text-indigo-600 transition-colors">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-indigo-600 transition-colors">
                        Contact
                    </Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors">
                            Admin Panel
                        </Link>
                    )}
                </div>

                {/* Icons & User Menu */}
                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative hover:text-indigo-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>
                    
                    {user ? (
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-700">Hi, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <Link
                                to="/login"
                                className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="border border-indigo-600 text-indigo-600 px-4 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-6 py-4 space-y-3">
                        <Link to="/" className="block hover:text-indigo-600 transition-colors">
                            Home
                        </Link>
                        <Link to="/books" className="block hover:text-indigo-600 transition-colors">
                            Books
                        </Link>
                        <Link to="/services" className="block hover:text-indigo-600 transition-colors">
                            Services
                        </Link>
                        <Link to="/about" className="block hover:text-indigo-600 transition-colors">
                            About
                        </Link>
                        <Link to="/contact" className="block hover:text-indigo-600 transition-colors">
                            Contact
                        </Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="block bg-red-100 text-red-700 px-3 py-2 rounded-lg">
                                Admin Panel
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
