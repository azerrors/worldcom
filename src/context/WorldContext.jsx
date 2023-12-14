import React, { createContext, useContext, useReducer } from "react";

const WorldContext = createContext();

const initialState = {
  favorites: [],
  showFav: false,
  temp: true,
  show: false,
  weatherLng: "",
  weatherLat: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "temp":
      return {
        ...state,
        temp: !state.temp,
      };
    case "show":
      return {
        ...state,
        show: !state.show,
      };
    case "display":
      return {
        ...state,
        weatherLng: action.payload.lng,
        weatherLat: action.payload.lat,
      };
    case "fav/add":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "fav/delete":
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.longitude !== action.payload,
        ),
      };

    case "showFav":
      return {
        ...state,
        showFav: !state.showFav,
      };
    default:
      return state;
  }
}

function WorldProvider({ children }) {
  const [{ temp, show, showFav, weatherLng, weatherLat, favorites }, dispatch] =
    useReducer(reducer, initialState);
  const currtemp = `${temp ? "imperial" : "metric"}`;

  return (
    <WorldContext.Provider
      value={{
        currtemp,
        temp,
        show,
        weatherLng,
        weatherLat,
        favorites,
        showFav,
        dispatch,
      }}
    >
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
