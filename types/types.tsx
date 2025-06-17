export type LayoutType = "mobile" | "desktop" | "auto";

export type ChatMessage = {
  id: string;                 // unique, for React keys
  direction: "in" | "out";    // incoming or outgoing
  text: string;               // the message text
  timestamp: string;            // when it was sent/received
  seen: boolean;              // has it been seen / opened
  emoji?: string;             // optional reaction
  repliesTo?: string;         // optional ID of the message this replies to
};

export type ChatConversation = ChatMessage[];