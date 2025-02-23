import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import { useAuthContext } from "./context/auth-context";
import { Helmet } from "react-helmet";

const LoginScreen: FC<{}> = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // Attempt login
      navigate("/");
    } catch (errorMessage) {
      alert(errorMessage);
    }
  };

  return (
    <>
      <Helmet>
        <title>Lokalny Trener - Zaloguj Się</title>
        <meta
          name="description"
          content="Zaloguj się na Lokalny Trener, aby zarządzać swoim kontem, przeglądać ogłoszenia i łączyć się z ekspertami."
        />
        <meta
          name="keywords"
          content="logowanie, zaloguj się, lokalni eksperci, fitness, języki obce, korepetycje, programowanie"
        />
        <meta property="og:title" content="Lokalny Trener - Zaloguj Się" />
        <meta
          property="og:description"
          content="Zaloguj się na Lokalny Trener, aby zarządzać swoim kontem, przeglądać ogłoszenia i łączyć się z ekspertami."
        />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_FRONTEND_URL}/login`}
        />
      </Helmet>
      <section>
        <div className="row">
          <div className="center-wrapper">
            <div className="login-container dark-bg">
              <form onSubmit={handleSubmit}>
                <img src={logo} alt="Logo" />
                <p className="form-label">E-mail</p>
                <input
                  required
                  className="form-input"
                  type="email"
                  placeholder="Podaj e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="form-label">Hasło</p>
                <input
                  required
                  className="form-input"
                  type="password"
                  placeholder="Podaj hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="center-wrapper">
                  <button className="btn btn-light" type="submit">
                    Zaloguj się
                  </button>
                  <Link
                    to={"/request-password-reset"}
                    className="forgot-password"
                  >
                    Zapomniałem hasła
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginScreen;
