import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(
        "http://localhost:8001/user", // Ensure this matches your backend
        { name, email, password },
        { withCredentials: true } // Allows cookies to be stored
      );

      alert(response.data.msg); // Show success message
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Sign Up</h1>

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit" // Change from onClick to type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-red-500 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-700 font-bold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
