interface TextProps {
  content: string;
  className?: string;
}
export const Text: React.FC<TextProps> = ({ content, className }) => {
  return (
    <p className={className ? className : "text-stone-100/70"}>{content}</p>
  );
};
