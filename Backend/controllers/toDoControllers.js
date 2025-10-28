import { toDoModel } from "../models/toDoModel.js";
export const taskInsert = async (req, res) => {
  try {
    const { task, isDone } = req.body;
    const data = new toDoModel({ task, isDone });
    await data.save();
    res.status(200).json({ success: true, message: "Added task successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Couldn't insert  task to the database",
    });
  }
};
//Controller to update the task
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = { $set: { ...req.body } };
    await toDoModel.findByIdAndUpdate(id, obj);

    res.status(200).json({ success: true, message: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//Controller to delete the existing id
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await toDoModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
//getData controller
export const getData = async (req, res) => {
  try {
    const data = await toDoModel.find();
    res.status(200).json({
      success: true,
      data,
      message: "Fetched all tasks from database",
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Can't fetched tasks from database" });
  }
};
