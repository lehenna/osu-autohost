import "./index.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Osu Autohost By Lehenna",
  description:
    "Create and manage osu multiplayer rooms with integrated Auto Host Rotation system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="relative bg-zinc-950 text-white overflow-x-hidden w-full min-h-screen flex justify-center">
        <div className="relative w-full max-w-2xl px-4 py-8 flex flex-col gap-8">
          {children}
        </div>
      </body>
    </html>
  );
}
