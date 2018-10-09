import * as R from "ramda";
import { createAction } from "redux-actions";

export const ADD_TASK_DESCRIPTOR = "ADD_TASK_DESCRIPTOR";
export const addTaskDescriptor = createAction(ADD_TASK_DESCRIPTOR);

export const taskDescriptorsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK_DESCRIPTOR: {
      return action.payload ? R.append(action.payload, state) : state;
    }
    default: {
      return state;
    }
  }
};
