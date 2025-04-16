"use client";
import { TaskProvider } from "../context/task.context";
import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TaskProvider>
          <main className="flex justify-center min-h-screen p-4 w-xl">{children}</main>
        </TaskProvider>
      </body>
    </html>
  );
}