import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [simulate, setSimulate] = useState(null);

  let firebaseUrl = "https://test-ecce5-default-rtdb.firebaseio.com/meals.json";

  if (simulate) {
    firebaseUrl = "";
    console.log("simulate");
  }

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(firebaseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // We can't use try/catch here since this we are getting a promise.
    // We could use await for fetchmeals but we would have to create it in a seperate function
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [firebaseUrl]);

  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading...</section>;
  }
  if (error) {
    return <section className={classes.MealsError}>{error}</section>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (simulate) {
    firebaseUrl = "";
    console.log("simulate");
  }

  const simulateHandler = () => {
    if (!simulate) {
      setSimulate(true);
    }
    if (simulate) {
      setSimulate(false);
    }
  };
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        <button onClick={simulateHandler} className={classes.button}>
          Simulate http error
        </button>
      </Card>
    </section>
  );
};

export default AvailableMeals;
