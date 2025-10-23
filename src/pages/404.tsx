import { Box } from "@/components/box";
import { ButtonBig } from "@/components/button-big";
import { Text } from "@/components/text";
import { Home, SearchX } from "lucide-react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center gap-10 p-5"
      style={{
        backgroundImage: "url('/backgrounds/bg_lock_pastel_warm.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box className="items-center gap-4 text-center">
        <SearchX size={64} className="text-stone-100/70" />
        <Text
          className="text-5xl font-bold text-stone-100"
          content="404 — Page Not Found"
        />
        <Text
          className="text-stone-100/50 text-base"
          content="Looks like this page drifted into the void."
        />
      </Box>

      <ButtonBig
        icon={<Home />}
        text="Return Home"
        className="bg-stone-950/60 active:bg-stone-950/40 self-stretch rounded-3xl"
        onClick={() => router.push("/")}
      />
    </div>
  );
}
