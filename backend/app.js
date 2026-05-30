import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api", uploadRoutes);


app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

export default app;