import { FC, useState } from "react";
import { Education } from "../types/profile-types";

interface FormEducationProps {
  education?: Education;
}

const FormEducation: FC<FormEducationProps> = ({ education }) => {
  const [formData, setFormData] = useState(
    education
      ? { ...education }
      : {
          name: "",
          date: "",
          in_progress: false,
        }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value, // Handle checkboxes differently
    }));
  };

  return (
    <form>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="name">Nazwa</label>
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
          />
        </div>
      </div>
      <button className="btn btn-dark" type="submit">
        Dodaj
      </button>
    </form>
  );
};

export default FormEducation;
