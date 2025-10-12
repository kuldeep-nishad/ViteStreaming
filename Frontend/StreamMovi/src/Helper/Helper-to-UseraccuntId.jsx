import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userAccountId: null,
    name: "",
    email: "",
  });

  // Load user info from localStorage on mount
  useEffect(() => {
    const userAccountId = localStorage.getItem("UserAccountId");
    const name = localStorage.getItem("Name");
    const email = localStorage.getItem("email");

    if (userAccountId) setUser({ userAccountId, name, email });
  }, []);

  const login = ({ userAccountId, name, email }) => {
    localStorage.setItem("UserAccountId", userAccountId);
    localStorage.setItem("Name", name || "");
    localStorage.setItem("email", email || "");
    setUser({ userAccountId, name, email });
  };

  const logout = () => {
    localStorage.removeItem("UserAccountId");
    localStorage.removeItem("Name");
    localStorage.removeItem("email");
    setUser({ userAccountId: null, name: "", email: "" });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
