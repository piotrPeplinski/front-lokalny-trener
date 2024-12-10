import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/context/auth-context";
import { api, protectedApi } from "../../../api/axiosClient";

interface SocialMedia {
  phone: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  website: string;
}

const ContactInfoForm: FC<{}> = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState<SocialMedia>({
    phone: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    website: "",
  });

  // Fetch the existing social media data for the user
  useEffect(() => {
    const fillForm = async () => {
      try {
        const response = await api.get(`/accounts/socials/${user?.id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching social media data:", error);
      }
    };

    fillForm();
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await protectedApi.put(`/accounts/socials/${user?.id}/`, formData);
      alert("Zaktualizowano pomyślnie!");
    } catch (error) {
      console.error("Error updating social media data:", error);
      alert("Błąd podczas aktualizacji. Spróbuj ponownie.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="phone">Numer telefonu</label>
          <input
            className="form-input"
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="\d{9}"
            title="Podaj prawidłowy numer telefonu składający się z 9 cyfr"
          />
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="facebook">Facebook (link)</label>
          <input
            className="form-input"
            type="url"
            id="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>
        <div className="form-col-2">
          <label htmlFor="instagram">Instagram (link)</label>
          <input
            className="form-input"
            type="url"
            id="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="tiktok">Tiktok (link)</label>
          <input
            className="form-input"
            type="url"
            id="tiktok"
            value={formData.tiktok}
            onChange={handleChange}
          />
        </div>
        <div className="form-col-2">
          <label htmlFor="website">Strona internetowa (link)</label>
          <input
            className="form-input"
            type="url"
            id="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="btn btn-dark" type="submit">
        Zapisz zmiany
      </button>
    </form>
  );
};

export default ContactInfoForm;
