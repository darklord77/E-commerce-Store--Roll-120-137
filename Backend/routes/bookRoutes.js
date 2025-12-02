import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(protect, admin, createBook);

router.route('/:id')
  .get(getBookById)
  .put(protect, admin, updateBook)
  .delete(protect, admin, deleteBook);

export default router;