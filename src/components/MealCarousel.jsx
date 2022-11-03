import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Context from '../context/Context';
import '../styles/RecipeDetails.css';

function MealCarousel() {
  const {
    location: { pathname },
  } = useHistory();
  const foodPath = pathname.includes('meals');
  const { foods, drinks } = useContext(Context);
  const MAX = 6;
  return (
    <Carousel>
      {!foodPath
        ? foods?.slice(0, MAX).map((e, index) => (
          <Carousel.Item
            key={ e.idMeal }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              className="recipe-recom"
              src={ e.strMealThumb }
              alt={ e.strMeal }
            />
            <Carousel.Caption>
              <h3 className="name" data-testid={ `${index}-recommendation-title` }>
                {e.strMeal}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))
        : drinks?.slice(0, MAX).map((e, index) => (
          <Carousel.Item
            key={ e.idDrink }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              className="recipe-recom"
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
            />
            <Carousel.Caption>
              <h3
                className="name"
                data-testid={ `${index}-recommendation-title` }
              >
                {e.strDrink}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default MealCarousel;
