import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import { setStorage } from '../helpers/Storage';
import shareIcon from '../images/shareIcon.svg';
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
  const [copied, setCopy] = useState(false);
  const [routeToCopy, setRouteToCopy] = useState('');
  const [usedIngredients, setUsedIngredients] = useState([]);
  const food = pathname.includes('meals');
  const drink = pathname.includes('drinks');
  const [disabledBtn, setDisable] = useState(true);

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
    (async () => {
      if (drink) {
        setCategory(detail?.strAlcoholic);
        setTitle(detail?.strDrink);
        setImg(detail?.strDrinkThumb);
        setVideo(detail?.strVideo?.replace('watch?v=', 'embed/'));
        const drinkDetails = await fetchDrinksDetails(id);
        setDetails(drinkDetails);
        setRouteToCopy('drinks');
        console.log(routeToCopy);
      }
      if (food) {
        setCategory(detail?.strCategory);
        setTitle(detail?.strMeal);
        setImg(detail?.strMealThumb);
        setVideo(detail?.strYoutube?.replace('watch?v=', 'embed/'));
        const foodDetails = await fetchFoodsDetails(id);
        setDetails(foodDetails);
        setRouteToCopy('meals');
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
    routeToCopy,
  ]);

  // useEffect(() => {
  //   // const getInProgressRecipes = JSON.parse(localStorage
  //   //   .getItem('inProgressRecipes')) || { ...[id] };
  //   // if (food && getInProgressRecipes.meals[id]) {
  //   // const getInProgressRecipes = JSON.parse(localStorage
  //   //   .getItem('inProgressRecipes')) || { drinks: { [id]: [] }, meals: { [id]: [] } };
  //   if (food) {
  //     const getInProgressRecipes = JSON.parse(localStorage
  //       .getItem('inProgressRecipes')) || { meals: { [id]: [] } };
  //     const toGetInProgressRecipes = {
  //       meals: { ...getInProgressRecipes.meals, [id]: [] } };
  //     setUsedIngredients(toGetInProgressRecipes.meals[id]);
  //   }
  //   // if (drink && (getInProgressRecipes.drinks[id])) {
  //   if (drink) {
  //     const getInProgressRecipes = JSON.parse(localStorage
  //       .getItem('inProgressRecipes')) || { drinks: { [id]: [] } };
  //     setUsedIngredients(getInProgressRecipes.drinks[id]);
  //   }
  // }, [id, drink, food]);

  //   {
  //     drinks: {
  //         id-da-bebida: [''],
  //         ...
  //     },
  //     meals: {
  //         id-da-comida: [lista-de-ingredientes-utilizados],
  //         ...
  //     }
  // }

  useEffect(() => {
    if (food) {
      const getInProgressRecipes = JSON.parse(localStorage
        .getItem('inProgressRecipes'));
      const toSaveInProgressRecipes = { ...getInProgressRecipes,
        meals: { ...getInProgressRecipes.meals,
          [id]: [...getInProgressRecipes.meals[id], ...usedIngredients] },
      };
      setStorage('inProgressRecipes', toSaveInProgressRecipes);
    }
    if (drink) {
      const getInProgressRecipes = JSON.parse(localStorage
        .getItem('inProgressRecipes'));
      const toSaveInProgressRecipes = { ...getInProgressRecipes,
        drinks: { [id]: [...getInProgressRecipes.drinks[id], ...usedIngredients] } };
      setStorage('inProgressRecipes', toSaveInProgressRecipes);
    }
  }, [usedIngredients, drink, food, id]);

  useEffect(() => {
    if (usedIngredients?.length === ingredients?.length) setDisable(false);
    else setDisable(true);
  }, [ingredients, usedIngredients]);

  const handleShareButt = (ids, type) => {
    const urlMealorDrink = `http://localhost:3000/${type}/${ids}`;
    setCopy(true);
    copy(urlMealorDrink);
  };

  const changeClassName = (target) => {
    if (target.checked === true) {
      target.parentElement.className = 'checked';
      const newUsedIngredient = target.parentElement.innerText;
      setUsedIngredients([...usedIngredients, newUsedIngredient]);
    } else {
      target.parentElement.className = '';
      const newUnusedIngredient = target.parentElement.innerText;
      const editUsedIngredients = [...usedIngredients]
        .filter((ingredient) => !(ingredient.includes(newUnusedIngredient)));
      setUsedIngredients(editUsedIngredients);
    }
  };

  return (
    <>
      <Header />
      <div>
        <img data-testid="recipe-photo" src={ img } alt="meal img" />
        <h1 data-testid="recipe-title">{title}</h1>
        <h2 data-testid="recipe-category">{category}</h2>
        <div>
          {
            ingredients.map((ingredient, index) => (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ ingredient }
              >
                {ingredient}
                {' '}
                {measures[index]}
                <input
                  type="checkbox"
                  name={ ingredient }
                  onClick={
                    ({ target }) => changeClassName(target)
                  }
                />
              </label>
            ))
          }
        </div>
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
      <div>
        <button
          src={ shareIcon }
          type="button"
          data-testid="share-btn"
          onClick={ handleShareButt }
        >
          <img src={ shareIcon } alt="Icone de compartilhar" />
        </button>
        <FavoriteButton />
        {copied && <p>Link copied!</p>}
      </div>
      <button
        className="initiate-recipe-butt"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabledBtn }
        onClick={ () => history.push(`${pathname}/in-progress`) }
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeDetails;
