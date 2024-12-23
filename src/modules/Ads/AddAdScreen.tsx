import { FC, useEffect } from "react";
import { useAuthContext } from "../Auth/context/auth-context";
import TrainerAdForm from "./components/TrainerAdForm";
import ClientAdForm from "./components/ClientAdForm";

const AddAdScreen: FC<{}> = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <section>{user?.is_trainer ? <TrainerAdForm /> : <ClientAdForm />}</section>
  );
};

export default AddAdScreen;
