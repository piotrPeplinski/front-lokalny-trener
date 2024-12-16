import { FC, useState } from "react";
import { Education } from "../types/profile-types";
import { useAuthContext } from "../../Auth/context/auth-context";
import { CalendarIcon, TrashIcon } from "../../../assets/icons/icons";
import Popup from "../../Reusable/Popup";
import FormEducation from "./FormEducation";
import { useProfileContext } from "../context/profile-context";

interface CardEducationProps {
  education: Education;
  allowEdit: boolean;
}

const CardEducation: FC<CardEducationProps> = ({ education, allowEdit }) => {
  // POPUP
  const { editPopupOpen, setEditPopupOpen } = useProfileContext();
  const openPopup = () => setEditPopupOpen(true);
  const closePopup = () => setEditPopupOpen(false);

  return (
    <>
      <div
        className={`education-card ${allowEdit ? "editable" : ""}`}
        onClick={allowEdit ? openPopup : () => null}
      >
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
      <Popup isOpen={editPopupOpen} onClose={closePopup}>
        <FormEducation education={education} />
      </Popup>
    </>
  );
};

export default CardEducation;
