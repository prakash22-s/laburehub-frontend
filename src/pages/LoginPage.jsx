import React, { useState } from 'react';
import { Mail, Lock, Facebook, Twitter, Chrome } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // In a real app, you would fetch the user's role from your database after validation.
    // For now, we simulate this by checking the email address.
    if (email.includes("worker")) {
      navigate("/worker-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden min-h-[500px]">
        
        {/* Left Side: Illustration */}
        <div className="hidden md:flex w-1/2 bg-white flex flex-col items-center justify-center p-8 border-r border-gray-50">
          <img 
            src="https://img.freepik.com/free-vector/remote-working-concept-illustration_114360-1202.jpg" 
            alt="Login Illustration" 
            className="w-full max-w-sm"
          />
          <button onClick={() => navigate("/")} className="mt-8 text-sm font-medium text-gray-800 underline underline-offset-4">
            Create an account
          </button>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-10">Log In</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative border-b-2 border-gray-200 focus-within:border-blue-400">
              <Mail className="absolute left-0 bottom-2 text-gray-400" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pb-2 outline-none bg-transparent" 
              />
            </div>

            <div className="relative border-b-2 border-gray-200 focus-within:border-blue-400">
              <Lock className="absolute left-0 bottom-2 text-gray-400" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pb-2 outline-none bg-transparent" 
              />
            </div>

            <button type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition duration-300">
              Log in
            </button>
          </form>

          <div className="mt-12 flex items-center justify-between">
            <span className="text-sm text-gray-600">Or login with</span>
            <div className="flex space-x-3">
              <button className="p-2 bg-[#3b5998] text-white rounded shadow-sm hover:opacity-90">
                <Facebook size={16} fill="currentColor" />
              </button>
              <button className="p-2 bg-[#1da1f2] text-white rounded shadow-sm hover:opacity-90">
                <Twitter size={16} fill="currentColor" />
              </button>
              <button className="p-2 bg-[#ea4335] text-white rounded shadow-sm hover:opacity-90">
                <Chrome size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;