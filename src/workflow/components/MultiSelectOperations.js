import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export const MULTI_SELECT_OPERATIONS = {
  REMOVE: { id: "REMOVE", name: "Remove selection", disabled: true },
  COPY: { id: "COPY", name: "Copy selection", disabled: true }
};

const MULTI_SELECT_OPERATIONS_LIST = [
  MULTI_SELECT_OPERATIONS.REMOVE,
  MULTI_SELECT_OPERATIONS.COPY
];

const MultiSelectOperations = ({ runOperation }) => (
  <div>
    <h4>Multiple Selection operations</h4>
    <ListGroup>
      {MULTI_SELECT_OPERATIONS_LIST.map(operation => (
        <ListGroupItem
          key={operation.id}
          disabled={operation.disabled}
          onClick={() => !operation.disabled && runOperation(operation.id)}
        >
          {operation.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default MultiSelectOperations;
