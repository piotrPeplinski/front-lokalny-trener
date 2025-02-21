import { FC, useEffect } from "react";
import { CheckIcon } from "../../assets/icons/icons";
import { useAuthContext } from "../Auth/context/auth-context";

const SuccessScreen: FC<{}> = () => {
  const { user, setUser } = useAuthContext();
  useEffect(() => {
    setUser({
      ...user,
      is_subscribed: true,
    });
  }, []);
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
