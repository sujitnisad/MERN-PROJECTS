import express from 'express';
import { isAuthenticated, resetPassword, sendResetOtp, sendVerifyOtp, userLogin, userLogout, userRegister, verifyEmail } from '../controller/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register',userRegister);
authRouter.post('/login',userLogin);
authRouter.post('/logout',userLogout);
authRouter.post('/send-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-otp',userAuth,verifyEmail);
authRouter.post('/authenticated',userAuth,isAuthenticated);
authRouter.post('/reset-otp',userAuth,sendResetOtp);
authRouter.post('/reset-password',userAuth,resetPassword);

export default authRouter;