import { FC } from "react";
import { SubscriptionType } from "../types/payments-types";
import { CalendarIcon, GiftIcon } from "../../../assets/icons/icons";
import { protectedApi } from "../../../api/axiosClient";

interface SubscriptionCardProps {
  subscription: SubscriptionType;
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({ subscription }) => {
  const handleCancelSubscription = async () => {
    try {
      const response = await protectedApi.delete("payments/subscription/");
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="subscription-card shadow">
      <div className="pricing-card__name">
        <h1>
          Pakiet{" "}
          <span className="plan-name">
            {subscription.premium ? "PREMIUM" : "STANDARD"}
          </span>
        </h1>
      </div>
      <div className="pricing-card__prices">
        <div className="pricing-card__price">
          <p>
            {subscription.amount}zł
            <span> / {subscription.monthly ? "miesiąc" : "rok"}</span>
          </p>
        </div>
      </div>
      <div className="pricing-card__benefits">
        {subscription.on_trial && (
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
            {subscription.canceled
              ? "Koniec subskrypcji"
              : "Kolejny okres rozliczeniowy rozpocznie się:"}{" "}
            <span className="bold">{subscription.next_charge_date}</span>
          </p>
        </div>
      </div>
      {!subscription.canceled && (
        <div className="pricing-card__btns center-wrapper">
          <button className="btn btn-light" onClick={handleCancelSubscription}>
            Anuluj subskrypcję
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
