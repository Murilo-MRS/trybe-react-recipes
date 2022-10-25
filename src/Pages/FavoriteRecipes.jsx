import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';

function FavoriteRecipes() {
  const { setTitle, setShowIcon } = useContext(Context);
  useEffect(() => {
    setTitle('Favorite Recipes');
    setShowIcon(false);
  }, [setTitle, setShowIcon]);
  return (
    <div>
      <Header />
      <h1>Favorite component</h1>
    </div>
  );
}

export default FavoriteRecipes;
