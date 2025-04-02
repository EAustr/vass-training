import { getTaskCount } from "@/actions/task.actions";
export default async function Loading(){
    const taskCount = await getTaskCount();
    return (
      <main className="flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Loading Tasks...</h1>
          <ul className="space-y-4">
            {[...Array(taskCount)].map((_, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg shadow-md flex justify-between items-center animate-pulse bg-white"
              >
                {/* Task details */}
                <div className="flex-1">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
  
                {/* Delete button */}
                <div className="h-10 w-20 bg-gray-300 rounded"></div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
};
  