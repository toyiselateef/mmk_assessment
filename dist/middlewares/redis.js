"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv = require("dotenv");
dotenv.config();
var options = {
    url: `redis://${process.env.RedisHost}:${process.env.RedisPort}`,
    name: 'mmk-redis',
    password: `${process.env.RedisPassword}`,
    legacyMode: true,
};
const client = (0, redis_1.createClient)(options);
client.on('connect', function () {
    console.log('Redis Connected!');
});
const cache = async (key, value, ttl) => {
    try {
        if (!client.isOpen)
            await client.connect();
        await client.setEx(key, ttl, value);
        const getVal = client.get(`${key}_time`);
        if (!getVal) {
            await client.setEx(`${key}_time`, 60 * 60 * 24, String(1));
        }
        else {
            await client.setEx(`${key}_time`, 60 * 60 * 24, String(Number(getVal) + 1));
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    //  finally {
    //    await client.disconnect();
    //  }
};
const get = async (key, value = null) => {
    try {
        if (!client.isOpen)
            await client.connect();
        const res = await client.get(key);
        return res;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    // finally {
    //   await client.disconnect();
    // }
};
exports.default = { cache, get };
//# sourceMappingURL=redis.js.map