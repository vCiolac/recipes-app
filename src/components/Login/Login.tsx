import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../Hooks/useLocalStorage';
import styles from './Login.module.css';
import loginRecipes from '../../images/loginLogoRecipesApp.png';

function Login() {
  const [emails, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const {
    localStorageValue: userEmail,
    updateValue: setUserEmail,
  } = useLocalStorage('user', {});
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(emailValue);

    setEmail(emailValue);
    setIsValidEmail(isValid);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    const isValid = passwordValue.length > 6;
    const userSave = {
      email: emails,
    };
    setPassword(passwordValue);
    setIsValidPassword(isValid);
    setUserEmail(userSave);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/meals');
  };

  return (
    <main className={ styles.mainLogin }>
      <div className={ styles.container1 }>
        <img className={ styles.recipesLogo } src={ loginRecipes } alt="Recipes App" />
      </div>
      <div className={ styles.container2 }>
        <form className={ styles.form }>
          <h1>Login</h1>
          <label htmlFor="email">
            <input
              placeholder="Email"
              onChange={ handleEmailChange }
              data-testid="email-input"
              type="text"
              name="email"
              id="email"
              value={ emails }
            />
          </label>
          <label htmlFor="password">
            <input
              placeholder="Password"
              onChange={ handlePasswordChange }
              data-testid="password-input"
              type="password"
              name="password"
              id="password"
              value={ password }
            />
          </label>
          <button
            onClick={ handleSubmit }
            disabled={ !isValidEmail || !isValidPassword }
            data-testid="login-submit-btn"
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
