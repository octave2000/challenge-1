import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import transactionRoutes from "./routes/transaction";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();
connectDB();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const swaggerDocument = YAML.load("./docs/swagger/swagger.yaml");
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
