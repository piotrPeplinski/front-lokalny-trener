import { FC } from "react";
import Gallery from "./Gallery";
import { protectedApi } from "../../../api/axiosClient";
import { useProfileContext } from "../context/profile-context";

const PhotoGallery: FC<{}> = () => {
  const { refreshPhotos, setRefreshPhotos } = useProfileContext();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // "image" is the field name in Photo model

    try {
      // Upload the file to the backend
      await protectedApi.post("/accounts/photos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Zdjęcie zostało dodane.");
      setRefreshPhotos(!refreshPhotos); // Refresh the gallery to show the new photo
    } catch (err) {
      console.error("Błąd przy przesyłaniu zdjęcia:", err);
      alert("Błąd przy przesyłaniu zdjęcia");
    }
  };

  return (
    <div className="me-container">
      <h1 className="profile-func-title">Galeria zdjęć</h1>
      <form>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="fileUpload">Dodaj zdjęcie (maks. 5)</label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*" // Restrict to image files only
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </form>
      <Gallery allowEdit={true} />
    </div>
  );
};

export default PhotoGallery;
