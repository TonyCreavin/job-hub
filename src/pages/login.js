import Link from 'next/link';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <br />
        <h1>Connexion</h1>
        <form action="">
          <input
            placeholder="email"
            className="form form-control"
            type="email"
          />{' '}
          <br />
          <input
            placeholder="mot de passe"
            className="form form-control"
            type="password"
          />
          <br />
          <b></b>
          <button className="btn btn-primary" type="submit">
            envoyer
          </button>
        </form>
        <br />
        <Link href="/register" style={{ textDecoration: 'none' }}>
          {' '}
          <small>pas de compte, creer un compte</small>
        </Link>
      </div>
    </div>
  );
};

export default Login;
