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
  PLACE_TASK: { id: "PLACE_TASK", name: "Place tasks", disabled: true },
  PLACE_FILE_FILTER: { id: "PLACE_FILE_FILTER", name: "Place file filters" }
};

const ACTIONS_LIST = [
  ACTIONS.NONE,
  ACTIONS.MOVE,
  ACTIONS.REMOVE_NODE,
  ACTIONS.CONNECT,
  ACTIONS.PLACE_FILE_FILTER,
  ACTIONS.PLACE_TASK
];

const ActionsMenu = ({ activeAction, setActiveAction }) => (
  <ListGroup>
    {ACTIONS_LIST.map(action => (
      <ListGroupItem
        key={action.id}
        active={activeAction === action}
        disabled={action.disabled}
        onClick={() => !action.disabled && setActiveAction(action)}
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
  const { connectionDrag } = graphLayerProps;
  const HANDLER_CONFIGS = {
    [ACTIONS.NONE.id]: {},
    [ACTIONS.MOVE.id]: {
      nodePointerDown: (position, node) => startNodeMove({ position, node }),
      graphPointerMove: position => continueNodeMove({ position }),
      graphPointerUp: () => endNodeMove()
    },
    [ACTIONS.REMOVE_NODE.id]: {
      nodePointerDown: node => removeNode({ id: node.id })
    },
    [ACTIONS.CONNECT.id]: {
      outPinPointerDown: (node, offset) => {
        if (connectionDrag) {
          // startConnectionInput({ childID: node.id, inputOffset: offset })
          return;
        }
        startConnectionOutput({ parentID: node.id, outputOffset: offset });
      },
      inPinPointerUp: (node, inputOffset) => {
        if (connectionDrag) {
          endConnectionInput({ childID: node.id, inputOffset });
          return;
        }
        // endConnectionOutput({ parentID: node.id, outputOffset: offset })
      },
      graphPointerUp: () => {
        setTimeout(() => {
          endConnectionInput();
          // endConnectionOutput();
        }, 50);
      },
      graphPointerMove: position => continueConnection({ position })
    },
    [ACTIONS.PLACE_TASK.id]: {},
    [ACTIONS.PLACE_FILE_FILTER.id]: {
      graphPointerDown: position =>
        placeFileFilterNode({ position, filter: { selection: [] } })
    }
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
            setActiveAction={action => {
              endNodeMove();
              endConnectionInput();
              // endConnectionOutput();
              setActiveAction(action);
            }}
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
