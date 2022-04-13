import { ApiGetMethod } from "ApiHelper";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { UserContext, UserProvider } from ".";
import { IUserContext } from "./UserInterface";

interface UserContainerProps {
  children: React.ReactNode;
}

const UserContainer: React.FC<PropsWithChildren<UserContainerProps>> = ({
  children,
}) => {
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editData, setEditData] = useState();
  const [deleteID, setDeleteId] = useState();

  useEffect(() => {
    const fetchData = () => {
      ApiGetMethod("users").then((response) => setUserData(response?.data));
    };
    fetchData();
  }, []);

  return (
    <UserProvider
      value={{
        userData,
        setUserData,
        open,
        setOpen,
        editData,
        setEditData,
        openDeleteModal,
        setOpenDeleteModal,
        deleteID,
        setDeleteId,
      }}
    >
      {children}
    </UserProvider>
  );
};

export default UserContainer;

export const useUserContext = () => {
  return React.useContext(UserContext) as IUserContext;
};
