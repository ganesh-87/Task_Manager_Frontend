import TaskList from "../components/TaskList";
import TaskForm from "../Components/TaskForm";
import { createTask } from "../services/api";

const Home = () => {
  const handleTaskSubmit = async (taskData) => {
    try {
      await createTask(taskData);
      alert("Task added successfully!");
      location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Task Management System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Tasks
          </h2>
          <TaskList />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Create Task
          </h2>
          <TaskForm onSubmit={handleTaskSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Home;
