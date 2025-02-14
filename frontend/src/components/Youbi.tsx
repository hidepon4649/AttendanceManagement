import React from "react";
import { getYoubi } from "src/utils/dateTimeUtils";

interface YoubiProps {
  date: string;
}
export function Youbi({ date }: YoubiProps) {
  const youbi = new Date(date).getDay();
  const youbiStr = getYoubi(date);
  const colorClass =
    youbi === 0 ? "text-danger" : youbi === 6 ? "text-primary" : "text-dark";
  return <span className={colorClass}>{youbiStr}</span>;
}
