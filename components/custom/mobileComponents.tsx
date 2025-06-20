import React, { useState, useEffect } from "react";
import { usePreferences } from "@/contexts/preferencesContext";
import Facebook from "@icons/thirdPartyAppIcons/facebook_icon.svg";
import Slack from "@icons/thirdPartyAppIcons/slack_icon.svg";
import Twitch from "@icons/thirdPartyAppIcons/twitch_icon.svg";
import Instagram from "@icons/thirdPartyAppIcons/instagram_icon.svg";
import Message from "@icons/thirdPartyAppIcons/sms_icon.svg";
import SignalMessaging from "@icons/thirdPartyAppIcons/signal_icon.svg";
import { cn } from "@/lib/utils";

import { Wifi, Signal, BatteryMedium } from "lucide-react";

import { useFormattedTime as formattedClock } from "./timeClock";

export default function MobileGestureBar() {
  const { layout } = usePreferences();
  const styles = {
    mobile: "h-1 w-1/3 rounded-full bg-current",
    desktop: "hidden",
    auto: "h-1 w-1/3 rounded-full bg-current md:hidden",
  };
  return (
    <>
      <span className={styles[layout]}></span>
    </>
  );
}

const icons = [Twitch, Facebook, Instagram, Slack, Message, SignalMessaging];

export function RandomIcons() {
  const [selectedIcons, setSelectedIcons] = useState<React.ElementType[]>([]);
  const iconSize = "4";

  useEffect(() => {
    const iconCount = Math.floor(Math.random() * 3);
    if (iconCount === 0) {
      setSelectedIcons([]);
    } else {
      const shuffled = [...icons].sort(() => Math.random() - 0.5);
      setSelectedIcons(shuffled.slice(0, Math.min(iconCount, icons.length)));
    }
  }, []);

  if (selectedIcons.length === 0) return null;

  return (
    <>
      {selectedIcons.map((IconComponent, index) => (
        <IconComponent key={index} className={`w-${iconSize} h-${iconSize}`} />
      ))}
    </>
  );
}

export function MobileStatusBar() {
  const { layout } = usePreferences();

  let mobileComponentsStyle = "";

  if (layout === "auto") {
    mobileComponentsStyle = "md:hidden";
  } else if (layout === "mobile") {
    mobileComponentsStyle = "";
  } else if (layout === "desktop") {
    mobileComponentsStyle = "hidden";
  }
  return (
    <>
      <div
        className={cn(
          "flex flex-row p-2 w-full justify-between",
          mobileComponentsStyle
        )}
        id="mobileStatusBar"
      >
        <div
          className="flex flex-row gap-1 items-center"
          id="mobileStatusBarLeft"
        >
          <p className="text-xs">{formattedClock()}</p>
          <RandomIcons />
        </div>
        <div className="flex flex-row gap-2" id="mobileStatusBarRight">
          <Wifi className="w-4 h-4" />
          <Signal className="w-4 h-4" />
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>
    </>
  );
}
