import { createContext, useContext, useEffect, useReducer } from "react";

const UsersContext = createContext();
const BASE_URL = "http://localhost:3000";

const initialState = {
  users: [],
  isLoading: false,
  currentUser: { email: "", password: "", awatar: "", id: "" },
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "users/loaded":
      return { ...state, isLoading: false, users: action.payload };
    case "user/loaded":
      return { ...state, isLoading: false, currentUser: action.payload };
    case "user/created":
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.payload],
        currentUser: action.payload,
      }; //added user made the active hotel
    case "user/deleted":
      return {
        ...state,
        isLoading: false,
        users: state.users.filter((user) => user.id !== action.payload),
        currentUser: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function UsersProvider({ children }) {
  const [{ users, isLoading, currentUser, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchUsers() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        dispatch({ type: "users/loaded", payload: data });
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
      const data = await res.json();
      dispatch({ type: "user/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error creating the user.",
      });
    }
  }

  async function deleteUser(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "user/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error deleting the user.",
      });
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        isLoading,
        currentUser,
        error,
        getUser,
        createUser,
        deleteUser,
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
