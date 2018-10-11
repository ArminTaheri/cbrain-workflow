import * as R from "ramda";
import { createAction } from "redux-actions";
import { createMap, createMapReducer } from "../../../map";
import { createWorkflow, workflowReducer } from "./workflow";

export const ADD_WORKFLOW = "ADD_WORKFLOW";
export const addWorkflow = createAction(ADD_WORKFLOW);

export const REMOVE_WORKFLOW = "REMOVE_WORKFLOW";
export const removeWorkflow = createAction(REMOVE_WORKFLOW);

export const UPDATE_WORKFLOW = "UPDATE_WORKFLOW";
export const udpateWorkflow = createAction(UPDATE_WORKFLOW);

export const SET_ACTIVE_WORKFLOW = "SET_ACTIVE_WORKFLOW";
export const setActiveWorkflow = createAction(SET_ACTIVE_WORKFLOW);

export const workflowsReducer = (
  state = { active: null, table: createMap() },
  action
) => {
  const workflowsMapReducer = (state, action) => {
    const mapReducer = createMapReducer(
      ADD_WORKFLOW,
      REMOVE_WORKFLOW,
      UPDATE_WORKFLOW
    );

    switch (action.type) {
      case ADD_WORKFLOW: {
        const generateNewName = () => {
          const names = R.values(state).map(R.prop("name"));
          let name = "New Workflow";
          let i = 1;
          while (names.find(R.equals(`${name} ${i}`))) {
            i++;
          }
          return `${name} ${i}`;
        };
        if (!R.has("payload", action)) {
          return mapReducer(
            state,
            addWorkflow(createWorkflow(generateNewName()))
          );
        }
        if (
          !R.hasIn(["payload", "name"], action) ||
          !R.path(["payload", "name"], action).length > 0
        ) {
          return mapReducer(
            state,
            addWorkflow(R.assoc("name", generateNewName(), action.payload))
          );
        }
        return mapReducer(state, addWorkflow(action.payload));
      }
      default: {
        return mapReducer(state, action);
      }
    }
  };

  const activeWorkflowReducer = (state = null, action) => {
    switch (action.type) {
      case SET_ACTIVE_WORKFLOW: {
        return action.payload || null;
      }
      default: {
        return state;
      }
    }
  };

  const { active, table } = R.applySpec({
    active: R.prop("active"),
    table: state => workflowsMapReducer(state.table, action)
  })(state);

  return {
    active: activeWorkflowReducer(active, action),
    table: R.has(active, table)
      ? R.assoc(active, workflowReducer(R.prop(active, table), action), table)
      : table
  };
};
