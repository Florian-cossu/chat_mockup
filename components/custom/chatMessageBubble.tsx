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
  className?: string;
  previousDirection?: "in" | "out";
  nextDirection?: "in" | "out";
  forceColor?: string;
  fontColor?: string;
}

export default function ChatMessageBubble({
  message,
  replyToMessage,
  className,
  previousDirection,
  nextDirection,
  forceColor,
  fontColor,
}: ChatMessageBubbleProps) {
  const { color1, contactName } = usePreferences();
  const [incomingColor, setIncomingColor] = useState("");
  const direction = message.direction;

  const bubbleStyles: React.CSSProperties = {
    ...(message.forceColor !== undefined
      ? { backgroundColor: forceColor }
      : direction === "in"
      ? { backgroundColor: color1 }
      : {}),
    ...(fontColor ? { color: fontColor } : {}),
  };

  const bubbleStyle = (() => {
    const samePrev = previousDirection === direction;
    const sameNext = nextDirection === direction;

    const parts = ["rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg"];

    if (!samePrev) parts.push("mt-1");
    if (!samePrev && !sameNext)
      parts.push(`rounded-${direction == "in" ? "tl" : "br"}-xs`);
    if (samePrev) parts.push(`rounded-${direction == "in" ? "tl" : "tr"}-xs`);
    if (sameNext) parts.push(`rounded-${direction == "in" ? "bl" : "br"}-xs`);

    return parts.join(" ");
  })();

  useEffect(() => {
    setIncomingColor(getContrastColor(color1));
  }, [color1]);

  return (
    <>
      <div
        className={cn(
          "max-w-[70%] px-4 py-2 my-1 relative text-sm",
          bubbleStyle,
          direction === "in" ? "self-start" : "self-end bg-current/20",
          className
        )}
        style={bubbleStyles}
      >
        {replyToMessage && (
          <div className="mb-1 px-2 py-1 text-xs rounded bg-background/60 border-background/80 border-l-3">
            <span className="block font-medium">
              <p className="font-bold">
                {replyToMessage.direction == "in" ? contactName : "You"}
              </p>
              {replyToMessage.text.slice(0, 40)}
            </span>
          </div>
        )}

        <p
          className="whitespace-pre-wrap"
          style={{ color: direction == "in" ? incomingColor : "" }}
        >
          {message.text}
        </p>

        <div
          className="flex items-center justify-end gap-1 mt-1 text-[.6rem] opacity-70"
          style={{ color: direction == "in" ? incomingColor : "" }}
        >
          {message.seen && direction === "out" && <CheckCheck size={10} />}
          <span>
            <LocalTime iso={message.timestamp} />
          </span>
        </div>
      </div>
      {message.emoji && (
        <span
          className={`mt-[-1rem] ${
            direction == "in" ? "" : "self-end"
          } px-2 w-fit h-fit z-10 rounded-[.9rem] bg-zinc-100 border-4 border-card cursor-pointer`}
        >
          <p className="text-shadow-md">{message.emoji}</p>
        </span>
      )}
    </>
  );
}
