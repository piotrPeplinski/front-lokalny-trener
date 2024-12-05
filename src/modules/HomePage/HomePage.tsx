import { FC } from "react";
import NavBar from "./components/NavBar";
import "../../assets/css/HomePage/homePage.css";
import SearchTrainer from "./components/SearchTrainer";
import Steps from "./components/Steps";

const HomePage: FC<{}> = () => {
  return (
    <>
      <header>
        <NavBar />
        <SearchTrainer />
      </header>
      <section>
        <Steps />
      </section>
    </>
  );
};

export default HomePage;
