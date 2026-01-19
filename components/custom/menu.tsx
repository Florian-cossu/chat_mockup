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
  Sun,
  Moon,
  Monitor,
  SwatchBook,
  Check,
  X,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function MenuTopBar() {
  const isMobile = useIsMobile();

  const {
    layout,
    setLayout,
    setChatConversation,
    showWatermark,
    setShowWatermark,
    importFromJSON,
    exportToJSON,
    theme,
    color1,
    setTheme
  } = usePreferences();

  const layouts = ["auto", "mobile", "desktop"];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const screenshotInput = useRef<HTMLInputElement | null>(null);

  const [isAwaitingLlmResponse, setIsAwaitingLlmResponse] = useState(false)

  const handleScreenshot = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsAwaitingLlmResponse(true);

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
    } catch (e) {
      console.error(e)
    } finally {
      setIsAwaitingLlmResponse(false);
    }
  };

  const handleImportJSON = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        try {
          importFromJSON(reader.result);
        } catch (e) {
          console.error(e)
        }
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

  function returnThemeIcon(type: string) {
    switch (type) {
      case "auto":
        return (
          <>
            <Monitor /> Auto
          </>
        );
      case "light":
        return (
          <>
            <Sun /> Light
          </>
        );
      case "dark":
        return (
          <>
            <Moon /> Dark
          </>
        );
      default: 
        return null;
    }
  }

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
      default:
        return null;
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
              <h3
                className="font-bold uppercase text-sm"
                style={{
                  color: color1
                }}
              >Display</h3>
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
          <h3
            className="font-bold uppercase text-sm mt-2"
            style={{
              color: color1
            }}
          >Theming</h3>
          <div
            id="theme"
            className="flex flex-row cursor-pointer p-3 rounded items-center"
          >
            <SwatchBook className="mr-2 w-5 h-5" />
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-70 cursor-pointer text-foreground rounded-sm">
                <SelectValue
                  placeholder={
                    theme ? returnThemeIcon(theme) : "Select theme"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {["auto", "light", "dark"].map((value) => (
                  <SelectItem key={value} value={value}>
                    {returnThemeIcon(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          {/* MISCELLANEOUS SECTION */}

          <h3
            className="font-bold uppercase text-sm mt-2"
            style={{
              color: color1
            }}
          >Data</h3>
          <Dialog>
            <DialogTrigger asChild>
              <div
                id="importScreenshot"
                className="flex flex-row cursor-pointer hover:bg-accent hover:text-purple-600 p-3 rounded items-center transitions"
              >
                {!isAwaitingLlmResponse
                  ? (<><ImageUp className="mr-2 w-4 h-4" /><p>Import chat screenshot</p></>)
                  : (<><LoaderPinwheel className="mr-2 w-4 h-4 animate-spin" /><p>Import chat screenshot</p></>)
                }
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex flex-row items-center"><ImageUp className="mr-2 w-6 h-6" />Import screenshot</DialogTitle>
                <DialogDescription
                  className="my-2"
                >
                  This feature sends your screenshot to Google Gemini for analysis.
                  <br />
                  Please ensure NO SENSITIVE PERSONAL INFORMATION is visible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="destructive" className="cursor-pointer"><X />Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => screenshotInput.current?.click()} className="cursor-pointer bg-emerald-500 hover:bg-emerald-400"><Check />Proceed</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          <hr className="my-2" />
          {/* ABOUT SECTION */}

          <h3
            className="font-bold uppercase text-sm mt-2"
            style={{
              color: color1
            }}
          >About</h3>
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
                <SheetTitle className="flex flex-row items-center uppercase bg-accent/60 py-2 px-4 rounded">
                  <LifeBuoy className="mr-2 w-8 h-8" style={{ color: color1 }} />
                  <p>Welcome to chat mockup</p>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col pl-4 gap-4">
                <HelpCenterTitle level="h1" text="Presentation" color={color1} />
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
                <HelpCenterTitle level="h1" text="Layout and theming" color={color1} />
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
                <HelpCenterTitle level="h2" text="Conversation customisation" color={color1} />
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
                <HelpCenterTitle level="h1" text="Message in conversation" color={color1} />
                <p>The app always starts with a preset conversation. You can open the menu to clear
                  the conversation or press the send icon while your message input is empty which
                  will open a pop up at the bottom of which you&apos;ll find a clear conversation button as well.
                </p>
                <p>You can also press Ctrl or Cmd + Shift + R to reset the conversation</p>
                <HelpCenterTitle level="h2" text="Sending custom messages" color={color1} />
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
                <HelpCenterTitle level="h2" text="Data import and export" color={color1} />
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
          <div
            id="versionNumber"
            className="flex flex-row cursor-pointer hover:bg-accent p-3 rounded items-center"
          >
            <Info className="mr-2 w-4 h-4" /><p>V.3.6</p>
          </div>

          <hr className="my-2" />
          {/* ABOUT SECTION */}
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
        </PopoverContent>
      </Popover>
    </>
  );
}

export function HelpCenterTitle({
  level,
  text,
  color,
}: {
  level: "h1" | "h2" | "h3";
  text: string;
  color?: string;
}) {
  const Tag = level;

  const levelStyles = {
    h1: "text-xl uppercase",
    h2: "text-lg",
    h3: "text-lg italic",
  };

  const defaultColorStyles = {
    h1: "text-sky-300",
    h2: "text-sky-500",
    h3: "text-sky-600",
  };

  const dynamicStyle = color
    ? {
        color: color,
        filter:
          level === "h1"
            ? "brightness(1.2)"
            : level === "h3"
            ? "brightness(0.7)"
            : "none",
      }
    : {};

  return (
    <Tag
      className={cn(
        "font-bold",
        levelStyles[level],
        !color && defaultColorStyles[level]
      )}
      style={dynamicStyle}
    >
      {text}
    </Tag>
  );
}