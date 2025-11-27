"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

const validator = (value) => value.trim() === "" || !value;

export async function handleSubmit(prev, formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };
  if (
    validator(meal.creator) ||
    validator(meal.creator_email) ||
    validator(meal.title) ||
    validator(meal.summary) ||
    validator(meal.instructions) ||
    !creator_email.includes("@")
  ) {
    return { message: "Please fill in all the fields" };
  }
  await saveMeal(meal);
  redirect("/meals");
}
