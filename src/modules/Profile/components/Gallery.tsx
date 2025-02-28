import { FC, useEffect, useState } from "react";
import { Photo } from "../types/profile-types";
import { api } from "../../../api/axiosClient";
import GalleryItem from "./GalleryItem";
import { useProfileContext } from "../context/profile-context";
import { useAuthContext } from "../../Auth/context/auth-context";
import LoadSpinner from "../../Reusable/LoadSpinner";

interface GalleryProps {
  allowEdit: boolean;
  fetchedPhotos?: Photo[];
}

const Gallery: FC<GalleryProps> = ({ allowEdit, fetchedPhotos }) => {
  const { refreshPhotos } = useProfileContext();
  const { user } = useAuthContext();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(fetchedPhotos ? false : true);
  // Fetch photos
  useEffect(() => {
    if (fetchedPhotos) {
      setPhotos(fetchedPhotos);
    } else {
      const fetchPhotos = async () => {
        try {
          const response = await api.get("/accounts/photos/", {
            params: {
              user: user?.id,
            },
          });
          setPhotos(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchPhotos();
    }
  }, [refreshPhotos, fetchedPhotos]);

  return (
    <div className="photo-gallery">
      {loading ? (
        <LoadSpinner />
      ) : (
        photos.map((photo, index) => (
          <GalleryItem key={index} photo={photo} allowEdit={allowEdit} />
        ))
      )}
    </div>
  );
};

export default Gallery;
