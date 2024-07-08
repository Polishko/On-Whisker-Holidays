import { createContext, useContext, useEffect, useReducer } from "react";

const CommentsContext = createContext();
const BASE_URL = "http://localhost:3000";

const initialState = {
  comments: [],
  isLoadingComments: false,
  currentComment: {
    text: "",
    userId: "",
    timestamp: "",
    id: "",
    commentId: "",
  },
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoadingComments: true };
    case "comments/loaded":
      return { ...state, isLoadingComments: false, comments: action.payload };
    case "comment/loaded":
      return {
        ...state,
        isLoadingComments: false,
        currentComment: action.payload,
      };
    case "comment/created":
      return {
        ...state,
        isLoadingComments: false,
        comments: [...state.comments, action.payload],
        currentComment: action.payload,
      }; //added comment made the active comment
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

  useEffect(function () {
    async function fetchComments() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/comments`);
        const data = await res.json();
        dispatch({ type: "comments/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was error loading comments data...",
        });
      }
    }
    fetchComments();
  }, []);

  async function getComment(id) {
    if (id === currentComment.id) return;
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/comments/${id}`);
      const data = await res.json();
      dispatch({ type: "comment/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error loading the comment.",
      });
    }
  }

  async function createComment(newComment) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/comments`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "comment/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error creating the comment.",
      });
    }
  }

  async function deleteComment(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/comments/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "comment/deleted", payload: id });
    } catch {
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
        getComment,
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
