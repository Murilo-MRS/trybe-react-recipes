import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../components/Header';
import MealCarousel from '../components/MealCarousel';
import { getStorage } from '../helpers/Storage';
import { fetchDrinksDetails, fetchFoodsDetails } from '../services/Api';
import '../styles/RecipeDetails.css';

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
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
];

function RecipeDetails() {
  const { id } = useParams();
  const {
    location: { pathname },
  } = useHistory();
  const [detail, setDetails] = useState({});
  const [video, setVideo] = useState({});
  const [img, setImg] = useState({});
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [notDoneRecipe, setNotDoneRecipe] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const food = pathname.includes('meals');
  const drink = pathname.includes('drinks');

  useEffect(() => {
    const doneRecipes = getStorage('doneRecipes');
    const initiatedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    // const initiatedRecipes = getStorage('inProgressRecipes');
    if (doneRecipes.some((recipe) => recipe.id === id)) setNotDoneRecipe(false);
    if (Object.keys(initiatedRecipes[pathname] || {})
      .some((recipeId) => +recipeId === +id)) setContinueRecipe(true);
  }, [id, pathname]);

  useEffect(() => {
    (async () => {
      if (drink) {
        setCategory(detail?.strAlcoholic);
        setTitle(detail?.strDrink);
        setImg(detail?.strDrinkThumb);
        setVideo(detail?.strVideo?.replace('watch?v=', 'embed/'));
        const drinkDetails = await fetchDrinksDetails(id);
        setDetails(drinkDetails);
      }
      if (food) {
        setCategory(detail?.strCategory);
        setTitle(detail?.strMeal);
        setImg(detail?.strMealThumb);
        setVideo(detail?.strYoutube?.replace('watch?v=', 'embed/'));
        const foodDetails = await fetchFoodsDetails(id);
        setDetails(foodDetails);
      }
    })();
  }, [
    id,
    drink,
    food,
    detail?.strYoutube,
    detail?.strVideo,
    detail?.strDrinkThumb,
    detail?.strMealThumb,
    detail?.strMeal,
    detail?.strDrink,
    detail?.strCategory,
    detail?.strAlcoholic,
  ]);
  return (
    <>
      <Header />
      <div>
        <img data-testid="recipe-photo" src={ img } alt="meal img" />
        <h1 data-testid="recipe-title">{title}</h1>
        <h2 data-testid="recipe-category">{category}</h2>
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
        {
          video && (
            <iframe
              title="Food Video"
              width="420"
              height="315"
              data-testid="video"
              src={ video }
            />
          )
        }
      </div>
      <MealCarousel />
      {
        notDoneRecipe && (
          <button
            className="initiate-recipe-butt"
            type="button"
            data-testid="start-recipe-btn"
          >
            {
              continueRecipe
                ? 'Start Recipe'
                : 'Continue Recipe'
            }
          </button>
        )
      }
    </>
  );
}

export default RecipeDetails;
