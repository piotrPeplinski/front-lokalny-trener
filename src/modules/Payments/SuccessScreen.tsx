import { FC } from "react";
import { CheckIcon } from "../../assets/icons/icons";

const SuccessScreen: FC<{}> = () => {
  return (
    <section>
      <div className="payment-end-container">
        <div className="success-icon">
          <CheckIcon />
        </div>
        <h1>Płatność zakończona sukcesem!</h1>
        <h3>Dziękujemy za korzystanie z naszej platformy!</h3>
        <p>Teraz po uzupełnieniu swojego profilu, możesz dodawać ogłoszenia.</p>
      </div>
    </section>
  );
};

export default SuccessScreen;
