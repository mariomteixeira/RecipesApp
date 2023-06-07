const HandleSearchClick = async (executeSearch, history) => {
  const results = await executeSearch();
  const currentPath = history.location.pathname;
  if (!results) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  if (results?.length === 1) {
    if (currentPath.includes('/meals')) {
      history.push(`/meals/${results[0].idMeal}`);
    }
    if (currentPath.includes('/drinks')) {
      history.push(`/drinks/${results[0].idDrink}`);
    }
  }
};

export default HandleSearchClick;
