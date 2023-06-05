import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../App.css';

export default function Login() {
  const {
    username,
    setUsername,
    password,
    setPassword,
  } = useContext(RecipesContext);
  const enableBtn = () => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRegex = /^.{6,}$/;
    return emailRegex.test(username) && passwordRegex.test(password);
  };
  return (
    <div>
      <label htmlFor="">
        <input
          data-testid="email-input"
          placeholder="Username"
          type="text"
          onChange={ (({ target }) => setUsername(target.value)) }
        />
      </label>
      <label htmlFor="">
        <input
          data-testid="password-input"
          id=""
          name=""
          onChange={ ((event) => setPassword(event.target.value)) }
          placeholder="Password"
          type="password"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !enableBtn() }
      >
        Enter
      </button>
    </div>
  );
}
