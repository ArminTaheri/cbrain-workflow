import * as R from "ramda";
import * as Rx from "rxjs/operators";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import * as V from "../vector";

export const START_PAN = "START_PAN";
export const startPan = createAction(START_PAN);

export const CONTINUE_PAN = "CONTINUE_PAN";
export const continuePan = createAction(CONTINUE_PAN);

export const END_PAN = "END_PAN";
export const endPan = createAction(END_PAN);

export const SET_VIEWBOX = "SET_VIEWBOX";
export const setViewbox = createAction(SET_VIEWBOX);

export const viewboxEpic = (action$, state$) => {
  const startPan$ = action$.pipe(
    ofType(START_PAN),
    Rx.filter(R.has("payload")),
    Rx.map(R.path(["payload", "position"]))
  );
  const continuePan$ = action$.pipe(
    ofType(CONTINUE_PAN),
    Rx.filter(R.has("payload")),
    Rx.map(R.path(["payload", "position"]))
  );
  const endPan$ = action$.pipe(
    ofType(END_PAN),
    Rx.mapTo(null)
  );

  const setViewbox$ = startPan$.pipe(
    Rx.withLatestFrom(state$),
    Rx.map(([start, state]) => [
      start,
      state,
      R.path(["viewbox", "position"], state)
    ]),
    Rx.switchMap(([start, state, viewboxPosition]) =>
      continuePan$.pipe(
        Rx.tap(x => console.warn(x)),
        Rx.map(current =>
          R.assoc(
            "position",
            V.add(viewboxPosition, V.sub(start, current)),
            state.viewbox
          )
        ),
        Rx.takeUntil(endPan$)
      )
    ),
    Rx.map(setViewbox)
  );

  return setViewbox$;
};

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
