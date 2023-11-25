import React, { createContext, useContext, useReducer } from "react";

const WorldContext = createContext();

const initialState = {
  temp: true,
  show: false,
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
    default:
      return state;
  }
}

function WorldProvider({ children }) {
  const [{ temp, show }, dispatch] = useReducer(reducer, initialState);
  const currtemp = `${temp ? "imperial" : "metric"}`;


  return (
    <WorldContext.Provider value={{ currtemp , temp, show, dispatch }}>
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
