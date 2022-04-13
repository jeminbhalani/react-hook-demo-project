export interface authDataObject {
  firstName: string;
  lastName: string;
  email: string;
  id?: number;
  password: string;
  confirmpassword: string;
}

export const IntialauthData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export interface IAuthContext {
  authData: authDataObject | null;
  setAuthData: React.Dispatch<React.SetStateAction<authDataObject>>;
}
