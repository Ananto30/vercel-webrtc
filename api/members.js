import { rooms } from "./cache";

export default function handler(req, res) {
  if (req.method === "GET") {
    const roomId = req.query.room_id;

    if (!rooms[roomId]) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json({ members: rooms[roomId] });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
