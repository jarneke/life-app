import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-date-picker/dist/shared/types.js";
import { Calendar } from "lucide-react";

// Standard date picker component — wraps react-date-picker with optional format and styling
export default function DateInput({
  selectedDate,
  setSelectedDate,
  format,
}: {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  format?: string;
}) {
  const handleChange = (val: Value) => {
    if (!val) return;
    setSelectedDate(val as Date); // Update date when user selects
  };

  return (
    <div className="react-date-picker-wrapper flex-grow">
      <DatePicker
        onChange={handleChange}
        value={selectedDate}
        calendarIcon={<Calendar />}
        clearIcon={null}
        required={true}
        format={
          format
            ? format
            : `${selectedDate.toLocaleDateString("en-UK", {
                month: "long",
                year: "numeric",
              })} `
        }
        locale="en-UK"
        className="custom-datepicker w-full bg-stone-950/40 text-stone-50/70 rounded-xl px-4 py-2 text-sm outline-none focus:bg-stone-950/20 transition text-center"
      />
    </div>
  );
}
