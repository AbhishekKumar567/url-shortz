
import prisma from "../prisma/client.js";

export default async function (req, res) {
  try {
    const { shortCode } = req.params;

    const link = await prisma.link.findUnique({ where: { shortCode } });
    if (!link) return res.status(404).send("Short URL not found");

    await prisma.link.update({
      where: { shortCode },
      data: {
        clicks: { increment: 1 },
        lastClicked: new Date()
      }
    });

    return res.redirect(link.original);

  } catch (err) {
    res.status(500).send("Server error");
  }
}
