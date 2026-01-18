"use client";

import { useRef, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";

import {
  EllipsisVertical,
  Info,
  MonitorSmartphone,
  Smartphone,
  Laptop,
  ImageUpscale,
  LifeBuoy,
  MessageCircleX,
  FileUp,
  FileDown,
  EyeOff,
  Eye,
  ImageUp,
  LoaderPinwheel,
} from "lucide-react";

import Github from "@icons/thirdPartyAppIcons/github_icon.svg"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useIsMobile } from "@/hooks/isMobile";

import { usePreferences } from "@/contexts/preferencesContext";

import ColorPicker from "./colorPicker";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toast } from "sonner";

export default function MenuTopBar() {
  const isMobile = useIsMobile();

  const { 
    layout, 
    setLayout, 
    setChatConversation, 
    showWatermark, 
    setShowWatermark, 
    importFromJSON, 
    exportToJSON } = usePreferences();

  const layouts = ["auto", "mobile", "desktop"];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const screenshotInput = useRef<HTMLInputElement | null>(null);

  const [isAwaitingLlmResponse, setIsAwawaitingLlmResponse] = useState(false)

  const handleScreenshot = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsAwawaitingLlmResponse(true);

    const promise = (async () => {
      const res = await fetch("/api/screenshot_ocr", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to parse screenshot");
      }

      const data = await res.json();

      importFromJSON(JSON.stringify(data));

      return data; // important pour le toast success
    })();

    toast.promise(promise, {
      loading: "Analysing screenshot…",
      success: "Imported chat from screenshot",
      error: (err) =>
        err instanceof Error ? err.message : "There was an error while parsing the screenshot",
    });

    try {
      await promise;
    } catch {
    } finally {
      setIsAwawaitingLlmResponse(false);
    }
  };

  const handleImportJSON = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        importFromJSON(reader.result);
      }
    };

    reader.readAsText(file);
  };

  const handleExportJSON = () => {
    const blob = new Blob([exportToJSON()], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "chat-mockup.json";
    a.click();

    URL.revokeObjectURL(url);
  };

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
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical className="w-5 h-5 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="text-xs max-h-[50vh] overflow-scroll">
          {!isMobile && (
            <>
              <h3>Display</h3>
              <div
                id="layout"
                className="flex flex-row cursor-pointer p-3 rounded items-center"
              >
                <ImageUpscale className="mr-2 w-5 h-5" />
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger className="w-70 cursor-pointer text-foreground rounded-sm">
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
              <hr />
            </>
          )}
          <h3 className="mt-2">Theming</h3>
          <div
            id="color1"
            className="flex flex-row cursor-pointer p-3 rounded items-center"
          >
            <p>1.</p>
            <ColorPicker index={1} />
          </div>
          <div
            id="color2"
            className="flex flex-row cursor-pointer p-3 rounded items-center"
          >
            <p>2.</p>
            <ColorPicker index={2} />
          </div>
          <hr className="my-2" />
          <h3 className="mt-2">About</h3>
          <div
            id="githubLink"
            className="flex flex-row cursor-pointer hover:bg-accent p-3 rounded items-center"
          >
            <Github className="mr-2 w-4 h-4" />
            <a href="https://github.com/Florian-cossu/chat_mockup">
              <span className="underline">&rarr; Chat Mockup on Github</span>
            </a>
          </div>
          {/* HELP CENTER SECTION */}
          <Sheet>
            <SheetTrigger
              id="helpCenter"
              className="flex flex-row cursor-pointer hover:bg-accent p-3 rounded items-center w-full"
            >
              <LifeBuoy className="mr-2 w-4 h-4" />
              <p>Help Center</p>
            </SheetTrigger>
            <SheetContent className="gap-0 p-4 h-full overflow-auto">
              <SheetHeader>
                <SheetTitle className="flex flex-row items-center uppercase">
                  <LifeBuoy className="mr-2 w-8 h-8" />
                  <p>Welcome to chat mockup</p>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col pl-4 gap-4">
                <HelpCenterTitle level="h1" text="Presentation" />
                <p>
                  This tool is a project created as a hobby to improve my coding
                  skills.
                </p>
                <p>
                  You can check it&apos;s source code{" "}
                  <a
                    href="https://github.com/Florian-cossu/chat_mockup"
                    className="text-sky-500 underline"
                  >
                    on Github.
                  </a>
                </p>
                <HelpCenterTitle level="h1" text="Layout and theming" />
                <p>This tool offers several customisation options</p>
                <ul className="list-disc ml-4">
                  <li>Randomised gradient background</li>
                  <li>
                    Randomised notifications icons on the left side of status
                    bar in mobile layout
                  </li>
                  <li>
                    Customisable gradient via Color .1 and Color .2 in the menu.
                    Color 1 also affects the color of incoming messages and the
                    send button
                  </li>
                  <li>
                    On the desktop version (only) you can switch between
                    windowed and mobile mode. If you use a mobile to visit the
                    app you&apos;ll be stuck to mobile layout by default.
                  </li>
                </ul>
                <HelpCenterTitle level="h2" text="Conversation customisation" />
                <p>Customise who you are supposedly talking to by either:</p>
                <ul className="list-disc ml-4">
                  <li>
                    Choosing the contact profile picture by clicking on it. You can either choose
                    a supported image URL or import from your device.
                    You&apos;ll be prompted to crop the picture each time.
                  </li>
                  <li>
                    Customising contact username. Click on the username to
                    update it.
                  </li>
                </ul>
                <HelpCenterTitle level="h1" text="Message in conversation" />
                <p>The app always starts with a preset conversation. You can open the menu to clear
                  the conversation or press the send icon while your message input is empty which
                  will open a pop up at the bottom of which you&apos;ll find a clear conversation button as well.
                </p>
                <p>You can also press Ctrl or Cmd + Shift + R to reset the conversation</p>
                <HelpCenterTitle level="h2" text="Sending custom messages" />
                <p>
                  Press on send to send messages for which you&apos;ll be able control several properties.
                  Please find the detailed option of the popup window below:
                </p>
                <ul className="list-disc ml-4">
                  <li>Message text: the actual content of the message.</li>
                  <li>Direction: [SENT] (gray background) or [RECEIVED] (color .1 background).</li>
                  <li>Read status: Only available for [SENT] messages this lets you decide wether the message was read or not.</li>
                  <li>Date and time of the message: Leave for default (ie. your current one) or define custom one.</li>
                  <li>Replies to: Lets you choose whether you want your message to be replying to a given message.</li>
                  <li>Reactions: Lets you define the reaction the message received.</li>
                  <li>Bubble color override: Lets you add a custom color background to the message you&apos;re about to add. Font contrast will be automatically calculated.</li>
                </ul>
                <HelpCenterTitle level="h2" text="Data import and export" />
                <p>
                  If you wish to save your work and edit it later you can use the menu button and scroll to the buttons
                  labelled import and export chat as JSON.
                </p>
                <p>
                  You can also import a screenshot from a conversation and perform character recognition (this relies on 
                  google gemini so be careful about the contents of the screenshots you submit!).
                </p>
              </div>
            </SheetContent>
          </Sheet>
          <hr className="my-2" />
          {/* MISCELLANEOUS SECTION */}
          <div
            id="importScreenshot"
            className="flex flex-row cursor-pointer hover:bg-accent hover:text-purple-600 p-3 rounded items-center transitions"
            onClick={() => screenshotInput.current?.click()}
          >
            {!isAwaitingLlmResponse 
              ? (<><ImageUp className="mr-2 w-4 h-4" /><p>Import chat screenshot</p></>) 
              : (<><LoaderPinwheel className="mr-2 w-4 h-4 animate-spin" /><p>Import chat screenshot</p></>)
            }
            <input
              ref={screenshotInput}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                handleScreenshot(file);
                e.currentTarget.value = "";
              }}
            />

          </div>
          <div
            id="importData"
            className="flex flex-row cursor-pointer hover:bg-accent hover:text-sky-600 p-3 rounded items-center transitions"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="mr-2 w-4 h-4" /><p>Import saved chat JSON</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                handleImportJSON(file);
                e.currentTarget.value = "";
              }}
            />
          </div>
          <div
            id="exportData"
            className="flex flex-row cursor-pointer hover:bg-accent hover:text-emerald-600 p-3 rounded items-center transitions"
            onClick={handleExportJSON}
          >
            <FileDown className="mr-2 w-4 h-4" /><p>Save current chat as JSON</p>
          </div>
          <div
            id="resetConversation"
            className="flex flex-row cursor-pointer hover:bg-accent hover:text-rose-500 p-3 rounded items-center transitions"
            onClick={() => setChatConversation([])}
          >
            <MessageCircleX className="mr-2 w-4 h-4" /><p>Clear chat</p>
          </div>
          <div
            id="showWatermark"
            className="flex flex-row cursor-pointer hover:bg-accent hover:text-amber-400 p-3 rounded items-center transitions gap-2 text-xs font-normal"
          >
            <div className="flex items-center gap-2">
              {showWatermark ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              <Label htmlFor="watermark-switch" className="cursor-pointer text-xs font-normal">
                Show watermark
              </Label>
            </div>

            <Switch
              id="watermark-switch"
              checked={showWatermark}
              onCheckedChange={setShowWatermark}
              className="cursor-pointer data-[state=checked]:bg-amber-400"
            />
          </div>
          <div
            id="versionNumber"
            className="flex flex-row cursor-pointer hover:bg-accent p-3 rounded items-center"
          >
            <Info className="mr-2 w-4 h-4" /><p>V.3.5</p>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export function HelpCenterTitle({
  level,
  text,
}: {
  level: "h1" | "h2" | "h3";
  text: string;
}) {
  const Tag = level;

  const style =
    level === "h1"
      ? "text-xl text-sky-300 uppercase"
      : level === "h2"
      ? "text-lg text-sky-500"
      : level === "h3"
      ? "text-lg text-sky-600 italic"
      : "text-base text-sky-700";

  return <Tag className={cn(style, "font-bold")}>{text}</Tag>;
}
