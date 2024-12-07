export interface User {
  id: number;
  is_trainer: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  is_trainer: boolean;
}
