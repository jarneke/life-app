interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
}
export const Box: React.FC<BoxProps> = ({
  children,
  className = "",
  style,
  ref,
}) => {
  return (
    <div
      ref={ref}
      style={style}
      className={`bg-stone-950/40 backdrop-blur-md p-5 rounded-3xl flex flex-col items-center self-stretch ${className}`}
    >
      {children}
    </div>
  );
};
