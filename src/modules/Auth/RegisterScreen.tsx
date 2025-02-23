import { FC, useState } from "react";
import "./../../assets/css/Auth/auth.css";
import Benefits from "./components/Benefits";
import RegisterForm from "./components/RegisterForm";
import { Helmet } from "react-helmet";

interface RegisterScreenProps {
  darkBg?: boolean;
}

const RegisterScreen: FC<RegisterScreenProps> = ({ darkBg }) => {
  const [isTrainer, setIsTrainer] = useState(true);

  return (
    <>
      <Helmet>
        <title>Lokalny Trener - Zarejestruj Się</title>
        <meta
          name="description"
          content="Zarejestruj się na Lokalny Trener, aby znaleźć lub oferować pomoc w dziedzinach takich jak fitness, języki obce, korepetycje, programowanie i wiele więcej."
        />
        <meta
          name="keywords"
          content="rejestracja, załóż konto, lokalni eksperci, fitness, języki obce, korepetycje, programowanie"
        />
        <meta property="og:title" content="Lokalny Trener - Zarejestruj Się" />
        <meta
          property="og:description"
          content="Zarejestruj się na Lokalny Trener, aby znaleźć lub oferować pomoc w dziedzinach takich jak fitness, języki obce, korepetycje, programowanie i wiele więcej."
        />
        <meta property="og:url" content={`${process.env.REACT_APP_FRONTEND_URL}/register`} />
      </Helmet>
      <section className={darkBg ? "dark-bg" : ""}>
        <div className="row">
          <div className="auth-row">
            <div className="auth-col">
              <p
                className={`btn ${isTrainer ? "btn-dark" : "btn-light"}`}
                onClick={() => setIsTrainer(true)}
              >
                Jestem trenerem
              </p>
            </div>
            <div className="auth-col">
              <p
                className={`btn ${isTrainer ? "btn-light" : "btn-dark"}`}
                onClick={() => setIsTrainer(false)}
              >
                Szukam trenera
              </p>
            </div>
          </div>
          <div className="auth-row">
            <div className="auth-col">
              <RegisterForm isTrainer={isTrainer} />
            </div>
            <div className="auth-col">
              <Benefits isTrainer={isTrainer} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterScreen;
