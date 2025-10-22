import { Text } from "@/components/text";

interface buttonProps {
  icon?: React.ReactNode;
  text?: string;
  onClick: () => void;
  className?: string;
}

export const Button: React.FC<buttonProps> = ({
  icon,
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`bg-stone-950/60 hover:bg-stone-950/20 active:bg-stone-950/40 px-4 py-2 rounded-lg flex items-center gap-2 text-stone-100/70 ${className}`}
      onClick={onClick}
    >
      {icon}
      {text && <Text content={text} />}
    </button>
  );
};
