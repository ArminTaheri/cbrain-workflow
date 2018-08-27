import React from "react";
import { compose, withState } from "recompose";
import { Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import * as R from "ramda";
import { connect } from "react-redux";
import GraphLayer from "./graph/GraphLayer";
import { mapDispatchToProps } from "../state";

const ACTIONS = {
  NONE: { id: "NONE", name: "None" },
  MOVE: { id: "MOVE", name: "Move nodes" },
  REMOVE_NODE: { id: "REMOVE_NODE", name: "Remove nodes" },
  CONNECT: { id: "CONNECT", name: "Connect nodes" },
  PLACE_TASK: { id: "PLACE_TASK", name: "Place tasks" },
  PLACE_FILE_FILTER: { id: "PLACE_FILE_FILTER", name: "Place file filters" }
};

const ACTIONS_LIST = [
  ACTIONS.NONE,
  ACTIONS.MOVE,
  ACTIONS.REMOVE_NODE,
  ACTIONS.CONNECT,
  ACTIONS.PLACE_TASK,
  ACTIONS.PLACE_FILE_FILTER
];

const ActionsMenu = ({ activeAction, setActiveAction }) => (
  <ListGroup>
    {ACTIONS_LIST.map(action => (
      <ListGroupItem
        key={action.id}
        active={activeAction === action}
        onClick={() => setActiveAction(action)}
      >
        {action.name}
      </ListGroupItem>
    ))}
  </ListGroup>
);

const Workflow = ({
  activeAction,
  setActiveAction,
  startConnectionOutput,
  endConnectionInput,
  continueConnection,
  startNodeMove,
  endNodeMove,
  continueNodeMove,
  editNode,
  removeNode,
  placeFileFilterNode,
  placeTaskNode,
  ...graphLayerProps
}) => {
  const HANDLER_CONFIGS = {
    BASE: {
      graphPointerUp: () => {
        endNodeMove();
        endConnectionInput();
      }
    },
    [ACTIONS.NONE.id]: {},
    [ACTIONS.MOVE.id]: {
      nodePointerDown: (node, position) => startNodeMove({ node, position }),
      graphPointerMove: position => continueNodeMove({ position })
    },
    [ACTIONS.REMOVE_NODE.id]: {
      nodePointerDown: id => removeNode({ id })
    },
    [ACTIONS.CONNECT.id]: {},
    [ACTIONS.PLACE_TASK.id]: {},
    [ACTIONS.PLACE_FILE_FILTER.id]: {}
  };
  const handlers = {
    ...HANDLER_CONFIGS[activeAction.id],
    ...HANDLER_CONFIGS.BASE
  };
  return (
    <Grid fluid>
      <Row>
        <Col md={2}>
          <ActionsMenu
            activeAction={activeAction}
            setActiveAction={setActiveAction}
          />
        </Col>
        {/* TODO: Remove hardcoded height */}
        <Col md={10} style={{ height: "800px" }}>
          <GraphLayer {...graphLayerProps} {...handlers} />
        </Col>
      </Row>
    </Grid>
  );
};

export default compose(
  withState("activeAction", "setActiveAction", ACTIONS.NONE),
  connect(
    R.identity,
    mapDispatchToProps
  )
)(Workflow);
