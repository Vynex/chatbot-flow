import TextMessageNode from "./Node";
import SettingsPanel from "./Settings";

const TextMessage = {
  key: "textMessage",
  name: "Text Message",
  image: "/chat-text.svg",

  Node: TextMessageNode,
  Settings: SettingsPanel,

  generate: () => {
    const node = {
      type: "textMessage",
      data: { message: "Text Message" },
    };

    return node;
  },
};

export default TextMessage;
