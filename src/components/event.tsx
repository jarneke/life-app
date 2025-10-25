import type { Event as EventType } from "@/types";

// Standard event block component — positions itself according to start and end times
export const Event: React.FC<{ event: EventType }> = ({ event }) => {
  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  // Calculate vertical position and height in the day planner
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const top = (startMinutes / 60) * 60 + 30; // hourHeight + paddingOffset
  const height = ((endMinutes - startMinutes) / 60) * 60; // hourHeight

  return (
    <div
      className="absolute left-18 right-5 bg-orange-300/70 backdrop-blur-md rounded-lg p-2 text-white shadow-lg"
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <p>{event.title}</p>
      <p>{event.description}</p>
    </div>
  );
};
