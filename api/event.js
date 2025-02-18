import { getRoomMembers, addRoomEvents } from "./cache.js";
import cors from "./cors.js";

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === "POST") {
      const { room_id, messages } = req.body;

      const members = await getRoomMembers(room_id);
      if (!members.length) {
        return res.status(404).json({ error: "Room not found" });
      }

      if (!Array.isArray(messages)) {
        return res.status(400).json({ error: "Events should be an array" });
      }

      await addRoomEvents(room_id, messages);

      return res.json({ success: true });
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
