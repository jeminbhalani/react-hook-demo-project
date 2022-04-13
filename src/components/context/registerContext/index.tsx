import React from "react";
import { IRegisterContext } from "./RegisterInterface";

export const RegisterContext = React.createContext<IRegisterContext | null>(
  null
);
export const RegisterProvider = RegisterContext.Provider;
export const RegisterConsumer = RegisterContext.Consumer;
