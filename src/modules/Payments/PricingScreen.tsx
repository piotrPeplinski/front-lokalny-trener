import { FC } from "react";
import PaymentBtn from "./components/PaymentBtn";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./../../assets/css/Payments/payments.css";
import { CheckIcon, CloseIcon } from "../../assets/icons/icons";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

const PricingScreen: FC<{}> = () => {
  return (
    <section>
      <div className="row">
        <div className="pricing-container">
          <div className="pricing-card shadow">
            <div className="pricing-card__name">
              <h1>
                Pakiet <span className="plan-name">STANDARD</span>
              </h1>
              <p className="pricing-discount">
                (Pierwsze <span className="bold">30 dni za darmo</span>)
              </p>
            </div>
            <div className="pricing-card__prices">
              <div className="pricing-card__price">
                <p>
                  29,90zł<span> / miesiąc</span>
                </p>
              </div>
              <p className="pricing-discount">lub</p>
              <div className="pricing-card__price">
                <p>
                  299zł<span> / rok</span>
                </p>
                <p className="pricing-discount">
                  (Oszczędzasz <span className="bold">60zł</span>!)
                </p>
              </div>
            </div>
            <div className="pricing-card__benefits">
              <div className="pricing-card__benefit benefit-inactive">
                <div>
                  <CloseIcon />
                </div>

                <p>
                  Stałe wyróżnienie na szczycie ogłoszeń w twojej kategorii -
                  więcej potencjalnych klientów!
                </p>
              </div>
              <div className="pricing-card__benefit benefit-inactive">
                <div>
                  <CloseIcon />
                </div>
                <p>Możliwość dodawania ogłoszeń w wielu kategoriach</p>
              </div>
              <div className="pricing-card__benefit">
                <div>
                  <CheckIcon />
                </div>
                <p>Możliwość dodawania ogłoszeń w 1 kategorii</p>
              </div>
              <div className="pricing-card__benefit">
                <div>
                  <CheckIcon />
                </div>
                <p>Możliwość otrzymywania opinii i komentarzy</p>
              </div>
              <div className="pricing-card__benefit">
                <div>
                  <CheckIcon />
                </div>
                <p>Możliwość przeglądania ofert osób szukających pomocy</p>
              </div>
              <div className="pricing-card__benefit">
                <div>
                  <CheckIcon />
                </div>
                <p>
                  Możliwość brania udziału w konkursach na eksperta miesiąca
                </p>
              </div>
            </div>
            <Elements stripe={stripePromise}>
              <div className="pricing-card__btns">
                <PaymentBtn
                  plan="standard_monthly"
                  text="Kup za 29,90zł"
                  btn_light={true}
                />
                <PaymentBtn
                  plan="standard_yearly"
                  text="Kup za 299zł"
                  btn_light={false}
                />
              </div>
            </Elements>
          </div>
        </div>
        {/* <h1>Pricing</h1>
      <Elements stripe={stripePromise}>
        <PaymentBtn plan="standard_monthly" text="Zapłać 29,90PLN" />
      </Elements> */}
      </div>
    </section>
  );
};

export default PricingScreen;
