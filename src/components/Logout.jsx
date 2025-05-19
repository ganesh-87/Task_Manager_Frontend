import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth info
    localStorage.removeItem("token");
    // Redirect to login page
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 hover:bg-red-600 bg-amber-500 rounded-3xl text-amber-50"
    >
      Logout
    </button>
  );
};

export default Logout;
