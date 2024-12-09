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

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);

      // Use FileReader to display a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profile_picture: reader.result as string, // Set the preview URL
        });
      };
      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all fields to the form data
    // formData.append("id", `${user?.id}`);
    formData.append("first_name", profileData.first_name);
    formData.append("last_name", profileData.last_name);
    formData.append("city", profileData.city);
    formData.append("remote", String(profileData.remote));

    // If a new profile picture is selected, append it
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      // Send PUT request to update user profile
      const response = await protectedApi.put(
        `accounts/users/${user?.id}/`,
        formData
      );
      console.log("Profile updated successfully:", response.data);
      alert("Zaktualizowano pomyślnie!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Błąd podczas aktualizacji. Spróbuj ponownie.");
    }
  };

  // Handle delete profile picture
  const handleDeleteProfilePicture = async () => {
    try {
      // Send PUT request to remove the profile picture (set it to null)
      const response = await protectedApi.put(`accounts/users/${user?.id}/`, {
        ...profileData,
        profile_picture: null, // Delete the profile picture
      });
      setProfileData(response.data); // Update profile data after deletion
      setProfilePicture(null); // Reset the local state for profile picture
      console.log("Profile picture deleted successfully:", response.data);
      alert("Pomyślnie usunięto Twoje zdjęcie profilowe!");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  };

  return (
    <div className="me-container">
      <h1 className="profile-func-title">O mnie</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="">
              {profileData.profile_picture ? "Zmień " : "Dodaj "}Zdjęcie
              profilowe
            </label>
            <input
              type="file"
              accept="image/*" // Restrict to image files only
              onChange={handleFileChange}
            />
            {profileData.profile_picture && (
              <button
                type="button"
                className="btn btn-light"
                onClick={handleDeleteProfilePicture}
              >
                Usuń zdjęcie profilowe
              </button>
            )}
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
            <label htmlFor="name">Imię</label>
            <input
              className="form-input"
              value={profileData.first_name}
              type="text"
              id="name"
              onChange={(e) =>
                setProfileData({ ...profileData, first_name: e.target.value })
              }
            />
          </div>
          <div className="form-col-2">
            <label htmlFor="surname">Nazwisko</label>
            <input
              className="form-input"
              value={profileData.last_name}
              type="text"
              id="surname"
              onChange={(e) =>
                setProfileData({ ...profileData, last_name: e.target.value })
              }
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
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
            />
          </div>
          <div className="checkbox-col">
            <label htmlFor="remote">Prowadzę zajęcia zdalnie</label>
            <input
              className="form-input"
              checked={profileData.remote}
              type="checkbox"
              id="remote"
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  remote: e.target.checked,
                })
              }
            />
          </div>
        </div>
        <button className="btn btn-dark" type="submit">
          Zapisz zmiany
        </button>
      </form>
      {/* <h1 className="profile-func-title">Dane kontaktowe</h1> */}
    </div>
  );
};

export default Me;
