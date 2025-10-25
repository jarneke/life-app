interface TextAreaProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

// Standard textarea component — controlled input with optional rows, styling, and required state
export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
  rows = 4,
  required = false,
}) => {
  return (
    <textarea
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)} // Update parent state on change
      rows={rows}
      className={`${className} bg-stone-950/40 text-stone-50/70 p-2 rounded-lg focus:outline-none focus:bg-stone-950/20 w-full transition resize-none`} // Default + custom styling
      placeholder={placeholder}
    />
  );
};
