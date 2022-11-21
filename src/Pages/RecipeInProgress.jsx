import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { setStorage } from '../helpers/Storage';
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
        measuresTobe.push(detail[`strMeasure${index}`] || 'as you like');
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

  useEffect(() => {
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };
    if (food && !Object.keys(getInProgressRecipes.meals).includes(id)) {
      const toGetInProgressRecipes = { ...getInProgressRecipes,
        meals: { ...getInProgressRecipes.meals, [id]: [] },
      };
      setStorage('inProgressRecipes', toGetInProgressRecipes);
    }
    if (drink && !Object.keys(getInProgressRecipes.drinks).includes(id)) {
      const toGetInProgressRecipes = { ...getInProgressRecipes,
        drinks: { ...getInProgressRecipes.drinks, [id]: [] },
      };
      setStorage('inProgressRecipes', toGetInProgressRecipes);
    }
  }, [drink, food, id]);

  useEffect(() => {
    if (food) {
      const getInProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      );
      const {
        meals: { [id]: getInprogress },
      } = getInProgressRecipes;
      setUsedIngredients(getInprogress);
    }
    if (drink) {
      const getInProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      );
      const {
        drinks: { [id]: getInprogress },
      } = getInProgressRecipes;
      setUsedIngredients(getInprogress);
    }
  }, [drink, food, id]);

  useEffect(() => {
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (food) {
      const toSaveInProgressRecipes = {
        ...getInProgressRecipes,
        meals: { ...getInProgressRecipes.meals, [id]: [...usedIngredients] },
      };
      setStorage('inProgressRecipes', toSaveInProgressRecipes);
    }
    if (drink) {
      const toSaveInProgressRecipes = {
        ...getInProgressRecipes,
        drinks: { ...getInProgressRecipes.drinks, [id]: [...usedIngredients] },
      };
      setStorage('inProgressRecipes', toSaveInProgressRecipes);
    }
  }, [usedIngredients, drink, food, id]);

  useEffect(() => {
    if (usedIngredients?.length === ingredients?.length) setDisable(false);
    else setDisable(true);
  }, [ingredients, usedIngredients]);

  const changeClassName = (target) => {
    if (target.checked === true) {
      target.parentElement.className = 'checked';
      const newUsedIngredient = target.parentElement.innerText;
      setUsedIngredients([...usedIngredients, newUsedIngredient]);
    } else {
      target.parentElement.className = '';
      const newUnusedIngredient = target.parentElement.innerText;
      const editUsedIngredients = usedIngredients.filter(
        (ingredient) => !ingredient.includes(newUnusedIngredient),
      );
      setUsedIngredients(editUsedIngredients);
    }
  };

  const handleFinishRecipeButt = () => {
    const date = new Date().toLocaleDateString('pt-BR');
    const tagsArray = detail?.strTags?.split(',').slice(0, 2) || [];
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const toSaveDoneRecipes = [...getDoneRecipes, {
      id,
      type: routeToCopy,
      nationality: detail.strArea,
      category: detail.strCategory,
      alcoholicOrNot: detail?.strAlcoholic || '',
      name: title,
      image: img,
      doneDate: date,
      tags: tagsArray,
    }];
    setStorage('doneRecipes', toSaveDoneRecipes);
    history.push('/done-recipes');
  };

  return (
    <>
      <div className="recipe-page">
        <div className="sobreporIMG">
          <h1 data-testid="recipe-title">{title}</h1>
          <h2 data-testid="recipe-category">{category}</h2>
          <div className="containerBtnFavorite">
            <ShareButton />
            <FavoriteButton />
          </div>
        </div>
        <img
          className="img-recipe"
          data-testid="recipe-photo"
          src={ img }
          alt="meal img"
        />
        <div className=" mealInformation">
          {
            ingredients.map((ingredient, index) => {
              const checkOrnot = (usedIngredients
                .some((oldIngredient) => oldIngredient
                  .includes(`${ingredient}${' '}${measures[index]}`))) ? 'ok' : 'notOK';
              return (
                <label
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ ingredient }
                  className={ (checkOrnot === 'ok') ? 'checked' : '' }
                >
                  {ingredient}
                  {' '}
                  {measures[index]}
                  <input
                    type="checkbox"
                    name={ ingredient }
                    checked={ (checkOrnot === 'ok') }
                    onChange={ ({ target }) => changeClassName(target) }
                  />
                </label>
              );
            })
          }
        </div>
        <div className="text-desciption">
          <p data-testid="instructions">{detail?.strInstructions}</p>
        </div>
        {video && (
          <iframe
            title="Food Video"
            width="100%"
            height="300px"
            data-testid="video"
            src={ video }
          />
        )}
      </div>
      <button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabledBtn }
        onClick={ handleFinishRecipeButt }
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeDetails;
