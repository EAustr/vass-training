import { getUsers } from "@/actions/user.actions";

export default async function UserList() {
  const users = await getUsers();

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">User List</h2>
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 border rounded-lg shadow-md flex flex-col gap-2"
        >
          <h3 className="font-bold text-lg">{user.username}</h3>
          <p>
            <strong>First Name:</strong> {user.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {user.last_name}
          </p>
        </div>
      ))}
    </div>
  );
}