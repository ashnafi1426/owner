import express from "express";
import signupRouter from "./signupRouter.js";
import loginRouter from "./loginRouter.js";
import postRoutes from "./postRoutes.js";
const router = express.Router();
router.use('/auth', loginRouter); 
router.use('/posts', postRoutes); 
router.use('/auth', signupRouter); 
export default router;
