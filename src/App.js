import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Drinks from './Pages/Drinks';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';
import ReceitasFeitas from './Pages/ReceitasFeitas';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ ReceitasFeitas } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        {/* <Route exact path="/meals/:id-da-receita/in-progress" component={ MealsDetails } />
        <Route exact path="/drinks/:id-da-receita/in-progress" component={ Login } />
        <Route exact path="/done-recipes" component={ Login } />
        <Route exact path="/favorite-recipes" component={ Login } /> */}
      </Switch>
    </Provider>
  );
}

export default App;
