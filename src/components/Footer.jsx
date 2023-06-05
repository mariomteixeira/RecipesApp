import React from 'react';
import '../styles/Footer.css';
import '../App.css';
import drink from '../images/drinkIcon.svg';
import meal from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer className="fixed-footer">
      <p data-testid="footer">Footer</p>
      <div className="footer-icons">
        <a href="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drink }
            alt="drinks"
          />
        </a>
        <a href="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ meal }
            alt="meal"
          />
        </a>
      </div>
    </footer>
  );
}
