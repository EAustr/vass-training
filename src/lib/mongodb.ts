import mongoose, { Mongoose, Connection } from "mongoose";

// Get and validate the MongoDB URI
const getMongoUri = (): string => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
  return MONGODB_URI;
};

// Type for our cached mongoose connection
interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global namespace
declare global {
  var mongoose: CachedMongoose;
}

// Initialize or get cached connection
const getCachedConnection = (): CachedMongoose => {
  if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
  }
  return global.mongoose;
};

async function dbConnect(databaseName: string = "test"): Promise<Connection> {
  const cached = getCachedConnection();
  
  if (cached.conn) {
    return mongoose.connection.useDb(databaseName);
  }

  if (!cached.promise) {
    const mongoUri = getMongoUri();
    cached.promise = mongoose.connect(mongoUri).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return mongoose.connection.useDb(databaseName);
}

export default dbConnect;