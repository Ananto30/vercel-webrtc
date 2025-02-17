import { createClient } from "redis";

const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export const getRoomMembers = async (roomId) => {
  const members = await redis.sMembers(`room:${roomId}`);
  return members;
};

export const addRoomMember = async (roomId, clientId) => {
  await redis.sAdd(`room:${roomId}`, clientId);
};

export const removeRoomMember = async (roomId, clientId) => {
  await redis.sRem(`room:${roomId}`, clientId);
};

export const getRoomEvents = async (roomId) => {
  const events = await redis.lRange(`room:${roomId}:events`, 0, -1);
  return events.map((event) => JSON.parse(event));
};

export const addRoomEvent = async (roomId, event) => {
  const eventJSON = JSON.stringify(event);
  await redis.rPush(`room:${roomId}:events`, eventJSON);
};

export const clearRoomEvents = async (roomId) => {
  await redis.del(`room:${roomId}:events`);
};
