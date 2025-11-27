import fs from "fs";
const saveImage = async (meal, name) => {
  const extension = meal.image.name.split(".").pop();
  const fileName = `${name}.${extension}`;
  const path = `./public/images/${fileName}`;
  const stream = fs.createWriteStream(path);
  const buffered = await meal.image.arrayBuffer();
  stream.write(Buffer.from(buffered), (err) => {
    if (err) {
      throw new Error("failed to save image");
    }
  });

  return fileName;
};

export default saveImage;
