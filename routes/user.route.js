import express from 'express';
import protectRoute from '../middleware/protect.route.js';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.get('/profile/:username',protectRoute,getUserProfile);
userRoute.post('/update',protectRoute,updateUserProfile);

export default userRoute