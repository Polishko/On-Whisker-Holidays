import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:3000";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("accessToken");
    if (user && accessToken) {
      dispatch({ type: "login", payload: user });
    }
  }, []);

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
    dispatch({ type: "login", payload: user });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user"); // Remove user from localStorage
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
