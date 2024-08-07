import {
  useContext,
  useEffect,
  useReducer,
  createContext,
  useCallback,
} from "react";

import { useLocation } from "react-router-dom";

import { fetchData, fetchItem } from "../../utils/api";

const HotelsContext = createContext();

const BASE_URL = "http://localhost:3000";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  hotels: [],
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
    case "hotel/reset":
      return { ...state, currentHotel: initialState.currentHotel };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function HotelsProvider({ children }) {
  const [{ hotels, isLoading, currentHotel, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const location = useLocation();

  // fetch hotels
  const fetchHotels = useCallback(async () => {
    return fetchData(
      `${BASE_URL}/hotels?_sort=country&_order=asc`,
      dispatch,
      "hotels/loaded",
      "hotels"
    );
  }, []);

  // get hotel
  const getHotel = useCallback(
    (id) => {
      return fetchItem(
        `${BASE_URL}/hotels/${id}`,
        id,
        dispatch,
        "hotel/loaded",
        currentHotel.id,
        "hotel"
      );
    },
    [currentHotel.id]
  );

  // fetch hotels on mount
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // Reset currentHotel on location change (force page to forget last rendered hotel) // check for potential issues?
  useEffect(() => {
    if (!location.pathname.startsWith("/hotels/")) {
      dispatch({ type: "hotel/reset" });
    }
  }, [location.pathname]);

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        isLoading,
        currentHotel,
        error,
        getHotel,
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
