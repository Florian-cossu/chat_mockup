"use client";

import React, { useEffect, useState } from "react";
import { usePreferences } from "@/contexts/preferencesContext";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import {
  CheckCheck,
  ChevronDownIcon,
  DoorOpen,
  MessageCircleCode,
  MessageCircleReply,
  MessageCircleX,
  Send,
  TextCursorInput,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select } from "../ui/select";
// import EmojiPicker from "emoji-picker-react";

interface AdvancedMessageModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AdvancedMessageModal({
  open,
  onClose,
}: AdvancedMessageModalProps) {
  const { conversation, setChatConversation, color1 } = usePreferences();

  const [text, setText] = useState("");
  const [direction, setDirection] = useState<"out" | "in">("out");
  const [seen, setSeen] = useState(false);
  //   const [reactions, setReactions] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = useState("10:30:00");
  const [repliesTo, setRepliesTo] = useState("");

  useEffect(() => {
    const currentDate = new Date();

    const pad = (n: number) => n.toString().padStart(2, "0");
    const currentTime = `${pad(currentDate.getHours())}:${pad(
      currentDate.getMinutes()
    )}:${pad(currentDate.getSeconds())}`;
    setTime(currentTime);
  }, []);

  const handleSend = () => {
    if (text.trim() === "") return;

    const mergedDate = date || new Date();
    const [hours, minutes, seconds] = time.split(":").map(Number);
    mergedDate.setHours(hours);
    mergedDate.setMinutes(minutes);
    mergedDate.setSeconds(seconds);

    const newMessage: ChatMessage = {
      id: uuidv4(),
      direction,
      text: text.trim(),
      timestamp: mergedDate?.toISOString(),
      repliesTo: repliesTo ?? undefined,
      seen,
      //   emoji: reactions
      //     .split(",")
      //     .map((r) => r.trim())
      //     .filter((r) => r !== "")
      //     .join(),
    };

    setChatConversation([...conversation, newMessage]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2 items-center">
            <MessageCircleCode />
            Add a customized message
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col p-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>
              <TextCursorInput />
              Message Text
            </Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="Your message..."
            />
          </div>
          <div className="flex flex-row">
            <Label>Direction</Label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as "out" | "in")}
              className="w-fit ml-2 p-2 border rounded dark:bg-gray-800 cursor-pointer"
            >
              <option value="in">Received</option>
              <option value="out">Sent</option>
            </select>
          </div>
          {direction == "out" && (
            <>
              <div>
                <input
                  type="checkbox"
                  id="isMessageRead"
                  name="isMessageRead"
                  checked={seen}
                  onChange={(e) => setSeen(e.target.checked)}
                  className="hidden"
                />
                <Label htmlFor="isMessageRead" className="cursor-pointer">
                  <CheckCheck
                    className="text-muted-foreground transitions cursor-pointer"
                    style={{ color: seen ? color1 : "" }}
                  />
                  <p>{seen ? "Seen" : "Not seen"}</p>
                </Label>
              </div>
            </>
          )}
          {/* Date selector */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="date-picker" className="px-1">
                Date
              </Label>
              <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal cursor-pointer"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpenDatePicker(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="time-picker" className="px-1">
                Time
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none cursor-pointer"
              />
            </div>
          </div>
          <Label>
            <MessageCircleReply />
            Replies to
          </Label>
          <select
            value={repliesTo}
            onChange={(e) => setRepliesTo(e.target.value as string)}
            className="w-fit p-2 border rounded dark:bg-gray-800 cursor-pointer"
          >
            <option key="0" value="">Reply to?</option>
            {conversation.map((message) => (
              <option key={message.id} value={message.id}>
                {message.direction == "in" ? "contact: " : "you: "}
                {message.text.length > 30
                  ? message.text.slice(0, 30) + "…"
                  : message.text}
              </option>
            ))}
          </select>

          {/* <Label>Reactions (comma separated)</Label>
          <EmojiPicker
            reactionsDefaultOpen={true}
            onEmojiClick={(emoji) => {
                setReactions(emoji.emoji);
            }}
            /> */}
        </div>

        <DialogFooter className="mt-4 px-2">
          <Button
            variant="ghost"
            className="cursor-pointer transitions hover:text-rose-500"
            onClick={() => setChatConversation([])}
          >
            <MessageCircleX />
            Reset conversation
          </Button>
          <Button
            variant="secondary"
            className="cursor-pointer transitions hover:bg-rose-400"
            onClick={onClose}
          >
            <DoorOpen />
            Cancel
          </Button>
          <Button
            className="cursor-pointer transitions"
            onClick={handleSend}
            style={{
              backgroundColor: isHovered ? color1 : undefined,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Send />
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
