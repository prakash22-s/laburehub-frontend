import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Is path ko exactly '/user-dashboard' rakhein */}
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/worker-dashboard" element={<WorkerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;