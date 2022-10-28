export const fetchFoods = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchFoodsByIngredient = async (Ingredient) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchFoodsByName = async (Name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error);
  }
};

// so aceita fetch informando uma letra somente, se nao retorna ERRO~
export const fetchFoodsByFirstLetter = async (firstLetter) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchFoodsDetails = async (id) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await response.json();
    return meals[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDrinksByIngredient = async (Ingredient) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDrinksDetails = async (id) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await response.json();
    return drinks[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDrinksByName = async (name) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error);
  }
};

// so aceita fetch informando uma letra somente, se nao retorna ERRO~
export const fetchDrinksByFirstLetter = async (letra) => {
/*   try { */
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`);
  const { drinks } = await response.json();
  return drinks;
/*   } catch (error) {
    throw new Error(error);
  } */
};
// Req 21
export const filterFoodsByCategory = async (Beef) => {
  try {
    if (Beef !== 'All') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Beef}`);
      const { meals } = await response.json();
      return meals;
    }
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error);
  }
};

export const filterDrinksByCategory = async (Cocktail) => {
  try {
    if (Cocktail !== 'All') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${Cocktail}`);
      const { drinks } = await response.json();
      return drinks;
    }
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDrinksCategoryList = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchMealsCategoryList = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error);
  }
};
