import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { rootReducer, rootEpic } from "./workflow/state";
import Workflow from "./workflow/components/Workflow";
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
