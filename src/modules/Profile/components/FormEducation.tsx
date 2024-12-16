import { FC, useEffect, useState } from "react";
import { Education } from "../types/profile-types";
import { useAuthContext } from "../../Auth/context/auth-context";
import { protectedApi } from "../../../api/axiosClient";
import { TrashIcon } from "../../../assets/icons/icons";
import { useProfileContext } from "../context/profile-context";

interface FormEducationProps {
  education?: Education;
  closePopup?: Function;
}

const FormEducation: FC<FormEducationProps> = ({ education, closePopup }) => {
  const { user } = useAuthContext();
  const { setRefreshEducationList, refreshEducationList } = useProfileContext();
  const [formData, setFormData] = useState(
    education
      ? { ...education }
      : {
          name: "",
          date: null,
          in_progress: false,
        }
  );

  //add user id to form data
  useEffect(() => {
    if (user?.id) {
      setFormData({
        ...formData,
        user: user?.id,
      });
    }
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value, // Handle checkboxes differently
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await protectedApi.post("/accounts/education/", formData);
      alert("Pomyślnie dodano wykształcenie");
      setFormData({
        name: "",
        date: null,
        in_progress: false,
      });
      setRefreshEducationList(!refreshEducationList);
    } catch (error) {
      console.error("Error creating Education instance: ", error);
      alert("Błąd podczas tworzenia. Spróbuj ponownie.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //backend does not accept empty string if empty - only null
      if (formData.date !== "") {
        await protectedApi.put(
          `/accounts/education/${education?.id}/`,
          formData
        );
      } else {
        await protectedApi.put(`/accounts/education/${education?.id}/`, {
          ...formData,
          date: null,
        });
      }
      closePopup && closePopup();
      setRefreshEducationList(!refreshEducationList);
      alert("Pomyślnie zaktualizowano wykształcenie");
    } catch (error) {
      console.error("Error updating Education instance: ", error);
      alert("Błąd aktualizacji wykształcenia. Spróbuj ponownie.");
    }
  };

  const handleDelete = async () => {
    if (!education) return;
    try {
      await protectedApi.delete(`/accounts/education/${education.id}/`);
      closePopup && closePopup();
      setRefreshEducationList(!refreshEducationList);
      alert("Pomyślnie usunięto wykształcenie");
    } catch (error) {
      console.error("Error deleting Education instance: ", error);
      alert("Błąd usuwania wykształcenia. Spróbuj ponownie.");
    }
  };
  return (
    <form onSubmit={education ? handleUpdate : handleCreate}>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="name">Nazwa (max 250 znaków)</label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="date">Data uzyskania</label>
          <input
            type="date"
            className="form-input"
            id="date"
            value={formData.date ? formData.date : ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row-2">
        <div className="checkbox-col">
          <label htmlFor="in_progress">W trakcie</label>
          <input
            className="form-input"
            type="checkbox"
            id="in_progress"
            checked={formData.in_progress}
            onChange={handleChange}
            required={formData.date ? false : true}
          />
        </div>
      </div>
      <button className="btn btn-dark" type="submit">
        {education ? "Zapisz zmiany" : "Dodaj"}
      </button>
      {education && (
        <div
          style={{ marginTop: "10px" }}
          className="btn btn-light"
          onClick={handleDelete}
        >
          <TrashIcon />
          <p>Usuń</p>
        </div>
      )}
    </form>
  );
};

export default FormEducation;
