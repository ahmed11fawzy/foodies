import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (buffer, type) => {
  try {
    // Convert to base64 for Cloudinary
    const base64String = `data:${type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: "foodies",
      resource_type: "auto",
    });

    console.log(result);
    if (!result) {
      throw new Error("Failed to upload image to Cloudinary");
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
