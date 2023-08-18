function Login() {
  return (
    <form>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          type="text"
          name="email"
          id="email"
        />
      </label>
      <label htmlFor="password">
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
        />
      </label>
      <button data-testid="login-submit-btn" type="submit">Entrar</button>
    </form>
  );
}

export default Login;
