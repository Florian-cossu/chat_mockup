"use client";
import React, { useMemo } from "react";
import { ChatConversation } from "@/types/types";
import ChatMessageBubble from "./chatMessageBubble";
import { sortByTimestamp } from "@/lib/utils";
import { getContrastColor } from "@/lib/fontColorAdjust";
import DateSeparator from "./dateSeparator";

interface ChatConversationViewProps {
  conversation: ChatConversation;
}

export default function ChatConversationView({
  conversation,
}: ChatConversationViewProps) {
  const sortedConversation = sortByTimestamp(conversation);
  const messageMap = useMemo(() => new Map(conversation.map(msg => [msg.id, msg])), [conversation]);
  
  return (
    <div className="flex flex-col p-4">
      {sortedConversation.map((msg, index) => {

        const replyTo = msg.repliesTo 
          ? messageMap.get(msg.repliesTo) 
          : undefined;
          
        const prevMessage = index > 0 ? sortedConversation[index - 1] : undefined;
        const nextMessage = index < sortedConversation.length - 1 
          ? sortedConversation[index + 1] 
          : undefined;

        const showSeparator = prevMessage && 
            new Date(prevMessage.timestamp).toDateString() !== new Date(msg.timestamp).toDateString();
        
        return (
          <React.Fragment key={msg.id}>
            {showSeparator && (
              <div className="text-center text-xs text-gray-500 my-2">
                <DateSeparator
                  date={msg.timestamp}
                />
              </div>
            )}
            <ChatMessageBubble
              key={msg.id}
              message={msg}
              replyToMessage={replyTo}
              previousDirection={prevMessage?.direction}
              previousTimeStamp={prevMessage?.timestamp}
              nextDirection={nextMessage?.direction}
              nextTimestamp={nextMessage?.timestamp}
              forceColor={msg.forceColor ? msg.forceColor : undefined}
              fontColor={
                msg.forceColor ? getContrastColor(msg.forceColor) : undefined
              }
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}