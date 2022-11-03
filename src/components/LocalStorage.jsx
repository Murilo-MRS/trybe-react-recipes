/* const doneRecipesStorage = (recipe, type, date) => {
    emptyFunction = (variavel) => {
        if (variavel === null) {
        return "";
        }
        else return variavel;
    }
    if (type === "meals"){
    const mealFavorite = {
    id: recipe.id,
    type: type,
    nationality: emptyFunction(recipe.strArea),
    category: emptyFunction(recipe.strCategory),
    alcoholicOrNot: emptyFunction(recipe.alcoholicOrNot),
    name: recipe.strMeal,
    image: recipe.strMealThumb
  }
    localStorage.setItem('favoriteRecipes', JSON.stringify(mealFavorite));
}
  else {
    const drinkFavorite = {
        id: recipe.id,
        type: type,
        nationality: "",
        category: emptyFunction(recipe.strCategory),
        alcoholicOrNot: emptyFunction(recipe.alcoholicOrNot),
        name: recipe.strDrink,
        image: recipe.strDrinkThumb
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(drinkFavorite));
  }
}

const recoveryFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

const favoriteRecipesStorage = {
    id: details.id,
    type: pathname,
    nationality: details.strArea,
    category: strCategory,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: strMeal,
    image: strMealThumb
}

const LocalSave = (variable) => {
    if (variable === drink) {
        doneRecipesStorage(detail, drink, date)
    }
    if (variable === food) {
        doneRecipesStorage(detail, food, date)
    }
}
<div>
<button
src={ shareIcon }
type="button"
data-testid="share-btn">
    <img src={ shareIcon } alt="Icone de compartilhar" />
</button>

<button
src={ whiteHeartIcon }
type="button"
data-testid="favorite-btn">
<img src={ whiteHeartIcon } alt="Icone de Favoritar" />
onClick={ LocalSave }
</button>
</div>

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
 */
