import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './db/dbFunction.js';
import bodyParser from 'body-parser';
import BookRouter from './routes/book.route.js';

dotenv.config()

const app = express();


const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/books',BookRouter)




app.listen(PORT, ()=>{
    dbConnection()
    console.log('port running at:',PORT);
    
})