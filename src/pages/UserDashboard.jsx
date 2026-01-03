import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Phone, MessageCircle, Star, Zap, Heart, Sparkles, 
  Crown, X, CheckCircle2, Image as ImageIcon 
} from 'lucide-react';

const mockWorkers = [
  { 
    id: '1', name: 'Rajesh Kumar', category: 'Electrician', rating: 4.9, 
    distance: '0.8 km', experience: '8 years', hourlyRate: '₹400-500', 
    image: 'https://images.unsplash.com/photo-1660330589693-99889d60181e?w=400', 
    completedJobs: 342, skills: ['Wiring', 'Panel Installation', 'Repair'],
    gallery: ['https://images.unsplash.com/photo-1706622437268-52d6488b697f?w=400']
  },
  { 
    id: '2', name: 'Suresh Patil', category: 'Plumber', rating: 4.8, 
    distance: '1.2 km', experience: '10 years', hourlyRate: '₹350-450', 
    image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400', 
    completedJobs: 521, skills: ['Pipe Fitting', 'Leak Fix'],
    gallery: []
  }
];

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Find Best Workers</h1>
          <div className="mt-6 flex bg-white rounded-2xl p-2 shadow-inner max-w-xl">
            <Search className="text-gray-400 m-3" />
            <input 
              className="flex-1 outline-none text-gray-800 p-2" 
              placeholder="Who are you looking for?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Worker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWorkers.map((worker) => (
            <motion.div 
              key={worker.id} 
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedWorker(worker)}
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 cursor-pointer group hover:border-indigo-200"
            >
              <div className="flex gap-4">
                <img src={worker.image} className="w-20 h-20 rounded-2xl object-cover border shadow-sm" alt={worker.name} />
                <div className="flex-1">
                  <h3 className="font-bold text-lg flex items-center gap-1">
                    {worker.name} <CheckCircle2 size={16} className="text-blue-500" />
                  </h3>
                  <p className="text-sm text-gray-500">{worker.category}</p>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm mt-1">
                    <Star size={14} fill="currentColor" /> {worker.rating}
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Full Profile Modal Popup --- */}
      <AnimatePresence>
        {selectedWorker && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWorker(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-white max-w-lg w-full rounded-[2.5rem] overflow-hidden shadow-2xl z-[1001]"
            >
              <button 
                onClick={() => setSelectedWorker(null)} 
                className="absolute top-5 right-5 p-2 bg-white/20 hover:bg-black/10 rounded-full text-white z-20 transition"
              >
                <X size={20} />
              </button>

              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white flex items-center gap-5">
                <img src={selectedWorker.image} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" alt="Profile" />
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">{selectedWorker.name} <Crown size={20} className="text-yellow-300" /></h2>
                  <p className="opacity-90 text-sm font-medium">{selectedWorker.category} • {selectedWorker.experience} Exp</p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Jobs</p>
                    <p className="text-lg font-bold text-indigo-700">{selectedWorker.completedJobs}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Rating</p>
                    <p className="text-lg font-bold text-yellow-600 flex justify-center gap-1">{selectedWorker.rating} <Star size={16} fill="currentColor" /></p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Rate</p>
                    <p className="text-lg font-bold text-emerald-600">{selectedWorker.hourlyRate.split('-')[0]}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorker.skills.map((s, i) => (
                      <span key={i} className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl text-xs font-bold">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition">
                    <Phone size={20} /> Call Now
                  </button>
                  <button className="flex-1 border-2 border-indigo-50 text-indigo-600 hover:bg-indigo-50 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition">
                    <MessageCircle size={20} /> WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}