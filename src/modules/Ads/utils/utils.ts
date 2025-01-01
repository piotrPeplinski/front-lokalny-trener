import { AdDetailType } from "../types/ads-types";

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

export { socials, defaultAdDetails };
