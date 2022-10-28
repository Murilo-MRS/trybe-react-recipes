import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Context from '../context/Context';

function Recipes() {
  const { drinksCategoryList, mealsCategoryList,
    handleClickMealCategory, handleClickDrinkCategory,
    setFoods, setDrinks, foodsAPI, drinksAPI } = useContext(Context);
  const history = useHistory();
  const { location: { pathname } } = history;
  const foodPath = pathname.includes('/meals');
  const MAX = 5;
  const categoryList = foodPath ? mealsCategoryList : drinksCategoryList;
  // const removeCategoryFilter = foodPath ? setFoods(foodsAPI) : setDrinks(drinksAPI);
  const categorySelectedList = foodPath
    ? handleClickMealCategory : handleClickDrinkCategory;
  // const drinkPath = pathname.includes('/drinks');

  const removeAll = () => (foodPath ? setFoods(foodsAPI) : setDrinks(drinksAPI));
  return (
    <section>
      <ButtonGroup>
        {
          categoryList?.slice(0, MAX).map((e, index) => (
            <Button
              variant="primary"
              key={ index }
              value={ e.strCategory }
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ categorySelectedList }
            >
              {e.strCategory}
            </Button>
          ))
        }
        <Button
          variant="primary"
          data-testid="All-category-filter"
          onClick={ removeAll }
        >
          All
        </Button>
      </ButtonGroup>
    </section>
  );
}

export default Recipes;
