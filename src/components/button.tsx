import { Text } from "@/components/text";

interface buttonProps {
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

// Standard button component with optional icon and text
export const Button: React.FC<buttonProps> = ({
  icon,
  text,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`bg-stone-950/40 hover:bg-stone-950/20 active:bg-stone-950/40 px-4 py-2 rounded-lg flex items-center gap-2 text-stone-100/70 ${className}`}
      onClick={onClick}
    >
      {icon}
      {text && <Text content={text} />}
    </button>
  );
};
