"use client";

import React, { useEffect, useState } from "react";
import { ChatMessage } from "@/types/types";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/contexts/preferencesContext";
import { getContrastColor } from "@/lib/fontColorAdjust";
import { LocalTime } from "./localTime";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  replyToMessage?: ChatMessage;
}

export default function ChatMessageBubble({
  message,
  replyToMessage,
}: ChatMessageBubbleProps) {
  const { color1 } = usePreferences();
  const [incomingColor, setIncomingColor] = useState("");

  useEffect(() => {
    setIncomingColor(getContrastColor(color1));
  }, [color1]);

  return (
    <>
      <div
        className={cn(
          "max-w-[70%] px-4 py-2 my-1 rounded-lg relative",
          message.direction === "in" ? "self-start" : "self-end bg-muted"
        )}
        style={{
          backgroundColor: message.direction === "in" ? color1 : "",
        }}
      >
        {replyToMessage && (
          <div className="mb-1 px-2 py-1 text-sm rounded bg-background/90 border-l-3">
            <span className="block font-medium">
              {replyToMessage.text.slice(0, 40)}
            </span>
          </div>
        )}

        <p
          className="whitespace-pre-wrap"
          style={{ color: message.direction == "in" ? incomingColor : "" }}
        >
          {message.text}
        </p>

        <div
          className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70"
          style={{ color: message.direction == "in" ? incomingColor : "" }}
        >
          {message.seen && message.direction === "out" && (
            <CheckCheck size={14} />
          )}
          <span><LocalTime iso={message.timestamp} /></span>
        </div>
      </div>
      {message.emoji && (
        <span className="mt-[-1rem] px-2 w-fit h-fit z-10 rounded-[.9rem] bg-zinc-100 border-4 border-card cursor-pointer">
          <p className="text-shadow-md">{message.emoji}</p>
        </span>
      )}
    </>
  );
}
