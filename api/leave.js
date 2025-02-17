import { rooms } from "./cache.js";
import cors from "./cors.js";

export default function handler(req, res) {
  cors(req, res, () => {
    if (req.method === "POST") {
      const { room_id, client_id } = req.body;

      if (!rooms[room_id]) {
        return res.status(404).json({ error: "Room not found" });
      }

      rooms[room_id] = rooms[room_id].filter((id) => id !== client_id);

      res.json({ members: rooms[room_id] });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
