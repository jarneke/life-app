import { Button } from "@/components/button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/router";

interface backgroundProps {
  children: React.ReactNode;
  className?: string;
  Home?: boolean;
}

// Full-screen layout wrapper with optional home button
export const Background: React.FC<backgroundProps> = ({
  children,
  className,
  Home = false,
}) => {
  const router = useRouter();

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center p-5 md:p-10 lg:p-20 gap-10 overflow-scroll ${className}`}
      style={{
        backgroundImage: "url('/backgrounds/bg_lock_pastel_warm.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {Home && (
        <Button
          icon={<HomeIcon />}
          onClick={() => router.push("/")}
          className="self-start"
        />
      )}
      {children}
    </div>
  );
};
