
import prisma from "../prisma/client.js";

export default async function (req, res) {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" }
    });

    return res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
