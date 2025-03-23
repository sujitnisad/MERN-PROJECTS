import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/reset" element={<ResetPassword />} />

        <Route path="/verify" element={<EmailVerify />} />
      </Routes>
    </div>
  );
}

export default App;
