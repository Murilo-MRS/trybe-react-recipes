import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDrinksDetails, fetchFoodsDetails } from '../services/Api';

const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
const f = 6;
const g = 7;
const h = 8;
const i = 9;
const j = 10;
const k = 11;
const l = 12;
const m = 13;
const n = 14;
const o = 15;
const p = 16;
const q = 17;
const r = 18;
const s = 19;
const t = 20;

const ONE_TO_TWENTY = [
  a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t,
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
