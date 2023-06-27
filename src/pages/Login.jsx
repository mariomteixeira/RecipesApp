import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import '../styles/Login.css';

export default function Login() {
  const history = useHistory();
  const {
    email,
    setEmail,
    passwordLength,
    setPasswordLength,
  } = useContext(RecipesContext);
  const enableBtn = () => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return emailRegex.test(email) && passwordLength > Number('6');
  };
  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };
  return (
    <div className="login">
      <h1>App de Receitas</h1>
      <label htmlFor="">
        <input
          data-testid="email-input"
          placeholder="Username"
          type="text"
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>
      <label htmlFor="">
        <input
          data-testid="password-input"
          id=""
          name=""
          onChange={ ((event) => setPasswordLength(event.target.value.length)) }
          placeholder="Password"
          type="password"
        />
      </label>
      <button
        className="login-btn"
        data-testid="login-submit-btn"
        disabled={ !enableBtn() }
        onClick={ () => handleClick() }
        type="button"
      >
        Enter
      </button>
    </div>
  );
}
