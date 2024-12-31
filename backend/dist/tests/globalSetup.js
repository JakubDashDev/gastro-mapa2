"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./utils/config");
module.exports = function globalSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        if (config_1.testDBConfig.Memory) {
            // Config to decide if an mongodb-memory-server instance should be used
            // it's needed in global space, because we don't want to create a new instance every test-suite
            const instance = yield mongodb_memory_server_1.MongoMemoryServer.create();
            const uri = instance.getUri();
            global.__MONGOINSTANCE = instance;
            process.env.MONGODB = uri.slice(0, uri.lastIndexOf("/"));
        }
        else {
            process.env.MONGODB = `mongodb://${config_1.testDBConfig.IP}:${config_1.testDBConfig.Port}`;
        }
        // The following is to make sure the database is clean before a test suite starts
        const conn = yield mongoose_1.default.connect(`${process.env.MONGODB}/${config_1.testDBConfig.Database}`);
        yield conn.connection.db.dropDatabase();
        yield mongoose_1.default.disconnect();
    });
};
