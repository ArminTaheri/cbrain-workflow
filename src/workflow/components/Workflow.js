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
import { NODE_TYPE_KEYS } from "../node";

const Workflow = ({
  activeAction,
  setActiveAction,
  startConnectionOutput,
  endConnectionInput,
  startConnectionInput,
  endConnectionOutput,
  continueConnection,
  startNodeMove,
  endNodeMove,
  continueNodeMove,
  editNode,
  removeNode,
  placeNodeType,
  startSelection,
  continueSelection,
  endSelection,
  removeSelection,
  startMoveSelection,
  continueMoveSelection,
  endMoveSelection,
  copySelection,
  pasteClipboard,
  startPan,
  continuePan,
  endPan,
  ...graphLayerProps
}) => {
  const { connectionDrag } = graphLayerProps;
  const resetInteraction = () => {
    setTimeout(() => {
      endNodeMove();
      endConnectionInput();
      endConnectionOutput();
      endSelection();
    }, 20);
  };
  const HANDLER_CONFIGS = {
    [ACTIONS.NONE.id]: {},
    [ACTIONS.PAN.id]: {
      graphPointerDown: position => startPan({ position }),
      graphPointerMove: position => continuePan({ position }),
      graphPointerUp: () => endPan()
    },
    [ACTIONS.MOVE.id]: {
      nodePointerDown: (position, node) => startNodeMove({ position, node }),
      graphPointerMove: position => continueNodeMove({ position }),
      graphPointerUp: () => endNodeMove()
    },
    [ACTIONS.REMOVE_NODE.id]: {
      nodePointerDown: (_, node) => removeNode(node.id)
    },
    [ACTIONS.CONNECT.id]: {
      outPinPointerDown: (node, offset) => {
        startConnectionOutput({ parentID: node.id, outputOffset: offset });
      },
      inPinPointerUp: (node, offset) => {
        if (connectionDrag) {
          endConnectionInput({ childID: node.id, inputOffset: offset });
          return;
        }
        resetInteraction();
      },
      inPinPointerDown: (node, offset) => {
        startConnectionInput({ childID: node.id, inputOffset: offset });
      },
      outPinPointerUp: (node, offset) => {
        if (connectionDrag) {
          endConnectionOutput({ parentID: node.id, outputOffset: offset });
          return;
        }
        resetInteraction();
      },
      graphPointerUp: () => {
        resetInteraction();
      },
      graphPointerMove: position => continueConnection({ position })
    },
    [ACTIONS.PLACE_TASK.id]: {},
    [ACTIONS.PLACE_FILE_FILTER.id]: {
      graphPointerDown: position =>
        placeNodeType({
          type: NODE_TYPE_KEYS.FILE_FILTER,
          position,
          filter: { selection: [] }
        })
    },
    [ACTIONS.SELECT_MULTI.id]: {
      graphPointerDown: position => startSelection({ position }),
      graphPointerMove: position => continueSelection({ position }),
      graphPointerUp: () => endSelection()
    },
    [ACTIONS.MOVE_MULTI.id]: {
      graphPointerDown: position => startMoveSelection({ position }),
      graphPointerMove: position => continueMoveSelection({ position }),
      graphPointerUp: () => endMoveSelection()
    },
    [ACTIONS.PASTE.id]: {
      graphPointerUp: position => pasteClipboard({ position })
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
                  resetInteraction();
                  setActiveAction(action);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <MultiSelectOperations
                runOperation={operation => {
                  switch (operation) {
                    case MULTI_SELECT_OPERATIONS.REMOVE.id: {
                      removeSelection();
                      return;
                    }
                    case MULTI_SELECT_OPERATIONS.COPY.id: {
                      copySelection();
                      return;
                    }
                    default: {
                      return;
                    }
                  }
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
  withState("activeAction", "setActiveAction", ACTIONS.NONE),
  connect(
    R.identity,
    mapDispatchToProps
  )
)(Workflow);
