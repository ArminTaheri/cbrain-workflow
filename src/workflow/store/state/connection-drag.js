import { createAction } from "redux-actions";

export const SET_DRAG = "SET_DRAG";
export const setDrag = createAction(SET_DRAG);

export const connectionDragReducer = (state = null, action) => {
  if (action.type === SET_DRAG) {
    return action.payload || null;
  }
  return state;
};
