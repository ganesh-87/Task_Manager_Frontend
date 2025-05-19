import axios from "axios";

const API_BASE_URL = "http://localhost:9095/api/auth/tasks";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all tasks
export const getTasks = async () => {
  return await axios.get(API_BASE_URL, getAuthHeaders());
};

// Get a single task by ID
export const getTaskById = async (id) => {
  return await axios.get(`${API_BASE_URL}/${id}`, getAuthHeaders());
};

// Create a new task
export const createTask = async (taskData) => {
  return await axios.post(API_BASE_URL, taskData, getAuthHeaders());
};

// Update an existing task
export const updateTask = async (id, updatedData) => {
  return await axios.put(
    `${API_BASE_URL}/${id}`,
    updatedData,
    getAuthHeaders()
  );
};

// Delete a task
export const deleteTask = async (id) => {
  return await axios.delete(`${API_BASE_URL}/${id}`, getAuthHeaders());
};

//Create Task with AI
export const AiTask = async (taskData) => {
  return await axios.post(
    `http://localhost:9095/api/auth/nlp-task`,
    taskData,
    getAuthHeaders()
  );
};
