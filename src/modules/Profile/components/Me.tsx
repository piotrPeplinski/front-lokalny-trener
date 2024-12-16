import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/context/auth-context";
import UserForm from "./UserForm";
import ContactInfoForm from "./ContactInfoForm";

const Me: FC<{}> = () => {
  const { user } = useAuthContext();

  return (
    <div className="me-container">
      <h1 className="profile-func-title">O mnie</h1>
      <p>{user?.id}</p>
      <UserForm />
      <h1 className="profile-func-title">Dane kontaktowe</h1>
      <ContactInfoForm />
    </div>
  );
};

export default Me;
