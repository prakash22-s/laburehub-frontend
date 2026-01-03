import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Star, Flame, Crown, Target, DollarSign, Clock, MapPin, Phone, CheckCircle2, Trophy, Camera, Video, ChevronRight } from 'lucide-react';

export default function WorkerDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [workerData, setWorkerData] = useState({ name: "Worker", image: null });
  const [jobs, setJobs] = useState([
    { id: '1', customer: 'Priya Deshmukh', service: 'Electrical Panel Install', location: 'Andheri West', budget: '₹2,500', urgency: 'high', description: 'Urgent panel work needed for apartment.', rating: 4.8 },
    { id: '2', customer: 'Rahul Verma', service: 'Kitchen Wiring', location: 'Malad East', budget: '₹1,500', urgency: 'medium', description: 'Lights flickering in kitchen area.', rating: 4.5 }
  ]);

  // Problem 1 Fixed: Registration ka data fetch karna
  useEffect(() => {
    const savedName = localStorage.getItem("registeredName") || "Worker";
    const savedImage = localStorage.getItem("workerPhoto"); // Agar photo save ki ho
    setWorkerData({ name: savedName, image: savedImage });
  }, []);

  // Problem 3 Fixed: Job accept karne ka logic
  const handleAcceptJob = (id, customer) => {
    alert(`Job Accepted! Calling ${customer}...`);
    // List se job hatane ke liye (optional)
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={workerData.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=worker"} 
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover" 
                alt="Profile"
              />
              {/* Problem 2 Fixed: Online Status Indicator */}
              {isAvailable && (
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <Zap size={14} />
                </motion.div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">{workerData.name} <Crown className="text-yellow-400" /></h1>
              <div className="flex gap-4 opacity-90 text-sm mt-1"><span>4.9 Rating</span> • <span>342 Jobs Done</span></div>
              
              {/* Problem 2 Fixed: Online/Offline Toggle Button */}
              <div className="mt-4 flex items-center gap-3">
                <button 
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isAvailable ? 'bg-green-400 text-green-900 shadow-lg shadow-green-900/20' : 'bg-gray-400 text-white'}`}
                >
                  {isAvailable ? '● Online & Ready' : '○ Offline'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl text-center min-w-[120px] border border-white/20">
              <DollarSign className="mx-auto mb-1 text-green-300" />
              <p className="text-2xl font-bold">₹1,800</p>
              <p className="text-xs opacity-70">Today</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Flame className="text-orange-500" /> New Job Requests</h2>
            {jobs.length > 0 ? jobs.map((job) => (
              <div key={job.id} className={`bg-white p-6 rounded-3xl shadow-sm border-2 ${job.urgency === 'high' ? 'border-red-100' : 'border-gray-100'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">{job.customer[0]}</div>
                    <div><p className="font-bold">{job.customer}</p></div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${job.urgency === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{job.urgency} Priority</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{job.service}</h3>
                <p className="text-sm text-gray-500 mb-4">{job.description}</p>
                <div className="flex justify-between items-center border-t pt-4">
                  <div><p className="text-xs text-gray-400">Budget</p><p className="text-xl font-bold text-emerald-600">{job.budget}</p></div>
                  <div className="flex gap-2">
                    {/* Problem 3 Fixed: Accept Button logic */}
                    <button 
                      onClick={() => handleAcceptJob(job.id, job.customer)}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100"
                    >
                      <Phone size={18} /> Accept Job
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-10">No new jobs available.</p>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-700"><Target className="text-blue-500" /> Daily Goals</h3>
              <div className="space-y-4">
                <Goal progress={66} label="Jobs Done" value="2/3" color="bg-emerald-500" />
                <Goal progress={72} label="Earnings" value="₹1800" color="bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Goal = ({ progress, label, value, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-bold text-gray-500"><span>{label}</span><span>{value}</span></div>
    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden"><div className={`${color} h-full`} style={{ width: `${progress}%` }}></div></div>
  </div>
);