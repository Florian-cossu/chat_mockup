import { useRef, useEffect, useState } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { Button } from "../ui/button";
import { HeartOff, Smile } from "lucide-react";
import { usePreferences } from "@/contexts/preferencesContext";

interface MyEmojiPickerProps {
  selectedEmoji: string;
  setSelectedEmoji: (emoji: string) => void;
}

export default function EmojiSelector({
  selectedEmoji,
  setSelectedEmoji,
}: MyEmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { color1 } = usePreferences();

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-row gap-2 items-center" ref={pickerRef}>
      <Button
        onClick={() => setShowPicker(!showPicker)}
        className="!py-1 !px-[.65rem] bg-gray-200 rounded-full cursor-pointer transitions text-current"
        style={{
                    backgroundColor: isHovered ? color1 : undefined,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
      >
        {selectedEmoji ? selectedEmoji : <Smile className="w-6 h-6"/>}
      </Button>

      {showPicker && (
        <div className="">
          <EmojiPicker
            reactionsDefaultOpen={true}
            onEmojiClick={(emoji) => {
              setSelectedEmoji(emoji.emoji);
              setShowPicker(false);
            }}
            className="h-fit !p-0"
          />
        </div>
      )}

      {selectedEmoji && (
            <>
              <Button
                className="w-fit rounded cursor-pointer bg-rose-400 text-black hover:bg-rose-500 transitions"
                onClick={() => setSelectedEmoji("")}
              >
                <HeartOff className="h-4 w-4" /> Remove reaction
              </Button>
            </>
          )}
    </div>
  );
}