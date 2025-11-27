import fs from "fs";
import uploadImage from "./upload-image";
const saveImage = async (meal, name) => {
  const extension = meal.image.name.split(".").pop();
  const fileName = `${name}.${extension}`;
  const path = `./public/images/${fileName}`;
  // ! save the image with file system
  //const stream = fs.createWriteStream(path);
  const buffered = await meal.image.arrayBuffer();
  //   stream.write(Buffer.from(buffered), (err) => {
  //     if (err) {
  //       throw new Error("failed to save image");
  //     }
  //   });
  // ! upload the image to cloudinary
  const result = await uploadImage(Buffer.from(buffered), meal.image.type);

  return result;
};

export default saveImage;
