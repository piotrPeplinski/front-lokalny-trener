import { FC } from "react";
import { useAuthContext } from "../Auth/context/auth-context";
import TrainerAdForm from "./components/TrainerAdForm";
import ClientAdForm from "./components/ClientAdForm";
import "./../../assets/css/Ads/ads.css";

const AddAdScreen: FC<{}> = () => {
  const { user } = useAuthContext();

  return (
    <section>{user?.is_trainer ? <TrainerAdForm /> : <ClientAdForm />}</section>
  );
};

export default AddAdScreen;
