"use client";

import { useEffect, useState } from "react";

export function LocalTime({ iso }: { iso: string }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const date = new Date(iso);
    const now = new Date();

    const sameDay =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const sameMonth = 
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const timePart = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    if (sameDay) {
      setDisplay(timePart);
    } else if (sameMonth) {
      const dayName = date.toLocaleDateString([], { weekday: "short" });
      setDisplay(`${dayName} ${date.getDate()}, ${timePart}`);
    } else {
      const monthName = date.toLocaleDateString([], { month: "short" });
      setDisplay(`${date.getDate()} ${monthName} ${date.getFullYear()} ${timePart}`);
    }

  }, [iso]);

  return <span>{display}</span>;
}