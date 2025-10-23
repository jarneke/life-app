import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-date-picker/dist/shared/types.js";
import { Calendar, Check } from "lucide-react";

interface DateInputProps {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
}

export default function DateInput({
  selectedDate,
  setSelectedDate,
}: DateInputProps) {
  const handleChange = (val: Value) => {
    if (!val) return;
    console.log("clicked", val);
    setSelectedDate(val as Date);
  };

  return (
    <div className="react-date-picker-wrapper flex-grow">
      <DatePicker
        onChange={handleChange}
        value={selectedDate}
        calendarIcon={<Calendar />}
        clearIcon={null}
        required={true}
        format={`${selectedDate.toLocaleDateString("en-UK", {
          month: "long",
          year: "numeric",
        })} `}
        locale="en-UK"
        className="custom-datepicker w-full bg-stone-950/40 text-stone-50/70 rounded-xl px-4 py-2 text-sm outline-none focus:bg-stone-950/20 transition text-center"
      />
    </div>
  );
}
