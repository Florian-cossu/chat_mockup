"use client";

import React, { useEffect, useState } from "react";
import { ChatMessage } from "@/types/types";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/contexts/preferencesContext";
import { getContrastColor } from "@/lib/fontColorAdjust";
import { LocalTime } from "./localTime";
import { getTimestampDiffs } from "@/app/functions/functions";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  replyToMessage?: ChatMessage;
  className?: string;
  previousDirection?: "in" | "out";
  previousTimeStamp?: string;
  nextDirection?: "in" | "out";
  nextTimestamp?: string;
  forceColor?: string;
  fontColor?: string;
}

export default function ChatMessageBubble({
  message,
  replyToMessage,
  className,
  previousDirection,
  previousTimeStamp,
  nextDirection,
  nextTimestamp,
  forceColor,
  fontColor,
}: ChatMessageBubbleProps) {
  const { color1, contactName, layout } = usePreferences();
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
    const timeDiffWithPrev = previousTimeStamp 
      ? getTimestampDiffs(message.timestamp, previousTimeStamp).totalMinutes 
      : Infinity;
    
    const sameNext = nextDirection === direction;
    const timeDiffWithNext = nextTimestamp 
      ? getTimestampDiffs(message.timestamp, nextTimestamp).totalMinutes 
      : Infinity;

    const isGroupedWithPrev = samePrev && timeDiffWithPrev < 5;
    const isGroupedWithNext = sameNext && timeDiffWithNext < 5;
    
    let classes = "rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg";
    
    if (!isGroupedWithPrev) {
      classes += " mt-3";
    }
    
    if (isGroupedWithPrev) {
      classes += ` rounded-${direction === "in" ? "tl" : "tr"}-xs`;
    }
    
    if (isGroupedWithNext) {
      classes += ` rounded-${direction === "in" ? "bl" : "br"}-xs`;
    }
    
    if (!isGroupedWithPrev && !isGroupedWithNext) {
      classes += ` rounded-${direction === "in" ? "tl" : "br"}-xs`;
    }
    
    return classes;
  })();

  const baseTextSize = layout == "mobile"
    ? "text-xs"
    : "text-xs sm:text-sm";

  useEffect(() => {
    setIncomingColor(getContrastColor(color1));
  }, [color1]);

  return (
    <>
      <div
        className={cn(
          "max-w-[87%] px-4 py-2 my-[.08rem] relative",
          bubbleStyle,
          baseTextSize,
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
          className={`-mt-4 ${
            direction == "in" ? "" : "self-end"
          } px-2 w-fit h-fit z-10 rounded-[.9rem] bg-zinc-100 border-4 border-card cursor-pointer`}
        >
          <p className="text-shadow-md">{message.emoji}</p>
        </span>
      )}
    </>
  );
}
