import Link from "next/link";


export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Link
        href="/tasks"
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        Task Manager
      </Link>
    </div>
  );
}