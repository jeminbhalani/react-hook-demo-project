import React from "react";
import { IAuthContext } from "./AuthInterface";

export const AuthContext = React.createContext<IAuthContext | null>(null);
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
