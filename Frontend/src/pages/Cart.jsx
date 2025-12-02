import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cartAPI } from "../services/cartAPI";

export default function Cart() {
    const [cart, setCart] = useState({ items: [], totalAmount: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const data = await cartAPI.getCart();
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (bookId, quantity) => {
        try {
            const updatedCart = await cartAPI.updateCartItem(bookId, quantity);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleRemoveItem = async (bookId) => {
        try {
            const updatedCart = await cartAPI.removeFromCart(bookId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleClearCart = async () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            try {
                await cartAPI.clearCart();
                setCart({ items: [], totalAmount: 0 });
            } catch (error) {
                console.error('Error clearing cart:', error);
            }
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
        <div className="min-h-screen py-10 px-4 md:px-16 lg:px-24 bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    {cart.items.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="text-red-600 hover:text-red-800 text-sm"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

                {cart.items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white rounded-lg shadow-sm"
                    >
                        <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                        <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
                        <Link
                            to="/books"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {cart.items.map((item, index) => (
                                    <motion.div
                                        key={item.book._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
                                    >
                                        <img
                                            src={item.book.image || "https://via.placeholder.com/100x120?text=No+Image"}
                                            alt={item.book.title}
                                            className="w-20 h-24 object-cover rounded-lg"
                                        />
                                        <div className="ml-6 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.book.title}</h3>
                                            <p className="text-gray-600">by {item.book.author}</p>
                                            <p className="text-indigo-600 font-semibold mt-1">${item.book.price}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center border rounded-lg">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.book._id, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-1 border-x">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.book._id, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="font-semibold text-gray-900 w-20 text-right">
                                                ${(item.book.price * item.quantity).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => handleRemoveItem(item.book._id)}
                                                className="text-red-600 hover:text-red-800 p-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Cart Summary */}
                        <div className="w-full lg:w-96">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal ({cart.items.length} items)</span>
                                        <span className="font-semibold">${cart.totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-semibold">
                                            {cart.totalAmount > 100 ? 'Free' : '$10.00'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (15%)</span>
                                        <span className="font-semibold">${(cart.totalAmount * 0.15).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>${(cart.totalAmount + (cart.totalAmount > 100 ? 0 : 10) + (cart.totalAmount * 0.15)).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <Link
                                    to="/books"
                                    className="block text-center text-indigo-600 hover:text-indigo-800 mt-4 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}