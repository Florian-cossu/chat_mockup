import React, {useState, useEffect} from "react";
import { usePreferences } from "@/contexts/preferencesContext";
import Facebook from "@icons/thirdPartyAppIcons/facebook_icon.svg"
import Slack from "@icons/thirdPartyAppIcons/slack_icon.svg"
import Twitch from "@icons/thirdPartyAppIcons/twitch_icon.svg"
import Instagram from "@icons/thirdPartyAppIcons/instagram_icon.svg"
import Message from "@icons/thirdPartyAppIcons/sms_icon.svg"
import SignalMessaging from "@icons/thirdPartyAppIcons/signal_icon.svg"

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

const icons = [Twitch, Facebook, Instagram, Slack, Message, SignalMessaging];

export function RandomIcons() {
  const [selectedIcons, setSelectedIcons] = useState<React.ElementType[]>([]);
  const iconSize = "4"

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