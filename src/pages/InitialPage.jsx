import { useNavigate } from "react-router-dom";

const InitialPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg text-center space-y-6 ">
        <div className="overflow-hidden whitespace-nowrap">
          <p className="animate-marquee text-xl font-bold text-grey-600">
            Welcome to Task Manager
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
