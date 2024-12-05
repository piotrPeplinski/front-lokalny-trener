import { FC } from "react";
import "../../assets/css/HomePage/homePage.css";
import SearchTrainer from "./components/SearchTrainer";
import Steps from "./components/Steps";
import RegisterScreen from "../Auth/RegisterScreen";

const HomePage: FC<{}> = () => {
  return (
    <>
      <header>
        <SearchTrainer />
      </header>
      <section>
        <Steps />
      </section>
      <RegisterScreen darkBg={true} />
    </>
  );
};

export default HomePage;
