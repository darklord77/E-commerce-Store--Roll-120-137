import api from './api.js';

// Cart API calls
export const cartAPI = {
  // Get user cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (bookId, quantity = 1) => {
    const response = await api.post('/cart/add', { bookId, quantity });
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (bookId, quantity) => {
    const response = await api.put('/cart/update', { bookId, quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (bookId) => {
    const response = await api.delete(`/cart/remove/${bookId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  },
};

// Checkout API calls
export const checkoutAPI = {
  // Get checkout summary
  getCheckoutSummary: async () => {
    const response = await api.get('/checkout');
    return response.data;
  },

  // Validate checkout
  validateCheckout: async () => {
    const response = await api.post('/checkout/validate');
    return response.data;
  },

  // Process checkout
  processCheckout: async (checkoutData) => {
    const response = await api.post('/checkout/process', checkoutData);
    return response.data;
  },

  // Process payment
  processPayment: async (orderId, paymentResult) => {
    const response = await api.post(`/checkout/payment/${orderId}`, { paymentResult });
    return response.data;
  },
};