import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../api/axiosClient";

const ResetPasswordScreen: FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/accounts/password-reset/confirm/", {
        uid,
        token,
        new_password: newPassword,
      });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Błąd podczas resetowania hasła."
      );
    }
  };

  return (
    <section>
      <h1 className="profile-func-title text-center">Ustaw nowe hasło</h1>
      <form onSubmit={handleSubmit} className="password-reset-form">
        <input
          className="form-input"
          type="password"
          placeholder="Podaj nowe hasło"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-dark">
          Zatwierdź
        </button>
        {message && <p>{message}</p>}
      </form>
    </section>
  );
};

export default ResetPasswordScreen;
