import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

import router from './routes/indexRouter.js';

const app = express();
const port = process.env.PORT || 7000;
app.use(cors());
app.use(express.json()); 
app.use('/api', router); 
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
