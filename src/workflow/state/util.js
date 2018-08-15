// @flow

import { Stream } from "most";
import {
  createEventHandler,
  setObservableConfig
} from "recompose/mostObservableConfig";
import mostConfig from "recompose/mostObservableConfig";

setObservableConfig(mostConfig);

export const makeFeedbackLoop = <S>(
  makeStateStream: (lastState$: Stream<S>) => Stream<S>
): Stream<S> => {
  const { handler: setState, stream: state$ } = createEventHandler();
  const nextState$ = makeStateStream(state$);
  nextState$.observe(nextState => setState(nextState));
  return nextState$;
};
