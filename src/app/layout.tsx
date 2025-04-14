"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-center items-center gap-4 p-4">
            <Link
              href="/tasks/create"
              className={`px-4 py-2 rounded transition ${
                pathname === "/tasks/create"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Create Tasks
            </Link>
            <Link
              href="/tasks"
              className={`px-4 py-2 rounded transition ${
                pathname === "/tasks"
                  ? "bg-green-700 text-white"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Tasks
            </Link>
          </div>

          <main className="flex justify-center p-4 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
