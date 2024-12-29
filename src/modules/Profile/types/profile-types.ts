export interface UserProfile {
  profile_picture: string;
  first_name: string;
  last_name: string;
  city: string;
  remote: boolean;
}

export interface Education {
  id: number;
  name: string;
  date: string | null;
  in_progress: boolean;
  user: number;
}

export interface Photo {
  id: number;
  image: string;
  user_id: number;
}
