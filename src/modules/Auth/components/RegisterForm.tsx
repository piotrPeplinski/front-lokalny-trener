import { FC } from "react";
import { AvatarIcon } from "../../../assets/icons/icons";

interface RegisterFormProps {
  isTrainer: boolean;
}

const RegisterForm: FC<RegisterFormProps> = ({ isTrainer }) => {
  return (
    <div className="register-container">
      <div className="benefits">
        <h3>Zarejestruj się!</h3>
      </div>

      <form action="">
        <p className="form-label">E-mail</p>
        <input className="form-input" type="email" placeholder="Podaj e-mail" />
        <p className="form-label margin-top">Hasło</p>
        <div className="register-row">
          <input
            className="form-input"
            type="password"
            placeholder="Podaj hasło"
          />
          <input
            className="form-input"
            type="password"
            placeholder="Powtórz hasło"
          />
        </div>
        <button className="btn btn-dark margin-top">
          <AvatarIcon />
          <p>Załóż konto {isTrainer ? "trenera" : "klienta"}</p>
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
