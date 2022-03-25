import redis, { createClient } from "redis";
import express from "express";

const client = createClient();

const cache = async (key: string, value: string, ttl: number) => {
  await client.setEx(key, ttl, value);

  const getVal = client.get(key);
  if (!getVal) {
    await client.setEx(`${key}_time`, 60 * 60 * 24, String(1));
  } else {
    await client.setEx(`${key}_time`, 60 * 60 * 24, String(Number(getVal) + 1));
  }
};

const get = async (key: string, value: string = null) => {
  const res = await client.get(key);
  return res;
};
export default { cache, get };
