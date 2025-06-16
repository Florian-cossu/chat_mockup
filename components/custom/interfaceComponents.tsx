"use client";

import React, { useLayoutEffect, useRef } from "react";
import ProfilePictureSelector from "./ProfilePictureSelector";
import {
  Video,
  Phone,
  Search,
  EllipsisVertical,
  Github,
  Info,
  MonitorSmartphone,
  Smartphone,
  Laptop,
  ImageUpscale,
  Minus,
  ChevronsUpDown,
  Plus,
  Wifi,
  Signal,
  BatteryMedium,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferences } from "@/contexts/preferencesContext";
import { CardHeader } from "@components/ui/card";
import { cn } from "@/app/functions/functions";

export function ScreenshotCardHeader() {
  const { layout } = usePreferences();

  let mobileComponentsStyle = "";
  let desktopComponentsStyle = "";

  const date = new Date();
  const formattedDate = `${date.getHours()}:${date.getMinutes()}`;

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
      <CardHeader className="flex flex-col m-0 p-0 gap-0 h-fit items-center border-b-1">
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
        <div
          className={cn(
            "flex flex-row p-2 w-full justify-between",
            mobileComponentsStyle
          )}
          id="mobileStatusBar"
        >
          <div id="mobileStatusBarLeft">
            <p className="text-xs">{formattedDate}</p>
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
  const { contactName, setContactName, layout, setLayout } = usePreferences();
  const layouts = ["auto", "mobile", "desktop"];

  // hacky section to resize the input text because it cannot be updated dynamycally otherwise
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth + 2}px`;
    }
  }, [contactName]);
  //

  function returnIcon(type: string) {
    switch (type) {
      case "auto":
        return (
          <>
            <MonitorSmartphone /> Auto
          </>
        );
      case "mobile":
        return (
          <>
            <Smartphone /> Mobile
          </>
        );
      case "desktop":
        return (
          <>
            <Laptop /> Desktop
          </>
        );
    }
  }

  return (
    <>
      <div className="justify-between grow !w-full flex flex-row px-2 py-1">
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
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical className="w-5 h-5 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>
              <div
                id="versionNumber"
                className="flex flex-row cursor-pointer p-3 rounded items-center"
              >
                <ImageUpscale className="mr-2 w-5 h-5" />
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger className="w-[280px] cursor-pointer text-foreground rounded-sm">
                    <SelectValue
                      placeholder={
                        layout ? returnIcon(layout) : "Select layout"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {layouts.map((value) => (
                      <SelectItem key={value} value={value}>
                        {returnIcon(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div
                id="githubLink"
                className="flex flex-row cursor-pointer hover:bg-accent p-3 rounded items-center"
              >
                <Github className="mr-2 w-4 h-4" />
                <a href="https://github.com/Florian-cossu/chat_mockup">
                  <span className="underline">
                    &rarr; Chat Mockup on Github
                  </span>
                </a>
              </div>
              <div
                id="versionNumber"
                className="flex flex-row cursor-pointer hover:bg-accent p-3 rounded items-center"
              >
                <Info className="mr-2 w-4 h-4" /> Version 2
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
