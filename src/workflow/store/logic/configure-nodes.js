import * as R from "ramda";
import { merge } from "rxjs";
import * as Rx from "rxjs/operators";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import { addNode } from "../state/workflow";
import NODE_CONFIGS from "../../node";

export const PLACE_NODE_TYPE = "PLACE_NODE_TYPE";
export const placeNodeType = createAction(PLACE_NODE_TYPE);

export const EDIT_NODE_CONTENT = "EDIT_NODE_CONTENT";
export const editNodeContent = createAction(EDIT_NODE_CONTENT);

export const createConfigureNodesEpic = () => action$ => {
  const placeNodeType$ = action$.pipe(
    ofType(PLACE_NODE_TYPE),
    Rx.filter(R.has("payload")),
    Rx.map(({ payload }) => {
      const nodeConfig = NODE_CONFIGS[R.prop("type", payload)];
      if (R.isNil(nodeConfig)) {
        throw new Error(`${payload} is not a valid node.`);
      }
      const nodeData = nodeConfig.create(payload);
      return addNode({
        position: payload.position,
        type: payload.type,
        content: nodeData.content,
        inputs: R.concat([], nodeData.inputs || []),
        outputs: R.concat([], nodeData.outputs || [])
      });
    })
  );
  const editNodeContent$ = action$.pipe(
    ofType(EDIT_NODE_CONTENT),
    Rx.filter(R.has("payload")),
    Rx.map(({ payload }) =>
      NODE_CONFIGS[R.path(["node", "type"], payload)].edit(payload)
    )
  );

  return merge(placeNodeType$, editNodeContent$);
};
