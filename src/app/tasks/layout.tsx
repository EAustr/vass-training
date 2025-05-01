"use client";
import { TaskProvider } from "../context/task.context";
import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <TaskProvider>
          <main className="flex justify-center p-4 w-xl">{children}</main>
        </TaskProvider>
  );
}