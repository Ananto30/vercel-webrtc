import { getRoomEvents, clearRoomEvents } from "./cache.js";
import cors from "./cors.js";

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === "GET") {
      const roomId = req.query.room_id;

      const events = await getRoomEvents(roomId);
      if (!events.length) {
        return res.status(404).json({ error: "Room not found" });
      }

      await clearRoomEvents(roomId);

      return res.json({ events: events });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
