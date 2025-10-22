import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Notification } from "@/components/notification";
import { Text } from "@/components/text";
import { Check, TestTubeDiagonal } from "lucide-react";
import React from "react";

export default function Home() {
  const [value, setValue] = React.useState<string>("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleQuickCaptureSubmit = () => {
    // Handle quick capture submission logic here
    console.log("Quick capture submitted:", value);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center pt-20 p-5 md:p-10 lg:p-20 gap-8"
      style={{
        backgroundImage: "url('/backgrounds/bg_lock_pastel_warm.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
          className="mt-3 text-stone-100/20"
          content="Type anything — i'll know where it belongs"
        />
      </Box>
      {/* Notification center */}
      <Box className="m gap-2">
        <Notification
          notification={{
            id: "1",
            icon: <TestTubeDiagonal />,
            message: "Test notification message 1",
            importance: "low",
          }}
        />
        <Notification
          notification={{
            id: "2",
            icon: <TestTubeDiagonal />,
            message: "Test notification message 2",
            importance: "medium",
          }}
        />
        <Notification
          notification={{
            id: "3",
            icon: <TestTubeDiagonal />,
            message: "Test notification message 3",
            importance: "high",
          }}
        />
      </Box>
    </div>
  );
}
