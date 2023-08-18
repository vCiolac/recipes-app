import { useState } from 'react';
import useLocalStorage from '../../Hooks/useLocalStorage';

function Login() {
  const [emails, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [userEmail, setUserEmail] = useLocalStorage('user', {});

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

    setPassword(passwordValue);
    setIsValidPassword(isValid);
  };

  const handleSubmit = () => {
    setUserEmail({ email: emails });
  };

  return (
    <form>
      <label htmlFor="email">
        <input
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
        Entrar

      </button>
    </form>
  );
}

export default Login;
