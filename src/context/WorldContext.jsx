import React, { createContext, useContext, useReducer } from "react";

const WorldContext = createContext();

const initialState = {
  temp: true,
  searchInput: "",
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    // case "weather/search":
    //   return {
    //     ...state,
    //     searchInput: action.payload,
    //   };
    // case "favorite/add":
    //   return {
    //     ...state,
    //     favorites: [...state.favorites, action.payload],
    //   };
    // case "favorite/delete":
    //   return {
    //     ...state,
    //     favorites: state.favorites.filter(
    //       (item) => item.lat === action.payload
    //     ),
    //   };
    case "temp":
      return {
        ...state,
        temp: !state.temp,
      };
    default:
      return state;
  }
}

function WorldProvider({ children }) {
  const [{ temp, searchInput, favorites }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <WorldContext.Provider value={{ temp, searchInput, dispatch, favorites }}>
      {children}
    </WorldContext.Provider>
  );
}

function useWorld() {
  const context = useContext(WorldContext);
  if (context === undefined) {
    throw new Error("useStar must be used within a StarProvider");
  }
  return context;
}

export { WorldProvider, useWorld };
