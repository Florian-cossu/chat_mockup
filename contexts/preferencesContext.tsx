// app/context/ProfileContext.tsx (or wherever you prefer)
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface PreferencesContextType {
  contactName: string;
  setContactName: (name: string) => void;

  layout: "mobile"|"desktop"|"auto";
  setLayout: (layout: "mobile" | "desktop" | "auto") => void;

  profilePicture: string | null;
  setProfilePicture: (pic: string | null) => void;

  // Add more shared data here if needed:
  // otherData: string;
  // setOtherData: (val: string) => void;
}

const PreferenceContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [contactName, setContactName] = useState("Anonymous");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [layout, setLayout] = useState<"mobile"|"desktop"|"auto">("auto");

  useEffect (() => {
    console.log("Selected layout: ", layout);
  }, [layout]);

  return (
    <PreferenceContext.Provider
      value={{
        contactName,
        setContactName,
        layout,
        setLayout,
        profilePicture,
        setProfilePicture,
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