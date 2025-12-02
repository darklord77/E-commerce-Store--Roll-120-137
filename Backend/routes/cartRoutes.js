import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.route('/')
  .get(protect, getCart);

router.route('/add')
  .post(protect, addToCart);

router.route('/update')
  .put(protect, updateCartItem);

router.route('/remove/:bookId')
  .delete(protect, removeFromCart);

router.route('/clear')
  .delete(protect, clearCart);

export default router;