import { Text } from "@/components/text";

interface buttonBigProps {
  icon?: React.ReactNode;
  text?: string;
  onClick: () => void;
  className?: string;
}

export const ButtonBig: React.FC<buttonBigProps> = ({
  icon,
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`bg-stone-950/30 hover:bg-stone-950/20 active:bg-stone-950/40 px-5 py-5 rounded-lg flex flex-col items-center gap-2 text-stone-100/70 ${className}`}
      onClick={onClick}
    >
      {icon}
      {text && <Text content={text} />}
    </button>
  );
};
