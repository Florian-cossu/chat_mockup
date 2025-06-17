"use client";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import colors from "tailwindcss/colors";
import { Palette } from "lucide-react";
import { usePreferences } from "@/contexts/preferencesContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const TAILWIND_COLORS = [
  colors.sky[500],
  colors.green[500],
  colors.yellow[500],
  colors.orange[500],
  colors.red[500],
  colors.pink[500],
  colors.purple[500],
];

type ColorPickerProps = {
  index: 1 | 2;
};

export default function ColorPicker({ index }: ColorPickerProps) {
  const { color1, setColor1, color2, setColor2 } = usePreferences();
  const [open, setOpen] = useState(false);

  const currentColor = index === 1 ? color1 : color2;
  const setCurrentColor = index === 1 ? setColor1 : setColor2;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {TAILWIND_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setCurrentColor(c)}
            className="w-6 h-6 rounded-full border cursor-pointer hover:brightness-110 transition"
            style={{ backgroundColor: c }}
            aria-label={`Set color ${c}`}
          />
        ))}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="w-6 h-6 rounded-full border flex items-center justify-center text-xs cursor-pointer hover:brightness-110 transition"
              style={{
                backgroundColor: `${currentColor}33`,
                backgroundBlendMode: "multiply",
              }}
              aria-label="Open custom color picker"
            >
              <Palette className="w-4 h-4" />
            </button>
          </DialogTrigger>

          <DialogTitle className="hidden">
            <p>{`Pick ${index === 1 ? "accent" : "secondary"} color`}</p>
          </DialogTitle>
          <DialogContent
            className="max-w-xs p-4 rounded-md shadow-lg w-fit"
            aria-description={`Pick ${
              index === 1 ? "accent" : "secondary"
            } color`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{`Pick ${
                index === 1 ? "accent" : "secondary"
              } color`}</h3>
            </div>

            <HexColorPicker color={currentColor} onChange={setCurrentColor} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
