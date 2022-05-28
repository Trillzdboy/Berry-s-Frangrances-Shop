import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchPerfumes = async () => {
      const response = await fetch(
        'https://berry-s-fragrance-default-rtdb.firebaseio.com/perfumes.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedPerfumes = [];

      for (const key in responseData) {
        loadedPerfumes.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      
      setPerfumes(loadedPerfumes);
      setIsLoading(false);
    };

    fetchPerfumes().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
  });
  },[]);

  if (isLoading) {
    return (
      <section className={classes.perfumesLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.perfumesError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = perfumes.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
