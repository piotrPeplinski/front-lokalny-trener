import { FC } from "react";
import logo from "./../../assets/img/logo.png";

const LoginScreen: FC<{}> = () => {
  return (
    <section>
      <div className="row">
        <div className="center-wrapper">
          <div className="login-container dark-bg">
            <form>
              <img src={logo} alt="Logo" />
              <p className="form-label">E-mail</p>
              <input
                className="form-input"
                type="email"
                placeholder="Podaj e-mail"
              />
              <p className="form-label">Hasło</p>
              <input
                className="form-input"
                type="password"
                placeholder="Podaj hasło"
              />
              <div className="center-wrapper">
                <button className="btn btn-light">Zaloguj się</button>
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
