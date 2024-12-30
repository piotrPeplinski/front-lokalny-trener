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
