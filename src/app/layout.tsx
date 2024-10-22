import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          outfit.className,
          "bg-white text-black text-sm [&>main]:min-h-80"
        )}
      >
        {props.children}
      </body>
    </html>
  );
}
