interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: boolean;
}

// Standard text input component — supports optional error styling and custom classes
export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
  required = false,
  type = "text",
  error = false,
}) => {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)} // Update parent state on change
      className={`bg-stone-950/40 text-stone-50/70 p-2 rounded-lg focus:outline-none focus:bg-stone-950/20 w-full transition border ${
        error ? "border-red-500 focus:border-red-400" : "border-transparent"
      } ${className}`} // Apply default + error + custom styles
      placeholder={placeholder}
    />
  );
};
