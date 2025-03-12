import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-5xl text-red-500 font-bold mb-4">404</h1>
    <p className="text-gray-700 text-lg mb-4">Page not found!</p>
    <Link to="/" className="text-blue-500 underline">
      Go back home
    </Link>
  </div>
);

export default NotFound;
