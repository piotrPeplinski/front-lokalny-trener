import { FC } from "react";
import UserForm from "./UserForm";
import ContactInfoForm from "./ContactInfoForm";
import { useAuthContext } from "../../Auth/context/auth-context";

const Me: FC<{}> = () => {
  const { user } = useAuthContext();
  return (
    <div className="me-container">
      <h1 className="profile-func-title">O mnie</h1>
      <UserForm />
      {user?.is_trainer && (
        <>
          <h1 className="profile-func-title">Dane kontaktowe</h1>
          <ContactInfoForm />
        </>
      )}
    </div>
  );
};

export default Me;
