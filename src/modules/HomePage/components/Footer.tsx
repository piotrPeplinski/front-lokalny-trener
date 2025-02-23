import React from "react";
import logo from "./../../../assets/img/logo.png";
import { CallIcon, MailIcon } from "../../../assets/icons/icons";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="row">
        <img src={logo} alt="Logo" />
        <div className="footer-row">
          <div className="footer-links">
            <div className="link-col">
              <h4>Social Media</h4>
              <ul>
                <li>
                  <a
                    href="https://www.instagram.com/lokalnytrener.pl?igsh=MXNwcW93cXg1MmFjNg%3D%3D&utm_source=qr
"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">TikTok</a>
                </li>
              </ul>
            </div>
            <div className="link-col">
              <h4>Warunki serwisu</h4>
              <ul>
                <li>
                  <Link to="/policy">Polityka Prywatności</Link>
                </li>
                <li>
                  <Link to="/statute">Regulamin serwisu</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-contact">
            <p>
              <CallIcon /> +48 694 034 450
            </p>
            <p>
              <MailIcon /> support@lokalnytrener.pl
            </p>
          </div>
        </div>
        <div className="footer-row">
          <p className="footer-text">
            Copyright &copy; 2025 Lokalny Trener. Wszelkie prawa zastrzeżone.
          </p>
          <p className="footer-text">
            Designed & Developed by{" "}
            <a
              className="programmer-link"
              target="blank"
              href="https://www.linkedin.com/in/peplinski/"
            >
              Piotr Pepliński
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
