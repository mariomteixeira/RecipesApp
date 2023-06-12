import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Categories() {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const { setRecipes } = useContext(RecipesContext);

  const mealsAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const maxCategories = 5;
  const maxRecipes = 12;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(pathname.includes('meals') ? mealsAPI : drinksAPI);
      const { drinks, meals } = await response.json();
      let categoriesList = pathname.includes('meals') ? meals : drinks;
      if (categoriesList.length > maxCategories) {
        categoriesList = categoriesList.slice(0, maxCategories);
      }
      setCategories(categoriesList);
      console.log('categoriesList:', categoriesList);
    };
    fetchCategories();
    console.log('fetchCategories chamado');
  }, [pathname]);

  const handleCategoryChange = async ({ target }) => {
    console.log('cliquei');
    setSelectedCategory(target.value);
    setRecipes([]);
    if (target.value === 'all' || target.value === selectedCategory) {
      console.log('dando fetch em todas as receitas...');
      const response = await fetch(pathname.includes('meals') ? mealsAPI : drinksAPI);
      if (response && response.lenght > maxRecipes) {
        setRecipes(response.slice(0, maxRecipes));
      } else {
        console.log('Chamando setRecipes...');
        setRecipes(response);
      }
    } else {
      const data = await fetch(pathname.includes('meals')
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`);
      if (data && data.lenght > maxRecipes) {
        setRecipes(data.slice(0, maxRecipes));
      } else {
        setRecipes(data);
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        value="all"
        data-testid="All-category-filter"
        onClick={ handleCategoryChange }
      >
        All
      </button>
      {categories && categories.map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          value={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ handleCategoryChange }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default Categories;
