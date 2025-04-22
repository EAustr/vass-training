"use server";
import dbConnect from "@/lib/mongodb";
import { mUserSchema } from "@/models/user.mongoose";

export async function getUsers() {
    await dbConnect();
    const users = await mUserSchema.find().lean();

    return users.map((user: any) => ({
        id: user._id.toString(),
        username: user.username,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
    }));
}

