import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import { useAuthContext } from "./context/auth-context";

const LoginScreen: FC<{}> = () => {
  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // Attempt login
      navigate("/");
      console.log("logged in: ", user?.id);
    } catch (error) {
      console.log(error);
      setError(`${error}`); // Show error if login fails
    }
  };

  return (
    <section>
      <div className="row">
        <div className="center-wrapper">
          <div className="login-container dark-bg">
            <form onSubmit={handleSubmit}>
              <img src={logo} alt="Logo" />
              {error && <p className="error-message">{error}</p>}
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
                <a className="forgot-password" href="#">
                  Zapomniałem hasła
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
