import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TaskDashboard from "./pages/TaskDashboard"; // after login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
