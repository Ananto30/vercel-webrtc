import { getRoomMembers } from "./cache.js";
import cors from "./cors.js";

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === "GET") {
      const roomId = req.query.room_id;

      const members = await getRoomMembers(roomId);
      if (!members.length) {
        return res.status(404).json({ error: "Room not found" });
      }

      return res.json({ members });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
