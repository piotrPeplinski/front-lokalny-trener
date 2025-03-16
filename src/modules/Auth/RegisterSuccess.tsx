import { FC } from "react";
import { CheckIcon } from "../../assets/icons/icons";

const RegisterSuccess: FC<{}> = () => {
  return (
    <section>
      <div className="payment-end-container">
        <div className="success-icon">
          <CheckIcon />
        </div>
        <h1>Konto zostało utworzone!</h1>
        <h3>Potwierdź swój e-mail, aby się zalogować.</h3>
      </div>
    </section>
  );
};

export default RegisterSuccess;
