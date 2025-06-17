"use client";

import React from "react";
import { ChatMessage } from "@/types/types";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  color1: string;
  replyToMessage?: ChatMessage;
}

export default function ChatMessageBubble({
  message,
  replyToMessage,
  color1,
}: ChatMessageBubbleProps) {
  return (
    <div
      className={cn(
        "max-w-[70%] px-4 py-2 my-1 rounded-lg shadow-sm relative",
        message.direction === "in" ? "self-start" : "self-end"
      )}
      style={{
        backgroundColor: message.direction === "in" ? color1 : "bg-muted",
      }}
    >
      {replyToMessage && (
        <div className="mb-1 px-2 py-1 text-sm rounded bg-accent">
          <span className="block font-medium">
            {replyToMessage.text.slice(0, 40)}
          </span>
        </div>
      )}

      <p className="whitespace-pre-wrap">{message.text}</p>

      <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70">
        {message.emoji && <span>{message.emoji}</span>}
        {message.seen && <CheckCheck size={14} />}
        <span>
          {new Date(message.timestamp).toISOString().slice(11, 16)}
        </span>
      </div>
    </div>
  );
}
