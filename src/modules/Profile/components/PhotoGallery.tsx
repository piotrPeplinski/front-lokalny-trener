import { FC } from "react";
import Gallery from "./Gallery";
import { useAuthContext } from "../../Auth/context/auth-context";

const PhotoGallery: FC<{}> = () => {
  const { user } = useAuthContext();
  return (
    <div className="me-container">
      <h1 className="profile-func-title">Galeria zdjęć</h1>
      <form>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="">Dodaj zdjęcie (maks. 5)</label>
            <input
              type="file"
              accept="image/*" // Restrict to image files only
            />
          </div>
        </div>
      </form>
      <Gallery userId={user?.id} allowEdit={true} />
    </div>
  );
};

export default PhotoGallery;
