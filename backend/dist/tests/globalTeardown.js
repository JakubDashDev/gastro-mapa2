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
const config_1 = require("./utils/config");
module.exports = function globalTeardown() {
    return __awaiter(this, void 0, void 0, function* () {
        if (config_1.testDBConfig.Memory) {
            // Config to decide if an mongodb-memory-server instance should be used
            const instance = global.__MONGOINSTANCE;
            yield instance.stop();
        }
    });
};
