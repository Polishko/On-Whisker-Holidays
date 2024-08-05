import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import { useAuth } from "./AuthContext";

import { fetchData, createUserApi, editDataApi } from "../../utils/api";

const UsersContext = createContext();

const BASE_URL = "http://localhost:3000";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      const result = await editDataApi(
        updatedUser,
        dispatch,
        `${BASE_URL}/users/${updatedUser.id}`,
        "user/updated",
        "user"
      );
      if (result.success) {
        updateAuthUser(result.data);
      }
      return result;
    },
    [updateAuthUser]
  );

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
