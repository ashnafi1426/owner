import express from "express";
import signupRouter from "./signupRouter.js";
import loginRouter from "./loginRouter.js";
const router = express.Router();
router.use('/auth', loginRouter);  
router.use('/signup', signupRouter); 
export default router;
