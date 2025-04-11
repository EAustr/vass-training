import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link
        href="/tasks"
        className="inline-block px-5 py-2 bg-blue-500 text-white rounded-lg text-lg font-bold hover:bg-blue-600"
      >
        Task Manager
      </Link>
    </div>
  );
}