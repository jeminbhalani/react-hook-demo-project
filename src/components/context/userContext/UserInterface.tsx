export interface IUserContext {
  userData: any | null;
  setUserData: any;
  open: boolean | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData: any | null;
  setEditData: any;
  openDeleteModal: boolean | null;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteID: any | null;
  setDeleteId: any;
}
