"use client";

import { useEffect, useState } from "react";
import { Camera, Paperclip, Send } from "lucide-react";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import MobileGestureBar from "@/components/custom/mobileComponents";
import { ScreenshotCardHeader } from "@/components/custom/interfaceComponents";
import { usePreferences } from "@/contexts/preferencesContext";
import { useIsMobile } from "@/hooks/isMobile";
import { cn } from "@/lib/utils";
import ChatConversationView from "@/components/custom/chatConversationView";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage } from "@/types/types";
import { getRandomTheme, PLACEHOLDER_COLOR } from "@/data/themes";
import { getContrastColor } from "@/lib/fontColorAdjust";

export default function ChatMockup() {
  const {
    color1,
    color2,
    setColor1,
    setColor2,
    layout,
    conversation,
    setChatConversation,
  } = usePreferences();
  const isMobile = useIsMobile();
  const [inputText, setInputText] = useState("");
  const [watermarkTextColor, setWatermarkTextColor] = useState("");
  const [iconColor, setIconColor] = useState("");

  useEffect(() => {
    const theme = getRandomTheme();
    setColor1(theme.color1);
    setColor2(theme.color2);
  }, [setColor1, setColor2]);

  useEffect(() => {
    setWatermarkTextColor(getContrastColor(color2));
    setIconColor(getContrastColor(color1));
  }, [color1, color2]);

  function twStyleConstructor(layout: string) {
    if (isMobile) {
      return "h-[85dvh]";
    } else {
      switch (layout) {
        case "auto":
          return "w-4/5 h-[80dvh] md:w-4/5";
        case "mobile":
          return "w-[420px] h-[800px]";
        case "desktop":
          return "w-4/5 h-[80dvh]";
      }
    }
  }

  if (color1 !== PLACEHOLDER_COLOR) {
    return (
      <body
        className="antialiased bg-background flex flex-col transitions"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color2})`,
          height: isMobile ? "100dvh" : "unset",
          fontSize: isMobile ? ".8rem" : "unset",
        }}
      >
        <div className="flex flex-col m-0 p-0 w-[100vw] h-[100vh] items-center justify-items-center justify-center">
          <Card
            className={cn(
              `w-4/5 m-0 p-0 mb-6 gap-0`,
              twStyleConstructor(layout)
            )}
          >
            <ScreenshotCardHeader />
            <CardContent className="p-0 m-0 grow overflow-auto">
              <ChatConversationView conversation={conversation} />
            </CardContent>
            <CardFooter className="flex flex-col m-0 p-2 h-fit items-center justify-between border-t-1 gap-3">
              <div className="flex flex-row w-full gap-2 items-center justify-between">
                <input
                  type="text"
                  className="bg-accent rounded-full grow min-w-0.5 h-7 px-3"
                  value={inputText != "" ? inputText : ""}
                  placeholder="Type a message..."
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (inputText.trim() === "") return;
                      const newMessage: ChatMessage = {
                        id: uuidv4(),
                        direction: "out",
                        text: inputText.trim(),
                        timestamp: new Date().toISOString(),
                        seen: false,
                      };
                      setChatConversation([...conversation, newMessage]);
                      setInputText("");
                    }
                  }}
                ></input>
                <div id="messagingActions" className="flex flex-row gap-2">
                  <span
                    id="photo"
                    className="bg-transparent hover:bg-muted transitions"
                  >
                    <Camera className="w-5 h-5 justify-self-center" />
                  </span>
                  <span
                    id="attachment"
                    className="bg-transparent hover:bg-accent transitions"
                  >
                    <Paperclip className="w-5 h-5 justify-self-center" />
                  </span>
                  <span
                    id="send"
                    className="hover:brightness-110 transitions"
                    style={{ backgroundColor: color1, color: iconColor }}
                  >
                    <Send
                      className="mt-[.1rem] mr-[.1rem] w-4 h-4 justify-self-center drop-shadow-sm drop-shadow-black/20"
                      onClick={() => {
                        if (inputText.trim() === "") return;
                        const newMessage: ChatMessage = {
                          id: uuidv4(),
                          direction: "out",
                          text: inputText.trim(),
                          timestamp: new Date().toISOString(),
                          seen: false,
                        };
                        setChatConversation([...conversation, newMessage]);
                        setInputText("");
                      }}
                    />
                  </span>
                </div>
              </div>
              <MobileGestureBar />
            </CardFooter>
          </Card>
          <div 
            id="watermark" 
            className="flex flex-row items-center text-xs gap-1"
            style={{color: watermarkTextColor}}
          >
            <p className="flex flex-row items-center"> 🌈 Generated with </p>
            <p className="!font-mono italic underline">https://chat-mockup-fcossu.vercel.app/</p>
          </div>
        </div>
      </body>
    );
  } else {
    return (
      <body>
        <span className="text-sm text-muted">Loading...</span>
      </body>
    );
  }
}
