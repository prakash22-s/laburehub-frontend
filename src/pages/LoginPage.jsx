import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleLogin = () => {
    if (role === "user") navigate("/user-dashboard");
    else navigate("/worker-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 bg-white shadow rounded">
        <h2 className="text-2xl mb-4">Login</h2>

        <select onChange={(e) => setRole(e.target.value)} className="border p-2 w-full mb-4">
          <option value="user">User</option>
          <option value="worker">Worker</option>
        </select>

        <button onClick={handleLogin} className="bg-green-500 text-white p-2 w-full">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
