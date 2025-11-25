import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import signupRoutes from "./routes/signupRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", signupRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
