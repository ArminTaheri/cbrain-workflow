import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import "resize-observer-polyfill/dist/ResizeObserver.global";
import { rootReducer, rootEpic } from "./workflow/state";
import { placeNodeType } from "./workflow/state/graph";
import { addTaskDescriptor } from "./workflow/state/task-descriptors";
import { NODE_TYPES } from "./workflow/node";
import Workflow from "./workflow/components/Workflow";
import "./css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const epicMiddleware = createEpicMiddleware();

    this.store = createStore(
      rootReducer,
      applyMiddleware(epicMiddleware, logger)
    );

    epicMiddleware.run(rootEpic);

    this.store.dispatch(
      placeNodeType({
        type: NODE_TYPES.FILE_SOURCE,
        position: { x: 0.5, y: 0.1 }
      })
    );
    props.taskURLs.forEach(url =>
      fetch(url)
        .then(resp => resp.json())
        .then(task => this.store.dispatch(addTaskDescriptor(task)))
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

App.defaultProps = {
  taskURLs: ["descriptors/fsl_anat.json", "descriptors/mincbet.json"]
};

export default App;
