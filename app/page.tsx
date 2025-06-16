"use client"

// import Image from "next/image";
import { Minus, ChevronsUpDown, Plus, Camera, Paperclip, Send } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { useState } from "react";
import MobileGestureBar from "@/components/custom/mobileComponents";
import { ScreenshotCardHeader } from "@/components/custom/interfaceComponents";

export default function ChatMockup() {
  const [layout, setLayout] = useState<"mobile"|"desktop"|"auto">("auto");

  return (
    <div className="flex flex-column m-0 p-0 w-[100vw] h-[100vh] items-center justify-items-center justify-center">
      <Card className="w-4/5 m-0 p-0">
        <ScreenshotCardHeader />
        <CardContent className="p-0 m-0">
          <div className="flex flex-row gap-1.5 p-2" id="topActionBar">
          </div>
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="flex flex-col m-0 p-2 h-fit items-center justify-between border-t-1 gap-3">
          <div className="flex flex-row w-full gap-2 items-center justify-between">
            <input type="text" className="bg-accent rounded-full grow min-w-0.5 h-7 px-3"></input>
            <div id="messagingActions" className="flex flex-row gap-2">
              <span 
                id="photo" className="bg-transparent hover:bg-muted transitions">
                <Camera className="w-5 h-5 justify-self-center" />
              </span>
              <span id="attachment" className="bg-transparent hover:bg-accent transitions">
                <Paperclip className="w-5 h-5 justify-self-center" />
              </span>
              <span id="send" className="bg-sky-500 hover:bg-sky-400 transitions">
                <Send className="w-4 h-4 justify-self-center" />
              </span>
            </div>
          </div>
          <MobileGestureBar />
        </CardFooter>
      </Card>
    </div>
  );
}
