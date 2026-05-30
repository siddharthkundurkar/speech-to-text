import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";

import connectDB
from "./config/db.js";


// Connect Database
connectDB();


// Export App
export default app;