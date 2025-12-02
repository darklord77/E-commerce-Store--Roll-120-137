import Cart from '../models/cartModel.js';
import Book from '../models/bookModel.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
    
    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.book.toString() === bookId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ book: bookId, quantity });
    }

    // Calculate total amount
    await cart.populate('items.book');
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.book.price * item.quantity);
    }, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.book.toString() === bookId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.book.toString() !== bookId);
    } else {
      item.quantity = quantity;
    }

    // Calculate total amount
    await cart.populate('items.book');
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.book.price * item.quantity);
    }, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:bookId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.book.toString() !== bookId);

    // Calculate total amount
    await cart.populate('items.book');
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.book.price * item.quantity);
    }, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};