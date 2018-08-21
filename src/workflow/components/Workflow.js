import * as R from "ramda";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../state";

const Workflow = ({
  graph,
  connectionDrag,
  startConnectionOutput,
  endConnectionInput,
  continueConnection,
  startNodeMove,
  endNodeMove,
  continueNodeMove,
  editNode,
  removeNode,
  graphReducer,
  placeFileFilterNode,
  placeTaskNode
}) => {
  console.log(
    graph,
    connectionDrag,
    startConnectionOutput,
    endConnectionInput,
    continueConnection,
    startNodeMove,
    endNodeMove,
    continueNodeMove,
    editNode,
    removeNode,
    graphReducer,
    placeFileFilterNode,
    placeTaskNode
  );
  return null;
};

export default connect(
  R.identity,
  mapDispatchToProps
)(Workflow);
