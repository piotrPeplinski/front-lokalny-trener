import { FC } from "react";
import PaymentBtn from "./components/PaymentBtn";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./../../assets/css/Payments/payments.css";
import { CheckIcon, CloseIcon, TrophyIcon } from "../../assets/icons/icons";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

const PricingScreen: FC<{}> = () => {
  return (
    <>
      <Helmet>
        <title>Lokalny Trener - Cennik</title>
        <meta
          name="description"
          content="Sprawdź nasze plany cenowe na Lokalny Trener. Wybierz opcję, która najlepiej odpowiada Twoim potrzebom, aby oferować usługi eksperckie i znajdować klientów."
        />
        <meta
          name="keywords"
          content="cennik, plany cenowe, ceny, subskrypcja, lokalni eksperci, fitness, języki obce, korepetycje, programowanie"
        />
        <meta property="og:title" content="Lokalny Trener - Cennik" />
        <meta
          property="og:description"
          content="Sprawdź nasze plany cenowe na Lokalny Trener. Wybierz opcję, która najlepiej odpowiada Twoim potrzebom, aby oferować usługi eksperckie i znajdować klientów."
        />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_FRONTEND_URL}/pricing`}
        />
      </Helmet>
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
            <div className="pricing-card shadow">
              <div className="pricing-card__name">
                <h1>
                  Pakiet <span className="plan-name">PREMIUM</span>
                </h1>
                <p className="pricing-discount">
                  (Pierwsze <span className="bold">30 dni za darmo</span>)
                </p>
              </div>
              <div className="pricing-card__prices">
                <div className="pricing-card__price">
                  <p>
                    49,90zł<span> / miesiąc</span>
                  </p>
                </div>
                <p className="pricing-discount">lub</p>
                <div className="pricing-card__price">
                  <p>
                    399zł<span> / rok</span>
                  </p>
                  <p className="pricing-discount">
                    (Oszczędzasz <span className="bold">200zł</span>!)
                  </p>
                </div>
              </div>
              <div className="pricing-card__benefits">
                <div className="pricing-card__benefit">
                  <div className="trophy">
                    <TrophyIcon />
                  </div>
                  <p>
                    Stałe wyróżnienie na szczycie ogłoszeń w twojej kategorii -{" "}
                    <span className="bold">więcej potencjalnych klientów!</span>
                  </p>
                </div>
                <div className="pricing-card__benefit">
                  <div className="trophy">
                    <TrophyIcon />
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
                    plan="premium_monthly"
                    text="Kup za 49,90zł"
                    btn_light={true}
                  />
                  <PaymentBtn
                    plan="premium_yearly"
                    text="Kup za 399zł"
                    btn_light={false}
                  />
                </div>
              </Elements>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingScreen;
