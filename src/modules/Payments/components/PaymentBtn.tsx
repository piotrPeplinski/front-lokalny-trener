import { useStripe } from "@stripe/react-stripe-js";
import { protectedApi } from "../../../api/axiosClient";
import { FC } from "react";
import { useAuthContext } from "../../Auth/context/auth-context";

interface PaymentBtnProps {
  plan: string;
  text: string;
  btn_light: boolean;
}
const PaymentBtn: FC<PaymentBtnProps> = ({ plan, text, btn_light }) => {
  const stripe = useStripe();
  const { isAuthenticated, user } = useAuthContext();

  const handleCheckout = async () => {
    if (!isAuthenticated || !user?.is_trainer) {
      alert("Zaloguj się jako trener, aby zakupić subskrypcję.");
      return;
    }
    try {
      const response = await protectedApi.post(
        "/payments/create-checkout-session/",
        {
          plan,
        }
      );
      const sessionId = response.data.sessionId;

      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <button
      className={`btn ${btn_light ? "btn-light" : "btn-dark"}`}
      onClick={handleCheckout}
    >
      {text}
    </button>
  );
};

export default PaymentBtn;
