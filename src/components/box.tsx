interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}
export const Box: React.FC<BoxProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-stone-950/60 backdrop-blur-md p-5 rounded-3xl flex flex-col items-center self-stretch  ${className}`}
    >
      {children}
    </div>
  );
};
