import { FC, useState } from "react";
import { api } from "../../../api/axiosClient";

const RequestPasswordResetForm: FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/accounts/password-reset/request/", {
        email,
      });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(
        error.response.data?.email || "Błąd podczas resetowania hasła."
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="password-reset-form">
        <input
          type="email"
          placeholder="Podaj e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
        <button type="submit" className="btn btn-dark">
          Wyślij link resetujący
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default RequestPasswordResetForm;
