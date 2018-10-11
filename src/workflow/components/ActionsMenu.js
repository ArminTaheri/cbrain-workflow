import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import TaskSelectMenu from "./TaskSelectMenu";

export const ACTIONS = {
  NONE: { id: "NONE", name: "None" },
  PAN: { id: "PAN", name: "Pan view", disabled: true },
  MOVE: { id: "MOVE", name: "Move nodes" },
  REMOVE_NODE: { id: "REMOVE_NODE", name: "Remove nodes" },
  CONNECT: { id: "CONNECT", name: "Connect nodes" },
  PLACE_FILE_FILTER: { id: "PLACE_FILE_FILTER", name: "Place file filters" },
  PLACE_TASK: {
    id: "PLACE_TASK",
    name: "Place tasks",
    menu: TaskSelectMenu
  },
  PLACE_SUB_WORKFLOW: {
    id: "PLACE_SUB_WORKFLOW",
    name: "Place sub-workflow",
    disabled: true
  },
  SELECT_MULTI: { id: "SELECT_MULTI", name: "Select multiple" },
  MOVE_MULTI: { id: "MOVE_MULTI", name: "Move selected" },
  PASTE: { id: "PASTE", name: "Paste clipboard" }
};

const ACTIONS_LIST = [
  ACTIONS.NONE,
  ACTIONS.PAN,
  ACTIONS.MOVE,
  ACTIONS.REMOVE_NODE,
  ACTIONS.CONNECT,
  ACTIONS.PLACE_FILE_FILTER,
  ACTIONS.PLACE_TASK,
  ACTIONS.PLACE_SUB_WORKFLOW,
  ACTIONS.SELECT_MULTI,
  ACTIONS.MOVE_MULTI,
  ACTIONS.PASTE
];

const ActionsMenu = ({ activeAction, setActiveAction, subMenuProps = {} }) => (
  <div>
    <h4>Actions</h4>
    <ListGroup>
      {ACTIONS_LIST.map(action => (
        <ListGroupItem
          key={action.id}
          active={activeAction === action}
          disabled={action.disabled}
          onClick={() => !action.disabled && setActiveAction(action)}
        >
          <Row>
            <Col xs={12}>{action.name}</Col>
          </Row>
          {action.menu &&
            subMenuProps[action.id] && (
              <Row>
                <Col xs={12} onClick={e => e.stopPropagation()}>
                  {React.createElement(action.menu, subMenuProps[action.id])}
                </Col>
              </Row>
            )}
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default ActionsMenu;
