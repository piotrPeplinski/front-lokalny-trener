import { Education, Photo } from "../../Profile/types/profile-types";

export interface Service {
  id: number;
  name: string;
  price: number;
  time: number;
}

export interface AdPreviewType {
  id: number;
  profile_picture: string;
  full_name: string;
  sub_category: string;
  rating: RatingType;
  premium: boolean;
  city: string;
  remote: boolean;
}

export interface ClientAdPreviewType {
  id: number;
  profile_picture: string;
  full_name: string;
  sub_category: string;
  min_price: number;
  max_price: number;
  city: string;
  remote: boolean;
}

export interface RatingType {
  average_rating: number;
  review_count: number;
}

export interface ContactInfoType {
  id?: number;
  email: string;
  city: string;
  remote: boolean;
  phone: string;
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  website?: string | null;
}

export interface ReviewType {
  text: string;
  rating: number;
  created: string;
  creator_full_name: string;
  creator: number;
}

export interface AdDetailType {
  preview: AdPreviewType;
  contact_info: ContactInfoType;
  services: Service[];
  text: string;
  education: Education[];
  photos: Photo[];
  reviews: ReviewType[];
  user: number;
}

export interface ClientAdDetailType {
  ad_data: {
    id: number;
    text: string;
    sub_category: number;
    subcategory: {
      id: number;
      name: string;
    };
    category: {
      id: number;
      name: string;
    };
    max_price: number;
    min_price: number;
    time: number;
    phone: string;
  };
  user_data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    remote: boolean;
    city: string;
  };
}
