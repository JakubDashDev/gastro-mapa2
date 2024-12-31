import { MongoMemoryServer } from "mongodb-memory-server";
import { testDBConfig } from "./utils/config";

export = async function globalTeardown() {
  if (testDBConfig.Memory) {
    // Config to decide if an mongodb-memory-server instance should be used
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};
