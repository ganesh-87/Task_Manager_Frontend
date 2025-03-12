import axios from "axios";

const API_BASE_URL = "https://task-manager-yt6c.onrender.com/api/tasks"; // Update URL if needed

// Get all tasks
export const getTasks = async () => {
  return await axios.get(API_BASE_URL);
};

// Get a single task by ID
export const getTaskById = async (id) => {
  return await axios.get(`${API_BASE_URL}/${id}`);
};

// Create a new task
export const createTask = async (taskData) => {
  return await axios.post(API_BASE_URL, taskData);
};

// Update an existing task
export const updateTask = async (id, updatedData) => {
  return await axios.put(`${API_BASE_URL}/${id}`, updatedData);
};

// Delete a task
export const deleteTask = async (id) => {
  return await axios.delete(`${API_BASE_URL}/${id}`);
};
