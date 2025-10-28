import express from "express";
import {
  deleteTask,
  getData,
  taskInsert,
  updateTask,
} from "../controllers/toDoControllers.js";
export const toDoRouter = express.Router();
// Api when the post the task in server
toDoRouter.post("/", taskInsert);
toDoRouter.put("/:id", updateTask);
toDoRouter.delete("/:id", deleteTask);
toDoRouter.get("/", getData);
