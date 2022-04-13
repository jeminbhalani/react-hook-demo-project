import { ApiGetMethod } from "ApiHelper";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { RegisterContext, RegisterProvider } from ".";
import {
  forgotEmailData,
  intialRegisterData,
  IRegisterContext,
  RegisterDataObject,
} from "./RegisterInterface";

interface RegisterContainerProps {
  children: React.ReactNode;
}

const RegisterContainer: React.FC<
  PropsWithChildren<RegisterContainerProps>
> = ({ children }) => {
  const [registerData, setRegisterData] =
    useState<RegisterDataObject>(intialRegisterData);
  const [forgotEmail, setForgotEmail] = useState(forgotEmailData);

  useEffect(() => {
    const fetchData = () => {
      ApiGetMethod("signUp").then((res) => setRegisterData(res?.data));
    };
    fetchData();
  }, []);
  
  return (
    <RegisterProvider
      value={{
        registerData,
        setRegisterData,
        forgotEmail,
        setForgotEmail,
      }}
    >
      {children}
    </RegisterProvider>
  );
};

export default RegisterContainer;

export const useRegisterContext = () => {
  return React.useContext(RegisterContext) as IRegisterContext;
};
