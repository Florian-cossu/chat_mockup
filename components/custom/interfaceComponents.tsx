"use client";

import React, { useLayoutEffect, useRef } from "react";
import ProfilePictureSelector from "./ProfilePictureSelector";
import {
  Video,
  Phone,
  Search,
  Minus,
  ChevronsUpDown,
  Plus,
  Wifi,
  Signal,
  BatteryMedium,
} from "lucide-react";
import { RandomIcons } from "./mobileComponents";
import { usePreferences } from "@/contexts/preferencesContext";
import { CardHeader } from "@components/ui/card";
import { cn } from "@/app/functions/functions";
import { useFormattedTime as formattedClock } from "./timeClock";
import MenuTopBar from "./menu";

export function ScreenshotCardHeader() {
  const { layout } = usePreferences();

  let mobileComponentsStyle = "";
  let desktopComponentsStyle = "";

  if (layout === "auto") {
    mobileComponentsStyle = "md:hidden";
    desktopComponentsStyle = "hidden md:flex";
  } else if (layout === "mobile") {
    mobileComponentsStyle = "";
    desktopComponentsStyle = "hidden";
  } else if (layout === "desktop") {
    mobileComponentsStyle = "hidden";
    desktopComponentsStyle = "";
  }

  return (
    <>
      <CardHeader className="flex flex-col m-0 p-0 gap-0 h-fit items-center border-b-1 shadow-sm">
        <div
          className={cn(
            "flex flex-row gap-1.5 p-2 w-full border-b-1 justify-end pointer-events-auto",
            desktopComponentsStyle
          )}
          id="windowButtons"
        >
          <span
            id="maximise"
            className="flex rounded-full w-4 h-4 bg-emerald-400 hover:bg-emerald-300 cursor-pointer transitions items-center justify-center"
          >
            <ChevronsUpDown className="w-3 h-3 rotate-45 windowAction transitions" />
          </span>
          <span
            id="minimise"
            className="flex rounded-full w-4 h-4 bg-amber-400 hover:bg-amber-300 cursor-pointer transitions items-center justify-center"
          >
            <Minus className="w-3 h-3 windowAction transitions" />
          </span>
          <span
            id="close"
            className="flex rounded-full w-4 h-4 bg-red-500 hover:bg-red-400 cursor-pointer transitions items-center justify-center"
          >
            <Plus className="w-3 h-3 rotate-45 windowAction transitions" />
          </span>
        </div>
        {/* Mobile notification bar */}
        <div
          className={cn(
            "flex flex-row p-2 w-full justify-between",
            mobileComponentsStyle
          )}
          id="mobileStatusBar"
        >
          <div className="flex flex-row gap-1 items-center" id="mobileStatusBarLeft">
            <p className="text-xs">{formattedClock()}</p>
            <RandomIcons />
          </div>
          <div className="flex flex-row gap-2" id="mobileStatusBarRight">
            <Wifi className="w-4 h-4" />
            <Signal className="w-4 h-4" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>
        {/* Menu bar with contact info */}
        <TopMenuBar />
      </CardHeader>
    </>
  );
}

export function TopMenuBar() {
  const { contactName, setContactName } = usePreferences();

  // hacky section to resize the input text because it cannot be updated dynamycally otherwise
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth + 2}px`;
    }
  }, [contactName]);

  return (
    <>
      <div className="justify-between grow !w-full flex flex-row p-2">
        <div
          id="contactDetails"
          className="flex flex-row !min-w-fit items-center gap-2"
        >
          <div id="contactProfilePic">
            <ProfilePictureSelector />
          </div>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={contactName}
              placeholder="Contact Name"
              className="text-foreground bg-transparent border-none outline-none transitions focus:underline hover:underline hover:decoration-sky-400"
              onChange={(e) => setContactName(e.target.value)}
            />
            {/* Hidden span for measuring text width */}
            <span
              ref={spanRef}
              className="invisible absolute top-0 left-0 whitespace-pre font-inherit"
            >
              {contactName || "Contact Name"}
            </span>
          </div>
        </div>
        <div
          id="contactQuickActions"
          className="flex flex-row gap-3 items-center pointer-events-auto"
        >
          <Video className="w-5 h-5 cursor-pointer" />
          <Search className="w-5 h-5 cursor-pointer" />
          <Phone className="w-5 h-5 cursor-pointer" />
          <MenuTopBar />
        </div>
      </div>
    </>
  );
}
