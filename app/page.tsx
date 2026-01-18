"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
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
import AdvancedMessageModal from "@/components/custom/sendMessageWithProps";
import { Toaster } from "@/components/ui/sonner";

export default function ChatMockup() {
  const {
    color1,
    color2,
    setColor1,
    setColor2,
    layout,
    conversation,
    setChatConversation,
    showWatermark,
  } = usePreferences();
  const isMobile = useIsMobile();
  const [inputText, setInputText] = useState("");
  const [watermarkTextColor, setWatermarkTextColor] = useState("");
  const [iconColor, setIconColor] = useState("");

  const [showMessageWithPropsModal, setShowMessageWithPropsModal] = useState<boolean>(false);

  useEffect(() => {
    const theme = getRandomTheme();
    setColor1(theme.color1);
    setColor2(theme.color2);
  }, [setColor1, setColor2]);

  useEffect(() => {
    setWatermarkTextColor(getContrastColor(color2));
    setIconColor(getContrastColor(color1));
  }, [color1, color2]);

useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r") {
        event.preventDefault();
        setChatConversation([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setChatConversation]);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  function smoothScrollTo(
    element: HTMLElement,
    targetScrollTop: number,
    duration: number
  ) {
    const start = element.scrollTop;
    const change = targetScrollTop - start;
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1); // clamp to [0,1]
      element.scrollTop = start + change * easeInOutQuad(progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    function easeInOutQuad(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animate);
  }

  useLayoutEffect(() => {
    const id = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, 50);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      smoothScrollTo(
        containerRef.current,
        containerRef.current.scrollHeight,
        600
      );
    }
  }, [conversation]);

  function twStyleConstructor(layout: string) {
    if (isMobile) {
      return "h-[87dvh] w-4/5";
    } else {
      switch (layout) {
        case "auto":
          return "w-4/5 h-[80dvh] md:w-4/5";
        case "mobile":
          return "w-[42dvh] h-[87dvh]";
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
        <div className="flex flex-col m-0 p-0 w-screen h-screen items-center justify-items-center justify-center">
          <Card
            className={cn(
              `m-0 p-0 mb-6 gap-0`,
              twStyleConstructor(layout)
            )}
          >
            <ScreenshotCardHeader />
            <CardContent
              className="p-0 m-0 grow overflow-auto flex flex-col"
              ref={containerRef}
            >
              <ChatConversationView conversation={conversation} />
              <div ref={bottomRef} />
            </CardContent>
            <CardFooter className="flex flex-col m-0 p-2 h-fit items-center justify-between border-t gap-3">
              <div className="flex flex-row w-full gap-2 items-center justify-between">
                <input
                  type="text"
                  className="bg-accent rounded-full grow min-w-0.5 h-7 px-3"
                  value={inputText != "" ? inputText : ""}
                  placeholder="Type message or click send for custom message..."
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
                        setShowMessageWithPropsModal(true);
                        }
                      }
                    />
                  </span>
                  {showMessageWithPropsModal && (
                    <AdvancedMessageModal open={showMessageWithPropsModal} inputText={inputText ? inputText : undefined } onClose={() => setShowMessageWithPropsModal(false)} />
                  )}
                </div>
              </div>
              <MobileGestureBar />
            </CardFooter>
          </Card>
          { showWatermark && (
            <div
              id="watermark"
              className="flex flex-row items-center text-xs gap-1"
              style={{ color: watermarkTextColor }}
            >
              <p className="flex flex-row items-center"> 🌈 Generated with </p>
              <p className="font-mono! italic underline">
                https://chat-mockup-fcossu.vercel.app/
              </p>
            </div>
          )}
        </div>
        <Toaster />
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
