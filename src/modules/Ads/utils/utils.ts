import { AdDetailType, ClientAdDetailType } from "../types/ads-types";

const socials = ["facebook", "instagram", "tiktok", "website"];

const defaultAdDetails: AdDetailType = {
  preview: {
    id: 0,
    profile_picture: "",
    full_name: "Unknown",
    sub_category: "",
    rating: {
      average_rating: 0,
      review_count: 0,
    },
    premium: false,
    city: "",
    remote: false,
  },
  contact_info: {
    id: 0,
    email: "",
    city: "",
    remote: false,
    phone: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    website: "",
  },
  services: [],
  text: "No description available.",
  education: [],
  photos: [],
  reviews: [],
  user: 0,
};

const defaultClientAdDetails: ClientAdDetailType = {
  ad_data: {
    id: 0,
    text: "No description available.",
    sub_category: 0,
    subcategory: {
      id: 0,
      name: "Unknown",
    },
    category: {
      id: 0,
      name: "Unknown",
    },
    max_price: 0,
    min_price: 0,
    time: 0,
    phone: "",
  },
  user_data: {
    id: 0,
    email: "",
    first_name: "Unknown",
    last_name: "Unknown",
    profile_picture: null,
    remote: false,
    city: "Unknown",
  },
};

export { socials, defaultAdDetails, defaultClientAdDetails };
