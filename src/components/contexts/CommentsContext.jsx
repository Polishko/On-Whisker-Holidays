import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import { useAuth } from "./AuthContext";

import {
  fetchData,
  createCommentApi,
  editDataApi,
  deleteDataApi,
} from "../../utils/api";

const CommentsContext = createContext();

const BASE_URL = "http://localhost:3000";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    return fetchData(
      `${BASE_URL}/comments`,
      dispatch,
      "comments/loaded",
      "comments"
    );
  }, []);

  // get on mount
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // create comment
  const createComment = useCallback(
    async (commentText, hotelId) => {
      return await createCommentApi(
        commentText,
        hotelId,
        user,
        dispatch,
        `${BASE_URL}/comments`
      );
    },
    [user, dispatch]
  );

  // edit comment
  const editComment = useCallback(async (updatedComment) => {
    return await editDataApi(
      updatedComment,
      dispatch,
      `${BASE_URL}/comments/${updatedComment.id}`,
      "comment/updated",
      "comment"
    );
  }, []);

  // delete comment
  const deleteComment = useCallback(async (id) => {
    return await deleteDataApi(
      `${BASE_URL}/comments`,
      id,
      dispatch,
      "comment/deleted",
      "comment"
    );
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        comments,
        isLoadingComments,
        currentComment,
        error,
        fetchComments,
        createComment,
        editComment,
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
