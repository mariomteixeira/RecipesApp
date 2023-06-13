import { Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import All from '../images/All.svg';
import drinks from '../images/drinks.svg';
import foods from '../images/foods.svg';
import '../styles/DoneRecipes.css';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [linkCopied, setLinkCopied] = useState('');
  const [data, setData] = useState([]);

  const getLocalStorage = () => {
    const dataStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    return setData(dataStorage);
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  const handleShare = (type, id) => {
    if (type === 'meal') {
      const link = `http://localhost:3000/meals/${id}`;
      copy(link);
    } else {
      const link = `http://localhost:3000/drinks/${id}`;
      copy(link);
    }
    setLinkCopied('Link copied!');
  };
  const handleFilterClick = ({ target }) => {
    if (target.id === 'meal') {
      const dataStorage = data.filter((i) => i.type === 'meal');
      return setData(dataStorage);
    }
    if (target.id === 'drink') {
      const dataStorage = data.filter((i) => i.type === 'drink');
      return setData(dataStorage);
    }
    return getLocalStorage();
  };

  return (
    <div className="done-container">
      <Header />
      {linkCopied}
      <div className="btn-head">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ (event) => handleFilterClick(event) }
        >
          <Image src={ All } id="all" alt="All" fluid />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ (event) => handleFilterClick(event) }
        >
          <Image src={ foods } id="meal" alt="Foods" fluid />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleFilterClick(event) }
        >
          <Image src={ drinks } id="drink" alt="Drinks" fluid />
        </button>
      </div>
      {data?.map((i, index) => (i.type === 'meal'
        ? (
          <div key={ i.id }>
            <Link to={ `/meals/${i.id}` }>
              <img
                src={ `${i.image}` }
                data-testid={ `${index}-horizontal-image` }
                alt="img"
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{`${i.name}`}</h2>
            </Link>
            <h2
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${i.nationality} - ${i.category}`}
            </h2>
            <text data-testid={ `${index}-horizontal-done-date` }>{`${i.doneDate}`}</text>
            <h2
              data-testid={ `${index}-${i.tags[0]}-horizontal-tag` }
            >
              {`${i.tags[0]}`}
            </h2>
            {
              i.tags[1]
            && (
              <h2
                data-testid={ `${index}-${i.tags[1]}-horizontal-tag` }
              >
                {`${i.tags[1]}`}

              </h2>
            )
            }
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => handleShare(i.type, i.id) }
            >
              <img src={ shareIcon } alt="Botão de compartilhar receita" />
            </button>
          </div>
        )
        : (
          <div key={ i.id }>
            <Link to={ `/drinks/${i.id}` }>
              <img
                src={ `${i.image}` }
                data-testid={ `${index}-horizontal-image` }
                alt="img"
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{`${i.name}`}</h2>
            </Link>
            <h2
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${i.alcoholicOrNot}`}
            </h2>
            <text data-testid={ `${index}-horizontal-done-date` }>{`${i.doneDate}`}</text>
            <button
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShare(i.type, i.id) }
            >
              <img src={ shareIcon } alt="Botão de compartilhar receita" />
            </button>
          </div>
        )))}
    </div>
  );
}
