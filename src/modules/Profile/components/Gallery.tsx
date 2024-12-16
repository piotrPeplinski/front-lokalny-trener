import { FC, useEffect, useState } from "react";
import { Photo } from "../types/profile-types";
import { api } from "../../../api/axiosClient";
import GalleryItem from "./GalleryItem";
import { useProfileContext } from "../context/profile-context";

interface GalleryProps {
  userId: number | undefined;
  allowEdit: boolean;
}

const Gallery: FC<GalleryProps> = ({ userId, allowEdit }) => {
  const { refreshPhotos } = useProfileContext();
  const [photos, setPhotos] = useState<Photo[]>([]);
  // Fetch photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await api.get("/accounts/photos/", {
          params: {
            user: userId,
          },
        });
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [refreshPhotos]);
  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <GalleryItem photo={photo} allowEdit={allowEdit} />
      ))}
    </div>
  );
};

export default Gallery;
