import { useStripe } from "@stripe/react-stripe-js";
import { protectedApi } from "../../../api/axiosClient";
import { FC } from "react";

interface PaymentBtnProps {
  plan: string;
  text: string
}
const PaymentBtn: FC<PaymentBtnProps> = ({ plan, text }) => {
  const stripe = useStripe();

  const handleCheckout = async () => {
    try {
      const response = await protectedApi.post("/payments/create-checkout-session/", {
        plan,
      });
      const sessionId = response.data.sessionId;

      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return <button onClick={handleCheckout}>{text}</button>;
};

export default PaymentBtn;
