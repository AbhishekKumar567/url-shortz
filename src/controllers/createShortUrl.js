
import { nanoid } from "nanoid";
import prisma from "../prisma/client.js";

export default async function (req, res) {
  try {
    const { url, customCode } = req.body;

    if (!url || !/^https?:\/\//.test(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    let shortCode = customCode?.trim() || nanoid(6);

    const exists = await prisma.link.findUnique({ where: { shortCode } });
    if (exists) {
      return res.status(400).json({ error: "Short code already exists" });
    }

    const link = await prisma.link.create({
      data: { original: url, shortCode }
    });

    return res.json({
      shortUrl: `${process.env.APP_URL}/${shortCode}`,
      data: link
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
