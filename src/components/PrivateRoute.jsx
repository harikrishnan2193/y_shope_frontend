import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = sessionStorage.getItem("userDetils");

    if (userDetails) {
      try {
        setUser(JSON.parse(userDetails));
      } catch (error) {
        console.error("Error parsing userDetails:", error);
      }
    }
  }, []);

  // console.log("Current user:", user); 

  if (user === null) {
    return null;
  }

  return user?.role === "admin" ? children : <Navigate to="/404" replace />;
}

export default PrivateRoute;
