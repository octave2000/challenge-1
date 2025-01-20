import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import transactionRoutes from "./routes/transaction";

dotenv.config();
connectDB();

const app = express();
app.use(express.json({ limit: "10mb" })); // For JSON payloads
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use("/api", transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
