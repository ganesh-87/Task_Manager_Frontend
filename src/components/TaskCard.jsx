import { useState } from "react";
import TaskForm from "./TaskForm";
import { updateTask, deleteTask } from "../services/api";

const TaskCard = ({ task, refreshTasks }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (updatedTask) => {
    await updateTask(task.id, updatedTask);
    setIsEditing(false);
    refreshTasks();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id);
      refreshTasks();
    }
  };
  const date=new Date();

  return (
    <div className="p-4 rounded-2xl shadow-md bg-white border border-gray-200">
      {isEditing ? (
        <TaskForm initialTask={task} onSubmit={handleUpdate} isEditing />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-blue-600">{task.title}</h2>
          <p className="text-gray-700 mt-2">{task.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span
              className={`px-2 py-1 rounded-md text-sm ${
                task.status === "COMPLETED"
                  ? "bg-green-500 text-white"
                  : task.status === "IN_PROGRESS"
                  ? "bg-orange-500 text-black"
                  : "bg-yellow-500 text-black"
              }`}
            >
              {task.status}
            </span>
            <div className="text-sm text-gray-500">
              DueDate: <span className="font-medium">{task.deadline}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
