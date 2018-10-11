import * as R from "ramda";
import React from "react";
import { Nav, NavItem, Button, Row, Col } from "react-bootstrap";
import { compose, withState } from "recompose";
import GraphLayer from "../components/graph/GraphLayer";

const withEditableInputName = compose(
  withState("editing", "setEditing", false),
  withState("inputName", "setInputName", null)
);

const WorkflowName = withEditableInputName(
  ({ inputName = null, setInputName, editing, setEditing, name, setName }) => {
    return (
      <Row>
        <Col md={1}>
          <h4>Name: </h4>
        </Col>
        <Col md={8}>
          {editing ? (
            <Row>
              <Col xs={8}>
                <input
                  type="text"
                  value={inputName || name}
                  onChange={e => setInputName(e.target.value)}
                />
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={6}>
                    <Button
                      onClick={() => {
                        setName(inputName);
                        setInputName(null);
                        setEditing(false);
                      }}
                      bsStyle="default"
                    >
                      Save
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button
                      onClick={() => {
                        setInputName(null);
                        setEditing(false);
                      }}
                      bsStyle="default"
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col xs={10}>
                <h4>{name}</h4>
              </Col>
              <Col xs={2}>
                <Button onClick={() => setEditing(true)} bsStyle="default">
                  Edit
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    );
  }
);

const WorkflowTabBar = ({
  workflows = { active: null, table: [] },
  setActiveWorkflow,
  addWorkflow
}) => {
  const tableValues = R.values(workflows.table);
  return (
    <Nav bsStyle="pills" stacked activeKey={workflows.active || tableValues[0]}>
      {tableValues.map((workflow, i) => (
        <NavItem
          key={workflow.id}
          eventKey={workflow.id}
          onClick={() => setActiveWorkflow(workflow.id)}
        >
          {workflow.name}
        </NavItem>
      ))}
      <NavItem key="add-new" onClick={() => addWorkflow()}>
        Add New Workflow
      </NavItem>
    </Nav>
  );
};

const WorkflowTabs = ({
  workflows = { active: null, table: {} },
  setActiveWorkflow,
  addWorkflow,
  setWorkflowName,
  ...graphLayerProps
}) => {
  const workflow =
    workflows.table[workflows.active] || R.values(workflows.table)[0];

  return (
    <Row>
      {/* TODO: Remove hardcoded height */}
      <Col md={10}>
        {!workflow ? (
          <Row>
            <Col xs={12}>
              <h4>There are no workflows to edit.</h4>
            </Col>
          </Row>
        ) : (
          <Row>
            <WorkflowName name={workflow.name} setName={setWorkflowName} />
            <Col xs={12} style={{ height: "800px" }}>
              <GraphLayer graph={workflow.graph} {...graphLayerProps} />
            </Col>
          </Row>
        )}
      </Col>
      <Col md={2} style={{ marginTop: "50px" }}>
        <WorkflowTabBar
          workflows={workflows}
          setActiveWorkflow={setActiveWorkflow}
          addWorkflow={addWorkflow}
        />
      </Col>
    </Row>
  );
};

export default WorkflowTabs;
