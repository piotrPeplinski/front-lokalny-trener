import { FC } from "react";
import { CloseIcon } from "../../assets/icons/icons";

const FailScreen: FC<{}> = () => {
  return (
    <section>
      <div className="payment-end-container">
        <div className="success-icon fail">
          <CloseIcon />
        </div>
        <h1>Płatność nie powiodła się.</h1>
        <h3>Spróbuj ponownie!</h3>
      </div>
    </section>
  );
};

export default FailScreen;
