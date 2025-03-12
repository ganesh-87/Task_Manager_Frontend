import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { getTasks } from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} refreshTasks={fetchTasks} />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
