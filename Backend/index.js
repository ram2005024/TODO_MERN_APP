import dotenv from "dotenv";
import express from "express";
import { ConnectTODB } from "./config/dbConnection.js";
import { toDoRouter } from "./routes/toDoRoutes.js";
import cors from "cors";
dotenv.config();
ConnectTODB();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;
app.use("/todo", toDoRouter);
app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.listen(PORT, () => {
  console.log(`App succesfuly running on port ${PORT}`);
});
