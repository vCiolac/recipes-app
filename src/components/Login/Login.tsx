import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

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

  return (
    <form>
      <label htmlFor="email">
        <input
          onChange={ handleEmailChange }
          data-testid="email-input"
          type="text"
          name="email"
          id="email"
          value={ email }
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
