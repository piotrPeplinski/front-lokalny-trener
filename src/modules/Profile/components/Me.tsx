import { FC } from "react";
import UserForm from "./UserForm";
import ContactInfoForm from "./ContactInfoForm";

const Me: FC<{}> = () => {
  return (
    <div className="me-container">
      <h1 className="profile-func-title">O mnie</h1>
      <UserForm />
      <h1 className="profile-func-title">Dane kontaktowe</h1>
      <ContactInfoForm />
    </div>
  );
};

export default Me;
