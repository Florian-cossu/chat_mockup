"use client";

import React from "react";
import { ChatConversation } from "@/types/types";
import ChatMessageBubble from "./chatMessageBubble";

interface ChatConversationViewProps {
  conversation: ChatConversation;
  color1: string;
}

export default function ChatConversationView({
  conversation,
  color1,
}: ChatConversationViewProps) {
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full">
      {conversation.map((msg) => {
        const replyTo = msg.repliesTo
          ? conversation.find((m) => m.id === msg.repliesTo)
          : undefined;

        return (
          <ChatMessageBubble
            key={msg.id}
            color1={color1}
            message={msg}
            replyToMessage={replyTo}
          />
        );
      })}
    </div>
  );
}
