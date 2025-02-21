import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../Auth/context/auth-context";
import { protectedApi } from "../../api/axiosClient";
import { SubscriptionType } from "./types/payments-types";
import SubscriptionCard from "./components/SubscriptionCard";

const SubscriptionScreen: FC<{}> = () => {
  const { user } = useAuthContext();
  const [subscription, setSubscription] = useState<SubscriptionType>();
  const [message, setMessage] = useState("");
  //state to refresh card
  const [subscriptionCancelled, setSubscriptionCancelled] = useState(false);

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
  }, [user, subscriptionCancelled]);

  return (
    <section>
      <div className="center-wrapper">
        {subscription ? (
          <SubscriptionCard
            subscription={subscription}
            setSubscriptionCancelled={setSubscriptionCancelled}
          />
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
