export const fetchFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};

export const fetchFoodsByIngredient = async (Ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchFoodsByName = async (Name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`);
  const { meals } = await response.json();
  return meals;
};

// so aceita fetch informando uma letra somente, se nao retorna ERRO~
export const fetchFoodsByFirstLetter = async (firstLetter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinksByIngredient = async (Ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchDrinksDetails = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks[0];
};

export const fetchDrinksByName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const { drinks } = await response.json();
  return drinks;
};

// so aceita fetch informando uma letra somente, se nao retorna ERRO~
export const fetchDrinksByFirstLetter = async (letra) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`);
  const { drinks } = await response.json();
  return drinks;
};
// Req 21
export const filterFoodsByCategory = async (Beef) => {
  if (Beef !== 'All') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Beef}`);
    const { meals } = await response.json();
    return meals;
  }
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};

export const filterDrinksByCategory = async (Cocktail) => {
  if (Cocktail !== 'All') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${Cocktail}`);
    const { drinks } = await response.json();
    return drinks;
  }
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};
