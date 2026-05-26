import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";

import connectDB from "./config/db.js";


// Connect Database
connectDB();


// Start Server
app.listen(5000, () => {

  console.log("Server running on port 5000");

});