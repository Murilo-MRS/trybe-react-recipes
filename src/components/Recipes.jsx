import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/Context';
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
  // const removeCategoryFilter = foodPath ? setFoods(foodsAPI) : setDrinks(drinksAPI);
  const categorySelectedList = foodPath
    ? handleClickMealCategory
    : handleClickDrinkCategory;
  // const drinkPath = pathname.includes('/drinks');

  const removeAll = () => (foodPath ? setFoods(foodsAPI) : setDrinks(drinksAPI));
  return (
    <section className="container-categories">
      {categoryList?.slice(0, MAX).map((e, index) => (
        <button
          style={ {
            backgroundImage: `../images/iconsFigma/iconsMeals/${e.strCategory}.png`,
          } }
          className="button-categories"
          type="button"
          variant="primary"
          key={ index }
          value={ e.strCategory }
          data-testid={ `${e.strCategory}-category-filter` }
          onClick={ categorySelectedList }
        >
          {e.strCategory}
        </button>
      ))}
      <button
        className="button-categories"
        type="button"
        variant="primary"
        data-testid="All-category-filter"
        onClick={ removeAll }
      >
        All
      </button>
    </section>
  );
}

export default Recipes;
