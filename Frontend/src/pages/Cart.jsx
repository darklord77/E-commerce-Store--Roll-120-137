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
                            Shopping Cart
                        </h1>
                        <p className="text-xl text-indigo-100">
                            Review your selected books and proceed to checkout
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {cart.items.length > 0 && (
                    <div className="flex justify-end mb-8">
                        <button
                            onClick={handleClearCart}
                            className="text-red-600 hover:text-red-800 text-sm bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            Clear Cart
                        </button>
                    </div>
                )}

                {cart.items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white rounded-2xl shadow-lg"
                    >
                        <div className="text-6xl mb-6">🛒</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 font-display">Your cart is empty</h3>
                        <p className="text-gray-600 mb-8 text-lg">Start shopping to add items to your cart</p>
                        <div className="space-y-3">
                            <Link
                                to="/books"
                                className="block bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 font-semibold"
                            >
                                Continue Shopping
                            </Link>
                            <Link
                                to="/my-orders"
                                className="block border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors font-semibold"
                            >
                                View Previous Orders
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                                className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
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
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold text-lg"
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <Link
                                    to="/my-orders"
                                    className="block text-center bg-gradient-to-r from-gray-100 to-indigo-50 text-gray-700 py-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 mt-4 transition-all font-medium"
                                >
                                    View Previous Orders
                                </Link>
                                
                                <Link
                                    to="/books"
                                    className="block text-center text-indigo-600 hover:text-purple-600 mt-4 transition-colors font-medium"
                                >
                                    Continue Shopping
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}