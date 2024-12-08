import { FC, useEffect, useState } from "react";
import avatar from "./../../../assets/img/avatar.png";
import { UserProfile } from "../types/profile-types";
import { protectedApi } from "../../../api/axiosClient";
import { useAuthContext } from "../../Auth/context/auth-context";

const Me: FC<{}> = () => {
  const { user } = useAuthContext();
  const [profileData, setProfileData] = useState<UserProfile>({
    profile_picture: "",
    first_name: "",
    last_name: "",
    city: "",
    remote: false,
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await protectedApi.get(`accounts/users/${user?.id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [user?.id]);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);
  return (
    <div className="me-container">
      <h1 className="profile-func-title">O mnie</h1>
      <form action="">
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="">
              {profileData.profile_picture ? "Zmień " : "Dodaj "}Zdjęcie
              profilowe
            </label>
            <input
              type="file"
              accept="image/*" // Restrict to image files only
            />
          </div>
          <div className="profile-image-circle">
            <img
              src={profileData.profile_picture || avatar}
              alt="Profile picture"
            />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="name">Imie</label>
            <input
              className="form-input"
              value={profileData.first_name}
              type="text"
              id="name"
            />
          </div>
          <div className="form-col-2">
            <label htmlFor="surname">Nazwisko</label>
            <input
              className="form-input"
              value={profileData.last_name}
              type="text"
              id="surname"
            />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="city">Miasto</label>
            <input
              className="form-input"
              value={profileData.city}
              type="text"
              id="city"
            />
          </div>
          <div className="checkbox-col">
            <label htmlFor="remote">Prowadzę zajęcia zdalnie</label>
            <input
              className="form-input"
              checked={profileData.remote}
              type="checkbox"
              id="remote"
            />
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
