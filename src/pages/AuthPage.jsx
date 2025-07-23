// pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // only used in signup
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (isSignup) {
      if (!name.trim()) {
        toast.error("Name is required for signup");
        return;
      }

      const success = signup({ email, name });
      if (success) {
        toast.success("Signup successful!");
        navigate("/");
      } else {
        toast.error("User already exists. Try logging in.");
      }
    } else {
      const success = login({ email });
      if (success) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("No account found. Please sign up first.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isSignup ? "Sign Up" : "Login"}
      </h2>
      {isSignup && (
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 mb-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-2 mb-3 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="w-full bg-green-600 cursor-pointer text-white py-2 rounded hover:bg-green-700 transition"
        onClick={handleAuth}
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p className="text-sm mt-4 text-center">
        {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-green-600 hover:underline"
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
