import { FC } from "react";
import NavBar from "./components/NavBar";
import "../../assets/css/HomePage/homePage.css";
import SearchTrainer from "./components/SearchTrainer";

const HomePage: FC<{}> = () => {
  return (
    <header>
      <NavBar />
      <SearchTrainer />
      <p>Home page</p>
    </header>
  );
};

export default HomePage;
