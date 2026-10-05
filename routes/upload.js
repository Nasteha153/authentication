import express from "express";
import { protect } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import User from "../Models/User.js";

const router = express.Router();

router.post("/image", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "profile_pictures"
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        profilePicture: result.secure_url,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      fileUrl: result.secure_url,
    });

  } catch (error) {
    console.error("Upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
});

export default router;