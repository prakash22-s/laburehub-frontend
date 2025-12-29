import React, { useState } from 'react';
import { Mail, Lock, Briefcase, MapPin, CreditCard, Camera } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    workerType: '',
    location: '',
    aadhaar: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'user') {
      alert("Registration Successful! Redirecting to Login...");
      navigate("/login");
    } else {
      alert("Worker registration submitted for verification.");
      console.log("Worker Data:", formData);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        
        {/* Left Side: Context Info */}
        <div className="hidden md:flex w-full md:w-2/5 bg-blue-50 p-12 flex-col justify-center border-r border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-8">
            {role === 'user' 
              ? "Sign up to find the best services in your area." 
              : "Register as a professional and start growing your business today."}
          </p>
          <img 
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg" 
            alt="Illustration" 
            className="w-full h-auto rounded-lg mix-blend-multiply"
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-3/5 p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name" onChange={handleInputChange} className="border-b-2 p-2 outline-none focus:border-blue-400" required />
              <input name="lastName" placeholder="Last Name" onChange={handleInputChange} className="border-b-2 p-2 outline-none focus:border-blue-400" required />
            </div>

            <div className="relative border-b-2 focus-within:border-blue-400">
              <Mail className="absolute left-0 bottom-2 text-gray-400" size={18} />
              <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} className="w-full pl-8 pb-2 outline-none bg-transparent" required />
            </div>

            <div className="relative border-b-2 focus-within:border-blue-400">
              <Lock className="absolute left-0 bottom-2 text-gray-400" size={18} />
              <input name="password" type="password" placeholder="Password" onChange={handleInputChange} className="w-full pl-8 pb-2 outline-none bg-transparent" required />
            </div>

            <div className="py-2">
              <label className="text-sm font-semibold text-gray-500 block mb-2">Register as:</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setRole('user')} className={`flex-1 py-2 rounded-lg border-2 transition ${role === 'user' ? 'border-blue-500 bg-blue-50 text-blue-600 font-bold' : 'border-gray-200'}`}>User</button>
                <button type="button" onClick={() => setRole('worker')} className={`flex-1 py-2 rounded-lg border-2 transition ${role === 'worker' ? 'border-blue-500 bg-blue-50 text-blue-600 font-bold' : 'border-gray-200'}`}>Worker</button>
              </div>
            </div>

            {role === 'worker' && (
              <div className="space-y-5 pt-4 animate-in fade-in duration-500">
                <div className="relative border-b-2 focus-within:border-blue-400">
                  <Briefcase className="absolute left-0 bottom-2 text-gray-400" size={18} />
                  <input name="workerType" placeholder="Worker Type" onChange={handleInputChange} className="w-full pl-8 pb-2 outline-none bg-transparent" required />
                </div>
                <div className="relative border-b-2 focus-within:border-blue-400">
                  <MapPin className="absolute left-0 bottom-2 text-gray-400" size={18} />
                  <input name="location" placeholder="City / Location" onChange={handleInputChange} className="w-full pl-8 pb-2 outline-none bg-transparent" required />
                </div>
                <div className="relative border-b-2 focus-within:border-blue-400">
                  <CreditCard className="absolute left-0 bottom-2 text-gray-400" size={18} />
                  <input name="aadhaar" type="text" maxLength="12" placeholder="12-digit Aadhaar Number" onChange={handleInputChange} className="w-full pl-8 pb-2 outline-none bg-transparent" required />
                </div>
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                   <div className="text-center">
                      <Camera className="mx-auto text-gray-400 mb-2" size={24} />
                      <span className="text-xs text-gray-500">Live photo capture</span>
                   </div>
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg mt-6">
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;