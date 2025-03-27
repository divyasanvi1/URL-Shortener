import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Analytics from "./Pages/Analytics";
import Navbar from "./Component/Navbar";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="/analytics/:shortId" element={<Analytics/>} />
        </Routes>
      </Router>
  
  );
}

export default App;
