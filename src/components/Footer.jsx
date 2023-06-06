import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import '../App.css';
import drink from '../images/drinkIcon.svg';
import meal from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" className="fixed-footer">
      <div className="footer-icons">
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drink }
            alt="drinks"
          />
        </Link>
        <p>Drinks</p>
      </div>
      <div className="footer-icons">
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ meal }
            alt="meal"
          />
        </Link>
        <p>Meals</p>
      </div>
    </footer>
  );
}
