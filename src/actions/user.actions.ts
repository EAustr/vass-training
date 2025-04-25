"use server";
import dbConnect from "@/lib/mongodb";
import { mUserSchema } from "@/models/user.mongoose";
import { User } from "@/types/user.model";
import { Types } from "mongoose";
import { UserDoc } from "@/models/user.mongoose";

export interface RawUser {
    _id: Types.ObjectId;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
  }

export async function getUsers(): Promise<User[]> {
    await dbConnect();
    const users = await mUserSchema.find().lean<RawUser[]>();

    return users.map((user): User => ({
        id: user._id.toString(),
        username: user.username,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
    }));
}

export async function getUserById(userId: string): Promise<User | null> {
    await dbConnect();
    const rawUser = await mUserSchema.findById(userId).lean<UserDoc>();
  
    if (!rawUser) return null;
  
    const user: User = {
      id: rawUser._id.toString(),
      username: rawUser.username,
      password: rawUser.password,
      first_name: rawUser.first_name,
      last_name: rawUser.last_name,
    };
  
    return user;
}