import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask, deleteTask } from "../services/api";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id);
        setTask(response.data);
        setEditedTask(response.data); // Initialize editedTask with existing data
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateTask(id, editedTask);
      alert("Task updated successfully!");
      setTask(editedTask); // Update UI without refetching
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      alert("Task deleted successfully!");
      navigate("/"); // Redirect to home after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!task) {
    return <p className="text-center text-red-500">Task not found!</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-blue-600">{task.title}</h2>
            <p className="text-gray-700 mt-2">{task.description}</p>
            <p className="text-sm text-gray-500 mt-4">
              Assigned to:{" "}
              <span className="font-medium">{task.assignedTo}</span>
            </p>
            <p className="text-sm text-gray-500">Due Date: {task.dueDate}</p>

            <div
              className={`mt-4 p-2 text-center rounded-md text-white ${
                task.status === "COMPLETED" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {task.status}
            </div>

            {/* Edit and Delete Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
