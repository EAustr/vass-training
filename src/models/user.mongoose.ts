import mongoose,{ InferSchemaType }from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
});

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };
export const mUserSchema = mongoose.models.User || mongoose.model("User", UserSchema);