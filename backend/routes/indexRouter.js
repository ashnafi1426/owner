  import express from "express";
import signupRouter from "./signupRouter.js";

const router = express.Router();
router.use("/api", signupRouter);


export default router;
