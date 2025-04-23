"use client";
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
      <body className={'antialiased'}>
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-center items-center gap-4 p-4">
            <Link
              href="/tasks/create"
              className={`px-4 py-2 rounded transition text-white ${
                pathname === "/tasks/create"
                  ? "bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Create Tasks
            </Link>
            <Link
              href="/tasks"
              className={`px-4 py-2 rounded transition text-white ${
                pathname === "/tasks"
                  ? "bg-green-700 "
                  : "bg-green-500  hover:bg-green-600"
              }`}
            >
              Tasks
            </Link>
          </div>

          <main className="flex justify-center  p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
