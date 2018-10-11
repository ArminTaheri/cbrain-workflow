import { combineReducers } from "redux";
import { createAction } from "redux-actions";
import { createGraph, createGraphReducer } from "../../../graph";

export const ADD_NODE = "ADD_NODE";
export const addNode = createAction(ADD_NODE);

export const REMOVE_NODE = "REMOVE_NODE";
export const removeNode = createAction(REMOVE_NODE);

export const EDIT_NODE = "EDIT_NODE";
export const editNode = createAction(EDIT_NODE);

export const ADD_CONNECTION = "ADD_CONNECTION";
export const addConnection = createAction(ADD_CONNECTION);

export const REMOVE_CONNECTION = "REMOVE_CONNECTION";
export const removeConnection = createAction(REMOVE_CONNECTION);

export const EDIT_CONNECTION = "EDIT_CONNECTION";
export const editConnection = createAction(EDIT_CONNECTION);

export const PATCH_SUBRGAPH = "PATCH_SUBRGAPH";
export const patchSubgraph = createAction(PATCH_SUBRGAPH);

export const SET_WORKFLOW_NAME = "SET_WORKFLOW_NAME";
export const setWorkflowName = createAction(SET_WORKFLOW_NAME);

const nameReducer = (name = "", action) => {
  switch (action.type) {
    case SET_WORKFLOW_NAME: {
      return action.payload || "";
    }
    default: {
      return name;
    }
  }
};

const workflowGraphReducer = createGraphReducer(
  ADD_NODE,
  REMOVE_NODE,
  EDIT_NODE,
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  EDIT_CONNECTION,
  PATCH_SUBRGAPH
);

export const createWorkflow = name => ({ name, graph: createGraph() });

export const workflowReducer = combineReducers({
  id: (state = "") => state,
  name: nameReducer,
  graph: workflowGraphReducer
});
