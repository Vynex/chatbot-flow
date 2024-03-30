"use client"

import React, { useEffect, useState } from "react";
import { Node, useReactFlow } from "reactflow";

import { TextMessageData } from "./Node";
import { Textarea } from "@/components/ui/textarea";

interface IProps {
  selected: Node<TextMessageData>;
};

const SettingsPanel: React.FunctionComponent<IProps> = ({ selected }) => {
  const reactFlow = useReactFlow();
  const [ message, setMessage ] = useState(selected.data.message);

  useEffect(() => {
    // side-effect to run, whenever selected node changes
    setMessage(selected.data.message);
  }, [ selected ]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);

    reactFlow.setNodes((oldNodes) => {
      const updatedNodes = oldNodes.map((node) => {
        if (node.id !== selected.id) return node;
        return { ...node, data: { ...node.data, message: event.target.value } };
      });

      return updatedNodes;
    });
  };

  return (
    <section className="px-4 py-6 border-b border-b-gray-300">
      <label className="text-xs mb-2 block text-gray-500">Text</label>
      <Textarea className="bg-card w-full" value={message} onChange={handleChange} />
    </section>
  );
};

export default SettingsPanel;
