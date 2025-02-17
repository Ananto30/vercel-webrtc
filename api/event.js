import { getRoomMembers, getRoomEvents, addRoomEvent } from "./cache.js";
import cors from "./cors.js";

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === "POST") {
      const { room_id, message } = req.body;

      const members = await getRoomMembers(room_id);
      if (!members.length) {
        return res.status(404).json({ error: "Room not found" });
      }

      await addRoomEvent(room_id, message);

      return res.json({ success: true });
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
