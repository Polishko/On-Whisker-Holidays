import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { containsAllKeywords } from "../../helpers/keywordContainCheck.js";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:3000";

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
  },
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "hotels/loaded":
      return { ...state, isLoading: false, hotels: action.payload };
    case "hotel/loaded":
      return { ...state, isLoading: false, currentHotel: action.payload };
    case "hotel/created":
      return {
        ...state,
        isLoading: false,
        hotels: [...state.hotels, action.payload],
        currentHotel: action.payload,
      }; //added hotel made the active hotel
    case "hotel/deleted":
      return {
        ...state,
        isLoading: false,
        hotels: state.hotels.filter((hotel) => hotel.id !== action.payload),
        currentHotel: {},
      };
    case "hotels/filtered":
      return {
        ...state,
        isLoading: false,
        hotels: state.hotels.filter((hotel) =>
          containsAllKeywords(hotel.keywords, action.payload)
        ),
      };
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

  useEffect(function () {
    async function fetchHotels() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/hotels`);
        const data = await res.json();
        dispatch({ type: "hotels/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was error loading hotel data...",
        });
      }
    }
    fetchHotels();
  }, []);

  async function getHotel(id) {
    if (id === currentHotel.id) return;
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/hotels/${id}`);
      const data = await res.json();
      dispatch({ type: "hotel/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error loading the hotel.",
      });
    }
  }

  async function createHotel(newHotel) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/hotels`, {
        method: "POST",
        body: JSON.stringify(newHotel),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "hotel/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was error creating the hotel.",
      });
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
        isLoading,
        currentHotel,
        error,
        getHotel,
        createHotel,
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
