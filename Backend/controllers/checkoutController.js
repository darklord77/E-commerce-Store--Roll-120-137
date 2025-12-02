import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';
import Book from '../models/bookModel.js';

// @desc    Get checkout summary
// @route   GET /api/checkout
// @access  Private
export const getCheckoutSummary = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate prices
    const itemsPrice = cart.items.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2)); // 15% tax
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
    const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

    res.json({
      cartItems: cart.items,
      itemsPrice: Number(itemsPrice.toFixed(2)),
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process checkout and create order
// @route   POST /api/checkout/process
// @access  Private
export const processCheckout = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Validate required fields
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Shipping address and payment method are required' });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Verify stock availability
    for (let item of cart.items) {
      if (item.book.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${item.book.title}. Available: ${item.book.stock}` 
        });
      }
    }

    // Calculate prices
    const itemsPrice = cart.items.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      book: item.book._id,
      title: item.book.title,
      price: item.book.price,
      quantity: item.quantity,
    }));

    // Create order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: Number(itemsPrice.toFixed(2)),
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Update book stock
    for (let item of cart.items) {
      await Book.findByIdAndUpdate(
        item.book._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: createdOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process payment
// @route   POST /api/checkout/payment/:orderId
// @access  Private
export const processPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentResult } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this order' });
    }

    if (order.isPaid) {
      return res.status(400).json({ message: 'Order is already paid' });
    }

    // Update order with payment info
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: paymentResult.id || `payment_${Date.now()}`,
      status: paymentResult.status || 'completed',
      update_time: paymentResult.update_time || new Date().toISOString(),
      email_address: paymentResult.email_address || req.user.email,
    };

    const updatedOrder = await order.save();

    res.json({
      message: 'Payment processed successfully',
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Validate checkout data
// @route   POST /api/checkout/validate
// @access  Private
export const validateCheckout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const errors = [];

    // Check stock for each item
    for (let item of cart.items) {
      if (!item.book) {
        errors.push(`Book not found for item`);
        continue;
      }
      
      if (item.book.stock < item.quantity) {
        errors.push(`Insufficient stock for ${item.book.title}. Available: ${item.book.stock}, Requested: ${item.quantity}`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ 
        message: 'Checkout validation failed',
        errors 
      });
    }

    res.json({ message: 'Checkout validation successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};