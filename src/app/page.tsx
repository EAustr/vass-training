import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <Link 
        href="/task-app" 
        className="text-blue-500 hover:text-blue-700"
      >
        Go to Task Manager
      </Link>
    </div>
  );
}