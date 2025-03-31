import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import Register from "./pages/Register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Test from "./pages/Test.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        {/* Protected routes wrapped with ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/verify" element={<EmailVerify />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
