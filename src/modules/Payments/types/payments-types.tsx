export interface SubscriptionType {
  amount: string;
  monthly: boolean;
  premium: boolean;
  on_trial: boolean;
  trial_end_at: string | null;
  next_charge_date: string;
  canceled: boolean;
}
