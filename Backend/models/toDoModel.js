import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  task: {
    required: true,
    type: String,
  },

  isDone: {
    type: Boolean,
    default: false,
  },
});
export const toDoModel = mongoose.model("toDoList", toDoSchema);
