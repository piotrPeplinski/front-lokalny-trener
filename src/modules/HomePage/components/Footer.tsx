import React from "react";
import logo from "./../../../assets/img/logo.png";
import { CallIcon, MailIcon } from "../../../assets/icons/icons";

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
                  <a href="#">Instagram</a>
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
                  <a href="#">Polityka Prywatności</a>
                </li>
                <li>
                  <a href="#">Regulamin serwisu</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-contact">
            <p>
              <CallIcon /> +48 123 456 789
            </p>
            <p>
              <MailIcon /> example@gmail.com
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
