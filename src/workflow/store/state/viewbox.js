import { createAction } from "redux-actions";
import * as V from "../../vector";

export const SET_VIEWBOX = "SET_VIEWBOX";
export const setViewbox = createAction(SET_VIEWBOX);

export const INITIAL_VIEWBOX = { position: V.zero(), zoom: 1 };

export const viewboxReducer = (state = INITIAL_VIEWBOX, action) => {
  switch (action.type) {
    case SET_VIEWBOX: {
      return action.payload ? action.payload : state;
    }
    default:
      return state;
  }
};
