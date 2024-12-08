import Book from "../models/book.model.js";
import {body, check, validationResult} from 'express-validator'

export const allBooks = async(req,res)=>{
    try {
        const books = await Book.find();
        if(books.length === 0){
            return res.status(404).json({mesasge:"No books found"})
        }
        res.status(201).json(books)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 export const createBook = ( [check('title').notEmpty()],check('author').notEmpty(),check('isbn').isNumeric().isLength({min:13,max:13}),async(req, res) => {
    try {

          const errors = validationResult(req)
         if (!errors.isEmpty()) {  
          return res.status(401).json({errors: errors.array()})
         }
        const { title, author, isbn, publishedYear } = req.body;

        const newBook = new Book({ title, author, isbn, publishedYear });

        await newBook.save();

        res.status(201).json(newBook);

    } catch (error) {
        res.status(500).json({ message:error.message });
    }
})


export const getRecommendedBook = async(req,res)=>{
    try {
        const books = await Book.aggregate([
            {
                $sample:{
                    size:2,},

            },
            {
                $project:{
                    _id:1,
                    title:1,
                    author:1,
                    isbn:1,
                    publishedYear:1,
                    isFavorite:1
                }
            }
        ])
        res.status(201).json(books);

    } catch (error) {
        console.log('error in getting recommended Books');
        res.status(500).json({message:error.message})
    }
}
export const toggleFavoriteBook = async(req,res)=>{
    const {id} = req.params;
    try {
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message:'Book not found'})
        }
        book.isFavorite = !book.isFavorite;
        const updatedBook = await book.save();
         res.status(201).json(updatedBook);
    } catch (error) {
        console.log('error in toggling favorite book');
        res.status(500).json({message:error.message})
    }
}

export const getfavoriteBook = async(req,res)=>{
    try {
        let favoriteBooks = await Book.find({isFavorite:true}).lean();
        
        if(!favoriteBooks){
            return res.status(404).json({message:"No favorite book found"})
        }
        res.status(201).json(favoriteBooks);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const getBookById =    async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
      
        res.status(201).json(book);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const updateBook =  ([check('title').notEmpty()],check('author').notEmpty(),check('isbn').isNumeric().isLength({min:13,max:13}) ,async (req, res) => {
    try {

        const errors = validationResult(req)
         if (!errors.isEmpty()) {  
          return res.status(401).json({errors: errors.array()})
         }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
        res.status(201).json(updatedBook);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

export const deleteBook =  async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.status(201).json({message:'Book deleted successfully'}); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}