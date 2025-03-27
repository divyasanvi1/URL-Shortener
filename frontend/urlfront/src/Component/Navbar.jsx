import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/AuthSlice";
import axios from "axios";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    axios.post("http://localhost:8001/user/logout", {}, { withCredentials: true })
      .then(() => dispatch(logout()))
      .catch((error) => console.error("Logout failed:", error));
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">URL Shortener</Link>

      <div>
        {isAuthenticated ? (
          <>
            <Link to="/analytics/shortId" className="mr-4">Analytics</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

