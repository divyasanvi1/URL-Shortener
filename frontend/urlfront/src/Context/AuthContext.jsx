import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8001/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []); 

  const login = async (email, password) => {
    await axios.post("http://localhost:8001/user/login", { email, password }, { withCredentials: true });
    setUser({ email });
  };

  const signup = async (name, email, password) => {
    await axios.post("http://localhost:8001/user", { name, email, password }, { withCredentials: true });
    setUser({ email });
  };

  const logout = async () => {
    await axios.post("http://localhost:8001/user/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
