import { FC } from "react";
import { Photo } from "../types/profile-types";
import { TrashIcon } from "../../../assets/icons/icons";
import { protectedApi } from "../../../api/axiosClient";
import { useProfileContext } from "../context/profile-context";

interface GalleryItemProps {
  photo: Photo;
  allowEdit: boolean;
}

const GalleryItem: FC<GalleryItemProps> = ({ photo, allowEdit }) => {
  const { refreshPhotos, setRefreshPhotos } = useProfileContext();
  const handleDelete = async () => {
    try {
      await protectedApi.delete(`/accounts/photos/${photo.id}/`);
      alert("Zdjęcie zostało usunięte.");
      setRefreshPhotos(!refreshPhotos);
      // Notify parent to refresh the gallery
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Nie udało się usunąć zdjęcia.");
    }
  };

  return (
    <div className="photo">
      {allowEdit ? (
        <>
          <div className="btn btn-light" onClick={handleDelete}>
            <TrashIcon />
            <p>Usuń</p>
          </div>
          <img src={photo.image} alt="Photo" />
        </>
      ) : (
        <img
          src={`${photo.image}`}
          alt="Photo"
        />
      )}
    </div>
  );
};

export default GalleryItem;
