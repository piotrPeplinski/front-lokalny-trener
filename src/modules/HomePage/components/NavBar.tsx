import { FC } from "react";
import logo from "./../../../assets/img/logo.png";

const NavBar: FC<{}> = () => {
  return (
    <nav>
      <a href="#">
        <img src={logo} alt="Logo" />
      </a>

      <ul className="main-nav">
        <li>
          <a className="shift" href="#">
            Czym jesteśmy
          </a>
        </li>
        <li>
          <a className="shift" href="#">
            Zaloguj się
          </a>
        </li>
        <li>
          <a className="shift important" href="/register">
            Zarejestruj się
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
