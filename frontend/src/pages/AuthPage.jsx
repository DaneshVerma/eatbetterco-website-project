// pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi, signup as signupApi } from "../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // only used in signup
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);
      if (isSignup) {
        if (!name.trim()) {
          toast.error("Name is required for signup");
          return;
        }
        await signupApi({ email, password, name, role });
        toast.success("Signup successful!");
        navigate("/");
      } else {
        await loginApi({ email, password });
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 mt-20 bg-white shadow rounded'>
      <h2 className='text-xl font-bold mb-4 text-center'>
        {isSignup ? "Sign Up" : "Login"}
      </h2>
      {isSignup && (
        <>
          <input
            type='text'
            placeholder='Enter your name'
            className='w-full p-2 mb-3 border rounded'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='mb-3'>
            <label className='block text-sm font-medium mb-1'>Role</label>
            <select
              className='w-full p-2 border rounded'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value='User'>User</option>
              <option value='Admin'>Admin</option>
            </select>
          </div>
        </>
      )}
      <input
        type='email'
        placeholder='Enter your email'
        className='w-full p-2 mb-3 border rounded'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Enter your password'
        className='w-full p-2 mb-3 border rounded'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={`w-full bg-green-600 text-white py-2 rounded transition ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"
        }`}
        onClick={handleAuth}
        disabled={loading}
      >
        {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
      </button>

      <p className='text-sm mt-4 text-center'>
        {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className='text-green-600 hover:underline'
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
