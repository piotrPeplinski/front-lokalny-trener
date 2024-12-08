import { FC } from "react";

const Me: FC<{}> = () => {
  return (
    <div className="me-container">
      <h1 className="profile-func-title">O mnie</h1>
      <form action="">
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="">Zdjęcie profilowe</label>
            <input
              type="file"
              accept="image/*" // Restrict to image files only
            />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="name">Imie</label>
            <input className="form-input" type="text" id="name" />
          </div>
          <div className="form-col-2">
            <label htmlFor="surname">Nazwisko</label>
            <input className="form-input" type="text" id="surname" />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="city">Miasto</label>
            <input className="form-input" type="text" id="city" />
          </div>
          <div className="checkbox-col">
            <label htmlFor="remote">Prowadzę zajęcia zdalnie</label>
            <input className="form-input" type="checkbox" id="remote" />
          </div>
        </div>
        <button className="btn btn-dark" type="submit">
          Zapisz zmiany
        </button>
      </form>
      <h1 className="profile-func-title">Dane kontaktowe</h1>
    </div>
  );
};

export default Me;
