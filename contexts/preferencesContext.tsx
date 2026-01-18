"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChatConversation, ChatMessage } from "@/types/types";
import { PLACEHOLDER_COLOR } from "@/data/themes";


export function normalizeConversation(conversation: ChatConversation): ChatConversation {
  return conversation.map(msg => ({
    ...msg,
    repliesTo: msg.repliesTo || undefined,
    emoji: msg.emoji || undefined,
  }));
}

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

  showWatermark: boolean;
  setShowWatermark: (showWaterMark: boolean) => void;

  exportToJSON: () => string;
  importFromJSON: (json: string) => void;

  // Add more shared data here if needed:
  // otherData: string;
  // setOtherData: (val: string) => void;
}

/**
 * Serializable snapshot of user preferences.
 * Used for JSON export / import.
 * 
 * ⚠️ Must remain backward-compatible via the `version` field.
 */
export interface PreferencesSnapshot {
  contactName: string;
  layout: "mobile" | "desktop" | "auto";
  profilePicture: string | null;
  color1: string;
  color2: string;
  conversation: ChatConversation;
  showWatermark: boolean;
  version: number;
}

const defaultConversation: ChatConversation = [
  {
    id: "1",
    direction: "in",
    text: "Hey there! 👋 This is still a work in progress but you can already test it.",
    timestamp: "2025-06-18T16:01:00.000Z",
    seen: true,
  },
  {
    id: "2",
    direction: "in",
    text: "Welcome to your chat mockup. You can click the profile picture or name to change them!",
    timestamp: "2025-06-18T16:05:49.673Z",
    seen: true,
  },
  {
    id: "3",
    direction: "in",
    text: "🛟: Check the helpcenter out in the menu ↗️ to have a features recap.",
    timestamp: "2025-06-18T16:12:49.673Z",
    repliesTo: "2",
    seen: true,
    emoji: "🧑‍🎨",
  },
  {
    id: "4",
    direction: "out",
    text: "Cool, thanks! 😄",
    timestamp: "2025-06-18T16:55:49.673Z",
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
  
  const [showWatermark, setShowWatermark] = useState(true);

  /**
   * Exports the current user preferences as a JSON string.
   *
   * @returns {string} A formatted JSON string representing current preferences
   *
   * @example
   * const json = exportToJSON();
   * console.log(json);
   *
   * @example
   * // Download as a file
   * const blob = new Blob([exportToJSON()], { type: "application/json" });
   */
  const exportToJSON = () => {
    const snapshot: PreferencesSnapshot = {
      contactName,
      layout,
      profilePicture,
      color1,
      color2,
      conversation,
      showWatermark,
      version: 1,
    };

    return JSON.stringify(snapshot, null, 2);
  };

  /**
   * Imports and applies user preferences from a JSON string.
   *
   * - Parses and validates the JSON structure
   * - Checks snapshot version compatibility
   * - Updates the global preferences state
   *
   * ⚠️ If an error occurs, the current state remains unchanged.
   *
   * @param {string} json - A JSON string containing a valid preferences snapshot
   *
   * @throws {Error} If the JSON is invalid or the snapshot version is unsupported
   *
   * @example
   * importFromJSON(jsonString);
   *
   * @example
   * // Import from a file input
   * reader.onload = () => {
   *   importFromJSON(reader.result as string);
   * };
   */
  const importFromJSON = (json: string) => {
    try {
      const data = JSON.parse(json) as PreferencesSnapshot;

      if (typeof data !== "object" || data === null) {
        throw new Error("Invalid JSON root");
      }

      if (data.version !== 1) {
        throw new Error("Unsupported version");
      }

      setContactName(data.contactName ?? "Anonymous");
      setLayout(data.layout ?? "auto");
      setProfilePicture(data.profilePicture ?? null);
      setColor1(data.color1 ?? PLACEHOLDER_COLOR);
      setColor2(data.color2 ?? PLACEHOLDER_COLOR);
      setChatConversation(normalizeConversation(data.conversation ?? []));
      setShowWatermark(Boolean(data.showWatermark));
    } catch (err) {
      console.error("Invalid preferences JSON", err);
      throw new Error("Invalid or corrupted JSON file");
    }
  };

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
        showWatermark,
        setShowWatermark,
        exportToJSON,
        importFromJSON,
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