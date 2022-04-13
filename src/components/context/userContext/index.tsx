import React from "react";
import { IUserContext } from "./UserInterface";

export const UserContext = React.createContext<IUserContext | null>(null);
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
