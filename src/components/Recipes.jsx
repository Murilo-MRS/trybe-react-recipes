import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/Context';
import drinkicon from '../images/iconsFigma/iconsMeals/DrinkIcon.svg';
import mealicon from '../images/iconsFigma/iconsMeals/MealIcon.svg';
import '../styles/barraDeCategorias.css';

function Recipes() {
  const {
    drinksCategoryList,
    mealsCategoryList,
    handleClickMealCategory,
    handleClickDrinkCategory,
    setFoods,
    setDrinks,
    foodsAPI,
    drinksAPI,
  } = useContext(Context);
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const foodPath = pathname.includes('/meals');
  const MAX = 5;
  const categoryList = foodPath ? mealsCategoryList : drinksCategoryList;
  const imgIcon = foodPath ? mealicon : drinkicon;
  // const removeCategoryFilter = foodPath ? setFoods(foodsAPI) : setDrinks(drinksAPI);
  const categorySelectedList = foodPath
    ? handleClickMealCategory
    : handleClickDrinkCategory;
  // const drinkPath = pathname.includes('/drinks');

  const removeAll = () => (foodPath ? setFoods(foodsAPI) : setDrinks(drinksAPI));
  return (
    <section className="container-categories">
      <button
        className="button-categories"
        type="button"
        variant="primary"
        data-testid="All-category-filter"
        onClick={ removeAll }
      >
        <img src={ imgIcon } alt="mealicon" />
        All
      </button>
      {categoryList?.slice(0, MAX).map((e, index) => (
        <button
          className="button-categories"
          type="submit"
          key={ index }
          value={ e.strCategory }
          data-testid={ `${e.strCategory}-category-filter` }
          onClick={ categorySelectedList }
        >
          <img
            // eslint-disable-next-line import/no-dynamic-require, global-require
            src={ require(`../images/iconsFigma/iconsMeals/${e.strCategory}.svg`) }
            alt={ e.strCategory }
          />
          {e.strCategory}
        </button>
      ))}
    </section>
  );
}

export default Recipes;
