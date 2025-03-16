import { FC, useState } from "react";
import { AvatarIcon, CheckIcon, GiftIcon } from "../../../assets/icons/icons";
import { useAuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import logo from "./../../../assets/img/logo.png";
import Popup from "../../Reusable/Popup";
import benefitsData from "../utils/benefitsData";

const RegisterForm: FC<{}> = () => {
  const { register } = useAuthContext(); // Get the register method from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") {
      alert("Podaj email");
      return;
    }
    if (password === "" || confirmPassword === "") {
      alert("Ustaw hasło");
      return;
    }
    if (password !== confirmPassword) {
      alert("Hasła nie są takie same.");
      return;
    }
    setPopupOpen(true);
  };

  // Handle the form submission
  const handleSubmit = async (isTrainer: boolean) => {
    // Prepare data for registration
    const data = {
      email,
      password,
      is_trainer: isTrainer,
    };

    try {
      // Call the register method from AuthContext to register the user
      await register(data);
      navigate("/register-success");
    } catch (errorMessage) {
      setPopupOpen(false);
      alert(errorMessage);
    }
  };

  return (
    <div className="center-wrapper">
      <div className="login-container dark-bg">
        <form>
          <div className="auth-title">
            <img src={logo} alt="Logo" />
            <h2>Zarejestruj się</h2>
          </div>

          {/* Email input */}
          <p className="form-label">E-mail</p>
          <input
            required
            className="form-input"
            type="email"
            placeholder="Podaj e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input */}
          <p className="form-label">Hasło</p>

          <input
            required
            className="form-input"
            type="password"
            placeholder="Podaj hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="form-label">Powtórz hasło</p>
          <input
            required
            className="form-input"
            type="password"
            placeholder="Powtórz hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Submit button */}
          <div className="center-wrapper">
            <button
              className="btn btn-dark margin-top"
              onClick={handlePopupOpen}
            >
              <AvatarIcon />
              <p>Załóż konto</p>
            </button>
          </div>
        </form>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
        <div className="center-wrapper">
          <h3 className="account-title">Wybierz jakie konto chcesz założyć!</h3>
        </div>
        <div className="account-row">
          <div className="account-col">
            <h4>Jestem trenerem</h4>
            <div className="benefits">
              <h5>
                Załóż konto, zapełnij swój grafik i zacznij zarabiać już dziś!
              </h5>
              <div className="benefits__intro">
                <GiftIcon />
                <p>Co zyskujesz?</p>
              </div>
              <div className="benefits__list">
                {benefitsData["trainer"].benefitsArray.map((benefit, index) => (
                  <div key={index} className="benefits__list__benefit">
                    <CheckIcon />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="center-wrapper">
              <button
                className="btn btn-dark"
                onClick={() => handleSubmit(true)}
              >
                <AvatarIcon />
                Założ konto trenera
              </button>
            </div>
          </div>
          <div className="account-col">
            <h4>Jestem klientem</h4>
            <div className="benefits">
              <h5>
                Załóż konto, dodaj ogłoszenie, a specjalista skontaktuje się z
                Tobą!
              </h5>
              <div className="benefits__intro">
                <GiftIcon />
                <p>Co zyskujesz?</p>
              </div>
              <div className="benefits__list">
                {benefitsData["client"].benefitsArray.map((benefit, index) => (
                  <div key={index} className="benefits__list__benefit">
                    <CheckIcon />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="center-wrapper">
              <button
                className="btn btn-dark"
                onClick={() => handleSubmit(false)}
              >
                <AvatarIcon />
                Założ konto klienta
              </button>
            </div>
          </div>
        </div>
        <div className="account-row">
          <div className="account-col"></div>
          <div className="account-col"></div>
        </div>
      </Popup>
    </div>
  );
};

export default RegisterForm;
