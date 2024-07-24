import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import { useAuth } from "./AuthContext";

import { fetchData, createUserApi } from "../../utils/api";

const UsersContext = createContext();
const BASE_URL = "http://localhost:3000";

const initialState = {
  users: [],
  isLoadingUsers: false,
  currentUser: { email: "", password: "", avatar: "", id: "", name: "" },
  error: null,
  success: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoadingUsers: true, error: null, success: null };
    case "users/loaded":
      return { ...state, isLoadingUsers: false, users: action.payload };
    case "user/loaded":
      return { ...state, isLoadingUsers: false, currentUser: action.payload };
    case "user/created":
      return {
        ...state,
        isLoadingUsers: false,
        users: [...state.users, action.payload],
        success: "The user was created successfully",
        error: null,
      };
    case "user/updated":
      return {
        ...state,
        isLoadingUsers: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        currentUser: action.payload,
        success: "The user was updated successfully",
        error: null,
      };
    case "user/deleted":
      return {
        ...state,
        isLoadingUsers: false,
        users: state.users.filter((user) => user.id !== action.payload),
        currentUser: { email: "", password: "", avatar: "", id: "", name: "" },
      };
    case "reset":
      return initialState;
    case "rejected":
      return { ...state, isLoadingUsers: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function UsersProvider({ children }) {
  const [{ users, isLoadingUsers, currentUser, error, success }, dispatch] =
    useReducer(reducer, initialState);

  const { updateAuthUser } = useAuth();

  // fetch users
  const fetchUsers = useCallback(async () => {
    return fetchData(`${BASE_URL}/users`, dispatch, "users/loaded", "users");
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // create user
  const createUser = useCallback(
    async (newUser) => {
      return await createUserApi(`${BASE_URL}/users`, newUser, dispatch);
    },
    [dispatch]
  );

  // edit user
  const editUser = useCallback(
    async (updatedUser) => {
      dispatch({ type: "loading" });

      try {
        const token = localStorage.getItem("accessToken");

        // PUT
        const res = await fetch(`${BASE_URL}/users/${updatedUser.id}`, {
          method: "PUT",
          body: JSON.stringify(updatedUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const error = await res.json();
          const errorMessage =
            res.status === 401
              ? "Wrong password."
              : error.message || "There was an error updating the user.";
          dispatch({
            type: "rejected",
            payload: errorMessage,
          });
          return;
        }

        // GET updated user
        const updatedRes = await fetch(`${BASE_URL}/users/${updatedUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!updatedRes.ok)
          throw new Error("Failed to fetch updated user data");
        const updatedData = await updatedRes.json();

        dispatch({ type: "user/updated", payload: updatedData });
        updateAuthUser(updatedData);

        fetchUsers();
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was error updating the user.",
        });
      }
    },
    [fetchUsers, updateAuthUser]
  );

  // Credential validate
  async function validatePassword(credentials) {
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
          payload: error.message || "Wrong password.",
        });
        return { isValid: false, message: error.message || "Wrong password." };
      }

      return { isValid: true };
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was error changing the avatar.",
      });
      return {
        isValid: false,
        message: "There was error changing the avatar.",
      };
    }
  }

  function resetState() {
    dispatch({ type: "reset" });
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        isLoadingUsers,
        currentUser,
        error,
        success,
        createUser,
        resetState,
        editUser,
        validatePassword,
        fetchUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined)
    throw new Error("UsersContext was outside UsersProvider");
  return context;
}

export { UsersProvider, useUsers };
