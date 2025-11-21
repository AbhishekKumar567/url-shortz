
import prisma from "../prisma/client.js";

export default async function (req, res) {
  try {
    const { code } = req.params;

    const link = await prisma.link.findUnique({
      where: { shortCode: code }
    });

    if (!link) return res.status(404).json({ error: "Not found" });

    return res.json(link);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
