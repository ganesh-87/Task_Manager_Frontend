// src/pages/RegisterPage.jsx
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await axios.post("http://localhost:9095/api/auth/register", data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Username already taken");
    }
  };

  return (
    <AuthForm
      onSubmit={handleRegister}
      formTitle="Register"
      buttonText="Sign Up"
    />
  );
};

export default RegisterPage;
