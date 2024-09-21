import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Lingo Match",
  description: "Lingo Match is an engaging memory game designed to help players learn new languages through fun and interactive word pair matching. Challenge yourself to match words in different languages while improving your vocabulary and recall skills. Suitable for language learners of all ages, Lingo Match combines gameplay with education, making language learning enjoyable and effective. Play solo or compete with friends to see who can achieve the highest score!"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
