"use client";

import React from "react";
import { ChatConversation } from "@/types/types";
import ChatMessageBubble from "./chatMessageBubble";
import { sortByTimestamp } from "@/lib/utils";
import { getContrastColor } from "@/lib/fontColorAdjust";

interface ChatConversationViewProps {
  conversation: ChatConversation;
}

export default function ChatConversationView({
  conversation,
}: ChatConversationViewProps) {
  return (
    <div className="flex flex-col p-4">
      {sortByTimestamp(conversation).map((msg, index) => {
        const replyTo = msg.repliesTo
          ? conversation.find((m) => m.id === msg.repliesTo)
          : undefined;

        const prevDir =
          index > 0 ? conversation[index - 1].direction : undefined;
        const nextDir =
          index < conversation.length - 1
            ? conversation[index + 1].direction
            : undefined;

        return (
          <ChatMessageBubble
            key={msg.id}
            message={msg}
            replyToMessage={replyTo}
            previousDirection={prevDir}
            nextDirection={nextDir}
            forceColor={msg.forceColor ? msg.forceColor : undefined}
            fontColor={
              msg.forceColor ? getContrastColor(msg.forceColor) : undefined
            }
          />
        );
      })}
    </div>
  );
}
