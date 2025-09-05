import { uploadToCloudinary } from "../lib/filesUpload.js";

export const cloudinaryUploadMiddleware = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);

    req.imageUrl = result.secure_url;
    req.imageMimeType = req.file.mimetype;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
