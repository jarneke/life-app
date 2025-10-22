interface InputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} bg-stone-950/60 text-stone-50/70 p-2 rounded-lg focus:outline-none focus:bg-stone-950/20 w-full transition`}
      placeholder={placeholder}
    />
  );
};
