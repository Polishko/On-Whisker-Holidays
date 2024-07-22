import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
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
    case "comment/updated":
      return {
        ...state,
        isLoadingComments: false,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
        currentComment: action.payload,
        success: "The comment was updated successfully",
        error: null,
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

  // fetch comments
  const fetchComments = useCallback(async () => {
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
      if (error.name !== "AbortError") {
        dispatch({
          type: "rejected",
          payload: "There was an error loading comments data...",
        });
      }
    }
  }, []);

  // get on mount
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // create comment
  const createComment = useCallback(
    async (commentText, hotelId) => {
      if (!user) {
        dispatch({
          type: "rejected",
          payload: "User not authenticated",
        });
        return;
      }

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

        fetchComments();
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error creating the comment.",
        });
      }
    },
    [fetchComments, user]
  );

  // edit comment

  const editComment = useCallback(
    async (updatedComment) => {
      dispatch({ type: "loading" });

      try {
        const token = localStorage.getItem("accessToken");

        // PUT
        const res = await fetch(`${BASE_URL}/comments/${updatedComment.id}`, {
          method: "PUT",
          body: JSON.stringify(updatedComment),
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
              : error.message || "There was an error updating the comment.";
          dispatch({
            type: "rejected",
            payload: errorMessage,
          });
          return;
        }

        // GET updated comment
        const updatedRes = await fetch(
          `${BASE_URL}/comments/${updatedComment.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!updatedRes.ok)
          throw new Error("Failed to fetch updated comment data");
        const updatedData = await updatedRes.json();

        dispatch({ type: "comment/updated", payload: updatedData });

        fetchComments();
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was error updating the comment.",
        });
      }
    },
    [fetchComments]
  );

  // Credential validate
  async function validatePassword(credentials) {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });
      // console.log(res);

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
        payload: "There was error editing the comment.",
      });
      return {
        isValid: false,
        message: "There was error editing the comment.",
      };
    }
  }
  // TODO

  // delete comment
  const deleteComment = useCallback(
    async (id) => {
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
        fetchComments();
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error deleting the comment.",
        });
      }
    },
    [fetchComments]
  );

  return (
    <CommentsContext.Provider
      value={{
        comments,
        isLoadingComments,
        currentComment,
        error,
        createComment,
        editComment,
        validatePassword,
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
    throw new Error("CommentsContext was used outside CommentsProvider");
  return context;
}

export { CommentsProvider, useComments };
