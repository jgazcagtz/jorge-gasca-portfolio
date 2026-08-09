import { Geist, Instrument_Serif } from "next/font/google";

export const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "optional",
});

export const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
