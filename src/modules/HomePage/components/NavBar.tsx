import { FC } from "react";
import logo from "./../../../assets/img/logo.png";

const NavBar: FC<{}> = () => {
  return (
    <nav className="shift">
      <a href="#">
        <img src={logo} alt="Logo" />
      </a>

      <ul className="main-nav">
        <li>
          <a href="#">Czym jesteśmy</a>
        </li>
        <li>
          <a href="#">Zaloguj się</a>
        </li>
        <li>
          <a href="#">Zarejestruj się</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
