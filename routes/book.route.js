import express from 'express';
import {allBooks, createBook, deleteBook, getBookById, getfavoriteBook, getRecommendedBook, toggleFavoriteBook, updateBook} from '../controllers/book.controller.js'

const BookRouter = express.Router();

BookRouter.get('/',allBooks)
BookRouter.get('/favorites',getfavoriteBook)
BookRouter.get('/book-recommended',getRecommendedBook);
BookRouter.get('/:id',getBookById);
BookRouter.patch('/:id',updateBook);
BookRouter.patch('/toggle-favorite/:id',toggleFavoriteBook)
BookRouter.post('/create',createBook)
BookRouter.delete('/:id', deleteBook)

export default BookRouter