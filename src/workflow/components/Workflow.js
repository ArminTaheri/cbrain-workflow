import React from "react";
import { compose, withState } from "recompose";
import { Grid, Row, Col } from "react-bootstrap";
import * as R from "ramda";
import { connect } from "react-redux";
import ActionsMenu, { ACTIONS } from "./ActionsMenu";
import MultiSelectOperations, {
  MULTI_SELECT_OPERATIONS
} from "./MultiSelectOperations";
import GraphLayer from "./graph/GraphLayer";
import { mapDispatchToProps } from "../state";

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
    [ACTIONS.PAN.id]: {},
    [ACTIONS.MOVE.id]: {
      nodePointerDown: (position, node) => startNodeMove({ position, node }),
      graphPointerMove: position => continueNodeMove({ position }),
      graphPointerUp: () => endNodeMove()
    },
    [ACTIONS.REMOVE_NODE.id]: {
      nodePointerDown: (_, node) => removeNode({ id: node.id })
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
  const handlers = HANDLER_CONFIGS[activeAction.id];
  return (
    <Grid fluid>
      <Row>
        <Col md={2}>
          <Row>
            <Col xs={12}>
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
          </Row>
          <Row>
            <Col xs={12}>
              <MultiSelectOperations
                runOperation={() => {
                  console.log(MULTI_SELECT_OPERATIONS);
                }}
              />
            </Col>
          </Row>
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
  withState("activeAction", "setActiveAction", ACTIONS.PAN),
  connect(
    R.identity,
    mapDispatchToProps
  )
)(Workflow);
