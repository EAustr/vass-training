import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(databaseName = "test") {
  if (cached.conn) {
    // console.log(`MongoDB is already connected to ${databaseName}`);
    return mongoose.connection.useDb(databaseName); // Switch to the specified database
  }

  if (!cached.promise) {
    // console.log("MongoDB is connecting...");
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      // console.log("Connected to MongoDB");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return mongoose.connection.useDb(databaseName); // Switch to the specified database
}

export default dbConnect;