import {
  ApiDeleteMethod,
  ApiGetMethod,
  ApiPostMethod,
  ApiPutMethod,
} from "ApiHelper";
import { useUserContext } from "components/context/userContext/UserContainer";

export function useUser() {
  const context = useUserContext();

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const {
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
  } = context;

  const fetchUserData = () => {
    ApiGetMethod("users").then((resp) => {
      setUserData(resp.data);
    });
  };

  const deleteData = () => {
    ApiDeleteMethod(`users/${deleteID}`).then(fetchUserData);
    setOpenDeleteModal(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDeleteModal(false);
  };
  const handleOpen = (id) => {
    setOpen(true);
    setEditData(userData.find((i) => i.id === id));
  };

  const deleteModalOpen = (id) => {
    setOpenDeleteModal(true);
    setDeleteId(id);
  };

  const editUserData = (payload) => {
    ApiPutMethod(`users/${payload.id}`, payload).then(fetchUserData);
    setOpen(false);
  };

  const addUserData = (payload) => {
    ApiPostMethod("users", payload).then(fetchUserData);
    setOpen(false);
  };

  return {
    userData,
    setUserData,
    deleteData,
    handleClose,
    open,
    setOpen,
    handleOpen,
    editData,
    setEditData,
    editUserData,
    addUserData,
    openDeleteModal,
    setOpenDeleteModal,
    deleteModalOpen,
  };
}
