import express from 'express';
import {allBooks, createBook, deleteBook, getBookById, getfavoriteBook, getRecommendedBook, toggleFavoriteBook, updateBook} from '../controllers/book.controller.js'
import { authozieRoles } from '../middleware/role.middleware.js';
import protectRoute from '../middleware/protect.route.js';

const BookRouter = express.Router();

BookRouter.get('/',protectRoute,authozieRoles("admin"),allBooks)
BookRouter.get('/favorites', protectRoute,authozieRoles("user"),getfavoriteBook)
BookRouter.get('/book-recommended',protectRoute,authozieRoles("user"),getRecommendedBook);
BookRouter.get('/:id',getBookById);
BookRouter.put('/:id',updateBook);
BookRouter.patch('/toggle-favorite/:id',toggleFavoriteBook)
BookRouter.post('/create',protectRoute,authozieRoles("user"),createBook);
BookRouter.delete('/:id', deleteBook);

export default BookRouter