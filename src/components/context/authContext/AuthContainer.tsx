import React, { PropsWithChildren, useState } from "react";
import { AuthContext, AuthProvider } from ".";
import { authDataObject, IAuthContext, IntialauthData } from "./AuthInterface";

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<PropsWithChildren<AuthContainerProps>> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<authDataObject>(IntialauthData);

  return (
    <AuthProvider
      value={{
        authData,
        setAuthData,
      }}
    >
      {children}
    </AuthProvider>
  );
};

export default AuthContainer;

export const useAuthContext = () => {
  return React.useContext(AuthContext) as IAuthContext;
};
