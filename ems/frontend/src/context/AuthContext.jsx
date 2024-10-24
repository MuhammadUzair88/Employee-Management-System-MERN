import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user); // Set the authenticated user
          } else {
            setUser(null);
          }
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false); // End loading after the check
    };

    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children} {/* Only render children after loading is done */}
    </userContext.Provider>
  );
};

export const useAuth = () => React.useContext(userContext);
export default AuthContext;
