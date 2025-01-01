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
}

export interface RatingType {
  average_rating: number;
  review_count: number;
}

export interface ContactInfoType {
  id: number;
  email: string;
  city: string;
  remote: boolean;
  phone: string;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  website: string | null;
}

export interface ReviewType {
  text: string;
  rating: number;
  created: string;
  creator_full_name: string;
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