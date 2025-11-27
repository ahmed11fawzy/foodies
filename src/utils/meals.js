import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import saveImage from "./store-image";
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  /* throw new Error("failed to fetch meals"); */
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.summary = xss(meal.summary);
  meal.instructions = xss(meal.instructions);
  const file = await saveImage(meal, meal.title);

  // ? use file system path
  /*  meal.image = `/images/${fileName}`;*/
  // ? use cloudinary url
  meal.image = file.secure_url;
  // save the meal
  db.prepare(
    `
      INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES (
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `
  ).run(meal);
}
