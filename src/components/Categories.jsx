import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../styles/Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const { setRecipes } = useContext(RecipesContext);
  const { setSearchResults } = useContext(RecipesContext);

  const mealsAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const maxCategories = 5;
  const maxRecipes = 12;

  const loadAllRecipes = async () => {
    const response = await fetch(
      pathname.includes('meals')
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    const data = await response.json();
    const recipesList = pathname.includes('meals') ? data.meals : data.drinks;
    setSearchResults(recipesList);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(pathname.includes('meals') ? mealsAPI : drinksAPI);
      const { drinks, meals } = await response.json();
      let categoriesList = pathname.includes('meals') ? meals : drinks;
      if (categoriesList.length > maxCategories) {
        categoriesList = categoriesList.slice(0, maxCategories);
      }
      setCategories(categoriesList);
    };
    fetchCategories();
  }, [pathname]);

  useEffect(() => {
    loadAllRecipes();
  }, [pathname]);

  const handleAllRecipes = () => {
    loadAllRecipes();
    setSelectedCategory('');
  };

  const handleCategoryChange = async ({ target }) => {
    if (target.value === selectedCategory) {
      handleAllRecipes();
      return;
    }
    setSelectedCategory(target.value);
    setRecipes([]);
    const response = await fetch(
      pathname.includes('meals')
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`,
    );
    const data = await response.json();
    let recipesList = data.drinks || data.meals || [];
    if (recipesList.length > maxRecipes) {
      recipesList = recipesList.slice(0, maxRecipes);
    }
    setSearchResults(recipesList);
  };

  return (
    <div className="categories">
      <button
        type="button"
        value="all"
        data-testid="All-category-filter"
        onClick={ handleAllRecipes }
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
          className={ selectedCategory === category.strCategory ? 'selected' : '' }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default Categories;
