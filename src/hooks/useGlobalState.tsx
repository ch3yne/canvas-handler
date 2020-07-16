import React, { createContext, useReducer, useContext } from "react";

const StateContext: any = createContext(null);

export function GlobalStateProvider({ children, reducer, initialState }: any) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(StateContext);
}
