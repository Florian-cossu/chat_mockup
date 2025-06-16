"use client"

import Image from "next/image";
import { Minus, ChevronsUpDown, Plus, Camera, Paperclip, Send } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { useState } from "react";
import MobileGestureBar from "@/components/custom/mobileComponents";

export default function ChatMockup() {
  const [layout, setLayout] = useState<"mobile"|"desktop"|"auto">("auto");

  return (
    <div className="flex flex-column m-0 p-0 w-[100vw] h-[100vh] items-center justify-items-center justify-center">
      <Card className="w-4/5 m-0 p-0">
        <CardHeader className="flex flex-row m-0 p-0 h-fit items-center justify-end  border-b-1">
          <div className="flex flex-row gap-1.5 p-2" id="windowButtons">
            <span id="maximise" className="flex rounded-full w-4 h-4 bg-emerald-400 hover:bg-emerald-300 cursor-pointer transitions items-center justify-center">
              <ChevronsUpDown className="w-3 h-3 rotate-45 windowAction transitions" />
            </span>
            <span id="minimise" className="flex rounded-full w-4 h-4 bg-amber-400 hover:bg-amber-300 cursor-pointer transitions items-center justify-center">
              <Minus className="w-3 h-3 windowAction transitions" />
            </span>
            <span id="close" className="flex rounded-full w-4 h-4 bg-red-500 hover:bg-red-400 cursor-pointer transitions items-center justify-center">
              <Plus className="w-3 h-3 rotate-45 windowAction transitions" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0 m-0">
          <div className="flex flex-row gap-1.5 p-2" id="topActionBar">
            <span className="rounded-full bg-transparent hover:bg-accent cursor-pointer">Test</span>
          </div>
          <Image
            className="dark:invert"
            src="/icons/icon-any.svg"
            alt="Icon"
            width={180}
            height={180}
          />
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="flex flex-col m-0 p-2 h-fit items-center justify-between border-t-1 gap-3">
          <div className="flex flex-row w-full gap-2 items-center justify-between">
            <input type="text" className="bg-accent rounded-full grow min-w-0.5 h-7 px-3"></input>
            <div id="messagingActions" className="flex flex-row gap-2">
              <span id="photo" className="bg-transparent hover:bg-accent transitions">
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
          <MobileGestureBar
            layout={"mobile"}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
