import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

const uploadToCloudinary = (buffer, folder = "authentication") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

export default uploadToCloudinary;