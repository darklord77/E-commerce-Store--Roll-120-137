import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMyOrders();
  }, [navigate]);

  const fetchMyOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/orders/myorders', {
        credentials: 'include',
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
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
              My Orders
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Track and manage your book orders
            </p>
            <Link
              to="/books"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 inline-block"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-2xl shadow-lg"
          >
            <div className="text-6xl mb-6">📄</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-display">No orders yet</h3>
            <p className="text-gray-600 mb-8 text-lg">You haven't placed any orders yet</p>
            <Link
              to="/books"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 font-semibold"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order._id.slice(-6)}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        order.isDelivered 
                          ? 'bg-green-100 text-green-800' 
                          : order.isPaid 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.isDelivered ? 'Delivered' : order.isPaid ? 'Processing' : 'Pending'}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${order.totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {order.orderItems.length} item(s) • {order.paymentMethod}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                      </div>
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mt-4 flex space-x-4 overflow-x-auto">
                    {order.orderItems.slice(0, 3).map((item) => (
                      <div key={item._id} className="flex-shrink-0 text-center">
                        <div className="w-16 h-20 bg-gray-200 rounded mb-2 overflow-hidden">
                          {item.book?.image ? (
                            <img 
                              src={item.book.image} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-xs text-gray-500">📚</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate w-16">{item.title}</p>
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="flex-shrink-0 text-center">
                        <div className="w-16 h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <span className="text-xs text-gray-500">+{order.orderItems.length - 3}</span>
                        </div>
                        <p className="text-xs text-gray-600">more</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Order Detail Modal */}
        {showModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Order #{selectedOrder._id.slice(-6)}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Order Status:</span>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedOrder.isDelivered 
                        ? 'bg-green-100 text-green-800' 
                        : selectedOrder.isPaid 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedOrder.isDelivered ? 'Delivered' : selectedOrder.isPaid ? 'Processing' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                  {selectedOrder.deliveredAt && (
                    <p className="text-sm text-gray-600">
                      Delivered on {new Date(selectedOrder.deliveredAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Shipping Address */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingAddress.address}<br/>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}<br/>
                    {selectedOrder.shippingAddress.country}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.orderItems.map((item) => (
                      <div key={item._id} className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Price: ${item.price}</p>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Items Price:</span>
                      <span>${selectedOrder.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${selectedOrder.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${selectedOrder.taxPrice}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>${selectedOrder.totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Method</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.paymentMethod}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;