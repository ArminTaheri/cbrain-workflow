import * as R from "ramda";
import * as Rx from "rxjs/operators";
import { merge, from } from "rxjs";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import * as V from "../../vector";
import {
  REMOVE_NODE,
  removeNode,
  editNode,
  patchSubgraph
} from "../state/workflow";
import {
  setSelectionBox,
  setSelection,
  setClipboard
} from "../state/selection";

export const START_SELECTION = "START_SELECTION";
export const startSelection = createAction(START_SELECTION);

export const CONTINUE_SELECTION = "CONTINUE_SELECTION";
export const continueSelection = createAction(CONTINUE_SELECTION);

export const END_SELECTION = "END_SELECTION";
export const endSelection = createAction(END_SELECTION);

export const createSelectionBoxEpic = fromState => (action$, state$) => {
  const startSelection$ = action$.pipe(
    ofType(START_SELECTION),
    Rx.filter(R.has("payload")),
    Rx.map(R.path(["payload", "position"]))
  );
  const continueSelection$ = action$.pipe(
    ofType(CONTINUE_SELECTION),
    Rx.filter(R.has("payload")),
    Rx.map(R.path(["payload", "position"]))
  );
  const endSelection$ = action$.pipe(
    ofType(END_SELECTION),
    Rx.mapTo(null)
  );

  const selectionBox$ = startSelection$.pipe(
    Rx.switchMap(start =>
      continueSelection$.pipe(
        Rx.map(currentPosition => ({ start, end: currentPosition })),
        Rx.takeUntil(endSelection$)
      )
    )
  );

  const setSelectionBox$ = merge(
    selectionBox$.pipe(Rx.map(setSelectionBox)),
    endSelection$.pipe(Rx.mapTo(setSelectionBox(null)))
  );

  const setSelection$ = selectionBox$.pipe(
    Rx.withLatestFrom(state$),
    Rx.map(([box, state]) =>
      R.values(fromState(state).nodes)
        .filter(node => V.boxContains(box, node.position))
        .map(R.prop("id"))
    ),
    Rx.map(setSelection)
  );

  return merge(setSelectionBox$, setSelection$);
};

export const REMOVE_SELECTION = "REMOVE_SELECTION";
export const removeSelection = createAction(REMOVE_SELECTION);

export const START_MOVE_SELECTION = "START_MOVE_SELECTION";
export const startMoveSelection = createAction(START_MOVE_SELECTION);

export const CONTINUE_MOVE_SELECTION = "CONTINUE_MOVE_SELECTION";
export const continueMoveSelection = createAction(CONTINUE_MOVE_SELECTION);

export const END_MOVE_SELECTION = "END_MOVE_SELECTION";
export const endMoveSelection = createAction(END_MOVE_SELECTION);

export const createSelectionEpic = fromState => (action$, state$) => {
  const startMoveSelection$ = action$.pipe(
    ofType(START_MOVE_SELECTION),
    Rx.filter(R.has("payload")),
    Rx.map(R.path(["payload", "position"]))
  );

  const continueMoveSelection$ = action$.pipe(
    ofType(CONTINUE_MOVE_SELECTION),
    Rx.filter(R.has("payload")),
    Rx.map(R.path(["payload", "position"]))
  );

  const endMoveSelection$ = action$.pipe(
    ofType(END_MOVE_SELECTION),
    Rx.mapTo(null)
  );

  const dragState$ = startMoveSelection$.pipe(
    Rx.withLatestFrom(state$),
    Rx.map(([start, state]) => ({
      start,
      nodePositions: R.fromPairs(
        fromState(state).selection.map(id => [
          id,
          fromState(state).graph.nodes[id].position
        ])
      )
    })),
    Rx.switchMap(({ start, nodePositions }) =>
      continueMoveSelection$.pipe(
        Rx.map(current => ({
          delta: V.sub(current, start),
          nodePositions
        })),
        Rx.takeUntil(endMoveSelection$)
      )
    )
  );

  const moveSelection$ = dragState$.pipe(
    Rx.withLatestFrom(state$),
    Rx.mergeMap(([dragState, state]) =>
      from(
        fromState(state).selection.map(id => {
          const node = fromState(state).graph.nodes[id];

          return editNode(
            R.assoc(
              "position",
              V.add(dragState.delta, dragState.nodePositions[id]),
              node
            )
          );
        })
      )
    )
  );

  const removeSelection$ = action$.pipe(ofType(REMOVE_SELECTION));

  const removeNodes$ = removeSelection$.pipe(
    Rx.withLatestFrom(state$),
    Rx.mergeMap(([_, state]) =>
      from(fromState(state).selection.map(id => removeNode(id)))
    )
  );

  const setSelection$ = merge(
    removeSelection$.pipe(Rx.mapTo(setSelection([]))),
    action$.pipe(
      ofType(REMOVE_NODE),
      Rx.withLatestFrom(state$),
      Rx.map(([id, state]) =>
        setSelection(R.reject(R.equals(id), fromState(state).selection))
      )
    )
  );

  return merge(removeNodes$, setSelection$, moveSelection$);
};

export const COPY_SELECTION = "COPY_SELECTION";
export const copySelection = createAction(COPY_SELECTION);

export const PASTE_CLIPBOARD = "PASTE_CLIPBOARD";
export const pasteClipboard = createAction(PASTE_CLIPBOARD);

export const createClipboardEpic = fromState => (action$, state$) => {
  const copySubgraph$ = action$.pipe(
    ofType(COPY_SELECTION),
    Rx.withLatestFrom(state$),
    Rx.map(([_, state]) => {
      const selectedNodes = fromState(state).selection.map(
        id => fromState(state).graph.nodes[id]
      );
      const minSelectedPosition = V.min(
        ...selectedNodes.map(R.prop("position"))
      );
      const nodes = selectedNodes.map(node => {
        const offset = V.sub(node.position, minSelectedPosition);

        return R.assoc("position", offset, node);
      });
      const connections = R.values(fromState(state).graph.connections).reduce(
        (conns, connection) => {
          let { parentID, childID, ...rest } = connection;

          parentID = nodes.findIndex(node => node.id === connection.parentID);
          if (parentID === -1) {
            return conns;
          }

          childID = nodes.findIndex(node => node.id === connection.childID);
          if (childID === -1) {
            return conns;
          }

          const indexedConnection = { parentID, childID, ...rest };

          return R.append(indexedConnection, conns);
        },
        []
      );

      return setClipboard({ nodes, connections });
    })
  );

  const patchSubgraph$ = action$.pipe(
    ofType(PASTE_CLIPBOARD),
    Rx.filter(R.has("payload")),
    Rx.map(R.path(["payload", "position"])),
    Rx.withLatestFrom(state$),
    Rx.map(([position, state]) =>
      R.over(
        R.lensProp("nodes"),
        R.map(node =>
          R.assoc("position", V.add(node.position, position), node)
        ),
        R.tap(x => console.warn(x))(fromState(state).clipboard)
      )
    ),
    Rx.map(patchSubgraph)
  );

  return merge(copySubgraph$, patchSubgraph$);
};
