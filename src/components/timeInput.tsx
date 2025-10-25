import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

interface TimeInputProps {
  selectedTime: string; // format "HH:mm"
  setSelectedTime: (t: string) => void;
}

// Standard time input component — wraps react-time-picker with controlled state and custom styling
export default function TimeInput({
  selectedTime,
  setSelectedTime,
}: TimeInputProps) {
  const handleChange = (val: string | null) => {
    if (!val) return;
    console.log("selected time", val);
    setSelectedTime(val as string); // Update parent state on change
  };

  return (
    <div className="react-time-picker-wrapper w-full">
      <TimePicker
        onChange={handleChange}
        value={selectedTime}
        clockIcon={null}
        clearIcon={null}
        disableClock={false}
        format="HH:mm"
        className="custom-timepicker w-full bg-stone-950/40 text-stone-50/70 rounded-xl px-4 py-2 text-sm outline-none focus:bg-stone-950/20 transition text-center"
      />
    </div>
  );
}
