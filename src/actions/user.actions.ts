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


export async function getUserByUsername(username: string): Promise<{ id: string; password: string } | null> {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Connected to database. Querying user:", username);
  
    const user = await mUserSchema
      .findOne({ username })
      .select("_id password")
      .lean<{ _id: Types.ObjectId; password: string }>();
  
    if (!user) {
      console.log("User not found:", username);
      return null;
    }
  
    console.log("User found:", user);
  
    return {
      id: user._id.toString(),
      password: user.password,
    };
  }

export async function getUserPasswordHash(userId: string): Promise<string | null> {
    await dbConnect();
    const user = await mUserSchema.findById(userId).select("password").lean<UserDoc>();
    if (!user) return null;
    return user.password;
}

