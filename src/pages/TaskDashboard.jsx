import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  AiTask,
} from "../services/api";
import Logout from "../components/Logout";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false); // State to toggle TaskForm
  const [editTask, setEditTask] = useState(null); // State to edit an existing task
  // Fetch tasks for the logged-in user
  const [showInput, setShowInput] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (editTask) {
        await updateTask(editTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      fetchTasks();
      setShowTaskForm(false);
      setEditTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleGenerateClick = async () => {
    if (taskInput.trim() !== "") {
      await AiTask(taskInput);
      fetchTasks();
      setTaskInput("");
      setShowInput(false); // Optional: hide input after generation
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Toggle TaskForm visibility (Create new task or edit existing task)
  const toggleTaskForm = () => {
    setShowTaskForm((prev) => !prev);
    setEditTask(null); // Reset edit task when toggling form
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []);
  const username = localStorage.getItem("username");
  return (
    <div>
      <div className="mt-10 px-20 space-y-6">
        {/* Button to create a new task */}
        <div className="flex items-center font-bold text-2xl px-3 text-zinc-700">
          Smart Task Management System for {username}
        </div>
        <div className="flex justify-between items-center px-3">
          <div className="flex space-x-6">
            <button
              onClick={toggleTaskForm}
              className="bg-blue-600 text-white py-2 px-4 rounded-3xl hover:bg-green-600"
            >
              Create Task
            </button>
            <button
              onClick={() => setShowInput((prev) => !prev)}
              className="bg-green-600 text-white py-2 px-4 rounded-3xl hover:bg-green-700"
            >
              Create Task With AI
            </button>
          </div>
          <Logout />
        </div>

        {/* Conditionally render TaskForm */}
        {showTaskForm && (
          <TaskForm onSubmit={handleCreateOrUpdate} existingTask={editTask} />
        )}

        {showInput && (
          <div className="mt-4 ml-3 flex items-center gap-2">
            <input
              type="text"
              className="border border-black py-2 px-3 rounded-md"
              placeholder="Enter task idea"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button
              onClick={handleGenerateClick}
              className="bg-purple-600 text-white py-2 px-4 rounded-3xl hover:bg-purple-700"
            >
              Generate Task
            </button>
          </div>
        )}

        {/* List of tasks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 ml-2">
          {tasks.length === 0 ? (
            <p className="text-red-600">No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={setEditTask}
                onDelete={handleDelete}
                refreshTasks={fetchTasks}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
