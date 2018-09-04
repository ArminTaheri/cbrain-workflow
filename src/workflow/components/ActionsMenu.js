import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export const ACTIONS = {
  NONE: { id: "NONE", name: "None" },
  PAN: { id: "PAN", name: "Pan view", disabled: true },
  MOVE: { id: "MOVE", name: "Move nodes" },
  REMOVE_NODE: { id: "REMOVE_NODE", name: "Remove nodes" },
  CONNECT: { id: "CONNECT", name: "Connect nodes" },
  PLACE_FILE_FILTER: { id: "PLACE_FILE_FILTER", name: "Place file filters" },
  PLACE_TASK: { id: "PLACE_TASK", name: "Place tasks", disabled: true },
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
  ACTIONS.SELECT_MULTI,
  ACTIONS.MOVE_MULTI,
  ACTIONS.PASTE
];

const ActionsMenu = ({ activeAction, setActiveAction }) => (
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
          {action.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default ActionsMenu;
