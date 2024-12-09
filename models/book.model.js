import mongoose from "mongoose";

// Define the Book schema
const bookSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: ['true','Please enter book!'], 
        trim: true      
    },
    // author: {
    //     type: String,
    //     required: ['true','Please enter  author name!'], 
    //     trim: true      
    // },
    author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
    isbn: {
        type: String,
        required: ['true','Please write isbn!'], 
        unique: true,   
        trim: true,
        min:13     
    },
    publishedYear: {
        type: Number,
        required: ['true','Please enter published year!'], 
        min: 0         
    },
    isFavorite:{
        type:Boolean,
        default:false
    }

}, {
    timestamps: true 
});

const Book = mongoose.model('Book', bookSchema);


export default Book;