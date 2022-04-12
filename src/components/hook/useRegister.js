import axios from 'axios'
import { useContext } from 'react'
import { RegisterContext } from '../context/register.context'

export function useRegister() {
    const context = useContext(RegisterContext)

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    const { registerData, setRegisterData,forgotEmail,setForgotEmail } = context


    const fetchRegisterData = () => {
        axios.get("http://localhost:3000/signUp").then(resp => {
            setRegisterData(resp.data)
        })
    }

    const addRegisterData = (payload) => {
        axios.post("http://localhost:3000/signUp", payload).then(fetchRegisterData)
    }

    const editForgotPassword = (payload) => {
        axios.put(`http://localhost:3000/signUp/${payload.id}`, payload).then(fetchRegisterData)
    }

    return {
        registerData, setRegisterData, addRegisterData,editForgotPassword,forgotEmail,setForgotEmail
    }
}
