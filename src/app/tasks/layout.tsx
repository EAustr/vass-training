"use client";
import { TaskProvider } from "../context/task.context";
import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TaskProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}