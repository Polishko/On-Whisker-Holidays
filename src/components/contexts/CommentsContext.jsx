import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const CommentsContext = createContext();
const BASE_URL = "http://localhost:3000";

const initialState = {
  comments: [],
  isLoadingComments: false,
  currentComment: {
    text: "",
    userId: "",
    userName: "name",
    timestamp: "",
    id: "",
    hotelId: "",
  },
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoadingComments: true, error: "" };
    case "comments/loaded":
      return { ...state, isLoadingComments: false, comments: action.payload };
    case "comment/created":
      return {
        ...state,
        isLoadingComments: false,
        comments: [...state.comments, action.payload],
        currentComment: action.payload,
      };
    case "comment/deleted":
      return {
        ...state,
        isLoadingComments: false,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
        currentComment: {},
      };
    case "rejected":
      return { ...state, isLoadingComments: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function CommentsProvider({ children }) {
  const [{ comments, isLoadingComments, currentComment, error }, dispatch] =
    useReducer(reducer, initialState);

  const { user } = useAuth();

  useEffect(function () {
    async function fetchComments() {
      const controller = new AbortController();
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/comments`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        dispatch({ type: "comments/loaded", payload: data });
      } catch (error) {
        if (error.name != "AbortError") {
          dispatch({
            type: "rejected",
            payload: "There was error loading comments data...",
          });
        }
      }
    }
    fetchComments();
  }, []);

  async function createComment(commentText, hotelId) {
    dispatch({ type: "loading" });

    try {
      const comment = {
        text: commentText.trim(),
        userId: user.id,
        userName: user.name,
        hotelId: hotelId,
        timestamp: new Date().toISOString(),
      };

      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${BASE_URL}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to create comment");

      const data = await res.json();
      dispatch({ type: "comment/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was error creating the comment.",
      });
    }
  }

  async function deleteComment(id) {
    dispatch({ type: "loading" });

    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${BASE_URL}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete comment");

      dispatch({ type: "comment/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was error deleting the comment.",
      });
    }
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        isLoadingComments,
        currentComment,
        error,
        createComment,
        deleteComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

function useComments() {
  const context = useContext(CommentsContext);
  if (context === undefined)
    throw new Error("CommentsContext was outside CommentsProvider");
  return context;
}

export { CommentsProvider, useComments };
