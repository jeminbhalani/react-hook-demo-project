export interface RegisterDataObject {
  firstName?: string;
  lastName?: string;
  email: string;
  id?: number;
  password: string;
  confirmpassword: string;
}

interface forgotEmailObject {
  firstName?: string;
  lastName?: string;
  email: string;
  id?: number;
  password: string;
  confirmpassword: string;
}

export interface IRegisterContext {
  registerData: RegisterDataObject;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterDataObject>>;
  forgotEmail: forgotEmailObject;
  setForgotEmail: React.Dispatch<React.SetStateAction<forgotEmailObject>>;
}

export const intialRegisterData = {
  email: "",
  password: "",
  confirmpassword: "",
};

export const forgotEmailData = {
  email: "",
  password: "",
  confirmpassword: "",
};
