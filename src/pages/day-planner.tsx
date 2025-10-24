import { Background } from "@/components/background";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import DateInput from "@/components/dateInput";
import { DateThingy } from "@/components/dateThingy";
import { time } from "console";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DayPlanner() {
  const [days, setDays] = useState<Array<Date>>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const TimeIntervals = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "--:--",
  ];
  const [topPosition, setTopPosition] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Update current time every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1 * 60 * 1000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  // Update days when selectedDate changes
  useEffect(() => {
    const day = selectedDate.getDay() === 0 ? 7 : selectedDate.getDay();

    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - (day - 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(startOfWeek.getTime() + i * 86400000));
    }

    setDays(dates);
  }, [selectedDate]);

  const paddingOffset = 26; // offset in pixels for padding/margin
  const hourHeight = 60; // height in pixels for each hour block

  // Update topPosition when currentTime changes
  useEffect(() => {
    const minutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const topPosition = (minutes / 60) * hourHeight + paddingOffset;
    setTopPosition(topPosition);
  }, [currentTime]);

  // Scroll to current time on initial render
  useEffect(() => {
    if (!scrollRef.current) return;
    // delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      scrollRef.current!.scrollTo({
        top: topPosition - 100, // offset to center current time
        behavior: "smooth",
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [topPosition]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePrev = () => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - 1
    );
    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 1
    );
    setSelectedDate(newDate);
  };

  return (
    <Background className="justify-start" Home>
      <Box className="gap-2 z-10">
        <div className="self-stretch flex flex-row gap-4 items-center justify-between relative">
          <Button icon={<ChevronLeft />} onClick={handlePrev} />
          <DateInput
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <Button icon={<ChevronRight />} onClick={handleNext} />
        </div>

        <div className="flex flex-row justify-between w-full px-3">
          {days.map((date, index) => (
            <DateThingy
              key={index}
              date={date}
              selected={date.toDateString() === selectedDate.toDateString()}
              onClick={() => handleDateClick(date)}
            />
          ))}
        </div>
      </Box>
      <Box
        ref={scrollRef}
        className="overflow-scroll flex flex-col gap-10 p-5 relative"
      >
        {TimeIntervals.map((time, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-start self-stretch gap-2"
          >
            <div className="text-sm w-16 text-center pr-4 text-stone-50/70">
              {time}
            </div>
            <div className="flex-1 h-px bg-stone-50/20"></div>
          </div>
        ))}
        <div
          className="absolute left-14 right-0 flex gap-2 items-center justify-center px-5"
          style={{ top: `${topPosition}px` }}
        >
          <div className="h-2 w-2 rounded-full bg-orange-300/50" />

          <div className="flex flex-row justify-between w-full">
            <div className="h-1 w-1/4 rounded-full bg-orange-300/50" />
            <div className="h-1 w-1/4 rounded-full bg-orange-300/50" />
            <div className="h-1 w-1/4 rounded-full bg-orange-300/50" />
          </div>
        </div>
      </Box>
    </Background>
  );
}
