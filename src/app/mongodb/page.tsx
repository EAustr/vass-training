import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";

export async function getUsers() {
  await dbConnect();
  const users = await User.find({});
  console.log(users);
  return users;
}

export default async function Page() {
  const users = await getUsers();

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Password:</strong> {user.password} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}