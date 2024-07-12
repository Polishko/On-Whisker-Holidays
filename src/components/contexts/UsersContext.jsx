import { createContext, useContext, useEffect, useReducer } from "react";

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
        currentUser: action.payload,
        success: "The user was created successfully",
      }; //added user made the active user
    case "user/deleted":
      return {
        ...state,
        isLoadingUsers: false,
        users: state.users.filter((user) => user.id !== action.payload),
        currentUser: {},
      };
    case "rejected":
      return { ...state, isLoadingUsers: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function UsersProvider({ children }) {
  const [{ users, isLoadingUsers, currentUser, error, success }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchUsers() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        console.log("Fetched users:", data);
        dispatch({ type: "users/loaded", payload: data });
        // console.log(users);
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was error loading users data...",
        });
      }
    }
    fetchUsers();
  }, []);

  async function getUser(id) {
    if (id === currentUser.id) return;
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`);
      const data = await res.json();
      dispatch({ type: "user/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error loading the user.",
      });
    }
  }

  async function createUser(newUser) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const error = await res.json();
        dispatch({
          type: "rejected",
          payload: error.message || "There was an error creating the user.",
        });
      }

      const data = await res.json();
      const { accessToken, user } = data;
      localStorage.setItem("accessToken", accessToken);
      dispatch({ type: "user/created", payload: user });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error creating the user.",
      });
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        isLoadingUsers,
        currentUser,
        error,
        success,
        getUser,
        createUser,
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
