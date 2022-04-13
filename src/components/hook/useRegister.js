import { ApiGetMethod, ApiPostMethod, ApiPutMethod } from "ApiHelper";
import { useRegisterContext } from "components/context/registerContext/RegisterContainer";

export function useRegister() {
  const context = useRegisterContext();

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const { registerData, setRegisterData, forgotEmail, setForgotEmail } =
    context;

  const fetchRegisterData = () => {
    ApiGetMethod("signUp").then((resp) => {
      setRegisterData(resp.data);
    });
  };

  const addRegisterData = (payload) => {
    ApiPostMethod("signUp", payload).then(fetchRegisterData);
  };

  const editForgotPassword = (payload) => {
    ApiPutMethod(`signUp/${payload.id}`, payload).then(fetchRegisterData);
  };

  return {
    registerData,
    setRegisterData,
    addRegisterData,
    editForgotPassword,
    forgotEmail,
    setForgotEmail,
  };
}
