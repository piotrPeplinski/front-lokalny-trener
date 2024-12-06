import { FC, useState } from "react";
import { AvatarIcon } from "../../../assets/icons/icons";
import { useAuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  isTrainer: boolean;
}

const RegisterForm: FC<RegisterFormProps> = ({ isTrainer }) => {
  const { register } = useAuthContext(); // Get the register method from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // For error handling

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for passwords matching
    if (password !== confirmPassword) {
      setError("Hasła nie pasują");
      return;
    }

    // Clear any previous error
    setError(null);

    // Prepare data for registration
    const data = {
      email,
      password,
      is_trainer: isTrainer,
    };

    try {
      // Call the register method from AuthContext to register the user
      await register(data);
      navigate("/");
    } catch (err) {
      setError("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
    }
  };

  return (
    <div className="register-container">
      <div className="benefits">
        <h3>Zarejestruj się!</h3>
      </div>

      <form onSubmit={handleSubmit}>
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
        <p className="form-label margin-top">Hasło</p>
        <div className="register-row">
          <input
            required
            className="form-input"
            type="password"
            placeholder="Podaj hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password input */}
          <input
            required
            className="form-input"
            type="password"
            placeholder="Powtórz hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit button */}
        <button className="btn btn-dark margin-top" type="submit">
          <AvatarIcon />
          <p>Załóż konto {isTrainer ? "trenera" : "klienta"}</p>
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
