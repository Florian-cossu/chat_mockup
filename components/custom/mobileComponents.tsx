"use client";

import React from "react";
import { usePreferences } from "@/contexts/preferencesContext";

export default function MobileGestureBar() {
  const { layout } = usePreferences();
  const styles = {
    mobile: "h-1 w-1/3 rounded-full bg-current",
    desktop: "hidden",
    auto: "h-1 w-1/3 rounded-full bg-current md:hidden",
  }
  return (
    <>
      <span className={styles[layout]}></span>
    </>
  );
}