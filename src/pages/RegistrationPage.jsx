import React, { useState } from "react";
import { Mail, Lock, Briefcase, MapPin, CreditCard, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    workerType: "",
    location: "",
    aadhaar: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <div className="flex gap-4 mb-4">
          <button onClick={() => setRole("user")} className={role === "user" ? "font-bold" : ""}>User</button>
          <button onClick={() => setRole("worker")} className={role === "worker" ? "font-bold" : ""}>Worker</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="firstName" placeholder="First Name" onChange={handleChange} className="border p-2 w-full" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-2 w-full" />
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />

          {role === "worker" && (
            <>
              <input name="workerType" placeholder="Worker Type" onChange={handleChange} className="border p-2 w-full" />
              <input name="location" placeholder="Location" onChange={handleChange} className="border p-2 w-full" />
              <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} className="border p-2 w-full" />
            </>
          )}

          <button className="bg-blue-500 text-white p-2 w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
