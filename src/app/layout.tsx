import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "First Ocean Supermarket | Something for the Whole Family",
  description:
    "For a convenient and reliable shopping experience, shop at First Ocean Supermarket. We've got something in store for you!",
  keywords:
    "First Ocean, supermarket, groceries, family shopping, convenient shopping, household essentials, shop with us",
  applicationName: "First Ocean Supermarket",
  authors: [{ name: "First Ocean Supermarket" }],
  openGraph: {
    type: "website",
    url: "https://firstoceansupermarket.com",
    title: "First Ocean Supermarket | Something for the Whole Family",
    siteName: "First Ocean Supermarket",
    description:
      "For a convenient and reliable shopping experience, shop at First Ocean Supermarket. We've got something in store for you!",
    images: ["https://firstoceansupermarket.com/banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "First Ocean Supermarket | Something for the Whole Family",
    description:
      "For a convenient and reliable shopping experience, shop at First Ocean Supermarket. We've got something in store for you!",
    images: ["https://firstoceansupermarket.com/banner.jpg"],
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(outfit.className, "text-sm")}>{props.children}</body>
    </html>
  );
}
