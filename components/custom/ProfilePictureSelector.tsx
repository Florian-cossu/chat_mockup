"use client";

import React, { useState, useCallback } from "react";
import { Pencil } from "lucide-react";
import Cropper, { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { usePreferences } from "@/contexts/preferencesContext";
import { default as Img } from "next/image";


export default function ProfilePictureSelector() {
  const { contactName, profilePicture, setProfilePicture } = usePreferences();

  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [showChoice, setShowChoice] = useState<boolean>(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);

  const [urlInput, setUrlInput] = useState<string>("");

  const generateColor = useCallback(() => {
    let hash = 0;
    for (let i = 0; i < contactName.length; i++) {
      hash = contactName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 70%)`;
  }, [contactName]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setRawImage(reader.result as string);
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = async () => {
  if (urlInput) {
    try {
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(urlInput)}`;
      const res = await fetch(proxyUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      setRawImage(blobUrl);
      setShowChoice(false);
      setShowCropper(true);
    } catch (err) {
      alert("Failed to fetch or sanitize image.");
      console.error(err);
    }
  }
};


  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    if (!rawImage || !croppedAreaPixels) return;

    const image = new Image();
    image.src = rawImage;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    const croppedDataUrl = canvas.toDataURL("image/png");
    setProfilePicture(croppedDataUrl);
    setShowCropper(false);
    setShowChoice(false);
    setRawImage(null);
  };

  const profilePicSize = "w-8 h-8";

  return (
    <>
      <div className="relative inline-block">
        {profilePicture ? (
          <Img
            src={profilePicture}
            alt="Profile"
            className={`${profilePicSize} rounded-full object-cover`}
            width={200}
            height={200}
          />
        ) : (
          <div
            className={`${profilePicSize} rounded-full flex items-center justify-center text-white font-bold text-xl`}
            style={{ backgroundColor: generateColor() }}
          >
            {contactName.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="absolute inset-0 rounded-full hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
          <Pencil
            className="w-5 h-5 text-white cursor-pointer"
            onClick={() => setShowChoice(true)}
          />
        </div>
      </div>

      {/* Dialog to let user choose a file */}
      <Dialog open={showChoice} onOpenChange={setShowChoice}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update profile picture</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Past your URL here..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <Button onClick={handleUrlSubmit} className="cursor-pointer">
              Use URL
            </Button>
            <div className="text-center text-sm text-muted-foreground">or</div>
            <Button
              onClick={() => {
                document.getElementById("fileInput")?.click();
              }}
              className="cursor-pointer"
            >
              Import local picture
            </Button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog to crop img */}
      <Dialog open={showCropper} onOpenChange={setShowCropper}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crop picture</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-96 bg-muted rounded">
            <Cropper
              image={rawImage as string}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-4">
            <label>Zoom</label>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(val) => setZoom(val[0])}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowCropper(false)}
              className="cursor-pointer"
            >
              Annuler
            </Button>
            <Button onClick={getCroppedImage} className="cursor-pointer">
              Crop and save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
