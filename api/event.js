import { rooms, roomEvents } from "./cache";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { room_id, message } = req.body;

    if (!rooms[room_id]) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (!roomEvents[room_id]) {
      roomEvents[room_id] = [];
    }

    roomEvents[room_id].push(message);

    return res.json({ success: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
