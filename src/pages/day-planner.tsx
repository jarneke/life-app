import { Background } from "@/components/background";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import DateInput from "@/components/dateInput";
import { DateThingy } from "@/components/dateThingy";
import { Text } from "@/components/text";
import { Event } from "@/components/event";
import type { Event as EventType } from "@/types";
import { supabase } from "@/lib/supabaseClient";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/modal";
import TimeInput from "@/components/timeInput";
import { Input } from "@/components/input";
import { TextArea } from "@/components/textArea";

export default function DayPlanner() {
  // ---------- STATE MANAGEMENT ----------

  // Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Array of visible days in the current week
  const [days, setDays] = useState<Date[]>([]);

  // Currently selected date (defaults to today)
  const [selectedDate, setSelectedDate] = useState(
    () =>
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0
      )
  );

  // Tracks system time to update the "current time" line
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // List of all hourly markers shown in the timeline
  const [timeIntervals] = useState<string[]>([
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
  ]);

  // Vertical position (in pixels) for the current time indicator
  const [topPosition, setTopPosition] = useState(0);

  // Events belonging to the selected date
  const [todayEvents, setTodayEvents] = useState<EventType[]>([]);

  // ---------- FORM STATE ----------

  const [eventTitle, setEventTitle] = useState("");
  const [eventTitleEmptyError, setEventTitleEmptyError] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState<Date>();
  const [eventDateError, setEventDateError] = useState(false);
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventStartTimeError, setEventStartTimeError] = useState(false);
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventEndTimeError, setEventEndTimeError] = useState(false);

  // ---------- REF ELEMENTS ----------

  const scrollRef = useRef<HTMLDivElement>(null); // container for vertical scroll
  const hasscrolledRef = useRef(false); // prevents repeated auto-scrolls

  // ---------- TIME UPDATING ----------

  // Update current time every 60 seconds to keep the red "now" line accurate
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ---------- WEEK GENERATION ----------

  // Regenerates week view when selected date changes
  useEffect(() => {
    const day = selectedDate.getDay() === 0 ? 7 : selectedDate.getDay();
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - (day - 1));

    const newDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
      newDays.push(
        new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate() + i
        )
      );
    }
    setDays(newDays);
  }, [selectedDate]);

  // ---------- SCROLL / POSITION ----------

  const paddingOffset = 26; // accounts for layout padding/margin
  const hourHeight = 60; // visual height per hour row in px

  // Recalculate vertical position of current time indicator
  useEffect(() => {
    const minutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    setTopPosition((minutes / 60) * hourHeight + paddingOffset);
  }, [currentTime]);

  // Scroll to current time only once on mount
  useEffect(() => {
    if (!scrollRef.current || hasscrolledRef.current || topPosition === 0)
      return;
    hasscrolledRef.current = true;

    const timeout = setTimeout(() => {
      scrollRef.current!.scrollTo({
        top: topPosition - 250,
        behavior: "smooth",
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [topPosition]);

  // ---------- EVENT FETCHING ----------

  // Retrieve events from Supabase for the current day
  useEffect(() => {
    async function fetchEvents() {
      const startOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0,
        0,
        0
      );

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("date", startOfDay.toISOString());

      if (error) {
        console.error("Error fetching events:", error);
        return;
      }
      setTodayEvents(data || []);
    }

    fetchEvents();
  }, [selectedDate]);

  // ---------- DATE CONTROLS ----------

  // Jump to a specific date in the week
  const handleDateClick = (date: Date) => {
    setSelectedDate(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  // Move to previous day
  const handlePrev = () => {
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - 1,
        0,
        0,
        0
      )
    );
  };

  // Move to next day
  const handleNext = () => {
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 1,
        0,
        0,
        0
      )
    );
  };

  // ---------- MODAL HANDLERS ----------

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // ---------- EVENT CREATION ----------

  // Validate and insert new event into Supabase
  const handleAddEvent = async () => {
    // validation
    if (!eventTitle.trim()) return setEventTitleEmptyError(true);
    if (!eventDate) return setEventDateError(true);
    if (!eventStartTime.trim()) return setEventStartTimeError(true);
    if (!eventEndTime.trim()) return setEventEndTimeError(true);

    setEventTitleEmptyError(false);
    setEventDateError(false);
    setEventStartTimeError(false);
    setEventEndTimeError(false);

    // construct event object
    const newEvent: EventType = {
      id: Date.now(),
      title: eventTitle.trim(),
      description: eventDescription.trim(),
      date: new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        0,
        0,
        0
      ),
      startTime: new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        parseInt(eventStartTime.split(":")[0]),
        parseInt(eventStartTime.split(":")[1])
      ),
      endTime: new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        parseInt(eventEndTime.split(":")[0]),
        parseInt(eventEndTime.split(":")[1])
      ),
    };

    // insert event into Supabase
    const { error } = await supabase.from("events").insert([newEvent]);
    if (error) {
      console.error("Error adding event:", error);
      return;
    }

    // reset form
    setEventTitle("");
    setEventDescription("");
    setEventDate(undefined);
    setEventStartTime("");
    setEventEndTime("");

    // close modal and refresh day
    handleCloseModal();
    setSelectedDate(new Date(selectedDate));
  };

  // ---------- RENDER ----------

  return (
    <>
      {/* Main app background */}
      <Background className="justify-start" Home>
        {/* Header: navigation and week selector */}
        <Box className="gap-2 z-10">
          <div className="self-stretch flex flex-row gap-4 items-center justify-between relative">
            <Button icon={<ChevronLeft />} onClick={handlePrev} />
            <DateInput
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <Button icon={<ChevronRight />} onClick={handleNext} />
          </div>

          {/* Weekday display */}
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

        {/* Timeline scroll area */}
        <Box
          ref={scrollRef}
          className="overflow-scroll flex flex-col gap-10 p-5 relative"
        >
          {/* Hour markers */}
          {timeIntervals.map((time, index) => (
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

          {/* Render events */}
          {todayEvents.map((event) => (
            <Event event={event} key={event.id} />
          ))}

          {/* "Current time" indicator */}
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

      {/* Floating action button to open modal */}
      <button
        className="fixed bottom-6 right-6 bg-orange-300 text-white p-4 rounded-full shadow-lg z-50 hover:bg-orange-500"
        onClick={handleOpenModal}
      >
        <Plus size={24} />
      </button>

      {/* Add Event Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Text content="Add New Event" className="text-2xl font-bold mb-4" />

        <form className="flex flex-col">
          {/* Title input */}
          <Text content="Event Title" className="text-sm font-medium mb-2" />
          <Input
            type="text"
            value={eventTitle}
            className="w-full p-2 mb-4 rounded bg-stone-800 text-white"
            onChange={(v) => setEventTitle(v)}
            error={eventTitleEmptyError}
          />

          {/* Description */}
          <Text
            content="Event Description"
            className="text-sm font-medium mb-2"
          />
          <TextArea
            className="w-full p-2 mb-4 rounded bg-stone-800 text-white"
            onChange={(v) => setEventDescription(v)}
          />

          {/* Date picker */}
          <Text content="Event Date" className="text-sm font-medium mb-2" />
          <DateInput
            selectedDate={eventDate!}
            setSelectedDate={(d) => setEventDate(d)}
            format="dd-MM-y"
          />

          {/* Start and End times */}
          <Text
            content="Start Time"
            className="text-sm font-medium mb-2 mt-4"
          />
          <TimeInput
            selectedTime={eventStartTime}
            setSelectedTime={setEventStartTime}
          />

          <Text content="End Time" className="text-sm font-medium mb-2 mt-4" />
          <TimeInput
            selectedTime={eventEndTime}
            setSelectedTime={setEventEndTime}
          />

          {/* Form buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <Button
              text="Cancel"
              onClick={handleCloseModal}
              className="px-4 py-2 rounded bg-stone-700 hover:bg-stone-600"
            />
            <Button
              text="Save"
              onClick={handleAddEvent}
              className="px-4 py-2 rounded !bg-orange-400/50 hover:!bg-orange-500"
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
