import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import "resize-observer-polyfill/dist/ResizeObserver.global";
import { rootReducer, rootEpic } from "./workflow/state";
import { placeFileSourceNode } from "./workflow/state/file";
import Workflow from "./workflow/components/Workflow";
import "./css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const epicMiddleware = createEpicMiddleware();
    const logger = createLogger();

    this.store = createStore(
      rootReducer,
      applyMiddleware(epicMiddleware, logger)
    );

    epicMiddleware.run(rootEpic);

    this.store.dispatch(
      placeFileSourceNode({ position: { x: 0.5, y: 0.1 }, source: {} })
    );
  }
  render() {
    return (
      <div className="App">
        <Provider store={this.store}>
          <Workflow />
        </Provider>
      </div>
    );
  }
}

export default App;