"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChatConversation, ChatMessage } from "@/types/types";

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
    text: "Hey there! 👋",
    timestamp: new Date().toISOString(),
    seen: true,
  },
  {
    id: "2",
    direction: "in",
    text: "Welcome to your chat mockup. You can click the profile picture or name to change them!",
    timestamp: new Date().toISOString(),
    seen: true,
  },
  {
    id: "3",
    direction: "in",
    text: "Tip: Try switching themes or layouts from the menu!",
    timestamp: new Date().toISOString(),
    seen: true,
    emoji: "✨",
  },
  {
    id: "4",
    direction: "out",
    text: "Cool, thanks! 😄",
    timestamp: new Date().toISOString(),
    repliesTo: "3",
    seen: true,
  },
];

const PreferenceContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: { color1: string; color2: string };
}) => {
  const [contactName, setContactName] = useState("Anonymous");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [layout, setLayout] = useState<"mobile"|"desktop"|"auto">("auto");

  const [color1, setColor1] = useState(initialTheme.color1);
  const [color2, setColor2] = useState(initialTheme.color2);
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