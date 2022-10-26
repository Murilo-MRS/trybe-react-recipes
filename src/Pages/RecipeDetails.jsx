import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDrinksDetails, fetchFoodsDetails } from '../services/Api';

const ONE_TO_TWENTY = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

function RecipeDetails() {
  const { id } = useParams();
  const {
    location: { pathname },
  } = useHistory();
  const [detail, setDetails] = useState({});
  const food = pathname.includes('meals');
  const drink = pathname.includes('drinks');
  const video = detail?.strYoutube?.replace('watch?v=', 'embed/');

  useEffect(() => {
    (async () => {
      if (drink) {
        const drinkDetails = await fetchDrinksDetails(id);
        setDetails(drinkDetails);
      }
      if (food) {
        const foodDetails = await fetchFoodsDetails(id);
        setDetails(foodDetails);
      }
    })();
  }, [id, drink, food]);
  return (
    <>
      <Header />
      {food ? (
        <div>
          <img
            data-testid="recipe-photo"
            src={ detail?.strMealThumb }
            alt="meal img"
          />
          <h1 data-testid="recipe-title">{detail?.strMeal}</h1>
          <h2 data-testid="recipe-category">{detail?.strCategory}</h2>
          <ul>
            {ONE_TO_TWENTY.map((number, index) => {
              if (detail[`strIngredient${number}`]?.length > 0) {
                return (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {detail[`strIngredient${number}`]}
                    {' '}
                    {detail[`strMeasure${number}`]}
                  </li>
                );
              }
              return false;
            })}
          </ul>
          <p data-testid="instructions">{detail?.strInstructions}</p>
          <iframe
            title="Food Video"
            width="420"
            height="315"
            data-testid="video"
            src={ video }
          />
        </div>
      ) : (
        <div>
          <img
            data-testid="recipe-photo"
            src={ detail?.strDrinkThumb }
            alt="drink img"
          />
          <h1 data-testid="recipe-title">{detail?.strDrink}</h1>
          <h2 data-testid="recipe-category">{detail?.strCategory}</h2>
          {/* <ul data-testid="${index}-ingredient-name-and-measure">
               <li></li>
             </ul>
            <p data-testid="instructions"></p> */}
        </div>
      )}
      <Footer />
    </>
  );
}

export default RecipeDetails;
