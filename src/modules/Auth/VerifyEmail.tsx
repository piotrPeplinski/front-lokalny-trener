import { FC, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../api/axiosClient";

const VerifyEmail: FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_BACKEND_URL}/accounts/auth/verify-email/?token=${token}`
        );
        setMessage(`${response.data.message}`);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setMessage(`${error}`);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return <div>{message}</div>;
};

export default VerifyEmail;
