"use client"
import React from "react";
import { ReactFlowProvider, useEdgesState, useNodesState } from "reactflow";

import FlowBuilder from "@/components/flow/builder/FlowBuilder";
import FlowHeader from "@/components/flow/layout/FlowHeader";
import Sidebar from "@/components/flow/layout/Sidebar";

const ChatbotFlow: React.FunctionComponent = () => {
  const [ nodes, setNodes ] = useNodesState([]);
  const [ edges, setEdges ] = useEdgesState([]);

  return (
    <ReactFlowProvider>
      <main className="grid min-h-screen w-full grid-cols-[3.5fr_1fr] [grid-template-areas:'header_header''main_aside'] grid-rows-[4rem_1fr]">
        <FlowHeader />

        <section className="h-full w-full [grid-area:main]">
          <FlowBuilder nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
        </section>

        <Sidebar />
      </main>
    </ReactFlowProvider>
  );
}

export default ChatbotFlow;
