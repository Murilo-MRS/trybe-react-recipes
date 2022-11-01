import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../components/Header';
import MealCarousel from '../components/MealCarousel';
import { getStorage, setStorage } from '../helpers/Storage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchDrinksDetails, fetchFoodsDetails } from '../services/Api';
import '../styles/RecipeDetails.css';

const INGREDIENTS_MAX_NUM = 20;

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [detail, setDetails] = useState({});
  const [video, setVideo] = useState({});
  const [img, setImg] = useState({});
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [notDoneRecipe, setNotDoneRecipe] = useState(true);
  // const [continueRecipe, setContinueRecipe] = useState(false);
  const [copied, setCopy] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const food = pathname.includes('meals');
  const drink = pathname.includes('drinks');
  // const copy = require('clipboard-copy');

  useEffect(() => {
    const ingredientsTobe = [];
    const measuresTobe = [];
    for (let index = 1; index <= INGREDIENTS_MAX_NUM; index += 1) {
      if (detail[`strIngredient${index}`]?.length > 0) {
        ingredientsTobe.push(detail[`strIngredient${index}`]);
        measuresTobe.push(detail[`strMeasure${index}`]);
      }
    }
    setIngredients(ingredientsTobe);
    setMeasures(measuresTobe);
  }, [detail]);

  useEffect(() => {
    const doneRecipes = getStorage('doneRecipes');
    // const initiatedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    // const initiatedRecipes = getStorage('inProgressRecipes');
    if (doneRecipes.some((recipe) => recipe.id === id)) setNotDoneRecipe(false);
    // if (Object.keys(initiatedRecipes[pathname] || {})
    //   .some((recipeId) => +recipeId === +id)) setContinueRecipe(true);
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
    detail,
  ]);

  useEffect(() => {
    const favoriteGet = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (food && favoriteGet
      .some((recipe) => recipe?.id === detail.idMeal)) setFavorited(false);
    if (drink && favoriteGet
      .some((recipe) => recipe?.id === detail.idDrink)) setFavorited(false);
  }, [detail, drink, food]);

  const favoriteRecipesStorage = (recipe, typeFood) => {
    if (typeFood === 'meal') {
      const mealFavorite = {
        id: recipe.idMeal,
        type: typeFood,
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      const favoriteGet = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const toSaveFavorite = [...favoriteGet, mealFavorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(toSaveFavorite));
    } else {
      const drinkFavorite = {
        id: recipe.idDrink,
        type: typeFood,
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      const favoriteGet = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const toSaveFavorite = [...favoriteGet, drinkFavorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(toSaveFavorite));
    }
  };

  const handleFavoriteButt = () => {
    if (drink) {
      const favoriteGet = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (favoriteGet.some((recipe) => recipe?.id === detail.idDrink)) {
        setFavorited(false);
        const filtered = favoriteGet.filter((recipe) => recipe.id !== detail.idDrink);
        setStorage('favoriteRecipes', filtered);
      } else {
        setFavorited(true);
        favoriteRecipesStorage(detail, 'drink');
      }
    }
    if (food) {
      const favoriteGet = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (favoriteGet.some((recipe) => recipe?.id === detail.idMeal)) {
        setFavorited(false);
        const filtered = favoriteGet.filter((recipe) => recipe.id !== detail.idMeal);
        setStorage('favoriteRecipes', filtered);
      } else {
        setFavorited(true);
        favoriteRecipesStorage(detail, 'meal');
      }
    }
  };

  const handleShareButt = () => {
    const urlMealorDrink = `http://localhost:3000${pathname}`;
    setCopy(true);
    copy(urlMealorDrink);
  };

  return (
    <>
      <Header />
      <div className="recipe-page">
        <img
          className="img-recipe"
          data-testid="recipe-photo"
          src={ img }
          alt="meal img"
        />
        <h1 data-testid="recipe-title">{title}</h1>
        <h2 data-testid="recipe-category">{category}</h2>
        <ul>
          {
            ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
                {' '}
                {measures[index]}
              </li>
            ))
          }
        </ul>
        <p data-testid="instructions">{detail?.strInstructions}</p>
        {video && (
          <iframe
            title="Food Video"
            width="420"
            height="315"
            data-testid="video"
            src={ video }
          />
        )}
      </div>
      <div>
        <button
          src={ shareIcon }
          type="button"
          data-testid="share-btn"
          onClick={ handleShareButt }
        >
          <img src={ shareIcon } alt="Icone de compartilhar" />
        </button>
        <button
          src={ whiteHeartIcon }
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavoriteButt }
        >
          <img
            className="share-heart"
            src={ favorited ? whiteHeartIcon : blackHeartIcon }
            alt="Icone de Favoritar"
          />
        </button>
        {copied && <p>Link copied!</p>}
      </div>
      <MealCarousel />
      {notDoneRecipe && (
        <button
          className="initiate-recipe-butt"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          {/*             {
              continueRecipe
                ? 'Continue Recipe'
                : 'Start Recipe'
            } */}
          Start Recipe
        </button>
      )}
    </>
  );
}

export default RecipeDetails;
