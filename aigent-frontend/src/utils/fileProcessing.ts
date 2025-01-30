import { File } from "formidable";
import fs from "fs";
import path from "path";

interface ProcessResult {
  filePath: string;
}

export async function processFile(
  file: File,
  saveLocation: string
): Promise<ProcessResult> {
  // Create a unique filename
  const timestamp = new Date().getTime();
  const uniqueFilename = `${timestamp}-${path.basename(
    file.originalFilename || "unnamed"
  )}`;
  const outputPath = path.join(
    saveLocation,
    uniqueFilename.replace(/\.[^/.]+$/, ".md")
  );

  // Process the file (implement your OCR logic here)
  // For now, we'll just copy the file
  await fs.promises.copyFile(file.filepath, outputPath);

  return {
    filePath: outputPath,
  };
}
