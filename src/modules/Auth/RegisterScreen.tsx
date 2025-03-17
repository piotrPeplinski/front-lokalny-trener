import { FC } from "react";
import "./../../assets/css/Auth/auth.css";
import RegisterForm from "./components/RegisterForm";
import { Helmet } from "react-helmet";

interface RegisterScreenProps {
  darkBg?: boolean;
}

const RegisterScreen: FC<RegisterScreenProps> = ({ darkBg }) => {
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
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_FRONTEND_URL}/register`}
        />
      </Helmet>
      <section className={`no-height-section ${darkBg ? "dark-bg" : ""}`}>
        <div className="row">
          <div className="center-wrapper">
            <RegisterForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterScreen;
