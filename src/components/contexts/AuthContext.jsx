import { createContext, useCallback, useContext, useReducer } from "react";

import { authenticateApi, validatePasswordForEdit } from "../../utils/api";
import { isTokenExpired } from "../../utils/checkTokenExpiration";

const BASE_URL = "http://localhost:3000";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        success: "Sucessful login",
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

  // check token expiration
  const checkTokenValidity = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (isTokenExpired(token)) {
      dispatch({ type: "logout" });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }, [dispatch]);

  // Login
  const login = useCallback(async (credentials) => {
    const result = await authenticateApi(
      credentials,
      `${BASE_URL}/login`,
      `${BASE_URL}/users`,
      true //need user data? yes/ thought about using also for PUT request password validation without user data but separated for now
    );

    // console.log("Authentication result:", result);

    if (result.success) {
      const user = result.user;
      dispatch({
        type: "login",
        payload: user,
      });
      // console.log(result);
      // console.log("Token to be stored:", result.token);
      localStorage.setItem("accessToken", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
    } else {
      dispatch({ type: "rejected", payload: result.message });
      // console.log(result.message);
    }
    return result;
  }, []);

  // password validation for editing
  const validatePassword = useCallback(async (credentials) => {
    const result = await validatePasswordForEdit(
      credentials,
      `${BASE_URL}/login`
    );
    return result;
  }, []);

  // Logout
  const logout = useCallback(() => {
    dispatch({ type: "logout" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }, [dispatch]);

  // Update user after editing auth user data
  const updateAuthUser = useCallback(
    (updatedUser) => {
      dispatch({ type: "updateUser", payload: updatedUser });
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
    [dispatch]
  );

  // not utilized yet
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
        validatePassword,
        checkTokenValidity,
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
