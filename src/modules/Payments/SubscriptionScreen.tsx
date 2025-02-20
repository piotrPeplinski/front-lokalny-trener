import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../Auth/context/auth-context";
import { protectedApi } from "../../api/axiosClient";
import { SubscriptionType } from "./types/payments-types";
import { CalendarIcon, GiftIcon } from "../../assets/icons/icons";

const SubscriptionScreen: FC<{}> = () => {
  const { user } = useAuthContext();
  const [subscription, setSubscription] = useState<SubscriptionType>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await protectedApi.get("/payments/subscription/");
        setSubscription(response.data);
      } catch (error: any) {
        setMessage(error.response.data.error);
      }
    };
    fetchSubscription();
  }, [user]);

  return (
    <section>
      <div className="center-wrapper">
        {subscription ? (
          <div className="subscription-card shadow">
            <div className="pricing-card__name">
              <h1>
                Pakiet{" "}
                <span className="plan-name">
                  {subscription?.premium ? "PREMIUM" : "STANDARD"}
                </span>
              </h1>
            </div>
            <div className="pricing-card__prices">
              <div className="pricing-card__price">
                <p>
                  {subscription?.amount}zł
                  <span> / {subscription?.monthly ? "miesiąc" : "rok"}</span>
                </p>
              </div>
            </div>
            <div className="pricing-card__benefits">
              {subscription?.on_trial && (
                <div className="pricing-card__benefit">
                  <GiftIcon />
                  <p>
                    Darmowy okres próbny skończy się:{" "}
                    <span className="bold">{subscription.trial_end_at}</span>
                  </p>
                </div>
              )}
              <div className="pricing-card__benefit">
                <CalendarIcon />
                <p>
                  Kolejny okres rozliczeniowy rozpocznie się:{" "}
                  <span className="bold">{subscription?.next_charge_date}</span>
                </p>
              </div>
            </div>
            <div className="pricing-card__btns center-wrapper">
              <button className="btn btn-light">Anuluj subskrypcję</button>
            </div>
          </div>
        ) : (
          <div className="payment-end-container">
            <h1>{message}</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubscriptionScreen;
