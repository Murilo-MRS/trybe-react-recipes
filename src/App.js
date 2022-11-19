import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import DoneRecipes from './Pages/DoneRecipes';
import Drinks from './Pages/Drinks';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
