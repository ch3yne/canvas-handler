import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState: any = {
  canvas: null,
  movingImg: null,
  imgDragOffset: {
    offsetX: 0,
    offsetY: 0,
  },
};

const Store: any = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
