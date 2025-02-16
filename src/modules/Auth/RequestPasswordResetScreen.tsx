import { FC } from "react";
import RequestPasswordResetForm from "./components/RequestPasswordResetForm";

const RequestPasswordResetScreen: FC<{}> = () => {
  return (
    <section>
      <div className="row">
        <h1 className="profile-func-title text-center">Resetuj hasło</h1>
        <RequestPasswordResetForm />
      </div>
    </section>
  );
};

export default RequestPasswordResetScreen;
