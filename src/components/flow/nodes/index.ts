import TextMessage from "./text-message";

export type MessageNode = {
  key: string;
  name: string;
  image: string;
  generate: Function;
  Node: React.FunctionComponent<any>;
  Settings: React.FunctionComponent<any>;
};

const NODE_TYPES: { [key: string]: MessageNode } = {};

// add all custom nodes here
NODE_TYPES[TextMessage.key] = TextMessage;

export default NODE_TYPES;
