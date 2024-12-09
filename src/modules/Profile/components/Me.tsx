import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/context/auth-context";
import UserForm from "./UserForm";

const Me: FC<{}> = () => {
  const { user } = useAuthContext();

  return (
    <div className="me-container">
      <h1 className="profile-func-title">O mnie</h1>
      <UserForm />
      {/* <h1 className="profile-func-title">Dane kontaktowe</h1> */}
    </div>
  );
};

export default Me;
