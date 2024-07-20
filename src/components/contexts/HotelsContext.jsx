import {
  useContext,
  useEffect,
  useReducer,
  createContext,
  useCallback,
} from "react";
import { useLocation, useParams } from "react-router-dom";

import { containsAllKeywords } from "../../helpers/keywordContainCheck.js";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:3000";

const initialState = {
  hotels: [],
  filteredHotels: [],
  isLoading: false,
  currentHotel: {
    hotelName: "",
    countryCode: "",
    city: "",
    country: "",
    type: [],
    position: {},
    img: "",
    web: "",
    detail: "",
    keywords: [],
    facilities: [],
  },
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "hotels/loaded":
      return {
        ...state,
        isLoading: false,
        hotels: action.payload,
        filteredHotels: action.payload,
      };
    case "hotel/loaded":
      return { ...state, isLoading: false, currentHotel: action.payload };

    case "hotel/deleted":
      return {
        ...state,
        isLoading: false,
        hotels: state.hotels.filter((hotel) => hotel.id !== action.payload),
        currentHotel: {},
      };
    case "hotels/filtered": {
      const filteredHotels = state.hotels.filter((hotel) =>
        containsAllKeywords(hotel.keywords, action.payload)
      );
      return {
        ...state,
        isLoading: false,
        filteredHotels: filteredHotels,
      };
    }
    case "hotel/reset":
      return { ...state, currentHotel: initialState.currentHotel };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function HotelsProvider({ children }) {
  const [{ hotels, filteredHotels, isLoading, currentHotel, error }, dispatch] =
    useReducer(reducer, initialState);

  const location = useLocation();
  const { query } = useParams();

  const fetchHotels = useCallback(async () => {
    const controller = new AbortController();
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/hotels?_sort=country&_order=asc`, {
        signal: controller.signal,
      });
      const data = await res.json();
      dispatch({ type: "hotels/loaded", payload: data });
    } catch (error) {
      if (error.name !== "AbortError") {
        dispatch({
          type: "rejected",
          payload: "There was error loading hotel data...",
        });
      }
    }

    return () => {
      controller.abort();
    };
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // Filter
  useEffect(() => {
    if (query) {
      filterHotels(query);
    } else {
      filterHotels("");
    }
  }, [query]);

  // Reset currentHotel on location change
  useEffect(() => {
    if (!location.pathname.startsWith("/hotels/")) {
      dispatch({ type: "hotel/reset" });
    }
  }, [location.pathname]);

  // get hotel
  const getHotel = useCallback(
    async (id) => {
      const controller = new AbortController();

      if (id === currentHotel.id) return;
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/hotels/${id}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        dispatch({ type: "hotel/loaded", payload: data });
      } catch (error) {
        if (error.name !== "AbortController") {
          dispatch({
            type: "rejected",
            payload: "There was error loading the hotel.",
          });
        }
      }

      return () => {
        controller.abort();
      };
    },
    [currentHotel.id]
  );

  // filter hotel
  const filterHotels = useCallback(
    (keywords) => {
      dispatch({ type: "hotels/filtered", payload: keywords });
    },
    [dispatch]
  );

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        filteredHotels,
        isLoading,
        currentHotel,
        error,
        getHotel,
        filterHotels,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

function useHotels() {
  const context = useContext(HotelsContext);
  if (context === undefined)
    throw new Error("HotelsContext was outside HotelsProvider");
  return context;
}

export { HotelsProvider, useHotels };
