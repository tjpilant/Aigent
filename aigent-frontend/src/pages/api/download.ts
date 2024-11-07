import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const filePath = req.query.file as string;

    // Validate file path to prevent directory traversal
    const normalizedPath = path
      .normalize(filePath)
      .replace(/^(\.\.[\/\\])+/, "");

    if (!fs.existsSync(normalizedPath)) {
      return res.status(404).json({ error: "File not found" });
    }

    const fileName = path.basename(normalizedPath);
    const fileStream = fs.createReadStream(normalizedPath);

    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "text/markdown");

    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Error downloading file" });
  }
}
