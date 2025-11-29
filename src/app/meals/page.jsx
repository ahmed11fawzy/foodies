import React, { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/meal-grid";
import { getMeals } from "@/utils/meals";
import Loading from "../loading.module.css";

export const metadata = {
  title: "All Meals",
  description: "A list of all delicious meals shared by our community.",
};
const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};
const MealsPage = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          delicious meals created by{" "}
          <span className={classes.highlight}>foodies</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
        <p className={classes.cta}>
          <Link href="/meals/shared ">share your recipes</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={Loading.loading}>fetching meals</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
