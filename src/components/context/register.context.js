import {
    createContext,
    useEffect,
    useState,
  } from 'react'
  import axios from "axios";
  export const RegisterContext = createContext(
    undefined,
  )
  
  export const RegisterProvider = ({ children }) => {
    const [registerData, setRegisterData] = useState([]);
    const [forgotEmail,setForgotEmail]=useState()
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: response } = await axios.get('http://localhost:3000/signUp');
          setRegisterData(response);
        } catch (error) {
          console.error("error", error.message);
        }
      }
      fetchData();
    }, [])
  
    const value = {
      registerData,
      setRegisterData,
      forgotEmail,
      setForgotEmail
    }
  
    return (
      <RegisterContext.Provider value={value}>
        {children}
      </RegisterContext.Provider>
    )
  }