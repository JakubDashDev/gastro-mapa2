import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { testDBConfig } from "./utils/config";

export = async function globalSetup() {
  if (testDBConfig.Memory) {
    // Config to decide if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGODB = uri.slice(0, uri.lastIndexOf("/"));
  } else {
    process.env.MONGODB = `mongodb://${testDBConfig.IP}:${testDBConfig.Port}`;
  }

  // The following is to make sure the database is clean before a test suite starts
  const conn = await mongoose.connect(`${process.env.MONGODB}/${testDBConfig.Database}`);
  await conn.connection.db.dropDatabase();
  await mongoose.disconnect();
};
