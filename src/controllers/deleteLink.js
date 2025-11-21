
import prisma from "../prisma/client.js";

export default async function (req, res) {
  try {
    const { code } = req.params;

    await prisma.link.delete({
      where: { shortCode: code }
    });

    return res.json({ message: "Deleted successfully" });

  } catch (err) {
    return res.status(404).json({ error: "Link not found" });
  }
}
