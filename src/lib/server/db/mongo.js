// src/lib/server/db/mongo.js
import mongoose from 'mongoose';
import { DATABASE_URL } from '$env/static/private';
// import { env } from '$env/dynamic/private';
let isConnected = false;

export const startMongo=async()=> {
  if (isConnected) {
    console.log('✅ Mongo already connected');
   return mongoose.connection.db
  }

  try {
    console.log('🔌 Connecting to MongoDB...');
    // await mongoose.connect(env.DATABASE_URL); // No need for deprecated options
        await mongoose.connect(DATABASE_URL); // No need for deprecated options
    isConnected = true;
    console.log('✅ Connected to MongoDB via Mongoose');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
   return mongoose.connection.db
}



// import { MongoClient } from "mongodb";
// import { DATABASE_URL } from "$env/static/private";

// const client = new MongoClient(DATABASE_URL);

// let db;

// export async function startMongo() {
//   if (db) return db;

//   await client.connect();
//   db = client.db("your_db_name");

//   console.log("✅ MongoDB Native connected");
//   return db;
// }