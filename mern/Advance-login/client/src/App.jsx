import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register.jsx";
import HomeIn from "./pages/HomeIn.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/homein" element={<HomeIn />} />

        <Route path="/verify" element={<EmailVerify />} />
      </Routes>
    </div>
  );
}

export default App;
