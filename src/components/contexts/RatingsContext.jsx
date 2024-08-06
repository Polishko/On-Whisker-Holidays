import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

import { useAuth } from "./AuthContext";
import { fetchData, addRatingApi } from "../../utils/api";

const RatingsContext = createContext();

const BASE_URL = "http://localhost:3000";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  ratings: [],
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
    case "ratings/loaded":
      return { ...state, isLoading: false, ratings: action.payload };
    case "rating/added":
      return {
        ...state,
        isLoading: false,
        ratings: [...state.ratings, action.payload],
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

export function RatingsProvider({ children }) {
  const [{ ratings, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // console.log("Ratings in context:", ratings);

  const { user } = useAuth();

  // fetch ratings
  const fetchRatings = useCallback(async () => {
    return fetchData(
      `${BASE_URL}/ratings`,
      dispatch,
      "ratings/loaded",
      "ratings"
    );
  }, []);

  // get on mount
  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  // add a rating
  const addRating = useCallback(
    async (newRating) => {
      const result = await addRatingApi(
        `${BASE_URL}/ratings`,
        newRating,
        dispatch,
        user,
        "rating/added"
      );
      return result;
    },
    [user, dispatch]
  );

  return (
    <RatingsContext.Provider
      value={{
        ratings,
        isLoading,
        error,
        fetchRatings,
        addRating,
      }}
    >
      {children}
    </RatingsContext.Provider>
  );
}

export function useRatings() {
  const context = useContext(RatingsContext);
  if (context === undefined)
    throw new Error("useRatings must be used within a RatingsProvider");
  return context;
}
