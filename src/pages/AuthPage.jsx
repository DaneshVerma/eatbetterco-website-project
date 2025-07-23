// pages/AuthPage.jsx
import { useState } from "react";
import { login } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    login(email); // save to localStorage
    navigate("/"); // redirect to home
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-[#fff9f0]'>
      <div className='bg-white rounded-lg shadow-md p-8 w-full max-w-md'>
        <h2 className='text-2xl font-serif text-center mb-6'>
          {isLogin ? "Welcome Back" : "Join the Eat Better Club"}
        </h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {!isLogin && (
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              className='px-4 py-2 border rounded focus:outline-none'
            />
          )}
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='px-4 py-2 border rounded focus:outline-none'
          />
          <input
            type='password'
            placeholder='Password'
            className='px-4 py-2 border rounded focus:outline-none'
          />
          <button
            type='submit'
            className='bg-[#2f4f2f] text-white py-2 rounded hover:bg-[#263e26] transition'
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600'>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className='text-green-800 font-medium ml-1 hover:underline'
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
