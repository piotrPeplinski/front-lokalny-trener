import { FC } from "react";
import PaymentBtn from "./components/PaymentBtn";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

const PricingScreen: FC<{}> = () => {
  return (
    <section>
      <h1>Pricing</h1>
      <Elements stripe={stripePromise}>
        <PaymentBtn plan="standard_monthly" text="Zapłać 29,90PLN" />
      </Elements>
    </section>
  );
};

export default PricingScreen;
