import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useLocation } from "react-router-dom";

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

  useEffect(function () {
    async function fetchHotels() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/hotels`);
        const data = await res.json();

        const sortedData = data.sort((a, b) => {
          if (a.country < b.country) return -1;
          if (a.country > b.country) return 1;
          return 0;
        });

        dispatch({ type: "hotels/loaded", payload: sortedData });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was error loading hotel data...",
        });
      }
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    if (!location.pathname.startsWith("/app/hotels/")) {
      dispatch({ type: "hotel/reset" });
    }
  }, [location.pathname]);

  async function getHotel(id) {
    const controller = new AbortController();

    if (id === currentHotel.id) return;
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/hotels/${id}`, {
        signal: controller.signal,
      });
      const data = await res.json();
      dispatch({ type: "hotel/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error loading the hotel.",
      });
    } finally {
      controller.abort();
    }
  }

  async function deleteHotel(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/hotels/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "hotel/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error deleting the hotel.",
      });
    }
  }

  function filterHotels(keywords) {
    dispatch({ type: "hotels/filtered", payload: keywords });
  }

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        filteredHotels,
        isLoading,
        currentHotel,
        error,
        getHotel,
        // createHotel,
        deleteHotel,
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
