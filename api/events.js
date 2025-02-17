import { roomEvents } from "./cache.js";
import cors from "./cors.js";

export default function handler(req, res) {
  cors(req, res, () => {
    if (req.method === "GET") {
      const roomId = req.query.room_id;

      if (!roomEvents[roomId]) {
        return res.status(404).json({ error: "Room not found" });
      }

      const events = roomEvents[roomId];
      roomEvents[roomId] = [];

      return res.json({ events: events });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
