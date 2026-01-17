import cloudinary from "../../config/cloudinary.js";
import Media from "./media.model.js";

export async function uploadMedia(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload_stream(
      { folder: "access-travel/media" },
      async (error, uploadResult) => {
        if (error) throw error;

        const media = await Media.create({
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          type: uploadResult.resource_type
        });

        res.status(201).json(media);
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({
      message: "Media upload failed",
      error: err.message
    });
  }
}

export async function getAllMedia(req, res) {
  const media = await Media.find().sort({ createdAt: -1 });
  res.json(media);
}
