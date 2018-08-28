import * as R from "ramda";
import { of } from "rxjs";
import * as Rx from "rxjs/operators";
import { merge } from "rxjs";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import { addConnection } from "./graph";

export const makeConnection = ({
  parentID,
  childID,
  inputOffset,
  outputOffset
}) => ({
  parentID,
  childID,
  inputOffset,
  outputOffset
});

export const START_CONNECTION_OUTPUT = "START_CONNECTION_OUTPUT";
export const startConnectionOutput = createAction(START_CONNECTION_OUTPUT);

export const END_CONNECTION_INPUT = "END_CONNECTION_INPUT";
export const endConnectionInput = createAction(END_CONNECTION_INPUT);

export const START_CONNECTION_INPUT = "START_CONNECTION_INPUT";
export const startConnectionInput = createAction(START_CONNECTION_INPUT);

export const END_CONNECTION_OUTPUT = "END_CONNECTION_OUTPUT";
export const endConnectionOutput = createAction(END_CONNECTION_OUTPUT);

export const CONTINUE_CONNECTION = "CONTINUE_CONNECTION";
export const continueConnection = createAction(CONTINUE_CONNECTION);

export const SET_DRAG = "SET_DRAG";
export const setDrag = createAction(SET_DRAG);

export const makeConnectionEpic = (actions$, state$) => {
  const extractParentParams = ({ parentID, outputOffset }) => ({
    parentID,
    outputOffset
  });
  const extractChildParams = ({ childID, inputOffset }) => ({
    childID,
    inputOffset
  });
  const startConnectionOutput$ = actions$.pipe(
    ofType(START_CONNECTION_OUTPUT),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        extractParentParams
      )
    )
  );
  const endConnectionInput$ = actions$.pipe(
    ofType(END_CONNECTION_INPUT),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        R.unless(R.isNil, extractChildParams)
      )
    )
  );
  /* const startConnectionInput$ = actions$.pipe(
    ofType(START_CONNECTION_INPUT),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        extractChildParams
      )
    )
  ); */
  /* const endConnectionOutput$ = actions$.pipe(
    ofType(END_CONNECTION_OUTPUT),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        extractParentParams
      )
    )
  ); */
  const continueConnection$ = actions$.pipe(
    ofType(CONTINUE_CONNECTION),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        ({ position }) => position
      )
    )
  );
  const addConnectionO2I$ = startConnectionOutput$.pipe(
    Rx.combineLatest(endConnectionInput$),
    Rx.map(([start, end]) => {
      if (!end) {
        return null;
      }
      return makeConnection({
        parentID: start.parentID,
        outputOffset: start.outputOffset,
        childID: end.childID,
        inputOffset: end.inputOffset
      });
    }),
    Rx.filter(
      R.compose(
        R.not,
        R.isNil
      )
    )
  );
  // const addConnectionI2O$ = of();
  const addConnection$ = merge(addConnectionO2I$ /*, addConnectionI2O$ */).pipe(
    Rx.map(addConnection)
  );
  const removeConnection$ = of();
  const endDrag$ = merge(
    endConnectionInput$.pipe(Rx.mapTo(setDrag()))
    // endConnectionOutput$.pipe(Rx.mapTo(setDrag()))
  );
  const makeDragStream = start =>
    continueConnection$.pipe(
      Rx.map(currentPosition => setDrag({ currentPosition, ...start })),
      Rx.takeUntil(endDrag$)
    );
  const continueDrag$ = merge(
    startConnectionOutput$.pipe(
      Rx.withLatestFrom(state$),
      Rx.map(([start, state]) => ({
        startNode: state.graph.nodes[start.parentID],
        offset: start.outputOffset
      })),
      Rx.switchMap(makeDragStream)
    ) /*,
    startConnectionInput$.pipe(
      Rx.withLatestFrom(state$),
      Rx.map(([start, state]) => ({
        startNode: state.graph.nodes[start.parentID],
        offset: start.inputOffset
      })),
      Rx.switchMap(makeDragStream)
    ) */
  );

  return merge(addConnection$, removeConnection$, continueDrag$, endDrag$);
};

export const connectionDragReducer = (state = null, action) => {
  if (action.type === SET_DRAG) {
    return action.payload || null;
  }
  return state;
};
