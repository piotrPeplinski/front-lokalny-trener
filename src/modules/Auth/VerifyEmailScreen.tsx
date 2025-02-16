import { FC, useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../../api/axiosClient";

const VerifyEmailScreen: FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState<string | null>(null);
  const hasRequested = useRef(false); // Prevent duplicate requests

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_BACKEND_URL}/accounts/auth/verify-email/?token=${token}`
        );
        setMessage(response.data.message); // Use API message
      } catch (error: any) {
        setMessage(
          error.response?.data?.message || "Błąd podczas weryfikacji."
        );
      }
    };

    if (token && !hasRequested.current) {
      hasRequested.current = true; // Prevent duplicate API calls
      verifyEmail();
    }
  }, [token]);

  return (
    <section>
      <div className="row-center">
        <p className="verification-message">
          {message || "Trwa weryfikacja..."}
        </p>
      </div>
      <div className="row-center mt-2">
        <Link to={"/login"} className="btn btn-dark">
          Zaloguj się
        </Link>
      </div>
    </section>
  );
};

export default VerifyEmailScreen;
