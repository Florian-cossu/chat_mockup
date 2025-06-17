"use client";

// import Image from "next/image";
import { Camera, Paperclip, Send } from "lucide-react";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import MobileGestureBar from "@/components/custom/mobileComponents";
import { ScreenshotCardHeader } from "@/components/custom/interfaceComponents";
import { usePreferences } from "@/contexts/preferencesContext";
import ChatMockupIcon from "@icons/icon-monochrome.svg";

export default function ChatMockup() {

  const { color1, color2 } = usePreferences();

  return (
    <body
      className="antialiased bg-background flex flex-col"
      style={{ backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color2})` }}
    >
      <div className="flex flex-col m-0 p-0 w-[100vw] h-[100vh] items-center justify-items-center justify-center">
        <Card className="w-4/5 m-0 p-0 mb-6">
          <ScreenshotCardHeader />
          <CardContent className="p-0 m-0">
            <div className="flex flex-row gap-1.5 p-2" id="topActionBar"></div>
            <span className="bg-gradient-to-br from-[red] to-[blue] w-10 h-10">
              h
            </span>
            <p>Card Content</p>
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
