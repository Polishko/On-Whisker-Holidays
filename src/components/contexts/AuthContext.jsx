import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:3000";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  error: null,
  success: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        success: "Sucessfull login",
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
        success: null,
      };
    case "updateUser":
      return { ...state, user: action.payload };
    case "rejected":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
        success: null,
      };
    case "reset/error":
      return {
        ...state,
        error: null,
      };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, success }, dispatch] = useReducer(
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
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const error = await res.json();
        dispatch({
          type: "rejected",
          payload: error.message || "Login failed.",
        });
        return;
      }

      const data = await res.json();
      const { accessToken, user } = data;
      dispatch({ type: "login", payload: user });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was error logging the user.",
      });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  function updateAuthUser(updatedUser) {
    dispatch({ type: "updateUser", payload: updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  const resetError = useCallback(() => {
    dispatch({ type: "reset/error" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        error,
        success,
        resetError,
        updateAuthUser,
      }}
    >
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
