import React, { useState, useRef } from 'react';
import { Mail, Lock, Briefcase, MapPin, CreditCard, Camera, X, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [role, setRole] = useState('user');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    workerType: '',
    location: '',
    aadhaar: '',
  });

  // --- Camera Logic ---
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access denied. Please allow camera permissions in your browser.");
      setShowCamera(false);
    }
  };

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  // --- Form Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dashboards ke liye data save karna
    const fullName = `${formData.firstName} ${formData.lastName}`;
    localStorage.setItem("registeredRole", role);
    localStorage.setItem("registeredEmail", formData.email);
    localStorage.setItem("registeredPassword", formData.password);
    localStorage.setItem("registeredName", fullName);
    
    if (role === 'worker' && capturedImage) {
      localStorage.setItem("workerPhoto", capturedImage);
    }

    alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Registration Successful!`);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        
        {/* Left Side Decoration */}
        <div className="hidden md:flex w-2/5 bg-blue-50 p-12 flex-col justify-center border-r">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Join LabureHub</h2>
          <p className="text-gray-600 mb-8">Create an account to get started with our professional services community.</p>
          <img 
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg" 
            alt="Illustration" 
            className="w-full h-auto mix-blend-multiply"
          />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-3/5 p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                name="firstName" 
                placeholder="First Name" 
                onChange={handleInputChange}
                className="w-full border-b-2 p-2 outline-none focus:border-blue-400" 
                required 
              />
              <input 
                name="lastName" 
                placeholder="Last Name" 
                onChange={handleInputChange}
                className="w-full border-b-2 p-2 outline-none focus:border-blue-400" 
                required 
              />
            </div>

            <div className="relative border-b-2 focus-within:border-blue-400">
              <Mail className="absolute left-0 bottom-2 text-gray-400" size={18} />
              <input 
                name="email" 
                type="email" 
                placeholder="Email Address" 
                onChange={handleInputChange}
                className="w-full pl-8 pb-2 outline-none bg-transparent" 
                required 
              />
            </div>

            <div className="relative border-b-2 focus-within:border-blue-400">
              <Lock className="absolute left-0 bottom-2 text-gray-400" size={18} />
              <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                onChange={handleInputChange}
                className="w-full pl-8 pb-2 outline-none bg-transparent" 
                required 
              />
            </div>

            {/* Role Switcher */}
            <div className="py-2">
              <label className="text-sm font-semibold text-gray-500 block mb-2">Register as:</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`flex-1 py-2 rounded-lg border-2 transition ${role === 'user' ? 'border-blue-500 bg-blue-50 text-blue-600 font-bold' : 'border-gray-200'}`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setRole('worker')}
                  className={`flex-1 py-2 rounded-lg border-2 transition ${role === 'worker' ? 'border-blue-500 bg-blue-50 text-blue-600 font-bold' : 'border-gray-200'}`}
                >
                  Worker
                </button>
              </div>
            </div>

            {/* Worker Specific Fields */}
            {role === 'worker' && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <div className="relative border-b-2 focus-within:border-blue-400">
                  <Briefcase className="absolute left-0 bottom-2 text-gray-400" size={18} />
                  <input name="workerType" placeholder="Worker Type (e.g. Electrician)" onChange={handleInputChange} className="w-full pl-8 pb-2 outline-none" required />
                </div>
                <div className="relative border-b-2 focus-within:border-blue-400">
                  <MapPin className="absolute left-0 bottom-2 text-gray-400" size={18} />
                  <input name="location" placeholder="City / Location" onChange={handleInputChange} className="w-full pl-8 pb-2 outline-none" required />
                </div>
                <div className="relative border-b-2 focus-within:border-blue-400">
                  <CreditCard className="absolute left-0 bottom-2 text-gray-400" size={18} />
                  <input name="aadhaar" maxLength="12" placeholder="12-digit Aadhaar Number" onChange={handleInputChange} className="w-full pl-8 pb-2 outline-none" required />
                </div>

                {/* Live Photo Section */}
                <div 
                  onClick={startCamera} 
                  className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition cursor-pointer bg-gray-50 overflow-hidden"
                >
                  {capturedImage ? (
                    <img src={capturedImage} alt="Captured" className="h-24 rounded-lg shadow-sm" />
                  ) : (
                    <div className="text-center">
                      <Camera className="mx-auto text-gray-400 mb-1" size={24} />
                      <span className="text-xs text-gray-500 font-medium">Click to take Live Photo</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg transition mt-4"
            >
              Complete Registration
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <span onClick={() => navigate("/login")} className="text-blue-500 font-bold cursor-pointer hover:underline">Log In</span>
          </p>
        </div>
      </div>

      {/* Camera Modal Overlay */}
      {showCamera && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
          <div className="relative w-full max-w-2xl bg-black rounded-lg overflow-hidden shadow-2xl">
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
              <button 
                onClick={takePhoto} 
                className="bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 transition active:scale-95"
              >
                <Camera size={28} />
              </button>
              <button 
                onClick={stopCamera} 
                className="bg-red-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition active:scale-95"
              >
                <X size={28} />
              </button>
            </div>
          </div>
          <p className="text-white mt-4 font-medium">Position your face clearly in the frame</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;