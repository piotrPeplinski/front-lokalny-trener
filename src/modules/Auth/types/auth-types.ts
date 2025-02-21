export interface User {
  id: number;
  is_trainer: boolean;
  is_subscribed: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  is_trainer: boolean;
}
