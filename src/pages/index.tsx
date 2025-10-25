import { Background } from "@/components/background";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { ButtonBig } from "@/components/button-big";
import { Input } from "@/components/input";
import { Notification, NotificationElement } from "@/components/notification";
import { Text } from "@/components/text";
import {
  BanknoteArrowUp,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  Euro,
  Flame,
  TestTubeDiagonal,
  Timer,
} from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// Home page — quick capture input, notification center, and feature navigation
export default function Home() {
  const router = useRouter();

  // ---------- STATE ----------
  const [value, setValue] = useState<string>("");
  const [notifications, setNotifications] = useState<NotificationElement[]>([]);

  // ---------- EFFECTS ----------
  // Fetch notifications (dummy data for now)
  useEffect(() => {
    const fetchedNotifications: NotificationElement[] = [
      {
        id: "1",
        icon: <TestTubeDiagonal />,
        message: "Test notification message 1",
        redirectUrl: "/notifications",
      },
      {
        id: "2",
        icon: <TestTubeDiagonal />,
        message: "Test notification message 2",
        importance: 1,
        redirectUrl: "/notifications",
      },
      {
        id: "3",
        icon: <TestTubeDiagonal />,
        message: "Test notification message 3",
        importance: 2,
        redirectUrl: "/notifications",
      },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  // ---------- HANDLERS ----------
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleQuickCaptureSubmit = () => {
    // Handle quick capture submission logic here
    console.log("Quick capture submitted:", value);
  };

  // ---------- RENDER ----------
  return (
    <Background>
      {/* Quick Capture Input */}
      <Box className="gap-2">
        <div className="self-stretch flex gap-3">
          <Input
            value={value}
            onChange={handleChange}
            className="w-full ps-3"
            placeholder="Quick capture..."
          />
          <Button icon={<Check />} onClick={handleQuickCaptureSubmit}></Button>
        </div>
        <Text
          className="mt-3 text-stone-100/40"
          content="Type anything — i'll know where it belongs"
        />
      </Box>

      {/* Notification center */}
      <Box className="gap-2">
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </Box>

      {/* Feature Navigation */}
      <Box className="grid grid-cols-3 gap-2">
        <ButtonBig
          icon={<CalendarDays />}
          text="Day Planner"
          onClick={() => router.push("/day-planner")}
        />
        <ButtonBig
          icon={<Check />}
          text="Task Tracker"
          onClick={() => router.push("/task-tracker")}
        />
        <ButtonBig
          icon={<Flame />}
          text="Calorie Tracker"
          onClick={() => router.push("/calorie-tracker")}
        />
        <ButtonBig
          icon={<Euro />}
          text="Expense Tracker"
          onClick={() => router.push("/expense-tracker")}
        />
        <ButtonBig
          icon={<ChartNoAxesColumnIncreasing />}
          text="Budget Planner"
          onClick={() => router.push("/budget-planner")}
        />
        <ButtonBig
          icon={<BanknoteArrowUp />}
          text="Savings Helper"
          onClick={() => router.push("/savings-helper")}
        />
        <ButtonBig
          icon={<Timer />}
          text="Work Hours"
          onClick={() => router.push("/work-hours")}
        />
      </Box>
    </Background>
  );
}
