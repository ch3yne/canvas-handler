const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_MOVING_IMG":
      return {
        ...state,
        movingImg: action.payload,
      };
    case "SET_IMG_DRAG_OFFSET":
      return {
        ...state,
        imgDragOffset: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
