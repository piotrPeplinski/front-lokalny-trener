import { FC } from "react";
import logo from "./../../../assets/img/logo.png";
import { useAuthContext } from "../../Auth/context/auth-context";
import { getNavbarData } from "../utils/functions";
import { useNavigate } from "react-router-dom";

const NavBar: FC<{}> = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const navLinks = getNavbarData(user);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <a href="/">
        <img src={logo} alt="Logo" />
      </a>

      <ul className="main-nav">
        {navLinks.map((navLink) => (
          <li>
            <a className={navLink.classes} href={navLink.href}>
              {navLink.text}
            </a>
          </li>
        ))}
        {isAuthenticated && (
          <li>
            <a onClick={handleLogout} className="shift" href="#">
              Wyloguj się
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
