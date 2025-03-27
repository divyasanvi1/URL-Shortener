import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from "../store/AuthSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response =await axios.post("http://localhost:8001/user/login", { email, password }, { withCredentials: true });
      dispatch(login(response.data));
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded w-80 mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="mt-2 bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
