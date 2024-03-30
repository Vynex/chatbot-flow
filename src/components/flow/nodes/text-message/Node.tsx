"use client";

import Image from "next/image";
import { Handle, NodeProps, Position } from "reactflow";

export type TextMessageData = {
  message?: string,
}

export type TextMessageProps = NodeProps<TextMessageData>;

const TextMessage: React.FunctionComponent<TextMessageProps> = (props) => {
  return (
    <article className={`rounded-lg overflow-hidden w-96 shadow-lg transition-colors ${props.selected ? "outline outline-4 outline-teal-300" : "outline-none"}`}>
      <Handle type={"target"} position={Position.Left} className="p-1 !-left-2 !border-4" />

        <header className="flex bg-green-300 px-4 py-1 items-center gap-4">
          <Image alt={"bubble"} src={"/chat-text.svg"} width={16} height={16} />

          <span className="font-semibold flex-1 text-slate-800">Send Message</span>

          <div className="rounded-full bg-card w-5 h-5 flex items-center justify-center">
            <Image alt={"bubble"} src={"/whatsapp.svg"} width={16} height={16} />
          </div>
        </header>

        <section className="bg-card px-4 py-4">
          <div>
            {props.data.message}
          </div>
        </section>

      <Handle type={"source"} position={Position.Right} className="p-1 !-right-2 !border-4" />
    </article>
  );
}

export default TextMessage;
