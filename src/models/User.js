import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});


export async function getUsersFromTest() {
  const db = await dbConnect("test");
  const users = await db.model("User", UserSchema).find({});
  console.log("Fetched users from test:", users);
  return users;
}

export const User = mongoose.models.User || mongoose.model("User", UserSchema);