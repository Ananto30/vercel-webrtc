import { getRoomEvents } from "./cache.js";
import cors from "./cors.js";

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === "GET") {
      const roomId = req.query.room_id;
      const clientId = req.query.client_id;

      const events = await getRoomEvents(roomId, clientId);

      return res.json({ events });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
