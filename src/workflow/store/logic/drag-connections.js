import * as R from "ramda";
import { from } from "rxjs";
import * as Rx from "rxjs/operators";
import { merge } from "rxjs";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import { addConnection, removeConnection } from "../state/workflow";
import { setDrag } from "../state/connection-drag";

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

export const createMakeConnectionEpic = fromState => (actions$, state$) => {
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
  const startConnectionInput$ = actions$.pipe(
    ofType(START_CONNECTION_INPUT),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        extractChildParams
      )
    )
  );
  const endConnectionOutput$ = actions$.pipe(
    ofType(END_CONNECTION_OUTPUT),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        R.unless(R.isNil, extractParentParams)
      )
    )
  );
  const continueConnection$ = actions$.pipe(
    ofType(CONTINUE_CONNECTION),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        ({ position }) => position
      )
    )
  );
  const connectionO2I$ = startConnectionOutput$.pipe(
    Rx.combineLatest(endConnectionInput$),
    Rx.map(([start, end]) => {
      if (!end) {
        return null;
      }

      return {
        parentID: start.parentID,
        outputOffset: start.outputOffset,
        childID: end.childID,
        inputOffset: end.inputOffset
      };
    })
  );
  const connectionI2O$ = startConnectionInput$.pipe(
    Rx.combineLatest(endConnectionOutput$),
    Rx.map(([start, end]) => {
      if (!end) {
        return null;
      }
      return {
        parentID: end.parentID,
        outputOffset: end.outputOffset,
        childID: start.childID,
        inputOffset: start.inputOffset
      };
    })
  );
  const removeConflicts$ = merge(connectionO2I$, startConnectionInput$).pipe(
    Rx.filter(R.complement(R.isNil)),
    Rx.withLatestFrom(state$),
    Rx.concatMap(([connection, state]) => {
      const isConflict = graphConnection => {
        const [c1, c2] = R.project(
          ["parentID", "outputOffset", "childID", "inputOffset"],
          [graphConnection, connection]
        );

        return (
          graphConnection.childID === connection.childID &&
          R.equals(graphConnection.inputOffset, connection.inputOffset) &&
          !R.equals(c1, c2)
        );
      };
      const removeConflicts = R.values(fromState(state).connections)
        .filter(isConflict)
        .map(
          R.compose(
            removeConnection,
            R.prop("id")
          )
        );
      return from(removeConflicts);
    })
  );
  const addConnection$ = merge(connectionO2I$, connectionI2O$).pipe(
    Rx.filter(R.complement(R.isNil)),
    Rx.map(addConnection)
  );
  const endDrag$ = merge(
    endConnectionInput$.pipe(Rx.mapTo(setDrag())),
    endConnectionOutput$.pipe(Rx.mapTo(setDrag()))
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
        startNode: fromState(state).nodes[start.parentID],
        offset: start.outputOffset
      })),
      Rx.switchMap(makeDragStream)
    ),
    startConnectionInput$.pipe(
      Rx.withLatestFrom(state$),
      Rx.map(([start, state]) => ({
        startNode: fromState(state).nodes[start.childID],
        offset: start.inputOffset
      })),
      Rx.switchMap(makeDragStream)
    )
  );

  return merge(addConnection$, continueDrag$, endDrag$, removeConflicts$);
};
