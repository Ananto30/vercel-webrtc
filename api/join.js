import { getRoomMembers, addRoomMember } from "./cache.js";
import cors from "./cors.js";

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === "POST") {
      const { room_id, client_id } = req.body;

      const members = await getRoomMembers(room_id);
      if (members.includes(client_id)) {
        return res.json({ members });
      }

      await addRoomMember(room_id, client_id);
      members.push(client_id);

      return res.json({ members });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
