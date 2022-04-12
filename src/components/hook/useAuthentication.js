import { useContext, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { AuthContext } from '../context/authUser.context'

export function useAuthentication() {
    const context = useContext(AuthContext)
    const cookies = new Cookies();

    if (context === undefined) {
        throw new Error('useAuthentication must be used within a UserProvider');
    }
    const { authData, setAuthData } = context;


  const token = cookies.get("token");

  useEffect(() => {
    setAuthData(token)
  }, [])

    return {
        authData, setAuthData
    }
}