import { createClient } from "redis";

let redis;

const initializeRedis = async () => {
  try {
    redis = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 5000, // Increase the timeout to 5000ms (5 seconds)
      },
    });
    await redis.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
};

initializeRedis();

const serialize = (obj) => JSON.stringify(obj);
const deserialize = (str) => JSON.parse(str);

export const getRoomMembers = async (roomId) => {
  const members = await redis.get(`room:${roomId}:members`);
  return members ? deserialize(members) : [];
};

export const addRoomMember = async (roomId, clientId) => {
  const members = await getRoomMembers(roomId);
  members.push(clientId);
  console.log("members", members);
  await redis.set(`room:${roomId}:members`, serialize(members));
};

export const removeRoomMember = async (roomId, clientId) => {
  let members = await getRoomMembers(roomId);
  members = members.filter((id) => id !== clientId);
  await redis.set(`room:${roomId}:members`, serialize(members));
};

export const getRoomEvents = async (roomId) => {
  const events = await redis.get(`room:${roomId}:events`);
  return events ? deserialize(events) : [];
};

export const addRoomEvent = async (roomId, event) => {
  const events = await getRoomEvents(roomId);
  events.push(event);
  await redis.set(`room:${roomId}:events`, serialize(events));
};

export const addRoomEvents = async (roomId, newEvents) => {
  const events = await getRoomEvents(roomId);
  await redis.set(
    `room:${roomId}:events`,
    serialize([...events, ...newEvents])
  );
};

export const clearRoomEvents = async (roomId) => {
  await redis.del(`room:${roomId}:events`);
};
