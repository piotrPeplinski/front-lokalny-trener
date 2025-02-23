import { FC, useState } from "react";
import logo from "./../../../assets/img/logo.png";
import { useAuthContext } from "../../Auth/context/auth-context";
import { getNavbarData } from "../utils/functions";
import { Link, useNavigate } from "react-router-dom";
import { BurgerIcon, CloseIcon } from "../../../assets/icons/icons";

const NavBar: FC<{}> = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const navLinks = getNavbarData(user);
  const [showNav, setShowNav] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeNav = () => {
    setShowNav(false);
  };
  return (
    <nav>
      <div className="show-hide-nav" onClick={() => setShowNav(!showNav)}>
        {showNav ? <CloseIcon /> : <BurgerIcon />}
      </div>
      <Link className="nav-slogan" to="/" onClick={closeNav}>
        <img src={logo} alt="Logo" />
        <h1>
          Lokalny<span>Trener</span>
        </h1>
      </Link>

      <ul className={`main-nav ${showNav ? "" : "nav-hidden"}`}>
        <li>
          <Link to="/pricing" className="shift important" onClick={closeNav}>
            Cennik trenera
          </Link>
        </li>
        {navLinks.map((navLink, index) => (
          <li key={index}>
            <Link
              className={navLink.classes}
              to={navLink.href}
              onClick={closeNav}
            >
              {navLink.text}
            </Link>
          </li>
        ))}
        {isAuthenticated && (
          <li>
            <Link
              to="#"
              onClick={() => {
                handleLogout();
                closeNav();
              }}
              className="shift"
            >
              Wyloguj się
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
