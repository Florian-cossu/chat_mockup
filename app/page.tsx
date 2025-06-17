"use client";

// import Image from "next/image";
import { Camera, Paperclip, Send } from "lucide-react";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import MobileGestureBar from "@/components/custom/mobileComponents";
import { ScreenshotCardHeader } from "@/components/custom/interfaceComponents";
import { usePreferences } from "@/contexts/preferencesContext";
import ChatMockupIcon from "@icons/icon-monochrome.svg";
import { useIsMobile } from "@/hooks/isMobile";
import { cn } from "@/lib/utils";
import ChatConversationView from "@/components/custom/chatConversationView";

export default function ChatMockup() {

  const { color1, color2, layout, conversation } = usePreferences();
  const isMobile = useIsMobile();

  function twStyleConstructor (layout: string) {
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


  return (
    <body
      className="antialiased bg-background flex flex-col"
      style={{ backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color2})`, height: isMobile ? "100dvh" : "unset", fontSize: isMobile ? ".8rem" : "unset" }}
    >
      <div className="flex flex-col m-0 p-0 w-[100vw] h-[100vh] items-center justify-items-center justify-center">
        <Card className={cn(`w-4/5 m-0 p-0 mb-6 gap-0`, twStyleConstructor(layout))}>
          <ScreenshotCardHeader />
          <CardContent className="p-0 m-0 grow">
            <div className="flex flex-row gap-1.5 p-2" id="topActionBar"></div>
            <ChatConversationView
              conversation={conversation}
              color1={color1}
            />
          </CardContent>
          <CardFooter className="flex flex-col m-0 p-2 h-fit items-center justify-between border-t-1 gap-3">
            <div className="flex flex-row w-full gap-2 items-center justify-between">
              <input
                type="text"
                className="bg-accent rounded-full grow min-w-0.5 h-7 px-3"
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
                  style={{backgroundColor: color1}}
                >
                  <Send className="w-4 h-4 justify-self-center drop-shadow-sm drop-shadow-black/20" />
                </span>
              </div>
            </div>
            <MobileGestureBar />
          </CardFooter>
        </Card>
        <div id="watermark" className="flex flex-row items-center text-xs">
          <p className="flex flex-row items-center">
            Generated with{" "}
            <a href="" className="flex flex-row ml-2 items-center transitions hover:underline hover:[&_svg]:text-sky-400 decoration-sky-400">
              &rarr; Chat Mockup
              <ChatMockupIcon
                style={{ width: ".8rem", height: ".8rem", marginLeft: ".5rem", transition: "all .3s ease-in-out" }}
              />
            </a>
          </p>
        </div>
      </div>
    </body>
  );
}
