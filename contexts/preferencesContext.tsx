"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChatConversation, ChatMessage } from "@/types/types";
import { PLACEHOLDER_COLOR } from "@/data/themes";

export interface PreferencesContextType {
  contactName: string;
  setContactName: (name: string) => void;

  layout: "mobile"|"desktop"|"auto";
  setLayout: (layout: "mobile" | "desktop" | "auto") => void;

  profilePicture: string | null;
  setProfilePicture: (pic: string | null) => void;

  color1: string;
  setColor1: (color1: string) => void;

  color2: string;
  setColor2: (color2: string) => void;

  conversation: ChatConversation;
  setChatConversation: (conversation: ChatConversation) => void;

  // Add more shared data here if needed:
  // otherData: string;
  // setOtherData: (val: string) => void;
}

const defaultConversation: ChatConversation = [
  {
    id: "1",
    direction: "in",
    text: "Hey there! 👋 This is still a work in progress but check this out.",
    timestamp: "2024-06-18T16:00:00.000Z",
    seen: true,
  },
  {
    id: "2",
    direction: "in",
    text: "Welcome to your chat mockup. You can click the profile picture or name to change them!",
    timestamp: "2025-06-18T14:55:49.673Z",
    seen: true,
  },
  {
    id: "3",
    direction: "in",
    text: "Tip: Try switching themes or layouts from the menu!",
    timestamp: "2025-06-18T14:55:49.673Z",
    seen: true,
    emoji: "🧑‍🎨",
  },
  {
    id: "4",
    direction: "out",
    text: "Cool, thanks! 😄",
    timestamp: "2025-06-18T14:55:49.673Z",
    repliesTo: "3",
    seen: true,
  },
];

const PreferenceContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [contactName, setContactName] = useState("Anonymous");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [layout, setLayout] = useState<"mobile"|"desktop"|"auto">("auto");

  const [color1, setColor1] = useState(PLACEHOLDER_COLOR);
  const [color2, setColor2] = useState(PLACEHOLDER_COLOR);
  const [conversation, setChatConversation] = useState<ChatMessage[]>(defaultConversation);


  return (
    <PreferenceContext.Provider
      value={{
        contactName,
        setContactName,
        layout,
        setLayout,
        profilePicture,
        setProfilePicture,
        color1,
        setColor1,
        color2,
        setColor2,
        conversation,
        setChatConversation,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferenceContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};