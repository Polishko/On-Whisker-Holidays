import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { authenticateApi } from "../../utils/api";

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

  // persist state across sessions if user closes browser by mistake or refreshes
  useEffect(function () {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("accessToken");
    if (storedUser && accessToken) {
      dispatch({ type: "login", payload: storedUser });
    }
  }, []);

  // if an attempt to do authorized actions after token has expired unmount user component
  useEffect(function () {
    const token = localStorage.getItem("accessToken");
    if (!token) logout();
  }, []);

  // Login
  const login = useCallback(async (credentials) => {
    const result = await authenticateApi(
      credentials,
      `${BASE_URL}/login`,
      true
    );
    if (result.success) {
      const user = result.user;
      dispatch({
        type: "login",
        payload: user,
      });
      localStorage.setItem("accessToken", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
    } else {
      dispatch({ type: "rejected", payload: result.message });
      console.log(result.message);
    }
    return result;
  }, []);

  // password validation for editing
  const validatePassword = useCallback(async (credentials) => {
    const result = await authenticateApi(credentials, `${BASE_URL}/login`);
    return result;
  }, []);

  // logout
  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  // update user after editing auth user data
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
        validatePassword,
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
