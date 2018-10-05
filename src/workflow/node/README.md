# Nodes

Workflow node types can be added or modified by editing the `NODE_CONFIGS`
object in [src/workflow/nodes/index.js](index.js). A configuration for a node type comes
from the `defualt` export of an `index.js` residing in a folder inside
[src/workflow/nodes/](./). 

# Node Configuration

A node's configuration is defined as follows
```
export default {
  contentType: prop-type to validate the content of this node type.
  component: react component to render the visual representation of a node.
  create: a function that takes the payload of the "place node" action and returns an object of the form:
    {
      content: {...},
      inputs: [{...}, {...}],
      outputs: [{...}, {...}]
    }
  edit: Function that takes the payload of the "edit node" action and returns a new node object
  invoke: Function that emits an object representing a backend operation in a chain of commands.
  inference: Function that takes the nodes and contexts of its inputs and returns its own inferred context to its outputs.
  postInference: Function that takes context and input nodes and dispatches an action to redux.
};
```
