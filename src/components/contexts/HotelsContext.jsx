import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:3000";

const initialState = {
  hotels: [],
  isLoading: false,
  currentHotel: {
    hotelName: "",
    emoji: "",
    city: "",
    country: "",
    img: "",
    web: "",
    detail: "",
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
      }; //added city made the active city
    case "hotel/deleted":
      return {
        ...state,
        isLoading: false,
        hotels: state.hotels.filter((hotel) => hotel.id !== action.payload),
        currentHotel: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function HotelProvider({ children }) {
  const [{ hotels, isLoading, currentHotel, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/hotels`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was error loading hotel data...",
        });
      }
    }
    fetchCities();
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
      const data = res.json();
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

export { HotelProvider, useHotels };
