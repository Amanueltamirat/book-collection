import express from 'express';
import protectRoute from '../middleware/protect.route.js';
import { getMe, signIn, signOut, signUp } from '../controllers/auth.controller.js';



const authRoute = express.Router();

authRoute.get('/getme',protectRoute,getMe);
authRoute.post('/signup', signUp);
authRoute.post('/signin', signIn);
authRoute.post('/signout', signOut);

export default authRoute