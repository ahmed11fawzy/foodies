import React from "react";
import classes from "./page.module.css";
import { getMeal } from "@/utils/meals";
import Image from "next/image";
import { notFound } from "next/navigation";
// meta data for dynamic meal details page
export async function generateMetadata({ params: awaitedParams }) {
  const params = await awaitedParams;
  const meal = getMeal(params.meal);
  if (!meal) {
    return notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}
const MealDetailsPage = ({ params }) => {
  const meal = getMeal(React.use(params).meal);
  if (!meal) {
    return notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}> {meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main className={classes.main}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
