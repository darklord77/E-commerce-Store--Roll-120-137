import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  getCheckoutSummary,
  processCheckout,
  processPayment,
  validateCheckout,
} from '../controllers/checkoutController.js';

const router = express.Router();

router.route('/')
  .get(protect, getCheckoutSummary);

router.route('/validate')
  .post(protect, validateCheckout);

router.route('/process')
  .post(protect, processCheckout);

router.route('/payment/:orderId')
  .post(protect, processPayment);

export default router;