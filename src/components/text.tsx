interface TextProps {
  content: string;
  className?: string;
}

// Simple text component — renders a paragraph with default styling and optional classes
export const Text: React.FC<TextProps> = ({ content, className }) => {
  return <p className={`text-stone-100/70 ${className}`}>{content}</p>;
};
