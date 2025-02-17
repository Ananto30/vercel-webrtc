import { rooms } from "./cache.js";
import cors from "./cors.js";

export default function handler(req, res) {
  cors(req, res, () => {
    if (req.method === "POST") {
      const { room_id, client_id } = req.body;

      if (!rooms[room_id]) {
        rooms[room_id] = [];
      }

      if (rooms[room_id].includes(client_id)) {
        return res.json({ members: rooms[room_id] });
      }

      rooms[room_id].push(client_id);
      return res.json({ members: rooms[room_id] });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
