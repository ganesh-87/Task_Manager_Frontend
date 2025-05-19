import { useState } from "react";

const STATUS_OPTIONS = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const TaskForm = ({ initialTask = {}, onSubmit, isEditing = false }) => {
  const [task, setTask] = useState({
    title: initialTask.title || "",
    description: initialTask.description || "",
    deadline: initialTask.deadline || "",
    status: initialTask.status || STATUS_OPTIONS[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedTask = {
      ...task,
      deadline: task.deadline
        ? new Date(task.deadline).toISOString().split("T")[0] // 'YYYY-MM-DD' format
        : null,
    };

    onSubmit(formattedTask);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
        required
      />
      <input
        type="date"
        name="deadline"
        value={task.deadline}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
        required
      />

      {/* Status Dropdown */}
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
        required
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className={`${
          isEditing ? "bg-blue-500" : "bg-green-500"
        } text-white px-4 py-2 rounded-lg w-full`}
      >
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
