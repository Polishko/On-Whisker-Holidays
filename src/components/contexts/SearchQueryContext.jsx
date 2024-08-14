import { createContext, useReducer, useContext } from "react";

const SearchQueryContext = createContext();

const initialState = {
  currentSearchQuery: "",
  searchQueryParams: {},
  position: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "query/set":
      return { ...state, currentSearchQuery: action.payload };
    case "searchQueryParams/set":
      return { ...state, searchQueryParams: action.payload };
    case "position/set":
      return { ...state, position: action.payload };
    case "query/cleared":
      return {
        ...state,
        currentSearchQuery: "",
        searchQueryParams: {},
      };
    default:
      throw new Error("Unknown action");
  }
}

export function SearchQueryProvider({ children }) {
  const [{ currentSearchQuery, searchQueryParams, position }, dispatch] =
    useReducer(reducer, initialState);

  const setSearchQuery = (query) =>
    dispatch({ type: "query/set", payload: query });
  const setSearchQueryParams = (params) =>
    dispatch({ type: "searchQueryParams/set", payload: params });
  const setPosition = (position) =>
    dispatch({ type: "position/set", payload: position });
  const clearSearchQuery = () => dispatch({ type: "query/cleared" });

  return (
    <SearchQueryContext.Provider
      value={{
        currentSearchQuery,
        searchQueryParams,
        position,
        setSearchQuery,
        setSearchQueryParams,
        setPosition,
        clearSearchQuery,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
}

export function useSearchQuery() {
  const context = useContext(SearchQueryContext);

  if (context === undefined) {
    throw new Error("useGlobalQuery must be used within a SearchQueryProvider");
  }
  return context;
}
