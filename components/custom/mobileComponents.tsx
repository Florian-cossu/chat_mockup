"use client";

import React from "react";

export interface LayoutType {
  layout: "mobile" | "desktop" | "auto";
}

export default function MobileGestureBar({ layout }: LayoutType) {
  return layout === "mobile" ? (
    <>
      <span className="h-1 w-1/3 rounded-full bg-current"></span>
    </>
  ) : null;
}
