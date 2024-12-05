import { FC, useState } from "react";
import "./../../assets/css/Auth/auth.css";
import Benefits from "./components/Benefits";
import RegisterForm from "./components/RegisterForm";

interface RegisterScreenProps {
  darkBg?: boolean;
}

const RegisterScreen: FC<RegisterScreenProps> = ({ darkBg }) => {
  const [isTrainer, setIsTrainer] = useState(true);

  return (
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
  );
};

export default RegisterScreen;
