import { FC } from "react";
import logo from "./../../../assets/img/logo.png";
import { useAuthContext } from "../../Auth/context/auth-context";
import { getNavbarData } from "../utils/functions";
import { Link, useNavigate } from "react-router-dom";

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
      <Link className="nav-slogan" to="/">
        <img src={logo} alt="Logo" />
        <h1>
          Lokalny<span>Trener</span>
        </h1>
      </Link>

      <ul className="main-nav">
        <li>
          <Link to="/pricing" className="shift important">
            Cennik trenera
          </Link>
        </li>
        {navLinks.map((navLink, index) => (
          <li key={index}>
            <Link className={navLink.classes} to={navLink.href}>
              {navLink.text}
            </Link>
          </li>
        ))}
        {isAuthenticated && (
          <li>
            <Link to="#" onClick={handleLogout} className="shift">
              Wyloguj się
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
