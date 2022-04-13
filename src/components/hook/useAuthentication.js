import { useAuthContext } from "components/context/authContext/AuthContainer";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export function useAuthentication() {
  const context = useAuthContext();
  const cookies = new Cookies();

  if (context === undefined) {
    throw new Error("useAuthentication must be used within a UserProvider");
  }
  const { authData, setAuthData } = context;
  const token = cookies.get("token");

  useEffect(() => {
    setAuthData(token);
  }, [authData, setAuthData, token]);

  return {
    authData,
    setAuthData,
  };
}
