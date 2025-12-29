import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import UserDashboard from "./pages/UserDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/worker-dashboard" element={<WorkerDashboard />} />
    </Routes>
  );
}

export default App;
