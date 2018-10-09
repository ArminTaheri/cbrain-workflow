import { createAction } from "redux-actions";

export const SET_SELECTION_BOX = "SET_SELECTION_BOX";
export const setSelectionBox = createAction(SET_SELECTION_BOX);

export const selectionBoxReducer = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTION_BOX: {
      return action.payload || null;
    }
    default:
      return state;
  }
};

export const SET_SELECTION = "SET_SELECTION";
export const setSelection = createAction(SET_SELECTION);

export const selectionReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SELECTION: {
      return action.payload instanceof Array ? action.payload : state;
    }
    default:
      return state;
  }
};

export const SET_CLIPBOARD = "SET_CLIPBOARD";
export const setClipboard = createAction(SET_CLIPBOARD);

export const clipboardReducer = (
  state = { node: [], connections: [] },
  action
) => {
  switch (action.type) {
    case SET_CLIPBOARD: {
      return action.payload ? action.payload : state;
    }
    default:
      return state;
  }
};
