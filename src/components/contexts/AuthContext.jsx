import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const BASE_URL = "http://localhost:3000";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(credentials) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    const { accessToken, user } = data;
    setUser(user.user);
    localStorage.setItem("accessToken", accessToken);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("accessToken");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
