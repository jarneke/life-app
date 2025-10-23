import React, { useEffect, useState } from "react";
import { Text } from "@/components/text";

interface DateThingyProps {
  date: Date;
  selected: boolean;
  onClick: () => void;
}

export const DateThingy: React.FC<DateThingyProps> = ({
  date,
  selected,
  onClick,
}) => {
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const [className, setClassName] = useState("");

  useEffect(() => {
    if (selected && isToday) {
      setClassName(
        "font-bold text-stone-100 bg-orange-300/50  p-2 transition rounded-full"
      );
    } else if (selected && !isToday) {
      setClassName("font-bold text-stone-100 bg-none p-2 transition");
    } else if (!selected && isToday) {
      setClassName("font-normal text-orange-300 bg-none transition");
    } else {
      setClassName("font-normal text-stone-100/80 transition");
    }
  }, [selected, isToday]);

  return (
    <button className="flex flex-col items-center" onClick={onClick}>
      <Text
        className={
          selected
            ? `font-bold text-stone-100 transition`
            : `text-stone-100/80 transition`
        }
        content={date.toLocaleDateString("en-US", { weekday: "short" })[0]}
      />
      <Text
        className={`${className}`}
        content={date.toLocaleDateString("en-US", { day: "numeric" })}
      />
    </button>
  );
};
