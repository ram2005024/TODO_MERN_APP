import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { FaPlus, FaSearch, FaCheck, FaPenAlt, FaTrash } from "react-icons/fa";
const Home = () => {
  const [text, setText] = useState("");
  const [isEdit, setEdit] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [copyTask, setCopy] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("https://todo-mern-app-mrq8-api.vercel.app/todo");
    setTasks(data.data);
    setCopy(data.data);
  };
  const handleAddTask = async () => {
    const obj = {
      task: text,
      isDone: false,
    };
    try {
      const { data } = await axios.post("https://todo-mern-app-mrq8-api.vercel.app/todo", obj);
      if (data.success) {
        toast.success(data.message);
        setText("");
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleTask = async () => {
    if (isEdit && text) {
      const obj = {
        id: isEdit._id,
        task: text,
      };
      try {
        const { data } = await axios.put(
          `https://todo-mern-app-mrq8-api.vercel.app/todo/${isEdit._id}`,
          obj
        );
        if (data.success) {
          toast.success(data.message);
          fetchData();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else if (!isEdit && text) {
      await handleAddTask();
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete("https://todo-mern-app-mrq8-api.vercel.app/todo/" + id);
      if (data.success) {
        toast.success(data.message);
        setText("");
        setEdit(null);
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleCheckAndUpdate = async (id, nameOfTask, isDone) => {
    const obj = {
      task: nameOfTask,
      isDone: !isDone,
    };
    try {
      const { data } = await axios.put(`https://todo-mern-app-mrq8-api.vercel.app/todo/${id}`, obj);
      if (data.success) {
        toast.success(data.message);
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const searchedTasks = copyTask.filter((items) =>
      items.task.toLowerCase().includes(term)
    );

    setTasks(searchedTasks);
  };
  useEffect(() => {
    if (isEdit) {
      setText(isEdit.task);
    } else {
      setText("");
    }
  }, [isEdit]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <h1 className="text-2xl font-semibold underline-offset-8 mb-8">
        To Do App
      </h1>
      <div>
        <div className="flex gap-4 mb-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter the task"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            />
            <button
              type="button"
              onClick={handleTask}
              className="bg-indigo-500 p-3 rounded-xl cursor-pointer"
            >
              <FaPlus className="text-white" />
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter the task you are looking for?"
              onChange={handleSearch}
              className="p-2 border rounded-lg text-sm"
            />
            <button className="bg-green-700 p-3 rounded-xl cursor-pointer">
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3 ">
          {tasks.length !== 0 ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between p-2 border rounded-lg bg-zinc-100"
              >
                <span className={task.isDone && "line-through"}>
                  {task.task}
                </span>
                <div className="flex gap-2">
                  <button
                    className="p-2 bg-green-500 rounded-lg cursor-pointer"
                    onClick={() =>
                      handleCheckAndUpdate(task._id, task.task, task.isDone)
                    }
                  >
                    <FaCheck className="text-white" />
                  </button>
                  <button
                    className="p-2 bg-indigo-500 rounded-lg cursor-pointer"
                    onClick={() => setEdit(task)}
                  >
                    <FaPenAlt className="text-white" />
                  </button>
                  <button
                    type="button"
                    className="p-2 bg-red-700 rounded-lg cursor-pointer"
                    onClick={() => handleDelete(task._id)}
                  >
                    <FaTrash className="text-white" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No records found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
