"use client";

import  { useEffect, useState } from "react";

export function useFormattedTime() {
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setFormattedTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10_000);

    return () => clearInterval(interval);
  }, []);

  return formattedTime;
}
