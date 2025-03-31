import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/authenticated",
          {},
          { withCredentials: true }
        );
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" />;
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optionally, show a loading spinner or message
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
