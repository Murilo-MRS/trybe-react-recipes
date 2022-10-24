import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Drinks from './Pages/Drinks';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        {/*         <Route exact path="/meals/:id-da-receita" component={ Login } />
        <Route exact path="/drinks/:id-da-receita" component={ Login } />
        <Route exact path="/meals/:id-da-receita/in-progress" component={ Login } />
        <Route exact path="/drinks/:id-da-receita/in-progress" component={ Login } />
        <Route exact path="/done-recipes" component={ Login } />
        <Route exact path="/favorite-recipes" component={ Login } /> */}
      </Switch>
    </Provider>
  );
}

export default App;
