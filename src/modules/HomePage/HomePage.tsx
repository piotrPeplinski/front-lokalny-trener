import { FC } from "react";
import NavBar from "./components/NavBar";
import '../../assets/css/HomePage/homePage.css'

const HomePage: FC<{}> = () => {
  return (
    <header>
      <NavBar />
      <p>Home page</p>
    </header>
  );
};

export default HomePage;
