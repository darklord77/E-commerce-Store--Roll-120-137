import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { checkoutAPI } from "../services/cartAPI";

export default function Checkout() {
    const [checkoutData, setCheckoutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        shippingAddress: {
            address: '',
            city: '',
            postalCode: '',
            country: ''
        },
        paymentMethod: 'CreditCard'
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchCheckoutData();
    }, []);

    const fetchCheckoutData = async () => {
        try {
            const data = await checkoutAPI.getCheckoutSummary();
            setCheckoutData(data);
        } catch (error) {
            console.error('Error fetching checkout data:', error);
            if (error.response?.status === 400) {
                navigate('/cart');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                shippingAddress: {
                    ...prev.shippingAddress,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const result = await checkoutAPI.processCheckout(formData);
            navigate('/orderconfirmation', { state: { order: result.order } });
        } catch (error) {
            console.error('Error processing checkout:', error);
            alert(error.response?.data?.message || 'Checkout failed');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!checkoutData) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Unable to load checkout data</p>
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
                            Checkout
                        </h1>
                        <p className="text-xl text-indigo-100">
                            Complete your order and get your books delivered
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Checkout Form */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-8"
                        >
                            <h2 className="text-2xl font-bold mb-8 text-gray-800 font-display">Shipping Information</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address.address"
                                        value={formData.shippingAddress.address}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="address.city"
                                            value={formData.shippingAddress.city}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            name="address.postalCode"
                                            value={formData.shippingAddress.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="address.country"
                                        value={formData.shippingAddress.country}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payment Method
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="CreditCard">Credit Card</option>
                                        <option value="PayPal">PayPal</option>
                                        <option value="Stripe">Stripe</option>
                                        <option value="Cash">Cash on Delivery</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold text-lg disabled:opacity-50"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing Order...
                                        </span>
                                    ) : 'Place Order'}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-6 font-display">Order Summary</h3>
                            
                            {/* Cart Items */}
                            <div className="space-y-4 mb-6">
                                {checkoutData.cartItems.map((item) => (
                                    <div key={item.book._id} className="flex items-center space-x-4">
                                        <img
                                            src={item.book.image || "https://via.placeholder.com/60x80?text=No+Image"}
                                            alt={item.book.title}
                                            className="w-12 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">{item.book.title}</h4>
                                            <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-sm">${(item.book.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 border-t pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">${checkoutData.itemsPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {checkoutData.shippingPrice === 0 ? 'Free' : `$${checkoutData.shippingPrice}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-semibold">${checkoutData.taxPrice}</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${checkoutData.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}