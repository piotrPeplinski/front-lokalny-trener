import { FC } from "react";
import { Education } from "../types/profile-types";
import { useAuthContext } from "../../Auth/context/auth-context";
import { CalendarIcon, TrashIcon } from "../../../assets/icons/icons";

interface CardEducationProps {
  education: Education;
  allowEdit: boolean;
}

const CardEducation: FC<CardEducationProps> = ({ education, allowEdit }) => {
  const { user } = useAuthContext();
  return (
    <div className={`education-card ${allowEdit ? "editable" : ""}`}>
      <div className="education-card__date">
        <CalendarIcon />
        <p>{education.in_progress ? "W trakcie" : education.date}</p>
      </div>
      <p className="education-card__name">{education.name}</p>
      <div className="btn btn-light">
        <TrashIcon />
        <p>Usuń</p>
      </div>
    </div>
  );
};

export default CardEducation;
